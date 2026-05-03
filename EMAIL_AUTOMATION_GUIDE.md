# Email Automation Integration Guide

To implement automated onboarding and nurture sequences, follow these steps:

1. **Choose a Provider:**
   - [ ] Mailchimp (recommended for ease of use)
   - [ ] ConvertKit
   - [ ] Other (ActiveCampaign, etc.)

2. **Create an Account:**
   - Go to https://mailchimp.com/ and sign up.

3. **Create an Audience:**
   - Import your student emails or connect your signup form.

4. **Create an Automation:**
   - Use Mailchimp's "Customer Journey" or "Classic Automation" to set up:
     - Welcome email (immediate)
     - Lesson reminders (weekly)
     - Upsell/cross-sell emails (after 7/14/21 days)

5. **Integrate Signup Form:**
   - Add Mailchimp embed code to `dope-cloud-teacher/index.html` and `courses.html`:
     ```html
     <!-- Mailchimp Signup Form -->
     <form action="https://YOUR-USER.usX.list-manage.com/subscribe/post?u=..." method="post" target="_blank">
       <input type="email" name="EMAIL" placeholder="Your email" required>
       <button type="submit">Join Free</button>
     </form>
     ```

6. **Test the Flow:**
   - Sign up with a test email and verify you receive the onboarding sequence.

---

**Next Steps:**
- Add the signup form to the homepage and course pages.
- Monitor open/click rates in Mailchimp.
- Refine email copy for higher engagement.
