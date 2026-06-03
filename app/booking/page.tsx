import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingPageContent } from "@/components/site/booking-page";

export const metadata: Metadata = {
  title: "Termin online buchen – Friseur Haiyen Hairdesign",
  description: "Buche jetzt deinen Friseurtermin in Dresden Striesen oder Neustadt online.",
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-[#F5F0E8] font-serif uppercase tracking-widest text-xs">Laden...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
