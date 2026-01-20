const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

console.log('\n📊 Database Statistics\n');
console.log('='.repeat(50));

// Users
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
console.log(`👥 Total Users: ${userCount.count}`);

// Courses
const courseCount = db.prepare('SELECT COUNT(*) as count FROM courses WHERE status = "active"').get();
console.log(`📚 Active Courses: ${courseCount.count}`);

// List courses
console.log('\n📖 Available Courses:');
const courses = db.prepare('SELECT id, title, price, level FROM courses WHERE status = "active"').all();
courses.forEach((course, index) => {
  console.log(`  ${index + 1}. ${course.title}`);
  console.log(`     Price: $${course.price} | Level: ${course.level}`);
});

// Purchases
const purchaseCount = db.prepare('SELECT COUNT(*) as count FROM purchases').get();
const totalRevenue = db.prepare('SELECT SUM(amount) as total FROM purchases').get();
console.log(`\n💰 Total Purchases: ${purchaseCount.count}`);
console.log(`💵 Total Revenue: $${totalRevenue.total || 0}`);

// Progress
const progressCount = db.prepare('SELECT COUNT(*) as count FROM progress WHERE completed = 1').get();
console.log(`✅ Completed Lessons: ${progressCount.count}`);

// Certificates
const certCount = db.prepare('SELECT COUNT(*) as count FROM certificates').get();
console.log(`🏆 Certificates Issued: ${certCount.count}`);

console.log('\n' + '='.repeat(50) + '\n');

db.close();
