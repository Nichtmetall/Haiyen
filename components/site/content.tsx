"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Calendar,
  MapPin,
  Star,
  Scissors,
  Palette,
  Sparkles,
  Droplet,
  Heart,
  ChevronDown,
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";

const SERVICES = [
  {
    icon: <Scissors strokeWidth={1} className="w-8 h-8" />,
    title: "Haarschnitte & Styling",
    desc: "Präzise Schnitte – abgestimmt auf Haarstruktur, Typ und Alltag.",
    price: "Ab 25 €",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80"
  },
  {
    icon: <Palette strokeWidth={1} className="w-8 h-8" />,
    title: "Colorationen & Balayage",
    desc: "Sanfte Verläufe und kräftige Farben für strahlende Ergebnisse.",
    price: "Ab 60 €",
    image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    icon: <Sparkles strokeWidth={1} className="w-8 h-8" />,
    title: "Hochzeits- & Festfrisuren",
    desc: "Elegantes Styling und Hochsteckfrisuren für den großen Tag.",
    price: "Auf Anfrage",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80"
  },
  {
    icon: <Droplet strokeWidth={1} className="w-8 h-8" />,
    title: "Haarpflege & Treatments",
    desc: "Tiefenpflege und Haarkuren für gesundes, glänzendes Haar.",
    price: "Ab 40 €",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80"
  },
  {
    icon: <Heart strokeWidth={1} className="w-8 h-8" />,
    title: "Nagelpflege",
    desc: "Maniküre und Nageldesign – gepflegt von Kopf bis Fuß.",
    price: "Ab 20 €",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80"
  },
  {
    icon: <Scissors strokeWidth={1} className="w-8 h-8" />,
    title: "Haarverlängerungen",
    desc: "Diskrete, natürlich wirkende Extensions für mehr Volumen.",
    price: "Nach Beratung",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
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

const REVIEWS = [
  {
    text: "Bin total begeistert von meinem neuem Kurzhaarschnitt und werde auf alle Fälle diesen immer wieder hier auffrischen lassen.",
    author: "Marcel",
    loc: "Dresden",
  },
  {
    text: "Gute Beratung,nett freundlich alle.Komme gerne wieder.",
    author: "Kati S.",
    loc: "Dresden",
  },
  {
    text: "Seit Jahren komme ich mit einem Lächeln und wunderschönem Haar aus dem Salon – sympathisches Team und wohltuendes Ambiente!",
    author: "Madelyn",
    loc: "Dresden",
  },
  {
    text: "Spontan angerufen und noch am selben Tag einen Termin bekommen – freundlich, zuvorkommend und absolut empfehlenswert.",
    author: "Andreas P.",
    loc: "Dresden",
  }
];

const TEAM = [
  {
    name: "Hai Yen",
    role: "Inhaberin und Masterstylistin",
    img: "/images/IMG_2452.jpeg",
    specialty: "Balayage-Expertin & Typberatung",
    category: "master",
  },
  {
    name: "Marco Stein",
    role: "Masterstylist",
    img: "/images/IMG_6402.jpeg",
    specialty: "Präzisions-Herrenschnitte & Barbering",
    category: "master",
  },
  {
    name: "Lisa Goßmann",
    role: "Masterstylist",
    img: "/images/IMG_2456.jpeg",
    specialty: "Hochsteckfrisuren & Premium Extensions",
    category: "master",
  },
  {
    name: "Anika Weidlich",
    role: "Topstylist",
    img: "/images/IMG_2453.jpeg",
    specialty: "Kreative Farb- & Strähnentechniken",
    category: "top",
  },
  {
    name: "Minh Anh Cu",
    role: "Juniorstylist (2. Lehrjahr)",
    img: "/images/IMG_6401.jpeg",
    specialty: "Volumen-Styling & Intensiv-Treatments",
    category: "junior",
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
];

const PRICING_DATA = [
  {
    category: "Haarschnitte & Styling",
    items: [
      { name: "Damenhaarschnitt inkl. Styling", price: "ab 65 €" },
      { name: "Herrenhaarschnitt", price: "ab 35 €" },
      { name: "Waschen & Föhnen", price: "ab 30 €" },
      { name: "Kinderhaarschnitt", price: "ab 20 €" },
    ],
  },
  {
    category: "Coloration & Balayage",
    items: [
      { name: "Ansatzfarbe", price: "ab 60 €" },
      { name: "Balayage inkl. Glossing", price: "ab 180 €" },
      { name: "Strähnen komplett", price: "ab 140 €" },
      { name: "Glossing / Abmattierung", price: "ab 40 €" },
    ],
  },
  {
    category: "Pflege & Specials",
    items: [
      { name: "Intensiv-Haarkur", price: "ab 25 €" },
      { name: "Olaplex® Treatment", price: "ab 45 €" },
      { name: "Hochzeitsfrisur inkl. Probe", price: "auf Anfrage" },
      { name: "Haarverlängerung / -verdichtung", price: "nach Beratung" },
    ],
  },
];

type NavigateTo = (page: "home" | "team" | "prices" | "booking", hash?: string) => void;

const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ClipReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
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

const HeroParallax = ({ navigateTo }: { navigateTo: NavigateTo }) => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1200], [0, 350]);
  const yText = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleBg = useTransform(scrollY, [0, 1000], [1.02, 1.12]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#2D4A3E]">
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=2000&q=80")',
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#2D4A3E]/55 mix-blend-multiply z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5F0E8] z-0" />

      <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-10 text-center max-w-7xl px-6 mx-auto mt-20 w-full flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#C9A96E] uppercase text-[10px] md:text-xs font-bold mb-6 md:mb-8 block"
        >
          Euer Friseur in Dresden
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="text-huge font-serif text-[#F5F0E8] font-bold mb-4 md:mb-6 uppercase tracking-tighter"
        >
          <span className="block overflow-hidden py-1">
            <motion.span
              variants={{
                hidden: { y: "110%" },
                visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="inline-block"
            >
              Zwei Salons.
            </motion.span>
          </span>
          <span className="block overflow-hidden py-1">
            <motion.span
              variants={{
                hidden: { y: "110%" },
                visible: { y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-[#C9A96E] font-medium italic pr-2 md:pr-4 inline-block"
            >
              Ein Gefühl.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-[#F5F0E8]/90 text-sm md:text-xl leading-relaxed mb-10 md:mb-12 max-w-xl mx-auto font-medium mt-4"
        >
          Willkommen bei Haiyen Hairdesign – einem Ort der Ruhe und des puren Wohlbefindens in Dresden Striesen & Neustadt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateTo("booking")}
            className="w-full sm:w-auto bg-[#C9A96E] text-[#F5F0E8] px-10 md:px-12 py-4 md:py-5 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#F5F0E8] hover:text-[#2D4A3E] transition-all duration-500 cursor-pointer shadow-lg"
          >
            Termin buchen
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateTo("home", "leistungen")}
            className="w-full sm:w-auto border border-[#F5F0E8]/40 text-[#F5F0E8] px-10 md:px-12 py-4 md:py-5 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#F5F0E8] hover:text-[#2D4A3E] transition-all duration-500 cursor-pointer"
          >
            Entdecken
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Premium Scroll-down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => {
          const el = document.getElementById("leistungen");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#F5F0E8]/50">Scrollen</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#F5F0E8]/40 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-3 bg-[#C9A96E]"
          />
        </div>
      </motion.div>
    </section>
  );
};

const MarqueeItems = () => (
  <>
    <h3 className="text-sm md:text-lg font-sans font-semibold tracking-[0.3em] uppercase">Wella Professionals</h3>
    <span className="text-[#C9A96E]">•</span>
    <h3 className="text-sm md:text-lg font-sans font-semibold tracking-[0.3em] uppercase">L&apos;Oréal Professionnel</h3>
    <span className="text-[#C9A96E]">•</span>
    <h3 className="text-sm md:text-lg font-sans font-semibold tracking-[0.3em] uppercase">Olaplex</h3>
    <span className="text-[#C9A96E]">•</span>
    <h3 className="text-sm md:text-lg font-sans font-semibold tracking-[0.3em] uppercase">Kérastase</h3>
    <span className="text-[#C9A96E]">•</span>
    <h3 className="text-sm md:text-lg font-sans font-semibold tracking-[0.3em] uppercase">Dyson</h3>
    <span className="text-[#C9A96E]">•</span>
  </>
);

const Marquee = () => (
  <section className="py-6 md:py-8 border-y border-[#2D4A3E]/10 bg-[#F5F0E8] overflow-hidden flex items-center whitespace-nowrap mask-marquee relative z-20">
    <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }} className="flex w-max">
      <div className="flex gap-8 md:gap-12 px-4 md:px-6 items-center text-[#2D4A3E]/50">
        {[1, 2].map((set) => (
          <MarqueeItems key={set} />
        ))}
      </div>
      <div className="flex gap-8 md:gap-12 px-4 md:px-6 items-center text-[#2D4A3E]/50">
        {[1, 2].map((set) => (
          <MarqueeItems key={set} />
        ))}
      </div>
    </motion.div>
  </section>
);

const ServicesSection = ({ navigateTo }: { navigateTo: NavigateTo }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBgText = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  const [activeHoveredImage, setActiveHoveredImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={ref}
      id="leistungen"
      onMouseMove={handleMouseMove}
      className="py-24 md:py-40 px-6 w-full overflow-hidden relative bg-[#F5F0E8]"
    >
      {/* Background Floating Text */}
      <motion.div style={{ y: yBgText }} className="absolute z-0 top-1/4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
        <h2 className="text-[5rem] md:text-[12rem] lg:text-[18rem] font-serif font-bold text-[#2D4A3E]/[0.02] leading-none whitespace-nowrap uppercase tracking-tighter">
          Care & Style
        </h2>
      </motion.div>

      {/* Floating Image Preview */}
      <AnimatePresence>
        {activeHoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              position: "fixed",
              left: mousePosition.x + 25,
              top: mousePosition.y + 25,
              pointerEvents: "none",
              zIndex: 50,
            }}
            className="hidden md:block w-56 h-72 overflow-hidden rounded-lg shadow-[0_20px_50px_rgba(45,74,62,0.25)] border border-[#C9A96E]/20 bg-white"
          >
            <img
              src={activeHoveredImage}
              alt="Vorschau"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#2D4A3E]/10" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10">
        <FadeUp className="text-center mb-16 md:mb-28">
          <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Exklusive Behandlungen</span>
          <h2 className="text-4xl md:text-7xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase text-[#2D4A3E]">Services</h2>
          <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6 md:mt-8" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16">
          {SERVICES.map((s, idx) => (
            <FadeUp key={idx} delay={idx * 0.08}>
              <div
                onMouseEnter={() => setActiveHoveredImage(s.image)}
                onMouseLeave={() => setActiveHoveredImage(null)}
                onClick={() => navigateTo("prices")}
                className="border-b border-[#2D4A3E]/15 pb-8 group cursor-pointer relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold group-hover:text-[#C9A96E] transition-colors duration-300 flex items-center gap-3">
                    <span className="text-[#C9A96E] opacity-70 group-hover:opacity-100 transition-opacity duration-300">{s.icon}</span>
                    {s.title}
                  </h3>
                  <span className="text-[#C9A96E] font-bold tracking-wider text-sm mt-1">{s.price}</span>
                </div>
                <p className="text-[#2D4A3E]/70 font-medium mb-5 leading-relaxed pr-6 text-sm md:text-base">{s.desc}</p>
                <div className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 text-[#2D4A3E] group-hover:text-[#C9A96E] transition-colors">
                  Details ansehen 
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="text-center mt-20 md:mt-28">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateTo("prices")}
            className="border border-[#2D4A3E] text-[#2D4A3E] px-10 md:px-12 py-4 md:py-5 rounded-sm text-xs uppercase font-bold tracking-widest hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-all duration-500 cursor-pointer"
          >
            Gesamte Preisliste ansehen
          </motion.button>
        </FadeUp>
      </div>
    </section>
  );
};

const HorizontalGallery = () => {
  const targetRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const updateMaxShift = () => {
      const track = trackRef.current;
      if (!track) return;
      const nextShift = Math.max(0, track.scrollWidth - window.innerWidth);
      setMaxShift(nextShift);
    };

    const rafId = window.requestAnimationFrame(updateMaxShift);
    window.addEventListener("resize", updateMaxShift);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateMaxShift);
    };
  }, []);

  return (
    <section
      ref={targetRef}
      id="galerie"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[300vh] bg-[#F5F0E8]"
    >
      {/* Custom Follow Cursor */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: "fixed",
              left: mousePosition.x - 45,
              top: mousePosition.y - 45,
              pointerEvents: "none",
              zIndex: 50,
            }}
            className="hidden md:flex w-[90px] h-[90px] bg-[#C9A96E]/90 text-[#F5F0E8] rounded-full items-center justify-center text-[10px] uppercase font-bold tracking-widest backdrop-blur-md shadow-lg border border-[#F5F0E8]/20"
          >
            Scrollen
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-24 md:top-32 left-6 md:left-24 z-10 pointer-events-none">
          <motion.h2 style={{ y: textY }} className="text-6xl md:text-8xl lg:text-[14rem] leading-none font-serif font-semibold text-[#2D4A3E] opacity-[0.03] tracking-tighter uppercase whitespace-nowrap">
            Inspiration
          </motion.h2>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-4 md:gap-10 pl-6 md:pl-24 items-center h-full w-max">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="relative w-[85vw] md:w-[40vw] shrink-0 aspect-[4/5] md:aspect-[3/4] group overflow-hidden bg-white/5 shadow-md">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8 }}
                src={img}
                alt="Styling Inspiration"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#2D4A3E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                <Sparkles strokeWidth={1} className="w-8 h-8 md:w-12 md:h-12 text-[#F5F0E8]" />
              </div>
            </div>
          ))}

          <div className="w-[85vw] md:w-[35vw] shrink-0 aspect-[4/5] md:aspect-[3/4] flex flex-col items-center justify-center bg-[#2D4A3E] text-[#F5F0E8] ml-2 md:ml-10 mr-6 md:mr-24 shadow-xl relative overflow-hidden group">
            {/* Background design accents */}
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
            
            <h3 className="text-2xl md:text-3xl font-serif mb-4 text-center z-10 px-6">Lust auf mehr Looks?</h3>
            <p className="text-[#F5F0E8]/60 text-xs md:text-sm font-medium mb-8 text-center max-w-xs z-10 px-6">
              Folgt uns auf Instagram für tägliche Inspirationen und einen Blick hinter die Kulissen.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="inline-flex items-center font-bold gap-3 text-xs md:text-sm tracking-widest uppercase text-[#C9A96E] hover:text-[#F5F0E8] transition-colors z-10"
            >
              Instagram besuchen <ArrowRight className="w-4 h-4 text-[#C9A96E]" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ReviewCarousel = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const imageIndex = Math.abs(page % REVIEWS.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 500 : -500, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 500 : -500, opacity: 0 }),
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 md:px-12 h-[380px] md:h-[400px] flex items-center justify-center overflow-hidden bg-white/30 backdrop-blur-sm rounded-2xl border border-[#2D4A3E]/5 shadow-xl">
      <button onClick={() => paginate(-1)} className="absolute left-4 z-20 p-2 text-[#C9A96E] hover:text-[#2D4A3E] transition-colors cursor-pointer focus:outline-none">
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      <div className="w-full h-full relative flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_: any, { offset, velocity }: PanInfo) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -1000) paginate(1);
              else if (swipe > 1000) paginate(-1);
            }}
            className="absolute w-full px-8 md:px-16 text-center flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Stars */}
            <div className="flex gap-1.5 mb-6 md:mb-8 text-[#C9A96E]">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
                >
                  <Star className="w-4 h-4 md:w-5 h-5 fill-current" />
                </motion.div>
              ))}
            </div>

            <p className="text-lg md:text-3xl font-serif font-medium italic mb-6 md:mb-8 leading-relaxed text-[#2D4A3E] max-w-3xl">
              „{REVIEWS[imageIndex].text}“
            </p>
            <div className="w-8 h-[1px] bg-[#C9A96E] mx-auto mb-4" />
            <p className="uppercase tracking-widest text-xs font-bold text-[#2D4A3E]">{REVIEWS[imageIndex].author}</p>
            <p className="text-[#2D4A3E]/50 text-[10px] mt-1">{REVIEWS[imageIndex].loc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button onClick={() => paginate(1)} className="absolute right-4 z-20 p-2 text-[#C9A96E] hover:text-[#2D4A3E] transition-colors cursor-pointer focus:outline-none">
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      {/* Pagination indicators */}
      <div className="absolute bottom-6 flex justify-center gap-2.5 w-full">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPage([i, i > imageIndex ? 1 : -1]);
            }}
            className={`transition-all duration-300 rounded-full h-1.5 focus:outline-none cursor-pointer ${i === imageIndex ? "w-6 bg-[#C9A96E]" : "w-1.5 bg-[#2D4A3E]/20"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export const TeamPageContent = () => {
  const [filter, setFilter] = useState<"all" | "master" | "top" | "junior">("all");

  const filteredTeam = TEAM.filter(member => filter === "all" || member.category === filter);

  return (
    <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 max-w-7xl mx-auto min-h-screen">
      <FadeUp className="text-center mb-12 md:mb-20">
        <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Handwerk & Leidenschaft</span>
        <h1 className="text-5xl md:text-8xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase text-[#2D4A3E]">Das Team</h1>
        <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6" />
      </FadeUp>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16 md:mb-24">
        {[
          { id: "all", label: "Alle" },
          { id: "master", label: "Masterstylisten" },
          { id: "top", label: "Topstylisten" },
          { id: "junior", label: "Juniorstylisten" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as any)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
              filter === item.id
                ? "bg-[#2D4A3E] border-[#2D4A3E] text-[#F5F0E8] shadow-md"
                : "border-[#2D4A3E]/10 text-[#2D4A3E] hover:border-[#2D4A3E]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-start"
      >
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              key={member.name}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6 md:mb-8 relative bg-white/5 shadow-md">
                <motion.img
                  src={member.img}
                  alt={member.name}
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Custom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A3E]/95 via-[#2D4A3E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 text-left">
                  <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-bold">Schnitt & Style Fokus</span>
                  <p className="text-[#F5F0E8] text-sm font-medium mt-1">{member.specialty}</p>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-1.5 text-[#2D4A3E] group-hover:text-[#C9A96E] transition-colors">{member.name}</h3>
              <p className="text-[#2D4A3E]/60 text-xs font-semibold uppercase tracking-widest">{member.role}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const PricesPageContent = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 max-w-4xl mx-auto min-h-screen">
      <FadeUp className="text-center mb-12 md:mb-20">
        <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Transparenz & Qualität</span>
        <h1 className="text-5xl md:text-8xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase text-[#2D4A3E]">Preise</h1>
        <div className="w-12 h-px bg-[#C9A96E] mx-auto mt-6" />
      </FadeUp>

      {/* Pricing Tabs */}
      <div className="flex justify-center border-b border-[#2D4A3E]/10 pb-4 mb-16 gap-6 md:gap-12 flex-wrap">
        {PRICING_DATA.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className="relative pb-3 text-xs md:text-sm uppercase tracking-wider font-bold cursor-pointer transition-colors"
          >
            <span className={activeTab === index ? "text-[#C9A96E]" : "text-[#2D4A3E]/50 hover:text-[#2D4A3E]"}>
              {category.category}
            </span>
            {activeTab === index && (
              <motion.div
                layoutId="activePricingTab"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#C9A96E]"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {PRICING_DATA[activeTab].items.map((item, i) => (
            <div key={i} className="flex justify-between items-end group py-2">
              <span className="text-lg md:text-xl font-medium text-[#2D4A3E] pr-4 group-hover:text-[#C9A96E] transition-colors">{item.name}</span>
              <div className="flex-1 border-b border-dotted border-[#2D4A3E]/20 mb-2 mx-4 group-hover:border-[#C9A96E]/40 transition-colors" />
              <span className="text-lg md:text-xl font-semibold text-[#2D4A3E] pl-4 whitespace-nowrap group-hover:text-[#C9A96E] transition-colors">{item.price}</span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="text-center mt-20 text-xs md:text-sm text-[#2D4A3E]/60 italic">
        * Alle Preise richten sich nach Zeitaufwand und Haarlänge. Individuelle Angebote erstellen wir gerne nach einer kurzen Beratung.
      </div>
    </div>
  );
};

export const BookingPageContent = () => (
  <div className="pt-32 md:pt-40 pb-16 md:pb-24 min-h-screen bg-[#1a1a1a] text-[#F5F0E8]">
    <div className="max-w-5xl mx-auto px-4 md:px-6">
      <FadeUp className="text-center mb-10 md:mb-16">
        <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Terminbuchung</span>
        <h1 className="text-4xl md:text-7xl font-serif font-bold mb-4 text-[#C9A96E]">Auszeit buchen</h1>
        <p className="font-medium text-[#F5F0E8]/60 text-sm md:text-lg max-w-xl mx-auto">Wählt einfach euren Salon, Stylisten und die gewünschte Leistung aus. Wir freuen uns auf euren Besuch.</p>
      </FadeUp>
      <FadeUp delay={0.2}>
        <div className="w-full bg-[#111] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 h-[600px] md:h-[800px]">
          <iframe
            src="https://d2skjte8udjqxw.cloudfront.net/widget/white-label-widget-2.html?apiKey=-N5fShmP4lBI7cXVuw1a&darkTheme=true"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Online Terminbuchung"
          />
        </div>
      </FadeUp>
    </div>
  </div>
);

export const HomePageContent = ({ navigateTo }: { navigateTo: NavigateTo }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Ref and useScroll hooks for the steps progress line
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsScrollProgress } = useScroll({
    target: stepsContainerRef,
    offset: ["start center", "end center"],
  });
  const stepsScaleY = useTransform(stepsScrollProgress, [0, 1], [0, 1]);

  return (
    <main className="bg-[#F5F0E8]">
      <HeroParallax navigateTo={navigateTo} />
      <Marquee />

      {/* USPs Section */}
      <section className="relative z-20 py-20 md:py-32 px-6 max-w-7xl mx-auto border-b border-[#2D4A3E]/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {[
            { i: <Award strokeWidth={1} />, t: "10+ Jahre Erfahrung", s: "Meisterbetrieb für vollendetes Handwerk" },
            { i: <Palette strokeWidth={1} />, t: "Farb-Spezialisten", s: "Exquisite Balayage & Farbverläufe" },
            { i: <Calendar strokeWidth={1} />, t: "Online-Buchung", s: "Wunschtermin in unter einer Minute" },
            { i: <Heart strokeWidth={1} />, t: "Herzlich & Ruhig", s: "Ein Raum voller Entspannung" },
          ].map((usp, idx) => (
            <FadeUp key={idx} delay={idx * 0.1} className="flex flex-col items-center md:items-start text-center md:text-left p-6 md:p-4 rounded-xl border border-[#2D4A3E]/5 hover:border-[#C9A96E]/30 bg-white/20 hover:bg-white/40 shadow-sm hover:shadow-md transition-all duration-500 group">
              <div className="text-[#C9A96E] mb-5 group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(usp.i, { className: "w-10 h-10 md:w-12 md:h-12" })}
              </div>
              <h4 className="font-serif font-semibold text-xl mb-2 text-[#2D4A3E]">{usp.t}</h4>
              <p className="text-[#2D4A3E]/60 text-sm font-medium leading-relaxed">{usp.s}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <ServicesSection navigateTo={navigateTo} />

      {/* Quote Section */}
      <section className="relative h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-parallax"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-[#2D4A3E]/55" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {TEAM.slice(0, 3).map((member, idx) => (
            <FadeUp key={idx} delay={idx * 0.12} className="flex flex-col group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-6 md:mb-8 relative bg-white/5 shadow-md">
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8 }}
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Subtle Gold / Forest Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A3E]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.2em] font-bold">Fokus</span>
                  <p className="text-[#F5F0E8] text-sm font-medium mt-1">{member.specialty}</p>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-1 text-[#2D4A3E] group-hover:text-[#C9A96E] transition-colors">{member.name}</h3>
              <p className="text-[#2D4A3E]/60 text-xs font-semibold uppercase tracking-widest">{member.role}</p>
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

          <div ref={stepsContainerRef} className="w-full md:w-7/12 space-y-16 mt-4 md:mt-0 relative pl-12 md:pl-24">
            {/* Timeline Vertical Line */}
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
                {/* Timeline Bullet Point */}
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
              <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 flex items-center justify-between border-b border-[#2D4A3E]/10 pb-4 text-[#2D4A3E]">
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
                onClick={() => navigateTo("booking")}
                className="text-xs uppercase font-bold tracking-widest border border-[#2D4A3E] px-8 py-4 rounded-sm hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-colors cursor-pointer"
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
              <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 flex items-center justify-between border-b border-[#2D4A3E]/10 pb-4 text-[#2D4A3E]">
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
                onClick={() => navigateTo("booking")}
                className="text-xs uppercase font-bold tracking-widest border border-[#2D4A3E] px-8 py-4 rounded-sm hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-colors cursor-pointer"
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
