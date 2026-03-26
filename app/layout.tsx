import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import SiteChrome from "@/components/site/chrome";
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
  title: "Friseur Dresden – Haiyen Hairdesign",
  description: "Euer Friseur in Dresden. Haarschnitte, Balayage und Online Terminbuchung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="de" className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
