"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sparkles, Heart, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type PageKey = "home" | "team" | "galerie" | "booking";

const getPageFromPathname = (pathname: string): PageKey => {
  if (pathname.startsWith("/team")) return "team";
  if (pathname.startsWith("/galerie")) return "galerie";
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

  return (page: string, hash = "", query = "") => {
    onNavigate?.();

    if (page === "home" && hash) {
      if (pathname === "/") scrollToHash(hash);
      else router.push(`/#${hash}`);
      return;
    }

    let target = page === "home" ? "/" : `/${page}`;
    if (query) {
      target += `?${query}`;
    }
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
  const [bookingDropdownOpen, setBookingDropdownOpen] = useState(false);
  const navigateTo = useSiteNavigation(() => setMobileMenuOpen(false));

  useEffect(() => {
    // Only scroll to top if there is no hash and no search params
    if (!window.location.hash && !window.location.search) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
    { key: "team", label: "Team" },
    { key: "galerie", label: "Galerie" },
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
            <Image
              src="/images/logos/haiyen_logo_hell.png"
              alt="Haiyen Hairdesign"
              width={808}
              height={246}
              priority
              className="h-12 md:h-14 w-auto"
            />
          </button>

          <nav className="hidden lg:flex items-center gap-12 text-xs tracking-widest uppercase font-bold relative">
            {navItems.map((item) => {
              const isLinkActive =
                (item.key === "home" && !item.hash && currentPage === "home") ||
                (item.key === "team" && currentPage === "team") ||
                (item.key === "galerie" && currentPage === "galerie");
              return (
                <button
                  key={item.key}
                  onClick={() => navigateTo(item.hash ? "home" : item.key, item.hash)}
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

            <div
              className="relative"
              onMouseEnter={() => setBookingDropdownOpen(true)}
              onMouseLeave={() => setBookingDropdownOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setBookingDropdownOpen(!bookingDropdownOpen)}
                className={`px-10 py-4 rounded-sm transition-all duration-300 tracking-widest cursor-pointer flex items-center gap-2 ${
                  currentPage === "booking"
                    ? "bg-[#F5F0E8] text-[#1a1a1a]"
                    : "bg-[#C9A96E] text-[#F5F0E8] hover:bg-[#2D4A3E]"
                }`}
              >
                Buchen
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${bookingDropdownOpen ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {bookingDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-56 rounded-sm bg-[#F5F0E8] border border-[#2D4A3E]/10 shadow-2xl py-2 z-50 text-[#2D4A3E] text-left uppercase tracking-wider font-bold text-[10px]"
                  >
                    <button
                      onClick={() => {
                        setBookingDropdownOpen(false);
                        navigateTo("booking", "", "location=striesen");
                      }}
                      className="w-full px-6 py-3.5 hover:bg-[#2D4A3E]/5 hover:text-[#C9A96E] transition-colors text-left cursor-pointer"
                    >
                      Dresden Striesen
                    </button>
                    <button
                      onClick={() => {
                        setBookingDropdownOpen(false);
                        navigateTo("booking", "", "location=neustadt");
                      }}
                      className="w-full px-6 py-3.5 hover:bg-[#2D4A3E]/5 hover:text-[#C9A96E] transition-colors text-left cursor-pointer"
                    >
                      Dresden Neustadt
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              <button onClick={() => navigateTo("team")} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">
                Team
              </button>
              <button onClick={() => navigateTo("galerie")} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">
                Galerie
              </button>
              <button onClick={() => navigateTo("home", "standorte")} className="text-sm font-bold tracking-widest uppercase hover:text-[#C9A96E]">
                Standorte
              </button>
              
              <div className="flex flex-col gap-2 mt-2">
                <button 
                  onClick={() => navigateTo("booking", "", "location=striesen")} 
                  className="bg-[#2D4A3E] text-[#F5F0E8] px-6 py-4 rounded-sm tracking-widest font-bold uppercase text-xs cursor-pointer hover:bg-[#C9A96E] transition-colors duration-300"
                >
                  Termin Striesen
                </button>
                <button 
                  onClick={() => navigateTo("booking", "", "location=neustadt")} 
                  className="border border-[#2D4A3E] text-[#2D4A3E] px-6 py-4 rounded-sm tracking-widest font-bold uppercase text-xs cursor-pointer hover:bg-[#2D4A3E] hover:text-[#F5F0E8] transition-colors duration-300"
                >
                  Termin Neustadt
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex-grow">
        {children}
      </motion.div>

      {/* Contact Form Section */}
      <section 
        className={`border-t py-20 px-6 relative z-30 transition-colors duration-500 ${
          currentPage === "booking" 
            ? "bg-[#1a1a1a] border-white/10 text-[#F5F0E8]" 
            : "bg-[#F5F0E8] border-[#2D4A3E]/10 text-[#2D4A3E]"
        }`}
      >
        <div className="max-w-xl mx-auto text-center">
          <span className="text-[#C9A96E] tracking-[0.3em] uppercase text-xs font-semibold mb-4 block">Fragen oder Wünsche?</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 uppercase">Kontakt</h2>
          <div className="w-12 h-px bg-[#C9A96E] mx-auto mb-12" />
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("Vielen Dank! Ihre Nachricht wurde (simuliert) gesendet.");
            }}
            className="space-y-6 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ihr Name" 
                  className={`bg-[#2D4A3E]/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors ${
                    currentPage === "booking" ? "text-white border-white/10" : "text-[#2D4A3E] border-[#2D4A3E]/10"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>E-Mail</label>
                <input 
                  type="email" 
                  required 
                  placeholder="Ihre E-Mail-Adresse" 
                  className={`bg-[#2D4A3E]/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors ${
                    currentPage === "booking" ? "text-white border-white/10" : "text-[#2D4A3E] border-[#2D4A3E]/10"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>Telefonnummer</label>
                <input 
                  type="tel" 
                  placeholder="Optional" 
                  className={`bg-[#2D4A3E]/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors ${
                    currentPage === "booking" ? "text-white border-white/10" : "text-[#2D4A3E] border-[#2D4A3E]/10"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>Gewünschter Standort</label>
                <select 
                  className={`bg-[#2D4A3E]/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors cursor-pointer ${
                    currentPage === "booking" ? "text-white border-white/10 bg-[#1a1a1a]" : "text-[#2D4A3E] border-[#2D4A3E]/10 bg-[#F5F0E8]"
                  }`}
                >
                  <option value="striesen">Dresden Striesen (Borsbergstraße)</option>
                  <option value="neustadt">Dresden Neustadt (Alaunstraße)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>Nachricht</label>
              <textarea 
                rows={4} 
                required
                placeholder="Wie können wir Ihnen helfen?" 
                className={`bg-[#2D4A3E]/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors resize-none ${
                  currentPage === "booking" ? "text-white border-white/10" : "text-[#2D4A3E] border-[#2D4A3E]/10"
                }`}
              />
            </div>

            <div className="text-center pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full sm:w-auto px-10 py-4.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                  currentPage === "booking"
                    ? "bg-[#C9A96E] text-[#1a1a1a] hover:bg-white"
                    : "bg-[#2D4A3E] text-[#F5F0E8] hover:bg-[#C9A96E] hover:text-[#2D4A3E]"
                }`}
              >
                Nachricht senden
              </motion.button>
            </div>
          </form>
        </div>
      </section>

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
                <button onClick={() => navigateTo("galerie")} className="hover:text-[#F5F0E8] transition-colors text-left cursor-pointer">
                  Galerie
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("team")} className="hover:text-[#F5F0E8] transition-colors text-left cursor-pointer">
                  Team
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("booking")} className="hover:text-[#F5F0E8] font-bold text-[#C9A96E] transition-colors text-left cursor-pointer">
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
