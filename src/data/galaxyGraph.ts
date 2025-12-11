import { radialPoints, seededRandom } from "@/lib/kodo7";

export type GalaxyNode = {
  id: number;
  position: [number, number, number];
  group: number;
};

export type GalaxyEdge = { source: number; target: number; weight: number };

const nodes = radialPoints(42, 10, 11).map((p, i) => ({
  id: i,
  position: [p.x, p.y, p.z] as [number, number, number],
  group: i % 4,
}));

const rand = seededRandom(17);
const edges: GalaxyEdge[] = [];
for (let i = 0; i < nodes.length; i++) {
  const next = (i + 1) % nodes.length;
  edges.push({ source: i, target: next, weight: 0.6 + rand() * 0.4 });
  const jump = (i + 7) % nodes.length;
  edges.push({ source: i, target: jump, weight: 0.4 + rand() * 0.6 });
}

export const galaxyGraph = { nodes, edges };

