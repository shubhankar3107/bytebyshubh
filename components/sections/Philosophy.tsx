import Reveal from "@/components/animations/Reveal";

export default function Philosophy() {
  return (
    <section className="philosophy section-wrap section">

      {/* DECORATIVE QUOTE MARK */}

      <Reveal className="quote-mark">
        “
      </Reveal>

      {/* MAIN CONTENT */}

      <Reveal className="philosophy-content">
        <p className="micro-label">
          04 / THE WAY I SEE IT
        </p>

        <h2>
          The future doesn&apos;t
          <br />
          build{" "}
          <span className="gradient-text">
            itself.
          </span>
        </h2>

        <p>
          The best way to understand technology is
          to build with it. Stay curious, keep
          experimenting, and don&apos;t be afraid to
          start before you feel ready.
        </p>

        <div className="philosophy-sign">
          THINK. BUILD. EXPERIMENT. REPEAT.
        </div>
      </Reveal>

    </section>
  );
}