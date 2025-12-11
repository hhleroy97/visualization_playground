'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette } from "@/lib/kodo7";
import { volumeField, volumeGridSize, volumeSteps } from "@/data/volumeField";

type Props = {
  threshold: number;
  pointSize: number;
  speed: number;
  palette: string;
};

function VolumePoints({ threshold, pointSize, speed, palette }: Props) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const arr: number[] = [];
    const colors: number[] = [];
    for (const cell of volumeField) {
      if (cell.value < threshold) continue;
      const nx = cell.x / (volumeSteps - 1) - 0.5;
      const ny = cell.y / (volumeSteps - 1) - 0.5;
      const nz = cell.z / (volumeSteps - 1) - 0.5;
      arr.push(nx * volumeGridSize, ny * volumeGridSize, nz * volumeGridSize);
      const c = colorAt(palette, Math.min(1, cell.value));
      colors.push(c.r, c.g, c.b);
    }
    return {
      positions: new Float32Array(arr),
      colors: new Float32Array(colors),
      count: arr.length / 3,
    };
  }, [threshold, palette]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    const positionsAttr = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const time = state.clock.getElapsedTime() * speed * 0.6;
    for (let i = 0; i < positionsAttr.count; i++) {
      const x = positionsAttr.getX(i);
      const y = positionsAttr.getY(i);
      const z = positionsAttr.getZ(i);
      const sway = Math.sin(time + x * 0.2 + z * 0.17) * 0.08;
      positionsAttr.setY(i, y + sway);
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[positions.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={pointSize}
        vertexColors
        depthWrite={false}
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

export function VolumeFieldViz(props: Props) {
  const paletteData = React.useMemo(() => getPalette(props.palette), [props.palette]);
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 8, 16], fov: 55 }}>
        <color attach="background" args={[paletteData.background]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <VolumePoints {...props} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

