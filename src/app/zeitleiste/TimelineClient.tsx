"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import Link from "next/link";
import type { Philosoph, Ismus } from "@/types";
import { EPOCHE_FARBEN } from "@/types";

const EPOCHEN_RANGES: [string, number, number][] = [
  ["Antike", -600, 500],
  ["Mittelalter", 500, 1400],
  ["Renaissance", 1400, 1600],
  ["Aufklärung", 1600, 1800],
  ["19. Jahrhundert", 1800, 1900],
  ["20. Jahrhundert", 1900, 2000],
  ["Gegenwart", 2000, 2030],
];

interface TooltipData {
  name: string;
  slug: string;
  type: "philosoph" | "ismus";
  details: string;
  x: number;
  y: number;
}

export default function TimelineClient({
  philosophen,
  ismen,
}: {
  philosophen: Philosoph[];
  ismen: Ismus[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const drawTimeline = useCallback(() => {
    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    if (!container) return;

    svg.selectAll("*").remove();

    const width = container.clientWidth;
    const height = 600;
    const margin = { top: 40, right: 30, bottom: 40, left: 30 };

    svg.attr("width", width).attr("height", height);

    const xScale = d3
      .scaleLinear()
      .domain([-600, 2030])
      .range([margin.left, width - margin.right]);

    const g = svg.append("g");

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 20])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event) => {
        const newX = event.transform.rescaleX(xScale);
        updateChart(newX);
      });

    svg.call(zoom as never);

    function updateChart(xS: d3.ScaleLinear<number, number>) {
      g.selectAll("*").remove();

      // Epoch background bands
      EPOCHEN_RANGES.forEach(([name, start, end]) => {
        const x1 = Math.max(xS(start), margin.left);
        const x2 = Math.min(xS(end), width - margin.right);
        if (x2 <= x1) return;

        g.append("rect")
          .attr("x", x1)
          .attr("y", margin.top)
          .attr("width", x2 - x1)
          .attr("height", height - margin.top - margin.bottom)
          .attr("fill", EPOCHE_FARBEN[name] || "#999")
          .attr("opacity", 0.08);

        // Epoch label
        const midX = (x1 + x2) / 2;
        if (x2 - x1 > 40) {
          g.append("text")
            .attr("x", midX)
            .attr("y", margin.top + 16)
            .attr("text-anchor", "middle")
            .attr("fill", EPOCHE_FARBEN[name] || "#999")
            .attr("font-size", "11px")
            .attr("font-family", "Inter, sans-serif")
            .attr("font-weight", "600")
            .text(name);
        }
      });

      // Timeline axis line
      const axisY = height / 2;
      g.append("line")
        .attr("x1", margin.left)
        .attr("y1", axisY)
        .attr("x2", width - margin.right)
        .attr("y2", axisY)
        .attr("stroke", "#D4C5B2")
        .attr("stroke-width", 2);

      // Tick marks
      const ticks = xS.ticks(20);
      ticks.forEach((tick) => {
        const x = xS(tick);
        if (x < margin.left || x > width - margin.right) return;
        g.append("line")
          .attr("x1", x)
          .attr("y1", axisY - 6)
          .attr("x2", x)
          .attr("y2", axisY + 6)
          .attr("stroke", "#D4C5B2")
          .attr("stroke-width", 1);
        g.append("text")
          .attr("x", x)
          .attr("y", axisY + 22)
          .attr("text-anchor", "middle")
          .attr("fill", "#6B5344")
          .attr("font-size", "10px")
          .attr("font-family", "Inter, sans-serif")
          .text(tick < 0 ? `${Math.abs(tick)} v.Chr.` : `${tick}`);
      });

      // Philosopher dots (above timeline)
      philosophen.forEach((p, i) => {
        const x = xS(p.geboren.jahr);
        if (x < margin.left || x > width - margin.right) return;

        // Spread vertically to avoid overlap
        const row = i % 8;
        const y = axisY - 30 - row * 28;

        g.append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 5)
          .attr("fill", EPOCHE_FARBEN[p.epoche] || "#6B5344")
          .attr("stroke", "#FFFDF9")
          .attr("stroke-width", 1.5)
          .attr("cursor", "pointer")
          .on("mouseenter", (event: MouseEvent) => {
            setTooltip({
              name: p.name,
              slug: p.slug,
              type: "philosoph",
              details: p.lebensdaten,
              x: event.clientX,
              y: event.clientY,
            });
          })
          .on("mouseleave", () => setTooltip(null));

        // Label for major philosophers
        if (philosophen.indexOf(p) < 30) {
          g.append("text")
            .attr("x", x)
            .attr("y", y - 8)
            .attr("text-anchor", "middle")
            .attr("fill", "#3D2B1F")
            .attr("font-size", "8px")
            .attr("font-family", "Inter, sans-serif")
            .text(p.name.split(" ").pop() || p.name);
        }
      });
    }

    updateChart(xScale);
  }, [philosophen, ismen]);

  useEffect(() => {
    drawTimeline();
    const handleResize = () => drawTimeline();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawTimeline]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Zeitleiste</h1>
      <p className="text-ink-light mb-6">
        Interaktive Zeitleiste der Philosophiegeschichte. Zoomen mit dem
        Mausrad, verschieben durch Ziehen.
      </p>

      <div
        ref={containerRef}
        className="bg-parchment-card border border-border-warm rounded-xl overflow-hidden relative"
      >
        <svg ref={svgRef} className="w-full" />
        {tooltip && (
          <div
            className="fixed z-50 bg-sidebar-bg text-sidebar-text px-3 py-2 rounded-lg shadow-xl text-sm font-ui pointer-events-none"
            style={{ left: tooltip.x + 10, top: tooltip.y - 40 }}
          >
            <p className="font-semibold">{tooltip.name}</p>
            <p className="text-xs text-sidebar-text/70">{tooltip.details}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {EPOCHEN_RANGES.map(([name]) => (
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
