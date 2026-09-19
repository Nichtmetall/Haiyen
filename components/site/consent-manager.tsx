"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
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
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-5xl rounded-2xl border border-[#C9A96E]/25 bg-[#30221c] p-5 text-[#F5F0E8] shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:inset-x-6 md:bottom-6 md:p-7"
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
                  Wir verwenden nur technisch notwendige Speicherung. Google Maps und die
                  Online-Terminbuchung von Planity werden erst geladen, wenn du externe Medien erlaubst.
                  Deine Auswahl kannst du jederzeit im Footer ändern.
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
                className="min-h-12 rounded-sm bg-[#C9A96E] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#30221c] transition-colors hover:bg-[#F5F0E8]"
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
          className="fixed inset-0 z-[95] flex items-end justify-center bg-[#211813]/70 p-3 backdrop-blur-sm md:items-center md:p-6"
          role="dialog"
        >
          <section
            aria-labelledby="privacy-settings-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#F5F0E8] p-6 text-[#3b2c26] shadow-2xl md:p-9"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#82663b]">
                  Consent Management
                </span>
                <h2 id="privacy-settings-title" className="mt-2 font-serif text-3xl font-semibold">
                  Datenschutz-Einstellungen
                </h2>
              </div>
              <button
                aria-label="Einstellungen schließen"
                className="rounded-full p-2 transition-colors hover:bg-[#3b2c26]/10"
                onClick={() => setSettingsOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#3b2c26]/70">
              Notwendige Funktionen sind immer aktiv. Externe Inhalte können Daten an Drittanbieter
              übertragen und werden deshalb nur mit deiner Einwilligung geladen.
            </p>

            <div className="mt-7 space-y-3">
              <div className="flex items-start justify-between gap-5 rounded-xl border border-[#3b2c26]/10 bg-white/60 p-5">
                <div className="flex gap-3">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#82663b]" />
                  <div>
                    <h3 className="font-semibold">Technisch notwendig</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#3b2c26]/65">
                      Speichert ausschließlich deine Datenschutzauswahl lokal auf diesem Gerät.
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-[#3b2c26]/70">
                  Immer aktiv
                </span>
              </div>

              <label className="flex cursor-pointer items-start justify-between gap-5 rounded-xl border border-[#3b2c26]/10 bg-white/60 p-5 transition-colors hover:border-[#C9A96E]/60">
                <div className="flex gap-3">
                  <MapPinned aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#82663b]" />
                  <div>
                    <span className="font-semibold">Externe Medien</span>
                    <p className="mt-1 text-sm leading-relaxed text-[#3b2c26]/65">
                      Lädt Google Maps und die Terminbuchung von Planity. Dabei können
                      Verbindungsdaten an Google und Planity übertragen werden.
                    </p>
                  </div>
                </div>
                <input
                  checked={draftExternalMedia}
                  className="mt-1 h-5 w-5 accent-[#3b2c26]"
                  onChange={(event) => setDraftExternalMedia(event.target.checked)}
                  type="checkbox"
                />
              </label>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                className="min-h-12 rounded-sm border border-[#3b2c26] px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-[#3b2c26]/5"
                onClick={() => persist(false)}
                type="button"
              >
                Alle ablehnen
              </button>
              <button
                className="min-h-12 rounded-sm bg-[#3b2c26] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#F5F0E8] transition-colors hover:bg-[#C9A96E] hover:text-[#3b2c26]"
                onClick={() => persist(draftExternalMedia)}
                type="button"
              >
                Auswahl speichern
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-[#82663b]">
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
  actionLabel?: string;
  allow?: string;
  className?: string;
  description?: string;
  fallbackHref?: string;
  fallbackLabel?: string;
  heading?: string;
  id?: string;
  icon?: ReactNode;
  src: string;
  title: string;
  /** Renders the placeholder on a dark surface, e.g. the booking page. */
  tone?: "light" | "dark";
};

export function ConsentEmbed({
  actionLabel = "Google Maps erlauben",
  allow,
  className = "",
  description = "Mit dem Laden stimmst du der Übertragung von Daten an Google Maps zu.",
  fallbackHref,
  fallbackLabel = "In neuem Tab öffnen",
  heading = "Karte anzeigen",
  id,
  icon,
  src,
  title,
  tone = "light",
}: ConsentEmbedProps) {
  const { consent, allowExternalMedia } = useConsent();

  if (consent?.externalMedia) {
    return (
      <iframe
        allow={allow}
        allowFullScreen
        className={className}
        frameBorder="0"
        height="100%"
        id={id}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        style={{ border: 0 }}
        title={title}
        width="100%"
      />
    );
  }

  const isDark = tone === "dark";

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center px-6 py-12 text-center ${
        isDark ? "bg-[#141414] text-[#F5F0E8]" : "bg-[#EAE2D6] text-[#3b2c26]"
      }`}
    >
      <span className={isDark ? "text-[#C9A96E]" : "text-[#82663b]"}>
        {icon ?? <MapPinned aria-hidden="true" className="h-9 w-9" />}
      </span>
      <p className="mt-4 font-serif text-xl font-semibold md:text-2xl">{heading}</p>
      <p className={`mt-2 max-w-sm text-xs leading-relaxed ${isDark ? "text-[#F5F0E8]/60" : "text-[#3b2c26]/65"}`}>
        {description}
      </p>
      <button
        className={`mt-5 min-h-12 rounded-sm px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
          isDark
            ? "bg-[#C9A96E] text-[#141414] hover:bg-[#F5F0E8]"
            : "bg-[#3b2c26] text-[#F5F0E8] hover:bg-[#C9A96E] hover:text-[#3b2c26]"
        }`}
        onClick={allowExternalMedia}
        type="button"
      >
        {actionLabel}
      </button>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
        {fallbackHref && (
          <a
            className={`text-[10px] font-semibold underline-offset-4 hover:underline ${
              isDark ? "text-[#F5F0E8]/60" : "text-[#3b2c26]/60"
            }`}
            href={fallbackHref}
            rel="noreferrer"
            target="_blank"
          >
            {fallbackLabel}
          </a>
        )}
        <Link
          className={`text-[10px] font-semibold underline-offset-4 hover:underline ${
            isDark ? "text-[#C9A96E]" : "text-[#82663b]"
          }`}
          href="/datenschutz"
        >
          Datenschutzhinweise
        </Link>
      </div>
    </div>
  );
}
