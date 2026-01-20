# ⚡ Quick Start Checklist

## Before Deploying (30 minutes)

### 1. Stripe Setup (15 min)
- [ ] Log into https://dashboard.stripe.com
- [ ] Switch to **Live Mode** (top right toggle)
- [ ] Copy **Live API Keys** from Developers → API Keys
- [ ] Create **Webhook** at Developers → Webhooks
  - URL: `https://your-backend-url/api/webhook`
  - Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
- [ ] Copy **Webhook Secret**

### 2. Environment Configuration (5 min)
- [ ] Create `backend/.env` file
- [ ] Add Stripe Live keys (sk_live_, pk_live_, whsec_)
- [ ] Generate JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- [ ] Set ADMIN_EMAIL=thedopecloudteacher@gmail.com

### 3. Gmail Email Setup (10 min)
- [ ] Go to https://myaccount.google.com/security
- [ ] Enable 2-Step Verification
- [ ] Generate App Password for Mail
- [ ] Add to .env as SMTP_PASS

## Deploy Backend (5 min)
```powershell
cd backend
npm install
npm run init-db  # Creates subscriptions table
npm start  # Test locally first
```

## Deploy Frontend (5 min)
```powershell
git add .
git commit -m "Add membership pricing and Stripe production config"
git push origin main
```

Watch deployment at: https://github.com/YOUR_USERNAME/thedopecloudteacher-website/actions

## After Deployment (10 min)

### 1. Update URLs in .env
- [ ] Update FRONTEND_URL to your live site URL
- [ ] Update CORS_ORIGIN to match
- [ ] Redeploy backend with new URLs

### 2. Test Purchase Flow
- [ ] Visit pricing page
- [ ] Click "Start Student Membership"
- [ ] Use REAL credit card (test cards don't work in live mode!)
- [ ] Complete purchase
- [ ] Verify redirect to dashboard
- [ ] Check Stripe dashboard for payment
- [ ] Verify subscription in database

### 3. Verify Webhook
- [ ] Make a test purchase
- [ ] Go to Stripe → Developers → Webhooks
- [ ] Click your webhook endpoint
- [ ] Check "Recent events" - should show checkout.session.completed
- [ ] If not receiving, verify webhook URL is publicly accessible

## Pricing Configured

✅ **Monthly Memberships:**
- Student: $47/month - All courses
- Pro: $97/month - + Mentorship
- Career: $497/month - + Career support

✅ **Individual Courses:** $297-$797 one-time

## What's Ready

- ✅ Stripe production integration
- ✅ Recurring subscription support
- ✅ One-time course purchases
- ✅ Email to thedopecloudteacher@gmail.com
- ✅ Professional navigation (lesson 1 complete)
- ✅ Database with subscriptions table
- ✅ Webhook handling for subscription events

## Common Issues

**Webhook not receiving events?**
- Verify URL is publicly accessible (not localhost)
- Check webhook secret matches .env
- Ensure backend is deployed and running

**Payments failing?**
- Verify using LIVE keys (not test keys)
- Check Stripe dashboard for errors
- Verify CORS_ORIGIN matches frontend URL exactly

**Emails not sending?**
- Use Gmail App Password (not regular password)
- Verify 2-Step Verification enabled
- Check SMTP settings in .env

## Support Resources

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Test a Webhook**: https://dashboard.stripe.com/test/webhooks
- **Stripe Docs**: https://stripe.com/docs
- **Gmail App Passwords**: https://myaccount.google.com/apppasswords

## Next Steps After Launch

1. Add navigation to lessons 2-10 (use lesson1.html as template)
2. Set up customer portal for subscription management
3. Add transactional emails for purchase confirmations
4. Create Terms of Service and Privacy Policy pages
5. Add testimonials and success stories
6. Set up analytics (Google Analytics, Plausible, etc.)
7. Create marketing materials
8. Schedule PG Parks demo! 🎉

---

**Everything is ready to accept real payments!**
Just add your Stripe live keys and deploy. 🚀
