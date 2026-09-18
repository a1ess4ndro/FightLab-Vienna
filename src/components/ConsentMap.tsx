"use client";

import { useState } from "react";

import { site } from "@/lib/content";

/**
 * Karte erst nach ausdrücklichem Klick.
 *
 * Eine eingebettete Google-Karte überträgt beim bloßen Seitenaufruf Daten in
 * die USA und bräuchte eine Einwilligung. Deshalb liegt im Grundzustand nur
 * eine Fläche mit Adresse hier; geladen wird sie, wenn jemand sie sehen will.
 * Der Routen-Link daneben funktioniert ohne jedes Nachladen.
 */
export function ConsentMap() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Karte — ${site.street}, ${site.city}`}
        src={site.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-full min-h-[clamp(14rem,38vh,21.25rem)] w-full border-0 [filter:grayscale(1)_contrast(0.92)_brightness(0.92)]"
      />
    );
  }

  return (
    <div className="hatch-dark grid min-h-[clamp(14rem,38vh,21.25rem)] place-items-center p-s3">
      <div className="grid max-w-[34ch] justify-items-center gap-s2 text-center">
        <span className="data text-[0.625rem] text-chalk2">
          Karte — {site.street}, {site.city}
        </span>
        <p className="m-0 text-[0.9375rem] leading-[1.55] text-chalk2">
          Die Karte lädt erst auf Klick. Danach stellt dein Browser eine
          Verbindung zu Google her.
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="min-h-[2.75rem] cursor-pointer border border-chalk2 px-s3 font-mono text-[0.6875rem] tracking-[0.12em] text-chalk uppercase transition-colors duration-[120ms] ease-linear hover:bg-chalk hover:text-night"
        >
          Karte laden
        </button>
      </div>
    </div>
  );
}
