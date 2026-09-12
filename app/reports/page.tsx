'use client';

import React, { useState, useMemo } from 'react';
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
  ShieldAlert,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Filter,
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockReportsData, ReportItem } from '@/lib/mockReports';
import { formatReadableDate } from '@/lib/utils';

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

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedPrecursor, setSelectedPrecursor] = useState('All Precursors');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // Sorting State
  const [sortField, setSortField] = useState<SortableField>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger brief realistic skeleton animation when filters change
  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 200);
  };

  // Extract unique locations and precursors for dropdown filters
  const locationOptions = useMemo(() => {
    const locs = new Set<string>();
    mockReportsData.forEach((r) => {
      if (r.field) locs.add(r.field);
      locs.add(r.location);
    });
    return Array.from(locs).sort();
  }, []);

  const precursorOptions = useMemo(() => {
    const precs = new Set<string>();
    mockReportsData.forEach((r) => {
      precs.add(r.precursor);
    });
    return Array.from(precs).sort();
  }, []);

  // Filtered & Sorted Reports
  const filteredReports = useMemo(() => {
    return mockReportsData.filter((r) => {
      // Search query matches ID, title, description, activity, precursor, field, or location
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          r.id.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.activity.toLowerCase().includes(q) ||
          r.precursor.toLowerCase().includes(q) ||
          (r.field && r.field.toLowerCase().includes(q)) ||
          r.location.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Filter: Report Type
      if (selectedType !== 'All Types' && r.reportType !== selectedType) {
        return false;
      }

      // Filter: Location (matches field or exact location)
      if (
        selectedLocation !== 'All Locations' &&
        r.location !== selectedLocation &&
        r.field !== selectedLocation
      ) {
        return false;
      }

      // Filter: Precursor
      if (
        selectedPrecursor !== 'All Precursors' &&
        r.precursor !== selectedPrecursor
      ) {
        return false;
      }

      // Filter: Status
      if (selectedStatus !== 'All Statuses' && r.status !== selectedStatus) {
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

  const sortedReports = useMemo(() => {
    return [...filteredReports].sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'date') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else if (sortField === 'confidence') {
        valA = Number(valA);
        valB = Number(valB);
      } else if (sortField === 'sifPotential') {
        // Yes > Review > No priority
        const priority: Record<string, number> = { Yes: 3, Review: 2, No: 1 };
        valA = priority[valA] || 0;
        valB = priority[valB] || 0;
      } else if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredReports, sortField, sortOrder]);

  // Pagination Math
  const totalPages = Math.max(1, Math.ceil(sortedReports.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = sortedReports.slice(startIndex, startIndex + pageSize);

  // Handle Sort Click
  const handleSort = (field: SortableField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Reset all filters
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
      description: 'Displaying all 75 baseline incident reports.',
    });
  };

  // Navigate to Report Details
  const handleView = (id: string) => {
    router.push(`/reports/${id}`);
  };

  // Helper Badge Color Getters
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'UA':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30';
      case 'UC':
        return 'bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30';
      case 'NM':
        return 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSifBadgeClass = (sif: string) => {
    switch (sif) {
      case 'Yes':
        return 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 font-semibold';
      case 'Review':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 font-semibold';
      case 'No':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-semibold';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-semibold';
      case 'Pending':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 font-semibold';
      case 'Rejected':
        return 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 font-semibold';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Render Sort Header
  const renderSortableHeader = (
    field: SortableField,
    label: string,
    widthClass?: string
  ) => {
    const isActive = sortField === field;
    return (
      <TableHead
        className={`cursor-pointer select-none transition-colors hover:text-foreground text-xs font-semibold ${
          widthClass || ''
        }`}
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center gap-1">
          <span>{label}</span>
          {isActive ? (
            sortOrder === 'asc' ? (
              <ArrowUp className="h-3.5 w-3.5 text-sky-500 shrink-0" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5 text-sky-500 shrink-0" />
            )
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-70 shrink-0 transition-opacity" />
          )}
        </div>
      </TableHead>
    );
  };

  // Quick summary counts
  const totalCount = mockReportsData.length;
  const sifYesCount = mockReportsData.filter((r) => r.sifPotential === 'Yes').length;
  const pendingCount = mockReportsData.filter((r) => r.status === 'Pending').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header & Stat Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1e293b] dark:text-slate-100 flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0ea5e9]" />
            SIF Safety Reports
          </h1>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Searchable and filterable central registry of operational safety observations with AI precursor detection
          </p>
        </div>

        {/* Quick stat counters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#e2e8f0] bg-white dark:bg-card text-xs shadow-2xs">
            <span className="text-[#64748b]">Total:</span>
            <strong className="font-mono text-[#1e293b] dark:text-slate-100">{totalCount}</strong>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-xs text-red-600 dark:text-red-400">
            <Flame className="w-3.5 h-3.5" />
            <span>SIF Potential:</span>
            <strong className="font-mono font-bold">{sifYesCount}</strong>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Pending Review:</span>
            <strong className="font-mono font-bold">{pendingCount}</strong>
          </div>
        </div>
      </div>

      {/* Filter Bar & Search Container */}
      <Card className="border border-[#e2e8f0] bg-white dark:bg-card dark:border-border shadow-xs hover:shadow-md transition-all duration-200">
        <CardContent className="p-6 space-y-4">
          {/* Top Row: Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by Report ID, narrative text, activity, location, or precursor..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-8 h-9 text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Bottom Row: Filter Dropdowns & Reset Button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter 1: Report Type */}
            <div className="min-w-[130px] flex-1 sm:flex-initial">
              <Select
                value={selectedType}
                onValueChange={(val) => {
                  setSelectedType(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 text-xs bg-background">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types" className="text-xs">
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

            {/* Filter 2: Location */}
            <div className="min-w-[180px] flex-1 sm:flex-initial">
              <Select
                value={selectedLocation}
                onValueChange={(val) => {
                  setSelectedLocation(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 text-xs bg-background truncate">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Locations" className="text-xs">
                    All Locations
                  </SelectItem>
                  {locationOptions.map((loc) => (
                    <SelectItem key={loc} value={loc} className="text-xs">
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter 3: Precursor */}
            <div className="min-w-[170px] flex-1 sm:flex-initial">
              <Select
                value={selectedPrecursor}
                onValueChange={(val) => {
                  setSelectedPrecursor(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 text-xs bg-background truncate">
                  <SelectValue placeholder="Primary Precursor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Precursors" className="text-xs">
                    All Precursors
                  </SelectItem>
                  {precursorOptions.map((prec) => (
                    <SelectItem key={prec} value={prec} className="text-xs">
                      {prec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter 4: Status */}
            <div className="min-w-[130px] flex-1 sm:flex-initial">
              <Select
                value={selectedStatus}
                onValueChange={(val) => {
                  setSelectedStatus(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 text-xs bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Statuses" className="text-xs">
                    All Statuses
                  </SelectItem>
                  <SelectItem value="Confirmed" className="text-xs">
                    Confirmed
                  </SelectItem>
                  <SelectItem value="Pending" className="text-xs">
                    Pending
                  </SelectItem>
                  <SelectItem value="Rejected" className="text-xs">
                    Rejected
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Filters Button */}
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

      {/* Main Full-Width Table */}
      <Card className="border border-[#e2e8f0] bg-white dark:bg-card dark:border-border shadow-xs hover:shadow-md transition-all duration-200">
        <CardContent className="p-0">
          {isLoading ? (
            <TableSkeleton rows={pageSize} columns={10} />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/80 dark:bg-muted/40 border-b border-[#e2e8f0] dark:border-border">
                  <TableRow className="hover:bg-transparent text-[11px] md:text-xs">
                    {renderSortableHeader('id', 'Report ID', 'w-[95px] md:w-[105px]')}
                    {renderSortableHeader('reportType', 'Type', 'w-[75px] md:w-[95px]')}
                    {renderSortableHeader('date', 'Date', 'hidden md:table-cell w-[95px]')}
                    {renderSortableHeader('location', 'Location', 'hidden md:table-cell min-w-[140px]')}
                    {renderSortableHeader('activity', 'Activity', 'hidden lg:table-cell min-w-[150px]')}
                    {renderSortableHeader('sifPotential', 'SIF Potential', 'w-[105px] md:w-[115px]')}
                    {renderSortableHeader('precursor', 'Precursor', 'hidden md:table-cell min-w-[140px]')}
                    {renderSortableHeader('confidence', 'Confidence', 'hidden md:table-cell w-[120px]')}
                    {renderSortableHeader('status', 'Status', 'w-[85px] md:w-[100px]')}
                    <TableHead className="w-[70px] md:w-[80px] text-right pr-3 md:pr-4 text-[11px] md:text-xs font-semibold text-[#64748b]">
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
                            No incident records match your active search query or filter parameters. Try broadening your search or resetting filters.
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
                      {/* 1. Report ID (Always visible) */}
                      <TableCell className="font-mono text-xs font-bold text-sky-500 group-hover:underline whitespace-nowrap py-3">
                        {report.id}
                      </TableCell>

                      {/* 2. Report Type (Always visible) */}
                      <TableCell className="whitespace-nowrap py-3">
                        <Badge
                          variant="outline"
                          className={`text-[10px] md:text-[11px] font-semibold px-1.5 md:px-2 py-0.5 ${getTypeBadgeClass(
                            report.reportType
                          )}`}
                        >
                          {report.reportType}
                        </Badge>
                      </TableCell>

                      {/* 3. Date (Hidden on mobile < md) */}
                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap py-3">
                        {formatReadableDate(report.date)}
                      </TableCell>

                      {/* 4. Location (Hidden on mobile < md) */}
                      <TableCell
                        className="hidden md:table-cell text-xs font-medium text-foreground max-w-[170px] truncate py-3"
                        title={report.location}
                      >
                        {report.location}
                      </TableCell>

                      {/* 5. Activity (Hidden on mobile/tablet < lg) */}
                      <TableCell
                        className="hidden lg:table-cell text-xs text-foreground/90 max-w-[170px] truncate py-3"
                        title={report.activity}
                      >
                        {report.activity}
                      </TableCell>

                      {/* 6. SIF Potential (Always visible) */}
                      <TableCell className="whitespace-nowrap py-3">
                        <Badge
                          variant="outline"
                          className={`text-[10px] md:text-[11px] px-1.5 md:px-2 py-0.5 ${getSifBadgeClass(
                            report.sifPotential
                          )}`}
                        >
                          {report.sifPotential}
                        </Badge>
                      </TableCell>

                      {/* 7. Primary Precursor (Hidden on mobile < md) */}
                      <TableCell
                        className="hidden md:table-cell text-xs font-medium text-foreground max-w-[150px] truncate py-3"
                        title={report.precursor}
                      >
                        {report.precursor}
                      </TableCell>

                      {/* 8. Confidence Progress Bar (Hidden on mobile < md) */}
                      <TableCell className="hidden md:table-cell whitespace-nowrap py-3">
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                report.confidence >= 85
                                  ? 'bg-emerald-500'
                                  : report.confidence >= 70
                                  ? 'bg-sky-500'
                                  : 'bg-amber-500'
                              }`}
                              style={{ width: `${report.confidence}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs font-semibold text-foreground w-7 text-right">
                            {report.confidence}%
                          </span>
                        </div>
                      </TableCell>

                      {/* 9. Status (Always visible) */}
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

                      {/* 10. Actions (View Button - Touch friendly) */}
                      <TableCell
                        className="text-right pr-3 md:pr-4 whitespace-nowrap py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(report.id)}
                          className="h-8 px-2.5 text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 gap-1 min-h-[32px] touch-manipulation"
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

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border/50 text-xs">
            {/* Left: Summary & Rows Per Page Selector */}
            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <span>
                Showing{' '}
                <strong className="text-foreground font-mono font-semibold">
                  {sortedReports.length > 0 ? startIndex + 1 : 0}
                </strong>{' '}
                to{' '}
                <strong className="text-foreground font-mono font-semibold">
                  {Math.min(startIndex + pageSize, sortedReports.length)}
                </strong>{' '}
                of{' '}
                <strong className="text-foreground font-mono font-semibold">
                  {sortedReports.length}
                </strong>{' '}
                reports
              </span>

              {/* Rows Per Page Selector */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-border/50">
                <span>Rows:</span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(val) => {
                    setPageSize(Number(val));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-7 w-[68px] text-xs bg-background font-mono">
                    <SelectValue placeholder={String(pageSize)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10" className="text-xs font-mono">
                      10
                    </SelectItem>
                    <SelectItem value="25" className="text-xs font-mono">
                      25
                    </SelectItem>
                    <SelectItem value="50" className="text-xs font-mono">
                      50
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right: Page Navigation Controls */}
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-7 px-2 text-xs gap-1"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </Button>

              {Array.from({ length: totalPages }, (_, idx) => {
                const p = idx + 1;
                // Show first, last, and window around current page
                if (
                  p === 1 ||
                  p === totalPages ||
                  (p >= currentPage - 1 && p <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={p}
                      variant={currentPage === p ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(p)}
                      className={`h-7 w-7 p-0 text-xs font-mono ${
                        currentPage === p
                          ? 'bg-sky-600 hover:bg-sky-700 text-white'
                          : ''
                      }`}
                    >
                      {p}
                    </Button>
                  );
                } else if (p === currentPage - 2 || p === currentPage + 2) {
                  return (
                    <span key={p} className="px-1 text-muted-foreground">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-7 px-2 text-xs gap-1"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
