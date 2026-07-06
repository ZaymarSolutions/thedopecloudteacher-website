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
        <h2>Online Learning Platform, Separate From Local PG Parks Class Scheduling</h2>
        <p className="supporting-text">
          The Dope Cloud Academy is the virtual and self-paced online platform available from
          anywhere. It complements local community classes but does not replace PG Parks-aligned
          in-person programming.
        </p>
      </div>
      <div className="cards-grid">
        {academyPaths.map((path) => (
          <article key={path} className="info-card">
            <h3>{path}</h3>
            <p>Structured online pathway with practice labs, guided outcomes, and flexible pacing.</p>
          </article>
        ))}
      </div>
      <div className="cta-cluster">
        <a className="btn btn-primary" href="#pg-parks-programs">
          View Local PG Parks Classes
        </a>
      </div>
    </section>
  );
}

export default DctAcademySection;
