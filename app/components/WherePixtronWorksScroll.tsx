"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="4"   cy="12" r="1.5" fill="#fff" />
      <circle cx="8.5" cy="12" r="1.5" fill="#fff" />
      <line x1="11" y1="12" x2="18" y2="12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <polyline points="15,8.5 19.5,12 15,15.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

const CARD_H   = 668;
const CARD_W   = 421;
const CARD_GAP = 30;
const NAVBAR_HEIGHT = 88;
const CTA_DROP = 76;

const venues = [
  { image: "/restaurant_clean.png", title: "Restaurants", subtitle: "Enhance dining with premium wipes",  startY: 0   },
  { image: "/cafe_clean.png",       title: "Cafe's",       subtitle: "High-traffic lifestyle touchpoints", startY: 100 },
  { image: "/hotel_clean.png",      title: "Hotels",       subtitle: "Premium hospitality amenities",      startY: 200 },
];

const BANDS = [
  { from: 0.00, to: 0.16 },
  { from: 0.16, to: 0.32 },
];

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function WherePixtronWorksScroll() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);
  const card3Ref   = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer   = outerRef.current;
    const sticky  = stickyRef.current;
    const content = contentRef.current;
    const cta     = ctaRef.current;
    if (!outer || !sticky || !content || !cta) return;

    const setDimensions = () => {
      const cssZoom = parseFloat(document.documentElement.style.zoom) || 1;
      const viewportH = window.innerHeight / cssZoom;
      const stickyH = Math.max(0, viewportH - NAVBAR_HEIGHT);
      sticky.style.height = `${stickyH}px`;
      outer.style.height  = `${stickyH * 2.6 + NAVBAR_HEIGHT}px`;

      const contentH = content.offsetHeight;
      const scale    = contentH > 0 ? Math.min(1, (stickyH - 32) / contentH) : 1;
      content.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    // Two rAFs: first paints, second measures correct offsetHeight
    requestAnimationFrame(() => requestAnimationFrame(setDimensions));
    window.addEventListener("resize", setDimensions);

    const update = () => {
      const rect      = outer.getBoundingClientRect();
      const outerH    = outer.offsetHeight;
      const stickyH   = sticky.offsetHeight;
      const scrolled  = -rect.top;
      const maxScroll = Math.max(1, outerH - stickyH);
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Card 2 — top: 100 → 0 during band 0
      if (card2Ref.current) {
        const { from, to } = BANDS[0];
        const t = Math.max(0, Math.min(1, (progress - from) / (to - from)));
        card2Ref.current.style.top = `${venues[1].startY * (1 - easeInOut(t))}px`;
      }

      // Card 3 — top: 200 → 0 during band 1
      if (card3Ref.current) {
        const { from, to } = BANDS[1];
        const t = Math.max(0, Math.min(1, (progress - from) / (to - from)));
        card3Ref.current.style.top = `${venues[2].startY * (1 - easeInOut(t))}px`;
      }

      const ctaProgress = Math.max(0, Math.min(1, progress / BANDS[1].to));
      cta.style.transform = `translateY(${CTA_DROP * (1 - easeInOut(ctaProgress))}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  const totalW = CARD_W * 3 + CARD_GAP * 2;

  return (
    <div style={{ background: "#fff" }}>
      {/* Heading scrolls normally — exits viewport before cards start sticking */}
      <div style={{ background: "#fff", textAlign: "center", padding: "104px 39px 48px", display: "flex", flexDirection: "column", gap: 32 }}>
        <h2 className="section-heading gradient-heading">Where Pixtron Works Best</h2>
        <p className="section-subtitle">
          From upscale restaurants to casual cafes, Pixtron fits seamlessly into any dining environment
        </p>
      </div>

    <div ref={outerRef} style={{ position: "relative", minHeight: "400vh" }}>
      {/* Sticky panel — clips stagger overflow at viewport edges */}
      <div
        ref={stickyRef}
        style={{ position: "sticky", top: NAVBAR_HEIGHT, background: "#fff", overflow: "hidden", minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
      >
        {/* Content — absolutely centered + scaled to always fit */}
        <div
          ref={contentRef}
          style={{
            position:        "absolute",
            top:             "50%",
            left:            "50%",
            transform:       "translate(-50%, -50%)",
            transformOrigin: "center center",
            display:         "flex",
            flexDirection:   "column",
            alignItems:      "center",
            gap:             40,
          }}
        >
          {/* Cards — absolutely positioned within a fixed-size relative container.
              No overflow:hidden here — the sticky clips stagger overflow at its own boundary.
              This removes the visible "pocket box" that appeared during animation. */}
          <div
            style={{
              position:   "relative",
              width:      totalW,
              height:     CARD_H,
              flexShrink: 0,
            }}
          >
            {/* Card 1 — always at top=0 */}
            <div style={{ position: "absolute", left: 0, top: 0, width: CARD_W, height: CARD_H }}>
              <CardEl venue={venues[0]} />
            </div>

            {/* Card 2 — starts at top=100, rises to 0 */}
            <div ref={card2Ref} style={{ position: "absolute", left: CARD_W + CARD_GAP, top: venues[1].startY, width: CARD_W, height: CARD_H }}>
              <CardEl venue={venues[1]} />
            </div>

            {/* Card 3 — starts at top=200, rises to 0 */}
            <div ref={card3Ref} style={{ position: "absolute", left: (CARD_W + CARD_GAP) * 2, top: venues[2].startY, width: CARD_W, height: CARD_H }}>
              <CardEl venue={venues[2]} />
            </div>
          </div>

          {/* CTA — above any card overflow via z-index */}
          <div ref={ctaRef} style={{ position: "relative", zIndex: 2, transform: `translateY(${CTA_DROP}px)` }}>
            <Link href="/contact?type=advertiser" className="btn-primary">
              <span>Advertise With Pixtron</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

function CardEl({ venue }: { venue: typeof venues[number] }) {
  return (
    <div
      style={{
        width: "100%", height: "100%",
        borderRadius: 20,
        overflow:     "hidden",
        position:     "relative",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={venue.image}
        alt={venue.title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Figma: gradient h-274, p-32, gap-20, dark-to-transparent top-down */}
      <div
        style={{
          position:      "absolute",
          top: 0, left: 0, right: 0,
          height:        274,
          background:    "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
          padding:       32,
          display:       "flex",
          flexDirection: "column",
          gap:           12,
          boxSizing:     "border-box",
          borderRadius:  "20px 20px 0 0",
        }}
      >
        <p style={{ fontSize: 30, fontWeight: 700, color: "#fff", lineHeight: "36px", margin: 0 }}>
          {venue.title}
        </p>
        <p style={{ fontSize: 18, fontWeight: 400, color: "#fff", lineHeight: 1.5, margin: 0 }}>
          {venue.subtitle}
        </p>
      </div>
    </div>
  );
}
