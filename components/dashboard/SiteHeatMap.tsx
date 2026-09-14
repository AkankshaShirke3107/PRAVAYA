'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  ChevronRight,
  ListFilter,
  Map as MapIcon,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSafetyStore } from '@/lib/store';

export interface SiteRiskData {
  site: string;
  riskLevel: 'HIGH' | 'MODERATE' | 'LOW';
  badgeColor: string;
  dotColor: string;
  reports: number;
  sifCount: number;
  density: number;
  topPrecursor: string;
  facilities: string;
  x: number;
  y: number;
}

export const OPERATIONAL_SITES: SiteRiskData[] = [
  {
    site: 'Duliajan',
    riskLevel: 'HIGH',
    badgeColor: 'bg-[#C92925] text-white',
    dotColor: '#C92925',
    reports: 18,
    sifCount: 9,
    density: 50.0,
    topPrecursor: 'Work at Height (4)',
    facilities: 'CPF, GGS-4, Compressor Station #2',
    x: 190,
    y: 95,
  },
  {
    site: 'Naharkatia',
    riskLevel: 'HIGH',
    badgeColor: 'bg-[#C92925] text-white',
    dotColor: '#C92925',
    reports: 16,
    sifCount: 6,
    density: 37.5,
    topPrecursor: 'Energy Isolation (3)',
    facilities: 'Separation Plant, Substation 33kV',
    x: 130,
    y: 130,
  },
  {
    site: 'Moran',
    riskLevel: 'MODERATE',
    badgeColor: 'bg-[#D97706] text-white',
    dotColor: '#D97706',
    reports: 14,
    sifCount: 4,
    density: 28.6,
    topPrecursor: 'Line of Fire (2)',
    facilities: 'GGS-1, Flow Station 3',
    x: 65,
    y: 120,
  },
  {
    site: 'Digboi',
    riskLevel: 'LOW',
    badgeColor: 'bg-[#2E7D32] text-white',
    dotColor: '#2E7D32',
    reports: 12,
    sifCount: 2,
    density: 16.7,
    topPrecursor: 'Confined Space (1)',
    facilities: 'Wellhead Rig #4, Field Unit 3',
    x: 255,
    y: 75,
  },
  {
    site: 'Jorajan',
    riskLevel: 'MODERATE',
    badgeColor: 'bg-[#D97706] text-white',
    dotColor: '#D97706',
    reports: 10,
    sifCount: 3,
    density: 30.0,
    topPrecursor: 'Mechanical Lifting (2)',
    facilities: 'Power Hub, Storage Battery',
    x: 165,
    y: 145,
  },
  {
    site: 'Sadiya',
    riskLevel: 'LOW',
    badgeColor: 'bg-[#2E7D32] text-white',
    dotColor: '#2E7D32',
    reports: 8,
    sifCount: 1,
    density: 12.5,
    topPrecursor: 'Mechanical Lifting (1)',
    facilities: 'Pipeline Spool 9, Wharf Station',
    x: 295,
    y: 45,
  },
];

