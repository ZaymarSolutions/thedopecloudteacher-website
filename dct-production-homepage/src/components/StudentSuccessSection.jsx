const testimonials = [
  {
    quote:
      "The structure and accountability helped me go from unsure to interview-ready in one focused training cycle.",
    name: "Arielle M.",
    role: "Cloud Support Analyst",
  },
  {
    quote:
      "I passed AZ-900 and started building real projects because the labs were clear, practical, and repeatable.",
    name: "Darius T.",
    role: "Azure Fundamentals Graduate",
  },
  {
    quote:
      "Our team used the corporate track to modernize cloud security workflows and improve audit confidence quickly.",
    name: "Public Sector Program Lead",
    role: "Workforce Partner",
  },
];

const highlights = [
  "AZ-900, AI-900, and security-aligned prep pathways",
  "Portfolio-first project completion model",
  "Career outcomes spanning internship placement, promotions, and role transitions",
];

function StudentSuccessSection() {
  return (
    <section className="section-shell" id="success">
      <div className="section-headline">
        <p className="eyebrow">Student Success</p>
        <h2>Results You Can See In Certifications, Confidence, and Career Outcomes</h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((item) => (
          <article key={item.name} className="testimonial-card">
            <p className="quote">"{item.quote}"</p>
            <p className="person">{item.name}</p>
            <p className="role">{item.role}</p>
          </article>
        ))}
      </div>

      <div className="highlights-block">
        <h3>Certification Highlights and Career Outcomes</h3>
        <ul>
          {highlights.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default StudentSuccessSection;
