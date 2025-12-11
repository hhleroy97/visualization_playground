'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette } from "@/lib/kodo7";

type Props = {
  m: number;
  n1: number;
  n2: number;
  n3: number;
  petals: number;
  pointSize: number;
  rotationSpeed: number;
  palette: string;
};

function superformula(theta: number, m: number, n1: number, n2: number, n3: number) {
  const a = 1;
  const b = 1;
  const t1 = Math.pow(Math.abs(Math.cos((m * theta) / 4) / a), n2);
  const t2 = Math.pow(Math.abs(Math.sin((m * theta) / 4) / b), n3);
  return Math.pow(t1 + t2, -1 / n1);
}

function BloomPoints({ m, n1, n2, n3, petals, pointSize, rotationSpeed, palette }: Props) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const arr: number[] = [];
    const count = 2400;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2 * petals;
      const r = superformula(theta, m, n1, n2, n3) * 5;
      const y = Math.sin(theta * 0.3) * 0.8;
      arr.push(Math.cos(theta) * r, y, Math.sin(theta) * r);
    }
    return new Float32Array(arr);
  }, [m, n1, n2, n3, petals]);

  const colors = React.useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < positions.length / 3; i++) {
      const t = i / (positions.length / 3 - 1);
      const c = colorAt(palette, t * 0.7 + 0.15);
      arr.push(c.r, c.g, c.b);
    }
    return new Float32Array(arr);
  }, [positions, palette]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed * 0.3;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={pointSize} vertexColors depthWrite={false} sizeAttenuation />
    </points>
  );
}

export function SuperformulaBloomViz(props: Props) {
  const paletteData = React.useMemo(() => getPalette(props.palette), [props.palette]);
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 6, 12], fov: 55 }}>
        <color attach="background" args={[paletteData.background]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[8, 10, 6]} intensity={1.2} />
        <BloomPoints {...props} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

