import { EPOCHE_FARBEN } from "@/types";

export function getEpocheFarbe(epoche: string): string {
  return EPOCHE_FARBEN[epoche] || "#6B5344";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function formatJahr(jahr: number): string {
  if (jahr < 0) return `${Math.abs(jahr)} v. Chr.`;
  return `${jahr} n. Chr.`;
}
