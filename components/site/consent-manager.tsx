"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Check, MapPinned, ShieldCheck, X } from "lucide-react";

type ConsentSettings = {
  externalMedia: boolean;
  savedAt: string;
  version: 1;
};

type ConsentContextValue = {
  consent: ConsentSettings | null;
  allowExternalMedia: () => void;
  openSettings: () => void;
};

const STORAGE_KEY = "haiyen-consent-v1";
const ConsentContext = createContext<ConsentContextValue | null>(null);

const createSettings = (externalMedia: boolean): ConsentSettings => ({
  externalMedia,
  savedAt: new Date().toISOString(),
  version: 1,
});

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentSettings | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draftExternalMedia, setDraftExternalMedia] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          setBannerOpen(true);
          return;
        }

        const parsed = JSON.parse(stored) as ConsentSettings;
        if (parsed.version !== 1 || typeof parsed.externalMedia !== "boolean") {
          setBannerOpen(true);
          return;
        }

        setConsent(parsed);
        setDraftExternalMedia(parsed.externalMedia);
      } catch {
        setBannerOpen(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSettingsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [settingsOpen]);

  const persist = useCallback((externalMedia: boolean) => {
    const next = createSettings(externalMedia);
    setConsent(next);
    setDraftExternalMedia(externalMedia);
    setBannerOpen(false);
    setSettingsOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // The choice remains active for this visit if browser storage is unavailable.
    }
  }, []);

  const openSettings = useCallback(() => {
    setDraftExternalMedia(consent?.externalMedia ?? false);
    setBannerOpen(false);
    setSettingsOpen(true);
  }, [consent]);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      allowExternalMedia: () => persist(true),
      openSettings,
    }),
    [consent, openSettings, persist],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}

      {bannerOpen && (
        <section
          aria-labelledby="consent-title"
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-5xl rounded-2xl border border-[#C9A96E]/25 bg-[#17342b] p-5 text-[#F5F0E8] shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:inset-x-6 md:bottom-6 md:p-7"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex gap-4">
              <div className="mt-0.5 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C9A96E]/15 text-[#C9A96E] sm:flex">
                <ShieldCheck aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <h2 id="consent-title" className="font-serif text-xl font-semibold md:text-2xl">
                  Deine Privatsphäre, deine Wahl
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F5F0E8]/75">
                  Wir verwenden nur technisch notwendige Speicherung. Google Maps wird erst geladen,
                  wenn du externe Medien erlaubst. Deine Auswahl kannst du jederzeit im Footer ändern.
                </p>
                <div className="mt-3 flex gap-4 text-xs font-semibold text-[#C9A96E]">
                  <Link className="underline-offset-4 hover:underline" href="/datenschutz">
                    Datenschutz
                  </Link>
                  <Link className="underline-offset-4 hover:underline" href="/impressum">
                    Impressum
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 lg:w-[510px]">
              <button
                className="min-h-12 rounded-sm border border-[#F5F0E8]/35 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:border-[#F5F0E8] hover:bg-[#F5F0E8]/10"
                onClick={() => persist(false)}
                type="button"
              >
                Nur notwendige
              </button>
              <button
                className="min-h-12 rounded-sm border border-[#F5F0E8]/35 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:border-[#F5F0E8] hover:bg-[#F5F0E8]/10"
                onClick={openSettings}
                type="button"
              >
                Einstellungen
              </button>
              <button
                className="min-h-12 rounded-sm bg-[#C9A96E] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#17342b] transition-colors hover:bg-[#F5F0E8]"
                onClick={() => persist(true)}
                type="button"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </section>
      )}

      {settingsOpen && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[95] flex items-end justify-center bg-[#10251f]/70 p-3 backdrop-blur-sm md:items-center md:p-6"
          role="dialog"
        >
          <section
            aria-labelledby="privacy-settings-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#F5F0E8] p-6 text-[#2D4A3E] shadow-2xl md:p-9"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A78249]">
                  Consent Management
                </span>
                <h2 id="privacy-settings-title" className="mt-2 font-serif text-3xl font-semibold">
                  Datenschutz-Einstellungen
                </h2>
              </div>
              <button
                aria-label="Einstellungen schließen"
                className="rounded-full p-2 transition-colors hover:bg-[#2D4A3E]/10"
                onClick={() => setSettingsOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#2D4A3E]/70">
              Notwendige Funktionen sind immer aktiv. Externe Inhalte können Daten an Drittanbieter
              übertragen und werden deshalb nur mit deiner Einwilligung geladen.
            </p>

            <div className="mt-7 space-y-3">
              <div className="flex items-start justify-between gap-5 rounded-xl border border-[#2D4A3E]/10 bg-white/60 p-5">
                <div className="flex gap-3">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#A78249]" />
                  <div>
                    <h3 className="font-semibold">Technisch notwendig</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#2D4A3E]/65">
                      Speichert ausschließlich deine Datenschutzauswahl lokal auf diesem Gerät.
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-[#2D4A3E]/50">
                  Immer aktiv
                </span>
              </div>

              <label className="flex cursor-pointer items-start justify-between gap-5 rounded-xl border border-[#2D4A3E]/10 bg-white/60 p-5 transition-colors hover:border-[#C9A96E]/60">
                <div className="flex gap-3">
                  <MapPinned aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#A78249]" />
                  <div>
                    <span className="font-semibold">Externe Medien</span>
                    <p className="mt-1 text-sm leading-relaxed text-[#2D4A3E]/65">
                      Lädt Google Maps. Dabei können Verbindungsdaten an Google übertragen werden.
                    </p>
                  </div>
                </div>
                <input
                  checked={draftExternalMedia}
                  className="mt-1 h-5 w-5 accent-[#2D4A3E]"
                  onChange={(event) => setDraftExternalMedia(event.target.checked)}
                  type="checkbox"
                />
              </label>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                className="min-h-12 rounded-sm border border-[#2D4A3E] px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-[#2D4A3E]/5"
                onClick={() => persist(false)}
                type="button"
              >
                Alle ablehnen
              </button>
              <button
                className="min-h-12 rounded-sm bg-[#2D4A3E] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#F5F0E8] transition-colors hover:bg-[#C9A96E] hover:text-[#2D4A3E]"
                onClick={() => persist(draftExternalMedia)}
                type="button"
              >
                Auswahl speichern
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-[#A78249]">
              <Link className="underline-offset-4 hover:underline" href="/datenschutz">
                Mehr zum Datenschutz
              </Link>
              <Link className="underline-offset-4 hover:underline" href="/impressum">
                Impressum
              </Link>
            </div>
          </section>
        </div>
      )}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent must be used within ConsentProvider");
  return context;
}

type ConsentEmbedProps = {
  className?: string;
  src: string;
  title: string;
};

export function ConsentEmbed({ className = "", src, title }: ConsentEmbedProps) {
  const { consent, allowExternalMedia } = useConsent();

  if (consent?.externalMedia) {
    return (
      <iframe
        allowFullScreen
        className={className}
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        style={{ border: 0 }}
        title={title}
        width="100%"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#EAE2D6] px-6 text-center text-[#2D4A3E]">
      <MapPinned aria-hidden="true" className="h-9 w-9 text-[#A78249]" />
      <p className="mt-4 font-serif text-xl font-semibold">Karte anzeigen</p>
      <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#2D4A3E]/65">
        Mit dem Laden stimmst du der Übertragung von Daten an Google Maps zu.
      </p>
      <button
        className="mt-5 rounded-sm bg-[#2D4A3E] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#F5F0E8] transition-colors hover:bg-[#C9A96E] hover:text-[#2D4A3E]"
        onClick={allowExternalMedia}
        type="button"
      >
        Google Maps erlauben
      </button>
      <Link className="mt-3 text-[10px] font-semibold text-[#A78249] underline-offset-4 hover:underline" href="/datenschutz">
        Datenschutzhinweise
      </Link>
    </div>
  );
}
