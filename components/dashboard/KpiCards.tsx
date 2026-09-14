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
      iconBg: 'bg-[#102F3E]/8 text-[#102F3E] border border-[#102F3E]/15 dark:bg-[#2F6B84]/15 dark:text-[#60A5FA] dark:border-[#2F6B84]/20',
    },
    {
      title: 'SIF Potential Reports',
      value: '342',
      change: '+18.7% vs last 28 days',
      isPositive: false,
      subtext: '14.6% of total reports',
      icon: AlertTriangle,
      iconBg: 'bg-[#D97706]/8 text-[#D97706] border border-[#D97706]/20 dark:bg-[#D97706]/12',
    },
    {
      title: 'High SIF Potential',
      value: '98',
      change: '-2.3% vs last 28 days',
      isPositive: true,
      subtext: '28.7% of SIF reports',
      icon: Flame,
      iconBg: 'bg-[#C92925]/8 text-[#C92925] border border-[#C92925]/20 dark:bg-[#C92925]/12',
    },
    {
      title: 'Top Precursor',
      value: 'Improper Isolation',
      isStringValue: true,
      change: '18.6% of SIF events',
      isNeutral: true,
      subtext: '64 critical incidents',
      icon: Zap,
      iconBg: 'bg-[#D97706]/8 text-[#D97706] border border-[#D97706]/20 dark:bg-[#D97706]/12',
    },
    {
      title: 'Reports → LSR',
      value: '1,876',
      change: '80.2% of total',
      isNeutral: true,
      subtext: 'Oil India Life-Saving Rules',
      icon: ShieldCheck,
      iconBg: 'bg-[#2E7D32]/8 text-[#2E7D32] border border-[#2E7D32]/20 dark:bg-[#2E7D32]/12 dark:text-[#4ADE80]',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;

        return (
          <Card
            key={idx}
            className="overflow-hidden border-border shadow-none transition-colors hover:border-[#102F3E]/30 dark:hover:border-[#2F6B84]/40 group"
          >
            <CardContent className="p-3.5">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {kpi.title}
                  </p>

                  <p
                    className={
                      kpi.isStringValue
                        ? 'text-xs font-semibold text-foreground mt-1 truncate max-w-[130px]'
                        : 'text-xl font-bold text-foreground mt-1 font-mono tabular-nums tracking-tight'
                    }
                    title={kpi.value}
                  >
                    {kpi.value}
                  </p>
                </div>

                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] ${kpi.iconBg}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-border text-[11px]">
                <span
                  className={`flex items-center font-medium ${kpi.isNeutral
                      ? 'text-muted-foreground'
                      : kpi.isPositive
                        ? 'text-[#2E7D32] dark:text-[#4ADE80]'
                        : 'text-[#C92925] dark:text-[#F87171]'
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