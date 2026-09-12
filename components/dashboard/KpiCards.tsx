'use client';

import React from 'react';
import {
  FileText,
  AlertTriangle,
  Flame,
  Zap,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function KpiCards() {
  const kpis = [
    {
      title: 'Total Reports',
      value: '2,348',
      change: '+12.4% vs last 28 days',
      isPositive: true,
      subtext: 'UA, UC & Near Miss',
      icon: FileText,
      iconBg: 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20',
    },
    {
      title: 'SIF Potential Reports',
      value: '342',
      change: '+18.7% vs last 28 days',
      isPositive: false, // High SIF increase is bad
      subtext: '14.6% of total reports',
      icon: AlertTriangle,
      iconBg: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
    },
    {
      title: 'High SIF Potential',
      value: '98',
      change: '-2.3% vs last 28 days',
      isPositive: true, // decrease in high SIF is good
      subtext: '28.7% of SIF reports',
      icon: Flame,
      iconBg: 'bg-rose-500/10 text-rose-500 border border-rose-500/20',
    },
    {
      title: 'Top Precursor / Hazard',
      value: 'Improper Isolation',
      isStringValue: true,
      change: '18.6% of SIF events',
      isNeutral: true,
      subtext: '64 critical incidents',
      icon: Zap,
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    },
    {
      title: 'Reports Mapped to LSR',
      value: '1,876',
      change: '80.2% of total reports',
      isNeutral: true,
      subtext: 'Oil India Life-Saving Rules',
      icon: ShieldCheck,
      iconBg: 'bg-sky-500/10 text-sky-500 border border-sky-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <Card
            key={idx}
            className="overflow-hidden border bg-card/90 shadow-sm transition-all hover:shadow-md hover:border-sky-500/30 group"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    {kpi.title}
                  </p>
                  <h3
                    className={
                      kpi.isStringValue
                        ? 'text-sm font-bold text-foreground mt-1 truncate max-w-[140px]'
                        : 'text-2xl font-black text-foreground mt-1 font-mono tracking-tight'
                    }
                    title={kpi.value}
                  >
                    {kpi.value}
                  </h3>
                </div>

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${kpi.iconBg} transition-transform group-hover:scale-105`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/50 text-[11px]">
                <span
                  className={`flex items-center font-medium ${
                    kpi.isNeutral
                      ? 'text-sky-500'
                      : kpi.isPositive
                      ? 'text-emerald-500'
                      : 'text-rose-500'
                  }`}
                >
                  {!kpi.isNeutral &&
                    (kpi.isPositive ? (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ))}
                  {kpi.change}
                </span>
                <span className="text-[10px] text-muted-foreground truncate ml-1">
                  {kpi.subtext}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
