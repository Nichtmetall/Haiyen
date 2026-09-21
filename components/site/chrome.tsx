"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, Phone, X, Plus } from "lucide-react";
import { MotionConfig } from "framer-motion";
import { useConsent } from "./consent-manager";
import { LOCATIONS } from "./locations";
import { SiteMotion } from "./site-motion";

export const useSiteNavigation = (onNavigate?: () => void) => {
  const router = useRouter();
  return (page: string, hash = "", query = "") => { onNavigate?.(); router.push(`${page === "home" ? "/" : `/${page}`}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`); };
};

const WhatsAppIcon = () => (
  <svg width="30" height="30" viewBox="0 0 720 720" fill="none" aria-hidden="true">
    <path d="M360,0C161.18,0,0,161.18,0,360c0,65.41,17.45,126.75,47.94,179.61L0,720l187.02-44.21c51.34,28.18,110.28,44.21,172.98,44.21,198.82,0,360-161.18,360-360S558.82,0,360,0ZM360,655.52c-60.17,0-116.13-17.98-162.82-48.87l-110.49,28.14,30.99-105.61c-33.53-47.93-53.2-106.26-53.2-169.19,0-163.21,132.31-295.52,295.52-295.52s295.52,132.31,295.52,295.52-132.31,295.52-295.52,295.52Z" fill="currentColor" />
    <path d="M444.35,407.52l87.1,41.06c4,1.88,6.56,5.94,6.2,10.34-.94,11.46-5.54,34.43-26.13,55.02-58.12,58.12-162.49-7.64-166.74-10.18-25.67-13.79-50.06-32.24-73.19-55.36s-41.58-47.52-55.37-73.19c-2.55-4.24-68.31-108.61-10.18-166.74,20.59-20.59,43.56-25.19,55.02-26.13,4.41-.36,8.46,2.2,10.34,6.2l41.07,87.1c1.94,4.12,1.09,9.02-2.13,12.24l-30.61,30.61c-6.62,6.62-8.56,16.93-4,25.11,11.17,20.03,26.19,39.32,43.59,57.07,17.75,17.4,37.04,32.43,57.07,43.59,8.18,4.56,18.48,2.62,25.11-4l30.61-30.61c3.22-3.22,8.12-4.08,12.24-2.13Z" fill="currentColor" />
  </svg>
);

const InstagramIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r=".8" fill="currentColor" stroke="none" />
  </svg>
);

function MobileBookingLink() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const intro = document.querySelector(".salon-hero, .team-hero, main .page-intro");
    if (!intro) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    }, { threshold: 0 });
    observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  return <Link href="/booking" className={`mobile-book${visible ? " is-visible" : ""}`} aria-hidden={!visible} tabIndex={visible ? undefined : -1}>Termin buchen <ArrowUpRight size={18} /></Link>;
}

