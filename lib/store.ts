import { create } from 'zustand';
import { SafetyReport, FilterState, SifPotential, ReportStatus } from '@/types';
import { mockReportsData } from './mockReports';

interface SafetyStoreState {
  reports: SafetyReport[];
  selectedReport: SafetyReport | null;
  filters: FilterState;
  isQuickViewOpen: boolean;
  setReports: (reports: SafetyReport[]) => void;
  setSelectedReport: (report: SafetyReport | null) => void;
  setQuickViewOpen: (open: boolean) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  updateReportStatus: (id: string, status: ReportStatus) => void;
  addReport: (report: SafetyReport) => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  site: 'All Sites',
  department: 'All Departments',
  reportType: 'All Types',
  sifLevel: 'All SIF Levels',
  status: 'All Statuses',
  dateRange: {
    start: '2026-05-01',
    end: '2026-05-28',
  },
};

export const useSafetyStore = create<SafetyStoreState>((set) => ({
  reports: mockReportsData as unknown as SafetyReport[],
  selectedReport: null,
  filters: initialFilters,
  isQuickViewOpen: false,

  setReports: (reports) => set({ reports }),

  setSelectedReport: (report) =>
    set({ selectedReport: report, isQuickViewOpen: report !== null }),

  setQuickViewOpen: (open) =>
    set((state) => ({
      isQuickViewOpen: open,
      selectedReport: open ? state.selectedReport : null,
    })),

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  resetFilters: () => set({ filters: initialFilters }),

  updateReportStatus: (id, status) =>
    set((state) => ({
      reports: state.reports.map((r) =>
        r.id === id ? { ...r, status } : r
      ),
      selectedReport:
        state.selectedReport?.id === id
          ? { ...state.selectedReport, status }
          : state.selectedReport,
    })),

  addReport: (report) =>
    set((state) => ({
      reports: [report, ...state.reports],
    })),
}));
