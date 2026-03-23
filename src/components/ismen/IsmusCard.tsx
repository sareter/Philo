import Link from "next/link";
import { getEpocheFarbe } from "@/lib/utils";
import type { Ismus } from "@/types";

export default function IsmusCard({ ismus }: { ismus: Ismus }) {
  return (
    <Link href={`/ismen/${ismus.slug}`}>
      <div className="bg-parchment-card border border-border-warm rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] text-ink">
            {ismus.name}
          </h3>
          <span
            className="text-[10px] font-ui font-semibold px-2 py-0.5 rounded-full text-white shrink-0 ml-2"
            style={{ backgroundColor: getEpocheFarbe(ismus.epoche) }}
          >
            {ismus.epoche}
          </span>
        </div>
        <p className="text-sm text-ink-light leading-relaxed flex-1">
          {ismus.kurzbeschreibung}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {ismus.kernthesen.slice(0, 2).map((t, i) => (
            <span
              key={i}
              className="text-[10px] font-ui px-2 py-0.5 bg-border-warm/30 rounded-full text-ink-light truncate max-w-[200px]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
