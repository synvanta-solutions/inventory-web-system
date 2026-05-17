"use client";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useIsClient } from "@/hooks/useIsClient";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  isPositive: boolean;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  isPositive,
  delay = 0,
}: StatsCardProps) {
  const isClient = useIsClient();

  return (
    <motion.div
      initial={isClient ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="group border-none shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 rounded-2xl overflow-hidden glass">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                {title}
              </p>
              <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            </div>
            <div
              className={`p-3 rounded-xl bg-muted/50 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className={`w-6 h-6 text-foreground`} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg border border-border`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trend}
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              vs last month
            </p>
          </div>

          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-20 h-20 bg-foreground/5 rounded-full blur-xl -mr-10 -mt-10" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
