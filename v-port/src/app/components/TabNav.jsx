"use client";
import React from "react";
import { UserIcon, FolderIcon, BookOpenIcon, CpuChipIcon } from "@heroicons/react/24/outline";

export const TABS = [
  { id: "about", label: "About", icon: UserIcon },
  { id: "projects", label: "Projects", icon: FolderIcon },
  { id: "notes", label: "Notes", icon: BookOpenIcon },
  { id: "thoughts", label: "Thoughts", icon: CpuChipIcon },
];

const TabNav = ({ active, onChange }) => {
  return (
    <nav className="flex flex-wrap gap-3 border-b border-border pb-5">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 rounded-md border-2 px-4 py-2 text-[11px] uppercase tracking-wide transition-colors sm:text-xs ${
              isActive
                ? "border-accent text-accent"
                : "border-border text-fg-muted hover:border-fg-muted hover:text-fg"
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

export default TabNav;
