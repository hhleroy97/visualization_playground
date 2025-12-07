'use client';

import { visualizations } from "@/data/visualizations";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminPage() {
  const [slug, setSlug] = React.useState(visualizations[0].slug);
  const [configs, setConfigs] = React.useState(visualizations);

  const selected = configs.find((v) => v.slug === slug);

  function update(field: "title" | "description", value: string) {
    setConfigs((prev) =>
      prev.map((v) => (v.slug === slug ? { ...v, [field]: value } : v))
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Admin – Visualization Config</h1>
        <p className="text-sm text-muted-foreground">
          Local-only prototype for editing titles and descriptions. Changes are not persisted.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage visualization metadata</CardTitle>
          <CardDescription>Select a visualization and tweak its fields.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="viz-select">Select visualization</Label>
            <Select value={slug} onValueChange={setSlug}>
              <SelectTrigger id="viz-select">
                <SelectValue placeholder="Choose a visualization" />
              </SelectTrigger>
              <SelectContent>
                {configs.map((v) => (
                  <SelectItem key={v.slug} value={v.slug}>
                    {v.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selected && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={selected.title}
                  onChange={(e) => update("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={selected.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Preview JSON (not persisted)
                </Label>
                <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                  {JSON.stringify(selected, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

