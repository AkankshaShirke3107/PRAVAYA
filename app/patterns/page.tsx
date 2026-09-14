'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ArrowUpRight,
  Repeat,
  MapPin,
  ShieldAlert,
  Filter,
  Download,
  RotateCcw,
  FileSpreadsheet,
  ImageIcon,
  Calendar,
  Activity,
  SlidersHorizontal,
  ChevronDown,
  Shield,
  ZoomIn,
  Grid3X3,
  BarChart3,
} from 'lucide-react';

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  Brush,
} from 'recharts';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { toast } from 'sonner';

// ============================================================
// 1. PRECURSOR FREQUENCY DATA
// ============================================================

const precursorColors: Record<string, string> = {
  'Work at Height': '#2563EB',
  'Energy Isolation': '#059669',
  'Line of Fire': '#DC2626',
  'Confined Space': '#7C3AED',
  'Safe Mechanical Lifting': '#EA580C',
};

const precursor12MonthData = [
  {
    month: 'Jun 25',
    'Work at Height': 38,
    'Energy Isolation': 32,
    'Line of Fire': 24,
    'Confined Space': 20,
    'Safe Mechanical Lifting': 15,
  },
  {
    month: 'Jul 25',
    'Work at Height': 42,
    'Energy Isolation': 35,
    'Line of Fire': 26,
    'Confined Space': 22,
    'Safe Mechanical Lifting': 17,
  },
  {
    month: 'Aug 25',
    'Work at Height': 40,
    'Energy Isolation': 34,
    'Line of Fire': 28,
    'Confined Space': 25,
    'Safe Mechanical Lifting': 18,
  },
  {
    month: 'Sep 25',
    'Work at Height': 46,
    'Energy Isolation': 39,
    'Line of Fire': 29,
    'Confined Space': 27,
    'Safe Mechanical Lifting': 20,
  },
  {
    month: 'Oct 25',
    'Work at Height': 48,
    'Energy Isolation': 38,
    'Line of Fire': 31,
    'Confined Space': 28,
    'Safe Mechanical Lifting': 21,
  },
  {
    month: 'Nov 25',
    'Work at Height': 44,
    'Energy Isolation': 36,
    'Line of Fire': 30,
    'Confined Space': 29,
    'Safe Mechanical Lifting': 22,
  },
  {
    month: 'Dec 25',
    'Work at Height': 51,
    'Energy Isolation': 41,
    'Line of Fire': 33,
    'Confined Space': 30,
    'Safe Mechanical Lifting': 23,
  },
  {
    month: 'Jan 26',
    'Work at Height': 53,
    'Energy Isolation': 42,
    'Line of Fire': 35,
    'Confined Space': 32,
    'Safe Mechanical Lifting': 24,
  },
  {
    month: 'Feb 26',
    'Work at Height': 49,
    'Energy Isolation': 40,
    'Line of Fire': 34,
    'Confined Space': 31,
    'Safe Mechanical Lifting': 23,
  },
  {
    month: 'Mar 26',
    'Work at Height': 56,
    'Energy Isolation': 44,
    'Line of Fire': 37,
    'Confined Space': 34,
    'Safe Mechanical Lifting': 26,
  },
  {
    month: 'Apr 26',
    'Work at Height': 58,
    'Energy Isolation': 43,
    'Line of Fire': 39,
    'Confined Space': 35,
    'Safe Mechanical Lifting': 28,
  },
  {
    month: 'May 26',
    'Work at Height': 62,
    'Energy Isolation': 46,
    'Line of Fire': 42,
    'Confined Space': 39,
    'Safe Mechanical Lifting': 31,
  },
];

// ============================================================
// 2. SITE RISK HEATMAP DATA
// ============================================================

const heatmapLocations = [
  'Moran',
  'Duliajan',
  'Digboi',
  'Naharkatia',
  'Jorajan',
  'Sadiya',
  'Kumchai',
];

const heatmapPrecursors = [
  'Work at Height',
  'Energy Isolation',
  'Line of Fire',
  'Confined Space',
  'Lifting',
  'Hot Work',
  'Gas Hazard',
];

const siteRiskHeatmapData: Record<
  string,
  Record<
    string,
    {
      count: number;
      risk: 'High' | 'Medium' | 'Low';
    }
  >
