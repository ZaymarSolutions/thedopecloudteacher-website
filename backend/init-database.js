const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');

// Remove existing database for fresh start
if (fs.existsSync(dbPath)) {
  console.log('Removing existing database...');
  fs.unlinkSync(dbPath);
}

console.log('Creating new database...');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

console.log('Creating tables...');

// Users table
db.exec(`
  CREATE TABLE users (
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

// Courses table
db.exec(`
  CREATE TABLE courses (
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

// Purchases table
db.exec(`
  CREATE TABLE purchases (
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

// Progress table
db.exec(`
  CREATE TABLE progress (
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

// Certificates table
db.exec(`
  CREATE TABLE certificates (
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

// Subscriptions table
db.exec(`
  CREATE TABLE subscriptions (
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

// Leads table
db.exec(`
  CREATE TABLE leads (
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

console.log('Inserting course data...');

// Insert courses
const insertCourse = db.prepare(`
  INSERT INTO courses (id, title, description, price, duration_hours, lessons_count, level, category)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const courses = [
  {
    id: 'cloud-fundamentals-101',
    title: 'Cloud Fundamentals 101',
    description: 'Master the basics of cloud computing with AWS, Azure, and GCP. Perfect for beginners.',
    price: 297.00,
    duration: 15,
    lessons: 10,
    level: 'Beginner',
    category: 'Cloud Basics'
  },
  {
    id: 'cloud-architect-pathway',
    title: 'Cloud Architect Professional Pathway',
    description: 'Comprehensive training to become a certified cloud architect. Design scalable, secure cloud infrastructure.',
    price: 797.00,
    duration: 40,
    lessons: 12,
    level: 'Advanced',
    category: 'Architecture'
  },
  {
    id: 'cloud-security-engineer',
    title: 'Cloud Security Engineer Track',
    description: 'Master cloud security best practices, compliance, and threat mitigation across all major platforms.',
    price: 697.00,
    duration: 35,
    lessons: 10,
    level: 'Intermediate',
    category: 'Security'
  },
  {
    id: 'devops-automation',
    title: 'DevOps & Automation Mastery',
    description: 'CI/CD pipelines, Infrastructure as Code, Docker, Kubernetes, and automation tools.',
    price: 597.00,
    duration: 30,
    lessons: 12,
    level: 'Intermediate',
    category: 'DevOps'
  },
  {
    id: 'intro-to-ai-ml',
    title: 'Introduction to AI & Machine Learning',
    description: 'Practical AI/ML fundamentals with cloud services. Build intelligent applications.',
    price: 497.00,
    duration: 25,
    lessons: 10,
    level: 'Beginner',
    category: 'AI/ML'
  },
  {
    id: 'data-engineering-cloud',
    title: 'Cloud Data Engineering',
    description: 'Big data, data pipelines, ETL processes, and analytics on cloud platforms.',
    price: 697.00,
    duration: 35,
    lessons: 11,
    level: 'Intermediate',
    category: 'Data'
  },
  {
    id: 'serverless-microservices',
    title: 'Serverless & Microservices Architecture',
    description: 'Build scalable serverless applications with AWS Lambda, Azure Functions, and Cloud Functions.',
    price: 597.00,
    duration: 28,
    lessons: 10,
    level: 'Advanced',
    category: 'Development'
  }
];

courses.forEach(course => {
  insertCourse.run(
    course.id,
    course.title,
    course.description,
    course.price,
    course.duration,
    course.lessons,
    course.level,
    course.category
  );
});

console.log('✅ Database initialized successfully!');
console.log(`📊 Inserted ${courses.length} courses`);
console.log('💾 Database location:', dbPath);

db.close();
