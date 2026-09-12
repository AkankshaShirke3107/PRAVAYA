'use client';

import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  BookOpen,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  PhoneCall,
  Wind,
  Flame,
  Lock,
  Box,
  Layers,
  Target,
  ArrowUpRight,
  Truck,
  FileText,
  BadgeCheck,
  Shield,
  Clock,
  Compass,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface RuleItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  standard: string;
  badgeColor: string;
  youMust: string[];
  doNot: string[];
  criticalControls: string;
  ppe: string;
}

const LIFE_SAVING_RULES: RuleItem[] = [
  {
    id: 'lsr-1',
    name: 'Working at Height',
    category: 'Life-Saving Rule',
    iconName: 'height',
    standard: 'OISD-GDN-166 • OSHA 1910.28',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    youMust: [
      'Maintain 100% continuous tie-off using twin-leg energy absorbing safety lanyards above 1.8m.',
      'Anchor only to load-rated, certified engineered anchorage points capable of withstanding 22.2 kN (5,000 lbs).',
      'Inspect full-body harness, carabiners, and shock pack daily prior to donning.',
    ],
    doNot: [
      'Never unhook both carabiner legs simultaneously when transitioning across beams or monkey boards.',
      'Never work on temporary elevated scaffolding without a valid green scaffolding tag.',
    ],
    criticalControls: 'Inertia fall arresters, drop netting, scaffold toe-boards, tool tethering lanyards (DROPS compliance).',
    ppe: 'Full body industrial safety harness (EN 361), twin-leg lanyard with scaffold hooks, chin-strap safety helmet.',
  },
  {
    id: 'lsr-2',
    name: 'Energy Isolation (LOTO)',
    category: 'Life-Saving Rule',
    iconName: 'lock',
    standard: 'OISD-STD-105 • OSHA 1910.147',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    youMust: [
      'Isolate all energy sources (electrical, hydraulic, pneumatic, gravitational, mechanical).',
      'Perform positive zero-energy state verification through vent valves, bleed nipples, and test cranks.',
      'Apply personal red padlock, lockout hasp, and signed danger tag on isolation breakers and block valves.',
    ],
    doNot: [
      'Never rely solely on closed hand-operated gate or ball valves without physical spectacle blinding or DBB configuration.',
      'Never remove another technician’s personal padlock without written asset manager emergency override.',
    ],
    criticalControls: 'Double block and bleed (DBB), slip blind installation board, lockbox key control protocol.',
    ppe: 'Dielectric gloves (Class 0/1 for MCC), safety goggles, arc-rated fire-resistant coveralls (FRC).',
  },
  {
    id: 'lsr-3',
    name: 'Confined Space Entry',
    category: 'Life-Saving Rule',
    iconName: 'box',
    standard: 'OSHA 1910.146 • OISD-STD-105',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    youMust: [
      'Obtain authorized Confined Space Entry Permit and display signed certificate at entrance manway.',
      'Conduct continuous 4-gas atmospheric testing (O2: 19.5-23.5%, LEL: 0%, H2S: < 10 ppm, CO: < 25 ppm).',
      'Maintain an attentive, dedicated Standby Attendant equipped with emergency retrieval winch and air horn.',
    ],
    doNot: [
      'Never enter a confined vessel, tank, or sump without calibrated atmospheric clearance.',
      'Never attempt rescue entry without positive-pressure self-contained breathing apparatus (SCBA).',
    ],
    criticalControls: 'Forced air ventilation blowers (certified ATEX Zone 1), mechanical retrieval tripod, lifeline tether.',
    ppe: 'Full body rescue harness, personal 4-gas monitor attached to collar, chemical protective boots and gloves.',
  },
  {
    id: 'lsr-4',
    name: 'Safe Mechanical Lifting',
    category: 'Life-Saving Rule',
    iconName: 'crane',
    standard: 'OSHA 1926.1400 • OISD-RP-110',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    youMust: [
      'Verify certified crane operator and qualified banksman/rigger are designated before lifting.',
      'Inspect wire rope slings, web slings, shackles, and safety hook latches prior to each pick.',
      'Barricade the entire swing radius and drop perimeter with high-visibility red barrier tape.',
    ],
    doNot: [
      'Never stand, walk, or position any body part directly underneath a suspended load or rigging hardware.',
      'Never execute critical heavy lifts over pressurized hydrocarbon process lines without engineered lift plan.',
    ],
    criticalControls: 'Outrigger steel load-spreading mats, anti-two-block limiters, rated synthetic fiber tag-lines.',
    ppe: 'High-visibility safety vest (EN ISO 20471), steel-toed boots (200J), rigger impact-resistant gloves.',
  },
  {
    id: 'lsr-5',
    name: 'Line of Fire Protection',
    category: 'Life-Saving Rule',
    iconName: 'target',
    standard: 'OISD-GDN-145 • OSHA 1910.212',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    youMust: [
      'Fasten steel whip-check safety cables and hobble clamps across all pressurized temporary hoses (>100 PSI).',
      'Position yourself outside the trajectory of unbolted flanges, high-torque tong arms, and wire ropes.',
      'Ensure all rotating machine guards are bolted in place on mud pump bull gears and engine drives.',
    ],
    doNot: [
      'Never stand in direct alignment with pressure relief discharges, high-pressure test manifolds, or winch lines.',
      'Never attempt to manually steady swinging drill collars without engineered guide ropes or tag-lines.',
    ],
    criticalControls: 'Flange safety spray shields, high-pressure iron inspection logs, iron roughneck interlocking gates.',
    ppe: 'Impact protection gloves (ANSI Level 3), safety glasses with side shields, metatarsal safety boots.',
  },
  {
    id: 'lsr-6',
    name: 'Hot Work & Spark Control',
    category: 'Life-Saving Rule',
    iconName: 'flame',
    standard: 'OISD-STD-105 • NFPA 51B',
    badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
    youMust: [
      'Verify flammable vapor atmosphere is 0% LEL using calibrated explosimeter within 15m radius.',
      'Designate a dedicated Fire Watch armed with checked 10kg DCP extinguisher and fire blanket.',
      'Maintain continuous fire watch for at least 30 minutes following the completion of welding/cutting.',
    ],
    doNot: [
      'Never initiate hot work without an approved Class 1 Hot Work Permit signed by Asset Safety In-charge.',
      'Never discharge sparks within 15 meters of open drainage channels, sewers, or battery tanks.',
    ],
    criticalControls: 'Fire-resistant habitat enclosures with positive pressure fans, flammable gas interlock cutoffs.',
    ppe: 'Welding helmet (shade 10-12), leather welding apron/sleeves, flame-retardant split-cowhide gauntlets.',
  },
  {
    id: 'lsr-7',
    name: 'Bypassing Safety Controls',
    category: 'Life-Saving Rule',
    iconName: 'shield',
    standard: 'OISD-STD-112 • IEC 61511',
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
    youMust: [
      'Execute formal Management of Change (MoC) before overriding any emergency shutdown (ESD) valve.',
      'Record every safety interlock bypass in the central control room Override Log with expiration time.',
      'Implement verified compensatory measures (e.g. manual valve attendant, continuous monitoring).',
    ],
    doNot: [
      'Never silence, bridge, jumper, or force high-level alarms or H2S gas detector trips without authorization.',
      'Never leave a safety bypass energized beyond the approved shift duration without formal handover.',
    ],
    criticalControls: 'Trapped key interlock systems, password-protected safety PLC trip logic, automated bypass alarms.',
    ppe: 'Standard industrial PPE compliant with facility operating zone classification.',
  },
  {
    id: 'lsr-8',
    name: 'Toxic Gas & Chemical Safety',
    category: 'Life-Saving Rule',
    iconName: 'wind',
    standard: 'OISD-GDN-155 • OSHA 1910.1000',
    badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
    youMust: [
      'Wear calibrated personal dual H2S/LEL gas detector clipped within the breathing zone at all times.',
      'Check windsock orientation immediately upon entering oilfield battery sites or wellhead locations.',
      'Carry or maintain immediate access to an Emergency Life Support Apparatus (ELSA) 15-minute escape hood.',
    ],
    doNot: [
      'Never ignore an audible gas sensor alarm or enter low-lying depressions in sour gas processing areas.',
      'Never attempt heroic rescue of an unconscious person without self-contained breathing apparatus (SCBA).',
    ],
    criticalControls: 'Fixed optical H2S perimeter sensors, automated wellhead shut-in valves, emergency cascade air banks.',
    ppe: 'Positive pressure SCBA (300 bar), chemical-resistant butyl rubber gloves, splash-proof chemical goggles.',
  },
  {
    id: 'lsr-9',
    name: 'Safe Driving & Transport',
    category: 'Life-Saving Rule',
    iconName: 'truck',
    standard: 'OISD-GDN-169',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    youMust: [
      'Fasten 3-point seatbelt prior to engine ignition; ensure all vehicle passengers are securely belted.',
      'Adhere strictly to 40 km/h lease road speed limits and 20 km/h plant inner-perimeter speed restrictions.',
      'Complete pre-journey vehicle circle check (tires, steering, brakes, reverse horn, first-aid kit).',
    ],
    doNot: [
      'Never use hand-held mobile phones or text while operating any company or contractor vehicle.',
      'Never operate motor vehicles when impaired by medication, fatigue, alcohol, or medical restriction.',
    ],
    criticalControls: 'In-Vehicle Telematics (IVMS), electronic speed limiters, journey management approval system.',
    ppe: 'Standard high-visibility reflective vest, seatbelt, steel-toed driving shoes.',
  },
];

