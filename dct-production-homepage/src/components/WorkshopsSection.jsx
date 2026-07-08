function WorkshopsSection() {
  return (
    <section className="section-shell" id="workshops">
      <div className="section-headline">
        <p className="eyebrow">Workshops</p>
        <h2>Community and workforce workshop experiences that feel premium and practical.</h2>
        <p className="supporting-text">
          Request a PG Parks, community, or workforce workshop for youth, families, seniors,
          entrepreneurs, and teams seeking practical technology confidence.
        </p>
      </div>
      <div className="cards-grid">
        <article className="experience-card">
          <span className="card-badge">Tech Tuesday</span>
          <h3>Community Workshop Series</h3>
          <p>
            Short-form learning sessions focused on digital safety, AI literacy, and practical cloud
            skills for everyday use.
          </p>
        </article>
        <article className="experience-card">
          <span className="card-badge">Corporate</span>
          <h3>Workforce Readiness Intensives</h3>
          <p>
            Role-focused upskilling modules for job seekers, career changers, and teams preparing
            for certifications.
          </p>
        </article>
        <article className="experience-card">
          <span className="card-badge">Community</span>
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
          Request PG County Parks & Planning/Community Partnership Workshop
        </a>
      </div>
    </section>
  );
}

export default WorkshopsSection;

