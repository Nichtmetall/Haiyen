"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { FAQS, GALLERY_ITEMS } from "./data";
import { ScrollImage } from "./animations";
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
        <FadeIn delay={0.05}>
          <p className="eyebrow">Ein kleiner Einblick. Ein gutes Gefühl.</p>
        </FadeIn>
        <FadeIn delay={0.14}>
          <h2 id="salon-title">Ihr Lieblingslook<br />beginnt mit <em>Wohlfühlen.</em></h2>
        </FadeIn>
        <FadeIn delay={0.22}>
          <p>Seit 2016 ist haiyen Hairdesign Ihre Adresse für Styling und Wellness in Dresden-Striesen &amp; Neustadt.</p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p>Gegründet von der Friseurmeisterin Hai Yen, verbinden wir erstklassigen Service mit ausgezeichnetem handwerklichem Können.</p>
        </FadeIn>
        <FadeIn delay={0.38}>
          <p>In exquisiter Atmosphäre holen wir das Beste aus Ihnen heraus – für ein Ergebnis, mit dem Sie sich rundum wohlfühlen.</p>
        </FadeIn>
        <FadeIn delay={0.46}>
          <p>Für höchste Qualität setzen wir auf Profi-Produkte von Redken, L’Oreal, Great Lengths, Olaplex und Hairtalk.</p>
        </FadeIn>
        <FadeIn delay={0.54}>
          <a className="text-link" href="#standorte">Unsere Salons in Dresden <ArrowUpRight size={17} /></a>
        </FadeIn>
      </div>
      <div className="salon-story-images">
        <FadeIn delay={0.18}><SalonPhoto slot="styling" className="salon-story-styling" /></FadeIn>
        <FadeIn delay={0.32}><SalonPhoto slot="care" className="salon-story-care" /></FadeIn>
      </div>
    </section>
    <section className="section-shell selected-work section-dark">
      <FadeIn className="section-heading">
        <div>
          <p className="eyebrow">Von unseren Händen. Für Ihren Alltag.</p>
          <h2>So vielfältig<br />wie <em>Sie.</em></h2>
        </div>
        <div className="section-aside">
          <p>Weiche Übergänge, lebendige Farben und ein Schnitt, der zu Ihnen gehört. Ein kleiner Einblick in unsere Arbeit.</p>
          <Link className="text-link" href="/galerie">Alle Arbeiten entdecken <ArrowUpRight size={17} /></Link>
        </div>
      </FadeIn>
      <div className="work-grid">
        {[GALLERY_ITEMS[3], GALLERY_ITEMS[1], GALLERY_ITEMS[8]].map((item, i) => (
          <FadeIn key={item.src} delay={0.08 + i * 0.12}>
            <Link className="work-item" href={`/galerie?stylist=${item.stylist}`}>
              <ScrollImage className="work-image">
                <FadeImage src={item.src} alt={item.caption} fill sizes="(max-width: 760px) 85vw, 30vw" />
                <span className="image-arrow"><ArrowUpRight size={20} /></span>
              </ScrollImage>
              <div className="work-caption">
                <span>{item.caption}</span>
                <span>von {item.stylistName.split(" ")[0]}</span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
    <ServicesSection />
    <section className="section-shell home-team section-dark" id="team">
      <FadeIn className="section-heading">
        <div>
          <p className="eyebrow">Persönlich für Sie da</p>
          <h2>Ihr <em>Team.</em></h2>
        </div>
        <Link className="text-link" href="/team">Lernen Sie unser Team kennen <ArrowUpRight size={17} /></Link>
      </FadeIn>
      <div className="home-team-intro">
        <FadeIn delay={0.1} className="team-group-photo">
          <FadeImage src={TEAM_IMAGE.src} alt={TEAM_IMAGE.alt} width={TEAM_IMAGE.width} height={TEAM_IMAGE.height} unoptimized sizes="(max-width: 760px) 88vw, 44vw" />
        </FadeIn>
        <FadeIn delay={0.22}>
          <h3>Sechs Persönlichkeiten.<br />Eine Leidenschaft.<br />Ihr <em>Stil.</em></h3>
          <p>Gute Haare sind mehr als ein Look. Sie sind ein Gefühl.</p>
          <p>Hinter jedem Haarschnitt, jeder Farbe und jedem Styling stehen Menschen mit Leidenschaft, Persönlichkeit und dem Anspruch, das Beste aus Ihrem Haar herauszuholen.</p>
          <p>Ich bin Hai Yen – gemeinsam mit Lisa, Anika, Josi, Lea-Sophie und Minh Anh bilden wir ein Team, das unterschiedlicher nicht sein könnte und gerade deshalb so besonders ist.</p>
          <p>Von der Masterstylistin bis zur Junior Stylistin bringt jede von uns ihren eigenen Stil, ihre individuellen Stärken und ganz viel Herzblut mit.</p>
          <p>Was uns verbindet, ist die Liebe zu unserem Handwerk und der Wunsch, Ihnen nicht nur schöne Haare, sondern ein rundum gutes Gefühl zu schenken.</p>
          <p>Wir nehmen uns Zeit für Sie, hören Ihnen zu und kreieren gemeinsam Ihren ganz persönlichen Lieblingslook.</p>
          <Link className="text-link" href="/team">Das Team kennenlernen <ArrowUpRight size={17} /></Link>
        </FadeIn>
      </div>
      <FadeIn delay={0.16}>
        <TeamPreviewCarousel />
      </FadeIn>
    </section>
    <section className="reviews-section">
      <div className="section-shell">
        <FadeIn delay={0.05}><p className="eyebrow">Worte, die bei uns bleiben</p></FadeIn>
        <FadeIn delay={0.14}><h2>Das schönste Kompliment?<br /><em>Wenn Sie wiederkommen.</em></h2></FadeIn>
        <FadeIn delay={0.26}><ReviewCarousel /></FadeIn>
      </div>
    </section>
    <section id="standorte" className="section-shell locations-section section-dark">
      <FadeIn className="section-heading">
        <div>
          <p className="eyebrow">Zweimal Dresden. Ein vertrautes Gefühl.</p>
          <h2>Wir freuen uns<br /><em>auf Sie.</em></h2>
        </div>
        <p className="section-aside">Ihr nächster Besuch beginnt hier.<br />Wählen Sie Ihren Salon und finden Sie Ihren Wunschtermin.</p>
      </FadeIn>
      <div className="locations-grid">
        {Object.entries(LOCATIONS).map(([key, loc], i) => (
          <FadeIn className="location-block" key={key} delay={i * 0.14}>
            <div id={key} className="location-heading">
              <span className="eyebrow">Dresden / 0{i + 1}</span>
              <h3>Friseur in<br />Dresden {loc.name}</h3>
            </div>
            <div className="location-details">
              <div>
                <a href={loc.mapUrl} target="_blank" rel="noreferrer">{loc.street}<br />{loc.city}</a>
                <a className="location-phone" href={`tel:${loc.phoneHref}`}>{loc.phone}</a>
              </div>
              <dl>{loc.hours.map(row => <div key={row.days}><dt>{row.days}</dt><dd>{row.time}</dd></div>)}</dl>
            </div>
            <Link className="button button-primary" href={`/booking?location=${key}`}>Termin in {loc.name} <ArrowUpRight size={17} /></Link>
            <div className="location-map-block">
              <p className="location-map-label">Anfahrt & Karte</p>
              <div className="location-map" data-lenis-prevent>
                <ConsentEmbed src={loc.mapEmbed} title={`Google Maps – Haiyen Hairdesign ${loc.name}`} fallbackHref={loc.mapUrl} fallbackLabel="Route öffnen" />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
    <section className="section-shell faq-section">
      <FadeIn delay={0.05}>
        <div>
          <p className="eyebrow">Vor Ihrem Besuch</p>
          <h2>Noch eine<br /><em>Frage?</em></h2>
        </div>
      </FadeIn>
      <div className="faq-list">
        {FAQS.map((faq, i) => (
          <FadeIn key={faq.q} delay={0.08 + i * 0.06}>
            <details>
              <summary>{faq.q}<Plus size={18} /></summary>
              <p>{faq.a}</p>
            </details>
          </FadeIn>
        ))}
      </div>
    </section>
  </main>
);
