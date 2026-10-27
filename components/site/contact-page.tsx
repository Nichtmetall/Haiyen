"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ConsentEmbed } from "./consent-manager";
import { LOCATIONS } from "./locations";

const CHANNELS = [
  { label: "E-Mail", value: "info@haiyen-hairdesign.de", href: "mailto:info@haiyen-hairdesign.de" },
  { label: "WhatsApp", value: "0174 515 65 75", href: "https://wa.me/491745156575", external: true },
];

export const ContactPageContent = () => (
  <main className="contact-page section-shell">
    <header className="page-intro">
      <FadeIn delay={0.05}><p className="eyebrow">Kontakt</p></FadeIn>
      <FadeIn delay={0.16}><h1>Wir sind für Sie da.<br /><em>Persönlich.</em></h1></FadeIn>
      <FadeIn delay={0.28}>
        <p>Rufen Sie uns an, schreiben Sie uns oder kommen Sie direkt in einem unserer beiden Salons in Dresden vorbei.</p>
      </FadeIn>
    </header>
    <FadeIn delay={0.12}>
      <div className="contact-channels">
        {CHANNELS.map(channel => (
          <a key={channel.label} href={channel.href} {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}>
            <span className="eyebrow">{channel.label}</span>
            {channel.value}
            <ArrowUpRight size={18} />
          </a>
        ))}
      </div>
    </FadeIn>
    <div className="locations-grid">
      {Object.entries(LOCATIONS).map(([key, loc], i) => (
        <FadeIn className="location-block" key={key} delay={i * 0.14}>
          <div className="location-heading">
            <span className="eyebrow">Dresden / 0{i + 1}</span>
            <h2>Salon {loc.name}</h2>
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
  </main>
);
export default ContactPageContent;
