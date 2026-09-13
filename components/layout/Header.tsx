'use client';

import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Filter,
  Bell,
  Sun,
  Moon,
  Menu,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import { useSafetyStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { GeometricAccent } from '@/components/ui/geometric-accent';
import Link from 'next/link';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { filters, setFilter, resetFilters } = useSafetyStore();
  const [isFilterActive, setIsFilterActive] = useState(false);

  const sites = [
    'All Sites',
    'Duliajan',
    'Naharkatia',
    'Moran',
    'Jorajan',
    'Digboi',
    'Sadiya',
  ];

  const departments = [
    'All Departments',
    'Drilling',
    'Production',
    'Pipeline',
    'Maintenance',
    'Electrical',
    'Workover',
  ];

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-[#D9DDE0] bg-white transition-colors dark:bg-[#0B1117] dark:border-[#26333D]">
      {/* Top Banner Row */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 border-b border-[#D9DDE0] dark:border-[#26333D]">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden h-8 w-8 text-[#667085] hover:text-[#102F3E] shrink-0 rounded-[2px]"
            title="Toggle navigation sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-3">
            {/* OIL Brand Mark */}
            <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-[#102F3E] text-white font-bold text-xs shadow-none border-l-2 border-[#C92925]">
              OIL
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-base font-extrabold tracking-tight text-[#102F3E] dark:text-white sm:text-lg flex items-center gap-2">
                  OIL INDIA | HSE MONITORING

                  <span className="hidden sm:inline-flex items-center rounded-[2px] bg-[#2F6B84]/10 px-2 py-0.5 text-[9px] font-bold text-[#2F6B84] border border-[#2F6B84]/20 uppercase tracking-wide">
                    <Sparkles className="w-2.5 h-2.5 mr-1" />
                    AI Active
                  </span>
                </h1>

                <GeometricAccent />
              </div>

              <p className="hidden text-xs text-[#667085] dark:text-slate-400 sm:block font-medium">
                Oil India Limited • Corporate Safety Incident &amp; SIF Precursor Monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme Switch */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }
            className="h-8 w-8 text-[#667085] hover:text-[#102F3E] hover:bg-[#F3F2EE] dark:hover:bg-[#17232D] rounded-[2px]"
            title="Toggle light/dark mode"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[#D97706]" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[#2F6B84]" />
            <span className="sr-only">
              Toggle theme
            </span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 text-[#667085] hover:text-[#102F3E] hover:bg-[#F3F2EE] dark:hover:bg-[#17232D] rounded-[2px]"
              >
                <Bell className="h-4 w-4" />

                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#C92925]" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80 p-2 border-[#D9DDE0] bg-white dark:bg-[#101820] dark:border-[#26333D] shadow-md rounded-[2px]"
            >
              <DropdownMenuLabel className="text-xs font-bold text-[#102F3E] dark:text-white uppercase tracking-wider">
                SIF Precursor Alerts
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-[#D9DDE0]" />

              <div className="space-y-2 py-1">
                {/* High Alert */}
                <div className="rounded-[2px] border border-[#C92925]/30 bg-[#C92925]/5 p-2 text-xs">
                  <div className="font-semibold text-[#C92925] flex items-center justify-between gap-2">
                    <span>OIL-UA-2026-1042</span>

                    <Badge
                      variant="high"
                      className="text-[10px] py-0"
                    >
                      High SIF (94%)
                    </Badge>
                  </div>

                  <p className="text-[11px] text-[#17202A] dark:text-slate-300 mt-0.5">
                    Moran Platform: Bypassing high-pressure interlock without MoC.
                  </p>
                </div>

                {/* Medium Alert */}
                <div className="rounded-[2px] border border-[#D97706]/30 bg-[#D97706]/5 p-2 text-xs">
                  <div className="font-semibold text-[#D97706] flex items-center justify-between gap-2">
                    <span>OIL-NM-2026-1014</span>

                    <Badge
                      variant="medium"
                      className="text-[10px] py-0"
                    >
                      Med SIF (87%)
                    </Badge>
                  </div>

                  <p className="text-[11px] text-[#17202A] dark:text-slate-300 mt-0.5">
                    Duliajan: Hydrostatic hose whip-check safety cable unfastened.
                  </p>
                </div>
              </div>

              <DropdownMenuSeparator className="bg-[#D9DDE0]" />

              <DropdownMenuItem asChild>
                <Link
                  href="/reports?sif=High"
                  className="w-full text-center text-xs font-semibold text-[#102F3E] dark:text-white hover:text-[#C92925] cursor-pointer justify-center"
                >
                  View All Active Alerts
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2.5 pl-3 border-l border-[#D9DDE0] dark:border-[#26333D] hover:opacity-90 focus:outline-none">
                <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-[#102F3E] text-xs font-bold text-white shadow-none">
                  HO
                </div>

                <div className="hidden flex-col text-left md:flex">
                  <span className="text-xs font-bold text-[#102F3E] dark:text-white leading-tight">
                    HSE Officer
                  </span>

                  <span className="text-[10px] text-[#667085] dark:text-slate-400">
                    Safety Analyst (OIL)
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 p-2 border-[#D9DDE0] bg-white dark:bg-[#101820] dark:border-[#26333D] shadow-md rounded-[2px]"
            >
              <DropdownMenuLabel className="font-bold text-xs text-[#102F3E] dark:text-white uppercase tracking-wider">
                Oil India HSE Profile
              </DropdownMenuLabel>

              <div className="px-2 py-1 text-xs text-[#667085] dark:text-slate-400 space-y-0.5">
                <p className="font-medium text-[#17202A] dark:text-white">
                  Officer ID: OIL-HSE-4029
                </p>

                <p>Division: Corporate HSE Cell</p>

                <p className="font-mono text-[#102F3E] dark:text-[#2F6B84] text-[11px] font-bold">
                  Oil India Limited
                </p>
              </div>

              <DropdownMenuSeparator className="bg-[#D9DDE0]" />

              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard"
                  className="text-xs cursor-pointer font-medium text-[#17202A] dark:text-slate-200 hover:text-[#102F3E]"
                >
                  Overview
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/compliance"
                  className="text-xs cursor-pointer font-medium text-[#17202A] dark:text-slate-200 hover:text-[#102F3E]"
                >
                  OISD / OSHA Compliance
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/guidelines"
                  className="text-xs cursor-pointer font-medium text-[#17202A] dark:text-slate-200 hover:text-[#102F3E]"
                >
                  Safety Guidelines
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="text-xs cursor-pointer font-medium text-[#17202A] dark:text-slate-200 hover:text-[#102F3E]"
                >
                  System Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#D9DDE0]" />

              <DropdownMenuItem
                className="text-xs text-[#C92925] cursor-pointer"
                onClick={() => {
                  toast.info('HSE Officer Session Active', {
                    description:
                      'Authenticated under Oil India Limited Safety Net • SIH26165',
                  });
                }}
              >
                Session Active (Secure)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 lg:px-6 bg-[#F3F2EE] dark:bg-[#101820] border-b border-[#D9DDE0] dark:border-[#26333D]">
        {/* Search */}
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#667085]" />

          <Input
            placeholder="Search reports, hazards, asset sites..."
            value={filters.searchQuery}
            onChange={(e) =>
              setFilter(
                'searchQuery',
                e.target.value
              )
            }
            className="pl-8 h-8 text-xs bg-white dark:bg-[#0B1117] border-[#D9DDE0] dark:border-[#26333D] text-[#17202A] dark:text-white rounded-[2px] focus:border-[#102F3E]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range */}
          <div className="flex items-center space-x-1.5 rounded-[2px] border border-[#D9DDE0] dark:border-[#26333D] bg-white dark:bg-[#0B1117] px-2.5 py-1 text-xs text-[#667085] shadow-none">
            <Calendar className="h-3.5 w-3.5 text-[#102F3E] dark:text-[#2F6B84]" />

            <span className="font-semibold text-[#102F3E] dark:text-white text-[11px]">
              01 May 2026 – 28 May 2026
            </span>
          </div>

          {/* Site Selector */}
          <div className="w-[130px]">
            <Select
              value={filters.site}
              onValueChange={(val) =>
                setFilter('site', val)
              }
            >
              <SelectTrigger className="h-8 text-xs bg-white dark:bg-[#0B1117] border-[#D9DDE0] dark:border-[#26333D] text-[#17202A] dark:text-white rounded-[2px]">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>

              <SelectContent className="bg-white dark:bg-[#101820] border-[#D9DDE0] dark:border-[#26333D] rounded-[2px]">
                {sites.map((site) => (
                  <SelectItem
                    key={site}
                    value={site}
                    className="text-xs"
                  >
                    {site}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department Selector */}
          <div className="w-[145px]">
            <Select
              value={filters.department}
              onValueChange={(val) =>
                setFilter('department', val)
              }
            >
              <SelectTrigger className="h-8 text-xs bg-white dark:bg-[#0B1117] border-[#D9DDE0] dark:border-[#26333D] text-[#17202A] dark:text-white rounded-[2px]">
                <SelectValue placeholder="Select Dept" />
              </SelectTrigger>

              <SelectContent className="bg-white dark:bg-[#101820] border-[#D9DDE0] dark:border-[#26333D] rounded-[2px]">
                {departments.map((dept) => (
                  <SelectItem
                    key={dept}
                    value={dept}
                    className="text-xs"
                  >
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Button */}
          <Button
            size="sm"
            className="h-8 bg-[#102F3E] hover:bg-[#082735] text-white font-semibold text-xs px-3 shadow-none gap-1.5 rounded-[2px]"
            onClick={() =>
              setIsFilterActive(
                !isFilterActive
              )
            }
          >
            <Filter className="h-3.5 w-3.5" />
            Apply Filter
          </Button>

          {/* Reset */}
          {(filters.searchQuery ||
            filters.site !== 'All Sites' ||
            filters.department !==
            'All Departments') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetFilters();

                  toast.info('Filters Reset', {
                    description:
                      'Header site and department filters cleared to defaults.',
                  });
                }}
                className="h-8 px-2.5 text-xs border-[#D9DDE0] dark:border-[#26333D] text-[#667085] hover:text-[#17202A] dark:hover:text-white rounded-[2px]"
                title="Reset Filters"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
            )}
        </div>
      </div>
    </header>
  );
}