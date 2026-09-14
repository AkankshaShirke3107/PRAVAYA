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
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border bg-card text-foreground transition-all duration-200 ease-in-out',

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
        <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-border">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2.5 group"
            onClick={onClose}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-[#102F3E] text-white font-bold text-xs border-l-2 border-[#C92925] shrink-0 dark:bg-[#1A3A4A] dark:border-[#C92925]">
              <Building2 className="h-4 w-4 text-white" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs tracking-tight text-foreground leading-tight truncate">
                OIL INDIA LIMITED
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                Enterprise HSE Platform
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-[2px] text-muted-foreground hover:text-foreground hover:bg-muted"
            title="Close navigation"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="px-2 mb-1.5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                {section.title}
              </div>

              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = checkIsActive(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center justify-between rounded-[2px] px-2.5 py-1.5 text-xs font-medium transition-colors group',
                        isActive
                          ? 'bg-[#102F3E]/10 text-[#102F3E] font-semibold border-l-2 border-[#102F3E] dark:bg-[#1E3A4A]/60 dark:text-[#D4EAF4] dark:border-[#337E99]'
                          : 'text-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon
                          className={cn(
                            'h-3.5 w-3.5 shrink-0',
                            isActive
                              ? 'text-[#102F3E] dark:text-[#D4EAF4]'
                              : 'text-muted-foreground group-hover:text-foreground'
                          )}
                        />
                        <span>{item.name}</span>
                      </div>

                      {item.count && (
                        <span className="rounded-[2px] bg-muted border border-border px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground dark:bg-[#1A2A38] dark:text-[#9BB8C8] dark:border-[#2A3545]">
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
        <div className="border-t border-border bg-muted/40 p-3">
          <div className="flex items-center justify-between rounded-[2px] bg-card p-2 border border-border">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-[2px] bg-[#102F3E] text-[10px] font-bold text-white dark:bg-[#1E3A4A]">
                HO
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground leading-tight">
                  HSE Officer
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Safety Cell (OIL)
                </span>
              </div>
            </div>

            <button
              title="Session info"
              type="button"
              onClick={() => {
                toast.info('Oil India Session Active', {
                  description:
                    'Logged in as HSE Officer · Corporate Safety Net',
                });
              }}
              className="text-muted-foreground hover:text-[#C92925] transition-colors p-1 rounded-[2px]"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}