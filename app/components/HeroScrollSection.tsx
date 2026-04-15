"use client";

import { useRef, useEffect } from "react";

// Sachet images in left-to-right visual order
const SACHETS = [
  "/sachets/sachet-1.png",
  "/sachets/sachet-2.png",
  "/sachets/sachet-4.png",
  "/sachets/sachet-hotel.png",
  "/sachets/sachet-3.png",
  "/sachets/sachet-7.png",
  "/sachets/sachet-5.png",
];

// ── Exact Figma measurements ──────────────────────────────────────────────────
const SACHET_W  = 461;   // each sachet image width (px)
const SACHET_H  = 378;   // each sachet image height (px)
const SPACING   = 295;   // left-to-left gap → 166px overlap between sachets

// Two cropped strips that together span the SEEN/TOUCHED/REMEMBERED block
const STRIP1_TOP  = 561;  // upper strip y in the 900px hero frame
const STRIP1_H    = 167;  // visible height of upper strip
const STRIP1_CROP = -23;  // top offset of sachet image (shows upper portion)

const STRIP2_TOP  = 719;  // lower strip y
const STRIP2_H    = 164;  // visible height of lower strip
const STRIP2_CROP = -189; // top offset (shows lower portion)

// Total strip width based on sachet count + spacing
const N         = SACHETS.length;
const STRIP_W   = SACHET_W + (N - 1) * SPACING; // 461 + 6×295 = 2231px

export default function HeroScrollSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer  = outerRef.current;
    const strip1 = strip1Ref.current;
    const strip2 = strip2Ref.current;
    if (!outer || !strip1 || !strip2) return;

    // ── Take over watermark control after intro animation ends ────────────
    const watermark = document.querySelector(".hero-watermark") as HTMLElement | null;
    let wmReady = false;
    const takeOver = () => {
      if (wmReady || !watermark) return;
      wmReady = true;
      watermark.style.animation = "none"; // release CSS fill → JS drives it
    };
    if (watermark) {
      watermark.addEventListener("animationend", takeOver, { once: true });
      const html = document.documentElement;
      const arm  = () => setTimeout(takeOver, 1400); // 0.3s delay + 1.0s anim + buffer
      if (html.classList.contains("intro-done")) {
        arm();
      } else {
        const mo = new MutationObserver(() => {
          if (html.classList.contains("intro-done")) { mo.disconnect(); arm(); }
        });
        mo.observe(html, { attributes: true, attributeFilter: ["class"] });
      }
    }

    // ── Section height = 100vh + travel distance ──────────────────────────
    const setHeight = () => {
      const vh = window.innerHeight;
      outer.style.height = `${vh + STRIP_W}px`;
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

    // ── Scroll driver ─────────────────────────────────────────────────────
    const update = () => {
      const rect    = outer.getBoundingClientRect();
      const outerH  = outer.offsetHeight;
      const vh      = window.innerHeight;
      const vw      = window.innerWidth;

      const scrolled  = -rect.top;
      const maxScroll = Math.max(1, outerH - vh);
      const p         = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Strips: start fully off-screen right → end with last sachet at viewport right
      const maxTx = Math.max(0, STRIP_W - vw);
      const tx    = vw - p * (vw + maxTx);  // p=0 → vw (hidden), p=1 → -maxTx (all visible)

      strip1.style.transform = `translateX(${tx}px)`;
      strip2.style.transform = `translateX(${tx}px)`;

      // Watermark: drift left + fade as sachets arrive
      if (wmReady && watermark) {
        const drift = p * vw * 0.55;
        watermark.style.transform = `translateX(calc(-50% - ${drift}px))`;
        watermark.style.opacity   = String(Math.max(0, 1 - p * 1.8));
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      ro.disconnect();
      watermark?.removeEventListener("animationend", takeOver);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ position: "relative" }}>
      {/* ── Sticky viewport-height frame ─────────────────────────────────── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Hero content (h1, buttons, subtitle, watermark) */}
        {children}

        {/* ── Upper sachet strip ─────────────────────────────────────────── */}
        <div
          ref={strip1Ref}
          style={{
            position:   "absolute",
            top:        STRIP1_TOP,
            left:       0,
            width:      STRIP_W,
            height:     STRIP1_H,
            overflow:   "hidden",
            willChange: "transform",
            zIndex:     3,
          }}
        >
          {SACHETS.map((src, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left:     i * SPACING,
                top:      STRIP1_CROP,
                width:    SACHET_W,
                height:   SACHET_H,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>

        {/* ── Lower sachet strip ─────────────────────────────────────────── */}
        <div
          ref={strip2Ref}
          style={{
            position:   "absolute",
            top:        STRIP2_TOP,
            left:       0,
            width:      STRIP_W,
            height:     STRIP2_H,
            overflow:   "hidden",
            willChange: "transform",
            zIndex:     3,
          }}
        >
          {SACHETS.map((src, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left:     i * SPACING,
                top:      STRIP2_CROP,
                width:    SACHET_W,
                height:   SACHET_H,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>

        {/* ── Left + right edge gradient fade ──────────────────────────── */}
        <div
          style={{
            position:     "absolute",
            top:          STRIP1_TOP,
            left:         0,
            right:        0,
            height:       STRIP2_TOP + STRIP2_H - STRIP1_TOP,
            background:   "linear-gradient(90deg, #f6fbf6 3%, transparent 18%, transparent 82%, #f6fbf6 97%)",
            zIndex:       4,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
