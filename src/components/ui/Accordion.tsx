"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-black/10 py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-surface">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-signal shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-steel-300 leading-relaxed pr-8">{children}</p>
        </div>
      </div>
    </div>
  );
}
