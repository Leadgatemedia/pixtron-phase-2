"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type CardLayout = {
  insetX: number;
  y: number;
  opacity: number;
  zIndex: number;
  shadow: boolean;
};

const STATS = [
  {
    value: "91%",
    label: "Customer Engagement Rate",
    description: (
      <>
        Customers actively engage with <strong>branded wet wipes</strong>
      </>
    ),
  },
  {
    value: "7.8%",
    label: "Brand Recall",
    description: (
      <>
        <strong>3x higher</strong>
        <br />
        than digital display ads
      </>
    ),
  },
  {
    value: "2.5K+",
    label: "Partner Venues",
    description: (
      <>
        <strong>Premium restaurants and cafes</strong> worldwide
      </>
    ),
  },
  {
    value: "137B+",
    label: "Annual Impressions",
    description: (
      <>
        Touch points with customers <strong>every year</strong>
      </>
    ),
  },
];

const TRANSITION_WEIGHTS = [5, 5, 4, 4];
const TOTAL_WEIGHT = TRANSITION_WEIGHTS.reduce((sum, value) => sum + value, 0);
const CARD_Y = [0, 81, 162, 243];
const CARD_INSET = [0, 16, 32, 48];
const CARD_OPACITY = [1, 0.9, 0.8, 0.7];

function ArrowIcon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/arrow-white.png" width={24} height={24} alt="" style={{ display: "block" }} />;
}

function ease(t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function buildLayout(activeIndex: number): CardLayout[] {
  return STATS.map((_, index) => {
    const depth = (index - activeIndex + STATS.length) % STATS.length;
    return {
      insetX: CARD_INSET[depth],
      y: CARD_Y[depth],
      opacity: CARD_OPACITY[depth],
      zIndex: 20 - depth,
      shadow: depth < 3,
    };
  });
}

function resolvePhase(progress: number) {
  const cuts = [
    TRANSITION_WEIGHTS[0] / TOTAL_WEIGHT,
    (TRANSITION_WEIGHTS[0] + TRANSITION_WEIGHTS[1]) / TOTAL_WEIGHT,
    (TRANSITION_WEIGHTS[0] + TRANSITION_WEIGHTS[1] + TRANSITION_WEIGHTS[2]) / TOTAL_WEIGHT,
  ];

  if (progress < cuts[0]) {
    return { from: 0, to: 1, t: ease(progress / cuts[0]) };
  }

  if (progress < cuts[1]) {
    return { from: 1, to: 2, t: ease((progress - cuts[0]) / (cuts[1] - cuts[0])) };
  }

  if (progress < cuts[2]) {
    return { from: 2, to: 3, t: ease((progress - cuts[1]) / (cuts[2] - cuts[1])) };
  }

  return { from: 3, to: 3, t: 1 };
}

export default function MobileRealImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(STATS.length).fill(null));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const applyLayouts = (from: CardLayout[], to: CardLayout[], t: number) => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const insetX = lerp(from[index].insetX, to[index].insetX, t);
        const y = lerp(from[index].y, to[index].y, t);
        const opacity = lerp(from[index].opacity, to[index].opacity, t);
        const shadow = from[index].shadow || to[index].shadow;
        const zIndex = Math.round(lerp(from[index].zIndex, to[index].zIndex, t));

        card.style.left = `${insetX}px`;
        card.style.right = `${insetX}px`;
        card.style.transform = `translateY(${y}px)`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(zIndex);
        card.style.boxShadow = shadow ? "0px 34px 30px -30px rgba(0,0,0,0.25)" : "none";
      });
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.62;
      const raw = Math.max(0, Math.min(1, (triggerLine - rect.top) / Math.max(1, rect.height * 0.72)));
      const phase = resolvePhase(raw);
      applyLayouts(buildLayout(phase.from), buildLayout(phase.to), phase.t);
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
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mobile-real-impact"
      style={{
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        padding: "56px 16px",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%", textAlign: "center" }}>
        <h2 className="gradient-heading" style={{ margin: 0, width: "100%", fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>
          Real Impact, Real Results
        </h2>
        <p style={{ margin: 0, width: "100%", fontSize: 18, fontWeight: 500, lineHeight: 1.5, color: "rgba(0,0,0,0.8)" }}>
          Data-driven insights that prove the power of sensory advertising
        </p>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 361,
          height: 458,
          flexShrink: 0,
          isolation: "isolate",
        }}
      >
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            style={{
              position: "absolute",
              left: CARD_INSET[index],
              right: CARD_INSET[index],
              top: 0,
              transform: `translateY(${CARD_Y[index]}px)`,
              zIndex: 20 - index,
              opacity: CARD_OPACITY[index],
              background: "#f0f0f0",
              border: "1px solid #e0dfdf",
              borderRadius: 6,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 40,
              boxSizing: "border-box",
              boxShadow: index < 3 ? "0px 34px 30px -30px rgba(0,0,0,0.25)" : "none",
              willChange: "transform, left, right, opacity",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16, width: "100%", whiteSpace: "nowrap" }}>
              <p style={{ margin: 0, fontSize: 30, fontWeight: 600, lineHeight: 1.4, color: "#000" }}>
                {stat.value}
              </p>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 500, lineHeight: 1.4, color: "rgba(0,0,0,0.6)" }}>
                {stat.label}
              </p>
            </div>
            <p style={{ margin: 0, width: "100%", fontSize: 18, fontWeight: 400, lineHeight: 1.3, color: "#000", textAlign: "right" }}>
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/contact?type=advertiser"
        className="btn-primary"
        style={{
          width: "100%",
          maxWidth: 361,
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
        <ArrowIcon />
      </Link>
    </section>
  );
}
