import HeroCard from "../components/heroCard";
import TarotFan from "../components/tarotFan";
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

  return (
    <>
      {/* hero section */}
      <section ref={heroRef} className="hero-section" id="home">
        <div className="hero-section-title">
          <h1 className="hero-name">ya Leung</h1>
          <sub className="hero-sub">
            Hello, my name is Ryan and I am a software developer
          </sub>
          <button className="hero-btn">Contact Me</button>
        </div>
        {/* hero card */}
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
          <TarotFan />
        ) : (
          <TarotFan paused={true} />
        )}
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
