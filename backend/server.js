require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Database = require('better-sqlite3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? require('stripe')(stripeSecretKey) : null;
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const { sendEmail } = require('./email-service');

const app = express();
const PORT = process.env.PORT || 3000;
const ASSISTANT_API_ENDPOINT = process.env.AI_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
const ASSISTANT_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

// Database connection
const configuredDbPath = process.env.DATABASE_PATH || 'database.sqlite';
let dbPath = path.isAbsolute(configuredDbPath)
  ? configuredDbPath
  : path.join(__dirname, configuredDbPath);

try {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
} catch (error) {
  console.error(`Unable to initialize database directory for ${dbPath}: ${error.message}`);
  dbPath = path.join(__dirname, 'database.sqlite');
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  console.error(`Falling back to local database path: ${dbPath}`);
}

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Core schema bootstrap for fresh environments (e.g. Railway first deploy).
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    organization TEXT,
    role TEXT DEFAULT 'student',
    stripe_customer_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    email_verified BOOLEAN DEFAULT 0
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    duration_hours INTEGER,
    lessons_count INTEGER,
    level TEXT,
    category TEXT,
    thumbnail_url TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_type TEXT NOT NULL,
    product_id TEXT NOT NULL,
    stripe_payment_id TEXT,
    stripe_subscription_id TEXT,
    amount DECIMAL(10,2),
    status TEXT DEFAULT 'active',
    purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    quiz_score INTEGER,
    time_spent_minutes INTEGER DEFAULT 0,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, course_id, lesson_id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id TEXT NOT NULL,
    certificate_code TEXT UNIQUE NOT NULL,
    issue_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    verification_url TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, course_id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id TEXT NOT NULL,
    lesson_id INTEGER NOT NULL,
    lesson_title TEXT NOT NULL,
    file_path TEXT NOT NULL,
    duration_seconds INTEGER,
    word_count INTEGER,
    start_time_formatted TEXT,
    end_time_formatted TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(course_id, lesson_id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    plan_type TEXT NOT NULL,
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    canceled_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

const seedCourse = db.prepare(`
  INSERT OR IGNORE INTO courses (id, title, description, price, duration_hours, lessons_count, level, category)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

[
  ['cloud-fundamentals-101', 'Cloud Fundamentals 101', 'Master the basics of cloud computing with AWS, Azure, and GCP. Perfect for beginners.', 297.0, 15, 10, 'Beginner', 'Cloud Basics'],
  ['cloud-architect-pathway', 'Cloud Architect Professional Pathway', 'Comprehensive training to become a certified cloud architect. Design scalable, secure cloud infrastructure.', 797.0, 40, 12, 'Advanced', 'Architecture'],
  ['cloud-security-engineer', 'Cloud Security Engineer Track', 'Master cloud security best practices, compliance, and threat mitigation across all major platforms.', 697.0, 35, 10, 'Intermediate', 'Security'],
  ['devops-automation', 'DevOps & Automation Mastery', 'CI/CD pipelines, Infrastructure as Code, Docker, Kubernetes, and automation tools.', 597.0, 30, 12, 'Intermediate', 'DevOps'],
  ['intro-to-ai-ml', 'Introduction to AI & Machine Learning', 'Practical AI/ML fundamentals with cloud services. Build intelligent applications.', 497.0, 25, 10, 'Beginner', 'AI/ML'],
  ['data-engineering-cloud', 'Cloud Data Engineering', 'Big data, data pipelines, ETL processes, and analytics on cloud platforms.', 697.0, 35, 11, 'Intermediate', 'Data'],
  ['serverless-microservices', 'Serverless & Microservices Architecture', 'Build scalable serverless applications with AWS Lambda, Azure Functions, and Cloud Functions.', 597.0, 28, 10, 'Advanced', 'Development']
].forEach((course) => {
  try {
    seedCourse.run(...course);
  } catch (error) {
    // Keep API online even if an existing DB has an older schema.
    console.error(`Course seed skipped for ${course[0]}: ${error.message}`);
  }
});

// Ensure leads table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    source TEXT,
    page TEXT,
    referrer TEXT,
    user_agent TEXT,
    verify_token TEXT,
    verified_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const ensureLeadColumn = (columnName, columnDefinition) => {
  const columns = db.prepare('PRAGMA table_info(leads)').all();
  const exists = columns.some(column => column.name === columnName);
  if (!exists) {
    db.exec(`ALTER TABLE leads ADD COLUMN ${columnName} ${columnDefinition}`);
  }
};

ensureLeadColumn('verify_token', 'TEXT');
ensureLeadColumn('verified_at', 'DATETIME');

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*', // Allow all origins for development and deployment
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const assistantSystemPrompt = `You are The Dope Cloud Teacher training assistant. Provide clear, practical guidance for cloud learning and career growth.
Prioritize concise, actionable answers with real-world examples when useful.
If a question is outside your scope, say so and offer the closest helpful next step.`;

const requireAdmin = (req, res, next) => {
  const user = db.prepare('SELECT role FROM users WHERE id = ?').get(req.user.userId);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

const ensureStripeConfigured = (res) => {
  if (!stripe) {
    res.status(503).json({ error: 'Stripe is not configured on this environment' });
    return false;
  }
  return true;
};

// ==================== AUTH ROUTES ====================

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, phone, organization } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server configuration error: JWT secret is missing' });
    }

    // Check if user exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Keep signup atomic so we don't create users if token generation fails.
    db.exec('BEGIN');
    let result;
    let token;
    try {
      result = db.prepare(`
        INSERT INTO users (email, password_hash, name, phone, organization)
        VALUES (?, ?, ?, ?, ?)
      `).run(email, passwordHash, name, phone || null, organization || null);

      token = jwt.sign(
        { userId: result.lastInsertRowid, email, name },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      db.exec('COMMIT');
    } catch (innerError) {
      db.exec('ROLLBACK');
      throw innerError;
    }

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: result.lastInsertRowid, email, name }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (/has no column named|no such table/i.test(error?.message || '')) {
      return res.status(500).json({ error: 'Database schema is out of date. Please run the latest database migration.' });
    }
    res.status(500).json({ error: 'Registration failed. Please contact support if this continues.' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = db.prepare('SELECT id, email, name, phone, organization, role, created_at FROM users WHERE id = ?')
    .get(req.user.userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
});

// ==================== LEAD CAPTURE ====================
app.post('/api/leads', async (req, res) => {
  try {
    const { email, source, page, referrer } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const existingLead = db.prepare('SELECT id, verified_at FROM leads WHERE email = ?').get(email);
    const verifyToken = crypto.randomBytes(24).toString('hex');
    const frontendUrl = process.env.FRONTEND_URL || 'https://thedopecloudteacher.com';
    const verifyUrl = `${frontendUrl.replace(/\/$/, '')}/verify.html?token=${verifyToken}`;

    if (existingLead) {
      db.prepare(`
        UPDATE leads
        SET source = ?, page = ?, referrer = ?, user_agent = ?, last_seen = CURRENT_TIMESTAMP,
            verify_token = CASE WHEN verified_at IS NULL THEN ? ELSE verify_token END
        WHERE email = ?
      `).run(source || null, page || null, referrer || null, req.headers['user-agent'] || null, verifyToken, email);
    } else {
      db.prepare(`
        INSERT INTO leads (email, source, page, referrer, user_agent, verify_token)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(email, source || null, page || null, referrer || null, req.headers['user-agent'] || null, verifyToken);
    }

    if (process.env.LEAD_WEBHOOK_URL) {
      try {
        await fetch(process.env.LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            source: source || null,
            page: page || null,
            referrer: referrer || null,
            status: existingLead && existingLead.verified_at ? 'verified' : 'pending',
            verify_url: existingLead && existingLead.verified_at ? null : verifyUrl
          })
        });
      } catch (webhookError) {
        console.error('Lead webhook error:', webhookError);
      }
    } else {
      await sendEmail(email, 'verifyEmail', email, verifyUrl);
    }

    res.json({
      success: true,
      status: existingLead ? 'updated' : 'created',
      verifyRequired: !(existingLead && existingLead.verified_at)
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ error: 'Lead capture failed' });
  }
});

