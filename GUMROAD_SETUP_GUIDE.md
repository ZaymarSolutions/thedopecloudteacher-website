# 🛒 Gumroad Integration Guide for The Dope Cloud Teacher

## Step 1: Create Your Gumroad Account

1. Go to https://gumroad.com/
2. Click "Start Selling" (top right)
3. Sign up with email or Google account
4. Complete your profile:
   - Business name: "The Dope Cloud Teacher"
   - Profile URL: gumroad.com/thedopecloudteacher
   - Add profile picture (use your logo)
   - Add cover image
   - Write bio about your cloud training platform

## Step 2: Set Up Your Products (Courses)

For each course, create a Gumroad product:

### Cloud Fundamentals 101 ($297)
1. Click "+ New Product" → "Digital Product"
2. **Product Name:** Cloud Fundamentals 101 - Complete Course
3. **Price:** $297 (or $14/month membership alternative)
4. **Description:** Copy from your course page
5. **Product Files:** Upload any PDFs, resources, or course materials
6. **Access Link:** Point to your course page with access code
7. **Thumbnail:** Create course thumbnail image

Repeat for all 7 courses:
- Cloud Architect Pathway ($697)
- Cloud Security Engineer ($597)
- DevOps & Automation ($597)
- Introduction to AI/ML ($497)
- Cloud Data Engineering ($597)
- Serverless & Microservices ($497)

### Membership Options ($14/month)
1. Create "Membership" product type
2. Set up 3 tiers:
   - Student Membership - $14/month
   - Pro Membership - $14/month
   - Career Accelerator - $14/month
3. Enable "Recurring charge"
4. Set billing cycle to "Monthly"

## Step 3: Get Your Gumroad Links & Overlay Code

### Individual Course Links
After creating each product, you'll get a link like:
```
https://thedopecloudteacher.gumroad.com/l/cloud-fundamentals-101
```

### Gumroad Overlay (Recommended)
Use Gumroad Overlay for seamless checkout WITHOUT leaving your site:

```html
<!-- Add this ONCE before closing </body> tag -->
<script src="https://gumroad.com/js/gumroad.js"></script>

<!-- Use this for buy buttons -->
<a class="gumroad-button" href="https://thedopecloudteacher.gumroad.com/l/cloud-fundamentals-101">
  Enroll Now for $297
</a>
```

### Gumroad Embed (Alternative)
Embed checkout directly on your page:
```html
<script src="https://gumroad.com/js/gumroad-embed.js"></script>
<div class="gumroad-product-embed" data-gumroad-product-id="cloud-fundamentals-101"></div>
```

## Step 4: Update Your Website Integration

### A. Add Gumroad Script (Global)
Add to all pages where you have buy buttons:

**In courses.html, pricing.html, dashboard.html:**
```html
<!-- Before closing </body> tag -->
<script src="https://gumroad.com/js/gumroad.js"></script>
```

### B. Update Purchase Functions

**Replace `enrollInCourse()` function:**
```javascript
function enrollInCourse(courseId) {
  const gumroadLinks = {
    'cloud-fundamentals-101': 'https://thedopecloudteacher.gumroad.com/l/cloud-fundamentals-101',
    'cloud-architect-pathway': 'https://thedopecloudteacher.gumroad.com/l/cloud-architect',
    'cloud-security-engineer': 'https://thedopecloudteacher.gumroad.com/l/cloud-security',
    'devops-automation': 'https://thedopecloudteacher.gumroad.com/l/devops-automation',
    'intro-to-ai-ml': 'https://thedopecloudteacher.gumroad.com/l/ai-ml-intro',
    'data-engineering-cloud': 'https://thedopecloudteacher.gumroad.com/l/data-engineering',
    'serverless-microservices': 'https://thedopecloudteacher.gumroad.com/l/serverless-microservices'
  };
  
  window.open(gumroadLinks[courseId], '_blank');
}
```

