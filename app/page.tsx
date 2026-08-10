import type { Metadata } from "next";
import HomePage from "@/components/site/home-page";

export const metadata: Metadata = {
  title: "Friseur Dresden – Striesen & Neustadt",
  description: "Meisterliches Friseurhandwerk, Balayage, Coloration und Extensions in Dresden Striesen und Neustadt. Termin 24/7 online buchen.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HairSalon",
        "@id": "https://haiyen-hairdesign.de/#striesen",
        name: "Haiyen Hairdesign Striesen",
        url: "https://haiyen-hairdesign.de/",
        telephone: "+49 351 32322434",
        email: "info@haiyen-hairdesign.de",
        priceRange: "€€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Borsbergstraße 21",
          postalCode: "01309",
          addressLocality: "Dresden",
          addressCountry: "DE",
        },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "16:00" },
        ],
      },
      {
        "@type": "HairSalon",
        "@id": "https://haiyen-hairdesign.de/#neustadt",
        name: "Haiyen Hairdesign Neustadt",
        url: "https://haiyen-hairdesign.de/",
        telephone: "+49 351 7926654",
        email: "info@haiyen-hairdesign.de",
        priceRange: "€€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Bautzner Straße 46",
          postalCode: "01099",
          addressLocality: "Dresden",
          addressCountry: "DE",
        },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "17:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HomePage />
    </>
  );
}