app.get('/api/leads/verify', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ error: 'Verification token required' });
    }

    const lead = db.prepare('SELECT id, email, verified_at FROM leads WHERE verify_token = ?').get(token);
    if (!lead) {
      return res.status(404).json({ error: 'Invalid verification token' });
    }

    if (!lead.verified_at) {
      db.prepare('UPDATE leads SET verified_at = CURRENT_TIMESTAMP WHERE id = ?').run(lead.id);
    }

    if (process.env.LEAD_WEBHOOK_URL) {
      try {
        await fetch(process.env.LEAD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: lead.email,
            status: 'verified'
          })
        });
      } catch (webhookError) {
        console.error('Lead webhook error:', webhookError);
      }
    }

    res.json({ success: true, status: 'verified' });

    if (lead?.email) {
      await sendEmail(lead.email, 'welcomeEmail', lead.email);
    }

  } catch (error) {
    console.error('Lead verification error:', error);
    res.status(500).json({ error: 'Lead verification failed' });
  }
});

app.get('/api/leads', authenticateToken, requireAdmin, (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || '100', 10), 500);
  const offset = parseInt(req.query.offset || '0', 10);

  const total = db.prepare('SELECT COUNT(*) as count FROM leads').get();
  const leads = db.prepare(`
    SELECT id, email, source, page, referrer, verified_at, created_at, last_seen
    FROM leads
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `).all(limit, offset);

  res.json({ leads, total: total.count, limit, offset });
});

