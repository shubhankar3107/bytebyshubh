"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioWaveform,
  Bot,
  Braces,
  ChevronRight,
  CircleDot,
  Code2,
  Cpu,
  Github,
  Instagram,
  Menu,
  Play,
  Radio,
  Sparkles,
  Terminal,
  X,
  Youtube,
} from "lucide-react";

import type * as THREE from "three";

/* =========================================
   NAVIGATION
========================================= */

const navItems = [
  ["About", "#about"],
  ["Experiments", "#experiments"],
  ["Projects", "#projects"],
  ["Connect", "#connect"],
];

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

/* =========================================
   ANIMATION VARIANTS
========================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* =========================================
   REVEAL COMPONENT
========================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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

/* =========================================
   JARVIS 3D HOLOGRAPHIC VISUALISATION
========================================= */

function JarvisVisual() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer | undefined;
    let animationId = 0;
    let observer: ResizeObserver | undefined;
    let disposed = false;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    async function initialise() {
      try {
        const THREE = await import("three");

        if (!mountRef.current || disposed) return;

        const container = mountRef.current;

        /* SCENE */

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
          45,
          container.clientWidth / container.clientHeight,
          0.1,
          100
        );

        camera.position.set(0, 0, 9);

        /* RENDERER */

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });

        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, 1.5)
        );

        renderer.setSize(
          container.clientWidth,
          container.clientHeight
        );

        renderer.setClearColor(0x000000, 0);

        container.appendChild(renderer.domElement);

        /* MAIN HOLOGRAM GROUP */

        const hologram = new THREE.Group();

        scene.add(hologram);

        /* PARTICLE DISTRIBUTION */

        const PARTICLE_COUNT = 6500;
        const RADIUS = 2.05;

        const positions = new Float32Array(
          PARTICLE_COUNT * 3
        );

        const originalPositions = new Float32Array(
          PARTICLE_COUNT * 3
        );

        const colours = new Float32Array(
          PARTICLE_COUNT * 3
        );

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);

          const irregularity =
            0.78 +
            Math.random() * 0.35 +
            Math.sin(theta * 5) * 0.09 +
            Math.cos(phi * 4) * 0.07;

          const radius =
            RADIUS *
            irregularity *
            Math.cbrt(Math.random());

          const x =
            radius *
            Math.sin(phi) *
            Math.cos(theta);

          const y =
            radius *
            Math.sin(phi) *
            Math.sin(theta);

          const z =
            radius * Math.cos(phi);

          const index = i * 3;

          positions[index] = x;
          positions[index + 1] = y;
          positions[index + 2] = z;

          originalPositions[index] = x;
          originalPositions[index + 1] = y;
          originalPositions[index + 2] = z;

          const brightness = Math.random();

          colours[index] = 0.12 + brightness * 0.25;
          colours[index + 1] = 0.62 + brightness * 0.34;
          colours[index + 2] = 0.82 + brightness * 0.18;
        }

        /* PARTICLE GEOMETRY */

        const particleGeometry =
          new THREE.BufferGeometry();

        particleGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );

        particleGeometry.setAttribute(
          "color",
          new THREE.BufferAttribute(colours, 3)
        );

        geometries.push(particleGeometry);

        const particleMaterial =
          new THREE.PointsMaterial({
            size: 0.032,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true,
          });

        materials.push(particleMaterial);

        const particles = new THREE.Points(
          particleGeometry,
          particleMaterial
        );

        hologram.add(particles);

        /* FILAMENT NETWORK */

        const cellSize = 0.34;

        const spatialHash = new Map<
          string,
          number[]
        >();

        function getCellKey(
          x: number,
          y: number,
          z: number
        ) {
          return [
            Math.floor(x / cellSize),
            Math.floor(y / cellSize),
            Math.floor(z / cellSize),
          ].join(",");
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const index = i * 3;

          const x = originalPositions[index];
          const y = originalPositions[index + 1];
          const z = originalPositions[index + 2];

          const key = getCellKey(x, y, z);

          const existing = spatialHash.get(key) || [];

          existing.push(i);

          spatialHash.set(key, existing);
        }

        const connections: number[] = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const index = i * 3;

          const x = originalPositions[index];
          const y = originalPositions[index + 1];
          const z = originalPositions[index + 2];

          const cx = Math.floor(x / cellSize);
          const cy = Math.floor(y / cellSize);
          const cz = Math.floor(z / cellSize);

          let connectionCount = 0;

          for (let ox = -1; ox <= 1; ox++) {
            for (let oy = -1; oy <= 1; oy++) {
              for (let oz = -1; oz <= 1; oz++) {
                const key = [
                  cx + ox,
                  cy + oy,
                  cz + oz,
                ].join(",");

                const neighbours =
                  spatialHash.get(key);

                if (!neighbours) continue;

                for (const j of neighbours) {
                  if (j <= i) continue;

                  const jIndex = j * 3;

                  const dx =
                    x - originalPositions[jIndex];

                  const dy =
                    y - originalPositions[jIndex + 1];

                  const dz =
                    z - originalPositions[jIndex + 2];

                  const distanceSquared =
                    dx * dx + dy * dy + dz * dz;

                  if (
                    distanceSquared < 0.075 &&
                    Math.random() > 0.55
                  ) {
                    connections.push(
                      x,
                      y,
                      z,
                      originalPositions[jIndex],
                      originalPositions[jIndex + 1],
                      originalPositions[jIndex + 2]
                    );

                    connectionCount++;
                  }

                  if (connectionCount >= 3) break;
                }

                if (connectionCount >= 3) break;
              }

              if (connectionCount >= 3) break;
            }

            if (connectionCount >= 3) break;
          }
        }

        const filamentGeometry =
          new THREE.BufferGeometry();

        filamentGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(
            connections,
            3
          )
        );

        geometries.push(filamentGeometry);

        const filamentMaterial =
          new THREE.LineBasicMaterial({
            color: 0x37cfff,
            transparent: true,
            opacity: 0.17,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });

        materials.push(filamentMaterial);

        const filaments = new THREE.LineSegments(
          filamentGeometry,
          filamentMaterial
        );

        hologram.add(filaments);

        /* SECONDARY ENERGY FILAMENTS */

        const energyCurves: THREE.Line[] = [];

        for (let i = 0; i < 28; i++) {
          const points: THREE.Vector3[] = [];

          const angle = Math.random() * Math.PI * 2;

          const radius =
            0.7 + Math.random() * 1.1;

          for (let j = 0; j <= 24; j++) {
            const t = j / 24;

            const a =
              angle +
              t * (1.5 + Math.random() * 0.2);

            const r =
              radius +
              Math.sin(t * Math.PI * 4) * 0.12;

            points.push(
              new THREE.Vector3(
                Math.cos(a) * r,
                Math.sin(a) * r,
                Math.sin(t * Math.PI * 3 + angle) * 0.45
              )
            );
          }

          const curve = new THREE.CatmullRomCurve3(
            points
          );

          const curveGeometry =
            new THREE.BufferGeometry().setFromPoints(
              curve.getPoints(80)
            );

          geometries.push(curveGeometry);

          const curveMaterial =
            new THREE.LineBasicMaterial({
              color: 0x64eaff,
              transparent: true,
              opacity: 0.2,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            });

          materials.push(curveMaterial);

          const line = new THREE.Line(
            curveGeometry,
            curveMaterial
          );

          hologram.add(line);
          energyCurves.push(line);
        }

        /* CENTRAL ENERGY CORE */

        const coreGeometry =
          new THREE.SphereGeometry(
            0.12,
            24,
            24
          );

        geometries.push(coreGeometry);

        const coreMaterial =
          new THREE.MeshBasicMaterial({
            color: 0xb4faff,
            transparent: true,
            opacity: 0.95,
          });

        materials.push(coreMaterial);

        const core = new THREE.Mesh(
          coreGeometry,
          coreMaterial
        );

        hologram.add(core);

        const coreLight =
          new THREE.PointLight(
            0x27dfff,
            5,
            5
          );

        hologram.add(coreLight);

        /* AMBIENT PARTICLES */

        const AMBIENT_COUNT = 1200;

        const ambientPositions =
          new Float32Array(AMBIENT_COUNT * 3);

        for (let i = 0; i < AMBIENT_COUNT; i++) {
          const index = i * 3;

          ambientPositions[index] =
            (Math.random() - 0.5) * 8;

          ambientPositions[index + 1] =
            (Math.random() - 0.5) * 5;

          ambientPositions[index + 2] =
            (Math.random() - 0.5) * 5;
        }

        const ambientGeometry =
          new THREE.BufferGeometry();

        ambientGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(
            ambientPositions,
            3
          )
        );

        geometries.push(ambientGeometry);

        const ambientMaterial =
          new THREE.PointsMaterial({
            color: 0x46dfff,
            size: 0.019,
            transparent: true,
            opacity: 0.42,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });

        materials.push(ambientMaterial);

        const ambientParticles = new THREE.Points(
          ambientGeometry,
          ambientMaterial
        );

        scene.add(ambientParticles);

        /* ANIMATION */

        const clock = new THREE.Clock();

        const prefersReducedMotion =
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;

        function animate() {
          if (disposed || !renderer) return;

          animationId = requestAnimationFrame(
            animate
          );

          const time = prefersReducedMotion
            ? 0
            : clock.getElapsedTime();

          const attribute =
            particleGeometry.attributes.position;

          const array =
            attribute.array as Float32Array;

          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const index = i * 3;

            const x = originalPositions[index];
            const y = originalPositions[index + 1];
            const z = originalPositions[index + 2];

            const wave =
              Math.sin(
                time * 1.5 + x * 3 + y * 2
              ) * 0.065;

            const turbulence =
              Math.sin(
                time * 1.1 + z * 4
              ) * 0.05;

            array[index] = x + wave;

            array[index + 1] =
              y + turbulence;

            array[index + 2] =
              z + wave * 0.6;
          }

          attribute.needsUpdate = true;

          hologram.rotation.y =
            Math.sin(time * 0.16) * 0.3;

          hologram.rotation.x =
            Math.sin(time * 0.22) * 0.12;

          // ORGANIC EXPANSION AND CONTRACTION

          const breathing =
            Math.sin(time * 1.5) * 0.075;

          const secondaryPulse =
            Math.sin(time * 3.2) * 0.018;

          const pulse = 1 + breathing + secondaryPulse;

          hologram.scale.set(
            pulse,
            pulse * (1 + Math.sin(time * 1.2) * 0.025),
            pulse * (1 + Math.cos(time * 1.4) * 0.02)
          );

          core.scale.setScalar(
            1 + Math.sin(time * 3.5) * 0.35
          );

          coreLight.intensity =
            4.5 + Math.sin(time * 3) * 1.8;

          filamentMaterial.opacity =
            0.12 + Math.sin(time * 1.8) * 0.045;

          energyCurves.forEach((line, index) => {
            line.rotation.z =
              Math.sin(time * 0.3 + index) * 0.08;
          });

          ambientParticles.rotation.y =
            time * 0.025;

          renderer.render(scene, camera);
        }

        animate();

        /* RESPONSIVE RESIZING */

        observer = new ResizeObserver(() => {
          if (
            !container.clientWidth ||
            !container.clientHeight ||
            !renderer
          ) {
            return;
          }

          camera.aspect =
            container.clientWidth /
            container.clientHeight;

          camera.updateProjectionMatrix();

          renderer.setSize(
            container.clientWidth,
            container.clientHeight
          );
        });

        observer.observe(container);
      } catch (error) {
        console.error(
          "JARVIS visualisation failed to initialise:",
          error
        );
      }
    }

    initialise();

    return () => {
      disposed = true;

      cancelAnimationFrame(animationId);

      observer?.disconnect();

      geometries.forEach((geometry) =>
        geometry.dispose()
      );

      materials.forEach((material) =>
        material.dispose()
      );

      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <div
      className="jarvis-3d"
      ref={mountRef}
      aria-label="Animated three-dimensional holographic energy visualisation"
      role="img"
    />
  );
}

