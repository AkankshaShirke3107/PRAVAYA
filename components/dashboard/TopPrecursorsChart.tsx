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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Layers } from 'lucide-react';
import { useSafetyStore } from '@/lib/store';

const defaultColors: Record<string, string> = {
  'Work at Height': '#102F3E',
  'Working at Height': '#102F3E',
  'Energy Isolation': '#D97706',
  'Line of Fire': '#C92925',
  'Confined Space': '#2F6B84',
  'Safe Mechanical Lifting': '#2A7D78',
  'Atmospheric Hazard': '#C7972B',
  'Hot Work': '#C92925',
};

const fallbackData = [
  {
    name: 'Work at Height',
    count: 18,
    color: '#102F3E',
    pct: '28.0%',
  },
  {
    name: 'Energy Isolation',
    count: 15,
    color: '#D97706',
    pct: '23.4%',
  },
  {
    name: 'Line of Fire',
    count: 13,
    color: '#C92925',
    pct: '20.3%',
  },
  {
    name: 'Confined Space',
    count: 10,
    color: '#2F6B84',
    pct: '15.6%',
  },
  {
    name: 'Safe Mechanical Lifting',
    count: 8,
    color: '#2A7D78',
    pct: '12.5%',
  },
];

export function TopPrecursorsChart() {
  const { reports } = useSafetyStore();

  const topPrecursorsData = React.useMemo(() => {
    if (!reports || reports.length === 0) {
      return fallbackData;
    }

    const counts: Record<string, number> = {};

    reports.forEach((r) => {
      let precursor = r.precursor || 'General Hazard';

      if (precursor === 'Working at Height') {
        precursor = 'Work at Height';
      }

      counts[precursor] = (counts[precursor] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const sum = sorted.reduce(
      (acc, curr) => acc + curr[1],
      0
    );

    return sorted.map(([name, count]) => ({
      name,
      count,
      color: defaultColors[name] || '#718096',
      pct:
        sum > 0
          ? `${((count / sum) * 100).toFixed(1)}%`
          : '0%',
    }));
  }, [reports]);

  const totalTop5 = topPrecursorsData.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  const maxCount = React.useMemo(() => {
    const highest = Math.max(
      ...topPrecursorsData.map((d) => d.count),
      1
    );

    return Math.ceil(highest * 1.25);
  }, [topPrecursorsData]);

  return (
    <Card className="flex flex-col panel-card panel-accent-navy min-h-[360px]">
      <CardHeader className="p-4 sm:p-5 pb-3 flex flex-col justify-between">
        <div className="flex flex-col w-full relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              PRECURSOR ANALYSIS
            </span>

            <div
              className="flex gap-1"
              aria-hidden="true"
            >
              <span className="block w-1.5 h-1.5 bg-[#102F3E]" />
              <span className="block w-1.5 h-1.5 bg-[#102F3E]" />
            </div>
          </div>

          <CardTitle className="text-sm font-semibold text-foreground flex justify-between items-center w-full mt-0">
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground shrink-0" />
              Top SIF precursors
            </span>

            <span className="hidden sm:inline-flex items-center font-mono text-[11px] font-medium text-muted-foreground">
              Top 5: {totalTop5} events
            </span>
          </CardTitle>

          <p className="text-xs text-muted-foreground mt-1">
            Top 5 precursors ranked by frequency of occurrence
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-3.5 sm:p-4 pt-4 flex-1 flex flex-col justify-between">
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={topPrecursorsData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#D9DDE0"
                className="dark:[stroke:#232E3B]"
              />

              <XAxis
                type="number"
                stroke="#667085"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, maxCount]}
                allowDecimals={false}
              />

              <YAxis
                type="category"
                dataKey="name"
                stroke="#17202A"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={110}
              />

              <Tooltip
                cursor={{
                  fill: '#F3F2EE',
                }}
                content={({ active, payload }) => {
                  if (
                    active &&
                    payload &&
                    payload.length
                  ) {
                    const item = payload[0].payload;

                    return (
                      <div className="rounded-[2px] border border-border bg-card p-3 shadow-md text-xs space-y-1.5 min-w-[150px] dark:bg-[#182130] dark:border-[#232E3B]">
                        <div className="flex items-center space-x-2 font-semibold text-foreground">
                          <span
                            className="h-2.5 w-2.5 rounded-[1px]"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.name}</span>
                        </div>

                        <div className="flex items-center justify-between gap-4 text-muted-foreground pt-1.5 border-t border-border">
                          <span>Count:</span>
                          <strong className="text-foreground font-mono text-xs">
                            {item.count} reports
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-4 text-muted-foreground">
                          <span>Share of Top 5:</span>
                          <strong className="text-foreground font-mono text-xs">
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
                radius={[0, 2, 2, 0]}
                barSize={20}
              >
                {topPrecursorsData.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.color ||
                        '#718096'
                      }
                    />
                  )
                )}

                <LabelList
                  dataKey="count"
                  position="right"
                  offset={8}
                  fill="#102F3E"
                  className="font-mono font-bold text-xs"
                  formatter={(val: number) =>
                    `${val}`
                  }
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5 border-t border-border pt-3 text-[11px]">
          {topPrecursorsData.map((item) => (
            <div key={item.name} className="flex items-center space-x-1.5">
              <span
                className="h-2 w-2 rounded-[1px] shrink-0"
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