"use client";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { SERVICES } from "./data";
import { SalonPhoto } from "./salon-photo";
import { FadeIn } from "@/components/FadeIn";

export const ServicesSection = () => (
  <section id="leistungen" className="services-section">
    <div className="section-shell services-layout">
      <FadeIn className="services-intro" delay={0.05}>
        <p className="eyebrow">Was wir für dich tun</p>
        <h2>Dein Stil.<br /><em>Unser Handwerk.</em></h2>
        <p>Den Lieblingsschnitt auffrischen oder etwas Neues wagen. Wir finden gemeinsam heraus, was zu dir passt.</p>
        <SalonPhoto slot="detail" className="services-salon-photo" />
      </FadeIn>
      <div className="service-list">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.title} delay={0.08 + i * 0.07}>
            <details className="service-row">
              <summary>
                <span className="service-number">0{i + 1}</span>
                <span className="service-name">{service.title}<span>{service.duration}</span></span>
                <span className="service-price">{service.price}</span>
                <Plus size={17} />
              </summary>
              <div className="service-description">
                <p>{service.desc}</p>
                <Link className="text-link" href="/booking">Termin finden <ArrowUpRight size={16} /></Link>
              </div>
            </details>
          </FadeIn>
        ))}
        <FadeIn delay={0.12}>
          <p className="price-note">Die Preise können je nach Haarlänge, Materialeinsatz und Aufwand variieren. Den verbindlichen Preis stimmen wir vor der Behandlung mit dir ab.</p>
          <Link href="/booking" className="button button-primary">Deinen Besuch planen <ArrowUpRight size={17} /></Link>
        </FadeIn>
      </div>
    </div>
  </section>
);
