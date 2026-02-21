(() => {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  const params = new URLSearchParams(window.location.search);
  const apiOverrideParam = params.get('api');
  if (apiOverrideParam) {
    localStorage.setItem('DCT_API_URL', apiOverrideParam.replace(/\/$/, ''));
  }

  const storedApiUrl = localStorage.getItem('DCT_API_URL');

  window.DCT_API_URL = window.DCT_API_URL || storedApiUrl || (isLocalhost
    ? 'http://localhost:3000/api'
    : 'https://api.thedopecloudteacher.com/api');

  window.DCT_ANALYTICS = window.DCT_ANALYTICS || {
    provider: 'plausible',
    domain: 'thedopecloudteacher.com'
  };
})();
