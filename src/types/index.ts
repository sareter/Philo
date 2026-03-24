export interface GeoLocation {
  jahr: number;
  ort: string;
  land?: string;
  lat?: number;
  lng?: number;
}

export interface BiografieAbschnitt {
  fruehesLeben: string;
  schaffen: string;
  spaetesLeben: string;
  tod: string;
  nachwirkung: string;
}

export interface Kernidee {
  titel: string;
  beschreibung: string;
}

export interface Werk {
  titel: string;
  jahr: string;
  beschreibung: string;
}

export interface Zitat {
  text: string;
  quelle: string;
  kontext?: string;
}

export interface PhilosophEinfach {
  kurzbeschreibung: string;
  biografie: BiografieAbschnitt;
  kernideen: Kernidee[];
  werke: Werk[];
}

export interface Philosoph {
  slug: string;
  name: string;
  lebensdaten: string;
  geboren: GeoLocation;
  gestorben: GeoLocation;
  epoche: Epoche;
  region: string;
  hauptstroemungen: string[];
  kurzbeschreibung: string;
  biografie: BiografieAbschnitt;
  kernideen: Kernidee[];
  werke: Werk[];
  zitate: Zitat[];
  verwandtePhilosophen: string[];
  verwandteIsmen: string[];
  einfach?: PhilosophEinfach;
}

export interface Schluesselwerk {
  titel: string;
  autor: string;
  jahr: string;
}

export interface IsmusEinfach {
  kurzbeschreibung: string;
  ausfuehrlicheBeschreibung: string;
  kernthesen: string[];
  entstehung: string;
  kritik: string;
}

export interface Ismus {
  slug: string;
  name: string;
  epoche: string;
  kurzbeschreibung: string;
  ausfuehrlicheBeschreibung: string;
  kernthesen: string[];
  hauptvertreter: string[];
  entstehung: string;
  kritik: string;
  verwandteIsmen: string[];
  schluesselwerke: Schluesselwerk[];
  einfach?: IsmusEinfach;
}

export type Epoche =
  | "Antike"
  | "Mittelalter"
  | "Renaissance"
  | "Aufklärung"
  | "19. Jahrhundert"
  | "20. Jahrhundert"
  | "Gegenwart";

export interface Relation {
  von: string;
  zu: string;
  typ: "lehrer" | "einfluss" | "kritik" | "zeitgenosse" | "schueler";
  beschreibung?: string;
}

export interface RelationsData {
  relationen: Relation[];
}

export const EPOCHE_FARBEN: Record<string, string> = {
  "Antike": "#B8860B",
  "Mittelalter": "#2D5016",
  "Renaissance": "#8B4513",
  "Aufklärung": "#1E5B8A",
  "19. Jahrhundert": "#6B2D5B",
  "20. Jahrhundert": "#8B2500",
  "Gegenwart": "#2C5F2D",
};
