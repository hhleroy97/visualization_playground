# Hartley Viz Lab

Local visualization playground built with Next.js (App Router), React Three Fiber, Drei, and Zustand. Includes a config-driven visualization library, dynamic viz pages with live parameter controls, and a prototype admin UI for tweaking metadata locally.

## Setup

```bash
npm install
npm run dev
# visit http://localhost:3000
```

Other scripts:

- `npm run lint` – ESLint (Next.js config)
- `npm run build` / `npm start` – production build and serve

## Design system

- Tailwind CSS v3.4 + shadcn/ui components (button, card, input, textarea, select, slider, checkbox, etc.).
- Add more components with shadcn config in `components.json` (aliases set to `@/components` and `@/lib/utils`).

## Key structure

- `src/app/page.tsx` – landing
- `src/app/viz` – library index and dynamic `/viz/[slug]` pages
- `src/app/admin/page.tsx` – prototype admin (local-only state)
- `src/data/visualizations.ts` – viz registry + parameter metadata
- `src/components/VizParamControls.tsx` – UI controls driven by metadata
- `src/components/visualizations/OrbitingSpheresViz.tsx` – example viz
- `src/state/useVizStore.ts` – shared parameter store via Zustand

## Using the playground

- Browse visualizations at `/viz`.
- Open a specific visualization at `/viz/[slug]`; parameters sync via Zustand and re-render live.
- Orbiting Spheres parameters:
  - `sphereCount` (1–200)
  - `orbitRadius` (1–20)
  - `rotationSpeed` (0–5)
  - `wireframe` (boolean)
- Admin prototype (`/admin`) lets you edit titles/descriptions in-memory; changes are not persisted.

## Extending

1. Add a new entry to `src/data/visualizations.ts` with a unique `slug`, `component` string, and `params`.
2. Create the component under `src/components/visualizations/` and register its name in the `components` map in `src/app/viz/[slug]/page.tsx`.
3. Optionally enhance `VizParamControls` to support more parameter types (color/select, etc.).

## Notes

- Tailwind classes come from shadcn’s design tokens; feel free to restyle as needed.
- All visualization parameters flow through `useVizStore`, making it straightforward to add new controls or external data sources later.
