(() => {
  'use strict';
  const API = 'https://energetic-endurance-production.up.railway.app/api';
  const el = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  const courseId = params.get('course') || '';
  const sponsorMode = params.get('sponsor') === '1';
  const sponsorSeats = Number(params.get('seats') || '1');
  const details = Object.freeze({
    'cloud-fundamentals-101': {
      type: 'Cloud Foundations',
      lead: 'Make sense of cloud computing without needing a technical background.',
      focus: ['What cloud services are and when they help', 'Cloud service and deployment models', 'Everyday examples of cloud technology'],
      image: '/hub/visuals/cover-cloud101-3d.jpg'
    },
    'az-900-azure-fundamentals': {
      type: 'Azure Fundamentals',
      lead: 'Build a practical vocabulary for Microsoft Azure and the cloud.',
      focus: ['Core cloud concepts and service types', 'Azure services and common use cases', 'Management, identity and governance fundamentals'],
      image: '/hub/visuals/cover-az900.svg'
    },
    'az-104-azure-administrator': {
      type: 'Azure Administration',
      lead: 'Learn how administrators configure, secure and maintain Azure resources.',
      focus: ['Identity, access and governance', 'Compute, storage and network operations', 'Monitoring and administration scenarios'],
      image: '/hub/visuals/cover-az104.svg'
    },
    'az-305-azure-solutions-architect': {
      type: 'Cloud Architecture',
      lead: 'Practice making defensible cloud-design decisions.',
      focus: ['Turn business needs into architecture choices', 'Design identity, data and infrastructure patterns', 'Plan for security, reliability and continuity'],
      image: '/hub/visuals/cover-az305.svg'
    },
    'ai-901-azure-ai-fundamentals': {
      type: 'Azure AI',
      lead: 'Explore the building blocks of artificial intelligence on Azure.',
      focus: ['AI concepts and practical use cases', 'Microsoft AI capabilities and services', 'Security, privacy and responsible AI choices'],
      image: '/hub/visuals/cover-ai901.svg'
    },
    'ai-fundamentals-everyday-ai': {
      type: 'Everyday AI',
      lead: 'Use AI more thoughtfully and confidently in everyday tasks.',
      focus: ['Create clearer prompts and instructions', 'Evaluate AI-generated answers', 'Protect private information when using AI'],
      image: '/hub/visuals/cover-everyday-ai-3d.jpg'
    },
    'cloud-security': {
      type: 'Cloud Security',
      lead: 'Explore how to protect information and accounts in the cloud.',
      focus: ['Secure identity and access', 'Protect information and workloads', 'Understand shared security responsibilities'],
      image: '/hub/visuals/cover-cloud-security.svg'
    },
    'ai-security-responsible-governance': {
      type: 'AI Security & Governance',
      lead: 'Learn to recognize AI risks and apply responsible oversight.',
      focus: ['Identify AI security and data risks', 'Use AI responsibly and check outputs', 'Apply governance and accountability principles'],
      image: '/hub/visuals/cover-ai-security.svg'
    },
    'cyber-basics-stay-safer-online': {
      type: 'Cyber Basics',
      lead: 'A beginner-friendly course to help you stay safer online.',
      focus: ['Recognize suspicious messages and scams', 'Protect passwords and sign-ins', 'Build safer digital habits for everyday life'],
      image: '/hub/visuals/cover-cyber-basics-3d.jpg'
    }
  });
  const changeUrl = sponsorMode ? '/hub/enroll.html?sponsor=1' : '/hub/enroll.html' + (courseId ? '?course=' + encodeURIComponent(courseId) : '');
  el('change-course').href = changeUrl;
  el('change-course-top').href = changeUrl;
  function state(message, error) {
    el('checkout-status').textContent = message;
    el('checkout-status').classList.toggle('error', Boolean(error));
  }
  function li(text) {
    const item = document.createElement('li');
    item.textContent = text;
    return item;
  }
  function money(amount) { return '$' + amount.toFixed(2); }
  function showCourse(c) {
    const d = details[c.id];
    el('course-category').textContent = d.type;
    el('course-title').textContent = c.title;
    el('course-identifier').textContent = 'The Dope Cloud TeacHer · ' + d.type;
    el('course-lead').textContent = d.lead;
    el('course-price').textContent = money(c.price);
    el('price-context').textContent = 'one-time enrollment';
    el('order-quantity').textContent = '1';
    el('order-title').textContent = c.title;
    el('order-price').textContent = money(c.price);
    el('course-duration').textContent = Number(c.lessonCount) > 0 ? c.lessonCount + ' learning sections · Online · At your own pace' : 'Online · At your own pace';
    const cover = el('course-cover');
    cover.src = d.image;
    cover.alt = 'Cover artwork for ' + c.title;
    el('focus-list').replaceChildren(...d.focus.map(li));
    el('included-list').replaceChildren(...[
      'Access to the selected complete online course',
      'Structured written lessons and curated official learning videos',
      'Practice activities and knowledge checks',
      'Saved progress in your DCT learner account',
      'DCT completion record after required steps are completed'
    ].map(li));
    document.title = 'Review ' + c.title + ' | DCT';
  }
  function showSponsorship(seats) {
    const amount = seats * 25;
    el('course-category').textContent = 'Community sponsorship';
    el('course-identifier').textContent = 'DCT · Learning access for the DMV';
    el('course-title').textContent = 'Sponsor community learning seats';
    el('course-lead').textContent = 'Help eligible learners in DC Wards 7 and 8 and Prince George’s County access self-paced tech education.';
    el('course-price').textContent = money(amount);
    el('price-context').textContent = 'one-time sponsorship';
    el('order-title').textContent = 'DCT sponsored course seats';
    el('order-price').textContent = money(amount);
    el('order-quantity').textContent = String(seats);
    el('course-duration').textContent = money(25) + ' per sponsored seat · ' + seats + (seats === 1 ? ' seat' : ' seats');
    el('course-cover').src = '/hub/visuals/cover-cloud101-3d.jpg';
    el('course-cover').alt = 'DCT cloud education artwork';
    el('focus-list').replaceChildren(...[
      'Help eligible residents learn cloud, AI or cybersecurity',
      'Support a learner who needs help with enrollment fees',
      'Give more people an opportunity to build practical tech skills'
    ].map(li));
    el('included-list').replaceChildren(...[
      seats + (seats === 1 ? ' sponsored learner seat' : ' sponsored learner seats'),
      'One eligible student can access one complete self-paced course per seat',
      'DCT allocates sponsorships to eligible learners',
      'Training includes written lessons, videos, activities and knowledge checks'
    ].map(li));
    [...document.querySelectorAll('.know-grid p')].forEach((p, i) => {
      p.textContent = ['✓ One-time sponsorship', '✓ Not a recurring subscription', '✓ Eligible learners receive course access', '✓ Secure Stripe payment'][i] || '';
    });
    el('product-disclaimer').textContent = 'Sponsorship does not enroll you in a course. Seats are allocated to eligible students through DCT’s community program. This payment is not a charitable tax-deductible donation. Sponsorship does not include vendor certification exams, live instruction or guaranteed employment.';
    el('after-payment').textContent = 'No card information is collected on this page. Once Stripe verifies payment, sponsored seats become available for DCT’s eligible learners.';
    document.title = 'Review community learning sponsorship | DCT';
    return {id:'community-sponsorship',title:'DCT sponsored course seats',price:amount};
  }
  async function openCheckout(c) {
    const button = el('pay-action');
    button.disabled = true;
    button.textContent = 'Preparing secure checkout…';
    state('Connecting securely to Stripe. No payment has been taken.');
    try {
      const token = localStorage.getItem('dct_token');
      if (!token) throw new Error('Your learner session is missing. Sign in before continuing.');
      const response = await fetch(API + (sponsorMode ? '/hub/sponsor-checkout' : '/create-checkout'), {
        method: 'POST', mode: 'cors', cache: 'no-store',
        headers: {'Content-Type':'application/json','Authorization':'Bearer ' + token},
        body: JSON.stringify(sponsorMode ? {seats:sponsorSeats} : {courseId:c.id})
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Checkout is temporarily unavailable. Please try again.');
      const destination = new URL(payload.url);
      if (destination.origin !== 'https://checkout.stripe.com') throw new Error('Unable to verify the secure payment destination.');
      if (typeof window.DCTTrackEvent === 'function') window.DCTTrackEvent('begin_checkout', {currency:'USD',value:c.price,items:[{item_id:c.id,item_name:c.title,price:c.price,quantity:1}]});
      location.assign(destination.href);
    } catch (error) {
      state(error.message || 'Could not open secure checkout.', true);
      button.disabled = false;
      button.textContent = 'Continue to secure checkout';
    }
  }
  (async () => {
    const d = details[courseId];
    if (sponsorMode && ![1,5,10,20].includes(sponsorSeats)) {state('Select 1, 5, 10 or 20 seats to review a sponsorship.', true);return;}
    if (!sponsorMode && !d) {state('Please choose one of the current DCT self-paced courses to see purchase details.', true); return;}
    try {
      const response = await fetch(API + '/hub/catalog', {cache:'no-store'});
      if (!response.ok) throw new Error('Course details are temporarily unavailable. Please try again.');
      const payload = await response.json();
      if (sponsorMode) {
        const sponsor = showSponsorship(sponsorSeats);
        if (!localStorage.getItem('dct_token')) {state('Sign in to your DCT learner account before making a sponsorship payment.', true);return;}
        if (!payload.promotion?.active) {state('Community seat sponsorship is not available outside the current promotion.', true);return;}
        state('Your sponsorship details are verified. Review them, then continue to Stripe to pay.');
        const button = el('pay-action');
        button.textContent = 'Continue to secure checkout · ' + money(sponsor.price);
        button.disabled = false;
        button.addEventListener('click', () => openCheckout(sponsor));
        return;
      }
      const course = (payload.courses || []).find(c => c.id === courseId);
      if (!course || typeof course.price !== 'number' || !Number.isFinite(course.price) || course.price <= 0) throw new Error('This course is not currently available for purchase.');
      showCourse(course);
      const token = localStorage.getItem('dct_token');
      if (!token) {state('Sign in to your DCT learner account before checking out.', true);return;}
      if (!course.checkoutReady) {state('Enrollment is currently unavailable for this course. Please try again later.', true);return;}
      state('Your course details are verified. Review them, then continue to Stripe to pay.');
      const button = el('pay-action');
      button.textContent = 'Continue to secure checkout · ' + money(course.price);
      button.disabled = false;
      button.addEventListener('click', () => openCheckout(course));
    } catch (error) {
      state(error.message || 'Unable to load this course.', true);
    }
  })();
})();
