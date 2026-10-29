import Image from 'next/image';

import { COMBO_RATE, coachFacts } from '@/lib/content';
import { eur } from '@/lib/format';
import { Band } from '@/components/ui/Band';

/**
 * 06 — Der Coach.
 *
 * Kein Kampfrekord, wie festgelegt: Kompetenz statt Bilanz. Ein Coach und ein
 * Plan sind für einen Ein-Coach-Betrieb die Stärke, nicht die Entschuldigung.
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
            Ein Coach, ein Plan
          </h2>
          <p className="m-0 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-chalk2">
            Aaron unterrichtet jede Einheit bei FightLab selbst: Muay Thai,
            Kickboxen und Boxen. Er ist aktiver Wettkämpfer in K1 und MMA und
            trainiert regelmäßig in Thailand mit Profis. Was er dort lernt,
            kommt als Methode zurück, nicht als Anekdote.
          </p>
          {/* Grappling ist nicht Teil von FightLab: Es findet bei Brown Bear
              BJJ statt. Der Absatz muss das klar sagen, sonst widerspricht er
              der Überschrift „Ein Coach, ein Plan“. */}
          <p className="m-0 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-chalk2">
            Jiu-Jitsu gibt es bei unserem Partner Brown Bear BJJ. Dort
            unterrichtet Firo, ebenfalls erfahrener Wettkämpfer. Wer zusätzlich
            Grappling trainieren will, wird Mitglied bei Brown Bear BJJ und
            trainiert bei uns im Kombi-Tarif für {eur(COMBO_RATE)} im Monat.
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
    </section>
  );
}
