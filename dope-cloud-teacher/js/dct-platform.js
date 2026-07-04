(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function toPrettyDate(isoDate) {
    const value = new Date(isoDate + 'T00:00:00');
    return value.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function getModel() {
    return window.DCTLearningModel || {
      courses: [],
      modules: [],
      lessons: [],
      visualPosters: [],
      quizzes: [],
      cohorts: [],
      resources: [],
      byId: { course: {}, module: {}, lesson: {}, poster: {}, quiz: {}, cohort: {}, resource: {} }
    };
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
    const slot = $('dct-header');
    if (!slot) return;

    const links = navItems()
      .map(function (item) {
        const active = item.key === activeKey ? ' class="active"' : '';
        return '<a href="' + item.href + '"' + active + '>' + item.label + '</a>';
      })
      .join('');

    slot.innerHTML =
      '<header class="platform-header">' +
      '<div class="platform-header-inner">' +
      '<a class="brand-lockup" href="/index.html">' +
      '<img src="/logo.svg?v=20260622c" alt="The Dope Cloud Teacher logo">' +
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
    return ids.map(function (id) { return lookup[id]; }).filter(Boolean);
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

  function courseFocusList(course, model) {
    var lessons = byIds(course.lessons, model.byId.lesson);
    var focus = [];
    lessons.forEach(function (lesson) {
      (lesson.certificationMapping || []).forEach(function (item) {
        var clean = String(item).split(':')[0].trim();
        if (clean && focus.indexOf(clean) === -1) {
          focus.push(clean);
        }
      });
    });
    return focus;
  }

  function renderCohortCards(type, targetId) {
    const model = getModel();
    const target = $(targetId);
    if (!target) return;

    const cohorts = model.cohorts.filter(function (cohort) { return cohort.type === type; });
    target.innerHTML = cohorts
      .map(function (cohort) {
        return (
          '<article class="card">' +
          '<h3>' + cohort.title + '</h3>' +
          '<p><strong>Dates:</strong> ' + toPrettyDate(cohort.startDate) + ' to ' + toPrettyDate(cohort.endDate) + '</p>' +
          '<p><strong>Schedule:</strong> ' + cohort.schedule + '</p>' +
          '<p><strong>Location:</strong> ' + cohort.location + '</p>' +
          '<p><strong>Enrolled:</strong> ' + cohort.enrolledStudents + ' students</p>' +
          (cohort.virtualLink ? '<p><strong>Virtual Access:</strong> ' + cohort.virtualLink + '</p>' : '') +
          '<div class="pill-row">' +
          byIds(cohort.assignedCourseIds, model.byId.course)
            .map(function (course) { return '<span class="pill">' + course.title + '</span>'; })
            .join('') +
          '</div>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderCourseTrackCards(targetId, deliveryType) {
    const model = getModel();
    const target = $(targetId);
    if (!target) return;

    const courses = model.courses.filter(function (course) {
      return deliveryType ? course.deliveryType === deliveryType : true;
    });

    target.innerHTML = courses
      .map(function (course) {
        const moduleCount = course.modules.length;
        const lessonCount = course.lessons.length;
        const posterCount = course.assets.length;
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
      })
      .join('');
  }

  function renderAcademyExplorer(targetId) {
    var model = getModel();
    var target = $(targetId);
    if (!target) return;

    var courses = model.courses.filter(function (course) {
      return course.deliveryType === 'self-paced';
    });

    var focusOptions = [];
    courses.forEach(function (course) {
      courseFocusList(course, model).forEach(function (focus) {
        if (focusOptions.indexOf(focus) === -1) {
          focusOptions.push(focus);
        }
      });
    });
    focusOptions.sort();

    var focusSelect = $('academyFocus');
    if (focusSelect) {
      focusSelect.innerHTML = '<option value="all">All focus areas</option>' + focusOptions
        .map(function (focus) { return '<option value="' + focus + '">' + focus + '</option>'; })
        .join('');
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

      target.innerHTML = filtered
        .map(function (course) {
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
            '<span class="pill">' + course.lessons.length + ' Lessons</span>' +
            '<span class="pill">' + course.assets.length + ' Visual Assets</span>' +
            '</div>' +
            '<div class="cta-row">' +
            '<a class="btn primary" href="' + courseHref(course.id) + '">Start This Track</a>' +
            '<a class="btn secondary" href="/student-dashboard/">Study Dashboard</a>' +
            '</div>' +
            '</article>'
          );
        })
        .join('');

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

  function renderTrackDetail(courseId, detailsTargetId, lessonsTargetId) {
    const model = getModel();
    const course = model.byId.course[courseId];
    if (!course) return;

    const detailsTarget = $(detailsTargetId);
    const lessonsTarget = $(lessonsTargetId);

    if (detailsTarget) {
      const modules = byIds(course.modules, model.byId.module);
      const posters = byIds(course.assets, model.byId.poster);
      detailsTarget.innerHTML =
        '<article class="card">' +
        '<h3>' + course.title + '</h3>' +
        '<p>' + course.description + '</p>' +
        '<p><strong>Audience:</strong> ' + course.audience + '</p>' +
        '<p><strong>Delivery:</strong> ' + course.deliveryType + '</p>' +
        '<div class="pill-row">' +
        modules.map(function (mod) { return '<span class="pill">' + mod.title + '</span>'; }).join('') +
        '</div>' +
        '<div class="pill-row">' +
        posters.map(function (poster) { return '<span class="pill">Poster: ' + poster.title + '</span>'; }).join('') +
        '</div>' +
        '<div class="card-grid">' +
        posters.map(function (poster) {
          return '<article class="card poster-card"><img src="' + poster.imageUrl + '" alt="' + poster.title + '"><h4>' + poster.title + '</h4></article>';
        }).join('') +
        '</div>' +
        '</article>';
    }

    if (lessonsTarget) {
      const lessons = byIds(course.lessons, model.byId.lesson);
      lessonsTarget.innerHTML = lessons
        .map(function (lesson) {
          const quiz = model.byId.quiz[lesson.quizId];
          const resources = byIds(lesson.downloadIds, model.byId.resource);
          const posters = byIds(lesson.relatedPosterIds, model.byId.poster);

          return (
            '<article class="card">' +
            '<h4>' + lesson.title + '</h4>' +
            '<p>' + lesson.summary + '</p>' +
            '<p><strong>Estimated Time:</strong> ' + lesson.estimatedTime + ' min</p>' +
            '<p><strong>Objectives:</strong> ' + lesson.objectives.join('; ') + '</p>' +
            '<p><strong>Certification:</strong> ' + lesson.certificationMapping.join(', ') + '</p>' +
            '<p><strong>Quiz:</strong> ' + (quiz ? quiz.title : 'TBD') + '</p>' +
            '<p><strong>Resources:</strong> ' + resources.map(function (res) { return res.title; }).join(', ') + '</p>' +
            '<div class="pill-row">' + posters.map(function (poster) { return '<span class="pill">' + poster.title + '</span>'; }).join('') + '</div>' +
            '</article>'
          );
        })
        .join('');
    }
  }

  function renderPlaybook(targetId) {
    const model = getModel();
    const target = $(targetId);
    if (!target) return;

    function draw() {
      const searchValue = (($('posterSearch') && $('posterSearch').value) || '').trim().toLowerCase();
      const difficultyValue = ($('posterDifficulty') && $('posterDifficulty').value) || 'all';
      const courseValue = ($('posterCourse') && $('posterCourse').value) || 'all';

      const posters = model.visualPosters.filter(function (poster) {
        const matchesSearch =
          !searchValue ||
          poster.title.toLowerCase().indexOf(searchValue) !== -1 ||
          poster.topic.toLowerCase().indexOf(searchValue) !== -1 ||
          poster.tags.join(' ').toLowerCase().indexOf(searchValue) !== -1;
        const matchesDifficulty = difficultyValue === 'all' || poster.difficulty === difficultyValue;
        const matchesCourse = courseValue === 'all' || poster.relatedCourseIds.indexOf(courseValue) !== -1;
        return matchesSearch && matchesDifficulty && matchesCourse;
      });

      target.innerHTML = posters
        .map(function (poster) {
          const relatedLessons = byIds(poster.relatedLessonIds, model.byId.lesson);
          const relatedCourses = byIds(poster.relatedCourseIds, model.byId.course);
          const firstLesson = relatedLessons[0];
          const quiz = firstLesson ? model.byId.quiz[firstLesson.quizId] : null;

          return (
            '<article class="card poster-card">' +
            '<img src="' + poster.imageUrl + '" alt="' + poster.title + '">' +
            '<h3>' + poster.title + '</h3>' +
            '<p><strong>Topic:</strong> ' + poster.topic + '</p>' +
            '<p><strong>Audience:</strong> ' + poster.audience + '</p>' +
            '<p><strong>Related Course:</strong> ' + relatedCourses.map(function (course) { return course.title; }).join(', ') + '</p>' +
            '<p><strong>Lesson Summary:</strong> ' + (firstLesson ? firstLesson.summary : 'TBD') + '</p>' +
            '<p><strong>Quiz:</strong> ' + (quiz ? quiz.title : 'TBD') + '</p>' +
            '<p><strong>Certification:</strong> ' + poster.certificationMapping.join(', ') + '</p>' +
            '<p><strong>Related Tools/Services:</strong> ' + poster.tags.join(', ') + '</p>' +
            '<div class="cta-row">' +
            '<a class="btn secondary" href="' + poster.downloadablePdfUrl + '">Download Image/PDF</a>' +
            '<a class="btn secondary" href="' + (poster.blogUrl || '/blog.html') + '">Related Blog/Article</a>' +
            '</div>' +
            '</article>'
          );
        })
        .join('');
    }

    const courseSelect = $('posterCourse');
    if (courseSelect) {
      const selfPacedCourses = model.courses.filter(function (course) { return course.deliveryType === 'self-paced'; });
      courseSelect.innerHTML = '<option value="all">All courses</option>' + selfPacedCourses
        .map(function (course) { return '<option value="' + course.id + '">' + course.title + '</option>'; })
        .join('');
    }

    ['posterSearch', 'posterDifficulty', 'posterCourse'].forEach(function (id) {
      const el = $(id);
      if (el) {
        el.addEventListener('input', draw);
        el.addEventListener('change', draw);
      }
    });

    draw();
  }

  function renderStudentDashboard() {
    const model = getModel();
    const student = {
      name: 'Student View',
      classIds: ['course-pg-parks-cohort', 'course-azure-fundamentals'],
      currentLessonId: 'lesson-security-pim-01',
      homework: ['Configure PIM role activation policy', 'Submit least privilege role matrix'],
      completedLessonCount: 7,
      totalLessonCount: 12,
      certificates: ['Azure Fundamentals Completion', 'Identity Security Lab Badge']
    };

    const classesTarget = $('studentClasses');
    const currentLessonTarget = $('studentCurrentLesson');
    const homeworkTarget = $('studentHomework');
    const resourcesTarget = $('studentDownloads');
    const progressTarget = $('studentProgress');
    const certsTarget = $('studentCertificates');

    if (classesTarget) {
      classesTarget.innerHTML = byIds(student.classIds, model.byId.course)
        .map(function (course) {
          return '<article class="card"><h3>' + course.title + '</h3><p>' + course.description + '</p></article>';
        })
        .join('');
    }

    const currentLesson = model.byId.lesson[student.currentLessonId];
    if (currentLessonTarget && currentLesson) {
      const quiz = model.byId.quiz[currentLesson.quizId];
      currentLessonTarget.innerHTML =
        '<article class="card dark">' +
        '<h3>' + currentLesson.title + '</h3>' +
        '<p>' + currentLesson.summary + '</p>' +
        '<p><strong>Objectives:</strong> ' + currentLesson.objectives.join('; ') + '</p>' +
        '<p><strong>Quiz:</strong> ' + (quiz ? quiz.title : 'TBD') + '</p>' +
        '</article>';
    }

    if (homeworkTarget) {
      homeworkTarget.innerHTML = student.homework
        .map(function (item) { return '<article class="card"><p>' + item + '</p></article>'; })
        .join('');
    }

    if (resourcesTarget && currentLesson) {
      resourcesTarget.innerHTML = byIds(currentLesson.downloadIds, model.byId.resource)
        .map(function (resource) {
          return '<article class="card"><h4>' + resource.title + '</h4><p>Type: ' + resource.type + '</p><a class="btn secondary" href="' + resource.url + '">Open Download</a></article>';
        })
        .join('');
    }

    if (progressTarget) {
      const percent = Math.round((student.completedLessonCount / student.totalLessonCount) * 100);
      progressTarget.innerHTML =
        '<article class="card">' +
        '<div class="dashboard-kpi">' + percent + '%</div>' +
        '<p>Progress across active programs (' + student.completedLessonCount + '/' + student.totalLessonCount + ' lessons).</p>' +
        '</article>';
    }

    if (certsTarget) {
      certsTarget.innerHTML = student.certificates
        .map(function (cert) { return '<article class="card"><h4>' + cert + '</h4><p>Certificate ready for download and sharing.</p></article>'; })
        .join('');
    }
  }

  function renderInstructorDashboard() {
    const model = getModel();
    const cohortTarget = $('instructorCohorts');
    const assignmentTarget = $('instructorAssignments');
    const progressTarget = $('instructorProgress');

    if (cohortTarget) {
      cohortTarget.innerHTML = model.cohorts
        .map(function (cohort) {
          return (
            '<article class="card">' +
            '<h3>' + cohort.title + '</h3>' +
            '<p><strong>Type:</strong> ' + cohort.type + '</p>' +
            '<p><strong>Schedule:</strong> ' + cohort.schedule + '</p>' +
            '<p><strong>Enrolled:</strong> ' + cohort.enrolledStudents + '</p>' +
            '</article>'
          );
        })
        .join('');
    }

    if (assignmentTarget) {
      assignmentTarget.innerHTML = model.courses
        .filter(function (course) { return course.deliveryType === 'pg-parks' || course.deliveryType === 'live'; })
        .map(function (course) {
          const posters = byIds(course.assets, model.byId.poster).map(function (poster) { return poster.title; }).join(', ');
          const quizTitles = byIds(course.quizzes, model.byId.quiz).map(function (quiz) { return quiz.title; }).join(', ');
          return (
            '<tr>' +
            '<td>' + course.title + '</td>' +
            '<td>' + posters + '</td>' +
            '<td>' + quizTitles + '</td>' +
            '<td><a class="btn secondary" href="/playbook/">Assign Assets</a></td>' +
            '</tr>'
          );
        })
        .join('');
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
    renderStudentDashboard: renderStudentDashboard,
    renderInstructorDashboard: renderInstructorDashboard
  };
})();
