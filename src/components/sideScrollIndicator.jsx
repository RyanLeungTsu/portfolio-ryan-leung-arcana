import { useEffect, useState } from "react";
import "../styles/sideScroll.css";

function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [arrowTop, setArrowTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll("section"));
      let closest = sections[0];
      let closestDistance = Math.abs(sections[0].getBoundingClientRect().top);

      sections.forEach((section) => {
        const distance = Math.abs(section.getBoundingClientRect().top);
        if (distance < closestDistance) {
          closest = section;
          closestDistance = distance;
        }
      });

      if (closest) {
        setActiveSection(closest.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateArrow = () => {
      const sidebar = document.querySelector(".sidebar ul");
      const liElements = Array.from(document.querySelectorAll(".sidebar li"));

      if (!sidebar || !liElements.length) return;

      const sectionIds = ["home", "projects", "contact"];
      const liIndex = sectionIds.indexOf(activeSection);

      if (liIndex !== -1 && liElements[liIndex]) {
        const activeLi = liElements[liIndex];
        const sidebarRect = sidebar.getBoundingClientRect();
        const liRect = activeLi.getBoundingClientRect();
        const offset = liRect.top - sidebarRect.top + 15;
        setArrowTop(offset);
      }
    };

    updateArrow();
    const timeout = setTimeout(updateArrow, 50);

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
        className="scroll-arrow"
        style={{ top: `${arrowTop}px` }}
        aria-hidden="true"
      >
        &rarr;
      </div>
    </nav>
  );
}

export default Sidebar;
