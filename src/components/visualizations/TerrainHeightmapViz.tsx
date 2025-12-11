'use client';

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette } from "@/lib/kodo7";
import { terrainHeightmap } from "@/data/terrainHeightmap";

type Props = {
  amplitude: number;
  frequency: number;
  wireframe: boolean;
  palette: string;
};

function HeightmapMesh({ amplitude, frequency, wireframe, palette }: Props) {
  const geometry = React.useMemo(() => {
    const rows = terrainHeightmap.length;
    const cols = terrainHeightmap[0]?.length ?? 0;
    const geo = new THREE.PlaneGeometry(20, 20, cols - 1, rows - 1);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = (i % cols) / (cols - 1);
      const y = Math.floor(i / cols) / (rows - 1);
      const h = terrainHeightmap[Math.floor(y * (rows - 1))][
        Math.floor(x * (cols - 1))
      ];
      const wave =
        Math.sin((x + y) * Math.PI * frequency) * 0.15 +
        Math.cos((x - y) * Math.PI * frequency) * 0.12;
      const height = (h + wave) * amplitude;
      pos.setZ(i, height);

      const c = colorAt(palette, h);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, [amplitude, frequency, palette]);

  return (
    <mesh geometry={geometry} rotation-x={-Math.PI / 2}>
      <meshStandardMaterial
        vertexColors
        wireframe={wireframe}
        metalness={0.15}
        roughness={0.6}
      />
    </mesh>
  );
}

export function TerrainHeightmapViz(props: Props) {
  const paletteData = React.useMemo(() => getPalette(props.palette), [props.palette]);
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [14, 12, 16], fov: 45 }}>
        <color attach="background" args={[paletteData.background]} />
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[12, 14, 8]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <HeightmapMesh {...props} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

