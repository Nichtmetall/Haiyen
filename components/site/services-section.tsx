"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SERVICES } from "./data";
import { SalonPhoto } from "./salon-photo";

export const ServicesSection = () => (
  <section id="leistungen" className="services-section">
    <div className="section-shell services-layout">
      <FadeIn className="services-intro">
        <p className="eyebrow">Was wir für Sie tun</p>
        <h2>Ihr Stil.<br /><em>Unser Handwerk.</em></h2>
        <p>Den Lieblingsschnitt auffrischen oder etwas Neues wagen. Wir finden gemeinsam heraus, was zu Ihnen passt.</p>
        <SalonPhoto slot="detail" className="services-salon-photo" />
      </FadeIn>
      <div className="service-list">
        <div>
          {SERVICES.map((service, i) => (
            <FadeIn key={service.title} delay={0.06 + i * 0.07}>
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
        </div>
        <FadeIn delay={0.28}>
          <p className="price-note">Die Preise können je nach Haarlänge, Materialeinsatz und Aufwand variieren. Den verbindlichen Preis stimmen wir vor der Behandlung mit Ihnen ab.</p>
        </FadeIn>
        <FadeIn delay={0.36}>
          <Link href="/booking" className="button button-primary">Ihren Besuch planen <ArrowUpRight size={17} /></Link>
        </FadeIn>
      </div>
    </div>
  </section>
);
