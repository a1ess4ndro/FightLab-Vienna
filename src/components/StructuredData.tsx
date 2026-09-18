import { rates, site } from "@/lib/content";

/**
 * Strukturierte Daten für die lokale Sichtbarkeit: SportsActivityLocation mit
 * Adresse, Geokoordinaten und Öffnungszeiten, dazu der Anfängerkurs als Course.
 * Preise stammen aus derselben Quelle wie der Rechner — keine zweite Wahrheit.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsActivityLocation",
        "@id": "https://fightlab.at/#gym",
        name: "FightLab Vienna",
        alternateName: "FightLab — Team Kaplan",
        description:
          "Kampfsportschule in Wien-Meidling für Muay Thai und Kickboxen. Anfängerkurse, Technikeinheiten, Privattraining und Fight Team.",
        url: "https://fightlab.at",
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.street,
          postalCode: "1120",
          addressLocality: "Wien",
          addressRegion: "Wien",
          addressCountry: "AT",
        },
        geo: { "@type": "GeoCoordinates", latitude: 48.1739, longitude: 16.3283 },
        areaServed: "Wien",
        sport: ["Muay Thai", "Kickboxen", "Boxen"],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "17:00",
            closes: "21:30",
          },
        ],
      },
      {
        "@type": "Course",
        name: "Anfängerkurs Muay Thai und Kickboxen",
        description:
          "Acht Wochen, zwei Einheiten pro Woche, feste Gruppe. Stellung, Distanz, Deckung und die ersten Schlagfolgen — gesparrt wird erst, wenn die Technik sitzt.",
        inLanguage: "de-AT",
        provider: { "@id": "https://fightlab.at/#gym" },
        offers: {
          "@type": "Offer",
          price: rates.standard[6],
          priceCurrency: "EUR",
          category: "Monatsbeitrag, 6 Monate Laufzeit",
          availability: "https://schema.org/PreOrder",
          availabilityStarts: "2026-11-01",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "onsite",
          courseWorkload: "PT3H",
          location: { "@id": "https://fightlab.at/#gym" },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
