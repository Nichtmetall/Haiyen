"use client";

import type { ImageLoaderProps } from "next/image";

// Verweist auf die von scripts/optimize-images.mjs erzeugten WebP-Varianten.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (!/^\/images\/(?!gallery-viewer\/).+\.(jpe?g|png|webp)$/i.test(src)) return src;
  return `/_img${src.slice("/images".length)}.${width}.webp`;
}
