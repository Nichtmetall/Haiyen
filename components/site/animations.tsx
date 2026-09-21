"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const fadeEase = [0.22, 1, 0.36, 1] as const;
const fadeViewport = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" } as const;

export const FadeUp = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      data-reveal="fade"
      className={`reveal-block ${className}`}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={fadeViewport}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: fadeEase }}
    >
      {children}
    </motion.div>
  );
};

export const ClipReveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      data-reveal="clip"
      className={className}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={fadeViewport}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: fadeEase }}
    >
      {children}
    </motion.div>
  );
};

type ScrollImageProps = { children: ReactNode; className?: string; direction?: 1 | -1; strength?: number };

export function ScrollImage(props: ScrollImageProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={`scroll-image ${props.className ?? ""}`}><div className="scroll-image-inner">{props.children}</div></div>;
  return <MovingImage {...props} />;
}

function MovingImage({ children, className = "", direction = 1, strength = 3 }: ScrollImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 48, damping: 28, mass: 0.55 });
  const distance = Math.min(4, Math.max(0, strength));
  const y = useTransform(progress, [0, 1], [`${-distance * direction}%`, `${distance * direction}%`]);
  return <div ref={ref} className={`scroll-image ${className}`}><motion.div className="scroll-image-inner" style={{ y }}>{children}</motion.div></div>;
}

type ParallaxFigureProps = { children: ReactNode; className?: string; direction?: 1 | -1 };

export function ParallaxFigure({ children, className, direction = 1 }: ParallaxFigureProps) {
  const reduced = useReducedMotion();
  return (
    <motion.figure
      data-parallax
      className={className}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={fadeViewport}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : direction > 0 ? 0 : 0.08, ease: fadeEase }}
    >
      {children}
    </motion.figure>
  );
}
