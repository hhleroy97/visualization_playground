import * as THREE from "three";

export type KodoPalette = {
  name: string;
  background: string;
  stops: string[];
};

export const kodoPalettes: KodoPalette[] = [
  {
    name: "infrared",
    background: "#06070d",
    stops: ["#0ff0fc", "#7a5bff", "#ff2d92", "#ffc94f"],
  },
  {
    name: "aurora",
    background: "#050b0f",
    stops: ["#0affef", "#26ff75", "#d6ff4f", "#ff8a00"],
  },
  {
    name: "nocturne",
    background: "#0a0c11",
    stops: ["#5af0ff", "#6d7dff", "#c179ff", "#ffb5f0"],
  },
  {
    name: "sunken",
    background: "#050608",
    stops: ["#8df7ff", "#3b8bff", "#1137ff", "#090d1f"],
  },
];

export function getPalette(name?: string): KodoPalette {
  if (name) {
    const found = kodoPalettes.find((p) => p.name === name);
    if (found) return found;
  }
  return kodoPalettes[0];
}

export function colorAt(paletteName: string, t: number): THREE.Color {
  const palette = getPalette(paletteName);
  const clamped = Math.min(1, Math.max(0, t));
  const scaled = clamped * (palette.stops.length - 1);
  const idx = Math.floor(scaled);
  const frac = scaled - idx;
  const start = new THREE.Color(palette.stops[idx]);
  const end = new THREE.Color(
    palette.stops[Math.min(palette.stops.length - 1, idx + 1)]
  );
  return start.lerp(end, frac);
}

export function seededRandom(seed: number) {
  return function () {
    let x = seed++;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    return (x < 0 ? ~x + 1 : x) % 100000 / 100000;
  };
}

export function radialPoints(
  count: number,
  radius: number,
  seed = 1
): THREE.Vector3[] {
  const rand = seededRandom(seed);
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(rand());
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.sin(theta);
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

export function ribbonPath(
  length: number,
  radius: number,
  twist: number,
  seed: number
): THREE.Vector3[] {
  const rand = seededRandom(seed);
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < length; i++) {
    const t = i / Math.max(1, length - 1);
    const angle = t * Math.PI * 2 * twist + rand() * 0.6;
    const r = radius * (0.6 + rand() * 0.4);
    const y = (t - 0.5) * radius * 1.2;
    pts.push(
      new THREE.Vector3(
        Math.cos(angle) * r,
        y + Math.sin(angle * 0.5) * radius * 0.3,
        Math.sin(angle) * r
      )
    );
  }
  return pts;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function remap(value: number, inMin: number, inMax: number) {
  const t = (value - inMin) / (inMax - inMin);
  return Math.max(0, Math.min(1, t));
}

