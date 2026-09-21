"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CalendarCheck, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ConsentEmbed } from "./consent-manager";
import { LOCATIONS, type LocationKey } from "./locations";

export const BookingPageContent = () => {
  const searchParams = useSearchParams();
  const active: LocationKey = searchParams.get("location") === "neustadt" ? "neustadt" : "striesen";
  const loc = LOCATIONS[active];
  return (
    <main className="booking-page section-shell">
      <header className="page-intro">
        <FadeIn delay={0.05}><p className="eyebrow">Ihr nächster Besuch</p></FadeIn>
        <FadeIn delay={0.16}><h1>Ein bisschen Zeit.<br /><em>Nur für Sie.</em></h1></FadeIn>
        <FadeIn delay={0.28}>
          <p>Wählen Sie Ihren Salon, Ihre Behandlung und Ihren Wunschtermin. Wir freuen uns auf ein Wiedersehen – oder ein erstes Kennenlernen.</p>
        </FadeIn>
      </header>
      <nav className="booking-locations" aria-label="Salon für die Buchung wählen">
        {Object.entries(LOCATIONS).map(([key, salon], i) => (
          <FadeIn key={key} delay={0.12 + i * 0.1}>
            <Link href={`/booking?location=${key}`} scroll={false} className={active === key ? "active" : ""} aria-current={active === key ? "page" : undefined}>
              <span>Dresden</span>{salon.name}<span>{salon.street}</span>
              <ArrowUpRight size={23} />
            </Link>
          </FadeIn>
        ))}
      </nav>
      <div className="booking-layout">
        <aside className="booking-sidebar">
          <FadeIn delay={0.08}>
            <p className="eyebrow">Ihr Salon</p>
            <h2>{loc.name}</h2>
            <a className="booking-address" href={loc.mapUrl} target="_blank" rel="noreferrer"><MapPin size={17} /><span>{loc.street}<br />{loc.city}</span></a>
            <a className="booking-phone" href={`tel:${loc.phoneHref}`}><Phone size={17} />{loc.phone}</a>
            <dl>{loc.hours.map(row => <div key={row.days}><dt>{row.days}</dt><dd>{row.time}</dd></div>)}</dl>
            <p>Sie sind unsicher, welche Behandlung zu Ihnen passt? Rufen Sie uns gerne an.</p>
            <a href={loc.mapUrl} target="_blank" rel="noreferrer" className="text-link">Route zum Salon <ArrowUpRight size={16} /></a>
          </FadeIn>
        </aside>
        <section aria-label={`Online-Terminbuchung Dresden ${loc.name}`} className="booking-widget-section">
          <FadeIn delay={0.2}>
            <div className="booking-widget-label">
              <span><CalendarCheck size={17} /> Ihr Termin in {loc.name}</span>
              <span>Online buchen mit Planity</span>
            </div>
            <div className="booking-widget" key={active}>
              <ConsentEmbed actionLabel="Buchungssystem laden" allow="payment" className="h-full w-full" description="Mit dem Laden stimmen Sie der Übertragung von Daten an Planity zu." heading="Bereit für Ihren nächsten Besuch?" icon={<CalendarCheck aria-hidden="true" className="h-9 w-9" />} id="myIframe" src={loc.bookingUrl} title={`Online-Terminbuchung – Salon Dresden ${loc.name}`} tone="dark" />
            </div>
          </FadeIn>
        </section>
      </div>
    </main>
  );
};
export default BookingPageContent;
