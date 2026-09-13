'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  LayoutDashboard,
  FileText,
  FileSearch,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#060913] flex flex-col items-center justify-center p-4 sm:p-6 text-foreground">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="absolute w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#C92925]/10 border border-[#C92925]/20">
            <AlertTriangle className="h-8 w-8 text-[#C92925]" />
          </div>
        </div>

        {/* Error Information */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#E4E7EC] px-3 py-1 text-xs font-mono font-bold text-[#17202A]">
            HTTP 404 • Resource Not Found
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17202A] dark:text-white">
            Page Not Found
          </h1>

          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
            The safety observation report, telemetry stream, or analytical
            dashboard resource you are looking for does not exist or may have
            been archived.
          </p>
        </div>

        {/* Quick Route Cards */}
        <Card className="border border-[#E4E7EC] dark:border-slate-700 bg-white dark:bg-slate-900 shadow-none text-left rounded-[2px]">
          <CardContent className="p-4 sm:p-5 space-y-3">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block">
              Quick Navigation Shortcuts
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Dashboard */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 p-3 rounded-[2px] border border-[#E4E7EC] dark:border-slate-700 bg-[#F5F6F8] dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 hover:border-[#102F3E] transition-all group"
              >
                <div className="p-2 rounded-[2px] bg-sky-500/10 text-sky-600">
                  <LayoutDashboard className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#17202A] dark:text-white group-hover:text-[#102F3E] block truncate">
                    Dashboard
                  </span>
                  <span className="text-[10px] text-[#667085] dark:text-slate-400 truncate block">
                    Operational Overview
                  </span>
                </div>
              </Link>

              {/* Reports */}
              <Link
                href="/reports"
                className="flex items-center gap-2.5 p-3 rounded-[2px] border border-[#E4E7EC] dark:border-slate-700 bg-[#F5F6F8] dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 hover:border-[#102F3E] transition-all group"
              >
                <div className="p-2 rounded-[2px] bg-indigo-500/10 text-indigo-600">
                  <FileText className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#17202A] dark:text-white group-hover:text-[#102F3E] block truncate">
                    SIF Reports
                  </span>
                  <span className="text-[10px] text-[#667085] dark:text-slate-400 truncate block">
                    Incident Records
                  </span>
                </div>
              </Link>

              {/* Analyzer */}
              <Link
                href="/analyzer"
                className="flex items-center gap-2.5 p-3 rounded-[2px] border border-[#E4E7EC] dark:border-slate-700 bg-[#F5F6F8] dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 hover:border-[#102F3E] transition-all group"
              >
                <div className="p-2 rounded-[2px] bg-emerald-500/10 text-emerald-600">
                  <FileSearch className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#17202A] dark:text-white group-hover:text-[#102F3E] block truncate">
                    SIF Screening
                  </span>
                  <span className="text-[10px] text-[#667085] dark:text-slate-400 truncate block">
                    Precursor Analysis
                  </span>
                </div>
              </Link>

              {/* Patterns */}
              <Link
                href="/patterns"
                className="flex items-center gap-2.5 p-3 rounded-[2px] border border-[#E4E7EC] dark:border-slate-700 bg-[#F5F6F8] dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 hover:border-[#102F3E] transition-all group"
              >
                <div className="p-2 rounded-[2px] bg-[#D97706]/10 text-[#D97706] group-hover:scale-105 transition-transform">
                  <Shield className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#17202A] dark:text-white group-hover:text-[#102F3E] block truncate">
                    Patterns &amp; Trends
                  </span>
                  <span className="text-[10px] text-[#667085] dark:text-slate-400 truncate block">
                    Safety Intelligence
                  </span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="h-9 px-4 text-xs gap-1.5 w-full sm:w-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Go Back
          </Button>

          <Button
            asChild
            variant="default"
            size="sm"
            className="h-9 px-5 text-xs font-semibold gap-1.5 shadow-none w-full sm:w-auto"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Return to Dashboard
            </Link>
          </Button>
        </div>

        {/* Help */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#667085] dark:text-slate-500">
          <HelpCircle className="h-3 w-3" />
          <span>
            If you believe this is an error, contact your system administrator.
          </span>
        </div>
      </div>
    </div>
  );
}