function HeroSection() {
  return (
    <section className="hero-section section-shell" id="classes">
      <div className="hero-copy">
        <p className="eyebrow">Premium academy platform</p>
        <h1>Build cloud, AI, and cybersecurity confidence with one premium learning system.</h1>
        <p>
          The Dope Cloud Teacher Academy brings together local community programs, self-paced learning,
          and corporate-ready training in one polished experience designed for real outcomes.
        </p>
        <div className="hero-highlights" aria-label="Hero highlights">
          <span className="status-pill">Cloud & AI Fundamentals</span>
          <span className="status-pill">Azure Security</span>
          <span className="status-pill">Career Accelerator</span>
        </div>
        <div className="hero-stats" aria-label="Key academy metrics">
          <article className="stat-card">
            <strong>6 weeks</strong>
            <span>Core flagship course</span>
          </article>
          <article className="stat-card">
            <strong>3 paths</strong>
            <span>PG Parks, Academy, Corporate</span>
          </article>
          <article className="stat-card">
            <strong>Portfolio-ready</strong>
            <span>Projects, labs, and certifications</span>
          </article>
        </div>
        <div className="hero-actions">
          <a href="#pg-parks-programs" className="btn btn-primary">
            Explore Local Classes
          </a>
          <a href="#dct-academy" className="btn btn-secondary">
            Start Online Academy
          </a>
        </div>
      </div>
      <div className="hero-image-wrap">
        <img src="/assets/dct-hero-image.svg" alt="DCT branded hero illustration" className="hero-image" />
      </div>
    </section>
  );
}

export default HeroSection;

