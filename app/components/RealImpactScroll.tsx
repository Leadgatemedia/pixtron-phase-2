"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type CardLayout = {
  y: number;
  widthPct: number;
  cardBg: string;
  shadowAlpha: number;
  shadowSpreadAlpha: number;
  zIndex: number;
  valueColor: string;
  labelColor: string;
  descColor: string;
};

const STATS = [
  {
    value: "91%",
    label: "Customer Engagement Rate",
    description: (
      <>
        Customers actively engage with
        <br />
        <strong>branded wet wipes</strong>
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
        <strong>Premium restaurants and cafes</strong>
        <br />
        worldwide
      </>
    ),
  },
  {
    value: "137B+",
    label: "Annual Impressions",
    description: (
      <>
        Touch points with customers
        <br />
        <strong>every year</strong>
      </>
    ),
  },
];

const CARD_COUNT = STATS.length;
const FUTURE_WIDTH_PCT = [100, 88, 80, 72];
const PAST_WIDTH_PCT  = [100, 84, 76, 68];
// rgba(255,255,255,X) composited over #E9E9E9 section bg → solid grays
const FUTURE_CARD_BG = [
  "rgba(233,233,233,1)",
  "rgba(240,240,240,1)",
  "rgba(244,244,244,1)",
  "rgba(248,248,248,1)",
];
const ZOOM = 0.8;
const TRANSITION_WEIGHTS = [5, 5, 4, 4];
const TOTAL_WEIGHT = TRANSITION_WEIGHTS.reduce((sum, value) => sum + value, 0);
const PREVIOUS_OFFSET = 60;
const FUTURE_OFFSET = 65;

