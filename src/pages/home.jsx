import React, { useRef, useState } from "react";
import HeroCard from "../components/heroCard";
import TarotFan from "../components/tarotFan";
import ZodiacWheel from "../components/zodiacWheel";
import Contact from "../components/contact";
import ThemeToggle from "../components/themeToggle";
import VinylWidget from "../components/vinyl/vinyl";
import CelestialBackground from "../components/background";
import Sidebar from "../components/sideScrollIndicator";
import "../styles/home.css";
import { useInView } from "../hooks/useInView";
import { useAnim } from "../hooks/useAnim";

function Home() {
  // viewport detection for each section
  const heroSection = useInView({ threshold: 0.3 });
  const projectSection = useInView({ threshold: 0.2 });
  const contactSection = useInView({ threshold: 0.3 });

  const { ref: heroRef, isInView: heroInView } = heroSection;
  const { ref: projectRef, isInView: projectInView } = projectSection;
  const { ref: contactRef, isInView: contactInView } = contactSection;

  // global anim state
  const { shouldAnimate } = useAnim();
  const tarotFanRef = useRef(null);
  const [showAbout, setShowAbout] = useState(false);

  const handleWheelArrowClick = (direction) => {
    tarotFanRef.current?.scroll(direction);
  };

  return (
    <>
      {/* hero section */}
      <section ref={heroRef} className="hero-section" id="home">
        <div className="hero-section-title">
          <h1 className="hero-name">Ryan Leung</h1>

          <div className="hero-about">
            <div className="hero-content">
              {showAbout ? (
                <p className="hero-about">
                  I am a full-stack developer who loves turning complex problems
                  into clean, efficient code. I'm driven by a passion for
                  continuous learning and building software that delivers great
                  user experiences.
                </p>
              ) : (
                <p className="hero-intro">
                  Hey, my names Ryan, a BCIT Software Systems Developer graduate.
                  Welcome to my portfolio! Explore my latest work below, and
                  let's connect if you have a project you'd like to bring to
                  life.
                </p>
              )}
            </div>

            <div className="hero-buttons">
              <button
                className="hero-btn hero-btn--about"
                onClick={() => setShowAbout((prev) => !prev)}
              >
                {showAbout ? "Intro" : "About Me"}
              </button>

              <a href="#contact">
                <button className="hero-btn">Contact Me</button>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-card">
          {heroInView && shouldAnimate ? (
            <HeroCard />
          ) : (
            <HeroCard paused={true} />
          )}
        </div>
      </section>

      {/* projects */}
      <section ref={projectRef} className="projects" id="projects">
        {projectInView && shouldAnimate ? (
          <TarotFan ref={tarotFanRef} />
        ) : (
          <TarotFan ref={tarotFanRef} paused={true} />
        )}
        <ZodiacWheel onArrowClick={handleWheelArrowClick} />
      </section>

      {/* contact */}
      <section ref={contactRef} className="contact" id="contact">
        {contactInView && shouldAnimate ? (
          <Contact />
        ) : (
          <Contact paused={true} />
        )}
      </section>

      <CelestialBackground
        paused={
          !(heroSection.isInView || projectSection.isInView) || !shouldAnimate
        }
      />
      <ThemeToggle />
      <Sidebar />
      <VinylWidget />
    </>
  );
}

export default Home;
