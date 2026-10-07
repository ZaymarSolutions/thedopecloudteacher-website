# DCT paid classroom and instructor readiness deployment

## Public site
Nine public course pages include the overview, first lesson and up to three sample questions. The complete source files, quiz JSON and content-generating build files have been removed from static hosting. Search indexes contain course metadata only. Azure routing explicitly blocks the removed folders and prevents course previews being cached as old full lessons.

Full course content was previously committed to the public repository. Removing it now does not remove historical commits or downloaded copies. A private content store protects future access, but cannot recall those copies. Do not commit the private bundle, original ZIP or a database to this repository.

## Required backend release
The existing Railway deployment workflow previously failed with “Project not found. Run railway link.” Repair the deployment target/token and confirm the backend uses a persistent private volume with an absolute DATABASE_PATH. JWT_SECRET and the existing Stripe key/webhook secret must be held in the host's private configuration. Restrict key permissions to the required Checkout, PaymentIntent and Charge operations where possible.

1. Deploy backend/server.js and backend/hub-access.js with the existing supported dependencies.
2. Copy private-course-content.json directly to a temporary private location on the backend host; do not put it under the static website or in GitHub. It is provided in the private deployment bundle.
3. Run `node import-private-courses.js /private/path/private-course-content.json` from backend, using the existing persistent DATABASE_PATH. The importer validates all nine course IDs, updates catalog prices to the approved source prices, and preserves the course HTML/answers unchanged.
4. Delete the temporary import file once the private database is verified; retain the private source bundle separately. Keep database backups private.
5. Confirm the signed Stripe webhook is registered for checkout.session.completed and checkout.session.async_payment_succeeded. Only paid live sessions create course purchases. Duplicate events do not create duplicate purchases.
6. Keep HUB_CHECKOUT_ENABLED unset until the private courses and signed webhook are verified. Set it to `true` only when enrollment can be delivered. Cohort/organizational prices remain contact-based; the frontend does not manufacture payment plans or free availability.
7. Validate an authenticated paid enrollment, a different account, an unpaid account, and refund/dispute revocation before announcing the classroom as available.

The content endpoint requires JWT authentication and rechecks the buyer's Stripe PaymentIntent and latest Charge before returning any full HTML. It denies test-mode, unpaid, expired, wrong-user, insufficient-payment, refunded and disputed records. Processor errors fail closed. Response caching is disabled. The browser's course iframe is sandboxed without same-origin access and receives no login token.

Existing Cloud 101 Gumroad checkout remains exactly unchanged. Gumroad purchases are delivered through Gumroad; this implementation does not silently treat a Gumroad receipt as a verified Stripe enrollment or promise an on-site unlock. A verified Gumroad entitlement integration or an approved private migration is a separate required step if that product should unlock the on-site classroom.

## Instructor onboarding
/teach/onboarding.html contains six preparation activities, a browser-local checklist, official W-4/I-9 links for the employee track and W-9 for the contractor track. DCT confirms the work arrangement in a written agreement; choosing a dropdown option does not classify a worker. No tax forms, IDs, bank details or SSNs are collected by the static page, its downloads, or the readiness API.

Logged-in learners can submit the six preparation IDs to /api/instructors/readiness. The record is self-reported preparation and remains pending_review. Only an authenticated administrator can view all readiness records or record approval using /api/admin/instructors/:userId/approve after affirming practiceReviewed, documentsReviewed and agreementConfirmed. Actual documents belong in a separately configured private personnel service; this release does not create that service. An approval record does not create a user role, teaching assignment or employment agreement.

If the backend is unavailable, the UI explicitly says submission failed and gives the contact path. It never displays a successful submission based only on local checkboxes.

Official sources: https://www.irs.gov/forms-pubs/about-form-w-4 ; https://www.irs.gov/forms-pubs/about-form-w-9 ; https://www.uscis.gov/i-9 ; https://www.uscis.gov/i-9-central/complete-correct-form-i-9/exceptions ; https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee ; https://docs.stripe.com/webhooks ; https://docs.stripe.com/checkout/fulfillment .
