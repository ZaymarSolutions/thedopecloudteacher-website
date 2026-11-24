/* Metricool website analytics for The Dope Cloud TeacHer.
   Tag ID transcribed from the site's Metricool Connections screen.
   Public browser-side tracking identifier, not a login credential.
   Load only once per page; don't send payment/account details. */
(function () {
  'use strict';
  if (window.__dctMetricoolStarted) return;
  window.__dctMetricoolStarted = true;

  var head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return;
  var metricoolScript = document.createElement('script');
  metricoolScript.type = 'text/javascript';
  metricoolScript.async = true;
  metricoolScript.src = 'https://tracker.metricool.com/resources/be.js';
  metricoolScript.onload = function () {
    if (window.beTracker && typeof window.beTracker.t === 'function') {
      window.beTracker.t({ hash: '62d45399350a1d9ca84a59232f3f31de' });
    }
  };
  head.appendChild(metricoolScript);
})();
