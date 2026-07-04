(function () {
  const resources = [
    { id: 'res-azure-free-account', title: 'Azure Free Account Setup Guide', type: 'guide', url: '/resources.html' },
    { id: 'res-security-checklist', title: 'Least Privilege Classroom Checklist', type: 'pdf', url: '/resources.html' },
    { id: 'res-devsecops-pipeline-template', title: 'Secure CI/CD Starter Template', type: 'yaml', url: '/resources.html' },
    { id: 'res-ai-lab-pack', title: 'AI Fundamentals Prompt Lab Pack', type: 'pdf', url: '/resources.html' },
    { id: 'res-architecture-blueprint', title: 'Cloud Architecture Decision Blueprint', type: 'pdf', url: '/resources.html' },
    { id: 'res-career-kit', title: 'Cloud Career Prep Interview Kit', type: 'pdf', url: '/cloud-career-starter-kit.html' }
  ];

  const quizzes = [
    {
      id: 'quiz-azure-core',
      title: 'Azure Core Concepts Checkpoint',
      relatedLessonId: 'lesson-azure-core-01',
      questions: [
        'Which Azure service model is most appropriate for quickly deploying web apps?',
        'What is the difference between a region and an availability zone?',
        'Why does least privilege matter for cloud onboarding?'
      ],
      passingScore: 80
    },
    {
      id: 'quiz-pim-lab',
      title: 'PIM and Least Privilege Quiz',
      relatedLessonId: 'lesson-security-pim-01',
      questions: [
        'What risk does Privileged Identity Management reduce?',
        'When should users activate privileged roles?',
        'How do access reviews support least privilege?'
      ],
      passingScore: 85
    },
    {
      id: 'quiz-devsecops-shift-left',
      title: 'Shift-Left Security Quiz',
      relatedLessonId: 'lesson-devsecops-01',
      questions: [
        'What does shift-left mean in DevSecOps?',
        'Why are branch policies critical to release safety?',
        'How does automated scanning improve delivery speed?'
      ],
      passingScore: 80
    },
    {
      id: 'quiz-ai-essentials',
      title: 'AI Fundamentals Quiz',
      relatedLessonId: 'lesson-ai-01',
      questions: [
        'What is retrieval augmented generation?',
        'When should a team use vector search?',
        'What are two responsible AI guardrails?'
      ],
      passingScore: 80
    },
    {
      id: 'quiz-architecture-patterns',
      title: 'Architecture Patterns Quiz',
      relatedLessonId: 'lesson-arch-01',
      questions: [
        'When should a workload use hub-and-spoke networking?',
        'Why are landing zones useful for scale?',
        'What is a common mistake in resilience design?'
      ],
      passingScore: 85
    },
    {
      id: 'quiz-career-prep',
      title: 'Career Readiness Quiz',
      relatedLessonId: 'lesson-career-01',
      questions: [
        'What makes a cloud portfolio interview ready?',
        'How do certification objectives shape study plans?',
        'What should be included in a 60 second career pitch?'
      ],
      passingScore: 75
    }
  ];

  const modules = [
    {
      id: 'module-azure-core',
      courseId: 'course-azure-fundamentals',
      title: 'Azure Core Services',
      description: 'Cloud basics, Azure service categories, and practical onboarding labs.',
      lessons: ['lesson-azure-core-01', 'lesson-azure-core-02']
    },
    {
      id: 'module-security-identity',
      courseId: 'course-azure-security',
      title: 'Identity and Access Security',
      description: 'PIM, least privilege, conditional access, and defender-aligned security controls.',
      lessons: ['lesson-security-pim-01', 'lesson-security-pim-02']
    },
    {
      id: 'module-devsecops-foundation',
      courseId: 'course-devsecops',
      title: 'DevSecOps Foundation',
      description: 'Secure software delivery and infrastructure policy automation.',
      lessons: ['lesson-devsecops-01', 'lesson-devsecops-02']
    },
    {
      id: 'module-ai-core',
      courseId: 'course-ai-fundamentals',
      title: 'AI Core Concepts',
      description: 'Prompt design, RAG basics, and practical AI implementation patterns.',
      lessons: ['lesson-ai-01', 'lesson-ai-02']
    },
    {
      id: 'module-architecture-core',
      courseId: 'course-cloud-architecture',
      title: 'Cloud Architecture Core',
      description: 'Landing zones, resilience patterns, and governance-first design.',
      lessons: ['lesson-arch-01', 'lesson-arch-02']
    },
    {
      id: 'module-career-growth',
      courseId: 'course-career-prep',
      title: 'Career Preparation',
      description: 'Portfolio building, interview readiness, and certification planning.',
      lessons: ['lesson-career-01', 'lesson-career-02']
    }
  ];

  const lessons = [
    {
      id: 'lesson-azure-core-01',
      moduleId: 'module-azure-core',
      title: 'Azure Regions, Resource Groups, and Service Models',
      summary: 'Understand core Azure building blocks and how to design beginner-friendly labs.',
      objectives: [
        'Explain regions, availability zones, and global infrastructure',
        'Create and organize resources with naming and tagging standards',
        'Map service models to real learning scenarios'
      ],
      content: 'Hands-on walkthrough creating a basic resource group and deploying starter services.',
      relatedPosterIds: ['poster-azure-regions-map'],
      quizId: 'quiz-azure-core',
      downloadIds: ['res-azure-free-account'],
      estimatedTime: 50,
      certificationMapping: ['AZ-900: Describe Azure architectural components']
    },
    {
      id: 'lesson-azure-core-02',
      moduleId: 'module-azure-core',
      title: 'Azure Cost and Governance Fundamentals',
      summary: 'Use policy and budget guardrails from day one.',
      objectives: [
        'Implement subscription-level governance basics',
        'Set cost alerts and tagging requirements',
        'Apply management concepts to small class projects'
      ],
      content: 'Guided lab covering Azure Policy basics and cost monitoring setup.',
      relatedPosterIds: ['poster-azure-policy-control'],
      quizId: 'quiz-azure-core',
      downloadIds: ['res-azure-free-account'],
      estimatedTime: 45,
      certificationMapping: ['AZ-900: Describe Azure management and governance']
    },
    {
      id: 'lesson-security-pim-01',
      moduleId: 'module-security-identity',
      title: 'Enable Microsoft Entra PIM Like a Pro',
      summary: 'Set up role activation safely with approval, MFA, and time-bound access.',
      objectives: [
        'Configure privileged role activation',
        'Set approval and justification policies',
        'Audit activation history for compliance evidence'
      ],
      content: 'Step-by-step PIM deployment walkthrough mapped to real security operations.',
      relatedPosterIds: ['poster-pim-pro', 'poster-least-privilege'],
      quizId: 'quiz-pim-lab',
      downloadIds: ['res-security-checklist'],
      estimatedTime: 60,
      certificationMapping: ['SC-300: Plan and implement privileged access']
    },
    {
      id: 'lesson-security-pim-02',
      moduleId: 'module-security-identity',
      title: 'Least Privilege in Microsoft Entra ID',
      summary: 'Use RBAC and access reviews to reduce standing access.',
      objectives: [
        'Define role boundaries for common personas',
        'Create recurring access reviews',
        'Map governance controls to Zero Trust principles'
      ],
      content: 'Practical least-privilege role design workshop with review cadence templates.',
      relatedPosterIds: ['poster-least-privilege'],
      quizId: 'quiz-pim-lab',
      downloadIds: ['res-security-checklist'],
      estimatedTime: 55,
      certificationMapping: ['SC-300: Manage identity governance']
    },
    {
      id: 'lesson-devsecops-01',
      moduleId: 'module-devsecops-foundation',
      title: 'Build a Secure Azure DevOps CI/CD Pipeline',
      summary: 'Shift security left with policy checks, code scanning, and release gates.',
      objectives: [
        'Design secure branch and pull request policies',
        'Integrate SAST and dependency scanning',
        'Use release gates and rollback plans'
      ],
      content: 'Pipeline blueprint implementation with secure defaults and role boundaries.',
      relatedPosterIds: ['poster-devsecops-pipeline'],
      quizId: 'quiz-devsecops-shift-left',
      downloadIds: ['res-devsecops-pipeline-template'],
      estimatedTime: 70,
      certificationMapping: ['AZ-400: Design and implement secure pipelines']
    },
    {
      id: 'lesson-devsecops-02',
      moduleId: 'module-devsecops-foundation',
      title: 'Policy as Code and Automated Compliance',
      summary: 'Apply governance checks in build and deployment workflows.',
      objectives: [
        'Use IaC policy validation in CI',
        'Block risky misconfigurations before merge',
        'Generate compliance evidence automatically'
      ],
      content: 'Reusable policy pack and CI quality gate rollout exercise.',
      relatedPosterIds: ['poster-defender-cnapp'],
      quizId: 'quiz-devsecops-shift-left',
      downloadIds: ['res-devsecops-pipeline-template'],
      estimatedTime: 60,
      certificationMapping: ['AZ-400: Implement compliance and security in DevOps']
    },
    {
      id: 'lesson-ai-01',
      moduleId: 'module-ai-core',
      title: 'Prompt Engineering for Real-World Teams',
      summary: 'Design prompts that are reliable, measurable, and role-aware.',
      objectives: [
        'Build role-specific prompt templates',
        'Evaluate outputs against quality criteria',
        'Reduce hallucinations with retrieval and guardrails'
      ],
      content: 'Prompt lab for executive, engineering, and student personas.',
      relatedPosterIds: ['poster-ai-rag'],
      quizId: 'quiz-ai-essentials',
      downloadIds: ['res-ai-lab-pack'],
      estimatedTime: 50,
      certificationMapping: ['AI-900: Describe AI workloads and considerations']
    },
    {
      id: 'lesson-ai-02',
      moduleId: 'module-ai-core',
      title: 'RAG Architecture and Responsible AI',
      summary: 'Connect enterprise data responsibly to AI assistants.',
      objectives: [
        'Explain retrieval and embedding workflows',
        'Select vector index strategies',
        'Define policy controls for safe AI responses'
      ],
      content: 'Architecture walkthrough with secure data boundaries and human oversight.',
      relatedPosterIds: ['poster-ai-rag'],
      quizId: 'quiz-ai-essentials',
      downloadIds: ['res-ai-lab-pack'],
      estimatedTime: 65,
      certificationMapping: ['AI-900: Describe machine learning and generative AI concepts']
    },
    {
      id: 'lesson-arch-01',
      moduleId: 'module-architecture-core',
      title: 'Landing Zones and Enterprise Governance',
      summary: 'Design cloud foundations for scale and compliance.',
      objectives: [
        'Explain landing zone architecture',
        'Map management groups and policy inheritance',
        'Apply governance to shared services design'
      ],
      content: 'Architecture planning workshop with enterprise-scale patterns.',
      relatedPosterIds: ['poster-zero-trust-azure'],
      quizId: 'quiz-architecture-patterns',
      downloadIds: ['res-architecture-blueprint'],
      estimatedTime: 70,
      certificationMapping: ['AZ-305: Design governance']
    },
    {
      id: 'lesson-arch-02',
      moduleId: 'module-architecture-core',
      title: 'Resilience and Well-Architected Tradeoffs',
      summary: 'Balance reliability, performance, and cost through pattern-driven decisions.',
      objectives: [
        'Choose high availability and DR strategies',
        'Use observability to validate architecture decisions',
        'Prioritize tradeoffs for business outcomes'
      ],
      content: 'Scenario-based architecture review with executive-ready recommendations.',
      relatedPosterIds: ['poster-defender-cnapp'],
      quizId: 'quiz-architecture-patterns',
      downloadIds: ['res-architecture-blueprint'],
      estimatedTime: 60,
      certificationMapping: ['AZ-305: Design business continuity']
    },
    {
      id: 'lesson-career-01',
      moduleId: 'module-career-growth',
      title: 'Build a Cloud Portfolio That Gets Interviews',
      summary: 'Convert labs and posters into portfolio stories recruiters understand.',
      objectives: [
        'Build project narratives around outcomes',
        'Connect coursework to role expectations',
        'Show proof with artifacts and certifications'
      ],
      content: 'Portfolio clinic with resume and LinkedIn optimization.',
      relatedPosterIds: ['poster-career-roadmap'],
      quizId: 'quiz-career-prep',
      downloadIds: ['res-career-kit'],
      estimatedTime: 45,
      certificationMapping: ['Career: Portfolio and interview readiness']
    },
    {
      id: 'lesson-career-02',
      moduleId: 'module-career-growth',
      title: 'Certification Roadmap and Study Sprint Planning',
      summary: 'Turn certification goals into structured weekly plans.',
      objectives: [
        'Map roles to certification tracks',
        'Build weekly study sprints',
        'Use quizzes and posters for active recall'
      ],
      content: 'Roadmap planning session for AZ-900, SC-300, AZ-400, AZ-305, and AI-900.',
      relatedPosterIds: ['poster-career-roadmap'],
      quizId: 'quiz-career-prep',
      downloadIds: ['res-career-kit'],
      estimatedTime: 40,
      certificationMapping: ['Career: Certification strategy']
    }
  ];

  const visualPosters = [
    {
      id: 'poster-pim-pro',
      title: 'Enable Microsoft Entra PIM Like a Pro',
      topic: 'Identity Security',
      audience: 'Security admins and cloud engineers',
      style: 'Cyberpunk SOC',
      imageUrl: '/images/programs/security-demo.svg',
      downloadablePdfUrl: '/resources.html',
      relatedCourseIds: ['course-azure-security', 'course-pg-parks-cohort'],
      relatedLessonIds: ['lesson-security-pim-01'],
      tags: ['pim', 'entra', 'identity', 'security'],
      difficulty: 'intermediate',
      certificationMapping: ['SC-300']
    },
    {
      id: 'poster-least-privilege',
      title: 'Master Least Privilege in Entra ID',
      topic: 'Identity Governance',
      audience: 'Executives, IAM admins, and students',
      style: 'Microsoft Learn clean',
      imageUrl: '/images/programs/cloud-security.svg',
      downloadablePdfUrl: '/resources.html',
      relatedCourseIds: ['course-azure-security', 'course-live-virtual-cohort'],
      relatedLessonIds: ['lesson-security-pim-01', 'lesson-security-pim-02'],
      tags: ['least-privilege', 'rbac', 'access-reviews'],
      difficulty: 'beginner',
      certificationMapping: ['SC-300', 'AZ-500']
    },
    {
      id: 'poster-devsecops-pipeline',
      title: 'Secure Azure DevOps CI/CD Pipeline',
      topic: 'DevSecOps',
      audience: 'Developers and platform engineers',
      style: 'Comic-book technical',
      imageUrl: '/images/programs/devops-automation.svg',
      downloadablePdfUrl: '/resources.html',
      relatedCourseIds: ['course-devsecops', 'course-live-virtual-cohort'],
      relatedLessonIds: ['lesson-devsecops-01'],
      tags: ['cicd', 'shift-left', 'pipeline-security'],
      difficulty: 'intermediate',
      certificationMapping: ['AZ-400']
    },
    {
      id: 'poster-defender-cnapp',
      title: 'Defender for Cloud + CNAPP Explained',
      topic: 'Cloud Security Posture',
      audience: 'Architects and security teams',
      style: 'Futuristic hologram datacenter',
      imageUrl: '/images/programs/enterprise-plans.svg',
      downloadablePdfUrl: '/resources.html',
      relatedCourseIds: ['course-azure-security', 'course-cloud-architecture'],
      relatedLessonIds: ['lesson-devsecops-02', 'lesson-arch-02'],
      tags: ['defender', 'cnapp', 'cspm', 'cwpp'],
      difficulty: 'advanced',
      certificationMapping: ['AZ-500', 'SC-200']
    },
    {
      id: 'poster-zero-trust-azure',
      title: 'Zero Trust in Azure',
      topic: 'Security Architecture',
      audience: 'Architects and leadership',
      style: 'Cinematic architecture poster',
      imageUrl: '/images/programs/cloud-architecture.svg',
      downloadablePdfUrl: '/resources.html',
      relatedCourseIds: ['course-cloud-architecture', 'course-azure-security'],
      relatedLessonIds: ['lesson-arch-01'],
      tags: ['zero-trust', 'network', 'identity', 'data'],
      difficulty: 'advanced',
      certificationMapping: ['AZ-305', 'SC-100']
    },
    {
      id: 'poster-azure-regions-map',
      title: 'Azure Regions and Availability Zones',
      topic: 'Azure Fundamentals',
      audience: 'Beginners and youth learners',
      style: 'Classroom visual explainer',
      imageUrl: '/images/programs/cloud-fundamentals.svg',
      downloadablePdfUrl: '/resources.html',
      relatedCourseIds: ['course-azure-fundamentals', 'course-pg-parks-cohort'],
      relatedLessonIds: ['lesson-azure-core-01'],
      tags: ['regions', 'availability-zones', 'azure-basics'],
      difficulty: 'beginner',
      certificationMapping: ['AZ-900']
    },
    {
      id: 'poster-azure-policy-control',
      title: 'Cloud Control with Azure Policy',
      topic: 'Governance',
      audience: 'Administrators and learners',
      style: 'Blueprint + clean enterprise',
      imageUrl: '/images/programs/black-women-in-tech-feature.svg',
      downloadablePdfUrl: '/cloud-control-azure-policy.html',
      relatedCourseIds: ['course-azure-fundamentals', 'course-cloud-architecture'],
      relatedLessonIds: ['lesson-azure-core-02'],
      tags: ['governance', 'azure-policy', 'cost-control'],
      difficulty: 'intermediate',
      certificationMapping: ['AZ-900', 'AZ-305']
    },
    {
      id: 'poster-ai-rag',
      title: 'RAG Architecture for Teams',
      topic: 'AI Fundamentals',
      audience: 'AI builders and analysts',
      style: 'Neon wireframe futurism',
      imageUrl: '/images/programs/ai-machine-learning.svg',
      downloadablePdfUrl: '/resources.html',
      relatedCourseIds: ['course-ai-fundamentals', 'course-live-virtual-cohort'],
      relatedLessonIds: ['lesson-ai-01', 'lesson-ai-02'],
      tags: ['rag', 'prompt-engineering', 'vector-search'],
      difficulty: 'intermediate',
      certificationMapping: ['AI-900']
    },
    {
      id: 'poster-career-roadmap',
      title: 'Cloud Career Roadmap by Role',
      topic: 'Career Development',
      audience: 'Career changers, students, and veterans',
      style: 'Modern classroom and executive hybrid',
      imageUrl: '/images/programs/coach-ro-portrait.svg',
      downloadablePdfUrl: '/cloud-career-starter-kit.html',
      relatedCourseIds: ['course-career-prep', 'course-pg-parks-cohort'],
      relatedLessonIds: ['lesson-career-01', 'lesson-career-02'],
      tags: ['career', 'portfolio', 'interview', 'certification'],
      difficulty: 'beginner',
      certificationMapping: ['Career']
    }
  ];

  const courses = [
    {
      id: 'course-pg-parks-cohort',
      title: 'PG Parks In-Person Cohort',
      description: 'Instructor-led in-person cohort with weekly labs, onboarding, and classroom support.',
      audience: 'PG Parks learners, youth, and community students',
      deliveryType: 'pg-parks',
      modules: ['module-azure-core', 'module-security-identity', 'module-career-growth'],
      lessons: ['lesson-azure-core-01', 'lesson-security-pim-01', 'lesson-career-01'],
      assets: ['poster-azure-regions-map', 'poster-pim-pro', 'poster-career-roadmap'],
      quizzes: ['quiz-azure-core', 'quiz-pim-lab', 'quiz-career-prep']
    },
    {
      id: 'course-live-virtual-cohort',
      title: 'Live Virtual Cohort Experience',
      description: 'Live online cohort with guided sessions, replays, and shared class resources.',
      audience: 'Remote learners and working professionals',
      deliveryType: 'live',
      modules: ['module-azure-core', 'module-devsecops-foundation', 'module-ai-core'],
      lessons: ['lesson-azure-core-01', 'lesson-devsecops-01', 'lesson-ai-01'],
      assets: ['poster-azure-regions-map', 'poster-devsecops-pipeline', 'poster-ai-rag'],
      quizzes: ['quiz-azure-core', 'quiz-devsecops-shift-left', 'quiz-ai-essentials']
    },
    {
      id: 'course-azure-fundamentals',
      title: 'Azure Fundamentals Track',
      description: 'Self-paced Azure foundations aligned to AZ-900.',
      audience: 'Beginners and career starters',
      deliveryType: 'self-paced',
      modules: ['module-azure-core'],
      lessons: ['lesson-azure-core-01', 'lesson-azure-core-02'],
      assets: ['poster-azure-regions-map', 'poster-azure-policy-control'],
      quizzes: ['quiz-azure-core']
    },
    {
      id: 'course-azure-security',
      title: 'Azure Security Track',
      description: 'Identity, privilege management, and cloud security posture.',
      audience: 'Cloud admins and security learners',
      deliveryType: 'self-paced',
      modules: ['module-security-identity'],
      lessons: ['lesson-security-pim-01', 'lesson-security-pim-02'],
      assets: ['poster-pim-pro', 'poster-least-privilege', 'poster-defender-cnapp', 'poster-zero-trust-azure'],
      quizzes: ['quiz-pim-lab']
    },
    {
      id: 'course-devsecops',
      title: 'DevSecOps Track',
      description: 'Secure CI/CD, policy as code, and compliance automation.',
      audience: 'Developers and platform teams',
      deliveryType: 'self-paced',
      modules: ['module-devsecops-foundation'],
      lessons: ['lesson-devsecops-01', 'lesson-devsecops-02'],
      assets: ['poster-devsecops-pipeline', 'poster-defender-cnapp'],
      quizzes: ['quiz-devsecops-shift-left']
    },
    {
      id: 'course-ai-fundamentals',
      title: 'AI Fundamentals Track',
      description: 'Prompt engineering, RAG, and responsible AI implementation.',
      audience: 'AI beginners and innovation teams',
      deliveryType: 'self-paced',
      modules: ['module-ai-core'],
      lessons: ['lesson-ai-01', 'lesson-ai-02'],
      assets: ['poster-ai-rag'],
      quizzes: ['quiz-ai-essentials']
    },
    {
      id: 'course-cloud-architecture',
      title: 'Cloud Architecture Track',
      description: 'Enterprise architecture with governance, resilience, and zero trust.',
      audience: 'Architects and engineering leaders',
      deliveryType: 'self-paced',
      modules: ['module-architecture-core'],
      lessons: ['lesson-arch-01', 'lesson-arch-02'],
      assets: ['poster-zero-trust-azure', 'poster-defender-cnapp', 'poster-azure-policy-control'],
      quizzes: ['quiz-architecture-patterns']
    },
    {
      id: 'course-career-prep',
      title: 'Career Prep Track',
      description: 'Portfolio, interview prep, certification plans, and personal branding strategy.',
      audience: 'Career changers, students, and professionals',
      deliveryType: 'self-paced',
      modules: ['module-career-growth'],
      lessons: ['lesson-career-01', 'lesson-career-02'],
      assets: ['poster-career-roadmap'],
      quizzes: ['quiz-career-prep']
    }
  ];

  const cohorts = [
    {
      id: 'cohort-pg-2026-summer',
      title: 'PG Parks Summer Cloud + AI Cohort',
      type: 'pg-parks',
      startDate: '2026-07-20',
      endDate: '2026-09-12',
      schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM ET',
      location: 'Prince George\'s County Community Center, MD',
      virtualLink: '',
      assignedCourseIds: ['course-pg-parks-cohort', 'course-azure-fundamentals'],
      assignedLessonIds: ['lesson-azure-core-01', 'lesson-security-pim-01', 'lesson-career-01'],
      enrolledStudents: 34
    },
    {
      id: 'cohort-live-2026-aug',
      title: 'Live Virtual Azure + DevSecOps Cohort',
      type: 'live',
      startDate: '2026-08-03',
      endDate: '2026-09-07',
      schedule: 'Mondays and Wednesdays, 7:00 PM - 9:00 PM ET',
      location: 'Online',
      virtualLink: 'Provided after registration',
      assignedCourseIds: ['course-live-virtual-cohort', 'course-devsecops', 'course-ai-fundamentals'],
      assignedLessonIds: ['lesson-devsecops-01', 'lesson-ai-01', 'lesson-azure-core-01'],
      enrolledStudents: 58
    }
  ];

  function mapById(items) {
    return items.reduce(function (acc, item) {
      acc[item.id] = item;
      return acc;
    }, {});
  }

  window.DCTLearningModel = {
    courses: courses,
    modules: modules,
    lessons: lessons,
    visualPosters: visualPosters,
    quizzes: quizzes,
    cohorts: cohorts,
    resources: resources,
    byId: {
      course: mapById(courses),
      module: mapById(modules),
      lesson: mapById(lessons),
      poster: mapById(visualPosters),
      quiz: mapById(quizzes),
      cohort: mapById(cohorts),
      resource: mapById(resources)
    }
  };
})();
