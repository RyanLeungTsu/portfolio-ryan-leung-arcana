import TarotCards from "../components/tarotCards";
import ThemeToggle from "../components/themeToggle";
import VinylWidget from "../components/vinyl/vinyl";
import CelestialBackground from "../components/background";

function Home () {
    return (
        <section id="projects">
            {/* <h1 className="header">ya Leung</h1> */}
            <CelestialBackground />
            <ThemeToggle />
            <TarotCards />
            <VinylWidget />
        </section>
    )
}

export default Home;