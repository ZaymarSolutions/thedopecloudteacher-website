require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Database = require('better-sqlite3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const db = new Database(path.join(__dirname, process.env.DATABASE_PATH || 'database.sqlite'));
db.pragma('foreign_keys = ON');

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
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

// ==================== AUTH ROUTES ====================

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, phone, organization } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const result = db.prepare(`
      INSERT INTO users (email, password_hash, name, phone, organization)
      VALUES (?, ?, ?, ?, ?)
    `).run(email, passwordHash, name, phone || null, organization || null);

    const token = jwt.sign(
      { userId: result.lastInsertRowid, email, name },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: result.lastInsertRowid, email, name }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
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
      success_url: `${process.env.FRONTEND_URL}/dashboard.html?success=true&course=${courseId}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing.html?canceled=true`,
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

// Stripe webhook handler
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
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
    
    // Grant course access
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Dope Cloud Teacher API running on port ${PORT}`);
  console.log(`📚 Courses available: ${db.prepare('SELECT COUNT(*) as count FROM courses').get().count}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing database connection');
  db.close();
  process.exit(0);
});
