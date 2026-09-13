'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FileSearch,
  TrendingUp,
  ShieldCheck,
  Settings,
  HelpCircle,
  X,
  Building2,
  LogOut,
  CheckSquare,
  ShieldAlert,
  FileCheck,
  MapPin,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  tabletCollapsed?: boolean;
  onToggleTablet?: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  count?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function Sidebar({
  isOpen,
  onClose,
  tabletCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams?.get('tab');

  const navSections: NavSection[] = [
    {
      title: 'OPERATIONS',
      items: [
        {
          name: 'Overview',
          href: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          name: 'Safety Reports',
          href: '/reports',
          icon: FileText,
          count: '75',
        },
        {
          name: 'SIF Screening',
          href: '/analyzer',
          icon: FileSearch,
        },
        {
          name: 'Risk Patterns',
          href: '/patterns',
          icon: TrendingUp,
        },
        {
          name: 'Corrective Actions',
          href: '/actions',
          icon: CheckSquare,
        },
      ],
    },
    {
      title: 'COMPLIANCE',
      items: [
        {
          name: 'Life-Saving Rules',
          href: '/compliance?tab=lsr',
          icon: ShieldCheck,
        },
        {
          name: 'OISD Compliance',
          href: '/compliance?tab=oisd',
          icon: ShieldAlert,
        },
        {
          name: 'Audit & Standards',
          href: '/compliance?tab=audit',
          icon: FileCheck,
        },
      ],
    },
    {
      title: 'ADMINISTRATION',
      items: [
        {
          name: 'Sites & Assets',
          href: '/settings?tab=sites',
          icon: MapPin,
        },
        {
          name: 'Users & Roles',
          href: '/settings?tab=users',
          icon: Users,
        },
        {
          name: 'System Settings',
          href: '/settings?tab=system',
          icon: Settings,
        },
      ],
    },
  ];

  const checkIsActive = (href: string) => {
    const [path, query] = href.split('?');

    if (query) {
      const targetTab = new URLSearchParams(query).get('tab');

      return pathname === path && currentTab === targetTab;
    }

    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }

    if (path === '/settings' && !query && !currentTab) {
      return pathname === '/settings';
    }

    if (path === '/compliance' && !query && !currentTab) {
      return pathname === '/compliance';
    }

    return (
      pathname === path ||
      (path !== '/dashboard' &&
        pathname?.startsWith(path) &&
        !currentTab)
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#D9DDE0] bg-white text-[#17202A] transition-all duration-200 ease-in-out shadow-none',

          // Mobile
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full',

          // Tablet
          tabletCollapsed
            ? 'md:-translate-x-full md:hidden'
            : 'md:static md:translate-x-0 md:flex',

          // Desktop
          'lg:static lg:translate-x-0 lg:flex'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-[#D9DDE0] bg-white">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 group"
            onClick={onClose}
          >
            {/* Oil India Enterprise Emblem */}
            <div className="flex h-9 w-9 items-center justify-center rounded-[2px] bg-[#102F3E] text-white font-extrabold text-xs shadow-none border-l-2 border-[#C92925]">
              <Building2 className="h-5 w-5 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-[#102F3E]">
                OIL INDIA LIMITED
              </span>

              <span className="text-[10px] text-[#667085] font-medium">
                Enterprise HSE Platform
              </span>
            </div>
          </Link>

          {/* Close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-[2px] text-[#667085] hover:text-[#102F3E] hover:bg-[#F3F2EE]"
            title="Close navigation"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="px-2 mb-2 text-[10px] font-bold tracking-wider text-[#667085] uppercase">
                {section.title}
              </div>

              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = checkIsActive(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center justify-between rounded-[2px] px-3 py-2 text-xs font-medium transition-colors group',
                        isActive
                          ? 'bg-[#102F3E]/10 text-[#102F3E] font-bold border-l-2 border-[#102F3E]'
                          : 'text-[#17202A] hover:bg-[#F3F2EE] hover:text-[#102F3E]'
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={cn(
                            'h-4 w-4 shrink-0',
                            isActive
                              ? 'text-[#102F3E]'
                              : 'text-[#667085] group-hover:text-[#102F3E]'
                          )}
                        />

                        <span>{item.name}</span>
                      </div>

                      {item.count && (
                        <span className="rounded-[2px] bg-[#F3F2EE] border border-[#D9DDE0] px-1.5 py-0.5 text-[10px] font-semibold text-[#102F3E]">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="border-t border-[#D9DDE0] bg-[#F3F2EE] p-3">
          <div className="flex items-center justify-between rounded-[2px] bg-white p-2.5 border border-[#D9DDE0]">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-[#102F3E] text-xs font-bold text-white">
                HO
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#102F3E] leading-tight">
                  HSE Officer
                </span>

                <span className="text-[10px] text-[#667085]">
                  Safety Cell (OIL)
                </span>
              </div>
            </div>

            <button
              title="Logout session"
              type="button"
              onClick={() => {
                toast.info('Oil India Session Active', {
                  description:
                    'Logged in as HSE Officer • Corporate Safety Net',
                });
              }}
              className="text-[#667085] hover:text-[#C92925] transition-colors p-1 rounded-[2px]"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 text-[10px] text-[#667085] text-center font-medium">
            Oil India Limited • Corporate HSE
          </div>
        </div>
      </aside>
    </>
  );
}