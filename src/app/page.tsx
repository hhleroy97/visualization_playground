"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { visualizations } from "@/data/visualizations";

const previewComponents: Record<string, React.ComponentType<Record<string, unknown>>> = {
  GalaxyNetworkViz: dynamic(
    () =>
      import("@/components/visualizations/GalaxyNetworkViz").then(
        (m) => m.GalaxyNetworkViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
  TerrainHeightmapViz: dynamic(
    () =>
      import("@/components/visualizations/TerrainHeightmapViz").then(
        (m) => m.TerrainHeightmapViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
  NoiseTunnelViz: dynamic(
    () =>
      import("@/components/visualizations/NoiseTunnelViz").then(
        (m) => m.NoiseTunnelViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
  LissajousRibbonViz: dynamic(
    () =>
      import("@/components/visualizations/LissajousRibbonViz").then(
        (m) => m.LissajousRibbonViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
  ParticleFountainViz: dynamic(
    () =>
      import("@/components/visualizations/ParticleFountainViz").then(
        (m) => m.ParticleFountainViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
  FractalCubesViz: dynamic(
    () =>
      import("@/components/visualizations/FractalCubesViz").then(
        (m) => m.FractalCubesViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
  SuperformulaBloomViz: dynamic(
    () =>
      import("@/components/visualizations/SuperformulaBloomViz").then(
        (m) => m.SuperformulaBloomViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
};

function Preview({
  componentName,
  defaults,
}: {
  componentName: string;
  defaults: Record<string, unknown>;
}) {
  const Component = previewComponents[componentName];
  if (!Component) {
    return (
      <div className="flex h-full items-center justify-center text-xs text-muted-foreground/80">
        Preview unavailable
      </div>
    );
  }
  return (
    <div className="h-full bg-black/70 rounded-lg overflow-hidden border border-white/10">
      <React.Suspense
        fallback={
          <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/0 animate-pulse" />
        }
      >
        <Component {...defaults} />
      </React.Suspense>
    </div>
  );
}

export default function Home() {
  const liveScroller = visualizations
    .filter((v) =>
      [
        "noise-tunnel",
        "lissajous-ribbons",
        "particle-fountain",
        "fractal-cubes",
        "superformula-bloom",
      ].includes(v.slug)
    )
    .slice(0, 5);

  return (
    <div className="space-y-10 max-w-6xl">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center surface-card p-8 md:p-10 rounded-2xl">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-10 bg-gradient-to-r from-white/40 to-transparent" />
            <span>Spatial UI Playground</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold glow-heading leading-tight">
            Minimal, alluring 3D scenes for the web.
          </h1>
          <p className="text-muted-foreground/85 max-w-3xl">
            React + Three + Zustand with a soft glass aesthetic. Try live previews, tweak params on the fly, and ship without chasing data plumbing.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-white/8 text-foreground hover:bg-white/12 border border-white/10">
              <Link href="/viz">Explore visuals</Link>
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.25)]" />
              <span>Glassmorphic edge-wire vibe</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="wire-text text-xs">Live previews</p>
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/4 via-white/2 to-white/4 blur-3xl opacity-50 pointer-events-none" />
            <div className="snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-2xl border border-white/8 bg-white/2 p-3 flex gap-4 h-[70vh]">
              {liveScroller.map((v) => (
                <div
                  key={v.slug}
                  className="snap-start min-w-[80vw] lg:min-w-[60vw] h-full surface-card rounded-xl border border-white/10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(180,210,255,0.3),transparent_45%)]" />
                  <div className="grid lg:grid-cols-[1.3fr_0.7fr] h-full gap-4 p-4 relative z-10">
                    <div className="h-full w-full overflow-hidden rounded-lg border border-white/10 bg-black/60">
                      <Preview
                        componentName={v.component}
                        defaults={v.params.reduce<Record<string, unknown>>((acc, p) => {
                          acc[p.name] = p.defaultValue;
                          return acc;
                        }, {})}
                      />
                    </div>
                    <div className="space-y-3 flex flex-col justify-center">
                      <p className="text-2xl font-semibold glow-heading">{v.title}</p>
                      <p className="text-sm text-muted-foreground">{v.description}</p>
                      <p className="text-xs text-muted-foreground font-mono bg-white/5 px-2 py-1 rounded border border-white/10 inline-block w-fit">
                        /viz/{v.slug}
                      </p>
                      <Button asChild className="w-fit bg-white/8 text-foreground hover:bg-white/12 border border-white/10">
                        <Link href={`/viz/${v.slug}`}>Open preview</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="surface-card rounded-xl h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/50" />
              Config-driven routes
            </CardTitle>
            <CardDescription>
              Every visualization lives at `/viz/[slug]` with typed params and live controls.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="surface-card rounded-xl h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/50" />
              Procedural 3D set
            </CardTitle>
            <CardDescription>
              Eleven ready-to-run scenes: galaxy fields, ribbons, tunnels, fractals, blooms, and more.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="surface-card rounded-xl h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/50" />
              Build & publish
            </CardTitle>
            <CardDescription>
              Extend via `visualizations.ts`, plug into the admin prototype, and ship fast.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="surface-card rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-8 bg-gradient-to-r from-white/40 to-transparent" />
          <span>Stack</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="space-y-1">
            <p className="text-foreground font-semibold">Frontend</p>
            <p>
              Next.js App Router, React 19, Tailwind + shadcn/ui, design tokens for edge-wire styling.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-foreground font-semibold">3D</p>
            <p>
              React Three Fiber, Drei controls, kodo7-inspired palettes and procedural generators.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-foreground font-semibold">Workflow</p>
            <p>
              Config-driven registry, dynamic imports, Zustand param store, live previews on `/viz`.
            </p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground/80 pt-2">
          Internal controls live at <Link href="/admin" className="underline underline-offset-4 hover:text-foreground">/admin</Link>.
        </div>
      </section>
    </div>
  );
}
