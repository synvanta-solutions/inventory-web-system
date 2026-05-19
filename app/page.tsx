"use client";
// import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/dashboard/Hero";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { InventoryTable } from "@/components/dashboard/InventoryTable";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Package, AlertCircle, ShoppingBag, DollarSign } from "lucide-react";

export default function Main() {
  return (
    <div className="min-h-screen bg-color-background selection:bg-primary/20">
      {/* <Navbar /> */}
      <main className="mx-auto px-3 sm:px-4 lg:px-6 pb-20">
        <Hero />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
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
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <AnalyticsCharts />
            <InventoryTable />
          </div>
          <div className="lg:col-span-1 pt-8">
            <RecentActivity />
          </div>
        </div>
      </main>
      <div className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-foreground/3 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-foreground/2 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
