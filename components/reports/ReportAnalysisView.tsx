'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Activity,
  FileText,
  Paperclip,
  File,
  Image as ImageIcon,
  Download,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Wind,
  Zap,
  Lock,
  Box,
  Target,
  ArrowUpRight,
  Printer,
  ChevronRight,
  Shield,
  Layers,
  Search,
  Check,
  X,
  HelpCircle,
  UserCheck,
  Clock,
  Send,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { mockReportsData } from '@/lib/mockReports';
import { SafetyReport, ReportStatus } from '@/types';
import { formatReadableDate } from '@/lib/utils';
import { useSafetyStore } from '@/lib/store';
import { formatLsrName } from '@/components/dashboard/LsrDistributionChart';
import { toast } from 'sonner';

interface AttachmentItem {
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc';
}

interface ReportAnalysisViewProps {
  reportId: string;
}

export function ReportAnalysisView({ reportId }: ReportAnalysisViewProps) {
  const router = useRouter();

  // Find report in mockReportsData or fallback to first
  const report: SafetyReport =
    mockReportsData.find((r) => r.id === reportId) ||
    mockReportsData[0];

  const { updateReportStatus } = useSafetyStore();

  // Expert Review States
  const [reviewStatus, setReviewStatus] = useState<string>(() => {
    if (report.status === 'Confirmed') {
      return 'Reviewed by Dr. P. K. Saikia (Lead Process Safety Specialist)';
    } else if (report.status === 'Rejected') {
      return 'Rejected by Safety Review Board';
    }
    return 'Pending Review';
  });
  const [selectedDecision, setSelectedDecision] = useState<
    'confirm' | 'reject' | 'further_review' | null
  >(null);
  const [reviewComments, setReviewComments] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);
  const [submittedReview, setSubmittedReview] = useState<{
    decision: 'confirm' | 'reject' | 'further_review';
    comments: string;
    reviewedBy: string;
    timestamp: string;
  } | null>(null);

  const maxChars = 500;

  const handleSelectDecision = (
    decision: 'confirm' | 'reject' | 'further_review'
  ) => {
    if (decision === 'reject' && selectedDecision !== 'reject') {
      setIsRejectDialogOpen(true);
    } else {
      setSelectedDecision((prev) => (prev === decision ? null : decision));
    }
  };

  const confirmRejection = () => {
    setSelectedDecision('reject');
    setIsRejectDialogOpen(false);
    toast.warning('Adjudication set to Reject', {
      description: 'Please provide reviewer rationale and submit to finalize rejection.',
    });
  };

  const handleSubmitReview = () => {
    if (!selectedDecision) {
      toast.error('Validation Error: Please select an action', {
        description: 'Choose Confirm, Reject, or Request Further Review before submitting.',
      });
      return;
    }

    if (selectedDecision === 'further_review' && reviewComments.trim().length < 10) {
      toast.warning('Validation Warning: Rationale required', {
        description: 'Please specify the rationale or evidence needed for further review (min 10 characters).',
      });
      return;
    }

    if (selectedDecision === 'reject' && reviewComments.trim().length < 10) {
      toast.warning('Validation Warning: Rejection rationale required', {
        description: 'Please provide an engineering reason for rejecting the SIF precursor classification.',
      });
      return;
    }

    setIsSubmittingReview(true);
    setTimeout(() => {
      const now = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      let statusLabel = '';
      let newStatus: ReportStatus = 'Under Review';
      if (selectedDecision === 'confirm') {
        statusLabel = 'Reviewed by Er. R. K. Neog (Chief Safety Inspector)';
        newStatus = 'Confirmed';
      } else if (selectedDecision === 'reject') {
        statusLabel = 'Rejected by Er. R. K. Neog (Chief Safety Inspector)';
        newStatus = 'Rejected';
      } else {
        statusLabel = 'Further Review Requested by Er. R. K. Neog (Chief Safety Inspector)';
        newStatus = 'Under Review';
      }

      updateReportStatus(report.id, newStatus);

      setReviewStatus(statusLabel);
      setSubmittedReview({
        decision: selectedDecision,
        comments: reviewComments,
        reviewedBy: 'Er. R. K. Neog (Chief Safety Inspector)',
        timestamp: now,
      });
      setIsSubmittingReview(false);

      if (selectedDecision === 'reject') {
        toast.warning('SIF Classification Rejected', {
          description: `Report ${report.id} marked as non-SIF: ${statusLabel}`,
        });
      } else {
        toast.success('Expert review submitted successfully!', {
          description: `Review status updated: ${statusLabel}`,
        });
      }
    }, 450);
  };

  // Derive SIF Level (High, Medium, Low)
  const sifLevel: 'High' | 'Medium' | 'Low' =
    report.sifLevel ||
    (report.sifPotential === 'Yes'
      ? 'High'
      : report.sifPotential === 'Review'
      ? 'Medium'
      : 'Low');

  // Precursor consequence mapping
  const consequences: Record<string, string> = {
    'Atmospheric Hazard':
      'Uncontrolled release of toxic gas or flammable vapor cloud causing acute respiratory paralysis, chemical asphyxiation, or flash fire within enclosed operating areas.',
    'Line of Fire':
      'High-pressure liquid injection or kinetic projectile impact causing catastrophic crush injuries, traumatic amputations, or fatal blunt-force trauma to personnel in the path of release.',
    'Work at Height':
      'Uncontrolled free-fall from elevated platform without continuous 100% tie-off, resulting in severe deceleration trauma, irreversible spinal injury, or fatality.',
    'Energy Isolation':
      'Unexpected release of stored hydraulic, mechanical, or 415V electrical energy leading to severe arc flash thermal burns, electrocution, or severe limb crushing.',
    'Confined Space':
      'Atmospheric oxygen deficiency (<19.5%) and toxic gas accumulation within an enclosed vessel preventing timely self-rescue, causing fatal hypoxic asphyxiation.',
    'Hot Work':
      'Sparks or open flame igniting nearby fugitive hydrocarbon vapors, causing rapid vapor cloud deflagration, structural fire, and fatal third-degree burns.',
    'Safe Mechanical Lifting':
      'Rigging component failure or crane instability during suspended load transit, causing dropped load impact and fatal crushing of ground crew members.',
    'Toxic Gas Exposure':
      'Acute inhalation of hazardous hydrogen sulfide gas exceeding IDLH threshold (100 ppm) resulting in sudden olfactory paralysis, loss of consciousness, and fatality.',
  };

  const potentialConsequence =
    report.potentialConsequence ||
    consequences[report.precursor] ||
    'High-energy barrier failure creating severe physical trauma, permanent disability, or fatality.';

  // Highlight snippet from narrative
  const evidenceSnippet =
    report.evidenceHighlight ||
    (report.description.includes(';')
      ? report.description.split(';')[1]?.trim() || report.description
      : report.description.slice(0, 110));

  // AI Explanation (2-3 sentences)
  const lsrName = formatLsrName(report.lsrViolated);
  const aiExplanation =
    report.aiExplanation ||
    `This event was classified as SIF Potential (${sifLevel}) due to the direct presence of an active ${report.precursor.toLowerCase()} precursor with high stored energy. Critical engineering controls and procedural barriers (${lsrName}) were compromised without secondary containment. Under IOGP Report 459 and OISD process safety guidelines, this scenario carries an immediate risk of permanent life-altering or fatal harm if unmitigated.`;

  // IOGP Life Saving Rules list
  const iogpRules =
    report.iogpRules && report.iogpRules.length > 0
      ? report.iogpRules
      : Array.from(
          new Set(
            [
              lsrName,
              report.precursor !== lsrName ? report.precursor : null,
              'Bypassing Safety Controls',
            ].filter(Boolean) as string[]
          )
        ).slice(0, 2);

  // Attachments
  const attachments: AttachmentItem[] =
    report.attachments && report.attachments.length > 0
      ? report.attachments
      : [
          {
            name: `${report.id.toLowerCase()}_cellar_incident_photo.jpg`,
            size: '2.4 MB',
            type: 'image',
          },
          {
            name: `${report.id.toLowerCase()}_permit_to_work_0442.pdf`,
            size: '890 KB',
            type: 'pdf',
          },
          {
            name: `${report.id.toLowerCase()}_barrier_integrity_audit.pdf`,
            size: '1.2 MB',
            type: 'pdf',
          },
        ];

  // Helper for precursor icon
  const getPrecursorIcon = (precursor: string) => {
    switch (precursor) {
      case 'Atmospheric Hazard':
        return <Wind className="h-4 w-4 text-sky-500" />;
      case 'Line of Fire':
        return <Target className="h-4 w-4 text-red-500" />;
      case 'Work at Height':
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
      case 'Energy Isolation':
        return <Lock className="h-4 w-4 text-amber-500" />;
      case 'Confined Space':
        return <Box className="h-4 w-4 text-purple-500" />;
      case 'Hot Work':
        return <Flame className="h-4 w-4 text-orange-500" />;
      case 'Safe Mechanical Lifting':
        return <Layers className="h-4 w-4 text-indigo-500" />;
      default:
        return <ShieldAlert className="h-4 w-4 text-rose-500" />;
    }
  };

  // Circular Progress calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - ((report.confidence ?? 0) / 100) * circumference;

  const confidenceStroke =
    (report.confidence ?? 0) >= 85
      ? 'stroke-emerald-500'
      : (report.confidence ?? 0) >= 70
      ? 'stroke-sky-500'
      : 'stroke-amber-500';

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-[#64748b] dark:text-muted-foreground">
          <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href="/reports"
            className="hover:text-foreground transition-colors font-medium"
          >
            SIF Reports
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-mono font-bold">
            {report.id}
          </span>
          <span className="hidden sm:inline-block text-muted-foreground">
            • Report Analysis
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/reports')}
            className="h-8 text-xs gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Reports
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="h-8 text-xs gap-1.5 hidden sm:inline-flex"
          >
            <Printer className="h-3.5 w-3.5" />
            Print Analysis
          </Button>
        </div>
      </div>

      {/* Page Title & Context Header */}
      <div className="border-b border-[#e2e8f0] dark:border-border/60 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1e293b] dark:text-slate-100">
                Report Analysis: {report.id}
              </h1>
              <Badge
                variant="outline"
                className="font-mono text-xs text-[#102F3E] bg-[#102F3E]/10 border-[#102F3E]/30"
              >
                OIL HSE Screening Standard
              </Badge>
            </div>
            <p className="text-xs text-[#475569] dark:text-slate-400">
              Detailed side-by-side comparison of original field observation narrative and automated SIF precursor screening.
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (50% Left / 50% Right with 32px gap) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN (50% width) - "Original Report"              */}
        {/* ======================================================== */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-1 border-b border-[#e2e8f0] dark:border-border/40">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e293b] dark:text-slate-100 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#0ea5e9]" />
              Original Report
            </h2>
            <span className="text-[11px] font-medium text-[#64748b]">
              Field Source Submission
            </span>
          </div>

          {/* 1. Report Metadata Section (All in a card) */}
          <Card className="border border-[#e2e8f0] bg-white dark:bg-card dark:border-border shadow-none rounded-[2px] transition-all duration-200">
            <CardHeader className="p-4 sm:p-6 pb-2 border-b border-[#e2e8f0] dark:border-border/50 bg-slate-50/50 dark:bg-muted/20">
              <CardTitle className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                Report Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Report ID */}
                <div className="space-y-1">
                  <span className="text-muted-foreground font-medium">
                    Report ID
                  </span>
                  <div className="font-mono text-sm font-bold text-sky-500">
                    {report.id}
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <span className="text-muted-foreground font-medium">
                    Date
                  </span>
                  <div className="flex items-center gap-1.5 text-foreground font-medium">
                    <Calendar className="h-3.5 w-3.5 text-sky-500" />
                    {formatReadableDate(report.date)}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-muted-foreground font-medium">
                    Location
                  </span>
                  <div className="flex items-center gap-1.5 text-foreground font-medium">
                    <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{report.location}</span>
                  </div>
                </div>

                {/* Activity */}
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-muted-foreground font-medium">
                    Activity
                  </span>
                  <div className="flex items-center gap-1.5 text-foreground font-medium">
                    <Activity className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                    <span>{report.activity}</span>
                  </div>
                </div>

                {/* Report Type */}
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-muted-foreground font-medium">
                    Report Type
                  </span>
                  <div>
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold px-2.5 py-0.5 ${
                        report.reportType === 'UA'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
                          : report.reportType === 'UC'
                          ? 'bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30'
                          : 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30'
                      }`}
                    >
                      {report.reportType === 'UA'
                        ? 'Unsafe Act (UA)'
                        : report.reportType === 'UC'
                        ? 'Unsafe Condition (UC)'
                        : 'Near Miss (NM)'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Submitter details line */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Submitted by: {report.reportedBy}</span>
                <span className="font-mono">{report.department}</span>
              </div>
            </CardContent>
          </Card>

          {/* 2. Original Narrative Section */}
          <Card className="border bg-card shadow-none rounded-[2px]">
            <CardHeader className="p-4 pb-2 border-b border-border/50 bg-muted/20 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Original Narrative
              </CardTitle>
              <span className="text-[10px] font-mono text-muted-foreground">
                As logged in SAP/HSE portal
              </span>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-foreground leading-snug">
                {report.title}
              </h3>
              <div className="p-4 rounded-[2px] border bg-muted/30 text-xs sm:text-sm leading-relaxed text-foreground/90 font-sans whitespace-pre-wrap">
                {report.description}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Raw submission unedited for audit authenticity.
              </div>
            </CardContent>
          </Card>

          {/* 3. Attachments Section */}
          <Card className="border bg-card shadow-none rounded-[2px]">
            <CardHeader className="p-4 pb-2 border-b border-border/50 bg-muted/20 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Paperclip className="h-3.5 w-3.5 text-sky-500" />
                Attachments ({attachments.length})
              </CardTitle>
              <span className="text-[10px] text-muted-foreground">
                Digital Evidence Vault
              </span>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5">
              {attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-[2px] border bg-background hover:bg-muted/40 transition-colors group cursor-pointer"
                  onClick={() => toast.info(`Viewing attachment: ${file.name}`)}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="p-2 rounded-[2px] bg-muted/60 text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                      {file.type === 'image' ? (
                        <ImageIcon className="h-4 w-4 text-[#102F3E]" />
                      ) : (
                        <File className="h-4 w-4 text-rose-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate group-hover:text-[#102F3E] transition-colors">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {file.size} • {file.type.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      title="Download document"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success(`Downloading ${file.name}`);
                      }}
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-[#102F3E]"
                      title="Open in new tab"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.info(`Opening preview for ${file.name}`);
                      }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (50% width) - "AI Analysis"                */}
        {/* Distinct subtle background color                         */}
        {/* ======================================================== */}
        <div className="space-y-5 rounded-[2px] border border-[#E4E7EC] bg-white p-5 sm:p-6 shadow-none">
          <div className="flex items-center justify-between pb-1 border-b border-[#E4E7EC]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#17202A] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#102F3E]" />
              Screening Result
            </h2>
            <Badge
              variant="outline"
              className="text-[10px] font-mono border-[#102F3E]/30 text-[#102F3E] dark:text-[#102F3E] bg-[#102F3E]/10"
            >
              Automated Screening
            </Badge>
          </div>

          {/* Top Row: SIF Potential Card & Circular Confidence Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. SIF Potential Card with Large Badge */}
            <Card className="border border-border/70 bg-card/90 shadow-none rounded-[2px] flex flex-col justify-between">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
                  SIF Potential
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-2">
                {/* Large Badge */}
                <div>
                  <Badge
                    variant="outline"
                    className={`text-base font-black px-4 py-1.5 rounded-[2px] shadow-none inline-flex items-center gap-2 ${
                      sifLevel === 'High'
                        ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/40'
                        : sifLevel === 'Medium'
                        ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/40'
                        : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        sifLevel === 'High'
                          ? 'bg-red-500 animate-pulse'
                          : sifLevel === 'Medium'
                          ? 'bg-orange-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    {sifLevel} SIF Potential
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {sifLevel === 'High'
                    ? 'High probability of fatal or permanent life-altering outcome.'
                    : sifLevel === 'Medium'
                    ? 'Elevated hazard with degraded barriers requiring supervisor review.'
                    : 'Low SIF risk; standard procedural safety controls applicable.'}
                </p>
              </CardContent>
            </Card>

            {/* 2. Confidence Score (Circular progress indicator) */}
            <Card className="border border-border/70 bg-card/90 shadow-none rounded-[2px] flex flex-col items-center justify-center p-4">
              <div className="w-full flex items-center justify-between pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Confidence Score</span>
                <span className="font-mono text-[#102F3E] font-bold">
                  {report.confidence}%
                </span>
              </div>

              {/* Circular Progress Indicator SVG */}
              <div className="relative w-24 h-24 my-1 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-muted/40"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className={`${confidenceStroke} transition-all duration-1000 ease-out`}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                {/* Center Percentage Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                  <span className="text-xl font-black font-mono tracking-tight text-foreground">
                    {report.confidence}%
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
                    Model Fit
                  </span>
                </div>
              </div>

              <span className="text-[10px] text-muted-foreground text-center">
                Confidence based on 2,400+ validated OIL historical cases
              </span>
            </Card>
          </div>

          {/* 3. Detected Precursor Tag with Icon */}
          <Card className="border border-border/70 bg-card/90 shadow-none rounded-[2px]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[#102F3E]" />
                Detected Precursor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] border border-[#102F3E]/30 bg-[#102F3E]/10 text-xs font-bold text-[#102F3E] dark:text-[#102F3E]">
                  {getPrecursorIcon(report.precursor)}
                  <span>{report.precursor}</span>
                </div>
                <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground">
                  Primary Vector
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 4. Potential Consequence Text Description */}
          <Card className="border border-border/70 bg-card/90 shadow-none rounded-[2px]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                Potential Consequence
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <p className="text-xs leading-relaxed text-foreground font-medium">
                {potentialConsequence}
              </p>
            </CardContent>
          </Card>

          {/* 5. IOGP Life-Saving Rule Badges */}
          <Card className="border border-border/70 bg-card/90 shadow-none rounded-[2px]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                IOGP Life-Saving Rule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2">
              <div className="flex flex-wrap gap-2">
                {iogpRules.map((rule: string, idx: number) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs font-semibold px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 flex items-center gap-1.5 shadow-none"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span>{rule}</span>
                  </Badge>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground">
                Mapped according to IOGP Report 459 standard life-saving rules.
              </p>
            </CardContent>
          </Card>

          {/* 6. Evidence Highlight from Narrative (Yellow Highlight Background) */}
          <Card className="border border-amber-500/30 bg-amber-500/5 shadow-none rounded-[2px]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5" />
                Evidence Highlight
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-1.5">
              <div className="p-3 rounded-[2px] border border-amber-500/20 bg-background/80 text-xs leading-relaxed">
                <span className="text-muted-foreground italic">" ... </span>
                <mark className="bg-yellow-300 dark:bg-yellow-500/40 text-yellow-950 dark:text-yellow-100 font-semibold px-1.5 py-0.5 rounded-[2px] shadow-none">
                  {evidenceSnippet}
                </mark>
                <span className="text-muted-foreground italic"> ... "</span>
              </div>
              <p className="text-[10px] text-[#667085]">
                Extracted trigger phrase identified from field observation narrative.
              </p>
            </CardContent>
          </Card>

          {/* 7. Screening Rationale (2-3 Sentences) */}
          <Card className="border border-[#102F3E]/20 bg-[#102F3E]/5 shadow-none rounded-[2px]">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs font-semibold text-[#17202A] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-[#102F3E]" />
                Screening Rationale
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <p className="text-xs leading-relaxed text-foreground/90 font-medium">
                {aiExplanation}
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#102F3E]/20 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Model: SIF Classification Engine v1.2</span>
                <span className="font-mono">Processing Time: 142ms</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ======================================================== */}
      {/* EXPERT REVIEW SECTION (Bottom of Report Analysis Page)    */}
      {/* ======================================================== */}
      <Card className="border border-[#e2e8f0] bg-white dark:bg-card dark:border-border shadow-none rounded-[2px] transition-all duration-200 overflow-hidden">
        <CardHeader className="p-4 sm:p-6 pb-3 border-b border-[#e2e8f0] dark:border-border/50 bg-slate-50/50 dark:bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-base font-bold text-[#1e293b] dark:text-slate-100 flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-[#0ea5e9]" />
              Expert Review &amp; Triage Validation
            </CardTitle>
            <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
              Human-in-the-loop expert adjudication of SIF precursor screening under OISD &amp; OSHA standards
            </p>
          </div>

          {/* Current Review Status Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-muted-foreground">Current Status:</span>
            <Badge
              variant="outline"
              className={`text-xs px-2.5 py-1 font-semibold flex items-center gap-1.5 transition-all ${
                reviewStatus.startsWith('Reviewed') || reviewStatus.includes('Confirmed')
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                  : reviewStatus.startsWith('Rejected')
                  ? 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30'
                  : reviewStatus.includes('Further')
                  ? 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30'
                  : 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
              }`}
            >
              {reviewStatus.startsWith('Reviewed') || reviewStatus.includes('Confirmed') ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              ) : reviewStatus.startsWith('Rejected') ? (
                <X className="h-3.5 w-3.5 text-red-500" />
              ) : reviewStatus.includes('Further') ? (
                <HelpCircle className="h-3.5 w-3.5 text-orange-500" />
              ) : (
                <Clock className="h-3.5 w-3.5 text-amber-500" />
              )}
              <span>{reviewStatus}</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-5">
          {/* Action Buttons Row */}
          <div>
            <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2.5">
              Select Validation Decision
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. Confirm SIF Classification (Green button with checkmark icon) */}
              <Button
                type="button"
                variant="outline"
                disabled={isSubmittingReview}
                onClick={() => handleSelectDecision('confirm')}
                className={`h-10 text-xs font-semibold justify-center transition-all duration-200 ease-in-out ${
                  selectedDecision === 'confirm'
                    ? 'bg-[#22c55e] hover:bg-[#16a34a] text-white border-[#22c55e] ring-2 ring-emerald-500/30 shadow-none'
                    : 'border-emerald-500/40 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-[#22c55e] hover:text-white dark:hover:bg-[#22c55e] dark:hover:text-white'
                }`}
              >
                <Check className="h-4 w-4 mr-2" />
                Confirm SIF Classification
              </Button>

              {/* 2. Reject Classification (Red button with X icon) */}
              <Button
                type="button"
                variant="outline"
                disabled={isSubmittingReview}
                onClick={() => handleSelectDecision('reject')}
                className={`h-10 text-xs font-semibold justify-center transition-all duration-200 ease-in-out ${
                  selectedDecision === 'reject'
                    ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white border-[#ef4444] ring-2 ring-red-500/30 shadow-none'
                    : 'border-red-500/40 text-red-700 dark:text-red-400 bg-red-500/10 hover:bg-[#ef4444] hover:text-white dark:hover:bg-[#ef4444] dark:hover:text-white'
                }`}
              >
                <X className="h-4 w-4 mr-2" />
                Reject Classification
              </Button>

              {/* 3. Request Further Review (Orange button with question mark icon) */}
              <Button
                type="button"
                variant="outline"
                disabled={isSubmittingReview}
                onClick={() => handleSelectDecision('further_review')}
                className={`h-10 text-xs font-semibold justify-center transition-all duration-200 ease-in-out ${
                  selectedDecision === 'further_review'
                    ? 'bg-[#f59e0b] hover:bg-[#d97706] text-white border-[#f59e0b] ring-2 ring-amber-500/30 shadow-none'
                    : 'border-amber-500/40 text-amber-700 dark:text-amber-400 bg-amber-500/10 hover:bg-[#f59e0b] hover:text-white dark:hover:bg-[#f59e0b] dark:hover:text-white'
                }`}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Request Further Review
              </Button>
            </div>
          </div>

          {/* Reviewer Comments Textarea with Character Counter */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-foreground">
              <span>Reviewer Comments &amp; Assessment Rationale</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {reviewComments.length} / {maxChars} characters
              </span>
            </div>
            <Textarea
              value={reviewComments}
              onChange={(e) => {
                if (e.target.value.length <= maxChars) {
                  setReviewComments(e.target.value);
                }
              }}
              disabled={isSubmittingReview}
              placeholder="Record operational rationale, barrier validation notes, root cause confirmation, or corrective actions (CAPA)..."
              className="min-h-[100px] text-xs resize-y font-sans leading-relaxed"
            />
          </div>

          {/* Submit Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-border/50">
            <div className="text-xs text-muted-foreground">
              {selectedDecision ? (
                <span className="text-foreground font-medium">
                  Active selection:{' '}
                  <strong className="text-[#102F3E] capitalize">
                    {selectedDecision === 'confirm'
                      ? 'Confirm SIF Classification'
                      : selectedDecision === 'reject'
                      ? 'Reject Classification'
                      : 'Request Further Review'}
                  </strong>
                </span>
              ) : (
                <span className="italic">
                  Please click one of the three decision buttons above to enable submission.
                </span>
              )}
            </div>

            <Button
              type="button"
              variant="default"
              disabled={!selectedDecision || isSubmittingReview}
              onClick={handleSubmitReview}
              className="h-9 px-5 text-xs font-semibold shadow-none rounded-[2px] gap-1.5 self-end sm:self-auto"
            >
              <Send className="h-3.5 w-3.5" />
              {isSubmittingReview ? 'Submitting Review...' : 'Submit Review'}
            </Button>
          </div>

          {/* Audit Confirmation Banner (if submitted during session) */}
          {submittedReview && (
            <div className="rounded-[2px] border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs space-y-1 animate-in fade-in-50 duration-300">
              <div className="flex items-center justify-between font-semibold text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Review Adjudication Logged
                </span>
                <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                  {submittedReview.timestamp}
                </span>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Adjudicated by <strong className="text-foreground">{submittedReview.reviewedBy}</strong> with decision:{' '}
                <strong className="capitalize text-foreground">{submittedReview.decision.replace('_', ' ')}</strong>.
              </p>
              {submittedReview.comments && (
                <p className="text-xs text-foreground/90 pt-1 italic font-sans border-t border-emerald-500/20 mt-1">
                  "{submittedReview.comments}"
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Rejecting SIF Classification */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="max-w-md border-rose-500/30">
          <DialogHeader>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="h-5 w-5" />
              <DialogTitle className="text-base font-bold">
                Confirm SIF Classification Rejection
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground pt-1.5 leading-relaxed">
              Are you sure you want to reject the SIF precursor screening result for{' '}
              <strong className="font-mono text-foreground">{report.id}</strong>?
              <br /><br />
              Rejecting this classification will downgrade this safety observation to non-critical and waive mandatory Life-Saving Rule corrective action escalation under OISD standards.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex items-center justify-end gap-2 pt-3 border-t">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsRejectDialogOpen(false)}
              className="h-8 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={confirmRejection}
              className="h-8 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white"
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
