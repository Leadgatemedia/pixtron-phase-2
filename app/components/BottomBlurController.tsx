"use client";

import { useEffect } from "react";

type BottomBlurControllerProps = {
  hiddenUntilY?: number;
  blurPx?: number;
  desktopOnly?: boolean;
};

export default function BottomBlurController({
  hiddenUntilY = 0,
  blurPx = 12,
  desktopOnly = false,
}: BottomBlurControllerProps) {
  useEffect(() => {
    const blurEl = document.getElementById("bottom-blur-el") as HTMLElement | null;
    if (!blurEl) return;

    let rafId = 0;
    let scheduled = false;

    const applyBlurState = () => {
      scheduled = false;
      const footerBlurDisabled = document.body.dataset.footerBlurDisabled === "true";
      const belowDesktop = desktopOnly && window.innerWidth < 768;
      const shouldHideBlur =
        belowDesktop || window.scrollY <= hiddenUntilY || footerBlurDisabled;
      const opacity = shouldHideBlur ? "0" : "1";
      const visibility = shouldHideBlur ? "hidden" : "visible";
      const blurValue = shouldHideBlur ? "blur(0px)" : `blur(${blurPx}px)`;

      blurEl.style.opacity = opacity;
      blurEl.style.visibility = visibility;
      blurEl.style.backdropFilter = blurValue;
      blurEl.style.setProperty("-webkit-backdrop-filter", blurValue);
    };

    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(applyBlurState);
    };

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-footer-blur-disabled"],
    });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    applyBlurState();

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      blurEl.style.opacity = "0";
      blurEl.style.visibility = "hidden";
      blurEl.style.backdropFilter = "blur(0px)";
      blurEl.style.setProperty("-webkit-backdrop-filter", "blur(0px)");
    };
  }, [blurPx, desktopOnly, hiddenUntilY]);

  return null;
}
