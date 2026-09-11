"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SALON_IMAGES } from "./salon-images";

export const HeroParallax = () => {
  const reduced = useReducedMotion();
  const photo = SALON_IMAGES.hero;
  return (
    <section className="salon-hero" aria-label="Willkommen bei Haiyen Hairdesign">
      <div className="salon-hero-background">
        <Image src={photo.src} alt={photo.alt} fill preload sizes="100vw" style={{ objectPosition: photo.position }} />
      </div>
      <div className="salon-hero-shade" />
      <div className="salon-hero-content section-shell">
        <p className="eyebrow light">Haiyen Hairdesign · Dresden</p>
        <motion.h1 initial={reduced ? false : { opacity: 0.7, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          Dein Haar.<br /><em>Dein Moment.</em>
        </motion.h1>
        <p className="salon-hero-intro">Ankommen. Wohlfühlen. Ganz du sein.</p>
        <Link className="button button-gold" href="/booking">Deinen Termin buchen <ArrowUpRight size={18} /></Link>
      </div>
      <div className="salon-hero-bottom section-shell">
        <a href="#standorte" className="salon-hero-locations">Striesen & Neustadt <ArrowUpRight size={15} /></a>
        {photo.isStock && <a className="salon-hero-credit" href={photo.source} target="_blank" rel="noreferrer">Salon-Inspiration · {photo.provider}</a>}
      </div>
    </section>
  );
};
