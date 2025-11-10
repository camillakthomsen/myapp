import "./../style/Home.css";
import Footer from "../components/Footer";
import FrontpagePicture from "../photoSelfcare/frontpagepicture.png";

export default function Home() {
  return (
    <main className="homepage">
      <section className="hero-only">
        <img
          src={FrontpagePicture}
          alt="DavidBreadHead"
          className="hero-image"
        />
      </section>

      <Footer />
    </main>
  );
}
