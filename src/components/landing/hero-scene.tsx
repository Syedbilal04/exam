"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Stars, Torus } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

function OrbitingCore() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    // A gentle parallax tilt that tracks the pointer without feeling twitchy.
    group.current.rotation.x +=
      (state.pointer.y * 0.18 - group.current.rotation.x) * 0.04;
    group.current.rotation.z +=
      (state.pointer.x * 0.12 - group.current.rotation.z) * 0.04;
  });

  return (
    <group ref={group}>
      <Icosahedron args={[1.55, 1]}>
        <meshStandardMaterial
          color="#0d6f63"
          emissive="#16d8b4"
          emissiveIntensity={0.55}
          wireframe
        />
      </Icosahedron>

      <Icosahedron args={[1.05, 3]}>
        <meshStandardMaterial
          color="#04121a"
          emissive="#0aa78d"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.75}
        />
      </Icosahedron>

      {[0, 1, 2].map((index) => (
        <Torus
          key={index}
          args={[2.35 + index * 0.55, 0.006, 12, 128]}
          rotation={[Math.PI / 2.6 + index * 0.22, index * 0.5, 0]}
        >
          <meshBasicMaterial color={index === 1 ? "#ff9f2e" : "#4ff2d0"} />
        </Torus>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 5, 6]} intensity={70} color="#4ff2d0" />
        <pointLight position={[-6, -3, 2]} intensity={35} color="#ff9f2e" />

        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
          <OrbitingCore />
        </Float>

        <Stars radius={70} depth={40} count={2600} factor={3.4} fade speed={0.6} />
      </Suspense>
    </Canvas>
  );
}