function ContactSocialLinks() {
  return <nav className="contact-socials" aria-label="Kontakt über Social Media">
    <a href="https://wa.me/491745156575" target="_blank" rel="noreferrer"><WhatsAppIcon /><span>WhatsApp</span></a>
    <a href="https://www.instagram.com/haiyenhairdesign_striesen/" target="_blank" rel="noreferrer"><InstagramIcon /><span>Instagram</span></a>
    <a href={`tel:${LOCATIONS.striesen.phoneHref}`} aria-label="Salon Striesen anrufen"><Phone aria-hidden="true" /><span>Telefon</span></a>
  </nav>;
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const legal = pathname === "/impressum" || pathname === "/datenschutz";
  const booking = pathname === "/booking";
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const { openSettings } = useConsent();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 120);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const closeMenu = () => { menu.current?.close(); };
  const contact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Anfrage Website – ${data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nE-Mail: ${data.get("email")}\nTelefon: ${data.get("phone") || "–"}\nStandort: ${data.get("location")}\n\nNachricht:\n${data.get("message")}`);
    window.location.href = `mailto:info@haiyen-hairdesign.de?subject=${subject}&body=${body}`;
  };
  const links = [{ href: "/", label: "Bei uns" }, { href: "/team", label: "Das Team" }, { href: "/galerie", label: "Galerie" }, { href: "/#standorte", label: "Unsere Salons" }];
  return <MotionConfig reducedMotion="user"><div className="site-wrap">
    <SiteMotion />
    <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
    <nav className="social-rail" aria-label="Social Media">
      <a href="https://wa.me/491745156575" target="_blank" rel="noreferrer" aria-label="Haiyen Hairdesign auf WhatsApp öffnen">
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
      <a href="https://www.instagram.com/haiyenhairdesign_striesen/" target="_blank" rel="noreferrer" aria-label="Haiyen Hairdesign auf Instagram öffnen">
        <InstagramIcon />
        <span>Instagram</span>
      </a>
      <a href={`tel:${LOCATIONS.striesen.phoneHref}`} aria-label="Salon Striesen anrufen">
        <Phone aria-hidden="true" />
        <span>Anrufen</span>
      </a>
    </nav>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><div className="nav-inner"><Link href="/" aria-label="Haiyen Hairdesign – Startseite" className="brand"><Image src="/images/logos/haiyen_logo_hell.png" alt="Haiyen Hairdesign" width={808} height={246} preload /></Link><nav className="desktop-nav" aria-label="Hauptnavigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav><Link href="/booking" className="nav-book">Termin buchen <ArrowUpRight size={16} /></Link><button className="menu-button" aria-label="Menü öffnen" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}><Menu size={25} /></button></div></header>
    <dialog className="mobile-menu" ref={menu} aria-label="Navigation"><div className="mobile-menu-top"><span>Haiyen Hairdesign</span><button aria-label="Menü schließen" onClick={closeMenu}><X size={25} /></button></div><nav>{links.map(link => <Link key={link.href} href={link.href} onClick={closeMenu}>{link.label}<ArrowUpRight size={22} /></Link>)}</nav><p className="eyebrow light">Dein nächster Besuch</p>{Object.entries(LOCATIONS).map(([key, loc]) => <Link className="button button-gold" key={key} onClick={closeMenu} href={`/booking?location=${key}`}>Termin in {loc.name}<ArrowUpRight size={18} /></Link>)}</dialog>
    <div id="main-content" tabIndex={-1}>{children}</div>
    {!legal && <section className="contact-section"><div className="section-shell contact-layout"><div><p className="eyebrow">Wir sind für dich da</p><h2>Was liegt dir<br /><em>auf dem Herzen?</em></h2><a className="text-link" href="mailto:info@haiyen-hairdesign.de">info@haiyen-hairdesign.de <ArrowUpRight size={16} /></a><ContactSocialLinks /></div><details className="contact-details"><summary>Schreib uns eine Nachricht <Plus size={21} /></summary><form onSubmit={contact}><div className="form-grid"><label>Dein Name<input name="name" autoComplete="name" required placeholder="Vor- und Nachname" /></label><label>Deine E-Mail-Adresse<input name="email" type="email" autoComplete="email" required placeholder="name@beispiel.de" /></label><label>Telefonnummer <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" /></label><label>Dein Salon<select name="location"><option>Dresden Striesen</option><option>Dresden Neustadt</option></select></label></div><label>Deine Nachricht<textarea name="message" required rows={4} placeholder="Wie können wir dir helfen?" /></label><p>Wir bereiten die Nachricht in deinem E-Mail-Programm vor. Deine Angaben werden hier nicht gespeichert. Mehr dazu im <Link href="/datenschutz">Datenschutz</Link>.</p><button type="submit" className="button button-primary">E-Mail vorbereiten <ArrowUpRight size={17} /></button></form></details></div></section>}
    <footer className="site-footer"><div className="section-shell"><div className="footer-main"><div className="footer-brand"><Link href="/" aria-label="Haiyen Hairdesign – Startseite"><Image src="/images/logos/haiyen_logo_hell.png" alt="Haiyen Hairdesign" width={808} height={246} /></Link><p>Dein Haar. Dein Stil.<br />Dein vertrauter Ort.</p></div><nav aria-label="Weitere Seiten"><p className="eyebrow light">Bei Haiyen</p><Link href="/team">Das Team</Link><Link href="/galerie">Unsere Arbeiten</Link><Link href="/#leistungen">Leistungen & Preise</Link><Link href="/booking">Termin buchen</Link></nav>{Object.entries(LOCATIONS).map(([key, loc]) => <div className="footer-location" key={key}><p className="eyebrow light">Dresden {loc.name}</p><a href={loc.mapUrl} target="_blank" rel="noreferrer">{loc.street}<br />{loc.city}</a><a href={`tel:${loc.phoneHref}`}>{loc.phone}</a><Link href={`/booking?location=${key}`}>Termin in {loc.name}</Link></div>)}</div><div className="footer-bottom"><span>© 2026 Haiyen Hairdesign</span><div><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><button onClick={openSettings}>Cookie-Einstellungen</button></div><span>Mit Gefühl. In Dresden.</span></div></div></footer>
    {!booking && !legal && <MobileBookingLink key={pathname} />}
  </div></MotionConfig>;
}
