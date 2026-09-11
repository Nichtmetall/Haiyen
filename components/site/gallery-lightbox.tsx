"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, LoaderCircle, X } from "lucide-react";
import type { GalleryItem } from "./data";

export function viewerSrc(src: string, preview = false) {
  const filename = src.split("/").slice(-2).join("-").replace(/\.[^.]+$/, "");
  return `/images/gallery-viewer/${filename}${preview ? "-preview" : ""}.webp`;
}

const prepared = new Map<string, Promise<void>>();
export function prepareViewer(src: string) {
  const url = viewerSrc(src);
  const cached = prepared.get(url);
  if (cached) return cached;
  const ready = new Promise<void>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => image.decode().then(resolve).catch(() => resolve());
    image.onerror = () => { prepared.delete(url); reject(new Error("Bild konnte nicht geladen werden.")); };
    image.src = url;
  });
  prepared.set(url, ready);
  return ready;
}

export function GalleryLightbox({ items, initialIndex, onClose }: { items: GalleryItem[]; initialIndex: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [[index, direction], setSlide] = useState([initialIndex, 0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const requested = useRef(initialIndex);
  const requestId = useRef(0);
  const reduced = useReducedMotion();
  const image = items[index];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      requestId.current++;
      document.body.style.overflow = previousOverflow;
      element.close();
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    // Warm the current image and both neighbours, then keep the cache as the visitor swipes.
    for (const offset of [0, 1, -1, 2]) {
      const item = items[(index + offset + items.length) % items.length];
      void prepareViewer(item.src).catch(() => undefined);
    }
  }, [index, items]);

  const change = async (step: number) => {
    const next = (requested.current + step + items.length) % items.length;
    requested.current = next;
    const id = ++requestId.current;
    setLoading(true);
    setError(false);
    try {
      await prepareViewer(items[next].src);
      if (id !== requestId.current) return;
      setSlide([next, step]);
    } catch {
      if (id === requestId.current) { setError(true); requested.current = index; }
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  };

  return (
    <dialog ref={dialog} className="gallery-lightbox" aria-label="Bildergalerie" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); void change(1); } if (event.key === "ArrowLeft") { event.preventDefault(); void change(-1); } }}>
      <button autoFocus className="lightbox-close" onClick={onClose} aria-label="Bild schließen"><X size={27} /></button>
      <div className="lightbox-content">
        <div className="lightbox-stage" aria-busy={loading}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div key={image.src} className="lightbox-slide" custom={direction} variants={{ enter: (dir: number) => ({ x: reduced ? 0 : `${dir > 0 ? 80 : -80}%`, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (dir: number) => ({ x: reduced ? 0 : `${dir > 0 ? -80 : 80}%`, opacity: 0 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }} drag={reduced ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18} onDragEnd={(_, info) => { if (info.offset.x < -45 || info.velocity.x < -450) void change(1); else if (info.offset.x > 45 || info.velocity.x > 450) void change(-1); }}>
              <Image src={viewerSrc(image.src, true)} alt="" fill unoptimized loading="eager" className="lightbox-preview" draggable={false} />
              <Image src={viewerSrc(image.src)} alt={image.caption} fill unoptimized loading="eager" draggable={false} />
            </motion.div>
          </AnimatePresence>
          {loading && <span role="status" className="lightbox-loading"><LoaderCircle size={18} />Bild wird geladen …</span>}
        </div>
        <div className="lightbox-caption" aria-live="polite"><p>{image.caption}<span>von {image.stylistName}</span></p><span>{index + 1} / {items.length}</span></div>
        {error && <p className="lightbox-error" role="alert">Das Bild konnte nicht geladen werden. Bitte versuche es erneut.</p>}
      </div>
      {items.length > 1 && <><button className="lightbox-prev" onClick={() => void change(-1)} aria-label="Vorheriges Bild"><ChevronLeft /></button><button className="lightbox-next" onClick={() => void change(1)} aria-label="Nächstes Bild"><ChevronRight /></button></>}
    </dialog>
  );
}
