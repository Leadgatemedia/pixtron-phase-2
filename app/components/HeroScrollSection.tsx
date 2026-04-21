"use client";

import { useEffect, useRef } from "react";

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

const SACHET_W = 461;
const SPACING = 295;

// Each sachet is rendered as two cropped strips so the row can live inside
// the hero while still matching the Figma composition.
const STRIP1_TOP = "82.89vh";
const STRIP1_H = "21vh";
const STRIP1_CROP = "0px";

const STRIP2_TOP = "103.89vh";
const STRIP2_H = "21vh";
const STRIP2_CROP = "-21vh";

const SACHET_H = "42vh";
const OVERLAY_H = "42vh";

const N = SACHETS.length;
const STRIP_W = SACHET_W + (N - 1) * SPACING;

// Must match layout zoom.
const ZOOM = 0.8;
const ENTRY_BUFFER = 150;
// Reach the last sachet arrangement earlier, then keep that composition
// pinned for a longer portion of the scroll before releasing the section.
const MOTION_SCROLL_RATIO = 0.68;
const FINAL_HOLD_RATIO = 0.42;

export default function HeroScrollSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const strip1 = strip1Ref.current;
    const strip2 = strip2Ref.current;
    if (!outer || !sticky || !strip1 || !strip2) return;

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
      const armTakeover = () => setTimeout(takeOver, 1400);

      if (html.classList.contains("intro-done")) {
        armTakeover();
      } else {
        const mo = new MutationObserver(() => {
          if (html.classList.contains("intro-done")) {
            mo.disconnect();
            armTakeover();
          }
        });
        mo.observe(html, { attributes: true, attributeFilter: ["class"] });
      }
    }

    const blurEl = document.getElementById("bottom-blur-el") as HTMLElement | null;
    if (blurEl) {
      blurEl.style.opacity = "0";
      blurEl.style.visibility = "hidden";
      blurEl.style.backdropFilter = "blur(0px)";
      blurEl.style.setProperty("-webkit-backdrop-filter", "blur(0px)");
    }

    const ease = (t: number) => t * t * (3 - 2 * t);

    const getMetrics = () => {
      const cssZoom = parseFloat(document.documentElement.style.zoom) || ZOOM;
      const vh = window.innerHeight / cssZoom;
      const vw = window.innerWidth / cssZoom;
      const stickyH = vh;
      const leadScroll = stickyH * 0.62;
      const holdScroll = stickyH * FINAL_HOLD_RATIO;
      const maxTx = Math.max(0, STRIP_W - vw);

      // Horizontal motion starts fully off-screen right and stops exactly when
      // the final sachet is fully visible at the viewport edge.
      const travelDistance = vw + ENTRY_BUFFER + maxTx;
      const travelScroll = travelDistance * MOTION_SCROLL_RATIO;

      return {
        vw,
        stickyH,
        leadScroll,
        holdScroll,
        maxTx,
        travelScroll,
        totalScroll: leadScroll + travelScroll + holdScroll,
      };
    };

    const setHeight = () => {
      const { stickyH, totalScroll } = getMetrics();
      outer.style.height = `${stickyH + totalScroll}px`;
    };

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const {
        vw,
        leadScroll,
        maxTx,
        travelScroll,
        totalScroll,
      } = getMetrics();

      const cssZoom = parseFloat(document.documentElement.style.zoom) || ZOOM;
      const scrolled = Math.max(0, -rect.top / cssZoom);
      const heroProgress = Math.max(0, Math.min(1, scrolled / Math.max(1, totalScroll)));

      if (blurEl) {
        const footerBlurDisabled = document.body.dataset.footerBlurDisabled === "true";
        const inHero = heroProgress < 1;
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

      const sachetProgress = Math.max(
        0,
        Math.min(1, (scrolled - leadScroll) / Math.max(1, travelScroll))
      );
      const txStart = vw + ENTRY_BUFFER;
      const txEnd = -maxTx;
      const tx = txStart + (txEnd - txStart) * ease(sachetProgress);

      strip1.style.transform = `translateX(${tx}px)`;
      strip2.style.transform = `translateX(${tx}px)`;

      if (wmReady && watermark) {
        const wmW = watermark.offsetWidth;
        const txCenter = -wmW / 2;
        const txGone = -(vw / 2 + wmW + 60);
        const wordEls = Array.from(watermark.children) as HTMLElement[];
        const watermarkExitScroll = travelScroll * 0.42;
        const alignProgress = Math.max(
          0,
          Math.min(1, scrolled / Math.max(1, leadScroll))
        );
        const exitProgress = Math.max(
          0,
          Math.min(
            1,
            (scrolled - leadScroll) / Math.max(1, watermarkExitScroll)
          )
        );

        if (alignProgress < 1) {
          const t = ease(alignProgress);
          watermark.style.transform = `translateX(${txCenter}px)`;
          wordEls.forEach((wordEl) => {
            const wordW = wordEl.offsetWidth;
            const centerShift = (wmW - wordW) / 2;
            wordEl.style.transform = `translateX(${-centerShift * t}px)`;
          });
        } else if (exitProgress < 1) {
          const t = ease(exitProgress);
          wordEls.forEach((wordEl) => {
            const wordW = wordEl.offsetWidth;
            const centerShift = (wmW - wordW) / 2;
            wordEl.style.transform = `translateX(${-centerShift}px)`;
          });
          watermark.style.transform = `translateX(${txCenter + (txGone - txCenter) * t}px)`;
        } else {
          wordEls.forEach((wordEl) => {
            const wordW = wordEl.offsetWidth;
            const centerShift = (wmW - wordW) / 2;
            wordEl.style.transform = `translateX(${-centerShift}px)`;
          });
          watermark.style.transform = `translateX(${txGone}px)`;
        }

        // Fade the watermark out progressively as its own motion completes,
        // while keeping the hero pinned during the final sachet hold.
        watermark.style.opacity = String(
          Math.max(0, 1 - (alignProgress * 0.45 + exitProgress * 0.85))
        );
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
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: `${100 / ZOOM}vh`,
          overflow: "hidden",
        }}
      >
        {children}

        <div
          ref={strip1Ref}
          style={{
            position: "absolute",
            top: STRIP1_TOP,
            left: 0,
            width: STRIP_W,
            height: STRIP1_H,
            overflow: "hidden",
            willChange: "transform",
            zIndex: 3,
            transform: "translateX(9999px)",
          }}
        >
          {SACHETS.map((src, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * SPACING,
                top: STRIP1_CROP,
                width: SACHET_W,
                height: SACHET_H,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        <div
          ref={strip2Ref}
          style={{
            position: "absolute",
            top: STRIP2_TOP,
            left: 0,
            width: STRIP_W,
            height: STRIP2_H,
            overflow: "hidden",
            willChange: "transform",
            zIndex: 3,
            transform: "translateX(9999px)",
          }}
        >
          {SACHETS.map((src, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * SPACING,
                top: STRIP2_CROP,
                width: SACHET_W,
                height: SACHET_H,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            top: STRIP1_TOP,
            left: 0,
            right: 0,
            height: OVERLAY_H,
            background:
              "linear-gradient(90deg, #f6fbf6 3%, transparent 18%, transparent 82%, #f6fbf6 97%)",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
