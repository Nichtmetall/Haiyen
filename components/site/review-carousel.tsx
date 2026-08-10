"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { REVIEWS } from "./data";

export const ReviewCarousel = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const imageIndex = Math.abs(page % REVIEWS.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 500 : -500, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 500 : -500, opacity: 0 }),
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 md:px-12 h-[380px] md:h-[400px] flex items-center justify-center overflow-hidden bg-white/30 backdrop-blur-sm rounded-2xl border border-[#2D4A3E]/5 shadow-xl">
      <button aria-label="Vorherige Bewertung" onClick={() => paginate(-1)} className="absolute left-2 md:left-4 z-20 p-2 text-[#C9A96E] hover:text-[#2D4A3E] transition-colors cursor-pointer">
        <ChevronLeft aria-hidden="true" className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      <div className="w-full h-full relative flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_: unknown, { offset, velocity }: PanInfo) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -1000) paginate(1);
              else if (swipe > 1000) paginate(-1);
            }}
            className="absolute w-full px-8 md:px-16 text-center flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Stars */}
            <div className="flex gap-1.5 mb-6 md:mb-8 text-[#C9A96E]">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
                >
                  <Star className="w-4 h-4 md:w-5 h-5 fill-current" />
                </motion.div>
              ))}
            </div>

            <p className="text-lg md:text-3xl font-serif font-medium italic mb-6 md:mb-8 leading-relaxed text-[#2D4A3E] max-w-3xl">
              „{REVIEWS[imageIndex].text}“
            </p>
            <div className="w-8 h-[1px] bg-[#C9A96E] mx-auto mb-4" />
            <p className="uppercase tracking-widest text-xs font-bold text-[#2D4A3E]">{REVIEWS[imageIndex].author}</p>
            <p className="text-[#2D4A3E]/50 text-[10px] mt-1">{REVIEWS[imageIndex].loc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button aria-label="Nächste Bewertung" onClick={() => paginate(1)} className="absolute right-2 md:right-4 z-20 p-2 text-[#C9A96E] hover:text-[#2D4A3E] transition-colors cursor-pointer">
        <ChevronRight aria-hidden="true" className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      {/* Pagination indicators */}
      <div className="absolute bottom-6 flex justify-center gap-2.5 w-full">
        {REVIEWS.map((_, i) => (
          <button
            aria-label={`Bewertung ${i + 1} anzeigen`}
            aria-current={i === imageIndex ? "true" : undefined}
            key={i}
            onClick={() => {
              setPage([i, i > imageIndex ? 1 : -1]);
            }}
            className={`transition-all duration-300 rounded-full h-1.5 focus:outline-none cursor-pointer ${i === imageIndex ? "w-6 bg-[#C9A96E]" : "w-1.5 bg-[#2D4A3E]/20"
              }`}
          />
        ))}
      </div>
    </div>
  );
};
