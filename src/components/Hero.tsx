import Image from "next/image";

import { site } from "@/lib/content";
import { Cta } from "@/components/ui/Cta";

/**
 * Einstieg der Startseite.
 *
 * Beantwortet zuerst, was FightLab ist, wer unterrichtet, für wen es ist und
 * wie man mitmacht. Der Distanz-Regler war als Einstieg zu rätselhaft,
 * besonders am Handy; er steht jetzt am Ende der Seite.
 */
export function Hero() {
  return (
    <section
      id="start"
      aria-labelledby="start-titel"
      className="relative isolate grid min-h-[78vh] content-end bg-night text-chalk"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/hero/mid.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_38%] [filter:grayscale(1)_contrast(1.05)_brightness(0.42)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/55" />
      </div>

      <div className="grid gap-s3 px-[clamp(1.125rem,4vw,3.5rem)] pt-s5 pb-[clamp(2.5rem,6vw,5rem)]">
        <p className="data m-0 flex flex-wrap gap-y-s1 gap-x-s3 text-[0.6563rem] tracking-[0.2em] text-chalk2">
          <span>FightLab Wien</span>
          <span>{site.city}</span>
          <span className="text-signal">{site.opening}</span>
        </p>
        <h1
          id="start-titel"
          className="m-0 max-w-[16ch] text-[clamp(2.25rem,6.4vw,6rem)] leading-[0.95] font-bold tracking-[-0.04em]"
        >
          {site.heroTitle}
        </h1>
        <p className="m-0 max-w-[50ch] text-[clamp(1.0625rem,1.6vw,1.3125rem)] leading-[1.5] text-chalk2">
          {site.heroLead}
        </p>
        <div className="flex flex-wrap items-center gap-s2 pt-s1">
          <Cta
            href="/probetraining"
            className="px-[1.625rem] py-[1.0625rem] text-[0.75rem]"
          >
            Probetraining buchen
          </Cta>
          <Cta href="#woche" variant="outlineDark">
            Trainingsplan ansehen
          </Cta>
        </div>
        <p className="data m-0 text-[0.625rem] tracking-[0.16em] text-chalk2">
          {site.heroSteps}
        </p>
      </div>
    </section>
  );
}
