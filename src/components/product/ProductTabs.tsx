"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; content: ReactNode };

export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div className="flex gap-1 border-b border-black/10 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors",
              active === tab.id ? "text-signal" : "text-steel-400 hover:text-steel-200",
            )}
          >
            {tab.label}
            {active === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-signal" />}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} className={active === tab.id ? "block" : "hidden"}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
