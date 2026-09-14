'use client';

import React from 'react';
import Link from 'next/link';

import { DashboardFilterBar } from '@/components/dashboard/DashboardFilterBar';
import { StatCards } from '@/components/dashboard/StatCards';
import { HseReviewQueue } from '@/components/dashboard/HseReviewQueue';
import { RecentReportsTable } from '@/components/dashboard/RecentReportsTable';
import { RecentHighRiskReports } from '@/components/dashboard/RecentHighRiskReports';
import { SifTrendChart } from '@/components/dashboard/SifTrendChart';
import { TopPrecursorsChart } from '@/components/dashboard/TopPrecursorsChart';
import { LsrDistributionChart } from '@/components/dashboard/LsrDistributionChart';
import { SiteHeatMap } from '@/components/dashboard/SiteHeatMap';

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Industrial Editorial Navy Header */}
      <header className="relative w-full navy-header-gradient overflow-hidden rounded-md border border-[#102F3E]">
        {/* Geometric square accents */}
        <div
          className="absolute top-3 right-4 flex items-center gap-1 z-10"
          aria-hidden="true"
        >
          <span className="block w-2.5 h-2.5 bg-[#C92925]" />
          <span className="block w-2 h-2 bg-white" />
          <span className="block w-1.5 h-1.5 bg-[#C92925]" />
        </div>

        <div
          className="absolute bottom-3 right-4 flex items-center gap-1 z-10"
          aria-hidden="true"
        >
          <span className="block w-1.5 h-1.5 bg-white/60" />
          <span className="block w-2 h-2 bg-[#C92925]" />
        </div>

        {/* Header Content */}
        <div className="relative z-10 px-6 py-6 sm:px-8 sm:py-7 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#C92925] mb-2">
              OIL INDIA&ensp;|&ensp;HSE MONITORING
            </p>

            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-snug mb-2">
              Operational Safety Overview
            </h1>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-normal mb-3">
              SIF precursor screening across safety observations, near misses,
              and incident reports.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#A0AEC0] font-medium tracking-wide uppercase">
              <span>Reporting period: Current selection</span>
              <span className="hidden sm:inline text-[#4A5568]">•</span>
              <span>Prototype data — workflow demonstration</span>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/analyzer"
              className="inline-flex items-center justify-center btn-primary-red text-white text-xs font-bold tracking-wider uppercase px-5 py-2.5 transition-all duration-150 rounded-[4px]"
            >
              SCREEN A REPORT
            </Link>
          </div>
        </div>

        {/* Bottom rule accent */}
        <div className="h-[3px] w-full flex" aria-hidden="true">
          <div
            className="h-full bg-[#C92925]"
            style={{ width: '35%' }}
          />
          <div
            className="h-full bg-white/20"
            style={{ width: '65%' }}
          />
        </div>
      </header>

      {/* Filters */}
      <div>
        <DashboardFilterBar />
      </div>

      {/* Key Safety Metrics */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
          Safety Performance Summary
        </h2>

        <StatCards />
      </section>

      {/* Main Dashboard Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column */}
        <div className="min-w-0 lg:col-span-7 flex flex-col gap-6">
          <HseReviewQueue />

          <SifTrendChart />
        </div>

        {/* Secondary Column */}
        <div className="min-w-0 lg:col-span-5 flex flex-col gap-6">
          <TopPrecursorsChart />

          <LsrDistributionChart />
        </div>
      </div>

      {/* Operational Safety Reports */}
      <section className="space-y-3 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
            Operational Safety Log &amp; Incident Register
          </h2>
        </div>

        <RecentReportsTable />
      </section>

      {/* Operational Risk Heatmap & High-Risk Incidents */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <RecentHighRiskReports />
        </div>

        <div className="min-w-0 lg:col-span-5">
          <SiteHeatMap />
        </div>
      </section>
    </div>
  );
}