app.get('/api/leads/export', authenticateToken, requireAdmin, (req, res) => {
  const format = (req.query.format || 'csv').toLowerCase();
  const leads = db.prepare(`
    SELECT email, source, page, referrer, verified_at, created_at, last_seen
    FROM leads
    ORDER BY created_at DESC
  `).all();

  if (format === 'json') {
    return res.json({ leads });
  }

  const escapeCsv = (value) => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const header = ['email', 'source', 'page', 'referrer', 'verified_at', 'created_at', 'last_seen'];
  const rows = leads.map(lead => header.map(key => escapeCsv(lead[key])).join(','));
  const csv = [header.join(','), ...rows].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
  res.send(csv);
});

// ==================== AI ASSISTANT ====================
app.post('/api/assistant/chat', async (req, res) => {
  try {
    const { question, history } = req.body || {};
    const userQuestion = typeof question === 'string' ? question.trim() : '';

    if (!userQuestion) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'AI assistant is not configured' });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(item => item && typeof item.content === 'string' && (item.role === 'user' || item.role === 'assistant'))
          .slice(-8)
      : [];

    const messages = [
      { role: 'system', content: assistantSystemPrompt },
      ...safeHistory,
      { role: 'user', content: userQuestion }
    ];

    const upstream = await fetch(ASSISTANT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: ASSISTANT_MODEL,
        messages,
        temperature: 0.4
      })
    });

    if (!upstream.ok) {
      const errorText = await upstream.text();
      console.error('Assistant upstream error:', upstream.status, errorText);
      return res.status(502).json({ error: 'Assistant provider request failed' });
    }

    const data = await upstream.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return res.status(502).json({ error: 'Assistant provider returned an empty response' });
    }

    res.json({ answer });
  } catch (error) {
    console.error('Assistant API error:', error);
    res.status(500).json({ error: 'Assistant request failed' });
  }
});

// ==================== COURSES ROUTES ====================

// Get all courses
app.get('/api/courses', (req, res) => {
  const courses = db.prepare('SELECT * FROM courses WHERE status = ?').all('active');
  res.json({ courses });
});

// Get single course
app.get('/api/courses/:courseId', (req, res) => {
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.courseId);
  
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  res.json({ course });
});

// Check course access
app.get('/api/courses/:courseId/access', authenticateToken, (req, res) => {
  const purchase = db.prepare(`
    SELECT * FROM purchases 
    WHERE user_id = ? AND product_id = ? AND status = 'active'
    AND (expires_at IS NULL OR expires_at > datetime('now'))
  `).get(req.user.userId, req.params.courseId);

  res.json({ hasAccess: !!purchase });
});

// ==================== STRIPE PAYMENT ROUTES ====================

