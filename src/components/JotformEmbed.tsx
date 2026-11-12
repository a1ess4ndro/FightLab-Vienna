"use client";

import { useEffect, useRef, useState } from "react";

const ORIGIN = "https://form.jotform.com";

/** Luft unter der gemeldeten Formularhöhe, in px — damit unten nichts knapp abschneidet. */
const EXTRA = 50;

/**
 * Jotform-Formular, direkt eingebettet.
 *
 * Die Höhe meldet das Formular selbst per `setHeight`; der Rahmen wächst mit,
 * statt innen zu scrollen. Jotforms eigenes Einbettungsskript braucht es dafür
 * nicht, es wäre nur eine weitere fremde Verbindung.
 *
 * Die Adresse bekommt das iframe erst, wenn der Listener hängt — wie bei
 * Jotforms eigenem Skript. Stünde sie schon im vorgerenderten HTML, könnte das
 * Formular vor der Hydration fertig laden; seine erste Höhenmeldung ginge
 * verloren, und der Rahmen bliebe bei der Platzhalterhöhe stehen, mit
 * Scrollen im Formular statt auf der Seite.
 */
export function JotformEmbed({
  id,
  title,
  prefill,
}: {
  id: string;
  title: string;
  /** Felder vorausfüllen: eindeutiger Feldname in Jotform → Wert. */
  prefill?: Record<string, string>;
}) {
  const [height, setHeight] = useState<number | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  // `isIframeEmbed` setzt auch Jotforms Skript: Das Formular weiß dann, dass
  // es eingebettet ist.
  const src = `${ORIGIN}/${id}?${new URLSearchParams({
    ...prefill,
    isIframeEmbed: "1",
  })}`;

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== ORIGIN || typeof event.data !== "string") return;
      if (event.source !== frame.current?.contentWindow) return;
      const [kind, value] = event.data.split(":");
      if (kind === "setHeight") {
        const next = Number(value);
        if (next > 0) setHeight(next);
      } else if (kind === "scrollIntoView") {
        // Beim Blättern im mehrseitigen Formular zurück an seinen Anfang —
        // sonst steht man nach „Weiter" mitten in der nächsten Seite.
        frame.current?.scrollIntoView({ block: "start" });
      }
    };
    window.addEventListener("message", onMessage);
    // Erst jetzt laden: Ab hier kommt jede Höhenmeldung an.
    if (frame.current) frame.current.src = src;
    return () => window.removeEventListener("message", onMessage);
  }, [src]);

  return (
    <iframe
      ref={frame}
      id={`JotFormIFrame-${id}`}
      title={title}
      style={height ? { height: height + EXTRA } : undefined}
      // Nie im Rahmen scrollen: Der Rahmen wächst mit dem Formular, Scrollen
      // darin gäbe nur einen Balken und eine Scroll-Falle.
      scrolling="no"
      // Bis zur ersten Höhenmeldung eine Bildschirmhöhe, danach das Formular
      // plus Luft — eine Mindesthöhe ließe unter kurzen Seiten Leere stehen.
      className={`block w-full border-0 ${height ? "" : "h-[calc(40rem+50px)]"}`}
    />
  );
}
