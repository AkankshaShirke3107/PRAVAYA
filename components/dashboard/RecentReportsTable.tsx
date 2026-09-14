'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  FilterX,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSafetyStore } from '@/lib/store';
import {
  getSifBadgeColor,
  getStatusBadgeColor,
  getTypeBadgeColor,
  formatReadableDate,
} from '@/lib/utils';

export function RecentReportsTable() {
  const { reports, filters, setSelectedReport, resetFilters } = useSafetyStore();
  const [currentPage, setCurrentPage] = useState(1);

  // Display 8 reports per page
  const pageSize = 8;

  // Filter reports based on active store filters
  const filteredReports = reports.filter((r) => {
    // Search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();

      const match =
        r.id.toLowerCase().includes(q) ||
        r.site.toLowerCase().includes(q) ||
        r.precursor.toLowerCase().includes(q) ||
        r.lsrViolated.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q);

      if (!match) return false;
    }

    // Site filter
    if (filters.site !== 'All Sites' && r.field !== filters.site) {
      return false;
    }

    // Department filter
    if (
      filters.department !== 'All Departments' &&
      r.department !== filters.department
    ) {
      return false;
    }

    // SIF level filter
    if (
      filters.sifLevel &&
      filters.sifLevel !== 'All SIF Levels' &&
      filters.sifLevel !== 'All Levels'
    ) {
      const match =
        r.sifPotential === filters.sifLevel ||
        r.sifLevel === filters.sifLevel ||
        (filters.sifLevel === 'High' && r.sifPotential === 'Yes');

      if (!match) return false;
    }

    return true;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / pageSize)
  );

  const startIndex = (currentPage - 1) * pageSize;

  const pageReports = filteredReports.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <Card className="flex flex-col panel-card panel-accent-navy">
      <CardHeader className="p-4 flex flex-row items-center justify-between border-b border-[#D9DDE0]">
        <div>
          <CardTitle className="text-base font-bold text-[#102F3E] flex items-center gap-2">
            Safety Observations &amp; SIF Precursor Records
          </CardTitle>

          <p className="text-xs text-[#667085] mt-0.5 font-normal">
            Corporate Oil India safety log: Unsafe Acts (UA), Unsafe Conditions
            (UC), and Near Misses (NM)
          </p>
        </div>

        <Link
          href="/reports"
          className="text-xs font-semibold text-[#102F3E] hover:text-[#C92925] flex items-center hover:underline"
        >
          View all reports
          <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-0 flex-1 min-w-0">
        <div className="overflow-x-auto min-w-0">
          <Table>
            <TableHeader className="bg-[#082735]">
              <TableRow className="text-xs border-b border-[#D9DDE0]">
                <TableHead className="w-[120px] font-bold text-white">
                  Report ID
                </TableHead>

                <TableHead className="hidden md:table-cell w-[100px] font-bold text-white">
                  Date
                </TableHead>

                <TableHead className="hidden md:table-cell min-w-[140px] font-bold text-white">
                  Site
                </TableHead>

                <TableHead className="w-[70px] font-bold text-white">
                  Type
                </TableHead>

                <TableHead className="hidden md:table-cell min-w-[140px] font-bold text-white">
                  Precursor Category
                </TableHead>

                <TableHead className="w-[110px] font-bold text-white">
                  SIF Potential
                </TableHead>

                <TableHead className="hidden lg:table-cell min-w-[140px] font-bold text-white">
                  LSR Violated
                </TableHead>

                <TableHead className="w-[100px] font-bold text-white">
                  Status
                </TableHead>

                <TableHead className="w-[60px] text-right pr-4 font-bold text-white">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-xs">
              {pageReports.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-48 text-center py-8"
                  >
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto text-center space-y-2">
                      <div className="w-9 h-9 rounded-[2px] bg-[#F3F2EE] flex items-center justify-center text-[#667085]">
                        <FilterX className="h-4 w-4" />
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-[#102F3E]">
                          No Safety Reports Found
                        </h4>

                        <p className="text-[11px] text-[#667085] mt-0.5">
                          Try clearing active search or site filters.
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          resetFilters();

                          setCurrentPage(1);

                          toast.info('Filters Reset', {
                            description:
                              'All dashboard filters cleared to defaults.',
                          });
                        }}
                        className="text-xs h-7 px-3 gap-1.5 mt-1 border-[#D9DDE0] rounded-[2px]"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Reset Filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                pageReports.map((report, idx) => {
                  const isHighPriority =
                    report.sifPotential === 'Yes' ||
                    report.sifPotential === 'High' ||
                    report.sifLevel === 'High';

                  return (
                    <TableRow
                      key={report.id}
                      className={`cursor-pointer industrial-row-hover transition-colors border-b border-[#D9DDE0] ${idx % 2 === 1
                          ? 'industrial-row-even'
                          : 'bg-white'
                        } ${isHighPriority
                          ? 'high-priority-left-border'
                          : ''
                        }`}
                      onClick={() => setSelectedReport(report)}
                    >
                      <TableCell className="font-mono text-xs font-bold text-[#102F3E] hover:text-[#C92925] hover:underline whitespace-nowrap py-2.5">
                        {report.id}
                      </TableCell>

                      <TableCell className="hidden md:table-cell text-[#667085] whitespace-nowrap py-2.5">
                        {formatReadableDate(report.date)}
                      </TableCell>

                      <TableCell
                        className="hidden md:table-cell font-semibold text-[#17202A] max-w-[160px] truncate py-2.5"
                        title={report.site}
                      >
                        {report.site}
                      </TableCell>

                      <TableCell className="py-2.5">
                        <Badge
                          variant="outline"
                          className={getTypeBadgeColor(report.reportType)}
                        >
                          {report.reportType}
                        </Badge>
                      </TableCell>

                      <TableCell
                        className="hidden md:table-cell font-medium text-[#475569] max-w-[150px] truncate py-2.5"
                        title={report.precursor}
                      >
                        {report.precursor}
                      </TableCell>

                      <TableCell className="py-2.5 whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className={getSifBadgeColor(
                            report.sifPotential
                          )}
                        >
                          {report.sifPotential}

                          {(report.sifPotential === 'Yes' ||
                            report.sifPotential === 'High') && (
                              <span className="ml-1 text-[9px] font-mono">
                                (
                                {report.confidence ||
                                  Math.round(
                                    (report.confidenceScore || 0) * 100
                                  )}
                                %)
                              </span>
                            )}
                        </Badge>
                      </TableCell>

                      <TableCell
                        className="hidden lg:table-cell text-[#667085] max-w-[140px] truncate py-2.5"
                        title={report.lsrViolated}
                      >
                        {report.lsrViolated}
                      </TableCell>

                      <TableCell className="py-2.5 whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className={getStatusBadgeColor(report.status)}
                        >
                          {report.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right pr-4 py-2.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReport(report);
                          }}
                          className="h-7 w-7 p-0 text-[#667085] hover:text-[#2563EB]"
                          title="View Report Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#D9DDE0] text-xs bg-white">
          <span className="text-[#667085] text-[11px]">
            Showing{' '}
            <strong className="text-[#102F3E] font-semibold">
              {filteredReports.length > 0 ? startIndex + 1 : 0}
            </strong>{' '}
            to{' '}
            <strong className="text-[#102F3E] font-semibold">
              {Math.min(
                startIndex + pageSize,
                filteredReports.length
              )}
            </strong>{' '}
            of{' '}
            <strong className="text-[#102F3E] font-semibold">
              {filteredReports.length}
            </strong>{' '}
            entries
          </span>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((p) => Math.max(1, p - 1))
              }
              disabled={currentPage === 1}
              className="h-7 w-7 p-0 text-xs border-[#D9DDE0] rounded-[2px]"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>

            {Array.from(
              { length: Math.min(5, totalPages) },
              (_, idx) => {
                const p = idx + 1;

                return (
                  <Button
                    key={p}
                    variant={
                      currentPage === p ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setCurrentPage(p)}
                    className={`h-7 w-7 p-0 text-xs font-semibold rounded-[2px] ${currentPage === p
                        ? 'bg-[#102F3E] hover:bg-[#082735] text-white'
                        : 'border-[#D9DDE0] text-[#17202A]'
                      }`}
                  >
                    {p}
                  </Button>
                );
              }
            )}

            {totalPages > 5 && (
              <>
                <span className="px-1 text-[#667085]">...</span>

                <Button
                  variant={
                    currentPage === totalPages
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  className={`h-7 w-7 p-0 text-xs font-semibold border-[#D9DDE0] rounded-[2px] ${currentPage === totalPages
                      ? 'bg-[#102F3E] hover:bg-[#082735] text-white'
                      : 'text-[#17202A]'
                    }`}
                >
                  {totalPages}
                </Button>
              </>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              disabled={currentPage === totalPages}
              className="h-7 w-7 p-0 text-xs border-[#D9DDE0] rounded-[2px]"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}