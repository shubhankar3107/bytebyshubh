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
  className = "",
}: JarvisVisualProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const containerElement = mountRef.current;

    if (!containerElement) return;

    const container: HTMLDivElement = containerElement;

    let renderer: THREE.WebGLRenderer | undefined;
    let animationId = 0;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let disposed = false;

    let isIntersecting = false;
    let isPageVisible = !document.hidden;

    let elapsedBeforePause = 0;
    let animationStart = 0;
    let lastFrameTime = 0;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.matchMedia(
      "(max-width: 768px)"
    ).matches;

    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    const deviceMemory =
      "deviceMemory" in navigator
        ? (navigator as Navigator & { deviceMemory?: number })
            .deviceMemory || 4
        : 4;

    const isLowPowerDevice =
      hardwareConcurrency <= 4 || deviceMemory <= 4;

    // Adaptive rendering quality.
    const effectiveParticleCount = Math.min(
      particleCount,
      isMobile ? 3500 : isLowPowerDevice ? 4500 : particleCount
    );

    const effectiveAmbientCount = Math.min(
      ambientCount,
      isMobile ? 600 : isLowPowerDevice ? 800 : ambientCount
    );

    // Limit rendering frequency to reduce GPU workload.
    const targetFrameInterval =
      isMobile || isLowPowerDevice
        ? 1000 / 30
        : 1000 / 45;

    let renderScene: ((time: number) => void) | undefined;

    function stopAnimation() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }

      if (animationStart > 0) {
        elapsedBeforePause +=
          (performance.now() - animationStart) / 1000;

        animationStart = 0;
      }
    }

    function startAnimation() {
      if (
        disposed ||
        prefersReducedMotion ||
        !isIntersecting ||
        !isPageVisible ||
        animationId ||
        !renderScene
      ) {
        return;
      }

      animationStart = performance.now();
      lastFrameTime = 0;

      animationId = requestAnimationFrame(animate);
    }

    function animate(timestamp: number) {
      if (
        disposed ||
        !isIntersecting ||
        !isPageVisible ||
        !renderScene
      ) {
        animationId = 0;
        return;
      }

      animationId = requestAnimationFrame(animate);

      if (
        timestamp - lastFrameTime < targetFrameInterval
      ) {
        return;
      }

      const elapsed =
        elapsedBeforePause +
        (timestamp - animationStart) / 1000;

      renderScene(elapsed);

      lastFrameTime = timestamp;
    }

    function handleVisibilityChange() {
      isPageVisible = !document.hidden;

      if (isPageVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    }

    async function initialise() {
      try {
        const width = container.clientWidth;
        const height = container.clientHeight;

        if (!width || !height || disposed) return;

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
          antialias: !isMobile && !isLowPowerDevice,
          powerPreference: "high-performance",
        });

        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio || 1,
            isMobile ? 1.25 : 1.5
          )
        );

        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        container.appendChild(renderer.domElement);

        /* =====================================
           MAIN HOLOGRAM
        ===================================== */

        const hologram = new THREE.Group();

        scene.add(hologram);

        /* =====================================
           PARTICLE DISTRIBUTION
        ===================================== */

        const RADIUS = 2.05;
        const count = effectiveParticleCount;

        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const colours = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
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

        const particlePositionAttribute =
          new THREE.BufferAttribute(positions, 3);

        particlePositionAttribute.setUsage(
          THREE.DynamicDrawUsage
        );

        particleGeometry.setAttribute(
          "position",
          particlePositionAttribute
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
          sizeAttenuation: true,
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
          return `${Math.floor(x / cellSize)},${Math.floor(
            y / cellSize
          )},${Math.floor(z / cellSize)}`;
        }

        for (let i = 0; i < count; i++) {
          const index = i * 3;

          const key = getCellKey(
            originalPositions[index],
            originalPositions[index + 1],
            originalPositions[index + 2]
          );

          let existing = spatialHash.get(key);

          if (!existing) {
            existing = [];
            spatialHash.set(key, existing);
          }

          existing.push(i);
        }

        /* =====================================
           FILAMENT NETWORK
        ===================================== */

        const connections: number[] = [];

        for (let i = 0; i < count; i++) {
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
                const key = `${cx + ox},${cy + oy},${cz + oz}`;

                const neighbours = spatialHash.get(key);

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
          depthWrite: false,
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

          const curveGeometry =
            new THREE.BufferGeometry().setFromPoints(
              curve.getPoints(80)
            );

          geometries.push(curveGeometry);

          const curveMaterial = new THREE.LineBasicMaterial({
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
          opacity: 0.95,
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
          effectiveAmbientCount * 3
        );

        for (let i = 0; i < effectiveAmbientCount; i++) {
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
          depthWrite: false,
        });

        materials.push(ambientMaterial);

        const ambientParticles = new THREE.Points(
          ambientGeometry,
          ambientMaterial
        );

        scene.add(ambientParticles);

        /* =====================================
           RENDERING
        ===================================== */

        renderScene = (time: number) => {
          if (disposed || !renderer) return;

          const array = particlePositionAttribute.array as Float32Array;

          for (let i = 0; i < count; i++) {
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

          particlePositionAttribute.needsUpdate = true;

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

          for (let i = 0; i < energyCurves.length; i++) {
            energyCurves[i].rotation.z =
              Math.sin(time * 0.3 + i) * 0.08;
          }

          ambientParticles.rotation.y = time * 0.025;

          renderer.render(scene, camera);
        };

        // Draw one frame immediately.
        renderScene(0);

        /* =====================================
           VISIBILITY-BASED ANIMATION
        ===================================== */

        document.addEventListener(
          "visibilitychange",
          handleVisibilityChange
        );

        if ("IntersectionObserver" in window) {
          intersectionObserver = new IntersectionObserver(
            (entries) => {
              const entry = entries[0];

              isIntersecting = entry.isIntersecting;

              if (isIntersecting) {
                startAnimation();
              } else {
                stopAnimation();
              }
            },
            {
              threshold: 0.05,
            }
          );

          intersectionObserver.observe(container);
        } else {
          isIntersecting = true;
          startAnimation();
        }

        /* =====================================
           RESPONSIVE RESIZING
        ===================================== */

        resizeObserver = new ResizeObserver(() => {
          if (disposed || !renderer) return;

          const newWidth = container.clientWidth;
          const newHeight = container.clientHeight;

          if (!newWidth || !newHeight) return;

          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();

          renderer.setSize(newWidth, newHeight);

          // Re-render immediately after resizing.
          if (prefersReducedMotion) {
            renderScene?.(0);
          }
        });

        resizeObserver.observe(container);

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

      stopAnimation();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();

      geometries.forEach((geometry) => {
        geometry.dispose();
      });

      materials.forEach((material) => {
        material.dispose();
      });

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
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