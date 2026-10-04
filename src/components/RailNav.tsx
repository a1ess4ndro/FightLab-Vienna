"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { rail, railIds } from "@/lib/content";
import { useActiveSection, useIsMobile } from "@/hooks/useViewport";
import { Wordmark } from "@/components/ui/Wordmark";

/** Abstand der Teilstriche und jedes fünften, längeren Strichs. */
const SCALE_STEP = 12;
const SCALE_MAJOR = SCALE_STEP * 5;

/**
 * Höhe der Kopfleiste, auf ganze Pixel abgerundet. Ein Abschnitt, der nach
 * einem Sprung einen halben Pixel zu tief sitzt, zeigt darüber eine Haarlinie
 * des vorigen Abschnitts. Sitzt er einen halben Pixel zu hoch, verschwindet
 * das unter der Leiste, und niemand sieht es.
 */
function railHeight(header: HTMLElement | null): number {
  return Math.floor(header?.getBoundingClientRect().height ?? 0);
}

/**
 * Rastet die Felder der Skala auf ihre Teilstriche ein: Jede Feldgrenze wandert
 * auf den nächsten Strich, höchstens 6 px weit, damit die Trennlinie genau auf
 * einem Strich steht statt daneben. Das letzte Feld füllt den Rest.
 *
 * Jedes Feld zeichnet seinen Teil der Skala selbst. Weil alle Felder auf
 * Vielfachen von 12 px beginnen, läuft sie trotzdem gleichmäßig durch; die
 * langen Striche bekommen über `--scale-phase` den Versatz zum Skalenanfang.
 */
function snapToScale(row: HTMLElement) {
  const items = Array.from(row.children) as HTMLElement[];
  for (const item of items) item.style.flex = "";

  const origin = row.getBoundingClientRect().left - row.scrollLeft;
  const naturalEnds = items.map(
    (item) => item.getBoundingClientRect().right - origin,
  );

  let start = 0;
  items.forEach((item, i) => {
    item.style.setProperty("--scale-phase", `${-(start % SCALE_MAJOR)}px`);
    if (i === items.length - 1) return;
    const end = Math.max(
      start + SCALE_STEP,
      Math.round(naturalEnds[i] / SCALE_STEP) * SCALE_STEP,
    );
    item.style.flex = `0 0 ${end - start}px`;
    start = end;
  });
}

/**
 * Kopfleiste als Messskala: links die Wortmarke, in der Mitte die Teilstriche
 * mit einer roten Positionsmarke, rechts die einzige Hauptaktion der Seite.
 * Unter 720 px wird die Skala zu einem Menü.
 *
 * Steht auf jeder Seite. Die Skala misst aber die Startseite: nur dort gibt es
 * die sechs Abschnitte zum Scrollen. Auf den Rechtsseiten werden aus den
 * Teilstrichen deshalb Verweise auf `/#abschnitt`, und es leuchtet keine
 * Positionsmarke — ein Zeiger, der nichts misst, wäre eine Falschanzeige.
 */