## Step 5: Set Up Course Access/Delivery

### Option A: License Key System (Simple)
1. In Gumroad product settings, enable "Generate unique license keys"
2. Customer receives license key after purchase
3. They enter key on your dashboard to unlock course
4. You validate key using Gumroad API

### Option B: Webhook Integration (Advanced)
1. In Gumroad settings → Advanced → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/gumroad-webhook`
3. When purchase occurs, Gumroad sends data to your server
4. Your backend creates user account and grants access
5. Customer receives email with login credentials

### Option C: Email Delivery (Easiest)
1. Upload course materials as ZIP file to Gumroad
2. Customer receives download link via email immediately
3. Include PDF with login instructions and access code
4. They self-register on your platform with access code

## Step 6: Payment & Tax Setup

1. **Connect Bank Account:**
   - Settings → Payments → Add bank account
   - Gumroad pays you automatically (Fridays or balance threshold)

2. **Tax Settings:**
   - Settings → Tax → Enter tax information
   - Gumroad handles EU VAT, sales tax collection automatically

3. **Fees:**
   - Gumroad charges 10% on free plan
   - Or $10/month + 3.5% on Gumroad Pro

## Step 7: Post-Purchase Experience

### Create Welcome Email (Gumroad Settings)
```
Subject: 🎓 Welcome to {product_name}!

Hi {customer_name},

Thank you for enrolling in {product_name}!

Here's how to get started:

1. Visit: https://thedopecloudteacher.com/dashboard
2. Create your account (use this email: {customer_email})
3. Enter your access code: {license_key}
4. Start learning immediately!

Need help? Reply to this email or visit our support page.

To your cloud success,
The Dope Cloud Teacher Team

P.S. Join our community Discord: [link]
```

## Step 8: Analytics & Tracking

Gumroad provides:
- Sales dashboard (revenue, conversions)
- Customer list with emails
- Affiliate program setup (optional)
- Discount codes/coupons
- A/B testing for pricing

**Track on Your Site:**
```javascript
// Add to your purchase success page
window.gumroadAnalytics = {
  email: customerEmail,
  product: courseId,
  price: coursePrice
};
```

## Quick Reference: Product URLs to Create

| Course | Suggested Gumroad URL |
|--------|----------------------|
| Cloud Fundamentals 101 | `/l/cloud-fundamentals-101` |
| Cloud Architect Pathway | `/l/cloud-architect` |
| Cloud Security Engineer | `/l/cloud-security` |
| DevOps & Automation | `/l/devops-automation` |
| AI/ML Introduction | `/l/ai-ml-intro` |
| Data Engineering | `/l/data-engineering` |
| Serverless & Microservices | `/l/serverless-microservices` |
| Student Membership | `/l/student-membership` |
| Pro Membership | `/l/pro-membership` |
| Career Accelerator | `/l/career-accelerator` |

## Testing Your Integration

1. Create test product in Gumroad
2. Use test mode (Settings → Advanced → Test Mode)
3. Use test card: 4242 4242 4242 4242
4. Verify checkout flow works
5. Test email delivery and license key generation

## Pro Tips

✅ **Enable "Pay What You Want"** with minimum price for flexibility
✅ **Offer bundle discount** - all 7 courses for $1,997 (save $1,194)
✅ **Set up affiliate program** - 20% commission for referrals
✅ **Create coupons** - LAUNCH50 for 50% off first 100 customers
✅ **Add upsells** - "Also consider [related course]" at checkout
✅ **Collect testimonials** - Enable reviews in product settings

## Next Steps After Setup

1. Create professional product images (1200x800px)
2. Write compelling product descriptions with bullet points
3. Add video previews/demos to product pages
4. Set up abandoned cart emails (Gumroad Pro feature)
5. Launch with limited-time offer to create urgency

---

**Need Help?**
- Gumroad Support: help.gumroad.com
- Gumroad Creators Discord: gumroad.com/discord
