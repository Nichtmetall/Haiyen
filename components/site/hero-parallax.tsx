import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollImage } from "./animations";
import { SALON_IMAGES } from "./salon-images";

// Reine CSS-Einblendung: sichtbar ab dem ersten Paint, ohne auf die Hydration zu warten (LCP).
export const HeroParallax = () => (
  <section className="salon-hero" aria-labelledby="hero-title">
    <div className="salon-hero-layout section-shell">
      <div className="salon-hero-content">
        <div className="hero-fade" style={{ animationDelay: "0.05s" }}>
          <p className="eyebrow light">Haiyen Hairdesign · Striesen & Neustadt</p>
        </div>
        <div className="hero-rise" style={{ animationDelay: "0.18s" }}>
          <h1 id="hero-title">Ihr Friseur<br />in Dresden.<br /><em>Ihr Moment.</em></h1>
        </div>
        <div className="hero-rise" style={{ animationDelay: "0.32s" }}>
          <p className="salon-hero-intro">Ein Schnitt, der zu Ihnen passt. Eine Farbe, die Sie strahlen lässt. Entdecken Sie Haarschnitte, Balayage und Extensions mit persönlicher Beratung in unseren zwei Dresdner Salons.</p>
        </div>
        <div className="hero-fade" style={{ animationDelay: "0.46s" }}>
          <div className="salon-hero-actions">
            <Link className="button button-gold" href="/booking">Termin online buchen <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a className="salon-hero-secondary" href="#leistungen">Leistungen & Preise <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-fade" style={{ animationDelay: "0.6s" }}>
          <div className="salon-hero-note"><span>Zwei Salons in Dresden</span><span>Online Ihren Wunschtermin finden</span></div>
        </div>
      </div>
      <div className="salon-hero-visual hero-rise" style={{ animationDelay: "0.28s" }}>
        <figure data-parallax>
          <ScrollImage strength={4} className="salon-hero-photo"><Image src={SALON_IMAGES.hero.src} alt={SALON_IMAGES.hero.alt} fill preload sizes="(max-width: 760px) 88vw, (max-width: 1455px) 40vw, 580px" style={{ objectPosition: SALON_IMAGES.hero.position }} /></ScrollImage>
          <figcaption><span>Ankommen. Wohlfühlen. Sie sein.</span><a href="#salon">Ein Blick in den Salon <ArrowUpRight size={16} aria-hidden="true" /></a></figcaption>
        </figure>
      </div>
    </div>
  </section>
);
