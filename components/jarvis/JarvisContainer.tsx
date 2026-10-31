import { ArrowUpRight } from "lucide-react";

import JarvisVisual from "./JarvisVisual";
import JarvisHUD from "./JarvisHUD";
import JarvisStatus from "./JarvisStatus";

export default function JarvisContainer() {
  return (
    <section
      className="mission section-wrap"
      id="jarvis"
    >
      <div className="section-label">
        <span>02 / THE BIG EXPERIMENT</span>
        <span className="label-line" />
      </div>

      <div className="mission-heading">
        <h2>
          Meet the
          <br />
          <span className="gradient-text">ambition.</span>
        </h2>

        <div className="status-pill">
          <span className="pulse-dot" />
          IN DEVELOPMENT
        </div>
      </div>

      <div className="jarvis-card">
        {/* HOLOGRAPHIC VISUAL */}

        <div className="jarvis-art jarvis-art-advanced">
          <JarvisVisual />

          <JarvisHUD />

          <div className="jarvis-scanline" />

          <div className="jarvis-energy-label">
            ENERGY FIELD / 001
          </div>
        </div>

        {/* PROJECT INFORMATION */}

        <div className="jarvis-content">
          <p className="micro-label">
            PERSONAL AI PROJECT / 001
          </p>

          <h3>
            Not just an assistant.
            A system that understands.
          </h3>

          <p>
            JARVIS is an exploration into building a
            personal intelligent system — one that can
            understand context, reason across information
            and interact with the digital world.
          </p>

          <div className="feature-list">
            <span>
              <i />
              Context-aware intelligence
            </span>

            <span>
              <i />
              Memory and knowledge systems
            </span>

            <span>
              <i />
              Tool use and automation
            </span>

            <span>
              <i />
              Voice-based interaction
            </span>
          </div>

          <JarvisStatus />

          <a
            href="#connect"
            className="text-link"
          >
            FOLLOW THE EXPERIMENT
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className="project-footnote">
        <span>PROJECT JARVIS / PERSONAL RESEARCH</span>
        <span>STATUS: IN DEVELOPMENT</span>
      </div>
    </section>
  );
}