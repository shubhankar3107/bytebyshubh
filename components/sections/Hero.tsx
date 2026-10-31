"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  ArrowDown,
  ArrowRight,
  AudioWaveform,
  Code2,
  Play,
  Sparkles
} from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

function HeroVisual() {
  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, scale: 0.94, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.5,
        duration: 0.9
      }}
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />

      <div className="visual-core">
        <div className="core-glow" />

        <div className="core-symbol">
          <span>B</span>
          <i />
        </div>

        <div className="core-caption">
          CURIOSITY
          <br />
          IN MOTION
        </div>
      </div>

      <div className="float-chip chip-ai">
        <Sparkles size={14} />
        <span>AI / ML</span>
      </div>

      <div className="float-chip chip-code">
        <Code2 size={14} />
        <span>BUILD</span>
      </div>

      <div className="float-chip chip-signal">
        <AudioWaveform size={14} />
        <span>EXPERIMENT</span>
      </div>

      <div className="visual-index">
        FIG. 001 — THE BUILDER&apos;S MIND
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [time, setTime] = useState("--:--:--");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(new Date())
      );
    };

    updateTime();

    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants: fadeUp
      };

  return (
    <>
      <section className="hero section-wrap" id="home">
        <div className="hero-grid" aria-hidden="true" />

        {/* HERO COPY */}

        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="pulse-dot" />
            INDEPENDENT BUILDER / TECH EXPLORER
          </motion.div>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.8
            }}
          >
            Building the
            <br />

            <span className="gradient-text">
              not-yet-built.
            </span>
          </motion.h1>

          <motion.p
            className="hero-intro"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            I&apos;m Shubh. I explore the edges of AI and
            technology by turning curious questions into
            real experiments, useful software and
            ambitious projects.
          </motion.p>

          {/* ACTIONS */}

          <motion.div
            className="hero-actions"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a
              className="button button-primary"
              href="#projects"
            >
              EXPLORE MY BUILDS
              <ArrowRight size={16} />
            </a>

            <a
              className="button button-ghost"
              href="#about"
            >
              <span className="play-icon">
                <Play size={11} fill="currentColor" />
              </span>

              GET TO KNOW ME
            </a>
          </motion.div>

          {/* METADATA */}

          <motion.div
            className="hero-meta"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
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

        {/* HERO VISUAL */}

        <HeroVisual />

        {/* SCROLL CUE */}

        <a href="#about" className="scroll-cue">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </a>

        <div className="hero-side-note">
          IDEAS → CODE → REALITY
        </div>
      </section>

      {/* TICKER */}

      <div
        className="ticker"
        aria-label="Build experiment learn repeat"
      >
        <div className="ticker-track">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} aria-hidden={index > 0}>
              BUILD <b>✳</b> EXPERIMENT <b>✳</b> LEARN
              <b>✳</b> REPEAT <b>✳</b> STAY CURIOUS
              <b>✳</b>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}