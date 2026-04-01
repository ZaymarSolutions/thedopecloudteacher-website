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
    : sameOriginApi;

  window.DCT_API_URL = hasExplicitGlobal
    ? window.DCT_API_URL.replace(/\/$/, '')
    : (storedApiUrl || defaultApiUrl).replace(/\/$/, '');

  window.DCT_ANALYTICS = window.DCT_ANALYTICS || {
    provider: 'plausible',
    domain: 'thedopecloudteacher.com'
  };
})();
