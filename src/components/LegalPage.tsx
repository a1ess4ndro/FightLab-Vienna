import Link from "next/link";

import type { LegalBlock, LegalDoc } from "@/lib/legal";
import { legalDocs } from "@/lib/legal";
import { site } from "@/lib/content";
import { SiteFooter } from "@/components/SiteFooter";
import { Band } from "@/components/ui/Band";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Gemeinsame Form der drei Rechtsseiten.
 *
 * Langer Text steht auf Putz, nicht auf Schwarz — 800 Wörter Fließtext in
 * Creme auf Tiefschwarz liest niemand zu Ende. Der Kopf bleibt dunkel, damit
 * der Übergang von der Startseite nicht bricht.
 *
 * Keine Bewegung außer dem Band: hier wechselt kein Zustand, es wird gelesen.
 * Deshalb auch kein „use client" — die Seiten sind reine Serverkomponenten.
 */

const SHELL = "px-[clamp(1.125rem,4vw,3.5rem)]";

/* -------------------------------------------------------------------------- */
/* Kopfleiste                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Eigene Kopfleiste statt `RailNav`: die Rail ist eine Scroll-Skala über die
 * sechs Abschnitte der Startseite. Auf einer Rechtsseite gibt es diese
 * Abschnitte nicht — die Skala hätte nichts zu messen.
 */
function LegalNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-nightline bg-night">
      <div className="flex items-stretch">
        <Link
          href="/"
          className="grid content-center border-r border-nightline px-[1.125rem] py-3 no-underline"
        >
          <Wordmark sublabel={site.sublabel} accent />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end">
          <Link
            href="/"
            className="grid min-h-[2.75rem] content-center px-s2 font-mono text-[0.625rem] tracking-[0.16em] text-chalk2 uppercase no-underline transition-colors duration-[120ms] ease-linear hover:text-chalk"
          >
            Zurück zur Startseite
          </Link>
        </div>

        <Link
          href="/#buchen"
          className="hidden content-center bg-band px-s3 py-3.5 font-mono text-[0.6563rem] tracking-[0.14em] text-ground uppercase no-underline transition-colors duration-[120ms] ease-linear hover:bg-mark min-[720px]:grid"
        >
          Probetraining
        </Link>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Bausteine                                                                   */
/* -------------------------------------------------------------------------- */

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <p className="m-0 max-w-[68ch] text-[1.0625rem] leading-[1.65]">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="m-0 grid max-w-[68ch] list-none gap-s1 p-0">
          {block.items.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-baseline text-[1.0625rem] leading-[1.6]"
            >
              <span aria-hidden className="font-mono text-[0.75rem] text-mark">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "facts":
      return (
        <dl className="m-0 grid max-w-[68ch]">
          {block.rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-baseline gap-x-s2 gap-y-1 border-t border-hairline py-3"
            >
              <dt className="data text-[0.625rem] tracking-[0.16em] text-concrete">
                {row.label}
              </dt>
              {/* Adressen, Nummern und Paragrafen sind Daten — Monospace. */}
              <dd
                className={`m-0 font-mono text-[0.9375rem] leading-[1.5] ${
                  row.pending
                    ? "justify-self-start border-b border-dashed border-mark text-mark"
                    : ""
                }`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "table":
      return (
        // Vier Spalten passen unter 480 px nicht ohne Kürzung — lieber
        // waagrecht schiebbar als ein umbrechendes Gitter.
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="data border-t border-b border-hairline py-2.5 pr-s2 text-[0.625rem] font-normal tracking-[0.16em] text-concrete"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell) => (
                    <td
                      key={cell}
                      className="border-b border-hairline py-3 pr-s2 align-top font-mono text-[0.8125rem] leading-[1.5]"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "note":
      return (
        <p className="m-0 max-w-[68ch] border border-dashed border-mark bg-ground2 p-s2 font-mono text-[0.8125rem] leading-[1.55] text-mark">
          {block.text}
        </p>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Seite                                                                       */
/* -------------------------------------------------------------------------- */

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = legalDocs.filter((item) => item.slug !== doc.slug);

  return (
    <>
      <LegalNav />

      <main id="inhalt">
        <article>
          <header className={`bg-night text-chalk ${SHELL} py-[clamp(2.5rem,6vw,5rem)]`}>
            <div className="grid gap-s3">
              <span className="data text-[0.625rem] tracking-[0.18em] text-signal">
                Rechtliches
              </span>
              <h1 className="m-0 max-w-[14ch] text-[clamp(2.25rem,7vw,5rem)] leading-[0.95] font-bold tracking-[-0.035em]">
                {doc.title}
              </h1>
              <p className="m-0 max-w-[54ch] text-[1.0625rem] leading-[1.6] text-chalk2">
                {doc.lead}
              </p>
              <p className="m-0 font-mono text-[0.75rem] tracking-[0.12em] text-chalk2">
                Stand: {doc.updated}
              </p>
            </div>
          </header>

          <Band size="md" />

          <div className={`bg-ground text-ink ${SHELL} py-[clamp(2.5rem,6vw,4.5rem)]`}>
            <div className="grid items-start gap-s4 min-[900px]:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] min-[900px]:gap-x-[clamp(2rem,5vw,5rem)]">
              {/* Inhaltsverzeichnis: auf breiten Flächen bleibt es beim Lesen
                  stehen, darunter läuft es als Block über dem Text mit. */}
              <nav
                aria-label="Inhalt dieser Seite"
                className="grid gap-s2 min-[900px]:sticky min-[900px]:top-[5rem]"
              >
                <span className="data text-[0.625rem] tracking-[0.18em] text-concrete">
                  Inhalt
                </span>
                <ol className="m-0 grid list-none p-0">
                  {doc.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline gap-2 border-t border-hairline py-2.5 font-mono text-[0.75rem] leading-[1.4] text-ink no-underline transition-colors duration-[120ms] ease-linear hover:text-mark"
                      >
                        <span className="text-[0.6875rem] text-mark">
                          {section.no}
                        </span>
                        <span>{section.heading}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="grid gap-[clamp(2rem,4vw,3.25rem)]">
                {doc.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-titel`}
                    className="grid gap-s2"
                  >
                    <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-s1 border-t border-ink pt-s2">
                      <span
                        aria-hidden
                        className="font-mono text-[0.6875rem] tracking-[0.1em] text-mark"
                      >
                        {section.no}
                      </span>
                      <h2
                        id={`${section.id}-titel`}
                        className="m-0 max-w-[26ch] text-[clamp(1.25rem,2.6vw,1.875rem)] leading-[1.1] font-bold tracking-[-0.025em]"
                      >
                        {section.heading}
                      </h2>
                    </div>

                    <div className="grid gap-s2 min-[600px]:pl-[2.25rem]">
                      {section.blocks.map((block, index) => (
                        <Block key={index} block={block} />
                      ))}
                    </div>
                  </section>
                ))}

                <nav
                  aria-label="Weitere Rechtstexte"
                  className="grid gap-s2 border-t border-hairline pt-s3"
                >
                  <span className="data text-[0.625rem] tracking-[0.18em] text-concrete">
                    Weiter
                  </span>
                  <ul className="m-0 flex list-none flex-wrap gap-s2 p-0">
                    {others.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/${item.slug}`}
                          className="inline-grid min-h-[2.75rem] content-center border border-ink px-s3 font-mono text-[0.6875rem] tracking-[0.12em] text-ink uppercase no-underline transition-colors duration-[120ms] ease-linear hover:bg-ink hover:text-ground"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
