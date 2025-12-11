'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette, seededRandom } from "@/lib/kodo7";

type Props = {
  count: number;
  spread: number;
  speed: number;
  gravity: number;
  palette: string;
};

type Particle = { pos: THREE.Vector3; vel: THREE.Vector3; life: number };

function Fountain({ count, spread, speed, gravity, palette }: Props) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const particles = React.useRef<Particle[]>([]);
  const dummy = React.useMemo(() => new THREE.Object3D(), []);

  React.useEffect(() => {
    const rand = seededRandom(42);
    const c = Math.min(800, Math.max(20, count));
    particles.current = Array.from({ length: c }).map(() => {
      const angle = rand() * Math.PI * 2;
      const r = rand() * spread;
      const speedY = 3 + rand() * 2;
      return {
        pos: new THREE.Vector3((Math.cos(angle) * r) / 2, 0, (Math.sin(angle) * r) / 2),
        vel: new THREE.Vector3(
          Math.cos(angle) * speed * 0.4,
          speedY * speed * 0.6,
          Math.sin(angle) * speed * 0.4
        ),
        life: rand() * 1.5,
      };
    });
  }, [count, spread, speed]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const g = gravity;
    const arr = particles.current;
    const paletteColor = colorAt(palette, 0.5);
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      p.life -= delta;
      if (p.life <= 0 || p.pos.y < -2) {
        const rand = seededRandom(99 + i);
        const angle = rand() * Math.PI * 2;
        const r = rand() * spread;
        const speedY = 3 + rand() * 2;
        p.pos.set((Math.cos(angle) * r) / 2, 0, (Math.sin(angle) * r) / 2);
        p.vel.set(
          Math.cos(angle) * speed * 0.4,
          speedY * speed * 0.6,
          Math.sin(angle) * speed * 0.4
        );
        p.life = 1.2 + rand() * 1.2;
      }
      p.vel.y -= g * delta;
      p.pos.addScaledVector(p.vel, delta);

      dummy.position.copy(p.pos);
      const scale = 0.1 + Math.max(0.05, p.life * 0.1);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, paletteColor);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[
        undefined as unknown as THREE.BufferGeometry,
        undefined as unknown as THREE.Material,
        Math.min(800, Math.max(20, count)),
      ]}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial vertexColors emissive={colorAt(palette, 0.4)} emissiveIntensity={0.4} roughness={0.4} />
    </instancedMesh>
  );
}

export function ParticleFountainViz(props: Props) {
  const paletteData = React.useMemo(() => getPalette(props.palette), [props.palette]);
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 6, 10], fov: 55 }}>
        <color attach="background" args={[paletteData.background]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 8, 5]} intensity={1.2} />
        <Fountain {...props} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <circleGeometry args={[6, 32]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.9} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

