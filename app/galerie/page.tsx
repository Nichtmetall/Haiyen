import type { Metadata } from "next";
import { GaleriePageContent } from "@/components/site/galerie-page";

export const metadata: Metadata = {
  title: "Galerie & Inspirationen – Haiyen Hairdesign",
  description: "Entdeckt die Arbeiten unserer Stylisten. Haarschnitte, Balayage und Stylings von echten Kunden.",
};

export default function GaleriePage() {
  return <GaleriePageContent />;
}
