'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const dailyData = [
  { date: '01 May', total: 72, sif: 11, highSif: 3 },
  { date: '04 May', total: 85, sif: 14, highSif: 4 },
  { date: '07 May', total: 94, sif: 12, highSif: 3 },
  { date: '10 May', total: 68, sif: 9, highSif: 2 },
  { date: '13 May', total: 102, sif: 18, highSif: 6 },
  { date: '16 May', total: 88, sif: 13, highSif: 4 },
  { date: '19 May', total: 95, sif: 15, highSif: 5 },
  { date: '22 May', total: 110, sif: 21, highSif: 7 },
  { date: '25 May', total: 84, sif: 12, highSif: 3 },
  { date: '28 May', total: 78, sif: 10, highSif: 2 },
];

const weeklyData = [
  { date: 'Week 1', total: 540, sif: 78, highSif: 22 },
  { date: 'Week 2', total: 620, sif: 92, highSif: 27 },
  { date: 'Week 3', total: 595, sif: 84, highSif: 24 },
  { date: 'Week 4', total: 593, sif: 88, highSif: 25 },
];

export function ReportsOverTimeChart() {
  const [interval, setInterval] = useState<'daily' | 'weekly'>('daily');

  const activeData =
    interval === 'daily' ? dailyData : weeklyData;

  return (
    <Card className="flex flex-col border border-[#D9DDE0] bg-white shadow-none rounded-[2px] h-full">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b border-[#D9DDE0]">
        <div>
          <CardTitle className="text-sm font-semibold text-[#102F3E]">
            Reports Over Time
          </CardTitle>

          <p className="text-[11px] text-[#667085] mt-0.5">
            Trend tracking for Total, SIF, and High-SIF incidents
          </p>
        </div>

        {/* Daily / Weekly toggle */}
        <div className="flex items-center rounded-[2px] border border-[#D9DDE0] bg-[#F3F2EE] p-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInterval('daily')}
            className={`h-6 rounded-[2px] px-2 text-[11px] font-medium transition-all ${interval === 'daily'
                ? 'bg-white text-[#102F3E] shadow-none font-semibold border border-[#D9DDE0]'
                : 'text-[#667085] hover:text-[#102F3E]'
              }`}
          >
            Daily
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInterval('weekly')}
            className={`h-6 rounded-[2px] px-2 text-[11px] font-medium transition-all ${interval === 'weekly'
                ? 'bg-white text-[#102F3E] shadow-none font-semibold border border-[#D9DDE0]'
                : 'text-[#667085] hover:text-[#102F3E]'
              }`}
          >
            Weekly
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-1 flex flex-col justify-between">
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activeData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.6}
              />

              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-[2px] border border-[#D9DDE0] bg-white p-2 shadow-md text-xs">
                        <div className="font-semibold text-[#102F3E] mb-1">
                          {label}
                        </div>

                        <div className="space-y-0.5 text-[11px]">
                          <div className="flex items-center justify-between gap-3 text-[#102F3E]">
                            <span>Total Reports:</span>
                            <span className="font-mono font-bold">
                              {payload[0]?.value}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3 text-[#D97706]">
                            <span>SIF Potential:</span>
                            <span className="font-mono font-bold">
                              {payload[1]?.value}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-3 text-[#C92925]">
                            <span>High SIF Potential:</span>
                            <span className="font-mono font-bold">
                              {payload[2]?.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="total"
                name="Total Reports"
                stroke="#102F3E"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                }}
              />

              <Line
                type="monotone"
                dataKey="sif"
                name="SIF Potential"
                stroke="#D97706"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                }}
              />

              <Line
                type="monotone"
                dataKey="highSif"
                name="High SIF Potential"
                stroke="#C92925"
                strokeWidth={2}
                strokeDasharray="4 2"
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-center space-x-4 pt-2 border-t border-[#D9DDE0] text-[11px]">
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-3 rounded-[1px] bg-[#102F3E]" />
            <span className="text-[#667085]">
              Total Reports
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-3 rounded-[1px] bg-[#D97706]" />
            <span className="text-[#667085]">
              SIF Potential
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-3 rounded-[1px] bg-[#C92925]" />
            <span className="text-[#667085]">
              High SIF Potential
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}