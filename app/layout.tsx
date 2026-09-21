import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { SITE_URL, SOCIAL_IMAGE } from "@/components/site/seo";
import SiteChrome from "@/components/site/chrome";
import { ConsentProvider } from "@/components/site/consent-manager";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Haiyen Hairdesign – Friseur in Dresden",
    template: "%s | Haiyen Hairdesign",
  },
  description:
    "Meisterliches Friseurhandwerk, Balayage und Extensions in Dresden Striesen und Neustadt. Termin rund um die Uhr online buchen.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    locale: "de_DE",
    siteName: "Haiyen Hairdesign",
    type: "website",
    title: "Haiyen Hairdesign – Friseur in Dresden",
    description:
      "Zwei Salons, ein Gefühl: meisterliches Friseurhandwerk in Dresden Striesen und Neustadt.",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Haiyen Hairdesign – Zwei Salons. Ein Gefühl.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haiyen Hairdesign – Friseur in Dresden",
    description: "Zwei Salons, ein Gefühl: Striesen & Neustadt.",
    images: [SOCIAL_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="de" className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ConsentProvider>
          <SiteChrome>{children}</SiteChrome>
        </ConsentProvider>
      </body>
    </html>
  );
}
