"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductStat } from "@/components/products/ProductStat";
import { ProductGrid } from "@/components/products/ProductGrid";
import { TopProducts } from "@/components/products/TopProducts";
import { SupplierBreakdown } from "@/components/products/SupplierBreakdown";
import { Package, Tag, Truck, BarChart2 } from "lucide-react";

export default function ProductsPage() {
  return (
    <DashboardLayout
      hero={<ProductsHero />}
      stats={
        <>
          <ProductStat
            title="Total Products"
            value="1,284"
            icon={Package}
            trend="+12%"
            isPositive={true}
            delay={0.1}
          />
          <ProductStat
            title="Categories"
            value="4"
            icon={Tag}
            trend="+1"
            isPositive={true}
            delay={0.2}
          />
          <ProductStat
            title="Suppliers"
            value="5"
            icon={Truck}
            trend="0"
            isPositive={true}
            delay={0.3}
          />
          <ProductStat
            title="Avg. Stock"
            value="203"
            icon={BarChart2}
            trend="+8%"
            isPositive={true}
            delay={0.4}
          />
        </>
      }
      sidebar={
        <>
          <TopProducts />
          <SupplierBreakdown />
        </>
      }
    >
      <ProductGrid />
    </DashboardLayout>
  );
}
