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
      iconBg:
        'bg-[#102F3E]/10 text-[#102F3E] border border-[#102F3E]/20',
    },
    {
      title: 'SIF Potential Reports',
      value: '342',
      change: '+18.7% vs last 28 days',
      isPositive: false, // High SIF increase is bad
      subtext: '14.6% of total reports',
      icon: AlertTriangle,
      iconBg:
        'bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/25',
    },
    {
      title: 'High SIF Potential',
      value: '98',
      change: '-2.3% vs last 28 days',
      isPositive: true, // Decrease in high SIF is good
      subtext: '28.7% of SIF reports',
      icon: Flame,
      iconBg:
        'bg-[#C92925]/10 text-[#C92925] border border-[#C92925]/25',
    },
    {
      title: 'Top Precursor / Hazard',
      value: 'Improper Isolation',
      isStringValue: true,
      change: '18.6% of SIF events',
      isNeutral: true,
      subtext: '64 critical incidents',
      icon: Zap,
      iconBg:
        'bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/25',
    },
    {
      title: 'Reports Mapped to LSR',
      value: '1,876',
      change: '80.2% of total reports',
      isNeutral: true,
      subtext: 'Oil India Life-Saving Rules',
      icon: ShieldCheck,
      iconBg:
        'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/25',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;

        return (
          <Card
            key={idx}
            className="overflow-hidden border border-[#D9DDE0] bg-white shadow-none rounded-[2px] transition-colors hover:border-[#102F3E]/30 group"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                    {kpi.title}
                  </p>

                  <h3
                    className={
                      kpi.isStringValue
                        ? 'text-sm font-bold text-[#102F3E] mt-1 truncate max-w-[140px]'
                        : 'text-2xl font-black text-[#102F3E] mt-1 font-mono tracking-tight'
                    }
                    title={kpi.value}
                  >
                    {kpi.value}
                  </h3>
                </div>

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] ${kpi.iconBg}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#D9DDE0] text-[11px]">
                <span
                  className={`flex items-center font-semibold ${kpi.isNeutral
                      ? 'text-[#102F3E]'
                      : kpi.isPositive
                        ? 'text-[#2E7D32]'
                        : 'text-[#C92925]'
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

                <span className="text-[10px] text-[#667085] truncate ml-1">
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