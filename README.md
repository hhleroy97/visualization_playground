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
- `src/components/visualizations` – visualization components (R3F + Drei)
- `src/state/useVizStore.ts` – shared parameter store via Zustand
- `src/lib/kodo7.ts` – lightweight kodo7-inspired palette + geometry helpers

## Using the playground

- Browse visualizations at `/viz`.
- Open a specific visualization at `/viz/[slug]`; parameters sync via Zustand and re-render live.
- Kodo7 3D set (mix React Three Fiber + kodo7 helper palettes):
  - `galaxy-network`, `terrain-heightmap`, `voronoi-waves`, `volume-field`, `ribbon-flow`
  - Procedural (no datasets): `lissajous-ribbons`, `particle-fountain`, `fractal-cubes`, `superformula-bloom`, `noise-tunnel`
- Legacy examples: `orbiting-spheres`, `perlin-noise-map`
- Admin prototype (`/admin`) lets you edit titles/descriptions in-memory; changes are not persisted.

## Extending

1. Add a new entry to `src/data/visualizations.ts` with a unique `slug`, `component` string, and `params`.
2. Create the component under `src/components/visualizations/` and register its name in the `components` map in `src/app/viz/[slug]/page.tsx`.
3. Optionally enhance `VizParamControls` to support more parameter types (color/select, etc.).

## Data + palettes

- Static datasets live in `src/data/`: galaxy graph, terrain heightmap, Voronoi seeds, volume field, ribbon paths.
- Palettes/utilities live in `src/lib/kodo7.ts`; `colorAt(palette, t)` blends stops, `radialPoints`/`ribbonPath` assist with 3D layouts.

## Smoke test checklist

- `npm run lint` (or `next lint`) should pass.
- Open `/viz/<slug>` and verify parameters respond for:
  - `galaxy-network`
  - `terrain-heightmap`
  - `voronoi-waves`
  - `volume-field`
  - `ribbon-flow`
  - `lissajous-ribbons`
  - `particle-fountain`
  - `fractal-cubes`
  - `superformula-bloom`
  - `noise-tunnel`
  - `orbiting-spheres`
  - `perlin-noise-map`

## Notes

- Tailwind classes come from shadcn’s design tokens; feel free to restyle as needed.
- All visualization parameters flow through `useVizStore`, making it straightforward to add new controls or external data sources later.
