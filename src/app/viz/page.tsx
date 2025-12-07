import Link from "next/link";
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

export default function VizIndexPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {visualizations.map((v) => (
        <Card key={v.slug} className="flex flex-col">
          <CardHeader>
            <CardTitle>{v.title}</CardTitle>
            <CardDescription>{v.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-xs text-muted-foreground">
              Slug: <code>{v.slug}</code>
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/viz/${v.slug}`}>Open visualization</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

