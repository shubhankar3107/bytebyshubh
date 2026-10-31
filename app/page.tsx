import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import JarvisContainer from "@/components/jarvis/JarvisContainer";
import Experiments from "@/components/sections/Experiments";
import TerminalSection from "@/components/sections/TerminalSection";
import Philosophy from "@/components/sections/Philosophy";
import Connect from "@/components/sections/Connect";

export default function HomePage() {
  return (
    <main id="home">
      <div className="noise" aria-hidden="true" />

      <Header />

      {/* 01 — HERO */}
      <Hero />

      {/* 02 — ABOUT */}
      <About />

      {/* FLAGSHIP PROJECT — JARVIS */}
      <JarvisContainer />

      {/* 03 — EXPERIMENTS */}
      <Experiments />

      {/* 04 — TERMINAL */}
      <TerminalSection />

      {/* 05 — PHILOSOPHY */}
      <Philosophy />

      {/* 06 — CONNECT */}
      <Connect />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}