# Google Analytics Setup (GA4)

## What Is Already Implemented
- Sitewide analytics loader is configured through dope-cloud-teacher/js/site-config.js.
- GA4 loader is implemented in dope-cloud-teacher/js/analytics.js.
- Analytics scripts are included across all full HTML pages in dope-cloud-teacher.

## Final Step You Must Do
Set your GA4 Measurement ID (format: G-XXXXXXXXXX).

## Option 1: Persistent in Browser (Quick Test)
1. Open the website.
2. In browser devtools console, run:

```js
localStorage.setItem('DCT_GA4_MEASUREMENT_ID', 'G-REPLACE_WITH_YOUR_ID');
localStorage.setItem('DCT_ANALYTICS_PROVIDER', 'ga4');
location.reload();
```

## Option 2: Hardcode in Source (Production)
1. Open dope-cloud-teacher/js/site-config.js.
2. Replace the fallback value:

```js
const ga4MeasurementId = storedGa4MeasurementId || 'G-XXXXXXXXXX';
```

with your real GA4 measurement ID.

## Option 3: Runtime URL Override
Use query params on first load:
- ?ga4=G-REPLACE_WITH_YOUR_ID&analyticsProvider=ga4

This writes the values into localStorage for future page views.

## Validation Checklist
- Real-time users appear in GA4 Realtime report.
- Page views update when navigating to major pages.
- Click events fire for elements with data-analytics-event attributes.
- Lead capture events appear as lead_capture in GA4.

## Recommended Custom Events to Track Next
- course_detail_view
- lesson_expand
- enroll_click
- starter_kit_download
- quiz_complete
