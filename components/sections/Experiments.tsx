import {
  ArrowUpRight,
  Bot,
  Braces,
  Cpu,
} from "lucide-react";

import Reveal from "@/components/animations/Reveal";

const experiments = [
  {
    n: "01",
    icon: Bot,
    title: "AI & intelligent agents",
    text: "Exploring systems that can reason, use tools, remember context and take action.",
  },
  {
    n: "02",
    icon: Braces,
    title: "Software engineering",
    text: "Turning ideas into real products with APIs, databases and reliable infrastructure.",
  },
  {
    n: "03",
    icon: Cpu,
    title: "Emerging technology",
    text: "Testing new tools, models and workflows to understand what is possible.",
  },
];

export default function Experiments() {
  return (
    <section
      className="experiments section-wrap section"
      id="experiments"
    >
      {/* SECTION LABEL */}

      <Reveal className="section-label">
        <span>03 / AREAS OF EXPLORATION</span>
        <span className="label-line" />
      </Reveal>

      {/* SECTION INTRODUCTION */}

      <Reveal className="experiments-intro">
        <p className="micro-label">
          WHAT I&apos;M INTO
        </p>

        <h2>
          Different rabbit holes.
          <br />

          <span className="muted-text">
            One curious mind.
          </span>
        </h2>

        <p className="intro-aside">
          A few of the fields I&apos;m exploring,
          learning and building in. Always evolving.
        </p>
      </Reveal>

      {/* EXPERIMENT CARDS */}

      <div className="experiment-grid">
        {experiments.map((item, i) => {
          const Icon = item.icon;

          return (
            <Reveal
              key={item.n}
              delay={i * 0.08}
              className="experiment-card"
            >
              <div className="card-top">
                <span>{item.n} / 03</span>

                <Icon
                  size={21}
                  strokeWidth={1.5}
                />
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <div className="card-arrow">
                <ArrowUpRight size={17} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}