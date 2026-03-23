import fs from "fs";
import path from "path";
import type { Philosoph, Ismus, RelationsData } from "@/types";

const dataDir = path.join(process.cwd(), "src", "data");

export function getAllPhilosophen(): Philosoph[] {
  const dir = path.join(dataDir, "philosophen");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), "utf-8");
    return JSON.parse(content) as Philosoph;
  });
}

export function getPhilosophBySlug(slug: string): Philosoph | null {
  const filePath = path.join(dataDir, "philosophen", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Philosoph;
}

export function getAllPhilosophenSlugs(): string[] {
  const dir = path.join(dataDir, "philosophen");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function getAllIsmen(): Ismus[] {
  const dir = path.join(dataDir, "ismen");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), "utf-8");
    return JSON.parse(content) as Ismus;
  });
}

export function getIsmusBySlug(slug: string): Ismus | null {
  const filePath = path.join(dataDir, "ismen", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Ismus;
}

export function getAllIsmenSlugs(): string[] {
  const dir = path.join(dataDir, "ismen");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function getRelations(): RelationsData {
  const filePath = path.join(dataDir, "relations.json");
  if (!fs.existsSync(filePath)) return { relationen: [] };
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as RelationsData;
}
