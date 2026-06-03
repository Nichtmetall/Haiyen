"use client";

import React, { useState, useRef } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { Award, Palette, Calendar, Heart, Star, MapPin, ChevronDown } from "lucide-react";
import { TEAM } from "./data";
import { FadeUp, ClipReveal } from "./animations";
import { HeroParallax } from "./hero-parallax";
import { Marquee } from "./marquee";
import { ServicesSection } from "./services-section";
import { HorizontalGallery } from "./horizontal-gallery";
import { ReviewCarousel } from "./review-carousel";

type NavigateTo = (page: string, hash?: string, query?: string) => void;

export const HomePageContent = ({ navigateTo }: { navigateTo: NavigateTo }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredUspIdx, setHoveredUspIdx] = useState<number | null>(null);
  
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsScrollProgress } = useScroll({
    target: stepsContainerRef,
    offset: ["start center", "end center"],
  });
  const stepsScaleY = useTransform(stepsScrollProgress, [0, 1], [0, 1]);

  const usps = [
    {
      num: "01",
      title: "Handwerk",
      subtitle: "10+ Jahre Erfahrung",
      desc: "Unser Meisterbetrieb in Dresden bürgt für vollendetes Friseurhandwerk, ständige Weiterbildung und präzise Schnitttechniken auf internationalem Niveau.",
      icon: <Award strokeWidth={1} />,
      bgImage: "/images/galerie/Lisa/IMG_1153.jpg",
    },
    {
      num: "02",
      title: "Perfektion",
      subtitle: "Farb-Spezialisten",
      desc: "Balayage, Babylights oder Farbveränderungen: Als zertifizierte Color-Experten kreieren wir fließende Übergänge und strahlenden Glanz.",
      icon: <Palette strokeWidth={1} />,
      bgImage: "/images/galerie/Anika/381afdd4-8238-43c8-9d14-86ba273ed2c2.jpg",
    },
    {
      num: "03",
      title: "Komfort",
      subtitle: "Online-Buchung",
      desc: "Keine Warteschleifen. Sichert euch euren Wunschtermin entspannt online in weniger als einer Minute – 24 Stunden am Tag, 7 Tage die Woche.",
      icon: <Calendar strokeWidth={1} />,
      bgImage: "/images/galerie/Josi/IMG_1857.jpg",
    },
    {
      num: "04",
      title: "Auszeit",
      subtitle: "Herzlich & Ruhig",
      desc: "Tretet ein und lasst den Stress hinter euch. Wir bieten euch eine Oase der Ruhe, in der sich alles um euer Wohlbefinden und Entspannung dreht.",
      icon: <Heart strokeWidth={1} />,
      bgImage: "/images/galerie/Josi/IMG_3932.jpg",
    },
  ];

  const FAQS = [
    {
      q: "Wie buche ich einen Termin?",
      a: "Ganz entspannt online über unsere Website, per Telefon oder WhatsApp – an beiden Standorten in Dresden.",
    },
    {
      q: "Muss ich eine Anzahlung leisten?",
      a: "Nein, die Online-Buchung ist für dich völlig kostenlos und unverbindlich.",
    },
    {
      q: "Wie lange dauert eine Balayage-Behandlung?",
      a: "Je nach Haarlänge und gewünschtem Ergebnis nehmen wir uns ca. 2–3 Stunden Zeit für dich.",
    },
    {
      q: "Bietet ihr auch Haarschnitte für Kinder an?",
      a: "Ja, wir heißen auch die Kleinsten in beiden Salons herzlich willkommen.",
    },
  ];

  return (
    <main className="bg-[#F5F0E8]">
      <HeroParallax navigateTo={navigateTo} />
      <Marquee />

      {/* USPs Section */}
      <section className="relative z-20 py-20 md:py-32 px-6 max-w-7xl mx-auto border-b border-[#2D4A3E]/10">
        <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[420px]">
          {usps.map((usp, idx) => {
            const isHovered = hoveredUspIdx === idx;
            const isAnyHovered = hoveredUspIdx !== null;
            
            let flexValue = "1 1 0%";
            if (isAnyHovered) {
              flexValue = isHovered ? "2.2 1 0%" : "0.6 1 0%";
            }
            
            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredUspIdx(idx)}
                onMouseLeave={() => setHoveredUspIdx(null)}
                animate={{ flex: flexValue }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className="relative overflow-hidden rounded-xl border border-[#2D4A3E]/10 bg-white/20 hover:bg-white/40 shadow-sm hover:shadow-md group cursor-pointer flex flex-col justify-between p-8 min-h-[250px] md:min-h-0 transition-colors duration-500"
              >
                {/* Background Image */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0.18 : 0.04,
                    scale: isHovered ? 1.03 : 1.0,
                    filter: isHovered ? "grayscale(0%) contrast(1.05)" : "grayscale(100%) contrast(0.95)"
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ backgroundImage: `url(${usp.bgImage})` }}
                  className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
                />
                
                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div className="flex justify-between items-start w-full">
                    <span className="text-[#C9A96E] font-serif italic text-3xl font-bold">{usp.num}</span>
                    <div className="text-[#C9A96E] p-2.5 bg-[#F5F0E8] rounded-full border border-[#2D4A3E]/5 group-hover:bg-[#2D4A3E] group-hover:text-[#F5F0E8] transition-colors duration-500 shadow-sm">
                      {React.cloneElement(usp.icon, { className: "w-6 h-6" })}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col justify-end text-left">
                    <span className="text-[#C9A96E] uppercase text-[10px] tracking-[0.2em] font-bold block mb-1">
                      {usp.title}
                    </span>
                    <h4 className="font-serif font-bold text-xl md:text-2xl text-[#2D4A3E] mb-2">
                      {usp.subtitle}
                    </h4>
                    
                    {/* Collapsible description on desktop */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? "auto" : 0
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                        delay: isHovered ? 0.15 : 0
                      }}
                      className="overflow-hidden hidden md:block"
                    >
                      <p className="text-[#2D4A3E]/70 text-sm font-medium leading-relaxed mt-2 w-[280px] md:w-[300px]">
                        {usp.desc}
                      </p>
                    </motion.div>
                    
                    {/* Always visible description on mobile */}
                    <p className="text-[#2D4A3E]/70 text-sm font-medium leading-relaxed mt-2 md:hidden">
                      {usp.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <ServicesSection navigateTo={navigateTo} />

      {/* Quote Section with Gruppenbild as Background - Shifted upwards using backgroundPosition: "50% 15%" */}
      <section className="relative h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-parallax animate-fade-in"
          style={{
            backgroundImage: 'url("/images/galerie/Gruppenbild.JPG")',
            backgroundPosition: "center 15%"
          }}
        />
        <div className="absolute inset-0 bg-[#2D4A3E]/65" />
        <FadeUp className="relative z-10 text-center text-[#F5F0E8] px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold italic leading-relaxed md:leading-snug">
            &quot;Schönheit beginnt in dem Moment,
            <br />
            in dem du beschließt, du selbst zu sein.&quot;
          </h2>
          <div className="w-10 h-px bg-[#C9A96E] mx-auto mt-8 opacity-70" />
        </FadeUp>
      </section>

      <HorizontalGallery />

      {/* Team Section */}
      <section id="team" className="py-24 md:py-40 px-6 max-w-7xl mx-auto relative z-10">
        <FadeUp className="text-center mb-16 md:mb-28">
          <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Handwerk & Leidenschaft</span>
          <h2 className="text-4xl md:text-7xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase text-[#2D4A3E]">Das Team</h2>
          <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6" />
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {TEAM.map((member, idx) => (
            <FadeUp key={idx} delay={idx * 0.12} className="flex flex-col group cursor-pointer">
              <div
                onClick={() => navigateTo("galerie", "", `stylist=${member.slug}`)}
                className="aspect-[3/4] overflow-hidden mb-6 md:mb-8 relative bg-white/5 shadow-md rounded-lg"
              >
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8 }}
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A3E]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 text-left">
                  <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-bold">Fokus</span>
                  <p className="text-[#F5F0E8] text-sm font-medium mt-1">{member.specialty}</p>
                </div>
              </div>
              <h3
                onClick={() => navigateTo("galerie", "", `stylist=${member.slug}`)}
                className="text-2xl md:text-3xl font-serif font-bold mb-1.5 text-[#2D4A3E] group-hover:text-[#C9A96E] transition-colors text-left"
              >
                {member.name}
              </h3>
              <p className="text-[#2D4A3E]/60 text-xs font-semibold uppercase tracking-widest text-left">{member.role}</p>

              <button
                onClick={() => navigateTo("galerie", "", `stylist=${member.slug}`)}
                className="text-left text-[10px] uppercase font-bold tracking-widest text-[#C9A96E] hover:text-[#2D4A3E] transition-colors flex items-center gap-1.5 cursor-pointer mt-4 group"
              >
                Galerie ansehen
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="text-center mt-16 md:mt-24">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateTo("team")}
            className="text-xs uppercase font-bold tracking-widest border border-[#2D4A3E] px-10 md:px-12 py-4 md:py-5 hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-all duration-500 cursor-pointer"
          >
            Gesamtes Team kennenlernen
          </motion.button>
        </FadeUp>
      </section>

      {/* Auszeit (Booking Steps) Section */}
      <section className="py-24 md:py-40 bg-[#2D4A3E] text-[#F5F0E8] relative z-20 -mt-12 rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 lg:gap-24 items-start relative">
          <div className="w-full md:w-5/12 relative md:sticky md:top-36 mb-8 md:mb-0">
            <FadeUp>
              <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-bold mb-4 block">Termin-Ablauf</span>
              <h2 className="text-5xl md:text-7xl lg:text-[7.5rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase text-[#C9A96E]">Auszeit</h2>
              <p className="text-[#F5F0E8]/70 font-medium leading-relaxed text-base md:text-lg max-w-sm mb-10">
                In drei einfachen Schritten zu eurem persönlichen Wohlfühlmoment in Dresden Striesen oder der Neustadt.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("booking")}
                className="hidden md:inline-block bg-[#C9A96E] text-[#2D4A3E] px-12 py-5 rounded-sm text-sm uppercase tracking-widest font-bold hover:bg-[#F5F0E8] hover:text-[#2D4A3E] transition-all duration-500 cursor-pointer shadow-lg"
              >
                Jetzt reservieren
              </motion.button>
            </FadeUp>
          </div>

          <div ref={stepsContainerRef} className="w-full md:w-7/12 space-y-16 mt-4 md:mt-0 relative pl-12 md:pl-24 text-left">
            <div className="absolute left-4 md:left-8 top-3 bottom-3 w-[1px] bg-[#F5F0E8]/10" />
            <motion.div
              style={{ scaleY: stepsScaleY }}
              className="absolute left-4 md:left-8 top-3 bottom-3 w-[2px] bg-[#C9A96E] origin-top"
            />

            {[
              {
                num: "01",
                title: "Leistung wählen",
                desc: "Entscheidet euch für Striesen oder Neustadt und wählt euer Treatment. Ob klassischer Schnitt, aufregende Balayage oder intensive Haarpflege.",
              },
              {
                num: "02",
                title: "Termin buchen",
                desc: "Sichert euch euren Wunschtermin rund um die Uhr direkt online in wenigen Sekunden über unser Buchungssystem.",
              },
              {
                num: "03",
                title: "Genießen",
                desc: "Tretet ein, lasst den Alltag hinter euch. Lehnt euch bei einer Tasse Bio-Tee zurück und genießt den Moment, während wir uns um eure Schönheit kümmern.",
              },
            ].map((step, idx) => (
              <FadeUp key={idx} delay={0.1} className="relative group">
                <div className="absolute left-[-32px] md:left-[-64px] -translate-x-1/2 top-1.5 text-xs md:text-sm font-bold font-sans text-[#C9A96E] bg-[#2D4A3E] w-8 md:w-10 h-8 md:h-10 rounded-full border border-[#F5F0E8]/20 group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-[#2D4A3E] flex items-center justify-center transition-all duration-500 select-none z-10 shadow-sm">
                  {step.num}
                </div>
                
                <h3 className="text-2xl md:text-4xl font-serif font-semibold mb-3 mt-1 text-[#F5F0E8] group-hover:text-[#C9A96E] transition-colors duration-300">{step.title}</h3>
                <p className="text-[#F5F0E8]/60 font-medium leading-relaxed text-sm md:text-lg">{step.desc}</p>
              </FadeUp>
            ))}
          </div>

          <div className="w-full md:hidden mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo("booking")}
              className="bg-[#C9A96E] text-[#2D4A3E] px-10 py-4 rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-[#F5F0E8] transition-all duration-300"
            >
              Jetzt reservieren
            </motion.button>
          </div>
        </div>
      </section>

      {/* Stimmen / Reviews Section */}
      <section id="bewertungen" className="relative py-24 md:py-40 px-6 w-full overflow-hidden bg-[#F5F0E8] z-30 -mt-12 rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[15rem] md:text-[32rem] font-serif text-[#2D4A3E]/[0.015] leading-none pointer-events-none select-none">”</div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeUp className="text-center mb-16 md:mb-20 relative z-10">
            <h2 className="text-4xl md:text-7xl lg:text-[8rem] leading-none font-serif font-semibold mb-4 tracking-tighter uppercase text-[#2D4A3E]">Stimmen</h2>
            <p className="text-[#C9A96E] uppercase font-bold tracking-[0.25em] text-xs md:text-sm mt-3">4,7 / 5 Sterne auf Google</p>
            <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6" />
          </FadeUp>
          <FadeUp delay={0.15} className="relative z-10">
            <ReviewCarousel />
          </FadeUp>
        </div>
      </section>

      {/* Locations (Standorte) Section */}
      <section id="standorte" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-20 md:mb-28 text-center">
            <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Willkommen bei uns</span>
            <h2 className="text-4xl md:text-7xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase text-[#2D4A3E]">Standorte</h2>
            <div className="w-px h-16 bg-[#2D4A3E]/20 mx-auto mt-6" />
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <ClipReveal className="group">
              <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden mb-8 md:mb-10 bg-gray-100 relative shadow-md rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.411652750669!2d13.788544!3d51.045437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709c5e316d95955%3A0xc6c7d7b056114eb3!2sBorsbergstra%C3%9Fe%2C%2001309%20Dresden!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) contrast(1.1) brightness(0.95)" }}
                  allowFullScreen
                  loading="lazy"
                  className="group-hover:filter-none transition-all duration-[1200ms] transform group-hover:scale-102 origin-center"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 flex items-center justify-between border-b border-[#2D4A3E]/10 pb-4 text-[#2D4A3E] text-left">
                Dresden Striesen
                <MapPin strokeWidth={1.5} className="w-6 h-6 text-[#C9A96E]" />
              </h3>
              <ul className="space-y-4 font-medium text-[#2D4A3E]/80 mb-10 text-sm md:text-base text-left">
                <li className="flex gap-4">
                  <span className="w-20 text-xs uppercase tracking-widest font-bold text-[#C9A96E] mt-0.5">Adresse</span>
                  <span>Borsbergstraße XX, 01309 Dresden</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-20 text-xs uppercase tracking-widest font-bold text-[#C9A96E] mt-0.5">Telefon</span>
                  <span className="font-bold text-[#2D4A3E]">+49 351 1234567</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-20 text-xs uppercase tracking-widest font-bold text-[#C9A96E] mt-0.5">Zeiten</span>
                  <span>Di - Fr: 09:00 - 19:00 Uhr | Sa: 08:00 - 14:00 Uhr</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("booking", "", "location=striesen")}
                className="text-xs uppercase font-bold tracking-widest border border-[#2D4A3E] px-8 py-4 rounded-sm hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-colors cursor-pointer flex"
              >
                Termin in Striesen buchen
              </motion.button>
            </ClipReveal>

            <ClipReveal delay={0.15} className="group">
              <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden mb-8 md:mb-10 bg-gray-100 relative shadow-md rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.241838600746!2d13.749008!3d51.066922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709cf384400e96b%3A0xc3f6be7baeb33827!2sAlaunstra%C3%9Fe%2C%2001099%20Dresden!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) contrast(1.1) brightness(0.95)" }}
                  allowFullScreen
                  loading="lazy"
                  className="group-hover:filter-none transition-all duration-[1200ms] transform group-hover:scale-102 origin-center"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 flex items-center justify-between border-b border-[#2D4A3E]/10 pb-4 text-[#2D4A3E] text-left">
                Dresden Neustadt
                <MapPin strokeWidth={1.5} className="w-6 h-6 text-[#C9A96E]" />
              </h3>
              <ul className="space-y-4 font-medium text-[#2D4A3E]/80 mb-10 text-sm md:text-base text-left">
                <li className="flex gap-4">
                  <span className="w-20 text-xs uppercase tracking-widest font-bold text-[#C9A96E] mt-0.5">Adresse</span>
                  <span>Alaunstraße XX, 01099 Dresden</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-20 text-xs uppercase tracking-widest font-bold text-[#C9A96E] mt-0.5">Telefon</span>
                  <span className="font-bold text-[#2D4A3E]">+49 351 7654321</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-20 text-xs uppercase tracking-widest font-bold text-[#C9A96E] mt-0.5">Zeiten</span>
                  <span>Di - Fr: 10:00 - 20:00 Uhr | Sa: 09:00 - 15:00 Uhr</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("booking", "", "location=neustadt")}
                className="text-xs uppercase font-bold tracking-widest border border-[#2D4A3E] px-8 py-4 rounded-sm hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-colors cursor-pointer flex"
              >
                Termin in Neustadt buchen
              </motion.button>
            </ClipReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-36 px-6 max-w-4xl mx-auto">
        <FadeUp className="text-center mb-16 md:mb-20">
          <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Häufige Fragen</span>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-[#2D4A3E]">FAQ</h2>
          <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6" />
        </FadeUp>
        <div className="border-t border-[#2D4A3E]/10">
          {FAQS.map((faq, idx) => (
            <FadeUp key={idx} delay={idx * 0.05}>
              <div className="border-b border-[#2D4A3E]/10">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left py-6 md:py-8 flex justify-between items-center focus:outline-none group cursor-pointer"
                >
                  <motion.span
                    animate={{ x: openFaq === idx ? 6 : 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="font-serif font-medium text-xl md:text-2xl group-hover:text-[#C9A96E] transition-colors text-[#2D4A3E]"
                  >
                    {faq.q}
                  </motion.span>
                  <ChevronDown strokeWidth={1.5} className={`w-5 h-5 md:w-6 md:h-6 text-[#C9A96E] shrink-0 transition-transform duration-500 ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-medium text-[#2D4A3E]/70 leading-relaxed pr-6 md:pr-8 pb-8 md:pb-10 text-base md:text-lg text-left">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </main>
  );
};
export default HomePageContent;
