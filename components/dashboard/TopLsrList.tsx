'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ArrowUpRight,
  Crosshair,
  Box,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const topRules = [
  {
    rank: 1,
    rule: 'Energy Isolation',
    count: 451,
    pct: 22.1,
    icon: Zap,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    barColor: 'bg-amber-500',
  },
  {
    rank: 2,
    rule: 'Working at Height',
    count: 404,
    pct: 19.8,
    icon: ArrowUpRight,
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    barColor: 'bg-sky-500',
  },
  {
    rank: 3,
    rule: 'Line of Fire',
    count: 371,
    pct: 18.2,
    icon: Crosshair,
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    barColor: 'bg-rose-500',
  },
  {
    rank: 4,
    rule: 'Confined Space',
    count: 253,
    pct: 12.4,
    icon: Box,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    barColor: 'bg-purple-500',
  },
  {
    rank: 5,
    rule: 'Safe Mechanical Lifting',
    count: 212,
    pct: 10.4,
    icon: Shield,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    barColor: 'bg-emerald-500',
  },
];

export function TopLsrList() {
  return (
    <Card className="flex flex-col border bg-card/90 shadow-sm h-full">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground">
            Top 5 Life-Saving Rules
          </CardTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Most frequently breached Oil India safety rules
          </p>
        </div>
        <Link
          href="/patterns#lsr"
          className="text-[11px] font-medium text-sky-500 hover:text-sky-400 flex items-center hover:underline"
        >
          View all
          <ChevronRight className="h-3 w-3 ml-0.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-1 flex-1 flex flex-col justify-around space-y-2.5">
        {topRules.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.rule} className="space-y-1 group">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-md border text-xs font-semibold ${item.color}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-medium text-foreground group-hover:text-sky-500 transition-colors">
                    {item.rank}. {item.rule}
                  </span>
                </div>
                <div className="flex items-center space-x-1 font-mono text-[11px]">
                  <span className="font-bold text-foreground">{item.count}</span>
                  <span className="text-muted-foreground">({item.pct}%)</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="pl-8">
                <Progress
                  value={item.pct * 4} // scaled visual representation
                  className="h-1.5 bg-muted"
                  indicatorClassName={item.barColor}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
