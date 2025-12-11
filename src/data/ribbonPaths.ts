import { ribbonPath } from "@/lib/kodo7";

export type RibbonPath = { id: number; points: [number, number, number][] };

export const ribbonPaths: RibbonPath[] = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  points: ribbonPath(36, 6, 1.2 + i * 0.4, 21 + i).map((p) => [
    p.x,
    p.y,
    p.z,
  ]),
}));

