'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  LayoutDashboard,
  FileText,
  Sparkles,
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
        <div className="w-[450px] h-[450px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        {/* Animated Badge & Icon */}
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-xs">
          <AlertTriangle className="h-10 w-10 text-amber-500 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            HTTP 404 • Resource Not Found
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1e293b] dark:text-slate-100">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The safety observation report, telemetry stream, or analytical dashboard resource you are looking for does not exist or may have been archived.
          </p>
        </div>

        {/* Quick Route Cards */}
        <Card className="border border-[#e2e8f0] bg-white/95 dark:bg-card/95 dark:border-border shadow-md backdrop-blur-sm text-left">
          <CardContent className="p-4 sm:p-5 space-y-3">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
              Quick Navigation Shortcuts
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 p-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all group"
              >
                <div className="p-2 rounded-md bg-sky-500/10 text-sky-500 group-hover:scale-105 transition-transform">
                  <LayoutDashboard className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-foreground group-hover:text-sky-500 block truncate">
                    Dashboard
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate block">
                    Operational Overview
                  </span>
                </div>
              </Link>

              <Link
                href="/reports"
                className="flex items-center gap-2.5 p-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all group"
              >
                <div className="p-2 rounded-md bg-indigo-500/10 text-indigo-500 group-hover:scale-105 transition-transform">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-foreground group-hover:text-sky-500 block truncate">
                    SIF Reports
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate block">
                    75 Audited Records
                  </span>
                </div>
              </Link>

              <Link
                href="/analyzer"
                className="flex items-center gap-2.5 p-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all group"
              >
                <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-foreground group-hover:text-sky-500 block truncate">
                    Report Analyzer
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate block">
                    Live AI Inference
                  </span>
                </div>
              </Link>

              <Link
                href="/patterns"
                className="flex items-center gap-2.5 p-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all group"
              >
                <div className="p-2 rounded-md bg-amber-500/10 text-amber-500 group-hover:scale-105 transition-transform">
                  <Shield className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-foreground group-hover:text-sky-500 block truncate">
                    Patterns &amp; Trends
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate block">
                    Risk Heatmaps &amp; LSR
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
            className="h-9 px-5 text-xs font-semibold gap-1.5 shadow-xs w-full sm:w-auto"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Return to Dashboard
            </Link>
          </Button>
        </div>

        {/* Footer info note */}
        <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Oil India Limited • SIF Precursor Detection System (SIH26165)</span>
        </div>
      </div>
    </div>
  );
}
