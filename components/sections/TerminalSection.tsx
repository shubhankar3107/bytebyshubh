import Reveal from "@/components/animations/Reveal";
import TerminalPanel from "@/components/ui/TerminalPanel";

export default function TerminalSection() {
  return (
    <section className="terminal-section section-wrap section">

      {/* LEFT CONTENT */}

      <Reveal className="terminal-copy">
        <p className="micro-label">
          A PEEK INSIDE THE WORKSHOP
        </p>

        <h2>
          Every big idea
          <br />
          starts with a{" "}
          <span className="gradient-text">
            prompt.
          </span>
        </h2>

        <p>
          Some days it works. Some days the terminal
          has other plans. Either way, the process is
          the point.
        </p>
      </Reveal>

      {/* RIGHT TERMINAL */}

      <Reveal
        className="terminal-wrap"
        delay={0.14}
      >
        <TerminalPanel />
      </Reveal>

    </section>
  );
}