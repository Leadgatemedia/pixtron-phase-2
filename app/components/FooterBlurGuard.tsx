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

    const setOverlayState = (hidden: boolean) => {
      blurEl.style.opacity = hidden ? "0" : "1";
      blurEl.style.visibility = hidden ? "hidden" : "visible";
      const blurValue = hidden ? "blur(0px)" : "blur(12px)";
      blurEl.style.backdropFilter = blurValue;
      blurEl.style.setProperty("-webkit-backdrop-filter", blurValue);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverlayState(entry.isIntersecting);
      },
      {
        threshold: 0.01,
      }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      setOverlayState(false);
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
