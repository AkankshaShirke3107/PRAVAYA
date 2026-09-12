'use client';

import React from 'react';
import { DashboardFilterBar } from '@/components/dashboard/DashboardFilterBar';
import { StatCards } from '@/components/dashboard/StatCards';
import { SifTrendChart } from '@/components/dashboard/SifTrendChart';
import { TopPrecursorsChart } from '@/components/dashboard/TopPrecursorsChart';
import { LsrDistributionChart } from '@/components/dashboard/LsrDistributionChart';
import { RecentHighRiskReports } from '@/components/dashboard/RecentHighRiskReports';
import { RecentReportsTable } from '@/components/dashboard/RecentReportsTable';
import { SiteHeatMap } from '@/components/dashboard/SiteHeatMap';

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Filter Bar above the stat cards */}
      <DashboardFilterBar />

      {/* Top Section: 4 Key Safety Metrics Stat Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[#1e293b] dark:text-slate-100 sm:text-xl">
              Operational Safety Overview
            </h2>
            <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
              Key safety metrics and real-time SIF precursor distribution across assets
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center rounded-md bg-white dark:bg-card border border-[#e2e8f0] dark:border-border px-3 py-1 text-xs font-medium text-[#64748b]">
            Current Period: May 2026
          </span>
        </div>

        <StatCards />
      </section>

      {/* Charts Section 1 (Side by Side: 60% Left, 40% Right) */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Chart 1 (Left - 60% width): SIF Trend Over Time */}
        <div className="lg:col-span-3">
          <SifTrendChart />
        </div>

        {/* Chart 2 (Right - 40% width): Top SIF Precursors */}
        <div className="lg:col-span-2">
          <TopPrecursorsChart />
        </div>
      </section>

      {/* Charts Section 2 (Side by Side: 50% Left, 50% Right) */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Chart 3 (Left - 50% width): Life-Saving Rule Distribution */}
        <div className="h-full">
          <LsrDistributionChart />
        </div>

        {/* Chart 4 (Right - 50% width): Recent High-Risk Reports */}
        <div className="h-full">
          <RecentHighRiskReports />
        </div>
      </section>

      {/* Lower Section: Recent Reports & Operational Site Heat Map */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RecentReportsTable />
        </div>
        <div className="lg:col-span-4">
          <SiteHeatMap />
        </div>
      </section>
    </div>
  );
}