/* =========================================
   TERMINAL COMPONENT
========================================= */

function TerminalPanel() {
  const lines = [
    {
      prompt: "$",
      text: " booting curiosity.exe",
      kind: "command",
    },
    {
      prompt: ">",
      text: " Loading ideas...",
      kind: "muted",
    },
    {
      prompt: ">",
      text: " Connecting to the future",
      kind: "muted",
    },
    {
      prompt: ">",
      text: " Project JARVIS: in development",
      kind: "success",
    },
    {
      prompt: ">",
      text: " Ready to build something.",
      kind: "success",
    },
  ];

  return (
    <div
      className="terminal"
      aria-label="Decorative terminal animation"
    >
      <div className="terminal-top">
        <div className="traffic">
          <i />
          <i />
          <i />
        </div>

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
            transition={{
              delay: 1.1 + i * 0.42,
              duration: 0.35,
            }}
          >
            <span className="terminal-prompt">
              {line.prompt}
            </span>

            {line.text}
          </motion.div>
        ))}

        <div className="terminal-line typing">
          <span className="terminal-prompt">$</span>
          <span className="cursor" />
        </div>
      </div>

      <div className="terminal-bottom">
        <span>
          <CircleDot size={10} /> SYSTEM ONLINE
        </span>

        <span>LOCAL ENVIRONMENT</span>
      </div>
    </div>
  );
}

