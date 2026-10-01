import type { ReactNode } from "react";

import { RailNav } from "@/components/RailNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Band } from "@/components/ui/Band";

/**
 * Gemeinsame Form der Formularseiten Probetraining und Mitgliedschaft.
 *
 * Aufbau wie die Rechtsseiten, damit der Übergang von der Startseite nicht
 * bricht: dunkler Kopf, Band, darunter Putz. Links steht, was man vor dem
 * Ausfüllen wissen muss, rechts das Formular — am Handy in dieser Reihenfolge
 * untereinander.
 *
 * Keine feste Leiste unten: Auf der Seite, zu der sie führt, wäre sie eine
 * Schleife.
 */

const SHELL = "px-[clamp(1.125rem,4vw,3.5rem)]";

export function FormPage({
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  aside: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <RailNav />

      <main id="inhalt">
        <header className={`bg-night text-chalk ${SHELL} py-[clamp(2.5rem,6vw,5rem)]`}>
          <div className="grid gap-s3">
            <span className="data text-[0.625rem] tracking-[0.18em] text-signal">
              {eyebrow}
            </span>
            <h1 className="m-0 max-w-[16ch] text-[clamp(2.25rem,7vw,5rem)] leading-[0.95] font-bold tracking-[-0.035em]">
              {title}
            </h1>
            <p className="m-0 max-w-[54ch] text-[1.0625rem] leading-[1.6] text-chalk2">
              {lead}
            </p>
          </div>
        </header>

        <Band size="md" />

        <div className={`bg-ground text-ink ${SHELL} py-[clamp(2.5rem,6vw,4.5rem)]`}>
          <div className="grid items-start gap-s4 min-[900px]:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] min-[900px]:gap-x-[clamp(2rem,5vw,5rem)]">
            <aside className="grid content-start gap-s3 min-[900px]:sticky min-[900px]:top-[calc(var(--rail-h,3.75rem)+1.5rem)]">
              {aside}
            </aside>
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/** Zeilen wie im Fuß: Bezeichnung in Versalien, Wert daneben in Monospace. */
export function FactList({
  rows,
}: {
  rows: readonly { label: string; value: ReactNode; muted?: boolean }[];
}) {
  return (
    <dl className="m-0 grid">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 border-t border-hairline py-3"
        >
          <dt className="data text-[0.625rem] tracking-[0.16em] text-ink/60">
            {row.label}
          </dt>
          <dd
            className={`m-0 font-mono text-[0.875rem] leading-[1.5] ${
              row.muted ? "text-ink/60" : ""
            }`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
