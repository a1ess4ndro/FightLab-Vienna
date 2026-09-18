"use client";

import { axisHours, days, sessions, weekNote } from "@/lib/content";
import { axisPosition, axisOffset } from "@/lib/format";
import { Band } from "@/components/ui/Band";
import { Cta } from "@/components/ui/Cta";
import { SectionHead } from "@/components/ui/SectionHead";
import { useIsMobile } from "@/hooks/useViewport";
import { useToday } from "@/hooks/useToday";

/**
 * 03 — Die Woche als Zeitachse.
 *
 * Tage waagrecht, Uhrzeit senkrecht: Auf einen Blick ist zu sehen, wann
 * trainiert wird und wie lange eine Einheit dauert. Unter 720 px wird daraus
 * eine gestapelte Tagesliste statt eines beschnittenen Gitters.
 *
 * Rot markiert hier ausschließlich den heutigen Tag — als Positionsangabe,
 * wie ein Teilstrich auf einer Skala, nicht als Auszeichnung oder Warnung.
 */
export function WeekTimeline() {
  const isMobile = useIsMobile();
  const today = useToday();

  return (
    <section
      id="woche"
      aria-labelledby="woche-titel"
      className="bg-night2 text-chalk"
    >
      <Band size="md" />
      <div className="grid gap-s3 px-[clamp(1.125rem,4vw,3.5rem)] pt-[clamp(2rem,5vw,4.25rem)] pb-[clamp(2.5rem,5vw,4.75rem)]">
        <SectionHead
          id="woche-titel"
          title="Die Woche als Zeitachse"
          titleWidth="max-w-[18ch]"
        />

        {isMobile ? (
          <ul className="m-0 grid list-none gap-0 p-0">
            {days.map((day, i) => {
              const isToday = day === today;
              /* Die Linie unter einer Zeile ist die obere Linie der nächsten.
                 Deshalb wird sie dort eingefärbt statt hier eine zweite zu
                 setzen — sonst stünden zwei Striche übereinander. Der letzte
                 Tag hat keinen Nachfolger und braucht eine eigene. */
              const followsToday = i > 0 && days[i - 1] === today;
              const closesList = isToday && i === days.length - 1;
              return (
                <li
                  key={day}
                  aria-current={isToday ? "date" : undefined}
                  className={`grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3.5 border-t py-3.5 ${
                    isToday || followsToday
                      ? "border-dashed border-t-signal"
                      : "border-t-nightline2"
                  } ${closesList ? "border-b border-b-signal" : ""}`}
                >
                  <span
                    className={`pt-[2px] font-mono text-xs tracking-[0.14em] ${
                      isToday ? "text-signal" : "text-chalk2"
                    }`}
                  >
                    {day}
                    {isToday ? <span className="sr-only"> — heute</span> : null}
                  </span>
                  <div className="grid gap-s1">
                    {sessions
                      .filter((s) => s.day === day)
                      .map((s) => (
                        <div
                          key={s.id}
                          className="grid min-h-[2.75rem] grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3.5 gap-y-s1 border border-nightline2 bg-night3 px-3 py-s1"
                        >
                          <span className="font-mono text-[0.6875rem] tracking-[0.08em] uppercase">
                            {s.short}
                          </span>
                          <span className="font-mono text-[0.6875rem] text-signal">
                            {s.from} — {s.to}
                          </span>
                        </div>
                      ))}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="grid min-w-0 overflow-x-auto">
            <div className="grid min-w-[40rem] grid-cols-[56px_repeat(6,minmax(5.75rem,1fr))] gap-px pb-s1">
              <span />
              {days.map((day) => {
                const isToday = day === today;
                return (
                  <span
                    key={day}
                    className={`text-center font-mono text-[0.7188rem] tracking-[0.16em] uppercase ${
                      isToday ? "text-signal" : "text-chalk2"
                    }`}
                  >
                    {day}
                    {isToday ? <span className="sr-only"> — heute</span> : null}
                  </span>
                );
              })}
            </div>

            <div className="grid min-w-[40rem] grid-cols-[56px_repeat(6,minmax(5.75rem,1fr))] gap-px border-y border-nightline2 bg-nightline2">
              <div
                aria-hidden
                className="relative h-[clamp(18.75rem,30vw,25rem)] bg-night2"
              >
                {axisHours.map((hour) => (
                  <span
                    key={hour}
                    style={{ top: `${axisOffset(hour)}%` }}
                    className="absolute right-s1 -translate-y-1/2 font-mono text-[0.625rem] tracking-[0.1em] text-chalk2"
                  >
                    {hour}
                  </span>
                ))}
              </div>

              {days.map((day) => {
                const isToday = day === today;
                return (
                  <div
                    key={day}
                    aria-current={isToday ? "date" : undefined}
                    /* Outline statt Border: markiert die Spalte, ohne ihre
                       Höhe zu verändern — die Einheiten sitzen prozentual. */
                    className={`relative h-[clamp(18.75rem,30vw,25rem)] bg-night2 bg-[repeating-linear-gradient(180deg,var(--color-night3)_0_1px,transparent_1px_22.22%)] ${
                      isToday
                        ? "outline-1 -outline-offset-1 outline-dashed outline-signal"
                        : ""
                    }`}
                  >
                    {sessions
                      .filter((s) => s.day === day)
                      .map((s) => {
                        const pos = s.offAxis
                          ? { top: 0, height: axisPosition(s.from, s.to).height }
                          : axisPosition(s.from, s.to);
                        return (
                          <div
                            key={s.id}
                            title={`${s.name}, ${s.from} — ${s.to}`}
                            style={{
                              top: `${pos.top}%`,
                              height: `${pos.height}%`,
                            }}
                            className={`absolute inset-x-1 grid content-start gap-1 overflow-hidden border bg-night3 px-s1 pt-s1 ${
                              s.offAxis
                                ? "border-dashed border-concrete"
                                : "border-nightline2"
                            }`}
                          >
                            <span className="font-mono text-[0.625rem] tracking-[0.06em] text-signal">
                              {s.from} — {s.to}
                            </span>
                            <span className="font-mono text-[0.6563rem] leading-[1.3] tracking-[0.08em] text-chalk uppercase">
                              {s.short}
                            </span>
                            {s.offAxis ? (
                              <span className="data text-[0.5625rem] text-chalk2">
                                vormittags
                              </span>
                            ) : null}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Drei Spuren statt zwei: die leere Spur rechts spiegelt den Hinweis
            links, damit der Knopf exakt in der Mitte der Fläche steht — auch
            wenn der Hinweistext kürzer oder länger wird. */}
        <div className="grid items-center gap-s2 gap-x-s3 border-t-2 border-chalk2 pt-[1.375rem] min-[720px]:grid-cols-[1fr_auto_1fr]">
          <p className="m-0 max-w-[52ch] text-[clamp(0.9375rem,1vw,1rem)] leading-[1.55] text-chalk2">
            {weekNote}
          </p>
          <Cta
            href="#buchen"
            className="justify-self-start self-center min-[720px]:justify-self-center"
          >
            Probetraining buchen
          </Cta>
          <span aria-hidden className="hidden min-[720px]:block" />
        </div>
      </div>
    </section>
  );
}
