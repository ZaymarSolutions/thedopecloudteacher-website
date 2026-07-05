(function () {
  function el(id) {
    return document.getElementById(id);
  }

  function fmtDate(value) {
    if (!value) return "TBD";
    return new Date(value + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  function renderCohorts(targetId, type) {
    const target = el(targetId);
    if (!target || !window.DCT_CONTENT) return;
    const cohorts = window.DCT_CONTENT.cohorts.filter(function (cohort) {
      return !type || cohort.type === type;
    });

    target.innerHTML = cohorts.map(function (cohort) {
      return (
        '<article class="platform-card">' +
        "<h3>" + cohort.title + "</h3>" +
        "<p><strong>Dates:</strong> " + fmtDate(cohort.startDate) + " - " + fmtDate(cohort.endDate) + "</p>" +
        "<p><strong>Schedule:</strong> " + cohort.schedule + "</p>" +
        (cohort.location ? "<p><strong>Location:</strong> " + cohort.location + "</p>" : "") +
        (cohort.virtualLink ? '<p><strong>Live Link:</strong> <a href="' + cohort.virtualLink + '">Access Session</a></p>' : "") +
        "<p><strong>Enrolled:</strong> " + cohort.enrolledStudents + " students</p>" +
        "</article>"
      );
    }).join("");
  }

  function renderCourses(targetId, deliveryType) {
    const target = el(targetId);
    if (!target || !window.DCT_CONTENT) return;

    const courses = window.DCT_CONTENT.courses.filter(function (course) {
      return !deliveryType || course.deliveryType === deliveryType;
    });

    target.innerHTML = courses.map(function (course) {
      const moduleCount = course.modules.length;
      const lessonCount = course.lessons.length;
      return (
        '<article class="path-card">' +
        "<h3>" + course.title + "</h3>" +
        "<p>" + course.description + "</p>" +
        '<div class="pill-row">' +
        '<span class="pill">' + moduleCount + " modules</span>" +
        '<span class="pill">' + lessonCount + " lessons</span>" +
        '<span class="pill">' + course.deliveryType + "</span>" +
        "</div>" +
        "</article>"
      );
    }).join("");
  }

  function renderTrack(targetId, courseId) {
    const target = el(targetId);
    if (!target || !window.DCT_CONTENT) return;

    const course = window.DCT_CONTENT.byId(window.DCT_CONTENT.courses, courseId);
    if (!course) return;

    const modules = window.DCT_CONTENT.modulesForCourse(courseId);

    target.innerHTML = modules.map(function (module) {
      const lessons = window.DCT_CONTENT.lessonsForModule(module.id);
      return (
        '<article class="platform-card">' +
        "<h3>" + module.title + "</h3>" +
        "<p>" + module.description + "</p>" +
        '<ul class="list-clean">' +
        lessons.map(function (lesson) {
          const quiz = window.DCT_CONTENT.byId(window.DCT_CONTENT.quizzes, lesson.quizId);
          return "<li><strong>" + lesson.title + "</strong><br>" + lesson.summary + "<br><span class=\"poster-meta\">Quiz: " + (quiz ? quiz.title : "TBD") + " | Estimated: " + lesson.estimatedTime + "</span></li>";
        }).join("") +
        "</ul>" +
        "</article>"
      );
    }).join("");
  }

  function renderPlaybook(targetId) {
    const target = el(targetId);
    const search = el("playbook-search");
    const level = el("playbook-difficulty");
    if (!target || !window.DCT_CONTENT) return;

    function draw() {
      const q = search ? search.value.trim().toLowerCase() : "";
      const difficulty = level ? level.value : "all";

      const posters = window.DCT_CONTENT.visualPosters.filter(function (poster) {
        const searchMatch =
          !q ||
          poster.title.toLowerCase().includes(q) ||
          poster.topic.toLowerCase().includes(q) ||
          poster.tags.join(" ").toLowerCase().includes(q);

        const levelMatch = difficulty === "all" || poster.difficulty === difficulty;

        return searchMatch && levelMatch;
      });

      target.innerHTML = posters.map(function (poster) {
        const relatedLessons = poster.relatedLessonIds.map(function (lessonId) {
          const lesson = window.DCT_CONTENT.byId(window.DCT_CONTENT.lessons, lessonId);
          return lesson ? lesson.title : lessonId;
        }).join(", ");

        const relatedCourses = poster.relatedCourseIds.map(function (courseId) {
          const course = window.DCT_CONTENT.byId(window.DCT_CONTENT.courses, courseId);
          return course ? course.title : courseId;
        }).join(", ");

        const quizLinkLesson = window.DCT_CONTENT.byId(window.DCT_CONTENT.lessons, poster.relatedLessonIds[0]);
        const quiz = quizLinkLesson ? window.DCT_CONTENT.byId(window.DCT_CONTENT.quizzes, quizLinkLesson.quizId) : null;

        return (
          '<article class="platform-card">' +
          "<h3>" + poster.title + "</h3>" +
          "<p>" + poster.topic + " | " + poster.audience + "</p>" +
          '<p class="poster-meta"><strong>Related course(s):</strong> ' + relatedCourses + "</p>" +
          '<p class="poster-meta"><strong>Lesson summary:</strong> ' + relatedLessons + "</p>" +
          '<p class="poster-meta"><strong>Download:</strong> <a href="' + poster.downloadablePdfUrl + '">PDF</a> | <a href="' + poster.imageUrl + '">Image</a></p>' +
          '<p class="poster-meta"><strong>Quiz:</strong> ' + (quiz ? quiz.title : "Mapped by lesson") + "</p>" +
          '<p class="poster-meta"><strong>Blog/article:</strong> <a href="/blog.html">Read related insights</a></p>' +
          '<p class="poster-meta"><strong>Certification objective:</strong> ' + poster.certificationMapping + "</p>" +
          '<p class="poster-meta"><strong>Related tools/services:</strong> ' + poster.tags.join(", ") + "</p>" +
          "</article>"
        );
      }).join("");
    }

    if (search) search.addEventListener("input", draw);
    if (level) level.addEventListener("change", draw);
    draw();
  }

  function renderAssignedLessons(targetId, cohortType) {
    const target = el(targetId);
    if (!target || !window.DCT_CONTENT) return;

    const cohort = window.DCT_CONTENT.cohorts.find(function (item) {
      return item.type === cohortType;
    });

    if (!cohort) {
      target.innerHTML = "<article class=\"platform-card\"><p>No lessons assigned yet.</p></article>";
      return;
    }

    const lessonCards = cohort.assignedLessonIds.map(function (lessonId, index) {
      const lesson = window.DCT_CONTENT.byId(window.DCT_CONTENT.lessons, lessonId);
      if (!lesson) return "";
      const quiz = window.DCT_CONTENT.byId(window.DCT_CONTENT.quizzes, lesson.quizId);
      return (
        '<article class="platform-card">' +
        "<h3>Week " + (index + 1) + ": " + lesson.title + "</h3>" +
        "<p>" + lesson.summary + "</p>" +
        "<p><strong>Estimated:</strong> " + lesson.estimatedTime + "</p>" +
        "<p><strong>Quiz:</strong> " + (quiz ? quiz.title : "TBD") + "</p>" +
        "</article>"
      );
    }).join("");

    target.innerHTML = lessonCards || "<article class=\"platform-card\"><p>No lessons assigned yet.</p></article>";
  }

  function renderStudentDashboard() {
    renderCohorts("student-cohorts");

    const currentLesson = el("student-current-lesson");
    if (currentLesson && window.DCT_CONTENT) {
      const lesson = window.DCT_CONTENT.byId(window.DCT_CONTENT.lessons, "lesson-identity-core");
      const quiz = window.DCT_CONTENT.byId(window.DCT_CONTENT.quizzes, lesson.quizId);
      currentLesson.innerHTML =
        "<h3>" + lesson.title + "</h3>" +
        "<p>" + lesson.summary + "</p>" +
        "<p><strong>Homework:</strong> Complete identity policy lab and submit screenshot proof.</p>" +
        "<p><strong>Quiz:</strong> " + quiz.title + " (Pass: " + quiz.passingScore + "%)</p>" +
        "<p><strong>Downloads:</strong> Identity checklist + workbook</p>" +
        "<p><strong>Progress:</strong> 62%</p>" +
        "<p><strong>Certificates:</strong> 1 earned, 2 in progress</p>";
    }
  }

  function renderInstructorDashboard() {
    renderCohorts("instructor-cohorts");

    const assignTable = el("assignment-table-body");
    if (!assignTable || !window.DCT_CONTENT) return;

    assignTable.innerHTML = window.DCT_CONTENT.lessons.slice(0, 6).map(function (lesson) {
      const posterTitles = window.DCT_CONTENT.postersForLesson(lesson.id).map(function (poster) {
        return poster.title;
      }).join(", ");
      const quiz = window.DCT_CONTENT.byId(window.DCT_CONTENT.quizzes, lesson.quizId);
      return "<tr><td>" + lesson.title + "</td><td>" + (posterTitles || "No poster") + "</td><td>" + (quiz ? quiz.title : "TBD") + "</td><td><button>Assign</button></td></tr>";
    }).join("");
  }

  window.DCT_PAGES = {
    renderCohorts: renderCohorts,
    renderCourses: renderCourses,
    renderTrack: renderTrack,
    renderAssignedLessons: renderAssignedLessons,
    renderPlaybook: renderPlaybook,
    renderStudentDashboard: renderStudentDashboard,
    renderInstructorDashboard: renderInstructorDashboard
  };
})();
