'use client';

import { useEffect, useState } from 'react';

import { useIsMobile } from '@/hooks/useViewport';

/**
 * Feste Aktionsleiste am Handy, 56 px hoch.
 *
 * Sie steht von Anfang an da — die Hauptaktion soll nicht erst erscrollt
 * werden müssen. Solange der Hero zu sehen ist, bleibt sie durchscheinend und
 * tritt hinter die große Zeile zurück; danach wird sie deckend. Das ist ein
 * Zustandswechsel (180 ms), keine scrollgekoppelte Bewegung.
 *
 * Unter der durchscheinenden Platte liegt ein dunkler Schleier. Ohne ihn
 * fällt der Kontrast der Beschriftung auf hellem Grund auf 3,8:1 — der Hero
 * endet 46 px über der Leiste, dahinter läuft also schon ab Scrollposition 0
 * heller Putz durch. Mit Schleier bleibt es bei rund 5,8:1.
 */
export function MobileCtaBar() {
  const isMobile = useIsMobile();
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    if (!isMobile) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const hero = document.getElementById('distanz');
        if (!hero) return;
        setOverHero(hero.getBoundingClientRect().bottom > 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <>
      {/* Platz, damit die Leiste die letzte Zeile des Fußes nie verdeckt. */}
      <div aria-hidden className="h-16" />
      <div className="fixed inset-x-0 bottom-0 z-50">
        <span
          aria-hidden
          className={`absolute inset-0 bg-ink transition-opacity duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] ${
            overHero ? 'opacity-70' : 'opacity-0'
          }`}
        />
        <a
          href="#buchen"
          className={`relative grid min-h-[3.5rem] content-center px-s2 py-[1.125rem] text-center font-mono text-[0.75rem] tracking-[0.14em] text-ground uppercase no-underline transition-colors duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] ${
            overHero ? 'bg-band/85' : 'bg-band'
          }`}
        >
          Probetraining buchen
        </a>
      </div>
    </>
  );
}
