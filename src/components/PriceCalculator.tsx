'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

import {
  COMBO_DISCOUNT,
  priceNotes,
  rates,
  tariffs,
  termLabel,
  terms,
  type TariffId,
  type Term,
} from '@/lib/content';
import { eur, monthLabel } from '@/lib/format';
import { SectionHead } from '@/components/ui/SectionHead';

/**
 * 05 — Laufzeit.
 *
 * Preis, Gesamtsumme, Ende und letzter Kündigungstag stehen gleichzeitig da.
 * Das verhindert Rückfragen und Streit — und ist der Unterschied zu allen
 * Mitbewerbern mit „Preis auf Anfrage“.
 */
export function PriceCalculator() {
  const [tariff, setTariff] = useState<TariffId>('standard');
  const [term, setTerm] = useState<Term>(6);
  const [combo, setCombo] = useState(false);
  const reduce = useReducedMotion();

  const base = rates[tariff][term];
  const monthly = combo ? base * (1 - COMBO_DISCOUNT) : base;

  const readouts = [
    { label: 'Monatlich', value: eur(monthly), accent: false },
    { label: 'Gesamt', value: eur(monthly * term), accent: false },
    { label: 'Ende', value: monthLabel(term), accent: false },
    {
      accent: true,
    },
  ];

  const toggle =
    'min-h-[2.75rem] cursor-pointer border px-s3 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors duration-[120ms] ease-linear';

  return (
    <section
      id="laufzeit"
      aria-labelledby="laufzeit-titel"
      className="bg-ground text-ink"
    >
      <div className="grid gap-s3 px-[clamp(1.125rem,4vw,3.5rem)] pb-[clamp(2.75rem,6vw,5.5rem)]">
        <SectionHead
          id="laufzeit-titel"
          title="Unsere Preise"
          titleWidth="max-w-[18ch]"
        />

        <div className="flex flex-wrap items-center gap-y-s1 gap-x-s3">
          <div
            className="flex flex-wrap gap-s1"
            role="group"
            aria-label="Tarif"
          >
            {tariffs.map((item) => {
              const isActive = tariff === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setTariff(item.id)}
                  className={`${toggle} border-ink ${
                    isActive
                      ? 'bg-ink text-ground'
                      : 'bg-ground text-ink hover:bg-ink hover:text-ground'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            aria-pressed={combo}
            onClick={() => setCombo((value) => !value)}
            className={`${toggle} border-mark ${
              combo
                ? 'bg-mark text-ground'
                : 'bg-ground text-mark hover:bg-mark hover:text-ground'
            }`}
          >
            Kombi Brown Bear BJJ − 15 %
          </button>
        </div>

        <div
          className="flex flex-wrap gap-s1"
          role="group"
          aria-label="Laufzeit"
        >
          {terms.map((item) => {
            const isActive = term === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={isActive}
                onClick={() => setTerm(item)}
                className={`${toggle} px-[1.375rem] text-[0.75rem] ${
                  isActive
                    ? 'border-ink bg-ink text-ground'
                    : 'border-hairline bg-ground text-ink/80 hover:border-ink'
                }`}
              >
                {termLabel(item)}
              </button>
            );
          })}
        </div>

        <div className="grid gap-s1">
          <div aria-hidden className="flex items-end gap-[3px]">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="relative aspect-[3/2] flex-1">
                <div className="absolute inset-x-0 bottom-0 h-[22%] bg-hairline" />
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-full origin-bottom bg-band"
                  initial={false}
                  animate={{ opacity: i < term ? 1 : 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.12, ease: 'linear' }
                  }
                />
              </div>
            ))}
          </div>
          <div className="data flex justify-end border-t border-hairline pt-s1 text-[0.5938rem] tracking-[0.14em] text-ink/60">
            <span>12 Monate</span>
          </div>
        </div>

        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(8rem,100%),1fr))] gap-s3 pt-[6px]">
          {readouts.map((item) => (
            <div key={item.label} className="grid gap-[6px]">
              <dt
                className={`data text-[0.625rem] tracking-[0.16em] ${
                  item.accent ? 'text-mark' : 'text-ink/60'
                }`}
              >
                {item.label}
              </dt>
              <dd
                className={`m-0 font-mono text-[clamp(1.25rem,2.4vw,2.125rem)] ${
                  item.accent ? 'text-mark' : ''
                }`}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="data m-0 text-[0.625rem] text-mark">
          {combo ? priceNotes.combo : priceNotes.standard}
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] items-start gap-s2 gap-x-[clamp(1.5rem,4vw,4rem)] border-t-2 border-ink pt-[1.125rem]">
          <div className="grid content-start gap-s1">
            <span className="data text-[0.625rem] font-bold tracking-[0.18em] text-ink/60">
              Kooperation
            </span>
            <span className="text-[clamp(1.25rem,2.2vw,1.625rem)] font-bold tracking-[-0.02em]">
              Brown Bear BJJ
            </span>
          </div>
          <p className="m-0 max-w-[52ch] text-[clamp(1rem,1.05vw,1.0625rem)] leading-[1.6] text-ink/80">
            Mitglieder trainieren bei uns mit 15 % Rabatt. Wer schlagen lernt,
            sollte auch am Boden etwas können — und umgekehrt.
          </p>
        </div>
      </div>
    </section>
  );
}
