"use client";

import { useEffect, useRef, useState } from "react";

const ORIGIN = "https://form.jotform.com";

/**
 * Jotform-Formular, direkt eingebettet.
 *
 * Die Höhe meldet das Formular selbst per `setHeight`; der Rahmen wächst mit,
 * statt innen zu scrollen. Jotforms eigenes Einbettungsskript braucht es dafür
 * nicht, es wäre nur eine weitere fremde Verbindung.
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
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const query = new URLSearchParams(prefill).toString();
  return (
    <iframe
      ref={frame}
      id={`JotFormIFrame-${id}`}
      title={title}
      src={`${ORIGIN}/${id}${query ? `?${query}` : ""}`}
      style={height ? { height } : undefined}
      // Bis zur ersten Höhenmeldung eine Bildschirmhöhe, danach genau das
      // Formular — eine Mindesthöhe ließe unter kurzen Seiten Leere stehen.
      className={`block w-full border-0 ${height ? "" : "h-[40rem]"}`}
    />
  );
}
