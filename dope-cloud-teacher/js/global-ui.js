(function () {
  if (window.__dctGlobalUiLoaded) return;
  window.__dctGlobalUiLoaded = true;

  function sitePath(target) {
    var cleanTarget = String(target || '').replace(/^\/+/, '');
    if (cleanTarget.endsWith('/')) {
      cleanTarget += 'index.html';
    }
    if (!cleanTarget) return '/';

    if (window.location.protocol !== 'file:') {
      return '/' + cleanTarget;
    }

    var parts = (window.location.pathname || '').split('/').filter(Boolean);
    var rootIndex = parts.indexOf('dope-cloud-teacher');
    if (rootIndex === -1) return cleanTarget;

    var localParts = parts.slice(rootIndex + 1);
    var depth = window.location.pathname.endsWith('/') ? localParts.length : Math.max(localParts.length - 1, 0);
    return '../'.repeat(depth) + cleanTarget;
  }

  function findPrimaryNav() {
    var preferred = Array.prototype.slice.call(document.querySelectorAll('header .nav-links, .site-nav__links, .professional-nav .nav-links, .header-container .nav-links, .header-inner .nav-links, .nav-links'));
    var preferredMatch = preferred.find(function (node) {
      if (!node) return false;
      if (node.closest('.lesson-nav, .session-nav, .top-nav, .top, .pg-nav, .dashboard-nav')) return false;
      return true;
    });

    if (preferredMatch) return preferredMatch;

    var fallbacks = Array.prototype.slice.call(document.querySelectorAll('header nav, .header-container nav, .header-inner nav, nav.site-nav, nav.nav'));
    return fallbacks.find(function (node) {
      if (!node) return false;
      if (node.closest('.lesson-nav, .session-nav, .top-nav, .top, .pg-nav, .dashboard-nav')) return false;
      return true;
    }) || null;
  }

  function ensureThemeStyles() {
    var head = document.head || document.querySelector('head');
    if (!head) return;

    var stylesHref = sitePath('css/styles.css');
    var existingStyles = Array.prototype.slice.call(head.querySelectorAll('link[rel="stylesheet"]')).find(function (link) {
      return (link.getAttribute('href') || '').indexOf('css/styles.css') !== -1;
    });

    if (!existingStyles) {
      var stylesLink = document.createElement('link');
      stylesLink.rel = 'stylesheet';
      stylesLink.href = stylesHref;
      stylesLink.id = 'dct-core-styles';
      head.appendChild(stylesLink);
    }

    if (!head.querySelector('#dct-unified-theme')) {
      var themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.href = sitePath('css/unified-theme.css?v=20260706b');
      themeLink.id = 'dct-unified-theme';
      head.appendChild(themeLink);
    }
  }

  function ensureMobileToggle(nav) {
    if (!nav) return;
    var header = nav.closest('header');
    if (!header) return;

    var container = header.querySelector('.header-container, .header-inner') || header;
    var existingToggle = container.querySelector('.mobile-menu-toggle');
    if (existingToggle) return;

    var toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.setAttribute('aria-label', 'Toggle mobile menu');
    toggle.setAttribute('type', 'button');
    toggle.textContent = '≡';
    container.appendChild(toggle);
  }

  function initBrandLogo() {
    var logoSrc = sitePath('logo.svg?v=20260705c');
    document.querySelectorAll('.logo-img, .pg-home img, .dct-workshop-brand img, .logo img').forEach(function (img) {
      if (!img) return;
      img.src = logoSrc;
      img.removeAttribute('srcset');
      // Enforce safe logo framing even when page-level CSS tries to crop it.
      img.style.objectFit = 'contain';
      img.style.objectPosition = 'center';
      img.style.overflow = 'visible';
      img.style.paddingTop = '0';
      if (img.classList.contains('logo-img') || img.closest('.logo')) {
        img.style.height = '76px';
        img.style.width = 'auto';
        img.style.maxWidth = 'min(320px, 42vw)';
      }
      var logo = img.closest('.logo');
      if (logo) {
        logo.classList.add('wordmark-mode');
        logo.style.overflow = 'visible';
      }
    });
  }

  function initStandardNav() {
    var nav = findPrimaryNav();
    if (!nav || nav.dataset.standardized === 'true') return;

    nav.classList.add('nav-links');
    nav.classList.add('dct-primary-nav');
    nav.setAttribute('aria-label', 'Main navigation');

    var pathname = window.location.pathname || '/';
    var parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    var section = parts[0] || 'home';
    var currentPage = (parts.length ? parts[parts.length - 1] : 'index.html').split('?')[0] || 'index.html';
    var navItems = [
      { href: 'index.html', label: 'Home', sections: ['home'], pages: ['index.html', ''] },
      { href: 'classes/', label: 'Classes', sections: ['classes'], pages: ['courses.html', 'pg-parks-direct.html'] },
      { href: 'academy/', label: 'Academy', sections: ['academy'], pages: ['cloud-fundamentals-course.html', 'cloud-career-starter-kit.html'] },
      { href: 'governance-responsible-ai.html', label: 'Governance & Responsible AI', sections: [], pages: ['governance-responsible-ai.html'] },
      { href: 'corporate-training.html', label: 'For Agencies & Business', sections: [], pages: ['corporate-training.html', 'b2b.html'] },
      { href: 'instructor-apply.html', label: 'Teach With Us', sections: [], pages: ['instructor-apply.html'] },
      { href: 'about.html', label: 'About', sections: [], pages: ['about.html'] },
      { href: 'contact.html', label: 'Contact', sections: [], pages: ['contact.html'] }
    ];

    nav.innerHTML = navItems.map(function (item) {
      var isActive = item.sections.indexOf(section) !== -1 || item.pages.indexOf(currentPage) !== -1;
      return '<a href="' + sitePath(item.href) + '"' + (isActive ? ' class="active"' : '') + '>' + item.label + '</a>';
    }).join('') + '<a href="' + sitePath('login.html') + '" id="authButton">Sign In</a>';

    nav.dataset.standardized = 'true';
    ensureMobileToggle(nav);

    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
  }

  function initMobileNav() {
    var nav = document.querySelector('header nav.nav-links, header .nav-links, nav.dct-primary-nav');
    var toggle = document.querySelector('header .mobile-menu-toggle, .mobile-menu-toggle');
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

  function initAuthFallback() {
    if (typeof window.showAuthModal !== 'function') {
      window.showAuthModal = function () {
        window.location.href = sitePath('login.html');
      };
    }

    document.querySelectorAll('#authButton, #navAuthButton').forEach(function (node) {
      node.addEventListener('click', function (event) {
        var href = node.getAttribute('href') || '';
        if (href === '#' || href === '') {
          event.preventDefault();
          if (typeof window.showAuthModal === 'function') {
            window.showAuthModal('login');
          } else {
            window.location.href = sitePath('login.html');
          }
        }
      });
    });
  }

  function normalizeLocalLinks() {
    if (window.location.protocol !== 'file:') return;

    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (!href || href.indexOf('http') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('#') === 0) {
        return;
      }

      if (href.charAt(0) === '/' && href.endsWith('/')) {
        link.setAttribute('href', sitePath(href + 'index.html'));
      }
    });
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

  function initPageGuide() {
    if (document.getElementById('dct-page-guide')) return;

    var guideStyle = document.getElementById('dct-page-guide-style');
    if (!guideStyle && document.head) {
      guideStyle = document.createElement('style');
      guideStyle.id = 'dct-page-guide-style';
      guideStyle.textContent =
        '.dct-page-guide{' +
          'margin:2rem auto 0;padding:0.9rem 1.1rem;max-width:1100px;text-align:center;' +
          'color:#5a6a85;font-size:0.88rem;' +
          'font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;' +
        '}' +
        '.dct-page-guide a{color:#6D28D9;font-weight:700;text-decoration:underline;}';
      document.head.appendChild(guideStyle);
    }

    var guide = document.createElement('p');
    guide.className = 'dct-page-guide';
    guide.id = 'dct-page-guide';
    guide.setAttribute('role', 'note');
    guide.setAttribute('aria-label', 'Page support contact');
    guide.innerHTML = 'If you are experiencing any issues on this page, please contact <a href="mailto:thedopecloudteacher@gmail.com">thedopecloudteacher@gmail.com</a>.';

    var body = document.body;
    if (!body) return;
    body.appendChild(guide);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ensureThemeStyles();
      sanitizeCoursesPageLeak();
      initPageGuide();
      initBrandLogo();
      initStandardNav();
      initMobileNav();
      initFlipCards();
      initAuthFallback();
      normalizeLocalLinks();
    });
  } else {
    ensureThemeStyles();
    sanitizeCoursesPageLeak();
    initPageGuide();
    initBrandLogo();
    initStandardNav();
    initMobileNav();
    initFlipCards();
    initAuthFallback();
    normalizeLocalLinks();
  }
})();
