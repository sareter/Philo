"use client";

import { useState } from "react";
import Link from "next/link";
import type { HierarchieKnoten } from "@/data/ismen-hierarchie";
import type { Ismus } from "@/types";

function BaumKnoten({
  knoten,
  tiefe,
  ismenMap,
}: {
  knoten: HierarchieKnoten;
  tiefe: number;
  ismenMap: Map<string, Ismus>;
}) {
  const [offen, setOffen] = useState(tiefe < 1);
  const hatKinder = knoten.children && knoten.children.length > 0;
  const ismus = knoten.slug ? ismenMap.get(knoten.slug) : null;

  // Farben je Tiefe
  const tiefeFarben = [
    "border-l-amber-700",
    "border-l-amber-600",
    "border-l-amber-500",
    "border-l-amber-400",
  ];
  const borderClass = tiefeFarben[Math.min(tiefe, tiefeFarben.length - 1)];

  const tiefeTextGroessen = [
    "text-lg font-semibold",
    "text-base font-semibold",
    "text-sm font-medium",
    "text-sm",
  ];
  const textClass = tiefeTextGroessen[Math.min(tiefe, tiefeTextGroessen.length - 1)];

  return (
    <div
      className={`${tiefe > 0 ? `border-l-2 ${borderClass} ml-2 pl-4` : ""}`}
    >
      <div className="py-1.5">
        <div className="flex items-center gap-2">
          {/* Aufklapp-Toggle */}
          {hatKinder ? (
            <button
              onClick={() => setOffen(!offen)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-border-warm/40 transition-colors shrink-0 text-ink-light"
              aria-label={offen ? "Einklappen" : "Aufklappen"}
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${offen ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <span className="w-6 h-6 flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600/50" />
            </span>
          )}

          {/* Name – Link wenn Ismus existiert */}
          {ismus ? (
            <Link
              href={`/ismen/${ismus.slug}`}
              className={`${textClass} text-ink hover:text-amber-800 transition-colors`}
            >
              {knoten.label}
            </Link>
          ) : (
            <span className={`${textClass} text-ink`}>
              {knoten.label}
            </span>
          )}

          {/* Kinder-Zähler */}
          {hatKinder && (
            <span className="text-[10px] font-ui text-ink-light/60 bg-border-warm/20 px-1.5 py-0.5 rounded-full">
              {countSlugs(knoten)}
            </span>
          )}
        </div>

        {/* Beschreibung für Kategorieknoten oder Kurzbeschreibung vom Ismus */}
        {(knoten.beschreibung || (ismus && tiefe === 0)) && (
          <p className="text-xs text-ink-light mt-0.5 ml-8">
            {knoten.beschreibung || ismus?.kurzbeschreibung}
          </p>
        )}

        {/* Kurzbeschreibung für Blatt-Ismen (Endknoten) */}
        {ismus && !hatKinder && (
          <p className="text-xs text-ink-light mt-0.5 ml-8 line-clamp-1">
            {ismus.kurzbeschreibung}
          </p>
        )}
      </div>

      {/* Kinder */}
      {hatKinder && offen && (
        <div className="mb-1">
          {knoten.children!.map((kind, i) => (
            <BaumKnoten
              key={kind.slug || kind.label + i}
              knoten={kind}
              tiefe={tiefe + 1}
              ismenMap={ismenMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Zählt alle Slugs (= echte Ismen) unterhalb eines Knotens */
function countSlugs(knoten: HierarchieKnoten): number {
  let count = knoten.slug ? 1 : 0;
  if (knoten.children) {
    for (const kind of knoten.children) {
      count += countSlugs(kind);
    }
  }
  return count;
}

export default function IsmenBaum({
  hierarchie,
  ismen,
}: {
  hierarchie: HierarchieKnoten[];
  ismen: Ismus[];
}) {
  const ismenMap = new Map(ismen.map((i) => [i.slug, i]));

  return (
    <div className="space-y-2">
      {hierarchie.map((knoten, i) => (
        <div
          key={knoten.label + i}
          className="bg-parchment-card border border-border-warm rounded-xl p-4"
        >
          <BaumKnoten knoten={knoten} tiefe={0} ismenMap={ismenMap} />
        </div>
      ))}
    </div>
  );
}
