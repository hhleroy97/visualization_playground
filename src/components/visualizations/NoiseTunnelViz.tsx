'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette } from "@/lib/kodo7";

type Props = {
  ringCount: number;
  radius: number;
  speed: number;
  wobble: number;
  palette: string;
};

function Tunnel({ ringCount, radius, speed, wobble, palette }: Props) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const rings = Math.min(120, Math.max(10, ringCount));
  const segments = 64;
  const positions = React.useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < rings; i++) {
      const t = i / rings;
      const z = -t * 40;
      for (let j = 0; j < segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const r = radius;
        arr.push(Math.cos(angle) * r, Math.sin(angle) * r, z);
      }
    }
    return new Float32Array(arr);
  }, [rings, radius]);

  const colors = React.useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < rings; i++) {
      const t = i / rings;
      const c = colorAt(palette, t * 0.6 + 0.2);
      for (let j = 0; j < segments; j++) {
        arr.push(c.r, c.g, c.b);
      }
    }
    return new Float32Array(arr);
  }, [rings, palette]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * speed;
    const pos = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < rings; i++) {
      const ringPhase = time + i * 0.12;
      for (let j = 0; j < segments; j++) {
        const idx = i * segments + j;
        const angle = (j / segments) * Math.PI * 2;
        const wob = Math.sin(ringPhase + angle * 2) * wobble;
        const x = Math.cos(angle) * (radius + wob);
        const y = Math.sin(angle) * (radius + wob);
        const z = -i * (40 / rings) + Math.sin(ringPhase * 0.4 + angle) * 0.8;
        pos.setXYZ(idx, x, y, z);
      }
    }
    pos.needsUpdate = true;
    pointsRef.current.rotation.z = time * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function NoiseTunnelViz(props: Props) {
  const paletteData = React.useMemo(() => getPalette(props.palette), [props.palette]);
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={[paletteData.background]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 4, 6]} intensity={1.1} />
        <Tunnel {...props} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

