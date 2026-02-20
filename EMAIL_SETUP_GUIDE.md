# Email & Lead Capture Implementation Guide

## Overview
The system now captures leads with **double opt-in verification**, sends confirmation emails, and provides an admin dashboard for lead management.

---

## Setup (Backend)

### 1. Install Nodemailer
```bash
cd backend
npm install nodemailer
```

### 2. Configure Email in `.env`
Choose your email provider. Examples:

#### **Option A: Gmail (Recommended for testing)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your_app_password_here
EMAIL_FROM=your-email@gmail.com
```
*Note: Use [Gmail App Passwords](https://myaccount.google.com/apppasswords), not your main password.*

#### **Option B: SendGrid**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=SG.your_sendgrid_api_key_here
EMAIL_FROM=noreply@thedopecloudteacher.com
```

#### **Option C: AWS SES**
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_ses_username
SMTP_PASSWORD=your_ses_password
EMAIL_FROM=noreply@thedopecloudteacher.com
```

#### **Option D: Mailgun**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your_mailgun_password
EMAIL_FROM=noreply@your-domain.mailgun.org
```

### 3. Set Frontend URL
```env
FRONTEND_URL=https://thedopecloudteacher.com
```

### 4. (Optional) Configure Webhook
If you want to use Mailchimp/ConvertKit/Zapier instead of direct email:
```env
LEAD_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-hook-id/
```
*If set, webhooks take priority over direct email.*

---

## How It Works

### **Lead Capture Flow**
1. User enters email on homepage/pricing/courses page
2. Frontend submits to `/api/leads`
3. Backend generates verification token and saves lead
4. **Email sent** (either direct or via webhook):
   - Verification link with token
   - User clicks link in email
5. Frontend redirects to `verify.html?token=xyz`
6. Verification confirms email and sends welcome email
7. User accesses cloud-career-starter-kit.html

### **Email Templates**
- `verifyEmail` - Confirmation email with verification link
- `welcomeEmail` - Welcome email after verification

---

## Admin Dashboard

### Access the Leads Admin
- Navigate to: `/leads-admin.html`
- Must be logged in as an **admin user**

### Set Up Admin User
In your database, create/update a user:
```bash
sqlite3 database.sqlite
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

Or insert a new admin:
```sql
INSERT INTO users (email, password_hash, name, role) VALUES (
  'admin@thedopecloudteacher.com',
  'hashed_password_here',
  'Admin User',
  'admin'
);
```

### Admin Features
- **View all leads** - List with source, status, dates
- **Download CSV** - Export all leads for CRM/email list
- **Filter by status** - Verified vs. Pending
- **Search** - Find leads by email (via limit/offset)

---

## API Endpoints

### Create Lead (Public)
```
POST /api/leads
Content-Type: application/json

{
  "email": "user@example.com",
  "source": "home-starter-kit",
  "page": "/index.html",
  "referrer": "google.com"
}

Response:
{
  "success": true,
  "status": "created",
  "verifyRequired": true
}
```

### Verify Email (Public)
```
GET /api/leads/verify?token=abc123def456...

Response:
{
  "success": true,
  "status": "verified"
}
```

### List Leads (Admin Only)
```
GET /api/leads?limit=100&offset=0
Authorization: Bearer <token>

Response:
{
  "leads": [...],
  "total": 500,
  "limit": 100,
  "offset": 0
}
```

### Export Leads (Admin Only)
```
GET /api/leads/export?format=csv
Authorization: Bearer <token>

Response: CSV file download
```

---

## Frontend Integration

### Lead Capture Forms
Forms auto-wire to lead capture when they have:
```html
<form data-lead-capture="true" data-success-id="successMsg" data-source="page-name" data-redirect="destination.html">
  <input type="email" name="email" required>
  <button type="submit">Submit</button>
</form>
<div id="successMsg" style="display:none;">Check your email...</div>
```

### Event Tracking
CTAs now track with analytics:
```html
<a href="pricing.html" data-analytics-event="cta_click" data-analytics-label="hero-pricing">View Pricing</a>
<button data-analytics-event="membership_start" data-analytics-label="pro">Start Pro</button>
```

---

## Troubleshooting

### Emails Not Sending
1. Check `.env` has valid `SMTP_USER` and `SMTP_PASSWORD`
2. Verify `EMAIL_FROM` matches sender domain (Gmail requires match)
3. Check server logs: `npm start`
4. Test SMTP manually:
   ```bash
   node -e "
   const nodemailer = require('nodemailer');
   const transporter = nodemailer.createTransport({...});
   transporter.verify((err, valid) => console.log(err || 'Valid'));
   "
   ```

### Verification Link Not Working
1. Verify `FRONTEND_URL` in `.env` is correct
2. Check token matches in database: `SELECT verify_token, verified_at FROM leads WHERE email = '...'`
3. Ensure `verify.html` is accessible at that URL

### Admin Can't Access Leads Dashboard
1. Check user role: `SELECT role FROM users WHERE id = 1`
2. Must be logged in (check `localStorage.dct_token`)
3. Token must still be valid

---

## Next Steps
- [ ] Integrate with Mailchimp for automated sequences
- [ ] Add email templates for course upsells
- [ ] Set up abandoned cart emails
- [ ] Track email open rates with pixel
- [ ] A/B test subject lines in emails

