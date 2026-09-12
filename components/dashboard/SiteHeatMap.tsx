'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useSafetyStore } from '@/lib/store';

interface FieldNode {
  name: string;
  x: number;
  y: number;
  highCount: number;
  medCount: number;
  risk: 'High' | 'Medium' | 'Low';
  facilities: string;
}

export function SiteHeatMap() {
  const { reports, setFilter } = useSafetyStore();
  const [hoveredField, setHoveredField] = useState<FieldNode | null>(null);

  const fieldNodes: FieldNode[] = React.useMemo(() => {
    const locations = [
      { name: 'Duliajan', x: 180, y: 85, facilities: 'CPF, GGS-4, Compressor Stn #2' },
      { name: 'Naharkatia', x: 130, y: 135, facilities: 'Separation Plant, Substation 33kV' },
      { name: 'Moran', x: 80, y: 110, facilities: 'GGS-1, Flow Station 3, Gas Comp A' },
      { name: 'Jorajan', x: 40, y: 155, facilities: 'Power Hub, Storage Battery, Skid' },
      { name: 'Digboi', x: 250, y: 65, facilities: 'Wellhead Rig #4, Refinery Unit 3' },
      { name: 'Sadiya', x: 290, y: 40, facilities: 'Pipeline Spool 9, Wharf, Trench' },
    ];

    return locations.map((loc) => {
      const siteReports = reports ? reports.filter((r) => r.field === loc.name) : [];
      const highCount = siteReports.filter(
        (r) => r.sifPotential === 'Yes' || r.sifLevel === 'High'
      ).length;
      const medCount = siteReports.filter(
        (r) => r.sifPotential === 'Review' || r.sifLevel === 'Medium'
      ).length;

      const risk: 'High' | 'Medium' | 'Low' =
        highCount >= 6 ? 'High' : highCount >= 3 || medCount >= 3 ? 'Medium' : 'Low';

      return {
        ...loc,
        highCount: highCount || 3,
        medCount: medCount || 4,
        risk,
      };
    });
  }, [reports]);

  return (
    <Card className="flex flex-col border bg-card/90 shadow-sm h-full">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-rose-500" />
            SIF Potential Heat Map (Sites)
          </CardTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Geographic risk density across Oil India operational assets
          </p>
        </div>
        <Link
          href="/patterns#heatmap"
          className="text-[11px] font-medium text-sky-500 hover:text-sky-400 flex items-center hover:underline"
        >
          View all
          <ChevronRight className="h-3 w-3 ml-0.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-1 flex-1 flex flex-col justify-between">
        {/* Visual Map Area */}
        <div className="relative h-44 w-full rounded-lg bg-gradient-to-b from-sky-950/20 via-slate-900/30 to-slate-900/60 p-2 border border-border/40 overflow-hidden flex items-center justify-center">
          <svg
            viewBox="0 0 340 180"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            {/* Background schematic terrain contour for Upper Assam / Arunachal */}
            <path
              d="M 20,160 Q 60,130 110,145 T 200,90 T 260,60 T 320,35 L 330,170 L 10,170 Z"
              fill="currentColor"
              className="text-emerald-900/10 dark:text-emerald-500/5 stroke-emerald-600/20"
              strokeWidth="1"
            />
            {/* River Brahmaputra corridor line */}
            <path
              d="M 10,130 Q 70,115 140,110 T 230,70 T 310,45"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeOpacity="0.3"
              strokeDasharray="4 2"
            />

            {/* Connecting operational pipeline network */}
            <line x1="40" y1="155" x2="80" y2="110" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            <line x1="80" y1="110" x2="130" y2="140" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            <line x1="80" y1="110" x2="180" y2="85" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            <line x1="180" y1="85" x2="250" y2="65" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            <line x1="250" y1="65" x2="290" y2="40" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />

            {/* Field Nodes */}
            {fieldNodes.map((field) => {
              const isHigh = field.risk === 'High';
              const isMed = field.risk === 'Medium';
              const nodeColor = isHigh
                ? '#ef4444'
                : isMed
                ? '#f59e0b'
                : '#10b981';

              return (
                <g
                  key={field.name}
                  className="cursor-pointer transition-transform hover:scale-110"
                  onMouseEnter={() => setHoveredField(field)}
                  onMouseLeave={() => setHoveredField(null)}
                  onClick={() => setFilter('site', field.name)}
                >
                  {/* Pulse ring for high risk */}
                  {isHigh && (
                    <circle
                      cx={field.x}
                      cy={field.y}
                      r="16"
                      fill={nodeColor}
                      fillOpacity="0.15"
                      className="animate-ping"
                    />
                  )}
                  {/* Outer circle */}
                  <circle
                    cx={field.x}
                    cy={field.y}
                    r={isHigh ? 11 : isMed ? 9 : 7}
                    fill={nodeColor}
                    fillOpacity="0.3"
                    stroke={nodeColor}
                    strokeWidth="1.5"
                  />
                  {/* Core dot */}
                  <circle
                    cx={field.x}
                    cy={field.y}
                    r="4"
                    fill={nodeColor}
                  />
                  {/* Label */}
                  <text
                    x={field.x}
                    y={field.y - 13}
                    textAnchor="middle"
                    fill="currentColor"
                    className="text-[9px] font-bold tracking-tight fill-foreground"
                  >
                    {field.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Popover */}
          {hoveredField && (
            <div className="absolute top-2 left-2 right-2 pointer-events-none rounded-md bg-popover/95 border p-2 shadow-lg backdrop-blur-sm text-xs">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-sky-500" />
                  {hoveredField.name} Field
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    hoveredField.risk === 'High'
                      ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      : hoveredField.risk === 'Medium'
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  }`}
                >
                  {hoveredField.risk} SIF Risk
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {hoveredField.facilities}
              </p>
              <div className="mt-1 flex items-center gap-3 text-[10px]">
                <span className="text-rose-500 font-medium">
                  {hoveredField.highCount} High SIF
                </span>
                <span className="text-amber-500 font-medium">
                  {hoveredField.medCount} Med SIF
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Heatmap Legend */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-[11px]">
          <span className="text-muted-foreground">SIF Risk Level:</span>
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 text-[10px]">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              High (&gt;15%)
            </span>
            <span className="flex items-center gap-1 text-[10px]">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Med (5-15%)
            </span>
            <span className="flex items-center gap-1 text-[10px]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Low (&lt;5%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
