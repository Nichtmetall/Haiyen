"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY_ITEMS } from "./data";
import { FadeUp } from "./animations";

export const GaleriePageContent = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center text-[#2D4A3E]">Laden...</div>}>
      <GaleriePageContentWithParams />
    </Suspense>
  );
};

const GaleriePageContentWithParams = () => {
  const searchParams = useSearchParams();
  const initialStylist = searchParams.get("stylist") || "all";
  const [activeTab, setActiveTab] = useState<string>(initialStylist);
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);

  useEffect(() => {
    const stylist = searchParams.get("stylist");
    if (stylist) {
      setActiveTab(stylist);
    }
  }, [searchParams]);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeTab === "all" || item.stylist === activeTab
  );

  const tabs = [
    { id: "all", label: "Alle" },
    { id: "haiyen", label: "Hai Yen" },
    { id: "lisa", label: "Lisa" },
    { id: "anika", label: "Anika" },
    { id: "josi", label: "Josi" },
  ];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImgIdx !== null) {
      setSelectedImgIdx((selectedImgIdx + 1) % filteredItems.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImgIdx !== null) {
      setSelectedImgIdx(
        (selectedImgIdx - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 max-w-7xl mx-auto min-h-screen">
      <FadeUp className="text-center mb-12 md:mb-20">
        <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Inspiration & Kunden-Stylings</span>
        <h1 className="text-5xl md:text-8xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase text-[#2D4A3E]">Galerie</h1>
        <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6" />
      </FadeUp>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center border-b border-[#2D4A3E]/10 pb-4 mb-16 gap-4 md:gap-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedImgIdx(null);
            }}
            className="relative pb-3 text-xs md:text-sm uppercase tracking-wider font-bold cursor-pointer transition-colors"
          >
            <span className={activeTab === tab.id ? "text-[#C9A96E]" : "text-[#2D4A3E]/50 hover:text-[#2D4A3E]"}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeGalerieTab"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#C9A96E]"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filteredItems.length > 0 ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.src}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedImgIdx(idx)}
                className="flex flex-col group cursor-pointer bg-white/40 p-4 rounded-xl border border-[#2D4A3E]/5 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden mb-4 relative bg-gray-100 rounded-lg shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A3E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-left px-1">
                  <h4 className="font-serif font-bold text-lg text-[#2D4A3E]">{item.caption}</h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#C9A96E] mt-1">by {item.stylistName}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto"
          >
            <div className="p-4 bg-[#2D4A3E]/5 rounded-full border border-[#2D4A3E]/10 mb-6">
              <Sparkles strokeWidth={1} className="w-8 h-8 text-[#C9A96E]" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#2D4A3E] mb-3">Weitere Looks folgen</h3>
            <p className="text-sm font-medium text-[#2D4A3E]/60 leading-relaxed mb-8">
              Aktuell sind noch keine Kundenbilder für diesen Friseur online. Besuche bald wieder unsere Seite oder lass dich in einem unserer Salons persönlich beraten.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImgIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImgIdx(null)}
            className="fixed inset-0 bg-[#1a1a1a]/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImgIdx(null)}
              className="absolute top-6 right-6 text-white hover:text-[#C9A96E] transition-colors p-2 cursor-pointer z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 p-3 rounded-full text-white bg-white/5 hover:bg-white/10 hover:text-[#C9A96E] transition-colors cursor-pointer focus:outline-none z-40"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 p-3 rounded-full text-white bg-white/5 hover:bg-white/10 hover:text-[#C9A96E] transition-colors cursor-pointer focus:outline-none z-40"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center select-none" onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={selectedImgIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-xl border border-white/10 shadow-2xl relative bg-[#111]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filteredItems[selectedImgIdx].src}
                  alt={filteredItems[selectedImgIdx].caption}
                  className="max-h-[70vh] w-auto object-contain block"
                />
              </motion.div>

              <div className="text-center mt-6 text-[#F5F0E8]">
                <h3 className="font-serif font-bold text-xl md:text-2xl">{filteredItems[selectedImgIdx].caption}</h3>
                <p className="text-xs md:text-sm uppercase font-bold tracking-widest text-[#C9A96E] mt-2">
                  by {filteredItems[selectedImgIdx].stylistName}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default GaleriePageContent;
