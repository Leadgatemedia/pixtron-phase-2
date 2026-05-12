"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

function ArrowIcon({ color = "white" }: { color?: "white" | "dark" }) {
  const file = color === "dark" ? "/arrow-black.webp" : "/arrow-white.webp";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" style={{ display: "block" }} />;
}

const MIN_CARD_H = 400;
const MAX_CARD_H = 720;
const CARD_W   = 434;
const CARD_GAP = 30;
const NAVBAR_HEIGHT = 88;
const PINNED_TITLE_HEIGHT = 206;
const CARD_TOP_INSET = 28;
const HEADING_TOP_PADDING = 58;
const HEADING_BOTTOM_PADDING = 30;
const CTA_HEIGHT = 56;
const CONTENT_BOTTOM_ROOM = 36;
const MIN_CARD_CTA_GAP = CARD_GAP;
const MAX_CARD_CTA_GAP = CARD_GAP;
const MIN_CTA_DROP = 200;
const MAX_CTA_DROP = 460;
const HEADING_RELEASE_START = 0.68;
const HEADING_RELEASE_END = 0.78;
const CONTENT_LIFT_START = 0.78;
const CONTENT_LIFT_END = 0.96;

const venues = [
  { image: "/restaurant_v2.webp", title: "Restaurants", subtitle: "Enhance dining with premium wipes",  startY: 0   },
  { image: "/cafe_v2.webp",       title: "Cafe's",       subtitle: "High-traffic lifestyle touchpoints", startY: 100 },
  { image: "/hotel_v2.webp",      title: "Hotels",       subtitle: "Premium hospitality amenities",      startY: 200 },
];

