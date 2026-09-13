import { pageMetadata } from "@/components/site/seo";
import { Suspense } from "react";
import { BookingPageContent } from "@/components/site/booking-page";

export const metadata = pageMetadata(
  "Friseurtermin in Dresden online buchen",
  "Buche deinen Friseurtermin bei Haiyen Hairdesign in Dresden-Striesen oder Dresden-Neustadt. Wähle deinen Salon und finde online deinen Wunschtermin.",
  "/booking"
);

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-[#F5F0E8] font-serif uppercase tracking-widest text-xs">Laden...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
