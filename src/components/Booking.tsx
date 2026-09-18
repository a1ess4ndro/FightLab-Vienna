import { bookingSteps, site } from "@/lib/content";
import { Cta } from "@/components/ui/Cta";

/**
 * Die Buchungsstrecke ist die Hauptaufgabe der Seite. Hier steht nur, was der
 * Schritt davor ausräumen muss: Ablauf, Kosten, Anrechnung, Mitbringliste.
 */
export function Booking() {
  return (
    <section
      id="buchen"
      aria-labelledby="buchen-titel"
      className="bg-ground2 text-ink"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] items-start gap-s4 gap-x-[clamp(1.5rem,4vw,4rem)] px-[clamp(1.125rem,4vw,3.5rem)] py-[clamp(2.25rem,5vw,4.75rem)]">
        <div className="grid content-start gap-[1.125rem]">
          <h2
            id="buchen-titel"
            className="m-0 max-w-[18ch] text-[clamp(1.75rem,3.8vw,3.25rem)] leading-none font-bold tracking-[-0.035em]"
          >
            {site.bookingHeadline}
          </h2>
          <p className="m-0 max-w-[44ch] text-[1.0625rem] leading-[1.6] text-ink/80">
            Du zahlst die Probestunde und bekommst den Betrag auf die
            Mitgliedschaft angerechnet. Komm in Sportkleidung, Handschuhe und
            Bandagen leihen wir dir.
          </p>
          <Cta
            href="/probetraining"
            className="justify-self-start px-[1.625rem] py-[1.0625rem] text-[0.75rem]"
          >
            Probetraining buchen
          </Cta>
        </div>

        <ol className="m-0 grid list-none p-0">
          {bookingSteps.map((step) => (
            <li
              key={step.no}
              className="grid grid-cols-[44px_minmax(0,1fr)] items-baseline gap-s2 border-t border-hairline py-s2"
            >
              <span className="font-mono text-[0.75rem] font-bold text-mark">
                {step.no}
              </span>
              <span className="text-[clamp(0.9375rem,1vw,1rem)] leading-[1.55] text-ink/85">
                {step.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
