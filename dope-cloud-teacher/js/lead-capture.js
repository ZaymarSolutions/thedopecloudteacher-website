(() => {
  const API_URL = window.DCT_API_URL || (window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://energetic-endurance-production.up.railway.app/api');

  const trackEvent = window.DCTTrackEvent || ((eventName, props = {}) => {
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props });
      return;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, props);
    }
  });

  const handleLeadForm = (form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const successMessageId = form.getAttribute('data-success-id');
      const successMessage = successMessageId ? document.getElementById(successMessageId) : null;
      const redirectTarget = form.getAttribute('data-redirect') || 'cloud-career-starter-kit.html';
      const source = form.getAttribute('data-source') || 'starter-kit';

      if (!emailInput || !emailInput.value.trim()) {
        return;
      }

      const email = emailInput.value.trim();
      localStorage.setItem('starterKitEmail', email);

      try {
        const response = await fetch(`${API_URL}/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            source,
            page: window.location.pathname,
            referrer: document.referrer || null
          })
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error('Lead was not saved');
        trackEvent('generate_lead', { lead_source: source, page: window.location.pathname });
      } catch (error) {
        console.error('Lead capture failed:', error);
      }

      if (successMessage) {
        successMessage.style.display = 'block';
      }

      trackEvent('resource_access', { source, page: window.location.pathname });

      setTimeout(() => {
        window.location.href = redirectTarget;
      }, 900);
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form[data-lead-capture="true"]').forEach(handleLeadForm);
  });
})();
