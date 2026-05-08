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

// p at which icon i fills green + content starts fading in
const STEP_IN  = [0.04, 0.30, 0.54, 0.78];
// p at which bar starts travelling toward the NEXT icon
const STEP_OUT = [0.16, 0.42, 0.66, 0.88];
// Computed dynamically in update() to match actual flexbox icon positions
const CONTENT_FADE = 0.04;
// Bar parks just before the icon this many p-units before the icon fills
const PRE_PAUSE = 0.04;

const ZOOM = 0.8; // must match html zoom in layout.tsx

export default function HowItWorksScroll() {
  const outerRef        = useRef<HTMLDivElement>(null);
  const stickyRef       = useRef<HTMLDivElement>(null);
  const timelineRef     = useRef<HTMLDivElement>(null);
  const barFillRef      = useRef<HTMLDivElement>(null);
  const greyTrackRef    = useRef<HTMLDivElement>(null);
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
      // barFrac(i) = exact fraction of bar track to reach icon i's centre.
      // Computed from actual timeline width so it never overshoots the icon.
      // Sequence per step i > 0:
      //   bar travels → parks at left-edge of icon (PRE_PAUSE) →
      //   icon fills → bar sits at icon centre → content fades/holds →
      //   bar travels to next icon.
      if (barFillRef.current) {
        const timelineW = Math.max(1, timelineRef.current?.clientWidth ?? 1092);
        // CSS width:X% on an absolute child is relative to the CONTAINER width
        // (timelineW), not the track width. barFrac returns CSS-% fractions so
        // that bar right-edge = left(48px) + fill*timelineW lands exactly on the
        // icon centre — no overshoot.
        const iconFrac = 24 / timelineW; // icon radius as CSS-% of container

        // Icon i centre px = 24 + i*(timelineW-48)/3 (flexbox space-between)
        // Bar width to reach it = centre - 48  →  fraction = (centre-48)/timelineW
        const barFrac = (i: number): number => {
          if (i === 0) return 0;
          if (i === 3) return (timelineW - 96) / timelineW; // honours maxWidth constraint
          const centre = 24 + i * (timelineW - 48) / 3;
          return Math.max(0, (centre - 48) / timelineW);
        };

        let fill = 0;

        if (p >= STEP_IN[3]) {
          fill = barFrac(3); // = 1
        } else {
          for (let i = 0; i < 4; i++) {
            const arrive = i === 0 ? STEP_IN[0] : STEP_IN[i] - PRE_PAUSE;

            if (p < arrive) {
              fill = i === 0 ? 0 : barFrac(i) - iconFrac;
              break;
            }
            if (p < STEP_IN[i]) {
              // PRE_PAUSE: bar parked at icon i left-edge, icon not yet active
              fill = i === 0 ? 0 : barFrac(i) - iconFrac;
              break;
            }
            if (i === 3 || p < STEP_OUT[i]) {
              // Icon i active; bar exactly at icon centre (icon circle covers any overshoot)
              fill = barFrac(i);
              break;
            }
            // Travelling from icon i toward left-edge of icon i+1
            const nextArrive = STEP_IN[i + 1] - PRE_PAUSE;
            if (p < nextArrive) {
              const nextStop = barFrac(i + 1) - iconFrac;
              const dur = Math.max(0.0001, nextArrive - STEP_OUT[i]);
              fill = barFrac(i) + (nextStop - barFrac(i)) * ease((p - STEP_OUT[i]) / dur);
              break;
            }
            // p >= nextArrive → inside next step's PRE_PAUSE, continue loop
          }
        }

        barFillRef.current.style.width = `${fill * 100}%`;

        // Grey track: only extend as far as the current bar's DESTINATION icon.
        // While bar is parked at an icon: grey = same as green → no grey beyond icon.
        // While bar is travelling toward icon i+1: grey = barFrac(i+1) → shows
        // the upcoming segment so the bar appears to fill it in.
        if (greyTrackRef.current) {
          let greyFill = fill; // default: match green exactly (no visible grey ahead)
          for (let i = 0; i < 3; i++) {
            if (p >= STEP_OUT[i] && p < STEP_IN[i + 1] - PRE_PAUSE) {
              greyFill = barFrac(i + 1); // reveal only the next segment
              break;
            }
          }
          greyTrackRef.current.style.width = `${greyFill * 100}%`;
        }
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
            contentEl.style.opacity = String(eased);
            contentEl.style.transform = `translateY(${(1 - eased) * 20}px)`;
          } else {
            contentEl.style.opacity = "0";
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
          ref={timelineRef}
          style={{
            position:  "relative",
            width:     "100%",
            maxWidth:  1092,
            margin:    "64px auto 0",
            height:    48,
          }}
        >
          {/* Grey track — driven by JS so it only shows up to the next icon */}
          <div
            ref={greyTrackRef}
            style={{
              position:    "absolute",
              top:         "50%",
              left:        48,
              width:       "0%",
              maxWidth:    "calc(100% - 96px)",
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
                  transition:     "background 0.18s ease",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={(el) => { iconImgRefs.current[i] = el; }}
                  src={step.iconInactive}
                  alt={step.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
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
