"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Rückmeldung nach der Bezahlung bei Stripe. Stripe leitet mit
 * `?anmeldung=erfolgreich` oder `?anmeldung=abgebrochen` auf die Startseite
 * zurück; ohne Hinweis stünde man dort, ohne zu wissen, ob es geklappt hat.
 *
 * Der Zustand wird beim ersten Rendern festgehalten und der Parameter danach
 * aus der Adresse genommen: Neu laden oder Teilen zeigt das Banner nicht
 * noch einmal. `replaceState` ist mit `useSearchParams` verbunden — ohne den
 * festgehaltenen Zustand verschwände das Banner sofort wieder.
 */
const MESSAGES = {
  erfolgreich: {
    text: "Danke, du bist angemeldet – die Bestätigung kommt per E-Mail.",
    tone: "bg-band text-ground",
  },
  abgebrochen: {
    text: "Anmeldung nicht abgeschlossen – du kannst es jederzeit nochmal versuchen.",
    tone: "bg-ink text-chalk",
  },
} as const;

type Status = keyof typeof MESSAGES;

export function SignupBanner() {
  const param = useSearchParams().get("anmeldung");
  const [status, setStatus] = useState<Status | null>(() =>
    param === "erfolgreich" || param === "abgebrochen" ? param : null,
  );

  useEffect(() => {
    if (!status) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("anmeldung");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, [status]);

  if (!status) return null;
  const message = MESSAGES[status];

  return (
    <div
      role="status"
      className={`${message.tone} flex flex-wrap items-center justify-between gap-x-s3 gap-y-s1 px-[clamp(1.125rem,4vw,3.5rem)] py-s2`}
    >
      <p className="m-0 text-[1rem] leading-[1.5]">{message.text}</p>
      <div className="flex items-center gap-s2">
        {status === "abgebrochen" ? (
          <Link
            href="/#laufzeit"
            onClick={() => setStatus(null)}
            className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase underline"
          >
            Nochmal versuchen
          </Link>
        ) : null}
        <button
          type="button"
          onClick={() => setStatus(null)}
          aria-label="Hinweis schließen"
          className="min-h-[2.75rem] cursor-pointer border border-current px-s2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
