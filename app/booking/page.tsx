import type { Metadata } from "next";
import { BookingPageContent } from "@/components/site/content";

export const metadata: Metadata = {
  title: "Termin online buchen – Friseur Haiyen Hairdesign",
  description: "Buche jetzt deinen Friseurtermin in Dresden Striesen oder Neustadt online.",
};

export default function BookingPage() {
  return <BookingPageContent />;
}
