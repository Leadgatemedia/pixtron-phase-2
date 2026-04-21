"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  width: number;
};

type ProcessShuffleColumnProps = {
  label: string;
  heading: string;
  steps: ProcessStep[];
  btnLabel: string;
  btnStyle: "outline" | "primary";
  arrowDark: string;
  arrowWhite: string;
  progress?: number;
};

type CardLayout = {
  y: number;
  widthPct: number;
  paddingY: number;
  minHeight: number;
  titleSize: number;
  stepSize: number;
  descOpacity: number;
  cardBg: string;
  shadowAlpha: number;
  shadowSpreadAlpha: number;
  zIndex: number;
  titleColor: string;
  stepColor: string;
  descColor: string;
};

const TRANSITION_WEIGHTS = [5, 5, 4, 4];
const TOTAL_WEIGHT = TRANSITION_WEIGHTS.reduce((sum, value) => sum + value, 0);
const PREVIOUS_OFFSET = 60;
const FUTURE_OFFSET = 65;
const FUTURE_WIDTH_PCT = [100, 88, 80, 72];
const PAST_WIDTH_PCT = [100, 84, 76, 68];
const FUTURE_CARD_BG = [
  "rgba(233,233,233,1)",
  "rgba(240,240,240,1)",
  "rgba(244,244,244,1)",
  "rgba(248,248,248,1)",
];

function resolvePhase(progress: number, cardCount: number) {
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

  const lastIndex = Math.max(0, cardCount - 1);
  return { from: lastIndex, to: lastIndex, t: 1 };
}

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

function ArrowIcon({ src }: { src: string }) {
  const file = src.includes("white") ? "/arrow-white.png" : "/arrow-black.png";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" className="btn-arrow-img" style={{ display: "block", transition: "filter 0.35s ease" }} />;
}

