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
          "Kampfsport-Gym in Wien-Meidling für Muay Thai und Kickboxen. Anfängerkurse, Technikeinheiten, Privattraining und Fight Team.",
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
        /* Je Einheit eine Angabe statt einer Spanne über die Woche: Google
           zeigt sonst durchgehend geöffnet von 13:00 bis 19:00, auch an
           Tagen, an denen um 13:00 niemand in der Halle steht. Dienstag und
           Donnerstag fehlen, solange die Zeit des Kindertrainings offen ist —
           lieber keine Angabe als eine geratene. */
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Wednesday"],
            opens: "17:30",
            closes: "19:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Friday",
            opens: "16:45",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "13:00",
            closes: "14:00",
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
