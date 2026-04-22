"use client";

import { useRef, useEffect } from "react";

const VALUES = [
  {
    icon: "/about/icon-precision.svg",
    title: "Precision",
    description: "Hyper local targeting that reaches the right audience when they are most receptive.",
  },
  {
    icon: "/about/icon-innovation.svg",
    title: "Innovation",
    description: "Rethinking traditional media channels to create new forms of sensory engagement.",
  },
  {
    icon: "/about/icon-partnership.svg",
    title: "Partnership",
    description: "Creating win - win ecosystems for venues, advertisers, and everyday consumers.",
  },
];

// p at which each icon fills + content appears
const STEP_IN  = [0.05, 0.32, 0.59];
// p at which the bar starts travelling toward the next icon
const STEP_OUT = [0.16, 0.43, 0.70];
// fraction along the bar track where each icon sits
const BAR_POS  = [0, 0.5, 1];
const CONTENT_FADE = 0.07;

const ZOOM = 0.8;

function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export default function CoreValuesSection() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const barFillRef  = useRef<HTMLDivElement>(null);
  const iconRefs    = useRef<(HTMLDivElement | null)[]>(Array(3).fill(null));
  const contentRefs = useRef<(HTMLDivElement | null)[]>(Array(3).fill(null));

  useEffect(() => {
    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const setHeight = () => {
      const vh      = window.innerHeight;
      const stickyH = vh / ZOOM;
      sticky.style.height = `${stickyH}px`;
      outer.style.height  = `${stickyH + (vh / ZOOM) * 2.2}px`;
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

    const update = () => {
      const rect      = outer.getBoundingClientRect();
      const stickyH   = sticky.offsetHeight;
      const scrolled  = -rect.top;
      const maxScroll = Math.max(1, outer.offsetHeight - stickyH);
      const p         = Math.max(0, Math.min(1, scrolled / maxScroll));

      // ── Progress bar fill ──────────────────────────────────────────
      if (barFillRef.current) {
        let fill = 0;
        if (p >= STEP_IN[0]) {
          if (p >= STEP_IN[2]) {
            fill = 1;
          } else {
            for (let i = 0; i < 2; i++) {
              if (p < STEP_IN[i + 1]) {
                if (p < STEP_OUT[i]) {
                  fill = BAR_POS[i];
                } else {
                  const dur = STEP_IN[i + 1] - STEP_OUT[i];
                  fill = BAR_POS[i] + (BAR_POS[i + 1] - BAR_POS[i]) * ease((p - STEP_OUT[i]) / dur);
                }
                break;
              }
            }
          }
        }
        barFillRef.current.style.width = `${fill * 100}%`;
      }

      // ── Per-value updates ──────────────────────────────────────────
      VALUES.forEach((_, i) => {
        const active = p >= STEP_IN[i];

        const iconEl = iconRefs.current[i];
        if (iconEl) iconEl.style.backgroundColor = active ? "#0f9d58" : "#454545";

        const contentEl = contentRefs.current[i];
        if (contentEl) {
          if (active) {
            const eased = ease(Math.min(1, (p - STEP_IN[i]) / CONTENT_FADE));
            contentEl.style.opacity   = String(eased);
            contentEl.style.transform = `translateY(${(1 - eased) * 20}px)`;
          } else {
            contentEl.style.opacity   = "0";
            contentEl.style.transform = "translateY(20px)";
          }
        }
      });
    };

    let rafId = 0;
    let scheduled = false;
    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(() => { scheduled = false; update(); });
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={outerRef} style={{ position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          position:       "sticky",
          top:            0,
          background:     "#171717",
          overflow:       "hidden",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
        }}
      >
        {/* Green glow blob */}
        <div
          style={{
            position:     "absolute",
            left:         "50%",
            top:          "50%",
            transform:    "translateX(calc(-50% - 280px)) translateY(-50%)",
            width:        378,
            height:       378,
            borderRadius: "50%",
            background:   "rgba(95,185,68,0.2)",
            filter:       "blur(150px)",
            pointerEvents: "none",
          }}
        />

        {/* Content block */}
        <div
          style={{
            position:      "relative",
            width:         1130,
            display:       "flex",
            flexDirection: "column",
            gap:           104,
            alignItems:    "center",
          }}
        >
          <h2
            style={{
              fontSize:   60,
              fontWeight: 700,
              lineHeight: 1.2,
              textAlign:  "center",
              width:      "100%",
              background: "linear-gradient(180deg, #ffffff 2.67%, rgba(255,255,255,0.5) 97.33%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
              color:   "transparent",
              margin:  0,
            }}
          >
            Core Values
          </h2>

          {/* Icons + bar + content */}
          <div style={{ position: "relative", width: "100%", height: 186 }}>
            {/* Track */}
            <div
              style={{
                position:     "absolute",
                left:         162,
                top:          22,
                width:        807,
                height:       3,
                background:   "rgba(255,255,255,0.2)",
                borderRadius: 4,
                overflow:     "hidden",
              }}
            >
              {/* Fill */}
              <div
                ref={barFillRef}
                style={{
                  position:     "absolute",
                  left:         0,
                  top:          0,
                  width:        "0%",
                  height:       "100%",
                  background:   "#0f9d58",
                  borderRadius: 4,
                }}
              />
            </div>

            {/* Cards */}
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                style={{
                  position:      "absolute",
                  left:          i === 0 ? 0 : i === 1 ? 406 : 812,
                  top:           0,
                  width:         318,
                  display:       "flex",
                  flexDirection: "column",
                  gap:           32,
                  alignItems:    "center",
                }}
              >
                {/* Icon circle */}
                <div
                  ref={(el) => { iconRefs.current[i] = el; }}
                  style={{
                    width:           48,
                    height:          48,
                    minWidth:        48,
                    minHeight:       48,
                    maxWidth:        48,
                    maxHeight:       48,
                    borderRadius:    "50%",
                    backgroundColor: "#454545",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    flexShrink:      0,
                    flexGrow:        0,
                    overflow:        "hidden",
                    transition:      "background-color 0.35s ease",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={value.icon} alt="" style={{ width: 24, height: 24, display: "block" }} />
                </div>

                {/* Text */}
                <div
                  ref={(el) => { contentRefs.current[i] = el; }}
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    gap:           24,
                    alignItems:    "center",
                    textAlign:     "center",
                    width:         "100%",
                    opacity:       0,
                    transform:     "translateY(20px)",
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
    </div>
  );
}
