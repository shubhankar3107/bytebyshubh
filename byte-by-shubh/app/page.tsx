"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, AudioWaveform, Bot, Braces,
  ChevronRight, CircleDot, Code2, Cpu, Github, Instagram, Menu, Play,
  Radio, Sparkles, Terminal, X, Youtube,
} from "lucide-react";

const navItems = [
  ["About", "#about"],
  ["Experiments", "#experiments"],
  ["Projects", "#projects"],
  ["Connect", "#connect"],
];

const experiments = [
  { n: "01", icon: Bot, title: "AI & intelligent agents", text: "Exploring systems that can reason, use tools, remember context and take action." },
  { n: "02", icon: Braces, title: "Software engineering", text: "Turning ideas into real products with APIs, databases and reliable infrastructure." },
  { n: "03", icon: Cpu, title: "Emerging technology", text: "Testing new tools, models and workflows to understand what is possible." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function TerminalPanel() {
  const lines = [
    { prompt: "$", text: " booting curiosity.exe", kind: "command" },
    { prompt: ">", text: " Loading ideas...", kind: "muted" },
    { prompt: ">", text: " Connecting to the future", kind: "muted" },
    { prompt: ">", text: " Project JARVIS: in development", kind: "success" },
    { prompt: ">", text: " Ready to build something.", kind: "success" },
  ];

  return (
    <div className="terminal" aria-label="Decorative terminal animation">
      <div className="terminal-top">
        <div className="traffic"><i /><i /><i /></div>
        <span>shubh@byte: ~/experiments</span>
        <Terminal size={14} />
      </div>

      <div className="terminal-body">
        {lines.map((line, i) => (
          <motion.div
            key={line.text}
            className={`terminal-line ${line.kind}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + i * 0.42, duration: 0.35 }}
          >
            <span className="terminal-prompt">{line.prompt}</span>
            {line.text}
          </motion.div>
        ))}

        <div className="terminal-line typing">
          <span className="terminal-prompt">$</span>
          <span className="cursor" />
        </div>
      </div>

      <div className="terminal-bottom">
        <span><CircleDot size={10} /> SYSTEM ONLINE</span>
        <span>LOCAL ENVIRONMENT</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );

    update();

    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main>
      <div className="noise" aria-hidden="true" />

      <header className="site-header">
        <a href="#home" className="brand" aria-label="Byte by Shubh home">
          <span className="brand-mark">b<span>.</span></span>
          <span>BYTE <em>BY SHUBH</em></span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>

        <a className="header-cta" href="#connect">
          LET&apos;S CONNECT <ArrowUpRight size={14} />
        </a>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <motion.nav
          className="mobile-nav"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}<ArrowUpRight size={16} />
            </a>
          ))}
        </motion.nav>
      )}

      <section className="hero section-wrap" id="home">
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="pulse-dot" />
            INDEPENDENT BUILDER / TECH EXPLORER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            Building the<br />
            <span className="gradient-text">not-yet-built.</span>
          </motion.h1>

          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            I&apos;m Shubh. I explore the edges of AI and technology by turning
            curious questions into real experiments, useful software and
            ambitious projects.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a className="button button-primary" href="#projects">
              EXPLORE MY BUILDS <ArrowRight size={16} />
            </a>

            <a className="button button-ghost" href="#about">
              <span className="play-icon">
                <Play size={11} fill="currentColor" />
              </span>
              GET TO KNOW ME
            </a>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span>BASED IN INDIA</span>
            <span className="meta-divider" />
            <span>IST {time}</span>
            <span className="meta-divider" />
            <span>OPEN TO IDEAS</span>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="visual-core">
            <div className="core-glow" />
            <div className="core-symbol"><span>B</span><i /></div>
            <div className="core-caption">CURIOSITY<br />IN MOTION</div>
          </div>

          <div className="float-chip chip-ai">
            <Sparkles size={14} /><span>AI / ML</span>
          </div>

          <div className="float-chip chip-code">
            <Code2 size={14} /><span>BUILD</span>
          </div>

          <div className="float-chip chip-signal">
            <AudioWaveform size={14} /><span>EXPERIMENT</span>
          </div>

          <div className="visual-index">FIG. 001 — THE BUILDER&apos;S MIND</div>
        </motion.div>

        <a href="#about" className="scroll-cue">
          <span>SCROLL TO EXPLORE</span><ArrowDown size={14} />
        </a>

        <div className="hero-side-note">IDEAS → CODE → REALITY</div>
      </section>

      <div className="ticker" aria-label="Build experiment learn repeat">
        <div className="ticker-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              BUILD <b>✳</b> EXPERIMENT <b>✳</b> LEARN <b>✳</b> REPEAT
              <b>✳</b> STAY CURIOUS <b>✳</b>
            </span>
          ))}
        </div>
      </div>

      <section className="about section-wrap section" id="about">
        <Reveal className="section-label">
          <span>01 / THE HUMAN BEHIND THE CODE</span>
          <span className="label-line" />
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-heading">
            <p className="micro-label">A LITTLE CONTEXT</p>
            <h2>
              Curious by nature.<br />
              <span className="muted-text">Builder by choice.</span>
            </h2>
          </Reveal>

          <Reveal className="about-text" delay={0.12}>
            <p className="large-copy">
              Hey, I&apos;m Shubh — a curious mind fascinated by the
              intersection of technology, intelligence and human imagination.
            </p>

            <p>
              I don&apos;t believe you need to know everything before you start
              building. I&apos;m here to learn by doing: writing code, testing
              ideas, getting things wrong, figuring them out and sharing the
              process as honestly as I can.
            </p>

            <p>
              This is my digital workshop. The work is ongoing, the questions
              keep changing, and there&apos;s always something new to try.
            </p>

            <a className="text-link" href="#connect">
              FOLLOW THE JOURNEY <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="mission section-wrap section" id="projects">
        <Reveal className="section-label">
          <span>02 / CURRENT MAIN QUEST</span>
          <span className="label-line" />
        </Reveal>

        <Reveal className="mission-heading">
          <div>
            <p className="micro-label">FLAGSHIP EXPERIMENT / 001</p>
            <h2>Project <span className="gradient-text">JARVIS.</span></h2>
          </div>

          <div className="status-pill">
            <span className="pulse-dot" /> IN DEVELOPMENT
          </div>
        </Reveal>

        <div className="jarvis-card">
          <div className="jarvis-art">
            <div className="radar radar-a" />
            <div className="radar radar-b" />
            <div className="radar radar-c" />

            <div className="jarvis-orb">
              <div className="orb-ring" />
              <div className="orb-ring ring-two" />
              <div className="orb-center">
                <AudioWaveform size={42} strokeWidth={1.2} />
              </div>
            </div>

            <div className="hud hud-top">PERSONAL AI / SYSTEM 001</div>
            <div className="hud hud-left">
              VOICE INPUT<br /><span>STANDBY</span>
            </div>
            <div className="hud hud-right">
              MEMORY<br /><span>LEARNING</span>
            </div>
            <div className="hud hud-bottom">
              LISTENING FOR THE NEXT INSTRUCTION
              <span className="hud-bars">
                <i /><i /><i /><i /><i /><i /><i /><i />
              </span>
            </div>
          </div>

          <div className="jarvis-content">
            <p className="micro-label">THE BIG QUESTION</p>
            <h3>Can I build my own personal AI assistant?</h3>
            <p>
              An assistant that can listen, understand, remember, reason and
              interact with my digital world. Inspired by science fiction.
              Built one experiment at a time.
            </p>

            <div className="feature-list">
              <span><i /> Natural voice conversations</span>
              <span><i /> Context & long-term memory</span>
              <span><i /> Tool use and computer automation</span>
              <span><i /> Intelligent, task-focused agents</span>
            </div>

            <a className="button button-primary" href="#connect">
              FOLLOW THE BUILD <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <Reveal className="project-footnote">
          <span>001 / A WORK IN PROGRESS</span>
          <span>THE GOAL IS TO BUILD, NOT JUST TO TALK ABOUT IT.</span>
        </Reveal>
      </section>

      <section className="experiments section-wrap section" id="experiments">
        <Reveal className="section-label">
          <span>03 / AREAS OF EXPLORATION</span>
          <span className="label-line" />
        </Reveal>

        <Reveal className="experiments-intro">
          <p className="micro-label">WHAT I&apos;M INTO</p>
          <h2>
            Different rabbit holes.<br />
            <span className="muted-text">One curious mind.</span>
          </h2>
          <p className="intro-aside">
            A few of the fields I&apos;m exploring, learning and building in.
            Always evolving.
          </p>
        </Reveal>

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
                  <Icon size={21} strokeWidth={1.5} />
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

      <section className="terminal-section section-wrap section">
        <Reveal className="terminal-copy">
          <p className="micro-label">A PEEK INSIDE THE WORKSHOP</p>
          <h2>
            Every big idea<br />
            starts with a <span className="gradient-text">prompt.</span>
          </h2>
          <p>
            Some days it works. Some days the terminal has other plans.
            Either way, the process is the point.
          </p>
        </Reveal>

        <Reveal className="terminal-wrap" delay={0.14}>
          <TerminalPanel />
        </Reveal>
      </section>

      <section className="philosophy section-wrap section">
        <Reveal className="quote-mark">“</Reveal>

        <Reveal className="philosophy-content">
          <p className="micro-label">04 / THE WAY I SEE IT</p>
          <h2>
            The future doesn&apos;t<br />
            build <span className="gradient-text">itself.</span>
          </h2>
          <p>
            The best way to understand technology is to build with it.
            Stay curious, keep experimenting, and don&apos;t be afraid to
            start before you feel ready.
          </p>
          <div className="philosophy-sign">
            THINK. BUILD. EXPERIMENT. REPEAT.
          </div>
        </Reveal>
      </section>

      <section className="connect section-wrap section" id="connect">
        <Reveal className="connect-inner">
          <div className="connect-orb">
            <Radio size={27} strokeWidth={1.3} />
          </div>

          <p className="micro-label">05 / TRANSMISSION OPEN</p>

          <h2>
            Curious where<br />
            this <span className="gradient-text">goes?</span>
          </h2>

          <p className="connect-copy">
            Follow along for the experiments, the breakthroughs, the bugs
            and everything in between. Let&apos;s see what we can build.
          </p>

          <div className="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <Instagram size={17} /> INSTAGRAM <ArrowUpRight size={14} />
            </a>

            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <Youtube size={17} /> YOUTUBE <ArrowUpRight size={14} />
            </a>

            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <Github size={17} /> GITHUB <ArrowUpRight size={14} />
            </a>
          </div>

          <p className="social-note">
            Replace these links with your actual profiles before publishing.
          </p>
        </Reveal>
      </section>

      <footer className="site-footer section-wrap">
        <a href="#home" className="brand footer-brand">
          <span className="brand-mark">b<span>.</span></span>
          <span>BYTE <em>BY SHUBH</em></span>
        </a>

        <span className="footer-tagline">
          BUILDING THE FUTURE, ONE BYTE AT A TIME.
        </span>

        <span className="footer-copy">© 2026 BYTE BY SHUBH</span>

        <a className="back-top" href="#home" aria-label="Back to top">
          <ChevronRight size={17} />
        </a>
      </footer>
    </main>
  );
}