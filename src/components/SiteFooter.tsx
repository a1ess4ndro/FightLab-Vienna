import Link from "next/link";

import { site } from "@/lib/content";
import { ConsentMap } from "@/components/ConsentMap";
import { Wordmark } from "@/components/ui/Wordmark";

const legal = [
  { label: "Impressum", href: "/impressum" },
  { label: "AGB", href: "/agb" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "English", href: "/en" },
];

const contact = [
  { label: "Telefon", value: site.phone },
  { label: "E-Mail", value: site.email },
  { label: "Trainingszeiten", value: site.hours },
];

export function SiteFooter() {
  return (
    <footer className="bg-night text-chalk">
      <div className="grid md:grid-cols-2">
        <div className="grid content-start gap-s3 border-b border-nightline p-[clamp(1.625rem,3.4vw,2.75rem)]">
          <div className="grid gap-s1">
            <span className="data text-[0.625rem] tracking-[0.18em] text-chalk2">
              Adresse
            </span>
            <p className="m-0 text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.15] tracking-[-0.02em]">
              {site.street}
              <br />
              {site.city}, {site.district}
            </p>
            <span className="font-mono text-xs tracking-[0.1em] text-signal">
              {site.transit}
            </span>
          </div>

          <dl className="m-0 grid">
            {contact.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,7.25rem)_minmax(0,1fr)] items-baseline gap-3.5 border-t border-nightline py-3"
              >
                <dt className="data text-[0.625rem] tracking-[0.16em] text-chalk2">
                  {row.label}
                </dt>
                <dd className="m-0 font-mono text-[0.9375rem]">{row.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={site.mapsRoute}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-grid min-h-[2.75rem] content-center justify-self-start border border-chalk2 px-[1.375rem] font-mono text-[0.6875rem] tracking-[0.12em] text-chalk uppercase no-underline transition-colors duration-[120ms] ease-linear hover:bg-chalk hover:text-night"
          >
            Route öffnen
          </a>
        </div>

        <div className="grid border-b border-nightline">
          <ConsentMap />
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-s3 px-[clamp(1.125rem,4vw,3.5rem)] py-[clamp(1.75rem,4vw,2.75rem)]">
        <Wordmark size="lg" sublabel={`${site.sublabel} · 1120 Wien`} />
        <nav aria-label="Rechtliches">
          <ul className="m-0 flex list-none flex-wrap gap-y-s1 gap-x-s3 p-0">
            {legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="data text-[0.6563rem] text-chalk2 no-underline transition-colors duration-[120ms] ease-linear hover:text-chalk"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div aria-hidden className="h-[14px] w-full bg-band" />

      <p className="data m-0 px-[clamp(1.125rem,4vw,3.5rem)] py-s2 text-[0.625rem] text-chalk2">
        {site.draftNote}
      </p>
    </footer>
  );
}
