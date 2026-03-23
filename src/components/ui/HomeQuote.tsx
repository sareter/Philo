"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Quote } from "lucide-react";

interface ZitatMitPhilosoph {
  text: string;
  quelle: string;
  kontext?: string;
  philosoph: string;
  slug: string;
}

export default function HomeQuote({ zitate }: { zitate: ZitatMitPhilosoph[] }) {
  const [zitat, setZitat] = useState<ZitatMitPhilosoph | null>(null);

  useEffect(() => {
    // Use day-based seed for consistent "quote of the day"
    const dayIndex = Math.floor(Date.now() / 86400000) % zitate.length;
    setZitat(zitate[dayIndex]);
  }, [zitate]);

  if (!zitat) return null;

  return (
    <div className="bg-parchment-card border border-border-warm rounded-xl p-8 mb-12 text-center relative">
      <Quote size={40} className="mx-auto text-bordeaux/20 mb-4" />
      <blockquote className="text-xl italic font-[family-name:var(--font-display)] text-ink leading-relaxed max-w-2xl mx-auto mb-4">
        &bdquo;{zitat.text}&ldquo;
      </blockquote>
      <Link
        href={`/philosophen/${zitat.slug}`}
        className="text-sm font-ui text-bordeaux hover:underline"
      >
        &mdash; {zitat.philosoph}
      </Link>
      <p className="text-xs font-ui text-ink-light/50 mt-4">Zitat des Tages</p>
    </div>
  );
}
