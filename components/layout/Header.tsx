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
    <header className="sticky top-0 z-30 flex flex-col border-b bg-card/95 backdrop-blur-md transition-colors">
      {/* Top Banner Row */}
      <div className="flex items-center justify-between px-4 py-2.5 lg:px-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground touch-manipulation shrink-0"
            title="Toggle navigation sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold tracking-tight text-foreground sm:text-lg flex items-center gap-2">
                SIF Precursor Detection System
                <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-500 border border-sky-500/20">
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-sky-400" />
                  HSE AI Active
                </span>
              </h1>
            </div>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Oil &amp; Gas Industrial Safety Monitoring System • SIH26165
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          {/* Theme switch */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Toggle light/dark mode"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-sky-400" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2">
              <DropdownMenuLabel className="text-xs font-semibold">
                High SIF Precursor Alerts
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 py-1">
                <div className="rounded-md bg-rose-500/10 p-2 border border-rose-500/20 text-xs">
                  <div className="font-semibold text-rose-500 flex items-center justify-between">
                    <span>OIL-UA-2026-1042</span>
                    <Badge variant="high" className="text-[9px] py-0">High SIF (94%)</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Moran Platform: Bypassing high-pressure interlock without MoC.
                  </p>
                </div>
                <div className="rounded-md bg-amber-500/10 p-2 border border-amber-500/20 text-xs">
                  <div className="font-semibold text-amber-500 flex items-center justify-between">
                    <span>OIL-NM-2026-1014</span>
                    <Badge variant="medium" className="text-[9px] py-0">Med SIF (87%)</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Duliajan: Hydrostatic hose whip-check safety cable unfastened.
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/reports?sif=High"
                  className="w-full text-center text-xs font-medium text-sky-500 cursor-pointer justify-center"
                >
                  View All Active Alerts
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Section */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 pl-2 border-l border-border hover:opacity-90 transition-opacity focus:outline-none">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-sky-600 to-teal-500 text-xs font-bold text-white shadow-sm ring-1 ring-white/20">
                    HO
                  </div>
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
                </div>
                <div className="hidden flex-col text-left md:flex">
                  <span className="text-xs font-semibold text-foreground leading-tight">
                    HSE Officer
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Safety Analyst (OIL)
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuLabel className="font-semibold text-xs text-foreground">
                HSE Monitoring Profile
              </DropdownMenuLabel>
              <div className="px-2 py-1.5 text-xs text-muted-foreground space-y-0.5">
                <p className="font-medium text-foreground">Officer ID: OIL-HSE-4029</p>
                <p>Org: Oil India Limited</p>
                <p className="font-mono text-sky-500 text-[11px]">Project: SIH26165</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="text-xs cursor-pointer">
                  Dashboard Overview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/compliance" className="text-xs cursor-pointer">
                  OISD / OSHA Compliance
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/guidelines" className="text-xs cursor-pointer">
                  Safety Guidelines
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="text-xs cursor-pointer">
                  System Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-xs text-rose-500 cursor-pointer"
                onClick={() => {
                  toast.info('HSE Officer Session Active', {
                    description: 'Authenticated under Oil India Limited Safety Net • SIH26165',
                  });
                }}
              >
                Session Active (Secure)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filter Bar (Second Row matching mockup) */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2 lg:px-6 bg-muted/20">
        {/* Search input */}
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search reports, hazards, sites..."
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            className="pl-8 h-8 text-xs bg-background/80"
          />
        </div>

        {/* Filters cluster */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date range picker representation */}
          <div className="flex items-center space-x-1.5 rounded-md border border-input bg-background/80 px-2.5 py-1 text-xs text-muted-foreground shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-sky-500" />
            <span className="font-medium text-foreground text-[11px]">
              01 May 2026 – 28 May 2026
            </span>
          </div>

          {/* Site Selector */}
          <div className="w-[130px]">
            <Select
              value={filters.site}
              onValueChange={(val) => setFilter('site', val)}
            >
              <SelectTrigger className="h-8 text-xs bg-background/80">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>
              <SelectContent>
                {sites.map((site) => (
                  <SelectItem key={site} value={site} className="text-xs">
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
              onValueChange={(val) => setFilter('department', val)}
            >
              <SelectTrigger className="h-8 text-xs bg-background/80">
                <SelectValue placeholder="Select Dept" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept} className="text-xs">
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter button */}
          <Button
            size="sm"
            className="h-8 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3 shadow-sm gap-1.5"
            onClick={() => setIsFilterActive(!isFilterActive)}
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>

          {(filters.searchQuery ||
            filters.site !== 'All Sites' ||
            filters.department !== 'All Departments') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetFilters();
                toast.info('Filters Reset', {
                  description: 'Header site and department filters cleared to defaults.',
                });
              }}
              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
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
