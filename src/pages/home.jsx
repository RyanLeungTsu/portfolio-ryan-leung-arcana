import TarotCards from "../components/tarotCards";
import ThemeToggle from "../components/themeToggle";
import "../styles/assets.css";

function Home () {
    return (
        <section id="projects">
            <ThemeToggle />
            <TarotCards />
        </section>
    )
}

export default Home;