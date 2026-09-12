import React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200/80 dark:bg-slate-800/80",
        className
      )}
      {...props}
    />
  )
}

/**
 * TableSkeleton - Renders an authentic loading skeleton table with headers and data rows
 */
function TableSkeleton({
  rows = 5,
  columns = 6,
  className,
}: {
  rows?: number
  columns?: number
  className?: string
}) {
  return (
    <div className={cn("w-full space-y-3 p-4", className)}>
      {/* Table Header skeleton */}
      <div className="flex items-center gap-4 pb-2 border-b border-border/40">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`th-${i}`} className="h-4 flex-1" />
        ))}
      </div>
      {/* Table Rows skeleton */}
      <div className="space-y-3 pt-1">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={`tr-${r}`} className="flex items-center gap-4 py-2 border-b border-border/20">
            {Array.from({ length: columns }).map((_, c) => (
              <Skeleton
                key={`td-${r}-${c}`}
                className={cn("h-4 flex-1", c === 0 ? "w-16 flex-none" : "")}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * CardSkeleton - Skeleton for cards with a header, metric line, and footer
 */
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-xs dark:bg-card dark:border-border space-y-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-3 w-40" />
    </div>
  )
}

/**
 * ChartSkeleton - Skeleton representation of a chart card with placeholder axes and bars
 */
function ChartSkeleton({ className, title }: { className?: string; title?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-xs dark:bg-card dark:border-border space-y-5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-3.5 w-64" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>

      <div className="h-[220px] w-full flex items-end justify-between gap-3 pt-6 px-2">
        <Skeleton className="h-[45%] flex-1 rounded-t-md" />
        <Skeleton className="h-[75%] flex-1 rounded-t-md" />
        <Skeleton className="h-[60%] flex-1 rounded-t-md" />
        <Skeleton className="h-[90%] flex-1 rounded-t-md" />
        <Skeleton className="h-[50%] flex-1 rounded-t-md" />
        <Skeleton className="h-[70%] flex-1 rounded-t-md" />
        <Skeleton className="h-[35%] flex-1 rounded-t-md" />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}

export { Skeleton, TableSkeleton, CardSkeleton, ChartSkeleton }
