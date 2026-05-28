"use client";
import {
  LineChart,
  Line,
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
import { TrendingUp } from "lucide-react";
import { kpiTrendData } from "@/lib/mock-data";

const chartConfig = {
  onTimeRate: { label: "On-Time Rate (%)", color: "var(--chart-1)" },
} satisfies ChartConfig;

// Summary KPI deltas
const latest = kpiTrendData[kpiTrendData.length - 1];
const prev = kpiTrendData[kpiTrendData.length - 2];

const kpis = [
  {
    label: "Inventory Value",
    value: `$${(latest.inventoryValue / 1000).toFixed(0)}k`,
    delta: `+${(
      ((latest.inventoryValue - prev.inventoryValue) / prev.inventoryValue) *
      100
    ).toFixed(1)}%`,
    positive: latest.inventoryValue >= prev.inventoryValue,
  },
  {
    label: "Orders Placed",
    value: String(latest.ordersPlaced),
    delta: `${latest.ordersPlaced >= prev.ordersPlaced ? "+" : ""}${
      latest.ordersPlaced - prev.ordersPlaced
    }`,
    positive: latest.ordersPlaced >= prev.ordersPlaced,
  },
  {
    label: "Stockouts",
    value: String(latest.stockouts),
    delta: `${latest.stockouts <= prev.stockouts ? "-" : "+"}${Math.abs(
      latest.stockouts - prev.stockouts,
    )}`,
    positive: latest.stockouts <= prev.stockouts,
  },
];

export function ReportTrends() {
  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-foreground" />
          KPI Trends
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          On-time rate — last 6 months
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height: "140px" }}
        >
          <LineChart
            data={kpiTrendData}
            margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[80, 100]}
              tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(v) => [`${v}%`, "On-Time Rate"]}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="onTimeRate"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--chart-1)" }}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>

        {/* KPI summary rows */}
        <div className="mt-4 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Month-over-Month
          </p>
          {kpis.map((kpi) => (
            <div key={kpi.label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tabular-nums">
                  {kpi.value}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${
                    kpi.positive
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {kpi.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
