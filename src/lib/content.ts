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
  { id: 'vertrauen', no: '02', label: 'Belege & Benefits' },
  { id: 'woche', no: '03', label: 'Woche' },
  { id: 'zweifel', no: '04', label: 'Einwände' },
  { id: 'laufzeit', no: '05', label: 'Laufzeit' },
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
/* 02 — Belege & Benefits                                                      */
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
      'Monatsbetrag, Gesamtsumme, Ende und letzter Kündigungstag stehen im Rechner weiter unten. Keine Aufnahmegebühr, kein Preis auf Anfrage.',
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
/* 04 — Einwände                                                               */
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

export type TariffId = 'standard' | 'student';

export const tariffs: { id: TariffId; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'student', label: 'Studenten & Azubis' },
];

export const terms = [1, 3, 6, 12] as const;
export type Term = (typeof terms)[number];

/** "1 Monate" gibt es nicht. */
export function termLabel(term: Term): string {
  return term === 1 ? '1 Monat' : `${term} Monate`;
}

/** Monatsbetrag in Euro je Tarif und Laufzeit. Zehn Euro Abstand je Stufe. */
export const rates: Record<TariffId, Record<Term, number>> = {
  standard: { 1: 100, 3: 90, 6: 80, 12: 70 },
  student: { 1: 80, 3: 70, 6: 60, 12: 50 },
};

export const COMBO_DISCOUNT = 0.15;

/** Vertragsstart: November 2026 (Monatsindex 10). */
export const contractStart = { month: 10, year: 2026 };

export const priceNotes = {
  standard: 'Preise inklusive aller Kurse & Leihausrüstung beim Probetraining.',
  combo: 'Kombipreis — gilt mit Mitgliedsnachweis von Brown Bear BJJ',
} as const;

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

export const bookingSteps = [
  {
    no: '01',
    text: 'Einheit aus der Woche oben auswählen — die nächste Anfängereinheit ist vorausgewählt.',
  },
  {
    no: '02',
    text: 'Du erfährst vorher, was passiert, was du mitbringst und wer dich empfängt.',
  },
  {
    no: '03',
    text: 'Daten eingeben und zahlen: Karte, Apple Pay oder Lastschrift.',
  },
  {
    no: '04',
    text: 'Bestätigung mit Termin, Anfahrt und Checkliste. Absagen geht ohne Anruf.',
  },
] as const;
