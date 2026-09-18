import { pledges, reviewSlots } from "@/lib/content";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * 02 — Belege & Benefits.
 *
 * Belege statt Behauptungen: vier Zusagen, die am ersten Abend überprüfbar
 * sind. Keine erfundenen Bewertungen, keine Mitgliederzahlen — die Plätze
 * dafür bleiben sichtbar leer, bis echte Inhalte da sind.
 */
export function Proof() {
  return (
    <section
      id="vertrauen"
      aria-labelledby="vertrauen-titel"
      className="bg-ground2 text-ink"
    >
      <div className="grid gap-s4 px-[clamp(1.125rem,4vw,3.5rem)] py-[clamp(2.25rem,5vw,4.75rem)]">
        <SectionHead
          id="vertrauen-titel"
          title="Was wir versprechen, können wir belegen."
          titleWidth="max-w-[22ch]"
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] items-start gap-s4 gap-x-[clamp(1.5rem,4vw,4rem)]">
          <ul className="m-0 grid list-none p-0">
            {pledges.map((pledge) => (
              <li
                key={pledge.no}
                className="grid grid-cols-[34px_minmax(0,1fr)] items-baseline gap-s2 border-t border-hairline py-[1.125rem]"
              >
                <span className="font-mono text-[0.6875rem] font-bold text-mark">
                  {pledge.no}
                </span>
                <span className="grid gap-[7px]">
                  <span className="text-[clamp(1.0625rem,1.8vw,1.3125rem)] leading-[1.2] font-bold tracking-[-0.015em]">
                    {pledge.claim}
                  </span>
                  <span className="text-[clamp(0.9375rem,1vw,0.9688rem)] leading-[1.55] text-ink/80">
                    {pledge.proof}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="grid items-center gap-s3 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
            <div className="hatch-light grid aspect-[9/16] place-items-center border border-dashed border-mark p-s3">
              <span className="data text-center text-[0.6563rem] leading-[1.7] text-ink/70">
                Videoeinbettung folgt
                <br />
                Link noch offen
              </span>
            </div>
            <p className="m-0 text-[clamp(1rem,1.05vw,1.0625rem)] leading-[1.6] text-ink/80">
              Keine Bewertungen erfunden, keine Mitgliederzahlen behauptet.
              Stattdessen vier Zusagen, die du am ersten Abend überprüfen kannst
              — und alles andere kommt, wenn es echt ist.
            </p>
          </div>
        </div>

        <div className="grid gap-s2 pt-s1">
          <div className="flex flex-wrap items-baseline justify-between gap-y-s1 gap-x-s3">
            <span className="data text-[0.625rem] tracking-[0.18em] text-ink/60">
              Bewertungen
            </span>
            <span className="data text-[0.625rem] text-mark">
              Ab November · Google-Profil folgt
            </span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-s2">
            {reviewSlots.map((slot) => (
              <div
                key={slot.no}
                className="grid min-h-[8.125rem] content-start gap-s1 border border-dashed border-concrete p-[1.125rem]"
              >
                <span className="data text-[0.625rem] tracking-[0.16em] text-mark">
                  {slot.no}
                </span>
                <span className="font-mono text-[0.6875rem] leading-[1.7] text-ink/60">
                  {slot.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
