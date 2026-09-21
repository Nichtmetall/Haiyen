"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

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

export function ParallaxFigure({ children, className }: ParallaxFigureProps) {
  return <figure data-parallax className={className}>{children}</figure>;
}
