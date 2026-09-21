"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

type ScrollImageProps = { children: ReactNode; className?: string; direction?: 1 | -1; strength?: number };

export function ScrollImage(props: ScrollImageProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={`scroll-image ${props.className ?? ""}`}><div className="scroll-image-inner">{props.children}</div></div>;
  return <MovingImage {...props} />;
}

function MovingImage({ children, className = "", direction = 1, strength = 8 }: ScrollImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 28, mass: 0.4 });
  const distance = Math.min(8, Math.max(0, strength));
  const y = useTransform(progress, [0, 1], [`${-distance * direction}%`, `${distance * direction}%`]);
  const scale = useTransform(progress, [0, 1], [1.06, 1.02]);
  return <div ref={ref} className={`scroll-image ${className}`}><motion.div className="scroll-image-inner" style={{ y, scale }}>{children}</motion.div></div>;
}

type ParallaxFigureProps = { children: ReactNode; className?: string; direction?: 1 | -1 };

export function ParallaxFigure(props: ParallaxFigureProps) {
  const reduced = useReducedMotion();
  if (reduced) return <figure data-parallax className={props.className}>{props.children}</figure>;
  return <MovingFigure {...props} />;
}

function MovingFigure({ children, className, direction = 1 }: ParallaxFigureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 85, damping: 28, mass: 0.4 });
  const y = useTransform(progress, [0, 1], [24 * direction, -24 * direction]);
  // The stationary wrapper keeps the scroll measurement independent of its own transform.
  return <div ref={ref} className="parallax-figure-track"><motion.figure data-parallax className={className} style={{ y }}>{children}</motion.figure></div>;
}
