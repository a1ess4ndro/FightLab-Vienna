/**
 * Alle Inhalte der Startseite an einer Stelle.
 *
 * Stundenplan, Preise, FAQ und Hinweiszeile gehören in Daten, nicht in Markup —
 * Zeiten müssen änderbar sein, ohne Komponenten anzufassen (Dokument 03).
 * Später wandert diese Datei in die Datenbank; die Formen bleiben gleich.
 *
 * Inhaltlicher Stand: „FightLab Startseite v2".
 */

export const site = {
  name: 'FightLab',
  sublabel: 'Team Kaplan',
  street: 'Pottendorfer Straße 9',
  city: '1120 Wien',
  district: 'Meidling',
  transit: 'U6 Meidling · ~3 Minuten zu Fuß',
  email: 'office@fightlab.at',
  phone: '+43 — folgt',
  /* Eine Zeitspanne über die ganze Woche wäre gelogen — der Samstag liegt
     Stunden vor dem Rest. Deshalb „ab", und der Stundenplan hat das Genaue. */
  hours: 'Mo — Fr ab 16:45 · Sa ab 13:00',
  opening: 'Eröffnung November 2026',
  tagline: 'Kämpfen ist wie Schach, nur dass Fehler weh tun.',
  disciplines: 'Muay Thai · Kickboxen · Boxen',
  bookingHeadline: 'Komm einmal vorbei, dann weißt du es',
  bookingLead:
    'Das Probetraining kostet 10 €, bar vor Ort. Wirst du danach Mitglied, bekommst du sie mit deinem persönlichen Code zurück. Komm in Sportkleidung, Handschuhe und Bandagen leihen wir dir.',
  mapsRoute:
    'https://www.google.com/maps/dir/?api=1&destination=Pottendorfer+Stra%C3%9Fe+9%2C+1120+Wien',
  mapsEmbed:
    'https://www.google.com/maps?q=Pottendorfer%20Stra%C3%9Fe%209%2C%201120%20Wien&z=16&output=embed',
  draftNote: 'Entwurf · Preise, Zeiten und Rechtstexte folgen',
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export type RailItem = { id: string; no: string; label: string };

export const rail: RailItem[] = [
  { id: 'distanz', no: '01', label: 'Distanz' },
  { id: 'vertrauen', no: '02', label: 'Versprechen' },
  { id: 'woche', no: '03', label: 'Trainingsplan' },
  { id: 'zweifel', no: '04', label: 'Zweifel' },
  { id: 'laufzeit', no: '05', label: 'Mitglied werden' },
  { id: 'coach', no: '06', label: 'Coach' },
];

export const railIds = rail.map((item) => item.id);

/* -------------------------------------------------------------------------- */
/* 01 — Distanz                                                                */
/* -------------------------------------------------------------------------- */

/** Der Regler läuft von 0 bis 100 und bildet 20 bis 250 cm ab. */
export const MIN_CM = 20;
export const MAX_CM = 250;

export function distanceInCm(value: number): number {
  return Math.round(MIN_CM + (value / 100) * (MAX_CM - MIN_CM));
}

export type ZoneKey = 'clinch' | 'mid' | 'long';

export type Zone = {
  key: ZoneKey;
  name: string;
  line: string;
  hit: string;
  /**
   * Platzhalterbild bis zum eigenen Shooting. Liegt selbst gehostet unter
   * `public/hero` — kein Nachladen von einer fremden CDN, siehe Dokument 04.
   * Quelle: RDNE Stock project, Pexels-Lizenz. Eine Aufnahmereihe, damit die
   * drei Zustände nicht nach drei verschiedenen Hallen aussehen.
   */
  image: string;
};

/**
 * Die drei Distanzzonen. Ein Array statt drei Rückgaben, weil der Hero alle
 * drei Bilder gleichzeitig im DOM hält und nur die Deckkraft umschaltet —
 * sonst blitzt beim Ziehen am Regler jedes Bild beim ersten Mal weiß auf.
 */
export const zones: Zone[] = [
  {
    key: 'clinch',
    name: 'Clinch',
    line: 'Ganz nah hilft keine Kraft mehr. Hier entscheiden Haltung, Knie und die Fähigkeit, ruhig zu bleiben, während jemand an dir zieht.',
    hit: 'hoch',
    image: '/hero/clinch.webp',
  },
  {
    key: 'mid',
    name: 'Mid Range',
    line: 'Ab hier trifft, wer früher denkt. Nicht der Schnellere gewinnt, sondern der, der schon weiß, was der andere vorhat.',
    hit: 'entscheidend',
    image: '/hero/mid.webp',
  },
  {
    key: 'long',
    name: 'Long Range',
    line: 'Hier passiert nichts, außer du willst es. Teep und Low Kick halten diesen Abstand — Distanz kontrollieren heißt, das Tempo bestimmen.',
    hit: 'gering',
    image: '/hero/long.webp',
  },
];

/** Die Zone zur Reglerposition. */
export function zoneOf(value: number): Zone {
  if (value < 34) return zones[0];
  if (value < 68) return zones[1];
  return zones[2];
}

/* -------------------------------------------------------------------------- */
/* 02 — Versprechen                                                            */
/* -------------------------------------------------------------------------- */

export const pledges = [
  {
    no: '01',
    claim: 'Leihausrüstung inklusive',
    proof:
      'Handschuhe und Bandagen für die ersten Wochen. Eigene Ausrüstung kaufst du erst, wenn du weißt, dass du bleibst.',
  },
  {
    no: '02',
    claim: 'Preise vollständig auf der Seite',
    proof:
      'Monatsbetrag, die einmalige Aktivierungsgebühr, Gesamtsumme und Mindestlaufzeit stehen im Rechner weiter unten, die Kündigungsfrist gleich darunter. Kein Preis auf Anfrage.',
  },
  {
    no: '03',
    claim: 'Kooperation mit Brown Bear BJJ',
    proof:
      'Striking bei uns, Bodenkampf dort — Mitglieder trainieren gegenseitig mit 15 % Rabatt.',
  },
  {
    no: '04',
    claim: 'Trainingslager stehen vorher im Plan',
    proof:
      'Wenn Aaron im Camp ist, siehst du das im Stundenplan, bevor du herkommst. Kein Kurs fällt unangekündigt aus und es ist immer mindestens ein Trainer auf der Matte.',
  },
] as const;

export const reviewSlots = [
  {
    no: 'Bewertung 01',
    note: 'Frei bis zur ersten echten Bewertung. Hier steht nichts Vorformuliertes.',
  },
  {
    no: 'Bewertung 02',
    note: 'Wir sammeln ab der Eröffnung im November — unbearbeitet, mit Antwort.',
  },
  {
    no: 'Bewertung 03',
    note: 'Google-Profil wird verlinkt, sobald es freigeschaltet ist.',
  },
] as const;

/* -------------------------------------------------------------------------- */
/* 03 — Die Woche als Zeitachse                                                */
/* -------------------------------------------------------------------------- */

/**
 * Achse der Wochenansicht: 16:00 bis 19:30, senkrecht gelesen.
 *
 * Beginnt zur vollen Stunde, weil das Stundenraster der Spalten am oberen
 * Rand ansetzt — liefe die Achse ab 16:30, stünden die Striche eine halbe
 * Stunde neben ihrer Beschriftung.
 */
export const AXIS_START_MIN = 16 * 60;
export const AXIS_END_MIN = 19 * 60 + 30;
export const AXIS_SPAN_MIN = AXIS_END_MIN - AXIS_START_MIN;

export const axisHours = ['16:00', '17:00', '18:00', '19:00'];

export type Session = {
  id: string;
  day: string;
  short: string;
  name: string;
  /**
   * Ohne Zeit steht die Einheit fest, die Uhrzeit aber noch nicht — sie
   * bekommt keinen Balken auf der Achse, sondern eine gestrichelte Marke.
   * Eine geschätzte Zeit im Stundenplan wäre schlimmer als gar keine.
   */
  from?: string;
  to?: string;
  level: string;
  slots: string;
  /** Einheit liegt außerhalb der Nachmittagsachse (Samstag mittags). */
  offAxis?: boolean;
};

/** Sonntag steht leer im Plan, statt zu fehlen: geschlossen ist eine Aussage. */
export const days = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'] as const;

export const sessions: Session[] = [
  {
    id: 'mo-1730',
    day: 'MO',
    short: 'Fundamentals',
    name: 'Fundamentals',
    from: '17:30',
    to: '19:00',
    level: 'Ohne Vorkenntnisse',
    slots: 'wird ergänzt',
  },
  {
    id: 'di-kinder',
    day: 'DI',
    short: 'Kinder',
    name: 'Kindertraining',
    level: 'Kinder',
    slots: 'wird ergänzt',
  },
  {
    id: 'mi-1730',
    day: 'MI',
    short: 'Pads',
    name: 'Pads',
    from: '17:30',
    to: '19:00',
    level: 'Alle Stufen',
    slots: 'wird ergänzt',
  },
  {
    id: 'do-kinder',
    day: 'DO',
    short: 'Kinder',
    name: 'Kindertraining',
    level: 'Kinder',
    slots: 'wird ergänzt',
  },
  {
    id: 'fr-1645',
    day: 'FR',
    short: 'Competition',
    name: 'Competition Training',
    from: '16:45',
    to: '18:00',
    level: 'Auf Einladung',
    slots: 'wird ergänzt',
  },
  {
    id: 'sa-1300',
    day: 'SA',
    short: 'S & C',
    name: 'Strength & Conditioning',
    from: '13:00',
    to: '14:00',
    level: 'Alle Stufen',
    slots: 'wird ergänzt',
    offAxis: true,
  },
];

export const weekNote =
  'Privattraining nach Absprache. Die Zeiten für das Kindertraining am Dienstag und Donnerstag folgen.';

/* -------------------------------------------------------------------------- */
/* 04 — Zweifel                                                                */
/* -------------------------------------------------------------------------- */

export const doubts = [
  {
    no: '01',
    claim: 'Ich bin nicht fit genug.',
    answer: 'Fitness ist das Ergebnis, nicht die Voraussetzung.',
    detail:
      'Der Anfängerkurs beginnt bei Stellung und Atmung. Kondition kommt in den ersten Wochen von selbst — sie ist kein Aufnahmekriterium.',
  },
  {
    no: '02',
    claim: 'Ich bin zu alt dafür.',
    answer: 'Die meisten, die bei uns anfangen, sind zwischen 25 und 40.',
    detail:
      'Trainiert wird nach Können, nicht nach Jahrgang. Wer mit 38 anfängt, lernt anders als mit 18 — meist geduldiger und technischer.',
  },
  {
    no: '03',
    claim: 'Ich will nicht sofort geschlagen werden.',
    answer: 'Schmerzen sind freiwillig.',
    detail:
      'Sparring ist freiwillig, nach Regeln und mit Coach im Ring. Niemand wird ins kalte Wasser geworfen, das ruiniert nur Technik und den Spaß am Sport.',
  },
  {
    no: '04',
    claim: 'Ich habe keine Ausrüstung.',
    answer: 'Handschuhe und Bandagen leihen wir dir für die ersten Wochen.',
    detail:
      'Mitbringen: Sportkleidung, Wasser, Handtuch. Eigene Ausrüstung kaufst du erst, wenn du weißt, dass du bleibst.',
  },
  {
    no: '05',
    claim: 'Ich habe nie gekämpft.',
    answer: 'Das ist die Zielgruppe, nicht das Hindernis.',
    detail:
      'Das Gym ist für Leute gebaut, die bei null anfangen. Das Fight Team ist der Beweis, dass hier gut unterrichtet wird — nicht die Eintrittskarte.',
  },
] as const;

/* -------------------------------------------------------------------------- */
/* 05 — Laufzeit und Preise                                                    */
/* -------------------------------------------------------------------------- */

export type TariffId = 'standard' | 'student' | 'combo';

/**
 * Drei Tarife, einer davon aktiv. Die Kombi mit Brown Bear BJJ ist ein eigener
 * Tarif mit Laufzeitwahl wie die anderen — so führt sie auch das
 * Jotform-Formular.
 */
export const tariffs: { id: TariffId; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'student', label: 'Studenten & Azubis' },
  { id: 'combo', label: 'Kombi Brown Bear BJJ − 15 %' },
];

