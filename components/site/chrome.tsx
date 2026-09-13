"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Plus } from "lucide-react";
import { MotionConfig } from "framer-motion";
import { useConsent } from "./consent-manager";
import { LOCATIONS } from "./locations";
import { SiteMotion } from "./site-motion";

export const useSiteNavigation = (onNavigate?: () => void) => {
  const router = useRouter();
  return (page: string, hash = "", query = "") => { onNavigate?.(); router.push(`${page === "home" ? "/" : `/${page}`}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`); };
};

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
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><div className="nav-inner"><Link href="/" aria-label="Haiyen Hairdesign – Startseite" className="brand"><Image src="/images/logos/haiyen_logo_hell.png" alt="Haiyen Hairdesign" width={808} height={246} preload /></Link><nav className="desktop-nav" aria-label="Hauptnavigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav><Link href="/booking" className="nav-book">Termin buchen <ArrowUpRight size={16} /></Link><button className="menu-button" aria-label="Menü öffnen" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}><Menu size={25} /></button></div></header>
    <dialog className="mobile-menu" ref={menu} aria-label="Navigation"><div className="mobile-menu-top"><span>Haiyen Hairdesign</span><button aria-label="Menü schließen" onClick={closeMenu}><X size={25} /></button></div><nav>{links.map(link => <Link key={link.href} href={link.href} onClick={closeMenu}>{link.label}<ArrowUpRight size={22} /></Link>)}</nav><p className="eyebrow light">Dein nächster Besuch</p>{Object.entries(LOCATIONS).map(([key, loc]) => <Link className="button button-gold" key={key} onClick={closeMenu} href={`/booking?location=${key}`}>Termin in {loc.name}<ArrowUpRight size={18} /></Link>)}</dialog>
    <div id="main-content" tabIndex={-1}>{children}</div>
    {!legal && <section className="contact-section"><div className="section-shell contact-layout"><div><p className="eyebrow">Wir sind für dich da</p><h2>Was liegt dir<br /><em>auf dem Herzen?</em></h2><a className="text-link" href="mailto:info@haiyen-hairdesign.de">info@haiyen-hairdesign.de <ArrowUpRight size={16} /></a></div><details className="contact-details"><summary>Schreib uns eine Nachricht <Plus size={21} /></summary><form onSubmit={contact}><div className="form-grid"><label>Dein Name<input name="name" autoComplete="name" required placeholder="Vor- und Nachname" /></label><label>Deine E-Mail-Adresse<input name="email" type="email" autoComplete="email" required placeholder="name@beispiel.de" /></label><label>Telefonnummer <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" /></label><label>Dein Salon<select name="location"><option>Dresden Striesen</option><option>Dresden Neustadt</option></select></label></div><label>Deine Nachricht<textarea name="message" required rows={4} placeholder="Wie können wir dir helfen?" /></label><p>Wir bereiten die Nachricht in deinem E-Mail-Programm vor. Deine Angaben werden hier nicht gespeichert. Mehr dazu im <Link href="/datenschutz">Datenschutz</Link>.</p><button type="submit" className="button button-green">E-Mail vorbereiten <ArrowUpRight size={17} /></button></form></details></div></section>}
    <footer className="site-footer"><div className="section-shell"><div className="footer-main"><div className="footer-brand"><Link href="/" aria-label="Haiyen Hairdesign – Startseite"><Image src="/images/logos/haiyen_logo_hell.png" alt="Haiyen Hairdesign" width={808} height={246} /></Link><p>Dein Haar. Dein Stil.<br />Dein vertrauter Ort.</p></div><nav aria-label="Weitere Seiten"><p className="eyebrow light">Bei Haiyen</p><Link href="/team">Das Team</Link><Link href="/galerie">Unsere Arbeiten</Link><Link href="/#leistungen">Leistungen & Preise</Link><Link href="/booking">Termin buchen</Link></nav>{Object.entries(LOCATIONS).map(([key, loc]) => <div className="footer-location" key={key}><p className="eyebrow light">Dresden {loc.name}</p><a href={loc.mapUrl} target="_blank" rel="noreferrer">{loc.street}<br />{loc.city}</a><a href={`tel:${loc.phoneHref}`}>{loc.phone}</a><Link href={`/booking?location=${key}`}>Termin in {loc.name} ↗</Link></div>)}</div><div className="footer-bottom"><span>© 2026 Haiyen Hairdesign</span><div><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><button onClick={openSettings}>Cookie-Einstellungen</button></div><span>Mit Gefühl. In Dresden.</span></div></div></footer>
    {scrolled && !booking && !legal && <Link href="/booking" className="mobile-book">Termin buchen <ArrowUpRight size={18} /></Link>}
  </div></MotionConfig>;
}
