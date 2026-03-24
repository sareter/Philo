/**
 * Hierarchische Einordnung aller Ismen.
 * Jeder Knoten hat einen Label und entweder children (Unterkategorien)
 * oder einen slug (Verweis auf eine Ismus-JSON-Datei).
 * Ein Knoten kann beides haben – slug UND children – wenn der Oberbegriff
 * selbst auch ein Ismus ist (z.B. "Idealismus" ist ein Ismus UND hat Unter-Ismen).
 */

export interface HierarchieKnoten {
  label: string;
  slug?: string; // Verweis auf ismen/*.json
  beschreibung?: string; // Kurzbeschreibung für reine Kategorieknoten
  children?: HierarchieKnoten[];
}

export const ismenHierarchie: HierarchieKnoten[] = [
  {
    label: "Metaphysik & Ontologie",
    beschreibung: "Was ist die grundlegende Natur der Wirklichkeit?",
    children: [
      {
        label: "Idealismus",
        slug: "idealismus",
        children: [
          { label: "Platonismus", slug: "platonismus" },
          { label: "Neoplatonismus", slug: "neoplatonismus" },
          { label: "Hegelianismus", slug: "hegelianismus" },
        ],
      },
      {
        label: "Materialismus",
        slug: "materialismus",
        children: [
          { label: "Atomismus", slug: "atomismus" },
          { label: "Marxismus", slug: "marxismus" },
        ],
      },
      {
        label: "Realismus",
        slug: "realismus",
        children: [
          { label: "Anti-Realismus", slug: "anti-realismus" },
        ],
      },
      {
        label: "Dualismus",
        slug: "dualismus",
        children: [
          { label: "Cartesianismus", slug: "cartesianismus" },
        ],
      },
      {
        label: "Monismus",
        slug: "monismus",
        children: [
          { label: "Pantheismus", slug: "pantheismus" },
        ],
      },
      { label: "Determinismus", slug: "determinismus" },
      { label: "Solipsismus", slug: "solipsismus" },
      { label: "Naturalismus", slug: "naturalismus" },
    ],
  },
  {
    label: "Erkenntnistheorie",
    beschreibung: "Wie erlangen wir Wissen und was können wir wissen?",
    children: [
      {
        label: "Rationalismus",
        slug: "rationalismus",
        children: [
          { label: "Kantianismus", slug: "kantianismus" },
          { label: "Foundationalismus", slug: "foundationalismus" },
        ],
      },
      {
        label: "Empirismus",
        slug: "empirismus",
        children: [
          {
            label: "Positivismus",
            slug: "positivismus",
            children: [
              { label: "Logischer Positivismus", slug: "logischer-positivismus" },
            ],
          },
          { label: "Szientismus", slug: "szientismus" },
        ],
      },
      {
        label: "Skeptizismus",
        slug: "skeptizismus",
        children: [
          { label: "Agnostizismus", slug: "agnostizismus" },
          { label: "Fallibilismus", slug: "fallibilismus" },
          { label: "Antifoundationalismus", slug: "antifoundationalismus" },
        ],
      },
      {
        label: "Pragmatismus",
        slug: "pragmatismus",
        children: [
          { label: "Instrumentalismus", slug: "instrumentalismus" },
        ],
      },
      { label: "Konstruktivismus", slug: "konstruktivismus" },
      { label: "Kohärentismus", slug: "koharentismus" },
      { label: "Relativismus", slug: "relativismus" },
      { label: "Kontextualismus", slug: "kontextualismus" },
    ],
  },
  {
    label: "Ethik & Moral",
    beschreibung: "Was ist richtig und falsch? Wie soll man handeln?",
    children: [
      {
        label: "Konsequentialismus",
        slug: "konsequentialismus",
        children: [
          { label: "Utilitarismus", slug: "utilitarismus" },
          { label: "Hedonismus", slug: "hedonismus" },
        ],
      },
      {
        label: "Deontologie",
        slug: "deontologie",
        children: [
          { label: "Pflichtethik", slug: "pflichtethik" },
        ],
      },
      { label: "Tugendethik", slug: "tugendethik" },
      {
        label: "Metaethik",
        slug: "metaethik",
        children: [
          { label: "Emotivismus", slug: "emotivismus" },
          { label: "Kognitivismus", slug: "kognitivismus" },
          { label: "Expressivismus", slug: "expressivismus" },
          { label: "Normativismus", slug: "normativismus" },
          { label: "Objektivismus", slug: "objektivismus" },
          { label: "Subjektivismus", slug: "subjektivismus" },
          { label: "Intuitionismus", slug: "intuitionismus" },
        ],
      },
      {
        label: "Angewandte Ethik",
        beschreibung: "Ethische Fragen in konkreten Lebensbereichen",
        children: [
          { label: "Bioethik", slug: "bioethik" },
          { label: "Tierethik", slug: "tierethik" },
          { label: "Umweltethik", slug: "umweltethik" },
        ],
      },
    ],
  },
  {
    label: "Politische Philosophie",
    beschreibung: "Wie soll die Gesellschaft organisiert sein?",
    children: [
      {
        label: "Liberalismus",
        slug: "liberalismus",
        children: [
          { label: "Libertarismus", slug: "libertarismus" },
        ],
      },
      {
        label: "Sozialismus",
        slug: "sozialismus",
        children: [
          { label: "Kommunismus", slug: "kommunismus" },
          { label: "Kritische Theorie", slug: "kritische-theorie" },
        ],
      },
      { label: "Konservatismus", slug: "konservatismus" },
      { label: "Anarchismus", slug: "anarchismus" },
      { label: "Republikanismus", slug: "republikanismus" },
      { label: "Kontraktualismus", slug: "kontraktualismus" },
      { label: "Egalitarismus", slug: "egalitarismus" },
      { label: "Kommunitarismus", slug: "kommunitarismus" },
      { label: "Kosmopolitismus", slug: "kosmopolitismus" },
      { label: "Absolutismus", slug: "absolutismus" },
      { label: "Utopismus", slug: "utopismus" },
    ],
  },
  {
    label: "Existenz & Sinn",
    beschreibung: "Was bedeutet es zu existieren? Was gibt dem Leben Sinn?",
    children: [
      {
        label: "Existenzialismus",
        slug: "existenzialismus",
        children: [
          { label: "Nihilismus", slug: "nihilismus" },
          { label: "Pessimismus", slug: "pessimismus" },
        ],
      },
      { label: "Humanismus", slug: "humanismus" },
      { label: "Optimismus", slug: "optimismus" },
      { label: "Transhumanismus", slug: "transhumanismus" },
      {
        label: "Phänomenologie",
        slug: "phenomenologie",
        children: [
          { label: "Hermeneutik", slug: "hermeneutik" },
        ],
      },
    ],
  },
  {
    label: "Sprache, Geist & Erkenntnis",
    beschreibung: "Wie funktioniert Sprache? Was ist Bewusstsein?",
    children: [
      {
        label: "Analytische Philosophie",
        slug: "analytische-philosophie",
        children: [
          { label: "Sprachphilosophie", slug: "sprachphilosophie" },
          { label: "Behaviorismus", slug: "behaviorismus" },
          { label: "Funktionalismus", slug: "funktionalismus" },
        ],
      },
      {
        label: "Strukturalismus",
        slug: "strukturalismus",
        children: [
          { label: "Poststrukturalismus", slug: "poststrukturalismus" },
          { label: "Dekonstruktivismus", slug: "dekonstruktivismus" },
        ],
      },
      { label: "Philosophie des Geistes", slug: "philosophie-des-geistes" },
      {
        label: "Kontinentalphilosophie",
        slug: "kontinentalphilosophie",
        children: [
          { label: "Postmodernismus", slug: "postmodernismus" },
        ],
      },
    ],
  },
  {
    label: "Religion & Glaube",
    beschreibung: "Gibt es Gott? Was ist das Verhältnis von Glaube und Vernunft?",
    children: [
      {
        label: "Theismus",
        slug: "theismus",
        children: [
          { label: "Deismus", slug: "deismus" },
        ],
      },
      { label: "Atheismus", slug: "atheismus" },
      { label: "Mystizismus", slug: "mystizismus" },
      {
        label: "Scholastik",
        slug: "scholastik",
        children: [
          { label: "Thomismus", slug: "thomismus" },
          { label: "Nominalismus", slug: "nominalismus" },
        ],
      },
    ],
  },
  {
    label: "Kultur, Geschichte & Ästhetik",
    beschreibung: "Wie verstehen wir Kultur, Geschichte und Schönheit?",
    children: [
      { label: "Romantizismus", slug: "romantizismus" },
      { label: "Ästhetizismus", slug: "esthetizismus" },
      { label: "Historismus", slug: "historismus" },
      { label: "Feminismus", slug: "feminismus" },
      {
        label: "Universalismus",
        slug: "universalismus",
        children: [
          { label: "Partikularismus", slug: "partikularismus" },
        ],
      },
    ],
  },
  {
    label: "Antike Schulen",
    beschreibung: "Die großen Denkschulen der griechisch-römischen Antike",
    children: [
      { label: "Stoizismus", slug: "stoizismus" },
      { label: "Epikureismus", slug: "epikureismus" },
      { label: "Zynismus", slug: "zynismus" },
      { label: "Sophismus", slug: "sophismus" },
      { label: "Aristotelismus", slug: "aristotelismus" },
    ],
  },
];
