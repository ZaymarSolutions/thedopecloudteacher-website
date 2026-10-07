// Keep the uploaded course content and inline scripts intact.
// Audience deep links must also work when navigating within the hub document.
(function () {
  function selectLinkedPath() {
    var key = window.location.hash.slice(1);
    if (!['new', 'senior', 'teen', 'career', 'veteran', 'cert', 'org', 'pro'].includes(key)) return;
    var button = document.querySelector('.persona[data-p="' + key + '"]');
    if (button && button.getAttribute('aria-pressed') !== 'true') button.click();
  }
  window.addEventListener('hashchange', selectLinkedPath);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', selectLinkedPath);
  else selectLinkedPath();
})();
