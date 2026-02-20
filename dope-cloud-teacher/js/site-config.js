(() => {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  window.DCT_API_URL = window.DCT_API_URL || (isLocalhost
    ? 'http://localhost:3000/api'
    : 'https://api.thedopecloudteacher.com/api');

  window.DCT_ANALYTICS = window.DCT_ANALYTICS || {
    provider: 'plausible',
    domain: 'thedopecloudteacher.com'
  };
})();
