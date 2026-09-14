'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldAlert, AlertCircle, Clock, Eye } from 'lucide-react';
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
import { getStatusBadgeColor } from '@/lib/utils';

export interface QueueItem {
  priority: 'P1' | 'P2' | 'P3';
  priorityLabel: 'CRITICAL (P1)' | 'HIGH (P2)' | 'MEDIUM (P3)';
  id: string;
  site: string;
  precursor: string;
  status: 'Pending' | 'Under Review';
}

const sampleReviewQueue: QueueItem[] = [
  {
    priority: 'P1',
    priorityLabel: 'CRITICAL (P1)',
    id: 'OIL-UA-2026-1042',
    site: 'Moran GGS-1',
    precursor: 'Energy Isolation',
    status: 'Pending',
  },
  {
    priority: 'P1',
    priorityLabel: 'CRITICAL (P1)',
    id: 'OIL-NM-2026-1024',
    site: 'Duliajan CPF',
    precursor: 'Work at Height',
    status: 'Pending',
  },
  {
    priority: 'P1',
    priorityLabel: 'CRITICAL (P1)',
    id: 'OIL-UC-2026-0988',
    site: 'Digboi Wellhead Rig #4',
    precursor: 'Confined Space',
    status: 'Pending',
  },
  {
    priority: 'P2',
    priorityLabel: 'HIGH (P2)',
    id: 'OIL-UA-2026-0972',
    site: 'Naharkatia Substation',
    precursor: 'Line of Fire',
    status: 'Pending',
  },
  {
    priority: 'P2',
    priorityLabel: 'HIGH (P2)',
    id: 'OIL-NM-2026-0955',
    site: 'Jorajan Power Hub',
    precursor: 'Safe Mechanical Lifting',
    status: 'Pending',
  },
  {
    priority: 'P2',
    priorityLabel: 'HIGH (P2)',
    id: 'OIL-UC-2026-0941',
    site: 'Sadiya Pipeline Spool 9',
    precursor: 'Atmospheric Hazard',
    status: 'Pending',
  },
  {
    priority: 'P3',
    priorityLabel: 'MEDIUM (P3)',
    id: 'OIL-UA-2026-0928',
    site: 'Duliajan Central Yard',
    precursor: 'Hot Work',
    status: 'Pending',
  },
];

export function HseReviewQueue() {
  const { reports, setSelectedReport } = useSafetyStore();

  const handleRowClick = (id: string) => {
    const found = reports.find((r) => r.id === id);
    if (found) {
      setSelectedReport(found);
    }
  };

  const getPriorityBadgeClass = (priority: 'P1' | 'P2' | 'P3') => {
    switch (priority) {
      case 'P1':
        return 'bg-[#C92925] text-white border-[#C92925] font-bold rounded-full';
      case 'P2':
        return 'bg-[#D97706] text-white border-[#D97706] font-bold rounded-full';
      case 'P3':
        return 'bg-[#2E7D32] text-white border-[#2E7D32] font-bold rounded-full';
      default:
        return 'bg-[#667085] text-white rounded-full';
    }
  };

  return (
    <Card className="flex flex-col panel-card panel-accent-red">
      <CardHeader className="p-4 sm:p-5 pb-3 flex flex-col justify-between border-b border-[#D9DDE0]">
        <div className="flex flex-col w-full relative">
          <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1">
            HUMAN TRIAGE
          </span>
          <CardTitle className="text-base font-bold text-[#102F3E] flex justify-between items-center w-full">
            <span>HSE review queue</span>
            <Link
              href="/reports?status=Pending"
              className="text-xs font-semibold text-[#102F3E] hover:text-[#C92925] inline-flex items-center gap-1 hover:underline self-start sm:self-auto"
            >
              View All Queue Items
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </CardTitle>
          <div className="w-8 h-[2px] bg-[#C92925] mt-2 mb-1" />
          <p className="text-xs text-[#667085] mt-1">
            23 reports require review • Priority-sorted triage queue for human HSE officer sign-off
          </p>
        </div>
      </CardHeader>

      {/* Priority Reports Table */}
      <CardContent className="p-0 min-w-0">
        <div className="overflow-x-auto min-w-0">
          <Table>
            <TableHeader className="bg-[#082735]">
              <TableRow className="text-xs border-b border-[#D9DDE0]">
                <TableHead className="w-[100px] font-bold text-white">Priority</TableHead>
                <TableHead className="w-[130px] font-bold text-white">Report ID</TableHead>
                <TableHead className="min-w-[150px] font-bold text-white">Site</TableHead>
                <TableHead className="min-w-[160px] font-bold text-white">Precursor</TableHead>
                <TableHead className="w-[110px] font-bold text-white">Status</TableHead>
                <TableHead className="w-[80px] text-right pr-4 font-bold text-white">Inspect</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              {sampleReviewQueue.map((item, idx) => (
                <TableRow
                  key={item.id}
                  onClick={() => handleRowClick(item.id)}
                  className={`cursor-pointer industrial-row-hover transition-colors group border-b border-[#D9DDE0] ${
                    idx % 2 === 1 ? 'industrial-row-even' : 'bg-white'
                  } ${item.priority === 'P1' ? 'high-priority-left-border' : ''}`}
                >
                  {/* Priority Badge */}
                  <TableCell className="py-3">
                    <Badge className={`text-xs px-2 py-0.5 ${getPriorityBadgeClass(item.priority)}`}>
                      {item.priority}
                    </Badge>
                  </TableCell>

                  {/* Report ID */}
                  <TableCell className="font-mono text-xs font-bold text-[#102F3E] group-hover:underline group-hover:text-[#C92925] whitespace-nowrap py-3">
                    {item.id}
                  </TableCell>

                  {/* Site */}
                  <TableCell className="font-semibold text-[#17202A] py-3">
                    {item.site}
                  </TableCell>

                  {/* Precursor */}
                  <TableCell className="text-[#17202A] font-medium py-3">
                    {item.precursor}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="py-3">
                    <Badge
                      variant="outline"
                      className={`${getStatusBadgeColor(item.status)} text-[11px]`}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>

                  {/* Inspect Button */}
                  <TableCell className="text-right pr-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(item.id);
                      }}
                      className="h-7 w-7 p-0 text-[#667085] hover:text-[#102F3E] rounded-[2px]"
                      title="Review Report Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer Link */}
        <div className="p-3 border-t border-[#D9DDE0] bg-[#F3F2EE] flex items-center justify-between">
          <span className="text-xs text-[#667085]">
            Click any report row to open technical evaluation details
          </span>
          <Link
            href="/reports?status=Pending"
            className="text-xs font-semibold text-[#102F3E] hover:text-[#C92925] hover:underline flex items-center gap-1"
          >
            View All Reports
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
