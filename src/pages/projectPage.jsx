import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  FaHtml5,
  FaJsSquare,
  FaCss3Alt,
  FaWordpress,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiReact,
} from "react-icons/si";
import ThemeToggle from "../components/themeToggle";
import CelestialBackground from "../components/background";
import VinylWidget from "../components/vinyl/vinyl";
import "../styles/projectPage.css";

import luxelineSmall from "../assets/media/luxeline-small.webp";
import luxelineMed from "../assets/media/luxeline-med.webp";
import luxelineLrg from "../assets/media/luxeline-lrg.webp";
import countrySmall from "../assets/media/country-website-small.webp";
import countryMed from "../assets/media/country-website-med.webp";
import countryLrg from "../assets/media/country-website-lrg.webp";
import shaolinSmall from "../assets/media/northern-shaolin-small.webp";
import shaolinMed from "../assets/media/northern-shaolin-med.webp";
import shaolinLrg from "../assets/media/northern-shaolin-lrg.webp";
import triviaSmall from "../assets/media/trivia-app-small.webp";
import triviaMed from "../assets/media/trivia-app-med.webp";
import triviaLrg from "../assets/media/trivia-app-lrg.webp";

const projectsData = [
  {
    id: "trivia",
    title: "Trivia App",
    subtitle: "React App · 2026",
    image: {
      srcSet: `${triviaSmall} 480w, ${triviaMed} 1920w, ${triviaLrg} 2080w`,
      sizes: "(max-width: 480px) 480px, (max-width: 1920px) 1920px, 2080px",
      alt: "Trivia app project image preview",
    },
    description:
      "A full-stack web app for creating and playing custom Jeopardy-style quiz boards, built with Next.js and TypeScript on the frontend. UI is styled entirely with Tailwind CSS. State management is handled by Zustand. Media (images, audio, video) is stored in the browser's IndexedDB for guests and migrates to Supabase Storage on sign in. Board data persists to localStorage for guests and Supabase PostgreSQL for signed in users, with Google OAuth handled via Supabase Auth. Features include a drag-and-drop slide editor powered by react-rnd, board import/export via JSZip, a canvas-based animated day/night background, and a featured board system that lets me publish monthly boards for anyone to play without signing in.",
    tools: [
      <FaHtml5 key="html" />,
      <FaJsSquare key="js" />,
      <FaFigma key="figma" />,
      <SiNextdotjs key="next" />,
      <SiTypescript key="ts" />,
      <SiTailwindcss key="tailwind" />,
      <SiSupabase key="supabase" />,
      <SiReact key="react" />,
    ],
    link: "https://trivia-projects.vercel.app",
  },
  {
    id: "luxeline",
    title: "LuxeLine Automotives",
    subtitle: "Wordpress Site · 2025",
    image: {
      srcSet: `${luxelineSmall} 480w, ${luxelineMed} 1920w, ${luxelineLrg} 2080w`,
      sizes: "(max-width: 480px) 480px, (max-width: 1920px) 1920px, 2080px",
      alt: "LuxeLine Automotives Project Image",
    },
    description:
      "This car dealership website is built on WordPress as the backend CMS, leveraging custom post types and taxonomies to manage vehicle listings, including attributes like make, model, fuel type, transmission, and price range. The frontend integrates a React-based filtering interface that communicates with the WordPress REST API or a custom GraphQL layer to fetch and display filtered vehicle data in real time.",
    tools: [
      <FaHtml5 key="html" />,
      <FaJsSquare key="js" />,
      <FaWordpress key="wp" />,
      <FaFigma key="figma" />,
    ],
    link: "https://luxelineautomotives.bcitwebdeveloper.ca",
  },
  {
    id: "country",
    title: "Country Website",
    subtitle: "HTML Website · 2024",
    image: {
      srcSet: `${countrySmall} 480w, ${countryMed} 1920w, ${countryLrg} 2080w`,
      sizes: "(max-width: 480px) 480px, (max-width: 1920px) 1920px, 2080px",
      alt: "Country Website Project Image",
    },
    description:
      "My Tokyo site is a city-focused webpage built using semantic HTML5 and modern CSS, designed to highlight the cultural landmarks, neighborhoods, and experiences unique to Tokyo. The layout is structured with header, main, section, and footer elements to ensure clear content organization and accessibility. I utilized flexbox and CSS to create a responsive, multi-column design that adapts smoothly across mobile, tablet, and desktop viewports using media queries.",
    tools: [<FaHtml5 key="html" />, <FaCss3Alt key="css" />],
    link: "https://ryanleungdev.com/country-website/",
  },
  {
    id: "northern-shaolin",
    title: "Northern Shaolin",
    subtitle: "Web Design · 2024",
    image: {
      srcSet: `${shaolinSmall} 480w, ${shaolinMed} 1920w, ${shaolinLrg} 2080w`,
      sizes: "(max-width: 480px) 480px, (max-width: 1920px) 1920px, 2080px",
      alt: "Northern Shaolin Project Image",
    },
    description:
      "The Northern Shaolin Kung-Fu school website is being developed as a headless architecture, using WordPress as a backend CMS for content management and React on the frontend for a fast, dynamic user experience. Structured content such as class schedules, lineage history, instructor bios, and media galleries are managed via custom WordPress REST API endpoints and Advanced Custom Fields.",
    tools: [
      <FaHtml5 key="html" />,
      <FaCss3Alt key="css" />,
      <FaWordpress key="wp" />,
      <FaFigma key="figma" />,
    ],
    link: "https://ryanleungdev.com/northern-shaolin-kungfu/",
  },
];

function ProjectPage() {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="project-page-not-found">
        <p>Project not found.</p>
        <Link to="/">← Back home</Link>
      </div>
    );
  }

  return (
    <div className="project-page">
      <CelestialBackground />

      <header className="project-page-header">
        <ThemeToggle />
        <VinylWidget />
      </header>
      <h1 className="project-page-title">{project.title}</h1>
      <main className="project-page-main">
        <div className="project-page-left">
          <img
            srcSet={project.image.srcSet}
            sizes={project.image.sizes}
            alt={project.image.alt}
            className="project-page-image"
          />
          <ul className="project-page-tools" role="list">
            {project.tools.map((icon, i) => (
              <li key={i} className="project-page-tool" role="listitem">
                {icon}
              </li>
            ))}
          </ul>
          <Link to="/" className="project-page-back" aria-label="Back to home">
            <FaArrowLeft />
          </Link>
        </div>

        <div className="project-page-right">
          <p className="project-page-subtitle">{project.subtitle}</p>
          <p className="project-description">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-page-link"
          >
            Visit Site →
          </a>
        </div>
      </main>
    </div>
  );
}

export default ProjectPage;