// Create checkout session
app.post('/api/create-checkout', authenticateToken, async (req, res) => {
  try {
    if (!ensureStripeConfigured(res)) return;

    const { courseId, priceId } = req.body;

    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: course.title,
            description: course.description,
          },
          unit_amount: Math.round(course.price * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'https://thedopecloudteacher.org'}/dashboard.html?success=true&course=${courseId}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://thedopecloudteacher.org'}/pricing.html?canceled=true`,
      client_reference_id: req.user.userId.toString(),
      metadata: {
        courseId,
        userId: req.user.userId.toString()
      }
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Create subscription (recurring payments)
app.post('/api/create-subscription', authenticateToken, async (req, res) => {
  try {
    if (!ensureStripeConfigured(res)) return;

    const { planType, planName, price, interval } = req.body;

    if (!planType || !planName || !price || !interval) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create or retrieve Stripe customer
    const user = db.prepare('SELECT email, stripe_customer_id FROM users WHERE id = ?').get(req.user.userId);
    
    let customerId = user.stripe_customer_id;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: req.user.userId.toString()
        }
      });
      
      customerId = customer.id;
      
      // Save customer ID
      db.prepare('UPDATE users SET stripe_customer_id = ? WHERE id = ?')
        .run(customerId, req.user.userId);
    }

    // Create Stripe checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: planName,
            description: `Access to all courses and premium features`,
          },
          unit_amount: Math.round(price * 100),
          recurring: {
            interval: interval,
          },
        },
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL || 'https://thedopecloudteacher.org'}/dashboard.html?success=true&subscription=${planType}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://thedopecloudteacher.org'}/pricing.html?canceled=true`,
      client_reference_id: req.user.userId.toString(),
      metadata: {
        planType,
        userId: req.user.userId.toString()
      },
      subscription_data: {
        metadata: {
          planType,
          userId: req.user.userId.toString()
        }
      }
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// Stripe webhook handler
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!ensureStripeConfigured(res)) return;

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Check if this is a subscription or one-time purchase
    if (session.mode === 'subscription') {
      // Handle subscription
      db.prepare(`
        INSERT OR REPLACE INTO subscriptions (user_id, plan_type, stripe_subscription_id, stripe_customer_id, status)
        VALUES (?, ?, ?, ?, 'active')
      `).run(
        parseInt(session.metadata.userId),
        session.metadata.planType,
        session.subscription,
        session.customer
      );
    } else {
      // Grant course access (one-time purchase)
      db.prepare(`
        INSERT INTO purchases (user_id, product_type, product_id, stripe_payment_id, amount, status)
        VALUES (?, 'course', ?, ?, ?, 'active')
      `).run(
        parseInt(session.metadata.userId),
        session.metadata.courseId,
        session.payment_intent,
        session.amount_total / 100
      );
    }
  }

  // Handle subscription updates
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object;
    db.prepare(`
      UPDATE subscriptions 
      SET status = ? 
      WHERE stripe_subscription_id = ?
    `).run(subscription.status, subscription.id);
  }

  // Handle subscription cancellations
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    db.prepare(`
      UPDATE subscriptions 
      SET status = 'canceled', canceled_at = CURRENT_TIMESTAMP
      WHERE stripe_subscription_id = ?
    `).run(subscription.id);
  }

  res.json({ received: true });
});

// ==================== PROGRESS TRACKING ROUTES ====================

// Get user progress for a course
app.get('/api/progress/:courseId', authenticateToken, (req, res) => {
  const progress = db.prepare(`
    SELECT * FROM progress 
    WHERE user_id = ? AND course_id = ?
    ORDER BY lesson_id
  `).all(req.user.userId, req.params.courseId);

  res.json({ progress });
});

