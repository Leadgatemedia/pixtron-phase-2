"use client";

import { useEffect, useRef } from "react";

// Sachet images in left-to-right visual order.
const DEFAULT_SACHETS = [
  "/sachets/sachet-1.webp",
  "/sachets/sachet-2.webp",
  "/sachets/sachet-4.webp",
  "/sachets/sachet-hotel.webp",
  "/sachets/sachet-3.webp",
  "/sachets/sachet-7.webp",
  "/sachets/sachet-5.webp",
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
const STRIP_SOURCE_W = 1855;
const STRIP_SOURCE_H = 400;

// Must match layout zoom.
const ZOOM = 0.8;
const ENTRY_BUFFER = 150;
// Reach the last sachet arrangement earlier, then keep that composition
// pinned for a longer portion of the scroll before releasing the section.
const MOTION_SCROLL_RATIO = 0.68;
const FINAL_HOLD_RATIO = 0.42;

type HeroScrollSectionProps = {
  children: React.ReactNode;
  sachets?: string[];
  stripImage?: string;
  stripWidth?: number;
  stripTop?: string;
  finalAlign?: "edge" | "center";
  watermarkSelector?: string;
  waitForIntro?: boolean;
  stageWidth?: number;
  stageHeight?: number;
};

export default function HeroScrollSection({
  children,
  sachets = DEFAULT_SACHETS,
  stripImage,
  stripWidth,
  stripTop,
  finalAlign = "edge",
  watermarkSelector = ".hero-watermark",
  waitForIntro = true,
  stageWidth,
  stageHeight,
}: HeroScrollSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);
  const stripW = stripImage ? (stripWidth ?? 1484) : SACHET_W + (sachets.length - 1) * SPACING;
  const stripH = stripImage ? (stripW * STRIP_SOURCE_H) / STRIP_SOURCE_W : 0;

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const strip1 = strip1Ref.current;
    const strip2 = strip2Ref.current;
    if (!outer || !sticky || !strip1 || !strip2) return;

    const watermark = sticky.querySelector(watermarkSelector) as HTMLElement | null;
    let wmReady = false;
    let introObserver: MutationObserver | null = null;
    let takeoverTimer = 0;

    const takeOver = () => {
      if (wmReady || !watermark) return;
      wmReady = true;
      watermark.style.animation = "none";
    };

    if (watermark) {
      if (waitForIntro) {
        watermark.addEventListener("animationend", takeOver, { once: true });

        const html = document.documentElement;
        const armTakeover = () => {
          takeoverTimer = window.setTimeout(takeOver, 1400);
        };

        if (html.classList.contains("intro-done")) {
          armTakeover();
        } else {
          introObserver = new MutationObserver(() => {
            if (html.classList.contains("intro-done")) {
              introObserver?.disconnect();
              armTakeover();
            }
          });
          introObserver.observe(html, { attributes: true, attributeFilter: ["class"] });
        }
      } else {
        takeOver();
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
      const rawVh = window.innerHeight / cssZoom;
      const vh = stageHeight ? Math.min(rawVh, stageHeight) : rawVh;
      const rawVw = window.innerWidth / cssZoom;
      const vw = stageWidth ? Math.min(rawVw, stageWidth) : rawVw;
      const stageLeft = (rawVw - vw) / 2;
      const stickyH = vh;
      const leadScroll = stickyH * 0.62;
      const holdScroll = stickyH * FINAL_HOLD_RATIO;
      const maxTx = Math.max(0, stripW - vw);
      const txStart = stageLeft + vw + ENTRY_BUFFER;
      const txEnd = stageLeft + (finalAlign === "center" ? (vw - stripW) / 2 : -maxTx);

      // Horizontal motion starts fully off-screen right and stops exactly when
      // the final sachet reaches its target alignment.
      const travelDistance = Math.abs(txStart - txEnd);
      const travelScroll = travelDistance * MOTION_SCROLL_RATIO;

      return {
        vw,
        rawVw,
        stageLeft,
        stickyH,
        leadScroll,
        holdScroll,
        maxTx,
        txStart,
        txEnd,
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
        rawVw,
        leadScroll,
        txStart,
        txEnd,
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
      const tx = txStart + (txEnd - txStart) * ease(sachetProgress);

      strip1.style.transform = `translateX(${tx}px)`;
      strip2.style.transform = `translateX(${tx}px)`;

      if (wmReady && watermark) {
        const wmW = watermark.offsetWidth;
        const txCenter = -wmW / 2;
        const txGone = -(rawVw / 2 + wmW + 60);
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
      introObserver?.disconnect();
      window.clearTimeout(takeoverTimer);
      watermark?.removeEventListener("animationend", takeOver);
    };
  }, [finalAlign, stageHeight, stageWidth, stripW, watermarkSelector, waitForIntro]);

  const capVh = (value: string, ratio: number) =>
    stageHeight ? `min(${value}, ${stageHeight * ratio}px)` : value;
  const capNegativeVh = (value: string, ratio: number) =>
    stageHeight ? `max(${value}, -${stageHeight * ratio}px)` : value;

  const strip1Top = capVh(STRIP1_TOP, 0.8289);
  const strip1Height = capVh(STRIP1_H, 0.21);
  const strip2Top = capVh(STRIP2_TOP, 1.0389);
  const strip2Height = capVh(STRIP2_H, 0.21);
  const strip2Crop = capNegativeVh(STRIP2_CROP, 0.21);
  const sachetHeight = capVh(SACHET_H, 0.42);
  const overlayHeight = capVh(OVERLAY_H, 0.42);

  const renderStrip = (cropTop: string | number = 0) => {
    if (stripImage) {
      return (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: cropTop,
            width: stripW,
            height: stripH,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stripImage}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      );
    }

    return sachets.map((src, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: i * SPACING,
          top: cropTop,
          width: SACHET_W,
          height: sachetHeight,
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
    ));
  };

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
            top: stripImage ? (stripTop ?? strip1Top) : strip1Top,
            left: 0,
            width: stripW,
            height: stripImage ? stripH : strip1Height,
            overflow: stripImage ? "visible" : "hidden",
            willChange: "transform",
            transformOrigin: "top left",
            zIndex: 3,
            transform: "translateX(9999px)",
          }}
        >
          {renderStrip(stripImage ? 0 : STRIP1_CROP)}
        </div>

        <div
          ref={strip2Ref}
          style={{
            position: "absolute",
            top: strip2Top,
            left: 0,
            width: stripW,
            height: strip2Height,
            overflow: "hidden",
            willChange: "transform",
            transformOrigin: "top left",
            zIndex: 3,
            transform: "translateX(9999px)",
            display: stripImage ? "none" : "block",
          }}
        >
          {stripImage ? null : renderStrip(strip2Crop)}
        </div>

        <div
          style={{
            position: "absolute",
            top: stripImage ? (stripTop ?? strip1Top) : strip1Top,
            left: 0,
            right: 0,
            height: stripImage ? stripH : overlayHeight,
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
