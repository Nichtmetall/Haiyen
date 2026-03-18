import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Calendar, MapPin, Clock, Star, 
  Scissors, Palette, Sparkles, Droplet, Heart, 
  Phone, MessageCircle, Instagram, Facebook, 
  ChevronDown, ArrowRight, Award, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- DATA ---
const SERVICES = [
  { icon: <Scissors strokeWidth={1} className="w-8 h-8" />, title: 'Haarschnitte & Styling', desc: 'Präzise Schnitte – abgestimmt auf Haarstruktur, Typ und Alltag.', price: 'Ab 25 €' },
  { icon: <Palette strokeWidth={1} className="w-8 h-8" />, title: 'Colorationen & Balayage', desc: 'Sanfte Verläufe und kräftige Farben für strahlende Ergebnisse.', price: 'Ab 60 €' },
  { icon: <Sparkles strokeWidth={1} className="w-8 h-8" />, title: 'Hochzeits- & Festfrisuren', desc: 'Elegantes Styling und Hochsteckfrisuren für den großen Tag.', price: 'Auf Anfrage' },
  { icon: <Droplet strokeWidth={1} className="w-8 h-8" />, title: 'Haarpflege & Treatments', desc: 'Tiefenpflege und Haarkuren für gesundes, glänzendes Haar.', price: 'Ab 40 €' },
  { icon: <Heart strokeWidth={1} className="w-8 h-8" />, title: 'Nagelpflege', desc: 'Maniküre und Nageldesign – gepflegt von Kopf bis Fuß.', price: 'Ab 20 €' },
  { icon: <Scissors strokeWidth={1} className="w-8 h-8" />, title: 'Haarverlängerungen', desc: 'Diskrete, natürlich wirkende Extensions für mehr Volumen.', price: 'Nach Beratung' }
];

const FAQS = [
  { q: 'Wie buche ich einen Termin?', a: 'Ganz entspannt online über unsere Website, per Telefon oder WhatsApp – an beiden Standorten in Dresden.' },
  { q: 'Muss ich eine Anzahlung leisten?', a: 'Nein, die Online-Buchung ist für dich völlig kostenlos und unverbindlich.' },
  { q: 'Wie lange dauert eine Balayage-Behandlung?', a: 'Je nach Haarlänge und gewünschtem Ergebnis nehmen wir uns ca. 2–3 Stunden Zeit für dich.' },
  { q: 'Bietet ihr auch Haarschnitte für Kinder an?', a: 'Ja, wir heißen auch die Kleinsten in beiden Salons herzlich willkommen.' }
];

const REVIEWS = [
  { text: "Absolut toller Salon! Hai Yen hat genau verstanden, was ich mir vorstelle. Das Ergebnis war besser als erwartet.", author: "Sandra M.", loc: "Dresden" },
  { text: "Wunderschöner Balayage, super freundliches Team und faire Preise. Genau der richtige Ort zum Abschalten.", author: "Laura K.", loc: "Dresden Neustadt" },
  { text: "Tolles Ambiente und echte Profis am Werk. Die Beratung war ehrlich und das Treatment hat meine Haare gerettet.", author: "Julia S.", loc: "Dresden Striesen" },
  { text: "Bin seit Jahren Stammkundin. Nirgendwo in Dresden bekommt man so einen perfekten Stufenschnitt wie hier.", author: "Melanie B.", loc: "Dresden" }
];

const TEAM = [
  { name: 'Hai Yen', role: 'Inhaberin & Master Stylist', img: 'https://images.unsplash.com/photo-1580618864180-f6d7d39b81f1?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lukas', role: 'Color Director', img: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=800&q=80' },
  { name: 'Mia', role: 'Top Stylist', img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80' },
  { name: 'David', role: 'Men\'s Specialist', img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sophie', role: 'Balayage Expert', img: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e42?auto=format&fit=crop&w=800&q=80' },
  { name: 'Elena', role: 'Bridal & Styling', img: 'https://images.unsplash.com/photo-1521590832167-7bfcfaa6362f?auto=format&fit=crop&w=800&q=80' }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
];

const PRICING_DATA = [
  { category: "Haarschnitte & Styling", items: [{ name: "Damenhaarschnitt inkl. Styling", price: "ab 65 €" }, { name: "Herrenhaarschnitt", price: "ab 35 €" }, { name: "Waschen & Föhnen", price: "ab 30 €" }] },
  { category: "Coloration & Balayage", items: [{ name: "Ansatzfarbe", price: "ab 60 €" }, { name: "Balayage inkl. Glossing", price: "ab 180 €" }, { name: "Strähnen", price: "ab 140 €" }] },
];

// --- FRAMER MOTION COMPONENTS ---

// 1. Smooth FadeUp
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.9, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// 2. Clip Path Reveal (Curtain effect)
const ClipReveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ clipPath: "inset(100% 0 0 0)" }}
    whileInView={{ clipPath: "inset(0% 0 0 0)" }}
    viewport={{ once: true, margin: "-15%" }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);


