import React from "react";
import TarotCard from "./tarot-card/tarotCard";

// project image imports
import countryImgSmall from "../assets/media/country-website-small.webp";
import countryImgMed from "../assets/media/country-website-med.webp";
import countryImgLarge from "../assets/media/country-website-lrg.webp";
import luxelineImgSmall from "../assets/media/luxeline-small.webp";
import luxelineImgMed from "../assets/media/luxeline-med.webp";
import luxelineImgLarge from "../assets/media/luxeline-lrg.webp";
import northernShaolinImgSmall from "../assets/media/northern-shaolin-small.webp";
import northernShaolinImgMed from "../assets/media/northern-shaolin-med.webp";
import northernShaolinImgLarge from "../assets/media/northern-shaolin-lrg.webp";
import triviaImgSmall from "../assets/media/trivia-app-small.webp";
import triviaImgMed from "../assets/media/trivia-app-med.webp";
import triviaImgLarge from "../assets/media/trivia-app-lrg.webp";

const projectsData = [
  {
    id: "trivia",
    number: "I",
    title: "Trivia App",
    subtitle: "React · 2024",
    description:
      "Quiz platform with dynamic categories and real-time leaderboards.",
    tags: ["React", "Node.js", "CSS Modules"],
    link: "/projects/trivia",
    image: {
      src: triviaImgMed,
      srcSet: `${triviaImgSmall} 480w, ${triviaImgMed} 1920w, ${triviaImgLarge} 2080w`,
      sizes: "(max-width: 480px) 100vw, (max-width: 1920px) 50vw, 33vw",
      alt: "Trivia app project preview",
    },
    variation: 1,
  },
  {
    id: "luxeline",
    number: "II",
    title: "LuxeLine Automotives",
    subtitle: "UI / UX · 2024",
    description:
      "Luxury car dealership with vehicle configurator and Stripe checkout.",
    tags: ["React", "Stripe", "Figma"],
    link: "/projects/luxeline",
    image: {
      src: luxelineImgMed,
      srcSet: `${luxelineImgSmall} 480w, ${luxelineImgMed} 1920w, ${luxelineImgLarge} 2080w`,
      sizes: "(max-width: 480px) 100vw, (max-width: 1920px) 50vw, 33vw",
      alt: "LuxeLine Automotives project preview",
    },
    variation: 2,
  },
  {
    id: "country",
    number: "III",
    title: "Country Website",
    subtitle: "Full Stack · 2024",
    description: "Interactive country explorer using the REST Countries API.",
    tags: ["React", "REST API", "Leaflet"],
    link: "/projects/country",
    image: {
      src: countryImgMed,
      srcSet: `${countryImgSmall} 480w, ${countryImgMed} 1920w, ${countryImgLarge} 2080w`,
      sizes: "(max-width: 480px) 100vw, (max-width: 1920px) 50vw, 33vw",
      alt: "Country Website project preview",
    },
    variation: 3,
  },
  {
    id: "northern-shaolin",
    number: "IV",
    title: "Northern Shaolin",
    subtitle: "Web Design · 2024",
    description: "Martial arts school site with scheduling and video gallery.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "/projects/northern-shaolin",
    image: {
      src: northernShaolinImgMed,
      srcSet: `${northernShaolinImgSmall} 480w, ${northernShaolinImgMed} 1920w, ${northernShaolinImgLarge} 2080w`,
      sizes: "(max-width: 480px) 100vw, (max-width: 1920px) 50vw, 33vw",
      alt: "Northern Shaolin project preview",
    },
    variation: 1,
  },
];

function TarotCards() {
  return (
    <section id="projects">
      <div className="tarotGrid">
        {projectsData.map((project) => (
          <TarotCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}

export default TarotCards;
