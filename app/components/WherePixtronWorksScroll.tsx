"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function ArrowIcon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/arrow-white.png" width={24} height={24} alt="" className="btn-arrow-img" style={{ display: "block" }} />;
}

const venues = [
  { image: "/venues/restaurant-figma.png", title: "Restaurants", subtitle: "Enhance dining with premium wipes", startY: 0 },
  { image: "/venues/cafe-figma.png", title: "Cafe's", subtitle: "High-traffic lifestyle touchpoints", startY: 56 },
  { image: "/venues/hotels-figma.png", title: "Hotels", subtitle: "Premium hospitality amenities", startY: 112 },
];

const BASE_CARD_WIDTH = 532;
const BASE_CARD_HEIGHT = 690;
const BASE_CARD_GAP = 30;
const NAVBAR_HEIGHT = 88;
const SECTION_TOP_PADDING = 8;
const SECTION_BOTTOM_PADDING = 28;
const CTA_GAP = 28;
const CTA_TRAVEL = 56;
const CARD_ASPECT_RATIO = BASE_CARD_HEIGHT / BASE_CARD_WIDTH;
const FALLBACK_FRAME_WIDTH = 1351;

const CARD_BANDS = [
  { card: 1, from: 0.02, to: 0.13 },
  { card: 2, from: 0.13, to: 0.24 },
];
const CTA_START = 0.24;
const CTA_END = 0.4;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function easeOutQuick(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export default function WherePixtronWorksScroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsFrameRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsScaleRef = useRef(1);

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const heading = headingRef.current;
    const cardsFrame = cardsFrameRef.current;
    const ctaWrap = ctaWrapRef.current;
    const cta = ctaRef.current;

    if (!outer || !sticky || !heading || !cardsFrame || !ctaWrap || !cta) return;

    const setDimensions = () => {
      const cssZoom = parseFloat(document.documentElement.style.zoom) || 1;
      const viewportHeight = window.innerHeight / cssZoom;
      const stickyViewportHeight = Math.max(0, viewportHeight - NAVBAR_HEIGHT);
      const headingApprox = heading.offsetHeight;
      const ctaApprox = cta.offsetHeight;
      const sectionPadding = SECTION_TOP_PADDING + SECTION_BOTTOM_PADDING + 16;
      const availableCardsHeight = Math.max(
        520,
        stickyViewportHeight - headingApprox - ctaApprox - sectionPadding - CTA_GAP,
      );
      const industriesGrid = document.querySelector<HTMLElement>('[data-industries-grid="true"]');
      const industriesRect = industriesGrid?.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const frameWidth = industriesRect?.width || FALLBACK_FRAME_WIDTH;
      const frameOffsetLeft = industriesRect ? industriesRect.left - stickyRect.left : Math.max(0, (stickyRect.width - frameWidth) / 2);
      const cardGap = BASE_CARD_GAP;
      const cardWidth = Math.max(0, (frameWidth - cardGap * (venues.length - 1)) / venues.length);
      const cardHeight = cardWidth * CARD_ASPECT_RATIO;
      const offsetScale = cardHeight / BASE_CARD_HEIGHT;
      const startOffsets = venues.map((venue) => venue.startY * offsetScale);
      const cardsScale = cardHeight / BASE_CARD_HEIGHT;
      cardsScaleRef.current = cardsScale;

      sticky.style.height = `${stickyViewportHeight}px`;
      outer.style.height = `${stickyViewportHeight * 4.1 + NAVBAR_HEIGHT}px`;
      cardsFrame.style.alignSelf = "flex-start";
      cardsFrame.style.width = `${frameWidth}px`;
      cardsFrame.style.marginLeft = `${frameOffsetLeft}px`;
      cardsFrame.style.height = `${cardHeight + startOffsets[venues.length - 1]}px`;
      cardsFrame.style.transform = "none";
      ctaWrap.style.alignSelf = "flex-start";
      ctaWrap.style.width = `${frameWidth}px`;
      ctaWrap.style.marginLeft = `${frameOffsetLeft}px`;
      ctaWrap.style.height = `${ctaApprox}px`;
      ctaWrap.style.marginTop = `${CTA_GAP}px`;
      ctaWrap.style.setProperty("--cta-travel", `${CTA_TRAVEL}px`);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        card.style.width = `${cardWidth}px`;
        card.style.height = `${cardHeight}px`;
        card.style.left = `${index * (cardWidth + cardGap)}px`;
        card.style.top = `${startOffsets[index]}px`;
      });
    };

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const outerHeight = outer.offsetHeight;
      const stickyHeight = sticky.offsetHeight;
      const scrolled = -rect.top;
      const maxScroll = Math.max(1, outerHeight - stickyHeight);
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        if (index === 0) {
          card.style.top = "0px";
          return;
        }

        const band = CARD_BANDS[index - 1];
        const t = easeOutQuick(Math.max(0, Math.min(1, (progress - band.from) / (band.to - band.from))));
        const y = venues[index].startY * cardsScaleRef.current * (1 - t);
        card.style.top = `${y}px`;
      });

      const ctaProgress = easeInOut(Math.max(0, Math.min(1, (progress - CTA_START) / (CTA_END - CTA_START))));
      cta.style.transform = `translateY(calc(var(--cta-travel, 140px) * ${1 - ctaProgress}))`;
      cta.style.opacity = `${Math.max(0, Math.min(1, (progress - 0.22) / 0.08))}`;
    };

    setDimensions();
    window.addEventListener("resize", setDimensions);
    window.addEventListener("scroll", update, { passive: true });
    update();

    const industriesGrid = document.querySelector<HTMLElement>('[data-industries-grid="true"]');
    const ro = industriesGrid ? new ResizeObserver(() => setDimensions()) : null;
    if (industriesGrid && ro) {
      ro.observe(industriesGrid);
    }

    return () => {
      window.removeEventListener("resize", setDimensions);
      window.removeEventListener("scroll", update);
      ro?.disconnect();
    };
  }, []);

  return (
    <div ref={outerRef} style={{ position: "relative", background: "#fff" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: NAVBAR_HEIGHT,
          background: "#fff",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: `${SECTION_TOP_PADDING}px 0 ${SECTION_BOTTOM_PADDING}px`,
        }}
      >
        <div ref={headingRef} style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 className="section-heading gradient-heading">Where Pixtron Works Best</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            From upscale restaurants to casual cafes, Pixtron fits seamlessly into any dining environment
          </p>
        </div>

        <div
          ref={cardsFrameRef}
          style={{
            position: "relative",
            width: FALLBACK_FRAME_WIDTH,
            height: BASE_CARD_HEIGHT + venues[venues.length - 1].startY,
            transformOrigin: "top center",
            alignSelf: "flex-start",
          }}
        >
          {venues.map((venue, index) => (
            <div
              key={venue.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{
                width: BASE_CARD_WIDTH,
                height: BASE_CARD_HEIGHT,
                borderRadius: 20,
                overflow: "hidden",
                position: "absolute",
                left: index * (BASE_CARD_WIDTH + BASE_CARD_GAP),
                top: venue.startY,
                willChange: "top",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={venue.image}
                alt={venue.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Dark gradient scrim at top */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 42%)",
                  pointerEvents: "none",
                }}
              />
              {/* Card label */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: 1.25,
                    margin: 0,
                    textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  {venue.title}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.88)",
                    fontSize: 13,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    margin: "5px 0 0",
                    textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                  }}
                >
                  {venue.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={ctaWrapRef}
          style={{
            position: "relative",
            width: FALLBACK_FRAME_WIDTH,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible",
            alignSelf: "flex-start",
          }}
        >
          <div
            ref={ctaRef}
            style={{
              position: "relative",
              transform: "translateY(var(--cta-travel, 140px))",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            <Link href="/contact?type=advertiser" className="btn-primary">
              <span>Advertise With Pixtron</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
