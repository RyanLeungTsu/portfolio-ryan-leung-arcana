import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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

// for looping the array of projects
const EXTENDED_PROJECTS = [...projectsData, ...projectsData, ...projectsData];

// Memoized card component to remove re-renders. Only renders if props change
const CardWrapper = React.memo(
  ({ project, index, getCardStyle, shouldFlipCard }) => {
    const style = getCardStyle(index);

    return (
      <div
        key={`${project.id}-${index}`}
        className="fan-card-wrapper"
        style={style}
      >
        <div
          className={`fan-card${shouldFlipCard(index) ? " is-flipped" : ""}`}
        >
          <TarotCard {...project} disableLink={false} frontContent={null} />
        </div>
      </div>
    );
  },
);

CardWrapper.displayName = "CardWrapper";

// fan function
const TarotFan = React.forwardRef(({ paused = false }, ref) => {
  const fanRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(projectsData.length);
  const [isAnimating, setIsAnimating] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

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

  const handleScroll = useCallback(
    (direction) => {
      if (paused) return;
      setIsAnimating(true);
      setScrollDirection(direction);
      setCurrentIndex((prev) => {
        if (direction === "next") {
          return prev + 1;
        } else {
          return prev - 1;
        }
      });
      setTimeout(() => setIsAnimating(false), 500);
    },
    [paused],
  );

  React.useImperativeHandle(ref, () => ({
    scroll: handleScroll,
  }));

  const handleTouchStart = (e) => {
    touchStartRef.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartRef.current - touchEndRef.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleScroll("next");
      } else {
        handleScroll("prev");
      }
    }
  };

const getCardStyle = useCallback(
  (index) => {
    const relativeIndex = index - currentIndex;
    const { visibleCards, angleSpread } = responsiveValues;
    const halfVisible = Math.floor(visibleCards / 2);

    let normalizedIndex = relativeIndex;
    if (normalizedIndex > halfVisible) {
      normalizedIndex -= visibleCards;
    }
    if (normalizedIndex < -halfVisible) {
      normalizedIndex += visibleCards;
    }

    if (Math.abs(normalizedIndex) > halfVisible) {
      return { opacity: 0, pointerEvents: "none" };
    }

    let opacity = 1;
    let opacityDelay = "0s";
    
    if (isAnimating) {
      if (scrollDirection === "next" && normalizedIndex === -halfVisible) {
        opacity = 0;
        opacityDelay = "0.5s";
      }
      if (scrollDirection === "prev" && normalizedIndex === halfVisible) {
        opacity = 0;
        opacityDelay = "0.5s";
      }
    }

    const normalizedPos = (normalizedIndex + halfVisible) / visibleCards;
    const arcDepth = Math.cos((normalizedPos - 0.5) * Math.PI);
    const angle = normalizedIndex * angleSpread;
    const rotation = angle;
    const baseTranslateY = Math.abs(normalizedIndex) * 0.6;
    const arcTranslateY = (1 - arcDepth) * 2;
    const translateY = baseTranslateY + arcTranslateY;
    const translateX = normalizedIndex * 7;

    return {
      transform: `translateX(${translateX}rem) rotateZ(${rotation}deg) translateY(${translateY}rem)`,
      opacity: opacity,
      transition: `transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.01s ${opacityDelay}`,
      zIndex: visibleCards - Math.abs(normalizedIndex),
    };
  },
  [responsiveValues, currentIndex, isAnimating, scrollDirection],
);

  const shouldFlipCard = useCallback(
    (index) => {
      const relativeIndex = index - currentIndex;
      const { visibleCards } = responsiveValues;
      const halfVisible = Math.floor(visibleCards / 2);

      let normalizedIndex = relativeIndex;
      if (normalizedIndex > halfVisible) {
        normalizedIndex -= visibleCards;
      }
      if (normalizedIndex < -halfVisible) {
        normalizedIndex += visibleCards;
      }

      return Math.abs(normalizedIndex) === halfVisible;
    },
    [responsiveValues, currentIndex],
  );

  const visibleProjects = useMemo(() => {
    const { visibleCards } = responsiveValues;
    const halfVisible = Math.floor(visibleCards / 2);

    const projects = [];
    for (let i = -halfVisible - 1; i <= halfVisible + 1; i++) {
      const idx =
        (((currentIndex + i) % projectsData.length) + projectsData.length) %
        projectsData.length;
      projects.push({
        project: projectsData[idx],
        actualIndex: currentIndex + i,
      });
    }
    return projects;
  }, [currentIndex, responsiveValues]);

  return (
    <div className="tarot-fan-section">
      <div className="fan-container">
        <div
          ref={fanRef}
          className="fan-fan"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {visibleProjects.map(({ project, actualIndex }) => (
            <CardWrapper
              key={`${project.id}-${actualIndex}`}
              project={project}
              index={actualIndex}
              getCardStyle={getCardStyle}
              shouldFlipCard={shouldFlipCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

TarotFan.displayName = "TarotFan";

export default TarotFan;
