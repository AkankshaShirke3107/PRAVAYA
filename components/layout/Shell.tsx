'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs';
import { ReportInsightModal } from '@/components/dashboard/ReportInsightModal';
import { ReportDetailDrawer } from '@/components/dashboard/ReportDetailDrawer';

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
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        <Header onToggleSidebar={handleToggleSidebar} />

        <main className="flex-1 p-3.5 sm:p-5 md:p-6 bg-[#f8fafc] dark:bg-[#060913]/60 min-h-[calc(100vh-112px)] animate-in fade-in-50 duration-300 slide-in-from-bottom-1">
          <Breadcrumbs />
          {children}
        </main>

        {/* Global Report Insight Modal */}
        <ReportInsightModal />

        {/* Global Right-Side Report Detail Drawer */}
        <ReportDetailDrawer />

        {/* Enterprise Compliance Footer */}
        <footer className="border-t border-[#D9DDE0] dark:border-border py-3 px-6 text-[10px] text-[#667085] dark:text-slate-400 bg-white/80 dark:bg-card/40 flex flex-col lg:flex-row items-center justify-between gap-2 text-center lg:text-left">
          <div>
            <span>
              SIF Precursor Detection is AI-generated and requires expert
              validation. Adheres to OISD/OSHA standards.
            </span>
          </div>

          <div className="font-mono text-[10px] text-[#0ea5e9] font-medium">
            Smart India Hackathon 2026 • Oil India Limited (SIH26165)
          </div>

          <div>
            Data source: Demonstration HSE dataset | Screening model: SIF
            Classification Engine v1.2
          </div>

          <div>
            Figures shown are for prototype demonstration and are not OIL
            operational statistics.
          </div>
        </footer>
      </div>
    </div>
  );
}