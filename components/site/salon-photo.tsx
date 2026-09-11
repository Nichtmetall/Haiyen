"use client";

import Image from "next/image";
import { ScrollImage } from "./animations";
import { SALON_IMAGES } from "./salon-images";

export function SalonPhoto({ slot, className = "" }: { slot: keyof typeof SALON_IMAGES; className?: string }) {
  const photo = SALON_IMAGES[slot];
  return (
    <figure className={`salon-photo ${className}`}>
      <ScrollImage className="salon-photo-frame">
        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 88vw, 42vw" style={{ objectPosition: photo.position }} />
      </ScrollImage>
      {photo.isStock && <figcaption><a href={photo.source} target="_blank" rel="noreferrer">Salon-Inspiration · {photo.photographer} / {photo.provider}</a></figcaption>}
    </figure>
  );
}
