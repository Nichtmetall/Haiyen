"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck, MapPin, ShieldCheck } from "lucide-react";
import { FadeUp } from "./animations";

export const BookingPageContent = () => {
  const searchParams = useSearchParams();
  const initialLoc = searchParams.get("location") === "neustadt" ? "neustadt" : "striesen";
  const [activeLoc, setActiveLoc] = useState<"striesen" | "neustadt">(initialLoc);

  useEffect(() => {
    const loc = searchParams.get("location");
    if (loc === "striesen" || loc === "neustadt") {
      const frame = window.requestAnimationFrame(() => setActiveLoc(loc));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [searchParams]);

  const locationData = {
    striesen: {
      title: "Salon Dresden Striesen",
      address: "Borsbergstraße 21, 01309 Dresden",
      phone: "0351 323 22 434",
      phoneHref: "+4935132322434",
      hours: "Mo – Fr: 09:00 – 19:00 Uhr | Sa: 09:00 – 16:00 Uhr",
      bookingUrl: "https://www.planity.com/de-DE/haiyen-hairdesign-striesen-01309-dresden",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Borsbergstra%C3%9Fe+21%2C+01309+Dresden",
      rating: "4,9 / 5 bei Planity",
    },
    neustadt: {
      title: "Salon Dresden Neustadt",
      address: "Bautzner Straße 46, 01099 Dresden",
      phone: "0351 792 66 54",
      phoneHref: "+493517926654",
      hours: "Mo: 09:00 – 17:00 Uhr | Di – Fr: 09:00 – 19:00 Uhr | Sa: 09:00 – 14:00 Uhr",
      bookingUrl: "https://www.planity.com/de-DE/haiyen-hairdesign-neustadt-01099-dresden",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Bautzner+Stra%C3%9Fe+46%2C+01099+Dresden",
      rating: "Online-Termine sofort bestätigt",
    }
  };

  const currentLocData = locationData[activeLoc];

  return (
    <div className="pt-32 md:pt-40 pb-16 md:pb-24 min-h-screen bg-[#1a1a1a] text-[#F5F0E8]">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <FadeUp className="text-center mb-10 md:mb-16">
          <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Terminbuchung</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 text-[#C9A96E]">Auszeit buchen</h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-[#F5F0E8]/65 md:text-base">
            Standort wählen, Leistung und Wunschtermin aussuchen – die Buchung wird sicher bei Planity abgeschlossen.
          </p>

          {/* Segmented Location Switcher */}
          <div className="inline-flex bg-white/5 p-1.5 rounded-full border border-white/10 mb-8 select-none">
            <button
              onClick={() => setActiveLoc("striesen")}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeLoc === "striesen"
                ? "bg-[#C9A96E] text-[#1a1a1a] shadow-lg"
                : "text-[#F5F0E8]/60 hover:text-white"
                }`}
            >
              Dresden Striesen
            </button>
            <button
              onClick={() => setActiveLoc("neustadt")}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeLoc === "neustadt"
                ? "bg-[#C9A96E] text-[#1a1a1a] shadow-lg"
                : "text-[#F5F0E8]/60 hover:text-white"
                }`}
            >
              Dresden Neustadt
            </button>
          </div>
          
          {/* Active Location Info Grid */}
          <motion.div
            key={activeLoc}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center border border-white/10 bg-white/[0.02] p-6 md:p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#C9A96E] mb-2">Adresse</span>
              <a className="text-sm font-medium text-[#F5F0E8]/80 hover:text-[#C9A96E]" href={currentLocData.mapUrl} rel="noreferrer" target="_blank">{currentLocData.address}</a>
            </div>
            <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#C9A96E] mb-2">Telefon</span>
              <a href={`tel:${currentLocData.phoneHref}`} className="text-sm font-bold hover:text-[#C9A96E] transition-colors">{currentLocData.phone}</a>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#C9A96E] mb-2">Öffnungszeiten</span>
              <p className="text-sm font-medium text-[#F5F0E8]/80">{currentLocData.hours}</p>
            </div>
          </motion.div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <motion.section
            key={activeLoc}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
          >
            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="p-7 text-left md:p-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Dein nächster Schritt</span>
                <h2 className="mt-4 font-serif text-3xl font-semibold md:text-5xl">{currentLocData.title}</h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#F5F0E8]/65 md:text-base">
                  Auf der Buchungsseite siehst du freie Termine, alle aktuellen Leistungen, Preise und Behandlungsdauern auf einen Blick.
                </p>

                <a
                  className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-sm bg-[#C9A96E] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#111] transition-colors hover:bg-[#F5F0E8] sm:w-auto"
                  href={currentLocData.bookingUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Freie Termine ansehen
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>

                <div className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[#F5F0E8]/45">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A96E]" />
                  Die Terminbuchung öffnet sich bei Planity in einem neuen Tab. Es werden vorher keine Daten an Planity übertragen.
                </div>
              </div>

              <div className="grid border-t border-white/10 bg-white/[0.035] p-7 text-left md:border-l md:border-t-0 md:p-10">
                <div className="space-y-6 self-center">
                  <div className="flex gap-4">
                    <CalendarCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-[#C9A96E]" />
                    <div>
                      <h3 className="text-sm font-bold">24/7 online buchbar</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#F5F0E8]/55">Termin ohne Anruf auswählen und direkt bestätigen.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[#C9A96E]" />
                    <div>
                      <h3 className="text-sm font-bold">{currentLocData.rating}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#F5F0E8]/55">Transparente Preise und verfügbare Zeiten vor der Buchung.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </FadeUp>
      </div>
    </div>
  );
};
export default BookingPageContent;
