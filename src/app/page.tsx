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
  const liveScroller = visualizations.filter((v) => v.featured).slice(0, 8);

  return (
    <div className="space-y-12 w-full max-w-none px-0">
      <section className="relative min-h-screen w-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="snap-x snap-mandatory overflow-x-auto overflow-y-hidden h-full w-full flex gap-6 px-4 md:px-8">
            {liveScroller.map((v) => (
              <div
                key={v.slug}
                className="snap-start min-w-[100vw] lg:min-w-[85vw] h-full relative overflow-hidden rounded-2xl group transition-all duration-500"
              >
                <Preview
                  componentName={v.component}
                  defaults={v.params.reduce<Record<string, unknown>>((acc, p) => {
                    acc[p.name] = p.defaultValue;
                    return acc;
                  }, {})}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/75 group-hover:from-black/20 group-hover:via-black/45 group-hover:to-black/85 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-between px-6 md:px-10 py-6 gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h1 className="max-w-xl leading-tight text-3xl md:text-4xl lg:text-5xl text-white tracking-tight group-hover:text-indigo-100 transition-colors duration-300">
                      {v.title} —{" "}
                      <span className="text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300">
                        Immersive Visual
                      </span>
                    </h1>
                    <div className="flex items-center gap-2 rounded-full bg-white/12 backdrop-blur-md px-3 py-1 text-xs font-medium text-white group-hover:bg-white/18 transition-all duration-300">
                      Live tour ready
                      <div className="h-2 w-2 rounded-full bg-emerald-400 group-hover:bg-emerald-300 transition-colors duration-300" />
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="max-w-md text-white/90 text-lg font-light group-hover:text-white transition-colors duration-300">
                        {v.description}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-white/80 group-hover:text-white/90 transition-colors duration-300">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-amber-300">
                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                          </svg>
                          <span className="text-sm font-medium">4.9 rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                            <circle cx="12" cy="8" r="6"></circle>
                          </svg>
                          <span className="text-sm font-medium">15+ awards</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md hover:bg-white transition-all duration-200 hover:scale-110 group-hover:shadow-lg text-gray-900"
                    >
                      <Link href={`/viz/${v.slug}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M7 7h10v10"></path>
                          <path d="M7 17 17 7"></path>
                        </svg>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/65" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-12 lg:py-16 space-y-6">
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
