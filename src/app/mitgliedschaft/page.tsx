import type { Metadata } from "next";
import { Suspense } from "react";

import { forms } from "@/lib/content";
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
      aside={
        <Suspense fallback={<SelectionSummary selection={null} />}>
          <SelectionSummaryFromUrl />
        </Suspense>
      }
    >
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
