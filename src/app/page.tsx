import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-10 max-w-6xl">
      <section className="space-y-5 surface-card p-6 md:p-8 rounded-2xl">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-10 bg-gradient-to-r from-white/50 to-transparent" />
          <span>Visualization Playground</span>
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-semibold glow-heading leading-tight">
            Build, tweak, and publish immersive 3D visuals.
          </h1>
          <p className="text-muted-foreground/90 max-w-3xl">
            Next.js + React Three Fiber + Drei + Zustand. Explore the library, tune live parameters, or hop into the admin prototype to reshape metadata.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-white/10 text-foreground hover:bg-white/15 border border-white/15">
            <Link href="/viz">Open visualization library</Link>
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-foreground hover:bg-white/5"
            asChild
          >
            <Link href="/admin">Admin prototype</Link>
          </Button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
            <span>Edge-wire aesthetic enabled</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="surface-card rounded-xl h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/50" />
              Dynamic viz routes
            </CardTitle>
            <CardDescription>
              Each visualization is config-driven and rendered at `/viz/[slug]` with live parameters.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="surface-card rounded-xl h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/50" />
              Orbiting Spheres example
            </CardTitle>
            <CardDescription>
              React Three Fiber scene with adjustable count, radius, speed, and wireframe toggle.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="surface-card rounded-xl h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/50" />
              Config-driven UI
            </CardTitle>
            <CardDescription>
              Parameters live in `src/data/visualizations.ts` for easy extension.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Extend controls in `VizParamControls` to support more input types.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