// Advanced Parallax Hero
const HeroParallax = ({ navigateTo }) => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1200], [0, 500]);
  const yText = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleBg = useTransform(scrollY, [0, 1000], [1.05, 1.2]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#2D4A3E]">
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=2000&q=80")' }} />
      </motion.div>
      <div className="absolute inset-0 bg-[#2D4A3E]/60 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5F0E8]"></div>
      
      <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-10 text-center max-w-7xl px-6 mx-auto mt-20 w-full">
        <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-bold mb-8 block">
          Euer Friseur in Dresden
        </motion.span>
        
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-huge font-serif text-[#F5F0E8] font-bold mb-4 md:mb-6 uppercase tracking-tighter">
          Zwei Salons.<br /><span className="text-[#C9A96E] font-medium italic pr-2 md:pr-4">Ein Gefühl.</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.4 }} className="text-[#F5F0E8]/80 text-base md:text-2xl leading-relaxed mb-10 md:mb-16 max-w-2xl mx-auto font-medium mt-8 md:mt-12">
          Willkommen bei Haiyen Hairdesign – einem Ort der Ruhe und Schönheit. Dein Friseur in Dresden Striesen und Neustadt.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          <button onClick={() => navigateTo('booking')} className="w-full sm:w-auto bg-[#C9A96E] text-[#F5F0E8] px-10 md:px-14 py-4 md:py-5 rounded-sm text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#2D4A3E] transition-all duration-500">Termin buchen</button>
          <button onClick={() => navigateTo('home', 'leistungen')} className="w-full sm:w-auto border border-[#F5F0E8]/30 text-[#F5F0E8] px-10 md:px-14 py-4 md:py-5 rounded-sm text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#F5F0E8] hover:text-[#2D4A3E] transition-all duration-500">Entdecken</button>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Framer Motion Infinite Marquee (Fixed for all widths)
const MarqueeItems = () => (
  <>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">Wella</h3>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">L'Oréal</h3>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">Olaplex</h3>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">Kérastase</h3>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">Dyson</h3>
  </>
);

const Marquee = () => {
  return (
    <section className="py-8 md:py-12 border-b border-[#2D4A3E]/10 bg-[#F5F0E8] overflow-hidden flex items-center whitespace-nowrap">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        className="flex w-max"
      >
        <div className="flex gap-16 md:gap-32 px-8 md:px-16 text-[#2D4A3E]/30">
          {[1, 2, 3].map((set) => <MarqueeItems key={set} />)}
        </div>
        <div className="flex gap-16 md:gap-32 px-8 md:px-16 text-[#2D4A3E]/30">
          {[1, 2, 3].map((set) => <MarqueeItems key={set} />)}
        </div>
      </motion.div>
    </section>
  );
};

