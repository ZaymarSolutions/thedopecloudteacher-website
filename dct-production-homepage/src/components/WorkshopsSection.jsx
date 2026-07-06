function WorkshopsSection() {
  return (
    <section className="section-shell" id="workshops">
      <div className="section-headline">
        <p className="eyebrow">Workshops</p>
        <h2>Community and Workforce Workshop Experiences</h2>
        <p className="supporting-text">
          Request a PG Parks/community partnership workshop for youth, families, seniors,
          entrepreneurs, and community organizations seeking practical technology confidence.
        </p>
      </div>
      <div className="cards-grid">
        <article className="experience-card">
          <h3>Community Workshop Series</h3>
          <p>
            Plain-language workshops focused on digital safety, AI literacy, and practical cloud
            skills for everyday use.
          </p>
        </article>
        <article className="experience-card">
          <h3>Workforce Readiness Intensives</h3>
          <p>
            Role-focused upskilling modules for job seekers, career changers, and teams preparing
            for certifications.
          </p>
        </article>
        <article className="experience-card">
          <h3>Partnership Delivery</h3>
          <p>
            Co-designed programs with local partners, including hybrid options and implementation
            support.
          </p>
        </article>
      </div>
      <div className="cta-cluster">
        <a
          className="btn btn-primary"
          href="mailto:thedopecloudteacher@gmail.com?subject=Request%20PG%20Parks%20Community%20Workshop"
        >
          Request PG Parks/Community Partnership Workshop
        </a>
      </div>
    </section>
  );
}

export default WorkshopsSection;
