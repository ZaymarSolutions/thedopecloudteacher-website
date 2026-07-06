function ProgramCard({
  title,
  audience,
  format,
  location,
  duration,
  skillLevel,
  registrationLink,
  relatedAcademyPath,
  description,
  cta,
}) {
  return (
    <article className="program-card">
      <h3>{title}</h3>
      <p className="program-description">{description}</p>
      <dl className="program-meta">
        <div>
          <dt>Audience</dt>
          <dd>{audience}</dd>
        </div>
        <div>
          <dt>Format</dt>
          <dd>{format}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{location}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{duration}</dd>
        </div>
        <div>
          <dt>Skill Level</dt>
          <dd>{skillLevel}</dd>
        </div>
        <div>
          <dt>Related Academy Path</dt>
          <dd>{relatedAcademyPath}</dd>
        </div>
      </dl>
      <a href={registrationLink} className="btn btn-primary" target="_blank" rel="noreferrer">
        {cta}
      </a>
    </article>
  );
}

export default ProgramCard;
