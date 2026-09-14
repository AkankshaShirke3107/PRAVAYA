'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  Download,
  Printer,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  ExternalLink,
  Calendar,
  UserCheck,
  Building2,
  RotateCcw,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge, getStatusBadgeClass } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useSafetyStore } from '@/lib/store';
import { mockReportsData } from '@/lib/mockReports';

export interface CorrectiveActionItem {
  id: string;
  description: string;
  source: string;
  site: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  owner: string;
  dueDate: string;
  status: 'Open' | 'Assigned' | 'In Progress' | 'Pending Verification' | 'Closed';
  notes?: string;
}

const INITIAL_CORRECTIVE_ACTIONS: CorrectiveActionItem[] = [
  {
    id: 'CA-0241',
    description: 'Missing secondary fall protection on Derrick monkey board access',
    source: 'OIL-UA-2026-1042',
    site: 'Duliajan',
    priority: 'Critical',
    owner: 'Production HSE',
    dueDate: '02 Jun 2026',
    status: 'Open',
    notes: 'Immediate suspension of elevated permit work until secondary lifeline installed.',
  },
  {
    id: 'CA-0238',
    description: 'Replace unblinded pump suction manifold spectacle slip blind',
    source: 'OIL-UC-2026-1024',
    site: 'Moran',
    priority: 'Critical',
    owner: 'Maintenance Division',
    dueDate: '05 Jun 2026',
    status: 'In Progress',
    notes: 'Order placed for 300 ANSI spectacle slip blinds. Expected fitting on 04 Jun.',
  },
  {
    id: 'CA-0235',
    description: 'Continuous multi-gas atmospheric detector recalibration & sensor replacement',
    source: 'OIL-NM-2026-1014',
    site: 'Naharkatia',
    priority: 'High',
    owner: 'Safety & Inspection',
    dueDate: '10 Jun 2026',
    status: 'Assigned',
    notes: 'Assigned to R. Sharma for multi-gas calibration bump testing.',
  },
  {
    id: 'CA-0229',
    description: 'Install ground outrigger steel spreader mats for heavy crane lifts over live piping',
    source: 'OIL-UA-2026-0988',
    site: 'Digboi',
    priority: 'High',
    owner: 'Rigging & Mechanical',
    dueDate: '14 Jun 2026',
    status: 'Pending Verification',
    notes: 'Steel plate spreader mats fabricated. Awaiting site HSE verification.',
  },
  {
    id: 'CA-0222',
    description: 'Replace worn hydrostatic pressure test hose whip-checks and safety clamps',
    source: 'OIL-UC-2026-0972',
    site: 'Jorajan',
    priority: 'Medium',
    owner: 'Pipeline Operations',
    dueDate: '20 Jun 2026',
    status: 'Closed',
    notes: 'Whip check cables installed on all 4-inch mud discharge lines and verified.',
  },
  {
    id: 'CA-0215',
    description: 'Firewater deluge pump diesel starter motor overhaul and battery testing',
    source: 'OIL-NM-2026-0955',
    site: 'Sadiya',
    priority: 'Medium',
    owner: 'Electrical Engineering',
    dueDate: '25 Jun 2026',
    status: 'In Progress',
    notes: 'Starter motor bench tested cleanly. Final wiring hookup in progress.',
  },
  {
    id: 'CA-0208',
    description: 'Update Permit-to-Work high-pressure isolation checklist & contractor briefing',
    source: 'OIL-UA-2026-0941',
    site: 'Duliajan',
    priority: 'Low',
    owner: 'Corporate HSE Cell',
    dueDate: '30 Jun 2026',
    status: 'Closed',
    notes: 'Checklist updated in OISD compliance manual and circulated to shift leads.',
  },
  {
    id: 'CA-0201',
    description: 'Re-certify Derrick Rig #4 anti-two-block limit switch wiring',
    source: 'OIL-UC-2026-0915',
    site: 'Digboi',
    priority: 'High',
    owner: 'Electrical Engineering',
    dueDate: '08 Jul 2026',
    status: 'Open',
    notes: 'Scheduled for next maintenance window.',
  },
  {
    id: 'CA-0194',
    description: 'Mount explosive gas detector sensors at GGS-4 compressor manifold',
    source: 'OIL-UA-2026-0890',
    site: 'Moran',
    priority: 'Critical',
    owner: 'Instrumentation',
    dueDate: '12 Jul 2026',
    status: 'Assigned',
    notes: 'Sensors dispatched from central store.',
  },
  {
    id: 'CA-0188',
    description: 'Replace worn derrick ladder safety cage steel struts',
    source: 'OIL-NM-2026-0865',
    site: 'Naharkatia',
    priority: 'Medium',
    owner: 'Civil Infrastructure',
    dueDate: '18 Jul 2026',
    status: 'In Progress',
    notes: 'Structural steel cutting in progress.',
  },
  {
    id: 'CA-0175',
    description: 'Provide ESD emergency shutdown button protective guard covers',
    source: 'OIL-UA-2026-0840',
    site: 'Jorajan',
    priority: 'Low',
    owner: 'Production Operations',
    dueDate: '22 Jul 2026',
    status: 'Closed',
    notes: 'Hinged transparent acrylic covers fitted.',
  },
  {
    id: 'CA-0162',
    description: 'Inspect crude storage tank #14 breathing valve & vacuum breaker',
    source: 'OIL-UC-2026-0815',
    site: 'Sadiya',
    priority: 'High',
    owner: 'Maintenance Division',
    dueDate: '30 Jul 2026',
    status: 'Pending Verification',
    notes: 'Valve overhauled. Awaiting pressure test signoff.',
  },
  {
    id: 'CA-0150',
    description: 'Install secondary earthing grid bonding straps on methanol transfer pump',
    source: 'OIL-NM-2026-0790',
    site: 'Duliajan',
    priority: 'Medium',
    owner: 'Electrical Engineering',
    dueDate: '05 Aug 2026',
    status: 'Closed',
    notes: 'Bonding straps installed and resistance measured < 1 ohm.',
  },
  {
    id: 'CA-0142',
    description: 'Re-align high-pressure manifold pipe rack vibration dampeners',
    source: 'OIL-UA-2026-0765',
    site: 'Moran',
    priority: 'Low',
    owner: 'Mechanical Integrity',
    dueDate: '12 Aug 2026',
    status: 'Closed',
    notes: 'Spring hangers adjusted to eliminate resonance harmonics.',
  },
];

