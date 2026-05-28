"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SupplierHero } from "@/components/suppliers/SupplierHero";
import { SupplierStat } from "@/components/suppliers/SupplierStat";
import { FullSupplierTable } from "@/components/suppliers/FullSupplierTable";
import { SupplierAlerts } from "@/components/suppliers/SupplierAlerts";
import { SupplierPerformance } from "@/components/suppliers/SupplierPerformance";
import { Building2, CheckCircle2, Clock, Star } from "lucide-react";

export default function SuppliersPage() {
  return (
    <DashboardLayout
      hero={<SupplierHero />}
      stats={
        <>
          <SupplierStat
            title="Total Suppliers"
            value="5"
            icon={Building2}
            trend="+2"
            isPositive={true}
            delay={0.1}
          />
          <SupplierStat
            title="Active"
            value="4"
            icon={CheckCircle2}
            trend="+1"
            isPositive={true}
            delay={0.2}
          />
          <SupplierStat
            title="Under Review"
            value="1"
            icon={Clock}
            trend="+1"
            isPositive={false}
            delay={0.3}
          />
          <SupplierStat
            title="Avg. Rating"
            value="4.2"
            icon={Star}
            trend="+0.3"
            isPositive={true}
            delay={0.4}
          />
        </>
      }
      sidebar={
        <>
          <SupplierAlerts />
          <SupplierPerformance />
        </>
      }
    >
      <FullSupplierTable />
    </DashboardLayout>
  );
}
