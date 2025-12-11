'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette, remap } from "@/lib/kodo7";
import { voronoiSeeds } from "@/data/voronoiSeeds";

type Props = {
  cellCount: number;
  height: number;
  smoothing: number;
  palette: string;
};

function VoronoiField(props: Props) {
  const { cellCount, height, smoothing, palette } = props;
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  const colors = React.useMemo(() => new THREE.Color(), []);
  const total = cellCount * cellCount;

  React.useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const spacing = 14 / cellCount;
    let idx = 0;
    for (let y = 0; y < cellCount; y++) {
      for (let x = 0; x < cellCount; x++) {
        const nx = x / (cellCount - 1);
        const ny = y / (cellCount - 1);
        let minDist = Infinity;
        let seedHeight = 0;
        for (const seed of voronoiSeeds) {
          const dx = nx - seed.position[0];
          const dy = ny - seed.position[1];
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < minDist) {
            minDist = d;
            seedHeight = seed.height;
          }
        }
        const falloff = Math.exp(-minDist * 6);
        const blend = remap(falloff, 0, 1) ** (1.2 - smoothing * 0.6);
        const h = seedHeight * blend * height;
        dummy.position.set(
          (nx - 0.5) * 14,
          h * 0.5,
          (ny - 0.5) * 14
        );
        dummy.scale.set(spacing * 0.7, Math.max(0.1, h), spacing * 0.7);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);

        const c = colorAt(palette, blend * 0.9);
        mesh.setColorAt(idx, colors.copy(c));
        idx++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [cellCount, height, palette, smoothing, colors, dummy]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[
        undefined as unknown as THREE.BufferGeometry,
        undefined as unknown as THREE.Material,
        total,
      ]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial vertexColors roughness={0.55} metalness={0.1} />
    </instancedMesh>
  );
}

export function VoronoiWavesViz(props: Props) {
  const paletteData = React.useMemo(() => getPalette(props.palette), [props.palette]);
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [14, 10, 14], fov: 50 }}>
        <color attach="background" args={[paletteData.background]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 12, 8]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <VoronoiField {...props} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

