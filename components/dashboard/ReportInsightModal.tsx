'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  AlertTriangle,
  FileText,
  ExternalLink,
  Building,
  Flame,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSafetyStore } from '@/lib/store';

import {
  getSifBadgeColor,
  getStatusBadgeColor,
  formatReadableDate,
} from '@/lib/utils';

export function ReportInsightModal() {
  const {
    selectedReport,
    isQuickViewOpen,
    setQuickViewOpen,
    updateReportStatus,
  } = useSafetyStore();

  if (!selectedReport) return null;

  return (
    <Dialog open={isQuickViewOpen} onOpenChange={setQuickViewOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 border border-[#D9DDE0] bg-white dark:bg-slate-900 shadow-lg rounded-[2px]">

        {/* Header */}
        <DialogHeader className="space-y-2 border-b border-[#D9DDE0] pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-base font-bold text-[#102F3E] dark:text-white">
                {selectedReport.id}
              </span>

              <Badge
                variant="outline"
                className={getSifBadgeColor(
                  selectedReport.sifPotential
                )}
              >
                <Flame className="w-3 h-3 mr-1" />

                {selectedReport.sifPotential} SIF Potential

                <span className="ml-1 opacity-80">
                  (
                  {selectedReport.confidence ||
                    Math.round(
                      (selectedReport.confidenceScore || 0) * 100
                    )}
                  % Model Conf)
                </span>
              </Badge>
            </div>

            <Badge
              variant="outline"
              className={getStatusBadgeColor(
                selectedReport.status
              )}
            >
              Status: {selectedReport.status}
            </Badge>
          </div>

          <DialogTitle className="text-base font-bold text-[#102F3E] dark:text-white">
            {selectedReport.title}
          </DialogTitle>

          <DialogDescription className="text-xs text-[#667085] dark:text-slate-400 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3 shrink-0" />
              {formatReadableDate(selectedReport.date)}
            </span>

            <span className="flex items-center gap-1">
              <Building className="h-3 w-3 shrink-0" />
              {selectedReport.site} ({selectedReport.field})
            </span>

            <span>
              Dept: {selectedReport.department}
            </span>

            <span>
              Type: {selectedReport.reportType}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Main Content */}
        <div className="space-y-4 py-2 text-xs">

          {/* Incident Description */}
          <div className="rounded-[2px] bg-[#F3F2EE] dark:bg-slate-800 p-3 border border-[#D9DDE0] dark:border-slate-700">
            <h4 className="font-bold text-[#102F3E] dark:text-white mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#2F6B84]" />
              Report Incident Narrative
            </h4>

            <p className="text-[#17202A] dark:text-slate-300 leading-relaxed">
              {selectedReport.description}
            </p>
          </div>

          {/* Precursor & LSR */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* Precursor */}
            <div className="rounded-[2px] border border-[#D9DDE0] dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
              <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                Screened Precursor
              </span>

              <div className="mt-1 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-[#D97706] shrink-0" />

                <span className="font-bold text-[#102F3E] dark:text-white text-sm">
                  {selectedReport.precursor}
                </span>
              </div>
            </div>

            {/* LSR */}
            <div className="rounded-[2px] border border-[#D9DDE0] dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
              <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                Breached Life-Saving Rule (LSR)
              </span>

              <div className="mt-1 flex items-center space-x-2">
                <ShieldAlert className="h-4 w-4 text-[#C92925] shrink-0" />

                <span className="font-bold text-[#102F3E] dark:text-white text-sm">
                  {selectedReport.lsrViolated}
                </span>
              </div>
            </div>
          </div>

          {/* Breached Controls */}
          <div className="rounded-[2px] border border-[#D9DDE0] dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
            <h4 className="font-bold text-[#102F3E] dark:text-white mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-[#C92925]" />
              Breached Safety Measures &amp; Controls
            </h4>

            <ul className="space-y-1">
              {(
                selectedReport.breachedSafetyControls || [
                  'Pre-task job safety risk assessment (JSA)',
                  'Primary containment & barrier verification',
                  'Permit to work authorization sign-off',
                ]
              ).map((ctl, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2 text-[#17202A] dark:text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#C92925]" />
                  <span>{ctl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Root Cause & Recommendations */}
          <div className="rounded-[2px] border border-[#D9DDE0] dark:border-slate-700 bg-[#F3F2EE] dark:bg-slate-800 p-3 space-y-2">

            <div>
              <span className="font-bold text-[#102F3E] dark:text-white text-[10px] uppercase tracking-wider block mb-0.5">
                Root Cause Analysis:
              </span>

              <p className="text-[#17202A] dark:text-slate-300 leading-relaxed">
                {selectedReport.rootCause}
              </p>
            </div>

            <div className="pt-2 border-t border-[#D9DDE0] dark:border-slate-700">
              <span className="font-bold text-[#2E7D32] text-[10px] uppercase tracking-wider block mb-0.5">
                Recommended HSE Action:
              </span>

              <p className="text-[#17202A] dark:text-slate-300 leading-relaxed">
                {selectedReport.recommendedAction}
              </p>
            </div>
          </div>

          {/* Regulatory & Auditor Information */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-[2px] bg-[#F3F2EE] dark:bg-slate-800 text-[11px] text-[#667085] dark:text-slate-400 border border-[#D9DDE0] dark:border-slate-700">

            <div>
              <strong className="text-[#102F3E] dark:text-white">
                Standard:
              </strong>{' '}
              {selectedReport.standardReference}
            </div>

            <div>
              <strong className="text-[#102F3E] dark:text-white">
                Reported By:
              </strong>{' '}
              {selectedReport.reportedBy}
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-[#D9DDE0]">

          {/* Quick Status Buttons */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] text-[#667085] mr-1">
              Status:
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateReportStatus(
                  selectedReport.id,
                  'Under Review'
                )
              }
              className="h-7 text-xs border-[#D9DDE0] text-[#17202A] hover:text-[#102F3E] hover:bg-[#F3F2EE] rounded-[2px]"
            >
              Review
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateReportStatus(
                  selectedReport.id,
                  'Escalated'
                )
              }
              className="h-7 text-xs text-[#C92925] border-[#C92925]/30 hover:bg-[#C92925]/10 rounded-[2px]"
            >
              Escalate
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateReportStatus(
                  selectedReport.id,
                  'Action Taken'
                )
              }
              className="h-7 text-xs text-[#2E7D32] border-[#2E7D32]/30 hover:bg-[#2E7D32]/10 rounded-[2px]"
            >
              Action Taken
            </Button>
          </div>

          {/* Close + Full Report */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuickViewOpen(false)}
              className="h-8 text-xs border-[#D9DDE0] rounded-[2px]"
            >
              Close
            </Button>

            <Button
              asChild
              size="sm"
              className="h-8 bg-[#102F3E] hover:bg-[#082735] text-white text-xs gap-1 rounded-[2px] shadow-none"
            >
              <Link
                href={`/analysis/${selectedReport.id}`}
                onClick={() => setQuickViewOpen(false)}
              >
                View Full Report
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}