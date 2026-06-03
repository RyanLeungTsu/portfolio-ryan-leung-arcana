import TarotCards from "../components/tarotCards";
import ThemeToggle from "../components/themeToggle";
import VinylWidget from "../components/vinyl/vinyl";
import CelestialBackground from "../components/background";
import Sidebar from "../components/sideScrollIndicator";
import "../styles/home.css"

function Home () {
    return (
        <>
            <section className="hero-section" id="home">
                <h1 className="hero-name">ya Leung</h1>
                <sub>Web & Software Developer</sub>
                <button>Contact Me</button>
            </section>

            <section className="projects" id="projects">
                <TarotCards />
            </section>

            <section className="contact" id="contact">
                {/*  */}
            </section>

            <CelestialBackground />
            <ThemeToggle />
            <Sidebar />

            <VinylWidget />
        </>
    )
}

export default Home;