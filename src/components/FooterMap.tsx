import { site } from "@/lib/content";

/**
 * Google-Karte im Fuß, direkt eingebettet. `loading="lazy"`: Sie lädt erst,
 * wenn der Fuß in die Nähe des Bildschirms kommt, nicht schon beim Aufruf
 * der Seite.
 */
export function FooterMap() {
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
