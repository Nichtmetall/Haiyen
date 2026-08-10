"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { FadeUp } from "./animations";
import { ConsentEmbed } from "./consent-manager";

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
      hours: [
        { days: "Mo – Fr", time: "09:00 – 19:00 Uhr" },
        { days: "Sa", time: "09:00 – 16:00 Uhr" },
      ],
      bookingUrl: "https://d2skjte8udjqxw.cloudfront.net/widget/white-label-widget-2.html?apiKey=-N5fShmP4lBI7cXVuw1b&darkTheme=true",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Borsbergstra%C3%9Fe+21%2C+01309+Dresden",
    },
    neustadt: {
      title: "Salon Dresden Neustadt",
      address: "Bautzner Straße 46, 01099 Dresden",
      phone: "0351 792 66 54",
      phoneHref: "+493517926654",
      hours: [
        { days: "Mo", time: "09:00 – 17:00 Uhr" },
        { days: "Di – Fr", time: "09:00 – 19:00 Uhr" },
        { days: "Sa", time: "09:00 – 14:00 Uhr" },
      ],
      bookingUrl: "https://d2skjte8udjqxw.cloudfront.net/widget/white-label-widget-2.html?apiKey=-N5fShmP4lBI7cXVuw1a&darkTheme=true",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Bautzner+Stra%C3%9Fe+46%2C+01099+Dresden",
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
              <dl className="grid w-full max-w-[15rem] gap-1 text-sm font-medium text-[#F5F0E8]/80">
                {currentLocData.hours.map(({ days, time }) => (
                  <div className="grid grid-cols-[4.5rem_1fr] gap-3 text-left" key={days}>
                    <dt className="font-semibold text-[#F5F0E8]">{days}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <motion.section
            key={activeLoc}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="h-[780px] overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.4)] sm:h-[850px] lg:h-[900px]"
          >
            <ConsentEmbed
              actionLabel="Buchungssystem laden"
              allow="payment"
              className="h-full w-full"
              description="Mit dem Laden stimmst du der Übertragung von Daten an Planity zu."
              heading="Online-Terminbuchung anzeigen"
              icon={<CalendarCheck aria-hidden="true" className="h-9 w-9" />}
              id="myIframe"
              src={currentLocData.bookingUrl}
              title={`Online-Terminbuchung – ${currentLocData.title}`}
              tone="dark"
            />
          </motion.section>
        </FadeUp>
      </div>
    </div>
  );
};
export default BookingPageContent;
