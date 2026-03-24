/**
 * Hierarchische Einordnung aller ~300 Ismen.
 * Jeder Knoten hat einen Label und entweder children (Unterkategorien)
 * oder einen slug (Verweis auf eine Ismus-JSON-Datei).
 * Ein Knoten kann beides haben – slug UND children – wenn der Oberbegriff
 * selbst auch ein Ismus ist (z.B. "Idealismus" ist ein Ismus UND hat Unter-Ismen).
 */

export interface HierarchieKnoten {
  label: string;
  slug?: string;
  beschreibung?: string;
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
          { label: "Pragmatischer Idealismus", slug: "pragmatischer-idealismus" },
          { label: "Immaterialismus", slug: "immaterialismus" },
        ],
      },
      {
        label: "Materialismus",
        slug: "materialismus",
        children: [
          { label: "Atomismus", slug: "atomismus" },
          { label: "Marxismus", slug: "marxismus" },
          { label: "Neuer Materialismus", slug: "neuer-materialismus" },
        ],
      },
      {
        label: "Realismus",
        slug: "realismus",
        children: [
          { label: "Anti-Realismus", slug: "anti-realismus" },
          { label: "Kritischer Realismus", slug: "kritischer-realismus" },
          { label: "Spekulativer Realismus", slug: "spekulativer-realismus" },
          { label: "Agentieller Realismus", slug: "agentieller-realismus" },
        ],
      },
      {
        label: "Dualismus",
        slug: "dualismus",
        children: [
          { label: "Cartesianismus", slug: "cartesianismus" },
          { label: "Parallelismus", slug: "parallelismus" },
          { label: "Interaktionismus", slug: "interaktionismus" },
          { label: "Epiphänomenalismus", slug: "epiphaenomenalismus" },
          { label: "Occasionalismus", slug: "occasionalismus" },
          { label: "Digitaler Dualismus", slug: "digitaler-dualismus" },
        ],
      },
      {
        label: "Monismus",
        slug: "monismus",
        children: [
          { label: "Pantheismus", slug: "pantheismus" },
          { label: "Panpsychismus", slug: "panpsychismus" },
          { label: "Panentheismus", slug: "panentheismus" },
          { label: "Animismus", slug: "animismus" },
        ],
      },
      { label: "Determinismus", slug: "determinismus" },
      { label: "Fatalismus", slug: "fatalismus" },
      { label: "Voluntarismus", slug: "voluntarismus" },
      { label: "Vitalismus", slug: "vitalismus" },
      { label: "Emergentismus", slug: "emergentismus" },
      { label: "Hylomorphismus", slug: "hylomorphismus" },
      { label: "Solipsismus", slug: "solipsismus" },
      { label: "Naturalismus", slug: "naturalismus" },
      {
        label: "Ontologischer Nihilismus",
        beschreibung: "Nichts existiert wirklich",
        children: [
          { label: "Mereologischer Nihilismus", slug: "mereologischer-nihilismus" },
          { label: "Kompositionaler Nihilismus", slug: "kompositionaler-nihilismus" },
        ],
      },
      {
        label: "Neue Ontologien",
        beschreibung: "Zeitgenössische Ansätze zur Seinsphilosophie",
        children: [
          { label: "Objektorientierte Ontologie", slug: "objektorientierte-ontologie" },
          { label: "Flache Ontologie", slug: "flacher-ontologie" },
          { label: "Prozessphilosophie", slug: "prozessphilosophie" },
        ],
      },
      { label: "Simulationstheorie", slug: "simulationstheorie" },
      { label: "Kosmismus", slug: "kosmismus" },
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
          { label: "Neukantianismus", slug: "neukantianismus" },
          { label: "Foundationalismus", slug: "foundationalismus" },
          { label: "Fallibilistischer Rationalismus", slug: "fallibilistischer-rationalismus" },
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
              { label: "Logischer Atomismus", slug: "logischer-atomismus" },
            ],
          },
          { label: "Szientismus", slug: "szientismus" },
          { label: "Naturalistische Erkenntnistheorie", slug: "naturalistische-erkenntnistheorie" },
          { label: "Phänomenalismus", slug: "phaenomenalismus" },
        ],
      },
      {
        label: "Skeptizismus",
        slug: "skeptizismus",
        children: [
          { label: "Pyrrhonismus", slug: "pyrrhonismus" },
          { label: "Akademischer Skeptizismus", slug: "akademischer-skeptizismus" },
          { label: "Agnostizismus", slug: "agnostizismus" },
          { label: "Fallibilismus", slug: "fallibilismus" },
          { label: "Antifoundationalismus", slug: "antifoundationalismus" },
          { label: "Moral-Skeptizismus", slug: "moral-skeptizismus" },
          { label: "Epistemischer Nihilismus", slug: "epistemischer-nihilismus" },
        ],
      },
      {
        label: "Pragmatismus",
        slug: "pragmatismus",
        children: [
          { label: "Instrumentalismus", slug: "instrumentalismus" },
          { label: "Neopragmatismus", slug: "neopragmatismus" },
          { label: "Experimentalismus", slug: "experimentalismus" },
        ],
      },
      {
        label: "Wissenschaftstheorie",
        beschreibung: "Wie funktioniert wissenschaftliche Erkenntnis?",
        children: [
          { label: "Kritischer Rationalismus", slug: "kritischer-rationalismus" },
          { label: "Falsifikationismus", slug: "falsifikationismus" },
          { label: "Verifikationismus", slug: "verifikationismus" },
          { label: "Operationalismus", slug: "operationalismus" },
        ],
      },
      { label: "Konstruktivismus", slug: "konstruktivismus" },
      { label: "Sozialer Konstruktivismus", slug: "sozialer-konstruktivismus" },
      { label: "Radikaler Konstruktivismus", slug: "radikaler-konstruktivismus" },
      { label: "Kohärentismus", slug: "koharentismus" },
      { label: "Reliabilismus", slug: "reliabilismus" },
      { label: "Internalismus", slug: "internalismus" },
      { label: "Externalismus", slug: "externalismus" },
      { label: "Probabilismus", slug: "probabilismus" },
      { label: "Perspektivismus", slug: "perspektivismus" },
      { label: "Holismus", slug: "holismus" },
      { label: "Reduktionismus", slug: "reduktionismus" },
      { label: "Relativismus", slug: "relativismus" },
      { label: "Kontextualismus", slug: "kontextualismus" },
      { label: "Irrationalismus", slug: "irrationalismus" },
      { label: "Fideismus", slug: "fideismus" },
      { label: "Informationsphilosophie", slug: "informationsphilosophie" },
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
          { label: "Negativer Utilitarismus", slug: "negativer-utilitarismus" },
          { label: "Hedonismus", slug: "hedonismus" },
          { label: "Effektiver Altruismus", slug: "effektiver-altruismus" },
        ],
      },
      {
        label: "Deontologie",
        slug: "deontologie",
        children: [
          { label: "Pflichtethik", slug: "pflichtethik" },
          { label: "Rigorismus", slug: "rigorismus" },
          { label: "Gesinnungsethik", slug: "gesinnungsethik" },
        ],
      },
      {
        label: "Tugendethik",
        slug: "tugendethik",
        children: [
          { label: "Eudämonismus", slug: "eudaemonismus" },
          { label: "Neoaristotelismus", slug: "neoaristotelismus" },
          { label: "Perfektionismus", slug: "perfektionismus" },
        ],
      },
      {
        label: "Metaethik",
        slug: "metaethik",
        children: [
          { label: "Emotivismus", slug: "emotivismus" },
          { label: "Kognitivismus", slug: "kognitivismus" },
          { label: "Non-Kognitivismus", slug: "non-kognitivismus" },
          { label: "Expressivismus", slug: "expressivismus" },
          { label: "Präskriptivismus", slug: "praeskriptivismus" },
          { label: "Normativismus", slug: "normativismus" },
          { label: "Objektivismus", slug: "objektivismus" },
          { label: "Subjektivismus", slug: "subjektivismus" },
          { label: "Intuitionismus", slug: "intuitionismus" },
          { label: "Ethischer Naturalismus", slug: "ethischer-naturalismus" },
          { label: "Ethischer Non-Naturalismus", slug: "ethischer-non-naturalismus" },
          { label: "Moralischer Relativismus", slug: "moralischer-relativismus" },
          { label: "Wertnihilismus", slug: "wertnihilismus" },
        ],
      },
      {
        label: "Andere ethische Ansätze",
        beschreibung: "Weitere normative und angewandte Perspektiven",
        children: [
          { label: "Altruismus", slug: "altruismus" },
          { label: "Egoismus", slug: "egoismus" },
          { label: "Amoralismus", slug: "amoralismus" },
          { label: "Care-Ethik", slug: "care-ethik" },
          { label: "Diskursethik", slug: "diskursethik" },
          { label: "Verantwortungsethik", slug: "verantwortungsethik" },
          { label: "Situationsethik", slug: "situationsethik" },
          { label: "Kasuistik", slug: "kasuistik" },
          { label: "Proportionalismus", slug: "proportionalismus" },
          { label: "Sentientismus", slug: "sentientismus" },
          { label: "Kontraktarianismus", slug: "kontraktarianismus" },
        ],
      },
      {
        label: "Angewandte Ethik",
        beschreibung: "Ethische Fragen in konkreten Lebensbereichen",
        children: [
          { label: "Bioethik", slug: "bioethik" },
          { label: "Tierethik", slug: "tierethik" },
          { label: "Utilitaristische Tierethik", slug: "utilitaristischer-tierethik" },
          { label: "Umweltethik", slug: "umweltethik" },
          { label: "Algorithmische Ethik", slug: "algorithmische-ethik" },
          { label: "Speziesismus", slug: "speziesismus" },
        ],
      },
      {
        label: "Rechtsphilosophie",
        beschreibung: "Was ist Recht und Gerechtigkeit?",
        children: [
          { label: "Rechtspositivismus", slug: "rechtspositivismus" },
          { label: "Naturrechtsphilosophie", slug: "naturrechtsphilosophie" },
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
          { label: "Neoliberalismus", slug: "neoliberalismus" },
          { label: "Ordoliberalismus", slug: "ordoliberalismus" },
          { label: "Kommunitaristischer Liberalismus", slug: "kommunitaristischer-liberalismus" },
        ],
      },
      {
        label: "Sozialismus",
        slug: "sozialismus",
        children: [
          { label: "Kommunismus", slug: "kommunismus" },
          { label: "Neomarxismus", slug: "neomarxismus" },
          { label: "Kritische Theorie", slug: "kritische-theorie" },
          { label: "Demokratischer Sozialismus", slug: "demokratischer-sozialismus" },
          { label: "Sozialdemokratismus", slug: "sozialdemokratismus" },
          { label: "Libertärer Sozialismus", slug: "libertaerer-sozialismus" },
        ],
      },
      {
        label: "Anarchismus",
        slug: "anarchismus",
        children: [
          { label: "Anarcho-Kapitalismus", slug: "anarcho-kapitalismus" },
          { label: "Anarcho-Kommunismus", slug: "anarcho-kommunismus" },
          { label: "Anarcho-Primitivismus", slug: "anarcho-primitivismus" },
          { label: "Mutualismus", slug: "mutualism" },
          { label: "Syndikalismus", slug: "syndikalismus" },
          { label: "Grüner Anarchismus", slug: "gruener-anarchismus" },
          { label: "Postanarchismus", slug: "postanarchismus" },
          { label: "Anarcho-Nihilismus", slug: "anarcho-nihilismus" },
        ],
      },
      { label: "Konservatismus", slug: "konservatismus" },
      { label: "Republikanismus", slug: "republikanismus" },
      { label: "Kontraktualismus", slug: "kontraktualismus" },
      { label: "Egalitarismus", slug: "egalitarismus" },
      { label: "Kommunitarismus", slug: "kommunitarismus" },
      { label: "Kosmopolitismus", slug: "kosmopolitismus" },
      { label: "Absolutismus", slug: "absolutismus" },
      { label: "Utopismus", slug: "utopismus" },
      {
        label: "Autoritäre Ideologien",
        beschreibung: "Machtkonzentration und Kontrolle",
        children: [
          { label: "Totalitarismus", slug: "totalitarismus" },
          { label: "Nationalismus", slug: "nationalismus" },
          { label: "Imperialismus", slug: "imperialismus" },
          { label: "Monarchismus", slug: "monarchismus" },
          { label: "Theokratismus", slug: "theokratismus" },
        ],
      },
      {
        label: "Demokratietheorie",
        beschreibung: "Verschiedene Demokratieverständnisse",
        children: [
          { label: "Deliberative Demokratie", slug: "deliberative-demokratie" },
          { label: "Agonistische Demokratie", slug: "agonistische-demokratie" },
          { label: "Populismus", slug: "populismus" },
        ],
      },
      { label: "Föderalismus", slug: "foederalismus" },
      { label: "Pluralismus", slug: "pluralismus" },
      { label: "Korporatismus", slug: "korporatismus" },
      { label: "Distributismus", slug: "distributismus" },
      { label: "Technokratismus", slug: "technokratismus" },
      { label: "Meritokratismus", slug: "meritokratismus" },
      { label: "Dezisionismus", slug: "dezisionismus" },
      {
        label: "Biopolitik & Nekropolitik",
        beschreibung: "Macht über Leben und Tod",
        children: [
          { label: "Biopolitik", slug: "biopolitik" },
          { label: "Nekropolitik", slug: "nekropolitik" },
        ],
      },
    ],
  },
  {
    label: "Existenz, Sinn & Dunkelheit",
    beschreibung: "Was bedeutet es zu existieren? Hat das Leben Sinn? Die dunkelsten Fragen der Philosophie.",
    children: [
      {
        label: "Existenzialismus",
        slug: "existenzialismus",
        children: [
          { label: "Existenzialanalyse", slug: "existenzialanalyse" },
          { label: "Neo-Existenzialismus", slug: "neo-existenzialismus" },
          { label: "Absurdismus", slug: "absurdismus" },
          { label: "Absurder Heroismus", slug: "absurder-heroismus" },
        ],
      },
      {
        label: "Nihilismus",
        slug: "nihilismus",
        children: [
          { label: "Existenzieller Nihilismus", slug: "existenzieller-nihilismus" },
          { label: "Epistemischer Nihilismus", slug: "epistemischer-nihilismus" },
          { label: "Passiver Nihilismus", slug: "passiver-nihilismus" },
          { label: "Aktiver Nihilismus", slug: "aktiver-nihilismus" },
          { label: "Post-Nihilismus", slug: "post-nihilismus" },
          { label: "Emotionaler Nihilismus", slug: "emotionaler-nihilismus" },
          { label: "Nihilistischer Pessimismus", slug: "nihilistischer-pessimismus" },
        ],
      },
      {
        label: "Pessimismus",
        slug: "pessimismus",
        children: [
          { label: "Kosmischer Pessimismus", slug: "kosmischer-pessimismus" },
          { label: "Defätismus", slug: "defaetismus" },
          { label: "Tragizismus", slug: "tragizismus" },
        ],
      },
      {
        label: "Die dunkelsten Fragen",
        beschreibung: "Philosophien des Leidens, der Einsamkeit und der Vergeblichkeit",
        children: [
          { label: "Antinatalism", slug: "antinatalism" },
          { label: "Misanthropismus", slug: "misanthropismus" },
          { label: "Philosophischer Suizidismus", slug: "philosophischer-suizidismus" },
          { label: "Weltschmerz-Philosophie", slug: "weltschmerz-philosophie" },
          { label: "Melancholismus", slug: "melancholismus" },
          { label: "Leidensphilosophie", slug: "leidensphilosophie" },
          { label: "Einsamkeitsphilosophie", slug: "einsamkeitsphilosophie" },
          { label: "Angstphilosophie", slug: "angstphilosophie" },
          { label: "Vergeblichkeitsphilosophie", slug: "vergeblichkeitsphilosophie" },
          { label: "Enttäuschungsphilosophie", slug: "enttaeuschungsphilosophie" },
          { label: "Langeweilephilosophie", slug: "langeweilephilosophie" },
          { label: "Todesphilosophie", slug: "todesphilosophie" },
          { label: "Entfremdungsphilosophie", slug: "entfremdungsphilosophie" },
          { label: "Dekadentismus", slug: "dekadentismus" },
        ],
      },
      {
        label: "Sinn & Hoffnung",
        beschreibung: "Philosophien, die trotz allem Sinn suchen",
        children: [
          { label: "Humanismus", slug: "humanismus" },
          { label: "Optimismus", slug: "optimismus" },
          { label: "Logotherapie", slug: "logotherapie" },
          { label: "Philosophische Praxis", slug: "philosophische-praxis" },
          { label: "Personalismus", slug: "personalismus" },
        ],
      },
      {
        label: "Phänomenologie",
        slug: "phenomenologie",
        children: [
          { label: "Hermeneutik", slug: "hermeneutik" },
          { label: "Neue Phänomenologie", slug: "neue-phaenomenologie" },
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
          { label: "Logischer Atomismus", slug: "logischer-atomismus" },
          { label: "Ordinary Language Philosophy", slug: "ordinary-language-philosophy" },
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
      { label: "Formalismus", slug: "formalismus" },
      { label: "Konventionalismus", slug: "konventionalismus" },
      { label: "Konzeptualismus", slug: "konzeptualismus" },
      {
        label: "Systemdenken",
        beschreibung: "Ganzheitliche Ansätze zum Verständnis der Wirklichkeit",
        children: [
          { label: "Kybernetik", slug: "kybernetik" },
          { label: "Systemtheorie", slug: "systemtheorie" },
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
          { label: "Monotheismus", slug: "monotheismus" },
          { label: "Polytheismus", slug: "polytheismus" },
          { label: "Deismus", slug: "deismus" },
          { label: "Panentheismus", slug: "panentheismus" },
        ],
      },
      { label: "Atheismus", slug: "atheismus" },
      { label: "Agnostizismus", slug: "agnostizismus" },
      {
        label: "Mystik & Innerlichkeit",
        beschreibung: "Spirituelle Erfahrung und innere Erkenntnis",
        children: [
          { label: "Mystizismus", slug: "mystizismus" },
          { label: "Gnostizismus", slug: "gnostizismus" },
          { label: "Apophatismus", slug: "apophatismus" },
          { label: "Pietismus", slug: "pietismus" },
          { label: "Sufismus", slug: "sufismus" },
        ],
      },
      {
        label: "Scholastik",
        slug: "scholastik",
        children: [
          { label: "Thomismus", slug: "thomismus" },
          { label: "Nominalismus", slug: "nominalismus" },
        ],
      },
      { label: "Fideismus", slug: "fideismus" },
      { label: "Theokratismus", slug: "theokratismus" },
    ],
  },
  {
    label: "Kultur, Geschichte & Ästhetik",
    beschreibung: "Wie verstehen wir Kultur, Geschichte und Schönheit?",
    children: [
      {
        label: "Ästhetische Strömungen",
        beschreibung: "Philosophien der Kunst und Schönheit",
        children: [
          { label: "Ästhetizismus", slug: "esthetizismus" },
          { label: "Klassizismus", slug: "klassizismus" },
          { label: "Romantizismus", slug: "romantizismus" },
          { label: "Modernismus", slug: "modernismus" },
          { label: "Antimodernismus", slug: "antimodernismus" },
          { label: "Expressionismus (Philosophie)", slug: "expressionismus-philosophie" },
          { label: "Dadaismus", slug: "dadaismus" },
          { label: "Surrealismus", slug: "surrealismus" },
          { label: "Futurismus", slug: "futurismus" },
          { label: "Minimalismus", slug: "minimalismus" },
          { label: "Dekadentismus", slug: "dekadentismus" },
        ],
      },
      { label: "Historismus", slug: "historismus" },
      {
        label: "Kritische Kulturtheorie",
        beschreibung: "Gesellschaftskritische Perspektiven auf Kultur",
        children: [
          { label: "Feminismus", slug: "feminismus" },
          { label: "Ökofeminismus", slug: "oekofeminismus" },
          { label: "Xenofeminismus", slug: "xenofeminismus" },
          { label: "Cyberfeminismus", slug: "cyberfeminismus" },
          { label: "Postkolonialismus", slug: "postkolonialismus" },
          { label: "Orientalismus", slug: "orientalismus" },
          { label: "Kulturrelativismus", slug: "kulturrelativismus" },
        ],
      },
      {
        label: "Universalismus",
        slug: "universalismus",
        children: [
          { label: "Partikularismus", slug: "partikularismus" },
          { label: "Kommensurabilismus", slug: "kommensurabilismus" },
          { label: "Inkommensurabilismus", slug: "inkommensurabilismus" },
        ],
      },
      { label: "Primitivismus", slug: "primitivismus" },
      { label: "Agonismus", slug: "agonismus" },
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
      { label: "Pyrrhonismus", slug: "pyrrhonismus" },
      { label: "Akademischer Skeptizismus", slug: "akademischer-skeptizismus" },
    ],
  },
  {
    label: "Östliche & Globale Philosophie",
    beschreibung: "Philosophische Traditionen jenseits des westlichen Kanons",
    children: [
      {
        label: "Chinesische Philosophie",
        beschreibung: "Die großen Denkschulen Chinas",
        children: [
          { label: "Konfuzianismus", slug: "konfuzianismus" },
          { label: "Daoismus", slug: "daoismus" },
          { label: "Taoistische Ethik", slug: "taoistische-ethik" },
        ],
      },
      {
        label: "Indische Philosophie",
        beschreibung: "Die Denktraditionen des indischen Subkontinents",
        children: [
          { label: "Buddhistische Philosophie", slug: "buddhistische-philosophie" },
          { label: "Zen-Buddhismus", slug: "zen-buddhismus" },
          { label: "Hinduistische Philosophie", slug: "hinduistische-philosophie" },
          { label: "Jainismus", slug: "jainismus" },
        ],
      },
      { label: "Sufismus", slug: "sufismus" },
      { label: "Afrikanische Philosophie", slug: "afrikanische-philosophie" },
      { label: "Lateinamerikanische Befreiungsphilosophie", slug: "lateinamerikanische-befreiungsphilosophie" },
      { label: "Indigene Philosophie", slug: "indigene-philosophie" },
    ],
  },
  {
    label: "Zukunft, Technologie & Posthumanismus",
    beschreibung: "Wie verändert Technologie Mensch und Gesellschaft?",
    children: [
      {
        label: "Transhumanismus",
        slug: "transhumanismus",
        children: [
          { label: "Posthumanismus", slug: "posthumanismus" },
          { label: "Kritischer Posthumanismus", slug: "kritischer-posthumanismus" },
        ],
      },
      { label: "Akzelerationismus", slug: "akzelerationismus" },
      { label: "Techno-Optimismus", slug: "techno-optimismus" },
      { label: "Techno-Pessimismus", slug: "techno-pessimismus" },
      { label: "Dataismus", slug: "dataismus" },
      { label: "Algorithmische Ethik", slug: "algorithmische-ethik" },
      { label: "Informationsphilosophie", slug: "informationsphilosophie" },
      { label: "Simulationstheorie", slug: "simulationstheorie" },
      {
        label: "Kulturelle Zukunftsvisionen",
        beschreibung: "Utopische und dystopische Szenarien",
        children: [
          { label: "Afrofuturismus", slug: "afrofuturismus" },
          { label: "Solarpunk", slug: "solarpunk" },
        ],
      },
      {
        label: "Gesellschaft & Natur",
        beschreibung: "Ökologische und biozentrische Perspektiven",
        children: [
          { label: "Biozentrismus", slug: "biozentrismus" },
          { label: "Ökozentrismus", slug: "oekozentrismus" },
        ],
      },
    ],
  },
  {
    label: "Philosophie des Anderen",
    beschreibung: "Begegnung mit dem Fremden, dem Anderen, dem Gast",
    children: [
      { label: "Alteritätsphilosophie", slug: "alteritaetsphilosophie" },
      { label: "Xenophilosophie", slug: "xenophilosophie" },
      { label: "Gastfreundschaftsethik", slug: "gastfreundschaftsethik" },
      { label: "Ethischer Pluralismus", slug: "ethischer-pluralismus" },
      { label: "Antiessentialismus", slug: "antiessentialismus" },
    ],
  },
];
