'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  ShieldAlert,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Building,
  Calendar,
  Check,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSafetyStore } from '@/lib/store';
import { formatReadableDate } from '@/lib/utils';
import { toast } from 'sonner';

import { formatLsrName } from './LsrDistributionChart';

export function ReportDetailDrawer() {
  const {
    selectedReport,
    isQuickViewOpen,
    setQuickViewOpen,
    setSelectedReport,
    updateReportStatus,
  } = useSafetyStore();

  const [reviewerNotes, setReviewerNotes] = useState('');

  if (!selectedReport) return null;

  const handleClose = () => {
    setQuickViewOpen(false);
  };

  const handleMarkAsReviewed = () => {
    updateReportStatus(selectedReport.id, 'Confirmed');
    toast.success(`Report ${selectedReport.id} marked as Reviewed`, {
      description: 'HSE review status updated in corporate register.',
    });
    setQuickViewOpen(false);
  };

  const handleCreateAction = () => {
    toast.info(`Creating CAPA for ${selectedReport.id}`, {
      description: 'Opening Corrective Action planning module.',
    });
    setQuickViewOpen(false);
  };

  // Determine Priority (P1, P2, P3) based on risk
  const priority =
    selectedReport.sifLevel === 'High' || selectedReport.sifPotential === 'Yes'
      ? 'P1'
      : selectedReport.sifLevel === 'Medium' || selectedReport.sifPotential === 'Review'
      ? 'P2'
      : 'P3';

  // Detected precursors list
  const detectedPrecursors = selectedReport.breachedSafetyControls || [
    'Fall exposure',
    'Missing fall protection',
    'Barrier failure',
  ];

  return (
    <>
      {/* Semi-transparent dark overlay */}
      {isQuickViewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      {/* Right-Side Slide-in Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] max-w-full bg-white border-l border-[#D9DDE0] shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          isQuickViewOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* HEADER */}
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-[#D9DDE0] bg-white">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-base font-extrabold text-[#17202A]">
              {selectedReport.id}
            </span>
            <span className="text-xs text-[#667085] font-medium">&bull; Report Detail</span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-[2px] text-[#667085] hover:text-[#17202A] hover:bg-[#F3F2EE] transition-colors"
            title="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* DRAWER CONTENT (Scrollable body) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SECTION 1 - SIF POTENTIAL */}
          <div className="p-4 rounded-[2px] border border-[#D9DDE0] bg-[#F3F2EE] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
                SIF POTENTIAL
              </span>
              <Badge
                className={`text-xs px-2.5 py-0.5 font-black ${
                  selectedReport.sifPotential === 'Yes' || selectedReport.sifPotential === 'High'
                    ? 'bg-[#C92925] text-white'
                    : selectedReport.sifPotential === 'Review' || selectedReport.sifLevel === 'Medium'
                    ? 'bg-[#D97706] text-white'
                    : 'bg-[#2E7D32] text-white'
                }`}
              >
                {selectedReport.sifPotential === 'Yes' ? 'HIGH' : selectedReport.sifPotential.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#D9DDE0]">
              <span className="text-[#667085]">Model Confidence:</span>
              <strong className="font-mono font-bold text-[#17202A]">
                {selectedReport.confidence || 93}%
              </strong>
            </div>
          </div>

          {/* SECTION 2 - REPORT DETAILS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider border-b border-[#D9DDE0] pb-1.5">
              REPORT DETAILS
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#D9DDE0]/60">
                <span className="text-[#667085]">Report Type:</span>
                <span className="font-semibold text-[#17202A]">{selectedReport.reportType}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#D9DDE0]/60">
                <span className="text-[#667085]">Site:</span>
                <span className="font-semibold text-[#17202A]">{selectedReport.site} ({selectedReport.field || 'Main'})</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#D9DDE0]/60">
                <span className="text-[#667085]">Department:</span>
                <span className="font-semibold text-[#17202A]">{selectedReport.department}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#D9DDE0]/60">
                <span className="text-[#667085]">Activity:</span>
                <span className="font-semibold text-[#17202A]">{selectedReport.activity || selectedReport.precursor}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#D9DDE0]/60">
                <span className="text-[#667085]">Date:</span>
                <span className="font-medium text-[#17202A]">{formatReadableDate(selectedReport.date)}</span>
              </div>
            </div>
          </div>

          {/* SECTION 3 - DETECTED PRECURSORS */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider border-b border-[#D9DDE0] pb-1.5">
              DETECTED PRECURSORS
            </h3>

            <ul className="space-y-2 text-xs">
              {detectedPrecursors.map((prec, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-[#17202A] font-medium">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[#2E7D32]/15 text-[#2E7D32]">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{prec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 4 - LIFE-SAVING RULE */}
          <div className="p-4 rounded-[2px] border border-[#D9DDE0] bg-[#F3F2EE] space-y-2.5">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block">
              Life-Saving Rule
            </span>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-[#17202A] tracking-tight">
                {formatLsrName(selectedReport.lsrViolated).toUpperCase()}
              </span>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-7 text-xs border-[#D9DDE0] text-[#102F3E] bg-white hover:bg-[#F3F2EE] rounded-[2px]"
              >
                <Link href="/compliance?tab=lsr" onClick={handleClose}>
                  View Rule Details
                </Link>
              </Button>
            </div>
          </div>

          {/* SECTION 5 - HSE REVIEW */}
          <div className="space-y-3 pt-2 border-t border-[#D9DDE0]">
            <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider">
              HSE REVIEW
            </h3>

            <div className="flex items-center space-x-4 text-xs">
              <div>
                <span className="text-[#667085]">Status: </span>
                <Badge
                  variant="outline"
                  className="bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30 font-semibold text-[11px] rounded-full"
                >
                  {selectedReport.status || 'Pending'}
                </Badge>
              </div>

              <div>
                <span className="text-[#667085]">Priority: </span>
                <Badge
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    priority === 'P1'
                      ? 'bg-[#C92925] text-white'
                      : priority === 'P2'
                      ? 'bg-[#D97706] text-white'
                      : 'bg-[#2E7D32] text-white'
                  }`}
                >
                  {priority}
                </Badge>
              </div>
            </div>

            {/* Comments text area */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#667085]">
                Reviewer Notes / Triage Comments
              </label>
              <Textarea
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                placeholder="Enter HSE review notes or corrective action plan instructions..."
                className="min-h-[80px] text-xs bg-white border-[#D9DDE0] text-[#17202A] rounded-[2px] focus:border-[#102F3E]"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="p-4 border-t border-[#D9DDE0] bg-[#F3F2EE] flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAsReviewed}
            className="h-9 px-4 text-xs font-semibold border-[#2E7D32]/40 text-[#2E7D32] bg-white hover:bg-[#2E7D32] hover:text-white transition-colors rounded-[2px]"
          >
            Mark as Reviewed
          </Button>

          <Button
            size="sm"
            onClick={handleCreateAction}
            className="h-9 px-4 text-xs font-semibold bg-[#102F3E] hover:bg-[#082735] text-white shadow-none rounded-[2px]"
          >
            Create Action
          </Button>
        </div>
      </aside>
    </>
  );
}
