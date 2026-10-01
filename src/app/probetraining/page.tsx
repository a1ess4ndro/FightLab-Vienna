import type { Metadata } from "next";

import { forms, site } from "@/lib/content";
import { FactList, FormPage } from "@/components/FormPage";
import { JotformEmbed } from "@/components/JotformEmbed";
import { Cta } from "@/components/ui/Cta";

export const metadata: Metadata = {
  title: "Probetraining buchen",
  description:
    "Probetraining Muay Thai und Kickboxen in Wien-Meidling buchen. Ohne Vorkenntnisse, Handschuhe und Bandagen leihen wir dir.",
  alternates: { canonical: "/probetraining" },
};

export default function ProbetrainingPage() {
  return (
    <FormPage
      eyebrow="Probetraining"
      title={site.bookingHeadline}
      lead={site.bookingLead}
      aside={
        <>
          <FactList
            rows={[
              {
                label: "Kosten",
                value: "10 €, bar vor Ort — als Mitglied mit deinem Code zurück",
              },
              { label: "Mitbringen", value: "Sportkleidung, Wasser, Handtuch" },
              { label: "Leihen wir dir", value: "Handschuhe und Bandagen" },
              {
                label: "Adresse",
                value: (
                  <>
                    {site.street}, {site.city}
                    <br />
                    <span className="text-mark">{site.transit}</span>
                  </>
                ),
              },
              { label: "Trainingszeiten", value: site.hours },
            ]}
          />
          <Cta
            href="/#woche"
            variant="outlineLight"
            className="justify-self-start"
          >
            Trainingsplan ansehen
          </Cta>
        </>
      }
    >
      <JotformEmbed
        id={forms.probetraining.id}
        title={forms.probetraining.title}
      />
    </FormPage>
  );
}