const BANDS = [
  { from: 0.00, to: 0.34 },
  { from: 0.34, to: 0.68 },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getResponsiveVenueMetrics(stickyH: number) {
  const usableH = Math.max(0, stickyH - CARD_TOP_INSET - CTA_HEIGHT - CONTENT_BOTTOM_ROOM);
  const cardH = Math.round(clamp(usableH * 0.82, MIN_CARD_H, MAX_CARD_H));
  const ctaGap = Math.round(clamp(usableH * 0.13, MIN_CARD_CTA_GAP, MAX_CARD_CTA_GAP));
  const ctaDrop = Math.round(clamp(cardH * 0.72, MIN_CTA_DROP, MAX_CTA_DROP));

  return { cardH, ctaGap, ctaDrop };
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function WherePixtronWorksScroll() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);
  const card3Ref   = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer   = outerRef.current;
    const heading = headingRef.current;
    const sticky  = stickyRef.current;
    const content = contentRef.current;
    const cta     = ctaRef.current;
    if (!outer || !sticky || !content || !cta) return;

    const setBottomBlurDisabled = () => {
      const rect = outer.getBoundingClientRect();
      const isDesktop = window.innerWidth >= 768;
      const inSection = rect.top < window.innerHeight && rect.bottom > 0;
      document.body.dataset.footerBlurDisabled = isDesktop && inSection ? "true" : "false";
    };

    const setDimensions = () => {
      const cssZoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      const viewportH = window.innerHeight / cssZoom;
      const stickyTop = NAVBAR_HEIGHT + PINNED_TITLE_HEIGHT;
      const stickyH = Math.max(0, viewportH - stickyTop);
      const { cardH, ctaGap, ctaDrop } = getResponsiveVenueMetrics(stickyH);
      content.style.setProperty("--venue-card-height", `${cardH}px`);
      content.style.setProperty("--venue-card-cta-gap", `${ctaGap}px`);
      content.style.setProperty("--venue-cta-drop", `${ctaDrop}px`);
      sticky.style.height = `${stickyH}px`;
      sticky.style.top = `${stickyTop}px`;
      outer.style.height  = `${stickyH * 4.4 + stickyTop}px`;

      const contentH = content.offsetHeight + CARD_TOP_INSET;
      const scale    = contentH > 0 ? Math.min(1, (stickyH - 16) / contentH) : 1;
      // Keep breathing room so the sticky clip never slices the card tops.
      content.style.transform = `translateX(-50%) scale(${scale})`;
      requestAnimationFrame(update);
    };

    // Two rAFs: first paints, second measures correct offsetHeight
    requestAnimationFrame(() => requestAnimationFrame(setDimensions));
    window.addEventListener("resize", setDimensions);

    const update = () => {
      const rect      = outer.getBoundingClientRect();
      const outerH    = outer.offsetHeight;
      const cssZoom   = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      const viewportH = window.innerHeight / cssZoom;
      const initialStickyTop = NAVBAR_HEIGHT + PINNED_TITLE_HEIGHT;
      const stickyH = Math.max(0, viewportH - initialStickyTop);
      const scrolled  = -rect.top;
      const maxScroll = Math.max(1, outerH - stickyH);
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Card 2 — top: 100 → 0 during band 0
      const headingReleaseProgress = Math.max(
        0,
        Math.min(1, (progress - HEADING_RELEASE_START) / (HEADING_RELEASE_END - HEADING_RELEASE_START))
      );
      const contentLiftProgress = Math.max(
        0,
        Math.min(1, (progress - CONTENT_LIFT_START) / (CONTENT_LIFT_END - CONTENT_LIFT_START))
      );
      const easedHeadingRelease = easeInOut(headingReleaseProgress);
      const easedContentLift = easeInOut(contentLiftProgress);

      if (heading) {
        heading.style.transform = `translateY(${-PINNED_TITLE_HEIGHT * easedHeadingRelease}px)`;
      }

      const currentStickyTop = initialStickyTop - PINNED_TITLE_HEIGHT * easedContentLift;
      sticky.style.top = `${currentStickyTop}px`;
      sticky.style.height = `${Math.max(0, viewportH - currentStickyTop)}px`;

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

      const ctaStart = BANDS[1].from;
      const ctaEnd   = BANDS[1].to;
      const ctaProgress = Math.max(0, Math.min(1, (progress - ctaStart) / (ctaEnd - ctaStart)));
      const ctaDrop = parseFloat(content.style.getPropertyValue("--venue-cta-drop")) || MIN_CTA_DROP;
      cta.style.transform = `translateY(${ctaDrop * (1 - easeInOut(ctaProgress))}px)`;
      setBottomBlurDisabled();
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", setBottomBlurDisabled);
    update();
    return () => {
      document.body.dataset.footerBlurDisabled = "false";
      if (heading) {
        heading.style.transform = "";
      }
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", setDimensions);
      window.removeEventListener("resize", setBottomBlurDisabled);
    };
  }, []);

  const totalW = CARD_W * 3 + CARD_GAP * 2;
  const cardHeight = "var(--venue-card-height, 400px)";
  const cardCtaGap = "var(--venue-card-cta-gap, 40px)";
  const ctaDrop = "var(--venue-cta-drop, 200px)";

  return (
    <div style={{ background: "#fff" }}>
      {/* Keep the heading pinned while the venue cards animate below it. */}
      <div
        ref={headingRef}
        className="desktop-pinned-section-heading"
        style={{
          background: "#fff",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          minHeight: PINNED_TITLE_HEIGHT,
          padding: `${HEADING_TOP_PADDING}px 39px ${HEADING_BOTTOM_PADDING}px`,
        }}
      >
        <h2 className="section-heading gradient-heading">Where Pixtron Works Best</h2>
        <p className="section-subtitle">
          From upscale restaurants to casual cafes, Pixtron fits seamlessly into any dining environment
        </p>
      </div>

    <div ref={outerRef} style={{ position: "relative", minHeight: "400vh" }}>
      {/* Sticky panel — clips stagger overflow at viewport edges */}
      <div
        ref={stickyRef}
        style={{ position: "sticky", top: NAVBAR_HEIGHT + PINNED_TITLE_HEIGHT, background: "#fff", overflow: "hidden", minHeight: `calc(100vh - ${NAVBAR_HEIGHT + PINNED_TITLE_HEIGHT}px)` }}
      >
        {/* Content — anchored to top so card1 aligns with viewport top on first pin */}
        <div
          ref={contentRef}
          style={{
            position:        "absolute",
            top:             CARD_TOP_INSET,
            left:            "50%",
            transform:       "translateX(-50%)",
            transformOrigin: "top center",
            display:         "flex",
            flexDirection:   "column",
            alignItems:      "center",
            gap:             cardCtaGap,
          }}
        >
          {/* Cards — absolutely positioned within a fixed-size relative container.
              No overflow:hidden here — the sticky clips stagger overflow at its own boundary.
              This removes the visible "pocket box" that appeared during animation. */}
          <div
            style={{
              position:   "relative",
              width:      totalW,
              height:     cardHeight,
              flexShrink: 0,
            }}
          >
            {/* Card 1 — always at top=0 */}
            <div style={{ position: "absolute", left: 0, top: 0, width: CARD_W, height: cardHeight }}>
              <CardEl venue={venues[0]} />
            </div>

            {/* Card 2 — starts at top=100, rises to 0 */}
            <div ref={card2Ref} style={{ position: "absolute", left: CARD_W + CARD_GAP, top: venues[1].startY, width: CARD_W, height: cardHeight }}>
              <CardEl venue={venues[1]} />
            </div>

            {/* Card 3 — starts at top=200, rises to 0 */}
            <div ref={card3Ref} style={{ position: "absolute", left: (CARD_W + CARD_GAP) * 2, top: venues[2].startY, width: CARD_W, height: cardHeight }}>
              <CardEl venue={venues[2]} />
            </div>
          </div>

          {/* CTA — above any card overflow via z-index */}
          <div ref={ctaRef} style={{ position: "relative", zIndex: 2, transform: `translateY(${ctaDrop})`, display: "flex", gap: 24, alignItems: "center" }}>
            <Link href="/signature-series" className="btn-primary" style={{ width: 256, flexShrink: 0 }}>
              <span>Get Signature Series</span>
              <ArrowIcon color="white" />
            </Link>
            <Link href="/custom-series" className="btn-outline" style={{ width: 256, flexShrink: 0 }}>
              <span>Get Custom Series</span>
              <ArrowIcon color="dark" />
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
        loading="lazy"
        decoding="async"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
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
