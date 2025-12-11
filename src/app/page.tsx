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
  const [heroIndex, setHeroIndex] = React.useState(0);
  const hero = liveScroller[heroIndex] ?? liveScroller[0];
  const heroHeight = "calc(100vh + var(--header-height) + var(--page-vertical-padding))";

  const goToHero = (index: number) => {
    if (!liveScroller.length) return;
    const nextIndex = ((index % liveScroller.length) + liveScroller.length) % liveScroller.length;
    setHeroIndex(nextIndex);
  };

  const nextHero = () => goToHero(heroIndex + 1);
  const prevHero = () => goToHero(heroIndex - 1);

  return (
    <div className="space-y-12 w-full max-w-none px-0">
      <section
        className="relative w-screen overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        style={{
          minHeight: heroHeight,
          marginTop: "calc(-1 * (var(--header-height) + var(--page-vertical-padding)))",
          paddingTop: "calc(var(--header-height) + var(--page-vertical-padding))",
        }}
      >
        {hero && (
          <div className="absolute inset-0 opacity-50">
            <Preview
              componentName={hero.component}
              defaults={hero.params.reduce<Record<string, unknown>>((acc, p) => {
                acc[p.name] = p.defaultValue;
                return acc;
              }, {})}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/55" />
          </div>
        )}
        <div className="absolute inset-0 brutal-grid opacity-10 mix-blend-screen pointer-events-none" />
        <div className="relative z-10 flex flex-col justify-end items-center min-h-[calc(100vh-2rem)] px-4 md:px-8 pt-4 pb-16 md:pb-20">
          <article className="relative max-w-6xl w-full overflow-hidden bg-black/65 backdrop-blur-xl brutal-outline">
            <div className="relative z-10 flex flex-col justify-between h-full px-6 md:px-10 pt-6 pb-10 gap-6 brutal-noise">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-3">
                  <div className="brutal-tag text-white/70">
                    <span className="inline-block h-1 w-6 bg-[hsl(var(--brutal-accent))]" />
                    Creative Technologist / Software Engineer
                  </div>
                  <h1 className="max-w-3xl leading-tight text-3xl md:text-4xl lg:text-5xl text-white tracking-tight">
                    {hero ? hero.title : "Immersive Visuals"}{" "}
                    <span className="text-[hsl(var(--brutal-accent))]">— Gallery Edition</span>
                  </h1>
                  <p className="max-w-2xl text-white/90 text-lg font-light">
                    Building resilient systems and expressive interactive worlds. Available for senior engineering roles and creative technology collaborations.
                  </p>
                  <div className="flex items-center gap-4 text-white/85">
                    <div className="flex items-center gap-2 px-3 py-1 rounded border border-white/30 bg-white/5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-sm font-semibold">Open to work</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/75">
                      <span className="h-px w-6 bg-white/40" />
                      Force-inspired networks • R3F • Realtime UX
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded border-2 border-white px-3 py-2 bg-white/5 text-xs font-semibold">
                    Available for senior roles
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-xs text-white/70">
                    <span className="h-px w-8 bg-white/40" />
                    Currently shipping immersive data stories and R3F tooling.
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    asChild
                    className="bg-[hsl(var(--brutal-accent))] text-gray-900 font-semibold hover:bg-amber-300 shadow-[6px_6px_0_rgba(0,0,0,0.55)]"
                  >
                    <Link href="mailto:hire@hartley.dev">Book a call</Link>
                  </Button>
                  <Button
                    asChild
                    variant="glass"
                    className="border-white/80 text-white"
                  >
                    <Link href="/viz">See visualizations</Link>
                  </Button>
                </div>
              </div>
            </div>
            {liveScroller.length > 1 && (
              <div className="px-6 md:px-10 pb-6 md:pb-8 space-y-3 bg-white/5 border-t border-white/15">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60">
                    <span className="h-1 w-6 bg-[hsl(var(--brutal-accent))]" />
                    Featured scenes
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="glass"
                      className="border-white/70 text-white"
                      onClick={prevHero}
                    >
                      Prev
                    </Button>
                    <Button
                      size="sm"
                      variant="glass"
                      className="border-white/70 text-white"
                      onClick={nextHero}
                    >
                      Next
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {liveScroller.map((viz, idx) => {
                    const active = idx === heroIndex;
                    return (
                      <button
                        key={viz.slug}
                        onClick={() => goToHero(idx)}
                        className={`group px-3 py-2 rounded-lg border-2 text-xs font-semibold transition-all ${
                          active
                            ? "border-[hsl(var(--brutal-accent))] bg-[hsl(var(--brutal-accent))] text-gray-900 shadow-[4px_4px_0_rgba(0,0,0,0.55)]"
                            : "border-white/25 bg-white/5 text-white/80 hover:border-white/60 hover:text-white shadow-[4px_4px_0_rgba(0,0,0,0.35)]"
                        }`}
                        aria-pressed={active}
                        type="button"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="truncate max-w-[14ch] md:max-w-[24ch]">{viz.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </article>
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
