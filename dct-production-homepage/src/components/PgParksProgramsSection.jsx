import ProgramCard from "./ProgramCard";

const pgCategories = [
  "Children & Youth",
  "Pre-Teens & Teens",
  "Seniors 60 & Better",
  "Health & Wellness",
  "Disability Services",
  "Arts / Creative Technology",
  "Nature & Outdoors / Smart Gardening",
  "Community Events",
];

const starterPrograms = [
  {
    title: "Cloud & AI Fundamentals for Teens",
    audience: "Ages 13-18",
    format: "In-Person / Hybrid",
    location: "Prince George's County community locations",
    duration: "6-week cycle",
    skillLevel: "Beginner",
    registrationLink: "https://mdpgparksweb.myvscloud.com/webtrac/web/splash.html",
    relatedAcademyPath: "Cloud Foundations",
    description:
      "Introductory cloud, AI, cybersecurity, and digital confidence class designed for student learners.",
    cta: "Register Through PG County Parks & Planning",
  },
  {
    title: "AI for Seniors 60+",
    audience: "Seniors 60 & Better",
    format: "In-Person",
    location: "Community centers and senior-focused sessions",
    duration: "4 to 6 sessions",
    skillLevel: "Beginner",
    registrationLink: "mailto:thedopecloudteacher@gmail.com?subject=Request%20AI%20for%20Seniors%2060%2B",
    relatedAcademyPath: "Everyday AI",
    description:
      "Friendly, safe, beginner AI training focused on scams, healthcare, communication, and practical digital confidence.",
    cta: "Request This Workshop",
  },
  {
    title: "Cybersecurity for Families",
    audience: "Parents, teens, seniors, caregivers",
    format: "In-Person / Community Workshop",
    location: "Local community classrooms",
    duration: "Single workshop or short series",
    skillLevel: "Beginner",
    registrationLink: "mailto:thedopecloudteacher@gmail.com?subject=Request%20Cybersecurity%20for%20Families",
    relatedAcademyPath: "Cyber Safety Basics",
    description:
      "Passwords, phishing, scams, MFA, device safety, and online protection explained in plain language.",
    cta: "Request This Workshop",
  },
  {
    title: "Build Your First Website",
    audience: "Teens, adults, entrepreneurs",
    format: "Hybrid",
    location: "Local + online support sessions",
    duration: "4-week project sprint",
    skillLevel: "Beginner to Intermediate",
    registrationLink: "mailto:thedopecloudteacher@gmail.com?subject=Join%20Build%20Your%20First%20Website%20Waitlist",
    relatedAcademyPath: "Web & Cloud Starter",
    description:
      "Students build a simple website while learning hosting, design, accessibility, and online branding.",
    cta: "Join Waitlist",
  },
  {
    title: "AI for Small Business & Creators",
    audience: "Entrepreneurs, creators, community leaders",
    format: "Workshop / Hybrid",
    location: "Community workshop venues",
    duration: "2 to 4 sessions",
    skillLevel: "Beginner",
    registrationLink: "mailto:thedopecloudteacher@gmail.com?subject=Request%20AI%20for%20Small%20Business%20Workshop",
    relatedAcademyPath: "AI Business Starter",
    description:
      "Use AI tools to plan content, organize operations, improve marketing, and save time.",
    cta: "Request This Workshop",
  },
  {
    title: "Smart Garden + AI Lab",
    audience: "Families, teens, community gardeners",
    format: "In-Person / Project-Based",
    location: "Outdoor and classroom learning spaces",
    duration: "Seasonal project lab",
    skillLevel: "Beginner",
    registrationLink: "mailto:thedopecloudteacher@gmail.com?subject=Join%20Smart%20Garden%20AI%20Interest%20List",
    relatedAcademyPath: "Creative Cloud Projects",
    description:
      "Combines gardening, sensors, weather data, AI prompts, and cloud dashboards.",
    cta: "Join Interest List",
  },
];

