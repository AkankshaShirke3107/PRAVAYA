'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const routeNames: Record<string, string> = {
  dashboard: 'Overview',
  reports: 'Safety Reports',
  analyzer: 'SIF Screening',
  patterns: 'Risk Patterns',
  actions: 'Corrective Actions',
  compliance: 'Compliance',
  guidelines: 'Safety Guidelines',
  settings: 'System Settings',
  analysis: 'Precursor Analysis',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];

  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-muted-foreground pb-3 mb-4 border-b border-border" aria-label="Breadcrumb">
      <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
        <Home className="h-3.5 w-3.5 mr-1 text-foreground/70" />
        <span className="font-medium">Home</span>
      </Link>

      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const formattedName = routeNames[segment] || segment.toUpperCase();

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
            {isLast ? (
              <span className="font-bold text-foreground bg-muted border border-border px-2 py-0.5 rounded-[2px] text-[11px]">
                {formattedName}
              </span>
            ) : (
              <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
