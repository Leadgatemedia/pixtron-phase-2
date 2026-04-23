"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    number: "STEP 1",
    title: "Partner Venues",
    description: "We partner with premium restaurants and cafes to place branded wet wipes at every table.",
    iconInactive: "/icons/step1-inactive.svg",
    iconActive: "/icons/step1-active.svg",
  },
  {
    number: "STEP 2",
    title: "Brand Placement",
    description: "Your brand message reaches customers during their dining experience in a memorable way.",
    iconInactive: "/icons/step2-inactive.svg",
    iconActive: "/icons/step2-active.svg",
  },
  {
    number: "STEP 3",
    title: "Real Engagement",
    description: "Customers interact with your brand in a physical, tactile moment that creates lasting impressions.",
    iconInactive: "/icons/step3-inactive.svg",
    iconActive: "/icons/step3-active.svg",
  },
  {
    number: "STEP 4",
    title: "Track Results",
    description: "Monitor campaign performance with detailed analytics with QR code and phone number tracking.",
    iconInactive: "/icons/step4-inactive.svg",
    iconActive: "/icons/step4-active.svg",
  },
];

const TRACK_TOP = 16.57;
const TRACK_HEIGHT = 703;
const ICON_TOP = [0, 232, 463.99, 695.99];
const CONTENT_TOP = [9, 241, 473, 705];

const STEP_IN = [0.05, 0.28, 0.51, 0.74];
const STEP_OUT = [0.14, 0.37, 0.60, 0.83];
const BAR_POS = [0, 1 / 3, 2 / 3, 1];
const CONTENT_FADE = 0.05;
const STEP_SETTLE = 0.02;

function ease(value: number) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

export default function MobileHowItWorksSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>(Array(STEPS.length).fill(null));
  const iconImgRefs = useRef<(HTMLImageElement | null)[]>(Array(STEPS.length).fill(null));

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.62;
      const p = Math.max(0, Math.min(1, (triggerLine - rect.top) / Math.max(1, rect.height * 0.72)));

      if (barFillRef.current) {
        let fill = 0;
        const iconRadiusFraction = 24 / TRACK_HEIGHT;

        if (p >= STEP_IN[0]) {
          if (p >= STEP_IN[3]) {
            fill = 1;
          } else {
            for (let i = 0; i < STEPS.length - 1; i += 1) {
              if (p < STEP_IN[i + 1]) {
                const travelStart = Math.max(STEP_OUT[i], STEP_IN[i] + CONTENT_FADE + STEP_SETTLE);
                const nextStop = Math.max(BAR_POS[i], BAR_POS[i + 1] - iconRadiusFraction);

                if (p < travelStart) {
                  fill = BAR_POS[i];
                } else {
                  const duration = Math.max(0.0001, STEP_IN[i + 1] - travelStart);
                  fill = BAR_POS[i] + (nextStop - BAR_POS[i]) * ease((p - travelStart) / duration);
                }
                break;
              }
            }
          }
        }

        barFillRef.current.style.height = `${fill * 100}%`;
      }

      STEPS.forEach((step, index) => {
        const active = p >= STEP_IN[index];
        const iconEl = iconRefs.current[index];
        if (iconEl) iconEl.style.backgroundColor = active ? "#0f9d58" : "#e7f5ee";

        const imgEl = iconImgRefs.current[index];
        if (imgEl) {
          const nextSrc = active ? step.iconActive : step.iconInactive;
          if (!imgEl.src.endsWith(nextSrc)) {
            imgEl.src = nextSrc;
          }
        }

        void CONTENT_FADE;
      });
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
      ref={outerRef}
      className="mobile-how-it-works"
      style={{
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 56,
        padding: "56px 16px",
        position: "relative",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          width: "min(361px, calc(100vw / 0.8 - 32px))",
          textAlign: "center",
        }}
      >
        <h2
          className="gradient-heading"
          style={{ margin: 0, width: "100%", fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}
        >
          How Pixtron Works
        </h2>
        <p
          style={{
            margin: 0,
            width: "100%",
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.5,
            color: "rgba(0,0,0,0.8)",
          }}
        >
          A simple, seamless process that connects your brand with customers in
          real-world dining moments.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          width: "min(361px, calc(100vw / 0.8 - 32px))",
          height: 856,
          flexShrink: 0,
        }}
      >
          <div style={{ position: "absolute", left: 22, top: TRACK_TOP, width: 3, height: TRACK_HEIGHT }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#e7f5ee",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                ref={barFillRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "0%",
                  background: "#0f9d58",
                  borderRadius: 4,
                }}
              />
            </div>
          </div>

          {STEPS.map((step, index) => (
            <div key={step.number}>
              <div
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: ICON_TOP[index],
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: index === 0 ? "#0f9d58" : "#e7f5ee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.25s ease",
                  zIndex: 2,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={(el) => {
                    iconImgRefs.current[index] = el;
                  }}
                  src={index === 0 ? step.iconActive : step.iconInactive}
                  alt=""
                  style={{ width: 24, height: 24, display: "block" }}
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  left: 64,
                  top: CONTENT_TOP[index],
                  width: 297,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 24,
                }}
              >
                <p style={{ margin: 0, width: "100%", fontSize: 18, fontWeight: 500, lineHeight: "20px", color: "#0f9d58", textTransform: "uppercase" }}>
                  {step.number}
                </p>
                <h3 style={{ margin: 0, width: "100%", fontSize: 24, fontWeight: 700, lineHeight: "32px", color: "#000" }}>
                  {step.title}
                </h3>
                <p style={{ margin: 0, width: "100%", fontSize: 18, fontWeight: 400, lineHeight: "26px", color: "rgba(0,0,0,0.8)" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}
