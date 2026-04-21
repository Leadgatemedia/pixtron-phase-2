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

// ── Figma measurements ───────────────────────────────────────────────────────
const SACHET_W  = 461;   // horizontal — fixed px
const SPACING   = 295;   // horizontal — fixed px

// Each sachet image is 4096×3358 (ratio 1.22:1).
// At SACHET_W=461px the natural display height = 461/1.22 ≈ 378px ≈ 42vh at 900px viewport.
// We split into two equal strips (21vh each) that sit adjacently with ZERO GAP:
//   strip1 shows the TOP half  (top:0, no offset)
//   strip2 shows the BOTTOM half (top:-21vh offset inside strip)
// Together they render the complete sachet with no seam.
//
// Layout within 125vh sticky:  strip1: 82.89→103.89vh  strip2: 103.89→124.89vh
// 124.89vh < 125vh → both strips fully visible at all viewport sizes.
const STRIP1_TOP  = "82.89vh";
const STRIP1_H    = "21vh";
const STRIP1_CROP = "0px";      // show top half — no offset

const STRIP2_TOP  = "103.89vh"; // = STRIP1_TOP + STRIP1_H (zero gap!)
const STRIP2_H    = "21vh";
const STRIP2_CROP = "-21vh";    // show bottom half

const SACHET_H    = "42vh";     // full natural height (= STRIP1_H + STRIP2_H)
const OVERLAY_H   = "42vh";     // strip2.bottom - strip1.top = 124.89 - 82.89

// Total horizontal strip width
const N       = SACHETS.length;
const STRIP_W = SACHET_W + (N - 1) * SPACING; // 461 + 6×295 = 2231px

// html zoom factor (must match layout.tsx)
const ZOOM = 0.8;

