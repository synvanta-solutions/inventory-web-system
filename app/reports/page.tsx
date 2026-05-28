"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportHero } from "@/components/reports/ReportHero";
import { ReportStat } from "@/components/reports/ReportStat";
import { ReportTable } from "@/components/reports/ReportTable";
import { ReportScheduled } from "@/components/reports/ReportScheduled";
import { ReportTrends } from "@/components/reports/ReportTrends";
import { FileText, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function ReportsPage() {
  return (
    <DashboardLayout
      hero={<ReportHero />}
      stats={
        <>
          <ReportStat
            title="Total Reports"
            value="7"
            icon={FileText}
            trend="+3"
            isPositive={true}
            delay={0.1}
          />
          <ReportStat
            title="Ready"
            value="4"
            icon={CheckCircle2}
            trend="+2"
            isPositive={true}
            delay={0.2}
          />
          <ReportStat
            title="Scheduled"
            value="1"
            icon={Clock}
            trend="0"
            isPositive={true}
            delay={0.3}
          />
          <ReportStat
            title="Failed"
            value="1"
            icon={XCircle}
            trend="+1"
            isPositive={false}
            delay={0.4}
          />
        </>
      }
      sidebar={
        <>
          <ReportScheduled />
          <ReportTrends />
        </>
      }
    >
      <ReportTable />
    </DashboardLayout>
  );
}
