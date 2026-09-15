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
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Operational Page Header — navy gradient, locked layout */}
      <header className="relative w-full navy-header-gradient overflow-hidden border border-[#102F3E]/60">
        {/* Corner accents — brand identity, not decoration */}
        <div
          className="absolute top-3 right-4 flex items-center gap-1 z-10"
          aria-hidden="true"
        >
          <span className="block w-2 h-2 bg-[#C92925]" />
          <span className="block w-1.5 h-1.5 bg-white/70" />
        </div>

        {/* Header Content */}
        <div className="relative z-10 px-5 py-5 sm:px-7 sm:py-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#C92925] mb-1.5">
              PRAVAYA&ensp;|&ensp;HSE INTELLIGENCE
            </p>

            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug mb-1.5">
              Operational Safety Overview
            </h1>

            <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
              SIF precursor screening across safety observations, near misses, and incident reports.
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#A0AEC0] font-medium tracking-wide uppercase mt-2.5">
              <span>SIH 2026</span>
              <span className="hidden sm:inline text-[#4A5568]">·</span>
              <span>PRAVAYA demonstration</span>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/analyzer"
              className="btn-primary-red inline-flex items-center justify-center text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-[2px] transition-all duration-150"
            >
              Screen a Report
            </Link>
          </div>
        </div>

        {/* Bottom rule — brand accent bar */}
        <div className="h-[2px] w-full flex" aria-hidden="true">
          <div className="h-full bg-[#C92925]" style={{ width: '30%' }} />
          <div className="h-full bg-white/15" style={{ width: '70%' }} />
        </div>
      </header>

      {/* Filters */}
      <DashboardFilterBar />

      {/* Key Safety Metrics */}
      <section className="space-y-2.5">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Safety Performance Summary
        </h2>
        <StatCards />
      </section>

      {/* Main Dashboard Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Column */}
        <div className="min-w-0 lg:col-span-7 flex flex-col gap-5">
          <HseReviewQueue />
          <SifTrendChart />
        </div>

        {/* Secondary Column */}
        <div className="min-w-0 lg:col-span-5 flex flex-col gap-5">
          <TopPrecursorsChart />
          <LsrDistributionChart />
        </div>
      </div>

      {/* Operational Safety Reports */}
      <section className="space-y-2.5 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Operational Safety Log &amp; Incident Register
          </h2>
        </div>
        <RecentReportsTable />
      </section>

      {/* Risk Heatmap & High-Risk Incidents */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
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