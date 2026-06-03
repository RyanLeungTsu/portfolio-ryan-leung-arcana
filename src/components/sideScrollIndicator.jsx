import { useEffect, useState, useRef } from "react";
import "../styles/sideScroll.css";

function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [arrowTop, setArrowTop] = useState(0);

  const sectionRefs = {
    home: useRef(null),
    projects: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeRef = sectionRefs[activeSection];
    if (activeRef?.current) {
      const rect = activeRef.current.getBoundingClientRect();
      const sidebarTop =
        document.querySelector(".sidebar ul")?.getBoundingClientRect().top || 0;
      const liHeight = rect.height || 0;
      setArrowTop(rect.top - sidebarTop + liHeight / 4);
    }
  }, [activeSection]);

  return (
    <nav className="sidebar" aria-label="Main Navigation">
      <ul>
        <li
          ref={sectionRefs.home}
          className={activeSection === "home" ? "active" : ""}
        >
          <a href="#home" aria-label="Go to Home section">Home</a>
        </li>
        <li
          ref={sectionRefs.projects}
          className={activeSection === "projects" ? "active" : ""}
        >
          <a href="#projects" aria-label="Go to Projects section">Projects</a>
        </li>
        <li
          ref={sectionRefs.about}
          className={activeSection === "about" ? "active" : ""}
        >
          <a href="#contact" aria-label="Go to Contact section">Contact</a>
        </li>
      </ul>
      <div className="scroll-arrow" style={{ top: `${arrowTop}px` }} aria-hidden="true">
        &rarr;
      </div>
    </nav>
  );
}

export default Sidebar;