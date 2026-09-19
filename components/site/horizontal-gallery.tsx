"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { GALLERY_ITEMS } from "./data";
import { useSiteNavigation } from "@/components/site/chrome";

export const HorizontalGallery = () => {
  const targetRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const navigateTo = useSiteNavigation();
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const updateMaxShift = () => {
      const track = trackRef.current;
      if (!track) return;
      const nextShift = Math.max(0, track.scrollWidth - window.innerWidth);
      setMaxShift(nextShift);
    };

    const rafId = window.requestAnimationFrame(updateMaxShift);
    window.addEventListener("resize", updateMaxShift);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateMaxShift);
    };
  }, []);

  const galleryPreviewImages = GALLERY_ITEMS.slice(0, 5).map(item => item.src);

  return (
    <section
      ref={targetRef}
      id="galerie"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[300vh] bg-[#F5F0E8]"
    >
      {/* Custom Follow Cursor */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: "fixed",
              left: mousePosition.x - 45,
              top: mousePosition.y - 45,
              pointerEvents: "none",
              zIndex: 50,
            }}
            className="hidden md:flex w-[90px] h-[90px] bg-[#C9A96E]/90 text-[#F5F0E8] rounded-full items-center justify-center text-[10px] uppercase font-bold tracking-widest backdrop-blur-md shadow-lg border border-[#F5F0E8]/20"
          >
            Scrollen
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-24 md:top-32 left-6 md:left-24 z-10 pointer-events-none">
          <motion.h2 style={{ y: textY }} className="text-6xl md:text-8xl lg:text-[14rem] leading-none font-serif font-semibold text-[#3b2c26] opacity-[0.03] tracking-tighter uppercase whitespace-nowrap">
            Inspiration
          </motion.h2>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-4 md:gap-10 pl-6 md:pl-24 items-center h-full w-max">
          {galleryPreviewImages.map((img, idx) => (
            <div key={idx} className="relative w-[85vw] md:w-[40vw] shrink-0 aspect-[4/5] md:aspect-[3/4] group overflow-hidden bg-white/5 shadow-md rounded-lg">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8 }}
                src={img}
                alt="Styling Inspiration"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div
                onClick={() => navigateTo("galerie")}
                className="absolute inset-0 bg-[#3b2c26]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center cursor-pointer"
              >
                <Sparkles strokeWidth={1} className="w-8 h-8 md:w-12 md:h-12 text-[#F5F0E8]" />
              </div>
            </div>
          ))}

          <div className="w-[85vw] md:w-[35vw] shrink-0 aspect-[4/5] md:aspect-[3/4] flex flex-col items-center justify-center bg-[#3b2c26] text-[#F5F0E8] ml-2 md:ml-10 mr-6 md:mr-24 shadow-xl relative overflow-hidden group rounded-lg">
            {/* Background design accents */}
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
            
            <h3 className="text-2xl md:text-3xl font-serif mb-4 text-center z-10 px-6">Unsere Galerie</h3>
            <p className="text-[#F5F0E8]/60 text-xs md:text-sm font-medium mb-8 text-center max-w-xs z-10 px-6">
              Entdeckt alle Kunden-Stylings unserer talentierten Friseure auf unserer neuen Galerieseite.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo("galerie")}
              className="inline-flex items-center font-bold gap-3 text-xs md:text-sm tracking-widest uppercase text-[#C9A96E] hover:text-[#F5F0E8] transition-colors z-10 cursor-pointer"
            >
              Galerie ansehen <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
