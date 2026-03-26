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
  },
  {
    icon: <Palette strokeWidth={1} className="w-8 h-8" />,
    title: "Colorationen & Balayage",
    desc: "Sanfte Verläufe und kräftige Farben für strahlende Ergebnisse.",
    price: "Ab 60 €",
  },
  {
    icon: <Sparkles strokeWidth={1} className="w-8 h-8" />,
    title: "Hochzeits- & Festfrisuren",
    desc: "Elegantes Styling und Hochsteckfrisuren für den großen Tag.",
    price: "Auf Anfrage",
  },
  {
    icon: <Droplet strokeWidth={1} className="w-8 h-8" />,
    title: "Haarpflege & Treatments",
    desc: "Tiefenpflege und Haarkuren für gesundes, glänzendes Haar.",
    price: "Ab 40 €",
  },
  {
    icon: <Heart strokeWidth={1} className="w-8 h-8" />,
    title: "Nagelpflege",
    desc: "Maniküre und Nageldesign – gepflegt von Kopf bis Fuß.",
    price: "Ab 20 €",
  },
  {
    icon: <Scissors strokeWidth={1} className="w-8 h-8" />,
    title: "Haarverlängerungen",
    desc: "Diskrete, natürlich wirkende Extensions für mehr Volumen.",
    price: "Nach Beratung",
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
  },
  {
    name: "Marco Stein",
    role: "Masterstylist",
    img: "/images/IMG_6402.jpeg",
  },
  {
    name: "Lisa Goßmann",
    role: "Masterstylist",
    img: "/images/IMG_2456.jpeg",
  },
  {
    name: "Anika Weidlich",
    role: "Topstylist",
    img: "/images/IMG_2453.jpeg",
  },
  {
    name: "Minh Anh Cu",
    role: "Juniorstylist (2. Lehrjahr)",
    img: "/images/IMG_6401.jpeg",
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
    ],
  },
  {
    category: "Coloration & Balayage",
    items: [
      { name: "Ansatzfarbe", price: "ab 60 €" },
      { name: "Balayage inkl. Glossing", price: "ab 180 €" },
      { name: "Strähnen", price: "ab 140 €" },
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
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
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
  const yBg = useTransform(scrollY, [0, 1200], [0, 500]);
  const yText = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleBg = useTransform(scrollY, [0, 1000], [1.05, 1.2]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#2D4A3E]">
      <motion.div style={{ y: yBg, scale: scaleBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=2000&q=80")',
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#2D4A3E]/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5F0E8]" />

      <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-10 text-center max-w-7xl px-6 mx-auto mt-20 w-full">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-bold mb-8 block"
        >
          Euer Friseur in Dresden
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-huge font-serif text-[#F5F0E8] font-bold mb-4 md:mb-6 uppercase tracking-tighter"
        >
          Zwei Salons.
          <br />
          <span className="text-[#C9A96E] font-medium italic pr-2 md:pr-4">Ein Gefühl.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-[#F5F0E8] text-base md:text-2xl leading-relaxed mb-10 md:mb-16 max-w-2xl mx-auto font-medium mt-8 md:mt-12"
        >
          Willkommen bei Haiyen Hairdesign – einem Ort der Ruhe und Schönheit. Dein Friseur in Dresden Striesen und Neustadt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
        >
          <button
            onClick={() => navigateTo("booking")}
            className="w-full sm:w-auto bg-[#C9A96E] text-[#F5F0E8] px-10 md:px-14 py-4 md:py-5 rounded-sm text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#2D4A3E] transition-all duration-500"
          >
            Termin buchen
          </button>
          <button
            onClick={() => navigateTo("home", "leistungen")}
            className="w-full sm:w-auto border border-[#F5F0E8]/30 text-[#F5F0E8] px-10 md:px-14 py-4 md:py-5 rounded-sm text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#F5F0E8] hover:text-[#2D4A3E] transition-all duration-500"
          >
            Entdecken
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const MarqueeItems = () => (
  <>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">Wella</h3>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">L&apos;Oréal</h3>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">Olaplex</h3>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">Kérastase</h3>
    <h3 className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase">Dyson</h3>
  </>
);

const Marquee = () => (
  <section className="py-8 md:py-12 border-b border-[#2D4A3E]/10 bg-[#F5F0E8] overflow-hidden flex items-center whitespace-nowrap">
    <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }} className="flex w-max">
      <div className="flex gap-16 md:gap-32 px-8 md:px-16 text-[#2D4A3E]/30">
        {[1, 2, 3].map((set) => (
          <MarqueeItems key={set} />
        ))}
      </div>
      <div className="flex gap-16 md:gap-32 px-8 md:px-16 text-[#2D4A3E]/30">
        {[1, 2, 3].map((set) => (
          <MarqueeItems key={set} />
        ))}
      </div>
    </motion.div>
  </section>
);

const ServicesSection = ({ navigateTo }: { navigateTo: NavigateTo }) => {
  const ref = useRef<HTMLElement>(null);
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
          <div className="w-px h-16 md:h-24 bg-[#C9A96E] mx-auto mt-8 md:mt-16" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 md:gap-y-16">
          {SERVICES.map((s, idx) => (
            <FadeUp key={idx} delay={idx * 0.1}>
              <div className="border-t border-[#2D4A3E]/20 pt-6 md:pt-8 group cursor-pointer relative overflow-hidden" onClick={() => navigateTo("prices")}>
                <div className="absolute inset-0 bg-[#2D4A3E]/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] -z-10" />
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
          <button
            onClick={() => navigateTo("prices")}
            className="border border-[#2D4A3E] text-[#2D4A3E] px-10 md:px-12 py-4 md:py-5 rounded-sm text-xs md:text-sm uppercase font-bold tracking-widest hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-all duration-500"
          >
            Gesamte Preisliste ansehen
          </button>
        </FadeUp>
      </div>
    </section>
  );
};

const HorizontalGallery = () => {
  const targetRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 400]);

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
    <section ref={targetRef} id="galerie" className="relative h-[300vh] bg-[#F5F0E8]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-24 md:top-32 left-6 md:left-24 z-10 pointer-events-none">
          <motion.h2 style={{ y: textY }} className="text-6xl md:text-8xl lg:text-[14rem] leading-none font-serif font-semibold text-[#2D4A3E] opacity-[0.04] tracking-tighter uppercase whitespace-nowrap">
            Inspiration
          </motion.h2>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex gap-4 md:gap-12 pl-6 md:pl-24 items-center h-full w-max">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="relative w-[85vw] md:w-[45vw] shrink-0 aspect-[4/5] md:aspect-[3/4] group overflow-hidden bg-white/5">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src={img}
                alt="Styling"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#2D4A3E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                <Sparkles strokeWidth={1} className="w-8 h-8 md:w-12 md:h-12 text-[#F5F0E8]" />
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

const ReviewCarousel = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const imageIndex = Math.abs(page % REVIEWS.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 1000 : -1000, opacity: 0 }),
  };

  return (
    <div className="relative max-w-5xl mx-auto px-2 md:px-6 h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
      <button onClick={() => paginate(-1)} className="absolute left-2 md:left-0 z-20 p-2 text-[#C9A96E] bg-[#F5F0E8]/80 md:bg-transparent rounded-full hover:text-[#2D4A3E] transition-colors">
        <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
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
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) paginate(1);
              else if (swipe > 10000) paginate(-1);
            }}
            className="absolute w-full px-12 md:px-24 text-center flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            <p className="text-xl md:text-4xl font-serif font-medium italic mb-8 md:mb-12 leading-tight text-[#2D4A3E]">„{REVIEWS[imageIndex].text}“</p>
            <div className="w-12 md:w-16 h-px bg-[#C9A96E] mx-auto mb-4 md:mb-6" />
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
            key={i}
            onClick={() => {
              setPage([i, i > imageIndex ? 1 : -1]);
            }}
            className={`transition-all duration-300 rounded-full ${i === imageIndex ? "w-8 md:w-10 h-2 bg-[#C9A96E]" : "w-2 h-2 bg-[#2D4A3E]/20 hover:bg-[#2D4A3E]/40"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export const TeamPageContent = () => (
  <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 max-w-7xl mx-auto min-h-screen">
    <FadeUp className="text-center mb-16 md:mb-32">
      <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-6 block">Handwerk & Leidenschaft</span>
      <h1 className="text-5xl md:text-8xl lg:text-[9rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase">Das Team</h1>
      <div className="w-px h-16 md:h-24 bg-[#2D4A3E] mx-auto mt-8 md:mt-12" />
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-start">
      {TEAM.map((member, idx) => (
        <FadeUp key={idx} delay={idx * 0.1} className="flex flex-col group">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} className="aspect-[3/4] overflow-hidden mb-6 md:mb-8 relative bg-white/5">
            <Image src={member.img} alt={member.name} width={1000} height={1000} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 group-hover:text-[#C9A96E] transition-colors">{member.name}</h3>
          <p className="text-[#2D4A3E]/60 text-xs font-semibold uppercase tracking-widest">{member.role}</p>
        </FadeUp>
      ))}
    </div>
  </div>
);

export const PricesPageContent = () => (
  <div className="pt-32 md:pt-48 pb-24 md:pb-40 px-6 max-w-4xl mx-auto min-h-screen">
    <FadeUp className="text-center mb-16 md:mb-32">
      <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-6 block">Transparenz</span>
      <h1 className="text-5xl md:text-8xl lg:text-[9rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase">Preise</h1>
      <div className="w-px h-16 md:h-24 bg-[#C9A96E] mx-auto mt-8 md:mt-12" />
    </FadeUp>

    <div className="space-y-16 md:space-y-24">
      {PRICING_DATA.map((category, idx) => (
        <FadeUp key={idx} delay={idx * 0.1}>
          <h2 className="text-2xl md:text-4xl font-serif font-semibold mb-8 md:mb-12 text-[#2D4A3E] border-b border-[#2D4A3E]/10 pb-4 md:pb-6">{category.category}</h2>
          <div className="space-y-6">
            {category.items.map((item, i) => (
              <div key={i} className="flex justify-between items-end group">
                <span className="text-base md:text-xl font-medium text-[#2D4A3E] pr-2 md:pr-4">{item.name}</span>
                <div className="flex-1 border-b border-dotted border-[#2D4A3E]/30 mb-2 mx-2 md:mx-4 group-hover:border-[#C9A96E] transition-colors" />
                <span className="text-base md:text-xl font-semibold text-[#2D4A3E] pl-2 md:pl-4 whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      ))}
    </div>
  </div>
);

export const BookingPageContent = () => (
  <div className="pt-32 md:pt-40 pb-16 md:pb-24 min-h-screen bg-[#1a1a1a] text-[#F5F0E8]">
    <div className="max-w-5xl mx-auto px-4 md:px-6">
      <FadeUp className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-7xl font-serif font-bold mb-4 md:mb-6 text-[#C9A96E]">Deine Auszeit buchen</h1>
        <p className="font-medium text-[#F5F0E8]/60 text-sm md:text-lg">Wähle deinen Standort, Service und Stylisten. Wir freuen uns auf dich.</p>
      </FadeUp>
      <FadeUp delay={0.2}>
        <div className="w-full bg-[#111] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl h-[600px] md:h-[800px] border border-white/10">
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

  return (
    <main className="bg-[#F5F0E8]">
      <HeroParallax navigateTo={navigateTo} />
      <Marquee />

      <section className="relative z-20 py-20 md:py-32 px-6 max-w-7xl mx-auto border-b border-[#2D4A3E]/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 text-center md:text-left">
          {[
            { i: <Award strokeWidth={1} />, t: "10+ Jahre Erfahrung", s: "Meisterbetrieb in Dresden" },
            { i: <Palette strokeWidth={1} />, t: "Farb-Spezialisten", s: "Balayage, Ombré & mehr" },
            { i: <Calendar strokeWidth={1} />, t: "Online-Buchung", s: "Termin in unter 1 Minute" },
            { i: <Heart strokeWidth={1} />, t: "Herzlich & Ruhig", s: "Wohlfühlatmosphäre" },
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

      <ServicesSection navigateTo={navigateTo} />

      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-parallax"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-[#2D4A3E]/50" />
        <FadeUp className="relative z-10 text-center text-[#F5F0E8] px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif font-semibold italic leading-snug">
            &quot;Schönheit beginnt in dem Moment,
            <br />
            in dem du beschließt, du selbst zu sein.&quot;
          </h2>
        </FadeUp>
      </section>

      <HorizontalGallery />

      <section id="team" className="py-24 md:py-48 px-6 max-w-7xl mx-auto relative z-10">
        <FadeUp className="text-center mb-16 md:mb-32">
          <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-6 block">Handwerk & Leidenschaft</span>
          <h2 className="text-5xl md:text-8xl lg:text-[9rem] leading-none font-serif font-semibold mb-6 tracking-tighter uppercase">Das Team</h2>
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
          <button onClick={() => navigateTo("team")} className="text-xs uppercase font-bold tracking-widest border border-[#2D4A3E] px-10 md:px-12 py-4 md:py-5 hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-all duration-500">
            Gesamtes Team kennenlernen
          </button>
        </FadeUp>
      </section>

      <section className="py-24 md:py-48 bg-[#2D4A3E] text-[#F5F0E8] relative z-20 -mt-12 md:-mt-32 rounded-t-3xl md:rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 lg:gap-32 items-start relative">
          <div className="w-full md:w-5/12 relative md:sticky md:top-40 mb-8 md:mb-0">
            <FadeUp>
              <h2 className="text-5xl md:text-7xl lg:text-[8rem] leading-none font-serif font-semibold mb-4 md:mb-8 tracking-tighter uppercase text-[#C9A96E]">Auszeit</h2>
              <p className="text-[#F5F0E8]/70 font-medium leading-relaxed text-base md:text-lg max-w-sm mb-8 md:mb-16">
                In drei einfachen Schritten zu deinem Wohlfühlmoment in Dresden Striesen oder der Neustadt.
              </p>
              <button onClick={() => navigateTo("booking")} className="hidden md:inline-block bg-[#C9A96E] text-[#2D4A3E] px-12 py-5 rounded-sm text-sm uppercase tracking-widest font-bold hover:bg-[#F5F0E8] transition-all duration-300">
                Jetzt reservieren
              </button>
            </FadeUp>
          </div>

          <div className="w-full md:w-7/12 space-y-16 mt-4 md:mt-0">
            {[
              {
                num: "01",
                title: "Leistung wählen",
                desc: "Entscheide dich für Striesen oder Neustadt und wähle dein Treatment. Ob Schnitt, Balayage oder Pflege.",
              },
              {
                num: "02",
                title: "Termin buchen",
                desc: "Sichere dir deinen Wunschtermin online – 24/7 in wenigen Sekunden über unser System.",
              },
              {
                num: "03",
                title: "Genießen",
                desc: "Tritt ein, lass den Alltag hinter dir. Lehn dich zurück, wir kümmern uns um den Rest.",
              },
            ].map((step, idx) => (
              <FadeUp key={idx} delay={0.1} className="relative border-l border-[#F5F0E8]/20 pl-8 md:pl-24">
                <div className="absolute left-0 top-0 w-[2px] h-full bg-[#C9A96E] origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700" />
                <div className="absolute -left-5 md:-left-10 top-0 text-3xl md:text-6xl font-serif font-bold text-[#C9A96E] italic bg-[#2D4A3E] py-2 md:py-4 px-1">{step.num}</div>
                <h3 className="text-2xl md:text-5xl font-serif font-semibold mb-3 md:mb-6 mt-2 md:mt-4">{step.title}</h3>
                <p className="text-[#F5F0E8]/60 font-medium leading-relaxed text-sm md:text-xl">{step.desc}</p>
              </FadeUp>
            ))}
          </div>

          <div className="w-full md:hidden mt-16 text-center">
            <button onClick={() => navigateTo("booking")} className="bg-[#C9A96E] text-[#2D4A3E] px-10 py-4 rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-[#F5F0E8] transition-all duration-300">
              Jetzt reservieren
            </button>
          </div>
        </div>
      </section>

      <section id="bewertungen" className="relative py-24 md:py-48 px-6 w-full overflow-hidden bg-[#F5F0E8] z-30 -mt-12 md:-mt-32 rounded-t-3xl md:rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[40rem] font-serif text-[#2D4A3E]/[0.02] leading-none pointer-events-none select-none">”</div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeUp className="text-center mb-16 md:mb-24 relative z-10">
            <Star className="w-8 h-8 md:w-10 md:h-10 text-[#C9A96E] fill-[#C9A96E] mx-auto mb-6 md:mb-10" />
            <h2 className="text-5xl md:text-8xl lg:text-[8rem] leading-none font-serif font-semibold mb-4 md:mb-6 tracking-tighter uppercase">Stimmen</h2>
            <p className="text-[#2D4A3E]/60 uppercase font-bold tracking-widest text-xs md:text-sm mt-4 md:mt-8">4,7 / 5 Sterne auf Google</p>
          </FadeUp>
          <FadeUp delay={0.2} className="relative z-10">
            <ReviewCarousel />
          </FadeUp>
        </div>
      </section>

      <section id="standorte" className="py-24 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-20 md:mb-40 text-center">
            <h2 className="text-5xl md:text-8xl lg:text-[8rem] leading-none font-serif font-semibold mb-6 md:mb-8 tracking-tighter uppercase">Hier zu finden</h2>
            <div className="w-px h-16 md:h-24 bg-[#2D4A3E] mx-auto mt-8 md:mt-12" />
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            <ClipReveal className="group">
              <div className="aspect-square md:aspect-[16/9] overflow-hidden mb-8 md:mb-12 bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.411652750669!2d13.788544!3d51.045437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709c5e316d95955%3A0xc6c7d7b056114eb3!2sBorsbergstra%C3%9Fe%2C%2001309%20Dresden!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  className="group-hover:filter-none transition-all duration-1000 transform group-hover:scale-105 origin-center"
                />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-6 md:mb-10 flex items-center justify-between border-b border-[#2D4A3E]/10 pb-4 md:pb-6">
                Dresden Striesen <MapPin strokeWidth={1} className="w-6 h-6 md:w-8 md:h-8 text-[#C9A96E]" />
              </h3>
              <ul className="space-y-4 md:space-y-6 font-medium text-[#2D4A3E]/80 mb-8 md:mb-12 text-sm md:text-lg">
                <li className="flex gap-4 md:gap-6">
                  <span className="w-20 md:w-28 text-xs md:text-sm uppercase tracking-widest font-bold text-[#2D4A3E]">Adresse</span> Borsbergstraße XX, 01309 Dresden
                </li>
                <li className="flex gap-4 md:gap-6">
                  <span className="w-20 md:w-28 text-xs md:text-sm uppercase tracking-widest font-bold text-[#2D4A3E]">Telefon</span> +49 351 1234567
                </li>
              </ul>
              <button onClick={() => navigateTo("booking")} className="text-xs md:text-sm uppercase font-bold tracking-widest border border-[#2D4A3E] px-8 md:px-10 py-3 md:py-4 rounded-sm hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-colors">
                Buchen
              </button>
            </ClipReveal>

            <ClipReveal delay={0.2} className="group">
              <div className="aspect-square md:aspect-[16/9] overflow-hidden mb-8 md:mb-12 bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.241838600746!2d13.749008!3d51.066922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4709cf384400e96b%3A0xc3f6be7baeb33827!2sAlaunstra%C3%9Fe%2C%2001099%20Dresden!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  className="group-hover:filter-none transition-all duration-1000 transform group-hover:scale-105 origin-center"
                />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-6 md:mb-10 flex items-center justify-between border-b border-[#2D4A3E]/10 pb-4 md:pb-6">
                Dresden Neustadt <MapPin strokeWidth={1} className="w-6 h-6 md:w-8 md:h-8 text-[#C9A96E]" />
              </h3>
              <ul className="space-y-4 md:space-y-6 font-medium text-[#2D4A3E]/80 mb-8 md:mb-12 text-sm md:text-lg">
                <li className="flex gap-4 md:gap-6">
                  <span className="w-20 md:w-28 text-xs md:text-sm uppercase tracking-widest font-bold text-[#2D4A3E]">Adresse</span> Alaunstraße XX, 01099 Dresden
                </li>
                <li className="flex gap-4 md:gap-6">
                  <span className="w-20 md:w-28 text-xs md:text-sm uppercase tracking-widest font-bold text-[#2D4A3E]">Telefon</span> +49 351 7654321
                </li>
              </ul>
              <button onClick={() => navigateTo("booking")} className="text-xs md:text-sm uppercase font-bold tracking-widest border border-[#2D4A3E] px-8 md:px-10 py-3 md:py-4 rounded-sm hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-colors">
                Buchen
              </button>
            </ClipReveal>
          </div>
        </div>
      </section>

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
                  <ChevronDown strokeWidth={1} className={`w-5 h-5 md:w-6 md:h-6 text-[#C9A96E] shrink-0 transition-transform duration-500 ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
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
