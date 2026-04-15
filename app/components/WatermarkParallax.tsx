"use client";

import { useEffect } from "react";

export default function WatermarkParallax() {
  useEffect(() => {
    const watermark = document.querySelector(".hero-watermark") as HTMLElement | null;
    if (!watermark) return;

    let ready = false;

    // After the intro reveal animation finishes, hand off to JS so we can
    // freely control both transform (horizontal drift) and opacity (fade).
    const takeOver = () => {
      if (ready) return;
      ready = true;
      watermark.style.animation = "none"; // cancel CSS animation fill
      update();
    };

    watermark.addEventListener("animationend", takeOver, { once: true });

    // Fallback timeout in case animationend doesn't fire (e.g. element hidden)
    const html = document.documentElement;
    const ANIM_TOTAL = 1400; // 0.3s delay + 1.0s anim + 100ms buffer (ms)
    let fallback: ReturnType<typeof setTimeout>;

    if (html.classList.contains("intro-done")) {
      fallback = setTimeout(takeOver, ANIM_TOTAL);
    } else {
      const mo = new MutationObserver(() => {
        if (html.classList.contains("intro-done")) {
          mo.disconnect();
          fallback = setTimeout(takeOver, ANIM_TOTAL);
        }
      });
      mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    }

    const update = () => {
      if (!ready) return;
      const scrollY = window.scrollY;

      // Drift left as user scrolls
      watermark.style.transform = `translateX(calc(-50% - ${scrollY * 0.45}px))`;

      // Fade: fully visible at scrollY=0, gone by scrollY=380px
      watermark.style.opacity = String(Math.max(0, 1 - scrollY / 380));
    };

    window.addEventListener("scroll", update, { passive: true });

    return () => {
      clearTimeout(fallback!);
      window.removeEventListener("scroll", update);
      watermark.removeEventListener("animationend", takeOver);
    };
  }, []);

  return null;
}
