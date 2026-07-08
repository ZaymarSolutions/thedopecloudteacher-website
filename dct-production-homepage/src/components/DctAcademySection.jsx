const academyPaths = [
  "Cloud Foundations",
  "Everyday AI",
  "Cyber Safety Basics",
  "Web & Cloud Starter",
  "AI Business Starter",
  "Creative Cloud Projects",
];

function DctAcademySection() {
  return (
    <section className="section-shell" id="dct-academy">
      <div className="section-headline">
        <p className="eyebrow">DCT Academy</p>
        <h2>Online learning for learners who want structure, pace, and portfolio-ready outcomes.</h2>
        <p className="supporting-text">
          The Dope Cloud Academy is the self-paced digital platform that complements local community classes,
          corporate training, and certification pathways without duplicating them.
        </p>
      </div>
      <div className="cards-grid">
        {academyPaths.map((path) => (
          <article key={path} className="info-card">
            <span className="card-badge">Academy Path</span>
            <h3>{path}</h3>
            <p>Structured online pathway with practice labs, guided outcomes, and flexible pacing.</p>
          </article>
        ))}
      </div>
      <div className="cta-cluster">
        <a className="btn btn-primary" href="#pg-parks-programs">
          View Local PG County Parks & Planning Classes
        </a>
        <a className="btn btn-secondary" href="#success">
          See Student Success
        </a>
      </div>
    </section>
  );
}

export default DctAcademySection;

