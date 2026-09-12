'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ExternalLink,
  Building,
  UserCheck,
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 border bg-card/98 shadow-2xl">
        <DialogHeader className="space-y-2 border-b pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-base font-bold text-sky-500">
                {selectedReport.id}
              </span>
              <Badge
                variant="outline"
                className={getSifBadgeColor(selectedReport.sifPotential)}
              >
                <Flame className="w-3 h-3 mr-1" />
                {selectedReport.sifPotential} SIF Potential
                <span className="ml-1 opacity-80">
                  ({selectedReport.confidence || Math.round((selectedReport.confidenceScore || 0) * 100)}% AI Conf)
                </span>
              </Badge>
            </div>
            <Badge
              variant="outline"
              className={getStatusBadgeColor(selectedReport.status)}
            >
              Status: {selectedReport.status}
            </Badge>
          </div>
          <DialogTitle className="text-base font-bold text-foreground">
            {selectedReport.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground flex flex-wrap items-center gap-3">
            <span>📅 {formatReadableDate(selectedReport.date)}</span>
            <span>📍 {selectedReport.site} ({selectedReport.field})</span>
            <span>🏢 Dept: {selectedReport.department}</span>
            <span>📝 Type: {selectedReport.reportType}</span>
          </DialogDescription>
        </DialogHeader>

        {/* AI Insight Card */}
        <div className="space-y-4 py-2 text-xs">
          {/* Incident Description */}
          <div className="rounded-lg bg-muted/40 p-3 border border-border/50">
            <h4 className="font-semibold text-foreground mb-1 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-sky-500" />
              Report Incident Narrative
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {selectedReport.description}
            </p>
          </div>

          {/* AI Precursor & LSR Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-3 shadow-xs">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                AI Detected Precursor
              </span>
              <div className="mt-1 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="font-bold text-foreground text-sm">
                  {selectedReport.precursor}
                </span>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-3 shadow-xs">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Breached Life-Saving Rule (LSR)
              </span>
              <div className="mt-1 flex items-center space-x-2">
                <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0" />
                <span className="font-bold text-foreground text-sm">
                  {selectedReport.lsrViolated}
                </span>
              </div>
            </div>
          </div>

          {/* Breached Controls */}
          <div className="rounded-lg border bg-card p-3">
            <h4 className="font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
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
                  className="flex items-start space-x-2 text-muted-foreground"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                  <span>{ctl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Root Cause & Recommendations */}
          <div className="rounded-lg bg-sky-500/5 border border-sky-500/20 p-3 space-y-2">
            <div>
              <span className="font-semibold text-sky-400 block mb-0.5">
                Root Cause Hypothesis (NLP Derived):
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {selectedReport.rootCause}
              </p>
            </div>
            <div className="pt-2 border-t border-sky-500/15">
              <span className="font-semibold text-emerald-400 block mb-0.5">
                Recommended Corrective Action:
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {selectedReport.recommendedAction}
              </p>
            </div>
          </div>

          {/* Regulatory & Auditor info */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-md bg-muted/30 text-[11px] text-muted-foreground border">
            <div>
              <strong className="text-foreground">Standard:</strong>{' '}
              {selectedReport.standardReference}
            </div>
            <div>
              <strong className="text-foreground">Reported By:</strong>{' '}
              {selectedReport.reportedBy}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t">
          {/* Quick status change buttons */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] text-muted-foreground mr-1">Status:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateReportStatus(selectedReport.id, 'Under Review')}
              className="h-7 text-xs"
            >
              Review
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateReportStatus(selectedReport.id, 'Escalated')}
              className="h-7 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
            >
              Escalate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateReportStatus(selectedReport.id, 'Action Taken')}
              className="h-7 text-xs text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
            >
              Action Taken
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuickViewOpen(false)}
              className="h-8 text-xs"
            >
              Close
            </Button>
            <Button
              asChild
              size="sm"
              className="h-8 bg-sky-600 hover:bg-sky-700 text-white text-xs gap-1"
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
