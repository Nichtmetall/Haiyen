"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { FAQS, GALLERY_ITEMS } from "./data";
import { FadeUp, ScrollImage } from "./animations";
import { FadeImage } from "./fade-image";
import { Marquee } from "./marquee";
import { HeroParallax } from "./hero-parallax";
import { CinematicScene } from "./cinematic-scene";
import { TEAM_IMAGE } from "./salon-images";
import { ServicesSection } from "./services-section";
import { ReviewCarousel } from "./review-carousel";
import { TeamPreviewCarousel } from "./team-preview-carousel";
import { ConsentEmbed } from "./consent-manager";
import { LOCATIONS } from "./locations";
import { SalonPhoto } from "./salon-photo";

export const HomePageContent = () => (
  <main>
    <HeroParallax />
    <Marquee />
    <CinematicScene />
    <section id="salon" className="section-shell salon-story" aria-labelledby="salon-title">
      <div className="salon-story-copy">
        <p className="eyebrow">Ein kleiner Einblick. Ein gutes Gefühl.</p>
        <h2 id="salon-title">Dein Lieblingslook<br />beginnt mit <em>Wohlfühlen.</em></h2>
        <p>Seit 2016 ist haiyen Hairdesign Ihre Adresse für Styling und Wellness in Dresden-Striesen &amp; Neustadt.</p>
        <p>Gegründet von der Friseurmeisterin Hai Yen, verbinden wir erstklassigen Service mit ausgezeichnetem handwerklichem Können.</p>
        <p>In exquisiter Atmosphäre holen wir das Beste aus Ihnen heraus – für ein Ergebnis, mit dem Sie sich rundum wohlfühlen.</p>
        <p>Für höchste Qualität setzen wir auf Profi-Produkte von Redken, L’Oreal, Great Lengths, Olaplex und Hairtalk.</p>
        <a className="text-link" href="#standorte">Unsere Salons in Dresden <ArrowUpRight size={17} /></a>
      </div>
      <div className="salon-story-images"><SalonPhoto slot="styling" className="salon-story-styling" /><SalonPhoto slot="care" className="salon-story-care" /></div>
    </section>
    <section className="section-shell selected-work section-dark">
      <FadeUp className="section-heading"><div><p className="eyebrow">Von unseren Händen. Für deinen Alltag.</p><h2>So vielfältig<br />wie <em>du.</em></h2></div><div className="section-aside"><p>Weiche Übergänge, lebendige Farben und ein Schnitt, der zu dir gehört. Ein kleiner Einblick in unsere Arbeit.</p><Link className="text-link" href="/galerie">Alle Arbeiten entdecken <ArrowUpRight size={17} /></Link></div></FadeUp>
      <div className="work-grid">{[GALLERY_ITEMS[3], GALLERY_ITEMS[1], GALLERY_ITEMS[8]].map((item, i) => <FadeUp key={item.src} delay={i * 0.08}><Link className="work-item" href={`/galerie?stylist=${item.stylist}`}><ScrollImage className="work-image"><FadeImage src={item.src} alt={item.caption} fill sizes="(max-width: 760px) 85vw, 30vw" /><span className="image-arrow"><ArrowUpRight size={20} /></span></ScrollImage><div className="work-caption"><span>{item.caption}</span><span>von {item.stylistName.split(" ")[0]}</span></div></Link></FadeUp>)}</div>
    </section>
    <ServicesSection />
    <section className="section-shell home-team section-dark" id="team">
      <FadeUp className="section-heading"><div><p className="eyebrow">Persönlich für dich da</p><h2>Dein <em>Team.</em></h2></div><Link className="text-link" href="/team">Lerne unser Team kennen <ArrowUpRight size={17} /></Link></FadeUp>
      <div className="home-team-intro">
        <div className="team-group-photo"><FadeImage src={TEAM_IMAGE.src} alt={TEAM_IMAGE.alt} width={1800} height={1800} sizes="(max-width: 760px) 88vw, 44vw" /></div>
        <div>
          <h3>Sechs Persönlichkeiten.<br />Eine Leidenschaft.<br />Dein <em>Stil.</em></h3>
          <p>Gute Haare sind mehr als ein Look. Sie sind ein Gefühl.</p>
          <p>Hinter jedem Haarschnitt, jeder Farbe und jedem Styling stehen Menschen mit Leidenschaft, Persönlichkeit und dem Anspruch, das Beste aus deinem Haar herauszuholen.</p>
          <p>Ich bin Hai Yen – gemeinsam mit Lisa, Anika, Josi, Lea-Sophie und Minh Anh bilden wir ein Team, das unterschiedlicher nicht sein könnte und gerade deshalb so besonders ist.</p>
          <p>Von der Masterstylistin bis zur Junior Stylistin bringt jede von uns ihren eigenen Stil, ihre individuellen Stärken und ganz viel Herzblut mit.</p>
          <p>Was uns verbindet, ist die Liebe zu unserem Handwerk und der Wunsch, dir nicht nur schöne Haare, sondern ein rundum gutes Gefühl zu schenken.</p>
          <p>Wir nehmen uns Zeit für dich, hören dir zu und kreieren gemeinsam deinen ganz persönlichen Lieblingslook.</p>
          <Link className="text-link" href="/team">Das Team kennenlernen <ArrowUpRight size={17} /></Link>
        </div>
      </div>
      <TeamPreviewCarousel />
    </section>
    <section className="reviews-section"><div className="section-shell"><p className="eyebrow">Worte, die bei uns bleiben</p><h2>Das schönste Kompliment?<br /><em>Wenn du wiederkommst.</em></h2><ReviewCarousel /></div></section>
    <section id="standorte" className="section-shell locations-section section-dark">
      <FadeUp className="section-heading"><div><p className="eyebrow">Zweimal Dresden. Ein vertrautes Gefühl.</p><h2>Wir freuen uns<br /><em>auf dich.</em></h2></div><p className="section-aside">Dein nächster Besuch beginnt hier.<br />Wähle deinen Salon und finde deinen Wunschtermin.</p></FadeUp>
      <div className="locations-grid">{Object.entries(LOCATIONS).map(([key, loc], i) => <FadeUp className="location-block" key={key} delay={i * 0.1}><div id={key} className="location-heading"><span className="eyebrow">Dresden / 0{i + 1}</span><h3>Friseur in<br />Dresden {loc.name}</h3></div><div className="location-details"><div><a href={loc.mapUrl} target="_blank" rel="noreferrer">{loc.street}<br />{loc.city}</a><a className="location-phone" href={`tel:${loc.phoneHref}`}>{loc.phone}</a></div><dl>{loc.hours.map(row => <div key={row.days}><dt>{row.days}</dt><dd>{row.time}</dd></div>)}</dl></div><Link className="button button-primary" href={`/booking?location=${key}`}>Termin in {loc.name} <ArrowUpRight size={17} /></Link><details className="map-details"><summary>Anfahrt & Karte <Plus size={16} /></summary><div className="location-map" data-lenis-prevent><ConsentEmbed src={loc.mapEmbed} title={`Google Maps – Haiyen Hairdesign ${loc.name}`} fallbackHref={loc.mapUrl} fallbackLabel="Route öffnen" /></div></details></FadeUp>)}</div>
    </section>
    <section className="section-shell faq-section"><div><p className="eyebrow">Vor deinem Besuch</p><h2>Noch eine<br /><em>Frage?</em></h2></div><div className="faq-list">{FAQS.map(faq => <details key={faq.q}><summary>{faq.q}<Plus size={18} /></summary><p>{faq.a}</p></details>)}</div></section>

  </main>
);
