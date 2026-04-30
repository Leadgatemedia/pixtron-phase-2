"use client";

import { useEffect, useRef } from "react";

/**
 * Intro animation — timing driven entirely by CSS keyframes so it works
 * even before React hydration completes. JS only removes the element once done.
 */
export default function IntroAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // overlay fade-out: 2.4s delay + 0.6s duration = 3s total
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      ref.current?.remove();
    }, 3200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={ref} className="intro-overlay" aria-hidden="true">
      <p className="intro-text">
        Branding that people
        <br />
        <span className="intro-text-green">touch, see and smell</span>
      </p>
    </div>
  );
}
