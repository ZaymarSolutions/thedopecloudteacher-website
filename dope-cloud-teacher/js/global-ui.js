(function () {
  if (window.__dctGlobalUiLoaded) return;
  window.__dctGlobalUiLoaded = true;

  function initMobileNav() {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.querySelector('nav.nav-links');
    if (!toggle || !nav) return;

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
      initMobileNav();
      initFlipCards();
    });
  } else {
    initMobileNav();
    initFlipCards();
  }
})();
