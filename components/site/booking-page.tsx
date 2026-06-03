"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FadeUp } from "./animations";

export const BookingPageContent = () => {
  const searchParams = useSearchParams();
  const initialLoc = searchParams.get("location") === "neustadt" ? "neustadt" : "striesen";
  const [activeLoc, setActiveLoc] = useState<"striesen" | "neustadt">(initialLoc);

  useEffect(() => {
    const loc = searchParams.get("location");
    if (loc === "striesen" || loc === "neustadt") {
      setActiveLoc(loc);
    }
  }, [searchParams]);

  const locationData = {
    striesen: {
      title: "Salon Dresden Striesen",
      address: "Borsbergstraße XX, 01309 Dresden",
      phone: "+49 351 1234567",
      hours: "Di - Fr: 09:00 - 19:00 Uhr | Sa: 08:00 - 14:00 Uhr",
      iframeUrl: "https://d2skjte8udjqxw.cloudfront.net/widget/white-label-widget-2.html?apiKey=-N5fShmP4lBI7cXVuw1a&darkTheme=true"
    },
    neustadt: {
      title: "Salon Dresden Neustadt",
      address: "Alaunstraße XX, 01099 Dresden",
      phone: "+49 351 7654321",
      hours: "Di - Fr: 10:00 - 20:00 Uhr | Sa: 09:00 - 15:00 Uhr",
      iframeUrl: "https://d2skjte8udjqxw.cloudfront.net/widget/white-label-widget-2.html?apiKey=-N5fShmP4lBI7cXVuw1a&darkTheme=true"
    }
  };

  const currentLocData = locationData[activeLoc];

  return (
    <div className="pt-32 md:pt-40 pb-16 md:pb-24 min-h-screen bg-[#1a1a1a] text-[#F5F0E8]">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <FadeUp className="text-center mb-10 md:mb-16">
          <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Terminbuchung</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 text-[#C9A96E]">Auszeit buchen</h1>
          
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
              <p className="text-sm font-medium text-[#F5F0E8]/80">{currentLocData.address}</p>
            </div>
            <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#C9A96E] mb-2">Telefon</span>
              <a href={`tel:${currentLocData.phone.replace(/\s+/g, "")}`} className="text-sm font-bold hover:text-[#C9A96E] transition-colors">{currentLocData.phone}</a>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#C9A96E] mb-2">Öffnungszeiten</span>
              <p className="text-sm font-medium text-[#F5F0E8]/80">{currentLocData.hours}</p>
            </div>
          </motion.div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="w-full bg-[#111] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 h-[600px] md:h-[800px] relative">
            <motion.iframe
              key={activeLoc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={currentLocData.iframeUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Online Terminbuchung"
            />
          </div>
        </FadeUp>
      </div>
    </div>
  );
};
export default BookingPageContent;