const opportunityItems = [
  {
    season: "Fall 2026",
    idea: "Cloud & AI Fundamentals for Teens",
    audience: "Pre-Teens & Teens",
    category: "Children & Youth",
    status: "Drafted",
    action: "Confirm center schedule and lab supply list",
    notes: "Prioritize after-school time slots",
  },
  {
    season: "Winter 2027",
    idea: "AI for Seniors 60+",
    audience: "Seniors 60 & Better",
    category: "Health & Wellness",
    status: "Submitted",
    action: "Coordinate host site and accessibility support",
    notes: "Add safety and scam prevention examples",
  },
  {
    season: "Spring 2027",
    idea: "Smart Garden + AI Lab",
    audience: "Families and Youth",
    category: "Nature & Outdoors / Smart Gardening",
    status: "Idea",
    action: "Design pilot module and partner roster",
    notes: "Potential Earth Month launch",
  },
];

function PgParksProgramsSection() {
  return (
    <section className="section-shell" id="pg-parks-programs">
      <div className="section-headline">
        <p className="eyebrow">PG County Parks & Planning Programs</p>
        <h2>PG County Parks & Planning-Aligned Programs Built As a Strategic Community Channel</h2>
        <p className="supporting-text">
          The Dope Cloud Teacher delivers community technology education through local classes and
          registration through PG County Parks & Planning when available. These are local, scheduled, community-based
          programs and remain distinct from the Dope Cloud Academy online platform.
        </p>
      </div>

      <div className="cta-cluster">
        <a className="btn btn-primary" href="https://mdpgparksweb.myvscloud.com/webtrac/web/splash.html" target="_blank" rel="noreferrer">
          Find a Class
        </a>
        <a className="btn btn-secondary" href="https://mdpgparksweb.myvscloud.com/webtrac/web/splash.html" target="_blank" rel="noreferrer">
          Register Through PG County Parks & Planning
        </a>
        <a className="btn btn-secondary" href="#dct-academy">
          Explore DCT Academy Online
        </a>
        <a className="btn btn-secondary" href="#workshops">
          Request a Workshop
        </a>
      </div>

      <div className="external-links">
        <a href="https://www.pgparks.com/activities-events" target="_blank" rel="noreferrer">
          PG County Parks & Planning Activities & Events
        </a>
        <a href="https://mdpgparksweb.myvscloud.com/webtrac/web/splash.html" target="_blank" rel="noreferrer">
          PG County Parks & Planning Find a Class
        </a>
        <a href="https://www.pgparks.com/activities-events/events" target="_blank" rel="noreferrer">
          PG County Parks & Planning Events
        </a>
      </div>

      <div className="category-pills" aria-label="PG County Parks & Planning aligned categories">
        {pgCategories.map((category) => (
          <span key={category} className="category-pill">
            {category}
          </span>
        ))}
      </div>

      <div className="program-grid">
        {starterPrograms.map((program) => (
          <ProgramCard key={program.title} {...program} />
        ))}
      </div>

      <article className="partnership-block" id="about">
        <h3>Partnership Language</h3>
        <p>
          The Dope Cloud Teacher partners with community organizations to make cloud, AI,
          cybersecurity, and digital skills easier to understand, easier to access, and easier to
          apply in real life. Our PG County Parks & Planning-aligned programs support youth, seniors, families,
          entrepreneurs, and adults seeking practical technology confidence.
        </p>
      </article>

      <article className="tracker-block" id="dashboard">
        <h3>PG County Parks & Planning Opportunity Tracker</h3>
        <p className="supporting-text">
          Static content structure for now; ready to become dynamic in a future phase.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Season</th>
                <th>Program Idea</th>
                <th>Target Audience</th>
                <th>PG County Parks & Planning Category</th>
                <th>Status</th>
                <th>Next Action</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {opportunityItems.map((item) => (
                <tr key={`${item.season}-${item.idea}`}>
                  <td>{item.season}</td>
                  <td>{item.idea}</td>
                  <td>{item.audience}</td>
                  <td>{item.category}</td>
                  <td>{item.status}</td>
                  <td>{item.action}</td>
                  <td>{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}

export default PgParksProgramsSection;

