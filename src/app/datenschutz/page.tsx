import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { datenschutz } from "@/lib/legal";

export const metadata: Metadata = {
  title: datenschutz.metaTitle,
  description: datenschutz.metaDescription,
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return <LegalPage doc={datenschutz} />;
}
