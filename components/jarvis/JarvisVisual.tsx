"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface JarvisVisualProps {
  particleCount?: number;
  ambientCount?: number;
  className?: string;
}

export default function JarvisVisual({
  particleCount = 6500,
  ambientCount = 1200,
  className = ""
}: JarvisVisualProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) return;

    let renderer: THREE.WebGLRenderer | undefined;
    let animationId = 0;
    let observer: ResizeObserver | undefined;
    let disposed = false;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    async function initialise() {
      try {
        const width = container!.clientWidth;
        const height = container!.clientHeight;

        if (!width || !height) return;

        /* =====================================
           SCENE
        ===================================== */

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
          45,
          width / height,
          0.1,
          100
        );

        camera.position.set(0, 0, 9);

        /* =====================================
           RENDERER
        ===================================== */

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        });

        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, 1.5)
        );

        renderer.setSize(width, height);

        renderer.setClearColor(0x000000, 0);

        renderer.outputColorSpace = THREE.SRGBColorSpace;

        container!.appendChild(renderer.domElement);

        /* =====================================
           MAIN HOLOGRAM
        ===================================== */

        const hologram = new THREE.Group();

        scene.add(hologram);

        /* =====================================
           PARTICLE DISTRIBUTION
        ===================================== */

        const RADIUS = 2.05;

        const positions = new Float32Array(
          particleCount * 3
        );

        const originalPositions = new Float32Array(
          particleCount * 3
        );

        const colours = new Float32Array(
          particleCount * 3
        );

        for (let i = 0; i < particleCount; i++) {
          const theta = Math.random() * Math.PI * 2;

          const phi = Math.acos(
            2 * Math.random() - 1
          );

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

          const z = radius * Math.cos(phi);

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

        /* =====================================
           PARTICLE GEOMETRY
        ===================================== */

        const particleGeometry = new THREE.BufferGeometry();

        particleGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );

        particleGeometry.setAttribute(
          "color",
          new THREE.BufferAttribute(colours, 3)
        );

        geometries.push(particleGeometry);

        const particleMaterial = new THREE.PointsMaterial({
          size: 0.032,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true
        });

        materials.push(particleMaterial);

        const particles = new THREE.Points(
          particleGeometry,
          particleMaterial
        );

        hologram.add(particles);

        /* =====================================
           SPATIAL HASH
        ===================================== */

        const cellSize = 0.34;

        const spatialHash = new Map<string, number[]>();

        function getCellKey(
          x: number,
          y: number,
          z: number
        ) {
          return [
            Math.floor(x / cellSize),
            Math.floor(y / cellSize),
            Math.floor(z / cellSize)
          ].join(",");
        }

        for (let i = 0; i < particleCount; i++) {
          const index = i * 3;

          const x = originalPositions[index];
          const y = originalPositions[index + 1];
          const z = originalPositions[index + 2];

          const key = getCellKey(x, y, z);

          const existing = spatialHash.get(key) || [];

          existing.push(i);

          spatialHash.set(key, existing);
        }

        /* =====================================
           FILAMENT NETWORK
        ===================================== */

        const connections: number[] = [];

        for (let i = 0; i < particleCount; i++) {
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
                  cz + oz
                ].join(",");

                const neighbours = spatialHash.get(key);

                if (!neighbours) continue;

                for (const j of neighbours) {
                  if (j <= i) continue;

                  const jIndex = j * 3;

                  const dx = x - originalPositions[jIndex];

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

        const filamentGeometry = new THREE.BufferGeometry();

        filamentGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(connections, 3)
        );

        geometries.push(filamentGeometry);

        const filamentMaterial = new THREE.LineBasicMaterial({
          color: 0x37cfff,
          transparent: true,
          opacity: 0.17,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        materials.push(filamentMaterial);

        const filaments = new THREE.LineSegments(
          filamentGeometry,
          filamentMaterial
        );

        hologram.add(filaments);

        /* =====================================
           SECONDARY ENERGY FILAMENTS
        ===================================== */

        const energyCurves: THREE.Line[] = [];

        for (let i = 0; i < 28; i++) {
          const points: THREE.Vector3[] = [];

          const angle = Math.random() * Math.PI * 2;

          const radius = 0.7 + Math.random() * 1.1;

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

          const curve = new THREE.CatmullRomCurve3(points);

          const curveGeometry = new THREE.BufferGeometry().setFromPoints(
            curve.getPoints(80)
          );

          geometries.push(curveGeometry);

          const curveMaterial = new THREE.LineBasicMaterial({
            color: 0x64eaff,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          });

          materials.push(curveMaterial);

          const line = new THREE.Line(
            curveGeometry,
            curveMaterial
          );

          hologram.add(line);

          energyCurves.push(line);
        }

        /* =====================================
           CENTRAL ENERGY CORE
        ===================================== */

        const coreGeometry = new THREE.SphereGeometry(
          0.12,
          24,
          24
        );

        geometries.push(coreGeometry);

        const coreMaterial = new THREE.MeshBasicMaterial({
          color: 0xb4faff,
          transparent: true,
          opacity: 0.95
        });

        materials.push(coreMaterial);

        const core = new THREE.Mesh(
          coreGeometry,
          coreMaterial
        );

        hologram.add(core);

        const coreLight = new THREE.PointLight(
          0x27dfff,
          5,
          5
        );

        hologram.add(coreLight);

        /* =====================================
           AMBIENT PARTICLES
        ===================================== */

        const ambientPositions = new Float32Array(
          ambientCount * 3
        );

        for (let i = 0; i < ambientCount; i++) {
          const index = i * 3;

          ambientPositions[index] =
            (Math.random() - 0.5) * 8;

          ambientPositions[index + 1] =
            (Math.random() - 0.5) * 5;

          ambientPositions[index + 2] =
            (Math.random() - 0.5) * 5;
        }

        const ambientGeometry = new THREE.BufferGeometry();

        ambientGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(ambientPositions, 3)
        );

        geometries.push(ambientGeometry);

        const ambientMaterial = new THREE.PointsMaterial({
          color: 0x46dfff,
          size: 0.019,
          transparent: true,
          opacity: 0.42,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        materials.push(ambientMaterial);

        const ambientParticles = new THREE.Points(
          ambientGeometry,
          ambientMaterial
        );

        scene.add(ambientParticles);

        /* =====================================
           ANIMATION LOOP
        ===================================== */

        const clock = new THREE.Clock();

        function animate() {
          if (disposed || !renderer) return;

          animationId = requestAnimationFrame(animate);

          const time = prefersReducedMotion
            ? 0
            : clock.getElapsedTime();

          const attribute =
            particleGeometry.attributes.position;

          const array = attribute.array as Float32Array;

          for (let i = 0; i < particleCount; i++) {
            const index = i * 3;

            const x = originalPositions[index];
            const y = originalPositions[index + 1];
            const z = originalPositions[index + 2];

            const wave =
              Math.sin(time * 1.5 + x * 3 + y * 2) * 0.065;

            const turbulence =
              Math.sin(time * 1.1 + z * 4) * 0.05;

            array[index] = x + wave;
            array[index + 1] = y + turbulence;
            array[index + 2] = z + wave * 0.6;
          }

          attribute.needsUpdate = true;

          hologram.rotation.y =
            Math.sin(time * 0.16) * 0.3;

          hologram.rotation.x =
            Math.sin(time * 0.22) * 0.12;

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

          ambientParticles.rotation.y = time * 0.025;

          renderer.render(scene, camera);
        }

        animate();

        /* =====================================
           RESPONSIVE RESIZING
        ===================================== */

        observer = new ResizeObserver(() => {
          if (
            !container!.clientWidth ||
            !container!.clientHeight ||
            !renderer
          ) {
            return;
          }

          camera.aspect =
            container!.clientWidth /
            container!.clientHeight;

          camera.updateProjectionMatrix();

          renderer.setSize(
            container!.clientWidth,
            container!.clientHeight
          );
        });

        observer.observe(container!);

      } catch (error) {
        console.error(
          "JARVIS visualisation failed to initialise:",
          error
        );

        if (!disposed) {
          setFailed(true);
        }
      }
    }

    initialise();

    /* =====================================
       CLEANUP
    ===================================== */

    return () => {
      disposed = true;

      cancelAnimationFrame(animationId);

      observer?.disconnect();

      geometries.forEach((geometry) => {
        geometry.dispose();
      });

      materials.forEach((material) => {
        material.dispose();
      });

      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [particleCount, ambientCount]);

  return (
    <div
      className={`jarvis-3d ${className}`}
      ref={mountRef}
      role="img"
      aria-label="Animated three-dimensional JARVIS holographic energy visualization"
    >
      {failed && (
        <div className="jarvis-fallback">
          <span className="pulse-dot" />
          JARVIS VISUALIZATION UNAVAILABLE
        </div>
      )}
    </div>
  );
}