"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, type AnimationPlaybackControls } from "framer-motion";

// Fade each visible block once. Marked groups ([data-reveal]) keep their own Motion animation.
const targets = [
  "[data-reveal]",
  "main h1", "main h2", "main h3", "main p",
  "main ul", "main ol", "main dl", "main label", "main summary",
  "main .button", "main .text-link", "main figure:not([data-parallax])",
  ".salon-hero-content > *", ".salon-hero-visual",
  ".brand-carousel-heading", ".brand-carousel-window",
  ".salon-story-copy > *", ".team-group-photo", ".home-team-intro > div:last-child > *", ".team-preview",
  ".review-carousel", ".service-row",
  ".filter-row", ".gallery-count", ".gallery-caption", ".gallery-empty", ".gallery-end",
  ".booking-locations > a", ".booking-sidebar > *", ".booking-widget-section",
  ".legal-section-head", ".legal-card", ".legal-content table",
  "main > header span", "main nav > div",
  ".nav-inner > *", ".footer-main > *", ".footer-bottom",
  ".contact-section h2", ".contact-section p", ".contact-section label",
  ".contact-section summary", ".contact-section .button", ".contact-section .text-link",
  ".contact-socials",
].join(", ");

const excluded = ".cinema, dialog, [aria-hidden='true'], [data-motion-skip]";

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector(".site-wrap");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const observed = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, AnimationPlaybackControls>();
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;

    const finish = (element: HTMLElement) => {
      seen.add(element);
      observer?.unobserve(element);
      observed.delete(element);
      animations.get(element)?.stop();
      animations.delete(element);
      element.style.opacity = "1";
    };

    const reveal = (element: HTMLElement, index: number) => {
      if (seen.has(element)) return;
      seen.add(element);
      observer?.unobserve(element);
      observed.delete(element);
      if (element.contains(document.activeElement) || element.matches(":target") || element.querySelector(":target")) return;
      const delay = Math.min(0.16, Number(element.dataset.revealDelay || 0) + index * 0.045);
      const animation = animate(
        element,
        { opacity: [0, 1] },
        { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
      );
      animations.set(element, animation);
      void animation.then(() => {
        animations.delete(element);
      });
    };

    const register = () => {
      for (const element of observed) if (!root.contains(element)) finish(element);
      for (const element of animations.keys()) if (!root.contains(element)) finish(element);
      root.querySelectorAll<HTMLElement>(targets).forEach(element => {
        if (seen.has(element) || observed.has(element) || element.closest(excluded)) return;
        const marked = element.hasAttribute("data-reveal");
        if (!marked && element.closest("[data-reveal]")) return;
        if (marked) return;
        if (element.querySelector(targets)) return;
        observed.add(element);
        observer?.observe(element);
      });
    };

    const stop = () => {
      observer?.disconnect();
      mutations?.disconnect();
      observed.clear();
      for (const animation of animations.values()) animation.stop();
      animations.clear();
    };

    const start = () => {
      stop();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((entry, index) => reveal(entry.target as HTMLElement, index));
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      register();
      mutations = new MutationObserver(register);
      mutations.observe(root, { childList: true, subtree: true });
    };

    const onFocus = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      let element: Element | null = event.target;
      while (element && root.contains(element)) {
        if (element instanceof HTMLElement && element.matches(targets)) finish(element);
        element = element.parentElement;
      }
    };
    const onPrint = () => stop();
    start();
    preference.addEventListener("change", start);
    root.addEventListener("focusin", onFocus);
    window.addEventListener("beforeprint", onPrint);
    window.addEventListener("afterprint", start);
    return () => {
      stop();
      preference.removeEventListener("change", start);
      root.removeEventListener("focusin", onFocus);
      window.removeEventListener("beforeprint", onPrint);
      window.removeEventListener("afterprint", start);
    };
  }, [pathname]);

  return null;
}
