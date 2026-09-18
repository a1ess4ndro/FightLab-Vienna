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
  hours: 'Mo — Sa, 17:00 — 21:30',
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

export type Zone = { name: string; line: string; hit: string };

/** Die drei Distanzzonen, aufgelöst über die Reglerposition. */
export function zoneOf(value: number): Zone {
  if (value < 34) {
    return {
      name: 'Clinch',
      line: 'Ganz nah hilft keine Kraft mehr. Hier entscheiden Haltung, Knie und die Fähigkeit, ruhig zu bleiben, während jemand an dir zieht.',
      hit: 'hoch',
    };
  }
  if (value < 68) {
    return {
      name: 'Mid Range',
      line: 'Ab hier trifft, wer früher denkt. Nicht der Schnellere gewinnt, sondern der, der schon weiß, was der andere vorhat.',
      hit: 'entscheidend',
    };
  }
  return {
    name: 'Long Range',
    line: 'Hier passiert nichts, außer du willst es. Teep und Low Kick halten diesen Abstand — Distanz kontrollieren heißt, das Tempo bestimmen.',
    hit: 'gering',
  };
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

/** Achse der Wochenansicht: 17:00 bis 21:30, senkrecht gelesen. */
export const AXIS_START_MIN = 17 * 60;
export const AXIS_END_MIN = 21 * 60 + 30;
export const AXIS_SPAN_MIN = AXIS_END_MIN - AXIS_START_MIN;

export const axisHours = ['17:00', '18:00', '19:00', '20:00', '21:00'];

export type Session = {
  id: string;
  day: string;
  short: string;
  name: string;
  from: string;
  to: string;
  level: string;
  slots: string;
  /** Einheit liegt außerhalb der Abendachse (Samstag vormittags). */
  offAxis?: boolean;
};

export const days = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA'] as const;

/** Platzhalterzeiten — der echte Plan folgt von Aaron. */
export const sessions: Session[] = [
  {
    id: 'mo-1830',
    day: 'MO',
    short: 'Anfänger',
    name: 'Anfängerkurs',
    from: '18:30',
    to: '20:00',
    level: 'Ohne Vorkenntnisse',
    slots: '4 frei',
  },
  {
    id: 'di-1900',
    day: 'DI',
    short: 'Technik',
    name: 'Muay Thai Technik',
    from: '19:00',
    to: '20:30',
    level: 'Alle Stufen',
    slots: '7 frei',
  },
  {
    id: 'mi-1730',
    day: 'MI',
    short: 'Privat',
    name: 'Privattraining',
    from: '17:30',
    to: '18:30',
    level: 'Nach Absprache',
    slots: 'auf Anfrage',
  },
  {
    id: 'do-1830',
    day: 'DO',
    short: 'Anfänger',
    name: 'Anfängerkurs',
    from: '18:30',
    to: '20:00',
    level: 'Ohne Vorkenntnisse',
    slots: 'voll',
  },
  {
    id: 'fr-1900',
    day: 'FR',
    short: 'Kickboxen',
    name: 'Kickboxen',
    from: '19:00',
    to: '20:00',
    level: 'Alle Stufen',
    slots: '9 frei',
  },
  {
    id: 'sa-1100',
    day: 'SA',
    short: 'Sparring',
    name: 'Sparring, auf Einladung',
    from: '11:00',
    to: '12:30',
    level: 'Fortgeschritten',
    slots: '—',
    offAxis: true,
  },
];

export const weekNote = 'Privattraining nach Absprache.';

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
    answer: 'Im Anfängerkurs wird sieben Wochen lang nicht gesparrt.',
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
      'Die Schule ist für Leute gebaut, die bei null anfangen. Das Fight Team ist der Beweis, dass hier gut unterrichtet wird — nicht die Eintrittskarte.',
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
    value: 'Muay Thai, Kickboxen, Privattraining, Fight Team',
  },
  {
    label: 'Camps',
    value: 'Thailand, laufend — mit Profis aus dem Oktagon- und UFC-Umfeld',
  },
  { label: 'Halle', value: 'Pottendorfer Straße 9, 1120 Wien — U6 Meidling' },
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
