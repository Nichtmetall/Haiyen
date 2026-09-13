import type { Metadata } from "next";

export const SITE_URL = "https://haiyen-hairdesign.de";
export const SOCIAL_IMAGE = "/images/salon/haiyen-dresden-social.jpg";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Haiyen Hairdesign`,
      description,
      url: path,
      siteName: "Haiyen Hairdesign",
      locale: "de_DE",
      type: "website",
      images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Haiyen Hairdesign – Friseursalon in Dresden" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Haiyen Hairdesign`,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
