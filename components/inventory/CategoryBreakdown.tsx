"use client";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { LayoutGrid } from "lucide-react";
import { categoryData } from "@/lib/mock-data";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

const categoryChartConfig = {
  value: { label: "Value" },
} satisfies ChartConfig;

export function CategoryBreakdown() {
  const total = categoryData.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-foreground" />
          Category Split
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Product distribution by sector
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={categoryChartConfig}
          className="w-full"
          style={{ height: "180px" }}
        >
          <PieChart width={300} height={180}>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={4}
              dataKey="value"
              isAnimationActive={false}
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />
          </PieChart>
        </ChartContainer>

        {/* Legend with percentages */}
        <div className="mt-4 space-y-2">
          {categoryData.map((item, i) => {
            const pct = Math.round((item.value / total) * 100);
            return (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-xs text-muted-foreground font-medium flex-1">
                  {item.name}
                </span>
                <span className="text-xs font-semibold tabular-nums">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
