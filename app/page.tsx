"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Hero } from "@/components/dashboard/Hero";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { InventoryTable } from "@/components/dashboard/InventoryTable";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Package, AlertCircle, ShoppingBag, DollarSign } from "lucide-react";

export default function Main() {
  return (
    <DashboardLayout
      hero={<Hero />}
      stats={
        <>
          <StatsCard
            title="Total Products"
            value="1,284"
            icon={Package}
            trend="+12%"
            isPositive={true}
            delay={0.1}
          />
          <StatsCard
            title="Low Stock Items"
            value="12"
            icon={AlertCircle}
            trend="-2"
            isPositive={false}
            delay={0.2}
          />
          <StatsCard
            title="Pending Orders"
            value="43"
            icon={ShoppingBag}
            trend="+8%"
            isPositive={true}
            delay={0.3}
          />
          <StatsCard
            title="Monthly Revenue"
            value="$124.5k"
            icon={DollarSign}
            trend="+15%"
            isPositive={true}
            delay={0.4}
          />
        </>
      }
      sidebar={<RecentActivity />}
    >
      <AnalyticsCharts />
      <InventoryTable />
    </DashboardLayout>
  );
}
