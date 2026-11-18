# DCT isolated Stripe checkout sandbox

This branch is **NOT** for production deployment or merging to `main`. It runs solely in a distinct Railway project, with a separate SQLite volume, distinct sandbox URL and Stripe **test-mode** API keys.

## Infrastructure

- Railway project: `DCT Stripe Checkout Sandbox`
- Railway service: `dct-stripe-test-backend`
- Environment: `sandbox`
- Root directory: `backend`
- Public URL: `https://dct-stripe-test-backend-sandbox.up.railway.app`
- Enrollment URL: `https://dct-stripe-test-backend-sandbox.up.railway.app/hub/enroll.html`
- Database file: `/data/sandbox-dct.sqlite` on a dedicated Railway volume, not production's `/data/database.sqlite`
- Branch: `sandbox/dct-stripe-checkout-test-20261117`

## Required Railway variables

- `DCT_PAYMENT_SANDBOX=true` (**required**, fail closed otherwise)
- `STRIPE_SECRET_KEY=sk_test_...` (**must** be obtained from the shared Stripe account in test mode; do not paste keys into GitHub/chat)
- `STRIPE_WEBHOOK_SECRET=whsec_...` (configured privately with the test webhook endpoint)
- `JWT_SECRET` (dedicated sandbox-only secret, configured privately)
- `FRONTEND_URL=https://dct-stripe-test-backend-sandbox.up.railway.app`
- `DATABASE_PATH=/data/sandbox-dct.sqlite`
- `NODE_ENV=production`, `PORT=3000`, `HUB_CHECKOUT_ENABLED=true`

## Test steps

1. Verify Railway deployment and `/health`.
2. Go to `/hub/enroll.html`, create a *sandbox-only* learner account.
3. Select the test checkout button. It should open Stripe Checkout with **TEST MODE** and **$25.00 USD**.
4. Use Stripe test card **4242 4242 4242 4242** with a future expiration, any CVC and test billing details. **Never use a real card.**
5. On return to `/hub/classroom.html`, check the confirmation shows a protected sandbox lesson is unlocked.
6. Confirm the Stripe test-mode Dashboard shows the test payment; check test webhook deliveries.
7. Confirm production DCT revenue and its production `/data/database.sqlite` are unchanged.

## Safety notes

- Do not point live `thedopecloudteacher.org` at the sandbox.
- Do not copy production DB or live API keys into this project.
- The sandbox branch intentionally refuses to start with `sk_live_...`, a production URL, or when the explicit sandbox flag is absent.
- Test payments are **not** real sales and must never trigger live GA4 purchases.
- Do not merge sandbox-only test-mode verification into `main`.
