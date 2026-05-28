"use client";
import { motion } from "motion/react";
import { AlertTriangle, CheckCircle2, Clock, Bell, ArrowRight, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { suppliersData } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

const STATUS_CONFIG = {
  "Under Review": {
    icon: AlertTriangle,
    badge: "bg-muted text-foreground border-border",
    label: "Under Review",
  },
  Inactive: {
    icon: Clock,
    badge:
      "bg-transparent text-muted-foreground border-dashed border-muted-foreground",
    label: "Inactive",
  },
} as const;

export function SupplierAlerts() {
  const isClient = useIsClient();

  const alerts = suppliersData.filter(
    (s) => s.status === "Under Review" || s.status === "Inactive"
  );

  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Bell className="w-5 h-5 text-foreground" />
          Supplier Alerts
          {alerts.length > 0 && (
            <span className="ml-auto text-xs font-semibold bg-foreground text-background px-2 py-0.5 rounded-full">
              {alerts.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            All suppliers are active and healthy.
          </p>
        ) : (
          alerts.map((supplier, idx) => {
            const cfg =
              STATUS_CONFIG[supplier.status as keyof typeof STATUS_CONFIG];
            const Icon = cfg?.icon ?? AlertTriangle;
            const badgeCls = cfg?.badge ?? "bg-muted text-foreground border-border";
            const label = cfg?.label ?? supplier.status;

            return (
              <motion.div
                key={supplier.id}
                initial={isClient ? { opacity: 0, x: 20 } : false}
                animate={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.1 }}
                className="flex gap-4 relative"
              >
                {idx !== alerts.length - 1 && (
                  <div className="absolute left-4.75 top-10 w-px h-[calc(100%-10px)] bg-border" />
                )}
                <div className="shrink-0 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center z-10">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug">
                      {supplier.name}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-[10px] shrink-0 font-medium ${badgeCls}`}
                    >
                      {label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {supplier.contactName}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">•</span>
                    <span className="text-[10px] text-muted-foreground/60">
                      {supplier.onTimeRate}% on-time
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}

        <Button
          variant="ghost"
          className="w-full text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Review All
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
