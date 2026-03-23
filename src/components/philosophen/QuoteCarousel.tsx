"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Zitat } from "@/types";

export default function QuoteCarousel({ zitate }: { zitate: Zitat[] }) {
  const [index, setIndex] = useState(0);
  if (zitate.length === 0) return null;

  const current = zitate[index];
  const prev = () => setIndex((i) => (i === 0 ? zitate.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === zitate.length - 1 ? 0 : i + 1));

  return (
    <div className="bg-parchment-card border border-border-warm rounded-xl p-6 relative">
      <Quote size={32} className="text-bordeaux/20 absolute top-4 left-4" />
      <div className="pl-8 min-h-[100px] flex flex-col justify-center">
        <blockquote className="text-lg italic font-[family-name:var(--font-display)] text-ink leading-relaxed mb-3">
          &bdquo;{current.text}&ldquo;
        </blockquote>
        <p className="text-sm font-ui text-ink-light">
          &mdash; {current.quelle}
        </p>
        {current.kontext && (
          <p className="text-xs font-ui text-ink-light/70 mt-1">
            {current.kontext}
          </p>
        )}
      </div>
      {zitate.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={prev}
            className="p-1.5 rounded-lg hover:bg-border-warm/30 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-ui text-ink-light">
            {index + 1} / {zitate.length}
          </span>
          <button
            onClick={next}
            className="p-1.5 rounded-lg hover:bg-border-warm/30 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
