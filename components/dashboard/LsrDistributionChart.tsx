'use client';

import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldCheck, Info } from 'lucide-react';
import { useSafetyStore } from '@/lib/store';

interface LsrSegment {
  name: string;
  value: number; // percentage
  color: string;
  reportsCount: number;
}

const lsrColors: Record<string, string> = {
  'Working at Height': '#2563eb',
  'Energy Isolation': '#059669',
  'Confined Space': '#7c3aed',
  'Line of Fire': '#dc2626',
  'Hot Work': '#ea580c',
  'Safe Mechanical Lifting': '#0891b2',
  'Toxic Gas / Chemical Exposure': '#d97706',
  'Bypassing Safety Controls': '#475569',
};

export function LsrDistributionChart() {
  const { reports } = useSafetyStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const lsrDistributionData: LsrSegment[] = React.useMemo(() => {
    if (!reports || reports.length === 0) {
      return [
        { name: 'Working at Height', value: 25, color: '#2563eb', reportsCount: 19 },
        { name: 'Energy Isolation', value: 20, color: '#059669', reportsCount: 15 },
        { name: 'Confined Space', value: 16, color: '#7c3aed', reportsCount: 12 },
        { name: 'Line of Fire', value: 15, color: '#dc2626', reportsCount: 11 },
        { name: 'Hot Work', value: 12, color: '#ea580c', reportsCount: 9 },
        { name: 'Others', value: 12, color: '#64748b', reportsCount: 9 },
      ];
    }

    const counts: Record<string, number> = {};
    reports.forEach((r) => {
      const rule = r.lsrViolated || 'Others';
      counts[rule] = (counts[rule] || 0) + 1;
    });

    const total = reports.length;
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top5 = sorted.slice(0, 5);
    const othersCount = sorted.slice(5).reduce((acc, curr) => acc + curr[1], 0);

    const result: LsrSegment[] = top5.map(([name, count]) => ({
      name,
      value: Math.max(1, Math.round((count / total) * 100)),
      color: lsrColors[name] || '#64748b',
      reportsCount: count,
    }));

    if (othersCount > 0) {
      result.push({
        name: 'Others',
        value: Math.max(1, Math.round((othersCount / total) * 100)),
        color: '#64748b',
        reportsCount: othersCount,
      });
    }

    return result;
  }, [reports]);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;
  const activeItem =
    activeIndex !== null ? lsrDistributionData[activeIndex] : null;

  return (
    <Card className="flex flex-col border bg-card/95 backdrop-blur-sm shadow-sm h-full">
      <CardHeader className="p-3.5 sm:p-5 pb-3 flex flex-row items-center justify-between border-b border-border/50">
        <div>
          <CardTitle className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            Life-Saving Rule Distribution
          </CardTitle>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
            Distribution of IOGP Life-Saving Rules mapped to audited safety events
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground">
          6 Categories
        </span>
      </CardHeader>

      <CardContent className="p-3.5 sm:p-5 pt-4 flex-1 flex flex-col justify-between">
        {/* Main Content: Donut Chart on Left, Legend on Right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 h-full min-h-[230px]">
          {/* Donut Chart Container (Left) */}
          <div className="relative h-48 w-48 sm:h-60 sm:w-60 shrink-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as LsrSegment;
                      return (
                        <div className="rounded-xl border bg-card/98 p-3 shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-[150px]">
                          <div className="flex items-center space-x-2 font-bold text-foreground">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span>{item.name}</span>
                          </div>
                          <div className="flex items-center justify-between gap-3 text-muted-foreground pt-1 border-t">
                            <span>Share:</span>
                            <strong className="text-foreground font-mono text-xs">
                              {item.value}%
                            </strong>
                          </div>
                          <div className="flex items-center justify-between gap-3 text-muted-foreground">
                            <span>Estimated Events:</span>
                            <strong className="text-blue-600 dark:text-blue-400 font-mono text-xs">
                              {item.reportsCount}
                            </strong>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={lsrDistributionData}
                  innerRadius={66}
                  outerRadius={92}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="transparent"
                  onMouseEnter={(_, index) => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={(_, index) =>
                    setSelectedIndex((prev) => (prev === index ? null : index))
                  }
                >
                  {lsrDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="transition-all duration-200 cursor-pointer"
                      opacity={
                        activeIndex === null || activeIndex === index ? 1 : 0.35
                      }
                      style={{ outline: 'none' }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Percentage displayed in the center of the donut */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center select-none">
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-foreground transition-all duration-200">
                {activeItem ? `${activeItem.value}%` : `${lsrDistributionData[0].value}%`}
              </span>
              <span className="text-xs font-semibold text-muted-foreground mt-0.5 truncate max-w-[110px] px-1 transition-all duration-200">
                {activeItem ? activeItem.name : lsrDistributionData[0].name}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground/80 font-medium mt-0.5">
                {activeItem ? 'Selected Rule' : 'Top Rule Share'}
              </span>
            </div>
          </div>

          {/* Legend on the Right */}
          <div className="flex-1 w-full space-y-2">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-1 flex items-center justify-between">
              <span>Rule Category</span>
              <span>Distribution</span>
            </div>
            <div className="space-y-1.5">
              {lsrDistributionData.map((item, index) => {
                const isItemActive = activeIndex === index;
                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() =>
                      setSelectedIndex((prev) => (prev === index ? null : index))
                    }
                    className={`flex items-center justify-between p-2 rounded-lg transition-all cursor-pointer border ${
                      isItemActive
                        ? 'bg-muted/80 border-border shadow-xs scale-[1.01]'
                        : 'hover:bg-muted/40 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span
                        className="h-3 w-3 rounded-full shrink-0 transition-transform duration-150"
                        style={{
                          backgroundColor: item.color,
                          transform: isItemActive ? 'scale(1.25)' : 'scale(1)',
                        }}
                      />
                      <span
                        className={`text-xs truncate ${
                          isItemActive
                            ? 'text-foreground font-semibold'
                            : 'text-foreground/90 font-medium'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="font-mono text-xs font-bold text-foreground">
                        {item.value}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Info className="h-3 w-3 text-sky-500" />
            Hover or click segments to inspect rule percentages
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Total: 100%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
