# DCT Integration Setup

This project can be connected to Stripe, Gumroad, and external automation tools from one backend deployment.

## 1) Stripe (native checkout)
1. In Stripe Dashboard, create products/prices for your plans.
2. Add values to backend environment variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
3. Configure webhook endpoint in Stripe:
   - URL: `https://<your-domain>/api/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Restart backend and validate by creating a test checkout.

## 2) Gumroad (storefront fallback and hosted links)
1. Set `GUMROAD_STORE_URL` to your store root.
2. Verify product links in frontend auth/purchase flow (`js/auth-system.js`).
3. Keep Gumroad links as fallback if Stripe is unavailable.

## 3) Beautiful.ai, Canva, Claude, Manus
Direct account sign-in cannot be completed from local code changes alone; each platform requires your own auth session/API credentials.

Recommended pattern:
1. Generate API token or app credentials in each platform account.
2. Save keys in backend environment variables:
   - `BEAUTIFUL_AI_API_KEY`
   - `CANVA_API_KEY`
   - `CLAUDE_API_KEY`
   - `MANUS_API_KEY`
3. Connect each platform to your workflow tool (Zapier/Make/n8n) and forward lead/course events from `LEAD_WEBHOOK_URL`.
4. Keep tokens server-side only; never expose them in frontend HTML/JS.

## 4) Quick verification checklist
- Stripe checkout creates a session and returns URL.
- Stripe webhook writes purchase/subscription rows.
- Gumroad links open correct products.
- Lead webhook receives test payloads from `/api/lead-magnet` and `/api/subscribe`.
- No API keys are committed to git.
