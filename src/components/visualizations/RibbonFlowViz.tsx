'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette, ribbonPath } from "@/lib/kodo7";
import { ribbonPaths } from "@/data/ribbonPaths";

type Props = {
  ribbonCount: number;
  twist: number;
  thickness: number;
  speed: number;
  palette: string;
};

function Ribbons({ ribbonCount, twist, thickness, speed, palette }: Props) {
  const groupRef = React.useRef<THREE.Group>(null);
  const tubes = React.useMemo(() => {
    const maxCount = Math.max(2, ribbonCount);
    const arr: { geometry: THREE.TubeGeometry; color: THREE.Color }[] = [];
    for (let i = 0; i < maxCount; i++) {
      const base = ribbonPaths[i % ribbonPaths.length];
      const pts =
        i < ribbonPaths.length
          ? base.points.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
          : ribbonPath(32, 6, twist + i * 0.15, 50 + i);
      const curve = new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.6);
      const geom = new THREE.TubeGeometry(curve, 180, thickness, 16, true);
      const c = colorAt(
        palette,
        (i / Math.max(1, maxCount - 1)) * 0.8 + 0.1
      );
      arr.push({ geometry: geom, color: c });
    }
    return arr;
  }, [ribbonCount, thickness, twist, palette]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * (0.1 + speed * 0.08);
      groupRef.current.rotation.x =
        Math.sin(t * (0.3 + speed * 0.1)) * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {tubes.map(({ geometry, color }, i) => (
        <mesh key={i} geometry={geometry}>
          <meshStandardMaterial
            color={color}
            metalness={0.4}
            roughness={0.35}
            emissive={color.clone().multiplyScalar(0.35)}
          />
        </mesh>
      ))}
      <mesh>
        <torusKnotGeometry args={[2.2, 0.18, 120, 18]} />
        <meshStandardMaterial
          color={colorAt(palette, 0.2)}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

export function RibbonFlowViz(props: Props) {
  const paletteData = React.useMemo(() => getPalette(props.palette), [props.palette]);
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 10, 18], fov: 55 }}>
        <color attach="background" args={[paletteData.background]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[10, 14, 8]} intensity={1.4} />
        <pointLight position={[-10, -8, -6]} intensity={0.5} />
        <Ribbons {...props} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

