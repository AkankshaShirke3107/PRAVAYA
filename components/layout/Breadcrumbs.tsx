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
    <nav className="flex items-center space-x-1.5 text-xs text-[#667085] pb-3 mb-4 border-b border-[#D9DDE0]" aria-label="Breadcrumb">
      <Link href="/dashboard" className="flex items-center text-[#667085] hover:text-[#102F3E] transition-colors">
        <Home className="h-3.5 w-3.5 mr-1 text-[#102F3E]" />
        <span className="font-medium">Home</span>
      </Link>

      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const formattedName = routeNames[segment] || segment.toUpperCase();

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3.5 w-3.5 text-[#667085] shrink-0" />
            {isLast ? (
              <span className="font-bold text-[#102F3E] bg-white border border-[#D9DDE0] px-2 py-0.5 rounded-[2px] text-[11px]">
                {formattedName}
              </span>
            ) : (
              <Link href={href} className="text-[#667085] hover:text-[#17202A] transition-colors font-medium">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
