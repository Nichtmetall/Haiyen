"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUpRight, Expand } from "lucide-react";
import { GALLERY_ITEMS } from "./data";
import { GalleryLightbox, prepareViewer } from "./gallery-lightbox";
import { ClipReveal } from "./animations";

export const GaleriePageContent = () => <Suspense fallback={<div className="page-intro section-shell">Galerie wird geladen …</div>}><Gallery /></Suspense>;
function Gallery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const validFilters = ["all", "haiyen", "lisa", "anika", "josi"];
  const requested = searchParams.get("stylist") || "all";
  const active = validFilters.includes(requested) ? requested : "all";
  const items = GALLERY_ITEMS.filter(item => active === "all" || item.stylist === active);
  const [selected, setSelected] = useState<number | null>(null);
  return <main className="gallery-page section-shell">
    <header className="page-intro"><p className="eyebrow">Einblicke in unsere Arbeit</p><h1>Echte Looks.<br /><em>Echte Persönlichkeiten.</em></h1><p>Vom vertrauten Lieblingslook bis zur neuen Farbe. Entdecke, was in unseren Salons entsteht – und finde Inspiration für deinen nächsten Besuch.</p></header>
    <div className="gallery-toolbar"><div className="filter-row" aria-label="Arbeiten nach Stylistin filtern">{[{ id: "all", label: "Alle Arbeiten" }, { id: "haiyen", label: "Hai Yen" }, { id: "lisa", label: "Lisa" }, { id: "anika", label: "Anika" }, { id: "josi", label: "Josi" }].map(tab => <button key={tab.id} className={active === tab.id ? "active" : ""} aria-pressed={active === tab.id} onClick={() => { setSelected(null); router.replace(tab.id === "all" ? "/galerie" : `/galerie?stylist=${tab.id}`, { scroll: false }); }}>{tab.label}</button>)}</div><span className="gallery-count" aria-live="polite">{items.length} Arbeiten</span></div>
    <div className="gallery-grid">{items.map((item, i) => <button className="gallery-item" key={item.src} onPointerEnter={() => { void prepareViewer(item.src).catch(() => undefined); }} onFocus={() => { void prepareViewer(item.src).catch(() => undefined); }} onClick={() => setSelected(i)} aria-label={`${item.caption} von ${item.stylistName} vergrößern`}><ClipReveal className="gallery-photo"><Image src={item.src} alt={item.caption} fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw" /><span className="image-arrow"><Expand size={18} /></span></ClipReveal><span className="gallery-caption"><span>{item.caption}</span><span>von {item.stylistName}</span></span></button>)}</div>
    {!items.length && <div className="gallery-empty"><h2>Weitere Looks folgen.</h2><p>Von Hai Yen sind aktuell noch keine Arbeiten in der Galerie. Lerne sie persönlich im Salon kennen.</p><Link href="/booking" className="text-link">Termin finden <ArrowUpRight size={17} /></Link></div>}
    <div className="gallery-end"><p>Deinen nächsten Lieblingslook schon im Kopf?</p><Link href="/booking" className="button button-green">Wir freuen uns auf dich <ArrowUpRight size={17} /></Link></div>
    {selected !== null && items[selected] && <GalleryLightbox key={active} items={items} initialIndex={selected} onClose={() => setSelected(null)} />}
  </main>;
}
export default GaleriePageContent;
