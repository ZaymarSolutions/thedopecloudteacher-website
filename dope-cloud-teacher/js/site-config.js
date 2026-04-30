(() => {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const origin = window.location.origin;
  const sameOriginApi = `${origin}/api`;

  const params = new URLSearchParams(window.location.search);
  const apiOverrideParam = params.get('api');
  if (apiOverrideParam) {
    const overrideValue = apiOverrideParam === 'same-origin'
      ? sameOriginApi
      : apiOverrideParam.replace(/\/$/, '');
    localStorage.setItem('DCT_API_URL', overrideValue);
  }

  const storedApiUrl = localStorage.getItem('DCT_API_URL');
  const hasExplicitGlobal = typeof window.DCT_API_URL === 'string' && window.DCT_API_URL.trim().length > 0;
  const defaultApiUrl = isLocalhost
    ? 'http://localhost:3000/api'
    : 'https://energetic-endurance-production.up.railway.app/api';

  window.DCT_API_URL = hasExplicitGlobal
    ? window.DCT_API_URL.replace(/\/$/, '')
    : (storedApiUrl || defaultApiUrl).replace(/\/$/, '');

  const analyticsProviderParam = params.get('analyticsProvider');
  const analyticsMeasurementParam = params.get('ga4') || params.get('measurementId');

  if (analyticsProviderParam) {
    localStorage.setItem('DCT_ANALYTICS_PROVIDER', analyticsProviderParam);
  }

  if (analyticsMeasurementParam) {
    localStorage.setItem('DCT_GA4_MEASUREMENT_ID', analyticsMeasurementParam);
  }

  const storedAnalyticsProvider = localStorage.getItem('DCT_ANALYTICS_PROVIDER');
  const storedGa4MeasurementId = localStorage.getItem('DCT_GA4_MEASUREMENT_ID');
  const ga4MeasurementId = storedGa4MeasurementId || 'G-XXXXXXXXXX';

  const explicitAnalyticsConfig = window.DCT_ANALYTICS && typeof window.DCT_ANALYTICS === 'object';
  if (!explicitAnalyticsConfig) {
    window.DCT_ANALYTICS = {
      provider: storedAnalyticsProvider || 'ga4',
      measurementId: ga4MeasurementId,
      domain: 'thedopecloudteacher.org'
    };
  }
})();
