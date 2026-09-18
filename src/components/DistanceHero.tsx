"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, KeyboardEvent } from "react";

import { distanceInCm, site, zoneOf } from "@/lib/content";

/** Startwert des Reglers — entspricht 126 cm, also mittlere Distanz. */
const START = 46;

/**
 * 01 — Distanz.
 *
 * Der erste Bildschirm erklärt die Methode, statt sie zu behaupten: Wer den
 * Abstand zieht, sieht, dass sich mit der Distanz die Aufgabe ändert.
 * Bedienbar mit Zeiger, Finger und Tastatur.
 */
export function DistanceHero() {
  const [value, setValue] = useState(START);
  const dragging = useRef(false);
  const reduce = useReducedMotion();

  const zone = zoneOf(value);
  const cm = distanceInCm(value);
  const flip = value > 88;

  const setFromEvent = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width) return;
    const ratio = (event.clientX - rect.left) / rect.width;
    setValue(Math.round(Math.min(1, Math.max(0, ratio)) * 100));
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4;
    const keys = ["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      setValue((v) => Math.min(100, v + step));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      setValue((v) => Math.max(0, v - step));
    } else if (event.key === "Home") {
      setValue(0);
    } else {
      setValue(100);
    }
  }, []);

  return (
    <section
      id="distanz"
      aria-labelledby="distanz-titel"
      className="grid min-h-[88vh] content-between gap-s4 pt-s5"
    >
      <div className="grid gap-s3 px-[clamp(1.125rem,4vw,3.5rem)]">
        <h1 id="distanz-titel" className="sr-only">
          FightLab — Kampfsportschule für Muay Thai und Kickboxen in
          Wien-Meidling
        </h1>
        <p className="data flex flex-wrap gap-y-s1 gap-x-s3 text-[0.6563rem] tracking-[0.2em] text-chalk2">
          <span>FightLab Wien Meidling</span>
          <span>{site.disciplines}</span>
          <span className="text-signal">{site.opening}</span>
        </p>
        <p className="m-0 max-w-[30ch] text-[clamp(1.0625rem,1.7vw,1.375rem)] leading-[1.4] italic">
          {site.tagline}
        </p>
      </div>

      <div className="grid">
        <div className="grid gap-s1 px-[clamp(1.125rem,4vw,3.5rem)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={zone.name}
              aria-hidden
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.12, ease: "linear" }}
              className="m-0 -ml-[0.045em] text-[clamp(2.75rem,12vw,13rem)] leading-[0.85] font-bold tracking-[-0.05em] uppercase"
            >
              {zone.name}
            </motion.p>
          </AnimatePresence>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] items-end gap-s3 gap-x-s4 pt-s1">
            <p
              aria-hidden
              className="m-0 max-w-[44ch] text-[clamp(1rem,1.6vw,1.1875rem)] leading-[1.5] text-chalk2"
            >
              {zone.line}
            </p>
            <div className="grid justify-items-end gap-[6px] justify-self-end font-mono text-xs tracking-[0.1em] text-chalk2">
              <span>
                Abstand <span className="text-signal">{cm} cm</span>
              </span>
              <span>
                Trefferwahrscheinlichkeit{" "}
                <span className="text-signal">{zone.hit}</span>
              </span>
            </div>
          </div>
        </div>

        <div
          role="slider"
          tabIndex={0}
          aria-label="Distanz zwischen zwei Kämpfern"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${cm} Zentimeter — ${zone.name}, Trefferwahrscheinlichkeit ${zone.hit}`}
          onPointerDown={(event) => {
            dragging.current = true;
            event.currentTarget.setPointerCapture?.(event.pointerId);
            setFromEvent(event);
          }}
          onPointerMove={(event) => {
            if (dragging.current) setFromEvent(event);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
          onKeyDown={onKeyDown}
          className="relative mt-[clamp(1.5rem,4vw,2.75rem)] h-[clamp(7.5rem,20vh,11.875rem)] touch-none border-t border-nightline bg-[repeating-linear-gradient(90deg,var(--color-nightline)_0_1px,transparent_1px_16px)] bg-[length:100%_22px] bg-left-top bg-repeat-x outline-offset-2 select-none [cursor:ew-resize]"
        >
          <div
            className="absolute top-0 bottom-0 w-px -translate-x-px bg-ember"
            style={{ left: `${value}%` }}
          >
            {/* Nahe am rechten Rand klappen Marke und Beschriftung nach innen. */}
            <span
              className={`absolute top-0 block size-[0.5625rem] bg-ember ${
                flip ? "right-0" : "left-0"
              }`}
            />
            <span
              className={`data absolute top-s2 text-[0.625rem] whitespace-nowrap text-signal ${
                flip ? "right-[0.625rem]" : "left-[0.625rem]"
              }`}
            >
              {cm} cm
            </span>
          </div>

          <div className="data absolute inset-x-0 bottom-0 flex justify-center px-[clamp(1.125rem,4vw,3.5rem)] pb-3.5 text-[0.625rem] tracking-[0.18em] text-chalk2">
            <span>↔ ziehen, oder Pfeiltasten</span>
          </div>
        </div>
      </div>
    </section>
  );
}
