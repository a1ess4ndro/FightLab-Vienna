import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { forms, site } from "@/lib/content";
import { FormPage } from "@/components/FormPage";
import { JotformEmbed } from "@/components/JotformEmbed";
import {
  MembershipForm,
  SelectionSummary,
  SelectionSummaryFromUrl,
} from "@/components/MembershipSelection";

export const metadata: Metadata = {
  title: "Mitglied werden",
  description:
    "Mitgliedschaft bei FightLab in Wien-Meidling abschließen: Tarif und Laufzeit wählen, Daten eintragen, unterschreiben.",
  alternates: { canonical: "/mitgliedschaft" },
};

/**
 * Die Auswahl aus dem Rechner steht in der Adresse und ist erst im Browser
 * bekannt. Die Ersatzinhalte der Suspense-Grenzen sind deshalb dieselben
 * Teile ohne Auswahl — so ist die Seite fertig vorgerendert, und mit
 * Auswahl ändert sich nach dem Laden nur deren Inhalt.
 */
export default function MitgliedschaftPage() {
  return (
    <FormPage
      eyebrow="Mitgliedschaft"
      title="Mitglied werden"
      lead="Tarif und Laufzeit wählen, Daten eintragen, unterschreiben. Für Studenten, Azubis und die Kombi mit Brown Bear BJJ lädst du im Formular einen Nachweis hoch."
      leadNote="Bezahlt wird per Karte oder SEPA-Lastschrift. Bis zum 1. Dezember 2026 wird nichts abgebucht."
      aside={
        <Suspense fallback={<SelectionSummary selection={null} />}>
          <SelectionSummaryFromUrl />
        </Suspense>
      }
    >
      {/* Rücktrittsrecht bei Online-Abschluss, AGB Punkt 10 — vor dem
          Formular, nicht erst im Kleingedruckten. */}
      <p className="m-0 mb-s3 border-l-2 border-mark pl-s2 text-[0.9375rem] leading-[1.6] text-ink/80">
        Schließt du die Mitgliedschaft online ab, kannst du binnen 14 Tagen
        ohne Angabe von Gründen zurücktreten. Eine E-Mail an{" "}
        <a href={`mailto:${site.email}`} className="text-mark underline">
          {site.email}
        </a>{" "}
        genügt. Alle Details und das Muster-Widerrufsformular findest du in{" "}
        <Link href="/agb#ruecktritt" className="text-mark underline">
          Punkt 10 unserer AGB
        </Link>
        .
      </p>
      <Suspense
        fallback={
          <JotformEmbed
            id={forms.mitgliedschaft.id}
            title={forms.mitgliedschaft.title}
          />
        }
      >
        <MembershipForm />
      </Suspense>
    </FormPage>
  );
}
