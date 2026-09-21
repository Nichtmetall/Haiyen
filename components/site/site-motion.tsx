"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Animate meaningful groups once; their children share the same reveal.
// No CSS hides content before hydration, in print, or when JavaScript is unavailable.
const targets = [
  "[data-reveal]",
  "main h1", "main h2", "main h3", "main p",
  "main ul", "main ol", "main dl", "main label", "main summary",
  "main .button", "main .text-link", "main figure:not([data-parallax])",
  ".salon-hero-content > *", ".salon-hero-visual figcaption",
  ".team-hero-copy > *", ".team-hero-visual figcaption",
  ".brand-carousel-heading", ".brand-carousel-window",
  ".salon-story-copy > *", ".team-group-photo", ".home-team-intro > div:last-child", ".team-preview",
  ".review-carousel",
  ".filter-row", ".gallery-count", ".gallery-caption", ".gallery-empty", ".gallery-end",
  ".booking-locations > a", ".booking-sidebar > *", ".booking-widget-section",
  ".legal-section-head", ".legal-card", ".legal-content table",
  "main > header span", "main nav > div",
  ".nav-inner > *", ".footer-main > *", ".footer-bottom",
  ".contact-section h2", ".contact-section p", ".contact-section label",
  ".contact-section summary", ".contact-section .button", ".contact-section .text-link",
].join(", ");

const excluded = ".cinema, dialog, [aria-hidden='true'], [data-motion-skip]";

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector(".site-wrap");
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const observed = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;

    const finish = (element: HTMLElement) => {
      seen.add(element);
      observer?.unobserve(element);
      observed.delete(element);
      animations.get(element)?.cancel();
      animations.delete(element);
    };

    const reveal = (element: HTMLElement, index: number) => {
      if (seen.has(element)) return;
      seen.add(element);
      observer?.unobserve(element);
      observed.delete(element);
      // Anchor targets and keyboard focus stay stable.
      if (element.contains(document.activeElement) || element.matches(":target") || element.querySelector(":target")) return;
      const image = element.dataset.reveal === "clip";
      const delay = Math.min(240, Number(element.dataset.revealDelay || 0) * 1000 + index * 65);
      const animation = element.animate(
        image
          ? [{ opacity: 0, clipPath: "inset(7% 0 7% 0)" }, { opacity: 1, clipPath: "inset(0% 0 0% 0)" }]
          : [{ opacity: 0, transform: "translate3d(0, 30px, 0)" }, { opacity: 1, transform: "translate3d(0, 0, 0)" }],
        { duration: image ? 1100 : 900, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" },
      );
      animations.set(element, animation);
      animation.onfinish = () => {
        animation.cancel();
        animations.delete(element);
      };
    };

    const register = () => {
      // Release removed cards when gallery/team filters change.
      for (const element of observed) if (!root.contains(element)) finish(element);
      for (const element of animations.keys()) if (!root.contains(element)) finish(element);
      root.querySelectorAll<HTMLElement>(targets).forEach(element => {
        if (seen.has(element) || observed.has(element) || element.closest(excluded)) return;
        const ancestor = element.parentElement?.closest(targets);
        if (ancestor && root.contains(ancestor)) return;
        observed.add(element);
        observer?.observe(element);
      });
    };

    const stop = () => {
      observer?.disconnect();
      mutations?.disconnect();
      observed.clear();
      for (const animation of animations.values()) animation.cancel();
      animations.clear();
    };

    const start = () => {
      stop();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((entry, index) => reveal(entry.target as HTMLElement, index));
      }, { threshold: 0, rootMargin: "0px" });
      register();
      // Covers lazy content and filtered cards without replaying unchanged content.
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
