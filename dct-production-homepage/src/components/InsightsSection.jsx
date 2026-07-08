const insights = [
  {
    label: "Tech Tuesday",
    title: "Weekly learning drops with one clear idea per session",
    body:
      "Use this slot for fast demos, cloud tips, AI prompts, and short implementation guidance that keeps the community engaged.",
  },
  {
    label: "Blog Highlights",
    title: "Feature the ideas that already drive interest and trust",
    body:
      "Highlight the strongest stories first: Cloud AI Starter Kit, classroom AI strategy, and beginner-friendly project walkthroughs.",
  },
  {
    label: "Community",
    title: "Make the academy feel active, local, and connected",
    body:
      "Show learner wins, partner collaborations, event recaps, and new opportunities for students, families, and organizations.",
  },
];

function InsightsSection() {
  return (
    <section className="section-shell" id="community">
      <div className="section-headline">
        <p className="eyebrow">Blog Highlights, Newsletter, and Community</p>
        <h2>Keep the academy visible through content that teaches while it markets.</h2>
        <p className="supporting-text">
          This section connects your content engine to the learning platform, so each new article,
          update, and community announcement reinforces the same brand story.
        </p>
      </div>
      <div className="cards-grid">
        {insights.map((item) => (
          <article key={item.label} className="info-card">
            <span className="card-badge">{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className="newsletter-band">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h3>Build the email list while the academy grows.</h3>
          <p>
            Use the newsletter to announce cohorts, drop new labs, and send high-value learning notes.
          </p>
        </div>
        <a className="btn btn-primary" href="mailto:thedopecloudteacher@gmail.com?subject=Subscribe%20to%20The%20Dope%20Cloud%20Teacher%20Newsletter">
          Subscribe by Email
        </a>
      </div>
    </section>
  );
}

export default InsightsSection;