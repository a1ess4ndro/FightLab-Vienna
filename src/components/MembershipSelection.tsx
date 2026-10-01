"use client";

import { useSearchParams } from "next/navigation";

import {
  forms,
  membershipPrefill,
  parseSelection,
  priceNotes,
  tariffs,
  termLabel,
  type Selection,
} from "@/lib/content";
import { quoteRows } from "@/lib/format";
import { FactList } from "@/components/FormPage";
import { JotformEmbed } from "@/components/JotformEmbed";
import { Cta } from "@/components/ui/Cta";

/**
 * Die Auswahl aus dem Preisrechner kommt über die Adresse mit
 * (`/mitgliedschaft?tarif=standard&laufzeit=6`, Tarife: standard, student,
 * combo). Beide Teile lesen sie
 * selbst; die Seite bettet sie deshalb jeweils in eine Suspense-Grenze, damit
 * der Rest statisch vorgerendert bleibt.
 */
function useSelection(): Selection | null {
  return parseSelection(new URLSearchParams(useSearchParams().toString()));
}

/** Linke Spalte: was gewählt ist und was es kostet — oder wo man wählt. */
export function SelectionSummary({ selection }: { selection: Selection | null }) {
  if (!selection) {
    return (
      <>
        <p className="m-0 text-[clamp(1rem,1.05vw,1.0625rem)] leading-[1.6] text-ink/80">
          Tarif und Laufzeit wählst du im Formular. Was sie kosten, zeigt der
          Preisrechner.
        </p>
        <Cta
          href="/#laufzeit"
          variant="outlineLight"
          className="justify-self-start"
        >
          Preise ansehen
        </Cta>
      </>
    );
  }

  const rows = [
    {
      label: "Tarif",
      value: tariffs.find((t) => t.id === selection.tariff)?.label,
    },
    { label: "Mindestlaufzeit", value: termLabel(selection.term) },
    ...quoteRows(selection),
  ];

  return (
    <>
      <span className="data text-[0.625rem] tracking-[0.18em] text-mark">
        Deine Auswahl
      </span>
      <FactList rows={rows} />
      <p className="m-0 text-[0.9375rem] leading-[1.55] text-ink/80">
        {priceNotes.terms}
      </p>
      <Cta
        href="/#laufzeit"
        variant="outlineLight"
        className="justify-self-start"
      >
        Auswahl ändern
      </Cta>
    </>
  );
}

export function SelectionSummaryFromUrl() {
  return <SelectionSummary selection={useSelection()} />;
}

/** Rechte Spalte: das Formular, mit der Auswahl vorausgefüllt. */
export function MembershipForm() {
  const selection = useSelection();
  return (
    <JotformEmbed
      id={forms.mitgliedschaft.id}
      title={forms.mitgliedschaft.title}
      prefill={selection ? membershipPrefill(selection) : undefined}
    />
  );
}
