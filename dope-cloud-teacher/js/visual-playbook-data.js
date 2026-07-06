(function () {
  if (!window.DCTLearningModel || !Array.isArray(window.DCTLearningModel.visualPosters)) {
    return;
  }

  var posterMeta = {
    'poster-pim-pro': {
      slug: 'enable-pim',
      category: 'Identity',
      relatedPosterIds: ['poster-least-privilege', 'poster-zero-trust-azure'],
      relatedLabUrls: ['/resources.html#identity-labs'],
      relatedBlogUrls: ['/blog.html#poster-pim-pro'],
      relatedVideoUrl: '/resources.html#identity-videos',
      downloadablePdfUrl: '/resources.html#pim-pdf',
      downloadableCheatSheetUrl: '/resources.html#identity-cheatsheet',
      estimatedLearningTime: 8
    },
    'poster-least-privilege': {
      slug: 'least-privilege',
      category: 'Security',
      relatedPosterIds: ['poster-pim-pro', 'poster-zero-trust-azure'],
      relatedLabUrls: ['/resources.html#least-privilege-lab'],
      relatedBlogUrls: ['/blog.html#poster-least-privilege'],
      relatedVideoUrl: '/resources.html#least-privilege-video',
      downloadablePdfUrl: '/resources.html#least-privilege-pdf',
      downloadableCheatSheetUrl: '/resources.html#least-privilege-cheat-sheet',
      estimatedLearningTime: 8
    },
    'poster-defender-cnapp': {
      slug: 'defender-cnapp',
      category: 'Security',
      extraTags: ['sentinel', 'siem', 'threat-detection'],
      relatedPosterIds: ['poster-zero-trust-azure', 'poster-devsecops-pipeline'],
      relatedLabUrls: ['/resources.html#cnapp-labs'],
      relatedBlogUrls: ['/blog.html#poster-defender-cnapp'],
      relatedVideoUrl: '/resources.html#cnapp-video',
      downloadablePdfUrl: '/resources.html#cnapp-pdf',
      downloadableCheatSheetUrl: '/resources.html#cnapp-cheat-sheet',
      estimatedLearningTime: 8
    },
    'poster-zero-trust-azure': {
      slug: 'zero-trust-azure',
      category: 'Architecture',
      relatedPosterIds: ['poster-least-privilege', 'poster-defender-cnapp', 'poster-pim-pro'],
      relatedLabUrls: ['/resources.html#zero-trust-labs'],
      relatedBlogUrls: ['/blog.html#poster-zero-trust-azure'],
      relatedVideoUrl: '/resources.html#zero-trust-video',
      downloadablePdfUrl: '/resources.html#zero-trust-pdf',
      downloadableCheatSheetUrl: '/resources.html#zero-trust-cheat-sheet',
      estimatedLearningTime: 8
    },
    'poster-devsecops-pipeline': {
      slug: 'azure-devops-cicd',
      category: 'DevOps',
      relatedPosterIds: ['poster-defender-cnapp'],
      relatedLabUrls: ['/resources.html#devsecops-labs'],
      relatedBlogUrls: ['/blog.html#poster-devsecops-pipeline'],
      relatedVideoUrl: '/resources.html#devsecops-video',
      downloadablePdfUrl: '/resources.html#devsecops-pdf',
      downloadableCheatSheetUrl: '/resources.html#devsecops-cheat-sheet',
      estimatedLearningTime: 8
    },
    'poster-azure-regions-map': {
      slug: 'azure-regions',
      category: 'Azure',
      relatedPosterIds: ['poster-azure-policy-control'],
      relatedLabUrls: ['/resources.html#azure-labs'],
      relatedBlogUrls: ['/blog.html#poster-azure-regions-map'],
      relatedVideoUrl: '/resources.html#azure-regions-video',
      downloadablePdfUrl: '/resources.html#azure-regions-pdf',
      downloadableCheatSheetUrl: '/resources.html#azure-cheat-sheet',
      estimatedLearningTime: 8
    },
    'poster-azure-policy-control': {
      slug: 'azure-policy-control',
      category: 'Compliance',
      relatedPosterIds: ['poster-azure-regions-map', 'poster-zero-trust-azure'],
      relatedLabUrls: ['/resources.html#policy-labs'],
      relatedBlogUrls: ['/blog.html#poster-azure-policy-control'],
      relatedVideoUrl: '/resources.html#policy-video',
      downloadablePdfUrl: '/resources.html#policy-pdf',
      downloadableCheatSheetUrl: '/resources.html#policy-cheat-sheet',
      estimatedLearningTime: 8
    },
    'poster-ai-rag': {
      slug: 'ai-rag-architecture',
      category: 'AI',
      relatedPosterIds: ['poster-career-roadmap'],
      relatedLabUrls: ['/resources.html#ai-labs'],
      relatedBlogUrls: ['/blog.html#poster-ai-rag'],
      relatedVideoUrl: '/resources.html#ai-video',
      downloadablePdfUrl: '/resources.html#ai-rag-pdf',
      downloadableCheatSheetUrl: '/resources.html#ai-cheat-sheet',
      estimatedLearningTime: 8
    },
    'poster-career-roadmap': {
      slug: 'career-roadmap',
      category: 'Cloud Careers',
      relatedPosterIds: ['poster-ai-rag', 'poster-azure-regions-map'],
      relatedLabUrls: ['/resources.html#career-labs'],
      relatedBlogUrls: ['/blog.html#poster-career-roadmap'],
      relatedVideoUrl: '/resources.html#career-video',
      downloadablePdfUrl: '/resources.html#career-roadmap-pdf',
      downloadableCheatSheetUrl: '/resources.html#career-cheat-sheet',
      estimatedLearningTime: 8
    }
  };

  window.DCTLearningModel.visualPosters = window.DCTLearningModel.visualPosters.map(function (poster) {
    var meta = posterMeta[poster.id] || {};
    var full = Object.assign({}, poster, meta);
    if (Array.isArray(meta.extraTags)) {
      full.tags = (Array.isArray(poster.tags) ? poster.tags.slice() : []).concat(meta.extraTags)
        .filter(function (value, index, arr) { return arr.indexOf(value) === index; });
    }
    full.route = '/playbook/' + (full.slug || poster.id.replace(/^poster-/, '')) + '/';
    full.thumbnailUrl = full.thumbnailUrl || full.imageUrl;
    full.fullImageUrl = full.fullImageUrl || full.imageUrl;
    full.downloadablePngUrl = full.downloadablePngUrl || full.imageUrl;
    full.relatedQuizId = full.relatedQuizId || (full.relatedLessonIds && full.relatedLessonIds[0] && window.DCTLearningModel.byId.lesson[full.relatedLessonIds[0]]
      ? window.DCTLearningModel.byId.lesson[full.relatedLessonIds[0]].quizId
      : '');
    return full;
  });

  window.DCTLearningModel.byId.poster = window.DCTLearningModel.visualPosters.reduce(function (acc, poster) {
    acc[poster.id] = poster;
    return acc;
  }, {});
})();
