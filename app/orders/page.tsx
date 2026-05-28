"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OrderHero } from "@/components/orders/OrderHero";
import { OrderStat } from "@/components/orders/OrderStat";
import { FullOrderTable } from "@/components/orders/FullOrderTable";
import { OrderAlerts } from "@/components/orders/OrderAlerts";
import { OrderSpend } from "@/components/orders/OrderSpend";
import { ShoppingCart, Clock, Truck, DollarSign } from "lucide-react";

export default function OrdersPage() {
  return (
    <DashboardLayout
      hero={<OrderHero />}
      stats={
        <>
          <OrderStat
            title="Total Orders"
            value="6"
            icon={ShoppingCart}
            trend="+3"
            isPositive={true}
            delay={0.1}
          />
          <OrderStat
            title="Pending"
            value="1"
            icon={Clock}
            trend="+1"
            isPositive={false}
            delay={0.2}
          />
          <OrderStat
            title="In Transit"
            value="1"
            icon={Truck}
            trend="0"
            isPositive={true}
            delay={0.3}
          />
          <OrderStat
            title="Total Spend"
            value="$34k"
            icon={DollarSign}
            trend="+12%"
            isPositive={true}
            delay={0.4}
          />
        </>
      }
      sidebar={
        <>
          <OrderAlerts />
          <OrderSpend />
        </>
      }
    >
      <FullOrderTable />
    </DashboardLayout>
  );
}
