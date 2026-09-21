import { SITE_URL, pageMetadata } from "@/components/site/seo";
import { LOCATIONS } from "@/components/site/locations";
import { SALON_IMAGES, TEAM_IMAGE } from "@/components/site/salon-images";
import HomePage from "@/components/site/home-page";

export const metadata = pageMetadata(
  "Friseur Dresden – Striesen & Neustadt",
  "Ihr Friseur in Dresden: Haarschnitte, Balayage, Coloration und Extensions bei Haiyen Hairdesign in Striesen & Neustadt. Jetzt Termin online buchen.",
  "/"
);

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Haiyen Hairdesign",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/logos/haiyen_logo_hell.png`,
        image: Object.values(SALON_IMAGES).map(photo => `${SITE_URL}${photo.src}`),
        email: "info@haiyen-hairdesign.de",
        department: Object.keys(LOCATIONS).map(key => ({ "@id": `${SITE_URL}/#${key}` })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Haiyen Hairdesign",
        url: `${SITE_URL}/`,
        inLanguage: "de-DE",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      ...Object.entries(LOCATIONS).map(([key, location]) => ({
        "@type": "HairSalon",
        "@id": `${SITE_URL}/#${key}`,
        name: `Haiyen Hairdesign Dresden ${location.name}`,
        url: `${SITE_URL}/#${key}`,
        mainEntityOfPage: `${SITE_URL}/`,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        image: `${SITE_URL}${TEAM_IMAGE.src}`,
        telephone: location.phoneHref,
        email: "info@haiyen-hairdesign.de",
        hasMap: location.mapUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: location.street,
          postalCode: location.postalCode,
          addressLocality: "Dresden",
          addressRegion: "Sachsen",
          addressCountry: "DE",
        },
        areaServed: { "@type": "City", name: "Dresden", containedInPlace: { "@type": "State", name: "Sachsen" } },
        openingHoursSpecification: location.hours.map(hours => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: hours.weekdays,
          opens: hours.opens,
          closes: hours.closes,
        })),
      })),
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
