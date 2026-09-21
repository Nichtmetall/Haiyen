import type { ReactNode } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

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
    <main className="bg-[#F5F0E8] text-[#201713]">
      <header className="relative overflow-hidden border-b border-[#201713]/10 bg-[#201713] px-6 pb-16 pt-36 text-[#F5F0E8] md:pb-24 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[#C9A96E]/10 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[#C9A96E]/[0.07] blur-[120px]"
        />

        <div className="relative mx-auto max-w-5xl">
          <FadeIn delay={0.05}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A96E]">{eyebrow}</span>
          </FadeIn>
          <FadeIn delay={0.16}>
            <h1 className="mt-5 font-serif text-5xl font-semibold uppercase tracking-tighter md:text-8xl">{title}</h1>
          </FadeIn>
          <FadeIn delay={0.26}>
            <div className="mt-7 h-px w-12 bg-[#C9A96E]" />
          </FadeIn>
          {intro && (
            <FadeIn delay={0.36}>
              <p className="mt-7 max-w-2xl text-sm font-medium leading-relaxed text-[#F5F0E8]/70 md:text-base">{intro}</p>
            </FadeIn>
          )}
          {updatedAt && (
            <FadeIn delay={0.46}>
              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8]/70">Stand: {updatedAt}</p>
            </FadeIn>
          )}
        </div>
      </header>

      {highlights && highlights.length > 0 && (
        <div className="border-b border-[#201713]/10 bg-white/60 px-6 py-10 md:py-14">
          <dl className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
                <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#82663b]">{item.label}</dt>
                <dd className="mt-2 text-sm font-medium leading-relaxed text-[#201713]/80">{item.value}</dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      )}

      <div className="mx-auto grid max-w-5xl gap-14 px-6 pb-24 pt-14 md:pb-32 md:pt-20 lg:grid-cols-[15rem_1fr] lg:gap-20">
        <nav aria-label="Inhaltsverzeichnis" className="hidden lg:block">
          <div className="sticky top-36">
            <FadeIn>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#82663b]">Inhalt</span>
            <ol className="mt-6 space-y-3.5 border-l border-[#201713]/10 pl-5">
              {sections.map((section, idx) => (
                <li key={section.id}>
                  <a
                    className="group flex gap-3 text-sm font-medium leading-snug text-[#201713]/75 transition-colors hover:text-[#201713]"
                    href={`#${section.id}`}
                  >
                    <span className="pt-0.5 font-serif text-xs italic text-[#82663b]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="group-hover:underline group-hover:underline-offset-4">{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            </FadeIn>
          </div>
        </nav>

        <article className="legal-content">
          {sections.map((section, idx) => (
            <FadeIn key={section.id} delay={Math.min(idx * 0.06, 0.24)}>
              <section id={section.id}>
                <div className="legal-section-head">
                  <span className="legal-section-num">{String(idx + 1).padStart(2, "0")}</span>
                  <h2>{section.title}</h2>
                </div>
                {section.content}
              </section>
            </FadeIn>
          ))}

          <FadeIn delay={0.1}>
          <div className="mt-16 flex flex-col gap-4 rounded-2xl border border-[#201713]/10 bg-white/70 p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
            <div>
              <h2 className="font-serif text-xl font-semibold md:text-2xl">Noch Fragen offen?</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#201713]/65">
                Schreib uns einfach – wir antworten dir persönlich.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#201713] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8] no-underline transition-colors hover:bg-[#C9A96E] hover:text-[#201713]"
                href="mailto:info@haiyen-hairdesign.de"
              >
                E-Mail schreiben
              </a>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#201713]/25 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#201713] no-underline transition-colors hover:border-[#201713]"
                href="/"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
          </FadeIn>
        </article>
      </div>
    </main>
  );
}
