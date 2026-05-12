"use client";

import { useEffect, useRef } from "react";

export default function FooterBlurGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const blurEl = document.getElementById("bottom-blur-el") as HTMLElement | null;
    if (!root || !blurEl) return;
    const body = document.body;

    const setOverlayState = (hidden: boolean) => {
      body.dataset.footerBlurGuardActive = hidden ? "true" : "false";
      blurEl.style.opacity = hidden ? "0" : "1";
      blurEl.style.visibility = hidden ? "hidden" : "visible";
      const blurValue = hidden ? "blur(0px)" : "blur(12px)";
      blurEl.style.backdropFilter = blurValue;
      blurEl.style.setProperty("-webkit-backdrop-filter", blurValue);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOverlayState(true);
        } else {
          body.dataset.footerBlurGuardActive = "false";
          blurEl.style.opacity = "";
          blurEl.style.visibility = "";
          blurEl.style.backdropFilter = "";
          blurEl.style.removeProperty("-webkit-backdrop-filter");
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px",
      }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      delete body.dataset.footerBlurGuardActive;
      blurEl.style.opacity = "0";
      blurEl.style.visibility = "hidden";
      blurEl.style.backdropFilter = "blur(0px)";
      blurEl.style.setProperty("-webkit-backdrop-filter", "blur(0px)");
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
