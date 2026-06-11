import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import TarotCard from "./tarot-card/tarotCard";
import "../styles/tarotFan.css";

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
    description: "Quiz platform with dynamic categories and real-time leaderboards.",
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
    description: "Luxury car dealership with vehicle configurator and Stripe checkout.",
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

// for looping the array of projects
const EXTENDED_PROJECTS = [
  ...projectsData,
  ...projectsData,
  ...projectsData,
];

// Memoized card component to remove re-renders. Only renders if props change
const CardWrapper = React.memo(({ project, index, getCardStyle, shouldFlipCard }) => {
  const style = getCardStyle(index);
  
  return (
    <div
      key={`${project.id}-${index}`}
      className="carousel-card-wrapper"
      style={style}
    >
      <div
        className={`carousel-card${
          shouldFlipCard(index) ? " is-flipped" : ""
        }`}
      >
        <TarotCard
          {...project}
          disableLink={false}
          frontContent={null}
        />
      </div>
    </div>
  );
});

CardWrapper.displayName = "CardWrapper";

// fan function
function TarotFan() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(projectsData.length);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const dragOffsetRef = useRef(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  const mouseMoveTimeoutRef = useRef(null);

  const getResponsiveValues = useCallback(() => {
    if (windowWidth < 768) {
      return {
        visibleCards: 3,
        projectsShowing: 1,
        angleSpread: 0,
      };
    } else if (windowWidth < 1024) {
      return {
        visibleCards: 5,
        projectsShowing: 3,
        angleSpread: 18,
      };
    } else {
      return {
        visibleCards: 7,
        projectsShowing: 5,
        angleSpread: 20,
      };
    }
  }, [windowWidth]);

  const responsiveValues = getResponsiveValues();

  // reduces amount of recalculating for window resizing
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = useCallback((direction) => {
    setCurrentIndex((prev) => {
      let next = prev + (direction === "next" ? 1 : -1);

      if (next >= EXTENDED_PROJECTS.length - projectsData.length) {
        next = projectsData.length;
      }
      if (next < projectsData.length) {
        next = EXTENDED_PROJECTS.length - projectsData.length - 1;
      }

      return next;
    });
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    dragOffsetRef.current = 0;
  };

  // Debounced mouse move for performance
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    if (mouseMoveTimeoutRef.current) {
      cancelAnimationFrame(mouseMoveTimeoutRef.current);
    }

    mouseMoveTimeoutRef.current = requestAnimationFrame(() => {
      const diff = e.clientX - dragStart;
      dragOffsetRef.current = diff;

      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(${diff}px)`;
      }
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (mouseMoveTimeoutRef.current) {
      cancelAnimationFrame(mouseMoveTimeoutRef.current);
    }

    const dragThreshold = 50;
    if (dragOffsetRef.current > dragThreshold) {
      handleScroll("prev");
    } else if (dragOffsetRef.current < -dragThreshold) {
      handleScroll("next");
    }

    if (carouselRef.current) {
      carouselRef.current.style.transform = "";
    }
  };

  // Calculates position of cards
  const getCardStyle = useCallback((index) => {
    const relativeIndex = index - currentIndex;
    const { visibleCards, angleSpread } = responsiveValues;
    const halfVisible = Math.floor(visibleCards / 2);

    if (Math.abs(relativeIndex) > halfVisible) {
      return { opacity: 0, pointerEvents: "none" };
    }

    // Normalized position: 0 to 1, and 0.5 is the center
    const normalizedPos = (relativeIndex + halfVisible) / visibleCards;
    
    // for creaitng that semi-circle effect, basically moving the end cards down via y
    const arcDepth = Math.cos((normalizedPos - 0.5) * Math.PI);
    
    const angle = relativeIndex * angleSpread;
    const rotation = angle;
    
  
    const baseTranslateY = Math.abs(relativeIndex) * 0.6;
    const arcTranslateY = (1 - arcDepth) * 2; // Outer cards dip down more
    const translateY = baseTranslateY + arcTranslateY;
    
    // shorizontal spacing
    const translateX = relativeIndex * 7;

    return {
      transform: `translateX(${translateX}rem) rotateZ(${rotation}deg) translateY(${translateY}rem)`,
      opacity: 1,
      transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
      zIndex: visibleCards - Math.abs(relativeIndex),
    };
  }, [responsiveValues, currentIndex, isDragging]);

  const shouldFlipCard = useCallback((index) => {
    const relativeIndex = index - currentIndex;
    const { visibleCards } = responsiveValues;
    const halfVisible = Math.floor(visibleCards / 2);

    return Math.abs(relativeIndex) === halfVisible;
  }, [responsiveValues, currentIndex]);

  // Memoize visible projects for performance
  const visibleProjects = useMemo(() => {
    const { visibleCards } = responsiveValues;
    const halfVisible = Math.floor(visibleCards / 2);
    const start = Math.max(0, currentIndex - halfVisible - 1);
    const end = Math.min(EXTENDED_PROJECTS.length, currentIndex + halfVisible + 2);
    
    return EXTENDED_PROJECTS.slice(start, end).map((project, idx) => ({
      project,
      actualIndex: start + idx,
    }));
  }, [currentIndex, responsiveValues]);

  return (
    <div className="tarot-fan-section">
      <div className="carousel-container">
        <div
          ref={carouselRef}
          className="carousel-fan"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {visibleProjects.map(({ project, actualIndex }) => (
            <CardWrapper
              key={`${project.id}-${actualIndex}`}
              project={project}
              index={actualIndex}
              isDragging={isDragging}
              getCardStyle={getCardStyle}
              shouldFlipCard={shouldFlipCard}
            />
          ))}
        </div>

        {windowWidth >= 768 && (
          <>
            <button
              className="carousel-scroll-btn carousel-scroll-btn--next"
              onClick={() => handleScroll("next")}
              aria-label="Next project"
            >
              <svg
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M 20 50 Q 50 20, 80 50" />
                <path d="M 70 40 L 80 50 L 70 60" />
              </svg>
            </button>

            <button
              className="carousel-scroll-btn carousel-scroll-btn--prev"
              onClick={() => handleScroll("prev")}
              aria-label="Previous project"
            >
              <svg
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M 80 50 Q 50 20, 20 50" />
                <path d="M 30 40 L 20 50 L 30 60" />
              </svg>
            </button>

            <div className="carousel-counter">
              {((currentIndex - projectsData.length) % projectsData.length) + 1} / {projectsData.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TarotFan;