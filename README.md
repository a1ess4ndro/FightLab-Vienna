# FightLab Vienna — Startseite

Startseite der Kampfsportschule FightLab (Team Kaplan), Pottendorfer Straße 9,
1120 Wien. Umsetzung der Konzeptstrecke aus den fünf Dokumenten
(Discovery/Strategie, CI-System, Website-UX, Technik, Handoff) als Next.js-App.

Inhaltlicher und struktureller Stand: **`FightLab Startseite v2`**. Abschnitte in
dieser Reihenfolge: Distanz · Belege & Benefits · Woche · Einwände · Laufzeit ·
Coach · Buchung · Fuß.

**Stand: Entwurf.** Preise, Stundenplan, Rechtstexte und Fotografie sind als
Platzhalter markiert und im Code an einer Stelle austauschbar.

## Starten

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktionsbuild
npm run start    # Produktionsserver
npm run lint
```

## Stack

| Baustein   | Wahl                        | Warum                                                            |
| ---------- | --------------------------- | ---------------------------------------------------------------- |
| Framework  | Next.js 16, App Router      | Serverkomponenten als Standard, später Stripe und Buchung im selben Projekt |
| Sprache    | TypeScript                  | Preis- und Terminlogik soll nicht raten                           |
| Styling    | Tailwind CSS v4             | Tokens erzwingen statt empfehlen                                  |
| Bewegung   | Framer Motion               | Nur dort, wo ein Zustand wechselt — nie beim Scrollen             |
| Schriften  | `next/font` (selbst gehostet) | Keine Verbindung des Besuchers zur Google-Fonts-CDN             |

## Aufbau

```
src/
  app/
    layout.tsx        Schriften, Metadaten, Sprache, Skip-Link
    page.tsx          Reihenfolge der Abschnitte
    globals.css       Design-Tokens (@theme) — einzige Farbquelle
    icon.svg          Favicon (Bildmarke)
  components/         Ein Abschnitt je Datei
    ui/               Band, Abschnittskopf, Schaltfläche, Lockup
public/brand/         Bildmarke als SVG: Kolben creme, Badge, invers, mono, solid
  hooks/useViewport   Umbruchpunkt und Scroll-Spy
  lib/
    content.ts        Alle Texte, Zeiten, Preise, Einwände
    format.ts         Euro-Format, Monatsnamen, Achsenpositionen
```

### Wo etwas geändert wird

| Änderung                       | Datei                                   |
| ------------------------------ | --------------------------------------- |
| Stundenplan, Kurse, Kapazität  | `src/lib/content.ts` → `sessions`       |
| Preise und Laufzeiten          | `src/lib/content.ts` → `rates`, `terms` |
| Einwände und Antworten         | `src/lib/content.ts` → `doubts`         |
| Adresse, Kontakt, Entwurfsnote | `src/lib/content.ts` → `site`           |
| Logo-Lockup                    | `src/components/ui/Wordmark.tsx`        |
| Farbe, Abstand, Bewegung       | `src/app/globals.css` → `@theme`        |

Keine Farbwerte im Markup. Wer eine neue Fläche baut, nimmt vorhandene Tokens.

## Designregeln, die der Code durchsetzt

- **Radius 0, keine Schatten.** Global in `globals.css` gesetzt; Tiefe entsteht
  durch Haarlinien und Fläche.
- **Abstandsfolge 8 / 16 / 24 / 40 / 64 / 104 px** als `s1 … s6`. Keine
  Zwischenwerte.
- **Rot maximal 5 % der Fläche.** `band` nur als Fläche, `mark` nur als kleine
  Schrift auf Putz, `signal` nur als kleine Schrift auf Schwarz. Nie als
  Warnfarbe.
- **Monospace für alles Messbare** — Zeiten, Preise, Adressen, Laufzeiten.
- **Bewegung nur bei Zustandswechsel**, 120–180 ms. Kein Parallax, kein
  Fade-in beim Scrollen, kein Hochzählen von Zahlen. Bei
  `prefers-reduced-motion` ist alles aus.

## Barrierefreiheit

- Eine `h1` pro Seite, lückenlose Überschriftenebenen, Skip-Link.
- Distanzregler ist ein `role="slider"` mit Pfeiltasten, Home/End und
  gesprochenem `aria-valuetext`.
- Alle Umschalter tragen `aria-pressed`.
- Tippziele mindestens 44 × 44 px, Fokus immer sichtbar.
- Die Wochenansicht wird unter 720 px zur Tagesliste statt zum beschnittenen
  Gitter.

## Datenschutz

- Schriften werden mitgeliefert, nicht nachgeladen.
- Die Karte im Fuß lädt **erst auf Klick** (`ConsentMap`). Im Grundzustand
  entsteht keine Verbindung zu Google; der Routen-Link funktioniert ohne.
- Analytics und Clarity sind bewusst **noch nicht** eingebaut — sie brauchen
  den Zustimmungsdialog aus Dokument 04, bevor sie geladen werden dürfen.

## Offen, bevor die Seite live geht

1. Echte Zeiten für den Stundenplan und bestätigte Preise.
2. Impressum, AGB, Datenschutz, Widerruf vom Anwalt.
3. Fotografie: Raum, Technikdetails, Porträt — bis dahin bleiben die
   schraffierten Platzhalterflächen stehen.
4. Buchungsstrecke (Stripe, Supabase) und Zustimmungsdialog nach Dokument 04.
5. Restliche acht Seiten der Sitemap aus Dokument 03.
