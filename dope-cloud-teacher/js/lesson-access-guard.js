(function () {
  var FREE_LESSON_LIMIT = 2;
  var COURSE_ID = 'cloud-fundamentals-101';

  function lessonNumberFromPath() {
    var match = /lesson(\d+)\.html/i.exec(window.location.pathname);
    return match ? parseInt(match[1], 10) : null;
  }

  function buildOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'dctLessonPaywall';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(11,11,18,0.94);display:flex;align-items:center;justify-content:center;z-index:10000;padding:1rem;';
    overlay.innerHTML =
      '<div style="max-width:520px;text-align:center;padding:2.2rem 1.8rem;background:linear-gradient(135deg,#1A1030,#0B0B12);border:2px solid #6D28D9;border-radius:20px;color:#fff;">' +
      '<i class="fas fa-lock" style="font-size:2.6rem;color:#A855F7;margin-bottom:0.8rem;"></i>' +
      '<h2 style="color:#A855F7;margin:0 0 0.6rem;font-size:1.5rem;">This Lesson Is Part of a Paid Course</h2>' +
      '<p style="color:#e0e0e0;margin:0 0 1.4rem;line-height:1.6;">You can preview the first ' + FREE_LESSON_LIMIT + ' lessons for free. Unlock the rest of this course with a one-time purchase or an all-access membership.</p>' +
      '<div style="display:flex;gap:0.7rem;justify-content:center;flex-wrap:wrap;">' +
      '<a href="pricing.html" style="background:#A855F7;color:#0B0B12;text-decoration:none;font-weight:700;padding:0.75rem 1.2rem;border-radius:10px;">See Pricing</a>' +
      '<a href="courses.html?course=' + COURSE_ID + '" style="background:rgba(255,255,255,0.1);color:#fff;text-decoration:none;font-weight:700;padding:0.75rem 1.2rem;border-radius:10px;border:1px solid rgba(255,255,255,0.25);">Back to Course</a>' +
      '</div>' +
      '</div>';
    return overlay;
  }

  function lockPage() {
    var gatedSelector = '.content-block, .quiz-section, .video-wrapper, .navigation-buttons, .affirmation, .topics-grid';
    document.querySelectorAll(gatedSelector).forEach(function (node) {
      node.style.filter = 'blur(6px)';
      node.style.pointerEvents = 'none';
      node.style.userSelect = 'none';
    });
    document.body.appendChild(buildOverlay());
  }

  function showFreePreviewBadge(lessonNum) {
    var header = document.querySelector('.lesson-header, .lesson-container');
    if (!header) return;
    var badge = document.createElement('p');
    badge.style.cssText = 'display:inline-block;margin-top:0.4rem;background:#10b981;color:#fff;font-weight:700;padding:0.3rem 0.8rem;border-radius:999px;font-size:0.85rem;';
    badge.textContent = 'Free Preview Lesson ' + lessonNum + ' of ' + FREE_LESSON_LIMIT;
    header.appendChild(badge);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lessonNum = lessonNumberFromPath();
    if (!lessonNum) return;

    if (lessonNum <= FREE_LESSON_LIMIT) {
      showFreePreviewBadge(lessonNum);
      return;
    }

    function checkAccess() {
      if (window.dopeCourses && typeof dopeCourses.hasCourseAccess === 'function') {
        dopeCourses.hasCourseAccess(COURSE_ID).then(function (hasAccess) {
          if (!hasAccess) lockPage();
        }).catch(function () {
          lockPage();
        });
      } else {
        lockPage();
      }
    }

    checkAccess();
  });
})();
