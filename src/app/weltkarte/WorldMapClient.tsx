"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import Link from "next/link";
import type { Philosoph } from "@/types";
import { EPOCHE_FARBEN } from "@/types";
import FilterTags from "@/components/ui/FilterTags";

const EPOCHEN = [
  "Antike",
  "Mittelalter",
  "Renaissance",
  "Aufklärung",
  "19. Jahrhundert",
  "20. Jahrhundert",
  "Gegenwart",
];

interface TooltipData {
  name: string;
  slug: string;
  lebensdaten: string;
  epoche: string;
  x: number;
  y: number;
}

// Simplified world map coordinates (major landmass outlines)
const WORLD_GEOJSON_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMapClient({
  philosophen,
}: {
  philosophen: Philosoph[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [selectedEpochen, setSelectedEpochen] = useState<string[]>([]);
  const [geoData, setGeoData] = useState<d3.ExtendedFeatureCollection | null>(null);

  useEffect(() => {
    fetch(WORLD_GEOJSON_URL)
      .then((res) => res.json())
      .then((topology) => {
        const countries = topojsonFeature(topology, topology.objects.countries);
        setGeoData(countries as unknown as d3.ExtendedFeatureCollection);
      })
      .catch(() => {
        // Fallback: draw without map background
        setGeoData({ type: "FeatureCollection", features: [] } as unknown as d3.ExtendedFeatureCollection);
      });
  }, []);

  const toggleEpoche = (epoche: string) => {
    setSelectedEpochen((prev) =>
      prev.includes(epoche)
        ? prev.filter((e) => e !== epoche)
        : [...prev, epoche]
    );
  };

  const drawMap = useCallback(() => {
    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    if (!container) return;

    svg.selectAll("*").remove();

    const width = container.clientWidth;
    const height = 500;
    svg.attr("width", width).attr("height", height);

    const projection = d3
      .geoNaturalEarth1()
      .scale(width / 5.5)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath(projection);

    const g = svg.append("g");

    // Zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom as never);

    // Draw simple map background (rectangles for continents approximation)
    g.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#E8DCC8")
      .attr("opacity", 0.3);

    // If geo data loaded, draw countries
    if (geoData && geoData.features.length > 0) {
      g.selectAll("path")
        .data(geoData.features)
        .join("path")
        .attr("d", path as never)
        .attr("fill", "#D4C5B2")
        .attr("stroke", "#F5F0E8")
        .attr("stroke-width", 0.5);
    }

    // Filter philosophers
    const filtered =
      selectedEpochen.length > 0
        ? philosophen.filter((p) => selectedEpochen.includes(p.epoche))
        : philosophen;

    // Draw philosopher dots
    filtered.forEach((p) => {
      if (!p.geboren.lat || !p.geboren.lng) return;
      const coords = projection([p.geboren.lng, p.geboren.lat]);
      if (!coords) return;

      g.append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 5)
        .attr("fill", EPOCHE_FARBEN[p.epoche] || "#6B5344")
        .attr("stroke", "#FFFDF9")
        .attr("stroke-width", 1.5)
        .attr("cursor", "pointer")
        .attr("opacity", 0.85)
        .on("mouseenter", (event: MouseEvent) => {
          setTooltip({
            name: p.name,
            slug: p.slug,
            lebensdaten: p.lebensdaten,
            epoche: p.epoche,
            x: event.clientX,
            y: event.clientY,
          });
        })
        .on("mouseleave", () => setTooltip(null));
    });
  }, [philosophen, selectedEpochen, geoData]);

  useEffect(() => {
    drawMap();
    const handleResize = () => drawMap();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawMap]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Weltkarte</h1>
      <p className="text-ink-light mb-4">
        Philosophen nach Geburtsort. Zoomen und verschieben mit der Maus.
      </p>

      <div className="mb-4">
        <FilterTags
          options={EPOCHEN}
          selected={selectedEpochen}
          onToggle={toggleEpoche}
          label="Epoche"
        />
      </div>

      <div
        ref={containerRef}
        className="bg-parchment-card border border-border-warm rounded-xl overflow-hidden relative"
      >
        <svg ref={svgRef} className="w-full" />
        {tooltip && (
          <Link
            href={`/philosophen/${tooltip.slug}`}
            className="fixed z-50 bg-sidebar-bg text-sidebar-text px-3 py-2 rounded-lg shadow-xl text-sm font-ui"
            style={{ left: tooltip.x + 10, top: tooltip.y - 50 }}
          >
            <p className="font-semibold">{tooltip.name}</p>
            <p className="text-xs text-sidebar-text/70">
              {tooltip.lebensdaten}
            </p>
            <p className="text-xs text-gold">{tooltip.epoche}</p>
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {EPOCHEN.map((name) => (
          <span key={name} className="flex items-center gap-1.5 text-xs font-ui">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: EPOCHE_FARBEN[name] }}
            />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

// Simple topojson feature extraction
function topojsonFeature(topology: Record<string, unknown>, obj: Record<string, unknown>) {
  const arcs = topology.arcs as number[][][];

  function arcToCoords(arcIndex: number): number[][] {
    const arc = arcs[arcIndex < 0 ? ~arcIndex : arcIndex];
    if (!arc) return [];
    const coords: number[][] = [];
    let x = 0, y = 0;
    const transform = topology.transform as { scale: [number, number]; translate: [number, number] } | undefined;
    for (const point of arc) {
      x += point[0];
      y += point[1];
      if (transform) {
        coords.push([
          x * transform.scale[0] + transform.translate[0],
          y * transform.scale[1] + transform.translate[1],
        ]);
      } else {
        coords.push([x, y]);
      }
    }
    if (arcIndex < 0) coords.reverse();
    return coords;
  }

  function decodeRing(arcIndices: number[]): number[][] {
    const coords: number[][] = [];
    for (const idx of arcIndices) {
      const arcCoords = arcToCoords(idx);
      coords.push(...arcCoords);
    }
    return coords;
  }

  const geometries = (obj as { geometries: { type: string; arcs: number[][] | number[][][]; id?: string }[] }).geometries;
  const features = geometries.map((geom) => {
    let geometry: Record<string, unknown>;
    if (geom.type === "Polygon") {
      geometry = {
        type: "Polygon",
        coordinates: (geom.arcs as number[][]).map(decodeRing),
      };
    } else if (geom.type === "MultiPolygon") {
      geometry = {
        type: "MultiPolygon",
        coordinates: (geom.arcs as number[][][]).map((polygon) =>
          polygon.map(decodeRing)
        ),
      };
    } else {
      geometry = { type: geom.type };
    }
    return {
      type: "Feature",
      properties: { id: geom.id },
      geometry,
    };
  });

  return { type: "FeatureCollection", features };
}
