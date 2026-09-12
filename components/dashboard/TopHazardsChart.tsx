'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const hazardData = [
  { name: 'Improper Isolation', pct: 18.6, count: 64, barColor: 'bg-amber-500' },
  { name: 'Working at Height', pct: 16.2, count: 55, barColor: 'bg-sky-500' },
  { name: 'Line of Fire', pct: 14.8, count: 51, barColor: 'bg-rose-500' },
  { name: 'Bypassing Safety Device', pct: 9.7, count: 33, barColor: 'bg-purple-500' },
  { name: 'Dropped Object', pct: 6.1, count: 21, barColor: 'bg-emerald-500' },
];

export function TopHazardsChart() {
  return (
    <Card className="flex flex-col border bg-card/90 shadow-sm h-full">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground">
            Top Hazards / Precursors
          </CardTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Precursor frequency identified by NLP model
          </p>
        </div>
        <Link
          href="/patterns#hazards"
          className="text-[11px] font-medium text-sky-500 hover:text-sky-400 flex items-center hover:underline"
        >
          View all
          <ChevronRight className="h-3 w-3 ml-0.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-1 flex-1 flex flex-col justify-around space-y-2.5">
        {hazardData.map((h) => (
          <div key={h.name} className="space-y-1 group">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground group-hover:text-sky-500 transition-colors">
                {h.name}
              </span>
              <div className="flex items-center space-x-1 font-mono text-[11px]">
                <span className="font-bold text-foreground">{h.pct}%</span>
                <span className="text-muted-foreground">({h.count})</span>
              </div>
            </div>

            {/* Horizontal progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted/60">
              <div
                className={`h-full rounded-full transition-all duration-500 ${h.barColor}`}
                style={{ width: `${h.pct * 4}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
