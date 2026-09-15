"use client";

import { ParallaxFigure, ScrollImage } from "./animations";
import { FadeImage } from "./fade-image";
import { SALON_IMAGES } from "./salon-images";

export function SalonPhoto({ slot, className = "" }: { slot: keyof typeof SALON_IMAGES; className?: string }) {
  const photo = SALON_IMAGES[slot];
  return (
    <ParallaxFigure direction={slot === "care" ? -1 : 1} className={`salon-photo ${className}`}>
      <ScrollImage direction={slot === "care" ? -1 : 1} className="salon-photo-frame">
        <FadeImage src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 88vw, 42vw" style={{ objectPosition: photo.position }} />
      </ScrollImage>
    </ParallaxFigure>
  );
}