// Services with massive scrolling background typography
const ServicesSection = ({ navigateTo }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBgText = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} id="leistungen" className="py-24 md:py-48 px-6 w-full overflow-hidden relative">
      <motion.div style={{ y: yBgText }} className="absolute z-0 top-1/4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
        <h2 className="text-[5rem] md:text-[12rem] lg:text-[20rem] font-serif font-bold text-[#2D4A3E]/[0.03] leading-none whitespace-nowrap uppercase tracking-tighter">
          Care & Style
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        <FadeUp className="text-center mb-16 md:mb-32">
          <h2 className="text-5xl md:text-8xl lg:text-[9rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase">Menü</h2>
          <div className="w-px h-16 md:h-24 bg-[#C9A96E] mx-auto mt-8 md:mt-16"></div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 md:gap-y-16">
          {SERVICES.map((s, idx) => (
            <FadeUp key={idx} delay={idx * 0.1}>
              <div className="border-t border-[#2D4A3E]/20 pt-6 md:pt-8 group cursor-pointer relative overflow-hidden" onClick={() => navigateTo('prices')}>
                 <div className="absolute inset-0 bg-[#2D4A3E]/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] -z-10"></div>
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold group-hover:text-[#C9A96E] transition-colors duration-300">{s.title}</h3>
                  <span className="text-[#C9A96E] font-bold tracking-wider text-sm">{s.price}</span>
                </div>
                <p className="text-[#2D4A3E]/70 font-medium mb-6 md:mb-8 leading-relaxed pr-4 md:pr-8 text-sm md:text-base">{s.desc}</p>
                <button className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 text-[#2D4A3E] group-hover:text-[#C9A96E] transition-colors">
                  Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.2} className="text-center mt-20 md:mt-40">
          <button onClick={() => navigateTo('prices')} className="border border-[#2D4A3E] text-[#2D4A3E] px-10 md:px-12 py-4 md:py-5 rounded-sm text-xs md:text-sm uppercase font-bold tracking-widest hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-all duration-500">
            Gesamte Preisliste ansehen
          </button>
        </FadeUp>
      </div>
    </section>
  );
};


// Horizontal Scroll Gallery - Fixed logic for accurate end scroll
const HorizontalGallery = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // calc(-100% + 100vw) precisely shifts a w-max container until its right edge hits the right side of the screen!
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <section ref={targetRef} id="galerie" className="relative h-[300vh] bg-[#F5F0E8]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-24 md:top-32 left-6 md:left-24 z-10 pointer-events-none">
          <motion.h2 style={{ y: textY }} className="text-6xl md:text-8xl lg:text-[14rem] leading-none font-serif font-semibold text-[#2D4A3E] opacity-[0.04] tracking-tighter uppercase whitespace-nowrap">
            Inspiration
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-4 md:gap-12 pl-6 md:pl-24 items-center h-full w-max">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="relative w-[85vw] md:w-[45vw] shrink-0 aspect-[4/5] md:aspect-[3/4] group overflow-hidden bg-white/5">
              <motion.img 
                whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} 
                src={img} alt="Styling" 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-[#2D4A3E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                <Instagram strokeWidth={1} className="w-8 h-8 md:w-12 md:h-12 text-[#F5F0E8]" />
              </div>
            </div>
          ))}
          
          <div className="w-[85vw] md:w-[40vw] shrink-0 aspect-[4/5] md:aspect-[3/4] flex flex-col items-center justify-center bg-[#2D4A3E] text-[#F5F0E8] ml-2 md:ml-12 mr-6 md:mr-24">
            <h3 className="text-3xl md:text-4xl font-serif mb-6 text-center">Mehr sehen?</h3>
            <a href="#" className="inline-flex items-center font-bold gap-3 text-xs md:text-sm tracking-widest uppercase text-[#C9A96E] hover:text-[#F5F0E8] transition-colors">
              Instagram besuchen <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// Interactive Drag/Swipe Carousel for Reviews
const ReviewCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % REVIEWS.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  return (
    <div className="relative max-w-5xl mx-auto px-2 md:px-6 h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
      <button onClick={() => paginate(-1)} className="absolute left-2 md:left-0 z-20 p-2 text-[#C9A96E] bg-[#F5F0E8]/80 md:bg-transparent rounded-full hover:text-[#2D4A3E] transition-colors">
        <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
      </button>

      <div className="w-full h-full relative flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) paginate(1);
              else if (swipe > 10000) paginate(-1);
            }}
            className="absolute w-full px-12 md:px-24 text-center flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            <p className="text-xl md:text-5xl font-serif font-medium italic mb-8 md:mb-12 leading-tight text-[#2D4A3E]">„{REVIEWS[imageIndex].text}“</p>
            <div className="w-12 md:w-16 h-px bg-[#C9A96E] mx-auto mb-4 md:mb-6"></div>
            <p className="uppercase tracking-widest text-xs md:text-sm font-bold text-[#2D4A3E]">{REVIEWS[imageIndex].author}</p>
            <p className="text-[#2D4A3E]/60 text-[10px] md:text-xs mt-2">{REVIEWS[imageIndex].loc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button onClick={() => paginate(1)} className="absolute right-2 md:right-0 z-20 p-2 text-[#C9A96E] bg-[#F5F0E8]/80 md:bg-transparent rounded-full hover:text-[#2D4A3E] transition-colors">
        <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
      </button>
      
      <div className="absolute bottom-4 flex justify-center gap-3 md:gap-4 w-full">
        {REVIEWS.map((_, i) => (
          <button 
            key={i} onClick={() => { setPage([i, i > imageIndex ? 1 : -1]) }} 
            className={`transition-all duration-300 rounded-full ${i === imageIndex ? 'w-8 md:w-10 h-2 bg-[#C9A96E]' : 'w-2 h-2 bg-[#2D4A3E]/20 hover:bg-[#2D4A3E]/40'}`} 
          />
        ))}
      </div>
    </div>
  );
};


// --- PAGES ---

