const learningPaths = [
  {
    title: "Azure Security",
    detail:
      "Identity, governance, hardening, and detection workflows aligned to modern enterprise security expectations.",
  },
  {
    title: "Cloud & AI Fundamentals",
    detail:
      "Core cloud services, AI literacy, and practical project execution for students and career changers.",
  },
  {
    title: "DevSecOps",
    detail:
      "Build secure CI/CD pipelines, shift-left controls, and operational visibility practices for deployment teams.",
  },
  {
    title: "AI for Business",
    detail:
      "Use AI tools for business planning, content systems, and workflow automation that creates measurable value.",
  },
  {
    title: "Career Accelerator",
    detail:
      "Certification alignment, interview storytelling, portfolio assets, and strategic upskilling for high-growth roles.",
  },
];

function FeaturedLearningPaths() {
  return (
    <section className="section-shell" id="courses">
      <div className="section-headline">
        <p className="eyebrow">Featured Learning Paths</p>
        <h2>Professional Course Tracks Designed For Advancement</h2>
      </div>
      <div className="cards-grid">
        {learningPaths.map((path) => (
          <article key={path.title} className="info-card">
            <h3>{path.title}</h3>
            <p>{path.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedLearningPaths;
