'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  TrendingUp,
  Flame,
  ShieldCheck,
  Settings,
  LogOut,
  HelpCircle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
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
  badge?: string;
  badgeColor?: string;
}

export function Sidebar({ isOpen, onClose, tabletCollapsed }: SidebarProps) {
  const pathname = usePathname();

  // Primary 4 navigation items requested by the user
  const primaryNavItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'SIF Reports',
      href: '/reports',
      icon: FileText,
      badge: '75',
      badgeColor: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
    },
    {
      name: 'Report Analyzer',
      href: '/analyzer',
      icon: Sparkles,
      badge: 'Live AI',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    {
      name: 'Patterns & Trends',
      href: '/patterns',
      icon: TrendingUp,
      badge: '5×5 Matrix',
      badgeColor: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
    },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      name: 'OISD / OSHA Compliance',
      href: '/compliance',
      icon: ShieldCheck,
      badge: 'Audit Ready',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    {
      name: 'System Settings',
      href: '/settings',
      icon: Settings,
    },
    {
      name: 'Safety Guidelines',
      href: '/guidelines',
      icon: HelpCircle,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-[#090e1a] text-slate-200 transition-all duration-200 ease-in-out border-slate-800/80 shadow-xl',
          // Mobile (< 768px): slide-in drawer
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // Tablet (768px - 1024px): stays visible but can collapse
          tabletCollapsed
            ? 'md:-translate-x-full md:hidden'
            : 'md:static md:translate-x-0 md:flex',
          // Desktop (> 1024px): always visible
          'lg:static lg:translate-x-0 lg:flex'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-slate-800/80 bg-[#070b15]">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            {/* Industrial Flame / Emblem Icon */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-600 via-rose-600 to-sky-500 shadow-md p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#090e1a]">
                <Flame className="h-5 w-5 text-amber-500 fill-amber-500/20 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-xs tracking-wider text-white uppercase font-mono">
                  OIL INDIA
                </span>
                <span className="text-[10px] text-amber-400 font-semibold px-1 rounded bg-amber-500/10 border border-amber-500/20 font-mono">
                  SIH26165
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-tight">
                HSE Monitoring Engine
              </span>
            </div>
          </Link>

          {/* Close button on mobile & tablet */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {/* Primary Operations Modules */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Core Modules
            </div>
            <nav className="space-y-1">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={cn(
                          'h-4 w-4 transition-colors',
                          isActive
                            ? 'text-sky-400'
                            : 'text-slate-400 group-hover:text-slate-200'
                        )}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          'ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold',
                          item.badgeColor
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Secondary System Items */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              System &amp; Standards
            </div>
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={cn(
                          'h-4 w-4 transition-colors',
                          isActive
                            ? 'text-sky-400'
                            : 'text-slate-400 group-hover:text-slate-200'
                        )}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          'ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold',
                          item.badgeColor
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Profile Section at Bottom of Sidebar */}
        <div className="border-t border-slate-800/80 bg-[#070b15] p-3">
          <div className="flex items-center justify-between rounded-lg bg-slate-900/90 p-2.5 border border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-sky-600 to-teal-500 text-xs font-bold text-white shadow-sm ring-1 ring-white/10">
                  HO
                </div>
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-[#070b15]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white leading-tight">
                  HSE Officer
                </span>
                <span className="text-[10px] text-slate-400">
                  Safety Analyst (OIL)
                </span>
              </div>
            </div>
            <button
              title="Logout session"
              onClick={() => {
                toast.info('HSE Active Session', {
                  description: 'Logged in as HSE Officer • Oil India Limited (SIH26165)',
                });
              }}
              className="text-slate-400 hover:text-sky-400 transition-colors p-1"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 text-[9px] text-slate-400 text-center flex items-center justify-center gap-1 font-mono">
            <span>Oil India Limited</span>
            <span>•</span>
            <span className="text-sky-400 font-semibold">SIH26165</span>
          </div>
        </div>
      </aside>
    </>
  );
}
