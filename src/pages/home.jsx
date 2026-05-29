import TarotCards from "../components/tarotCards";
import ThemeToggle from "../components/themeToggle";
import VinylWidget from "../components/vinyl/vinyl";
import "../styles/assets.css";

function Home () {
    return (
        <section id="projects">
            <ThemeToggle />
            <TarotCards />
            <VinylWidget
  trackName="Track Name"
  artistName="Artist"
  isPlaying={false}
/>
        </section>
    )
}

export default Home;