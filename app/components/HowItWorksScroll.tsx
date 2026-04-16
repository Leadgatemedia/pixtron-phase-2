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

// p value at which each step becomes active
const THRESHOLDS = [0.1, 0.3, 0.55, 0.75];
// fraction along the bar where each icon sits (0 = far left, 1 = far right)
const BAR_POS = [0, 1 / 3, 2 / 3, 1];

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
    // Total outer height = stickyH + 4 physical screens of scroll.
    // Steps activate at [0.1, 0.3, 0.55, 0.75] → step 4 at p=0.75 (3 physical screens),
    // leaving ~1 physical screen of "all 4 complete" hold before the section unsticks.
    const setHeight = () => {
      const vh      = window.innerHeight;
      const stickyH = vh / ZOOM;
      outer.style.height = `${stickyH + (vh / ZOOM) * 4}px`;
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
        if (p >= THRESHOLDS[0]) {
          for (let i = 0; i < 4; i++) {
            const t0 = THRESHOLDS[i];
            const t1 = i < 3 ? THRESHOLDS[i + 1] : 1;
            const p0 = BAR_POS[i];
            const p1 = i < 3 ? BAR_POS[i + 1] : 1;
            if (p < t1) {
              fill = p0 + (p1 - p0) * ease((p - t0) / (t1 - t0));
              break;
            }
            fill = p1;
          }
        }
        barFillRef.current.style.width = `${fill * 100}%`;
      }

      // ── Per-step updates ───────────────────────────────────────────
      STEPS.forEach((_, i) => {
        const active = p >= THRESHOLDS[i];

        // Icon circle colour
        const iconEl = iconRefs.current[i];
        if (iconEl) iconEl.style.background = active ? "#0f9d58" : "#e7f5ee";

        // Swap icon image: separate assets for inactive (dark green) vs active (white)
        const imgEl = iconImgRefs.current[i];
        if (imgEl)
          imgEl.src = active ? STEPS[i].iconActive : STEPS[i].iconInactive;

        // Step content fade-in
        const contentEl = contentRefs.current[i];
        if (contentEl) {
          if (active) {
            const t     = Math.min(1, (p - THRESHOLDS[i]) / 0.08);
            const eased = ease(t);
            contentEl.style.opacity   = String(eased);
            contentEl.style.transform = `translateY(${(1 - eased) * 20}px)`;
          } else {
            contentEl.style.opacity   = "0";
            contentEl.style.transform = "translateY(20px)";
          }
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
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
