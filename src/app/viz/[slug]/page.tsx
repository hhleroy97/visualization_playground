'use client';

import React from "react";
import dynamic from "next/dynamic";
import { visualizations, VizConfig, VizParams } from "@/data/visualizations";
import { VizParamControls } from "@/components/VizParamControls";
import { useVizStore } from "@/state/useVizStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = { params: Promise<{ slug: string }> };

const components: Record<string, React.ComponentType<VizParams>> = {
  OrbitingSpheresViz: dynamic(
    () =>
      import("@/components/visualizations/OrbitingSpheresViz").then(
        (m) => m.OrbitingSpheresViz as React.ComponentType<VizParams>
      ),
    { ssr: false }
  ),
  PerlinNoiseMapViz: dynamic(
    () =>
      import("@/components/visualizations/PerlinNoiseMapViz").then(
        (m) => m.PerlinNoiseMapViz as React.ComponentType<VizParams>
      ),
    { ssr: false }
  ),
};

function VizClient({
  config,
  Component,
}: {
  config: VizConfig;
  Component: React.ComponentType<VizParams>;
}) {
  const params = useVizStore((s) => s.params);
  const reset = useVizStore((s) => s.resetParams);

  React.useEffect(() => {
    const initial = config.params.reduce((acc, p) => {
      acc[p.name] = p.defaultValue;
      return acc;
    }, {} as VizParams);
    reset(initial);
  }, [config.params, config.slug, reset]);

  return <Component {...params} />;
}

export default function VizDetailPage({ params }: Props) {
  const resolvedParams = React.use(params);
  const config = visualizations.find((v) => v.slug === resolvedParams.slug);
  if (!config) return <div className="p-8">Not found</div>;

  const VizComponent = components[config.component as keyof typeof components];
  if (!VizComponent) return <div className="p-8">Component not registered</div>;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[60vh] lg:h-[70vh] bg-black">
            <VizClient config={config} Component={VizComponent} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{config.title}</CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <VizParamControls config={config} />
        </CardContent>
      </Card>
    </div>
  );
}

