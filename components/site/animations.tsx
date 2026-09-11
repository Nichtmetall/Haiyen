"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export const FadeUp = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const reduced = useReducedMotion();
  return <motion.div initial={reduced ? false : { opacity: 0.15, y: 56 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0 : 0.95, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }} className={`reveal-block ${className}`}>{children}</motion.div>;
};

export const ClipReveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { clipPath: "inset(12% 0 12% 0)", opacity: 0.4 }} whileInView={{ clipPath: "inset(0% 0 0% 0)", opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0 : 1.15, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
};

export function ScrollImage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.04]);
  return <div ref={ref} className={`scroll-image ${className}`}><motion.div className="scroll-image-inner" style={reduced ? undefined : { y, scale }}>{children}</motion.div></div>;
}
