import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

export default function About() {
  return (
    <section
      className="about section-wrap section"
      id="about"
    >
      <Reveal className="section-label">
        <span>01 / THE HUMAN BEHIND THE CODE</span>
        <span className="label-line" />
      </Reveal>

      <div className="about-layout">
        <Reveal className="about-heading">
          <p className="micro-label">A LITTLE CONTEXT</p>

          <h2>
            Curious by nature.
            <br />

            <span className="muted-text">
              Builder by choice.
            </span>
          </h2>
        </Reveal>

        <Reveal
          className="about-text"
          delay={0.12}
        >
          <p className="large-copy">
            Hey, I&apos;m Shubh — a curious mind
            fascinated by the intersection of
            technology, intelligence and human
            imagination.
          </p>

          <p>
            I don&apos;t believe you need to know
            everything before you start building.
            I&apos;m here to learn by doing: writing
            code, testing ideas, getting things wrong,
            figuring them out and sharing the process
            as honestly as I can.
          </p>

          <p>
            This is my digital workshop. The work is
            ongoing, the questions keep changing, and
            there&apos;s always something new to try.
          </p>

          <a
            className="text-link"
            href="#connect"
          >
            FOLLOW THE JOURNEY
            <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}