'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
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
import { SafetyReport } from '@/types';

export function RecentReportsTable() {
  const { reports, filters, setSelectedReport, resetFilters } = useSafetyStore();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter based on store filters
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

    // SIF Level filter
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

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const pageReports = filteredReports.slice(startIndex, startIndex + pageSize);

  return (
    <Card className="flex flex-col border bg-card/90 shadow-sm">
      <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            Recent High SIF Potential Reports
            <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-500 border border-rose-500/20">
              Live Feed
            </span>
          </CardTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Audit events flagged with high probability of life-altering outcome
          </p>
        </div>
        <Link
          href="/reports"
          className="text-[11px] font-medium text-sky-500 hover:text-sky-400 flex items-center hover:underline"
        >
          View all
          <ChevronRight className="h-3 w-3 ml-0.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="text-[11px] md:text-xs">
                <TableHead className="w-[110px] md:w-[120px]">Report ID</TableHead>
                <TableHead className="hidden md:table-cell w-[95px]">Date</TableHead>
                <TableHead className="hidden md:table-cell min-w-[140px]">Site</TableHead>
                <TableHead className="w-[60px]">Type</TableHead>
                <TableHead className="hidden md:table-cell min-w-[130px]">Precursor</TableHead>
                <TableHead className="w-[95px] md:w-[100px]">SIF Potential</TableHead>
                <TableHead className="hidden lg:table-cell min-w-[130px]">LSR Violated</TableHead>
                <TableHead className="w-[85px] md:w-[100px]">Status</TableHead>
                <TableHead className="w-[60px] text-right pr-3 md:pr-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-[11px] md:text-xs">
              {pageReports.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-52 text-center py-8"
                  >
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto text-center space-y-2.5">
                      <div className="w-10 h-10 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground">
                        <FilterX className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">
                          No Reports Match Active Filters
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Try adjusting your site, department, or SIF level filters.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          resetFilters();
                          toast.info('Filters Reset', {
                            description: 'All dashboard filters cleared to defaults.',
                          });
                        }}
                        className="text-xs h-7 px-3 gap-1.5 mt-1"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Reset Filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                pageReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => setSelectedReport(report)}
                  >
                    <TableCell className="font-mono text-xs font-semibold text-sky-500 hover:underline whitespace-nowrap py-2.5">
                      {report.id}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground whitespace-nowrap py-2.5">
                      {formatReadableDate(report.date)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-medium text-foreground max-w-[160px] truncate py-2.5" title={report.site}>
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
                    <TableCell className="hidden md:table-cell font-medium text-foreground max-w-[150px] truncate py-2.5" title={report.precursor}>
                      {report.precursor}
                    </TableCell>
                    <TableCell className="py-2.5 whitespace-nowrap">
                      <Badge
                        variant="outline"
                        className={getSifBadgeColor(report.sifPotential)}
                      >
                        {report.sifPotential}
                        {(report.sifPotential === 'Yes' || report.sifPotential === 'High') && (
                          <span className="ml-1 text-[9px] opacity-80 font-mono">
                            ({report.confidence || Math.round((report.confidenceScore || 0) * 100)}%)
                          </span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground max-w-[140px] truncate py-2.5" title={report.lsrViolated}>
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
                    <TableCell className="text-right pr-3 md:pr-4 py-2.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReport(report);
                        }}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-sky-500 touch-manipulation"
                        title="Quick View Insight"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 text-xs">
          <span className="text-muted-foreground text-[11px]">
            Showing{' '}
            <strong className="text-foreground font-mono">
              {filteredReports.length > 0 ? startIndex + 1 : 0}
            </strong>{' '}
            to{' '}
            <strong className="text-foreground font-mono">
              {Math.min(startIndex + pageSize, filteredReports.length)}
            </strong>{' '}
            of{' '}
            <strong className="text-foreground font-mono">
              {filteredReports.length}
            </strong>{' '}
            reports
          </span>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-7 w-7 p-0 text-xs"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
              const p = idx + 1;
              return (
                <Button
                  key={p}
                  variant={currentPage === p ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(p)}
                  className={`h-7 w-7 p-0 text-xs font-mono ${
                    currentPage === p ? 'bg-sky-600 hover:bg-sky-700 text-white' : ''
                  }`}
                >
                  {p}
                </Button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="px-1 text-muted-foreground">...</span>
                <Button
                  variant={currentPage === totalPages ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  className="h-7 w-7 p-0 text-xs font-mono"
                >
                  {totalPages}
                </Button>
              </>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-7 w-7 p-0 text-xs"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