// Update lesson progress
app.post('/api/progress', authenticateToken, (req, res) => {
  try {
    const { courseId, lessonId, completed, quizScore, timeSpent } = req.body;

    const existing = db.prepare(`
      SELECT id FROM progress WHERE user_id = ? AND course_id = ? AND lesson_id = ?
    `).get(req.user.userId, courseId, lessonId);

    if (existing) {
      db.prepare(`
        UPDATE progress 
        SET completed = ?, quiz_score = ?, time_spent_minutes = ?, completed_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(completed ? 1 : 0, quizScore || null, timeSpent || 0, existing.id);
    } else {
      db.prepare(`
        INSERT INTO progress (user_id, course_id, lesson_id, completed, quiz_score, time_spent_minutes, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).run(req.user.userId, courseId, lessonId, completed ? 1 : 0, quizScore || null, timeSpent || 0);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// ==================== CERTIFICATES ROUTES ====================

// Generate certificate
app.post('/api/certificates/generate', authenticateToken, (req, res) => {
  try {
    const { courseId } = req.body;

    // Check if all lessons are completed
    const course = db.prepare('SELECT lessons_count FROM courses WHERE id = ?').get(courseId);
    const completedLessons = db.prepare(`
      SELECT COUNT(*) as count FROM progress 
      WHERE user_id = ? AND course_id = ? AND completed = 1
    `).get(req.user.userId, courseId);

    if (completedLessons.count < course.lessons_count) {
      return res.status(400).json({ 
        error: 'Course not completed',
        completed: completedLessons.count,
        required: course.lessons_count
      });
    }

    // Check if certificate already exists
    const existing = db.prepare(`
      SELECT * FROM certificates WHERE user_id = ? AND course_id = ?
    `).get(req.user.userId, courseId);

    if (existing) {
      return res.json({ certificate: existing });
    }

    // Generate unique certificate code
    const certificateCode = `DCT-${Date.now()}-${req.user.userId}`;
    
    const result = db.prepare(`
      INSERT INTO certificates (user_id, course_id, certificate_code)
      VALUES (?, ?, ?)
    `).run(req.user.userId, courseId, certificateCode);

    const certificate = db.prepare('SELECT * FROM certificates WHERE id = ?').get(result.lastInsertRowid);
    
    res.json({ certificate });
  } catch (error) {
    console.error('Certificate generation error:', error);
    res.status(500).json({ error: 'Failed to generate certificate' });
  }
});

// Get user certificates
app.get('/api/certificates', authenticateToken, (req, res) => {
  const certificates = db.prepare(`
    SELECT c.*, co.title as course_title
    FROM certificates c
    JOIN courses co ON c.course_id = co.id
    WHERE c.user_id = ?
  `).all(req.user.userId);

  res.json({ certificates });
});

// Verify certificate
app.get('/api/certificates/verify/:code', (req, res) => {
  const certificate = db.prepare(`
    SELECT c.*, u.name as user_name, co.title as course_title
    FROM certificates c
    JOIN users u ON c.user_id = u.id
    JOIN courses co ON c.course_id = co.id
    WHERE c.certificate_code = ?
  `).get(req.params.code);

  if (!certificate) {
    return res.status(404).json({ error: 'Certificate not found' });
  }

  res.json({ certificate, valid: true });
});

// ==================== ADMIN ROUTES ====================

// Get dashboard stats (admin)
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  // Check if user is admin
  const user = db.prepare('SELECT role FROM users WHERE id = ?').get(req.user.userId);
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const stats = {
    totalUsers: db.prepare('SELECT COUNT(*) as count FROM users').get().count,
    totalPurchases: db.prepare('SELECT COUNT(*) as count FROM purchases').get().count,
    totalRevenue: db.prepare('SELECT SUM(amount) as total FROM purchases').get().total || 0,
    activeCourses: db.prepare('SELECT COUNT(*) as count FROM courses WHERE status = "active"').get().count,
    certificatesIssued: db.prepare('SELECT COUNT(*) as count FROM certificates').get().count
  };

  res.json({ stats });
});

// ===========================
// VIDEO STREAMING ENDPOINTS
// ===========================

// Get video for specific lesson
app.get('/api/videos/:courseId/:lessonId', authenticateToken, (req, res) => {
  const { courseId, lessonId } = req.params;
  
  // Map courseId to folder name
  const courseFolderMap = {
    'cloud-fundamentals-101': 'CLOUD-FUNDAMENTALS-101',
    'cloud-architect-pathway': 'CLOUD-ARCHITECT-PATHWAY',
    'cloud-security-engineer': 'CLOUD-SECURITY-ENGINEER',
    'devops-automation-mastery': 'DEVOPS-AUTOMATION-MASTERY',
    'ai-machine-learning': 'AI-MACHINE-LEARNING',
    'cloud-data-engineering': 'CLOUD-DATA-ENGINEERING',
    'serverless-microservices': 'SERVERLESS-MICROSERVICES'
  };
  
  const courseFolder = courseFolderMap[courseId];
  if (!courseFolder) {
    return res.status(404).json({ error: 'Course not found' });
  }
  
  // Find video file
  const videoBasePath = 'D:\\COURSE_VIDEOS';
  const coursePath = path.join(videoBasePath, courseFolder);
  
  // Read directory to find lesson video
  try {
    const files = fs.readdirSync(coursePath);
    const videoFile = files.find(f => f.startsWith(`Lesson-${lessonId}-`) && f.endsWith('.mp4'));
    
    if (!videoFile) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    const videoPath = path.join(coursePath, videoFile);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    
    if (range) {
      // Stream video with range support
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // Stream entire video
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    console.error('Video streaming error:', error);
    res.status(500).json({ error: 'Video streaming failed' });
  }
});

// Get lesson metadata
app.get('/api/videos/metadata/:courseId/:lessonId', (req, res) => {
  const { courseId, lessonId } = req.params;
  
  // Load lesson manifest
  const manifestPath = path.join(__dirname, '..', 'lesson_manifest.json');
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const lesson = manifest.find(l => 
      l.course.toLowerCase().replace(/[^a-z0-9]/g, '-') === courseId && 
      l.lessonNumber === parseInt(lessonId)
    );
    
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    res.json({
      lessonNumber: lesson.lessonNumber,
      lessonTitle: lesson.lessonTitle,
      course: lesson.course,
      durationSeconds: lesson.durationSeconds,
      wordCount: lesson.wordCount
    });
  } catch (error) {
    console.error('Metadata error:', error);
    res.status(500).json({ error: 'Failed to load metadata' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Dope Cloud Teacher API running on port ${PORT}`);
  try {
    console.log(`📚 Courses available: ${db.prepare('SELECT COUNT(*) as count FROM courses').get().count}`);
  } catch (error) {
    console.error('Course count check failed:', error.message);
  }
  console.log(`💾 Database path: ${dbPath}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing database connection');
  db.close();
  process.exit(0);
});
