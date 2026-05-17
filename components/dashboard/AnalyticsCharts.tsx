import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { chartData, categoryData } from "@/lib/mock-data";

const inventoryChartConfig = {
  movement: {
    label: "Movement",
    color: "var(--chart-1)",
  },
  sales: {
    label: "Sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const categoryChartConfig = {
  value: {
    label: "Value",
  },
} satisfies ChartConfig;

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
      {/* Inventory Movement */}
      <Card className="lg:col-span-2 border-none shadow-sm glass rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">
            Inventory Movement
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Weekly tracking of stock incoming and outgoing
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={inventoryChartConfig}
            className="w-full"
            style={{ height: "260px" }}
          >
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMovement" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.18}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.18}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
                opacity={0.5}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="movement"
                stroke="var(--chart-1)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorMovement)"
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="var(--chart-2)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Category Split */}
      <Card className="border-none shadow-sm glass rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Category Split</CardTitle>
          <p className="text-sm text-muted-foreground">
            Product distribution by sector
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={categoryChartConfig}
            className="w-full"
            style={{ height: "200px" }}
          >
            <PieChart width={300} height={200}>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                isAnimationActive={false}
              >
                {categoryData.map((entry, index) => (
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
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {categoryData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-xs text-muted-foreground font-medium">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
