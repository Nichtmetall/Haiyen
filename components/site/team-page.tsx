"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TEAM } from "./data";
import { FadeUp, ClipReveal } from "./animations";

export const TeamPageContent = () => {
  const [filter, setFilter] = useState("all");
  return (
    <main className="team-page section-shell">
      <header className="page-intro"><p className="eyebrow">Persönlich für dich da</p><h1>Dein Haar.<br /><em>Unser Team.</em></h1><p>Hai Yen, Lisa, Anika und Josi. Vier Persönlichkeiten mit einem gemeinsamen Gefühl für deinen Stil.</p></header>
      <section className="team-minimal">
        <div className="filter-row" aria-label="Team filtern">{[{ id: "all", label: "Das ganze Team" }, { id: "master", label: "Masterstylistinnen" }, { id: "top", label: "Stylistinnen" }].map(item => <button aria-pressed={filter === item.id} className={filter === item.id ? "active" : ""} key={item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}</div>
        <div className="team-minimal-grid">{TEAM.filter(member => filter === "all" || member.category === filter).map((member, i) => <article id={member.slug} key={member.slug} className="team-minimal-person"><ClipReveal delay={i * 0.08} className="team-minimal-photo"><Image src={member.img} alt={member.name} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 43vw, 22vw" /></ClipReveal><FadeUp delay={i * 0.05}><h2>{member.name}</h2><p className="team-minimal-role">{member.role}</p><p className="team-minimal-location">{member.location}</p><p className="team-minimal-specialty">{member.specialty}</p><div className="team-minimal-links"><Link className="text-link" href={`/galerie?stylist=${member.slug}`}>Arbeiten <ArrowUpRight size={15} /></Link><Link className="text-link" href={member.location.includes("Neustadt") && !member.location.includes("Striesen") ? "/booking?location=neustadt" : member.location.includes("&") ? "/booking" : "/booking?location=striesen"}>Termin <ArrowUpRight size={15} /></Link></div></FadeUp></article>)}</div>
      </section>
    </main>
  );
};
export default TeamPageContent;
