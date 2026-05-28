"use client";
import { motion } from "motion/react";
import { Medal, ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { inventoryData } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

const RANK_STYLES = [
  "bg-foreground text-background",
  "bg-muted text-foreground border border-border",
  "bg-muted text-muted-foreground border border-border",
];

export function TopProducts() {
  const isClient = useIsClient();

  const ranked = [...inventoryData]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 4);

  return (
    <Card className="border-none shadow-sm glass rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Star className="w-5 h-5 text-foreground" />
          Top Products
        </CardTitle>
        <p className="text-sm text-muted-foreground">Highest stock by quantity</p>
      </CardHeader>
      <CardContent className="space-y-5">
        {ranked.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={isClient ? { opacity: 0, x: 20 } : false}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 + idx * 0.1 }}
            className="flex gap-3 items-center relative"
          >
            {idx !== ranked.length - 1 && (
              <div className="absolute left-4 top-10 w-px h-[calc(100%-6px)] bg-border" />
            )}

            {/* Rank badge */}
            <div
              className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                RANK_STYLES[idx] ?? "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {idx === 0 ? <Medal className="w-3.5 h-3.5" /> : idx + 1}
            </div>

            {/* Product thumbnail */}
            <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-border bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-snug truncate">
                {product.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge
                  variant="outline"
                  className="font-normal border-border bg-muted/30 text-[10px] px-1.5"
                >
                  {product.category}
                </Badge>
                <span className="text-[10px] text-muted-foreground">
                  {product.sku}
                </span>
              </div>
            </div>

            {/* Qty */}
            <div className="text-right shrink-0">
              <p className="text-sm font-bold tabular-nums">
                {product.quantity.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">units</p>
            </div>
          </motion.div>
        ))}

        <Button
          variant="ghost"
          className="w-full text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary gap-1.5"
        >
          View full report
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
