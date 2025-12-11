'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette } from "@/lib/kodo7";

type Props = {
  ribbonCount: number;
  thickness: number;
  speed: number;
  twist: number;
  palette: string;
};

function makeCurve(idx: number, twist: number) {
  const points: THREE.Vector3[] = [];
  const phase = idx * 0.6;
  for (let i = 0; i <= 120; i++) {
    const t = (i / 120) * Math.PI * 2;
    const x = Math.sin(t * 2 + phase) * 6;
    const y = Math.sin(t * 3 + phase) * 3;
    const z = Math.cos(t * twist + phase) * 6;
    points.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  curve.closed = true;
  return curve;
}

function Ribbons({ ribbonCount, thickness, speed, twist, palette }: Props) {
  const groupRef = React.useRef<THREE.Group>(null);
  const tubes = React.useMemo(() => {
    const arr: { geometry: THREE.TubeGeometry; material: THREE.MeshStandardMaterial }[] = [];
    const count = Math.min(12, Math.max(1, ribbonCount));
    for (let i = 0; i < count; i++) {
      const curve = makeCurve(i, twist);
      const geom = new THREE.TubeGeometry(curve, 360, thickness, 18, true);
      const c = colorAt(palette, (i / Math.max(1, count - 1)) * 0.7 + 0.15);
      const mat = new THREE.MeshStandardMaterial({
        color: c,
        metalness: 0.35,
        roughness: 0.4,
        emissive: c.clone().multiplyScalar(0.25),
      });
      arr.push({ geometry: geom, material: mat });
    }
    return arr;
  }, [ribbonCount, thickness, twist, palette]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * (0.08 + speed * 0.05);
    groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {tubes.map((t, i) => (
        <mesh key={i} geometry={t.geometry} material={t.material} />
      ))}
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color={colorAt(palette, 0.35)} emissiveIntensity={0.2} emissive={colorAt(palette, 0.35)} />
      </mesh>
    </group>
  );
}

export function LissajousRibbonViz(props: Props) {
  const paletteData = React.useMemo(() => getPalette(props.palette), [props.palette]);
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 10, 16], fov: 55 }}>
        <color attach="background" args={[paletteData.background]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[10, 12, 8]} intensity={1.2} />
        <Ribbons {...props} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

