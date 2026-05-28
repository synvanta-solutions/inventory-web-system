"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InventoryHero } from "@/components/inventory/InventoryHero";
import { InventoryStat } from "@/components/inventory/InventoryStat";
import { FullInventoryTable } from "@/components/inventory/FullInventoryTable";
import { InventoryAlerts } from "@/components/inventory/InventoryAlerts";
import { CategoryBreakdown } from "@/components/inventory/CategoryBreakdown";
import { Package, Boxes, AlertTriangle, XCircle } from "lucide-react";

export default function InventoryPage() {
  return (
    <DashboardLayout
      hero={<InventoryHero />}
      stats={
        <>
          <InventoryStat
            title="Total SKUs"
            value="1,284"
            icon={Package}
            trend="+12%"
            isPositive={true}
            delay={0.1}
          />
          <InventoryStat
            title="Total Units"
            value="24,390"
            icon={Boxes}
            trend="+5%"
            isPositive={true}
            delay={0.2}
          />
          <InventoryStat
            title="Low Stock"
            value="12"
            icon={AlertTriangle}
            trend="+3"
            isPositive={false}
            delay={0.3}
          />
          <InventoryStat
            title="Out of Stock"
            value="4"
            icon={XCircle}
            trend="-1"
            isPositive={true}
            delay={0.4}
          />
        </>
      }
      sidebar={
        <>
          <InventoryAlerts />
          <CategoryBreakdown />
        </>
      }
    >
      <FullInventoryTable />
    </DashboardLayout>
  );
}
