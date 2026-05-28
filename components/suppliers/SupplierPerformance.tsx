"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Activity } from "lucide-react";
import { suppliersData } from "@/lib/mock-data";

const radarConfig = {
  score: { label: "Score", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function SupplierPerformance() {
  // Build radar data: average onTimeRate, rating (scaled to 100), and leadTime efficiency per category
  const categories = ["Mechanical", "Electronics", "Fasteners", "Plumbing"];

  const radarData = categories.map((cat) => {
    const matching = suppliersData.filter((s) => s.categories.includes(cat));
    if (matching.length === 0) return { category: cat, score: 0 };
    const avgOnTime =
      matching.reduce((s, m) => s + m.onTimeRate, 0) / matching.length;
    const avgRating =
      matching.reduce((s, m) => s + m.rating, 0) / matching.length;
    // Combine on-time rate and rating (rating normalized to 100) for a composite score
    const score = Math.round(avgOnTime * 0.7 + (avgRating / 5) * 100 * 0.3);
    return { category: cat, score };
  });

  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Activity className="w-5 h-5 text-foreground" />
          Performance
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Composite score by category
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={radarConfig}
          className="w-full"
          style={{ height: "200px" }}
        >
          <RadarChart data={radarData} cx="50%" cy="50%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="var(--chart-1)"
              fill="var(--chart-1)"
              fillOpacity={0.25}
              isAnimationActive={false}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel nameKey="category" />}
            />
          </RadarChart>
        </ChartContainer>

        <div className="mt-3 space-y-2">
          {radarData.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-foreground/70"
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium w-20 text-right">
                {item.category}
              </span>
              <span className="text-xs font-semibold tabular-nums w-8 text-right">
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
