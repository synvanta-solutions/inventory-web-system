"use client";
import { motion } from "motion/react";
import {
  Package,
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { activityData } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

const getIcon = (type: string) => {
  switch (type) {
    case "shipment":
      return { icon: Package, color: "text-foreground", bg: "bg-muted" };
    case "alert":
      return { icon: AlertCircle, color: "text-foreground", bg: "bg-muted" };
    case "supplier":
      return { icon: RefreshCw, color: "text-foreground", bg: "bg-muted" };
    case "order":
      return { icon: ShoppingBag, color: "text-foreground", bg: "bg-muted" };
    default:
      return { icon: Clock, color: "text-muted-foreground", bg: "bg-muted" };
  }
};

export function RecentActivity() {
  const isClient = useIsClient();

  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-foreground" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activityData.map((activity, idx) => {
          const { icon: Icon, color, bg } = getIcon(activity.type);
          return (
            <motion.div
              key={activity.id}
              initial={isClient ? { opacity: 0, x: 20 } : false}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + idx * 0.1 }}
              className="flex gap-4 relative"
            >
              {idx !== activityData.length - 1 && (
                <div className="absolute left-4.75 top-10 w-px h-[calc(100%-10px)] bg-border" />
              )}
              <div
                className={`shrink-0 w-10 h-10 rounded-full ${bg} border border-border flex items-center justify-center z-10`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-relaxed">
                  {activity.message}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {activity.user}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">
                    •
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
        <Button
          variant="ghost"
          className="w-full text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          View full history
        </Button>
      </CardContent>
    </Card>
  );
}
