'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, Activity } from 'lucide-react';
import { useSafetyStore } from '@/lib/store';

export function SifTrendChart() {
  const { reports } = useSafetyStore();

  const monthlySifData = React.useMemo(() => {
    const months = [
      {
        key: '2025-06',
        month: 'Jun',
        fullMonth: 'Jun 2025',
        baseCount: 22,
        baseHigh: 5,
      },
      {
        key: '2025-07',
        month: 'Jul',
        fullMonth: 'Jul 2025',
        baseCount: 25,
        baseHigh: 6,
      },
      {
        key: '2025-08',
        month: 'Aug',
        fullMonth: 'Aug 2025',
        baseCount: 28,
        baseHigh: 7,
      },
      {
        key: '2025-09',
        month: 'Sep',
        fullMonth: 'Sep 2025',
        baseCount: 24,
        baseHigh: 6,
      },
      {
        key: '2025-10',
        month: 'Oct',
        fullMonth: 'Oct 2025',
        baseCount: 29,
        baseHigh: 8,
      },
      {
        key: '2025-11',
        month: 'Nov',
        fullMonth: 'Nov 2025',
        baseCount: 26,
        baseHigh: 7,
      },
      {
        key: '2025-12',
        month: 'Dec',
        fullMonth: 'Dec 2025',
        baseCount: 23,
        baseHigh: 5,
      },
      {
        key: '2026-01',
        month: 'Jan',
        fullMonth: 'Jan 2026',
        baseCount: 16,
        baseHigh: 4,
      },
      {
        key: '2026-02',
        month: 'Feb',
        fullMonth: 'Feb 2026',
        baseCount: 18,
        baseHigh: 5,
      },
      {
        key: '2026-03',
        month: 'Mar',
        fullMonth: 'Mar 2026',
        baseCount: 22,
        baseHigh: 6,
      },
      {
        key: '2026-04',
        month: 'Apr',
        fullMonth: 'Apr 2026',
        baseCount: 25,
        baseHigh: 7,
      },
      {
        key: '2026-05',
        month: 'May',
        fullMonth: 'May 2026',
        baseCount: 32,
        baseHigh: 9,
      },
    ];

    // Count reports by year-month
    const liveCounts: Record<
      string,
      { count: number; highRisk: number }
    > = {};

    if (reports && reports.length > 0) {
      reports.forEach((r) => {
        const ym = r.date ? r.date.slice(0, 7) : '';

        if (ym) {
          if (!liveCounts[ym]) {
            liveCounts[ym] = {
              count: 0,
              highRisk: 0,
            };
          }

          liveCounts[ym].count++;

          if (r.sifPotential === 'Yes' || r.sifLevel === 'High') {
            liveCounts[ym].highRisk++;
          }
        }
      });
    }

    return months.map((m) => {
      const live = liveCounts[m.key];

      return {
        month: m.month,
        fullMonth: m.fullMonth,
        count: live ? live.count : m.baseCount,
        highRisk: live ? live.highRisk : m.baseHigh,
      };
    });
  }, [reports]);

  const totalSif = monthlySifData.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  const avgMonthly = (
    totalSif / monthlySifData.length
  ).toFixed(1);

  return (
    <Card className="flex flex-col panel-card panel-accent-navy min-h-[360px]">
      <CardHeader className="p-4 sm:p-5 pb-3 flex flex-col justify-between">
        <div className="flex flex-col w-full relative">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
            TREND ANALYSIS
          </span>

          <CardTitle className="text-sm font-semibold text-foreground flex justify-between items-center w-full">
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground shrink-0" />
              SIF trend over time
            </span>

            <div className="hidden sm:flex items-center space-x-4 text-xs font-normal">
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  12-Mo Total
                </span>
                <span className="font-mono font-semibold text-foreground">
                  {totalSif} SIFs
                </span>
              </div>

              <div className="text-right pl-3 border-l border-border">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                  Monthly Avg
                </span>
                <span className="font-mono font-semibold text-foreground">
                  {avgMonthly}
                </span>
              </div>
            </div>
          </CardTitle>

          <div className="w-6 h-[2px] bg-[#C92925] mt-2 mb-1" />

          <p className="text-xs text-muted-foreground mt-1">
            Monthly SIF-potential reports over the last 12 months (Jun 2025–May 2026)
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-4 flex-1 flex flex-col justify-between">
        <div className="h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlySifData}
              margin={{
                top: 10,
                right: 15,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#D9DDE0"
                className="dark:[stroke:#232E3B]"
              />

              <XAxis
                dataKey="month"
                stroke="#667085"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#667085"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 45]}
                label={{
                  value: 'Number of reports',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 12,
                  style: {
                    textAnchor: 'middle',
                    fill: '#667085',
                    fontSize: 10,
                    fontWeight: 500,
                  },
                }}
              />

              <Tooltip
                cursor={{
                  stroke: '#102F3E',
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;

                    return (
                      <div className="rounded-[2px] border border-border bg-card p-3 shadow-md text-xs space-y-1.5 min-w-[140px] dark:bg-[#182130] dark:border-[#232E3B]">
                        <div className="font-semibold text-foreground border-b border-border pb-1 text-xs">
                          {data.fullMonth}
                        </div>

                        <div className="flex items-center justify-between text-foreground">
                          <span className="text-muted-foreground">SIF Reports:</span>
                          <span className="font-mono font-bold text-sm">
                            {data.count}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[#C92925] dark:text-[#F87171] text-[11px]">
                          <span>High-Risk:</span>
                          <span className="font-mono font-semibold">
                            {data.highRisk}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Area
                type="monotone"
                dataKey="count"
                name="All Reports"
                stroke="#102F3E"
                strokeWidth={2}
                fill="#102F3E"
                fillOpacity={0.08}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: '#102F3E',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
              />

              <Area
                type="monotone"
                dataKey="highRisk"
                name="SIF-Potential"
                stroke="#C92925"
                strokeWidth={2}
                fill="#C92925"
                fillOpacity={0.12}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: '#C92925',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-border pt-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 rounded-[1px] bg-[#102F3E] dark:bg-[#2F6B84]" />
              <span className="font-medium text-muted-foreground text-[11px]">
                All Reports
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 rounded-[1px] bg-[#C92925]" />
              <span className="font-medium text-muted-foreground text-[11px]">
                High-Risk SIF
              </span>
            </div>
          </div>

          <span className="text-[11px] text-[#2E7D32] dark:text-[#4ADE80] font-medium flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            2025 Trend Stable
          </span>
        </div>
      </CardContent>
    </Card>
  );
}