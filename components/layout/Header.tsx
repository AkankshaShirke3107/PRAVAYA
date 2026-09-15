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
    <header className="sticky top-0 z-30 flex flex-col border-b border-border bg-card transition-colors">
      {/* Top Banner Row */}
      <div className="flex items-center justify-between px-4 py-2.5 lg:px-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
            title="Toggle navigation sidebar"
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-3">
            {/* OIL Brand Mark */}
            <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-[#102F3E] text-white font-bold text-xs border-l-2 border-[#C92925] shrink-0">
              OIL
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold tracking-tight text-foreground sm:text-base leading-tight">
                  PRAVAYA — HSE Intelligence
                </h1>
                {/* Operational status dot — replaces AI Active badge */}
                <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32]" />
                  Live
                </span>
              </div>

              <p className="hidden text-[11px] text-muted-foreground sm:block leading-tight mt-0.5">
                AI-Powered SIF Precursor Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Theme Switch */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Toggle light/dark mode"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#C92925]" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80 p-2 border-border bg-card shadow-md rounded-[2px]"
            >
              <DropdownMenuLabel className="text-xs font-semibold text-foreground uppercase tracking-wider">
                SIF Precursor Alerts
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-border" />

              <div className="space-y-2 py-1">
                {/* High Alert */}
                <div className="rounded-[2px] border border-[#C92925]/25 bg-[#C92925]/5 dark:bg-[#C92925]/10 p-2.5 text-xs">
                  <div className="font-semibold text-[#C92925] flex items-center justify-between gap-2">
                    <span className="font-mono">OIL-UA-2026-1042</span>
                    <Badge variant="high" className="text-[10px] py-0">
                      High SIF · 94%
                    </Badge>
                  </div>
                  <p className="text-[11px] text-foreground/80 mt-1 leading-snug">
                    Moran Platform: Bypassing high-pressure interlock without MoC.
                  </p>
                </div>

                {/* Medium Alert */}
                <div className="rounded-[2px] border border-[#D97706]/25 bg-[#D97706]/5 dark:bg-[#D97706]/10 p-2.5 text-xs">
                  <div className="font-semibold text-[#D97706] flex items-center justify-between gap-2">
                    <span className="font-mono">OIL-NM-2026-1014</span>
                    <Badge variant="medium" className="text-[10px] py-0">
                      Med SIF · 87%
                    </Badge>
                  </div>
                  <p className="text-[11px] text-foreground/80 mt-1 leading-snug">
                    Duliajan: Hydrostatic hose whip-check safety cable unfastened.
                  </p>
                </div>
              </div>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem asChild>
                <Link
                  href="/reports?sif=High"
                  className="w-full text-center text-xs font-semibold text-foreground hover:text-[#C92925] cursor-pointer justify-center"
                >
                  View All Active Alerts
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2.5 pl-3 border-l border-border hover:opacity-80 focus:outline-none transition-opacity">
                <div className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-[#102F3E] text-xs font-bold text-white dark:bg-[#2F6B84]">
                  HO
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

            <DropdownMenuContent
              align="end"
              className="w-52 p-2 border-border bg-card shadow-md rounded-[2px]"
            >
              <DropdownMenuLabel className="font-semibold text-xs text-foreground uppercase tracking-wider">
                Oil India HSE Profile
              </DropdownMenuLabel>

              <div className="px-2 py-1.5 text-xs text-muted-foreground space-y-0.5">
                <p className="font-medium text-foreground">Officer ID: OIL-HSE-4029</p>
                <p>Division: Corporate HSE Cell</p>
                <p className="font-mono text-[11px] font-semibold text-[#102F3E] dark:text-[#60C0D8]">
                  Oil India Limited
                </p>
              </div>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="text-xs cursor-pointer font-medium text-foreground">
                  Overview
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/compliance" className="text-xs cursor-pointer font-medium text-foreground">
                  OISD / OSHA Compliance
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/guidelines" className="text-xs cursor-pointer font-medium text-foreground">
                  Safety Guidelines
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/settings" className="text-xs cursor-pointer font-medium text-foreground">
                  System Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem
                className="text-xs text-[#C92925] cursor-pointer"
                onClick={() => {
                  toast.info('HSE Officer Session Active', {
                    description:
                      'Authenticated under Oil India Limited Safety Net · SIH26165',
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
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 lg:px-6 bg-muted/60 dark:bg-muted/40 border-b border-border">
        {/* Search */}
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search reports, hazards, sites..."
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range */}
          <div className="flex items-center space-x-1.5 rounded-[2px] border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-foreground/70" />
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
              <SelectTrigger className="h-8 text-xs bg-card border-border text-foreground rounded-[2px]">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border rounded-[2px]">
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
              <SelectTrigger className="h-8 text-xs bg-card border-border text-foreground rounded-[2px]">
                <SelectValue placeholder="Select Dept" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border rounded-[2px]">
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept} className="text-xs">
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Button */}
          <Button
            size="sm"
            className="h-8 px-3 gap-1.5"
            onClick={() => setIsFilterActive(!isFilterActive)}
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>

          {/* Reset */}
          {(filters.searchQuery ||
            filters.site !== 'All Sites' ||
            filters.department !== 'All Departments') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetFilters();
                  toast.info('Filters Reset', {
                    description: 'All filters cleared to defaults.',
                  });
                }}
                className="h-8 px-2.5 text-xs"
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