"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { visualizations } from "@/data/visualizations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const components: Record<string, React.ComponentType<Record<string, unknown>>> = {
  OrbitingSpheresViz: dynamic(
    () =>
      import("@/components/visualizations/OrbitingSpheresViz").then(
        (m) => m.OrbitingSpheresViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
  PerlinNoiseMapViz: dynamic(
    () =>
      import("@/components/visualizations/PerlinNoiseMapViz").then(
        (m) => m.PerlinNoiseMapViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
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
  VoronoiWavesViz: dynamic(
    () =>
      import("@/components/visualizations/VoronoiWavesViz").then(
        (m) => m.VoronoiWavesViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
  VolumeFieldViz: dynamic(
    () =>
      import("@/components/visualizations/VolumeFieldViz").then(
        (m) => m.VolumeFieldViz as React.ComponentType<Record<string, unknown>>
      ),
    { ssr: false }
  ),
  RibbonFlowViz: dynamic(
    () =>
      import("@/components/visualizations/RibbonFlowViz").then(
        (m) => m.RibbonFlowViz as React.ComponentType<Record<string, unknown>>
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
  const Component = components[componentName];
  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-muted-foreground/80">
        Preview unavailable
      </div>
    );
  }
  return (
    <div className="h-full bg-black/60 rounded-xl overflow-hidden border border-white/5">
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

export default function VizIndexPage() {
  return (
    <div className="space-y-4">
      <div className="surface-card rounded-xl p-4 flex items-center justify-between">
        <div className="space-y-1">
          <p className="wire-text text-xs">Library</p>
          <h1 className="text-xl font-semibold glow-heading">Visualization Vault</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Explore all available experiments. Each card opens a live scene with edge-wire controls.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-white/40" />
          <span className="w-2 h-2 rounded-full bg-white/30" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
      {visualizations.map((v) => (
        <Card key={v.slug} className="flex flex-col surface-card rounded-xl transition hover:-translate-y-1">
          <CardContent className="space-y-3 p-0">
            <div className="h-48 w-full overflow-hidden border-b border-white/10 rounded-t-xl">
              <Preview
                componentName={v.component}
                defaults={v.params.reduce<Record<string, unknown>>((acc, p) => {
                  acc[p.name] = p.defaultValue;
                  return acc;
                }, {})}
              />
            </div>
          </CardContent>
          <CardHeader className="space-y-3 pt-0">
            <CardTitle className="glow-heading text-lg">{v.title}</CardTitle>
            <CardDescription className="text-muted-foreground/90">
              {v.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pt-0 px-6 pb-6">
            <p className="text-xs text-muted-foreground font-mono bg-white/5 px-2 py-1 rounded border border-white/10 inline-block">
              /viz/{v.slug}
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-white/10 text-foreground hover:bg-white/15 border border-white/15">
              <Link href={`/viz/${v.slug}`}>Open visualization</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
      </div>
    </div>
  );
}

