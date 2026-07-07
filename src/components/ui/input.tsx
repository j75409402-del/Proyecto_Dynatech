import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "block w-full bg-carbon-800 border border-white/10",
        "px-4 py-2.5 text-sm text-surface placeholder:text-steel-500",
        "focus:border-signal focus:ring-1 focus:ring-signal focus:outline-none",
        "disabled:opacity-50 rounded-xs transition-colors",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