const TeamPage = ({ navigateTo }) => (
  <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 max-w-7xl mx-auto min-h-screen">
    <FadeUp className="text-center mb-16 md:mb-32">
      <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-6 block">Handwerk & Leidenschaft</span>
      <h1 className="text-5xl md:text-8xl lg:text-[9rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase">Kollektiv</h1>
      <div className="w-px h-16 md:h-24 bg-[#2D4A3E] mx-auto mt-8 md:mt-12"></div>
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-start">
      {TEAM.map((member, idx) => (
        <FadeUp key={idx} delay={idx * 0.1} className="flex flex-col group">
          <div className="aspect-[3/4] overflow-hidden mb-6 md:mb-8 relative bg-white/5">
            <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 group-hover:text-[#C9A96E] transition-colors">{member.name}</h3>
          <p className="text-[#2D4A3E]/60 text-xs font-semibold uppercase tracking-widest">{member.role}</p>
        </FadeUp>
      ))}
    </div>
  </div>
);

const PricesPage = ({ navigateTo }) => (
  <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 max-w-4xl mx-auto min-h-screen">
    <FadeUp className="text-center mb-16 md:mb-32">
      <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-6 block">Transparenz</span>
      <h1 className="text-5xl md:text-8xl lg:text-[9rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase">Preise</h1>
      <div className="w-px h-16 md:h-24 bg-[#C9A96E] mx-auto mt-8 md:mt-12"></div>
    </FadeUp>

    <div className="space-y-16 md:space-y-24">
      {PRICING_DATA.map((category, idx) => (
        <FadeUp key={idx} delay={idx * 0.1}>
          <h2 className="text-2xl md:text-4xl font-serif font-semibold mb-8 md:mb-12 text-[#2D4A3E] border-b border-[#2D4A3E]/10 pb-4 md:pb-6">{category.category}</h2>
          <div className="space-y-6">
            {category.items.map((item, i) => (
              <div key={i} className="flex justify-between items-end group">
                <span className="text-base md:text-xl font-medium text-[#2D4A3E] pr-2 md:pr-4">{item.name}</span>
                <div className="flex-1 border-b border-dotted border-[#2D4A3E]/30 mb-2 mx-2 md:mx-4 group-hover:border-[#C9A96E] transition-colors"></div>
                <span className="text-base md:text-xl font-semibold text-[#2D4A3E] pl-2 md:pl-4 whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      ))}
    </div>
  </div>
);

const BookingPage = () => (
  <div className="pt-32 md:pt-40 pb-16 md:pb-24 min-h-screen bg-[#1a1a1a] text-[#F5F0E8]">
    <div className="max-w-5xl mx-auto px-4 md:px-6">
      <FadeUp className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-7xl font-serif font-bold mb-4 md:mb-6 text-[#C9A96E]">Deine Auszeit buchen</h1>
        <p className="font-medium text-[#F5F0E8]/60 text-sm md:text-lg">Wähle deinen Standort, Service und Stylisten. Wir freuen uns auf dich.</p>
      </FadeUp>
      <FadeUp delay={0.2}>
        <div className="w-full bg-[#111] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl h-[600px] md:h-[800px] border border-white/10">
          <iframe src="https://d2skjte8udjqxw.cloudfront.net/widget/white-label-widget-2.html?apiKey=-N5fShmP4lBI7cXVuw1a&darkTheme=true" width="100%" height="100%" frameBorder="0" title="Online Terminbuchung"></iframe>
        </div>
      </FadeUp>
    </div>
  </div>
);

const HomePage = ({ navigateTo, openFaq, setOpenFaq }) => {
  return (
    <main className="bg-[#F5F0E8]">
      <HeroParallax navigateTo={navigateTo} />
      <Marquee />

      {/* 3. USP LEISTE */}
      <section className="relative z-20 py-20 md:py-32 px-6 max-w-7xl mx-auto border-b border-[#2D4A3E]/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 text-center md:text-left">
          {[
            { i: <Award strokeWidth={1} />, t: "10+ Jahre Erfahrung", s: "Meisterbetrieb in Dresden" },
            { i: <Palette strokeWidth={1} />, t: "Farb-Spezialisten", s: "Balayage, Ombré & mehr" },
            { i: <Calendar strokeWidth={1} />, t: "Online-Buchung", s: "Termin in unter 1 Minute" },
            { i: <Heart strokeWidth={1} />, t: "Herzlich & Ruhig", s: "Wohlfühlatmosphäre" }
          ].map((usp, idx) => (
            <FadeUp key={idx} delay={idx * 0.1} className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 group">
              <div className="text-[#C9A96E] group-hover:scale-110 transition-transform duration-500">{React.cloneElement(usp.i, { className: "w-10 h-10 md:w-12 md:h-12" })}</div>
              <div>
                <h4 className="font-serif font-semibold text-xl md:text-2xl mb-1 md:mb-2">{usp.t}</h4>
                <p className="text-[#2D4A3E]/60 text-sm md:text-base font-medium">{usp.s}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 4. LEISTUNGSÜBERSICHT */}
      <ServicesSection navigateTo={navigateTo} />

      {/* PARALLAX IMAGE BREAK */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-parallax" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80")' }} />
        <div className="absolute inset-0 bg-[#2D4A3E]/50" />
        <FadeUp className="relative z-10 text-center text-[#F5F0E8] px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif font-semibold italic leading-snug">
            "Schönheit beginnt in dem Moment,<br/>in dem du beschließt, du selbst zu sein."
          </h2>
        </FadeUp>
      </section>

      {/* 5. HORIZONTAL GALLERY */}
      <HorizontalGallery />

      {/* 6. UNSER TEAM */}
      <section id="team" className="py-24 md:py-48 px-6 max-w-7xl mx-auto relative z-10">
        <FadeUp className="text-center mb-16 md:mb-32">
          <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-6 block">Handwerk & Leidenschaft</span>
          <h2 className="text-5xl md:text-8xl lg:text-[9rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase">Kollektiv</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
          {TEAM.slice(0, 3).map((member, idx) => (
            <FadeUp key={idx} delay={idx * 0.15} className="flex flex-col group">
              <div className="aspect-[3/4] overflow-hidden mb-6 md:mb-8 relative bg-white/5">
                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-1 md:mb-2 group-hover:text-[#C9A96E] transition-colors">{member.name}</h3>
              <p className="text-[#2D4A3E]/60 text-xs font-semibold uppercase tracking-widest">{member.role}</p>
            </FadeUp>
          ))}
        </div>
        
        <FadeUp delay={0.4} className="text-center mt-16 md:mt-24">
          <button onClick={() => navigateTo('team')} className="text-xs uppercase font-bold tracking-widest border border-[#2D4A3E] px-10 md:px-12 py-4 md:py-5 hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-all duration-500">
            Gesamtes Team kennenlernen
          </button>
        </FadeUp>
      </section>

      {/* 7. SO FUNKTIONIERT'S (Sticky Editorial Layout - Overlapping Parallax Effect) */}
      <section className="py-24 md:py-48 bg-[#2D4A3E] text-[#F5F0E8] relative z-20 -mt-12 md:-mt-32 rounded-t-3xl md:rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 lg:gap-32 items-start relative">
          
          {/* Sticky Left Column */}
          <div className="w-full md:w-5/12 relative md:sticky md:top-40 mb-8 md:mb-0">
            <FadeUp>
              <h2 className="text-5xl md:text-7xl lg:text-[8rem] leading-none font-serif font-semibold mb-4 md:mb-8 tracking-tighter uppercase text-[#C9A96E]">Auszeit</h2>
              <p className="text-[#F5F0E8]/70 font-medium leading-relaxed text-base md:text-lg max-w-sm mb-8 md:mb-16">
                In drei einfachen Schritten zu deinem Wohlfühlmoment in Dresden Striesen oder der Neustadt.
              </p>
              <button onClick={() => navigateTo('booking')} className="hidden md:inline-block bg-[#C9A96E] text-[#2D4A3E] px-12 py-5 rounded-sm text-sm uppercase tracking-widest font-bold hover:bg-[#F5F0E8] transition-all duration-300">
                Jetzt reservieren
              </button>
            </FadeUp>
          </div>

          {/* Scrolling Right Column */}
          <div className="w-full md:w-7/12 space-y-16 md:space-y-40 mt-4 md:mt-0">
            {[
              { num: '01', title: 'Leistung wählen', desc: 'Entscheide dich für Striesen oder Neustadt und wähle dein Treatment. Ob Schnitt, Balayage oder Pflege.' },
              { num: '02', title: 'Termin buchen', desc: 'Sichere dir deinen Wunschtermin online – 24/7 in wenigen Sekunden über unser System.' },
              { num: '03', title: 'Genießen', desc: 'Tritt ein, lass den Alltag hinter dir. Lehn dich zurück, wir kümmern uns um den Rest.' }
            ].map((step, idx) => (
              <FadeUp key={idx} delay={0.1} className="relative border-l border-[#F5F0E8]/20 pl-8 md:pl-24">
                <div className="absolute left-0 top-0 w-[2px] h-full bg-[#C9A96E] origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700"></div>
                <div className="absolute -left-5 md:-left-10 top-0 text-3xl md:text-6xl font-serif font-bold text-[#C9A96E] italic bg-[#2D4A3E] py-2 md:py-4 px-1">{step.num}</div>
                <h3 className="text-2xl md:text-5xl font-serif font-semibold mb-3 md:mb-6 mt-2 md:mt-4">{step.title}</h3>
                <p className="text-[#F5F0E8]/60 font-medium leading-relaxed text-sm md:text-xl">{step.desc}</p>
              </FadeUp>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="w-full md:hidden mt-16 text-center">
            <button onClick={() => navigateTo('booking')} className="bg-[#C9A96E] text-[#2D4A3E] px-10 py-4 rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-[#F5F0E8] transition-all duration-300">
              Jetzt reservieren
            </button>
          </div>
        </div>
      </section>

      {/* 8. BEWERTUNGEN (Overlapping Parallax Effect) */}
      <section id="bewertungen" className="relative py-24 md:py-48 px-6 w-full overflow-hidden bg-[#F5F0E8] z-30 -mt-12 md:-mt-32 rounded-t-3xl md:rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[40rem] font-serif text-[#2D4A3E]/[0.02] leading-none pointer-events-none select-none">
          ”
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeUp className="text-center mb-16 md:mb-24 relative z-10">
            <Star className="w-8 h-8 md:w-10 md:h-10 text-[#C9A96E] fill-[#C9A96E] mx-auto mb-6 md:mb-10" />
            <h2 className="text-5xl md:text-8xl lg:text-[8rem] leading-none font-serif font-semibold mb-4 md:mb-6 tracking-tighter uppercase">Stimmen</h2>
            <p className="text-[#2D4A3E]/60 uppercase font-bold tracking-widest text-xs md:text-sm mt-4 md:mt-8">4,9 / 5 Sterne auf Google</p>
          </FadeUp>
          <FadeUp delay={0.2} className="relative z-10">
            <ReviewCarousel />
          </FadeUp>
        </div>
      </section>

      {/* 10. STANDORTE */}
      <section id="standorte" className="py-24 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-20 md:mb-40 text-center">
            <h2 className="text-5xl md:text-8xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 md:mb-8 tracking-tighter uppercase">Refugium</h2>
            <div className="w-px h-16 md:h-24 bg-[#2D4A3E] mx-auto mt-8 md:mt-12"></div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            <ClipReveal className="group">
              <div className="aspect-square md:aspect-[16/9] overflow-hidden mb-8 md:mb-12 bg-gray-200 relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.411652750669!2d13.788544!3d51.045437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709c5e316d95955%3A0xc6c7d7b056114eb3!2sBorsbergstra%C3%9Fe%2C%2001309%20Dresden!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde" width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }} allowFullScreen="" loading="lazy" className="group-hover:filter-none transition-all duration-1000 transform group-hover:scale-105 origin-center"></iframe>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-6 md:mb-10 flex items-center justify-between border-b border-[#2D4A3E]/10 pb-4 md:pb-6">
                Dresden Striesen <MapPin strokeWidth={1} className="w-6 h-6 md:w-8 md:h-8 text-[#C9A96E]" />
              </h3>
              <ul className="space-y-4 md:space-y-6 font-medium text-[#2D4A3E]/80 mb-8 md:mb-12 text-sm md:text-lg">
                <li className="flex gap-4 md:gap-6"><span className="w-20 md:w-28 text-xs md:text-sm uppercase tracking-widest font-bold text-[#2D4A3E]">Adresse</span> Borsbergstraße XX, 01309 Dresden</li>
                <li className="flex gap-4 md:gap-6"><span className="w-20 md:w-28 text-xs md:text-sm uppercase tracking-widest font-bold text-[#2D4A3E]">Telefon</span> +49 351 1234567</li>
              </ul>
              <button onClick={() => navigateTo('booking')} className="text-xs md:text-sm uppercase font-bold tracking-widest border border-[#2D4A3E] px-8 md:px-10 py-3 md:py-4 rounded-sm hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-colors">Buchen</button>
            </ClipReveal>

            <ClipReveal delay={0.2} className="group">
              <div className="aspect-square md:aspect-[16/9] overflow-hidden mb-8 md:mb-12 bg-gray-200 relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.241838600746!2d13.749008!3d51.066922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709cf384400e96b%3A0xc3f6be7baeb33827!2sAlaunstra%C3%9Fe%2C%2001099%20Dresden!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde" width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }} allowFullScreen="" loading="lazy" className="group-hover:filter-none transition-all duration-1000 transform group-hover:scale-105 origin-center"></iframe>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-6 md:mb-10 flex items-center justify-between border-b border-[#2D4A3E]/10 pb-4 md:pb-6">
                Dresden Neustadt <MapPin strokeWidth={1} className="w-6 h-6 md:w-8 md:h-8 text-[#C9A96E]" />
              </h3>
              <ul className="space-y-4 md:space-y-6 font-medium text-[#2D4A3E]/80 mb-8 md:mb-12 text-sm md:text-lg">
                <li className="flex gap-4 md:gap-6"><span className="w-20 md:w-28 text-xs md:text-sm uppercase tracking-widest font-bold text-[#2D4A3E]">Adresse</span> Alaunstraße XX, 01099 Dresden</li>
                <li className="flex gap-4 md:gap-6"><span className="w-20 md:w-28 text-xs md:text-sm uppercase tracking-widest font-bold text-[#2D4A3E]">Telefon</span> +49 351 7654321</li>
              </ul>
              <button onClick={() => navigateTo('booking')} className="text-xs md:text-sm uppercase font-bold tracking-widest border border-[#2D4A3E] px-8 md:px-10 py-3 md:py-4 rounded-sm hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-colors">Buchen</button>
            </ClipReveal>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-24 md:py-48 px-6 max-w-4xl mx-auto">
        <FadeUp className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6">Häufige Fragen</h2>
        </FadeUp>
        <div className="border-t border-[#2D4A3E]/20">
          {FAQS.map((faq, idx) => (
            <FadeUp key={idx} delay={idx * 0.05}>
              <div className="border-b border-[#2D4A3E]/20">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full text-left py-6 md:py-8 flex justify-between items-center focus:outline-none group">
                  <span className="font-serif font-medium text-xl md:text-2xl group-hover:text-[#C9A96E] transition-colors">{faq.q}</span>
                  <ChevronDown strokeWidth={1} className={`w-5 h-5 md:w-6 md:h-6 text-[#C9A96E] shrink-0 transition-transform duration-500 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="font-medium text-[#2D4A3E]/70 leading-relaxed pr-6 md:pr-8 pb-8 md:pb-10 text-base md:text-lg">{faq.a}</p>
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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // SEO & Scroll Handling
  useEffect(() => {
    const seoData = {
      home: { title: "Friseur Dresden – Haiyen Hairdesign ✂️ Striesen & Neustadt", desc: "Euer Friseur in Dresden. Haarschnitte, Balayage. ⭐ Online Termin buchen!" },
      team: { title: "Unser Team – Stylisten bei Haiyen Hairdesign", desc: "Lerne unser talentiertes Team aus Friseuren in Dresden kennen." },
      prices: { title: "Preise & Leistungen – Haiyen Hairdesign", desc: "Transparente Preise für Balayage, Colorationen und Pflege." },
      booking: { title: "Termin online buchen – Friseur Haiyen Hairdesign", desc: "Buche jetzt deinen Friseurtermin in Dresden Striesen oder Neustadt online." }
    };
    document.title = seoData[currentPage]?.title || seoData.home.title;
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const navigateTo = (page, hash = '') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    if (hash) {
      setTimeout(() => { document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getHeaderClasses = () => {
    if (mobileMenuOpen) return 'bg-[#F5F0E8] text-[#2D4A3E] border-b border-[#2D4A3E]/10';
    if (isScrolled) return 'bg-[#F5F0E8]/95 backdrop-blur-md py-4 md:py-6 shadow-sm text-[#2D4A3E]';
    if (currentPage === 'booking') return 'bg-transparent py-6 md:py-10 text-[#F5F0E8]';
    if (currentPage !== 'home') return 'bg-transparent py-6 md:py-10 text-[#2D4A3E]';
    return 'bg-transparent py-6 md:py-10 text-[#F5F0E8]';
  };

  return (
    <div className={`font-sans min-h-screen selection:bg-[#C9A96E] selection:text-[#F5F0E8] flex flex-col ${currentPage === 'booking' ? 'bg-[#1a1a1a]' : 'bg-[#F5F0E8] text-[#2D4A3E]'}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
        h1, h2, h3, .font-serif { font-family: 'Playfair Display', serif; }
        body { font-family: 'Montserrat', sans-serif; overflow-x: hidden; }
        .text-huge { font-size: 14vw; line-height: 0.95; }
        @media (min-width: 768px) { .text-huge { font-size: 9rem; } }
        @media (min-width: 1024px) { .text-huge { font-size: 11rem; } }
        .bg-parallax { background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* HEADER */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className={`fixed w-full z-50 transition-all duration-500 ${getHeaderClasses()}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button onClick={() => navigateTo('home')} className="text-2xl md:text-3xl font-serif tracking-widest uppercase flex flex-col text-left">
            <span className="font-bold">Haiyen</span><span className="text-[0.6rem] tracking-[0.4em] font-sans font-semibold mt-1 text-[#C9A96E]">Hairdesign</span>
          </button>
          
          <nav className="hidden lg:flex items-center gap-12 text-xs tracking-widest uppercase font-bold">
            <button onClick={() => navigateTo('home')} className="hover:text-[#C9A96E] transition-colors">Home</button>
            <button onClick={() => navigateTo('prices')} className="hover:text-[#C9A96E] transition-colors">Preise</button>
            <button onClick={() => navigateTo('team')} className="hover:text-[#C9A96E] transition-colors">Team</button>
            <button onClick={() => navigateTo('home', 'galerie')} className="hover:text-[#C9A96E] transition-colors">Galerie</button>
            <button onClick={() => navigateTo('home', 'standorte')} className="hover:text-[#C9A96E] transition-colors">Standorte</button>
            <button onClick={() => navigateTo('booking')} className={`px-10 py-4 rounded-sm transition-all duration-300 tracking-widest ${currentPage === 'booking' ? 'bg-[#F5F0E8] text-[#1a1a1a]' : 'bg-[#C9A96E] text-[#F5F0E8] hover:bg-[#2D4A3E]'}`}>Termin</button>
          </nav>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X strokeWidth={1} className="w-8 h-8" /> : <Menu strokeWidth={1} className="w-8 h-8" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden absolute top-full left-0 w-full bg-[#F5F0E8] border-t border-[#2D4A3E]/10 p-6 flex flex-col gap-6 text-center shadow-lg text-[#2D4A3E] overflow-hidden">
              <button onClick={() => navigateTo('home')} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">Home</button>
              <button onClick={() => navigateTo('prices')} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">Preise</button>
              <button onClick={() => navigateTo('team')} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">Team</button>
              <button onClick={() => navigateTo('home', 'galerie')} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">Galerie</button>
              <button onClick={() => navigateTo('home', 'standorte')} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">Standorte</button>
              <button onClick={() => navigateTo('booking')} className="bg-[#2D4A3E] text-[#F5F0E8] px-6 py-4 rounded-sm tracking-widest font-bold uppercase text-xs mt-2">Termin buchen</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* PAGE CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex-grow">
          {currentPage === 'team' && <TeamPage navigateTo={navigateTo} />}
          {currentPage === 'prices' && <PricesPage navigateTo={navigateTo} />}
          {currentPage === 'booking' && <BookingPage />}
          {currentPage === 'home' && <HomePage navigateTo={navigateTo} openFaq={openFaq} setOpenFaq={setOpenFaq} />}
        </motion.div>
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-[#2D4A3E] text-[#F5F0E8] pt-20 pb-10 md:pt-32 md:pb-16 mt-auto border-t border-[#F5F0E8]/10 relative z-40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="col-span-1 md:col-span-1">
            <button onClick={() => navigateTo('home')} className="text-2xl md:text-3xl font-serif tracking-widest uppercase flex flex-col mb-6 md:mb-8 text-left">
              <span className="font-bold text-[#F5F0E8]">Haiyen</span><span className="text-[0.6rem] tracking-[0.4em] font-sans font-semibold mt-1 text-[#C9A96E]">Hairdesign</span>
            </button>
            <p className="text-[#F5F0E8]/50 font-medium text-sm md:text-base mb-8 md:mb-10">Ein Ort der Ruhe.<br/>Dein Friseur in Dresden.</p>
            <div className="flex gap-6">
              <a href="#" className="text-[#F5F0E8]/50 hover:text-[#C9A96E] transition-colors"><Instagram strokeWidth={1} className="w-6 h-6" /></a>
              <a href="#" className="text-[#F5F0E8]/50 hover:text-[#C9A96E] transition-colors"><Facebook strokeWidth={1} className="w-6 h-6" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-xl text-[#C9A96E] mb-6 md:mb-8">Menü</h4>
            <ul className="space-y-4 font-medium text-sm md:text-base text-[#F5F0E8]/70">
              <li><button onClick={() => navigateTo('prices')} className="hover:text-[#F5F0E8] transition-colors">Preise</button></li>
              <li><button onClick={() => navigateTo('home', 'galerie')} className="hover:text-[#F5F0E8] transition-colors">Galerie</button></li>
              <li><button onClick={() => navigateTo('team')} className="hover:text-[#F5F0E8] transition-colors">Team</button></li>
              <li><button onClick={() => navigateTo('booking')} className="hover:text-[#F5F0E8] font-bold text-[#C9A96E] transition-colors">Termin buchen</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-xl text-[#C9A96E] mb-6 md:mb-8">Striesen</h4>
            <ul className="space-y-4 font-medium text-sm md:text-base text-[#F5F0E8]/70">
              <li>Borsbergstraße XX, 01309 Dresden</li>
              <li className="pt-2 font-bold text-[#F5F0E8]">+49 351 1234567</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-xl text-[#C9A96E] mb-6 md:mb-8">Neustadt</h4>
            <ul className="space-y-4 font-medium text-sm md:text-base text-[#F5F0E8]/70">
              <li>Alaunstraße XX, 01099 Dresden</li>
              <li className="pt-2 font-bold text-[#F5F0E8]">+49 351 7654321</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-10 border-t border-[#F5F0E8]/10 flex justify-between text-[10px] md:text-xs font-bold text-[#F5F0E8]/40 uppercase tracking-widest">
          <p>© 2026 Haiyen Hairdesign</p>
          <div className="flex gap-4 md:gap-8"><a href="#" className="hover:text-[#F5F0E8]">Impressum</a></div>
        </div>
      </footer>
    </div>
  );
}