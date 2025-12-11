'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette } from "@/lib/kodo7";

type Props = {
  depth: number;
  scale: number;
  rotationSpeed: number;
  wireframe: boolean;
  palette: string;
};

function generatePositions(depth: number) {
  const positions: THREE.Vector3[] = [];
  function recurse(size: number, center: THREE.Vector3, level: number) {
    if (level === 0) {
      positions.push(center.clone());
      return;
    }
    const step = size / 3;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const skip = [x, y, z].filter((v) => v === 0).length >= 2;
          if (skip) continue;
          recurse(step, center.clone().add(new THREE.Vector3(x * step, y * step, z * step)), level - 1);
        }
      }
    }
  }
  recurse(3, new THREE.Vector3(), depth);
  return positions;
}

function Fractal({ depth, scale, rotationSpeed, wireframe, palette }: Props) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  const positions = React.useMemo(() => generatePositions(Math.min(3, Math.max(1, depth))), [depth]);

  React.useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const color = colorAt(palette, 0.55);
    positions.forEach((pos, i) => {
      dummy.position.set(pos.x * scale, pos.y * scale, pos.z * scale);
      dummy.scale.setScalar(scale * 0.5);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [positions, scale, dummy, palette]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * delta * 0.3;
      meshRef.current.rotation.y += rotationSpeed * delta * 0.45;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[
        undefined as unknown as THREE.BufferGeometry,
        undefined as unknown as THREE.Material,
        positions.length,
      ]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        vertexColors
        wireframe={wireframe}
        metalness={0.25}
        roughness={0.5}
        emissive={colorAt(palette, 0.3)}
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
}

export function FractalCubesViz(props: Props) {
  const paletteData = React.useMemo(() => getPalette(props.palette), [props.palette]);
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [6, 6, 12], fov: 55 }}>
        <color attach="background" args={[paletteData.background]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 12, 8]} intensity={1.2} />
        <Fractal {...props} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

