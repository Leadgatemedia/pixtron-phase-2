"use client";

import { useRef, useEffect } from "react";

const STEPS = [
  {
    number: "STEP 1",
    title: "Partner Venues",
    description:
      "We partner with premium restaurants and cafes to place branded wet wipes at every table.",
    iconInactive: "/icons/step1-inactive.svg",
    iconActive:   "/icons/step1-active.svg",
  },
  {
    number: "STEP 2",
    title: "Brand Placement",
    description:
      "Your brand message reaches customers during their dining experience in a memorable way.",
    iconInactive: "/icons/step2-inactive.svg",
    iconActive:   "/icons/step2-active.svg",
  },
  {
    number: "STEP 3",
    title: "Real Engagement",
    description:
      "Customers interact with your brand in a physical, tactile moment that creates lasting impressions.",
    iconInactive: "/icons/step3-inactive.svg",
    iconActive:   "/icons/step3-active.svg",
  },
  {
    number: "STEP 4",
    title: "Track Results",
    description:
      "Monitor campaign performance with detailed analytics with QR code and phone number tracking.",
    iconInactive: "/icons/step4-inactive.svg",
    iconActive:   "/icons/step4-active.svg",
  },
];

// p at which each step icon fills + content appears
const STEP_IN  = [0.05, 0.28, 0.51, 0.74];
// p at which the bar starts travelling toward the NEXT icon (hold before this)
const STEP_OUT = [0.14, 0.37, 0.60, 0.83];
// fraction along the bar track where each icon sits
const BAR_POS  = [0, 1 / 3, 2 / 3, 1];
const CONTENT_FADE = 0.07; // scroll range over which content fades in

const ZOOM = 0.8; // must match html zoom in layout.tsx

export default function HowItWorksScroll() {
  const outerRef        = useRef<HTMLDivElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const barFillRef      = useRef<HTMLDivElement>(null);
  const iconRefs    = useRef<(HTMLDivElement   | null)[]>(Array(4).fill(null));
  const iconImgRefs = useRef<(HTMLImageElement | null)[]>(Array(4).fill(null));
  const contentRefs = useRef<(HTMLDivElement   | null)[]>(Array(4).fill(null));

  useEffect(() => {
    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    // Sticky height = 100vh/ZOOM (fills the full physical screen at zoom:0.8).
    // Total outer height is intentionally shorter here so the timeline reacts
    // more quickly to scroll and does not feel laggy.
    const setHeight = () => {
      const vh      = window.innerHeight;
      const stickyH = vh / ZOOM;
      outer.style.height = `${stickyH + (vh / ZOOM) * 2.8}px`;
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

    const ease = (t: number) => t * t * (3 - 2 * t);

    const update = () => {
      const rect    = outer.getBoundingClientRect();
      const stickyH = sticky.offsetHeight;
      const scrolled  = -rect.top;
      const maxScroll = Math.max(1, outer.offsetHeight - stickyH);
      const p = Math.max(0, Math.min(1, scrolled / maxScroll));

      // ── Progress bar fill ──────────────────────────────────────────
      if (barFillRef.current) {
        let fill = 0;
        if (p >= STEP_IN[0]) {
          if (p >= STEP_IN[3]) {
            fill = 1;
          } else {
            for (let i = 0; i < 3; i++) {
              if (p < STEP_IN[i + 1]) {
                if (p < STEP_OUT[i]) {
                  // hold: bar stays at current icon
                  fill = BAR_POS[i];
                } else {
                  // travel: bar moves to next icon
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

      // ── Per-step updates ───────────────────────────────────────────
      STEPS.forEach((_, i) => {
        const active = p >= STEP_IN[i];

        // Icon circle colour
        const iconEl = iconRefs.current[i];
        if (iconEl) iconEl.style.background = active ? "#0f9d58" : "#e7f5ee";

        // Swap icon image: separate assets for inactive (dark green) vs active (white)
        const imgEl = iconImgRefs.current[i];
        if (imgEl) {
          const nextSrc = active ? STEPS[i].iconActive : STEPS[i].iconInactive;
          if (!imgEl.src.endsWith(nextSrc)) {
            imgEl.src = nextSrc;
          }
        }

        // Step content fade-in — starts at same time as icon fill
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
      rafId = window.requestAnimationFrame(() => {
        scheduled = false;
        update();
      });
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
      {/* ── Sticky frame ─────────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        style={{
          position:       "sticky",
          top:            0,
          height:         `${100 / ZOOM}vh`,
          background:     "#fff",
          overflow:       "hidden",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          padding:        "0 39px",
        }}
      >
        {/* Heading */}
        <h2 className="section-heading gradient-heading">How Pixtron Works</h2>
        <p className="section-subtitle" style={{ marginTop: 16 }}>
          A simple, seamless process that connects your brand with customers in
          real-world dining moments.
        </p>

        {/* ── Timeline bar + icons ────────────────────────────────────── */}
        <div
          style={{
            position:  "relative",
            width:     "100%",
            maxWidth:  1092,
            margin:    "64px auto 0",
            height:    48,
          }}
        >
          {/* Grey track */}
          <div
            style={{
              position:    "absolute",
              top:         "50%",
              left:        48,
              right:       48,
              height:      3,
              background:  "#e7f5ee",
              borderRadius: 2,
              transform:   "translateY(-50%)",
            }}
          />
          {/* Green fill */}
          <div
            ref={barFillRef}
            style={{
              position:    "absolute",
              top:         "50%",
              left:        48,
              width:       "0%",
              maxWidth:    "calc(100% - 96px)",
              height:      3,
              background:  "#0f9d58",
              borderRadius: 2,
              transform:   "translateY(-50%)",
            }}
          />
          {/* Icon circles */}
          <div
            style={{
              position:       "relative",
              zIndex:         1,
              height:         "100%",
              display:        "flex",
              justifyContent: "space-between",
              alignItems:     "center",
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={(el) => { iconRefs.current[i] = el; }}
                style={{
                  width:          48,
                  height:         48,
                  borderRadius:   "50%",
                  background:     "#e7f5ee",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                  transition:     "background 0.35s ease",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={(el) => { iconImgRefs.current[i] = el; }}
                  src={step.iconInactive}
                  alt={step.title}
                  style={{ width: 24, height: 24 }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Step content cards ──────────────────────────────────────── */}
        {/* maxWidth: 1362 (full content width) + gap: 30 → columns = 318px each.
            Icon centers (in 1092px container) land exactly on column centers. */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:                 30,
            marginTop:           32,
            width:               "100%",
            maxWidth:            1362,
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={(el) => { contentRefs.current[i] = el; }}
              style={{
                opacity:   0,
                transform: "translateY(20px)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize:     18,
                  fontWeight:   600,
                  color:        "#0f9d58",
                  marginBottom: 8,
                }}
              >
                {step.number}
              </p>
              <h3
                style={{
                  fontSize:     24,
                  fontWeight:   700,
                  color:        "#000",
                  marginBottom: 12,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize:   16,
                  lineHeight: 1.6,
                  color:      "rgba(0,0,0,0.8)",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
