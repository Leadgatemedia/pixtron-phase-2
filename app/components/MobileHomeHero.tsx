"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SACHETS = [
  "/sachets/sachet-1.png",
  "/sachets/sachet-2.png",
  "/sachets/sachet-4.png",
  "/sachets/sachet-hotel.png",
  "/sachets/sachet-3.png",
  "/sachets/sachet-7.png",
  "/sachets/sachet-5.png",
];

const ZOOM = 0.8;
const STRIP_W = 1328.575;
const SACHET_W = 295.366;
const SPACING = 188.66;

function ArrowIcon({ color }: { color: "white" | "dark" }) {
  const file = color === "white" ? "/arrow-white.png" : "/arrow-black.png";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" style={{ display: "block" }} />;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export default function MobileHomeHero() {
  const [progress, setProgress] = useState(0);
  const [viewportW, setViewportW] = useState(393);
  const dragRef = useRef({ active: false, startX: 0, startProgress: 0 });

  useEffect(() => {
    const updateViewport = () => {
      const zoom = parseFloat(document.documentElement.style.zoom) || ZOOM;
      setViewportW(window.innerWidth / zoom);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const dragDistance = Math.max(1, viewportW * 1.35);
  const stripStartX = viewportW - 35.82;
  const stripEndX = -Math.max(0, STRIP_W - viewportW + 35.82);
  const stripX = stripStartX + (stripEndX - stripStartX) * ease(progress);

  const alignProgress = clamp(progress / 0.45);
  const exitProgress = clamp((progress - 0.38) / 0.62);
  const watermarkX = -viewportW * 0.74 * ease(exitProgress);
  const watermarkOpacity = Math.max(0, 1 - (alignProgress * 0.2 + exitProgress * 0.85));
  const widestWord = "REMEMBERED".length * 27;
  const wordOffsets = ["SEEN", "TOUCHED", "REMEMBERED"].map((word) => {
    const wordWidth = word.length * 27;
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
        padding: "152px 16px 56px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "min(361px, calc(100vw / 0.8 - 32px))",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 56,
        }}
      >
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
          <h1
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
            Advertising that people{" "}
            <span style={{ color: "#0f9d58" }}>touch, see and smell</span>
          </h1>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
            <Link
              href="/contact?type=advertiser"
              className="btn-primary"
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
              <span>Advertise With Pixtron</span>
              <ArrowIcon color="white" />
            </Link>

            <Link
              href="/contact?type=restaurant"
              className="btn-outline"
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
              <span>For Restaurants</span>
              <ArrowIcon color="dark" />
            </Link>
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
            Pixtron places your brand in the hands of customers through custom wet
            wipe sachets at restaurants, hotels, and events.
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
            width: "calc(100vw / 0.8)",
            height: 242,
            overflow: "hidden",
            marginInline: "calc((min(361px, calc(100vw / 0.8 - 32px)) - (100vw / 0.8)) / 2)",
            cursor: "grab",
            touchAction: "pan-y",
            userSelect: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${watermarkX}px), -50%)`,
              color: "rgba(0,0,0,0.06)",
              fontSize: 50,
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

          {[15, 116.37].map((top, rowIndex) => (
            <div
              key={top}
              style={{
                position: "absolute",
                top,
                left: 0,
                width: STRIP_W,
                height: rowIndex === 0 ? 106.708 : 105.375,
                overflow: "hidden",
                transform: `translateX(${stripX}px)`,
                willChange: "transform",
                zIndex: 2,
              }}
            >
              {SACHETS.map((src, index) => (
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
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>
          ))}

          <div
            style={{
              position: "absolute",
              inset: "-1px 0 0",
              height: 243,
              background:
                "linear-gradient(90deg, #f6fbf6 2.4%, rgba(246,251,246,0) 15%, rgba(246,251,246,0) 85%, #f6fbf6 98%)",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}
