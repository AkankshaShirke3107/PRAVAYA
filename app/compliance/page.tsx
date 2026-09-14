'use client';

import React, { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Box,
  Calendar,
  Car,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  FileCheck,
  FileText,
  Flame,
  Info,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSafetyStore } from '@/lib/store';
import type { SafetyReport } from '@/types';

type Rule = {
  id: number;
  name: string;
  action: string;
  purpose: string;
  color: string;
  background: string;
};

const LIFE_SAVING_RULES: Rule[] = [
  {
    id: 1,
    name: 'Bypassing Safety Controls',
    action: 'Obtain authorisation before overriding or disabling safety controls.',
    purpose: 'Ensures critical alarms, interlocks, and protective barriers are not bypassed without approval.',
    color: '#C92925',
    background: '#FEF2F2',
  },
  {
    id: 2,
    name: 'Confined Space',
    action: 'Obtain authorisation before entering a confined space and verify atmospheric testing.',
    purpose: 'Prevents toxic exposure, oxygen deficiency, entrapment, and delayed rescue.',
    color: '#D97706',
    background: '#FFFBEB',
  },
  {
    id: 3,
    name: 'Driving',
    action: 'Wear a seatbelt, follow speed limits, and avoid mobile-phone use while driving.',
    purpose: 'Reduces collision, rollover, and vehicle-pedestrian interaction risk.',
    color: '#2F6B84',
    background: '#F0F9FF',
  },
  {
    id: 4,
    name: 'Energy Isolation',
    action: 'Verify isolation and zero energy before work begins.',
    purpose: 'Prevents exposure to electrical, mechanical, pressure, and stored energy.',
    color: '#102F3E',
    background: '#F1F5F9',
  },
  {
    id: 5,
    name: 'Hot Work',
    action: 'Control flammable gas sources and ignition hazards before hot work.',
    purpose: 'Prevents fire, explosion, and burn exposure during welding, cutting, and grinding.',
    color: '#C65D1E',
    background: '#FFF7ED',
  },
  {
    id: 6,
    name: 'Line of Fire',
    action: 'Stay clear of moving machinery, suspended loads, and released energy.',
    purpose: 'Prevents struck-by, caught-between, crush, and pressure-release injuries.',
    color: '#991F1B',
    background: '#FEF2F2',
  },
  {
    id: 7,
    name: 'Safe Mechanical Lifting',
    action: 'Plan lifting operations and control access below suspended loads.',
    purpose: 'Prevents lifting-related struck-by and crush events.',
    color: '#1D8278',
    background: '#F0FDFA',
  },
  {
    id: 8,
    name: 'Work Authorisation',
    action: 'Obtain a valid permit before starting work and follow permit requirements.',
    purpose: 'Ensures hazards, controls, and work boundaries are reviewed before work begins.',
    color: '#2BA6A0',
    background: '#F0FDFA',
  },
  {
    id: 9,
    name: 'Work at Height',
    action: 'Protect yourself against falls and secure tools when working at height.',
    purpose: 'Prevents falls and dropped-object exposure during elevated work.',
    color: '#C92925',
    background: '#FEF2F2',
  },
];

function RuleIcon({ id }: { id: number }) {
  const className = 'h-4 w-4';

  if (id === 1) return <ShieldAlert className={className} />;
  if (id === 2) return <Box className={className} />;
  if (id === 3) return <Car className={className} />;
  if (id === 4) return <Zap className={className} />;
  if (id === 5) return <Flame className={className} />;
  if (id === 6) return <AlertTriangle className={className} />;
  if (id === 7) return <CheckSquare className={className} />;
  if (id === 8) return <FileCheck className={className} />;

  return <ShieldCheck className={className} />;
}

