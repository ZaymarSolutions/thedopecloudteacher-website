# Connect instructor applications to Google Sheets

The tracker is [DCT Instructor Applications](https://docs.google.com/spreadsheets/d/1Ml-OxftxDj4m5eMh8uOm8VxnFPxfLyofrpdqz4FYYr8/edit). It has an `Applications` tab. The script writes each submission there and stores the résumé in a private `DCT Instructor Résumés` folder in the same Google account.

1. Open the Sheet while signed in as its owner. Choose **Extensions → Apps Script**.
2. Replace the starter `Code.gs` contents with this folder's [`Code.gs`](Code.gs). Save.
3. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Deploy and complete Google's authorization. Copy the URL ending in `/exec`.
4. Paste the URL between the quotes in [`../google-sheet-endpoint.js`](../google-sheet-endpoint.js). Commit and push that change to the site repository.
5. Submit one test application from the live `/teach/` page using a non-sensitive sample résumé. Confirm the success page, a row in the Sheet, and a private résumé file in Drive. Delete the test row/file afterward.

The Apps Script URL is a public receiver because applicants do not sign in. The site limits files to 3 MB, validates required fields, and uses a honeypot; the script repeats those checks and prevents spreadsheet formula injection. Restrict Sheet and Drive folder sharing to your hiring team. If the code changes later, deploy a new Apps Script version from **Manage deployments → Edit**.