function ease(t: number) {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixColor(from: string, to: string, t: number) {
  const parse = (value: string) => value.match(/\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0, 1];
  const a = parse(from);
  const b = parse(to);
  const alphaA = a[3] ?? 1;
  const alphaB = b[3] ?? 1;

  return `rgba(${Math.round(lerp(a[0], b[0], t))}, ${Math.round(lerp(a[1], b[1], t))}, ${Math.round(lerp(a[2], b[2], t))}, ${lerp(alphaA, alphaB, t).toFixed(3)})`;
}

function buildLayout(activeIndex: number): CardLayout[] {
  // Shift entire group down by activeIndex * PREVIOUS_OFFSET so the topmost
  // visible card is always anchored at y=0 (top:10 in container) — no drift.
  const groupOffset = activeIndex * PREVIOUS_OFFSET;
  return STATS.map((_, index) => {
    if (index === activeIndex) {
      return {
        y: groupOffset,
        widthPct: 100,
        cardBg: "rgba(233,233,233,1)",
        shadowAlpha: 0.25,
        shadowSpreadAlpha: 0.12,
        zIndex: 20,
        valueColor: "rgba(0,0,0,1)",
        labelColor: "rgba(0,0,0,0.5)",
        descColor: "rgba(0,0,0,1)",
      };
    }

    if (index < activeIndex) {
      const distance = activeIndex - index;
      const clamp = Math.min(distance, PAST_WIDTH_PCT.length - 1);
      return {
        y: groupOffset - distance * PREVIOUS_OFFSET,
        widthPct: PAST_WIDTH_PCT[clamp],
        cardBg: "rgba(233,233,233,1)",
        shadowAlpha: 0.18,
        shadowSpreadAlpha: 0.06,
        // Past cards stay behind the active card so the new front card does not get clipped mid-shuffle.
        zIndex: 16 - distance,
        valueColor: "rgba(0,0,0,0.6)",
        labelColor: "rgba(0,0,0,0.4)",
        descColor: "rgba(0,0,0,0.6)",
      };
    }

    const distance = index - activeIndex;
    const clamp = Math.min(distance, FUTURE_WIDTH_PCT.length - 1);
    return {
      y: groupOffset + distance * FUTURE_OFFSET,
      widthPct: FUTURE_WIDTH_PCT[clamp],
      cardBg: FUTURE_CARD_BG[clamp],
      shadowAlpha: distance >= 3 ? 0 : 0.25,
      shadowSpreadAlpha: distance >= 3 ? 0 : 0.05,
      zIndex: 12 - distance,
      valueColor: "rgba(0,0,0,0.6)",
      labelColor: "rgba(0,0,0,0.4)",
      descColor: "rgba(0,0,0,0.6)",
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

export default function RealImpactScroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(CARD_COUNT).fill(null));
  const valueRefs = useRef<(HTMLParagraphElement | null)[]>(Array(CARD_COUNT).fill(null));
  const labelRefs = useRef<(HTMLParagraphElement | null)[]>(Array(CARD_COUNT).fill(null));
  const descRefs = useRef<(HTMLParagraphElement | null)[]>(Array(CARD_COUNT).fill(null));

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const setHeight = () => {
      const vh = window.innerHeight;
      const stickyH = vh / ZOOM;
      outer.style.height = `${stickyH + stickyH * 3.2}px`;
    };

    const applyLayouts = (from: CardLayout[], to: CardLayout[], t: number) => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const widthPct = lerp(from[index].widthPct, to[index].widthPct, t);
        const current: CardLayout = {
          y: lerp(from[index].y, to[index].y, t),
          widthPct,
          cardBg: mixColor(from[index].cardBg, to[index].cardBg, t),
          shadowAlpha: lerp(from[index].shadowAlpha, to[index].shadowAlpha, t),
          shadowSpreadAlpha: lerp(from[index].shadowSpreadAlpha, to[index].shadowSpreadAlpha, t),
          zIndex: Math.round(lerp(from[index].zIndex, to[index].zIndex, t)),
          valueColor: mixColor(from[index].valueColor, to[index].valueColor, t),
          labelColor: mixColor(from[index].labelColor, to[index].labelColor, t),
          descColor: mixColor(from[index].descColor, to[index].descColor, t),
        };

        const leftPct = (100 - current.widthPct) / 2;
        card.style.width = `${current.widthPct}%`;
        card.style.left = `${leftPct}%`;
        card.style.background = current.cardBg;
        card.style.transform = `translateY(${current.y}px)`;
        card.style.opacity = "1";
        card.style.zIndex = String(current.zIndex);
        card.style.boxShadow = `0px 10px 22px -14px rgba(0, 0, 0, ${current.shadowAlpha.toFixed(3)}), 0px 0px 44px rgba(0, 0, 0, ${current.shadowSpreadAlpha.toFixed(3)})`;

        if (valueRefs.current[index]) {
          valueRefs.current[index]!.style.color = current.valueColor;
        }

        if (labelRefs.current[index]) {
          labelRefs.current[index]!.style.color = current.labelColor;
        }

        if (descRefs.current[index]) {
          descRefs.current[index]!.style.color = current.descColor;
        }
      });
    };

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const stickyH = sticky.offsetHeight;
      const scrolled = -rect.top;
      const maxScroll = Math.max(1, outer.offsetHeight - stickyH);
      const raw = Math.max(0, Math.min(1, scrolled / maxScroll));
      const animationStart = 0.18;
      const animationEnd = 0.94;
      const shifted = Math.max(0, raw - animationStart);
      const normalized = shifted / Math.max(0.0001, animationEnd - animationStart);
      const animatedProgress = Math.max(0, Math.min(1, normalized));
      const phase = resolvePhase(animatedProgress);
      const fromLayout = buildLayout(phase.from);
      const toLayout = buildLayout(phase.to);

      applyLayouts(fromLayout, toLayout, phase.t);
    };

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

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
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: `${100 / ZOOM}vh`,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 39px",
        }}
      >
        <div style={{ position: "relative", zIndex: 10, background: "#fff", width: "100%", textAlign: "center", paddingBottom: 48 }}>
          <h2 className="section-heading gradient-heading">Real Impact, Real Results</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Data-driven insights that prove the power of sensory advertising
          </p>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1024,
            marginTop: 12,
            height: 500,
            padding: "28px 20px 36px",
            overflow: "visible",
            boxSizing: "border-box",
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
                top: 28,
                left: `${(100 - (FUTURE_WIDTH_PCT[Math.min(index, FUTURE_WIDTH_PCT.length - 1)])) / 2}%`,
                width: `${FUTURE_WIDTH_PCT[Math.min(index, FUTURE_WIDTH_PCT.length - 1)]}%`,
                background: FUTURE_CARD_BG[Math.min(index, FUTURE_CARD_BG.length - 1)],
                border: "1px solid #E5E7EB",
                borderRadius: 6,
                overflow: "hidden",
                padding: "22px 28px 18px",
                transformOrigin: "center center",
                transform: `translateY(${index * FUTURE_OFFSET}px)`,
                willChange: "transform, background, box-shadow",
                boxShadow: index < 3 ? "0px 34px 30px -30px rgba(0,0,0,0.25)" : "none",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 320px) minmax(0, 1fr)",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <div>
                  <p
                    ref={(el) => {
                      valueRefs.current[index] = el;
                    }}
                    style={{
                      margin: 0,
                      fontSize: 66,
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: index === 0 ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.6)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    ref={(el) => {
                      labelRefs.current[index] = el;
                    }}
                    style={{
                      margin: "8px 0 0",
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: index === 0 ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.4)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>

                <p
                  ref={(el) => {
                    descRefs.current[index] = el;
                  }}
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 400,
                    lineHeight: "34px",
                    textAlign: "right",
                    color: index === 0 ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.6)",
                  }}
                >
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 4, position: "relative", zIndex: 10, background: "#fff", paddingTop: 0 }}>
          <Link href="#" className="btn-primary">
            <span>Advertise With Pixtron</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/arrow-white.png" width={24} height={24} alt="" className="btn-arrow-img" style={{ display: "block" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
