"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

type ProcessColumn = {
  label: string;
  headingTop: string;
  headingBottom: string;
  steps: ProcessStep[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "primary" | "outline";
};

type CardLayout = {
  y: number;
  insetX: number;
  opacity: number;
  zIndex: number;
  shadow: boolean;
  titleColor: string;
  stepColor: string;
  descOpacity: number;
  descMaxHeight: number;
  descMarginTop: number;
};

const FULL_BLEED_WIDTH = "100vw";
const DIVIDER = "1px dashed rgba(0,0,0,0.2)";
const FIGMA_SECTION_GAP = 75;

const MOBILE_NAV_HEIGHT = 96;
const PINNED_SCROLL_DISTANCE = 180;
const CARD_INSET = [0, 16, 32, 48];
const CARD_OPACITY = [1, 0.9, 0.8, 0.7];
const ACTIVE_CARD_HEIGHT = 184;
const COLLAPSED_CARD_HEIGHT = 82;
const CARD_PEEK = 40;
const STACK_Y = [
  0,
  ACTIVE_CARD_HEIGHT - CARD_PEEK,
  ACTIVE_CARD_HEIGHT - CARD_PEEK + COLLAPSED_CARD_HEIGHT - CARD_PEEK,
  ACTIVE_CARD_HEIGHT - CARD_PEEK + (COLLAPSED_CARD_HEIGHT - CARD_PEEK) * 2,
];
const STACK_HEIGHT = STACK_Y[3] + COLLAPSED_CARD_HEIGHT;
const TRANSITION_WEIGHTS = [5, 5, 4, 4];
const TOTAL_WEIGHT = TRANSITION_WEIGHTS.reduce((sum, value) => sum + value, 0);

const PROCESS_COLUMNS: ProcessColumn[] = [
  {
    label: "HOSPITALITY PARTNERS",
    headingTop: "Upgrade your guest experience",
    headingBottom: "at zero cost",
    ctaLabel: "Get Signature Series",
    ctaHref: "/signature-series",
    ctaVariant: "primary",
    steps: [
      {
        step: "01",
        title: "Fill the Form",
        description:
          "Fill out our quick form and tell us about your restaurant, location, and table setup.",
      },
      {
        step: "02",
        title: "Share Your Details",
        description:
          "Tell us your table count, location, and wipe preferences so we can set everything up perfectly.",
      },
      {
        step: "03",
        title: "Sit Back, We Deliver",
        description:
          "Pixtron delivers high-quality branded wet wipes directly to your restaurant on a regular schedule.",
      },
      {
        step: "04",
        title: "Delight Every Guest",
        description:
          "Your customers enjoy a clean, premium dining experience that elevates your restaurant's overall impression.",
      },
    ],
  },
  {
    label: "ADVERTISERS",
    headingTop: "Put your brand directly into",
    headingBottom: "customer's hands",
    ctaLabel: "Get Custom Series",
    ctaHref: "/custom-series",
    ctaVariant: "outline",
    steps: [
      {
        step: "01",
        title: "Fill the Form",
        description:
          "Fill out our quick form, share your brand goals, and tell us which audience you want to reach.",
      },
      {
        step: "02",
        title: "Design Your Ad",
        description:
          "Work with our team to craft a bold, eye-catching ad placed directly on the wipe.",
      },
      {
        step: "03",
        title: "We Handle Everything",
        description:
          "We print, package, and distribute your ads to every partnered restaurant on your list.",
      },
      {
        step: "04",
        title: "Go Live & Get Seen",
        description:
          "Your brand lands in diners' hands at the table - personal, tactile, and impossible to ignore.",
      },
    ],
  },
];

function ArrowIcon({ color }: { color: "white" | "dark" }) {
  const file = color === "white" ? "/arrow-white.png" : "/arrow-black.png";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" style={{ display: "block" }} />;
}

function ease(t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
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

function buildLayout(activeIndex: number, cardCount: number): CardLayout[] {
  return Array.from({ length: cardCount }, (_, index) => {
    const depth = (index - activeIndex + cardCount) % cardCount;
    const clampedDepth = Math.min(depth, CARD_INSET.length - 1);
    return {
      y: STACK_Y[clampedDepth],
      insetX: CARD_INSET[clampedDepth],
      opacity: CARD_OPACITY[clampedDepth],
      zIndex: 20 - clampedDepth,
      shadow: clampedDepth < 3,
      titleColor:
        clampedDepth === 0 ? "rgba(0,0,0,1)" :
        clampedDepth === 1 ? "rgba(0,0,0,0.72)" :
        clampedDepth === 2 ? "rgba(0,0,0,0.56)" :
        "rgba(0,0,0,0.4)",
      stepColor:
        clampedDepth === 0 ? "rgba(15,157,88,1)" :
        clampedDepth === 1 ? "rgba(15,157,88,0.9)" :
        clampedDepth === 2 ? "rgba(15,157,88,0.74)" :
        "rgba(15,157,88,0.56)",
      descOpacity: clampedDepth === 0 ? 1 : 0,
      descMaxHeight: clampedDepth === 0 ? 160 : 0,
      descMarginTop: clampedDepth === 0 ? 32 : 0,
    };
  });
}

function MobilePinnedProcessBlock({ column }: { column: ProcessColumn }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(column.steps.length).fill(null));
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>(Array(column.steps.length).fill(null));
  const stepRefs = useRef<(HTMLParagraphElement | null)[]>(Array(column.steps.length).fill(null));
  const descWrapRefs = useRef<(HTMLDivElement | null)[]>(Array(column.steps.length).fill(null));
  const descRefs = useRef<(HTMLParagraphElement | null)[]>(Array(column.steps.length).fill(null));

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const setHeight = () => {
      sticky.style.height = "auto";
      outer.style.height = `${sticky.offsetHeight + PINNED_SCROLL_DISTANCE}px`;
    };

    const applyLayouts = (from: CardLayout[], to: CardLayout[], t: number) => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const currentInsetX = lerp(from[index].insetX, to[index].insetX, t);
        const currentY = lerp(from[index].y, to[index].y, t);
        const currentOpacity = lerp(from[index].opacity, to[index].opacity, t);
        const currentZ = Math.round(lerp(from[index].zIndex, to[index].zIndex, t));
        const shadow = from[index].shadow || to[index].shadow;

        card.style.left = `${currentInsetX}px`;
        card.style.right = `${currentInsetX}px`;
        card.style.transform = `translateY(${currentY}px)`;
        card.style.opacity = String(currentOpacity);
        card.style.zIndex = String(currentZ);
        card.style.boxShadow = shadow ? "0px 34px 30px -30px rgba(0,0,0,0.25)" : "none";

        const titleRef = titleRefs.current[index];
        if (titleRef) {
          titleRef.style.color = mixColor(from[index].titleColor, to[index].titleColor, t);
        }

        const stepRef = stepRefs.current[index];
        if (stepRef) {
          stepRef.style.color = mixColor(from[index].stepColor, to[index].stepColor, t);
        }

        const descWrapRef = descWrapRefs.current[index];
        if (descWrapRef) {
          descWrapRef.style.maxHeight = `${lerp(from[index].descMaxHeight, to[index].descMaxHeight, t)}px`;
          descWrapRef.style.marginTop = `${lerp(from[index].descMarginTop, to[index].descMarginTop, t)}px`;
        }

        const descRef = descRefs.current[index];
        if (descRef) {
          descRef.style.opacity = `${lerp(from[index].descOpacity, to[index].descOpacity, t)}`;
        }
      });
    };

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const raw = Math.max(0, Math.min(1, (MOBILE_NAV_HEIGHT - rect.top) / PINNED_SCROLL_DISTANCE));
      const phase = resolvePhase(raw, column.steps.length);
      applyLayouts(buildLayout(phase.from, column.steps.length), buildLayout(phase.to, column.steps.length), phase.t);
    };

    setHeight();
    const ro = new ResizeObserver(() => {
      setHeight();
      update();
    });
    ro.observe(sticky);

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
      ro.disconnect();
    };
  }, [column]);

  return (
    <section
      ref={outerRef}
      style={{
        position: "relative",
        width: FULL_BLEED_WIDTH,
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        marginBottom: `${FIGMA_SECTION_GAP - PINNED_SCROLL_DISTANCE}px`,
        background: "#fff",
        borderTop: DIVIDER,
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: MOBILE_NAV_HEIGHT,
          width: "100%",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          padding: "56px 20px 40px",
          boxSizing: "border-box",
          overflow: "hidden",
          zIndex: 1,
          WebkitTextSizeAdjust: "100%",
          textSizeAdjust: "100%",
        }}
      >
        <div style={{ width: "100%", maxWidth: 361, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.4, color: "#0f9d58" }}>{column.label}</p>
          <div style={{ width: "100%", color: "#000", fontSize: 24, lineHeight: 1.3 }}>
            <p style={{ margin: 0, fontWeight: 400 }}>{column.headingTop}</p>
            <p style={{ margin: 0, fontWeight: 600 }}>{column.headingBottom}</p>
          </div>
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: 361, height: STACK_HEIGHT, flexShrink: 0 }}>
          {column.steps.map((step, index) => (
            <div
              key={step.step}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{
                position: "absolute",
                top: 0,
                left: CARD_INSET[index],
                right: CARD_INSET[index],
                transform: `translateY(${STACK_Y[index]}px)`,
                opacity: CARD_OPACITY[index],
                zIndex: 20 - index,
                background: "#f0f0f0",
                border: "1px solid #e0dfdf",
                borderRadius: 6,
                padding: index === 0 ? "24px" : "24px 20px",
                boxSizing: "border-box",
                boxShadow: index < 3 ? "0px 34px 30px -30px rgba(0,0,0,0.25)" : "none",
                willChange: "transform, left, right, opacity",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                <p
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: index === 0 ? "#000" : index === 1 ? "rgba(0,0,0,0.72)" : index === 2 ? "rgba(0,0,0,0.56)" : "rgba(0,0,0,0.4)",
                  }}
                >
                  {step.title}
                </p>
                <p
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  style={{
                    margin: 0,
                    fontSize: 24,
                    fontWeight: 700,
                    lineHeight: 1.4,
                    color: index === 0 ? "#0f9d58" : index === 1 ? "rgba(15,157,88,0.9)" : index === 2 ? "rgba(15,157,88,0.74)" : "rgba(15,157,88,0.56)",
                    flexShrink: 0,
                  }}
                >
                  {step.step}
                </p>
              </div>

              <div
                ref={(el) => {
                  descWrapRefs.current[index] = el;
                }}
                style={{
                  maxHeight: index === 0 ? 160 : 0,
                  marginTop: index === 0 ? 32 : 0,
                  overflow: "hidden",
                }}
              >
                <p
                  ref={(el) => {
                    descRefs.current[index] = el;
                  }}
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 400,
                    lineHeight: 1.45,
                    color: "rgba(0,0,0,0.8)",
                    opacity: index === 0 ? 1 : 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href={column.ctaHref}
          className={column.ctaVariant === "primary" ? "btn-primary" : "btn-outline"}
          style={{
            width: "100%",
            maxWidth: 361,
            minHeight: 64,
            boxSizing: "border-box",
            justifyContent: "space-between",
            padding: "16px 20px 16px 22px",
            borderRadius: 6,
            fontSize: 18,
            lineHeight: "30px",
          }}
        >
          <span>{column.ctaLabel}</span>
          <ArrowIcon color={column.ctaVariant === "primary" ? "white" : "dark"} />
        </Link>
      </div>
    </section>
  );
}

export default function MobileProcessSection() {
  return (
    <section
      className="mobile-process"
      style={{
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 75,
        padding: "0 16px 32px",
        background: "#fff",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 56 }}>
        <div
          style={{
            width: FULL_BLEED_WIDTH,
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            borderTop: DIVIDER,
          }}
        />

        <div style={{ width: "100%", maxWidth: 361, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}>
          <h2 className="gradient-heading" style={{ margin: 0, width: "100%", fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>
            The Process
          </h2>
          <p style={{ margin: 0, width: "100%", fontSize: 18, fontWeight: 500, lineHeight: 1.5, color: "rgba(0,0,0,0.8)" }}>
            Simple steps to get started, whether you&apos;re a venue or an advertiser
          </p>
        </div>
      </div>

      <MobilePinnedProcessBlock column={PROCESS_COLUMNS[0]} />
      <MobilePinnedProcessBlock column={PROCESS_COLUMNS[1]} />
    </section>
  );
}
