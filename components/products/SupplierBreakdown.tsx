"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Truck } from "lucide-react";
import { inventoryData } from "@/lib/mock-data";

const supplierChartConfig = {
  count: {
    label: "Products",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function SupplierBreakdown() {
  // Derive supplier counts from mock data
  const supplierMap = inventoryData.reduce<Record<string, number>>((acc, p) => {
    acc[p.supplier] = (acc[p.supplier] ?? 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(supplierMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Truck className="w-5 h-5 text-foreground" />
          Suppliers
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Products per supplier
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={supplierChartConfig}
          className="w-full"
          style={{ height: "180px" }}
        >
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="var(--border)"
              opacity={0.5}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
              width={80}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={16}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