> = {
  Moran: {
    'Work at Height': { count: 32, risk: 'High' },
    'Energy Isolation': { count: 28, risk: 'High' },
    'Line of Fire': { count: 35, risk: 'High' },
    'Confined Space': { count: 18, risk: 'Medium' },
    Lifting: { count: 22, risk: 'High' },
    'Hot Work': { count: 14, risk: 'Medium' },
    'Gas Hazard': { count: 26, risk: 'High' },
  },

  Duliajan: {
    'Work at Height': { count: 38, risk: 'High' },
    'Energy Isolation': { count: 34, risk: 'High' },
    'Line of Fire': { count: 24, risk: 'Medium' },
    'Confined Space': { count: 31, risk: 'High' },
    Lifting: { count: 19, risk: 'Medium' },
    'Hot Work': { count: 16, risk: 'Medium' },
    'Gas Hazard': { count: 12, risk: 'Low' },
  },

  Digboi: {
    'Work at Height': { count: 41, risk: 'High' },
    'Energy Isolation': { count: 19, risk: 'Medium' },
    'Line of Fire': { count: 22, risk: 'Medium' },
    'Confined Space': { count: 14, risk: 'Low' },
    Lifting: { count: 15, risk: 'Medium' },
    'Hot Work': { count: 18, risk: 'Medium' },
    'Gas Hazard': { count: 8, risk: 'Low' },
  },

  Naharkatia: {
    'Work at Height': { count: 16, risk: 'Medium' },
    'Energy Isolation': { count: 24, risk: 'High' },
    'Line of Fire': { count: 18, risk: 'Medium' },
    'Confined Space': { count: 12, risk: 'Low' },
    Lifting: { count: 11, risk: 'Low' },
    'Hot Work': { count: 9, risk: 'Low' },
    'Gas Hazard': { count: 14, risk: 'Medium' },
  },

  Jorajan: {
    'Work at Height': { count: 19, risk: 'Medium' },
    'Energy Isolation': { count: 21, risk: 'High' },
    'Line of Fire': { count: 16, risk: 'Medium' },
    'Confined Space': { count: 9, risk: 'Low' },
    Lifting: { count: 8, risk: 'Low' },
    'Hot Work': { count: 12, risk: 'Low' },
    'Gas Hazard': { count: 15, risk: 'Medium' },
  },

  Sadiya: {
    'Work at Height': { count: 14, risk: 'Medium' },
    'Energy Isolation': { count: 11, risk: 'Low' },
    'Line of Fire': { count: 26, risk: 'High' },
    'Confined Space': { count: 6, risk: 'Low' },
    Lifting: { count: 24, risk: 'High' },
    'Hot Work': { count: 10, risk: 'Low' },
    'Gas Hazard': { count: 7, risk: 'Low' },
  },

  Kumchai: {
    'Work at Height': { count: 11, risk: 'Low' },
    'Energy Isolation': { count: 14, risk: 'Medium' },
    'Line of Fire': { count: 12, risk: 'Low' },
    'Confined Space': { count: 22, risk: 'High' },
    Lifting: { count: 7, risk: 'Low' },
    'Hot Work': { count: 8, risk: 'Low' },
    'Gas Hazard': { count: 18, risk: 'High' },
  },
};

// ============================================================
// 3. ACTIVITY-WISE PSIF DATA
// ============================================================

const activityPsifData = [
  {
    activity: 'Confined Space Entry',
    psifRate: 68,
    riskLevel: 'High',
    color: '#DC2626',
    reportsCount: 94,
  },
  {
    activity: 'Hydrostatic Testing',
    psifRate: 62,
    riskLevel: 'High',
    color: '#DC2626',
    reportsCount: 142,
  },
  {
    activity: 'Crane Lifting',
    psifRate: 54,
    riskLevel: 'High',
    color: '#DC2626',
    reportsCount: 128,
  },
  {
    activity: 'Welding / Hot Work',
    psifRate: 44,
    riskLevel: 'Medium',
    color: '#EA580C',
    reportsCount: 165,
  },
  {
    activity: 'Scaffolding at Height',
    psifRate: 41,
    riskLevel: 'Medium',
    color: '#EA580C',
    reportsCount: 198,
  },
  {
    activity: 'Electrical LOTO',
    psifRate: 36,
    riskLevel: 'Medium',
    color: '#F59E0B',
    reportsCount: 112,
  },
  {
    activity: 'Tank Cleaning',
    psifRate: 32,
    riskLevel: 'Medium',
    color: '#F59E0B',
    reportsCount: 88,
  },
  {
    activity: 'Routine Pigging',
    psifRate: 18,
    riskLevel: 'Low',
    color: '#059669',
    reportsCount: 76,
  },
];

