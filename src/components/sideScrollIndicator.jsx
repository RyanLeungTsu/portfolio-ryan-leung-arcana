import { useEffect, useState } from "react";
import "../styles/sideScroll.css";

function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [IndicatorTop, setIndicatorTop] = useState(0);

 useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const sections = Array.from(document.querySelectorAll("section[id]"));
      const scrollMid = window.scrollY + window.innerHeight / 2;

      let current = sections[0];
      sections.forEach((section) => {
        if (section.offsetTop <= scrollMid) {
          current = section;
        }
      });

      if (current) setActiveSection(current.id);
      ticking = false;
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}, []);

  useEffect(() => {
    const updateIndicator = () => {
      const nav = document.querySelector(".sidebar");
      const liElements = Array.from(document.querySelectorAll(".sidebar li"));

      if (!nav || !liElements.length) return;

      const sectionIds = ["home", "projects", "contact"];
      const liIndex = sectionIds.indexOf(activeSection);

      if (liIndex !== -1 && liElements[liIndex]) {
        const navRect = nav.getBoundingClientRect();
        const liRect = liElements[liIndex].getBoundingClientRect();
        const offset = liRect.top - navRect.top + liRect.height / 2;
        setIndicatorTop(offset);
      }
    };

    updateIndicator();
    const timeout = setTimeout(updateIndicator, 50);

    return () => clearTimeout(timeout);
  }, [activeSection]);

  return (
    <nav className="sidebar" aria-label="Main Navigation">
      <ul>
        <li className={activeSection === "home" ? "active" : ""}>
          <a href="#home" aria-label="Go to Home section">
            Home
          </a>
        </li>
        <li className={activeSection === "projects" ? "active" : ""}>
          <a href="#projects" aria-label="Go to Projects section">
            Projects
          </a>
        </li>
        <li className={activeSection === "contact" ? "active" : ""}>
          <a href="#contact" aria-label="Go to Contact section">
            Contact
          </a>
        </li>
      </ul>
      <div
        className="scroll-Indicator"
        style={{ top: `${IndicatorTop}px` }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" width="50">
          <path
            d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </nav>
  );
}

export default Sidebar;
