'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useSafetyStore } from '@/lib/store';
import { SafetyReport } from '@/types';
import { ReportInsightModal } from '@/components/dashboard/ReportInsightModal';

export function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tabletCollapsed, setTabletCollapsed] = useState(false);

  // Responsive sidebar toggler for mobile & tablet
  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen((prev) => !prev);
    } else {
      setTabletCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar (Mobile drawer & Tablet collapsible) */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        tabletCollapsed={tabletCollapsed}
        onToggleTablet={() => setTabletCollapsed((prev) => !prev)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 bg-[#f8fafc] dark:bg-[#060913]/60 min-h-[calc(100vh-112px)] animate-in fade-in-50 duration-300 slide-in-from-bottom-1">
          {children}
        </main>

        {/* Global Report Insight Modal / Drawer */}
        <ReportInsightModal />

        {/* Mandatory OISD/OSHA footer compliance note from reference screenshot */}
        <footer className="border-t border-[#e2e8f0] dark:border-border py-3 px-6 text-center text-xs text-[#64748b] dark:text-muted-foreground bg-white/80 dark:bg-card/40 flex flex-wrap items-center justify-between gap-2">
          <span>
            SIF Precursor Detection is AI-generated and requires expert validation. Adheres to OISD/OSHA standards.
          </span>
          <span className="font-mono text-[11px] text-[#0ea5e9] font-medium">
            Smart India Hackathon 2026 • Oil India Limited (SIH26165)
          </span>
        </footer>
      </div>
    </div>
  );
}