export function SiteHeatMap() {
  const { setFilter } = useSafetyStore();

  const [selectedSite, setSelectedSite] =
    useState<SiteRiskData>(OPERATIONAL_SITES[0]);

  const [viewMode, setViewMode] =
    useState<'map' | 'grid'>('map');

  return (
    <Card className="panel-card panel-accent-navy flex flex-col h-full min-w-0">
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#C92925]" />
            OIL OPERATIONAL RISK MAP
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5 font-normal">
            Operational HSE risk density &amp; SIF precursor analysis by site
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="inline-flex rounded-[2px] border border-[#D9DDE0] bg-[#F3F2EE] p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`px-2 py-1 text-xs font-semibold rounded-[2px] flex items-center gap-1 ${viewMode === 'map'
                  ? 'bg-[#102F3E] text-white'
                  : 'text-[#667085] hover:text-[#102F3E]'
                }`}
            >
              <MapIcon className="h-3 w-3" />
              Map View
            </button>

            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-2 py-1 text-xs font-semibold rounded-[2px] flex items-center gap-1 ${viewMode === 'grid'
                  ? 'bg-[#102F3E] text-white'
                  : 'text-[#667085] hover:text-[#102F3E]'
                }`}
            >
              <ListFilter className="h-3 w-3" />
              List View
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4 min-w-0">
        {viewMode === 'map' ? (
          <div className="space-y-4">
            {/* Simple SVG Map of Upper Assam region */}
            <div className="relative w-full h-52 rounded-[2px] bg-muted border border-border p-2 overflow-hidden flex items-center justify-center dark:bg-[#192028]">
              <svg
                viewBox="0 0 350 180"
                className="w-full h-full"
              >
                {/* Terrain background */}
                <path
                  d="M 20,165 Q 70,135 120,150 T 210,95 T 270,65 T 330,35 L 340,175 L 10,175 Z"
                  fill="#E5E4DE"
                  stroke="#D9DDE0"
                  strokeWidth="1.5"
                  className="dark:fill-[#1E2B38] dark:stroke-[#232E3B]"
                />

                {/* River corridor */}
                <path
                  d="M 10,140 Q 80,120 150,115 T 240,75 T 320,45"
                  fill="none"
                  stroke="#102F3E"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />

                <text
                  x="40"
                  y="125"
                  fill="#667085"
                  className="text-[8px] font-semibold italic"
                >
                  Brahmaputra River Corridor
                </text>

                {/* Site Connections */}
                <line
                  x1="65"
                  y1="120"
                  x2="130"
                  y2="130"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                <line
                  x1="130"
                  y1="130"
                  x2="165"
                  y2="145"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                <line
                  x1="130"
                  y1="130"
                  x2="190"
                  y2="95"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                <line
                  x1="190"
                  y1="95"
                  x2="255"
                  y2="75"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                <line
                  x1="255"
                  y1="75"
                  x2="295"
                  y2="45"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Operational Site Markers */}
                {OPERATIONAL_SITES.map((site) => {
                  const isSelected =
                    selectedSite.site === site.site;

                  const radius =
                    site.riskLevel === 'HIGH'
                      ? 9
                      : site.riskLevel === 'MODERATE'
                        ? 8
                        : 7;

                  return (
                    <g
                      key={site.site}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedSite(site);
                        setFilter('site', site.site);
                      }}
                    >
                      {/* Selected Highlight Ring */}
                      {isSelected && (
                        <circle
                          cx={site.x}
                          cy={site.y}
                          r={radius + 5}
                          fill="none"
                          stroke="#102F3E"
                          strokeWidth="2"
                          strokeDasharray="2 2"
                        />
                      )}

                      {/* Solid Marker Circle */}
                      <circle
                        cx={site.x}
                        cy={site.y}
                        r={radius}
                        fill={site.dotColor}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />

                      {/* Site Label */}
                      <text
                        x={site.x}
                        y={site.y - 12}
                        textAnchor="middle"
                        className={`text-[9px] font-bold ${isSelected
                            ? 'fill-[#102F3E] underline'
                            : 'fill-[#17202A]'
                          }`}
                      >
                        {site.site}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Site Detail Card */}
            {selectedSite && (
              <div className="p-3 rounded-[2px] border border-border bg-muted/50 dark:bg-[#192028] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-sm text-foreground truncate">
                      {selectedSite.site} Field
                    </span>

                    <Badge
                      className={`${selectedSite.badgeColor} font-bold text-xs px-2 py-0.5 rounded-[2px] border-none shrink-0`}
                    >
                      {selectedSite.riskLevel}
                    </Badge>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-7 text-xs text-muted-foreground hover:text-[#C92925] rounded-[2px] shrink-0"
                  >
                    <Link
                      href={`/reports?site=${encodeURIComponent(
                        selectedSite.site
                      )}`}
                    >
                      View Site Reports
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs pt-1.5 border-t border-border">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Total Reports</span>
                    <span className="font-semibold text-foreground">{selectedSite.reports}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">SIF Precursors</span>
                    <span className="font-semibold text-[#C92925]">
                      {selectedSite.sifCount} ({selectedSite.density.toFixed(1)}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Top Precursor</span>
                    <span className="font-medium text-foreground truncate block">{selectedSite.topPrecursor}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Grid View of all operational sites */
          <div className="space-y-2.5">
            {OPERATIONAL_SITES.map((site) => (
              <div
                key={site.site}
                className="p-3 rounded-[2px] border border-[#D9DDE0] bg-[#F3F2EE] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#102F3E]/40 transition-colors text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#102F3E]">
                      {site.site}
                    </span>

                    <Badge
                      className={`${site.badgeColor} font-bold text-[10px] px-1.5 py-0.5 rounded-[2px] border-none`}
                    >
                      {site.riskLevel}
                    </Badge>
                  </div>

                  <div className="text-[#667085] text-[11px] flex flex-wrap gap-x-3 gap-y-0.5">
                    <span>
                      Reports:{' '}
                      <strong className="text-[#102F3E]">
                        {site.reports}
                      </strong>
                    </span>

                    <span>
                      SIF:{' '}
                      <strong className="text-[#C92925]">
                        {site.sifCount}
                      </strong>{' '}
                      ({site.density.toFixed(1)}%)
                    </span>

                    <span>
                      Top Precursor:{' '}
                      <strong className="text-[#17202A]">
                        {site.topPrecursor}
                      </strong>
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-7 text-xs text-muted-foreground hover:text-[#C92925] rounded-[2px] shrink-0"
                >
                  <Link
                    href={`/reports?site=${encodeURIComponent(
                      site.site
                    )}`}
                  >
                    View Site Reports
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Legend Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-border text-xs text-muted-foreground">
          <span>Risk Level:</span>
          <div className="flex flex-wrap items-center gap-3 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-[1px] bg-[#C92925]" />
              HIGH (&ge;35%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-[1px] bg-[#D97706]" />
              MODERATE (20-34%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-[1px] bg-[#2E7D32]" />
              LOW (&lt;20%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}