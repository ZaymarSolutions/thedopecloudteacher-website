(() => {
  'use strict';
  const form = document.getElementById('dct-intake-form');
  if (!form) return;
  const $ = id => document.getElementById(id);
  const status = $('dct-intake-status');
  const button = $('dct-intake-submit');
  const career = $('dct-career-consent-wrap');
  const category = $('dct-intake-category');
  const params = new URLSearchParams(location.search);
  const route = (params.get('path') || params.get('subject') || '').toLowerCase();
  const inferred = /instructor|teach/.test(route) ? 'instructor' :
    /staff|job|employment|work with/.test(route) ? 'staff' :
    /partner|community|team training|proposal|workshop|corporate/.test(route) ? 'partner' :
    /support|technical problem|login/.test(route) ? 'support' :
    /course|learner|learn|student|career/.test(route) ? 'learner' : '';
  if (inferred) category.value = inferred;
  const showCareerOption = () => {
    const enabled = category.value === 'learner';
    career.hidden = !enabled;
    if (!enabled) $('dct-intake-career-consent').checked = false;
  };
  category.addEventListener('change', showCareerOption);
  showCareerOption();
  const setStatus = (message, error = false) => {
    status.hidden = false;
    status.classList.toggle('error', error);
    status.replaceChildren();
    const text = document.createElement('span');
    text.textContent = message;
    status.append(text);
  };
  // Preview deployments intentionally cannot send real production inquiries.
  const production = ['thedopecloudteacher.org','www.thedopecloudteacher.org'].includes(location.hostname);
  if (!production) {
    button.disabled = true;
    setStatus('Preview mode: this form is displayed for review. Submissions are disabled until production deployment.');
    return;
  }
  const endpoint = 'https://energetic-endurance-production.up.railway.app/api/intake/inquiries';
  let submissionKey = '';
  const freshKey = () => {
    if (crypto.randomUUID) return crypto.randomUUID();
    const data = crypto.getRandomValues(new Uint8Array(16));
    return [...data].map(x => x.toString(16).padStart(2, '0')).join('');
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;
    if (!submissionKey) submissionKey = freshKey();
    const payload = {
      submissionKey, name: $('dct-intake-name').value,
      email: $('dct-intake-email').value,
      category: category.value,
      organization: $('dct-intake-organization').value,
      interest: $('dct-intake-interest').value,
      format: $('dct-intake-format').value,
      timing: $('dct-intake-timing').value,
      message: $('dct-intake-message').value,
      careerConsent: $('dct-intake-career-consent').checked,
      contactConsent: $('dct-intake-contact-consent').checked,
      website: $('dct-intake-website').value
    };
    button.disabled = true;
    button.textContent = 'Sending your inquiry…';
    setStatus('Saving your request securely…');
    try {
      const response = await fetch(endpoint,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload), cache:'no-store'
      });
      const data = await response.json().catch(()=>({}));
      if (!response.ok || !data.received || !data.reference) {
        throw new Error(data.error || 'We could not confirm your submission. Please email DCT before retrying.');
      }
      form.reset();showCareerOption();
      setStatus('Received! Your DCT reference is '+data.reference+
        '. We will review your inquiry. This is not a course enrollment, scholarship approval, job offer or agreement.');
      const a = document.createElement('a');
      a.href = category.value === 'instructor' ? '/teach/' : '/hub/index.html';
      a.textContent = category.value === 'instructor' ? ' Continue to the instructor application' : ' Browse DCT courses';
      status.append(a);
      button.textContent = 'Inquiry recorded';
      submissionKey = ''; // New intentional form submission gets a new key.
    } catch (error) {
      setStatus(error.message || 'Submission failed. Please email DCT before trying again.',true);
      button.disabled = false;
      button.textContent = 'Send inquiry';
      // Preserve submissionKey for safe idempotent retry.
    }
  });
})();