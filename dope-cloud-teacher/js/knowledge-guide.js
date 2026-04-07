(function () {
  if (window.__dopeKnowledgeGuideLoaded) return;
  window.__dopeKnowledgeGuideLoaded = true;

  const pageKey = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
  const storageKey = 'dopeKnowledgeGuideCollapsed';

  const guideTips = {
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

  function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function getTip(key) {
    return guideTips[key] || fallbackTips[hashString(key) % fallbackTips.length];
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

      .dope-guide__bubble {
        max-width: min(340px, calc(100vw - 140px));
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.98), rgba(76, 29, 149, 0.96));
        color: #f8fafc;
        border: 1px solid rgba(119, 239, 227, 0.35);
        border-radius: 18px;
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

      .dope-guide__label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 8px;
        font-size: 0.82rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #77efe3;
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
      }

      .dope-guide__text {
        margin: 0;
        font-size: 0.96rem;
        line-height: 1.55;
      }

      .dope-guide__teacher {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }

      .dope-guide__avatar {
        width: 88px;
        height: 118px;
        display: block;
        filter: drop-shadow(0 10px 18px rgba(15, 23, 42, 0.28));
      }

      .dope-guide__tag {
        background: rgba(15, 23, 42, 0.92);
        color: #f8fafc;
        border: 1px solid rgba(119, 239, 227, 0.32);
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 0.74rem;
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

      #dopeKnowledgeGuide.is-collapsed .dope-guide__bubble,
      #dopeKnowledgeGuide.is-collapsed .dope-guide__teacher {
        display: none;
      }

      #dopeKnowledgeGuide.is-collapsed .dope-guide__reopen {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      @media (max-width: 640px) {
        #dopeKnowledgeGuide {
          right: 10px;
          left: 10px;
          bottom: 10px;
          justify-content: flex-end;
        }

        .dope-guide__bubble {
          max-width: calc(100vw - 120px);
          padding: 12px 14px;
        }

        .dope-guide__text {
          font-size: 0.9rem;
        }

        .dope-guide__avatar {
          width: 74px;
          height: 100px;
        }

        .dope-guide__tag {
          font-size: 0.68rem;
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
      <button class="dope-guide__reopen" type="button" aria-label="Show hidden jewel">💎 Hidden jewel</button>
      <div class="dope-guide__bubble">
        <div class="dope-guide__label">
          <span>Coach Ro’s knowledge drop</span>
          <button class="dope-guide__close" type="button" aria-label="Hide guide">×</button>
        </div>
        <p class="dope-guide__text">${getTip(pageKey)}</p>
      </div>
      <div class="dope-guide__teacher">
        <svg class="dope-guide__avatar" viewBox="0 0 120 160" aria-hidden="true">
          <defs>
            <linearGradient id="blazerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#7b4df2" />
              <stop offset="100%" stop-color="#4f46e5" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="152" rx="28" ry="6" fill="rgba(15,23,42,0.18)" />
          <circle cx="60" cy="34" r="18" fill="#a96f55" />
          <path d="M42 31c2-16 14-24 27-22 10 1 16 7 19 18-4-2-7-2-10-2-4 0-6 1-8 3-5-4-12-4-28 3z" fill="#1f172f" />
          <rect x="51" y="47" width="18" height="12" rx="5" fill="#a96f55" />
          <path d="M35 65c3-13 14-20 25-20s22 7 25 20l6 28H29l6-28z" fill="url(#blazerGlow)" />
          <path d="M48 61h24l-6 17H54z" fill="#f8fafc" opacity="0.92" />
          <rect x="42" y="92" width="36" height="34" rx="10" fill="#d946ef" opacity="0.92" />
          <rect x="31" y="68" width="11" height="42" rx="5" fill="#a96f55" />
          <rect x="78" y="68" width="11" height="42" rx="5" fill="#a96f55" />
          <rect x="45" y="126" width="11" height="22" rx="5" fill="#4b5563" />
          <rect x="64" y="126" width="11" height="22" rx="5" fill="#4b5563" />
          <path d="M41 146h19c0 5-4 8-10 8-6 0-9-3-9-8z" fill="#f8fafc" />
          <path d="M60 146h19c0 5-4 8-10 8-6 0-9-3-9-8z" fill="#f8fafc" />
          <circle cx="53" cy="34" r="2" fill="#2b1b14" />
          <circle cx="67" cy="34" r="2" fill="#2b1b14" />
          <path d="M53 42c4 4 10 4 14 0" stroke="#7a2f2f" stroke-width="2" fill="none" stroke-linecap="round" />
        </svg>
        <div class="dope-guide__tag">Coach Ro • blazer energy</div>
      </div>
    `;

    document.body.appendChild(wrapper);

    const collapsed = window.localStorage.getItem(storageKey) === 'true';
    if (collapsed) {
      wrapper.classList.add('is-collapsed');
    }

    const closeButton = wrapper.querySelector('.dope-guide__close');
    const reopenButton = wrapper.querySelector('.dope-guide__reopen');

    closeButton.addEventListener('click', function () {
      wrapper.classList.add('is-collapsed');
      window.localStorage.setItem(storageKey, 'true');
    });

    reopenButton.addEventListener('click', function () {
      wrapper.classList.remove('is-collapsed');
      window.localStorage.setItem(storageKey, 'false');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildGuide);
  } else {
    buildGuide();
  }
})();