export default function ProcessShuffleColumn({
  label,
  heading,
  steps,
  btnLabel,
  btnStyle,
  arrowDark,
  arrowWhite,
  progress,
}: ProcessShuffleColumnProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(steps.length).fill(null));
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>(Array(steps.length).fill(null));
  const stepRefs = useRef<(HTMLSpanElement | null)[]>(Array(steps.length).fill(null));
  const descRefs = useRef<(HTMLParagraphElement | null)[]>(Array(steps.length).fill(null));
  const maxCardWidth = steps[0]?.width ?? 526;

  const buildLayout = (activeIndex: number): CardLayout[] => {
    const groupOffset = activeIndex * PREVIOUS_OFFSET;

    return steps.map((_, index) => {
      if (index === activeIndex) {
        return {
          y: groupOffset,
          widthPct: 100,
          paddingY: 32,
          minHeight: 156,
          titleSize: 24,
          stepSize: 60,
          descOpacity: 1,
          cardBg: "rgba(233,233,233,1)",
          shadowAlpha: 0.25,
          shadowSpreadAlpha: 0.12,
          titleColor: "rgba(0,0,0,1)",
          stepColor: "rgba(15,157,88,1)",
          descColor: "rgba(0,0,0,1)",
          zIndex: 20,
        };
      }

      if (index < activeIndex) {
        const distance = activeIndex - index;
        const clampIndex = Math.min(distance - 1, PAST_WIDTH_PCT.length - 1);
        return {
          y: groupOffset - distance * PREVIOUS_OFFSET,
          widthPct: PAST_WIDTH_PCT[clampIndex],
          paddingY: 18,
          minHeight: 112,
          titleSize: 20,
          stepSize: 50,
          descOpacity: 1,
          cardBg: "rgba(233,233,233,1)",
          shadowAlpha: 0.18,
          shadowSpreadAlpha: 0.06,
          titleColor: "rgba(0,0,0,0.6)",
          stepColor: "rgba(0,0,0,0.14)",
          descColor: "rgba(0,0,0,0.6)",
          zIndex: 16 - distance,
        };
      }

      const distance = index - activeIndex;
      const clampIndex = Math.min(distance, FUTURE_CARD_BG.length - 1);
      return {
        y: groupOffset + distance * FUTURE_OFFSET,
        widthPct: FUTURE_WIDTH_PCT[Math.min(clampIndex, FUTURE_WIDTH_PCT.length - 1)],
        paddingY: 18,
        minHeight: 112,
        titleSize: 20,
        stepSize: 50,
        descOpacity: 1,
        cardBg: FUTURE_CARD_BG[clampIndex],
        shadowAlpha: distance >= 3 ? 0 : 0.25,
        shadowSpreadAlpha: distance >= 3 ? 0 : 0.05,
        titleColor: "rgba(0,0,0,0.6)",
        stepColor: "rgba(0,0,0,0.12)",
        descColor: "rgba(0,0,0,0.6)",
        zIndex: 12 - distance,
      };
    });
  };

  const applyLayouts = (from: CardLayout[], to: CardLayout[], t: number) => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const currentY = lerp(from[index].y, to[index].y, t);
      const currentWidthPct = lerp(from[index].widthPct, to[index].widthPct, t);
      const currentPaddingY = lerp(from[index].paddingY, to[index].paddingY, t);
      const currentMinHeight = lerp(from[index].minHeight, to[index].minHeight, t);
      const currentTitleSize = lerp(from[index].titleSize, to[index].titleSize, t);
      const currentStepSize = lerp(from[index].stepSize, to[index].stepSize, t);
      const currentDescOpacity = lerp(from[index].descOpacity, to[index].descOpacity, t);
      const currentShadow = lerp(from[index].shadowAlpha, to[index].shadowAlpha, t);
      const currentSpread = lerp(from[index].shadowSpreadAlpha, to[index].shadowSpreadAlpha, t);
      const currentZ = Math.round(lerp(from[index].zIndex, to[index].zIndex, t));
      const leftPct = (100 - currentWidthPct) / 2;

      card.style.transform = `translateY(${currentY}px)`;
      card.style.width = `${currentWidthPct}%`;
      card.style.left = `${leftPct}%`;
      card.style.padding = `${currentPaddingY}px 24px`;
      card.style.minHeight = `${currentMinHeight}px`;
      card.style.background = mixColor(from[index].cardBg, to[index].cardBg, t);
      card.style.zIndex = String(currentZ);
      card.style.boxShadow = `0px 10px 22px -14px rgba(0,0,0,${currentShadow.toFixed(3)}), 0px 0px 36px rgba(0,0,0,${currentSpread.toFixed(3)})`;

      const titleRef = titleRefs.current[index];
      if (titleRef) {
        titleRef.style.color = mixColor(from[index].titleColor, to[index].titleColor, t);
        titleRef.style.fontSize = `${currentTitleSize}px`;
      }

      const stepRef = stepRefs.current[index];
      if (stepRef) {
        stepRef.style.color = mixColor(from[index].stepColor, to[index].stepColor, t);
        stepRef.style.fontSize = `${currentStepSize}px`;
      }

      const descRef = descRefs.current[index];
      if (descRef) {
        descRef.style.color = mixColor(from[index].descColor, to[index].descColor, t);
        descRef.style.opacity = `${currentDescOpacity}`;
      }
    });
  };

  const applyProgress = (animatedProgress: number) => {
    const phase = resolvePhase(animatedProgress, steps.length);
    const fromLayout = buildLayout(phase.from);
    const toLayout = buildLayout(phase.to);
    applyLayouts(fromLayout, toLayout, phase.t);
  };

  useEffect(() => {
    if (typeof progress === "number") return;

    const root = rootRef.current;
    if (!root) return;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight;
      const startY = viewport * 0.84;
      const endY = -root.offsetHeight * 0.36;
      const travel = Math.max(1, startY - endY);
      const raw = Math.max(0, Math.min(1, (startY - rect.top) / travel));
      const animationStart = 0.08;
      const animationEnd = 0.96;
      const shifted = Math.max(0, raw - animationStart);
      const normalized = shifted / Math.max(0.0001, animationEnd - animationStart);
      const animatedProgress = Math.max(0, Math.min(1, normalized));
      applyProgress(animatedProgress);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
    };
  }, [progress, steps]);

  useEffect(() => {
    if (typeof progress !== "number") return;
    applyProgress(Math.max(0, Math.min(1, progress)));
  }, [progress, steps]);

  return (
    <div ref={rootRef} style={{ flex: 1 }}>
      <p
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#0f9d58",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        {label}
      </p>
      <h3
        style={{
          fontSize: 30,
          fontWeight: 400,
          color: "#000",
          textAlign: "center",
          lineHeight: 1.3,
          marginBottom: 28,
        }}
      >
        {heading.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {i === 1 ? <strong>{line}</strong> : line}
          </span>
        ))}
      </h3>

      <div style={{ position: "relative", width: maxCardWidth, maxWidth: "100%", height: 300, margin: "0 auto" }}>
        {steps.map((step, index) => (
          <div
            key={step.step}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            style={{
              background: "#e9e9e9",
              border: "1px solid #e0dfdf",
              borderRadius: 6,
              overflow: "hidden",
              width: `${FUTURE_WIDTH_PCT[Math.min(index, FUTURE_WIDTH_PCT.length - 1)]}%`,
              minHeight: index === 0 ? 156 : 112,
              padding: index === 0 ? "32px 24px" : "18px 24px",
              position: "absolute",
              top: 0,
              left: `${(100 - FUTURE_WIDTH_PCT[Math.min(index, FUTURE_WIDTH_PCT.length - 1)]) / 2}%`,
              transform: `translateY(${index * FUTURE_OFFSET}px)`,
              willChange: "transform, background, box-shadow",
              boxShadow: index < 3 ? "0px 10px 22px -14px rgba(0,0,0,0.25), 0px 0px 36px rgba(0,0,0,0.05)" : "none",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  style={{
                    fontSize: index === 0 ? 24 : 20,
                    fontWeight: 500,
                    color: index === 0 ? "#000" : "rgba(0,0,0,0.38)",
                    lineHeight: 1.4,
                    marginBottom: index === 0 && step.description ? 12 : 0,
                  }}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p
                    ref={(el) => {
                      descRefs.current[index] = el;
                    }}
                    style={{
                      fontSize: 16,
                      color: index === 0 ? "#000" : "rgba(0,0,0,0.6)",
                      lineHeight: 1.4,
                      maxWidth: 476,
                      whiteSpace: "pre-line",
                      opacity: 1,
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                )}
              </div>
              <span
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                style={{
                  fontSize: index === 0 ? 60 : 50,
                  fontWeight: 700,
                  color: index === 0 ? "#0f9d58" : "rgba(0,0,0,0.15)",
                  lineHeight: 1,
                  flexShrink: 0,
                  marginLeft: 16,
                }}
              >
                {step.step}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 72 }}>
        {btnStyle === "primary" ? (
          <Link href="#" className="btn-primary">
            <span>{btnLabel}</span>
            <ArrowIcon src={arrowWhite} />
          </Link>
        ) : (
          <Link href="#" className="btn-outline">
            <span>{btnLabel}</span>
            <ArrowIcon src={arrowDark} />
          </Link>
        )}
      </div>
    </div>
  );
}
