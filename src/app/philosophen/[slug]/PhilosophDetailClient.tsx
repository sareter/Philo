"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  BookOpen,
  Lightbulb,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getEpocheFarbe } from "@/lib/utils";
import type { Philosoph } from "@/types";
import QuoteCarousel from "@/components/philosophen/QuoteCarousel";
import WerkeList from "@/components/philosophen/WerkeList";

export default function PhilosophDetailClient({
  philosoph,
  verwandte,
}: {
  philosoph: Philosoph;
  verwandte: Philosoph[];
}) {
  const [expandedIdea, setExpandedIdea] = useState<number | null>(null);

  return (
    <article className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-ui font-semibold px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: getEpocheFarbe(philosoph.epoche) }}
          >
            {philosoph.epoche}
          </span>
          <span className="text-sm font-ui text-ink-light">
            {philosoph.lebensdaten}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-3">{philosoph.name}</h1>
        <p className="text-lg text-ink-light leading-relaxed">
          {philosoph.kurzbeschreibung}
        </p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm font-ui text-ink-light">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {philosoph.geboren.ort}, {philosoph.geboren.land}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {philosoph.lebensdaten}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {philosoph.hauptstroemungen.map((s) => (
            <span
              key={s}
              className="text-xs font-ui px-2.5 py-1 bg-border-warm/30 rounded-full text-ink-light"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Zitate */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-bordeaux">&ldquo;</span> Zitate
        </h2>
        <QuoteCarousel zitate={philosoph.zitate} />
      </section>

      {/* Biografie */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calendar size={22} className="text-bordeaux" /> Biografie
        </h2>
        <div className="space-y-4 text-ink-light leading-relaxed">
          {philosoph.biografie.fruehesLeben && (
            <div>
              <h3 className="font-semibold text-ink mb-1">Frühes Leben</h3>
              <p>{philosoph.biografie.fruehesLeben}</p>
            </div>
          )}
          {philosoph.biografie.schaffen && (
            <div>
              <h3 className="font-semibold text-ink mb-1">
                Schaffen & Wirken
              </h3>
              <p>{philosoph.biografie.schaffen}</p>
            </div>
          )}
          {philosoph.biografie.spaetesLeben && (
            <div>
              <h3 className="font-semibold text-ink mb-1">Spätes Leben</h3>
              <p>{philosoph.biografie.spaetesLeben}</p>
            </div>
          )}
          {philosoph.biografie.tod && (
            <div>
              <h3 className="font-semibold text-ink mb-1">Tod</h3>
              <p>{philosoph.biografie.tod}</p>
            </div>
          )}
          {philosoph.biografie.nachwirkung && (
            <div>
              <h3 className="font-semibold text-ink mb-1">Nachwirkung</h3>
              <p>{philosoph.biografie.nachwirkung}</p>
            </div>
          )}
        </div>
      </section>

      {/* Kernideen */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb size={22} className="text-bordeaux" /> Kernideen
        </h2>
        <div className="space-y-2">
          {philosoph.kernideen.map((idee, i) => (
            <div
              key={i}
              className="bg-parchment-card border border-border-warm rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedIdea(expandedIdea === i ? null : i)
                }
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-border-warm/10 transition-colors"
              >
                <span className="font-semibold font-[family-name:var(--font-display)]">
                  {idee.titel}
                </span>
                {expandedIdea === i ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {expandedIdea === i && (
                <div className="px-4 pb-4 text-sm text-ink-light leading-relaxed border-t border-border-warm/50">
                  <p className="mt-3">{idee.beschreibung}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Werke */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen size={22} className="text-bordeaux" /> Werke
        </h2>
        <WerkeList werke={philosoph.werke} />
      </section>

      {/* Verwandte Philosophen */}
      {verwandte.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users size={22} className="text-bordeaux" /> Verwandte Philosophen
          </h2>
          <div className="flex flex-wrap gap-2">
            {verwandte.map((p) => (
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
      {philosoph.verwandteIsmen.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Verwandte Strömungen</h2>
          <div className="flex flex-wrap gap-2">
            {philosoph.verwandteIsmen.map((slug) => (
              <Link
                key={slug}
                href={`/ismen/${slug}`}
                className="px-3 py-2 bg-parchment-card border border-border-warm rounded-lg hover:border-bordeaux/50 transition-colors text-sm font-ui"
              >
                {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
