# DCT Enrollment-to-Learning Delivery Contract (implementation specification)
Status: draft; NOT evidence that production payments or email are functioning.

## Products (USD)
- Level 1 standalone: $25
- Levels 1+2 bundle: $45
- Levels 1+2+3 bundle: $65
- Career Readiness: $99; includes Levels 1–3, downloadable exam study guidance, and ONE 30-minute career-readiness consultation (subject to scheduling availability).
- Levels must be complete standalone classes, not individual video clips. Show precise entitlements before checkout. Never claim a certification or job guarantee.

## Secure workflow
1. Student selects an available product; show contents, format, duration, accessibility, refund terms, and exact price.
2. Student signs in or creates an account; server creates pending order with immutable product/price identifiers.
3. Server starts Stripe checkout; no browser-supplied amount is trusted.
4. Stripe sends signed payment webhook; verify signature and event type, check paid amount/currency and order match, idempotently mark order paid.
5. In one consistent backend operation, grant user course entitlements. For bundles grant each level separately. Never grant access based on redirect query parameters.
6. Queue transactional welcome email exactly once (retry safely on transient failure); receipt is provided by payment system.
7. Welcome email contains order summary, dashboard link, entitled courses, resource index, support contact and access instructions. Do not put public, unrestricted paid content URLs in email; links should resolve through authenticated student dashboard.
8. Dashboard displays modules, exercises, downloads, quiz, progress, next level and (for Career Readiness) consultation scheduling instructions.
9. When course is completed, persist result and make next-level offer; do not auto-charge.
10. Refunds and chargebacks trigger entitlement review according to published policy.

## Email draft
Subject: Welcome to The Dope Cloud Teacher — your learning starts here
Hello {{first_name}},
Thanks for enrolling in {{product_name}}! Your learning materials are ready in your secure DCT dashboard: {{dashboard_url}}.
Start with your course overview, then follow the lessons, activities, knowledge check and downloadable study packet. Your purchase includes: {{entitlement_summary}}.
If you purchased Career Readiness, your dashboard also includes instructions for booking your 30-minute consultation.
Need help accessing your course? Contact {{support_email}}.
See you in class,
The Dope Cloud Teacher Team

## Go-live acceptance tests
- Test checkout for all four prices with Stripe test mode, including failed/canceled payments
- Confirm webhook verification, idempotency and exact product entitlements
- Confirm welcome email arrives and links authenticate correctly
- Confirm unauthorized users cannot access paid resources
- Confirm student progress and assessment survive logout/login
- Confirm consultation fulfillment instructions for $99 package
- Confirm branded accessible responsive layouts, keyboard use, reduced motion, and readable navigation
- Confirm no incomplete product is purchasable and no stale $97 Gumroad path remains
- Investigate and resolve failing full-stack deployment before production release
