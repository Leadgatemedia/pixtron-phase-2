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

    // Only pause while the homepage intro is actively running. Non-home pages do
    // not add intro-done, so treating its absence as a lock can freeze scrolling.
    const html = document.documentElement;
    const syncIntroState = () => {
      if (html.classList.contains("intro-running")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    syncIntroState();
    const observer = new MutationObserver(syncIntroState);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
