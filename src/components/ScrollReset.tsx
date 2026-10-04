"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Neue Seite, neuer Anfang.
 *
 * Next.js behält bei einem Seitenwechsel die Scrollposition, solange der
 * Anfang der neuen Seite „sichtbar“ ist. Unsere Seiten bestehen aus einem
 * hohen `main`, das fast immer als sichtbar gilt — wer im Fuß auf Impressum
 * klickte, landete deshalb am Ende des Impressums.
 *
 * Deshalb hier selbst: nach vorne nach oben, mit Anker direkt zum Anker.
 * Ausgenommen sind Zurück und Vor; dort stellt der Browser die alte Position
 * wieder her, und das soll so bleiben. Der erste Aufruf auch — beim Neuladen
 * stellt der Browser ebenfalls die Position wieder her.
 *
 * `behavior: "instant"`, weil `html` sonst sein `scroll-behavior: smooth`
 * anwendet und die Seite sichtbar durchrollt.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => {
      popped.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (popped.current) {
      popped.current = false;
      return;
    }

    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    // Zum Anker erst, wenn die neue Seite steht: Am Handy schaltet sie nach
    // dem ersten Zeichnen noch auf die Handy-Ansicht um, auch die Kopfleiste
    // wird dabei niedriger. Ihre Höhe wird deshalb erst jetzt gemessen statt
    // aus `--rail-h` gelesen, das in diesem Moment noch den alten Wert trägt.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const target = document.getElementById(hash);
        if (!target) return;
        const rail = document.querySelector("[data-rail]");
        const offset = Math.floor(rail?.getBoundingClientRect().height ?? 0);
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: "instant",
        });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
