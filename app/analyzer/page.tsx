'use client';

import React, { useState, useRef } from 'react';
import {
  Sparkles,
  FileSpreadsheet,
  Loader2,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldAlert,
  Target,
  ArrowUpRight,
  Lock,
  Box,
  Layers,
  Search,
  Wind,
  FileText,
  Info,
  Clock,
  Zap,
  Activity,
  Tag,
  AlertOctagon,
  Shield,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface AnalysisResultData {
  sifPotential: 'High' | 'Medium' | 'Low';
  confidence: number;
  timestamp: string;
  primaryPrecursor: string;
  secondaryPrecursors: string[];
  hazardCategory: string;
  potentialConsequence: string;
  iogpRules: string[];
  controlFailure: string;
  exposureType: string;
  explanationParagraphs: string[];
  evidence: string;
}

// 4 Verified Industry Example Reports
const EXAMPLE_REPORTS = [
  {
    id: 'ex-1',
    title: 'Work at Height Incident',
    category: 'Work at Height',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    shortPreview:
      'Derrickman unhooked safety lanyard at 22m elevation to cross over to monkey board without secondary tie-off...',
    narrative:
      'During pipe-racking operations on Derrick Rig #4 at Digboi, a derrickman unhooked his twin-leg safety lanyard at an elevation of 22 meters to cross over to the monkey board. He failed to latch the second carabiner hook to the static horizontal lifeline, leaving him unclipped for approximately 45 seconds directly over the open drill floor with no secondary fall protection in place.',
    primaryPrecursor: 'Work at Height',
    secondaryPrecursors: ['Inadequate Anchor Point', 'Derrick Floor Transit Hazard'],
    hazardCategory: 'Occupational Fall Hazard',
    potentialConsequence:
      'Uncontrolled free-fall from 22m elevation causing fatal impact trauma or severe irreversible spinal cord severance upon striking the lower drill floor structure.',
    iogpRules: ['Working at Height', 'Bypassing Safety Controls'],
    controlFailure:
      'Intentional detachment of both lanyard carabiners simultaneously without latching to secondary static lifeline, violating 100% tie-off mandate.',
    exposureType: 'Gravitational Free-Fall',
    explanationParagraphs: [
      'The incident narrative describes an active work activity at 22 meters elevation where the primary fall protection mechanism was completely removed. Free-fall from heights exceeding 1.8 meters in industrial upstream drilling operations carries severe kinetic energy capable of fatal deceleration trauma.',
      'Under the Oil Industry Safety Directorate (OISD) GDN-166 and IOGP Life-Saving Rule #2, workers at height must maintain 100% continuous tie-off. The transition across monkey board beams without an anchored inertia reel or double-lanyard protocol represents a critical safety barrier breakdown with zero redundancy.',
      'Consequently, the absence of defensive engineering barriers combined with high gravitational potential classifies this event as a high-severity SIF precursor requiring immediate suspension of elevated permit work and mandatory retraining.',
    ],
    evidence:
      'unhooked his twin-leg safety lanyard at an elevation of 22 meters to cross over to the monkey board',
  },
  {
    id: 'ex-2',
    title: 'Energy Isolation Failure',
    category: 'Energy Isolation',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    shortPreview:
      'Crude booster pump seal overhaul initiated without verifying zero energy state or installing mechanical slip blinds...',
    narrative:
      'Maintenance technicians at Moran GGS-1 commenced mechanical seal replacement on crude booster pump P-102B without positive isolation. Although an electrical breaker lockout padlock was applied, the suction and discharge block valves were not blinded, leaving trapped residual hydrostatic pressure of 280 PSI inside the pump casing.',
    primaryPrecursor: 'Energy Isolation',
    secondaryPrecursors: ['Trapped Hydrostatic Pressure', 'Line of Fire Exposure'],
    hazardCategory: 'Process Safety Tier 2',
    potentialConsequence:
      'Sudden release of 280 PSI pressurized crude oil causing projectile failure of casing flange, severe chemical burns, or ignition of volatile hydrocarbon vapors.',
    iogpRules: ['Energy Isolation', 'Line of Fire'],
    controlFailure:
      'Omission of positive mechanical blinds (spectacle blind) on suction/discharge lines prior to seal unbolting; reliance on single gate valve isolation.',
    exposureType: 'High-Pressure Fluid Release',
    explanationParagraphs: [
      'The reported activity involves mechanical seal maintenance on a primary crude oil transfer pump operating under pressure. While electrical lockout (LOTO) was initiated, fluid containment isolation was only partially addressed, leaving trapped pressurized hydrocarbons within the pump volute.',
      'IOGP Rule #1 (Energy Isolation) and OISD-STD-105 mandate positive physical isolation (blind flange or double block and bleed) before unbolting any hydrocarbon-containing envelope. Relying solely on block valves without verified depressurization creates high risk of seal blowout.',
      'The presence of 280 PSI residual pressure constitutes an immediate Line of Fire hazard. Personnel working directly on the casing face were in direct trajectory of potential seal ejection, confirming High SIF Potential.',
    ],
    evidence:
      'suction and discharge block valves were not blinded, leaving trapped residual hydrostatic pressure of 280 PSI inside the pump casing',
  },
  {
    id: 'ex-3',
    title: 'Confined Space Entry',
    category: 'Confined Space',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    shortPreview:
      'Storage tank sludge cleaning commenced without continuous atmospheric monitoring; oxygen levels dropped below 19%...',
    narrative:
      'Contractor crew entered the lower compartment of crude storage Tank #14 at Duliajan Central Tank Farm for sludge de-silting. Initial atmospheric testing was performed 2 hours prior, but continuous multi-gas monitoring was not maintained. Oxygen levels in the lower chamber plummeted to 18.8% due to localized hydrocarbon vapor displacement from agitated bottom sediment.',
    primaryPrecursor: 'Confined Space',
    secondaryPrecursors: ['Atmospheric Oxygen Deficiency', 'Vapor Cloud Re-evolution'],
    hazardCategory: 'Toxic & Asphyxiation Hazard',
    potentialConsequence:
      'Rapid hypoxic loss of consciousness (<19% O2) followed by irreversible chemical asphyxiation and fatal respiratory arrest inside enclosed tank.',
    iogpRules: ['Confined Space', 'Toxic Gas / Chemical Exposure'],
    controlFailure:
      'Absence of continuous multi-gas atmospheric testing and forced mechanical ventilation during bottom sludge disturbance.',
    exposureType: 'Chemical Asphyxiant',
    explanationParagraphs: [
      'The field event outlines unauthorized work within an enclosed hydrocarbon storage vessel where initial pre-entry atmospheric clearance was treated as a static validation. Agitation of heavy bottom sediment notoriously releases trapped hydrocarbon gases that rapidly displace breathable air.',
      'Under IOGP Rule #3 and OSHA 1910.146, continuous atmospheric testing and standby rescue winch systems are non-negotiable prerequisites for permit-required confined spaces. An oxygen drop to 18.8% signals active displacement, causing cognitive impairment within minutes.',
      'Because internal tank egress requires climbing vertical ladders and negotiating baffle plates, personnel incapacitated by hypoxic conditions would face fatal outcomes before retrieval could be mounted.',
    ],
    evidence:
      'continuous multi-gas monitoring was not maintained. Oxygen levels in the lower chamber plummeted to 18.8% due to localized hydrocarbon vapor displacement',
  },
  {
    id: 'ex-4',
    title: 'Near Miss - Lifting Operation',
    category: 'Safe Mechanical Lifting',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    shortPreview:
      'Crane outrigger sank during 5.2-ton manifold lift over live piping, inducing an uncontrolled 15-degree load pendulum swing...',
    narrative:
      'A 45-ton mobile hydraulic crane was hoisting a 5.2-ton manifold skid over live high-pressure gas piping at Moran Compressor Station A. During boom slewing, the crane right rear outrigger timber pad sank 12 cm into saturated uncompacted soil, causing an abrupt 15-degree load swing directly above the live pressurized gas header. Ground riggers had to scramble clear to avoid impact.',
    primaryPrecursor: 'Safe Mechanical Lifting',
    secondaryPrecursors: ['Sub-Surface Soil Subsidence', 'Live Gas Header Impact Risk'],
    hazardCategory: 'Major Accident Hazard (MAH)',
    potentialConsequence:
      'Catastrophic puncture of pressurized live gas header resulting in massive vapor cloud explosion (UVCE), facility shutdown, and multiple fatalities.',
    iogpRules: ['Safe Mechanical Lifting', 'Line of Fire', 'Bypassing Safety Controls'],
    controlFailure:
      'Failure to perform ground load-bearing plate verification or install engineered steel outrigger spreader mats before critical lift over live plant lines.',
    exposureType: 'Kinetic Impact & Loss of Primary Containment',
    explanationParagraphs: [
      'The report documents a mobile crane lifting a 5.2-ton manifold skid in close proximity to energized, live high-pressure natural gas headers. Outrigger ground subsidence during slewing compromised crane stability, initiating an uncontrolled load pendulum swing.',
      'Lifting operations directly traversing or adjacent to hydrocarbon process lines represent Major Accident Hazards (MAH). IOGP Rule #8 requires pre-lift ground inspection, outrigger load calculation, and barricaded drop-zone perimeters to protect live assets.',
      'The 15-degree load swing directly threatened the structural integrity of the pressurized header. Had the 5.2-ton skid impacted the pipe rack, catastrophic loss of primary containment and flammable explosion would have ensued with high fatality likelihood.',
    ],
    evidence:
      'outrigger timber pad sank 12 cm into saturated uncompacted soil, causing an abrupt 15-degree load swing directly above the live pressurized gas header',
  },
];

const MAX_CHAR_LIMIT = 5000;

export default function AnalyzerPage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Form State
  const [narrative, setNarrative] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedExampleId, setSelectedExampleId] = useState<string | null>(null);

  // Analysis Result State
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);

  // Handle Loading Example
  const handleSelectExample = (example: (typeof EXAMPLE_REPORTS)[0]) => {
    setNarrative(example.narrative);
    setSelectedExampleId(example.id);
    setAnalysisResult(null);

    toast.info(`Loaded example: "${example.title}"`);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Handle Clear
  const handleClear = () => {
    setNarrative('');
    setSelectedExampleId(null);
    setAnalysisResult(null);
  };

  // Perform AI Analysis
  const handleAnalyze = () => {
    if (!narrative.trim() || narrative.trim().length < 15) {
      toast.error('Validation Error', {
        description: 'Please enter a detailed safety report narrative (minimum 15 characters).',
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI neural NLP inference
    setTimeout(() => {
      const now = new Date();
      const timestampStr = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ' at ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const lower = narrative.toLowerCase();

      // Check if narrative matches one of the examples
      const matchingEx = EXAMPLE_REPORTS.find(
        (ex) =>
          ex.id === selectedExampleId ||
          narrative.trim().includes(ex.narrative.slice(0, 40))
      );

      if (matchingEx) {
        setAnalysisResult({
          sifPotential: 'High',
          confidence: matchingEx.id === 'ex-1' ? 96 : matchingEx.id === 'ex-2' ? 94 : matchingEx.id === 'ex-3' ? 92 : 95,
          timestamp: timestampStr,
          primaryPrecursor: matchingEx.primaryPrecursor,
          secondaryPrecursors: matchingEx.secondaryPrecursors,
          hazardCategory: matchingEx.hazardCategory,
          potentialConsequence: matchingEx.potentialConsequence,
          iogpRules: matchingEx.iogpRules,
          controlFailure: matchingEx.controlFailure,
          exposureType: matchingEx.exposureType,
          explanationParagraphs: matchingEx.explanationParagraphs,
          evidence: matchingEx.evidence,
        });
      } else {
        // Dynamic NLP heuristics for custom user-pasted text
        let sif: 'High' | 'Medium' | 'Low' = 'Medium';
        let precursor = 'General Operational Hazard';
        let secondary = ['Procedural Non-Compliance', 'Control Barrier Verification'];
        let category = 'Operational Integrity';
        let lsrList = ['Bypassing Safety Controls'];
        let confidence = 87;
        let consequence =
          'Potential for escalation into localized high-pressure release or physical trauma if defensive safety barriers fail.';
        let controlFailure =
          'Failure to verify primary engineered safety controls prior to executing high-risk task.';
        let exposureType = 'Direct Mechanical Impact';
        let evidence = narrative.slice(0, 110);
        let paragraphs = [
          'The incident narrative describes an active work activity presenting operational risk where standard procedural controls were compromised.',
          'Under OISD process safety guidelines and IOGP Life-Saving Rules, barrier degradation during live operations introduces severe escalation potential that requires formal engineering review.',
          'Corrective action should prioritize re-verifying physical barriers and enforcing permit-to-work pre-job task verification.',
        ];

        if (
          lower.includes('height') ||
          lower.includes('fall') ||
          lower.includes('harness') ||
          lower.includes('scaffold') ||
          lower.includes('ladder')
        ) {
          sif = 'High';
          precursor = 'Work at Height';
          secondary = ['Inadequate Anchor Point', 'Fall Arrest Inspection'];
          category = 'Occupational Fall Hazard';
          lsrList = ['Working at Height', 'Bypassing Safety Controls'];
          confidence = 95;
          consequence =
            'Free-fall from elevated position resulting in fatal deceleration trauma, severe intracranial injury, or multiple compound fractures.';
          controlFailure =
            'Failure to maintain 100% continuous tie-off with dual shock-absorbing lanyards while working above 1.8m.';
          exposureType = 'Gravitational Free-Fall';
          evidence =
            lower.includes('unhook') || lower.includes('fall')
              ? narrative.slice(0, 100)
              : 'work at height without continuous 100% tie-off protection';
          paragraphs = [
            'The reported incident involves elevated work activity where critical personal fall arrest protection was compromised or omitted. Free-fall from heights in industrial oil & gas structures generates fatal kinetic forces upon impact with steel deck plates.',
            'Under IOGP Rule #2 and OISD-GDN-166, working at height requires certified anchorage, inspectable harnesses, and continuous 100% tie-off. Bypassing dual-action hooks leaves zero redundancy in the event of a slip or balance loss.',
            'Due to the high gravitational energy and complete absence of secondary capture nets, this event is classified with High SIF Potential.',
          ];
        } else if (
          lower.includes('isolate') ||
          lower.includes('pressure') ||
          lower.includes('psi') ||
          lower.includes('blind') ||
          lower.includes('loto')
        ) {
          sif = 'High';
          precursor = 'Energy Isolation';
          secondary = ['Trapped Hydraulic Head', 'Line of Fire Risk'];
          category = 'Process Safety Tier 2';
          lsrList = ['Energy Isolation', 'Line of Fire'];
          confidence = 94;
          consequence =
            'Sudden release of stored high-pressure fluid causing violent projectile strikes, severe chemical burns, or flammable vapor ignition.';
          controlFailure =
            'Failure to achieve verified zero-energy state; omitted positive mechanical blind isolation on pressurized process lines.';
          exposureType = 'High-Pressure Fluid Release';
          evidence =
            lower.includes('pressure') || lower.includes('isolation')
              ? narrative.slice(0, 100)
              : 'isolation omitted while line remained under residual pressure';
          paragraphs = [
            'The incident details an intervention on process equipment containing stored fluid or electrical energy. Breaching containment without verified zero energy represents one of the most frequent root causes of fatal process safety events.',
            'IOGP Rule #1 mandates physical separation through positive mechanical blinding or double-block-and-bleed configurations. Relying solely on valve position without vent/bleed verification leaves personnel exposed to unexpected pressure surges.',
            'Personnel in direct alignment with the unbolted flange or seal face were positioned in the Line of Fire, generating High SIF Potential.',
          ];
        } else if (
          lower.includes('confined') ||
          lower.includes('oxygen') ||
          lower.includes('tank') ||
          lower.includes('vessel') ||
          lower.includes('h2s')
        ) {
          sif = 'High';
          precursor = 'Confined Space';
          secondary = ['Atmospheric Displacement', 'Toxic Vapor Release'];
          category = 'Toxic & Asphyxiation Hazard';
          lsrList = ['Confined Space', 'Toxic Gas / Chemical Exposure'];
          confidence = 93;
          consequence =
            'Rapid hypoxic loss of consciousness (<19% O2) followed by irreversible chemical asphyxiation and fatal respiratory arrest inside enclosed vessel.';
          controlFailure =
            'Failure to maintain continuous multi-gas atmospheric testing and standby rescue extraction gear during internal vessel entry.';
          exposureType = 'Chemical Asphyxiant';
          evidence =
            lower.includes('oxygen') || lower.includes('confined')
              ? narrative.slice(0, 100)
              : 'confined space entry without continuous multi-gas monitoring';
          paragraphs = [
            'The narrative outlines personnel entry into an enclosed process vessel where breathable atmospheric integrity was compromised. Enclosed tanks in upstream oil facilities frequently accumulate heavier-than-air hydrocarbon vapors that displace oxygen.',
            'According to IOGP Rule #3 and OSHA 1910.146, continuous multi-gas monitoring and a dedicated standby watch are mandatory for confined space safety. Atmospheric testing conducted hours prior does not protect against volatile gas re-evolution.',
            'Because self-rescue from internal tank baffles is impossible once hypoxia sets in, this barrier lapse carries High SIF Potential.',
          ];
        } else if (
          lower.includes('crane') ||
          lower.includes('lift') ||
          lower.includes('sling') ||
          lower.includes('rigging') ||
          lower.includes('hoist')
        ) {
          sif = 'High';
          precursor = 'Safe Mechanical Lifting';
          secondary = ['Unstable Ground Bearing', 'Suspended Load Path'];
          category = 'Major Accident Hazard (MAH)';
          lsrList = ['Safe Mechanical Lifting', 'Line of Fire'];
          confidence = 95;
          consequence =
            'Dropped heavy load or crane overturn causing catastrophic impact with live pressurized gas lines or crushing ground personnel.';
          controlFailure =
            'Failure to establish soil load-bearing verification, outrigger steel spreader mats, and barricaded load exclusion zone.';
          exposureType = 'Kinetic Impact & Loss of Containment';
          evidence =
            lower.includes('crane') || lower.includes('lift')
              ? narrative.slice(0, 100)
              : 'crane stability compromised during heavy lift over live process lines';
          paragraphs = [
            'The event involves mechanical crane hoisting where ground stability or rigging integrity failed during suspended load movement. Heavy lifts traversing live hydrocarbon infrastructure present acute Major Accident Hazard exposure.',
            'IOGP Rule #8 requires engineered lift plans, certified rigging hardware, outrigger load calculations, and total personnel exclusion from the drop radius.',
            'The potential for dropped load impact against pressurized hydrocarbons creates extreme risk of explosive loss of containment, qualifying this event as High SIF Potential.',
          ];
        }

        setAnalysisResult({
          sifPotential: sif,
          confidence,
          timestamp: timestampStr,
          primaryPrecursor: precursor,
          secondaryPrecursors: secondary,
          hazardCategory: category,
          potentialConsequence: consequence,
          iogpRules: lsrList,
          controlFailure,
          exposureType,
          explanationParagraphs: paragraphs,
          evidence,
        });
      }

      setIsAnalyzing(false);
      toast.success('AI SIF Precursor Analysis complete!');

      // Scroll into view
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 1100);
  };

  // Helper for Precursor Icon
  const getPrecursorIcon = (precursor: string) => {
    switch (precursor) {
      case 'Work at Height':
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
      case 'Energy Isolation':
        return <Lock className="h-4 w-4 text-amber-500" />;
      case 'Confined Space':
        return <Box className="h-4 w-4 text-purple-500" />;
      case 'Safe Mechanical Lifting':
        return <Layers className="h-4 w-4 text-indigo-500" />;
      case 'Atmospheric Hazard':
        return <Wind className="h-4 w-4 text-sky-500" />;
      case 'Line of Fire':
        return <Target className="h-4 w-4 text-red-500" />;
      case 'Hot Work':
        return <Flame className="h-4 w-4 text-orange-500" />;
      default:
        return <ShieldAlert className="h-4 w-4 text-rose-500" />;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#e2e8f0] dark:border-border/50 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1e293b] dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#0ea5e9]" />
            Report Analyzer
          </h1>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Live AI demonstration: Paste any unstructured safety observation to detect SIF precursors, map life-saving rules, and evaluate fatal consequence pathways.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs font-mono border-sky-500/30 text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1"
          >
            NeuralPrecursor Engine v2.4
          </Badge>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TOP SECTION: Input Area                                  */}
      {/* ======================================================== */}
      <Card className="border border-[#e2e8f0] bg-white dark:bg-card dark:border-border shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden">
        <CardHeader className="p-4 sm:p-6 pb-3 border-b border-[#e2e8f0] dark:border-border/50 bg-slate-50/50 dark:bg-muted/20 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold text-[#1e293b] dark:text-slate-100 flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#0ea5e9]" />
            Safety Observation Narrative Input
          </CardTitle>

          {/* Optional File Upload button (Disabled with tooltip) */}
          <div className="relative group">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled
              title="Coming soon"
              className="h-8 text-xs gap-1.5 opacity-60 cursor-not-allowed bg-muted/40"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Batch Upload (CSV/Excel)</span>
              <span className="ml-1 text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground border font-mono">
                Coming soon
              </span>
            </Button>
            {/* Tooltip on hover */}
            <div className="pointer-events-none absolute -top-8 right-0 hidden group-hover:flex items-center rounded-md bg-popover px-2 py-1 text-[11px] font-medium text-popover-foreground shadow-md border animate-in fade-in-50">
              Coming soon
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Large Text Area (Min height: 200px) */}
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={narrative}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHAR_LIMIT) {
                  setNarrative(e.target.value);
                }
              }}
              disabled={isAnalyzing}
              placeholder="Paste safety report narrative here..."
              className="min-h-[200px] text-sm leading-relaxed p-4 bg-background/80 font-sans resize-y focus-visible:ring-sky-500"
            />
          </div>

          {/* Action Row & Character Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
            {/* Character counter showing "0/5000 characters" */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className={narrative.length > 4500 ? 'text-amber-500 font-bold' : ''}>
                {narrative.length}/{MAX_CHAR_LIMIT} characters
              </span>
              {narrative.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isAnalyzing}
                  className="text-[11px] text-sky-500 hover:text-sky-400 hover:underline flex items-center gap-1 ml-2 font-sans"
                >
                  <RotateCcw className="h-3 w-3" />
                  Clear Text
                </button>
              )}
            </div>

            {/* "Analyze Report" Button (Large, Primary, AI Icon, Loading state) */}
            <Button
              type="button"
              variant="default"
              size="lg"
              disabled={isAnalyzing || narrative.trim().length === 0}
              onClick={handleAnalyze}
              className="h-11 px-7 text-sm font-semibold shadow-md gap-2 self-end sm:self-auto min-w-[170px]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                  <span>Analyzing report...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                  <span>Analyze Report</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ======================================================== */}
      {/* LOADING SKELETON (Visible when analyzing)                */}
      {/* ======================================================== */}
      {isAnalyzing && (
        <Card className="border border-sky-500/30 bg-white dark:bg-card p-6 shadow-md rounded-xl space-y-5 animate-pulse">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-36 rounded-md" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-5 w-44" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-48 rounded-md" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-16 w-full rounded-md" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-16 w-full rounded-md" />
            </div>
          </div>
          <div className="pt-4 border-t space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-[85%]" />
          </div>
        </Card>
      )}

      {/* ======================================================== */}
      {/* RESULTS SECTION: Detailed AI Analysis Output             */}
      {/* ======================================================== */}
      {analysisResult && !isAnalyzing && (
        <div ref={resultsRef} className="space-y-4 animate-in fade-in-50 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              AI Analysis Results
            </h2>
            <span className="text-[11px] font-mono text-muted-foreground">
              NeuralPrecursor-Large-v2.4 Output
            </span>
          </div>

          <Card className="border border-sky-500/30 bg-card/95 shadow-md overflow-hidden rounded-xl">
            {/* 1. Top Row: SIF Potential badge, Confidence score with progress bar, Timestamp */}
            <div className="p-5 bg-muted/20 border-b border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Left: SIF Potential badge & Timestamp */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className={`text-sm font-black px-3 py-1 rounded-lg shadow-2xs inline-flex items-center gap-1.5 ${analysisResult.sifPotential === 'High'
                      ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/40'
                      : analysisResult.sifPotential === 'Medium'
                        ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/40'
                        : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                    }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${analysisResult.sifPotential === 'High'
                        ? 'bg-red-500 animate-pulse'
                        : analysisResult.sifPotential === 'Medium'
                          ? 'bg-orange-500'
                          : 'bg-emerald-500'
                      }`}
                  />
                  SIF Potential: {analysisResult.sifPotential}
                </Badge>

                {/* Analysis timestamp */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Analyzed: {analysisResult.timestamp}</span>
                </div>
              </div>

              {/* Right: Confidence score (percentage with progress bar) */}
              <div className="flex items-center gap-3 min-w-[210px]">
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Confidence Score:</span>
                    <strong className="font-mono text-foreground font-bold">
                      {analysisResult.confidence}%
                    </strong>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-muted/80 rounded-full h-2 overflow-hidden border border-border/40">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${analysisResult.confidence >= 85
                          ? 'bg-emerald-500'
                          : analysisResult.confidence >= 70
                            ? 'bg-sky-500'
                            : 'bg-amber-500'
                        }`}
                      style={{ width: `${analysisResult.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Middle Section - Grid Layout (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-6 bg-slate-50/40 dark:bg-[#070e1c]/40">
              {/* Left Column: Primary Precursor, Secondary Precursors, Hazard Category, Potential Consequence */}
              <div className="space-y-4">
                {/* Primary Precursor (Large tag with icon) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Primary Precursor
                  </span>
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-sky-500/30 bg-sky-500/10 text-sm font-bold text-sky-700 dark:text-sky-300 shadow-2xs">
                    {getPrecursorIcon(analysisResult.primaryPrecursor)}
                    <span>{analysisResult.primaryPrecursor}</span>
                  </div>
                </div>

                {/* Secondary Precursors (Multiple smaller tags) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Secondary Precursors
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.secondaryPrecursors.map((sec, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs font-medium px-2.5 py-0.5 bg-muted/60 text-foreground border-border/80"
                      >
                        {sec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Hazard Category (Tag) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Hazard Category
                  </span>
                  <div>
                    <Badge
                      variant="outline"
                      className="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1.5"
                    >
                      <Tag className="h-3 w-3" />
                      {analysisResult.hazardCategory}
                    </Badge>
                  </div>
                </div>

                {/* Potential Consequence (Text description) */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                    Potential Consequence
                  </span>
                  <div className="p-3.5 rounded-lg border bg-card/80 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans shadow-2xs">
                    {analysisResult.potentialConsequence}
                  </div>
                </div>
              </div>

              {/* Right Column: IOGP Life-Saving Rule, Control Failure, Exposure Type */}
              <div className="space-y-4">
                {/* IOGP Life-Saving Rule (1-3 rule badges) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-emerald-500" />
                    IOGP Life-Saving Rule
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.iogpRules.map((rule, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs font-semibold px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 flex items-center gap-1.5 shadow-2xs"
                      >
                        <Check className="h-3 w-3 text-emerald-500" />
                        <span>{rule}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Control Failure (Text description) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block flex items-center gap-1.5">
                    <AlertOctagon className="h-3.5 w-3.5 text-rose-500" />
                    Control Failure Description
                  </span>
                  <div className="p-3.5 rounded-lg border border-rose-500/20 bg-rose-500/5 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans shadow-2xs">
                    {analysisResult.controlFailure}
                  </div>
                </div>

                {/* Exposure Type (Tag) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-indigo-500" />
                    Exposure Type
                  </span>
                  <div>
                    <Badge
                      variant="outline"
                      className="text-xs font-semibold px-3 py-1 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/30"
                    >
                      {analysisResult.exposureType}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Bottom Section: AI Explanation & Evidence from Report */}
            <div className="p-5 sm:p-6 border-t border-border/50 space-y-5 bg-card">
              {/* AI Explanation Heading & 2-3 Paragraphs */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-500" />
                  AI Explanation &amp; Causal Rationale
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-foreground/90 font-sans">
                  {analysisResult.explanationParagraphs.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* "Evidence from Report" Section with Highlighted Text Snippet */}
              <div className="space-y-2 pt-2 border-t border-border/40">
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="h-3.5 w-3.5 text-amber-500" />
                  Evidence from Report
                </span>
                <div className="p-3.5 rounded-lg border border-amber-500/30 bg-amber-500/5 text-xs sm:text-sm leading-relaxed font-sans">
                  <span className="text-muted-foreground italic">" ... </span>
                  <mark className="bg-yellow-300 dark:bg-yellow-500/40 text-yellow-950 dark:text-yellow-100 font-semibold px-2 py-0.5 rounded shadow-2xs">
                    {analysisResult.evidence}
                  </mark>
                  <span className="text-muted-foreground italic"> ... "</span>
                </div>
              </div>
            </div>

            {/* 4. Disclaimer at bottom */}
            <div className="p-3.5 bg-muted/30 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="h-4 w-4 text-sky-500 shrink-0" />
              <span>
                <strong>Disclaimer:</strong> This is an AI-generated prediction. Always verify with HSE experts.
              </span>
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================== */}
      {/* "Try Example Reports" Section                            */}
      {/* ======================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              Try Example Reports
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click any verified operational scenario below to automatically populate the narrative input area
            </p>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-muted-foreground">
            4 Industry Scenarios
          </span>
        </div>

        {/* 4 Example Report Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {EXAMPLE_REPORTS.map((example) => {
            const isSelected = selectedExampleId === example.id;
            return (
              <Card
                key={example.id}
                onClick={() => handleSelectExample(example)}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md border group ${isSelected
                    ? 'border-sky-500 bg-sky-500/5 ring-1 ring-sky-500'
                    : 'bg-card/90 hover:bg-muted/40 hover:border-sky-500/40'
                  }`}
              >
                <CardContent className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-1">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold px-2 py-0.5 ${example.badgeColor}`}
                    >
                      {example.category}
                    </Badge>
                    <span className="text-[10px] font-mono text-muted-foreground group-hover:text-sky-500 transition-colors">
                      Click to load
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-foreground group-hover:text-sky-500 transition-colors line-clamp-1">
                    {example.title}
                  </h3>

                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                    {example.shortPreview}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