export const terms = [1, 3, 6, 12] as const;
export type Term = (typeof terms)[number];

/** "1 Monate" gibt es nicht. */
export function termLabel(term: Term): string {
  return term === 1 ? '1 Monat' : `${term} Monate`;
}

/**
 * Monatsbetrag in Euro je Tarif und Mindestlaufzeit. Zehn Euro Abstand je
 * Stufe. Die Kombi ist der Studentensatz minus 15 %, für alle — Beträge
 * ausgeschrieben, genau wie in der Linkliste zum Formular.
 */
export const rates: Record<TariffId, Record<Term, number>> = {
  standard: { 1: 100, 3: 90, 6: 80, 12: 70 },
  student: { 1: 80, 3: 70, 6: 60, 12: 50 },
  combo: { 1: 68, 3: 59.5, 6: 51, 12: 42.5 },
};

/** Vertragsstart: November 2026 (Monatsindex 10). */
export const contractStart = { month: 10, year: 2026 };

export const priceNotes = {
  standard: 'Preise inklusive aller Kurse & Leihausrüstung beim Probetraining.',
  combo: 'Kombipreis — gilt mit Mitgliedsnachweis von Brown Bear BJJ',
  /* Aus den Vertragsbedingungen im Jotform-Formular, Punkte 3.1, 4.1 und
     5.1. Ändert sich dort etwas, ändert es sich hier. */
  terms:
    'Gesamt ist die Mindestlaufzeit samt einmaliger Aktivierungsgebühr. Danach läuft die Mitgliedschaft unbefristet weiter und ist mit drei Monaten Frist zum Monatsletzten kündbar. Die Beiträge sind an den Verbraucherpreisindex gebunden.',
} as const;

