'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Flame,
  AlertTriangle,
  FilterX,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { TableSkeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge, getStatusBadgeClass } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { mockReportsData } from '@/lib/mockReports';
import { formatReadableDate } from '@/lib/utils';
import { useSafetyStore } from '@/lib/store';

type SortableField =
  | 'id'
  | 'reportType'
  | 'date'
  | 'location'
  | 'activity'
  | 'sifPotential'
  | 'precursor'
  | 'confidence'
  | 'status';

export default function SifReportsPage() {
  const router = useRouter();
  const { setSelectedReport } = useSafetyStore();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLocation, setSelectedLocation] =
    useState('All Locations');
  const [selectedPrecursor, setSelectedPrecursor] =
    useState('All Precursors');
  const [selectedStatus, setSelectedStatus] =
    useState('All Statuses');

  // Sorting State
  const [sortField, setSortField] =
    useState<SortableField>('date');
  const [sortOrder, setSortOrder] =
    useState<'asc' | 'desc'>('desc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger brief loading animation
  const triggerLoading = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  // Extract unique locations
  const locationOptions = useMemo(() => {
    const locs = new Set<string>();

    mockReportsData.forEach((report) => {
      if (report.field) {
        locs.add(report.field);
      }

      locs.add(report.location);
    });

    return Array.from(locs).sort();
  }, []);

  // Extract unique precursors
  const precursorOptions = useMemo(() => {
    const precursors = new Set<string>();

    mockReportsData.forEach((report) => {
      precursors.add(report.precursor);
    });

    return Array.from(precursors).sort();
  }, []);

  // Filter Reports
  const filteredReports = useMemo(() => {
    return mockReportsData.filter((report) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();

        const matchesQuery =
          report.id.toLowerCase().includes(query) ||
          report.title.toLowerCase().includes(query) ||
          report.description.toLowerCase().includes(query) ||
          report.activity.toLowerCase().includes(query) ||
          report.precursor.toLowerCase().includes(query) ||
          (report.field &&
            report.field.toLowerCase().includes(query)) ||
          report.location.toLowerCase().includes(query);

        if (!matchesQuery) {
          return false;
        }
      }

      // Report Type
      if (
        selectedType !== 'All Types' &&
        report.reportType !== selectedType
      ) {
        return false;
      }

      // Location
      if (
        selectedLocation !== 'All Locations' &&
        report.location !== selectedLocation &&
        report.field !== selectedLocation
      ) {
        return false;
      }

      // Precursor
      if (
        selectedPrecursor !== 'All Precursors' &&
        report.precursor !== selectedPrecursor
      ) {
        return false;
      }

      // Status
      if (
        selectedStatus !== 'All Statuses' &&
        report.status !== selectedStatus
      ) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedType,
    selectedLocation,
    selectedPrecursor,
    selectedStatus,
  ]);

  // Parse mock dates such as "08 May 2026"
  const parseMockDate = (dateStr: string): number => {
    if (!dateStr) {
      return 0;
    }

    const nativeDate = new Date(dateStr).getTime();

    if (!Number.isNaN(nativeDate)) {
      return nativeDate;
    }

    const parts = dateStr.trim().split(' ');

    if (parts.length === 3) {
      const reordered = `${parts[1]} ${parts[0]}, ${parts[2]}`;
      const fallbackDate = new Date(reordered).getTime();

      if (!Number.isNaN(fallbackDate)) {
        return fallbackDate;
      }
    }

    return 0;
  };

  // Sort Reports
  const sortedReports = useMemo(() => {
    return [...filteredReports].sort((a, b) => {
      let valueA: any = a[sortField];
      let valueB: any = b[sortField];

      if (sortField === 'date') {
        valueA = parseMockDate(valueA);
        valueB = parseMockDate(valueB);
      } else if (sortField === 'confidence') {
        valueA = Number(valueA);
        valueB = Number(valueB);
      } else if (sortField === 'sifPotential') {
        const priority: Record<string, number> = {
          Yes: 3,
          Review: 2,
          No: 1,
        };

        valueA = priority[valueA] || 0;
        valueB = priority[valueB] || 0;
      } else if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [filteredReports, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(sortedReports.length / pageSize)
  );

  const startIndex = (currentPage - 1) * pageSize;

  const pageItems = sortedReports.slice(
    startIndex,
    startIndex + pageSize
  );

  // Sort Handler
  const handleSort = (field: SortableField) => {
    triggerLoading();

    if (sortField === field) {
      setSortOrder((previous) =>
        previous === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortField(field);
      setSortOrder('asc');
    }

    setCurrentPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setSelectedLocation('All Locations');
    setSelectedPrecursor('All Precursors');
    setSelectedStatus('All Statuses');
    setCurrentPage(1);
    setSortField('date');
    setSortOrder('desc');

    toast.info('Filters Reset', {
      description:
        'Displaying all 75 baseline incident reports.',
    });
  };

  // Open Report Drawer
  const handleView = (id: string) => {
    const report = mockReportsData.find(
      (item) => item.id === id
    );

    if (report) {
      setSelectedReport(report as any);
    } else {
      router.push(`/reports/${id}`);
    }
  };

  // Sortable Header
  const renderSortableHeader = (
    field: SortableField,
    label: string,
    widthClass?: string
  ) => {
    const isActive = sortField === field;

    return (
      <TableHead
        className={`cursor-pointer select-none transition-colors hover:text-foreground text-xs font-semibold ${widthClass || ''
          }`}
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center gap-1">
          <span>{label}</span>

          {isActive ? (
            sortOrder === 'asc' ? (
              <ArrowUp className="h-3.5 w-3.5 text-[#102F3E] shrink-0" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5 text-[#102F3E] shrink-0" />
            )
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-30 shrink-0 transition-opacity" />
          )}
        </div>
      </TableHead>
    );
  };

  // Quick Summary Counts
  const totalCount = mockReportsData.length;

  const sifYesCount = mockReportsData.filter(
    (report) => report.sifPotential === 'Yes'
  ).length;

  const pendingCount = mockReportsData.filter(
    (report) => report.status === 'Pending'
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E4E7EC] pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17202A] dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#102F3E]" />
            Safety Reports
          </h1>

          <p className="text-xs text-[#667085] dark:text-slate-400 mt-1 font-normal">
            Oil India Limited • Master register of safety
            observations (UA/UC/NM) with SIF precursor evaluation
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-[2px] border border-[#E4E7EC] bg-white dark:bg-slate-900 text-xs shadow-none">
            <span className="text-[#667085]">
              Total Records:
            </span>

            <strong className="font-semibold text-[#17202A] dark:text-white">
              {totalCount}
            </strong>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-[#DC2626]/30 bg-[#DC2626]/10 text-xs text-[#DC2626]">
            <Flame className="w-3.5 h-3.5" />

            <span>SIF Precursors:</span>

            <strong className="font-bold">
              {sifYesCount}
            </strong>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-xs text-[#D97706]">
            <AlertTriangle className="w-3.5 h-3.5" />

            <span>Pending Sign-off:</span>

            <strong className="font-bold">
              {pendingCount}
            </strong>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="border border-[#E4E7EC] bg-white dark:bg-slate-900 shadow-none rounded-[2px]">
        <CardContent className="p-5 sm:p-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              type="text"
              placeholder="Search by Report ID, narrative text, activity, location, or precursor..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-8 h-9 text-xs"
            />

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Report Type */}
            <div className="min-w-[130px] flex-1 sm:flex-initial">
              <Select
                value={selectedType}
                onValueChange={(value) => {
                  setSelectedType(value);
                  setCurrentPage(1);
                  triggerLoading();
                }}
              >
                <SelectTrigger className="h-8 text-xs bg-background">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem
                    value="All Types"
                    className="text-xs"
                  >
                    All Types
                  </SelectItem>

                  <SelectItem value="UA" className="text-xs">
                    Unsafe Act (UA)
                  </SelectItem>

                  <SelectItem value="UC" className="text-xs">
                    Unsafe Condition (UC)
                  </SelectItem>

                  <SelectItem value="NM" className="text-xs">
                    Near Miss (NM)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="min-w-[180px] flex-1 sm:flex-initial">
              <Select
                value={selectedLocation}
                onValueChange={(value) => {
                  setSelectedLocation(value);
                  setCurrentPage(1);
                  triggerLoading();
                }}
              >
                <SelectTrigger className="h-8 text-xs bg-background truncate">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem
                    value="All Locations"
                    className="text-xs"
                  >
                    All Locations
                  </SelectItem>

                  {locationOptions.map((location) => (
                    <SelectItem
                      key={location}
                      value={location}
                      className="text-xs"
                    >
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Precursor */}
            <div className="min-w-[170px] flex-1 sm:flex-initial">
              <Select
                value={selectedPrecursor}
                onValueChange={(value) => {
                  setSelectedPrecursor(value);
                  setCurrentPage(1);
                  triggerLoading();
                }}
              >
                <SelectTrigger className="h-8 text-xs bg-background truncate">
                  <SelectValue placeholder="Primary Precursor" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem
                    value="All Precursors"
                    className="text-xs"
                  >
                    All Precursors
                  </SelectItem>

                  {precursorOptions.map((precursor) => (
                    <SelectItem
                      key={precursor}
                      value={precursor}
                      className="text-xs"
                    >
                      {precursor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="min-w-[130px] flex-1 sm:flex-initial">
              <Select
                value={selectedStatus}
                onValueChange={(value) => {
                  setSelectedStatus(value);
                  setCurrentPage(1);
                  triggerLoading();
                }}
              >
                <SelectTrigger className="h-8 text-xs bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem
                    value="All Statuses"
                    className="text-xs"
                  >
                    All Statuses
                  </SelectItem>

                  <SelectItem
                    value="Confirmed"
                    className="text-xs"
                  >
                    Confirmed
                  </SelectItem>

                  <SelectItem
                    value="Pending"
                    className="text-xs"
                  >
                    Pending
                  </SelectItem>

                  <SelectItem
                    value="Under Review"
                    className="text-xs"
                  >
                    Under Review
                  </SelectItem>

                  <SelectItem
                    value="Escalated"
                    className="text-xs"
                  >
                    Escalated
                  </SelectItem>

                  <SelectItem
                    value="Rejected"
                    className="text-xs"
                  >
                    Rejected
                  </SelectItem>

                  <SelectItem
                    value="Closed"
                    className="text-xs"
                  >
                    Closed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5 ml-auto shrink-0"
              title="Reset all filters and search"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="border border-[#E4E7EC] bg-white dark:bg-slate-900 shadow-none rounded-[2px]">
        <CardContent className="p-0">
          {isLoading ? (
            <TableSkeleton
              rows={pageSize}
              columns={10}
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#F8FAFC] dark:bg-slate-800 border-b border-[#E4E7EC]">
                  <TableRow className="hover:bg-transparent text-[11px] md:text-xs">
                    {renderSortableHeader(
                      'id',
                      'Report ID',
                      'w-[95px] md:w-[105px]'
                    )}

                    {renderSortableHeader(
                      'reportType',
                      'Type',
                      'w-[75px] md:w-[95px]'
                    )}

                    {renderSortableHeader(
                      'date',
                      'Date',
                      'hidden md:table-cell w-[95px]'
                    )}

                    {renderSortableHeader(
                      'location',
                      'Location',
                      'hidden md:table-cell min-w-[140px]'
                    )}

                    {renderSortableHeader(
                      'activity',
                      'Activity',
                      'hidden lg:table-cell min-w-[150px]'
                    )}

                    {renderSortableHeader(
                      'sifPotential',
                      'SIF Potential',
                      'w-[105px] md:w-[115px]'
                    )}

                    {renderSortableHeader(
                      'precursor',
                      'Precursor',
                      'hidden md:table-cell min-w-[140px]'
                    )}

                    {renderSortableHeader(
                      'confidence',
                      'Confidence',
                      'hidden md:table-cell w-[120px]'
                    )}

                    {renderSortableHeader(
                      'status',
                      'Status',
                      'w-[85px] md:w-[100px]'
                    )}

                    <TableHead className="w-[70px] md:w-[80px] text-right pr-3 md:pr-4 text-[11px] md:text-xs font-semibold text-[#667085]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-[11px] md:text-xs">
                  {pageItems.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="h-64 text-center py-12"
                      >
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto text-center space-y-3">
                          <div className="w-12 h-12 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground">
                            <FilterX className="h-6 w-6 text-slate-400" />
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-foreground">
                              No Safety Reports Found
                            </h3>

                            <p className="text-xs text-muted-foreground leading-relaxed">
                              No incident records match your
                              active search query or filter
                              parameters. Try broadening your
                              search or resetting filters.
                            </p>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleResetFilters}
                            className="text-xs h-8 gap-1.5 mt-2"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Reset All Filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    pageItems.map((report) => (
                      <TableRow
                        key={report.id}
                        onClick={() => handleView(report.id)}
                        className="cursor-pointer hover:bg-muted/50 transition-colors group"
                      >
                        {/* Report ID */}
                        <TableCell className="font-mono text-xs font-bold text-[#102F3E] group-hover:underline whitespace-nowrap py-3">
                          {report.id}
                        </TableCell>

                        {/* Report Type */}
                        <TableCell className="whitespace-nowrap py-3">
                          <Badge
                            variant="outline"
                            className={`text-[10px] md:text-[11px] font-semibold px-1.5 md:px-2 py-0.5 ${getStatusBadgeClass(
                              report.reportType
                            )}`}
                          >
                            {report.reportType}
                          </Badge>
                        </TableCell>

                        {/* Date */}
                        <TableCell className="hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap py-3">
                          {formatReadableDate(report.date)}
                        </TableCell>

                        {/* Location */}
                        <TableCell
                          className="hidden md:table-cell text-xs font-medium text-foreground max-w-[170px] truncate py-3"
                          title={report.location}
                        >
                          {report.location}
                        </TableCell>

                        {/* Activity */}
                        <TableCell
                          className="hidden lg:table-cell text-xs text-foreground/90 max-w-[170px] truncate py-3"
                          title={report.activity}
                        >
                          {report.activity}
                        </TableCell>

                        {/* SIF Potential */}
                        <TableCell className="whitespace-nowrap py-3">
                          <Badge
                            variant="outline"
                            className={`text-[10px] md:text-[11px] px-1.5 md:px-2 py-0.5 ${getStatusBadgeClass(
                              report.sifPotential
                            )}`}
                          >
                            {report.sifPotential}
                          </Badge>
                        </TableCell>

                        {/* Precursor */}
                        <TableCell
                          className="hidden md:table-cell text-xs font-medium text-foreground max-w-[150px] truncate py-3"
                          title={report.precursor}
                        >
                          {report.precursor}
                        </TableCell>

                        {/* Confidence */}
                        <TableCell className="hidden md:table-cell whitespace-nowrap py-3">
                          <div className="flex items-center gap-2 min-w-[100px]">
                            <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${report.confidence >= 85
                                  ? 'bg-emerald-500'
                                  : report.confidence >= 70
                                    ? 'bg-sky-500'
                                    : 'bg-amber-500'
                                  }`}
                                style={{
                                  width: `${report.confidence}%`,
                                }}
                              />
                            </div>

                            <span className="font-mono text-xs font-semibold text-foreground w-7 text-right">
                              {report.confidence}%
                            </span>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell className="whitespace-nowrap py-3">
                          <Badge
                            variant="outline"
                            className={`text-[10px] md:text-[11px] px-1.5 md:px-2 py-0.5 ${getStatusBadgeClass(
                              report.status
                            )}`}
                          >
                            {report.status}
                          </Badge>
                        </TableCell>

                        {/* Actions */}
                        <TableCell
                          className="text-right pr-3 md:pr-4 whitespace-nowrap py-3"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleView(report.id)
                            }
                            className="h-8 px-2.5 text-xs text-[#102F3E] hover:text-[#C92925] hover:bg-[#F3F2EE] gap-1 min-h-[32px] touch-manipulation"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border/50 text-xs">
            {/* Summary */}
            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <span>
                Showing{' '}
                <strong className="text-foreground font-mono font-semibold">
                  {sortedReports.length > 0
                    ? startIndex + 1
                    : 0}
                </strong>{' '}
                to{' '}
                <strong className="text-foreground font-mono font-semibold">
                  {Math.min(
                    startIndex + pageSize,
                    sortedReports.length
                  )}
                </strong>{' '}
                of{' '}
                <strong className="text-foreground font-mono font-semibold">
                  {sortedReports.length}
                </strong>{' '}
                reports
              </span>

              {/* Rows Per Page */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-border/50">
                <span>Rows:</span>

                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    setPageSize(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-7 w-[68px] text-xs bg-background font-mono">
                    <SelectValue
                      placeholder={String(pageSize)}
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem
                      value="10"
                      className="text-xs font-mono"
                    >
                      10
                    </SelectItem>

                    <SelectItem
                      value="25"
                      className="text-xs font-mono"
                    >
                      25
                    </SelectItem>

                    <SelectItem
                      value="50"
                      className="text-xs font-mono"
                    >
                      50
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Page Controls */}
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
                disabled={currentPage === 1}
                className="h-7 px-2 text-xs gap-1"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  Prev
                </span>
              </Button>

              {Array.from(
                { length: totalPages },
                (_, index) => {
                  const page = index + 1;

                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 &&
                      page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={
                          currentPage === page
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`h-7 w-7 p-0 text-xs font-mono ${currentPage === page
                          ? 'bg-[#102F3E] hover:bg-[#082735] text-white'
                          : ''
                          }`}
                      >
                        {page}
                      </Button>
                    );
                  }

                  if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span
                        key={page}
                        className="px-1 text-muted-foreground"
                      >
                        ...
                      </span>
                    );
                  }

                  return null;
                }
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                disabled={currentPage === totalPages}
                className="h-7 px-2 text-xs gap-1"
              >
                <span className="hidden sm:inline">
                  Next
                </span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}