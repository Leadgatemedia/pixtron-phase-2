"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DEFAULT_SACHETS = [
  "/sachets/sachet-1.webp",
  "/sachets/sachet-2.webp",
  "/sachets/sachet-4.webp",
  "/sachets/sachet-hotel.webp",
  "/sachets/sachet-3.webp",
  "/sachets/sachet-7.webp",
  "/sachets/sachet-5.webp",
];

const SACHET_W = 295.366;
const SPACING = 188.66;
const SACHET_EDGE_PEEK = 48;
const STRIP_CROP_W = 98.751;
const STRIP_SOURCE_W = 1855;
const STRIP_SOURCE_H = 400;

type MobileHeroButton = {
  label: string;
  href: string;
  variant?: "primary" | "outline";
};

type MobileHomeHeroProps = {
  sachets?: string[];
  stripImage?: string;
  stripWidth?: number;
  finalAlign?: "edge" | "center";
  headlineBefore?: string;
  headlineHighlight?: string;
  body?: string;
  primaryButton?: MobileHeroButton;
  secondaryButton?: MobileHeroButton | null;
  paddingTop?: number;
  useIntroReveal?: boolean;
};

function ArrowIcon({ color }: { color: "white" | "dark" }) {
  const file = color === "white" ? "/arrow-white.webp" : "/arrow-black.webp";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" style={{ display: "block" }} />;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export default function MobileHomeHero({
  sachets = DEFAULT_SACHETS,
  stripImage,
  stripWidth,
  finalAlign = "edge",
  headlineBefore = "Branding that people",
  headlineHighlight = "touch, see and smell",
  body = "Pixtron places your brand in the hands of customers through custom wet wipe sachets at restaurants, hotels, and events.",
  primaryButton = { label: "Get Signature Series", href: "/signature-series", variant: "primary" },
  secondaryButton = { label: "Get Custom Series", href: "/custom-series", variant: "outline" },
  paddingTop = 152,
  useIntroReveal = true,
}: MobileHomeHeroProps) {
  const [progress, setProgress] = useState(0);
  const [viewportW, setViewportW] = useState(393);
  const dragRef = useRef({ active: false, startX: 0, startProgress: 0 });
  const stripW = stripImage ? (stripWidth ?? 1122) : SACHET_W + (sachets.length - 1) * SPACING - STRIP_CROP_W;
  const stripH = stripImage ? (stripW * STRIP_SOURCE_H) / STRIP_SOURCE_W : 242.148;

  useEffect(() => {
    const updateViewport = () => {
      setViewportW(window.innerWidth);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const dragDistance = Math.max(1, viewportW * 1.35);
  const stripStartX = viewportW - SACHET_EDGE_PEEK;
  const stripEndX = finalAlign === "center" ? (viewportW - stripW) / 2 : -Math.max(0, stripW - viewportW + SACHET_EDGE_PEEK);
  const stripX = stripStartX + (stripEndX - stripStartX) * ease(progress);

  const alignProgress = clamp(progress / 0.45);
  const exitProgress = clamp((progress - 0.38) / 0.62);
  const watermarkX = -viewportW * 0.74 * ease(exitProgress);
  const watermarkOpacity = Math.max(0, 1 - (alignProgress * 0.2 + exitProgress * 0.85));
  const watermarkLetterWidth = Math.min(27, viewportW * 0.064);
  const widestWord = "REMEMBERED".length * watermarkLetterWidth;
  const wordOffsets = ["SEEN", "TOUCHED", "REMEMBERED"].map((word) => {
    const wordWidth = word.length * watermarkLetterWidth;
    return -((widestWord - wordWidth) / 2) * ease(alignProgress);
  });

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startProgress: progress,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const delta = dragRef.current.startX - event.clientX;
    setProgress(clamp(dragRef.current.startProgress + delta / dragDistance));
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // The browser may already have released the pointer.
    }
  };

  return (
    <section
      className="mobile-home-hero"
      style={{
        display: "none",
        background: "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)",
        padding: `${paddingTop}px 16px 56px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 361,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 56,
        }}
      >
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
          <h1
            data-mobile-hero-headline={useIntroReveal ? "" : undefined}
            style={{
              margin: 0,
              width: "100%",
              color: "#000",
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {headlineBefore}{" "}
            <span style={{ color: "#0f9d58" }}>{headlineHighlight}</span>
          </h1>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
            <Link
              href={primaryButton.href}
              className={primaryButton.variant === "outline" ? "btn-outline" : "btn-primary"}
              style={{
                width: "100%",
                minHeight: 58,
                boxSizing: "border-box",
                justifyContent: "space-between",
                padding: "16px 20px 16px 22px",
                borderRadius: 6,
                fontSize: 18,
                lineHeight: "30px",
              }}
            >
              <span>{primaryButton.label}</span>
              <ArrowIcon color={primaryButton.variant === "outline" ? "dark" : "white"} />
            </Link>

            {secondaryButton ? (
              <Link
                href={secondaryButton.href}
                className={secondaryButton.variant === "primary" ? "btn-primary" : "btn-outline"}
                style={{
                  width: "100%",
                  minHeight: 58,
                  boxSizing: "border-box",
                  justifyContent: "space-between",
                  padding: "16px 20px 16px 22px",
                  borderRadius: 6,
                  fontSize: 18,
                  lineHeight: "30px",
                }}
              >
                <span>{secondaryButton.label}</span>
                <ArrowIcon color={secondaryButton.variant === "primary" ? "white" : "dark"} />
              </Link>
            ) : null}
          </div>

          <p
            style={{
              margin: 0,
              width: "100%",
              color: "rgba(0,0,0,0.8)",
              fontSize: 18,
              fontWeight: 500,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            {body}
          </p>
        </div>

        <div
          aria-label="Swipe sachets"
          role="img"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          style={{
            position: "relative",
            width: "100vw",
            height: 242,
            overflow: "hidden",
            marginInline: "calc((100% - 100vw) / 2)",
            contain: "layout paint",
            cursor: "grab",
            touchAction: "pan-y",
            userSelect: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "100vw",
              transform: `translate(${watermarkX}px, -50%)`,
              color: "rgba(0,0,0,0.06)",
              fontSize: "clamp(42px, 12vw, 50px)",
              fontWeight: 500,
              lineHeight: 1.2,
              textAlign: "center",
              whiteSpace: "nowrap",
              opacity: watermarkOpacity,
              zIndex: 1,
            }}
          >
            {["SEEN", "TOUCHED", "REMEMBERED"].map((word, index) => (
              <div key={word} style={{ transform: `translateX(${wordOffsets[index]}px)` }}>
                {word}
              </div>
            ))}
          </div>

          {(stripImage ? [15] : [15, 116.37]).map((top, rowIndex) => (
            <div
              key={top}
              style={{
                position: "absolute",
                top,
                left: 0,
                width: stripW,
                height: stripImage ? stripH : rowIndex === 0 ? 106.708 : 105.375,
                overflow: stripImage ? "visible" : "hidden",
                contain: "layout paint",
                transform: `translateX(${stripX}px)`,
                willChange: "transform",
                zIndex: 2,
              }}
            >
              {stripImage ? (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: stripW,
                    height: stripH,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stripImage}
                    alt=""
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
              ) : (
                sachets.map((src, index) => (
                  <div
                    key={`${src}-${rowIndex}`}
                    style={{
                      position: "absolute",
                      left: -49.97 + index * SPACING,
                      top: rowIndex === 0 ? -14.67 : -121.38,
                      width: SACHET_W,
                      height: 242.148,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                ))
              )}
            </div>
          ))}

          <div
            style={{
              position: "absolute",
              inset: "-1px 0 0",
              height: 243,
              background:
                "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.92) 5%, rgba(255,255,255,0) 18%, rgba(255,255,255,0) 82%, rgba(255,255,255,0.92) 95%, #fff 100%)",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}
