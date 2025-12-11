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
  const featured = visualizations
    .filter((v) =>
      ["galaxy-network", "terrain-heightmap", "noise-tunnel"].includes(v.slug)
    )
    .slice(0, 3);

  return (
    <div className="space-y-10 max-w-6xl">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center surface-card p-8 md:p-10 rounded-2xl">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-10 bg-gradient-to-r from-white/50 to-transparent" />
            <span>Visualization Playground</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold glow-heading leading-tight">
            Sleek, reactive 3D visuals. No boilerplate.
          </h1>
          <p className="text-muted-foreground/90 max-w-3xl">
            Next.js + React Three Fiber + Drei + Zustand. Explore living previews, tweak parameters in real time, and ship bold edge-wire aesthetics without wiring up data.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-white/10 text-foreground hover:bg-white/15 border border-white/15">
              <Link href="/viz">Open visualization library</Link>
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
              <span>Edge-wire aesthetic enabled</span>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="wire-text text-xs">Live previews</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v) => (
              <div
                key={v.slug}
                className="col-span-1 surface-card rounded-xl p-3 border border-white/10"
              >
                <div className="h-32 w-full overflow-hidden rounded-lg border border-white/10">
                  <Preview
                    componentName={v.component}
                    defaults={v.params.reduce<Record<string, unknown>>((acc, p) => {
                      acc[p.name] = p.defaultValue;
                      return acc;
                    }, {})}
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-semibold glow-heading">{v.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
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
        <div className="text-xs text-muted-foreground pt-2">
          Team access: internal <Link href="/admin" className="underline underline-offset-4 hover:text-foreground">admin prototype</Link> remains available but is not part of the main CTA.
        </div>
      </section>
    </div>
  );
}
