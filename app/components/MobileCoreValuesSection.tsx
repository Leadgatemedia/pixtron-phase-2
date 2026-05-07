"use client";

import { useEffect, useRef } from "react";

const VALUES = [
  {
    icon: "/about/icon-precision.svg",
    title: "Precision",
    description: "We focus on details that shape how people experience a space, ensuring every interaction feels refined.",
  },
  {
    icon: "/about/icon-innovation.svg",
    title: "Innovation",
    description: "We rethink traditional products and turn them into meaningful, modern experiences.",
  },
  {
    icon: "/about/icon-partnership.svg",
    title: "Partnership",
    description: "We build long term relationships with businesses by delivering consistent value and quality.",
  },
];

const FIGMA_SECTION_HEIGHT = 725;
const ANIMATION_SCROLL_DISTANCE = 190;
const MOBILE_NAV_HEIGHT = 96;
const ANIMATION_START_LINE = 360;
const TRACK_TOP = 137;
const TRACK_HEIGHT = 396;
const ICON_TOP = [120, 315, 510];
const CONTENT_TOP = [136, 330, 526];

// Match desktop CoreValuesSection timing; only the fill axis changes on mobile.
const STEP_IN = [0.05, 0.32, 0.59];
const STEP_OUT = [0.16, 0.43, 0.70];
const BAR_POS = [0, 0.5, 1];
const CONTENT_FADE = 0.07;

function ease(t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

export default function MobileCoreValuesSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>(Array(VALUES.length).fill(null));
  const contentRefs = useRef<(HTMLDivElement | null)[]>(Array(VALUES.length).fill(null));

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const setHeight = () => {
      sticky.style.height = `${FIGMA_SECTION_HEIGHT}px`;
      outer.style.height = `${FIGMA_SECTION_HEIGHT + ANIMATION_SCROLL_DISTANCE}px`;
    };

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const maxScroll = Math.max(1, ANIMATION_SCROLL_DISTANCE);
      const p = Math.max(0, Math.min(1, (ANIMATION_START_LINE - rect.top) / maxScroll));

      if (barFillRef.current) {
        let fill = 0;
        if (p >= STEP_IN[0]) {
          if (p >= STEP_IN[2]) {
            fill = 1;
          } else {
            for (let i = 0; i < VALUES.length - 1; i += 1) {
              if (p < STEP_IN[i + 1]) {
                if (p < STEP_OUT[i]) {
                  fill = BAR_POS[i];
                } else {
                  const duration = STEP_IN[i + 1] - STEP_OUT[i];
                  fill = BAR_POS[i] + (BAR_POS[i + 1] - BAR_POS[i]) * ease((p - STEP_OUT[i]) / duration);
                }
                break;
              }
            }
          }
        }
        barFillRef.current.style.height = `${fill * 100}%`;
      }

      VALUES.forEach((_, index) => {
        const active = p >= STEP_IN[index];
        const iconEl = iconRefs.current[index];
        if (iconEl) iconEl.style.backgroundColor = active ? "#0f9d58" : "#454545";

        const contentEl = contentRefs.current[index];
        if (!contentEl) return;

        if (active) {
          const shown = ease((p - STEP_IN[index]) / CONTENT_FADE);
          contentEl.style.opacity = String(shown);
          contentEl.style.transform = `translateY(${(1 - shown) * 20}px)`;
        } else {
          contentEl.style.opacity = "0";
          contentEl.style.transform = "translateY(20px)";
        }
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
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={outerRef} style={{ position: "relative", background: "#171717" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: MOBILE_NAV_HEIGHT,
          background: "#171717",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -156,
            top: "calc(50% - 210.57px)",
            transform: "translateY(-50%)",
            width: 393,
            height: 393,
            borderRadius: "50%",
            background: "rgba(95,185,68,0.2)",
            filter: "blur(150px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 393,
            height: FIGMA_SECTION_HEIGHT,
          }}
        >
          <h2
            style={{
              position: "absolute",
              left: 16,
              top: 48,
              width: "calc(100% - 32px)",
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.2,
              textAlign: "center",
              background: "linear-gradient(180deg, #ffffff 2.67%, rgba(255,255,255,0.5) 97.33%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
            }}
          >
            Core Values
          </h2>

          <div>
            <div
              style={{
                position: "absolute",
                left: 38,
                top: TRACK_TOP,
                width: 3,
                height: TRACK_HEIGHT,
                background: "rgba(255,255,255,0.2)",
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

            {VALUES.map((value, index) => (
              <div
                key={value.title}
                style={{
                  position: "absolute",
                  left: 16,
                  top: ICON_TOP[index],
                  width: "calc(100% - 16px)",
                  zIndex: 1,
                }}
              >
                <div
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "#454545",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "0 0 48px",
                    transition: "background-color 0.35s ease",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={value.icon} alt="" style={{ width: 24, height: 24, display: "block" }} />
                </div>

                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  style={{
                    position: "absolute",
                    left: 64,
                    top: CONTENT_TOP[index] - ICON_TOP[index],
                    width: "calc(100% - 80px)",
                    maxWidth: 297,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    minWidth: 0,
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "opacity 0.1s linear",
                  }}
                >
                  <p style={{ fontSize: 24, fontWeight: 700, lineHeight: "32px", color: "#fff", margin: 0 }}>
                    {value.title}
                  </p>
                  <p style={{ fontSize: 18, lineHeight: "26px", color: "rgba(255,255,255,0.8)", margin: 0 }}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
