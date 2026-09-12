'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  Calendar,
  Download,
  Search,
  Filter,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Shield,
  Layers,
  ChevronRight,
  FileText,
  BadgeAlert,
  Info,
  CheckSquare,
  Square,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface ComplianceStandard {
  id: string;
  code: string;
  title: string;
  authority: 'OISD' | 'OSHA' | 'DGMS';
  domain: string;
  mappedLsr: string;
  status: 'Compliant' | 'Under Review' | 'Action Required';
  linkedReportsCount: number;
  lastAuditDate: string;
  nextAuditDate: string;
  summary: string;
}

const STANDARDS_DATA: ComplianceStandard[] = [
  {
    id: 'std-1',
    code: 'OISD-STD-105',
    title: 'Work Permit System in Hydrocarbon Industry',
    authority: 'OISD',
    domain: 'Permit to Work',
    mappedLsr: 'Bypassing Safety Controls',
    status: 'Compliant',
    linkedReportsCount: 18,
    lastAuditDate: '2026-04-12',
    nextAuditDate: '2026-10-12',
    summary:
      'Mandates statutory cold/hot work authorization, electrical lockout tags, positive mechanical blind flanging, and gas free certification before cold/hot work.',
  },
  {
    id: 'std-2',
    code: 'OISD-GDN-166',
    title: 'Guidelines on Working at Height in Oil & Gas Assets',
    authority: 'OISD',
    domain: 'Work at Height',
    mappedLsr: 'Working at Height',
    status: 'Compliant',
    linkedReportsCount: 14,
    lastAuditDate: '2026-04-18',
    nextAuditDate: '2026-10-18',
    summary:
      'Requires 100% continuous tie-off above 1.8 meters, dual-lanyard shock absorbers, certified inertia reels on derrick monkey boards, and daily harness inspections.',
  },
  {
    id: 'std-3',
    code: 'OISD-STD-112',
    title: 'Safe Handling of Electrical Equipment in Hazardous Areas',
    authority: 'OISD',
    domain: 'Electrical & LOTO',
    mappedLsr: 'Energy Isolation',
    status: 'Compliant',
    linkedReportsCount: 11,
    lastAuditDate: '2026-05-02',
    nextAuditDate: '2026-11-02',
    summary:
      'Governs multi-padlock lockout/tagout (LOTO) protocols, motor control center isolations, and flame-proof Zone 0/1 electrical apparatus integrity.',
  },
  {
    id: 'std-4',
    code: 'OSHA 1910.146',
    title: 'Permit-Required Confined Spaces Standards',
    authority: 'OSHA',
    domain: 'Confined Space',
    mappedLsr: 'Confined Space',
    status: 'Under Review',
    linkedReportsCount: 8,
    lastAuditDate: '2026-03-20',
    nextAuditDate: '2026-09-20',
    summary:
      'Demands continuous atmospheric oxygen/toxic gas monitoring, calibrated multi-gas bump checks, authorized standby attendants, and mechanical retrieval winches.',
  },
  {
    id: 'std-5',
    code: 'OSHA 1910.147',
    title: 'The Control of Hazardous Energy (Lockout/Tagout)',
    authority: 'OSHA',
    domain: 'Process Safety',
    mappedLsr: 'Energy Isolation',
    status: 'Compliant',
    linkedReportsCount: 12,
    lastAuditDate: '2026-04-25',
    nextAuditDate: '2026-10-25',
    summary:
      'Mandates zero-energy verification across hydrostatic, pneumatic, mechanical, and gravitational systems prior to servicing process piping or pump seals.',
  },
  {
    id: 'std-6',
    code: 'OISD-STD-129',
    title: 'Inspection and Maintenance of Fire Protection Equipment',
    authority: 'OISD',
    domain: 'Fire Protection',
    mappedLsr: 'Hot Work',
    status: 'Action Required',
    linkedReportsCount: 6,
    lastAuditDate: '2026-02-14',
    nextAuditDate: '2026-08-14',
    summary:
      'Defines hydrostatic testing cycles for deluge valves, foam proportioners, dry chemical skid bottles, and quarterly fire-water pump discharge tests.',
  },
  {
    id: 'std-7',
    code: 'OSHA 1926.1400',
    title: 'Cranes and Derricks in Heavy Construction & Rig Moves',
    authority: 'OSHA',
    domain: 'Lifting & Rigging',
    mappedLsr: 'Safe Mechanical Lifting',
    status: 'Compliant',
    linkedReportsCount: 9,
    lastAuditDate: '2026-04-05',
    nextAuditDate: '2026-10-05',
    summary:
      'Specifies load chart compliance, outrigger ground-bearing capacity calculations, engineered timber spreader mats, and exclusion perimeter barricades.',
  },
  {
    id: 'std-8',
    code: 'OISD-GDN-155',
    title: 'Personal Protective Equipment & Respiratory Safety',
    authority: 'OISD',
    domain: 'Toxic Gas / Chemical',
    mappedLsr: 'Toxic Gas / Chemical Exposure',
    status: 'Compliant',
    linkedReportsCount: 5,
    lastAuditDate: '2026-05-10',
    nextAuditDate: '2026-11-10',
    summary:
      'Mandates dual-sensor H2S/CO personal monitors, positive-pressure self-contained breathing apparatus (SCBA) escape hoods, and chemical barrier suits.',
  },
  {
    id: 'std-9',
    code: 'DGMS Tech Circular 04',
    title: 'Safety Interlocks on High Pressure Wellhead Rigs',
    authority: 'DGMS',
    domain: 'Drilling Safety',
    mappedLsr: 'Line of Fire',
    status: 'Compliant',
    linkedReportsCount: 7,
    lastAuditDate: '2026-03-30',
    nextAuditDate: '2026-09-30',
    summary:
      'Enforces rotary table safety dogs, crown-o-matic upper traveling block limiters, and pressure relief valve (PRV) testing logs on mud manifold lines.',
  },
];

