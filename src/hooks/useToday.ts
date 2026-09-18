"use client";

import { useSyncExternalStore } from "react";

/** Kürzel der Wochentage in der Schreibweise des Stundenplans. */
const CODES: Record<string, string> = {
  Mon: "MO",
  Tue: "DI",
  Wed: "MI",
  Thu: "DO",
  Fri: "FR",
  Sat: "SA",
  Sun: "SO",
};

const viennaWeekday = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Vienna",
  weekday: "short",
});

function getSnapshot(): string {
  return CODES[viennaWeekday.format(new Date())] ?? "SO";
}

/** Auf dem Server gibt es kein „heute" — die Seite ist statisch vorgerendert. */
function getServerSnapshot(): null {
  return null;
}

/** Meldet sich zur nächsten Mitternacht und danach jeden Tag erneut. */
function subscribe(onChange: () => void): () => void {
  let timer = 0;

  const arm = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    timer = window.setTimeout(() => {
      onChange();
      arm();
    }, midnight.getTime() - Date.now() + 1000);
  };

  arm();
  return () => window.clearTimeout(timer);
}

/**
 * Der heutige Wochentag in Wiener Zeit, als Kürzel wie „MO".
 *
 * Gibt `null` zurück, solange serverseitig gerendert wird: Die Startseite ist
 * statisch vorgerendert, ein Datum aus der Bauzeit wäre morgen falsch. Erst
 * nach der Hydration steht der echte Tag fest — und bleibt über Mitternacht
 * hinweg richtig, ohne dass die Seite neu geladen werden muss.
 *
 * Bewusst Wiener Zeit, nicht die des Besuchers: Trainiert wird in Meidling.
 */
export function useToday(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
