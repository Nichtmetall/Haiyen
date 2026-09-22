"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { FadeImage } from "./fade-image";
import { ArrowUpRight } from "lucide-react";
import { GALLERY_ITEMS, TEAM } from "./data";
import { TEAM_IMAGE } from "./salon-images";
import { ScrollImage } from "./animations";
import { SpecialistBadge } from "./specialist-badge";

function memberBookingHref(location: string) {
  const striesen = location.includes("Striesen");
  const neustadt = location.includes("Neustadt");
  if (striesen && neustadt) return "/booking";
  if (neustadt) return "/booking?location=neustadt";
  if (striesen) return "/booking?location=striesen";
  return "/booking";
}

export const TeamPageContent = () => {
  const [filter, setFilter] = useState("all");
  return (
    <main className="team-page">
      <section className="team-hero" aria-labelledby="team-title">
        <div className="team-hero-layout section-shell">
          <div className="team-hero-copy">
            <FadeIn delay={0.05}>
              <p className="eyebrow light">Persönlich für Sie da</p>
            </FadeIn>
            <FadeIn delay={0.16}>
              <h1 id="team-title">Ihr Haar.<br /><em>Unser Team.</em></h1>
            </FadeIn>
            <FadeIn delay={0.28}>
              <p className="team-hero-intro">Hai Yen, Lisa, Anika, Lea-Sophie, Josi und Minh Anh. Sechs Persönlichkeiten für Ihren Lieblingslook – in unseren Friseursalons in Dresden-Striesen und Dresden-Neustadt.</p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="team-hero-actions">
                <Link className="button button-gold" href="/booking">Termin online buchen <ArrowUpRight size={18} aria-hidden="true" /></Link>
                <a className="button button-outline" href="#team-profiles">Die Stylistinnen kennenlernen <ArrowUpRight size={18} aria-hidden="true" /></a>
              </div>
            </FadeIn>
            <FadeIn delay={0.52}>
              <div className="team-hero-note">
                <span>Sechs Persönlichkeiten</span>
                <span>Zwei Salons in Dresden</span>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.22} className="team-hero-visual">
            <figure data-parallax>
              <ScrollImage strength={5} className="team-hero-photo">
                <FadeImage
                  src={TEAM_IMAGE.src}
                  alt={TEAM_IMAGE.alt}
                  fill
                  preload
                  unoptimized
                  sizes="(max-width: 760px) 88vw, (max-width: 1455px) 50vw, 680px"
                />
              </ScrollImage>
            </figure>
          </FadeIn>
        </div>
      </section>
      <section id="team-profiles" className="team-minimal section-shell">
        <FadeIn delay={0.08}>
          <div className="filter-row" aria-label="Team filtern">
            {[{ id: "all", label: "Das ganze Team" }, { id: "master", label: "Masterstylist" }, { id: "top", label: "Topstylist" }, { id: "junior", label: "Junior Stylist" }].map(item => (
              <button aria-pressed={filter === item.id} className={filter === item.id ? "active" : ""} key={item.id} onClick={() => setFilter(item.id)}>{item.label}</button>
            ))}
          </div>
        </FadeIn>
        <div className="team-minimal-grid">
          {TEAM.filter(member => filter === "all" || member.category === filter).map((member, i) => (
            <FadeIn key={member.slug} delay={Math.min(i * 0.08, 0.32)}>
              <article id={member.slug} className="team-minimal-person">
                <div className="team-minimal-photo">
                  <FadeImage src={member.img} alt={`${member.name}, ${member.role} bei Haiyen Hairdesign in Dresden`} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 43vw, 28vw" />
                  {member.badge && <SpecialistBadge badge={member.badge} />}
                </div>
                <h2>{member.name}</h2>
                <p className="team-minimal-role">{member.role}</p>
                <p className="team-minimal-location">{member.location}</p>
                {member.specialty && <p className="team-minimal-specialty">{member.specialty}</p>}
                <div className="team-minimal-links">
                  {GALLERY_ITEMS.some(item => item.stylist === member.slug) && <Link className="text-link" href={`/galerie?stylist=${member.slug}`}>Arbeiten <ArrowUpRight size={15} /></Link>}
                  <Link className="text-link" href={memberBookingHref(member.location)}>Termin <ArrowUpRight size={15} /></Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
};
export default TeamPageContent;
