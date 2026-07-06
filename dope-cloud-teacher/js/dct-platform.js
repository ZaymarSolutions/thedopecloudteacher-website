(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function toPrettyDate(isoDate) {
    var value = new Date(isoDate + 'T00:00:00');
    return value.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function safe(arr) {
    return Array.isArray(arr) ? arr : [];
  }

  function slugFromPosterId(id) {
    return String(id || '').replace(/^poster-/, '').trim();
  }

  function lessonHref(lessonId, courseId) {
    var lessonQuery = '/lesson.html?lesson=' + encodeURIComponent(lessonId || '');
    if (courseId) {
      lessonQuery += '&course=' + encodeURIComponent(courseId);
    }
    return lessonQuery;
  }

  function preferredCourseIdForPoster(poster) {
    if (!poster) return '';
    var ids = safe(poster.relatedCourseIds);
    var selfPaced = ids.find(function (id) {
      return id !== 'course-pg-parks-cohort' && id !== 'course-live-virtual-cohort';
    });
    return selfPaced || ids[0] || '';
  }

  function courseIdForLesson(model, lessonId, poster) {
    if (model && model.byId && model.byId.lesson && model.byId.module) {
      var lesson = model.byId.lesson[lessonId];
      if (lesson && lesson.moduleId && model.byId.module[lesson.moduleId]) {
        return model.byId.module[lesson.moduleId].courseId || preferredCourseIdForPoster(poster);
      }
    }
    return preferredCourseIdForPoster(poster);
  }

  function primaryLessonIdForPoster(poster) {
    if (!poster) return '';
    var preferred = {
      'poster-pim-pro': 'lesson-security-pim-01',
      'poster-least-privilege': 'lesson-security-pim-02',
      'poster-devsecops-pipeline': 'lesson-devsecops-01',
      'poster-defender-cnapp': 'lesson-devsecops-02',
      'poster-zero-trust-azure': 'lesson-arch-01',
      'poster-azure-regions-map': 'lesson-azure-core-01',
      'poster-azure-policy-control': 'lesson-azure-core-02',
      'poster-ai-rag': 'lesson-ai-02',
      'poster-career-roadmap': 'lesson-career-01'
    };
    return preferred[poster.id] || safe(poster.relatedLessonIds)[0] || '';
  }

  function courseHref(courseId) {
    var map = {
      'course-pg-parks-cohort': '/classes/pg-parks/',
      'course-live-virtual-cohort': '/classes/live/',
      'course-azure-fundamentals': '/academy/azure-fundamentals/',
      'course-azure-security': '/academy/azure-security/',
      'course-devsecops': '/academy/devsecops/',
      'course-ai-fundamentals': '/academy/ai-fundamentals/',
      'course-cloud-architecture': '/academy/cloud-architecture/',
      'course-career-prep': '/academy/career-prep/'
    };
    return map[courseId] || '/academy/';
  }

  function getModel() {
    var base = window.DCTLearningModel || {
      courses: [],
      modules: [],
      lessons: [],
      visualPosters: [],
      quizzes: [],
      cohorts: [],
      resources: [],
      byId: { course: {}, module: {}, lesson: {}, poster: {}, quiz: {}, cohort: {}, resource: {} }
    };

    var posters = safe(base.visualPosters).map(function (poster) {
      var slug = poster.slug || slugFromPosterId(poster.id);
      return Object.assign({}, poster, {
        slug: slug,
        route: poster.route || '/playbook/' + slug + '/',
        category: poster.category || poster.topic || 'Security',
        thumbnailUrl: poster.thumbnailUrl || poster.imageUrl,
        fullImageUrl: poster.fullImageUrl || poster.imageUrl,
        downloadablePngUrl: poster.downloadablePngUrl || poster.imageUrl,
        downloadablePdfUrl: poster.downloadablePdfUrl || '/resources.html',
        relatedBlogUrls: safe(poster.relatedBlogUrls).length ? poster.relatedBlogUrls : [poster.blogUrl || '/blog.html'],
        relatedLabUrls: safe(poster.relatedLabUrls).length ? poster.relatedLabUrls : ['/resources.html'],
        relatedQuizId: poster.relatedQuizId || (safe(poster.relatedLessonIds)[0] && base.byId && base.byId.lesson[safe(poster.relatedLessonIds)[0]] ? base.byId.lesson[safe(poster.relatedLessonIds)[0]].quizId : ''),
        relatedPosterIds: safe(poster.relatedPosterIds),
        estimatedLearningTime: poster.estimatedLearningTime || 8,
        relatedVideoUrl: poster.relatedVideoUrl || '/resources.html#video',
        downloadableCheatSheetUrl: poster.downloadableCheatSheetUrl || '/resources.html'
      });
    });

    var posterById = {};
    posters.forEach(function (poster) { posterById[poster.id] = poster; });

    return Object.assign({}, base, {
      visualPosters: posters,
      byId: Object.assign({}, base.byId || {}, {
        poster: Object.assign({}, (base.byId && base.byId.poster) || {}, posterById)
      })
    });
  }

  function navItems() {
    return [
      { href: '/index.html', label: 'Home', key: 'home' },
      { href: '/classes/', label: 'Classes', key: 'classes' },
      { href: '/academy/', label: 'Academy', key: 'academy' },
      { href: '/playbook/', label: 'Visual Playbook', key: 'playbook' },
      { href: '/student-dashboard/', label: 'Student Dashboard', key: 'student-dashboard' },
      { href: '/corporate-training.html', label: 'For Businesses', key: 'business' },
      { href: '/about.html', label: 'About', key: 'about' },
      { href: '/contact.html', label: 'Contact', key: 'contact' }
    ];
  }

  function renderHeader(activeKey) {
    var slot = $('dct-header');
    if (!slot) return;

    var links = navItems().map(function (item) {
      var active = item.key === activeKey ? ' class="active"' : '';
      return '<a href="' + item.href + '"' + active + '>' + item.label + '</a>';
    }).join('');

    slot.innerHTML =
      '<header class="platform-header">' +
      '<div class="platform-header-inner">' +
      '<a class="brand-lockup" href="/index.html">' +
      '<img src="/logo.svg?v=20260704a" alt="The Dope Cloud Teacher logo">' +
      '<div class="brand-copy">' +
      '<strong>The Dope Cloud Teacher</strong>' +
      '<span>Cloud, AI, Security, and Career Readiness</span>' +
      '</div>' +
      '</a>' +
      '<nav class="platform-nav" aria-label="Primary">' + links + '</nav>' +
      '</div>' +
      '</header>';
  }

  function byIds(ids, lookup) {
    return safe(ids).map(function (id) { return lookup[id]; }).filter(Boolean);
  }

  function courseFocusList(course, model) {
    var lessons = byIds(course.lessons, model.byId.lesson);
    var focus = [];
    lessons.forEach(function (lesson) {
      safe(lesson.certificationMapping).forEach(function (item) {
        var clean = String(item).split(':')[0].trim();
        if (clean && focus.indexOf(clean) === -1) {
          focus.push(clean);
        }
      });
    });
    return focus;
  }

  function renderFeaturedPlaybook(targetId, count) {
    var model = getModel();
    var target = $(targetId);
    if (!target) return;

    var posters = safe(model.visualPosters).slice(0, count || 5);
    target.innerHTML = posters.map(function (poster) {
      var firstLesson = primaryLessonIdForPoster(poster);
      var preferredCourseId = courseIdForLesson(model, firstLesson, poster);
      return (
        '<article class="dct-playbook-feature-card">' +
        '<a class="dct-playbook-card-media" href="' + poster.route + '"><img src="' + poster.thumbnailUrl + '" alt="' + poster.title + '"></a>' +
        '<div class="dct-playbook-card-copy">' +
        '<span class="dct-playbook-kicker">' + poster.category + '</span>' +
        '<h3>' + poster.title + '</h3>' +
        '<p>' + poster.topic + ' | ' + poster.difficulty + ' | ' + poster.estimatedLearningTime + ' min</p>' +
        '<div class="dct-playbook-actions">' +
        '<a class="dct-btn-open" href="' + poster.route + '">Open Guide</a>' +
        '<a class="dct-btn-start" href="' + lessonHref(firstLesson, preferredCourseId) + '">Start Lesson</a>' +
        '</div>' +
        '</div>' +
        '</article>'
      );
    }).join('');
  }

  function startPosterCarousel(trackId) {
    var model = getModel();
    var track = $(trackId);
    if (!track) return;
    var posters = safe(model.visualPosters);
    if (!posters.length) return;

    track.innerHTML = posters.map(function (poster) {
      return (
        '<a class="dct-carousel-slide" href="' + poster.route + '">' +
        '<img src="' + poster.thumbnailUrl + '" alt="' + poster.title + '">' +
        '<span>' + poster.category + '</span>' +
        '</a>'
      );
    }).join('');

    if (window.matchMedia && window.matchMedia('(max-width: 900px)').matches) {
      track.style.transform = 'translateX(0)';
      return;
    }

    var index = 0;
    var stepPercent = 100;
    var timer = setInterval(function () {
      index = (index + 1) % posters.length;
      track.style.transform = 'translateX(' + (index * -stepPercent) + '%)';
    }, 5000);

    window.addEventListener('beforeunload', function () {
      clearInterval(timer);
    });
  }

  function searchEverything(query) {
    var model = getModel();
    var q = String(query || '').trim().toLowerCase();
    if (!q) return [];

    var results = [];

    safe(model.courses).forEach(function (course) {
      var hay = [course.title, course.description, course.audience].join(' ').toLowerCase();
      if (hay.indexOf(q) !== -1) {
        results.push({ type: 'Course', title: course.title, href: courseHref(course.id) });
      }
    });

    safe(model.visualPosters).forEach(function (poster) {
      var hay = [poster.title, poster.topic, poster.category].concat(safe(poster.tags)).join(' ').toLowerCase();
      if (hay.indexOf(q) !== -1) {
        results.push({ type: 'Poster', title: poster.title, href: poster.route });
        results.push({ type: 'Video', title: poster.title + ' video lesson', href: poster.relatedVideoUrl });
        results.push({ type: 'Lab', title: poster.title + ' lab', href: safe(poster.relatedLabUrls)[0] || '/resources.html' });
        if (poster.relatedQuizId && model.byId.quiz[poster.relatedQuizId]) {
          results.push({ type: 'Quiz', title: model.byId.quiz[poster.relatedQuizId].title, href: lessonHref(model.byId.quiz[poster.relatedQuizId].relatedLessonId) });
        }
        results.push({ type: 'Blog', title: poster.title + ' article', href: safe(poster.relatedBlogUrls)[0] || '/blog.html' });
      }
    });

    return results.slice(0, 24);
  }

  function bindSearchEverything(inputId, resultsId) {
    var input = $(inputId);
    var results = $(resultsId);
    if (!input || !results) return;

    function draw() {
      var found = searchEverything(input.value);
      if (!found.length) {
        results.innerHTML = '<article class="card"><h3>No results yet</h3><p>Try a keyword like Sentinel, PIM, Zero Trust, or DevSecOps.</p></article>';
        return;
      }
      results.innerHTML = found.map(function (item) {
        return '<article class="card dct-search-card"><p class="dct-search-type">' + item.type + '</p><h3>' + item.title + '</h3><a class="btn secondary" href="' + item.href + '">Open</a></article>';
      }).join('');
    }

    input.addEventListener('input', draw);
    draw();
  }

  function renderCohortCards(type, targetId) {
    var model = getModel();
    var target = $(targetId);
    if (!target) return;
    var cohorts = safe(model.cohorts).filter(function (cohort) { return cohort.type === type; });

    target.innerHTML = cohorts.map(function (cohort) {
      return (
        '<article class="card">' +
        '<h3>' + cohort.title + '</h3>' +
        '<p><strong>Dates:</strong> ' + toPrettyDate(cohort.startDate) + ' to ' + toPrettyDate(cohort.endDate) + '</p>' +
        '<p><strong>Schedule:</strong> ' + cohort.schedule + '</p>' +
        '<p><strong>Location:</strong> ' + cohort.location + '</p>' +
        '<p><strong>Enrolled:</strong> ' + cohort.enrolledStudents + ' students</p>' +
        (cohort.virtualLink ? '<p><strong>Virtual Access:</strong> ' + cohort.virtualLink + '</p>' : '') +
        '<div class="pill-row">' +
        byIds(cohort.assignedCourseIds, model.byId.course).map(function (course) { return '<span class="pill">' + course.title + '</span>'; }).join('') +
        '</div>' +
        '</article>'
      );
    }).join('');
  }

  function renderCourseTrackCards(targetId, deliveryType) {
    var model = getModel();
    var target = $(targetId);
    if (!target) return;

    var courses = safe(model.courses).filter(function (course) {
      return deliveryType ? course.deliveryType === deliveryType : true;
    });

    target.innerHTML = courses.map(function (course) {
      var moduleCount = safe(course.modules).length;
      var lessonCount = safe(course.lessons).length;
      var posterCount = safe(course.assets).length;
      return (
        '<article class="card">' +
        '<h3>' + course.title + '</h3>' +
        '<p>' + course.description + '</p>' +
        '<p><strong>Audience:</strong> ' + course.audience + '</p>' +
        '<div class="pill-row">' +
        '<span class="pill">' + moduleCount + ' Modules</span>' +
        '<span class="pill">' + lessonCount + ' Lessons</span>' +
        '<span class="pill">' + posterCount + ' Posters</span>' +
        '</div>' +
        '<div class="cta-row">' +
        '<a class="btn secondary" href="' + courseHref(course.id) + '">Open Track</a>' +
        '<a class="btn secondary" href="/playbook/">View Visual Assets</a>' +
        '</div>' +
        '</article>'
      );
    }).join('');
  }

  function renderAcademyExplorer(targetId) {
    var model = getModel();
    var target = $(targetId);
    if (!target) return;

    var courses = safe(model.courses).filter(function (course) { return course.deliveryType === 'self-paced'; });
    var focusOptions = [];
    courses.forEach(function (course) {
      courseFocusList(course, model).forEach(function (focus) {
        if (focusOptions.indexOf(focus) === -1) focusOptions.push(focus);
      });
    });
    focusOptions.sort();

    var focusSelect = $('academyFocus');
    if (focusSelect) {
      focusSelect.innerHTML = '<option value="all">All focus areas</option>' + focusOptions.map(function (focus) {
        return '<option value="' + focus + '">' + focus + '</option>';
      }).join('');
    }

    function draw() {
      var search = (($('academySearch') && $('academySearch').value) || '').trim().toLowerCase();
      var audienceFilter = (($('academyAudience') && $('academyAudience').value) || 'all').toLowerCase();
      var focusFilter = ($('academyFocus') && $('academyFocus').value) || 'all';

      var filtered = courses.filter(function (course) {
        var focus = courseFocusList(course, model);
        var haystack = [course.title, course.description, course.audience].join(' ').toLowerCase();
        var searchMatch = !search || haystack.indexOf(search) !== -1;
        var audienceMatch = audienceFilter === 'all' || course.audience.toLowerCase().indexOf(audienceFilter) !== -1;
        var focusMatch = focusFilter === 'all' || focus.indexOf(focusFilter) !== -1;
        return searchMatch && audienceMatch && focusMatch;
      });

      target.innerHTML = filtered.map(function (course) {
        var modules = byIds(course.modules, model.byId.module);
        var focus = courseFocusList(course, model);
        return (
          '<article class="card">' +
          '<h3>' + course.title + '</h3>' +
          '<p>' + course.description + '</p>' +
          '<p><strong>Audience:</strong> ' + course.audience + '</p>' +
          '<p><strong>Track Focus:</strong> ' + (focus.length ? focus.join(', ') : 'General') + '</p>' +
          '<div class="pill-row">' +
          '<span class="pill">' + modules.length + ' Modules</span>' +
          '<span class="pill">' + safe(course.lessons).length + ' Lessons</span>' +
          '<span class="pill">' + safe(course.assets).length + ' Visual Assets</span>' +
          '</div>' +
          '<div class="cta-row">' +
          '<a class="btn primary" href="' + courseHref(course.id) + '">Start This Track</a>' +
          '<a class="btn secondary" href="/student-dashboard/">Study Dashboard</a>' +
          '</div>' +
          '</article>'
        );
      }).join('');

      if (!filtered.length) {
        target.innerHTML = '<article class="card"><h3>No tracks match those filters yet.</h3><p>Try a broader search or choose All focus areas.</p></article>';
      }
    }

    ['academySearch', 'academyAudience', 'academyFocus'].forEach(function (id) {
      var el = $(id);
      if (el) {
        el.addEventListener('input', draw);
        el.addEventListener('change', draw);
      }
    });

    draw();
  }

  function renderLessonFlow(lesson, model) {
    var quiz = model.byId.quiz[lesson.quizId];
    var labLink = safe(lesson.downloadIds)[0] ? model.byId.resource[safe(lesson.downloadIds)[0]] : null;
    return (
      '<div class="dct-lesson-flow">' +
      '<span>Lesson</span><span>Video</span><span>Lab</span><span>Knowledge Check</span><span>Assignment</span>' +
      '</div>' +
      '<div class="cta-row">' +
      '<a class="btn primary" href="' + lessonHref(lesson.id) + '">Open Lesson</a>' +
      '<a class="btn secondary" href="' + ((lesson.relatedVideoUrl || '/resources.html#video')) + '">Watch Video</a>' +
      '<a class="btn secondary" href="' + (labLink ? labLink.url : '/resources.html') + '">Interactive Lab</a>' +
      '<a class="btn secondary" href="' + (quiz ? lessonHref(quiz.relatedLessonId) : lessonHref(lesson.id)) + '">Take Quiz</a>' +
      '</div>'
    );
  }

  function renderTrackDetail(courseId, detailsTargetId, lessonsTargetId) {
    var model = getModel();
    var course = model.byId.course[courseId];
    if (!course) return;

    var detailsTarget = $(detailsTargetId);
    var lessonsTarget = $(lessonsTargetId);

    if (detailsTarget) {
      var modules = byIds(course.modules, model.byId.module);
      var posters = byIds(course.assets, model.byId.poster);
      detailsTarget.innerHTML =
        '<article class="card">' +
        '<h3>' + course.title + '</h3>' +
        '<p>' + course.description + '</p>' +
        '<p><strong>Audience:</strong> ' + course.audience + '</p>' +
        '<p><strong>Delivery:</strong> ' + course.deliveryType + '</p>' +
        '<div class="pill-row">' + modules.map(function (mod) { return '<span class="pill">' + mod.title + '</span>'; }).join('') + '</div>' +
        '<div class="pill-row">' + posters.map(function (poster) { return '<span class="pill">Poster: ' + poster.title + '</span>'; }).join('') + '</div>' +
        '</article>';
    }

    if (lessonsTarget) {
      var lessons = byIds(course.lessons, model.byId.lesson);
      lessonsTarget.innerHTML = lessons.map(function (lesson) {
        var posters = byIds(lesson.relatedPosterIds, model.byId.poster);
        var heroPoster = posters[0];
        return (
          '<article class="card dct-lesson-card">' +
          (heroPoster ? '<a href="' + heroPoster.route + '" class="dct-lesson-poster"><img src="' + heroPoster.fullImageUrl + '" alt="' + heroPoster.title + '"></a>' : '') +
          '<h4>' + lesson.title + '</h4>' +
          '<p>' + lesson.summary + '</p>' +
          '<p><strong>Estimated Time:</strong> ' + lesson.estimatedTime + ' min</p>' +
          '<p><strong>Certification:</strong> ' + safe(lesson.certificationMapping).join(', ') + '</p>' +
          renderLessonFlow(lesson, model) +
          '</article>'
        );
      }).join('');
    }
  }

  function getFavoriteIds() {
    try {
      var raw = localStorage.getItem('dct-playbook-favorites');
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function setFavoriteIds(ids) {
    try {
      localStorage.setItem('dct-playbook-favorites', JSON.stringify(ids));
    } catch (err) {
      // no-op
    }
  }

  function toggleFavorite(posterId) {
    var ids = getFavoriteIds();
    var idx = ids.indexOf(posterId);
    if (idx === -1) ids.push(posterId);
    else ids.splice(idx, 1);
    setFavoriteIds(ids);
  }

  function getBookmarkIds() {
    try {
      var raw = localStorage.getItem('dct-playbook-bookmarks');
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function setBookmarkIds(ids) {
    try {
      localStorage.setItem('dct-playbook-bookmarks', JSON.stringify(ids));
    } catch (err) {
      // no-op
    }
  }

  function toggleBookmark(posterId) {
    var ids = getBookmarkIds();
    var idx = ids.indexOf(posterId);
    if (idx === -1) ids.push(posterId);
    else ids.splice(idx, 1);
    setBookmarkIds(ids);
  }

  function renderPlaybook(targetId) {
    var model = getModel();
    var target = $(targetId);
    if (!target) return;

    var courseSelect = $('posterCourse');
    if (courseSelect) {
      var selfPacedCourses = safe(model.courses).filter(function (course) { return course.deliveryType === 'self-paced'; });
      courseSelect.innerHTML = '<option value="all">All courses</option>' + selfPacedCourses.map(function (course) {
        return '<option value="' + course.id + '">' + course.title + '</option>';
      }).join('');
    }

    function draw() {
      var searchValue = (($('posterSearch') && $('posterSearch').value) || '').trim().toLowerCase();
      var difficultyValue = ($('posterDifficulty') && $('posterDifficulty').value) || 'all';
      var courseValue = ($('posterCourse') && $('posterCourse').value) || 'all';
      var categoryValue = ($('posterCategory') && $('posterCategory').value) || 'all';
      var sortValue = ($('posterSort') && $('posterSort').value) || 'title-asc';
      var favoriteOnly = ($('posterFavoriteOnly') && $('posterFavoriteOnly').checked) || false;
      var favoriteIds = getFavoriteIds();
      var bookmarkIds = getBookmarkIds();

      var posters = safe(model.visualPosters).filter(function (poster) {
        var matchesSearch = !searchValue || [poster.title, poster.topic, poster.category].concat(safe(poster.tags)).join(' ').toLowerCase().indexOf(searchValue) !== -1;
        var matchesDifficulty = difficultyValue === 'all' || poster.difficulty === difficultyValue;
        var matchesCourse = courseValue === 'all' || safe(poster.relatedCourseIds).indexOf(courseValue) !== -1;
        var matchesCategory = categoryValue === 'all' || String(poster.category).toLowerCase() === String(categoryValue).toLowerCase();
        var matchesFavorite = !favoriteOnly || favoriteIds.indexOf(poster.id) !== -1;
        return matchesSearch && matchesDifficulty && matchesCourse && matchesCategory && matchesFavorite;
      });

      posters.sort(function (a, b) {
        if (sortValue === 'time-asc') return a.estimatedLearningTime - b.estimatedLearningTime;
        if (sortValue === 'time-desc') return b.estimatedLearningTime - a.estimatedLearningTime;
        if (sortValue === 'difficulty') return String(a.difficulty).localeCompare(String(b.difficulty));
        return String(a.title).localeCompare(String(b.title));
      });

      target.innerHTML = posters.map(function (poster) {
        var relatedLessons = byIds(poster.relatedLessonIds, model.byId.lesson);
        var firstLessonId = primaryLessonIdForPoster(poster);
        var firstLesson = model.byId.lesson[firstLessonId] || relatedLessons[0];
        var preferredCourseId = courseIdForLesson(model, firstLesson && firstLesson.id, poster);
        var favorite = favoriteIds.indexOf(poster.id) !== -1;
        var bookmarked = bookmarkIds.indexOf(poster.id) !== -1;
        return (
          '<article class="card poster-card dct-poster-library-card">' +
          '<a href="' + poster.route + '"><img src="' + poster.thumbnailUrl + '" alt="' + poster.title + '"></a>' +
          '<h3>' + poster.title + '</h3>' +
          '<p><strong>Category:</strong> ' + poster.category + '</p>' +
          '<p><strong>Topic:</strong> ' + poster.topic + '</p>' +
          '<p><strong>Difficulty:</strong> ' + poster.difficulty + '</p>' +
          '<p><strong>Learning Time:</strong> ' + poster.estimatedLearningTime + ' min</p>' +
          '<p><strong>Related Lesson:</strong> ' + (firstLesson ? firstLesson.title : 'TBD') + '</p>' +
          '<div class="cta-row">' +
          '<a class="btn primary" href="' + poster.route + '">Open Guide</a>' +
          '<a class="btn secondary" href="' + (firstLesson ? lessonHref(firstLesson.id, preferredCourseId) : '/lesson.html') + '">Start Lesson</a>' +
          '<a class="btn secondary" href="' + poster.downloadablePdfUrl + '">Download PDF</a>' +
          '<a class="btn secondary" href="' + poster.downloadablePngUrl + '">Download PNG</a>' +
          '<button class="btn secondary dct-favorite-toggle" data-poster-id="' + poster.id + '">' + (favorite ? 'Unfavorite' : 'Favorite') + '</button>' +
          '<button class="btn secondary dct-bookmark-toggle" data-poster-id="' + poster.id + '">' + (bookmarked ? 'Remove Bookmark' : 'Bookmark') + '</button>' +
          '</div>' +
          '</article>'
        );
      }).join('');

      if (!posters.length) {
        target.innerHTML = '<article class="card"><h3>No posters match this filter.</h3><p>Try broadening search or clearing favorites filter.</p></article>';
      }

      Array.prototype.forEach.call(target.querySelectorAll('.dct-favorite-toggle'), function (button) {
        button.addEventListener('click', function () {
          toggleFavorite(button.getAttribute('data-poster-id'));
          draw();
        });
      });

      Array.prototype.forEach.call(target.querySelectorAll('.dct-bookmark-toggle'), function (button) {
        button.addEventListener('click', function () {
          toggleBookmark(button.getAttribute('data-poster-id'));
          draw();
        });
      });
    }

    ['posterSearch', 'posterDifficulty', 'posterCourse', 'posterCategory', 'posterSort', 'posterFavoriteOnly'].forEach(function (id) {
      var el = $(id);
      if (el) {
        el.addEventListener('input', draw);
        el.addEventListener('change', draw);
      }
    });

    draw();
  }

  function renderPosterDetail(slug, options) {
    var model = getModel();
    var poster = safe(model.visualPosters).find(function (item) { return item.slug === slug; });
    if (!poster) return;

    var titleEl = $(options.titleId);
    var heroEl = $(options.posterId);
    var detailsEl = $(options.detailsId);
    var relatedEl = $(options.relatedId);

    var firstLesson = byIds(poster.relatedLessonIds, model.byId.lesson)[0];
    var primaryLessonId = primaryLessonIdForPoster(poster);
    if (model.byId.lesson[primaryLessonId]) {
      firstLesson = model.byId.lesson[primaryLessonId];
    }
    var preferredCourseId = courseIdForLesson(model, firstLesson && firstLesson.id, poster);
    var relatedCourses = byIds(poster.relatedCourseIds, model.byId.course);
    var relatedQuiz = poster.relatedQuizId ? model.byId.quiz[poster.relatedQuizId] : null;
    var quizCourseId = relatedQuiz ? courseIdForLesson(model, relatedQuiz.relatedLessonId, poster) : preferredCourseId;

    if (titleEl) titleEl.textContent = poster.title;

    if (heroEl) {
      heroEl.innerHTML = '<img src="' + poster.fullImageUrl + '" alt="' + poster.title + '">';
    }

    if (detailsEl) {
      detailsEl.innerHTML =
        '<article class="card">' +
        '<h3>' + poster.title + '</h3>' +
        '<p><strong>Category:</strong> ' + poster.category + '</p>' +
        '<p><strong>Topic:</strong> ' + poster.topic + '</p>' +
        '<p><strong>Difficulty:</strong> ' + poster.difficulty + '</p>' +
        '<p><strong>Certification Objectives:</strong> ' + safe(poster.certificationMapping).join(', ') + '</p>' +
        '<p><strong>Related Courses:</strong> ' + relatedCourses.map(function (course) { return course.title; }).join(', ') + '</p>' +
        '<div class="cta-row">' +
        '<a class="btn primary" href="' + poster.downloadablePdfUrl + '">Download PDF</a>' +
        '<a class="btn secondary" href="' + poster.downloadablePngUrl + '">Download PNG</a>' +
        '<a class="btn secondary" href="' + poster.relatedVideoUrl + '">Watch 8 minute lesson</a>' +
        '<a class="btn secondary" href="' + (relatedQuiz ? lessonHref(relatedQuiz.relatedLessonId, quizCourseId) : (firstLesson ? lessonHref(firstLesson.id, preferredCourseId) : '/lesson.html')) + '">Take Quiz</a>' +
        '<a class="btn secondary" href="' + (safe(poster.relatedLabUrls)[0] || '/resources.html') + '">Related Labs</a>' +
        '<a class="btn secondary" href="' + (safe(poster.relatedBlogUrls)[0] || '/blog.html') + '">Related Blog</a>' +
        '<a class="btn secondary" href="' + (firstLesson ? lessonHref(firstLesson.id, preferredCourseId) : '/academy/') + '">Related Lesson</a>' +
        '<a class="btn secondary" href="' + (relatedCourses[0] ? courseHref(relatedCourses[0].id) : '/academy/') + '">Related Course</a>' +
        '</div>' +
        '<div class="dct-comment-box">' +
        '<h4>Comments</h4>' +
        '<form id="posterCommentForm" class="search-row" style="margin-top:0.5rem;">' +
        '<input id="posterCommentName" type="text" placeholder="Your name" required>' +
        '<input id="posterCommentText" type="text" placeholder="Share a note or question" required>' +
        '<button class="btn primary" type="submit">Post Comment</button>' +
        '</form>' +
        '<div id="posterCommentList" class="card-grid" style="margin-top:0.6rem;"></div>' +
        '</div>' +
        '</article>';

      var commentKey = 'dct-poster-comments-' + poster.slug;
      var commentList = document.getElementById('posterCommentList');
      var commentForm = document.getElementById('posterCommentForm');
      var commentName = document.getElementById('posterCommentName');
      var commentText = document.getElementById('posterCommentText');

      function getComments() {
        try {
          var raw = localStorage.getItem(commentKey);
          return raw ? JSON.parse(raw) : [];
        } catch (err) {
          return [];
        }
      }

      function setComments(items) {
        try {
          localStorage.setItem(commentKey, JSON.stringify(items));
        } catch (err) {
          // no-op
        }
      }

      function drawComments() {
        var comments = getComments();
        if (!commentList) return;
        if (!comments.length) {
          commentList.innerHTML = '<article class="card"><p>No comments yet. Be the first to add one.</p></article>';
          return;
        }
        commentList.innerHTML = comments.slice().reverse().map(function (item) {
          return '<article class="card"><p><strong>' + item.name + '</strong> <span style="color:#64748b;">(' + item.date + ')</span></p><p>' + item.text + '</p></article>';
        }).join('');
      }

      if (commentForm) {
        commentForm.addEventListener('submit', function (event) {
          event.preventDefault();
          var name = (commentName && commentName.value || '').trim();
          var text = (commentText && commentText.value || '').trim();
          if (!name || !text) return;
          var comments = getComments();
          comments.push({
            name: name,
            text: text,
            date: new Date().toLocaleDateString()
          });
          setComments(comments);
          if (commentText) commentText.value = '';
          drawComments();
        });
      }

      drawComments();
    }

    if (relatedEl) {
      var related = safe(poster.relatedPosterIds).map(function (id) { return model.byId.poster[id]; }).filter(Boolean);
      relatedEl.innerHTML = related.length ? related.map(function (nextPoster) {
        return '<article class="card"><h4>' + nextPoster.title + '</h4><p>' + nextPoster.topic + '</p><a class="btn secondary" href="' + nextPoster.route + '">Open Guide</a></article>';
      }).join('') : '<article class="card"><h4>Next Recommended</h4><p>Least Privilege, Conditional Access, Identity Governance, Access Reviews, and Zero Trust are coming next in this path.</p></article>';
    }
  }

  function enhanceBlogCards() {
    var model = getModel();
    var cards = document.querySelectorAll('.blog-card[id^="poster-"]');
    if (!cards.length) return;

    Array.prototype.forEach.call(cards, function (card) {
      var poster = model.byId.poster[card.id];
      if (!poster) return;
      var body = card.querySelector('.blog-card-body');
      if (!body || body.querySelector('.dct-blog-flow')) return;

      var firstLesson = byIds(poster.relatedLessonIds, model.byId.lesson)[0];
      var primaryLessonId = primaryLessonIdForPoster(poster);
      if (model.byId.lesson[primaryLessonId]) {
        firstLesson = model.byId.lesson[primaryLessonId];
      }
      var preferredCourseId = courseIdForLesson(model, firstLesson && firstLesson.id, poster);
      var flow = document.createElement('div');
      flow.className = 'dct-blog-flow';
      flow.innerHTML =
        '<a href="' + poster.route + '" class="dct-blog-poster-link">Open poster guide</a>' +
        '<div class="dct-blog-flow-steps">Read article | Watch video | Interactive Lab | Quiz | Download Cheat Sheet</div>' +
        '<div class="cta-row">' +
        '<a class="btn secondary" href="' + poster.route + '">Poster</a>' +
        '<a class="btn secondary" href="' + poster.relatedVideoUrl + '">Video</a>' +
        '<a class="btn secondary" href="' + (safe(poster.relatedLabUrls)[0] || '/resources.html') + '">Lab</a>' +
        '<a class="btn secondary" href="' + (firstLesson ? lessonHref(firstLesson.id, preferredCourseId) : '/lesson.html') + '">Quiz</a>' +
        '<a class="btn secondary" href="' + poster.downloadableCheatSheetUrl + '">Cheat Sheet</a>' +
        '</div>';
      body.appendChild(flow);
    });
  }

  function renderStudentDashboard() {
    var model = getModel();
    var student = {
      name: 'Student View',
      classIds: ['course-pg-parks-cohort', 'course-azure-fundamentals'],
      currentLessonId: 'lesson-security-pim-01',
      homework: ['Configure PIM role activation policy', 'Submit least privilege role matrix'],
      completedLessonCount: 7,
      totalLessonCount: 12,
      certificates: ['Azure Fundamentals Completion', 'Identity Security Lab Badge']
    };

    var classesTarget = $('studentClasses');
    var currentLessonTarget = $('studentCurrentLesson');
    var homeworkTarget = $('studentHomework');
    var resourcesTarget = $('studentDownloads');
    var progressTarget = $('studentProgress');
    var certsTarget = $('studentCertificates');
    var continueTarget = $('studentContinue');

    if (classesTarget) {
      classesTarget.innerHTML = byIds(student.classIds, model.byId.course).map(function (course) {
        return '<article class="card"><h3>' + course.title + '</h3><p>' + course.description + '</p></article>';
      }).join('');
    }

    var currentLesson = model.byId.lesson[student.currentLessonId];
    var currentPoster = currentLesson ? model.byId.poster[safe(currentLesson.relatedPosterIds)[0]] : null;
    var percent = Math.round((student.completedLessonCount / student.totalLessonCount) * 100);

    if (continueTarget && currentLesson && currentPoster) {
      continueTarget.innerHTML =
        '<article class="card dct-continue-card">' +
        '<h3>Continue Learning</h3>' +
        '<p><strong>' + currentPoster.title + '</strong></p>' +
        '<div class="dct-progress-wrap"><div class="dct-progress-fill" style="width:' + percent + '%"></div></div>' +
        '<p>' + percent + '% complete</p>' +
        '<a class="dct-continue-poster" href="' + currentPoster.route + '"><img src="' + currentPoster.thumbnailUrl + '" alt="' + currentPoster.title + '"></a>' +
        '<div class="cta-row"><a class="btn primary" href="' + lessonHref(currentLesson.id) + '">Start Lesson</a></div>' +
        '</article>';
    }

    if (currentLessonTarget && currentLesson) {
      var quiz = model.byId.quiz[currentLesson.quizId];
      currentLessonTarget.innerHTML =
        '<article class="card dark">' +
        '<h3>' + currentLesson.title + '</h3>' +
        '<p>' + currentLesson.summary + '</p>' +
        '<p><strong>Objectives:</strong> ' + safe(currentLesson.objectives).join('; ') + '</p>' +
        '<p><strong>Quiz:</strong> ' + (quiz ? quiz.title : 'TBD') + '</p>' +
        '</article>';
    }

    if (homeworkTarget) {
      homeworkTarget.innerHTML = student.homework.map(function (item) {
        return '<article class="card"><p>' + item + '</p></article>';
      }).join('');
    }

    if (resourcesTarget && currentLesson) {
      resourcesTarget.innerHTML = byIds(currentLesson.downloadIds, model.byId.resource).map(function (resource) {
        return '<article class="card"><h4>' + resource.title + '</h4><p>Type: ' + resource.type + '</p><a class="btn secondary" href="' + resource.url + '">Open Download</a></article>';
      }).join('');
    }

    if (progressTarget) {
      progressTarget.innerHTML =
        '<article class="card">' +
        '<div class="dashboard-kpi">' + percent + '%</div>' +
        '<p>Progress across active programs (' + student.completedLessonCount + '/' + student.totalLessonCount + ' lessons).</p>' +
        '</article>';
    }

    if (certsTarget) {
      certsTarget.innerHTML = student.certificates.map(function (cert) {
        return '<article class="card"><h4>' + cert + '</h4><p>Certificate ready for download and sharing.</p></article>';
      }).join('');
    }
  }

  function renderInstructorDashboard() {
    var model = getModel();
    var cohortTarget = $('instructorCohorts');
    var assignmentTarget = $('instructorAssignments');
    var progressTarget = $('instructorProgress');

    if (cohortTarget) {
      cohortTarget.innerHTML = safe(model.cohorts).map(function (cohort) {
        return (
          '<article class="card">' +
          '<h3>' + cohort.title + '</h3>' +
          '<p><strong>Type:</strong> ' + cohort.type + '</p>' +
          '<p><strong>Schedule:</strong> ' + cohort.schedule + '</p>' +
          '<p><strong>Enrolled:</strong> ' + cohort.enrolledStudents + '</p>' +
          '</article>'
        );
      }).join('');
    }

    if (assignmentTarget) {
      assignmentTarget.innerHTML = safe(model.courses).filter(function (course) {
        return course.deliveryType === 'pg-parks' || course.deliveryType === 'live';
      }).map(function (course) {
        var posters = byIds(course.assets, model.byId.poster).map(function (poster) { return poster.title; }).join(', ');
        var quizTitles = byIds(course.quizzes, model.byId.quiz).map(function (quiz) { return quiz.title; }).join(', ');
        return (
          '<tr>' +
          '<td>' + course.title + '</td>' +
          '<td>' + posters + '</td>' +
          '<td>' + quizTitles + '</td>' +
          '<td><a class="btn secondary" href="/playbook/">Assign Assets</a></td>' +
          '</tr>'
        );
      }).join('');
    }

    if (progressTarget) {
      progressTarget.innerHTML =
        '<article class="card"><div class="dashboard-kpi">92%</div><p>Average assignment completion in current live cohort.</p></article>' +
        '<article class="card"><div class="dashboard-kpi">88%</div><p>Quiz pass rate across in-person and virtual cohorts.</p></article>' +
        '<article class="card"><div class="dashboard-kpi">73%</div><p>Students on pace for certification milestone this month.</p></article>';
    }
  }

  window.DCTPlatform = {
    renderHeader: renderHeader,
    renderCohortCards: renderCohortCards,
    renderCourseTrackCards: renderCourseTrackCards,
    renderTrackDetail: renderTrackDetail,
    renderAcademyExplorer: renderAcademyExplorer,
    renderPlaybook: renderPlaybook,
    renderPosterDetail: renderPosterDetail,
    renderFeaturedPlaybook: renderFeaturedPlaybook,
    startPosterCarousel: startPosterCarousel,
    searchEverything: searchEverything,
    bindSearchEverything: bindSearchEverything,
    enhanceBlogCards: enhanceBlogCards,
    renderStudentDashboard: renderStudentDashboard,
    renderInstructorDashboard: renderInstructorDashboard
  };
})();
