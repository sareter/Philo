import { BookOpen } from "lucide-react";
import type { Werk } from "@/types";

export default function WerkeList({ werke }: { werke: Werk[] }) {
  if (werke.length === 0) return null;

  return (
    <div className="space-y-3">
      {werke.map((werk, i) => (
        <div
          key={i}
          className="bg-parchment-card border border-border-warm rounded-lg p-4 flex gap-3"
        >
          <BookOpen size={18} className="text-bordeaux shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold font-[family-name:var(--font-display)] text-ink">
              {werk.titel}
            </h4>
            {werk.jahr && (
              <p className="text-xs font-ui text-ink-light mb-1">{werk.jahr}</p>
            )}
            <p className="text-sm text-ink-light leading-relaxed">
              {werk.beschreibung}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
