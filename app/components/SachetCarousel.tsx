"use client";

import { useRef, useEffect } from "react";

const SACHET_IMAGE = "/sachets/sachets-hero-new.png";
// Natural dimensions of the Figma composite image
const IMG_W = 2073;
const IMG_H = 322;
const CONTAINER_H = 356;

export default function SachetCarousel() {
  const outerRef = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const img   = imgRef.current;
    if (!outer || !img) return;

    const setHeight = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const travel = Math.max(0, IMG_W - vw);
      outer.style.height = `${vh + travel}px`;
    };

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

    const update = () => {
      const rect     = outer.getBoundingClientRect();
      const outerH   = outer.offsetHeight;
      const vh       = window.innerHeight;
      const vw       = window.innerWidth;
      const scrolled = -rect.top;
      const maxScroll = outerH - vh;
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll));
      const travel    = Math.max(0, IMG_W - vw);
      img.style.transform = `translateX(${-progress * travel}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={outerRef} style={{ position: "relative" }}>
      <div
        style={{
          position:       "sticky",
          top:            0,
          height:         "100vh",
          overflow:       "hidden",
          background:     "linear-gradient(180deg,#f6fbf6 0%,#ffffff 100%)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            position: "relative",
            width:    "100%",
            height:   CONTAINER_H,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={SACHET_IMAGE}
            alt="Pixtron sachet collection"
            style={{
              height:      IMG_H,
              width:       IMG_W,
              display:     "block",
              objectFit:   "contain",
              willChange:  "transform",
              position:    "absolute",
              top:         "50%",
              left:        0,
              transform:   "translateY(-50%)",
            }}
          />
          {/* Fade overlay matching Figma */}
          <div
            style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(90deg, #f6fbf6 2%, transparent 15%, transparent 85%, #f6fbf6 98%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