const PTW_TYPES = [
  {
    code: 'PTW-01',
    name: 'Hot Work Permit (Class 1)',
    color: 'border-orange-500/30 bg-orange-500/5',
    textColor: 'text-orange-500',
    validity: 'Single shift (8 hours max)',
    gasTest: 'Continuous monitoring (0% LEL, <10 ppm H2S)',
    approver: 'Asset Manager & Station Safety Officer',
    scope: 'Welding, gas cutting, grinding, torch brazing in Zone 1/2 process envelopes.',
  },
  {
    code: 'PTW-02',
    name: 'Cold Work Permit',
    color: 'border-sky-500/30 bg-sky-500/5',
    textColor: 'text-sky-500',
    validity: '12 hours max (extendable once)',
    gasTest: 'Initial test at shift start + after break',
    approver: 'Shift In-charge / Area Authority',
    scope: 'Mechanical bolt torquing, non-sparking pipe repairs, scaffolding, painting.',
  },
  {
    code: 'PTW-03',
    name: 'Confined Space Entry Certificate',
    color: 'border-purple-500/30 bg-purple-500/5',
    textColor: 'text-purple-500',
    validity: '8 hours (strictly synchronized with attendant)',
    gasTest: 'Continuous 4-gas monitoring at 3 depths',
    approver: 'HSE In-charge & Production Superintendent',
    scope: 'Tanks, separator vessels, sumps, flare knockout drums, pits > 1.2m deep.',
  },
  {
    code: 'PTW-04',
    name: 'Electrical Isolation & LOTO Certificate',
    color: 'border-amber-500/30 bg-amber-500/5',
    textColor: 'text-amber-500',
    validity: 'Job duration (reviewed daily)',
    gasTest: 'N/A (Breaker cabinet testing)',
    approver: 'Authorized Electrical Engineer & Task Supervisor',
    scope: 'MCC 415V/6.6kV breaker rack-out, transformer maintenance, motor overhaul.',
  },
  {
    code: 'PTW-05',
    name: 'Work at Height Permit',
    color: 'border-blue-500/30 bg-blue-500/5',
    textColor: 'text-blue-500',
    validity: 'Single shift daylight hours only',
    gasTest: 'Required if near flare/vent headers',
    approver: 'Safety Officer & Rig In-charge',
    scope: 'Mast maintenance, flare tip inspection, derrick monkey board operations > 1.8m.',
  },
];