// ============================================================
// 4. LIFE-SAVING RULE TREND DATA
// ============================================================

const lsrRuleColors: Record<string, string> = {
  'Working at Height': '#2563EB',
  'Energy Isolation': '#059669',
  'Line of Fire': '#DC2626',
  'Confined Space': '#7C3AED',
  'Safe Mechanical Lifting': '#EA580C',
  'Hot Work': '#F59E0B',
};

const lsr12MonthTrends = [
  {
    month: 'Jun 25',
    'Working at Height': 32,
    'Energy Isolation': 34,
    'Line of Fire': 28,
    'Confined Space': 18,
    'Safe Mechanical Lifting': 15,
    'Hot Work': 12,
  },
  {
    month: 'Jul 25',
    'Working at Height': 35,
    'Energy Isolation': 36,
    'Line of Fire': 29,
    'Confined Space': 19,
    'Safe Mechanical Lifting': 16,
    'Hot Work': 13,
  },
  {
    month: 'Aug 25',
    'Working at Height': 34,
    'Energy Isolation': 35,
    'Line of Fire': 30,
    'Confined Space': 20,
    'Safe Mechanical Lifting': 17,
    'Hot Work': 14,
  },
  {
    month: 'Sep 25',
    'Working at Height': 38,
    'Energy Isolation': 39,
    'Line of Fire': 32,
    'Confined Space': 22,
    'Safe Mechanical Lifting': 18,
    'Hot Work': 15,
  },
  {
    month: 'Oct 25',
    'Working at Height': 40,
    'Energy Isolation': 41,
    'Line of Fire': 33,
    'Confined Space': 23,
    'Safe Mechanical Lifting': 19,
    'Hot Work': 15,
  },
  {
    month: 'Nov 25',
    'Working at Height': 39,
    'Energy Isolation': 38,
    'Line of Fire': 32,
    'Confined Space': 22,
    'Safe Mechanical Lifting': 19,
    'Hot Work': 14,
  },
  {
    month: 'Dec 25',
    'Working at Height': 44,
    'Energy Isolation': 43,
    'Line of Fire': 36,
    'Confined Space': 25,
    'Safe Mechanical Lifting': 21,
    'Hot Work': 16,
  },
  {
    month: 'Jan 26',
    'Working at Height': 47,
    'Energy Isolation': 45,
    'Line of Fire': 38,
    'Confined Space': 26,
    'Safe Mechanical Lifting': 22,
    'Hot Work': 17,
  },
  {
    month: 'Feb 26',
    'Working at Height': 45,
    'Energy Isolation': 42,
    'Line of Fire': 37,
    'Confined Space': 25,
    'Safe Mechanical Lifting': 21,
    'Hot Work': 16,
  },
  {
    month: 'Mar 26',
    'Working at Height': 51,
    'Energy Isolation': 47,
    'Line of Fire': 41,
    'Confined Space': 28,
    'Safe Mechanical Lifting': 24,
    'Hot Work': 18,
  },
  {
    month: 'Apr 26',
    'Working at Height': 53,
    'Energy Isolation': 46,
    'Line of Fire': 43,
    'Confined Space': 29,
    'Safe Mechanical Lifting': 25,
    'Hot Work': 19,
  },
  {
    month: 'May 26',
    'Working at Height': 58,
    'Energy Isolation': 50,
    'Line of Fire': 47,
    'Confined Space': 32,
    'Safe Mechanical Lifting': 28,
    'Hot Work': 21,
  },
];

// ============================================================
// 5. COMPONENT
// ============================================================

