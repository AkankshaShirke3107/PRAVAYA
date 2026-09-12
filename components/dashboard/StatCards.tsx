'use client';

import React from 'react';
import {
  FileCheck,
  AlertTriangle,
  Flame,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { useSafetyStore } from '@/lib/store';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend: {
    value: string;
    isPositive: boolean; // whether the direction is favorable for HSE
    direction: 'up' | 'down';
  };
  colorTheme: 'green' | 'orange' | 'red' | 'blue';
  description?: string;
}

export function StatCards() {
  const { reports } = useSafetyStore();

  const totalReports = reports.length;
  const sifReports = reports.filter((r) => r.sifPotential === 'Yes').length;
  const highRiskReports = reports.filter(
    (r) => (r.sifLevel === 'High' || (r.confidence && r.confidence >= 88)) && r.sifPotential === 'Yes'
  ).length;
  const pendingReviewReports = reports.filter((r) => r.status === 'Pending').length;

  const statCardsData: StatCardProps[] = [
    {
      title: 'Total Reports',
      value: totalReports.toLocaleString(),
      icon: FileCheck,
      trend: {
        value: '+12.4%',
        isPositive: true,
        direction: 'up',
      },
      colorTheme: 'green',
      description: 'Logged safety observations (UA/UC/NM)',
    },
    {
      title: 'SIF-Potential Reports',
      value: sifReports.toLocaleString(),
      icon: AlertTriangle,
      trend: {
        value: `${totalReports > 0 ? ((sifReports / totalReports) * 100).toFixed(1) : 0}% share`,
        isPositive: false,
        direction: 'up',
      },
      colorTheme: 'orange',
      description: 'Precursors detected by NLP model',
    },
    {
      title: 'High-Risk Reports',
      value: highRiskReports.toLocaleString(),
      icon: Flame,
      trend: {
        value: '-4.2%',
        isPositive: true,
        direction: 'down',
      },
      colorTheme: 'red',
      description: 'Critical Life-Saving Rule breaches',
    },
    {
      title: 'Reports Pending Review',
      value: pendingReviewReports.toLocaleString(),
      icon: Clock,
      trend: {
        value: `${pendingReviewReports} in queue`,
        isPositive: true,
        direction: 'down',
      },
      colorTheme: 'blue',
      description: 'Awaiting HSE committee sign-off',
    },
  ];
  const getThemeStyles = (theme: StatCardProps['colorTheme']) => {
    switch (theme) {
      case 'green':
        return {
          cardBorder: 'hover:border-emerald-500/40',
          iconBg: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
          valueColor: 'text-emerald-500 dark:text-emerald-400',
          accentRing: 'group-hover:ring-emerald-500/20',
          badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        };
      case 'orange':
        return {
          cardBorder: 'hover:border-amber-500/40',
          iconBg: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
          valueColor: 'text-amber-500 dark:text-amber-400',
          accentRing: 'group-hover:ring-amber-500/20',
          badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        };
      case 'red':
        return {
          cardBorder: 'border-rose-500/30 hover:border-rose-500/60 bg-rose-500/[0.02]',
          iconBg: 'bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-sm shadow-rose-500/10',
          valueColor: 'text-rose-500 dark:text-rose-400',
          accentRing: 'group-hover:ring-rose-500/20',
          badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        };
      case 'blue':
      default:
        return {
          cardBorder: 'hover:border-sky-500/40',
          iconBg: 'bg-sky-500/10 text-sky-500 border border-sky-500/20',
          valueColor: 'text-sky-500 dark:text-sky-400',
          accentRing: 'group-hover:ring-sky-500/20',
          badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCardsData.map((stat, idx) => {
        const Icon = stat.icon;
        const styles = getThemeStyles(stat.colorTheme);

        return (
          <Card
            key={idx}
            className={cn(
              'group relative overflow-hidden border border-[#e2e8f0] bg-white dark:bg-card dark:border-border shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
              styles.cardBorder
            )}
          >
            {/* Top colored accent indicator line */}
            <div
              className={cn(
                'absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5',
                stat.colorTheme === 'green' && 'bg-[#22c55e]',
                stat.colorTheme === 'orange' && 'bg-[#f59e0b]',
                stat.colorTheme === 'red' && 'bg-[#ef4444]',
                stat.colorTheme === 'blue' && 'bg-[#0ea5e9]'
              )}
            />

            <CardContent className="p-4 sm:p-5 md:p-6">
              <div className="flex items-center space-x-4">
                {/* Left Icon Container */}
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105',
                    styles.iconBg
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Right Stat Details */}
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
                    {stat.title}
                  </span>
                  <div className="flex items-baseline space-x-2 mt-0.5">
                    <span
                      className={cn(
                        'text-3xl font-black font-mono tracking-tight',
                        styles.valueColor
                      )}
                    >
                      {stat.value}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Trend & Context Bar */}
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-2.5 text-xs">
                {/* Trend Indicator */}
                <div
                  className={cn(
                    'inline-flex items-center space-x-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold border',
                    styles.badgeBg
                  )}
                >
                  {stat.trend.direction === 'up' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{stat.trend.value}</span>
                </div>

                {/* Subtitle context */}
                <span className="text-[11px] text-muted-foreground truncate ml-2">
                  vs previous month
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
