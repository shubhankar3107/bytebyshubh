import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import JarvisContainer from "@/components/jarvis/JarvisContainer";
import Experiments from "@/components/sections/Experiments";

export default function HomePage() {
  return (
    <main id="home">
      <div className="noise" aria-hidden="true" />

      <Header />

      <Hero />

      {/* ABOUT */}
      <About />

      {/* JARVIS */}
      <JarvisContainer />

      {/* EXPERIMENTS */}
      <Experiments />

      {/* PROJECTS */}
      <section
        id="projects"
        className="section section-wrap"
      >
        <p className="micro-label">04 / PROJECTS</p>

        <h2>
          Ideas turned into working systems.
        </h2>
      </section>

      {/* CONNECT */}
      <section
        id="connect"
        className="section section-wrap"
      >
        <p className="micro-label">05 / TRANSMISSION OPEN</p>

        <h2>
          Curious where this goes?
        </h2>
      </section>

      {/* FOOTER */}
      <footer className="site-footer section-wrap">
        <a
          href="#home"
          className="brand footer-brand"
        >
          <span className="brand-mark">
            b<span>.</span>
          </span>

          <span>
            BYTE <em>BY SHUBH</em>
          </span>
        </a>

        <span className="footer-tagline">
          BUILDING THE FUTURE, ONE BYTE AT A TIME.
        </span>

        <span className="footer-copy">
          © 2026 BYTE BY SHUBH
        </span>

        <a
          className="back-top"
          href="#home"
          aria-label="Back to top"
        >
          ↑
        </a>
      </footer>
    </main>
  );
}