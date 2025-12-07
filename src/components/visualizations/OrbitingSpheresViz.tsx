'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type OrbitProps = {
  sphereCount: number;
  orbitRadius: number;
  rotationSpeed: number;
  wireframe: boolean;
};

function Scene(props: OrbitProps) {
  const { sphereCount, orbitRadius, rotationSpeed, wireframe } = props;
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * delta * 0.3;
    }
  });

  const spheres = Array.from({ length: sphereCount }, (_, i) => {
    const angle = (i / sphereCount) * Math.PI * 2;
    return {
      id: i,
      position: [
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius,
      ] as [number, number, number],
    };
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight intensity={1.2} position={[10, 10, 10]} />

      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#ffcc66" emissive="#ffcc66" emissiveIntensity={0.5} />
      </mesh>

      <group ref={groupRef}>
        {spheres.map((s) => (
          <mesh key={s.id} position={s.position}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color="#66aaff" wireframe={wireframe} metalness={0.4} roughness={0.3} />
          </mesh>
        ))}
      </group>

      <OrbitControls />
    </>
  );
}

export function OrbitingSpheresViz(props: OrbitProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 6, 18], fov: 45 }}>
        <Scene {...props} />
      </Canvas>
    </div>
  );
}

