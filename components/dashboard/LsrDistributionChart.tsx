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
  value: number;
  color: string;
  reportsCount: number;
}

const lsrColors: Record<string, string> = {
  'Work at Height': '#102F3E',
  'Working at Height': '#102F3E',
  'Energy Isolation': '#D97706',
  'Confined Space': '#2F6B84',
  'Line of Fire': '#C92925',
  'Hot Work': '#C7972B',
  'Safe Mechanical Lifting': '#2A7D78',
  'Toxic Gas / Chemical Exposure': '#C65D1E',
  'Bypassing Safety Controls': '#64748B',
  Others: '#718096',
};

export function formatLsrName(rawTag?: string): string {
  if (!rawTag) return 'Others';

  if (rawTag.includes('WORK_AT_HEIGHT')) return 'Work at Height';
  if (rawTag.includes('WORKING_AT_HEIGHT')) return 'Work at Height';
  if (rawTag.includes('ENERGY_ISOLATION')) return 'Energy Isolation';
  if (rawTag.includes('CONFINED_SPACE')) return 'Confined Space';
  if (rawTag.includes('LINE_OF_FIRE')) return 'Line of Fire';
  if (rawTag.includes('HOT_WORK')) return 'Hot Work';
  if (rawTag.includes('SAFE_MECHANICAL_LIFTING')) {
    return 'Safe Mechanical Lifting';
  }
  if (rawTag.includes('BYPASSING_SAFETY_CONTROLS')) {
    return 'Bypassing Safety Controls';
  }
  if (rawTag.includes('TOXIC_GAS')) {
    return 'Toxic Gas / Chemical Exposure';
  }

  return rawTag.replace(/^LSR_/, '').replace(/_/g, ' ');
}

