import { AXIS_SPAN_MIN, AXIS_START_MIN, contractStart } from "@/lib/content";

const MONTHS = [
  "Jänner",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

/** Österreichische Schreibweise: 70 €, 67,50 €. Nie 70.00 €. */
export function eur(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  const text = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(2).replace(".", ",");
  return `${text} €`;
}

/** Monat + Jahr aus einem Offset auf den Vertragsstart. */
export function monthLabel(offset: number): string {
  const index = contractStart.month + offset;
  return `${MONTHS[((index % 12) + 12) % 12]} ${
    contractStart.year + Math.floor(index / 12)
  }`;
}

/** "18:30" → Minuten seit Mitternacht. */
export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Position einer Einheit auf der senkrechten Abendachse, in Prozent. */
export function axisPosition(from: string, to: string) {
  const start = toMinutes(from);
  const end = toMinutes(to);
  return {
    top: ((start - AXIS_START_MIN) / AXIS_SPAN_MIN) * 100,
    height: ((end - start) / AXIS_SPAN_MIN) * 100,
  };
}

/** Position einer Stundenmarke auf derselben Achse, in Prozent. */
export function axisOffset(time: string): number {
  return ((toMinutes(time) - AXIS_START_MIN) / AXIS_SPAN_MIN) * 100;
}
