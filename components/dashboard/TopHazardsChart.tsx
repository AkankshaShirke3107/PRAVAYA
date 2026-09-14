'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

const hazardData = [
  {
    name: 'Improper Isolation',
    pct: 18.6,
    count: 64,
    barColor: 'bg-[#D97706]',
  },
  {
    name: 'Work at Height',
    pct: 16.2,
    count: 55,
    barColor: 'bg-[#2F6B84]',
  },
  {
    name: 'Line of Fire',
    pct: 14.8,
    count: 51,
    barColor: 'bg-[#C92925]',
  },
  {
    name: 'Bypassing Safety Device',
    pct: 9.7,
    count: 33,
    barColor: 'bg-[#7C3AED]',
  },
  {
    name: 'Dropped Object',
    pct: 6.1,
    count: 21,
    barColor: 'bg-[#2E7D32]',
  },
];

export function TopHazardsChart() {
  return (
    <Card className="flex flex-col panel-card panel-accent-amber h-full">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b border-[#D9DDE0]">
        <div>
          <CardTitle className="text-sm font-semibold text-[#102F3E]">
            Top Hazards / Precursors
          </CardTitle>

          <p className="text-[11px] text-[#667085] mt-0.5">
            Precursor frequency identified by NLP model
          </p>
        </div>

        <Link
          href="/patterns#hazards"
          className="text-[11px] font-medium text-[#102F3E] hover:text-[#C92925] flex items-center hover:underline transition-colors"
        >
          View all
          <ChevronRight className="h-3 w-3 ml-0.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-3 flex-1 flex flex-col justify-around space-y-3">
        {hazardData.map((h) => (
          <div
            key={h.name}
            className="space-y-1.5 group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#17202A] group-hover:text-[#C92925] transition-colors truncate">
                {h.name}
              </span>

              <div className="flex items-center space-x-1 font-mono text-[11px] ml-2 shrink-0">
                <span className="font-bold text-[#102F3E]">
                  {h.pct}%
                </span>

                <span className="text-[#667085]">
                  ({h.count})
                </span>
              </div>
            </div>

            {/* Horizontal progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-[2px] bg-[#E6EAED]">
              <div
                className={`h-full rounded-[2px] transition-all duration-500 ${h.barColor}`}
                style={{
                  width: `${Math.min(h.pct * 4, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}