/** Einmalige Aktivierungsgebühr laut Vertrag, Punkt 3.1 — in jedem Tarif. */
export const ACTIVATION_FEE = 60;

/** Was im Rechner gewählt war. */
export type Selection = { tariff: TariffId; term: Term };

/**
 * Alles, was der Rechner und die Mitgliedschaftsseite zu einer Auswahl zeigen
 * — beide rechnen hiermit, damit es nur eine Wahrheit gibt. Der Vertrag läuft
 * unbefristet; die gewählte Laufzeit ist eine Mindestlaufzeit. `lastMonth`
 * ist ihr letzter Monat als Abstand zum Vertragsstart (für `monthLabel`),
 * `total` die Summe bis dahin samt Aktivierungsgebühr.
 */
export function quote({ tariff, term }: Selection) {
  const monthly = rates[tariff][term];
  return {
    monthly,
    activation: ACTIVATION_FEE,
    total: monthly * term + ACTIVATION_FEE,
    lastMonth: term - 1,
  };
}

/** Adresse der Mitgliedschaftsseite, mit der Auswahl aus dem Rechner. */
export function membershipHref({ tariff, term }: Selection): string {
  return `/mitgliedschaft?${new URLSearchParams({ tarif: tariff, laufzeit: String(term) })}`;
}