export function LsrDistributionChart() {
  const { reports } = useSafetyStore();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const lsrDistributionData: LsrSegment[] = React.useMemo(() => {
    if (!reports || reports.length === 0) {
      return [
        {
          name: 'Work at Height',
          value: 25,
          color: '#102F3E',
          reportsCount: 19,
        },
        {
          name: 'Energy Isolation',
          value: 20,
          color: '#D97706',
          reportsCount: 15,
        },
        {
          name: 'Confined Space',
          value: 16,
          color: '#2F6B84',
          reportsCount: 12,
        },
        {
          name: 'Line of Fire',
          value: 15,
          color: '#C92925',
          reportsCount: 11,
        },
        {
          name: 'Hot Work',
          value: 12,
          color: '#C7972B',
          reportsCount: 9,
        },
        {
          name: 'Others',
          value: 12,
          color: '#718096',
          reportsCount: 9,
        },
      ];
    }

    const counts: Record<string, number> = {};

    reports.forEach((r) => {
      let rule = formatLsrName(r.lsrViolated);

      if (!rule || rule === 'Others') {
        rule = r.precursor || 'Others';
      }

      counts[rule] = (counts[rule] || 0) + 1;
    });

    const total = reports.length;

    const sorted = Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    );

    const top5 = sorted.slice(0, 5);

    const othersCount = sorted
      .slice(5)
      .reduce((acc, curr) => acc + curr[1], 0);

    const fallbackColors = [
      '#102F3E',
      '#2F6B84',
      '#2A7D78',
      '#D97706',
      '#C7972B',
    ];

    const result: LsrSegment[] = top5.map(
      ([name, count], index) => ({
        name,
        value: Math.max(
          1,
          Math.round((count / total) * 100)
        ),
        color:
          lsrColors[name] ||
          fallbackColors[index % fallbackColors.length],
        reportsCount: count,
      })
    );

    if (othersCount > 0) {
      result.push({
        name: 'Others',
        value: Math.max(
          1,
          Math.round((othersCount / total) * 100)
        ),
        color: '#718096',
        reportsCount: othersCount,
      });
    }

    return result;
  }, [reports]);

  const activeIndex =
    hoveredIndex !== null ? hoveredIndex : selectedIndex;

  const activeItem =
    activeIndex !== null
      ? lsrDistributionData[activeIndex]
      : null;

  return (
    <Card className="flex flex-col panel-card panel-accent-navy min-h-[360px]">
      <CardHeader className="p-4 sm:p-5 pb-3 flex flex-col justify-between border-b border-[#D9DDE0]">
        <div className="flex flex-col w-full relative">
          <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1">
            DISTRIBUTION METRICS
          </span>

          <CardTitle className="text-base font-bold text-[#102F3E] flex justify-between items-center w-full mt-0">
            <span>Life-Saving Rule distribution</span>

            <span className="hidden sm:inline-flex items-center font-mono text-[11px] font-semibold text-[#667085]">
              6 Categories
            </span>
          </CardTitle>

          <p className="text-xs text-[#667085] mt-1">
            Distribution of IOGP Life-Saving Rules mapped to audited
            safety events
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-3.5 sm:p-5 pt-4 flex-1 flex flex-col justify-between min-h-[300px] min-w-0 overflow-hidden">
        {/* Donut Chart + Legend */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 h-full min-h-[220px] min-w-0">

          {/* Donut Chart */}
          <div className="relative h-44 w-44 sm:h-52 sm:w-52 shrink-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0]
                        .payload as LsrSegment;

                      return (
                        <div className="rounded-[2px] border border-[#D9DDE0] bg-white p-3 shadow-md text-xs space-y-1.5 min-w-[150px]">
                          <div className="flex items-center space-x-2 font-bold text-[#102F3E]">
                            <span
                              className="h-2.5 w-2.5 rounded-[1px]"
                              style={{
                                backgroundColor: item.color,
                              }}
                            />

                            <span>{item.name}</span>
                          </div>

                          <div className="flex items-center justify-between gap-3 text-[#667085] pt-1 border-t border-[#D9DDE0]">
                            <span>Share:</span>

                            <strong className="text-[#102F3E] font-mono text-xs">
                              {item.value}%
                            </strong>
                          </div>

                          <div className="flex items-center justify-between gap-3 text-[#667085]">
                            <span>Estimated Events:</span>

                            <strong className="text-[#102F3E] font-mono text-xs">
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
                  innerRadius={70}
                  outerRadius={96}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="transparent"
                  onMouseEnter={(_, index) =>
                    setHoveredIndex(index)
                  }
                  onMouseLeave={() =>
                    setHoveredIndex(null)
                  }
                  onClick={(_, index) =>
                    setSelectedIndex((prev) =>
                      prev === index ? null : index
                    )
                  }
                >
                  {lsrDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="transition-all duration-200 cursor-pointer"
                      opacity={
                        activeIndex === null ||
                          activeIndex === index
                          ? 1
                          : 0.35
                      }
                      style={{ outline: 'none' }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Center */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center select-none p-2">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#102F3E] leading-none transition-all duration-200">
                {activeItem
                  ? `${activeItem.value}%`
                  : `${lsrDistributionData[0].value}%`}
              </span>

              <span className="text-[11px] font-semibold text-[#667085] mt-1 truncate max-w-[105px] sm:max-w-[120px] px-1 leading-tight transition-all duration-200">
                {activeItem
                  ? activeItem.name
                  : lsrDistributionData[0].name}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 w-full space-y-1.5 self-center min-w-0">
            <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider mb-1 px-1 flex items-center justify-between">
              <span>Rule Category</span>
              <span>Distribution</span>
            </div>

            <div className="space-y-1.5">
              {lsrDistributionData.map((item, index) => {
                const isItemActive =
                  activeIndex === index;

                return (
                  <div
                    key={item.name}
                    onMouseEnter={() =>
                      setHoveredIndex(index)
                    }
                    onMouseLeave={() =>
                      setHoveredIndex(null)
                    }
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev === index ? null : index
                      )
                    }
                    className={`flex items-center justify-between p-2 rounded-[2px] transition-colors cursor-pointer border ${isItemActive
                        ? 'bg-[#F3F2EE] border-[#D9DDE0]'
                        : 'hover:bg-[#F3F2EE]/60 border-transparent'
                      }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span
                        className="h-3 w-3 rounded-[1px] shrink-0"
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                      <span
                        className={`text-xs truncate ${isItemActive
                            ? 'text-[#102F3E] font-semibold'
                            : 'text-[#17202A] font-medium'
                          }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="font-mono text-xs font-bold text-[#102F3E]">
                        {item.value}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 flex items-center justify-between border-t border-[#D9DDE0] pt-3 text-[11px] text-[#667085]">
          <span className="flex items-center gap-1.5">
            <Info className="h-3 w-3 text-[#667085]" />
            Hover or click segments to inspect rule percentages
          </span>

          <span className="font-mono text-[10px] text-[#667085]">
            Total: 100%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}