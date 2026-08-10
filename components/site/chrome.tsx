"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useConsent } from "./consent-manager";

type PageKey = "home" | "team" | "galerie" | "booking" | "legal";

const getPageFromPathname = (pathname: string): PageKey => {
  if (pathname.startsWith("/team")) return "team";
  if (pathname.startsWith("/galerie")) return "galerie";
  if (pathname.startsWith("/booking")) return "booking";
  if (pathname.startsWith("/impressum") || pathname.startsWith("/datenschutz")) return "legal";
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
  const [bookingDropdownOpen, setBookingDropdownOpen] = useState(false);
  const navigateTo = useSiteNavigation(() => setMobileMenuOpen(false));
  const { openSettings } = useConsent();

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const location = String(formData.get("location") ?? "Striesen");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(`Anfrage Website – ${name || "neue Kundin / neuer Kunde"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || "–"}\nStandort: ${location}\n\nNachricht:\n${message}`,
    );
    window.location.href = `mailto:info@haiyen-hairdesign.de?subject=${subject}&body=${body}`;
  };

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
    if (mobileMenuOpen) return "bg-[#111]/85 text-[#F5F0E8] border-b border-white/10 backdrop-blur-xl";
    if (isScrolled) return "bg-[#111]/80 backdrop-blur-xl py-4 md:py-6 shadow-lg shadow-black/10 border-b border-white/10 text-[#F5F0E8]";
    if (currentPage === "booking" || currentPage === "legal") return "bg-transparent py-6 md:py-10 text-[#F5F0E8]";
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
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-sm bg-[#F5F0E8] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#2D4A3E] shadow-lg transition-transform focus:translate-y-0"
      >
        Zum Inhalt springen
      </a>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-500 ${getHeaderClasses()}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button onClick={() => navigateTo("home")} className="flex shrink-0 flex-col text-left" aria-label="Haiyen Hairdesign – Startseite">
            <Image className="h-auto w-[108px] md:w-[132px]" src="/images/logos/haiyen_logo_hell.png" alt="Haiyen Hairdesign" width={808} height={246} priority />
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
                  aria-current={isLinkActive ? "page" : undefined}
                  onClick={() => navigateTo(item.hash ? "home" : item.key, item.hash)}
                  className={`nav-link-sweep relative py-2 transition-colors duration-300 hover:text-[#C9A96E] ${isLinkActive ? "is-active" : ""}`}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}

            <div
              className="relative"
              onMouseEnter={() => setBookingDropdownOpen(true)}
              onMouseLeave={() => setBookingDropdownOpen(false)}
            >
              <motion.button
                aria-expanded={bookingDropdownOpen}
                aria-haspopup="menu"
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

          <button aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"} className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X aria-hidden="true" strokeWidth={1} className="w-8 h-8" /> : <Menu aria-hidden="true" strokeWidth={1} className="w-8 h-8" />}
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

      <motion.div id="main-content" key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex-grow">
        {children}
      </motion.div>

      {/* Contact Form Section */}
      {currentPage !== "legal" && (
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
            onSubmit={handleContactSubmit}
            className="space-y-6 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="contact-name" className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>Name</label>
                <input 
                  id="contact-name"
                  name="name"
                  type="text" 
                  required 
                  placeholder="Ihr Name" 
                  className={`bg-[#2D4A3E]/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors ${
                    currentPage === "booking" ? "text-white border-white/10" : "text-[#2D4A3E] border-[#2D4A3E]/10"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact-email" className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>E-Mail</label>
                <input 
                  id="contact-email"
                  name="email"
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
                <label htmlFor="contact-phone" className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>Telefonnummer</label>
                <input 
                  id="contact-phone"
                  name="phone"
                  type="tel" 
                  placeholder="Optional" 
                  className={`bg-[#2D4A3E]/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors ${
                    currentPage === "booking" ? "text-white border-white/10" : "text-[#2D4A3E] border-[#2D4A3E]/10"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact-location" className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>Gewünschter Standort</label>
                <select 
                  id="contact-location"
                  name="location"
                  className={`bg-[#2D4A3E]/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors cursor-pointer ${
                    currentPage === "booking" ? "text-white border-white/10 bg-[#1a1a1a]" : "text-[#2D4A3E] border-[#2D4A3E]/10 bg-[#F5F0E8]"
                  }`}
                >
                  <option value="Dresden Striesen">Dresden Striesen (Borsbergstraße)</option>
                  <option value="Dresden Neustadt">Dresden Neustadt (Bautzner Straße)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="contact-message" className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${currentPage === "booking" ? "text-white/60" : "text-[#2D4A3E]/60"}`}>Nachricht</label>
              <textarea 
                id="contact-message"
                name="message"
                rows={4} 
                required
                placeholder="Wie können wir Ihnen helfen?" 
                className={`bg-[#2D4A3E]/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors resize-none ${
                  currentPage === "booking" ? "text-white border-white/10" : "text-[#2D4A3E] border-[#2D4A3E]/10"
                }`}
              />
            </div>

            <p className={`text-xs leading-relaxed ${currentPage === "booking" ? "text-white/45" : "text-[#2D4A3E]/55"}`}>
              Beim Klick wird eine E-Mail in deinem E-Mail-Programm vorbereitet. Diese Website speichert deine Angaben nicht. Mehr dazu im{" "}
              <Link className="font-semibold text-[#A78249] underline-offset-4 hover:underline" href="/datenschutz">Datenschutz</Link>.
            </p>

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
                E-Mail vorbereiten
              </motion.button>
            </div>
          </form>
        </div>
      </section>
      )}

      <footer className="bg-[#2D4A3E] text-[#F5F0E8] pt-20 pb-10 md:pt-32 md:pb-16 mt-auto border-t border-[#F5F0E8]/10 relative z-40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="col-span-1 md:col-span-1">
            <button onClick={() => navigateTo("home")} className="text-2xl md:text-3xl font-serif tracking-widest uppercase flex flex-col mb-6 md:mb-8 text-left">
              <span className="font-bold text-[#F5F0E8]">Haiyen</span>
              <span className="text-[0.6rem] tracking-[0.4em] font-sans font-semibold mt-1 text-[#C9A96E]">Hairdesign</span>
            </button>
            <p className="text-[#F5F0E8]/50 font-medium text-sm md:text-base">
              Ein Ort der Ruhe.
              <br />
              Dein Friseur in Dresden.
            </p>
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
              <li><a className="hover:text-white" href="https://www.google.com/maps/search/?api=1&query=Borsbergstra%C3%9Fe+21%2C+01309+Dresden" rel="noreferrer" target="_blank">Borsbergstraße 21<br />01309 Dresden</a></li>
              <li className="pt-2 font-bold text-[#F5F0E8]"><a className="hover:text-[#C9A96E]" href="tel:+4935132322434">0351 323 22 434</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-xl text-[#C9A96E] mb-6 md:mb-8">Neustadt</h4>
            <ul className="space-y-4 font-medium text-sm md:text-base text-[#F5F0E8]/70">
              <li><a className="hover:text-white" href="https://www.google.com/maps/search/?api=1&query=Bautzner+Stra%C3%9Fe+46%2C+01099+Dresden" rel="noreferrer" target="_blank">Bautzner Straße 46<br />01099 Dresden</a></li>
              <li className="pt-2 font-bold text-[#F5F0E8]"><a className="hover:text-[#C9A96E]" href="tel:+493517926654">0351 792 66 54</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-10 border-t border-[#F5F0E8]/10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between text-[10px] md:text-xs font-bold text-[#F5F0E8]/40 uppercase tracking-widest">
          <p>© 2026 Haiyen Hairdesign</p>
          <div className="flex flex-wrap gap-4 md:gap-8">
            <Link href="/impressum" className="hover:text-[#F5F0E8]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[#F5F0E8]">
              Datenschutz
            </Link>
            <button onClick={openSettings} type="button" className="inline-flex items-center gap-1.5 hover:text-[#F5F0E8]">
              <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </footer>

      {isScrolled && currentPage !== "booking" && currentPage !== "legal" && (
        <button
          onClick={() => navigateTo("booking")}
          type="button"
          className="fixed bottom-4 left-4 right-4 z-40 min-h-14 rounded-sm bg-[#C9A96E] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#17342b] shadow-[0_12px_35px_rgba(0,0,0,0.3)] transition-colors hover:bg-[#F5F0E8] lg:hidden"
        >
          Termin online buchen
        </button>
      )}
    </div>
  );
}
