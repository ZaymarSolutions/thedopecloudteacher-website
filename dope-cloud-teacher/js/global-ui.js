(function () {
  if (window.__dctGlobalUiLoaded) return;
  window.__dctGlobalUiLoaded = true;

  function initStandardNav() {
    var nav = document.querySelector('header .nav-links, .professional-nav .nav-links, .header-inner .nav-links, .header-container .nav-links');
    if (!nav || nav.dataset.standardized === 'true') return;

    var pathname = window.location.pathname || '/';
    var parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    var section = parts[0] || 'home';
    var currentPage = (parts.length ? parts[parts.length - 1] : 'index.html').split('?')[0] || 'index.html';
    var navItems = [
      { href: '/index.html', label: 'Home', sections: ['home'], pages: ['index.html', ''] },
      { href: '/classes/', label: 'Classes', sections: ['classes'], pages: ['courses.html', 'pg-parks-direct.html'] },
      { href: '/academy/', label: 'Academy', sections: ['academy'], pages: ['cloud-fundamentals-course.html', 'cloud-career-starter-kit.html'] },
      { href: '/playbook/', label: 'Visual Playbook', sections: ['playbook'], pages: ['resources.html'] },
      { href: '/student-dashboard/', label: 'Student Dashboard', sections: ['student-dashboard'], pages: ['dashboard.html'] },
      { href: '/corporate-training.html', label: 'For Businesses', sections: [], pages: ['corporate-training.html', 'b2b.html'] },
      { href: '/about.html', label: 'About', sections: [], pages: ['about.html'] },
      { href: '/contact.html', label: 'Contact', sections: [], pages: ['contact.html'] }
    ];

    nav.innerHTML = navItems.map(function (item) {
      var isActive = item.sections.indexOf(section) !== -1 || item.pages.indexOf(currentPage) !== -1;
      return '<a href="' + item.href + '"' + (isActive ? ' class="active"' : '') + '>' + item.label + '</a>';
    }).join('') + '<a href="#" id="authButton">Sign In</a>';

    nav.dataset.standardized = 'true';

    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
  }

  function initMobileNav() {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.querySelector('nav.nav-links, .nav-links');
    if (!toggle || !nav) return;

    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function buildFlipCard(card) {
    if (card.classList.contains('dct-flip-card')) return;
    if (card.querySelector('form, input, textarea, select')) return;

    var backText = card.getAttribute('data-flip-back');
    if (!backText) {
      var fallback = card.querySelector('p') || card.querySelector('.label') || card.querySelector('.role');
      backText = fallback ? fallback.textContent.trim() : 'Tap again to view the front of this card.';
    }

    var link = card.getAttribute('data-flip-link') || card.getAttribute('href');
    var linkMarkup = link ? '<a class="dct-flip-link" href="' + link + '">Learn more</a>' : '';
    var original = card.innerHTML;

    card.classList.add('dct-flip-card');
    card.innerHTML =
      '<div class="dct-flip-card-inner">' +
      '<div class="dct-flip-card-front">' + original + '</div>' +
      '<div class="dct-flip-card-back"><p>' + backText + '</p>' + linkMarkup + '</div>' +
      '</div>';

    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
    }

    card.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.closest('.dct-flip-link')) return;
      event.preventDefault();
      card.classList.toggle('is-flipped');
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  }

  function initFlipCards() {
    var selector = [
      '[data-flip="true"]',
      '.value-prop',
      '.stat-card',
      '.testimonial-card',
      '.faq-item',
      '.outcome-card'
    ].join(',');

    document.querySelectorAll(selector).forEach(buildFlipCard);
  }

  function sanitizeCoursesPageLeak() {
    var currentPage = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0] || 'index.html';
    if (currentPage !== 'courses.html') return;

    var body = document.body;
    if (!body) return;

    var firstHeader = body.querySelector('header');
    if (!firstHeader) return;

    var leakedNodes = [];
    var cursor = body.firstChild;
    while (cursor && cursor !== firstHeader) {
      leakedNodes.push(cursor);
      cursor = cursor.nextSibling;
    }

    if (!leakedNodes.length) return;

    var leakText = leakedNodes.map(function (node) {
      return node && node.textContent ? node.textContent : '';
    }).join(' ');

    var looksLikeLeakedTemplate =
      leakText.indexOf('showCourseDetail(courseId)') !== -1 ||
      leakText.indexOf('${course.') !== -1 ||
      leakText.indexOf('detailView.innerHTML =') !== -1;

    if (!looksLikeLeakedTemplate) return;

    leakedNodes.forEach(function (node) {
      if (node && node.parentNode === body) {
        body.removeChild(node);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      sanitizeCoursesPageLeak();
      initStandardNav();
      initMobileNav();
      initFlipCards();
    });
  } else {
    sanitizeCoursesPageLeak();
    initStandardNav();
    initMobileNav();
    initFlipCards();
  }
})();
