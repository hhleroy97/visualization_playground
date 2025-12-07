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
    <div className="space-y-8 max-w-6xl">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          Visualization Playground
        </p>
        <h1 className="text-3xl font-semibold">
          Build, tweak, and publish 3D/data viz locally.
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Next.js + React Three Fiber + Drei + Zustand, ready for experiments.
          Browse the library, jump into the live parameterized viz page, or use
          the local admin prototype to edit metadata.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/viz">View visualizations</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Admin prototype</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Dynamic viz routes</CardTitle>
            <CardDescription>
              Each visualization is config-driven and rendered at `/viz/[slug]`
              with live parameters.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orbiting Spheres example</CardTitle>
            <CardDescription>
              React Three Fiber scene with adjustable count, radius, speed, and
              wireframe toggle.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Config-driven UI</CardTitle>
            <CardDescription>
              Parameters live in `src/data/visualizations.ts` for easy
              extension.
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
