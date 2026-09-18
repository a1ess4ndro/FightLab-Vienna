"use client";

import { useEffect, useState } from "react";

/**
 * Umbruchpunkt-Abfrage ohne Layout-Sprung: startet serverseitig bei `false`
 * und korrigiert sich nach dem ersten Paint.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Handy: unter 720 px. Darüber steht die Rail-Navigation im Kopf. */
export function useIsMobile() {
  return useMediaQuery("(max-width: 719.98px)");
}

/**
 * Welcher Abschnitt gerade oben steht. Liest nur im Animation-Frame,
 * verändert nichts am Layout und läuft passiv.
 */
export function useActiveSection(ids: string[], offset = 140): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        let current = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= offset) current = id;
        }
        setActive((prev) => (prev === current ? prev : current));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return active;
}
