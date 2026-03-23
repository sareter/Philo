"use client";

import { EPOCHE_FARBEN } from "@/types";

export default function FilterTags({
  options,
  selected,
  onToggle,
  label,
}: {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  label: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-ui font-semibold text-ink-light uppercase tracking-wider">
        {label}:
      </span>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        const epocheColor = EPOCHE_FARBEN[option];
        return (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className={`px-2.5 py-1 rounded-full text-xs font-ui transition-all ${
              isSelected
                ? "text-white shadow-sm"
                : "bg-parchment-card border border-border-warm text-ink-light hover:border-bordeaux/50"
            }`}
            style={
              isSelected
                ? { backgroundColor: epocheColor || "#8B2500" }
                : undefined
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
