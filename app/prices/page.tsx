import type { Metadata } from "next";
import { PricesPageContent } from "@/components/site/content";

export const metadata: Metadata = {
  title: "Preise & Leistungen – Haiyen Hairdesign",
  description: "Transparente Preise für Balayage, Colorationen und Pflege.",
};

export default function PricesPage() {
  return <PricesPageContent />;
}
