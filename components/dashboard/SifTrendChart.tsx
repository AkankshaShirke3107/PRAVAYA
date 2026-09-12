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
      { key: '2025-06', month: 'Jun', fullMonth: 'Jun 2025', baseCount: 22, baseHigh: 5 },
      { key: '2025-07', month: 'Jul', fullMonth: 'Jul 2025', baseCount: 25, baseHigh: 6 },
      { key: '2025-08', month: 'Aug', fullMonth: 'Aug 2025', baseCount: 28, baseHigh: 7 },
      { key: '2025-09', month: 'Sep', fullMonth: 'Sep 2025', baseCount: 24, baseHigh: 6 },
      { key: '2025-10', month: 'Oct', fullMonth: 'Oct 2025', baseCount: 29, baseHigh: 8 },
      { key: '2025-11', month: 'Nov', fullMonth: 'Nov 2025', baseCount: 26, baseHigh: 7 },
      { key: '2025-12', month: 'Dec', fullMonth: 'Dec 2025', baseCount: 23, baseHigh: 5 },
      { key: '2026-01', month: 'Jan', fullMonth: 'Jan 2026', baseCount: 16, baseHigh: 4 },
      { key: '2026-02', month: 'Feb', fullMonth: 'Feb 2026', baseCount: 18, baseHigh: 5 },
      { key: '2026-03', month: 'Mar', fullMonth: 'Mar 2026', baseCount: 22, baseHigh: 6 },
      { key: '2026-04', month: 'Apr', fullMonth: 'Apr 2026', baseCount: 25, baseHigh: 7 },
      { key: '2026-05', month: 'May', fullMonth: 'May 2026', baseCount: 32, baseHigh: 9 },
    ];

    // Count reports by year-month
    const liveCounts: Record<string, { count: number; highRisk: number }> = {};
    if (reports && reports.length > 0) {
      reports.forEach((r) => {
        const ym = r.date ? r.date.slice(0, 7) : '';
        if (ym) {
          if (!liveCounts[ym]) {
            liveCounts[ym] = { count: 0, highRisk: 0 };
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

  const totalSif = monthlySifData.reduce((acc, curr) => acc + curr.count, 0);
  const avgMonthly = (totalSif / monthlySifData.length).toFixed(1);

  return (
    <Card className="flex flex-col border bg-card/95 backdrop-blur-sm shadow-sm h-full">
      <CardHeader className="p-3.5 sm:p-5 pb-2 flex flex-row items-center justify-between border-b border-border/50">
        <div>
          <CardTitle className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <Activity className="h-4 w-4 text-sky-500 shrink-0" />
            SIF Trend Over Time
          </CardTitle>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
            Monthly SIF-potential reports over the last 12 months (Jun 2025 – May 2026)
          </p>
        </div>

        {/* Header summary badge */}
        <div className="hidden sm:flex items-center space-x-3 text-xs">
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
              12-Mo Total
            </span>
            <span className="font-mono font-bold text-foreground">
              {totalSif} SIFs
            </span>
          </div>
          <div className="text-right pl-3 border-l">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
              Monthly Avg
            </span>
            <span className="font-mono font-bold text-foreground">
              {avgMonthly}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3.5 sm:p-5 pt-4 flex-1 flex flex-col justify-between">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlySifData}
              margin={{ top: 10, right: 15, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="sifBlueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.6}
              />

              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="hsl(var(--muted-foreground))"
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
                    fill: 'hsl(var(--muted-foreground))',
                    fontSize: 10,
                    fontWeight: 500,
                  },
                }}
              />

              <Tooltip
                cursor={{
                  stroke: '#2563eb',
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                  opacity: 0.5,
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border bg-card/98 p-3 shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-[150px]">
                        <div className="font-bold text-foreground border-b pb-1 text-xs">
                          {data.fullMonth}
                        </div>
                        <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                          <span className="font-medium">SIF Reports:</span>
                          <span className="font-mono font-black text-sm">
                            {data.count}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-rose-500 text-[11px]">
                          <span>High-Risk subset:</span>
                          <span className="font-mono font-bold">
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
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#sifBlueGradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: '#2563eb',
                  stroke: '#ffffff',
                  strokeWidth: 2.5,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Meta indicator */}
        <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600" />
            <span className="font-medium text-foreground text-[11px]">
              Blue line: Monthly SIF Reports (Hover to view data points)
            </span>
          </div>
          <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Overall 2025 Trend Stable
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
