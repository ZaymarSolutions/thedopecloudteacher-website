const experiences = [
  {
    id: "live-classes",
    title: "PG County Parks & Planning & Recreation",
    description:
      "Community-centered in-person classes with direct facilitation, guided labs, and student success check-ins.",
  },
  {
    id: "azure-labs",
    title: "Dope Cloud Academy",
    description:
      "Structured self-paced tracks, practical checkpoints, and repeatable lab workflows for independent growth.",
  },
  {
    id: "dashboard",
    title: "Corporate & Government Training",
    description:
      "Custom upskilling programs for workforce teams focused on security, cloud operations, and AI readiness.",
  },
];

function LearningExperiences() {
  return (
    <section className="section-shell" id="experiences">
      <div className="section-headline">
        <p className="eyebrow">Three Learning Experiences</p>
        <h2>Choose The Delivery Model That Matches Your Mission</h2>
      </div>
      <div className="experiences-grid">
        {experiences.map((item) => (
          <article key={item.title} id={item.id} className="experience-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LearningExperiences;

