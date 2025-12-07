'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  gridSize: number;
  scale: number;
  amplitude: number;
  speed: number;
  color: string;
  wireframe: boolean;
};

// Simple Perlin noise implementation (2D)
class Perlin {
  p: number[];
  constructor(seed = 1) {
    const random = mulberry32(seed);
    const p: number[] = new Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const n = Math.floor(random() * (i + 1));
      [p[i], p[n]] = [p[n], p[i]];
    }
    this.p = new Array(512);
    for (let i = 0; i < 512; i++) this.p[i] = p[i & 255];
  }

  fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(t: number, a: number, b: number) {
    return a + t * (b - a);
  }

  grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise(x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = this.fade(xf);
    const v = this.fade(yf);

    const aa = this.p[this.p[X] + Y];
    const ab = this.p[this.p[X] + Y + 1];
    const ba = this.p[this.p[X + 1] + Y];
    const bb = this.p[this.p[X + 1] + Y + 1];

    const x1 = this.lerp(u, this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf));
    const x2 = this.lerp(u, this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1));
    return (this.lerp(v, x1, x2) + 1) / 2; // normalize to [0,1]
  }
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function GridCubes({ gridSize, scale, amplitude, speed, color, wireframe }: Props) {
  const instancedRef = React.useRef<THREE.InstancedMesh>(null);
  const perlin = React.useMemo(() => new Perlin(7), []);
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  const baseColor = React.useMemo(() => new THREE.Color(color), [color]);
  const lightColor = React.useMemo(() => baseColor.clone().lerp(new THREE.Color("white"), 0.45), [baseColor]);
  const darkColor = React.useMemo(() => baseColor.clone().lerp(new THREE.Color("black"), 0.45), [baseColor]);

  const spacing = 0.8;
  const half = (gridSize - 1) / 2;
  const total = gridSize * gridSize;

  // Ensure instance color buffer exists (required for setColorAt to apply)
  React.useLayoutEffect(() => {
    const mesh = instancedRef.current;
    if (!mesh) return;
    const needsNew =
      !mesh.instanceColor || mesh.instanceColor.count !== total;
    if (needsNew) {
      const attr = new THREE.InstancedBufferAttribute(
        new Float32Array(total * 3),
        3
      );
      attr.setUsage(THREE.DynamicDrawUsage);
      mesh.instanceColor = attr;
      // set on geometry to ensure material sees it
      mesh.geometry.setAttribute("instanceColor", attr);
    }
    for (let i = 0; i < total; i++) {
      mesh.setColorAt(i, baseColor);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.material) mesh.material.needsUpdate = true;
  }, [total, baseColor]);

  useFrame((state) => {
    const mesh = instancedRef.current;
    if (!mesh) return;
    if (!mesh.instanceColor) {
      const attr = new THREE.InstancedBufferAttribute(
        new Float32Array(total * 3),
        3
      );
      attr.setUsage(THREE.DynamicDrawUsage);
      mesh.instanceColor = attr;
      mesh.geometry.setAttribute("instanceColor", attr);
    }
    const time = state.clock.getElapsedTime() * speed;
    for (let zi = 0; zi < gridSize; zi++) {
      for (let xi = 0; xi < gridSize; xi++) {
        const idx = zi * gridSize + xi;
        const x = (xi - half) * spacing;
        const z = (zi - half) * spacing;
        const height = (perlin.noise(x * scale + time, z * scale + time) - 0.5) * 2 * amplitude;

        dummy.position.set(x, height / 2, z);
        dummy.scale.set(0.65, Math.max(0.2, Math.abs(height)), 0.65);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);

        const t = THREE.MathUtils.clamp(0.5 + height * 0.25, 0, 1);
        const c = darkColor.clone().lerp(lightColor, t);
        mesh.setColorAt(idx, c);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (mesh.material) mesh.material.needsUpdate = true;
  });

  return (
    <instancedMesh
      key={`${gridSize}-${color}`}
      ref={instancedRef}
      args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, total]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.8, 1, 0.8]} />
      <meshLambertMaterial
        color={baseColor}
        vertexColors
        wireframe={wireframe}
      />
    </instancedMesh>
  );
}

export function PerlinNoiseMapViz(props: Props) {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [10, 12, 14], fov: 50 }}>
        <color attach="background" args={["#0c1116"]} />
        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.6} groundColor={new THREE.Color("#0c1116")} />
        <directionalLight
          position={[10, 12, 6]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <GridCubes {...props} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

