import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";

/**
 * Beide Schriften werden von Next zur Bauzeit heruntergeladen und vom eigenen
 * Server ausgeliefert. Es entsteht keine Verbindung des Besuchers zur
 * Google-Fonts-CDN — genau die Anforderung aus Dokument 02.
 */
const grotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fightlab.at"),
  title: {
    default: "Muay Thai & Kickboxen in Wien-Meidling — FightLab",
    template: "%s — FightLab",
  },
  description:
    "Kampfsportschule in Wien-Meidling für Muay Thai und Kickboxen. Anfängerkurs ohne Vorkenntnisse, feste Gruppen, Preise vollständig auf der Seite. Eröffnung November 2026.",
  keywords: [
    "Muay Thai Wien",
    "Kickboxen Wien",
    "Kampfsport Meidling",
    "Anfängerkurs Kampfsport Wien",
    "Thaiboxen lernen Wien",
    "Kampfsport 1120 Wien",
  ],
  alternates: { canonical: "/", languages: { "de-AT": "/", en: "/en" } },
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: "FightLab",
    title: "Muay Thai & Kickboxen in Wien-Meidling — FightLab",
    description:
      "Kämpfen ist wie Schach, nur dass Fehler weh tun. Kampfsportschule für Distanz, Timing und Entscheidungen unter Druck.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1A1815",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-AT" className={`${grotesk.variable} ${jetbrains.variable}`}>
      <body>
        <a
          href="#distanz"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-ground focus:px-s2 focus:py-s1 focus:font-mono focus:text-xs focus:text-ink"
        >
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}
