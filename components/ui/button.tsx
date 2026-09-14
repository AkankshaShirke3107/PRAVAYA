import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[2px] text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#102F3E] text-white border border-transparent hover:bg-[#082735] dark:bg-[#2F6B84] dark:hover:bg-[#255a6f]",

        destructive:
          "bg-[#C92925] text-white border border-transparent hover:bg-[#991F1B]",

        success:
          "bg-[#2E7D32] text-white border border-transparent hover:bg-[#1E5722]",

        warning:
          "bg-[#D97706] text-white border border-transparent hover:bg-[#B45309]",

        outline:
          "border border-border bg-card text-foreground hover:bg-muted hover:border-[#102F3E]/30 dark:hover:border-[#2F6B84]/40 dark:hover:bg-accent",

        secondary:
          "bg-muted border border-border text-foreground hover:bg-[#E2E8F0] dark:hover:bg-accent",

        ghost:
          "text-foreground hover:bg-muted dark:hover:bg-accent",

        link:
          "text-[#102F3E] dark:text-[#60A5FA] underline-offset-4 hover:underline font-medium",

        filter:
          "bg-[#102F3E] hover:bg-[#082735] text-white font-semibold border border-transparent dark:bg-[#2F6B84] dark:hover:bg-[#255a6f]",

        oil:
          "bg-[#C92925] hover:bg-[#991F1B] text-white font-semibold border border-transparent",
      },

      size: {
        default: "h-8 px-3.5 py-1.5",
        sm: "h-7 px-2.5 text-xs",
        lg: "h-9 px-5 text-sm",
        icon: "h-8 w-8",
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