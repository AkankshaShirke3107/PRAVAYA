import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SifPotential, ReportStatus, ReportType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSifBadgeColor(level: SifPotential) {
  switch (level) {
    case 'Yes':
    case 'High':
      return 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 hover:bg-red-500/25';
    case 'Review':
    case 'Medium':
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/25';
    case 'No':
    case 'Low':
      return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25';
    case 'Non-SIF':
    default:
      return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30 hover:bg-slate-500/20';
  }
}

export function getStatusBadgeColor(status: ReportStatus) {
  switch (status) {
    case 'Confirmed':
      return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-semibold';
    case 'Pending':
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 font-medium';
    case 'Rejected':
      return 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 font-medium';
    case 'New':
      return 'bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30';
    case 'Under Review':
      return 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30';
    case 'Escalated':
      return 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/40 font-semibold';
    case 'Action Taken':
      return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
    case 'Closed':
    default:
      return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
  }
}

export function getTypeBadgeColor(type: ReportType) {
  switch (type) {
    case 'UA':
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 font-semibold';
    case 'UC':
      return 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30 font-semibold';
    case 'NM':
    case 'Near Miss':
      return 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 font-semibold';
    default:
      return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/25';
  }
}

export function formatReadableDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}
