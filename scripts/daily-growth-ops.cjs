const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const siteRoot = path.join(root, 'dope-cloud-teacher');
const courseDataPath = path.join(siteRoot, 'js', 'course-data.js');

const today = new Date().toISOString().slice(0, 10);
const reportDir = path.join(root, 'reports', 'daily-ops', today);
const draftDir = path.join(root, 'drafts', today);

ensureDir(reportDir);
ensureDir(path.join(draftDir, 'blog'));
ensureDir(path.join(draftDir, 'class-content'));
ensureDir(path.join(draftDir, 'products-services'));
ensureDir(path.join(draftDir, 'marketing'));

const htmlFiles = listFiles(siteRoot, (file) => file.toLowerCase().endsWith('.html'));
const qa = runQa(htmlFiles);
const courses = loadCourses(courseDataPath);

const blogFile = path.join(draftDir, 'blog', `${today}-blog-draft.md`);
const classFile = path.join(draftDir, 'class-content', `${today}-class-content-draft.md`);
const productFile = path.join(draftDir, 'products-services', `${today}-product-service-ideas.md`);
const marketingFile = path.join(draftDir, 'marketing', `${today}-marketing-copy.md`);
const reportFile = path.join(reportDir, 'daily-growth-report.md');

fs.writeFileSync(blogFile, generateBlogDraft(courses, today));
fs.writeFileSync(classFile, generateClassDraft(courses, today));
fs.writeFileSync(productFile, generateProductDraft(courses, today));
fs.writeFileSync(marketingFile, generateMarketingDraft(courses, today));
fs.writeFileSync(reportFile, generateReport(qa, {
  blogFile,
  classFile,
  productFile,
  marketingFile,
  htmlCount: htmlFiles.length
}, today));