/* =========================================
   MAIN PAGE
========================================= */

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

      {/* HEADER */}

      <header className="site-header">
        <a
          href="#home"
          className="brand"
          aria-label="Byte by Shubh home"
        >
          <span className="brand-mark">
            b<span>.</span>
          </span>

          <span>
            BYTE <em>BY SHUBH</em>
          </span>
        </a>

        <nav
          className="desktop-nav"
          aria-label="Main navigation"
        >
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#connect">
          LET&apos;S CONNECT
          <ArrowUpRight size={14} />
        </a>

        <button
          className="menu-toggle"
          aria-label={
            menuOpen ? "Close menu" : "Open menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* MOBILE NAVIGATION */}

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
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </motion.nav>
      )}

      {/* HERO */}

      <section
        className="hero section-wrap"
        id="home"
      >
        <div
          className="hero-grid"
          aria-hidden="true"
        />

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
            transition={{
              delay: 0.25,
              duration: 0.8,
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            I&apos;m Shubh. I explore the edges of AI and
            technology by turning curious questions into
            real experiments, useful software and
            ambitious projects.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 15 }}
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
                <Play
                  size={11}
                  fill="currentColor"
                />
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

        {/* HERO VISUAL */}

        <motion.div
          className="hero-visual"
          initial={{
            opacity: 0,
            scale: 0.94,
            y: 18,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.9,
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
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              BUILD <b>✳</b> EXPERIMENT <b>✳</b> LEARN
              <b>✳</b> REPEAT <b>✳</b> STAY CURIOUS
              <b>✳</b>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}

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
            <p className="micro-label">
              A LITTLE CONTEXT
            </p>

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

      {/* PROJECT JARVIS */}

      <section
        className="mission section-wrap section"
        id="projects"
      >
        <Reveal className="section-label">
          <span>02 / CURRENT MAIN QUEST</span>
          <span className="label-line" />
        </Reveal>

        <Reveal className="mission-heading">
          <div>
            <p className="micro-label">
              FLAGSHIP EXPERIMENT / 001
            </p>

            <h2>
              Project{" "}
              <span className="gradient-text">
                JARVIS.
              </span>
            </h2>
          </div>

          <div className="status-pill">
            <span className="pulse-dot" />
            IN DEVELOPMENT
          </div>
        </Reveal>

        <div className="jarvis-card">
          {/* NEW 3D HOLOGRAM */}

          <div className="jarvis-art jarvis-art-advanced">
            <JarvisVisual />

            <div className="jarvis-scanline" />

            <div className="jarvis-energy-label">
              ENERGY FIELD / 001
            </div>

            <div className="jarvis-crosshair crosshair-one" />

            <div className="jarvis-crosshair crosshair-two" />

            <div className="hud hud-top">
              PERSONAL AI / SYSTEM 001
            </div>

            <div className="hud hud-left">
              VOICE INPUT
              <br />
              <span>STANDBY</span>
            </div>

            <div className="hud hud-right">
              MEMORY
              <br />
              <span>LEARNING</span>
            </div>

            <div className="hud hud-bottom">
              LISTENING FOR THE NEXT INSTRUCTION

              <span className="hud-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>

          {/* JARVIS DESCRIPTION */}

          <div className="jarvis-content">
            <p className="micro-label">
              THE BIG QUESTION
            </p>

            <h3>
              Can I build my own personal AI assistant?
            </h3>

            <p>
              An assistant that can listen, understand,
              remember, reason and interact with my
              digital world. Inspired by science fiction.
              Built one experiment at a time.
            </p>

            <div className="feature-list">
              <span>
                <i />
                Natural voice conversations
              </span>

              <span>
                <i />
                Context & long-term memory
              </span>

              <span>
                <i />
                Tool use and computer automation
              </span>

              <span>
                <i />
                Intelligent, task-focused agents
              </span>
            </div>

            <a
              className="button button-primary"
              href="#connect"
            >
              FOLLOW THE BUILD
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <Reveal className="project-footnote">
          <span>001 / A WORK IN PROGRESS</span>

          <span>
            THE GOAL IS TO BUILD, NOT JUST TO TALK ABOUT IT.
          </span>
        </Reveal>
      </section>

      {/* EXPERIMENTS */}

      <section
        className="experiments section-wrap section"
        id="experiments"
      >
        <Reveal className="section-label">
          <span>03 / AREAS OF EXPLORATION</span>
          <span className="label-line" />
        </Reveal>

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

      {/* TERMINAL */}

      <section className="terminal-section section-wrap section">
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

        <Reveal
          className="terminal-wrap"
          delay={0.14}
        >
          <TerminalPanel />
        </Reveal>
      </section>

      {/* PHILOSOPHY */}

      <section className="philosophy section-wrap section">
        <Reveal className="quote-mark">
          “
        </Reveal>

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

      {/* CONNECT */}

      <section
        className="connect section-wrap section"
        id="connect"
      >
        <Reveal className="connect-inner">
          <div className="connect-orb">
            <Radio
              size={27}
              strokeWidth={1.3}
            />
          </div>

          <p className="micro-label">
            05 / TRANSMISSION OPEN
          </p>

          <h2>
            Curious where
            <br />

            this{" "}
            <span className="gradient-text">
              goes?
            </span>
          </h2>

          <p className="connect-copy">
            Follow along for the experiments, the
            breakthroughs, the bugs and everything in
            between. Let&apos;s see what we can build.
          </p>

          <div className="social-links">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={17} />
              INSTAGRAM
              <ArrowUpRight size={14} />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube size={17} />
              YOUTUBE
              <ArrowUpRight size={14} />
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} />
              GITHUB
              <ArrowUpRight size={14} />
            </a>
          </div>

          <p className="social-note">
            Replace these links with your actual
            profiles before publishing.
          </p>
        </Reveal>
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
          <ChevronRight size={17} />
        </a>
      </footer>
    </main>
  );
}