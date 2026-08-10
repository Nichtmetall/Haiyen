import type { ReactNode } from "react";
import Link from "next/link";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export type LegalHighlight = {
  label: string;
  value: ReactNode;
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  updatedAt,
  highlights,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updatedAt?: string;
  highlights?: LegalHighlight[];
  sections: LegalSection[];
}) {
  return (
    <main className="bg-[#F5F0E8] text-[#2D4A3E]">
      <header className="relative overflow-hidden border-b border-[#2D4A3E]/10 bg-[#2D4A3E] px-6 pb-16 pt-36 text-[#F5F0E8] md:pb-24 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[#C9A96E]/10 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[#C9A96E]/[0.07] blur-[120px]"
        />

        <div className="relative mx-auto max-w-5xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">{eyebrow}</span>
          <h1 className="mt-5 font-serif text-5xl font-semibold uppercase tracking-tighter md:text-8xl">{title}</h1>
          <div className="mt-7 h-px w-12 bg-[#C9A96E]" />
          {intro && (
            <p className="mt-7 max-w-2xl text-sm font-medium leading-relaxed text-[#F5F0E8]/70 md:text-base">{intro}</p>
          )}
          {updatedAt && (
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8]/40">Stand: {updatedAt}</p>
          )}
        </div>
      </header>

      {highlights && highlights.length > 0 && (
        <div className="border-b border-[#2D4A3E]/10 bg-white/60 px-6 py-10 md:py-14">
          <dl className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label}>
                <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">{item.label}</dt>
                <dd className="mt-2 text-sm font-medium leading-relaxed text-[#2D4A3E]/80">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="mx-auto grid max-w-5xl gap-14 px-6 pb-24 pt-14 md:pb-32 md:pt-20 lg:grid-cols-[15rem_1fr] lg:gap-20">
        <nav aria-label="Inhaltsverzeichnis" className="hidden lg:block">
          <div className="sticky top-36">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A96E]">Inhalt</span>
            <ol className="mt-6 space-y-3.5 border-l border-[#2D4A3E]/10 pl-5">
              {sections.map((section, idx) => (
                <li key={section.id}>
                  <a
                    className="group flex gap-3 text-sm font-medium leading-snug text-[#2D4A3E]/55 transition-colors hover:text-[#2D4A3E]"
                    href={`#${section.id}`}
                  >
                    <span className="pt-0.5 font-serif text-xs italic text-[#C9A96E]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="group-hover:underline group-hover:underline-offset-4">{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="legal-content">
          {sections.map((section, idx) => (
            <section key={section.id} id={section.id}>
              <div className="legal-section-head">
                <span className="legal-section-num">{String(idx + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
              </div>
              {section.content}
            </section>
          ))}

          <div className="mt-16 flex flex-col gap-4 rounded-2xl border border-[#2D4A3E]/10 bg-white/70 p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
            <div>
              <h2 className="font-serif text-xl font-semibold md:text-2xl">Noch Fragen offen?</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#2D4A3E]/65">
                Schreib uns einfach – wir antworten dir persönlich.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#2D4A3E] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8] no-underline transition-colors hover:bg-[#C9A96E] hover:text-[#2D4A3E]"
                href="mailto:info@haiyen-hairdesign.de"
              >
                E-Mail schreiben
              </a>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#2D4A3E]/25 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2D4A3E] no-underline transition-colors hover:border-[#2D4A3E]"
                href="/"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