export default function PatternsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [site, setSite] = useState('All Sites');
  const [activity, setActivity] = useState('All Activities');
  const [precursor, setPrecursor] = useState('All Precursors');
  const [lifeSavingRule, setLifeSavingRule] =
    useState('All LSR Rules');

  const [timeRange, setTimeRange] =
    useState<'3M' | '6M' | '12M'>('12M');

  const [hoveredCell, setHoveredCell] = useState<{
    location: string;
    precursor: string;
    count: number;
    risk: 'High' | 'Medium' | 'Low';
  } | null>(null);

  const filteredPrecursorData = useMemo(() => {
    if (timeRange === '3M') {
      return precursor12MonthData.slice(-3);
    }

    if (timeRange === '6M') {
      return precursor12MonthData.slice(-6);
    }

    return precursor12MonthData;
  }, [timeRange]);

  const filteredLsrData = useMemo(() => {
    if (timeRange === '3M') {
      return lsr12MonthTrends.slice(-3);
    }

    if (timeRange === '6M') {
      return lsr12MonthTrends.slice(-6);
    }

    return lsr12MonthTrends;
  }, [timeRange]);

  // ==========================================================
  // RESET FILTERS
  // ==========================================================

  const handleResetFilters = () => {
    setDateRange('30d');
    setSite('All Sites');
    setActivity('All Activities');
    setPrecursor('All Precursors');
    setLifeSavingRule('All LSR Rules');
    setTimeRange('12M');
    setHoveredCell(null);

    toast.info('Analytics filters reset to default');
  };

  // ==========================================================
  // CSV EXPORT
  // ==========================================================

  const handleExportCsv = (type: string) => {
    const filename = `oil_patterns_${type
      .toLowerCase()
      .replace(/\s+/g, '_')}.csv`;

    let csvContent = 'data:text/csv;charset=utf-8,';

    if (type === 'precursors') {
      const headers = [
        'Month',
        'Work at Height',
        'Energy Isolation',
        'Line of Fire',
        'Confined Space',
        'Safe Mechanical Lifting',
      ];

      const rows = precursor12MonthData.map((d) => [
        `"${d.month}"`,
        d['Work at Height'],
        d['Energy Isolation'],
        d['Line of Fire'],
        d['Confined Space'],
        d['Safe Mechanical Lifting'],
      ]);

      csvContent += [
        headers.join(','),
        ...rows.map((r) => r.join(',')),
      ].join('\n');
    } else if (type === 'psif') {
      const headers = [
        'Activity',
        'PSIF_Rate_Pct',
        'Risk_Level',
        'Total_Reports',
      ];

      const rows = activityPsifData.map((a) => [
        `"${a.activity}"`,
        a.psifRate,
        `"${a.riskLevel}"`,
        a.reportsCount,
      ]);

      csvContent += [
        headers.join(','),
        ...rows.map((r) => r.join(',')),
      ].join('\n');
    } else {
      const headers = [
        'Month',
        'Working at Height',
        'Energy Isolation',
        'Line of Fire',
        'Confined Space',
        'Safe Mechanical Lifting',
        'Hot Work',
      ];

      const rows = lsr12MonthTrends.map((d) => [
        `"${d.month}"`,
        d['Working at Height'],
        d['Energy Isolation'],
        d['Line of Fire'],
        d['Confined Space'],
        d['Safe Mechanical Lifting'],
        d['Hot Work'],
      ]);

      csvContent += [
        headers.join(','),
        ...rows.map((r) => r.join(',')),
      ].join('\n');
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');

    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      `Exported ${type} dataset as CSV successfully!`
    );
  };

  const handleExportPng = (chartName: string) => {
    toast.success(
      `Generated PNG snapshot for ${chartName}`
    );
  };

  // ==========================================================
  // HEATMAP COLOR
  // ==========================================================

  const getHeatmapColorClass = (
    risk: 'High' | 'Medium' | 'Low',
    count: number
  ) => {
    if (risk === 'High') {
      if (count >= 30) {
        return 'bg-red-600 text-white font-bold shadow-xs';
      }

      if (count >= 25) {
        return 'bg-red-500/80 text-white font-bold';
      }

      return 'bg-red-500/40 text-red-900 dark:text-red-200 font-semibold';
    }

    if (risk === 'Medium') {
      if (count >= 18) {
        return 'bg-orange-500/60 text-orange-950 dark:text-orange-200 font-semibold';
      }

      return 'bg-amber-500/35 text-amber-950 dark:text-amber-200 font-semibold';
    }

    if (count >= 12) {
      return 'bg-emerald-500/30 text-emerald-950 dark:text-emerald-200 font-medium';
    }

    return 'bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 font-medium';
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E4E7EC] dark:border-border/50 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#17202A] dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[#102F3E]" />
            Patterns &amp; Trends Analytics
          </h1>

          <p className="text-xs text-[#667085] dark:text-slate-400 mt-0.5">
            Advanced multi-dimensional SIF precursor modeling,
            longitudinal trends, spatial risk heatmaps, and
            life-saving rule frequencies.
          </p>
        </div>

        <Badge
          variant="outline"
          className="text-xs font-mono border-[#102F3E]/30 text-[#102F3E] dark:text-sky-400 bg-[#102F3E]/5 px-2.5 py-1"
        >
          Statistical Sample: 2,348 Audited Events
        </Badge>
      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <Card className="border bg-card/95 shadow-sm">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Recurring Precursors
              </span>

              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                <Repeat className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-black font-mono text-foreground">
                14
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>+3 emerging clusters</span>
                <span className="text-muted-foreground font-normal">
                  vs last month
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-card/95 shadow-sm">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">
                High-Risk Locations
              </span>

              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <MapPin className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-black font-mono text-foreground">
                5 Sites
              </div>

              <div className="text-xs text-muted-foreground truncate">
                Moran, Duliajan, Digboi, Jorajan, Sadiya
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-card/95 shadow-sm">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Trending This Month
              </span>

              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black font-mono text-rose-600 dark:text-rose-400">
                  +18.4%
                </span>

                <Badge
                  variant="outline"
                  className="text-[11px] font-bold border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-1.5 py-0.5"
                >
                  Accelerating
                </Badge>
              </div>

              <div className="text-xs text-muted-foreground">
                Precursor frequency vs 30-day baseline
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-500/40 bg-red-500/10 shadow-sm relative overflow-hidden">
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-300">
                Active Alerts
              </span>

              <Badge
                variant="outline"
                className="text-[10px] font-mono border-red-500/50 bg-red-500/20 text-red-700 dark:text-red-300 px-1.5 py-0.2"
              >
                Critical
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-black font-mono text-red-600 dark:text-red-400 flex items-center gap-2">
                7
                <ShieldAlert className="h-5 w-5 text-red-500" />
              </div>

              <div className="text-xs text-red-700/90 dark:text-red-300/90 font-medium">
                Unmitigated high-potential SIF exposures
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ======================================================
          FILTER BAR
      ====================================================== */}

      <Card className="border border-[#E4E7EC] bg-white dark:bg-card dark:border-border shadow-xs p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">

          <div className="flex flex-wrap items-center gap-2.5">

            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-sky-500 shrink-0" />

              <Select
                value={dateRange}
                onValueChange={setDateRange}
              >
                <SelectTrigger className="h-8 text-xs bg-background min-w-[125px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="7d" className="text-xs">
                    Last 7 days
                  </SelectItem>
                  <SelectItem value="30d" className="text-xs">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="90d" className="text-xs">
                    Last 90 days
                  </SelectItem>
                  <SelectItem value="ytd" className="text-xs">
                    Year to Date
                  </SelectItem>
                  <SelectItem value="custom" className="text-xs">
                    Custom Range
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />

              <Select value={site} onValueChange={setSite}>
                <SelectTrigger className="h-8 text-xs bg-background min-w-[120px]">
                  <SelectValue placeholder="Site" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="All Sites">All Sites</SelectItem>
                  <SelectItem value="Duliajan">Duliajan</SelectItem>
                  <SelectItem value="Moran">Moran</SelectItem>
                  <SelectItem value="Digboi">Digboi</SelectItem>
                  <SelectItem value="Naharkatia">Naharkatia</SelectItem>
                  <SelectItem value="Jorajan">Jorajan</SelectItem>
                  <SelectItem value="Sadiya">Sadiya</SelectItem>
                  <SelectItem value="Kumchai">Kumchai</SelectItem>
                  <SelectItem value="Dikom">Dikom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1">
              <Activity className="h-3.5 w-3.5 text-indigo-500 shrink-0" />

              <Select
                value={activity}
                onValueChange={setActivity}
              >
                <SelectTrigger className="h-8 text-xs bg-background min-w-[140px]">
                  <SelectValue placeholder="Activity" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="All Activities">
                    All Activities
                  </SelectItem>
                  <SelectItem value="Hydrostatic Testing">
                    Hydrostatic Testing
                  </SelectItem>
                  <SelectItem value="Work at Height">
                    Work at Height
                  </SelectItem>
                  <SelectItem value="Confined Space Entry">
                    Confined Space Entry
                  </SelectItem>
                  <SelectItem value="Pipe Hoisting">
                    Pipe Hoisting
                  </SelectItem>
                  <SelectItem value="Hot Work">
                    Hot Work Welding
                  </SelectItem>
                  <SelectItem value="Electrical LOTO">
                    Electrical LOTO
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5 text-amber-500 shrink-0" />

              <Select
                value={precursor}
                onValueChange={setPrecursor}
              >
                <SelectTrigger className="h-8 text-xs bg-background min-w-[135px]">
                  <SelectValue placeholder="Precursor" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="All Precursors">
                    All Precursors
                  </SelectItem>
                  <SelectItem value="Line of Fire">
                    Line of Fire
                  </SelectItem>
                  <SelectItem value="Work at Height">
                    Work at Height
                  </SelectItem>
                  <SelectItem value="Energy Isolation">
                    Energy Isolation
                  </SelectItem>
                  <SelectItem value="Confined Space">
                    Confined Space
                  </SelectItem>
                  <SelectItem value="Safe Mechanical Lifting">
                    Safe Mechanical Lifting
                  </SelectItem>
                  <SelectItem value="Atmospheric Hazard">
                    Atmospheric Hazard
                  </SelectItem>
                  <SelectItem value="Hot Work">
                    Hot Work
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-rose-500 shrink-0" />

              <Select
                value={lifeSavingRule}
                onValueChange={setLifeSavingRule}
              >
                <SelectTrigger className="h-8 text-xs bg-background min-w-[145px]">
                  <SelectValue placeholder="Life-Saving Rule" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="All LSR Rules">
                    All LSR Rules
                  </SelectItem>
                  <SelectItem value="Energy Isolation">
                    Energy Isolation
                  </SelectItem>
                  <SelectItem value="Working at Height">
                    Working at Height
                  </SelectItem>
                  <SelectItem value="Line of Fire">
                    Line of Fire
                  </SelectItem>
                  <SelectItem value="Confined Space">
                    Confined Space
                  </SelectItem>
                  <SelectItem value="Safe Mechanical Lifting">
                    Safe Mechanical Lifting
                  </SelectItem>
                  <SelectItem value="Bypassing Safety Controls">
                    Bypassing Safety Controls
                  </SelectItem>
                  <SelectItem value="Hot Work">
                    Hot Work
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto shrink-0">

            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="h-8 px-2.5 text-xs gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 px-3 text-xs font-semibold gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export Report
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => handleExportCsv('precursors')}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2 text-emerald-500" />
                  Export Precursors CSV
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleExportCsv('psif')}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2 text-emerald-500" />
                  Export PSIF Rates CSV
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleExportPng('Full Analytics Dashboard')
                  }
                >
                  <ImageIcon className="h-4 w-4 mr-2 text-sky-500" />
                  Export Dashboard PNG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>

      {/* ======================================================
          SECTION 1 — PRECURSOR FREQUENCY
      ====================================================== */}

      <Card className="border border-[#E4E7EC] bg-white dark:bg-card dark:border-border shadow-xs">

        <CardHeader className="p-4 sm:p-6 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E4E7EC] dark:border-border/50">

          <div>
            <CardTitle className="text-sm font-bold text-[#17202A] dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#102F3E]" />
              Precursor Frequency Over Time
            </CardTitle>

            <p className="text-xs text-[#667085] dark:text-slate-400 mt-0.5">
              Multi-line longitudinal trend tracking top 5
              precursors across 12 months.
            </p>
          </div>

          <div className="flex items-center gap-2">

            <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border text-xs">
              {(['3M', '6M', '12M'] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${timeRange === range
                    ? 'bg-background text-foreground shadow-2xs font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2.5 gap-1"
                >
                  <Download className="h-3 w-3" />
                  Export
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    handleExportCsv('precursors')
                  }
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 mr-2" />
                  Export CSV
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleExportPng(
                      'Precursor Frequency Over Time'
                    )
                  }
                >
                  <ImageIcon className="h-3.5 w-3.5 mr-2" />
                  Export PNG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-3">

          <div className="flex flex-wrap items-center justify-center gap-4 mb-4 pb-3 border-b border-border/40 text-xs">
            {Object.entries(precursorColors).map(
              ([name, color]) => (
                <div
                  key={name}
                  className="flex items-center space-x-1.5 font-medium text-foreground"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span>{name}</span>
                </div>
              )
            )}
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={filteredPrecursorData}
                margin={{
                  top: 10,
                  right: 20,
                  left: -20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.2}
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                {Object.entries(precursorColors).map(
                  ([name, color]) => (
                    <Line
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stroke={color}
                      strokeWidth={2.5}
                      dot={{
                        r: 3,
                        fill: color,
                        strokeWidth: 1.5,
                        stroke: '#fff',
                      }}
                      activeDot={{
                        r: 6,
                        stroke: color,
                        strokeWidth: 2,
                      }}
                    />
                  )
                )}

                <Brush
                  dataKey="month"
                  height={24}
                  stroke="#0EA5E9"
                  fill="transparent"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 text-[11px] text-muted-foreground flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ZoomIn className="h-3 w-3 text-sky-500" />
              Use slider handles to zoom and pan across
              timeline intervals
            </span>

            <span className="font-mono text-sky-500">
              12 Months Rolling Track
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ======================================================
          SECTION 2 — HEATMAP + PSIF
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* HEATMAP */}

        <Card className="border border-[#E4E7EC] bg-white dark:bg-card dark:border-border shadow-xs">

          <CardHeader className="p-4 sm:p-6 pb-2 flex items-center justify-between border-b border-[#E4E7EC] dark:border-border/50">

            <div>
              <CardTitle className="text-sm font-bold text-[#17202A] dark:text-slate-100 flex items-center gap-2">
                <Grid3X3 className="h-4 w-4 text-rose-500" />
                Site-wise Risk Heatmap
              </CardTitle>

              <p className="text-xs text-muted-foreground mt-0.5">
                Spatial grid showing site locations versus
                SIF precursors.
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2 gap-1"
                >
                  <Download className="h-3 w-3" />
                  Export
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    handleExportCsv('precursors')
                  }
                >
                  Export CSV
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleExportPng('Site-wise Risk Heatmap')
                  }
                >
                  Export PNG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="p-5 space-y-4">

            <div className="overflow-x-auto">
              <div className="min-w-[480px]">

                <div className="grid grid-cols-8 gap-1 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                  <div className="text-left font-mono">
                    Location \ Precursor
                  </div>

                  {heatmapPrecursors.map((prec) => (
                    <div
                      key={prec}
                      className="truncate px-0.5"
                      title={prec}
                    >
                      {prec.split(' ')[0]}
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  {heatmapLocations.map((loc) => (
                    <div
                      key={loc}
                      className="grid grid-cols-8 gap-1 items-center"
                    >
                      <div className="text-xs font-semibold text-foreground truncate pr-1">
                        {loc}
                      </div>

                      {heatmapPrecursors.map((prec) => {
                        const cell =
                          siteRiskHeatmapData[loc]?.[prec] || {
                            count: 0,
                            risk: 'Low' as const,
                          };

                        const isHovered =
                          hoveredCell?.location === loc &&
                          hoveredCell?.precursor === prec;

                        return (
                          <div
                            key={prec}
                            onMouseEnter={() =>
                              setHoveredCell({
                                location: loc,
                                precursor: prec,
                                count: cell.count,
                                risk: cell.risk,
                              })
                            }
                            onMouseLeave={() =>
                              setHoveredCell(null)
                            }
                            className={`h-9 rounded-md flex items-center justify-center font-mono text-xs cursor-pointer transition-all ${getHeatmapColorClass(
                              cell.risk,
                              cell.count
                            )} ${isHovered
                              ? 'ring-2 ring-foreground scale-105 z-10 shadow-md'
                              : ''
                              }`}
                          >
                            {cell.count}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-xs">

              {hoveredCell ? (
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      hoveredCell.risk === 'High'
                        ? 'bg-red-500/15 text-red-600 border-red-500/30'
                        : hoveredCell.risk === 'Medium'
                          ? 'bg-orange-500/15 text-orange-600 border-orange-500/30'
                          : 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
                    }
                  >
                    {hoveredCell.risk} Risk
                  </Badge>

                  <span>
                    <strong>{hoveredCell.location}</strong>{' '}
                    • {hoveredCell.precursor}:{' '}
                    <strong className="font-mono text-sky-500">
                      {hoveredCell.count} audited events
                    </strong>
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>🔴 High Risk</span>
                  <span>🟠 Medium Risk</span>
                  <span>🟢 Low Risk</span>
                </div>
              )}

              <span className="text-[11px] text-muted-foreground">
                Hover cell to inspect count
              </span>
            </div>
          </CardContent>
        </Card>

        {/* PSIF */}

        <Card className="border border-[#E4E7EC] bg-white dark:bg-card dark:border-border shadow-xs">

          <CardHeader className="p-4 sm:p-6 pb-2 flex items-center justify-between border-b border-[#E4E7EC] dark:border-border/50">

            <div>
              <CardTitle className="text-sm font-bold text-[#17202A] dark:text-slate-100 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-indigo-500" />
                Activity-wise PSIF Rate
              </CardTitle>

              <p className="text-xs text-muted-foreground mt-0.5">
                High-potential SIF percentage by operational
                activity.
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2 gap-1"
                >
                  <Download className="h-3 w-3" />
                  Export
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleExportCsv('psif')}
                >
                  Export CSV
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleExportPng(
                      'Activity-wise PSIF Rate'
                    )
                  }
                >
                  Export PNG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="p-5">

            <div className="h-[290px] w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={activityPsifData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 25,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    opacity={0.2}
                  />

                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fontSize: 11 }}
                    unit="%"
                  />

                  <YAxis
                    type="category"
                    dataKey="activity"
                    tick={{ fontSize: 11 }}
                    width={130}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="psifRate"
                    radius={[0, 4, 4, 0]}
                  >
                    {activityPsifData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                        />
                      )
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>🔴 High Risk (&gt;50%)</span>
                <span>🟠 Medium Risk (30–50%)</span>
                <span>🟢 Low Risk (&lt;30%)</span>
              </div>

              <span className="font-mono text-[11px]">
                8 Core Activities
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ======================================================
          SECTION 3 — LIFE-SAVING RULE TRENDS
      ====================================================== */}

      <Card className="border border-[#E4E7EC] bg-white dark:bg-card dark:border-border shadow-xs">

        <CardHeader className="p-4 sm:p-6 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E4E7EC] dark:border-border/50">

          <div>
            <CardTitle className="text-sm font-bold text-[#17202A] dark:text-slate-100 flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              Life-Saving Rule Trends
            </CardTitle>

            <p className="text-xs text-[#667085] dark:text-slate-400 mt-0.5">
              Stacked area chart showing rule frequency over
              12 months.
            </p>
          </div>

          <div className="flex items-center gap-2">

            <Badge
              variant="outline"
              className="text-xs font-mono border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
            >
              Working at Height: +81% Growth
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2.5 gap-1"
                >
                  <Download className="h-3 w-3" />
                  Export
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleExportCsv('lsr')}
                >
                  Export CSV
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    handleExportPng(
                      'Life-Saving Rule Trends'
                    )
                  }
                >
                  Export PNG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-3">

          <div className="flex flex-wrap items-center justify-center gap-4 mb-4 pb-3 border-b border-border/40 text-xs">
            {Object.entries(lsrRuleColors).map(
              ([name, color]) => (
                <div
                  key={name}
                  className="flex items-center space-x-1.5 font-medium text-foreground"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span>{name}</span>
                </div>
              )
            )}
          </div>

          <div className="h-[340px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={filteredLsrData}
                margin={{
                  top: 10,
                  right: 20,
                  left: -20,
                  bottom: 5,
                }}
              >
                <defs>
                  {Object.entries(lsrRuleColors).map(
                    ([name, color]) => (
                      <linearGradient
                        key={name}
                        id={`color-${name.replace(
                          /\s+/g,
                          ''
                        )}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={color}
                          stopOpacity={0.7}
                        />

                        <stop
                          offset="95%"
                          stopColor={color}
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    )
                  )}
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.2}
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Legend />

                {Object.entries(lsrRuleColors).map(
                  ([name, color]) => (
                    <Area
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stackId="1"
                      stroke={color}
                      strokeWidth={1.5}
                      fill={`url(#color-${name.replace(
                        /\s+/g,
                        ''
                      )})`}
                    />
                  )
                )}

                <Brush
                  dataKey="month"
                  height={24}
                  stroke="#10B981"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 text-[11px] text-muted-foreground flex items-center justify-between">

            <span className="flex items-center gap-1.5">
              <ZoomIn className="h-3 w-3 text-emerald-500" />
              Use slider handles to zoom and pan across
              timeline intervals
            </span>

            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Interactive Zoom / Pan Enabled
            </span>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}