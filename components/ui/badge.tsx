import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#102F3E] text-white shadow-none",
        secondary:
          "border-[#D9DDE0] bg-[#F3F2EE] text-[#17202A]",
        destructive:
          "border-transparent bg-[#C92925] text-white",
        oil:
          "border-transparent bg-[#C92925] text-white font-medium",
        outline: "border-[#D9DDE0] text-[#17202A] bg-white",
        high: "bg-[#FEF2F2] text-[#C92925] border-[#FCA5A5] font-semibold rounded-full px-2.5 py-0.5 text-xs",
        medium: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A] font-semibold rounded-full px-2.5 py-0.5 text-xs",
        low: "bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7] font-semibold rounded-full px-2.5 py-0.5 text-xs",
        info: "bg-[#F0F9FF] text-[#2F6B84] border-[#BAE6FD] font-semibold rounded-full px-2.5 py-0.5 text-xs",
        none: "bg-[#F3F2EE] text-[#667085] border-[#D9DDE0] rounded-full px-2.5 py-0.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export function getStatusBadgeClass(status?: string): string {
  if (!status) return "bg-[#F3F2EE] text-[#667085] border-[#D9DDE0] rounded-full px-2.5 py-0.5 text-xs font-semibold border inline-flex items-center";
  const s = status.trim().toLowerCase();

  // Green = Confirmed / Closed / Low / Completed / Approved / Resolved / Active / Available / Aligned / Implemented / No / Action Taken
  if (['confirmed', 'closed', 'low', 'completed', 'approved', 'resolved', 'active', 'available', 'aligned', 'implemented', 'no', 'action taken'].includes(s)) {
    return "bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7] rounded-full px-2.5 py-0.5 text-xs font-semibold border inline-flex items-center";
  }

  // Amber = Pending / Medium / In Progress / Under Review / Review / Partial / Requires Review / Demonstration State / Assigned / Pending Verification / Needs Review
  if (['pending', 'medium', 'in progress', 'under review', 'review', 'partial', 'requires review', 'demonstration state', 'assigned', 'pending verification', 'needs review'].includes(s)) {
    return "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A] rounded-full px-2.5 py-0.5 text-xs font-semibold border inline-flex items-center";
  }

  // Red = Critical / High / Open / Overdue / Failed / Yes / Unsafe Act / Rejected / Escalated / UA
  if (['critical', 'high', 'open', 'overdue', 'failed', 'yes', 'unsafe act', 'rejected', 'escalated', 'ua'].includes(s)) {
    return "bg-[#FEF2F2] text-[#C92925] border-[#FCA5A5] rounded-full px-2.5 py-0.5 text-xs font-semibold border inline-flex items-center";
  }

  // Blue/Neutral = Info / New / Standard / Draft / UC / NM / Unsafe Condition / Near Miss
  return "bg-[#F0F9FF] text-[#2F6B84] border-[#BAE6FD] rounded-full px-2.5 py-0.5 text-xs font-semibold border inline-flex items-center";
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
