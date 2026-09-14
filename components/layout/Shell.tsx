'use client';

import React, { useState, Suspense } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs';
import { ReportInsightModal } from '@/components/dashboard/ReportInsightModal';
import { ReportDetailDrawer } from '@/components/dashboard/ReportDetailDrawer';

export function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tabletCollapsed, setTabletCollapsed] = useState(false);

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
      <Suspense fallback={<div className="w-64 border-r border-[#D9DDE0] bg-white hidden lg:block" />}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          tabletCollapsed={tabletCollapsed}
          onToggleTablet={() => setTabletCollapsed((prev) => !prev)}
        />
      </Suspense>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        <Header onToggleSidebar={handleToggleSidebar} />

        <main className="flex-1 p-3.5 sm:p-5 md:p-6 bg-background min-h-[calc(100vh-104px)]">
          <Breadcrumbs />
          {children}
        </main>

        {/* Global Modals */}
        <ReportInsightModal />
        <ReportDetailDrawer />

        {/* Footer */}
        <footer className="border-t border-border py-2.5 px-6 text-[10px] text-muted-foreground bg-card flex flex-col lg:flex-row items-center justify-between gap-1.5 text-center lg:text-left">
          <div>
            <span>
              SIF Precursor Detection requires expert HSE validation. Adheres to OISD/OSHA standards.
            </span>
          </div>

          <div className="font-mono text-[10px] text-muted-foreground font-medium">
            Smart India Hackathon 2026 · Oil India Limited (SIH26165)
          </div>

          <div>
            Data: Demonstration HSE dataset · Model: SIF Classification Engine v1.2
          </div>
        </footer>
      </div>
    </div>
  );
}