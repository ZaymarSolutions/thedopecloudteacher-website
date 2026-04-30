(function () {
  if (window.__dctGlobalUiLoaded) return;
  window.__dctGlobalUiLoaded = true;

  function initStandardNav() {
    var nav = document.querySelector('header .nav-links, .professional-nav .nav-links, .header-inner .nav-links, .header-container .nav-links');
    if (!nav || nav.dataset.standardized === 'true') return;

    var currentPage = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0] || 'index.html';
    var navItems = [
      { href: 'index.html', label: 'Home', match: ['index.html', ''] },
      { href: 'courses.html', label: 'Classes', match: ['courses.html', 'Cloud-fundamentals-course.html', 'cloud-career-starter-kit.html', 'ai-900-azure-ai-fundamentals.html', 'az-900-azure-fundamentals.html', 'az-104-azure-administrator.html', 'az-305-azure-solutions-architect.html'] },
      { href: 'blog.html', label: 'Blog', match: ['blog.html', 'cloud-control-azure-policy.html', 'black-women-in-it-ai-shift.html'] },
      { href: 'resources.html', label: 'Resources', match: ['resources.html'] },
      { href: 'pricing.html', label: 'Specials', match: ['pricing.html', 'shop.html'] },
      { href: 'certificate.html', label: 'Certificates', match: ['certificate.html'] },
      { href: 'dashboard.html', label: 'Dashboard', match: ['dashboard.html'] },
      { href: 'pg-parks-direct.html', label: 'PG Parks Direct', match: ['pg-parks-direct.html', 'pg-cloud-mission.html', 'pg-ai-mission.html', 'pg-cyber-mission.html'] }
    ];

    nav.innerHTML = navItems.map(function (item) {
      var isActive = item.match.indexOf(currentPage) !== -1;
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initStandardNav();
      initMobileNav();
      initFlipCards();
    });
  } else {
    initStandardNav();
    initMobileNav();
    initFlipCards();
  }
})();
