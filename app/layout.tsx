import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
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
  metadataBase: new URL("https://haiyen-hairdesign.de"),
  title: {
    default: "Haiyen Hairdesign – Friseur in Dresden",
    template: "%s | Haiyen Hairdesign",
  },
  description:
    "Meisterliches Friseurhandwerk, Balayage und Extensions in Dresden Striesen und Neustadt. Termin rund um die Uhr online buchen.",
  openGraph: {
    locale: "de_DE",
    siteName: "Haiyen Hairdesign",
    type: "website",
    title: "Haiyen Hairdesign – Friseur in Dresden",
    description:
      "Zwei Salons, ein Gefühl: meisterliches Friseurhandwerk in Dresden Striesen und Neustadt.",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
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
