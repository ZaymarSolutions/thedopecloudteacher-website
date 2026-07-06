function CtaFooter() {
  return (
    <footer className="cta-footer" id="contact">
      <div className="footer-grid section-shell">
        <div>
          <p className="eyebrow">Call To Action</p>
          <h2>Stay Connected To Every New Class, Lab, and Enrollment Window</h2>
          <a href="#pg-parks-programs" className="btn btn-primary">
            Enrollment Options
          </a>
        </div>

        <div className="footer-column">
          <h3>Newsletter</h3>
          <p>Get program updates, class dates, and learning resources.</p>
          <a href="mailto:thedopecloudteacher@gmail.com">Subscribe by Email</a>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <p>Email: thedopecloudteacher@gmail.com</p>
          <p>Support for students, cohorts, and enterprise teams.</p>
          <a href="#workshops">Request PG Parks/Community Workshop</a>
        </div>

        <div className="footer-column" id="blog">
          <h3>Social and Links</h3>
          <a href="https://thedopecloudteacher.org" target="_blank" rel="noreferrer">
            Official Website
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}

export default CtaFooter;
