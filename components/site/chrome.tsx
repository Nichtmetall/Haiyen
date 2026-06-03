"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sparkles, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type PageKey = "home" | "team" | "prices" | "booking";

const getPageFromPathname = (pathname: string): PageKey => {
  if (pathname.startsWith("/team")) return "team";
  if (pathname.startsWith("/prices")) return "prices";
  if (pathname.startsWith("/booking")) return "booking";
  return "home";
};

const scrollToHash = (hash: string) => {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const useSiteNavigation = (onNavigate?: () => void) => {
  const router = useRouter();
  const pathname = usePathname();

  return (page: PageKey, hash = "") => {
    onNavigate?.();

    if (page === "home" && hash) {
      if (pathname === "/") scrollToHash(hash);
      else router.push(`/#${hash}`);
      return;
    }

    const target = page === "home" ? "/" : `/${page}`;
    router.push(target);
    if (pathname === target) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
};


export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPage = useMemo(() => getPageFromPathname(pathname), [pathname]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const navigateTo = useSiteNavigation(() => setMobileMenuOpen(false));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getHeaderClasses = () => {
    if (mobileMenuOpen) return "bg-[#F5F0E8] text-[#2D4A3E] border-b border-[#2D4A3E]/10";
    if (isScrolled) return "bg-[#F5F0E8]/95 backdrop-blur-md py-4 md:py-6 shadow-sm text-[#2D4A3E]";
    if (currentPage === "booking") return "bg-transparent py-6 md:py-10 text-[#F5F0E8]";
    if (currentPage !== "home") return "bg-transparent py-6 md:py-10 text-[#2D4A3E]";
    return "bg-transparent py-6 md:py-10 text-[#F5F0E8]";
  };

  const navItems = [
    { key: "home", label: "Home" },
    { key: "prices", label: "Preise" },
    { key: "team", label: "Team" },
    { key: "galerie", label: "Galerie", hash: "galerie" },
    { key: "standorte", label: "Standorte", hash: "standorte" },
  ];

  return (
    <div
      className={`font-sans min-h-screen selection:bg-[#C9A96E] selection:text-[#F5F0E8] flex flex-col ${
        currentPage === "booking" ? "bg-[#1a1a1a]" : "bg-[#F5F0E8] text-[#2D4A3E]"
      }`}
    >
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-500 ${getHeaderClasses()}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button onClick={() => navigateTo("home")} className="text-2xl md:text-3xl font-serif tracking-widest uppercase flex flex-col text-left">
            <Image src="/images/haiyen_logo_hell.png" alt="Haiyen Hairdesign" width={200} height={200} />
          </button>

          <nav className="hidden lg:flex items-center gap-12 text-xs tracking-widest uppercase font-bold relative">
            {navItems.map((item) => {
              const isLinkActive =
                (item.key === "home" && !item.hash && currentPage === "home") ||
                (item.key === "prices" && currentPage === "prices") ||
                (item.key === "team" && currentPage === "team");
              return (
                <button
                  key={item.key}
                  onClick={() => navigateTo(item.hash ? "home" : (item.key as PageKey), item.hash)}
                  onMouseEnter={() => setHoveredLink(item.key)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative py-2 transition-colors duration-300 hover:text-[#C9A96E]"
                >
                  <span className="relative z-10">{item.label}</span>
                  {hoveredLink === item.key && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C9A96E]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isLinkActive && !hoveredLink && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                  )}
                </button>
              );
            })}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateTo("booking")}
              className={`px-10 py-4 rounded-sm transition-all duration-300 tracking-widest cursor-pointer ${
                currentPage === "booking" ? "bg-[#F5F0E8] text-[#1a1a1a]" : "bg-[#C9A96E] text-[#F5F0E8] hover:bg-[#2D4A3E]"
              }`}
            >
              Termin
            </motion.button>
          </nav>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X strokeWidth={1} className="w-8 h-8" /> : <Menu strokeWidth={1} className="w-8 h-8" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 w-full bg-[#F5F0E8] border-t border-[#2D4A3E]/10 p-6 flex flex-col gap-6 text-center shadow-lg text-[#2D4A3E] overflow-hidden"
            >
              <button onClick={() => navigateTo("home")} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">
                Home
              </button>
              <button onClick={() => navigateTo("prices")} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">
                Preise
              </button>
              <button onClick={() => navigateTo("team")} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">
                Team
              </button>
              <button onClick={() => navigateTo("home", "galerie")} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">
                Galerie
              </button>
              <button onClick={() => navigateTo("home", "standorte")} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">
                Standorte
              </button>
              <button onClick={() => navigateTo("booking")} className="bg-[#2D4A3E] text-[#F5F0E8] px-6 py-4 rounded-sm tracking-widest font-bold uppercase text-xs mt-2">
                Termin buchen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex-grow">
        {children}
      </motion.div>

      <footer className="bg-[#2D4A3E] text-[#F5F0E8] pt-20 pb-10 md:pt-32 md:pb-16 mt-auto border-t border-[#F5F0E8]/10 relative z-40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="col-span-1 md:col-span-1">
            <button onClick={() => navigateTo("home")} className="text-2xl md:text-3xl font-serif tracking-widest uppercase flex flex-col mb-6 md:mb-8 text-left">
              <span className="font-bold text-[#F5F0E8]">Haiyen</span>
              <span className="text-[0.6rem] tracking-[0.4em] font-sans font-semibold mt-1 text-[#C9A96E]">Hairdesign</span>
            </button>
            <p className="text-[#F5F0E8]/50 font-medium text-sm md:text-base mb-8 md:mb-10">
              Ein Ort der Ruhe.
              <br />
              Dein Friseur in Dresden.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[#F5F0E8]/50 hover:text-[#C9A96E] transition-colors">
                <Sparkles strokeWidth={1} className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#F5F0E8]/50 hover:text-[#C9A96E] transition-colors">
                <Heart strokeWidth={1} className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-xl text-[#C9A96E] mb-6 md:mb-8">Menü</h4>
            <ul className="space-y-4 font-medium text-sm md:text-base text-[#F5F0E8]/70">
              <li>
                <button onClick={() => navigateTo("prices")} className="hover:text-[#F5F0E8] transition-colors">
                  Preise
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("home", "galerie")} className="hover:text-[#F5F0E8] transition-colors">
                  Galerie
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("team")} className="hover:text-[#F5F0E8] transition-colors">
                  Team
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("booking")} className="hover:text-[#F5F0E8] font-bold text-[#C9A96E] transition-colors">
                  Termin buchen
                </button>
              </li>
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
          <div className="flex gap-4 md:gap-8">
            <a href="#" className="hover:text-[#F5F0E8]">
              Impressum
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