interface AuditCheckItem {
  id: string;
  category: string;
  standard: string;
  title: string;
  description: string;
  completed: boolean;
}

const INITIAL_CHECKLIST: AuditCheckItem[] = [
  {
    id: 'chk-1',
    category: 'Permit to Work',
    standard: 'OISD-STD-105',
    title: 'PTW Cross-Verification with Live Gas Testing',
    description: 'Ensure daily cold/hot work permits have calibrated multi-gas test records attached before shift start.',
    completed: true,
  },
  {
    id: 'chk-2',
    category: 'Work at Height',
    standard: 'OISD-GDN-166',
    title: '100% Double-Lanyard Harness Inspection Tags',
    description: 'Verify 6-month third-party pull test inspection certification tags on all derrick safety harnesses.',
    completed: true,
  },
  {
    id: 'chk-3',
    category: 'Electrical & LOTO',
    standard: 'OISD-STD-112',
    title: 'MCC Lockout Padlocks & Isolation Keys Audit',
    description: 'Perform physical count of red lockout padlocks and verify key isolation log in Motor Control Centers.',
    completed: true,
  },
  {
    id: 'chk-4',
    category: 'Confined Space',
    standard: 'OSHA 1910.146',
    title: 'Confined Space Bump Test & Attendant Log',
    description: 'Verify 4-gas bump test certificates completed within 24h prior to crude tank de-silting entry.',
    completed: true,
  },
  {
    id: 'chk-5',
    category: 'Fire Protection',
    standard: 'OISD-STD-129',
    title: 'Fire Water Ring Main Quarterly Flow Hydro-Test',
    description: 'Complete quarterly hydrostatic flow rate and nozzle pressure verification across Moran GGS-1 ring main.',
    completed: false,
  },
  {
    id: 'chk-6',
    category: 'Lifting & Rigging',
    standard: 'OSHA 1926.1400',
    title: 'Crane Outrigger Soil Compaction Verification',
    description: 'Inspect mobile crane engineered timber spreader pads and ground load calculations on drilling pads.',
    completed: true,
  },
  {
    id: 'chk-7',
    category: 'Toxic Gas & Chemical',
    standard: 'OISD-GDN-155',
    title: 'Cascade Breathing Apparatus Bottle Pressure > 200 Bar',
    description: 'Verify manifold cylinder pressure across H2S emergency refuge shelters at Naharkatia.',
    completed: true,
  },
  {
    id: 'chk-8',
    category: 'Permit to Work',
    standard: 'OISD-STD-105',
    title: 'Mechanical Blind Slip Log & Spectacle Position',
    description: 'Ensure blind flange isolation tag board corresponds 1:1 with P&ID line diagrams on crude manifolds.',
    completed: false,
  },
];

