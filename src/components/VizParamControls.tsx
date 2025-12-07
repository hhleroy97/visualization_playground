'use client';

import { VizConfig } from "@/data/visualizations";
import { useVizStore } from "@/state/useVizStore";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type Props = { config: VizConfig };

export function VizParamControls({ config }: Props) {
  const params = useVizStore((s) => s.params);
  const setParam = useVizStore((s) => s.setParam);

  return (
    <div className="space-y-4">
      {config.params.map((p) => {
        const value = params[p.name] ?? p.defaultValue;

        if (p.type === "number") {
          return (
            <div key={p.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <Label htmlFor={p.name}>{p.label}</Label>
                <span className="text-muted-foreground">{value}</span>
              </div>
              <Slider
                id={p.name}
                min={p.min}
                max={p.max}
                step={p.step}
                value={[Number(value)]}
                onValueChange={(v) => setParam(p.name, Number(v[0]))}
              />
            </div>
          );
        }

        if (p.type === "color") {
          return (
            <div key={p.name} className="space-y-2 text-sm">
              <Label htmlFor={p.name}>{p.label}</Label>
              <Input
                id={p.name}
                type="color"
                value={String(value)}
                onChange={(e) => setParam(p.name, e.target.value)}
                className="h-10 p-1"
              />
            </div>
          );
        }

        if (p.type === "boolean") {
          return (
            <label key={p.name} className="flex items-center space-x-2 text-sm">
              <Checkbox
                checked={Boolean(value)}
                onCheckedChange={(checked) => setParam(p.name, Boolean(checked))}
              />
              <span>{p.label}</span>
            </label>
          );
        }

        return <div key={p.name}>Unsupported param type: {p.type}</div>;
      })}
    </div>
  );
}

