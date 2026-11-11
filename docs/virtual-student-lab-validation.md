# Virtual Student Lab — launch validation (2026-11-11)

## Implemented on this branch
- `dope-cloud-teacher/practice-lab.html`: mobile-responsive, accessible practice page with official site logo.
- `dope-cloud-teacher/js/virtual-student-lab.js`: five fictional learner scenarios with selectable responses and coaching.
- `dope-cloud-teacher/index.html`: main navigation and homepage feature link to the lab.
- Existing three homepage pathways, course prices, registrations, and payments were not modified.

## Verification performed
- Confirmed all three files exist on the feature branch.
- Confirmed homepage contains `/practice-lab.html` links.
- Confirmed lab page loads `/js/virtual-student-lab.js` by source reference.
- Confirmed script defines five personas, scenario choices, feedback, and restart controls.
- These are **source checks**, not browser or deployment tests.

## Required before production merge
- [ ] Open GitHub PR preview or local static server and verify all five scenarios on mobile and desktop.
- [ ] Verify image/logo, stylesheet and JavaScript requests return HTTP 200.
- [ ] Confirm keyboard-only operation, focus visibility, screen-reader feedback, and color contrast.
- [ ] Check navigation and existing online/local/invite pathways.
- [ ] Verify existing registration and checkout links without completing a transaction.
- [ ] Verify Azure Static Web Apps preview and production deployments; confirm custom domain matches intended Azure resource.
- [ ] Confirm content and legal/privacy language with site owner.

## Scope and limitations
This is a **free, rule-based practice preview**, not a generative-AI chat, graded assessment, or paid product. No student information is collected by this feature. No production deployment is claimed.
