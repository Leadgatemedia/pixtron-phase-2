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
};

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
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="4" cy="12" r="1.5" fill={src.includes("white") ? "#fff" : "#000"} />
      <circle cx="8.5" cy="12" r="1.5" fill={src.includes("white") ? "#fff" : "#000"} />
      <line
        x1="11"
        y1="12"
        x2="18"
        y2="12"
        stroke={src.includes("white") ? "#fff" : "#000"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polyline
        points="15,8.5 19.5,12 15,15.5"
        stroke={src.includes("white") ? "#fff" : "#000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function ProcessShuffleColumn({
  label,
  heading,
  steps,
  btnLabel,
  btnStyle,
  arrowDark,
  arrowWhite,
}: ProcessShuffleColumnProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(steps.length).fill(null));
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>(Array(steps.length).fill(null));
  const stepRefs = useRef<(HTMLSpanElement | null)[]>(Array(steps.length).fill(null));
  const descRefs = useRef<(HTMLParagraphElement | null)[]>(Array(steps.length).fill(null));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const previousOffset = 20;
    const futureOffset = 18;

    const buildLayout = (activeIndex: number) =>
      steps.map((_, index) => {
        if (index === activeIndex) {
          return {
            y: 0,
            opacity: 1,
            shadowAlpha: 0.22,
            titleColor: "rgba(0,0,0,1)",
            stepColor: "rgba(15,157,88,1)",
            descColor: "rgba(0,0,0,1)",
            zIndex: 20,
          };
        }

        if (index < activeIndex) {
          const distance = activeIndex - index;
          return {
            y: -distance * previousOffset,
            opacity: Math.max(0.36, 0.6 - distance * 0.1),
            shadowAlpha: 0.1,
            titleColor: "rgba(0,0,0,0.28)",
            stepColor: "rgba(0,0,0,0.1)",
            descColor: "rgba(0,0,0,0.22)",
            zIndex: 12 - distance,
          };
        }

        const distance = index - activeIndex;
        return {
          y: distance * futureOffset,
          opacity: Math.max(0.4, 0.72 - distance * 0.12),
          shadowAlpha: 0.1,
          titleColor: "rgba(0,0,0,0.38)",
          stepColor: "rgba(0,0,0,0.12)",
          descColor: "rgba(0,0,0,0.18)",
          zIndex: 12 - distance,
        };
      });

    const applyLayout = (fromIndex: number, toIndex: number, t: number) => {
      const from = buildLayout(fromIndex);
      const to = buildLayout(toIndex);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const currentY = lerp(from[index].y, to[index].y, t);
        const currentOpacity = lerp(from[index].opacity, to[index].opacity, t);
        const currentShadow = lerp(from[index].shadowAlpha, to[index].shadowAlpha, t);
        const currentZ = Math.round(lerp(from[index].zIndex, to[index].zIndex, t));

        card.style.transform = `translateY(${currentY}px)`;
        card.style.opacity = String(currentOpacity);
        card.style.zIndex = String(currentZ);
        card.style.boxShadow = `0px 24px 30px -20px rgba(0,0,0,${currentShadow.toFixed(3)})`;

        const titleRef = titleRefs.current[index];
        if (titleRef) titleRef.style.color = mixColor(from[index].titleColor, to[index].titleColor, t);

        const stepRef = stepRefs.current[index];
        if (stepRef) stepRef.style.color = mixColor(from[index].stepColor, to[index].stepColor, t);

        const descRef = descRefs.current[index];
        if (descRef) descRef.style.color = mixColor(from[index].descColor, to[index].descColor, t);
      });
    };

    const update = () => {
      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.15;
      const end = Math.max(start + 1, root.offsetHeight - viewport * 0.35);
      const raw = Math.max(0, Math.min(1, (-rect.top - start) / end));
      const progress = Math.min(1, raw / 0.88);
      const segment = 1 / steps.length;
      const activeRaw = progress / segment;
      const fromIndex = Math.min(steps.length - 1, Math.floor(activeRaw));
      const toIndex = Math.min(steps.length - 1, fromIndex + 1);
      const t = fromIndex === toIndex ? 1 : ease(Math.min(1, activeRaw - fromIndex));

      applyLayout(fromIndex, toIndex, t);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
    };
  }, [steps]);

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
          marginBottom: 16,
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
          marginBottom: 48,
        }}
      >
        {heading.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {i === 1 ? <strong>{line}</strong> : line}
          </span>
        ))}
      </h3>

      <div style={{ position: "relative", height: 300 }}>
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
              maxWidth: step.width,
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              padding: index === 0 ? "32px 24px" : "18px 24px",
              position: "absolute",
              inset: "0 0 auto",
              transform: `translateY(${index * 18}px)`,
              willChange: "transform, opacity, box-shadow",
              boxShadow: "0px 24px 30px -20px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "#e9e9e9" }} />
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
                      color: index === 0 ? "#000" : "rgba(0,0,0,0.18)",
                      lineHeight: 1.4,
                      maxWidth: 476,
                      opacity: index === 0 ? 1 : 0,
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

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
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
