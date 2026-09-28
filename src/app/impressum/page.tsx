import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { impressum } from "@/lib/legal";

export const metadata: Metadata = {
  title: impressum.metaTitle,
  description: impressum.metaDescription,
  alternates: { canonical: "/impressum" },
  // Das Impressum muss auffindbar sein — es wird bewusst indexiert.
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return <LegalPage doc={impressum} />;
}
