'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  CheckSquare,
  AlertTriangle,
  Filter,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSafetyStore } from '@/lib/store';
import { toast } from 'sonner';

const dateRangeOptions = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Custom range', value: 'custom' },
];

const siteOptions = [
  'All Sites',
  'Duliajan',
  'Naharkatia',
  'Moran',
  'Jorajan',
  'Digboi',
  'Sadiya',
];

const reportTypeOptions = [
  { label: 'Unsafe Act', value: 'Unsafe Act' },
  { label: 'Unsafe Condition', value: 'Unsafe Condition' },
  { label: 'Near Miss', value: 'Near Miss' },
];

const riskLevelOptions = [
  { label: 'All Levels', value: 'All Levels', color: null },
  { label: 'High', value: 'High', color: 'bg-[#C92925]' },
  { label: 'Medium', value: 'Medium', color: 'bg-[#D97706]' },
  { label: 'Low', value: 'Low', color: 'bg-[#2E7D32]' },
];

export function DashboardFilterBar() {
  const { setFilter, resetFilters } = useSafetyStore();

  // Local filter states
  const [dateRange, setDateRange] = useState<string>('30d');
  const [customStartDate, setCustomStartDate] =
    useState<string>('2026-05-01');
  const [customEndDate, setCustomEndDate] =
    useState<string>('2026-05-28');

  const [site, setSite] = useState<string>('All Sites');

  const [selectedReportTypes, setSelectedReportTypes] = useState<string[]>([
    'Unsafe Act',
    'Unsafe Condition',
    'Near Miss',
  ]);

  const [riskLevel, setRiskLevel] = useState<string>('All Levels');
  const [appliedCount, setAppliedCount] = useState<number>(0);

  // Toggle report type checkbox
  const handleToggleReportType = (typeValue: string) => {
    setSelectedReportTypes((prev) => {
      if (prev.includes(typeValue)) {
        // Prevent unselecting all report types
        if (prev.length === 1) {
          toast.info('At least one report type must remain selected');
          return prev;
        }

        return prev.filter((t) => t !== typeValue);
      }

      return [...prev, typeValue];
    });
  };

  // Handle Apply Filters
  const handleApply = () => {
    // Update store filters
    setFilter('site', site);

    setFilter(
      'sifLevel',
      riskLevel === 'All Levels' ? 'All SIF Levels' : riskLevel
    );

    // Compute active filter count
    let count = 0;

    if (dateRange !== '30d') {
      count++;
    }

    if (site !== 'All Sites') {
      count++;
    }

    if (selectedReportTypes.length < 3) {
      count++;
    }

    if (riskLevel !== 'All Levels') {
      count++;
    }

    setAppliedCount(count);

    toast.success('Filters applied successfully', {
      description: `${site} • ${riskLevel} • ${selectedReportTypes.length} types`,
    });
  };

  // Handle Reset Filters
  const handleReset = () => {
    setDateRange('30d');
    setCustomStartDate('2026-05-01');
    setCustomEndDate('2026-05-28');

    setSite('All Sites');

    setSelectedReportTypes([
      'Unsafe Act',
      'Unsafe Condition',
      'Near Miss',
    ]);

    setRiskLevel('All Levels');
    setAppliedCount(0);

    resetFilters();

    toast.info('Filters reset to default');
  };

  return (
    <div className="rounded-[2px] border border-[#D9DDE0] bg-white p-3.5 shadow-none space-y-3">
      {/* Horizontal row of filter controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">

          {/* 1. Date Range Picker Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#667085] flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-[#102F3E]" />
              <span className="hidden sm:inline">Range:</span>
            </span>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="h-8 min-w-[130px] sm:min-w-[145px] text-xs font-medium bg-white border-[#D9DDE0] rounded-[2px] text-[#17202A]">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>

              <SelectContent className="bg-white border-[#D9DDE0] rounded-[2px]">
                {dateRangeOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-xs"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 2. Site / Location Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#667085] flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[#102F3E]" />
              <span className="hidden sm:inline">Location:</span>
            </span>

            <Select value={site} onValueChange={setSite}>
              <SelectTrigger className="h-8 min-w-[125px] sm:min-w-[140px] text-xs font-medium bg-white border-[#D9DDE0] rounded-[2px] text-[#17202A]">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>

              <SelectContent className="bg-white border-[#D9DDE0] rounded-[2px]">
                {siteOptions.map((opt) => (
                  <SelectItem
                    key={opt}
                    value={opt}
                    className="text-xs"
                  >
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. Report Type Multi-Select Checkboxes */}
          <div className="flex items-center gap-2.5 rounded-[2px] border border-[#D9DDE0] bg-white px-3 py-1.5 text-xs shadow-none">
            <span className="text-xs font-semibold text-[#667085] flex items-center gap-1 shrink-0">
              <CheckSquare className="h-3.5 w-3.5 text-[#102F3E]" />
              <span className="hidden md:inline">Report Type:</span>
            </span>

            <div className="flex items-center gap-3">
              {reportTypeOptions.map((opt) => {
                const isChecked = selectedReportTypes.includes(opt.value);

                return (
                  <label
                    key={opt.value}
                    className="flex items-center gap-1.5 cursor-pointer select-none text-xs font-medium text-[#17202A] hover:text-[#102F3E] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        handleToggleReportType(opt.value)
                      }
                      className="h-3.5 w-3.5 rounded-[2px] border-[#D9DDE0] text-[#102F3E] focus:ring-[#102F3E] cursor-pointer accent-[#102F3E]"
                    />

                    <span
                      className={
                        isChecked
                          ? 'text-[#102F3E] font-semibold'
                          : 'text-[#667085]'
                      }
                    >
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 4. Risk Level Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#667085] flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5 text-[#D97706]" />
              <span className="hidden sm:inline">Risk Level:</span>
            </span>

            <Select value={riskLevel} onValueChange={setRiskLevel}>
              <SelectTrigger className="h-8 min-w-[120px] sm:min-w-[135px] text-xs font-medium bg-white border-[#D9DDE0] rounded-[2px] text-[#17202A]">
                <SelectValue placeholder="Select Risk Level" />
              </SelectTrigger>

              <SelectContent className="bg-white border-[#D9DDE0] rounded-[2px]">
                {riskLevelOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-xs"
                  >
                    <div className="flex items-center gap-2">
                      {opt.color && (
                        <span
                          className={`h-2 w-2 rounded-full ${opt.color}`}
                        />
                      )}

                      <span>{opt.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 5. Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8 px-3 text-xs gap-1.5 border-[#D9DDE0] text-[#667085] hover:text-[#17202A] rounded-[2px]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={handleApply}
            className="h-8 px-4 text-xs font-semibold gap-1.5 bg-[#102F3E] hover:bg-[#082735] text-white rounded-[2px] shadow-none"
          >
            <Filter className="h-3.5 w-3.5" />
            Apply Filters

            {appliedCount > 0 && (
              <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.2 text-[10px] font-mono">
                {appliedCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Expandable Custom Date Range */}
      {dateRange === 'custom' && (
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#D9DDE0] text-xs text-[#667085] animate-in fade-in-50 duration-200">
          <span className="font-semibold text-[#102F3E] flex items-center gap-1">
            <Calendar className="h-3 w-3 text-[#102F3E]" />
            Custom Date Range:
          </span>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-[11px]">
              From:

              <input
                type="date"
                value={customStartDate}
                onChange={(e) =>
                  setCustomStartDate(e.target.value)
                }
                className="h-7 rounded-[2px] border border-[#D9DDE0] bg-white px-2 text-xs font-mono text-[#17202A] focus:outline-none focus:ring-1 focus:ring-[#102F3E]"
              />
            </label>

            <label className="flex items-center gap-1 text-[11px]">
              To:

              <input
                type="date"
                value={customEndDate}
                onChange={(e) =>
                  setCustomEndDate(e.target.value)
                }
                className="h-7 rounded-[2px] border border-[#D9DDE0] bg-white px-2 text-xs font-mono text-[#17202A] focus:outline-none focus:ring-1 focus:ring-[#102F3E]"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}