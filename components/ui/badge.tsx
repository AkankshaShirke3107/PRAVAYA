import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base: square, compact, no pill. Consistent stroke weight.
  "inline-flex items-center rounded-[2px] border px-2 py-0.5 text-[11px] font-semibold transition-colors focus:outline-none select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#102F3E] text-white dark:bg-[#2F6B84] dark:text-white",
        secondary:
          "border-border bg-muted text-foreground dark:bg-muted dark:text-foreground",
        destructive:
          "border-transparent bg-[#C92925] text-white",
        oil:
          "border-transparent bg-[#C92925] text-white font-medium",
        outline:
          "border-border text-foreground bg-card dark:border-border dark:text-foreground",
        // Status severity — square, semantic color, restrained saturation
        high:
          "bg-[#FEF2F2] text-[#C92925] border-[#FECACA] dark:bg-[#2D1214] dark:text-[#F87171] dark:border-[#7F1D1D]/40",
        medium:
          "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A] dark:bg-[#2D1F0E] dark:text-[#FBBF24] dark:border-[#78350F]/40",
        low:
          "bg-[#F0FDF4] text-[#2E7D32] border-[#BBF7D0] dark:bg-[#0F2B14] dark:text-[#4ADE80] dark:border-[#14532D]/40",
        info:
          "bg-[#EFF6FF] text-[#2F6B84] border-[#BFDBFE] dark:bg-[#0C1E2D] dark:text-[#60A5FA] dark:border-[#1E3A5F]/40",
        none:
          "bg-muted text-muted-foreground border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export function getStatusBadgeClass(status?: string): string {
  const base = "rounded-[2px] px-2 py-0.5 text-[11px] font-semibold border inline-flex items-center";
  if (!status) return `${base} bg-muted text-muted-foreground border-border`;
  const s = status.trim().toLowerCase();

  // Green = success / resolved / closed / etc.
  if (['confirmed', 'closed', 'low', 'completed', 'approved', 'resolved', 'active', 'available', 'aligned', 'implemented', 'no', 'action taken'].includes(s)) {
    return `${base} bg-[#F0FDF4] text-[#2E7D32] border-[#BBF7D0] dark:bg-[#0F2B14] dark:text-[#4ADE80] dark:border-[#14532D]/40`;
  }

  // Amber = pending / in progress / review
  if (['pending', 'medium', 'in progress', 'under review', 'review', 'partial', 'requires review', 'demonstration state', 'assigned', 'pending verification', 'needs review'].includes(s)) {
    return `${base} bg-[#FFFBEB] text-[#B45309] border-[#FDE68A] dark:bg-[#2D1F0E] dark:text-[#FBBF24] dark:border-[#78350F]/40`;
  }

  // Red = critical / high / open / overdue
  if (['critical', 'high', 'open', 'overdue', 'failed', 'yes', 'unsafe act', 'rejected', 'escalated', 'ua'].includes(s)) {
    return `${base} bg-[#FEF2F2] text-[#C92925] border-[#FECACA] dark:bg-[#2D1214] dark:text-[#F87171] dark:border-[#7F1D1D]/40`;
  }

  // Blue/neutral = info / new / draft / UC / NM
  return `${base} bg-[#EFF6FF] text-[#2F6B84] border-[#BFDBFE] dark:bg-[#0C1E2D] dark:text-[#60A5FA] dark:border-[#1E3A5F]/40`;
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