type SortableField = 'id' | 'description' | 'source' | 'site' | 'priority' | 'owner' | 'dueDate' | 'status';

export default function CorrectiveActionsPage() {
  const { setSelectedReport } = useSafetyStore();

  // Action Items State
  const [actionList, setActionList] = useState<CorrectiveActionItem[]>(INITIAL_CORRECTIVE_ACTIONS);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [siteFilter, setSiteFilter] = useState('All');

  // Sorting State
  const [sortField, setSortField] = useState<SortableField>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Detail Modal State
  const [selectedAction, setSelectedAction] = useState<CorrectiveActionItem | null>(null);
  const [editStatus, setEditStatus] = useState<CorrectiveActionItem['status']>('Open');
  const [editNotes, setEditNotes] = useState('');

  // Filtered & Sorted Data
  const filteredActions = useMemo(() => {
    return actionList.filter((item) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matches =
          item.id.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q) ||
          item.site.toLowerCase().includes(q) ||
          item.owner.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }

      if (priorityFilter !== 'All' && item.priority !== priorityFilter) {
        return false;
      }

      if (siteFilter !== 'All' && item.site !== siteFilter) {
        return false;
      }

      return true;
    });
  }, [actionList, searchTerm, statusFilter, priorityFilter, siteFilter]);

  const sortedActions = useMemo(() => {
    return [...filteredActions].sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'priority') {
        const pMap: Record<string, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        valA = pMap[valA] || 0;
        valB = pMap[valB] || 0;
      } else if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredActions, sortField, sortOrder]);

  // Pagination Math
  const totalPages = Math.max(1, Math.ceil(sortedActions.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = sortedActions.slice(startIndex, startIndex + pageSize);

  // Open Edit Detail Modal
  const handleRowClick = (item: CorrectiveActionItem) => {
    setSelectedAction(item);
    setEditStatus(item.status);
    setEditNotes(item.notes || '');
  };

  // Save Modal Changes
  const handleSaveChanges = () => {
    if (!selectedAction) return;

    setActionList((prev) =>
      prev.map((a) =>
        a.id === selectedAction.id
          ? { ...a, status: editStatus, notes: editNotes }
          : a
      )
    );

    toast.success(`Action ${selectedAction.id} Updated`, {
      description: `Status changed to "${editStatus}".`,
    });
    setSelectedAction(null);
  };

  // View Related Source Report in Drawer
  const handleViewSourceReport = (sourceId: string) => {
    const foundReport = mockReportsData.find((r) => r.id === sourceId);
    if (foundReport) {
      setSelectedReport(foundReport as any);
      toast.info(`Opening Source Report ${sourceId}`);
    } else {
      toast.info(`Source Report ${sourceId}`, {
        description: 'Referenced incident record attached to CAPA dossier.',
      });
    }
  };


  const handleSort = (field: SortableField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortableHeader = (field: SortableField, label: string) => {
    const isActive = sortField === field;
    return (
      <TableHead
        className="cursor-pointer select-none text-xs font-bold text-[#17202A] hover:text-[#102F3E] transition-colors"
        onClick={() => handleSort(field)}
      >
        <div className="flex items-center gap-1">
          <span>{label}</span>
          {isActive ? (
            sortOrder === 'asc' ? (
              <ArrowUp className="h-3.5 w-3.5 text-[#102F3E]" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5 text-[#102F3E]" />
            )
          ) : (
            <ArrowUpDown className="h-3 w-3 opacity-30" />
          )}
        </div>
      </TableHead>
    );
  };

  const openCount = actionList.filter((a) => a.status === 'Open').length;
  const totalCount = actionList.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E4E7EC] pb-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#17202A] sm:text-2xl flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-[#102F3E]" />
            CORRECTIVE ACTIONS
          </h1>
          <p className="text-xs text-[#667085] mt-1 font-medium">
            {totalCount} actions | {openCount} open | Next audit: 15 Oct 2026
          </p>
        </div>

        {/* TOP ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="h-8 text-xs border-[#E4E7EC] text-[#17202A] bg-white gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" />
            Print View
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.success('Excel Dossier Exported', {
                description: 'Downloaded CAPA Action Log (.xlsx) for Oil India HSE Audit.',
              })
            }
            className="h-8 text-xs border-[#E4E7EC] text-[#17202A] bg-white gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Export to Excel
          </Button>

          <Button
            size="sm"
            onClick={() =>
              toast.info('New Action Form', {
                description: 'Initiated new Corrective Action entry workflow.',
              })
            }
            className="h-8 text-xs bg-[#102F3E] hover:bg-[#082735] text-white font-semibold gap-1.5 shadow-none rounded-[2px]"
          >
            <Plus className="h-3.5 w-3.5" />
            + New Action
          </Button>
        </div>
      </div>

      {/* FILTER BAR */}
      <Card className="border border-[#E4E7EC] bg-white shadow-none rounded-[2px]">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#667085]" />
              <Input
                placeholder="Search action ID, description, owner..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 h-8 text-xs bg-white border-[#E4E7EC] text-[#17202A] rounded-[2px]"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
              {/* Status Dropdown */}
              <div className="w-[150px]">
                <Select
                  value={statusFilter}
                  onValueChange={(val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 text-xs bg-white border-[#E4E7EC] text-[#17202A]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending Verification">Pending Verification</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority Dropdown */}
              <div className="w-[140px]">
                <Select
                  value={priorityFilter}
                  onValueChange={(val) => {
                    setPriorityFilter(val);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 text-xs bg-white border-[#E4E7EC] text-[#17202A]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Priorities</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Site Dropdown */}
              <div className="w-[130px]">
                <Select
                  value={siteFilter}
                  onValueChange={(val) => {
                    setSiteFilter(val);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 text-xs bg-white border-[#E4E7EC] text-[#17202A]">
                    <SelectValue placeholder="Site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Sites</SelectItem>
                    <SelectItem value="Duliajan">Duliajan</SelectItem>
                    <SelectItem value="Naharkatia">Naharkatia</SelectItem>
                    <SelectItem value="Moran">Moran</SelectItem>
                    <SelectItem value="Jorajan">Jorajan</SelectItem>
                    <SelectItem value="Digboi">Digboi</SelectItem>
                    <SelectItem value="Sadiya">Sadiya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Display */}
              <div className="flex items-center space-x-1.5 rounded-[2px] border border-[#E4E7EC] bg-white px-2.5 py-1 text-xs text-[#667085] h-8">
                <Calendar className="h-3.5 w-3.5 text-[#102F3E]" />
                <span className="font-semibold text-[#17202A] text-[11px]">
                  01 May 2026 – 15 Oct 2026
                </span>
              </div>

              {(searchTerm || statusFilter !== 'All' || priorityFilter !== 'All' || siteFilter !== 'All') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('All');
                    setPriorityFilter('All');
                    setSiteFilter('All');
                    setCurrentPage(1);
                  }}
                  className="h-8 px-2.5 text-xs border-[#E4E7EC] text-[#667085]"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CORRECTIVE ACTIONS TABLE */}
      <Card className="border border-[#E4E7EC] bg-white shadow-none rounded-[2px]">
        <CardHeader className="p-4 border-b border-[#E4E7EC] flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold text-[#17202A]">
            CORRECTIVE ACTIONS ({filteredActions.length})
          </CardTitle>
          <span className="text-xs text-[#667085]">
            Click any row to inspect &amp; update action status
          </span>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#F8FAFC]">
                <TableRow>
                  {renderSortableHeader('id', 'ID')}
                  {renderSortableHeader('description', 'Description')}
                  {renderSortableHeader('source', 'Source')}
                  {renderSortableHeader('site', 'Site')}
                  {renderSortableHeader('priority', 'Priority')}
                  {renderSortableHeader('owner', 'Owner')}
                  {renderSortableHeader('dueDate', 'Due Date')}
                  {renderSortableHeader('status', 'Status')}
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs">
                {pageItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center text-[#667085]">
                      No corrective actions match your active filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  pageItems.map((item) => (
                    <TableRow
                      key={item.id}
                      onClick={() => handleRowClick(item)}
                      className="cursor-pointer hover:bg-[#F5F6F8] transition-colors border-b border-[#E4E7EC]/60 group"
                    >
                      <TableCell className="font-mono text-xs font-bold text-[#102F3E] group-hover:underline py-3">
                        {item.id}
                      </TableCell>
                      <TableCell className="font-medium text-[#17202A] max-w-[260px] truncate py-3" title={item.description}>
                        {item.description}
                      </TableCell>
                      <TableCell
                        className="font-mono text-xs text-[#102F3E] hover:underline py-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewSourceReport(item.source);
                        }}
                      >
                        {item.source}
                      </TableCell>
                      <TableCell className="font-semibold text-[#17202A] py-3">
                        {item.site}
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge className={getStatusBadgeClass(item.priority)}>
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#475569] font-medium py-3">
                        {item.owner}
                      </TableCell>
                      <TableCell className="font-mono text-[#17202A] py-3">
                        {item.dueDate}
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge className={getStatusBadgeClass(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-[#E4E7EC] text-xs bg-white">
            <div className="flex items-center gap-4 text-[#667085]">
              <span>
                Showing{' '}
                <strong className="text-[#17202A] font-semibold">
                  {sortedActions.length > 0 ? startIndex + 1 : 0}
                </strong>{' '}
                to{' '}
                <strong className="text-[#17202A] font-semibold">
                  {Math.min(startIndex + pageSize, sortedActions.length)}
                </strong>{' '}
                of{' '}
                <strong className="text-[#17202A] font-semibold">
                  {sortedActions.length}
                </strong>{' '}
                actions
              </span>

              {/* Rows Per Page Selector */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-[#E4E7EC]">
                <span>Rows:</span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(val) => {
                    setPageSize(Number(val));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-7 w-[68px] text-xs bg-white font-mono border-[#E4E7EC]">
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

            {/* Page Buttons */}
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-7 w-7 p-0 text-xs border-[#E4E7EC]"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>

              {Array.from({ length: totalPages }, (_, idx) => {
                const p = idx + 1;
                return (
                  <Button
                    key={p}
                    variant={currentPage === p ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(p)}
                    className={`h-7 w-7 p-0 text-xs font-semibold ${
                      currentPage === p
                        ? 'bg-[#102F3E] hover:bg-[#082735] text-white'
                        : 'border-[#E4E7EC] text-[#17202A]'
                    }`}
                  >
                    {p}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-7 w-7 p-0 text-xs border-[#E4E7EC]"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* STATUS WORKFLOW DETAIL MODAL */}
      {selectedAction && (
        <Dialog open={Boolean(selectedAction)} onOpenChange={() => setSelectedAction(null)}>
          <DialogContent className="max-w-lg bg-white border border-[#E4E7EC] p-6 rounded-[2px] shadow-none">
            <DialogHeader className="space-y-1.5 border-b border-[#E4E7EC] pb-4">
              <div className="flex items-center justify-between pr-4">
                <span className="font-mono text-base font-extrabold text-[#102F3E]">
                  {selectedAction.id}
                </span>
                <Badge className={getStatusBadgeClass(selectedAction.priority)}>
                  {selectedAction.priority}
                </Badge>
              </div>
              <DialogTitle className="text-sm font-bold text-[#17202A]">
                {selectedAction.description}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-3 text-xs">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-[2px] bg-[#F8FAFC] border border-[#E4E7EC]">
                <div>
                  <span className="text-[#667085] block">Site:</span>
                  <strong className="text-[#17202A]">{selectedAction.site}</strong>
                </div>
                <div>
                  <span className="text-[#667085] block">Owner:</span>
                  <strong className="text-[#17202A]">{selectedAction.owner}</strong>
                </div>
                <div>
                  <span className="text-[#667085] block">Due Date:</span>
                  <strong className="text-[#17202A]">{selectedAction.dueDate}</strong>
                </div>
                <div>
                  <span className="text-[#667085] block">Source Incident:</span>
                  <button
                    onClick={() => handleViewSourceReport(selectedAction.source)}
                    className="font-mono text-[#102F3E] hover:underline font-bold"
                  >
                    {selectedAction.source}
                  </button>
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-1">
                <label className="font-semibold text-[#17202A]">Workflow Status:</label>
                <Select
                  value={editStatus}
                  onValueChange={(val: any) => setEditStatus(val)}
                >
                  <SelectTrigger className="h-9 text-xs bg-white border-[#E4E7EC] text-[#17202A]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending Verification">Pending Verification</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes Text Area */}
              <div className="space-y-1">
                <label className="font-semibold text-[#17202A]">Intervention Notes / Audit Trail:</label>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Enter implementation status or verification comments..."
                  className="min-h-[90px] text-xs bg-white border-[#E4E7EC] text-[#17202A] rounded-md"
                />
              </div>

              {/* Related Report Button */}
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewSourceReport(selectedAction.source)}
                  className="h-8 text-xs border-[#E4E7EC] text-[#2563EB] gap-1.5 w-full justify-center"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View {selectedAction.source}
                </Button>
              </div>
            </div>

            <DialogFooter className="border-t border-[#E4E7EC] pt-4 flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAction(null)}
                className="h-8 text-xs border-[#E4E7EC]"
              >
                Close
              </Button>

              <Button
                size="sm"
                onClick={handleSaveChanges}
                className="h-8 text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
