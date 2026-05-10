"use client";

import { useEffect } from "react";

const DESKTOP_MEDIA = "(min-width: 768px)";

export default function HeaderScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia(DESKTOP_MEDIA);
    let frame = 0;

    const update = () => {
      frame = 0;
      root.classList.toggle("desktop-header-scrolled", media.matches && window.scrollY > 8);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    media.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      media.removeEventListener("change", scheduleUpdate);
      root.classList.remove("desktop-header-scrolled");
    };
  }, []);

  return null;
}