console.log(`REPORT=${reportFile}`);
console.log(`BLOG=${blogFile}`);
console.log(`CLASS=${classFile}`);
console.log(`PRODUCT=${productFile}`);
console.log(`MARKETING=${marketingFile}`);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function listFiles(startDir, predicate) {
  const out = [];
  for (const name of fs.readdirSync(startDir)) {
    const full = path.join(startDir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      out.push(...listFiles(full, predicate));
    } else if (predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function runQa(files) {
  const missing = {
    title: [],
    description: [],
    canonical: [],
    analytics: []
  };
  const brokenInternalLinks = [];

  const normalizedSet = new Set(files.map((file) => normalize(file)));

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const rel = path.relative(root, file).replace(/\\/g, '/');

    if (!/<title>[\s\S]*?<\/title>/i.test(raw)) missing.title.push(rel);
    if (!/<meta\s+name=["']description["'][^>]*>/i.test(raw)) missing.description.push(rel);
    if (!/<link\s+rel=["']canonical["'][^>]*>/i.test(raw)) missing.canonical.push(rel);

    const hasSiteConfig = /js\/site-config\.js/i.test(raw);
    const hasAnalytics = /js\/analytics\.js/i.test(raw);
    if (!(hasSiteConfig && hasAnalytics)) {
      if (!rel.endsWith('lesson-nav-template.html')) {
        missing.analytics.push(rel);
      }
    }

    const hrefMatches = raw.match(/href\s*=\s*["']([^"']+)["']/gi) || [];
    for (const match of hrefMatches) {
      const href = match.replace(/^[^"']*["']/, '').replace(/["']$/, '').trim();
      if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('javascript:')) {
        continue;
      }

      const noQuery = href.split('?')[0].split('#')[0];
      if (!noQuery || noQuery.startsWith('/api/')) continue;

      const target = path.resolve(path.dirname(file), noQuery);
      const normTarget = normalize(target);
      if (!normalizedSet.has(normTarget) && !fs.existsSync(target)) {
        brokenInternalLinks.push(`${rel} -> ${href}`);
      }
    }
  }

  return {
    missing,
    brokenInternalLinks: Array.from(new Set(brokenInternalLinks)).slice(0, 50)
  };
}

function normalize(filePath) {
  return path.resolve(filePath).replace(/\\/g, '/').toLowerCase();
}

function loadCourses(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const source = fs.readFileSync(filePath, 'utf8');
  const context = { console };
  vm.createContext(context);
  vm.runInContext(`${source}\n;globalThis.__COURSE_PATHWAYS = COURSE_PATHWAYS;`, context);
  return context.__COURSE_PATHWAYS || {};
}

function pickCourses(courses, limit) {
  return Object.values(courses).slice(0, limit);
}

function generateBlogDraft(courses, date) {
  const selected = pickCourses(courses, 3);
  const topics = selected.map((c) => `- ${c.title}: ${c.skills ? c.skills.slice(0, 3).join(', ') : 'Core skills'}`).join('\n');
  return `# Blog Draft - ${date}\n\n## Working Title\nHow to Break Into Cloud in 2026 Without Guesswork\n\n## Audience\nCareer changers and early-career learners looking for practical cloud pathways.\n\n## Core Points\n${topics}\n\n## Draft Outline\n1. Why cloud skills still matter in 2026\n2. The biggest mistakes beginners make\n3. A 30-day roadmap using your current course pathways\n4. Which certification path to pick first\n5. Clear CTA to pricing and starter kit\n\n## CTA\nInvite readers to start with the free starter kit and then enroll in the matching pathway.\n`;
}

function generateClassDraft(courses, date) {
  const selected = pickCourses(courses, 2);
  const lessons = selected
    .map((c) => {
      const firstLesson = Array.isArray(c.lessons) && c.lessons.length ? c.lessons[0].title : 'Intro lesson';
      return `- ${c.title}: add a scenario lab and quiz rationale to ${firstLesson}`;
    })
    .join('\n');

  return `# Class Content Draft - ${date}\n\n## Objective\nIncrease completion and engagement by adding practical scenario depth.\n\n## Suggested Updates\n${lessons}\n\n## Lesson Block Template\n- 2-minute hook (real-world situation)\n- 1 practical lab objective\n- 3-question comprehension check with answer rationale\n- recap + next lesson bridge\n\n## Publish Plan\nApply these updates to one beginner and one intermediate pathway this week.\n`;
}

function generateProductDraft(courses, date) {
  const selected = pickCourses(courses, 3);
  const ideas = selected.map((c, i) => `${i + 1}. ${c.title} Accelerator Pack: workbook + lab checklist + interview question bank`).join('\n');

  return `# Product and Service Ideas - ${date}\n\n## Goal\nCreate monetizable offers beyond base course access.\n\n## Product Concepts\n${ideas}\n\n## Service Concepts\n- 60-minute Certification Strategy Session (1:1)\n- Resume and LinkedIn Cloud Rebrand Sprint\n- Team Upskilling Starter Package for small businesses\n\n## Fast Validation\n- Add waitlist form block to pricing page\n- Track clicks with data-analytics-event\n- Launch one offer as a 2-week pilot\n`;
}

function generateMarketingDraft(courses, date) {
  const selected = pickCourses(courses, 1)[0];
  const courseName = selected ? selected.title : 'Cloud Fundamentals 101';

  return `# Daily Marketing Copy - ${date}\n\n## LinkedIn Post\nIf you are serious about cloud in 2026, stop collecting random tutorials and start following a focused pathway.\n\nToday I recommend: ${courseName}.\n\nYou get clear lesson goals, practical labs, and cert-aligned skills that map to real roles.\n\nStart here: https://thedopecloudteacher.org/courses.html\n\n## Email Snippet\nSubject: Your next cloud move this week\n\nThis week focus on one lesson, one lab, and one portfolio note. Consistency beats overwhelm.\n\nOpen your pathway and take the next step today.\n\n## Short CTA Variants\n- Start your cloud pathway today\n- Build skills employers can verify\n- One lesson today, better role tomorrow\n`;
}

function generateReport(qa, files, date) {
  const lines = [];
  lines.push(`# Daily Growth Report - ${date}`);
  lines.push('');
  lines.push('## QA Summary');
  lines.push(`- HTML pages scanned: ${files.htmlCount}`);
  lines.push(`- Missing title: ${qa.missing.title.length}`);
  lines.push(`- Missing description: ${qa.missing.description.length}`);
  lines.push(`- Missing canonical: ${qa.missing.canonical.length}`);
  lines.push(`- Missing analytics loaders: ${qa.missing.analytics.length}`);
  lines.push(`- Broken internal links (sample): ${qa.brokenInternalLinks.length}`);
  lines.push('');

  if (qa.missing.analytics.length) {
    lines.push('### Pages Missing Analytics Loaders');
    qa.missing.analytics.slice(0, 40).forEach((item) => lines.push(`- ${item}`));
    lines.push('');
  }

  if (qa.brokenInternalLinks.length) {
    lines.push('### Broken Internal Link Samples');
    qa.brokenInternalLinks.slice(0, 40).forEach((item) => lines.push(`- ${item}`));
    lines.push('');
  }

  lines.push('## Draft Artifacts Generated');
  lines.push(`- Blog draft: ${toRel(files.blogFile)}`);
  lines.push(`- Class content draft: ${toRel(files.classFile)}`);
  lines.push(`- Product/service ideas: ${toRel(files.productFile)}`);
  lines.push(`- Marketing copy: ${toRel(files.marketingFile)}`);
  lines.push('');

  lines.push('## Recommended Actions Today');
  lines.push('- Publish one social post from the marketing draft.');
  lines.push('- Turn one blog draft into a scheduled post.');
  lines.push('- Add one product/service offer test block to pricing page.');
  lines.push('- Fix top 5 broken links from this report.');
  lines.push('');

  return lines.join('\n');
}

function toRel(fullPath) {
  return path.relative(root, fullPath).replace(/\\/g, '/');
}
