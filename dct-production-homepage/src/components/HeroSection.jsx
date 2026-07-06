function HeroSection() {
  return (
    <section className="hero-section section-shell" id="classes">
      <div className="hero-copy">
        <p className="eyebrow">Community Technology Education, Elevated</p>
        <h1>Prince George&apos;s County Learners Can Build Skills Locally or Online With DCT</h1>
        <p>
          The Dope Cloud Teacher operates in three clear pathways: local PG Parks-aligned
          programs, virtual and hybrid class options, and the Dope Cloud Academy for self-paced
          growth from anywhere.
        </p>
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
