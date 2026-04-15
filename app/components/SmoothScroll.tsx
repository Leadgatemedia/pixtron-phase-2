"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Pause during intro, resume when intro finishes
    const html = document.documentElement;
    if (!html.classList.contains("intro-done")) {
      lenis.stop();
      const observer = new MutationObserver(() => {
        if (html.classList.contains("intro-done")) {
          lenis.start();
          observer.disconnect();
        }
      });
      observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
