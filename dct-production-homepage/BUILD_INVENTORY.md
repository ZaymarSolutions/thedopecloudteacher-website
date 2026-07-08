# DCT Production Homepage Build Inventory

## Scope
- App shell: `src/App.jsx`
- Shared styles: `src/styles.css`
- Components: navbar, hero, learning paths, learning experiences, PG Parks programs, academy, workshops, student success, footer
- Assets currently referenced: `/assets/dct-hero-image.svg`

## Existing Pages and Routes
- Single-page homepage with anchored sections
- No client-side router is currently in use
- External registration routes point to PG County Parks & Planning and mailto workflows

## Existing Components
- `Navbar.jsx`
- `HeroSection.jsx`
- `FeaturedLearningPaths.jsx`
- `LearningExperiences.jsx`
- `PgParksProgramsSection.jsx`
- `DctAcademySection.jsx`
- `WorkshopsSection.jsx`
- `StudentSuccessSection.jsx`
- `CtaFooter.jsx`

## Reused Assets and Content
- DCT hero image SVG
- Course-path copy for cloud, AI, security, and career tracks
- PG Parks registration links and workshop requests
- Academy and student-success messaging

## Duplicate Work Check
- `FeaturedLearningPaths.jsx` and `LearningExperiences.jsx` already existed but were not wired into `App.jsx`
- Academy and PG Parks delivery models were already represented in the codebase and should be improved, not duplicated

## Technical Debt
- The app is still section-based rather than componentized into a formal design system folder structure
- The homepage uses a single styles file instead of tokenized component-scoped styling
- Asset handling is limited to one hero illustration reference

## Sprint 1 Build Priority
1. Keep the homepage sections aligned to the academy story
2. Reuse the existing components instead of duplicating them
3. Improve visual hierarchy, responsiveness, and content clarity
4. Expand into course detail pages and asset-specific banners in later sprints