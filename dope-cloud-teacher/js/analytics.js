(() => {
  const config = window.DCT_ANALYTICS || {};

  const trackEvent = (eventName, props = {}) => {
    if (!eventName) return;
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props });
      return;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, props);
    }
  };

  window.DCTTrackEvent = trackEvent;

  if (config.provider === 'plausible' && config.domain) {
    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', config.domain);
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
    return;
  }

  if (config.provider === 'ga4' && config.measurementId) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    window.gtag('js', new Date());
    window.gtag('config', config.measurementId);
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-analytics-event]');
    if (!target) return;
    const eventName = target.getAttribute('data-analytics-event');
    const label = target.getAttribute('data-analytics-label');
    trackEvent(eventName, {
      label: label || undefined,
      page: window.location.pathname
    });
  });
})();
