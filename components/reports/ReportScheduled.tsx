"use client";
import { motion } from "motion/react";
import {
  Clock,
  CheckCircle2,
  Loader2,
  XCircle,
  Bell,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { reportsData, ReportStatus } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

const ALERT_CONFIG: Record<
  ReportStatus,
  { icon: React.ElementType; badge: string; label: string }
> = {
  Generating: {
    icon: Loader2,
    badge: "bg-muted text-foreground border-border",
    label: "Generating",
  },
  Scheduled: {
    icon: Clock,
    badge: "bg-muted text-muted-foreground border-border",
    label: "Scheduled",
  },
  Failed: {
    icon: XCircle,
    badge:
      "bg-transparent text-muted-foreground border-dashed border-muted-foreground",
    label: "Failed",
  },
  Ready: {
    icon: CheckCircle2,
    badge: "bg-foreground text-background border-foreground",
    label: "Ready",
  },
};

export function ReportScheduled() {
  const isClient = useIsClient();

  const alerts = reportsData.filter(
    (r) =>
      r.status === "Generating" ||
      r.status === "Scheduled" ||
      r.status === "Failed",
  );

  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Bell className="w-5 h-5 text-foreground" />
          Report Queue
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
            No pending or failed reports.
          </p>
        ) : (
          alerts.map((report, idx) => {
            const cfg = ALERT_CONFIG[report.status];
            const Icon = cfg.icon;

            return (
              <motion.div
                key={report.id}
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
                  <Icon
                    className={`w-5 h-5 text-foreground ${
                      report.status === "Generating" ? "animate-spin" : ""
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug line-clamp-1">
                      {report.name}
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
                      {report.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">
                      •
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">
                      {report.nextRun
                        ? `Next: ${new Date(report.nextRun).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" },
                          )}`
                        : `By ${report.createdBy}`}
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
          Manage Queue
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
