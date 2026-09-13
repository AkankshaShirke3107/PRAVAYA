import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-none border border-[#D9DDE0] bg-white px-3 py-1 text-xs text-[#17202A] shadow-none transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-[#667085] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#102F3E] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
