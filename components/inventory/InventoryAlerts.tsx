"use client";
import { motion } from "motion/react";
import {
  AlertTriangle,
  XCircle,
  PackagePlus,
  ArrowRight,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { inventoryData } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

const ALERT_CONFIG = {
  "Low Stock": {
    icon: AlertTriangle,
    badge: "bg-muted text-foreground border-border",
    label: "Low Stock",
  },
  "Out of Stock": {
    icon: XCircle,
    badge:
      "bg-transparent text-muted-foreground border-dashed border-muted-foreground",
    label: "Out of Stock",
  },
} as const;

export function InventoryAlerts() {
  const isClient = useIsClient();

  const alerts = inventoryData.filter(
    (p) => p.status === "Low Stock" || p.status === "Out of Stock",
  );

  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Bell className="w-5 h-5 text-foreground" />
          Stock Alerts
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
            All items are sufficiently stocked.
          </p>
        ) : (
          alerts.map((product, idx) => {
            const cfg =
              ALERT_CONFIG[product.status as keyof typeof ALERT_CONFIG];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={product.id}
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
                      {product.name}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-[10px] shrink-0 font-medium ${cfg.badge}`}
                    >
                      {cfg.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {product.supplier}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">
                      •
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">
                      {product.quantity} units left
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
          <PackagePlus className="w-3.5 h-3.5" />
          Order Restock
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
