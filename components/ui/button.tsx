import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]",
  {
    variants: {
      variant: {
        default:
          "bg-[#0ea5e9] text-white shadow-xs hover:bg-[#0284c7] hover:shadow-sm font-semibold",
        destructive:
          "bg-[#ef4444] text-white shadow-xs hover:bg-[#dc2626] hover:shadow-sm font-semibold",
        success:
          "bg-[#22c55e] text-white shadow-xs hover:bg-[#16a34a] hover:shadow-sm font-semibold",
        warning:
          "bg-[#f59e0b] text-white shadow-xs hover:bg-[#d97706] hover:shadow-sm font-semibold",
        outline:
          "border border-[#e2e8f0] bg-white text-[#475569] shadow-xs hover:bg-slate-50 hover:text-[#1e293b] dark:bg-card dark:border-border dark:text-slate-300 dark:hover:bg-slate-800",
        secondary:
          "bg-slate-100 text-[#1e293b] shadow-xs hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200",
        ghost: "text-[#475569] hover:bg-slate-100 hover:text-[#1e293b] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200",
        link: "text-[#0ea5e9] underline-offset-4 hover:underline",
        filter: "bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium shadow-xs",
        oil: "bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium shadow-xs"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
