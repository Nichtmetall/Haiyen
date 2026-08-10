import type { ReactNode } from "react";

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-[#F5F0E8] px-6 pb-24 pt-36 text-[#2D4A3E] md:pb-32 md:pt-48">
      <article className="mx-auto max-w-4xl">
        <header className="border-b border-[#2D4A3E]/15 pb-10 md:pb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A78249]">{eyebrow}</span>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-7xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#2D4A3E]/65 md:text-base">{intro}</p>}
        </header>
        <div className="legal-content mt-10 md:mt-14">{children}</div>
      </article>
    </main>
  );
}

