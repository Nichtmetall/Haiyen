"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "./data";
import { FadeUp } from "./animations";

type NavigateTo = (page: string, hash?: string, query?: string) => void;

export const ServicesSection = ({ navigateTo }: { navigateTo: NavigateTo }) => {
  const [activeHoveredImage, setActiveHoveredImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="leistungen"
      onMouseMove={handleMouseMove}
      className="py-24 md:py-40 px-6 w-full overflow-hidden relative bg-[#F5F0E8]"
    >
      {/* Background Floating Text */}
      <div className="absolute z-0 top-1/4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
        <h2 className="text-[5rem] md:text-[12rem] lg:text-[18rem] font-serif font-bold text-[#2D4A3E]/[0.02] leading-none whitespace-nowrap uppercase tracking-tighter">
          Care & Style
        </h2>
      </div>

      {/* Floating Image Preview */}
      <AnimatePresence>
        {activeHoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              position: "fixed",
              left: mousePosition.x + 25,
              top: mousePosition.y + 25,
              pointerEvents: "none",
              zIndex: 50,
            }}
            className="hidden md:block w-56 h-72 overflow-hidden rounded-lg shadow-[0_20px_50px_rgba(45,74,62,0.25)] border border-[#C9A96E]/20 bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeHoveredImage}
              alt="Vorschau"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#2D4A3E]/10" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10">
        <FadeUp className="text-center mb-16 md:mb-28">
          <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Exklusive Behandlungen</span>
          <h2 className="text-4xl md:text-7xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase text-[#2D4A3E]">Services</h2>
          <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6 md:mt-8" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16">
          {SERVICES.map((s, idx) => (
            <FadeUp key={idx} delay={idx * 0.08}>
              <button
                type="button"
                onMouseEnter={() => setActiveHoveredImage(s.image)}
                onMouseLeave={() => setActiveHoveredImage(null)}
                onClick={() => navigateTo("booking")}
                className="w-full border-b border-[#2D4A3E]/15 pb-8 group cursor-pointer relative overflow-hidden text-left"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold group-hover:text-[#C9A96E] transition-colors duration-300 flex items-center gap-3">
                    <span className="text-[#C9A96E] opacity-70 group-hover:opacity-100 transition-opacity duration-300">{s.icon}</span>
                    {s.title}
                  </h3>
                </div>
                <p className="text-[#2D4A3E]/70 font-medium mb-5 leading-relaxed pr-6 text-sm md:text-base">{s.desc}</p>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="block font-serif text-lg font-semibold text-[#2D4A3E]">{s.price}</span>
                    {s.duration && <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-[#2D4A3E]/50">{s.duration}</span>}
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 text-[#2D4A3E] group-hover:text-[#C9A96E] transition-colors">
                    Termin wählen
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                    </motion.span>
                  </span>
                </div>
              </button>
            </FadeUp>
          ))}
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-[#2D4A3E]/55">
          Preise sind Richtwerte und können je nach Haarlänge, Materialeinsatz und Aufwand variieren.
          Den verbindlichen Preis stimmen wir vor der Behandlung mit dir ab.
        </p>

        <FadeUp delay={0.2} className="text-center mt-20 md:mt-28">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateTo("booking")}
            className="border border-[#2D4A3E] text-[#2D4A3E] px-10 md:px-12 py-4 md:py-5 rounded-sm text-xs uppercase font-bold tracking-widest hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-all duration-500 cursor-pointer"
          >
            Jetzt Termin buchen
          </motion.button>
        </FadeUp>
      </div>
    </section>
  );
};