export default function HeroScrollSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    const strip1 = strip1Ref.current;
    const strip2 = strip2Ref.current;
    if (!outer || !sticky || !strip1 || !strip2) return;

    // ── Take over watermark control after intro animation ends ────────────
    const watermark = document.querySelector(".hero-watermark") as HTMLElement | null;
    let wmReady = false;
    const takeOver = () => {
      if (wmReady || !watermark) return;
      wmReady = true;
      watermark.style.animation = "none";
    };
    if (watermark) {
      watermark.addEventListener("animationend", takeOver, { once: true });
      const html = document.documentElement;
      const arm  = () => setTimeout(takeOver, 1400);
      if (html.classList.contains("intro-done")) {
        arm();
      } else {
        const mo = new MutationObserver(() => {
          if (html.classList.contains("intro-done")) { mo.disconnect(); arm(); }
        });
        mo.observe(html, { attributes: true, attributeFilter: ["class"] });
      }
    }

    const blurEl = document.getElementById("bottom-blur-el") as HTMLElement | null;

    // Hide blur overlay immediately — watermark is visible on page load
    if (blurEl) {
      blurEl.style.opacity = "0";
      blurEl.style.visibility = "hidden";
      blurEl.style.backdropFilter = "blur(0px)";
      blurEl.style.setProperty("-webkit-backdrop-filter", "blur(0px)");
    }

    // ── Section height = sticky height + horizontal travel distance ───────
    // sticky height = 100vh / ZOOM so it fills the full physical screen.
    const setHeight = () => {
      const vh       = window.innerHeight;
      const stickyH  = vh / ZOOM;          // CSS px that renders as 100% physical screen
      outer.style.height = `${stickyH + STRIP_W}px`;
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

    // ── Scroll driver ─────────────────────────────────────────────────────
    // Smoothstep easing: slow-in / slow-out
    const ease = (t: number) => t * t * (3 - 2 * t);

    const update = () => {
      const rect    = outer.getBoundingClientRect();
      const outerH  = outer.offsetHeight;
      const stickyH = sticky.offsetHeight;
      const vw      = window.innerWidth;

      const scrolled  = -rect.top;
      const maxScroll = Math.max(1, outerH - stickyH);
      const p         = Math.max(0, Math.min(1, scrolled / maxScroll));

      // ── Phase thresholds ──────────────────────────────────────────────
      // P1: watermark finishes sliding to left-aligned
      // P2: watermark finishes exiting off-screen left (sachets fully running)
      const P1 = 0.38;
      const P2 = 0.65;

      // ── Hide blur overlay for entire hero section (watermark + sachets) ──
      // p is clamped to 0 before section enters view, so p < 1 correctly
      // covers page load AND all scroll phases until the section is fully past.
      if (blurEl) {
        const footerBlurDisabled = document.body.dataset.footerBlurDisabled === "true";
        const inHero = p < 1;
        const shouldHideBlur = inHero || footerBlurDisabled;
        const opacity = shouldHideBlur ? "0" : "1";
        const visibility = shouldHideBlur ? "hidden" : "visible";
        const blur = shouldHideBlur ? "blur(0px)" : "blur(12px)";
        if (blurEl.style.opacity !== opacity) {
          blurEl.style.opacity = opacity;
          blurEl.style.visibility = visibility;
          blurEl.style.backdropFilter = blur;
          blurEl.style.setProperty("-webkit-backdrop-filter", blur);
        }
      }

      // ── Sachets: hidden until P1, then enter from right ───────────────
      const sachetP = p < P1 ? 0 : ease((p - P1) / (1 - P1));
      const BUFFER  = 150;
      const maxTx   = Math.max(0, STRIP_W - vw);
      const tx      = vw + BUFFER - sachetP * (vw + BUFFER + maxTx);

      strip1.style.transform = `translateX(${tx}px)`;
      strip2.style.transform = `translateX(${tx}px)`;

      // ── Watermark: words align left → block exits screen left ────────
      // Each word div is width:max-content + margin:auto (centered within block).
      // Phase 1: translate each word toward the left edge of the block.
      // Phase 2: whole block slides off-screen left while words stay left-aligned.
      if (wmReady && watermark) {
        const wmW      = watermark.offsetWidth;   // = REMEMBERED text width
        const txCenter = -wmW / 2;                // centered (left:50% anchor)
        const txGone   = -(vw / 2 + wmW + 60);   // fully off-screen left
        const wordEls  = Array.from(watermark.children) as HTMLElement[];

        if (p <= P1) {
          // Phase 1: each word shifts from margin:auto center → left edge
          const t = ease(p / P1);
          watermark.style.transform = `translateX(${txCenter}px)`;
          wordEls.forEach((wordEl) => {
            const wordW       = wordEl.offsetWidth;
            const centerShift = (wmW - wordW) / 2;
            wordEl.style.transform = `translateX(${-centerShift * t}px)`;
          });
        } else if (p <= P2) {
          // Phase 2: words stay left-aligned, block slides off screen
          const t = ease((p - P1) / (P2 - P1));
          wordEls.forEach((wordEl) => {
            const wordW       = wordEl.offsetWidth;
            const centerShift = (wmW - wordW) / 2;
            wordEl.style.transform = `translateX(${-centerShift}px)`;
          });
          watermark.style.transform =
            `translateX(${txCenter + (txGone - txCenter) * t}px)`;
        } else {
          watermark.style.transform = `translateX(${txGone}px)`;
        }

        watermark.style.opacity = String(Math.max(0, 1 - p * 1.6));
      }
    };

    let rafId = 0;
    let scheduled = false;
    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(() => {
        scheduled = false;
        update();
      });
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      watermark?.removeEventListener("animationend", takeOver);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ position: "relative" }}>
      {/* ── Sticky frame: 125vh = 100vh/0.8 → fills full physical screen ─── */}
      <div
        ref={stickyRef}
        style={{
          position:  "sticky",
          top:       0,
          height:    `${100 / ZOOM}vh`,   // = 125vh at zoom 0.8
          overflow:  "hidden",
        }}
      >
        {/* Hero background + content (h1, buttons, subtitle, watermark) */}
        {children}

        {/* ── Upper sachet strip ─────────────────────────────────────────── */}
        <div
          ref={strip1Ref}
          style={{
            position:  "absolute",
            top:       STRIP1_TOP,
            left:      0,
            width:     STRIP_W,
            height:    STRIP1_H,
            overflow:  "hidden",
            willChange:"transform",
            zIndex:    3,
            transform: "translateX(9999px)",
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
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>

        {/* ── Lower sachet strip ─────────────────────────────────────────── */}
        <div
          ref={strip2Ref}
          style={{
            position:  "absolute",
            top:       STRIP2_TOP,
            left:      0,
            width:     STRIP_W,
            height:    STRIP2_H,
            overflow:  "hidden",
            willChange:"transform",
            zIndex:    3,
            transform: "translateX(9999px)",
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
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>

        {/* ── Edge gradient fade ────────────────────────────────────────── */}
        <div
          style={{
            position:      "absolute",
            top:           STRIP1_TOP,
            left:          0,
            right:         0,
            height:        OVERLAY_H,
            background:    "linear-gradient(90deg, #f6fbf6 3%, transparent 18%, transparent 82%, #f6fbf6 97%)",
            zIndex:        4,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
