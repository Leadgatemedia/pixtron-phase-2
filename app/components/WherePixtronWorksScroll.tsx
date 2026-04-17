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

const venues = [
  { image: "/restaurent.png", title: "Restaurants", subtitle: "Enhance dining with premium wipes",  startY: 0   },
  { image: "/cafe's.png",     title: "Cafe's",       subtitle: "High-traffic lifestyle touchpoints", startY: 95  },
  { image: "/hotels.png",     title: "Hotels",       subtitle: "Premium hospitality amenities",      startY: 194 },
];

// Each card animates into alignment in its own scroll band
// Band 0: progress 0.00 → 0.40  →  card 2 rises
// Band 1: progress 0.40 → 0.80  →  card 3 rises
// Band 2: progress 0.80 → 1.00  →  CTA fades in
const BANDS = [
  { card: 1, from: 0.00, to: 0.22 },
  { card: 2, from: 0.22, to: 0.45 },
];
const CTA_START = 0.45;
const CTA_END = 0.78;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function WherePixtronWorksScroll() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsFrameRef = useRef<HTMLDivElement>(null);
  const card1Ref  = useRef<HTMLDivElement>(null);
  const card2Ref  = useRef<HTMLDivElement>(null);
  const card3Ref  = useRef<HTMLDivElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    const heading = headingRef.current;
    const cardsFrame = cardsFrameRef.current;
    const cta = ctaRef.current;
    if (!outer || !sticky || !heading || !cardsFrame || !cta) return;

    const cardRefs = [card1Ref.current, card2Ref.current, card3Ref.current];

    const setDimensions = () => {
      const cssZoom = parseFloat(document.documentElement.style.zoom) || 1;
      const stickyH = window.innerHeight / cssZoom;
      const cardsNaturalH = 668 + 194;
      const reservedSpace = heading.offsetHeight + cta.offsetHeight + 40;
      const availableCardsH = Math.max(520, stickyH - reservedSpace);
      const cardsScale = Math.min(1, availableCardsH / cardsNaturalH);
      const ctaTravel = 76 + cardsScale * 46;

      sticky.style.height = `${stickyH}px`;
      // Add more hold time so the cards stay pinned after the CTA reaches its final position
      outer.style.height = `${stickyH * 7}px`;
      cardsFrame.style.height = `${cardsNaturalH * cardsScale}px`;
      cardsFrame.style.transform = `scale(${cardsScale})`;
      cta.style.setProperty("--cta-travel", `${ctaTravel}px`);
    };

    setDimensions();
    window.addEventListener("resize", setDimensions);

    const update = () => {
      const rect      = outer.getBoundingClientRect();
      const outerH    = outer.offsetHeight;
      const stickyH   = sticky.offsetHeight;
      const scrolled  = -rect.top;
      const maxScroll = Math.max(1, outerH - stickyH);
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Card 1 — always at 0, never moves
      if (cardRefs[0]) cardRefs[0].style.top = "0px";

      // Card 2 — rises from 95 → 0 during band 0
      if (cardRefs[1]) {
        const { from, to } = BANDS[0];
        const t = Math.max(0, Math.min(1, (progress - from) / (to - from)));
        const y = venues[1].startY * (1 - easeInOut(t));
        cardRefs[1].style.top = `${y}px`;
      }

      // Card 3 — rises from 194 → 0 during band 1
      if (cardRefs[2]) {
        const { from, to } = BANDS[1];
        const t = Math.max(0, Math.min(1, (progress - from) / (to - from)));
        const y = venues[2].startY * (1 - easeInOut(t));
        cardRefs[2].style.top = `${y}px`;
      }

      // CTA — slides up 48px → 0 after cards are aligned
      if (ctaRef.current) {
        const t = easeInOut(Math.max(0, Math.min(1, (progress - CTA_START) / (CTA_END - CTA_START))));
        ctaRef.current.style.transform = `translateY(calc(4px - var(--cta-travel, 180px) * ${t}))`;
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          position:       "sticky",
          top:            0,
          background:     "#fff",
          overflow:       "hidden",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
        }}
      >
        {/* Heading */}
        <div ref={headingRef} style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="section-heading gradient-heading">Where Pixtron Works Best</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            From upscale restaurants to casual cafes, Pixtron fits seamlessly into any dining environment
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsFrameRef}
          style={{
            position: "relative",
            width:    1362,
            height:   668 + 194,
            transformOrigin: "top center",
          }}
        >
          {[card1Ref, card2Ref, card3Ref].map((ref, i) => (
            <div
              key={i}
              ref={ref}
              style={{
                width:        434,
                height:       668,
                borderRadius: 20,
                overflow:     "hidden",
                position:     "absolute",
                left:         i === 0 ? 0 : i === 1 ? 464 : 928,
                top:          venues[i].startY,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={venues[i].image}
                alt={venues[i].title}
                style={{
                  position:   "absolute",
                  inset:      0,
                  width:      "100%",
                  height:     "100%",
                  objectFit:  "cover",
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA — visible from start, slides up once cards top-align */}
        <div
          ref={ctaRef}
          style={{
            marginTop: 24,
            transform: "translateY(4px)",
          }}
        >
          <Link href="#" className="btn-primary">
            <span>Advertise With Pixtron</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
