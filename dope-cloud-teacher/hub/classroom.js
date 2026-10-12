(async () => {
  const $ = id => document.getElementById(id);
  const slug = new URLSearchParams(location.search).get('course');
  const message = $('classroom-message');
  const returnTo = `${location.pathname}${location.search}`;
  $('login-link').href = `/login.html?redirect=${encodeURIComponent(returnTo)}`;
  $('enroll-link').href = `/hub/enroll.html?course=${encodeURIComponent(slug || '')}`;
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) { message.textContent = 'Choose a learning path from the course hub.'; return; }
  let token;
  try { token = localStorage.getItem('dct_token'); } catch (_) {}
  if (!token) { message.textContent = 'Sign in to open your enrolled course and saved progress.'; return; }
  const endpoint = `https://energetic-endurance-production.up.railway.app/api/hub/courses/${encodeURIComponent(slug)}`;
  async function request(path, body) {
    const response = await fetch(endpoint + path, { method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}), cache: 'no-store' });
    let data; try { data = await response.json(); } catch (_) { data = {}; }
    if (!response.ok) throw Object.assign(new Error(data.error || 'Unable to save. Please try again.'), { status: response.status });
    return data;
  }
  try {
    const sessionId = new URLSearchParams(location.search).get('session_id');
    if (sessionId) {
      message.textContent = 'Verifying your payment and course enrollment…';
      try {
        const response = await fetch('https://energetic-endurance-production.up.railway.app/api/hub/confirm-checkout', {
          method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, courseId: slug }), cache: 'no-store'
        });
        const confirmation = await response.json();
        if (!response.ok || confirmation.confirmed !== true) throw new Error(confirmation.error || 'Your payment has not yet been confirmed.');
        const cleanURL = new URL(location.href); cleanURL.searchParams.delete('session_id'); history.replaceState(null, '', cleanURL.pathname + cleanURL.search + cleanURL.hash);
      } catch (error) {
        message.textContent = `${error.message || 'We could not verify payment.'} Reload this page to retry verification, or contact DCT with your receipt. Your classroom will open once enrollment is verified.`;
        return;
      }
    }
    const data = await request('/content');
    if (typeof data.html !== 'string') throw new Error('Course content is unavailable.');
    const doc = new DOMParser().parseFromString(data.html, 'text/html');
    const article = doc.querySelector('article.content') || doc.querySelector('article');
    const modules = Array.isArray(data.guide?.sections) && data.guide.sections.length ? data.guide.sections : [...(article || doc).querySelectorAll('h2[id]')].filter(h => !['course-overview','enrollment-full-course'].includes(h.id)).map(h => ({ id: h.id, title: h.textContent.trim() }));
    if (!modules.length) throw new Error('This course needs a learning outline. Please contact DCT.');
    $('course-title').textContent = doc.querySelector('h1')?.textContent.trim() || 'Your DCT learning path';
    message.textContent = data.source === 'dct-bridge' ? 'DCT access support verified. Your complete learning path is ready.' : data.source === 'sponsor' ? 'Sponsored access verified. Your complete learning path is ready.' : 'Enrollment verified. Learn at your own pace, from anywhere.';
    $('access-actions').hidden = true;
    $('learning-layout').hidden = false;
    // Imported course scripts never receive account credentials or same-origin privileges.
    doc.querySelectorAll('script[src], header:not(.quiz header), footer, .access-offer').forEach(el => el.remove());
    doc.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) return;
      try {
        const url = new URL(href, 'https://thedopecloudteacher.org/hub/courses/');
        if (url.protocol !== 'https:') { link.removeAttribute('href'); link.removeAttribute('target'); return; }
        link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      } catch (_) { link.removeAttribute('href'); link.removeAttribute('target'); }
    });
    const base = doc.createElement('base'); base.href = 'https://thedopecloudteacher.org/hub/courses/'; doc.head.prepend(base);
    const frame = document.createElement('iframe'); frame.title = 'Complete written course, practice activities and knowledge checks'; frame.className = 'classroom-frame'; frame.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox');
    const navigationScript = doc.createElement('script'); navigationScript.textContent = "addEventListener('message', event => { if (event.source !== parent || event.data?.type !== 'dct-section') return; document.getElementById(event.data.sectionId)?.scrollIntoView(); });"; doc.body.append(navigationScript);
    const courseHTML = '<!doctype html>' + doc.documentElement.outerHTML; frame.srcdoc = courseHTML; frame.addEventListener('load', () => frame.contentWindow.postMessage({ type: 'dct-section', sectionId: modules[current].id }, '*'));
    $('classroom-content').append(frame);
    let current = 0, progress = { completed: [], total: modules.length, certificateEligible: false }, progressAvailable = false;
    const buttons = modules.map((module, index) => {
      const button = document.createElement('button'); button.type = 'button'; button.onclick = () => showModule(index); $('module-list').append(button); return button;
    });
    function renderProgress() {
      const completed = new Set(progress.completed || []);
      const count = modules.filter(m => completed.has(m.id)).length;
      $('course-progress').value = count / modules.length * 100;
      $('progress-label').textContent = `${count} of ${modules.length} sections completed${progressAvailable ? '' : ' · progress unavailable'}`;
      buttons.forEach((button, index) => { button.textContent = `${completed.has(modules[index].id) ? '✓ ' : `${index + 1}. `}${modules[index].title}`; button.setAttribute('aria-current', index === current ? 'step' : 'false'); });
      $('mark-complete').textContent = completed.has(modules[current].id) ? 'Section completed ✓' : 'Mark section complete';
      $('mark-complete').disabled = !progressAvailable || completed.has(modules[current].id);
      $('finish-course').disabled = !progressAvailable || count !== modules.length;
    }
    function showModule(index) {
      current = index;
      $('module-title').textContent = modules[index].title;
      $('module-position').textContent = `Section ${index + 1} of ${modules.length}`;
      $('previous-module').disabled = index === 0; $('next-module').disabled = index === modules.length - 1;
      frame.contentWindow?.postMessage({ type: 'dct-section', sectionId: modules[index].id }, '*');
      renderProgress();
    }
    (data.guide?.videos || []).forEach(video => {
      let source; try { source = new URL(video.url); } catch (_) { return; }
      if (source.protocol !== 'https:') return;
      const card = document.createElement('div'); card.className = 'video-resource';
      const link = document.createElement('a'); link.href = source.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = video.title || 'Open companion video'; card.append(link);
      if (video.embed) {
        try {
          const embed = new URL(video.embed);
          if (embed.protocol === 'https:' && (embed.hostname === 'www.youtube-nocookie.com' && embed.pathname.startsWith('/embed/') || embed.hostname === 'learn-video.azurefd.net')) {
            const player = document.createElement('iframe'); player.src = embed.href; player.title = video.title || 'Companion lesson video'; player.loading = 'lazy'; player.allow = 'fullscreen'; player.referrerPolicy = 'no-referrer'; card.prepend(player);
          }
        } catch (_) {}
      }
      $('video-resources').append(card);
    });
    if (!$('video-resources').children.length) $('video-resources').textContent = 'The written course below is your primary learning resource. Follow its source links for additional demonstrations.';
    try { progress = await request('/progress'); progressAvailable = true; } catch (_) { $('save-status').textContent = 'Saved progress could not be loaded. You can read the course; reload before marking sections complete.'; }
    showModule(Math.max(0, modules.findIndex(m => !(progress.completed || []).includes(m.id))));
    $('previous-module').onclick = () => showModule(current - 1);
    $('next-module').onclick = () => showModule(current + 1);
    $('mark-complete').onclick = async () => {
      $('mark-complete').disabled = true; $('save-status').textContent = 'Saving your progress…';
      try { progress = await request('/progress', { sectionId: modules[current].id, completed: true }); $('save-status').textContent = 'Section completion saved to your account. Continue when you are ready.'; } catch (error) { $('save-status').textContent = error.message; }
      renderProgress();
    };
    $('finish-course').onclick = async () => {
      const raw = $('quiz-score').value, score = Number(raw);
      if (!raw || !Number.isInteger(score) || score < 70 || score > 100 || !$('completion-confirm').checked) { $('save-status').textContent = 'Enter an honest score from 70 to 100 and confirm your completed practice activities.'; return; }
      $('finish-course').disabled = true;
      try {
        const record = await request('/complete', { quizScore: score });
        if (!record.completed || !record.completionCode) throw new Error('Completion could not be verified.');
        $('completion-detail').textContent = `${$('course-title').textContent} · Completion code: ${record.completionCode} · Self-reported knowledge-check score: ${score}%`;
        $('completion-record').hidden = false; $('save-status').textContent = 'Your DCT completion has been recorded.';
      } catch (error) { $('save-status').textContent = error.message; renderProgress(); }
    };
    $('print-record').onclick = () => window.print();
  } catch (error) {
    message.textContent = error.status === 401 ? 'Your session has expired. Sign in again to access your classroom.' : error.status === 403 ? 'This account does not yet have course access. Enroll or request supported access to continue.' : 'We could not open your classroom. Please retry or contact DCT for help.';
  }
})();
