"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeImage } from "./fade-image";
import { ArrowUpRight } from "lucide-react";
import { GALLERY_ITEMS, TEAM } from "./data";
import { TEAM_IMAGE } from "./salon-images";
import { FadeIn } from "@/components/FadeIn";

export const TeamPageContent = () => {
  const [filter, setFilter] = useState("all");
  return (
    <main className="team-page section-shell">
      <header className="page-intro">
        <FadeIn delay={0.08}><p className="eyebrow">Persönlich für dich da</p></FadeIn>
        <FadeIn delay={0.2}><h1>Dein Haar.<br /><em>Unser Team.</em></h1></FadeIn>
        <FadeIn delay={0.34}><p>Hai Yen, Lisa, Anika, Lea-Sophie, Josi und Minh Anh. Sechs Persönlichkeiten für deinen Lieblingslook – in unseren Friseursalons in Dresden-Striesen und Dresden-Neustadt.</p></FadeIn>
      </header>
      <FadeIn delay={0.22}>
        <figure className="team-page-group"><FadeImage src={TEAM_IMAGE.src} alt={TEAM_IMAGE.alt} width={1800} height={1800} sizes="(max-width: 760px) 88vw, 720px" /><figcaption>Haiyen Hairdesign · Dein Friseurteam in Dresden</figcaption></figure>
      </FadeIn>
      <section className="team-minimal">
        <FadeIn delay={0.08}>
          <div className="filter-row" aria-label="Team filtern">{[{ id: "all", label: "Das ganze Team" }, { id: "master", label: "Masterstylist" }, { id: "top", label: "Topstylist" }, { id: "junior", label: "Junior Stylist" }].map(item => <button aria-pressed={filter === item.id} className={filter === item.id ? "active" : ""} key={item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div>
        </FadeIn>
        <div className="team-minimal-grid">{TEAM.filter(member => filter === "all" || member.category === filter).map((member, i) => (
          <article id={member.slug} key={member.slug} className="team-minimal-person">
            <FadeIn delay={(i % 3) * 0.1} className="team-minimal-photo">
              <FadeImage src={member.img} alt={`${member.name}, ${member.role} bei Haiyen Hairdesign in Dresden`} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 43vw, 28vw" />
            </FadeIn>
            <FadeIn delay={(i % 3) * 0.1 + 0.1}>
              <h2>{member.name}</h2>
              <p className="team-minimal-role">{member.role}</p>
              <p className="team-minimal-location">{member.location}</p>
              {member.specialty && <p className="team-minimal-specialty">{member.specialty}</p>}
              <div className="team-minimal-links">
                {GALLERY_ITEMS.some(item => item.stylist === member.slug) && <Link className="text-link" href={`/galerie?stylist=${member.slug}`}>Arbeiten <ArrowUpRight size={15} /></Link>}
                <Link className="text-link" href={member.location.includes("Neustadt") && !member.location.includes("Striesen") ? "/booking?location=neustadt" : member.location.includes("Striesen") && !member.location.includes("&") ? "/booking?location=striesen" : "/booking"}>Termin <ArrowUpRight size={15} /></Link>
              </div>
            </FadeIn>
          </article>
        ))}</div>
      </section>
    </main>
  );
};
export default TeamPageContent;