export function RailNav() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const spy = useActiveSection(railIds);
  const active = onHome ? spy : null;
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  // Das Menü existiert nur am Handy; ein Umbruch auf Desktop schließt es
  // damit ohne Effekt und ohne zusätzlichen Renderdurchgang.
  const menuOpen = isMobile && open;

  // Dieselbe Höhe als `--rail-h` für `scroll-padding-top`: Auch Anker wie
  // `/#woche` landen dann direkt unter der Leiste. Mit einem festen Abstand
  // blieb darüber ein Streifen des vorigen Abschnitts stehen.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const observer = new ResizeObserver(() => {
      root.style.setProperty("--rail-h", `${railHeight(header)}px`);
    });
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--rail-h");
    };
  }, []);

  // Neu einrasten, sobald sich die Breite ändert oder die Schrift geladen ist —
  // beides verschiebt die natürlichen Feldgrenzen. Vor dem ersten Zeichnen,
  // damit die Grenzen nach dem Laden nicht sichtbar springen.
  useLayoutEffect(() => {
    const row = scaleRef.current;
    if (!row) return;
    let alive = true;
    const snap = () => {
      if (alive) snapToScale(row);
    };
    snap();
    const observer = new ResizeObserver(snap);
    observer.observe(row);
    document.fonts?.ready.then(snap);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [isMobile]);

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top:
        el.getBoundingClientRect().top +
        window.scrollY -
        railHeight(headerRef.current),
      behavior: prefersReduced ? "auto" : "smooth",
    });
    setOpen(false);
  }, []);

  return (
    <header
      ref={headerRef}
      data-rail
      className="sticky top-0 z-40 border-b border-nightline bg-night"
    >
      <div className="flex items-stretch">
        <Link
          href="/"
          onClick={(event) => {
            if (!onHome) return;
            event.preventDefault();
            goTo("distanz");
          }}
          className="grid content-center border-r border-nightline px-[1.125rem] py-3 no-underline"
        >
          <Wordmark />
        </Link>

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
              ref={scaleRef}
              className="relative flex w-full flex-nowrap overflow-x-auto"
            >
              {rail.map((item) => {
                const isActive = item.id === active;
                /* Die Skala ist der Hintergrund jedes Feldes: alle 12 px ein
                   Strich, jeder fünfte länger, jeweils am rechten Ende der
                   Kachel. Der letzte Strich eines Feldes fällt damit genau auf
                   seine Trennlinie. Als Hintergrundbild bleibt sie auch unter
                   dem Hover-Grund sichtbar und scrollt mit, wenn die Leiste
                   auf schmalen Bildschirmen seitlich überläuft. Gekachelte
                   Verläufe statt eines sich wiederholenden: Den zeichnen
                   Safari und skalierte Anzeigen ungleichmäßig. */
                const className = `relative grid min-w-0 flex-[1_0_auto] cursor-pointer whitespace-nowrap gap-[5px] border-r border-nightline bg-transparent bg-[linear-gradient(90deg,transparent_11px,var(--color-nightline2)_11px),linear-gradient(90deg,transparent_59px,var(--color-nightline2)_59px)] bg-[length:12px_5px,60px_9px] bg-[position:0_100%,var(--scale-phase,0px)_100%] bg-repeat-x px-3.5 pt-3.5 pb-3 text-left font-mono text-[0.5938rem] tracking-[0.16em] uppercase no-underline transition-colors duration-[120ms] ease-linear hover:bg-night2 ${
                  isActive ? "text-chalk" : "text-chalk2"
                }`;
                const body = (
                  <>
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
                  </>
                );

                return onHome ? (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={className}
                  >
                    {body}
                  </button>
                ) : (
                  <Link key={item.id} href={`/#${item.id}`} className={className}>
                    {body}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        {/* Am Handy trägt die feste Leiste unten die Hauptaktion — zwei
            Probetraining-Knöpfe gleichzeitig wären eine Dopplung. Bewusst per
            CSS ausgeblendet und nicht über die Umbruchpunkt-Abfrage, damit der
            Knopf beim ersten Laden nicht kurz aufblitzt. */}
        <Link
          href="/probetraining"
          className="hidden content-center bg-band px-s3 py-3.5 font-mono text-[0.6563rem] tracking-[0.14em] text-ground uppercase no-underline transition-colors duration-[120ms] ease-linear hover:bg-mark min-[720px]:grid"
        >
          Probetraining
        </Link>
      </div>

      {/* Das Menü legt sich über die Seite, statt im Fluss zu stehen. Im Fluss
          schob es jeden Abschnitt um seine eigene Höhe nach unten, und ein
          Sprung aus dem Menü landete nach dem Schließen um genau diese Höhe zu
          tief — überall dort, wo kein Scroll-Anchoring nachhilft, etwa in
          Safari. Die Höhenbegrenzung hält die unteren Einträge auch im
          Querformat erreichbar. */}
      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="rail-menu"
            key="rail-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="absolute inset-x-0 top-full grid max-h-[calc(100dvh-100%)] gap-px overflow-y-auto border-y border-nightline bg-nightline"
          >
            {rail.map((item) => {
              const className =
                "grid min-h-[2.75rem] cursor-pointer grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-3 bg-night2 px-s2 py-[1.125rem] text-left font-mono text-[0.8125rem] tracking-[0.1em] text-chalk uppercase no-underline";
              const body = (
                <>
                  <span className="text-[0.625rem] text-ember">{item.no}</span>
                  <span>{item.label}</span>
                </>
              );

              return onHome ? (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className={className}
                >
                  {body}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={className}
                >
                  {body}
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
