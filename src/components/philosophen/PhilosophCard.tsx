import Link from "next/link";
import { getEpocheFarbe } from "@/lib/utils";
import type { Philosoph } from "@/types";

export default function PhilosophCard({ philosoph }: { philosoph: Philosoph }) {
  return (
    <Link href={`/philosophen/${philosoph.slug}`}>
      <div className="bg-parchment-card border border-border-warm rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] text-ink">
            {philosoph.name}
          </h3>
          <span
            className="text-[10px] font-ui font-semibold px-2 py-0.5 rounded-full text-white shrink-0 ml-2"
            style={{ backgroundColor: getEpocheFarbe(philosoph.epoche) }}
          >
            {philosoph.epoche}
          </span>
        </div>
        <p className="text-xs font-ui text-ink-light mb-2">
          {philosoph.lebensdaten}
        </p>
        <p className="text-sm text-ink-light leading-relaxed flex-1">
          {philosoph.kurzbeschreibung}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {philosoph.hauptstroemungen.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-[10px] font-ui px-2 py-0.5 bg-border-warm/30 rounded-full text-ink-light"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
