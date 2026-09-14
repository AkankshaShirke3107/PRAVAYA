import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SifPotential, ReportStatus, ReportType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSifBadgeColor(level: SifPotential) {
  switch (level) {
    case "Yes":
    case "High":
      return "bg-[#C92925]/10 text-[#C92925] border-[#C92925]/30 hover:bg-[#C92925]/20 font-bold rounded-full";

    case "Review":
    case "Medium":
      return "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30 hover:bg-[#D97706]/20 font-bold rounded-full";

    case "No":
    case "Low":
      return "bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/30 hover:bg-[#2E7D32]/20 font-bold rounded-full";

    case "Non-SIF":
    default:
      return "bg-[#F3F2EE] text-[#64748B] border-[#D9DDE0] hover:bg-[#D9DDE0]/50 rounded-full";
  }
}

export function getStatusBadgeColor(status: ReportStatus | string) {
  switch (status) {
    case "Confirmed":
    case "Action Taken":
    case "Closed":
      return "bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/30 font-semibold";

    case "Pending":
    case "Needs Review":
      return "bg-[#64748B]/10 text-[#64748B] border-[#64748B]/30 font-medium";

    case "Under Review":
      return "bg-[#2F6B84]/10 text-[#2F6B84] border-[#2F6B84]/30 font-medium";

    case "Escalated":
      return "bg-[#C65D1E]/10 text-[#C65D1E] border-[#C65D1E]/30 font-bold";

    case "Rejected":
      return "bg-[#C92925]/10 text-[#C92925] border-[#C92925]/30 font-medium";

    case "New":
    default:
      return "bg-[#F3F2EE] text-[#64748B] border-[#D9DDE0]";
  }
}

export function getTypeBadgeColor(type: ReportType | string) {
  switch (type) {
    case "UA":
    case "Unsafe Act":
      return "bg-[#C92925]/10 text-[#C92925] border-[#C92925]/30 font-semibold";

    case "UC":
    case "Unsafe Condition":
      return "bg-[#2F6B84]/10 text-[#2F6B84] border-[#2F6B84]/30 font-semibold";

    case "NM":
    case "Near Miss":
      return "bg-[#2A7D78]/10 text-[#2A7D78] border-[#2A7D78]/30 font-semibold";

    case "Incident":
      return "bg-[#102F3E]/10 text-[#102F3E] border-[#102F3E]/30 font-semibold";

    default:
      return "bg-[#F3F2EE] text-[#64748B] border-[#D9DDE0]";
  }
}

export function formatReadableDate(dateString: string) {
  try {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}