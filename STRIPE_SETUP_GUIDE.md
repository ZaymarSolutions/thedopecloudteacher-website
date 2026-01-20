# 💳 Stripe Production Setup Guide

## Step 1: Activate Your Stripe Account

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Complete your account verification
3. Add bank account for payouts
4. Enable "Test mode" toggle OFF to use live mode

## Step 2: Get Your Live API Keys

1. Go to [Developers → API Keys](https://dashboard.stripe.com/apikeys)
2. Find your **Live** API keys (NOT test keys)
3. Copy:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`) - Click "Reveal live key token"

## Step 3: Update Backend Configuration

Add to `backend/.env`:

```env
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
```

## Step 4: Set Up Webhook for Real-Time Updates

### Create Webhook Endpoint

1. Go to [Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. **Endpoint URL**: `https://YOUR_BACKEND_URL/api/webhook`
   - Example: `https://your-backend.azurewebsites.net/api/webhook`
   - Or: `https://your-backend.railway.app/api/webhook`

### Select Events to Listen For

Check these events:
- ✅ `checkout.session.completed`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`

### Get Webhook Secret

1. After creating, click on your webhook
2. Click **"Reveal"** under "Signing secret"
3. Copy the secret (starts with `whsec_`)
4. Add to `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Step 5: Update Frontend with Publishable Key

Update `dope-cloud-teacher/js/auth-system.js`:

```javascript
// Add near top of file
const STRIPE_PUBLISHABLE_KEY = 'pk_live_your_publishable_key_here';
```

## Step 6: Test Production Payments

### Test Credit Card Numbers (Stripe Test Mode)
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### For LIVE Payments
Use real credit cards! Money will be charged.

## Step 7: Email Configuration

### Option 1: Gmail (Quick Setup)

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification → App Passwords
3. Generate an App Password for "Mail"
4. Add to `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=thedopecloudteacher@gmail.com
SMTP_PASS=your_16_char_app_password
EMAIL_FROM=thedopecloudteacher@gmail.com
```

### Option 2: SendGrid (Recommended for Production)

1. Sign up at [https://sendgrid.com](https://sendgrid.com)
2. Create API key
3. Add to `.env`:

```env
SENDGRID_API_KEY=SG.your_sendgrid_api_key
EMAIL_FROM=thedopecloudteacher@gmail.com
```

## Step 8: Configure Pricing

Your current pricing structure:

### Membership Plans (Recurring)
- **Student**: $47/month - All courses access
- **Pro**: $97/month - + Mentorship & priority support
- **Career Accelerator**: $497/month - Ultimate career support

### Individual Courses (One-time)
- Cloud Fundamentals 101: $297
- Cloud Architect Pathway: $797
- Cloud Security Engineer: $697
- DevOps & Automation: $597
- Data Engineering: $547
- Cloud Developer: $497

## Step 9: Security Checklist

✅ **JWT_SECRET** - Generated secure random string (64+ characters)
✅ **STRIPE_SECRET_KEY** - Using live key (sk_live_)
✅ **STRIPE_WEBHOOK_SECRET** - Webhook configured
✅ **CORS_ORIGIN** - Set to your frontend domain
✅ **FRONTEND_URL** - Set to your frontend domain
✅ **ADMIN_EMAIL** - Set to thedopecloudteacher@gmail.com
✅ **Database backups** - Regular backups enabled
✅ **HTTPS** - SSL certificate installed
✅ **Rate limiting** - Enabled (default: 100 req/15min)

## Step 10: Test Before Launch

### Test Flow:
1. Register new test user
2. Purchase membership ($47/month)
3. Verify redirect to dashboard
4. Check Stripe dashboard for payment
5. Verify webhook received (backend logs)
6. Confirm user has access to all courses
7. Test subscription cancellation
8. Purchase individual course
9. Verify certificate generation

## Troubleshooting

### Payment Not Processing
- ✅ Check Stripe dashboard for errors
- ✅ Verify live keys (not test keys)
- ✅ Check browser console for errors
- ✅ Ensure CORS_ORIGIN matches frontend URL

### Webhook Not Receiving Events
- ✅ Verify webhook URL is publicly accessible
- ✅ Check endpoint URL has `/api/webhook`
- ✅ Verify STRIPE_WEBHOOK_SECRET matches dashboard
- ✅ Check backend logs for errors

### Email Not Sending
- ✅ Verify Gmail App Password (not regular password)
- ✅ Check SMTP settings
- ✅ Verify "Less secure app access" enabled (if using Gmail)
- ✅ Check backend email logs

## Production Checklist

Before going live:

- [ ] Stripe account verified and activated
- [ ] Live API keys configured
- [ ] Webhook endpoint created and tested
- [ ] Frontend updated with live publishable key
- [ ] Email configuration tested
- [ ] Test purchase completed successfully
- [ ] Database backed up
- [ ] SSL certificate installed
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Refund policy documented
- [ ] Customer support email monitored

## Support

Need help? Contact:
- Email: thedopecloudteacher@gmail.com
- Stripe Support: [https://support.stripe.com](https://support.stripe.com)

## Quick Reference

- Stripe Dashboard: https://dashboard.stripe.com
- API Keys: https://dashboard.stripe.com/apikeys
- Webhooks: https://dashboard.stripe.com/webhooks
- Test Cards: https://stripe.com/docs/testing
- Stripe Docs: https://stripe.com/docs
