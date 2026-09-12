'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertTriangle, Layers } from 'lucide-react';
import { useSafetyStore } from '@/lib/store';

const defaultColors: Record<string, string> = {
  'Work at Height': '#3b82f6',
  'Energy Isolation': '#f59e0b',
  'Line of Fire': '#ef4444',
  'Confined Space': '#8b5cf6',
  'Safe Mechanical Lifting': '#10b981',
  'Atmospheric Hazard': '#06b6d4',
  'Hot Work': '#ea580c',
};

export function TopPrecursorsChart() {
  const { reports } = useSafetyStore();

  const topPrecursorsData = React.useMemo(() => {
    if (!reports || reports.length === 0) {
      return [
        { name: 'Work at Height', count: 18, color: '#3b82f6', pct: '28.0%' },
        { name: 'Energy Isolation', count: 15, color: '#f59e0b', pct: '23.4%' },
        { name: 'Line of Fire', count: 13, color: '#ef4444', pct: '20.3%' },
        { name: 'Confined Space', count: 10, color: '#8b5cf6', pct: '15.6%' },
        { name: 'Safe Mechanical Lifting', count: 8, color: '#10b981', pct: '12.5%' },
      ];
    }

    const counts: Record<string, number> = {};
    reports.forEach((r) => {
      const p = r.precursor || 'General Hazard';
      counts[p] = (counts[p] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const sum = sorted.reduce((acc, curr) => acc + curr[1], 0);

    return sorted.map(([name, count]) => ({
      name,
      count,
      color: defaultColors[name] || '#64748b',
      pct: sum > 0 ? `${((count / sum) * 100).toFixed(1)}%` : '0%',
    }));
  }, [reports]);

  const totalTop5 = topPrecursorsData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="flex flex-col border bg-card/95 backdrop-blur-sm shadow-sm h-full">
      <CardHeader className="p-3.5 sm:p-5 pb-2 flex flex-row items-center justify-between border-b border-border/50">
        <div>
          <CardTitle className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <Layers className="h-4 w-4 text-amber-500 shrink-0" />
            Top SIF Precursors
          </CardTitle>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
            Top 5 precursors ranked by frequency of occurrence
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground">
          Top 5: {totalTop5} events
        </span>
      </CardHeader>

      <CardContent className="p-3.5 sm:p-5 pt-4 flex-1 flex flex-col justify-between">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topPrecursorsData}
              layout="vertical"
              margin={{ top: 5, right: 35, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="hsl(var(--border))"
                opacity={0.6}
              />

              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 95]}
              />

              <YAxis
                type="category"
                dataKey="name"
                stroke="hsl(var(--foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={105}
              />

              <Tooltip
                cursor={{ fill: 'hsl(var(--muted)/0.25)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="rounded-xl border bg-card/98 p-3 shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-[150px]">
                        <div className="flex items-center space-x-2 font-bold text-foreground">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-muted-foreground pt-1.5 border-t">
                          <span>Incident Count:</span>
                          <strong className="text-foreground font-mono text-xs">
                            {item.count} reports
                          </strong>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-muted-foreground">
                          <span>Share of Top 5:</span>
                          <strong className="text-blue-600 dark:text-blue-400 font-mono text-xs">
                            {item.pct}
                          </strong>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar
                dataKey="count"
                radius={[0, 6, 6, 0]}
                barSize={20}
              >
                {topPrecursorsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="count"
                  position="right"
                  offset={8}
                  fill="hsl(var(--foreground))"
                  className="font-mono font-bold text-xs"
                  formatter={(val: number) => `${val}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend color chips */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5 border-t border-border/50 pt-3 text-[11px]">
          {topPrecursorsData.map((item) => (
            <div key={item.name} className="flex items-center space-x-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground text-[10px] sm:text-[11px]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
