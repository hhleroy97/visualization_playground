'use client';

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points } from "@react-three/drei";
import * as THREE from "three";
import { colorAt, getPalette, radialPoints } from "@/lib/kodo7";
import { galaxyGraph } from "@/data/galaxyGraph";

type Props = {
  nodeCount: number;
  linkRange: number;
  pointSize: number;
  rotationSpeed: number;
  palette: string;
};

function Scene(props: Props) {
  const { nodeCount, linkRange, pointSize, rotationSpeed, palette } = props;
  const groupRef = React.useRef<THREE.Group>(null);
  const nodes = React.useMemo(() => {
    const base = galaxyGraph.nodes.map(
      (n) => new THREE.Vector3(...n.position)
    );
    if (nodeCount <= base.length) {
      return base.slice(0, nodeCount);
    }
    const extra = radialPoints(nodeCount - base.length, 10, 33);
    return base.concat(extra);
  }, [nodeCount]);

  const edges = React.useMemo(() => {
    const positions: number[] = [];
    galaxyGraph.edges.forEach((e) => {
      if (e.source < nodes.length && e.target < nodes.length) {
        const a = nodes[e.source];
        const b = nodes[e.target];
        positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist <= linkRange) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes, linkRange]);

  const paletteData = React.useMemo(() => getPalette(palette), [palette]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * delta * 0.5;
    }
  });

  return (
    <>
      <color attach="background" args={[paletteData.background]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.3} />
      <group ref={groupRef}>
        <lineSegments>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              args={[edges, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={colorAt(palette, 0.2)}
            transparent
            opacity={0.5}
          />
        </lineSegments>

        <Points limit={nodes.length}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  nodes.flatMap((n) => [n.x, n.y, n.z])
                ),
                3,
              ]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[
                new Float32Array(
                  nodes.flatMap((_, i) => {
                    const c = colorAt(
                      palette,
                      (i / Math.max(1, nodes.length - 1)) * 0.8 + 0.1
                    );
                    return [c.r, c.g, c.b];
                  })
                ),
                3,
              ]}
            />
          </bufferGeometry>
          <pointsMaterial
            vertexColors
            size={pointSize}
            sizeAttenuation
            depthWrite={false}
            transparent
          />
        </Points>
      </group>
      <OrbitControls />
    </>
  );
}

export function GalaxyNetworkViz(props: Props) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 10, 20], fov: 55 }}>
        <Scene {...props} />
      </Canvas>
    </div>
  );
}

