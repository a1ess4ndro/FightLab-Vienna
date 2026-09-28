import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";
import { cookies } from "@/lib/legal";

export const metadata: Metadata = {
  title: cookies.metaTitle,
  description: cookies.metaDescription,
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return <LegalPage doc={cookies} />;
}
