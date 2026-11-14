import Image from 'next/image';

import { coachFacts, partner } from '@/lib/content';
import { Band } from '@/components/ui/Band';

/**
 * 01 — Der Coach.
 *
 * Gleich nach dem Einstieg: Wer neu ist, will zuerst wissen, wer da
 * unterrichtet. Kein Kampfrekord, wie festgelegt: Kompetenz statt Bilanz.
 * Darunter die Kooperation mit Brown Bear BJJ als eigener Teil.
 */
export function Coach() {
  return (
    <section
      id="coach"
      aria-labelledby="coach-titel"
      className="bg-night text-chalk"
    >
      <Band size="lg" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))]">
        <div className="grid content-start gap-s3 px-[clamp(1.125rem,4vw,3.5rem)] py-[clamp(2rem,5vw,4.5rem)]">
          <h2
            id="coach-titel"
            className="m-0 max-w-[16ch] text-[clamp(1.75rem,4.4vw,4rem)] leading-[0.98] font-bold tracking-[-0.035em]"
          >
            Wer dich trainiert
          </h2>
          <p className="m-0 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-chalk2">
            Unser Headcoach Aaron Kaplan unterrichtet jede Einheit bei FightLab
            selbst: Muay Thai, Kickboxen und Boxen. Er ist nicht nur Trainer,
            sondern selbst aktiver Wettkämpfer in K1 und MMA.
          </p>
          <p className="m-0 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-chalk2">
            Mehrmals im Jahr trainiert er in Thailand mit Profis aus aller
            Welt. Was er dort lernt, bringt er direkt in dein Training mit.
            Während dieser Zeit fällt bei uns trotzdem kein Kurs aus.
          </p>

          <dl className="m-0 grid pt-3">
            {coachFacts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-s2 border-t border-nightline py-3 text-[0.9688rem]"
              >
                <dt className="data text-[0.6563rem] text-chalk2">
                  {fact.label}
                </dt>
                <dd className="m-0">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hochformat in einer Spalte, die neben dem Text eher quer steht:
            Der Ausschnitt hält Kopf und Deckung im Bild, nach unten darf
            angeschnitten werden. */}
        <div className="relative min-h-[26.25rem] bg-night">
          <Image
            src="/coach/aaron.webp"
            alt="Aaron im Wettkampf, in Kampfstellung unter dem Hallenlicht"
            fill
            sizes="(min-width: 40rem) 50vw, 100vw"
            className="object-cover object-[50%_28%]"
          />
        </div>
      </div>

      {/* Die Kooperation ist ein Alleinstellungsmerkmal und bekommt deshalb
          einen eigenen Teil, statt als Nebensatz beim Coach zu stehen. */}
      <div
        id="brown-bear"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] items-start gap-s3 gap-x-[clamp(1.5rem,4vw,4rem)] border-t border-nightline px-[clamp(1.125rem,4vw,3.5rem)] py-[clamp(2rem,5vw,4.5rem)]"
      >
        <div className="grid content-start gap-s2">
          <span className="data text-[0.625rem] tracking-[0.18em] text-signal">
            Kooperation
          </span>
          <h3 className="m-0 max-w-[22ch] text-[clamp(1.375rem,2.8vw,2.25rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            {partner.title}
          </h3>
          <p className="m-0 max-w-[48ch] text-[1.0625rem] leading-[1.6] text-chalk2">
            {partner.lead}
          </p>
        </div>
        <dl className="m-0 grid">
          {partner.points.map((point) => (
            <div
              key={point.label}
              className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-s2 border-t border-nightline py-3 text-[0.9688rem]"
            >
              <dt className="data text-[0.6563rem] text-chalk2">
                {point.label}
              </dt>
              <dd className="m-0">{point.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
