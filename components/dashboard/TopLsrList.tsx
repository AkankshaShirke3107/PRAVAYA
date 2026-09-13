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
import { useSafetyStore } from '@/lib/store';
import { formatLsrName } from './LsrDistributionChart';

const topRulesFallback = [
  {
    rank: 1,
    rule: 'Energy Isolation',
    count: 451,
    pct: 22.1,
    icon: Zap,
    color:
      'text-[#D97706] bg-[#D97706]/10 border-[#D97706]/20',
    barColor: 'bg-[#D97706]',
  },
  {
    rank: 2,
    rule: 'Work at Height',
    count: 404,
    pct: 19.8,
    icon: ArrowUpRight,
    color:
      'text-[#2F6B84] bg-[#2F6B84]/10 border-[#2F6B84]/20',
    barColor: 'bg-[#2F6B84]',
  },
  {
    rank: 3,
    rule: 'Line of Fire',
    count: 371,
    pct: 18.2,
    icon: Crosshair,
    color:
      'text-[#C92925] bg-[#C92925]/10 border-[#C92925]/20',
    barColor: 'bg-[#C92925]',
  },
  {
    rank: 4,
    rule: 'Confined Space',
    count: 253,
    pct: 12.4,
    icon: Box,
    color:
      'text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20',
    barColor: 'bg-[#7C3AED]',
  },
  {
    rank: 5,
    rule: 'Safe Mechanical Lifting',
    count: 212,
    pct: 10.4,
    icon: Shield,
    color:
      'text-[#2E7D32] bg-[#2E7D32]/10 border-[#2E7D32]/20',
    barColor: 'bg-[#2E7D32]',
  },
];

export function TopLsrList() {
  const { reports } = useSafetyStore();

  const rulesList = React.useMemo(() => {
    if (!reports || reports.length === 0) {
      return topRulesFallback;
    }

    const counts: Record<string, number> = {};

    reports.forEach((r) => {
      let rule = formatLsrName(r.lsrViolated);

      if (!rule || rule === 'Others') {
        rule = r.precursor || 'Others';
      }

      // Normalize naming differences
      if (rule === 'Working at Height') {
        rule = 'Work at Height';
      }

      counts[rule] = (counts[rule] || 0) + 1;
    });

    const total = reports.length;

    const sorted = Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    );

    const top5 = sorted.slice(0, 5);

    const iconsMap: Record<string, React.ElementType> = {
      'Energy Isolation': Zap,
      'Work at Height': ArrowUpRight,
      'Working at Height': ArrowUpRight,
      'Line of Fire': Crosshair,
      'Confined Space': Box,
      'Safe Mechanical Lifting': Shield,
    };

    const stylesMap: Record<
      string,
      { color: string; barColor: string }
    > = {
      'Energy Isolation': {
        color:
          'text-[#D97706] bg-[#D97706]/10 border-[#D97706]/20',
        barColor: 'bg-[#D97706]',
      },
      'Work at Height': {
        color:
          'text-[#2F6B84] bg-[#2F6B84]/10 border-[#2F6B84]/20',
        barColor: 'bg-[#2F6B84]',
      },
      'Working at Height': {
        color:
          'text-[#2F6B84] bg-[#2F6B84]/10 border-[#2F6B84]/20',
        barColor: 'bg-[#2F6B84]',
      },
      'Line of Fire': {
        color:
          'text-[#C92925] bg-[#C92925]/10 border-[#C92925]/20',
        barColor: 'bg-[#C92925]',
      },
      'Confined Space': {
        color:
          'text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20',
        barColor: 'bg-[#7C3AED]',
      },
      'Safe Mechanical Lifting': {
        color:
          'text-[#2E7D32] bg-[#2E7D32]/10 border-[#2E7D32]/20',
        barColor: 'bg-[#2E7D32]',
      },
    };

    return top5.map(([ruleName, count], index) => {
      const pct =
        Math.round((count / total) * 1000) / 10;

      return {
        rank: index + 1,
        rule: ruleName,
        count,
        pct,
        icon: iconsMap[ruleName] || Shield,
        color:
          stylesMap[ruleName]?.color ||
          'text-[#667085] bg-[#667085]/10 border-[#667085]/20',
        barColor:
          stylesMap[ruleName]?.barColor ||
          'bg-[#667085]',
      };
    });
  }, [reports]);

  return (
    <Card className="flex flex-col panel-card panel-accent-navy h-full border border-[#D9DDE0] bg-white shadow-none rounded-[2px]">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b border-[#D9DDE0]">
        <div>
          <CardTitle className="text-sm font-semibold text-[#102F3E]">
            Top 5 Life-Saving Rules
          </CardTitle>

          <p className="text-[11px] text-[#667085] mt-0.5">
            Most frequently breached Oil India safety rules
          </p>
        </div>

        <Link
          href="/patterns#lsr"
          className="text-[11px] font-medium text-[#102F3E] hover:text-[#C92925] flex items-center hover:underline transition-colors"
        >
          View all
          <ChevronRight className="h-3 w-3 ml-0.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-3 flex-1 flex flex-col justify-around space-y-3">
        {rulesList.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.rule}
              className="space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 min-w-0">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] border text-xs font-semibold ${item.color}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <span className="font-medium text-[#17202A] group-hover:text-[#C92925] transition-colors truncate">
                    {item.rank}. {item.rule}
                  </span>
                </div>

                <div className="flex items-center space-x-1 font-mono text-[11px] shrink-0 ml-2">
                  <span className="font-bold text-[#102F3E]">
                    {item.count}
                  </span>

                  <span className="text-[#667085]">
                    ({item.pct}%)
                  </span>
                </div>
              </div>

              <div className="pl-8">
                <Progress
                  value={Math.min(item.pct * 4, 100)}
                  className="h-1.5 bg-[#E6EAED]"
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