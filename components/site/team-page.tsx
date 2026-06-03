"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TEAM } from "./data";
import { FadeUp } from "./animations";
import { useSiteNavigation } from "@/components/site/chrome";

export const TeamPageContent = () => {
  const [filter, setFilter] = useState<"all" | "master" | "top">("all");
  const navigateTo = useSiteNavigation();

  const filteredTeam = TEAM.filter(member => filter === "all" || member.category === filter);

  return (
    <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 max-w-7xl mx-auto min-h-screen">
      <FadeUp className="text-center mb-12 md:mb-20">
        <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Handwerk & Leidenschaft</span>
        <h1 className="text-5xl md:text-8xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase text-[#2D4A3E]">Das Team</h1>
        <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6" />
      </FadeUp>

      {/* Panoramic Group Picture - Shifted upwards using object-[center_15%] */}
      <FadeUp delay={0.1} className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-20 shadow-xl relative border border-[#2D4A3E]/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/galerie/Gruppenbild.JPG"
          alt="Haiyen Hairdesign Team"
          className="w-full h-full object-cover object-[center_25%] grayscale hover:grayscale-0 transition-all duration-[1200ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A3E]/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12 text-left">
          <span className="text-[#C9A96E] uppercase tracking-widest text-xs font-bold mb-2">Unser Salon</span>
          <h2 className="text-2xl md:text-4xl text-[#F5F0E8] font-serif font-bold uppercase">Gemeinsam für Ihre Schönheit</h2>
        </div>
      </FadeUp>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16 md:mb-24">
        {[
          { id: "all", label: "Alle" },
          { id: "master", label: "Masterstylisten" },
          { id: "top", label: "Topstylisten" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as "all" | "master" | "top")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${filter === item.id
              ? "bg-[#2D4A3E] border-[#2D4A3E] text-[#F5F0E8] shadow-md"
              : "border-[#2D4A3E]/10 text-[#2D4A3E] hover:border-[#2D4A3E]"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start"
      >
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              key={member.name}
              className="flex flex-col group cursor-pointer"
            >
              <div
                onClick={() => navigateTo("galerie", "", `stylist=${member.slug}`)}
                className="aspect-[3/4] overflow-hidden mb-6 md:mb-8 relative bg-white/5 shadow-md rounded-lg"
              >
                <motion.img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Custom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A3E]/95 via-[#2D4A3E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 text-left">
                  <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-bold">Fokus</span>
                  <p className="text-[#F5F0E8] text-sm font-medium mt-1">{member.specialty}</p>
                </div>
              </div>
              <h3
                onClick={() => navigateTo("galerie", "", `stylist=${member.slug}`)}
                className="text-2xl md:text-3xl font-serif font-bold mb-1.5 text-[#2D4A3E] group-hover:text-[#C9A96E] transition-colors text-left"
              >
                {member.name}
              </h3>
              <p className="text-[#2D4A3E]/60 text-xs font-semibold uppercase tracking-widest text-left">{member.role}</p>

              <button
                onClick={() => navigateTo("galerie", "", `stylist=${member.slug}`)}
                className="text-left text-[10px] uppercase font-bold tracking-widest text-[#C9A96E] hover:text-[#2D4A3E] transition-colors flex items-center gap-1.5 cursor-pointer mt-4 group"
              >
                Galerie ansehen
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
export default TeamPageContent;
