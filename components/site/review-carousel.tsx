"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { REVIEWS } from "./data";
export const ReviewCarousel = () => {
  const [index, setIndex] = useState(2);
  const paginate = (direction: number) => setIndex(i => (i + direction + REVIEWS.length) % REVIEWS.length);
  const review = REVIEWS[index];
  return <div className="review-carousel" aria-roledescription="Karussell" aria-label="Kundenstimmen"><div className="review-stars" aria-label="5 Sterne">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" aria-hidden="true" />)}</div><div className="review-text" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12} onDragEnd={(_, info) => { if (info.offset.x < -40) paginate(1); else if (info.offset.x > 40) paginate(-1); }}><blockquote>„{review.text}“</blockquote><p>{review.author}<span>{review.loc}</span></p></motion.div></AnimatePresence></div><div className="review-controls"><button className="circle-icon" aria-label="Vorherige Bewertung" onClick={() => paginate(-1)}><ChevronLeft size={19} /></button><div>{REVIEWS.map((_, i) => <button key={i} className={`review-dot ${index === i ? "active" : ""}`} aria-label={`Bewertung ${i + 1} anzeigen`} aria-current={index === i ? "true" : undefined} onClick={() => setIndex(i)} />)}</div><button className="circle-icon" aria-label="Nächste Bewertung" onClick={() => paginate(1)}><ChevronRight size={19} /></button></div></div>;
};
