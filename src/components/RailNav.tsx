"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

import { rail, railIds } from "@/lib/content";
import { useActiveSection, useIsMobile } from "@/hooks/useViewport";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Kopfleiste als Messskala: links die Wortmarke, in der Mitte die Teilstriche
 * mit einer roten Positionsmarke, rechts die einzige Hauptaktion der Seite.
 * Unter 720 px wird die Skala zu einem Menü.
 */
export function RailNav() {
  const isMobile = useIsMobile();
  const active = useActiveSection(railIds);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Das Menü existiert nur am Handy; ein Umbruch auf Desktop schließt es
  // damit ohne Effekt und ohne zusätzlichen Renderdurchgang.
  const menuOpen = isMobile && open;

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 70,
      behavior: prefersReduced ? "auto" : "smooth",
    });
    setOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-nightline bg-night">
      <div className="flex items-stretch">
        <a
          href="#distanz"
          onClick={(event) => {
            event.preventDefault();
            goTo("distanz");
          }}
          className="grid content-center border-r border-nightline px-[1.125rem] py-3 no-underline"
        >
          <Wordmark sublabel="Team Kaplan" accent />
        </a>

        {isMobile ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="rail-menu"
            className="flex min-w-0 flex-1 cursor-pointer items-center justify-between gap-3 bg-transparent px-s2 font-mono text-[0.625rem] tracking-[0.16em] text-chalk uppercase"
          >
            <span>{open ? "Schließen" : "Menü"}</span>
            <span aria-hidden className="grid gap-[3px]">
              <span className="h-px w-[1.125rem] bg-chalk" />
              <span className="h-px w-[1.125rem] bg-chalk" />
              <span className="h-px w-[1.125rem] bg-chalk" />
            </span>
          </button>
        ) : (
          <nav
            aria-label="Abschnitte"
            className="relative flex min-w-0 flex-1 items-end overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[repeating-linear-gradient(90deg,var(--color-nightline2)_0_1px,transparent_1px_12px)] bg-[length:100%_9px] bg-left-bottom bg-repeat-x"
            />
            <div className="relative flex w-full flex-nowrap overflow-x-auto">
              {rail.map((item) => {
                const isActive = item.id === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative grid flex-[1_0_auto] cursor-pointer gap-[5px] border-r border-nightline bg-transparent px-3.5 pt-3.5 pb-3 text-left font-mono text-[0.5938rem] tracking-[0.16em] uppercase transition-colors duration-[120ms] ease-linear hover:bg-night2 ${
                      isActive ? "text-chalk" : "text-chalk2"
                    }`}
                  >
                    {/* Die Positionsmarke sitzt im aktiven Feld selbst, damit
                        sie auch bei ungleich breiten Feldern exakt steht. */}
                    {isActive ? (
                      <motion.span
                        aria-hidden
                        layoutId={reduce ? undefined : "rail-marker"}
                        className="absolute inset-y-0 left-0 w-[2px] bg-ember"
                        transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
                      />
                    ) : null}
                    <span className="text-ember">{item.no}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}

        {/* Am Handy trägt die feste Leiste unten die Hauptaktion — zwei
            Probetraining-Knöpfe gleichzeitig wären eine Dopplung. Bewusst per
            CSS ausgeblendet und nicht über die Umbruchpunkt-Abfrage, damit der
            Knopf beim ersten Laden nicht kurz aufblitzt. */}
        <a
          href="#buchen"
          className="hidden content-center bg-band px-s3 py-3.5 font-mono text-[0.6563rem] tracking-[0.14em] text-ground uppercase no-underline transition-colors duration-[120ms] ease-linear hover:bg-mark min-[720px]:grid"
        >
          Probetraining
        </a>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="rail-menu"
            key="rail-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="grid gap-px border-t border-nightline bg-nightline"
          >
            {rail.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className="grid min-h-[2.75rem] cursor-pointer grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-3 bg-night2 px-s2 py-[1.125rem] text-left font-mono text-[0.8125rem] tracking-[0.1em] text-chalk uppercase"
              >
                <span className="text-[0.625rem] text-ember">{item.no}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
