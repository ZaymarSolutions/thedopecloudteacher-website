# Weekly QA Automation Setup

To ensure ongoing site quality, automate the QA script:

---
**1. Schedule QA Script (Node.js):**
- Use Windows Task Scheduler or a cron job (if on Linux/macOS) to run:
  ```
  node scripts/daily-growth-ops.cjs
  ```
  weekly (e.g., every Monday at 8am).

---
**2. Email/Slack Alerts:**
- Modify `daily-growth-ops.cjs` to send an email or Slack alert if broken links or missing analytics are detected.
- Use [nodemailer](https://nodemailer.com/about/) for email or [Slack Webhooks](https://api.slack.com/messaging/webhooks) for Slack.

---
**3. Review the Report:**
- Check `reports/daily-ops/<date>/daily-growth-report.md` for issues.
- Fix any flagged problems immediately.

---
**Sample Alert Code (Node.js):**
```js
const nodemailer = require('nodemailer');
// ...after QA check
if (qa.brokenInternalLinks.length || qa.missing.analytics.length) {
  // send email/Slack alert
}
```

---
**Next Steps:**
- Set up the scheduled task.
- Add alert logic to the QA script if desired.
- Review reports weekly and fix issues promptly.