const EMERGENCY_CONTACTS = [
  { field: 'Duliajan Central', role: 'Emergency Control Room', phone: '+91-374-280-4444', channel: 'VHF Ch 16' },
  { field: 'Naharkatia GGS', role: 'Asset Fire & Safety', phone: '+91-374-280-5511', channel: 'VHF Ch 12' },
  { field: 'Moran Platform', role: 'HSE Shift Coordinator', phone: '+91-374-280-6622', channel: 'VHF Ch 14' },
  { field: 'Jorajan Field', role: 'Wellhead Response Lead', phone: '+91-374-280-7733', channel: 'VHF Ch 10' },
  { field: 'Digboi Drilling', role: 'Drilling Superintendent', phone: '+91-374-280-8844', channel: 'VHF Ch 08' },
  { field: 'Sadiya Asset', role: 'Emergency Dispatcher', phone: '+91-374-280-9955', channel: 'VHF Ch 11' },
];

export default function GuidelinesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Rules');

  // Filtered Rules
  const filteredRules = useMemo(() => {
    return LIFE_SAVING_RULES.filter((rule) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          rule.name.toLowerCase().includes(q) ||
          rule.standard.toLowerCase().includes(q) ||
          rule.criticalControls.toLowerCase().includes(q) ||
          rule.youMust.some((m) => m.toLowerCase().includes(q)) ||
          rule.doNot.some((d) => d.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [searchQuery]);

  const handleDownloadPdf = () => {
    toast.success('Safety Guidelines Handbook Exported', {
      description: 'Downloaded Oil India Limited HSE Safety Pocket Guide (PDF).',
    });
  };

  const getRuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'height':
        return <ArrowUpRight className="h-5 w-5 text-blue-500" />;
      case 'lock':
        return <Lock className="h-5 w-5 text-amber-500" />;
      case 'box':
        return <Box className="h-5 w-5 text-purple-500" />;
      case 'crane':
        return <Layers className="h-5 w-5 text-indigo-500" />;
      case 'target':
        return <Target className="h-5 w-5 text-rose-500" />;
      case 'flame':
        return <Flame className="h-5 w-5 text-orange-500" />;
      case 'shield':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'wind':
        return <Wind className="h-5 w-5 text-teal-500" />;
      case 'truck':
        return <Truck className="h-5 w-5 text-emerald-500" />;
      default:
        return <ShieldAlert className="h-5 w-5 text-sky-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500 shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Operational Safety Standards &amp; Guidelines
              </h1>
              <Badge variant="outline" className="bg-sky-500/10 text-sky-500 border-sky-500/30 text-[10px] font-mono">
                IOGP 459 / OISD
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Comprehensive handbook of mandatory safety rules, Permit to Work protocols, and emergency response matrices
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={handleDownloadPdf}
            variant="outline"
            className="text-xs h-9 gap-1.5 shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF Handbook
          </Button>
        </div>
      </div>

      {/* Main Tabs Layout */}
      <Tabs defaultValue="lsr" className="space-y-4">
        <TabsList className="bg-muted/60 p-1 border">
          <TabsTrigger value="lsr" className="text-xs gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            IOGP 9 Life-Saving Rules ({filteredRules.length})
          </TabsTrigger>
          <TabsTrigger value="ptw" className="text-xs gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Permit to Work (PTW) Matrix
          </TabsTrigger>
          <TabsTrigger value="emergency" className="text-xs gap-1.5">
            <PhoneCall className="h-3.5 w-3.5" />
            Emergency Response &amp; Hotlines
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: IOGP LIFE-SAVING RULES */}
        <TabsContent value="lsr" className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search safety rules by hazard, control, or PPE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs bg-background"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              Showing {filteredRules.length} of {LIFE_SAVING_RULES.length} standards
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRules.map((rule) => (
              <Card key={rule.id} className="border bg-card shadow-sm hover:border-sky-500/40 transition-all flex flex-col">
                <CardHeader className="p-4 pb-2 border-b bg-muted/20">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-lg bg-background border shadow-xs shrink-0">
                        {getRuleIcon(rule.iconName)}
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold text-foreground">
                          {rule.name}
                        </CardTitle>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {rule.standard}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-3.5 text-xs flex-1 flex flex-col justify-between">
                  {/* You MUST */}
                  <div className="space-y-1.5">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      You Must
                    </span>
                    <ul className="space-y-1 text-foreground/90 pl-1">
                      {rule.youMust.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-relaxed text-[11px]">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Do NOT */}
                  <div className="space-y-1.5 pt-2 border-t">
                    <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                      <XCircle className="h-3.5 w-3.5" />
                      Do Not
                    </span>
                    <ul className="space-y-1 text-foreground/90 pl-1">
                      {rule.doNot.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-relaxed text-[11px]">
                          <span className="text-rose-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Critical Controls & PPE */}
                  <div className="pt-2 border-t space-y-1.5 bg-muted/20 -mx-4 -mb-4 p-3 rounded-b-lg">
                    <div>
                      <span className="font-semibold text-foreground text-[10px] uppercase tracking-wide">
                        Engineering Barriers:
                      </span>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        {rule.criticalControls}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-[10px] uppercase tracking-wide">
                        Mandatory PPE:
                      </span>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        {rule.ppe}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 2: PERMIT TO WORK MATRIX */}
        <TabsContent value="ptw" className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold text-foreground">
                Permit to Work (PTW) Statutory Authorization Matrix
              </CardTitle>
              <CardDescription className="text-xs">
                Classification, validity timeframes, atmospheric testing requirements, and signoff hierarchy under OISD-STD-105
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PTW_TYPES.map((ptw) => (
                  <div
                    key={ptw.code}
                    className={`p-4 rounded-xl border ${ptw.color} flex flex-col justify-between space-y-3`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs font-bold ${ptw.textColor}`}>
                          {ptw.code}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          OISD Certified
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mt-1">
                        {ptw.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {ptw.scope}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-border/50 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Duration:</span>
                        <span className="font-medium text-foreground">{ptw.validity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gas Testing:</span>
                        <span className="font-medium text-foreground text-right">{ptw.gasTest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Signing Authority:</span>
                        <span className="font-medium text-foreground text-right">{ptw.approver}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: EMERGENCY RESPONSE */}
        <TabsContent value="emergency" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Siren Protocols */}
            <Card className="border shadow-sm lg:col-span-2">
              <CardHeader className="p-4 border-b">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Wind className="h-4 w-4 text-sky-500" />
                  Statutory Emergency Siren Codes &amp; Action Plan
                </CardTitle>
                <CardDescription className="text-xs">
                  Immediate evacuation and response protocols in event of toxic gas blowout or facility emergency
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border bg-rose-500/5 border-rose-500/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        Major Gas Leak / Blowout Alert (Intermittent Warble Siren)
                      </span>
                      <Badge className="bg-rose-500 text-white text-[9px]">Emergency Level 3</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Shut down all rotating machinery, activate Emergency Shutdown (ESD) push-button, extinguish open fires, observe windsock, and evacuate immediately upwind/crosswind to designated Primary Muster Point.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border bg-amber-500/5 border-amber-500/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        Fire / Explosion Alarm (Continuous 2-Minute Tone)
                      </span>
                      <Badge className="bg-amber-500 text-white text-[9px]">Emergency Level 2</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Clear work area immediately, do not attempt to retrieve personal items, report to designated Asset Fire Squad, and maintain radio silence on VHF Channel 16.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border bg-emerald-500/5 border-emerald-500/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        All-Clear Siren (Straight Continuous 1-Minute Pitch)
                      </span>
                      <Badge className="bg-emerald-500 text-white text-[9px]">Normalcy Restored</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Statutory gas clearance confirmed by certified safety officer; resume operations only after head count reconciliation and formal PTW re-authorization.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Hotlines */}
            <Card className="border shadow-sm">
              <CardHeader className="p-4 border-b">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-emerald-500" />
                  Asset Emergency Hotlines
                </CardTitle>
                <CardDescription className="text-xs">
                  24/7 dedicated dispatch lines across core oilfield assets
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-2.5">
                {EMERGENCY_CONTACTS.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border bg-card/60 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-foreground">{c.field}</p>
                      <p className="text-[10px] text-muted-foreground">{c.role}</p>
                    </div>
                    <div className="text-right">
                      <a
                        href={`tel:${c.phone}`}
                        className="font-mono text-xs font-semibold text-sky-500 hover:underline block"
                      >
                        {c.phone}
                      </a>
                      <span className="text-[9px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {c.channel}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
