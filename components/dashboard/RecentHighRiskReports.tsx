'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertOctagon,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useSafetyStore } from '@/lib/store';
import { formatReadableDate } from '@/lib/utils';
import { SafetyReport } from '@/types';

interface HighRiskReportItem {
  id: string;
  date: string;
  location: string;
  precursor: string;
  riskLevel: 'High' | 'Medium';
  fullReport?: SafetyReport;
}

const defaultHighRiskReports: HighRiskReportItem[] = [
  {
    id: 'OIL-UA-2026-1044',
    date: '2026-05-28',
    location: 'Moran Gas Compressor Station A',
    precursor: 'Atmospheric Hazard',
    riskLevel: 'High',
  },
  {
    id: 'OIL-UC-2026-1024',
    date: '2026-05-28',
    location: 'Duliajan Compressor Station #2',
    precursor: 'Line of Fire',
    riskLevel: 'High',
  },
  {
    id: 'OIL-NM-2026-0988',
    date: '2026-05-27',
    location: 'Digboi Wellhead Rig #4',
    precursor: 'Work at Height',
    riskLevel: 'High',
  },
  {
    id: 'OIL-UA-2026-0972',
    date: '2026-05-26',
    location: 'Kumchai GGS-1 Manifold',
    precursor: 'Energy Isolation',
    riskLevel: 'Medium',
  },
  {
    id: 'OIL-UC-2026-0955',
    date: '2026-05-25',
    location: 'Jorhat Flow Station #3',
    precursor: 'Confined Space',
    riskLevel: 'High',
  },
];

export function RecentHighRiskReports() {
  const { reports, setSelectedReport } = useSafetyStore();

  // Pick the 5 most recent High / Medium SIF potential reports
  const highRiskReports: HighRiskReportItem[] = React.useMemo(() => {
    if (reports && reports.length > 0) {
      const filtered = reports
        .filter(
          (r) =>
            r.sifPotential === 'Yes' ||
            r.sifPotential === 'High' ||
            r.sifLevel === 'High' ||
            r.sifLevel === 'Medium'
        )
        .sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        )
        .slice(0, 5)
        .map((r) => {
          const isHigh =
            r.sifLevel === 'High' ||
            r.sifPotential === 'High' ||
            (r.confidence && r.confidence >= 90);

          return {
            id: r.id,
            date: r.date,
            location: r.location || r.site,
            precursor: r.precursor,
            riskLevel: (isHigh ? 'High' : 'Medium') as
              | 'High'
              | 'Medium',
            fullReport: r,
          };
        });

      if (filtered.length > 0) {
        return filtered;
      }
    }

    return defaultHighRiskReports;
  }, [reports]);

  const handleRowClick = (item: HighRiskReportItem) => {
    if (item.fullReport) {
      setSelectedReport(item.fullReport);
    } else {
      const found = reports.find((r) => r.id === item.id);

      if (found) {
        setSelectedReport(found);
      }
    }
  };

  return (
    <Card className="flex flex-col panel-card panel-accent-red h-full">
      <CardHeader className="p-3.5 sm:p-5 pb-2 flex flex-row items-center justify-between border-b border-[#D9DDE0]">
        <div>
          <CardTitle className="text-sm sm:text-base font-bold text-[#102F3E] flex items-center gap-2">
            <AlertOctagon className="h-4 w-4 text-[#C92925] shrink-0" />
            Recent High-Risk Reports
          </CardTitle>

          <p className="text-[11px] sm:text-xs text-[#667085] mt-0.5">
            5 most recent critical and elevated risk safety observations
          </p>
        </div>

        <Link
          href="/reports"
          className="inline-flex items-center text-xs font-semibold text-[#102F3E] hover:text-[#C92925] gap-0.5 transition-colors"
        >
          View All
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col justify-between min-w-0">
        <div className="overflow-x-auto min-w-0">
          <Table>
            <TableHeader className="bg-[#082735]">
              <TableRow className="hover:bg-transparent border-b border-[#D9DDE0]">
                <TableHead className="w-[120px] sm:w-[140px] text-[11px] sm:text-xs font-bold text-white py-2 sm:py-3">
                  Report ID
                </TableHead>

                <TableHead className="hidden md:table-cell w-[100px] text-[11px] sm:text-xs font-bold text-white py-2 sm:py-3">
                  Date
                </TableHead>

                <TableHead className="hidden sm:table-cell min-w-[140px] text-[11px] sm:text-xs font-bold text-white py-2 sm:py-3">
                  Location
                </TableHead>

                <TableHead className="min-w-[110px] text-[11px] sm:text-xs font-bold text-white py-2 sm:py-3">
                  Precursor
                </TableHead>

                <TableHead className="w-[80px] sm:w-[90px] text-right pr-3 sm:pr-4 text-[11px] sm:text-xs font-bold text-white py-2 sm:py-3">
                  Risk Level
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {highRiskReports.map((report, idx) => (
                <TableRow
                  key={report.id}
                  onClick={() => handleRowClick(report)}
                  className={`cursor-pointer industrial-row-hover transition-colors group border-b border-[#D9DDE0] ${idx % 2 === 1
                      ? 'industrial-row-even'
                      : 'bg-white'
                    } ${report.riskLevel === 'High'
                      ? 'high-priority-left-border'
                      : ''
                    }`}
                >
                  <TableCell className="font-mono text-[11px] sm:text-xs font-bold text-[#102F3E] group-hover:text-[#C92925] group-hover:underline flex items-center gap-1 py-2 sm:py-3">
                    {report.id}

                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C92925]" />
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-[11px] sm:text-xs text-[#667085] whitespace-nowrap py-2 sm:py-3">
                    {formatReadableDate(report.date)}
                  </TableCell>

                  <TableCell
                    className="hidden sm:table-cell text-[11px] sm:text-xs font-medium text-[#17202A] max-w-[160px] truncate py-2 sm:py-3"
                    title={report.location}
                  >
                    {report.location}
                  </TableCell>

                  <TableCell
                    className="text-[11px] sm:text-xs text-[#17202A] max-w-[120px] sm:max-w-[140px] truncate py-2 sm:py-3"
                    title={report.precursor}
                  >
                    {report.precursor}
                  </TableCell>

                  <TableCell className="text-right pr-3 sm:pr-4 py-2 sm:py-3">
                    <Badge
                      variant="outline"
                      className={`text-[10px] sm:text-[11px] font-bold tracking-wide px-1.5 sm:px-2 py-0.5 rounded-full ${report.riskLevel === 'High'
                          ? 'bg-[#C92925]/10 text-[#C92925] border-[#C92925]/30'
                          : 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30'
                        }`}
                    >
                      {report.riskLevel}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer info row */}
        <div className="p-3 border-t border-[#D9DDE0] flex items-center justify-between text-[11px] text-[#667085] bg-[#F3F2EE]">
          <span>
            Click any row to inspect report details and root causes
          </span>

          <span className="font-mono text-[10px] text-[#667085] font-semibold">
            Top 5 priority items
          </span>
        </div>
      </CardContent>
    </Card>
  );
}