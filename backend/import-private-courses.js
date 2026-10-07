// Run on the private backend host with its existing persistent DATABASE_PATH.
// Never place the input file in the website root or commit it to GitHub.
require('dotenv').config();
const fs=require('fs'); const path=require('path'); const Database=require('better-sqlite3');
const {COURSE_SLUGS}=require('./hub-access');
const input=process.argv[2];
if (!input || !process.env.DATABASE_PATH || !path.isAbsolute(process.env.DATABASE_PATH)) throw new Error('Provide a private content JSON file and an absolute persistent DATABASE_PATH.');
if (!fs.existsSync(process.env.DATABASE_PATH)) throw new Error('Initialize the backend database first.');
const courses=JSON.parse(fs.readFileSync(input,'utf8'));
if (courses.length!==9 || !courses.every(c=>COURSE_SLUGS.has(c.slug) && typeof c.html==='string' && typeof c.title==='string')) throw new Error('Invalid course bundle');
const db=new Database(process.env.DATABASE_PATH);db.pragma('foreign_keys = ON');
db.exec('CREATE TABLE IF NOT EXISTS private_course_content (course_id TEXT PRIMARY KEY, html TEXT NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(course_id) REFERENCES courses(id))');
db.transaction(()=>{for(const c of courses){
 db.prepare("INSERT INTO courses (id,title,price,status) VALUES (?,?,?,'active') ON CONFLICT(id) DO UPDATE SET title=excluded.title,price=excluded.price").run(c.slug,c.title,c.price);
 db.prepare('INSERT INTO private_course_content (course_id,html) VALUES (?,?) ON CONFLICT(course_id) DO UPDATE SET html=excluded.html,updated_at=CURRENT_TIMESTAMP').run(c.slug,c.html);
}})();db.close();console.log('Imported nine courses into private storage.');
