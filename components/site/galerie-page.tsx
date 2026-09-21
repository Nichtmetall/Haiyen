"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { FadeImage } from "./fade-image";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUpRight, Expand } from "lucide-react";
import { GALLERY_ITEMS, TEAM } from "./data";
import { GalleryLightbox, prepareViewer } from "./gallery-lightbox";
import { FadeIn } from "@/components/FadeIn";

export const GaleriePageContent = () => <Suspense fallback={<div className="page-intro section-shell">Galerie wird geladen …</div>}><Gallery /></Suspense>;
function Gallery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filters = [{ id: "all", label: "Alle Arbeiten" }, ...TEAM.map(member => ({ id: member.slug, label: member.slug === "haiyen" ? "Hai Yen" : member.slug === "minh-anh" ? "Minh Anh" : member.name.split(" ")[0] }))];
  const validFilters = filters.map(filter => filter.id);
  const requested = searchParams.get("stylist") || "all";
  const active = validFilters.includes(requested) ? requested : "all";
  const items = GALLERY_ITEMS.filter(item => active === "all" || item.stylist === active);
  const [selected, setSelected] = useState<number | null>(null);
  return <main className="gallery-page section-shell">
    <header className="page-intro">
      <FadeIn delay={0.08}><p className="eyebrow">Einblicke in unsere Arbeit</p></FadeIn>
      <FadeIn delay={0.2}><h1>Echte Looks.<br /><em>Echte Persönlichkeiten.</em></h1></FadeIn>
      <FadeIn delay={0.34}><p>Vom vertrauten Lieblingslook bis zur neuen Farbe. Entdecke, was in unseren Salons entsteht – und finde Inspiration für deinen nächsten Besuch.</p></FadeIn>
    </header>
    <div className="gallery-toolbar">
      <FadeIn delay={0.12}><div className="filter-row" aria-label="Arbeiten nach Stylistin filtern">{filters.map(tab => <button key={tab.id} className={active === tab.id ? "active" : ""} aria-pressed={active === tab.id} onClick={() => { setSelected(null); router.replace(tab.id === "all" ? "/galerie" : `/galerie?stylist=${tab.id}`, { scroll: false }); }}>{tab.label}</button>)}</div></FadeIn>
      <FadeIn delay={0.22}><span className="gallery-count" aria-live="polite">{items.length} Arbeiten</span></FadeIn>
    </div>
    <div className="gallery-grid">{items.map((item, i) => (
      <FadeIn key={item.src} delay={(i % 3) * 0.08}>
        <button className="gallery-item" onPointerEnter={() => { void prepareViewer(item.src).catch(() => undefined); }} onFocus={() => { void prepareViewer(item.src).catch(() => undefined); }} onClick={() => setSelected(i)} aria-label={`${item.caption} von ${item.stylistName} vergrößern`}>
          <div className="gallery-photo"><FadeImage src={item.src} alt={item.caption} fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw" /><span className="image-arrow"><Expand size={18} /></span></div>
          <span className="gallery-caption"><span>{item.caption}</span><span>von {item.stylistName}</span></span>
        </button>
      </FadeIn>
    ))}</div>
    {!items.length && <FadeIn><div className="gallery-empty"><h2>Weitere Looks folgen.</h2><p>Von {TEAM.find(member => member.slug === active)?.name ?? "unserem Team"} sind aktuell noch keine Arbeiten in der Galerie. Lerne uns persönlich im Salon kennen.</p><Link href="/booking" className="text-link">Termin finden <ArrowUpRight size={17} /></Link></div></FadeIn>}
    <FadeIn delay={0.1}><div className="gallery-end"><p>Deinen nächsten Lieblingslook schon im Kopf?</p><Link href="/booking" className="button button-primary">Wir freuen uns auf dich <ArrowUpRight size={17} /></Link></div></FadeIn>
    {selected !== null && items[selected] && <GalleryLightbox key={active} items={items} initialIndex={selected} onClose={() => setSelected(null)} />}
  </main>;
}
export default GaleriePageContent;
