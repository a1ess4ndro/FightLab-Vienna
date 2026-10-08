import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { agb } from "@/lib/legal";

export const metadata: Metadata = {
  title: agb.metaTitle,
  description: agb.metaDescription,
  alternates: { canonical: "/agb" },
  robots: { index: true, follow: true },
};

export default function AgbPage() {
  return <LegalPage doc={agb} />;
}
