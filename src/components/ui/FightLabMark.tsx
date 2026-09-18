'use client';

import { useId } from 'react';

/** Die Kontur des Kolbens — einmal als Strich, einmal als Beschnittform. */
const FLASK =
  'M42 26 L42 46 L14 84 Q12 94 24 94 L76 94 Q88 94 86 84 L58 46 L58 26';

/** Logorot. Fester Wert, kein Token: eine Marke wechselt nicht die Farbe. */
const LIQUID = '#E23B22';

/**
 * Die Bildmarke: ein Erlenmeyerkolben — „Lab" als Form statt als Wort.
 *
 * Kontur und Korken laufen in `currentColor` und erben damit den Textton der
 * Fläche (auf Schwarz Kreide, auf Putz Ink); Flüssigkeit und Blasen bleiben
 * im Logorot. So deckt eine Zeichnung Positiv und Negativ ab.
 *
 * Die Beschnittform braucht eine ID, und die Marke steht mehrfach auf der
 * Seite — `useId` hält sie eindeutig und über Server und Client hinweg
 * gleich. CSS `clip-path: path()` wäre ohne ID ausgekommen, beschneidet auf
 * SVG-Kindern aber im falschen Koordinatensystem.
 *
 * Rein dekorativ — der Markenname steht als Text daneben.
 */
export function FightLabMark({ className = '' }: { className?: string }) {
  const clipId = `flask-${useId()}`;

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      focusable="false"
      fill="none"
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={`${FLASK} Z`} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M4 72 C22 65 34 80 50 74 C64 69 74 81 96 71 L96 100 L4 100 Z"
          fill={LIQUID}
        />
      </g>
      <path
        d={FLASK}
        stroke="currentColor"
        strokeWidth={7}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="32" y="17" width="36" height="10" rx="5" fill="currentColor" />
      <circle cx="56" cy="9" r="4.6" fill={LIQUID} />
      <circle cx="66" cy="2.6" r="2.6" fill={LIQUID} />
    </svg>
  );
}
