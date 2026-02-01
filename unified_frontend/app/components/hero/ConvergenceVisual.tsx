"use client";

import { useRef, useMemo, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Hook to detect client-side rendering
const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Seeded random for deterministic results
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

// Main orbital rings with flowing particles
function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Points>(null);
  const ring2Ref = useRef<THREE.Points>(null);
  const ring3Ref = useRef<THREE.Points>(null);

  const particlesPerRing = 200;

  const { ring1Geo, ring2Geo, ring3Geo } = useMemo(() => {
    const random = seededRandom(42);

    const createRing = (radius: number, tilt: number, offset: number) => {
      const positions = new Float32Array(particlesPerRing * 3);
      const colors = new Float32Array(particlesPerRing * 3);
      const sizes = new Float32Array(particlesPerRing);

      // Blue spectrum colors
      const colorPalette = [
        new THREE.Color("#38bdf8"), // Electric blue
        new THREE.Color("#0ea5e9"), // Sky blue
        new THREE.Color("#22d3ee"), // Cyan
        new THREE.Color("#14b8a6"), // Teal
      ];

      for (let i = 0; i < particlesPerRing; i++) {
        const angle = (i / particlesPerRing) * Math.PI * 2 + offset;
        const r = radius + (random() - 0.5) * 0.3;

        // Position on tilted ring
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r * Math.cos(tilt) + (random() - 0.5) * 0.1;
        const z = Math.sin(angle) * r * Math.sin(tilt);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Color based on position
        const color = colorPalette[Math.floor(random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = 0.02 + random() * 0.04;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      return geometry;
    };

    return {
      ring1Geo: createRing(3.5, Math.PI * 0.15, 0),
      ring2Geo: createRing(2.8, Math.PI * -0.2, Math.PI * 0.3),
      ring3Geo: createRing(4.2, Math.PI * 0.08, Math.PI * 0.6),
    };
  }, [particlesPerRing]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.15;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.5;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={ring1Ref} geometry={ring1Geo}>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points ref={ring2Ref} geometry={ring2Geo}>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points ref={ring3Ref} geometry={ring3Geo}>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// Central glowing core
function CoreSphere() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.3 + Math.sin(t * 1.5) * 0.1;
      glowRef.current.scale.setScalar(1.3 + Math.sin(t * 1.2) * 0.1);
    }

    if (outerGlowRef.current) {
      const mat = outerGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.1 + Math.sin(t * 0.8) * 0.05;
      outerGlowRef.current.scale.setScalar(2 + Math.sin(t * 0.5) * 0.2);
    }
  });

  return (
    <group>
      {/* Bright core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.4, 64, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Streaming particles converging to center
function ConvergingStreams() {
  const pointsRef = useRef<THREE.Points>(null);
  const streamCount = 6;
  const particlesPerStream = 80;
  const totalParticles = streamCount * particlesPerStream;

  const { geometry, particleData } = useMemo(() => {
    const random = seededRandom(12345);
    const positions = new Float32Array(totalParticles * 3);
    const colors = new Float32Array(totalParticles * 3);
    const sizes = new Float32Array(totalParticles);
    const data: { angle: number; speed: number; offset: number; stream: number }[] = [];

    const streamColors = [
      new THREE.Color("#38bdf8"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#0ea5e9"),
      new THREE.Color("#14b8a6"),
      new THREE.Color("#06b6d4"),
      new THREE.Color("#0284c7"),
    ];

    for (let s = 0; s < streamCount; s++) {
      const streamAngle = (s / streamCount) * Math.PI * 2;
      const streamColor = streamColors[s];

      for (let p = 0; p < particlesPerStream; p++) {
        const idx = s * particlesPerStream + p;
        const progress = p / particlesPerStream;

        // Spiral inward
        const radius = 6 - progress * 5.5;
        const angle = streamAngle + progress * Math.PI * 0.8;
        const heightWave = Math.sin(progress * Math.PI * 2) * 0.5;

        positions[idx * 3] = Math.cos(angle) * radius;
        positions[idx * 3 + 1] = heightWave;
        positions[idx * 3 + 2] = Math.sin(angle) * radius;

        // Color with variation
        const brightness = 0.7 + random() * 0.3;
        colors[idx * 3] = streamColor.r * brightness;
        colors[idx * 3 + 1] = streamColor.g * brightness;
        colors[idx * 3 + 2] = streamColor.b * brightness;

        sizes[idx] = (1 - progress * 0.5) * (0.03 + random() * 0.03);

        data.push({
          angle: streamAngle,
          speed: 0.2 + random() * 0.1,
          offset: p / particlesPerStream,
          stream: s,
        });
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    return { geometry: geo, particleData: data };
  }, [totalParticles, streamCount, particlesPerStream]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleData.length; i++) {
      const pd = particleData[i];
      const animatedProgress = (pd.offset + t * pd.speed * 0.15) % 1;

      const radius = 6 - animatedProgress * 5.5;
      const angle = pd.angle + animatedProgress * Math.PI * 0.8;
      const heightWave = Math.sin(animatedProgress * Math.PI * 2) * 0.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = heightWave;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Ambient floating particles
function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 300;

  const { geometry, initialPositions } = useMemo(() => {
    const random = seededRandom(98765);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const initPos = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color("#38bdf8");

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a sphere
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const radius = 3 + random() * 5;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      const brightness = 0.3 + random() * 0.7;
      colors[i * 3] = baseColor.r * brightness;
      colors[i * 3 + 1] = baseColor.g * brightness;
      colors[i * 3 + 2] = baseColor.b * brightness;

      sizes[i] = 0.01 + random() * 0.02;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    return { geometry: geo, initialPositions: initPos };
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      // Gentle floating motion
      const baseX = initialPositions[i * 3];
      const baseY = initialPositions[i * 3 + 1];
      const baseZ = initialPositions[i * 3 + 2];

      positions[i * 3] = baseX + Math.sin(t * 0.3 + i) * 0.1;
      positions[i * 3 + 1] = baseY + Math.cos(t * 0.2 + i * 0.5) * 0.15;
      positions[i * 3 + 2] = baseZ + Math.sin(t * 0.25 + i * 0.3) * 0.1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle overall rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <CoreSphere />
      <OrbitalRings />
      <ConvergingStreams />
      <AmbientParticles />
    </group>
  );
}

export default function ConvergenceVisual() {
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-sky-500/10 to-cyan-500/5 blur-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
