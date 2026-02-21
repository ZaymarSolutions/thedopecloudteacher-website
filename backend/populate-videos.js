// Populate videos table with lesson metadata from lesson_manifest.json

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Ensure videos table exists
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

// Load lesson manifest
const manifestPath = path.join(__dirname, '..', 'lesson_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Course ID mapping
const courseFolderToIdMap = {
  'CLOUD-FUNDAMENTALS-101': 'cloud-fundamentals-101',
  'CLOUD-ARCHITECT-PATHWAY': 'cloud-architect-pathway',
  'CLOUD-SECURITY-ENGINEER': 'cloud-security-engineer',
  'DEVOPS-AUTOMATION-MASTERY': 'devops-automation-mastery',
  'AI-MACHINE-LEARNING': 'intro-to-ai-ml',
  'CLOUD-DATA-ENGINEERING': 'data-engineering-cloud',
  'SERVERLESS-MICROSERVICES': 'serverless-microservices'
};

const insertVideo = db.prepare(`
  INSERT OR REPLACE INTO videos (course_id, lesson_id, lesson_title, file_path, duration_seconds, word_count, start_time_formatted, end_time_formatted)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

let insertedCount = 0;

manifest.forEach(lesson => {
  const courseFolderName = lesson.course.toUpperCase().replace(/[^A-Z0-9]/g, '-');
  const courseId = courseFolderToIdMap[courseFolderName];
  
  if (!courseId) {
    console.log(`⚠️ Skipping ${lesson.course} - no course ID mapping`);
    return;
  }
  
  const fileName = `Lesson-${lesson.lessonNumber}-${lesson.lessonTitle.replace(/[^a-zA-Z0-9-]/g, '-')}.mp4`;
  const filePath = `D:\\COURSE_VIDEOS\\${courseFolderName}\\${fileName}`;
  
  // Check if video file exists
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Video not found: ${filePath}`);
    return;
  }
  
  insertVideo.run(
    courseId,
    lesson.lessonNumber,
    lesson.lessonTitle,
    filePath,
    lesson.durationSeconds,
    lesson.wordCount,
    lesson.startTimeFormatted,
    lesson.endTimeFormatted
  );
  
  insertedCount++;
  console.log(`✓ Added: ${lesson.course} - Lesson ${lesson.lessonNumber}`);
});

console.log(`\n✅ Populated videos table with ${insertedCount} lessons`);
console.log('💾 Database location:', dbPath);

db.close();
