"use client";

import { useEffect, useRef } from "react";
import { FadeImage } from "./fade-image";
import { motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";

export function CinematicScene() {
  const ref = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);

  const scheduleRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    if (reduced) return;
    const section = ref.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;
    let frameId = 0;

    const measure = () => {
      frameId = 0;
      const bounds = section.getBoundingClientRect();
      // Use the actual sticky travel, including the mobile viewport height.
      // This keeps the last chapter fully visible before the section releases.
      const travel = bounds.height - sticky.offsetHeight;
      progress.set(travel > 0 ? Math.min(1, Math.max(0, -bounds.top / travel)) : 0);
    };
    const schedule = () => {
      if (!frameId) frameId = window.requestAnimationFrame(measure);
    };
    scheduleRef.current = schedule;
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(section);
    resizeObserver.observe(sticky);
    window.addEventListener("resize", schedule);
    measure();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", schedule);
      scheduleRef.current = () => undefined;
    };
  }, [progress, reduced]);

  useLenis(() => {
    if (!reduced) scheduleRef.current();
  });
  const scale = useTransform(progress, [0, 1], [1.02, 1.08]);
  const frame = useTransform(progress, [0, 0.23, 1], ["inset(9% 7% 9% 7%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const secondImage = useTransform(progress, [0.25, 0.48], [0, 1]);
  const thirdImage = useTransform(progress, [0.53, 0.76], [0, 1]);
  const first = useTransform(progress, [0, 0.18, 0.29], [1, 1, 0]);
  const second = useTransform(progress, [0.23, 0.34, 0.45, 0.57], [0, 1, 1, 0]);
  const third = useTransform(progress, [0.53, 0.65, 1], [0, 1, 1]);
  const chapters = [
    { title: "Ankommen.", sub: "Ein vertrautes Gesicht. Zeit für dich.", opacity: first },
    { title: "Loslassen.", sub: "Für einen Moment darf der Alltag warten.", opacity: second },
    { title: "Du selbst sein.", sub: "Mit einem Look, der sich nach dir anfühlt.", opacity: third },
  ];
  return (
    <section ref={ref} className={`cinema ${reduced ? "cinema-reduced" : ""}`} aria-label="Dein Moment bei Haiyen">
      <div ref={stickyRef} className="cinema-sticky">
        <motion.div className="cinema-frame" style={reduced ? undefined : { clipPath: frame }}>
          <motion.div className="cinema-photo" style={reduced ? undefined : { scale }}>
            <FadeImage src="/images/galerie/Josi/IMG_8571.jpg" alt="Warme, goldene Wellen – eine Arbeit von Josi" fill sizes="100vw" />
          </motion.div>
          {!reduced && <motion.div className="cinema-photo cinema-photo-second" style={{ opacity: secondImage, scale }}><FadeImage src="/images/galerie/Anika/4972abd3-b425-4c73-a79c-528c21571338.jpg" alt="Weiche Farbverläufe und Wellen, gestaltet von Anika" fill sizes="100vw" /></motion.div>}
          {!reduced && <motion.div className="cinema-photo cinema-photo-second" style={{ opacity: thirdImage, scale }}><FadeImage src="/images/galerie/Lisa/IMG_1153.jpg" alt="Kreative Coloration und Schnitt – eine Arbeit von Lisa" fill sizes="100vw" /></motion.div>}
          <div className="cinema-shade" />
          <div className="cinema-label eyebrow light">Ein Moment. Nur für dich.</div>
          <div className="cinema-chapters" aria-hidden={!reduced}>
            {chapters.map((chapter, i) => <motion.div key={chapter.title} className="cinema-chapter" style={reduced ? undefined : { opacity: chapter.opacity }}><span className="cinema-number">0{i + 1}</span><h2>{chapter.title}</h2><p>{chapter.sub}</p></motion.div>)}
          </div>
          {!reduced && <p className="sr-only">Ankommen. Ein vertrautes Gesicht. Zeit für dich. Loslassen. Für einen Moment darf der Alltag warten. Du selbst sein. Mit einem Look, der sich nach dir anfühlt.</p>}
          <div className="cinema-footer"><span>HAIYEN HAIRDESIGN</span><span>DEIN MOMENT IN DRESDEN</span></div>
          {!reduced && <motion.div className="cinema-progress" style={{ scaleX: progress }} />}
        </motion.div>
      </div>
    </section>
  );
}
