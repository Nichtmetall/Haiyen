"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeImage } from "./fade-image";
import { ArrowUpRight } from "lucide-react";
import { GALLERY_ITEMS, TEAM } from "./data";
import { TEAM_IMAGE } from "./salon-images";
import { FadeUp, ClipReveal, ScrollImage } from "./animations";

export const TeamPageContent = () => {
  const [filter, setFilter] = useState("all");
  return (
    <main className="team-page">
      <section className="team-hero" aria-labelledby="team-title">
        <div className="team-hero-layout section-shell">
          <div className="team-hero-copy">
            <p className="eyebrow light">Persönlich für dich da</p>
            <h1 id="team-title">Dein Haar.<br /><em>Unser Team.</em></h1>
            <p className="team-hero-intro">Hai Yen, Lisa, Anika, Lea-Sophie, Josi und Minh Anh. Sechs Persönlichkeiten für deinen Lieblingslook – in unseren Friseursalons in Dresden-Striesen und Dresden-Neustadt.</p>
            <ul className="team-hero-names" aria-label="Zum Profil springen">
              {TEAM.map(member => (
                <li key={member.slug}>
                  <a href={`#${member.slug}`}>{member.name}</a>
                </li>
              ))}
            </ul>
            <div className="team-hero-actions">
              <Link className="button button-gold" href="/booking">Termin online buchen <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a className="salon-hero-secondary" href="#team-profiles">Die Stylistinnen kennenlernen <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
            <div className="team-hero-note">
              <span>Sechs Persönlichkeiten</span>
              <span>Zwei Salons in Dresden</span>
            </div>
          </div>
          <figure data-parallax className="team-hero-visual">
            <div className="team-hero-frame">
              <ScrollImage strength={5} className="team-hero-photo">
                <FadeImage
                  src={TEAM_IMAGE.src}
                  alt={TEAM_IMAGE.alt}
                  fill
                  preload
                  sizes="(max-width: 760px) 88vw, (max-width: 1455px) 50vw, 680px"
                />
              </ScrollImage>
            </div>
            <figcaption>
              <span>Haiyen Hairdesign</span>
              <span>Dein Friseurteam in Dresden</span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section id="team-profiles" className="team-minimal section-shell">
        <div className="filter-row" aria-label="Team filtern">{[{ id: "all", label: "Das ganze Team" }, { id: "master", label: "Masterstylist" }, { id: "top", label: "Topstylist" }, { id: "junior", label: "Junior Stylist" }].map(item => <button aria-pressed={filter === item.id} className={filter === item.id ? "active" : ""} key={item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div>
        <div className="team-minimal-grid">{TEAM.filter(member => filter === "all" || member.category === filter).map((member, i) => <article id={member.slug} key={member.slug} className="team-minimal-person"><ClipReveal delay={i * 0.08} className="team-minimal-photo"><FadeImage src={member.img} alt={`${member.name}, ${member.role} bei Haiyen Hairdesign in Dresden`} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 43vw, 28vw" /></ClipReveal><FadeUp delay={i * 0.05}><h2>{member.name}</h2><p className="team-minimal-role">{member.role}</p><p className="team-minimal-location">{member.location}</p>{member.specialty && <p className="team-minimal-specialty">{member.specialty}</p>}<div className="team-minimal-links">{GALLERY_ITEMS.some(item => item.stylist === member.slug) && <Link className="text-link" href={`/galerie?stylist=${member.slug}`}>Arbeiten <ArrowUpRight size={15} /></Link>}<Link className="text-link" href={member.location.includes("Neustadt") && !member.location.includes("Striesen") ? "/booking?location=neustadt" : member.location.includes("Striesen") && !member.location.includes("&") ? "/booking?location=striesen" : "/booking"}>Termin <ArrowUpRight size={15} /></Link></div></FadeUp></article>)}</div>
      </section>
    </main>
  );
};
export default TeamPageContent;