function reportMatchesRule(report: SafetyReport, ruleName: string) {
  const target = ruleName.toLowerCase().trim();

  const primaryRule = String(report.lsrViolated || '')
    .toLowerCase()
    .trim();

  const ruleList = Array.isArray(report.iogpRules)
    ? report.iogpRules.map((rule) => String(rule).toLowerCase().trim())
    : [];

  const matches = (value: string) =>
    value === target ||
    (target === 'work at height' && value.includes('height')) ||
    (target === 'work authorisation' &&
      (value.includes('permit') || value.includes('authorisation'))) ||
    (target === 'driving' &&
      (value.includes('driving') || value.includes('transport'))) ||
    value.includes(target);

  return (primaryRule.length > 0 && matches(primaryRule)) || ruleList.some(matches);
}

function getTypeIconBadge(type: string) {
  switch (type) {
    case 'UA':
    case 'Unsafe Act':
      return (
        <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700 bg-amber-500/10 px-2.5 py-0.5 border border-amber-500/30 rounded-full text-xs">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          <span>UA</span>
        </span>
      );
    case 'UC':
    case 'Unsafe Condition':
      return (
        <span className="inline-flex items-center gap-1.5 font-semibold text-blue-700 bg-blue-500/10 px-2.5 py-0.5 border border-blue-500/30 rounded-full text-xs">
          <Info className="h-3.5 w-3.5 text-blue-600 shrink-0" />
          <span>UC</span>
        </span>
      );
    case 'NM':
    case 'Near Miss':
      return (
        <span className="inline-flex items-center gap-1.5 font-semibold text-purple-700 bg-purple-500/10 px-2.5 py-0.5 border border-purple-500/30 rounded-full text-xs">
          <AlertCircle className="h-3.5 w-3.5 text-purple-600 shrink-0" />
          <span>NM</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-slate-100 px-2.5 py-0.5 border border-slate-300 rounded-full text-xs">
          <FileText className="h-3.5 w-3.5 text-slate-500 shrink-0" />
          <span>{type || 'Report'}</span>
        </span>
      );
  }
}

function getSifIconBadge(sifState: string) {
  switch (sifState) {
    case 'Yes':
    case 'High':
      return (
        <span className="inline-flex items-center gap-1.5 font-bold text-red-700 bg-red-500/10 px-2.5 py-0.5 border border-red-500/30 rounded-full text-xs">
          <Flame className="h-3.5 w-3.5 fill-red-600 text-red-600 shrink-0" />
          <span>Yes</span>
        </span>
      );
    case 'Review':
    case 'Medium':
      return (
        <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700 bg-amber-500/10 px-2.5 py-0.5 border border-amber-500/30 rounded-full text-xs">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          <span>Review</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 border border-slate-300 rounded-full text-xs">
          <CheckCircle2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span>No</span>
        </span>
      );
  }
}

