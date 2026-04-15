"use client";

import { useRef, useEffect } from "react";

// Two rows — row 2 is offset so they feel staggered
const ROW1 = [
  "/sachets/sachet-1.png",
  "/sachets/sachet-7.png",
  "/sachets/sachet-3.png",
  "/sachets/sachet-4.png",
  "/sachets/sachet-5.png",
  "/sachets/sachet-2.png",
  "/sachets/sachet-hotel.png",
  // repeat to fill long scroll
  "/sachets/sachet-1.png",
  "/sachets/sachet-7.png",
  "/sachets/sachet-3.png",
];

const ROW2 = [
  "/sachets/sachet-hotel.png",
  "/sachets/sachet-2.png",
  "/sachets/sachet-5.png",
  "/sachets/sachet-4.png",
  "/sachets/sachet-3.png",
  "/sachets/sachet-7.png",
  "/sachets/sachet-1.png",
  // repeat
  "/sachets/sachet-hotel.png",
  "/sachets/sachet-2.png",
  "/sachets/sachet-5.png",
];

// Height of each sachet strip (px, CSS)
const STRIP_H = 164;
// Gap between rows and between sachets
const GAP = 24;

export default function SachetCarousel() {
  const outerRef = useRef<HTMLDivElement>(null);
  const row1Ref  = useRef<HTMLDivElement>(null);
  const row2Ref  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const row1  = row1Ref.current;
    const row2  = row2Ref.current;
    if (!outer || !row1 || !row2) return;

    // ── 1. Set the outer div height so the sticky content has enough room ──
    const setHeight = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const trackW = row1.scrollWidth;
      // Extra vertical scroll space = how far the track needs to travel
      const travel = Math.max(0, trackW - vw + GAP * 2);
      outer.style.height = `${vh + travel}px`;
    };

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

    // ── 2. Drive translateX from scroll progress ────────────────────────────
    const update = () => {
      const rect    = outer.getBoundingClientRect();
      const outerH  = outer.offsetHeight;
      const vh      = window.innerHeight;
      const vw      = window.innerWidth;
      const trackW  = row1.scrollWidth;

      // progress: 0 = section top at viewport top, 1 = section bottom at viewport bottom
      const scrolled   = -rect.top;
      const maxScroll  = outerH - vh;
      const progress   = Math.max(0, Math.min(1, scrolled / maxScroll));

      const maxTx = Math.max(0, trackW - vw + GAP * 2);

      row1.style.transform = `translateX(${-progress * maxTx}px)`;
      // Row 2 starts 120px to the right for stagger; travels at the same rate
      row2.style.transform = `translateX(${120 - progress * maxTx}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const imgStyle: React.CSSProperties = {
    height:      STRIP_H,
    width:       "auto",
    flexShrink:  0,
    display:     "block",
    borderRadius: 8,
    objectFit:   "contain",
  };

  return (
    <div ref={outerRef} style={{ position: "relative" }}>
      {/* ── Sticky viewport-height panel ───────────────────────── */}
      <div
        style={{
          position:        "sticky",
          top:             0,
          height:          "100vh",
          overflow:        "hidden",
          background:      "linear-gradient(180deg,#f6fbf6 0%,#ffffff 100%)",
          display:         "flex",
          flexDirection:   "column",
          justifyContent:  "center",
          gap:             GAP,
        }}
      >
        {/* Row 1 */}
        <div
          ref={row1Ref}
          style={{
            display:      "flex",
            gap:          GAP,
            paddingLeft:  GAP,
            willChange:   "transform",
          }}
        >
          {ROW1.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" style={imgStyle} />
          ))}
        </div>

        {/* Row 2 — starts 120px further right */}
        <div
          ref={row2Ref}
          style={{
            display:      "flex",
            gap:          GAP,
            paddingLeft:  GAP,
            willChange:   "transform",
            transform:    "translateX(120px)",
          }}
        >
          {ROW2.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" style={imgStyle} />
          ))}
        </div>
      </div>
    </div>
  );
}
