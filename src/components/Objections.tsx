"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { doubts } from "@/lib/content";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * 04 — Einwände.
 *
 * Abbruchgrund Nummer eins der Einsteigerin ist nicht Schmerz, sondern Blamage.
 * Der Abschnitt nennt die Zweifel beim Namen und streicht sie sichtbar durch.
 */
export function Objections() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const active = doubts[index];

  return (
    <section
      id="zweifel"
      aria-labelledby="zweifel-titel"
      className="bg-ground text-ink"
    >
      <div className="grid gap-s3 px-[clamp(1.125rem,4vw,3.5rem)] pt-[clamp(2.75rem,6vw,5.5rem)]">
        <SectionHead
          id="zweifel-titel"
          title="Was dich abhält. Klick es an, dann streichen wir es durch."
          titleWidth="max-w-[26ch]"
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] items-start gap-s3 gap-x-[clamp(1.5rem,4vw,4rem)]">
          <div className="grid">
            {doubts.map((doubt, i) => {
              const isActive = i === index;
              return (
                <button
                  key={doubt.no}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setIndex(i)}
                  className={`grid cursor-pointer grid-cols-[30px_minmax(0,1fr)] items-baseline gap-3.5 border-t border-hairline bg-transparent py-[1.125rem] text-left text-[clamp(1.1875rem,2.2vw,1.6875rem)] leading-[1.2] tracking-[-0.02em] transition-colors duration-[120ms] ease-linear hover:text-mark ${
                    isActive
                      ? "text-concrete [text-decoration:line-through_2px_var(--color-band)]"
                      : "text-ink"
                  }`}
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-mark">
                    {doubt.no}
                  </span>
                  <span>{doubt.claim}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.no}
              role="status"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
              className="grid min-h-[16.25rem] content-start gap-[1.125rem] bg-ink p-[clamp(1.625rem,3.5vw,2.75rem)] text-chalk"
            >
              <span className="data text-[0.625rem] tracking-[0.16em] text-signal">
                Antwort {active.no}
              </span>
              <p className="m-0 text-[clamp(1.1875rem,2.1vw,1.625rem)] leading-[1.3] tracking-[-0.02em]">
                {active.answer}
              </p>
              <p className="m-0 font-mono text-[0.75rem] leading-[1.6] text-chalk2">
                {active.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
