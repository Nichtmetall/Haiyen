"use client";

import React from "react";
import { motion } from "framer-motion";
import { LOGOS } from "./data";

export const Marquee = () => {
  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <section className="py-8 md:py-12 border-y border-[#2D4A3E]/10 bg-[#F5F0E8] overflow-hidden flex items-center whitespace-nowrap mask-marquee relative z-20">
      <motion.div
        animate={{ x: ["0%", "-25%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        className="flex w-max"
      >
        <div className="flex gap-16 md:gap-24 px-8 items-center">
          {duplicatedLogos.map((logo, idx) => (
            <div key={idx} className="h-10 md:h-14 w-28 md:w-36 relative shrink-0 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
export default Marquee;
