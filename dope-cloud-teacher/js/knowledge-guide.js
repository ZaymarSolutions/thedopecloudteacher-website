(function () {
  if (window.__dopeKnowledgeGuideLoaded) return;
  window.__dopeKnowledgeGuideLoaded = true;

  const pageKey = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
  const dismissKey = 'dopeKnowledgeGuideDismissedOn';
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  const baseTips = {
    'index.html': '💎 Hidden jewel: pick one cloud lane and stay steady—consistency beats cramming every time.',
    'courses.html': '💎 Hidden jewel: the smartest learners stack fundamentals first, specialization second.',
    'pricing.html': '💎 Hidden jewel: structure saves time, and time is one of the most expensive things to lose.',
    'dashboard.html': '💎 Hidden jewel: quick review before a new lesson locks knowledge in deeper.',
    'resources.html': '💎 Hidden jewel: one strong cheat sheet can save a beginner from a week of confusion.',
    'certificate.html': '💎 Hidden jewel: the certificate gets attention, but your story and projects build trust.',
    'shop.html': '💎 Hidden jewel: the best tool is the one you actually use this week to practice.',
    'privacy.html': '💎 Hidden jewel: great technologists protect people, not just platforms.',
    'terms.html': '💎 Hidden jewel: professionalism lives in the details—online and in cloud work.',
    'verify.html': '💎 Hidden jewel: verification matters in security and in career growth—keep proof of your wins.',
    'login.html': '💎 Hidden jewel: identity is your first security boundary, so treat sign-in like it matters.',
    'comingsoon.html': '💎 Hidden jewel: a thoughtful foundation usually ages better than a rushed launch.',
    'garden-guardian-demo.html': '💎 Hidden jewel: the strongest demos tell a clear story from risk to response to impact.',
    'leads-admin.html': '💎 Hidden jewel: clean follow-up systems quietly turn curiosity into opportunity.',
    'cloud-career-starter-kit.html': '💎 Hidden jewel: choose one cert, one project, and one public proof point for this month.',
    'Cloud-fundamentals-course.html': '💎 Hidden jewel: fundamentals are not “basic”—they are what pros lean on under pressure.',
    'lesson.html': '💎 Hidden jewel: if you can explain the lesson out loud, you are really starting to own it.',
    'lesson-nav-template.html': '💎 Hidden jewel: templates save time, but thoughtful details create a memorable learning experience.',
    'lesson1.html': '💎 Hidden jewel: when you know the history, modern cloud patterns stop feeling random.',
    'lesson2.html': '💎 Hidden jewel: if you know who manages what, service-model questions get way easier.',
    'lesson3.html': '💎 Hidden jewel: the best deployment model is the one that fits the workload—not the trend.',
    'lesson4.html': '💎 Hidden jewel: cloud value gets stronger when governance grows right beside it.',
    'lesson5.html': '💎 Hidden jewel: free tiers work best when curiosity is paired with budgets and alerts.',
    'lesson6.html': '💎 Hidden jewel: most cloud breaches begin with weak access control, not movie-style hacking.',
    'lesson7.html': '💎 Hidden jewel: containers shine when consistency and speed matter more than heavyweight setup.',
    'lesson8.html': '💎 Hidden jewel: a clean network design prevents half the troubleshooting before it starts.',
    'lesson9.html': '💎 Hidden jewel: alerts help you catch the problem early; logs help you understand what happened.',
    'lesson10.html': '💎 Hidden jewel: one honest project you can explain clearly beats ten buzzwords on a resume.',
    'ai-900-azure-ai-fundamentals.html': '💎 Hidden jewel: AI gets powerful when the use case, the data, and the guardrails are all clear.',
    'az-900-azure-fundamentals.html': '💎 Hidden jewel: once you master the language of cloud, the portal stops feeling intimidating.',
    'az-104-azure-administrator.html': '💎 Hidden jewel: great admins prevent problems quietly before anyone notices them.',
    'az-305-azure-solutions-architect.html': '💎 Hidden jewel: architects earn trust by explaining trade-offs, not just listing services.'
  };

  const fallbackTips = [
    '💎 Hidden jewel: momentum grows when you turn today’s lesson into tomorrow’s habit.',
    '💎 Hidden jewel: small, repeated practice usually beats one giant study sprint.',
    '💎 Hidden jewel: clarity comes faster when you connect the concept to a real-world example.',
    '💎 Hidden jewel: the best learners review, apply, and explain—not just read.'
  ];

  const dailyTwists = [
    'Today’s move: explain one concept out loud before you leave this page.',
    'Today’s move: turn this page into one note, one action, or one question to revisit.',
    'Today’s move: connect what you learned here to one real job task or real-life example.',
    'Today’s move: save one small win now—screenshots, notes, and progress all count.',
    'Today’s move: review for five extra minutes so tomorrow feels easier, not heavier.'
  ];

  function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function getDailyIndex(key, length) {
    return hashString(`${todayKey}|${key}`) % length;
  }

  function getTip(key) {
    const baseTip = baseTips[key] || fallbackTips[getDailyIndex(`${key}|fallback`, fallbackTips.length)];
    const twist = dailyTwists[getDailyIndex(`${key}|twist`, dailyTwists.length)];
    return `${baseTip} ${twist}`;
  }

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Ignore storage issues and keep the guide visible.
    }
  }

  const styleMode = getDailyIndex(`${pageKey}|style`, 2) === 0 ? 'kicks' : 'heels';

  function getCoachTag() {
    return styleMode === 'heels'
      ? 'Coach Ro • blazer + heels'
      : 'Coach Ro • fresh kicks + blazer';
  }

  function getCoachSubline() {
    return styleMode === 'heels'
      ? 'Polished, powerful, and still dropping gems.'
      : 'Fresh kicks, sharp blazer, and cloud wisdom on deck.';
  }

  function renderCoachAvatar(mode) {
    const variantTag = mode === 'heels' ? 'Polished' : 'Street-smart';
    return `
      <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
        <img class="dope-guide__avatar" src="images/programs/coach-ro-portrait.svg" alt="Coach Ro avatar" />
        <span style="font-size:0.66rem; color:#d9d2ff; font-weight:700; letter-spacing:0.06em; text-transform:uppercase;">${variantTag} mode</span>
      </div>
    `;
  }

  function injectStyles() {
    if (document.getElementById('dopeKnowledgeGuideStyles')) return;

    const style = document.createElement('style');
    style.id = 'dopeKnowledgeGuideStyles';
    style.textContent = `
      #dopeKnowledgeGuide {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 1400;
        display: flex;
        align-items: flex-end;
        gap: 12px;
        font-family: 'Segoe UI', Arial, sans-serif;
      }

      #dopeKnowledgeGuide * {
        box-sizing: border-box;
      }

      @keyframes dopeGuideFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }

      .dope-guide__bubble {
        max-width: min(360px, calc(100vw - 140px));
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.98), rgba(76, 29, 149, 0.96));
        color: #f8fafc;
        border: 1px solid rgba(119, 239, 227, 0.35);
        border-radius: 20px;
        padding: 14px 16px;
        box-shadow: 0 18px 38px rgba(15, 23, 42, 0.35);
        position: relative;
        backdrop-filter: blur(10px);
      }

      .dope-guide__bubble::after {
        content: '';
        position: absolute;
        right: -10px;
        bottom: 18px;
        width: 18px;
        height: 18px;
        background: rgba(64, 22, 110, 0.96);
        border-right: 1px solid rgba(119, 239, 227, 0.35);
        border-bottom: 1px solid rgba(119, 239, 227, 0.35);
        transform: rotate(-45deg);
      }

      .dope-guide__brand-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 10px;
      }

      .dope-guide__brand {
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }

      .dope-guide__brand-mark {
        width: 34px;
        height: 34px;
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #7b4df2, #ec4899);
        color: #fff;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        box-shadow: 0 8px 20px rgba(123, 77, 242, 0.28);
        flex-shrink: 0;
      }

      .dope-guide__label {
        display: block;
        margin-bottom: 2px;
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #77efe3;
      }

      .dope-guide__subline {
        margin: 0;
        color: #d9d2ff;
        font-size: 0.78rem;
        line-height: 1.35;
      }

      .dope-guide__close {
        border: none;
        background: rgba(255,255,255,0.08);
        color: #f8fafc;
        border-radius: 999px;
        width: 28px;
        height: 28px;
        cursor: pointer;
        font-size: 16px;
        flex-shrink: 0;
      }

      .dope-guide__text {
        margin: 0;
        font-size: 0.96rem;
        line-height: 1.55;
      }

      .dope-guide__rotation-note {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 10px;
        padding: 5px 8px;
        border-radius: 999px;
        background: rgba(119, 239, 227, 0.12);
        color: #c9fff8;
        font-size: 0.74rem;
        font-weight: 700;
      }

      .dope-guide__teacher {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        animation: dopeGuideFloat 4.8s ease-in-out infinite;
        cursor: pointer;
      }

      .dope-guide__teacher:focus-visible {
        outline: 2px solid #77efe3;
        outline-offset: 4px;
        border-radius: 12px;
      }

      .dope-guide__avatar {
        width: 96px;
        height: 128px;
        display: block;
        filter: drop-shadow(0 12px 18px rgba(15, 23, 42, 0.28));
      }

      .dope-guide__tag {
        background: rgba(15, 23, 42, 0.92);
        color: #f8fafc;
        border: 1px solid rgba(119, 239, 227, 0.32);
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 0.72rem;
        font-weight: 700;
        white-space: nowrap;
      }

      .dope-guide__reopen {
        display: none;
        border: none;
        border-radius: 999px;
        background: linear-gradient(135deg, #7b4df2, #171d3f);
        color: #fff;
        padding: 10px 14px;
        box-shadow: 0 14px 28px rgba(15, 23, 42, 0.28);
        cursor: pointer;
        font-weight: 700;
      }

      #dopeKnowledgeGuide.is-collapsed .dope-guide__bubble {
        display: none;
      }

      #dopeKnowledgeGuide.is-collapsed .dope-guide__teacher {
        opacity: 1;
      }

      #dopeKnowledgeGuide.is-collapsed .dope-guide__reopen {
        display: none;
      }

      @media (max-width: 640px) {
        #dopeKnowledgeGuide {
          right: 10px;
          left: 10px;
          bottom: 10px;
          justify-content: flex-end;
        }

        .dope-guide__bubble {
          max-width: calc(100vw - 118px);
          padding: 12px 14px;
        }

        .dope-guide__text {
          font-size: 0.9rem;
        }

        .dope-guide__avatar {
          width: 80px;
          height: 108px;
        }

        .dope-guide__tag {
          font-size: 0.66rem;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function buildGuide() {
    injectStyles();

    const wrapper = document.createElement('div');
    wrapper.id = 'dopeKnowledgeGuide';
    wrapper.setAttribute('role', 'complementary');
    wrapper.setAttribute('aria-label', 'Coach Ro hidden jewel');

    wrapper.innerHTML = `
      <button class="dope-guide__reopen" type="button" aria-label="Show hidden jewel">💎 Coach Ro’s drop</button>
      <div class="dope-guide__bubble">
        <div class="dope-guide__brand-row">
          <div class="dope-guide__brand">
            <div class="dope-guide__brand-mark">CR</div>
            <div>
              <span class="dope-guide__label">Coach Ro • The Dope Drop</span>
              <p class="dope-guide__subline">${getCoachSubline()}</p>
            </div>
          </div>
          <button class="dope-guide__close" type="button" aria-label="Hide guide">×</button>
        </div>
        <p class="dope-guide__text">${getTip(pageKey)}</p>
        <div class="dope-guide__rotation-note">✨ Daily hidden jewel • rotates every day</div>
      </div>
      <div class="dope-guide__teacher">
        ${renderCoachAvatar(styleMode)}
        <div class="dope-guide__tag">${getCoachTag()}</div>
      </div>
    `;

    document.body.appendChild(wrapper);

    const dismissedToday = readStorage(dismissKey) === todayKey;
    if (dismissedToday) {
      wrapper.classList.add('is-collapsed');
    }

    const closeButton = wrapper.querySelector('.dope-guide__close');
    const reopenButton = wrapper.querySelector('.dope-guide__reopen');
    const teacher = wrapper.querySelector('.dope-guide__teacher');

    closeButton.addEventListener('click', function () {
      wrapper.classList.add('is-collapsed');
      writeStorage(dismissKey, todayKey);
    });

    reopenButton.addEventListener('click', function () {
      wrapper.classList.remove('is-collapsed');
      writeStorage(dismissKey, 'open');
    });

    teacher.addEventListener('click', function () {
      if (wrapper.classList.contains('is-collapsed')) {
        wrapper.classList.remove('is-collapsed');
        writeStorage(dismissKey, 'open');
      }
    });

    teacher.addEventListener('keydown', function (event) {
      if ((event.key === 'Enter' || event.key === ' ') && wrapper.classList.contains('is-collapsed')) {
        event.preventDefault();
        wrapper.classList.remove('is-collapsed');
        writeStorage(dismissKey, 'open');
      }
    });

    teacher.setAttribute('tabindex', '0');
    teacher.setAttribute('role', 'button');
    teacher.setAttribute('aria-label', 'Open Coach Ro knowledge drop');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildGuide);
  } else {
    buildGuide();
  }
})();
