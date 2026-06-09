import TarotCards from "../components/tarotCards";
import HeroCard from "../components/heroCard";
import TarotFan from "../components/tarotFan";
import ThemeToggle from "../components/themeToggle";
import VinylWidget from "../components/vinyl/vinyl";
import CelestialBackground from "../components/background";
import Sidebar from "../components/sideScrollIndicator";
import "../styles/home.css";

function Home() {
  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-section-title">
          <h1 className="hero-name">ya Leung</h1>
          <sub className="hero-sub">Hello, my name is Ryan and I am a software developer</sub>
          <button className="hero-btn">Contact Me</button>
        </div>
        <div className="hero-card">
          <HeroCard />
        </div>
      </section>

      <section className="projects" id="projects">
        {/* <TarotCards /> */}
        <TarotFan />
      </section>

      <section className="contact" id="contact">
        {/*  */}
      </section>

      <CelestialBackground />
      <ThemeToggle />
      <Sidebar />

      <VinylWidget />
    </>
  );
}

export default Home;
