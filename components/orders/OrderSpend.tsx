"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart2 } from "lucide-react";
import { orderTimelineData, ordersData } from "@/lib/mock-data";

const chartConfig = {
  value: { label: "Spend ($)", color: "var(--chart-1)" },
} satisfies ChartConfig;

// Supplier spend breakdown from ordersData
const supplierSpend = ordersData.reduce<Record<string, number>>((acc, o) => {
  if (o.status !== "Cancelled") {
    acc[o.supplier] = (acc[o.supplier] ?? 0) + o.totalAmount;
  }
  return acc;
}, {});

const spendBreakdown = Object.entries(supplierSpend)
  .map(([name, total]) => ({ name: name.split(" ")[0], total }))
  .sort((a, b) => b.total - a.total);

export function OrderSpend() {
  const totalSpend = spendBreakdown.reduce((s, x) => s + x.total, 0);

  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-foreground" />
          Spend Overview
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly order value (last 6 months)
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height: "160px" }}
        >
          <BarChart
            data={orderTimelineData}
            barSize={14}
            margin={{ top: 4, right: 0, left: -28, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(v) => [
                    `$${Number(v).toLocaleString()}`,
                    "Spend",
                  ]}
                />
              }
            />
            <Bar
              dataKey="value"
              fill="var(--chart-1)"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>

        {/* Supplier breakdown */}
        <div className="mt-4 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
            By Supplier
          </p>
          {spendBreakdown.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-foreground/70"
                  style={{ width: `${(item.total / totalSpend) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium w-16 text-right truncate">
                {item.name}
              </span>
              <span className="text-xs font-semibold tabular-nums w-14 text-right">
                ${(item.total / 1000).toFixed(1)}k
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