function LifeSavingRulesView() {
  const reports = useSafetyStore((state) => state.reports) || [];
  const setSelectedReport = useSafetyStore((state) => state.setSelectedReport);
  const [selectedRuleId, setSelectedRuleId] = useState(1);

  const selectedRule = useMemo(() => {
    return (
      LIFE_SAVING_RULES.find((rule) => rule.id === selectedRuleId) ||
      LIFE_SAVING_RULES[0]
    );
  }, [selectedRuleId]);

  const selectedReports = useMemo(() => {
    return reports.filter((report) =>
      reportMatchesRule(report, selectedRule.name)
    );
  }, [reports, selectedRule.name]);

  return (
    <div className="space-y-8">
      <section className="border border-[#D9DDE0] bg-gradient-to-r from-[#102F3E] via-[#17495D] to-[#102F3E] p-6 text-white">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-[#9BD7D2] uppercase">
              COMPLIANCE
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-white">Life-Saving Rules</h1>
            <p className="mt-1 text-sm text-slate-300 font-normal">
              Rule-based screening reference for high-potential safety exposures.
            </p>
          </div>

          <div className="border border-white/20 bg-white/10 px-4 py-3 text-right text-white">
            <p className="text-2xl font-bold text-white">{reports.length}</p>
            <p className="text-xs text-slate-300">Reports in demonstration dataset</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[#667085]">
              REFERENCE FRAMEWORK
            </p>
            <h2 className="text-lg font-bold text-[#102F3E]">
              IOGP Life-Saving Rules
            </h2>
          </div>
          <p className="text-xs text-[#667085]">Select a rule to view mapped reports</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {LIFE_SAVING_RULES.map((rule) => {
            const count = reports.filter((report) =>
              reportMatchesRule(report, rule.name)
            ).length;

            const selected = rule.id === selectedRuleId;

            return (
              <button
                key={rule.id}
                type="button"
                onClick={() => setSelectedRuleId(rule.id)}
                className={`border p-4 text-left transition ${selected
                  ? 'border-[#102F3E] bg-[#F8FAFC] shadow-sm'
                  : 'border-[#D9DDE0] bg-white hover:border-[#2F6B84]'
                  }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center"
                    style={{ backgroundColor: rule.background, color: rule.color }}
                  >
                    <RuleIcon id={rule.id} />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-[#D9DDE0] bg-white text-xs text-[#102F3E]"
                  >
                    {count} records
                  </Badge>
                </div>

                <p className="mt-3 text-xs font-semibold tracking-[0.12em] text-[#667085]">
                  RULE {rule.id}
                </p>
                <h3 className="mt-1 font-bold text-[#102F3E]">{rule.name}</h3>
                <p className="mt-2 text-sm leading-5 text-[#475467]">
                  {rule.action}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="border border-[#D9DDE0] bg-white">
        <div className="border-b border-[#D9DDE0] bg-[#F8FAFC] p-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-[#667085]">
                SELECTED RULE
              </p>
              <h2 className="text-lg font-bold text-[#102F3E]">
                {selectedRule.name}
              </h2>
              <p className="mt-1 text-sm text-[#475467]">{selectedRule.purpose}</p>
            </div>

            <Link href={`/reports?q=${encodeURIComponent(selectedRule.name)}`}>
              <Button
                variant="outline"
                className="border-[#102F3E] text-[#102F3E]"
              >
                View related reports
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-5">
          <h3 className="mb-3 text-sm font-bold text-[#102F3E]">
            Mapped demonstration reports ({selectedReports.length})
          </h3>

          {selectedReports.length === 0 ? (
            <div className="border border-dashed border-[#D9DDE0] bg-[#F8FAFC] p-8 text-center">
              <Info className="mx-auto mb-2 h-6 w-6 text-[#667085]" />
              <p className="text-sm font-medium text-[#102F3E]">
                No demonstration reports are currently mapped to this rule.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#102F3E] hover:bg-[#102F3E]">
                    <TableHead className="text-white">Report ID</TableHead>
                    <TableHead className="text-white">Site</TableHead>
                    <TableHead className="text-white">Type</TableHead>
                    <TableHead className="text-white">Title</TableHead>
                    <TableHead className="text-white">SIF state</TableHead>
                    <TableHead className="text-right text-white">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-[#F6FAFB]">
                      <TableCell className="font-mono font-semibold">
                        {report.id}
                      </TableCell>
                      <TableCell>{report.site}</TableCell>
                      <TableCell>{getTypeIconBadge(report.reportType)}</TableCell>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{getSifIconBadge(report.sifPotential)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedReport(report)}
                        >
                          Inspect
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function OisdComplianceView() {
  const reports = useSafetyStore((state) => state.reports) || [];

  const metrics = useMemo(() => {
    const total = reports.length;
    const hasType = reports.filter((report) => Boolean(report.reportType)).length;
    const hasNarrative = reports.filter(
      (report) => Boolean(report.description && report.description.trim())
    ).length;
    const hasSite = reports.filter((report) => Boolean(report.site)).length;
    const requiresReview = reports.filter(
      (report) =>
        report.sifPotential === 'Review' ||
        report.status === 'Pending' ||
        report.status === 'Under Review'
    ).length;

    return { total, hasType, hasNarrative, hasSite, requiresReview };
  }, [reports]);

  const controls = [
    ['Report type recorded', `${metrics.hasType}/${metrics.total} records have a report type`, 'Available'],
    ['Safety narrative available', `${metrics.hasNarrative}/${metrics.total} records include a description`, 'Available'],
    ['Site or location recorded', `${metrics.hasSite}/${metrics.total} records include a site`, 'Available'],
    ['PSIF review status', `${metrics.requiresReview} records require manual review`, 'Requires Review'],
    ['Final HSE decision', 'Reviewer decision depends on workflow completion', 'Partial'],
  ];

  return (
    <div className="space-y-8">
      <section className="border border-[#D9DDE0] bg-gradient-to-r from-[#102F3E] via-[#17495D] to-[#102F3E] p-6 text-white">
        <p className="text-xs font-bold tracking-[0.15em] text-[#9BD7D2] uppercase">
          COMPLIANCE
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-white">OISD Compliance Readiness</h1>
        <p className="mt-1 text-sm text-slate-300 font-normal">
          Safety-reporting completeness and review controls for prototype records.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-[#D9DDE0]">
          <CardContent className="p-5">
            <p className="text-xs font-semibold text-[#667085]">REPORT TYPE AVAILABLE</p>
            <p className="mt-2 text-2xl font-bold text-[#102F3E]">
              {metrics.hasType}/{metrics.total}
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#D9DDE0]">
          <CardContent className="p-5">
            <p className="text-xs font-semibold text-[#667085]">NARRATIVE AVAILABLE</p>
            <p className="mt-2 text-2xl font-bold text-[#1D8278]">
              {metrics.hasNarrative}/{metrics.total}
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#D9DDE0]">
          <CardContent className="p-5">
            <p className="text-xs font-semibold text-[#667085]">SITE AVAILABLE</p>
            <p className="mt-2 text-2xl font-bold text-[#2F6B84]">
              {metrics.hasSite}/{metrics.total}
            </p>
          </CardContent>
        </Card>
        <Card className="border-[#D9DDE0]">
          <CardContent className="p-5">
            <p className="text-xs font-semibold text-[#667085]">REQUIRES REVIEW</p>
            <p className="mt-2 text-2xl font-bold text-[#C92925]">
              {metrics.requiresReview}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="border border-[#D9DDE0] bg-white">
        <div className="border-b border-[#D9DDE0] bg-[#F8FAFC] p-5">
          <h2 className="text-lg font-bold text-[#102F3E]">
            Reporting completeness checklist
          </h2>
          <p className="mt-1 text-sm text-[#667085]">
            Prototype readiness view for safety-report data.
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#102F3E] hover:bg-[#102F3E]">
                <TableHead className="text-white">Reporting control</TableHead>
                <TableHead className="text-white">Current demonstration status</TableHead>
                <TableHead className="text-white">Required action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controls.map(([control, detail, status]) => (
                <TableRow key={control}>
                  <TableCell className="font-medium text-[#102F3E]">
                    {control}
                  </TableCell>
                  <TableCell>{detail}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        status === 'Available'
                          ? 'bg-[#2E7D32] text-white'
                          : status === 'Partial'
                            ? 'bg-[#D97706] text-white'
                            : 'bg-[#C92925] text-white'
                      }
                    >
                      {status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="border border-[#D9DDE0] bg-[#F8FAFC] p-4 text-sm text-[#667085]">
        <div className="flex gap-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#102F3E]" />
          <p>
            Prototype readiness view; final compliance assessment requires approved
            OISD and OIL procedures.
          </p>
        </div>
      </section>
    </div>
  );
}

function AuditStandardsView() {
  const standards = [
    ['Permit to work', 'Permit controls and task authorization', 'Evidence pending review'],
    ['Energy isolation', 'LOTO and zero-energy verification', 'Evidence pending review'],
    ['Work at height', 'Fall protection and dropped-object controls', 'Evidence pending review'],
    ['Confined-space entry', 'Gas testing, ventilation, attendant, and rescue readiness', 'Evidence pending review'],
    ['Hot work', 'Gas testing, fire watch, and ignition control', 'Evidence pending review'],
    ['Mechanical lifting', 'Lift planning, rigging, exclusion zone, and load control', 'Evidence pending review'],
    ['Emergency preparedness', 'Emergency response equipment and readiness', 'Audit schedule not connected'],
  ];

  const stages = [
    'Planned',
    'Evidence collection',
    'HSE review',
    'Action assignment',
    'Closure verification',
  ];

  return (
    <div className="space-y-8">
      <section className="border border-[#D9DDE0] bg-gradient-to-r from-[#102F3E] via-[#17495D] to-[#102F3E] p-6 text-white">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-[#9BD7D2] uppercase">
              COMPLIANCE
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-white">Audit &amp; Standards</h1>
            <p className="mt-1 text-sm text-slate-300 font-normal">
              Track safety-control verification, audit evidence, and open observations.
            </p>
          </div>

          <Link href="/actions">
            <Button className="bg-[#C92925] text-white hover:bg-[#991F1B]">
              View Corrective Actions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="border border-[#D9DDE0] bg-white">
        <div className="border-b border-[#D9DDE0] bg-[#F8FAFC] p-5">
          <h2 className="text-lg font-bold text-[#102F3E]">Standards register</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Audit planning framework for key safety-control areas.
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#102F3E] hover:bg-[#102F3E]">
                <TableHead className="text-white">Control area</TableHead>
                <TableHead className="text-white">Focus area</TableHead>
                <TableHead className="text-white">Prototype status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standards.map(([area, focus, status]) => (
                <TableRow key={area}>
                  <TableCell className="font-medium text-[#102F3E]">{area}</TableCell>
                  <TableCell>{focus}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-[#D9DDE0]">
                      {status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="border-[#D9DDE0]">
          <CardHeader className="border-b border-[#D9DDE0] bg-[#F8FAFC]">
            <CardTitle className="flex items-center gap-2 text-[#102F3E]">
              <Calendar className="h-4 w-4 text-[#1D8278]" />
              Audit workflow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-5">
            {stages.map((stage, index) => (
              <div
                key={stage}
                className="flex items-center gap-3 border border-[#D9DDE0] bg-[#F8FAFC] p-3"
              >
                <span className="flex h-7 w-7 items-center justify-center bg-[#102F3E] text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-[#102F3E]">{stage}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-[#D9DDE0]">
          <CardHeader className="border-b border-[#D9DDE0] bg-[#F8FAFC]">
            <CardTitle className="flex items-center gap-2 text-[#102F3E]">
              <CheckSquare className="h-4 w-4 text-[#C92925]" />
              Corrective actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <p className="text-sm leading-6 text-[#475467]">
              This prototype links audit observations to corrective-action tracking.
              Formal audit schedules and evidence records are not connected.
            </p>
            <Link href="/actions" className="block">
              <Button className="w-full bg-[#102F3E] text-white hover:bg-[#082735]">
                View Corrective Actions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="border border-[#D9DDE0] bg-[#F8FAFC] p-4 text-sm text-[#667085]">
        This prototype supports audit preparation and does not replace formal OISD/OIL
        audit processes.
      </section>
    </div>
  );
}

function ComplianceContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  if (tab === 'oisd') {
    return <OisdComplianceView />;
  }

  if (tab === 'audit') {
    return <AuditStandardsView />;
  }

  return <LifeSavingRulesView />;
}

export default function CompliancePage() {
  return (
    <main className="mx-auto min-w-0 max-w-[1600px] space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Suspense
        fallback={
          <div className="p-8 text-center text-sm text-[#667085]">
            Loading compliance views...
          </div>
        }
      >
        <ComplianceContent />
      </Suspense>
    </main>
  );
}
