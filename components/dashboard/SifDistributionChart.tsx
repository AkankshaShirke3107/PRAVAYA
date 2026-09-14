'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

const data = [
  {
    name: 'High SIF Potential',
    value: 98,
    color: '#C92925',
    pct: '4.2%',
  },
  {
    name: 'Medium SIF Potential',
    value: 146,
    color: '#D97706',
    pct: '6.2%',
  },
  {
    name: 'Low SIF Potential',
    value: 98,
    color: '#2E7D32',
    pct: '4.2%',
  },
  {
    name: 'Non-SIF Potential',
    value: 2006,
    color: '#667085',
    pct: '85.4%',
  },
];

export function SifDistributionChart() {
  return (
    <Card className="flex flex-col panel-card panel-accent-red h-full">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b border-[#D9DDE0]">
        <div>
          <CardTitle className="text-sm font-semibold text-[#102F3E]">
            SIF Potential Distribution
          </CardTitle>

          <p className="text-[11px] text-[#667085] mt-0.5">
            Breakdown across all 2,348 audited safety events
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-between">
        {/* Donut Chart Container */}
        <div className="relative h-44 w-full my-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;

                    return (
                      <div className="rounded-[2px] border border-border bg-card p-2 shadow-md text-xs">
                        <div className="flex items-center space-x-1.5 font-semibold text-[#102F3E]">
                          <span
                            className="h-2.5 w-2.5 rounded-[1px]"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.name}</span>
                        </div>

                        <div className="mt-1 text-[11px] text-[#667085] flex justify-between gap-3">
                          <span>
                            Count:{' '}
                            <strong className="text-[#102F3E]">
                              {item.value}
                            </strong>
                          </span>

                          <span>
                            Share:{' '}
                            <strong className="text-[#102F3E]">
                              {item.pct}
                            </strong>
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Pie
                data={data}
                innerRadius={52}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
                stroke="transparent"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Stats */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold font-mono tracking-tight text-[#102F3E]">
              2,348
            </span>

            <span className="text-[10px] text-[#667085] font-bold uppercase tracking-wider">
              Total Audited
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D9DDE0] text-xs">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-[2px] p-1.5 hover:bg-[#F3F2EE] transition-colors"
            >
              <div className="flex items-center space-x-1.5 truncate">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-[1px]"
                  style={{ backgroundColor: item.color }}
                />

                <span className="text-[11px] font-medium text-[#667085] truncate">
                  {item.name}
                </span>
              </div>

              <span className="text-[11px] font-mono font-semibold text-[#102F3E] ml-1">
                {item.value} ({item.pct})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}