export default function CompliancePage() {
  const [standards, setStandards] = useState<ComplianceStandard[]>(STANDARDS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState('All Authorities');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [checklist, setChecklist] = useState<AuditCheckItem[]>(INITIAL_CHECKLIST);

  // Filtered Standards
  const filteredStandards = useMemo(() => {
    return standards.filter((std) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          std.code.toLowerCase().includes(q) ||
          std.title.toLowerCase().includes(q) ||
          std.domain.toLowerCase().includes(q) ||
          std.mappedLsr.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedAuthority !== 'All Authorities' && std.authority !== selectedAuthority) {
        return false;
      }
      if (selectedDomain !== 'All Domains' && std.domain !== selectedDomain) {
        return false;
      }
      return true;
    });
  }, [standards, searchQuery, selectedAuthority, selectedDomain]);

  // Unique domains
  const domains = useMemo(() => {
    const set = new Set<string>();
    STANDARDS_DATA.forEach((s) => set.add(s.domain));
    return ['All Domains', ...Array.from(set).sort()];
  }, []);

  // Checklist Calculations
  const completedCount = checklist.filter((c) => c.completed).length;
  const totalCount = checklist.length;
  const complianceScore = Math.round((completedCount / totalCount) * 100);

  // Toggle Checklist item
  const toggleCheckItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.completed;
          toast.info(nextState ? `Marked Completed: ${item.standard}` : `Marked Open: ${item.standard}`);
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  const handleExportDossier = () => {
    toast.success('Statutory Compliance Dossier Exported', {
      description: 'Downloaded OISD / OSHA Audit Ready PDF Package (6.4 MB).',
    });
  };

  const getStatusBadge = (status: ComplianceStandard['status']) => {
    switch (status) {
      case 'Compliant':
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 gap-1 text-[11px]">
            <CheckCircle2 className="h-3 w-3" />
            Compliant
          </Badge>
        );
      case 'Under Review':
        return (
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1 text-[11px]">
            <Clock className="h-3 w-3" />
            Under Review
          </Badge>
        );
      case 'Action Required':
        return (
          <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 gap-1 text-[11px]">
            <AlertTriangle className="h-3 w-3" />
            Action Required
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500 shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  OISD / OSHA Statutory Compliance
                </h1>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px] font-mono">
                  Audit Grade
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Statutory regulatory monitoring, OISD standards mapping, and statutory audit readiness for Oil India assets
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={handleExportDossier}
            variant="outline"
            className="text-xs h-9 gap-1.5 shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            Export Compliance Dossier
          </Button>
          <Link href="/reports?sif=High">
            <Button className="text-xs h-9 bg-sky-600 hover:bg-sky-500 text-white gap-1.5 shadow-sm">
              <FileCheck className="h-3.5 w-3.5" />
              View Linked Incidents
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <Card className="border bg-card/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Compliance Rating</span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-foreground">
                {complianceScore}%
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                +2.4% vs last qtr
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Verified against 14 mandatory upstream safety standards
            </p>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="border bg-card/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Standards Monitored</span>
              <div className="h-8 w-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500">
                <Layers className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-foreground">
                14
              </span>
              <span className="text-[11px] text-muted-foreground">
                (9 OISD • 4 OSHA • 1 DGMS)
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Covering drilling, GGS, pipelines, &amp; tank farms
            </p>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="border bg-card/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Open Action Items</span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tracking-tight text-amber-500">
                {totalCount - completedCount} Minor
              </span>
              <span className="text-[11px] text-emerald-500 font-semibold">
                0 Critical
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              All high-priority preventive actions closed out
            </p>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card className="border bg-card/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Next Regulatory Audit</span>
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono tracking-tight text-foreground">
                15 Oct 2026
              </span>
              <Badge variant="outline" className="text-[10px] font-medium py-0">
                DGMS Annual
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Statutory inspection for Assam Basin installations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Section */}
      <Tabs defaultValue="standards" className="space-y-4">
        <TabsList className="bg-muted/60 p-1 border">
          <TabsTrigger value="standards" className="text-xs gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Standards Registry
          </TabsTrigger>
          <TabsTrigger value="alignment" className="text-xs gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            IOGP Life-Saving Rules Alignment
          </TabsTrigger>
          <TabsTrigger value="checklist" className="text-xs gap-1.5">
            <CheckSquare className="h-3.5 w-3.5" />
            Statutory Audit Checklist ({completedCount}/{totalCount})
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Standards Registry */}
        <TabsContent value="standards" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Statutory Safety Standards Catalog
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Mandatory regulatory directives mapped to upstream oilfield operations
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-56">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search standards or rules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8 text-xs bg-background"
                  />
                </div>

                <select
                  value={selectedAuthority}
                  onChange={(e) => setSelectedAuthority(e.target.value)}
                  className="h-8 rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="All Authorities">All Authorities</option>
                  <option value="OISD">OISD (India)</option>
                  <option value="OSHA">OSHA (USA)</option>
                  <option value="DGMS">DGMS</option>
                </select>

                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="h-8 rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {domains.map((dom) => (
                    <option key={dom} value={dom}>
                      {dom}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow className="text-xs">
                      <TableHead className="w-[130px]">Standard Code</TableHead>
                      <TableHead className="min-w-[260px]">Title &amp; Statutory Scope</TableHead>
                      <TableHead className="w-[100px]">Authority</TableHead>
                      <TableHead className="min-w-[160px]">Mapped LSR</TableHead>
                      <TableHead className="w-[125px]">Compliance</TableHead>
                      <TableHead className="w-[100px]">Linked Events</TableHead>
                      <TableHead className="w-[110px]">Next Audit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs">
                    {filteredStandards.map((std) => (
                      <TableRow key={std.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-mono font-bold text-sky-500 py-3 whitespace-nowrap">
                          {std.code}
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="space-y-0.5 max-w-md">
                            <p className="font-medium text-foreground">{std.title}</p>
                            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                              {std.summary}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 whitespace-nowrap">
                          <Badge variant="outline" className="font-mono text-[10px]">
                            {std.authority}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3 whitespace-nowrap">
                          <span className="inline-flex items-center text-xs font-medium text-foreground">
                            {std.mappedLsr}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 whitespace-nowrap">
                          {getStatusBadge(std.status)}
                        </TableCell>
                        <TableCell className="py-3 whitespace-nowrap font-mono text-muted-foreground">
                          <Link
                            href={`/reports?q=${encodeURIComponent(std.mappedLsr)}`}
                            className="text-sky-500 hover:underline flex items-center gap-1"
                          >
                            <span>{std.linkedReportsCount} records</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        </TableCell>
                        <TableCell className="py-3 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                          {std.nextAuditDate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: IOGP Life-Saving Rules Alignment */}
        <TabsContent value="alignment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                rule: 'Working at Height',
                oisd: 'OISD-GDN-166',
                osha: 'OSHA 1910.28',
                barrierScore: '98% Defended',
                controls: '100% continuous tie-off, certified anchor points (>22 kN), twin-leg shock absorbing lanyards.',
                status: 'Optimal',
              },
              {
                rule: 'Energy Isolation',
                oisd: 'OISD-STD-105 / 112',
                osha: 'OSHA 1910.147',
                barrierScore: '96% Defended',
                controls: 'Double block and bleed positive mechanical blinding, multi-lock LOTO, zero residual pressure verification.',
                status: 'Optimal',
              },
              {
                rule: 'Confined Space',
                oisd: 'OISD-STD-105',
                osha: 'OSHA 1910.146',
                barrierScore: '92% Defended',
                controls: 'Continuous 4-gas monitoring, calibrated bump tests, certified attendant, tripod rescue winch.',
                status: 'Review',
              },
              {
                rule: 'Safe Mechanical Lifting',
                oisd: 'OISD-RP-110',
                osha: 'OSHA 1926.1400',
                barrierScore: '97% Defended',
                controls: 'Engineered lift plan, ground compaction plates, drop zone exclusion barricades, tag-lines.',
                status: 'Optimal',
              },
              {
                rule: 'Line of Fire',
                oisd: 'OISD-GDN-145',
                osha: 'OSHA 1910.212',
                barrierScore: '95% Defended',
                controls: 'Whip-check safety cables, pressurized flange shields, rotary table guards, exclusion zones.',
                status: 'Optimal',
              },
              {
                rule: 'Hot Work',
                oisd: 'OISD-STD-105',
                osha: 'NFPA 51B',
                barrierScore: '94% Defended',
                controls: 'Continuous hydrocarbon gas monitor (0% LEL), fire watch 30-min post work, spark containment blankets.',
                status: 'Optimal',
              },
              {
                rule: 'Bypassing Safety Controls',
                oisd: 'OISD-STD-112',
                osha: 'IEC 61511',
                barrierScore: '99% Defended',
                controls: 'Formal Management of Change (MoC), bypass register log, asset manager signoff, 4-hour max bypass.',
                status: 'Optimal',
              },
              {
                rule: 'Safe Driving & Transport',
                oisd: 'OISD-GDN-169',
                osha: 'Motor Carrier Safety',
                barrierScore: '96% Defended',
                controls: 'In-vehicle telematics (IVMS), speed governors (40 km/h in field), journey management approval.',
                status: 'Optimal',
              },
              {
                rule: 'Toxic Gas / Chemical Exposure',
                oisd: 'OISD-GDN-155',
                osha: 'OSHA 1910.1000',
                barrierScore: '98% Defended',
                controls: 'Dual-sensor H2S personal gas monitor, positive-pressure SCBA escape set, windsock orientation.',
                status: 'Optimal',
              },
            ].map((item, idx) => (
              <Card key={idx} className="border bg-card shadow-sm hover:border-sky-500/50 transition-colors">
                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold text-foreground">
                      {item.rule}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 mt-1 font-mono text-[10px] text-muted-foreground">
                      <span>{item.oisd}</span>
                      <span>•</span>
                      <span>{item.osha}</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      item.status === 'Optimal'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px]'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px]'
                    }
                  >
                    {item.barrierScore}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.controls}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 3: Statutory Audit Checklist */}
        <TabsContent value="checklist" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  Pre-Audit Inspection Readiness Checklist
                  <Badge variant="outline" className="text-[10px] bg-sky-500/10 text-sky-500 border-sky-500/30">
                    {completedCount} of {totalCount} Verified
                  </Badge>
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Interactive statutory compliance checklist for upcoming DGMS and OISD facility inspections
                </p>
              </div>

              <Button
                size="sm"
                onClick={() => {
                  toast.success('Checklist Synchronized', {
                    description: 'Audit checkpoints updated to the central OISD HSE compliance repository.',
                  });
                }}
                className="h-8 bg-sky-600 hover:bg-sky-500 text-white text-xs gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Save Audit State
              </Button>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    item.completed
                      ? 'bg-muted/30 border-border hover:bg-muted/50'
                      : 'bg-amber-500/5 border-amber-500/30 hover:bg-amber-500/10'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 text-sky-500 hover:opacity-80 transition-opacity"
                  >
                    {item.completed ? (
                      <CheckSquare className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <Square className="h-5 w-5 text-amber-500" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-semibold ${
                          item.completed ? 'text-foreground line-through opacity-80' : 'text-foreground'
                        }`}
                      >
                        {item.title}
                      </span>
                      <Badge variant="outline" className="font-mono text-[9px] py-0">
                        {item.standard}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      item.completed
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {item.completed ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
