import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollImage } from "./animations";
import { FadeImage } from "./fade-image";
import { SALON_IMAGES } from "./salon-images";

export const HeroParallax = () => (
  <section className="salon-hero" aria-labelledby="hero-title">
    <div className="salon-hero-layout section-shell">
      <div className="salon-hero-content">
        <p className="eyebrow light">Haiyen Hairdesign · Striesen & Neustadt</p>
        <h1 id="hero-title">Dein Friseur<br />in Dresden.<br /><em>Dein Moment.</em></h1>
        <p className="salon-hero-intro">Ein Schnitt, der zu dir passt. Eine Farbe, die dich strahlen lässt. Entdecke Haarschnitte, Balayage und Extensions mit persönlicher Beratung in unseren zwei Dresdner Salons.</p>
        <div className="salon-hero-actions">
          <Link className="button button-gold" href="/booking">Termin online buchen <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <a className="salon-hero-secondary" href="#leistungen">Leistungen & Preise <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="salon-hero-note"><span>Zwei Salons in Dresden</span><span>Online deinen Wunschtermin finden</span></div>
      </div>
      <figure data-parallax className="salon-hero-visual">
        <ScrollImage strength={4} className="salon-hero-photo"><FadeImage src={SALON_IMAGES.hero.src} alt={SALON_IMAGES.hero.alt} fill preload sizes="(max-width: 760px) 88vw, (max-width: 1455px) 40vw, 580px" style={{ objectPosition: SALON_IMAGES.hero.position }} /></ScrollImage>
        <figcaption><span>Ankommen. Wohlfühlen. Du sein.</span><a href="#salon">Ein Blick in den Salon <ArrowUpRight size={16} aria-hidden="true" /></a></figcaption>
      </figure>
    </div>
  </section>
);
