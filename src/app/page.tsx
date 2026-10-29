import { Suspense } from "react";

import { Booking } from "@/components/Booking";
import { Coach } from "@/components/Coach";
import { DistanceHero } from "@/components/DistanceHero";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Objections } from "@/components/Objections";
import { PriceCalculator } from "@/components/PriceCalculator";
import { Proof } from "@/components/Proof";
import { RailNav } from "@/components/RailNav";
import { SignupBanner } from "@/components/SignupBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { StructuredData } from "@/components/StructuredData";
import { WeekTimeline } from "@/components/WeekTimeline";
import { Divider } from "@/components/ui/Divider";

export default function Home() {
  return (
    <>
      <StructuredData />
      <RailNav />
      <main id="inhalt">
        {/* Rückmeldung nach Stripe. Liest die Adresse und braucht deshalb eine
            Suspense-Grenze, damit die Startseite statisch vorgerendert bleibt. */}
        <Suspense fallback={null}>
          <SignupBanner />
        </Suspense>
        <DistanceHero />
        <Proof />
        <WeekTimeline />
        <Objections />
        <Divider />
        <PriceCalculator />
        <Coach />
        <Booking />
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </>
  );
}
