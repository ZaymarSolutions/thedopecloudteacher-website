# DCT Unified Inquiry — Release Checklist

This feature is **prepared but not activated in production**. It is separate from the
working Stripe checkout, existing learner account registration, and existing
Google-Sheet-based full instructor application.

## Website routes
- Public contact form: /contact.html
- Founder/admin-only dashboard: /admin/intake.html
- Readiness: GET /api/intake/status — returns accepting:false until fully enabled
- POST /api/intake/inquiries — returns HTTP 503 while disabled

## Secure rollout
1. Configure a supported SMTP provider **in production Railway variables**; do
   not put passwords in code, GitHub commits, a spreadsheet, or chat.
   - SMTP_USER: the sender account supported by the mail provider
   - SMTP_PASSWORD: provider-issued app password or SMTP key, never the normal login password
   - SMTP_HOST / SMTP_PORT / SMTP_SECURE: match provider requirements
   - EMAIL_FROM: verified sender identity
   - ADMIN_EMAIL: founder-controlled review mailbox
2. Confirm a DCT user already has a verified, authorized administrator role.
   The service does not auto-promote anyone to admin. All other roles get 403.
3. On a separate test environment, verify duplicate-safe submissions, spam limit,
   missing-consent rejection, explicit career opt-in, SMTP receipt and founder
   notification, and an admin-only dashboard. Confirm the class purchase path
   is unchanged.
4. Have the founder authorize publication. Set DCT_INTAKE_ENABLED=true in
   production Railway **only after** the checks above pass.
5. Confirm GET /api/intake/status returns accepting:true from the real backend;
   send a single clearly labeled test inquiry with an authorized test address.
   Record the DCT reference, verify both test messages, and close the test case.
6. Ensure an owner is assigned to monitor the dashboard. If notification service
   fails, set DCT_INTAKE_ENABLED=false until repaired. Direct email stays visible.

## Core safety rules
- A public inquiry creates a case. It never grants paid access, a scholarship, a
  teaching role, a job, or a partner agreement.
- Only a learner who explicitly checks career support creates a restricted
  career-referral record. No referral is automatically forwarded to Norine.
  Founder review and consent verification must precede the actual handoff.
- Admin read and update APIs require the existing authenticated admin role.
  A review queue assignment is not a notification to staff.
- Do not accept resumes, tax identifiers, payments, identity documents, medical
  records, or bank information through this general contact form.
- Instructor applicants should use the existing dedicated full application.
- Confirm a privacy/retention policy and documented access/deletion procedures
  before accepting sensitive business information at scale.

## Tests
DCT Intake Safety Checks performs JavaScript syntax checks and executes
backend/test/intake-workflow.test.js using Node 20. End-to-end email and
database tests must occur against a separately configured environment before
real public submissions are enabled.
