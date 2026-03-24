"use client";

import Link from "next/link";
import { getEpocheFarbe } from "@/lib/utils";
import type { Ismus, Philosoph } from "@/types";
import EinfachToggle, { useEinfachModus } from "@/components/EinfachToggle";

export default function IsmusDetailClient({
  ismus,
  vertreter,
  verwandteIsmen,
}: {
  ismus: Ismus;
  vertreter: Philosoph[];
  verwandteIsmen: Ismus[];
}) {
  const { einfach, toggle } = useEinfachModus();

  const hasEinfach = !!ismus.einfach;
  const isEinfach = einfach && hasEinfach;
  const kurzbeschreibung = isEinfach ? ismus.einfach!.kurzbeschreibung : ismus.kurzbeschreibung;
  const ausfuehrlich = isEinfach ? ismus.einfach!.ausfuehrlicheBeschreibung : ismus.ausfuehrlicheBeschreibung;
  const kernthesen = isEinfach ? ismus.einfach!.kernthesen : ismus.kernthesen;
  const entstehung = isEinfach ? ismus.einfach!.entstehung : ismus.entstehung;
  const kritik = isEinfach ? ismus.einfach!.kritik : ismus.kritik;

  return (
    <article className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-ui font-semibold px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: getEpocheFarbe(ismus.epoche) }}
          >
            {ismus.epoche}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-3">{ismus.name}</h1>
        <p className="text-lg text-ink-light leading-relaxed">
          {kurzbeschreibung}
        </p>
      </div>

      {/* Einfach Toggle */}
      {hasEinfach && <EinfachToggle einfach={einfach} onToggle={toggle} />}

      {/* Ausführliche Beschreibung */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Beschreibung</h2>
        <div className="text-ink-light leading-relaxed whitespace-pre-line">
          {ausfuehrlich}
        </div>
      </section>

      {/* Kernthesen */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Kernthesen</h2>
        <ul className="space-y-2">
          {kernthesen.map((these, i) => (
            <li
              key={i}
              className="flex gap-3 bg-parchment-card border border-border-warm rounded-lg p-4"
            >
              <span className="text-bordeaux font-bold font-ui shrink-0">
                {i + 1}.
              </span>
              <span className="text-ink-light">{these}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Entstehung */}
      {entstehung && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Entstehung</h2>
          <p className="text-ink-light leading-relaxed">{entstehung}</p>
        </section>
      )}

      {/* Kritik */}
      {kritik && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Kritik</h2>
          <p className="text-ink-light leading-relaxed">{kritik}</p>
        </section>
      )}

      {/* Schlüsselwerke */}
      {ismus.schluesselwerke.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Schlüsselwerke</h2>
          <div className="space-y-2">
            {ismus.schluesselwerke.map((werk, i) => (
              <div
                key={i}
                className="bg-parchment-card border border-border-warm rounded-lg p-4"
              >
                <span className="font-semibold font-[family-name:var(--font-display)]">
                  {werk.titel}
                </span>
                <span className="text-sm font-ui text-ink-light ml-2">
                  von {werk.autor} ({werk.jahr})
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hauptvertreter */}
      {vertreter.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Hauptvertreter</h2>
          <div className="flex flex-wrap gap-2">
            {vertreter.map((p) => (
              <Link
                key={p.slug}
                href={`/philosophen/${p.slug}`}
                className="flex items-center gap-2 px-3 py-2 bg-parchment-card border border-border-warm rounded-lg hover:border-bordeaux/50 transition-colors"
              >
                <span className="text-sm font-ui font-medium">{p.name}</span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getEpocheFarbe(p.epoche) }}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Verwandte Ismen */}
      {verwandteIsmen.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Verwandte Strömungen</h2>
          <div className="flex flex-wrap gap-2">
            {verwandteIsmen.map((i) => (
              <Link
                key={i.slug}
                href={`/ismen/${i.slug}`}
                className="px-3 py-2 bg-parchment-card border border-border-warm rounded-lg hover:border-bordeaux/50 transition-colors text-sm font-ui"
              >
                {i.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
