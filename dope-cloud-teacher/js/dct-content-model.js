(function () {
  const courses = [
    {
      id: "course-az-fund",
      title: "Azure Fundamentals",
      description: "Build cloud vocabulary, core Azure services, identity, and governance foundations.",
      audience: "Beginners, career changers, and high school to adult learners",
      deliveryType: "self-paced",
      modules: ["mod-az-fund-1", "mod-az-fund-2"],
      lessons: ["lesson-cloud-intro", "lesson-identity-core", "lesson-cost-governance"],
      assets: ["poster-identity-map", "poster-shared-responsibility"],
      quizzes: ["quiz-cloud-intro", "quiz-identity-core"]
    },
    {
      id: "course-az-security",
      title: "Azure Security",
      description: "Practice zero trust, policy enforcement, and cloud workload protection.",
      audience: "IT support, admins, and security learners",
      deliveryType: "self-paced",
      modules: ["mod-az-sec-1"],
      lessons: ["lesson-identity-core", "lesson-security-baseline"],
      assets: ["poster-zero-trust", "poster-identity-map"],
      quizzes: ["quiz-security-baseline"]
    },
    {
      id: "course-devsecops",
      title: "DevSecOps",
      description: "Integrate security into CI/CD and infrastructure automation from day one.",
      audience: "Developers, cloud engineers, and platform teams",
      deliveryType: "self-paced",
      modules: ["mod-devsecops-1"],
      lessons: ["lesson-ci-cd-security", "lesson-cost-governance"],
      assets: ["poster-devsecops-loop", "poster-shared-responsibility"],
      quizzes: ["quiz-devsecops"]
    },
    {
      id: "course-ai-fund",
      title: "AI Fundamentals",
      description: "Understand responsible AI, model basics, and practical enterprise use cases.",
      audience: "Students, upskillers, and business analysts",
      deliveryType: "self-paced",
      modules: ["mod-ai-fund-1"],
      lessons: ["lesson-ai-core", "lesson-security-baseline"],
      assets: ["poster-ai-lifecycle", "poster-zero-trust"],
      quizzes: ["quiz-ai-core"]
    },
    {
      id: "course-cloud-arch",
      title: "Cloud Architecture",
      description: "Design resilient, scalable, and cost-aware cloud systems.",
      audience: "Aspiring architects and senior engineers",
      deliveryType: "self-paced",
      modules: ["mod-cloud-arch-1"],
      lessons: ["lesson-arch-pillars", "lesson-cost-governance"],
      assets: ["poster-arch-pillars", "poster-shared-responsibility"],
      quizzes: ["quiz-architecture"]
    },
    {
      id: "course-career-prep",
      title: "Career Prep",
      description: "Translate hands-on projects into portfolio evidence and interview confidence.",
      audience: "Career starters, switchers, and bootcamp grads",
      deliveryType: "self-paced",
      modules: ["mod-career-1"],
      lessons: ["lesson-portfolio-story", "lesson-cloud-intro"],
      assets: ["poster-career-roadmap", "poster-identity-map"],
      quizzes: ["quiz-career-prep"]
    },
    {
      id: "course-cohort-pg",
      title: "PG Parks Cloud Cohort",
      description: "Instructor-led community cohort using Azure Fundamentals curriculum and hands-on labs.",
      audience: "PG Parks learners and local community students",
      deliveryType: "pg-parks",
      modules: ["mod-az-fund-1", "mod-career-1"],
      lessons: ["lesson-cloud-intro", "lesson-identity-core", "lesson-portfolio-story"],
      assets: ["poster-identity-map", "poster-career-roadmap"],
      quizzes: ["quiz-cloud-intro", "quiz-career-prep"]
    },
    {
      id: "course-cohort-live",
      title: "Live Virtual Cloud Sprint",
      description: "Live online cohort that blends cloud fundamentals with security and career readiness.",
      audience: "Remote learners who need structure and coaching",
      deliveryType: "live",
      modules: ["mod-az-fund-1", "mod-az-sec-1"],
      lessons: ["lesson-cloud-intro", "lesson-security-baseline", "lesson-portfolio-story"],
      assets: ["poster-shared-responsibility", "poster-zero-trust"],
      quizzes: ["quiz-cloud-intro", "quiz-security-baseline"]
    }
  ];

  const modules = [
    {
      id: "mod-az-fund-1",
      courseId: "course-az-fund",
      title: "Cloud Concepts and Azure Core Services",
      description: "Core cloud models, shared responsibility, and Azure service categories.",
      lessons: ["lesson-cloud-intro", "lesson-identity-core"]
    },
    {
      id: "mod-az-fund-2",
      courseId: "course-az-fund",
      title: "Governance and Cost Management",
      description: "Resource organization, policy guardrails, and optimization basics.",
      lessons: ["lesson-cost-governance"]
    },
    {
      id: "mod-az-sec-1",
      courseId: "course-az-security",
      title: "Identity and Security Baseline",
      description: "Identity-first security, access controls, and defense in depth.",
      lessons: ["lesson-identity-core", "lesson-security-baseline"]
    },
    {
      id: "mod-devsecops-1",
      courseId: "course-devsecops",
      title: "Secure Delivery Pipeline",
      description: "Embed security checks into build, release, and runtime.",
      lessons: ["lesson-ci-cd-security", "lesson-cost-governance"]
    },
    {
      id: "mod-ai-fund-1",
      courseId: "course-ai-fund",
      title: "Responsible AI Foundations",
      description: "AI concepts, model lifecycle, and governance practices.",
      lessons: ["lesson-ai-core", "lesson-security-baseline"]
    },
    {
      id: "mod-cloud-arch-1",
      courseId: "course-cloud-arch",
      title: "Architecture Pillars",
      description: "Reliability, performance, security, and operational excellence.",
      lessons: ["lesson-arch-pillars", "lesson-cost-governance"]
    },
    {
      id: "mod-career-1",
      courseId: "course-career-prep",
      title: "Portfolio and Interview Readiness",
      description: "Build project evidence and communicate outcomes with confidence.",
      lessons: ["lesson-portfolio-story"]
    }
  ];

  const lessons = [
    {
      id: "lesson-cloud-intro",
      moduleId: "mod-az-fund-1",
      title: "Cloud Models and Service Types",
      summary: "Learn IaaS, PaaS, SaaS and when to choose each model.",
      objectives: [
        "Explain public, private, and hybrid cloud",
        "Compare IaaS, PaaS, and SaaS",
        "Map services to business needs"
      ],
      content: "Guided overview with scenario-based decision trees and service mapping exercise.",
      relatedPosterIds: ["poster-shared-responsibility"],
      quizId: "quiz-cloud-intro",
      downloadIds: ["download-cloud-model-cheatsheet"],
      estimatedTime: "35 minutes",
      certificationMapping: "AZ-900: Describe cloud concepts"
    },
    {
      id: "lesson-identity-core",
      moduleId: "mod-az-fund-1",
      title: "Identity, Access, and Zero Trust Basics",
      summary: "Use identity controls as the first security perimeter.",
      objectives: [
        "Define authentication vs authorization",
        "Apply least privilege principles",
        "Introduce Conditional Access and MFA"
      ],
      content: "Hands-on identity walkthrough and policy simulation.",
      relatedPosterIds: ["poster-identity-map", "poster-zero-trust"],
      quizId: "quiz-identity-core",
      downloadIds: ["download-identity-checklist"],
      estimatedTime: "40 minutes",
      certificationMapping: "AZ-900: Describe Azure identity and governance"
    },
    {
      id: "lesson-cost-governance",
      moduleId: "mod-az-fund-2",
      title: "Cost, Tags, and Governance",
      summary: "Control cloud spend and enforce standards with policy and tagging.",
      objectives: [
        "Apply tagging strategy",
        "Understand budgets and alerts",
        "Use policy to enforce standards"
      ],
      content: "Workshop on budget planning, governance patterns, and policy examples.",
      relatedPosterIds: ["poster-arch-pillars"],
      quizId: "quiz-cloud-intro",
      downloadIds: ["download-cost-worksheet"],
      estimatedTime: "30 minutes",
      certificationMapping: "AZ-900: Describe cost management and governance"
    },
    {
      id: "lesson-security-baseline",
      moduleId: "mod-az-sec-1",
      title: "Security Baseline for Cloud Workloads",
      summary: "Establish foundational controls for secure operations.",
      objectives: [
        "Harden workload defaults",
        "Set baseline monitoring",
        "Align controls to risk"
      ],
      content: "Baseline control checklist with cloud security scenarios.",
      relatedPosterIds: ["poster-zero-trust"],
      quizId: "quiz-security-baseline",
      downloadIds: ["download-security-baseline"],
      estimatedTime: "45 minutes",
      certificationMapping: "AZ-500 objective alignment: identity and platform protection"
    },
    {
      id: "lesson-ci-cd-security",
      moduleId: "mod-devsecops-1",
      title: "Secure CI/CD Pipeline",
      summary: "Embed scanning and policy checks in build and release workflows.",
      objectives: [
        "Place checks at each pipeline stage",
        "Use secrets safely",
        "Shift left on vulnerabilities"
      ],
      content: "Pipeline threat model and implementation patterns.",
      relatedPosterIds: ["poster-devsecops-loop"],
      quizId: "quiz-devsecops",
      downloadIds: ["download-devsecops-template"],
      estimatedTime: "50 minutes",
      certificationMapping: "AZ-400: Implement secure DevOps practices"
    },
    {
      id: "lesson-ai-core",
      moduleId: "mod-ai-fund-1",
      title: "AI Fundamentals and Responsible AI",
      summary: "Understand AI workflows and responsible usage standards.",
      objectives: [
        "Explain model lifecycle stages",
        "Identify bias and fairness concerns",
        "Apply governance controls"
      ],
      content: "AI lifecycle mapping and ethical decision prompts.",
      relatedPosterIds: ["poster-ai-lifecycle"],
      quizId: "quiz-ai-core",
      downloadIds: ["download-ai-governance-card"],
      estimatedTime: "35 minutes",
      certificationMapping: "AI-900: Responsible AI principles"
    },
    {
      id: "lesson-arch-pillars",
      moduleId: "mod-cloud-arch-1",
      title: "Architecture Pillars in Practice",
      summary: "Design for reliability, security, and cost efficiency.",
      objectives: [
        "Evaluate design trade-offs",
        "Select resilient patterns",
        "Document architecture decisions"
      ],
      content: "Case-study architecture review activity.",
      relatedPosterIds: ["poster-arch-pillars"],
      quizId: "quiz-architecture",
      downloadIds: ["download-architecture-template"],
      estimatedTime: "45 minutes",
      certificationMapping: "AZ-305: Design identity, governance, and monitoring"
    },
    {
      id: "lesson-portfolio-story",
      moduleId: "mod-career-1",
      title: "Portfolio, Resume, and Interview Storytelling",
      summary: "Convert your project work into hiring-ready evidence.",
      objectives: [
        "Build a proof-focused portfolio",
        "Write measurable resume bullets",
        "Practice STAR responses"
      ],
      content: "Career storytelling workshop and portfolio rubric.",
      relatedPosterIds: ["poster-career-roadmap"],
      quizId: "quiz-career-prep",
      downloadIds: ["download-career-roadmap"],
      estimatedTime: "40 minutes",
      certificationMapping: "Career readiness objective mapped to all tracks"
    }
  ];

  const visualPosters = [
    {
      id: "poster-shared-responsibility",
      title: "Shared Responsibility Model",
      topic: "Cloud Fundamentals",
      audience: "Beginner to intermediate",
      style: "Infographic",
      imageUrl: "/images/posters/shared-responsibility.png",
      downloadablePdfUrl: "/images/posters/shared-responsibility.pdf",
      relatedCourseIds: ["course-az-fund", "course-devsecops", "course-cohort-live"],
      relatedLessonIds: ["lesson-cloud-intro"],
      tags: ["azure", "security", "fundamentals"],
      difficulty: "Beginner",
      certificationMapping: "AZ-900"
    },
    {
      id: "poster-identity-map",
      title: "Identity and Access Map",
      topic: "Azure Identity",
      audience: "Students and cloud admins",
      style: "System diagram",
      imageUrl: "/images/posters/identity-map.png",
      downloadablePdfUrl: "/images/posters/identity-map.pdf",
      relatedCourseIds: ["course-az-fund", "course-az-security", "course-career-prep", "course-cohort-pg"],
      relatedLessonIds: ["lesson-identity-core"],
      tags: ["identity", "mfa", "zero-trust"],
      difficulty: "Intermediate",
      certificationMapping: "AZ-900, AZ-500"
    },
    {
      id: "poster-zero-trust",
      title: "Zero Trust Blueprint",
      topic: "Cloud Security",
      audience: "Security learners and teams",
      style: "Framework poster",
      imageUrl: "/images/posters/zero-trust.png",
      downloadablePdfUrl: "/images/posters/zero-trust.pdf",
      relatedCourseIds: ["course-az-security", "course-ai-fund", "course-cohort-live"],
      relatedLessonIds: ["lesson-security-baseline", "lesson-identity-core"],
      tags: ["security", "governance", "identity"],
      difficulty: "Intermediate",
      certificationMapping: "AZ-500"
    },
    {
      id: "poster-devsecops-loop",
      title: "DevSecOps Continuous Loop",
      topic: "DevSecOps",
      audience: "Developers and platform engineers",
      style: "Workflow map",
      imageUrl: "/images/posters/devsecops-loop.png",
      downloadablePdfUrl: "/images/posters/devsecops-loop.pdf",
      relatedCourseIds: ["course-devsecops"],
      relatedLessonIds: ["lesson-ci-cd-security"],
      tags: ["devsecops", "cicd", "automation"],
      difficulty: "Advanced",
      certificationMapping: "AZ-400"
    },
    {
      id: "poster-ai-lifecycle",
      title: "AI Lifecycle and Governance",
      topic: "AI Fundamentals",
      audience: "Analysts and AI beginners",
      style: "Lifecycle chart",
      imageUrl: "/images/posters/ai-lifecycle.png",
      downloadablePdfUrl: "/images/posters/ai-lifecycle.pdf",
      relatedCourseIds: ["course-ai-fund"],
      relatedLessonIds: ["lesson-ai-core"],
      tags: ["ai", "ethics", "ml"],
      difficulty: "Beginner",
      certificationMapping: "AI-900"
    },
    {
      id: "poster-arch-pillars",
      title: "Cloud Architecture Pillars",
      topic: "Cloud Architecture",
      audience: "Architects and senior learners",
      style: "Comparison matrix",
      imageUrl: "/images/posters/architecture-pillars.png",
      downloadablePdfUrl: "/images/posters/architecture-pillars.pdf",
      relatedCourseIds: ["course-cloud-arch", "course-az-fund"],
      relatedLessonIds: ["lesson-arch-pillars", "lesson-cost-governance"],
      tags: ["architecture", "reliability", "cost"],
      difficulty: "Advanced",
      certificationMapping: "AZ-305"
    },
    {
      id: "poster-career-roadmap",
      title: "Cloud Career Roadmap",
      topic: "Career Prep",
      audience: "Job seekers and upskillers",
      style: "Roadmap",
      imageUrl: "/images/posters/career-roadmap.png",
      downloadablePdfUrl: "/images/posters/career-roadmap.pdf",
      relatedCourseIds: ["course-career-prep", "course-cohort-pg"],
      relatedLessonIds: ["lesson-portfolio-story"],
      tags: ["career", "portfolio", "interview"],
      difficulty: "Beginner",
      certificationMapping: "Career readiness cross-track"
    }
  ];

  const quizzes = [
    {
      id: "quiz-cloud-intro",
      title: "Cloud Concepts Check",
      relatedLessonId: "lesson-cloud-intro",
      questions: 10,
      passingScore: 80
    },
    {
      id: "quiz-identity-core",
      title: "Identity and Access Quiz",
      relatedLessonId: "lesson-identity-core",
      questions: 8,
      passingScore: 75
    },
    {
      id: "quiz-security-baseline",
      title: "Security Baseline Quiz",
      relatedLessonId: "lesson-security-baseline",
      questions: 10,
      passingScore: 80
    },
    {
      id: "quiz-devsecops",
      title: "DevSecOps Pipeline Quiz",
      relatedLessonId: "lesson-ci-cd-security",
      questions: 9,
      passingScore: 80
    },
    {
      id: "quiz-ai-core",
      title: "AI Fundamentals Quiz",
      relatedLessonId: "lesson-ai-core",
      questions: 10,
      passingScore: 75
    },
    {
      id: "quiz-architecture",
      title: "Architecture Pillars Quiz",
      relatedLessonId: "lesson-arch-pillars",
      questions: 8,
      passingScore: 80
    },
    {
      id: "quiz-career-prep",
      title: "Career Readiness Quiz",
      relatedLessonId: "lesson-portfolio-story",
      questions: 7,
      passingScore: 70
    }
  ];

  const cohorts = [
    {
      id: "cohort-pg-2026-fall",
      title: "PG Parks Cloud Cohort - Fall 2026",
      type: "pg-parks",
      startDate: "2026-09-08",
      endDate: "2026-11-21",
      schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
      location: "Southern Regional Tevhnology & Recreaction Complex",
      virtualLink: "",
      assignedCourseIds: ["course-cohort-pg", "course-az-fund"],
      assignedLessonIds: ["lesson-cloud-intro", "lesson-identity-core", "lesson-portfolio-story"],
      enrolledStudents: null,
      hideEnrollment: true
    },
    {
      id: "cohort-live-2026-aug",
      title: "Live Virtual Cloud Sprint - August 2026",
      type: "live",
      startDate: "2026-08-10",
      endDate: "2026-09-18",
      schedule: "Mondays and Wednesdays, 7:00 PM - 9:00 PM EST",
      location: "",
      virtualLink: "/classes/live/",
      assignedCourseIds: ["course-cohort-live", "course-az-security"],
      assignedLessonIds: ["lesson-cloud-intro", "lesson-security-baseline", "lesson-portfolio-story"],
      enrolledStudents: 52
    }
  ];

  function byId(collection, id) {
    return collection.find(function (item) {
      return item.id === id;
    });
  }

  function modulesForCourse(courseId) {
    return modules.filter(function (module) {
      return module.courseId === courseId;
    });
  }

  function lessonsForModule(moduleId) {
    return lessons.filter(function (lesson) {
      return lesson.moduleId === moduleId;
    });
  }

  function postersForLesson(lessonId) {
    return visualPosters.filter(function (poster) {
      return poster.relatedLessonIds.indexOf(lessonId) !== -1;
    });
  }

  window.DCT_CONTENT = {
    courses: courses,
    modules: modules,
    lessons: lessons,
    visualPosters: visualPosters,
    quizzes: quizzes,
    cohorts: cohorts,
    byId: byId,
    modulesForCourse: modulesForCourse,
    lessonsForModule: lessonsForModule,
    postersForLesson: postersForLesson
  };
})();
