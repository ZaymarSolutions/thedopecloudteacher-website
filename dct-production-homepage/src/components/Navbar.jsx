import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Classes", href: "#classes" },
  { label: "PG Parks Programs", href: "#pg-parks-programs" },
  { label: "DCT Academy", href: "#dct-academy" },
  { label: "Workshops", href: "#workshops" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="top-nav">
      <div className="nav-inner">
        <a href="#home" className="brand-block" aria-label="The Dope Cloud Teacher Home">
          <img
            src="/assets/dct-hero-image.svg"
            alt="The Dope Cloud Teacher crest"
            className="brand-icon"
          />
          <div>
            <p className="brand-title">The Dope Cloud Teacher</p>
            <p className="brand-subtitle">Cloud Classes For Real People</p>
          </div>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          Menu
        </button>

        <nav id="primary-navigation" className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
