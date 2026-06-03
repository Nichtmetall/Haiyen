"use client";

import React, { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type NavigateTo = (page: string, hash?: string, query?: string) => void;

export const HeroParallax = ({ navigateTo }: { navigateTo: NavigateTo }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 50, damping: 25 });
  const springY = useSpring(y, { stiffness: 50, damping: 25 });

  const bgTranslateX = useTransform(springX, [-1, 1], [-12, 12]);
  const bgTranslateY = useTransform(springY, [-1, 1], [-12, 12]);

  const leftCardX = useTransform(springX, [-1, 1], [-30, 30]);
  const leftCardY = useTransform(springY, [-1, 1], [-30, 30]);

  const rightCardX = useTransform(springX, [-1, 1], [35, -35]);
  const rightCardY = useTransform(springY, [-1, 1], [35, -35]);

  const goldAccentX = useTransform(springX, [-1, 1], [45, -45]);
  const goldAccentY = useTransform(springY, [-1, 1], [45, -45]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      x.set(normX);
      y.set(normY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#2D4A3E] w-full">
      {/* Background Parallax Layer */}
      <motion.div
        style={{ x: bgTranslateX, y: bgTranslateY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Soft Golden/Cream Glow Blobs */}
        <div className="absolute left-[15%] top-[20%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-[#C9A96E]/8 rounded-full blur-[100px]" />
        <div className="absolute right-[10%] bottom-[15%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#C9A96E]/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Floating Left Image Card (Desktop only) */}
      <motion.div
        style={{ x: leftCardX, y: leftCardY }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="hidden lg:block absolute left-[8%] top-[22%] w-[17vw] aspect-[2/3] z-10 pointer-events-none rounded-lg overflow-hidden border border-[#C9A96E]/20 shadow-[0_30px_60px_rgba(0,0,0,0.3)] bg-[#2D4A3E]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/galerie/Josi/IMG_8571.jpg"
          alt="Premium Hair Styling"
          className="w-full h-full object-cover filter saturate-75 contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-[#2D4A3E]/10" />
      </motion.div>

      {/* Floating Right Image Card (Desktop only) */}
      <motion.div
        style={{ x: rightCardX, y: rightCardY }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.85, x: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="hidden lg:block absolute right-[8%] bottom-[18%] w-[16vw] aspect-[3/4] z-10 pointer-events-none rounded-lg overflow-hidden border border-[#C9A96E]/20 shadow-[0_30px_60px_rgba(0,0,0,0.3)] bg-[#2D4A3E]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/galerie/Anika/4972abd3-b425-4c73-a79c-528c21571338.jpg"
          alt="Balayage Hair Detail"
          className="w-full h-full object-cover filter saturate-75 contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-[#2D4A3E]/10" />
      </motion.div>

      {/* Floating Abstract Gold Accents (Desktop only) */}
      <motion.div
        style={{ x: goldAccentX, y: goldAccentY }}
        className="hidden lg:block absolute left-[30%] bottom-[20%] w-24 h-24 border border-[#C9A96E]/15 rounded-full pointer-events-none z-10"
      />
      <motion.div
        style={{ x: goldAccentX, y: goldAccentY }}
        className="hidden lg:block absolute right-[32%] top-[15%] w-16 h-16 border border-[#C9A96E]/15 pointer-events-none z-10 rotate-45"
      />

      <div className="relative z-20 text-center max-w-7xl px-6 mx-auto mt-16 w-full flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#C9A96E] uppercase text-[10px] md:text-xs font-bold mb-6 md:mb-8 block"
        >
          Euer Friseur in Dresden
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="text-huge font-serif text-[#F5F0E8] font-bold mb-4 md:mb-6 uppercase tracking-tighter"
        >
          <span className="block overflow-hidden py-1">
            <motion.span
              variants={{
                hidden: { y: "110%" },
                visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="inline-block"
            >
              Zwei Salons.
            </motion.span>
          </span>
          <span className="block overflow-hidden py-1">
            <motion.span
              variants={{
                hidden: { y: "110%" },
                visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-[#C9A96E] font-medium italic pr-2 md:pr-4 inline-block"
            >
              Ein Gefühl.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-[#F5F0E8]/90 text-sm md:text-xl leading-relaxed mb-10 md:mb-12 max-w-xl mx-auto font-medium mt-4"
        >
          Willkommen bei Haiyen Hairdesign – einem Ort der Ruhe und des puren Wohlbefindens in Dresden Striesen & Neustadt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateTo("booking")}
            className="w-full sm:w-auto bg-[#C9A96E] text-[#F5F0E8] px-10 md:px-12 py-4 md:py-5 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#F5F0E8] hover:text-[#2D4A3E] transition-all duration-500 cursor-pointer shadow-lg"
          >
            Termin buchen
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateTo("home", "leistungen")}
            className="w-full sm:w-auto border border-[#F5F0E8]/40 text-[#F5F0E8] px-10 md:px-12 py-4 md:py-5 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#F5F0E8] hover:text-[#2D4A3E] transition-all duration-500 cursor-pointer"
          >
            Entdecken
          </motion.button>
        </motion.div>
      </div>

      {/* Premium Scroll-down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
        onClick={() => {
          const el = document.getElementById("leistungen");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#F5F0E8]/50">Scrollen</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#F5F0E8]/40 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-3 bg-[#C9A96E]"
          />
        </div>
      </motion.div>
    </section>
  );
};
