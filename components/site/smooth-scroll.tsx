"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion-dom";
import "lenis/dist/lenis.css";

const HEADER_OFFSET = 112;

const options = {
  autoRaf: false,
  anchors: { offset: HEADER_OFFSET },
  lerp: 0.075,
  wheelMultiplier: 0.82,
  touchMultiplier: 1,
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
};

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    const update = ({ timestamp }: { timestamp: number }) => {
      lenisRef.current?.lenis?.raf(timestamp);
    };
    const process = frame.update(update, true);
    return () => cancelFrame(process);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;
      if (window.location.hash) {
        lenis.scrollTo(window.location.hash, { offset: HEADER_OFFSET });
        return;
      }
      lenis.scrollTo(0, { immediate: true });
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    const syncOverlays = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;
      const blocked = Boolean(document.querySelector("dialog[open], [data-lenis-prevent][aria-modal='true']"));
      if (blocked) lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncOverlays);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open", "aria-modal"] });
    return () => observer.disconnect();
  }, []);

  return (
    <ReactLenis root options={options} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
