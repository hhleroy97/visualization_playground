export type ParamValue = number | boolean | string;
export type VizParams = Record<string, ParamValue>;
export type VizParamType = "number" | "color" | "select" | "boolean";

export type VizParam = {
  name: string;
  label: string;
  type: VizParamType;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  defaultValue: ParamValue;
};

export type VizConfig = {
  slug: string;
  title: string;
  description: string;
  component: string;
  params: VizParam[];
  defaultData: Record<string, unknown>;
};

export const visualizations: VizConfig[] = [
  {
    slug: "orbiting-spheres",
    title: "Orbiting Spheres Playground",
    description: "A simple 3D orbit visualization with tweakable counts and colors.",
    component: "OrbitingSpheresViz",
    params: [
      {
        name: "sphereCount",
        label: "Sphere Count",
        type: "number",
        min: 1,
        max: 200,
        step: 1,
        defaultValue: 25,
      },
      {
        name: "orbitRadius",
        label: "Orbit Radius",
        type: "number",
        min: 1,
        max: 20,
        step: 0.5,
        defaultValue: 8,
      },
      {
        name: "rotationSpeed",
        label: "Rotation Speed",
        type: "number",
        min: 0,
        max: 5,
        step: 0.1,
        defaultValue: 1.5,
      },
      {
        name: "wireframe",
        label: "Wireframe Mode",
        type: "boolean",
        defaultValue: false,
      },
    ],
    defaultData: {},
  },
  {
    slug: "perlin-noise-map",
    title: "Perlin Noise Grid",
    description: "3D grid of cubes animated by Perlin noise heights.",
    component: "PerlinNoiseMapViz",
    params: [
      {
        name: "gridSize",
        label: "Grid Size",
        type: "number",
        min: 6,
        max: 40,
        step: 2,
        defaultValue: 20,
      },
      {
        name: "scale",
        label: "Noise Scale",
        type: "number",
        min: 0.05,
        max: 1.5,
        step: 0.05,
        defaultValue: 0.35,
      },
      {
        name: "amplitude",
        label: "Height Amplitude",
        type: "number",
        min: 0.1,
        max: 4,
        step: 0.1,
        defaultValue: 1.2,
      },
      {
        name: "speed",
        label: "Animation Speed",
        type: "number",
        min: 0,
        max: 2,
        step: 0.05,
        defaultValue: 0.6,
      },
      {
        name: "color",
        label: "Base Color",
        type: "color",
        defaultValue: "#ffffff",
      },
      {
        name: "wireframe",
        label: "Wireframe",
        type: "boolean",
        defaultValue: false,
      },
    ],
    defaultData: {},
  },
];

