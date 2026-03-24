"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "philo-einfach-modus";

export function useEinfachModus() {
  const [einfach, setEinfach] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setEinfach(true);
  }, []);

  const toggle = () => {
    setEinfach((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  return { einfach, toggle };
}

export default function EinfachToggle({
  einfach,
  onToggle,
}: {
  einfach: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex bg-border-warm/20 rounded-lg p-0.5">
        <button
          onClick={einfach ? onToggle : undefined}
          className={`px-3 py-1.5 text-sm font-ui rounded-md transition-all ${
            !einfach
              ? "bg-parchment-card shadow-sm text-ink font-semibold"
              : "text-ink-light hover:text-ink"
          }`}
        >
          Original
        </button>
        <button
          onClick={!einfach ? onToggle : undefined}
          className={`px-3 py-1.5 text-sm font-ui rounded-md transition-all ${
            einfach
              ? "bg-parchment-card shadow-sm text-ink font-semibold"
              : "text-ink-light hover:text-ink"
          }`}
        >
          Einfache Sprache
        </button>
      </div>
    </div>
  );
}
