"use client";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  ChevronDown,
  ExternalLink,
  Package,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ordersData } from "@/lib/mock-data";
import type { OrderStatus } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  Pending: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-muted text-muted-foreground border-border",
  },
  Processing: {
    label: "Processing",
    icon: Loader2,
    className:
      "bg-muted text-foreground border-border",
  },
  Shipped: {
    label: "Shipped",
    icon: Truck,
    className:
      "bg-foreground/10 text-foreground border-foreground/20",
  },
  Delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    className:
      "bg-foreground text-background border-foreground",
  },
  Cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "bg-transparent text-muted-foreground border-dashed border-muted-foreground",
  },
};

const PRIORITY_CONFIG = {
  Low: "text-muted-foreground",
  Medium: "text-foreground/70",
  High: "text-foreground font-semibold",
  Urgent: "text-foreground font-bold underline decoration-dotted",
};

const ALL_STATUSES: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export function FullOrderTable() {
  const isClient = useIsClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [sortField, setSortField] = useState<"orderDate" | "totalAmount">(
    "orderDate"
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const toggleSort = (field: "orderDate" | "totalAmount") => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = ordersData
    .filter((o) => {
      const q = search.toLowerCase();
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(q) ||
        o.supplier.toLowerCase().includes(q) ||
        o.items.some((i) => i.productName.toLowerCase().includes(q));
      const matchesStatus =
        statusFilter === "All" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === "orderDate") {
        const diff =
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        return sortDir === "asc" ? diff : -diff;
      }
      const diff = a.totalAmount - b.totalAmount;
      return sortDir === "asc" ? diff : -diff;
    });

  return (
    <Card className="border-none shadow-sm glass rounded-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Package className="w-5 h-5" />
            All Orders
            <span className="ml-1 text-xs font-semibold bg-foreground text-background px-2 py-0.5 rounded-full">
              {ordersData.length}
            </span>
          </CardTitle>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search orders…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 text-sm bg-muted/40 border-border rounded-xl w-44 focus-visible:ring-1"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-xl border-border text-xs font-medium gap-1.5"
                >
                  {statusFilter === "All" ? "All Statuses" : statusFilter}
                  <ChevronDown className="w-3.5 h-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                  All Statuses
                </DropdownMenuItem>
                {ALL_STATUSES.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => setStatusFilter(s)}
                  >
                    {s}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border">
          <span>Order</span>
          <span>Supplier / Items</span>
          <button
            onClick={() => toggleSort("orderDate")}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            Date <ArrowUpDown className="w-3 h-3" />
          </button>
          <button
            onClick={() => toggleSort("totalAmount")}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            Amount <ArrowUpDown className="w-3 h-3" />
          </button>
          <span>Status</span>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">
            No orders match your filters.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((order, idx) => {
              const cfg = STATUS_CONFIG[order.status];
              const StatusIcon = cfg.icon;
              const priorityCls =
                PRIORITY_CONFIG[order.priority] ?? "text-foreground";

              return (
                <motion.div
                  key={order.id}
                  initial={isClient ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.04 * idx }}
                  className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-6 py-4 items-center hover:bg-muted/30 transition-colors group"
                >
                  {/* Order number + priority */}
                  <div className="min-w-0">
                    <p className="text-sm font-bold tabular-nums">
                      {order.orderNumber}
                    </p>
                    <p className={`text-xs mt-0.5 ${priorityCls}`}>
                      {order.priority} priority
                    </p>
                  </div>

                  {/* Supplier + item summary */}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {order.supplier}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {order.items.length === 1
                        ? order.items[0].productName
                        : `${order.items.length} items`}{" "}
                      ·{" "}
                      {order.items.reduce((s, i) => s + i.quantity, 0)} units
                    </p>
                  </div>

                  {/* Date */}
                  <div className="text-right">
                    <p className="text-xs font-medium tabular-nums text-foreground">
                      {new Date(order.orderDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {new Date(order.expectedDelivery).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}{" "}
                      ETA
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className="text-sm font-bold tabular-nums">
                      ${order.totalAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {order.currency}
                    </p>
                  </div>

                  {/* Status + action */}
                  <div className="flex items-center gap-2 justify-end">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold flex items-center gap-1 shrink-0 ${cfg.className}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {cfg.label}
                    </Badge>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-muted">
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
