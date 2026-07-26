# The Dope Cloud Teacher Academy Build Tracker

## Current Rule
Nothing new gets added until this tracker is updated.

Every feature must have:
- Status
- File path
- Date added
- Notes
- Next action

---

## Status Legend

- ✅ Implemented
- 🟡 Copied but not tested
- 🔴 Not started
- 🛠 Needs fixing
- 🚀 Ready to improve

---

# Sprint 1: Foundation

## 1. Repository Setup
Status: 🔴 Not started  
Files:
- package.json
- src/
- public/

Next action:
Audit repo structure.

---

## 2. Homepage
Status: 🟡 Copied but not tested  
Files:
- src/pages/Home.tsx
- src/components/home/Hero.tsx
- src/components/home/FeaturedLearningPaths.tsx
- src/components/layout/Navbar.tsx
- src/components/layout/Footer.tsx

Next action:
Confirm which files actually exist in VS Code.

---

## 3. Design System
Status: 🔴 Not started  
Files:
- src/components/ui/Button.tsx
- src/components/ui/Card.tsx
- src/components/ui/Badge.tsx
- src/components/ui/SectionHeader.tsx

Next action:
Build reusable UI components.

---

## 4. Course Catalog
Status: 🔴 Not started  
Files:
- src/pages/CourseCatalog.tsx
- src/components/courses/CourseCard.tsx
- src/data/courses.ts

Next action:
Build course catalog.

---

## 5. Student Dashboard
Status: 🔴 Not started  
Files:
- src/pages/Dashboard.tsx
- src/components/dashboard/ProgressCard.tsx
- src/components/dashboard/CourseProgress.tsx

Next action:
Build dashboard after catalog.

---

## 6. Azure Lab Center
Status: 🔴 Not started  
Files:
- src/pages/AzureLabs.tsx
- src/components/labs/LabCard.tsx
- src/data/labs.ts

Next action:
Build after dashboard.

---

# Completed Assets

## Images
Add each image here after downloading/adding to repo.

| Asset | File Name | Location | Status | Notes |
|---|---|---|---|---|
| Homepage Hero |  | public/images/ | 🔴 |  |
| Cloud & AI Banner |  | public/images/ | 🔴 |  |
| Azure Security Banner |  | public/images/ | 🔴 |  |

---

# Questions / Problems

Use this section when something breaks.

Example:
- Navbar not showing
- Route not loading
- Tailwind not applying
- Image path broken

## New workflow going forward

Every time I give you code, I’ll format it like this:

```
BUILD ITEM: Course Catalog
STATUS: New
ACTION: Add these files
FILES:
- src/pages/CourseCatalog.tsx
- src/components/courses/CourseCard.tsx
- src/data/courses.ts

AFTER PASTING:
1. Run npm run dev
2. Confirm page loads
3. Update DCT_BUILD_TRACKER.md to 🟡 Copied but not tested
4. Once working, update to ✅ Implemented
```

##