/**
 * Liest die Auswahl aus der Adresse zurück. Alles, was nicht exakt passt,
 * ergibt `null` — dann wählt man im Formular selbst, statt mit einem
 * halb erratenen Tarif dort anzukommen.
 */
export function parseSelection(query: URLSearchParams): Selection | null {
  const tariff = tariffs.find((t) => t.id === query.get('tarif'))?.id;
  const term = terms.find((t) => String(t) === query.get('laufzeit'));
  return tariff && term ? { tariff, term } : null;
}

/* -------------------------------------------------------------------------- */
/* 06 — Coach                                                                  */
/* -------------------------------------------------------------------------- */

export const coachFacts = [
  {
    label: 'Unterricht',
    value: 'Muay Thai, Kickboxen, Privattraining.',
  },
  {
    label: 'Camps',
    value: 'Thailand, laufend — mit Profis aus dem Oktagon- und UFC-Umfeld',
  },
  {
    label: 'Gym',
    value: 'Pottendorfer Straße 9, 1120 Wien — U6 Meidling, Europlaza',
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Buchung                                                                     */
/* -------------------------------------------------------------------------- */

/** Folgt dem Ablauf im Jotform-Formular Probetraining — ändert er sich, hier mit. */
export const bookingSteps = [
  {
    no: '01',
    text: 'Formular ausfüllen: Name, Alter, E-Mail und an welchem Tag du kommen möchtest — die Einheiten stehen im Trainingsplan oben.',
  },
  {
    no: '02',
    text: 'Per E-Mail bekommst du die Bestätigung und deinen persönlichen Code.',
  },
  {
    no: '03',
    text: 'Vorbeikommen und trainieren. Die 10 € zahlst du bar vor Ort, Handschuhe und Bandagen leihen wir dir.',
  },
  {
    no: '04',
    text: 'Wirst du danach Mitglied, bekommst du die 10 € mit deinem Code zurück.',
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Formulare                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Probetraining und Mitgliedschaft laufen über Jotform. Die Felder pflegt
 * Jotform; hier steht nur, welches Formular wohin gehört.
 */
export const forms = {
  probetraining: {
    id: '262727207879066',
    title: 'Formular — Probetraining buchen',
  },
  mitgliedschaft: {
    id: '262723289788071',
    title: 'Formular — Mitgliedschaft abschließen',
  },
} as const;

/** Tarif-Optionen im Jotform-Formular, Zeichen für Zeichen. */
const JOTFORM_TARIF: Record<TariffId, string> = {
  standard: 'Standard',
  student: 'Student/Lehrling',
  combo: 'BBBjj-Mitglied',
};

/**
 * Vorausfüllen des Mitgliedschaftsformulars aus der Auswahl im Rechner.
 * Schlüssel sind die eindeutigen Feldnamen in Jotform, Werte die Optionen
 * dort — ändert sich eine Option im Formular, muss sie hier mit.
 * `vonWebseite` blendet Tarif und Laufzeit im Formular aus; sie sind ja
 * schon gewählt.
 */
export function membershipPrefill({ tariff, term }: Selection): Record<string, string> {
  return {
    vonWebseite: 'ja',
    tarif: JOTFORM_TARIF[tariff],
    laufzeit: termLabel(term),
  };
}
