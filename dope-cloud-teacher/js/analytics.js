(() => {
  const config = window.DCT_ANALYTICS || {};
  const hasValidGa4MeasurementId = typeof config.measurementId === 'string' && /^G-[A-Z0-9]+$/i.test(config.measurementId) && config.measurementId.toUpperCase() !== 'G-XXXXXXXXXX';

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

  if (config.provider === 'ga4' && hasValidGa4MeasurementId) {
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

  const cloud101Price = Date.now() < Date.parse('2027-01-01T05:00:00Z') ? 25 : 97;
  if (['/cloud101.html', '/shop.html', '/hub/courses/cloud-fundamentals-101.html'].includes(location.pathname)) {
    trackEvent('view_item', { currency: 'USD', value: cloud101Price,
      items: [{ item_id: 'cloud-fundamentals-101', item_name: 'Cloud Fundamentals 101', item_brand: 'DCT', price: cloud101Price, quantity: 1 }] });
  }
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (link) {
      const url = new URL(link.href, location.href);
      const label = (link.textContent || '').trim().slice(0, 80);
      if (url.pathname === '/hub/enroll.html' && url.searchParams.get('course') === 'cloud-fundamentals-101') {
        trackEvent('select_item', { currency: 'USD',
          enrollment_path: url.searchParams.get('access') === 'community' ? 'fee_assistance' : 'paid',
          items: [{ item_id: 'cloud-fundamentals-101', item_name: 'Cloud Fundamentals 101', item_brand: 'DCT', price: cloud101Price, quantity: 1 }] });
      }
      if (url.protocol === 'mailto:') trackEvent('contact_click', { page: location.pathname });
      if (/^https?:$/.test(url.protocol) && url.hostname !== location.hostname) {
        trackEvent('outbound_click', { link_url: url.origin + url.pathname, link_text: label });
      } else if (/^(?:\/)?(?:programs|courses|classes|partners|contact|teach)(?:\/|\.html|$)/i.test(url.pathname.replace(/^\//, ''))) {
        trackEvent('cta_click', { destination: url.pathname, link_text: label });
      }
    }
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
