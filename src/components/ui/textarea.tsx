import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "block w-full bg-carbon-800 border border-white/10",
        "px-4 py-2.5 text-sm text-surface placeholder:text-steel-500",
        "focus:border-signal focus:ring-1 focus:ring-signal focus:outline-none",
        "disabled:opacity-50 rounded-xs transition-colors resize-y min-h-[100px]",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
