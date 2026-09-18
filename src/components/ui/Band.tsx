"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Das rote Band. Volle Breite, immer angeschnitten, nie eingerahmt.
 * Drei Höhen: 40 px Hauptfläche, 26 px Abschnitt, 14 px Fuß. Ein Band pro Fläche.
 *
 * Bewegung: zieht einmal beim Laden der Seite horizontal auf (180 ms).
 * Bewusst kein Scroll-Trigger — beim Scrollen bewegt sich nichts.
 */
const HEIGHTS = { lg: "h-10", md: "h-[26px]", sm: "h-[14px]" } as const;

export function Band({ size = "md" }: { size?: keyof typeof HEIGHTS }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={`${HEIGHTS[size]} w-full origin-left bg-band`}
      initial={reduce ? false : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
    />
  );
}
