"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

const STATS = [
  {
    value: "91%",
    label: "Customer Engagement Rate",
    description: (
      <>
        Customers actively engage with{" "}
        <strong>branded wet wipes</strong>
      </>
    ),
  },
  {
    value: "7.8%",
    label: "Brand Recall",
    description: <>3x higher than digital display ads</>,
  },
  {
    value: "2.5K+",
    label: "Partner Venues",
    description: <>Premium restaurants and cafes worldwide</>,
  },
  {
    value: "137B+",
    label: "Annual Touch Points",
    description: <>Touch points with customers every year</>,
  },
];

const N    = STATS.length;
const ZOOM = 0.8;

export default function RealImpactScroll() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));

  useEffect(() => {
    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const setHeight = () => {
      const vh      = window.innerHeight;
      const stickyH = vh / ZOOM;
      // 1 screen per card + 1 hold screen at the end
      outer.style.height = `${stickyH + stickyH * (N + 1)}px`;
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.documentElement);

    const ease = (t: number) => t * t * (3 - 2 * t);

    const update = () => {
      const rect     = outer.getBoundingClientRect();
      const stickyH  = sticky.offsetHeight;
      const scrolled = -rect.top;
      const maxScroll = Math.max(1, outer.offsetHeight - stickyH);
      const p = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Each card occupies 1/(N+1) of the scroll range; last 1/(N+1) is hold
      const segSize    = 1 / (N + 1);
      const activeRaw  = p / segSize;
      const activeIndex = Math.min(N - 1, Math.floor(activeRaw));
      const activeT     = ease(Math.min(1, activeRaw - activeIndex));

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        if (i < activeIndex) {
          // Already shuffled away
          card.style.transform = "translateY(-340px)";
          card.style.opacity   = "0";
          card.style.zIndex    = "0";
        } else if (i === activeIndex) {
          // Currently sliding out
          const ty    = -activeT * 340;
          const alpha = 1 - activeT;
          card.style.transform = `translateY(${ty}px) scale(1)`;
          card.style.opacity   = String(alpha);
          card.style.zIndex    = String(N + 1);
        } else {
          // Still in stack — moves one step forward as active card exits
          const stackPos       = (i - activeIndex) - activeT;
          const ty             = Math.max(0, stackPos) * 22;
          const scale          = 1 - Math.max(0, stackPos) * 0.028;
          card.style.transform = `translateY(${ty}px) scale(${scale})`;
          card.style.opacity   = "1";
          card.style.zIndex    = String(N - i);
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
      <div
        ref={stickyRef}
        style={{
          position:       "sticky",
          top:            0,
          height:         `${100 / ZOOM}vh`,
          background:     "#fff",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          overflow:       "hidden",
          padding:        "0 39px",
        }}
      >
        <h2 className="section-heading gradient-heading">
          Real Impact, Real Results
        </h2>
        <p className="section-subtitle" style={{ marginTop: 16 }}>
          Data-driven insights that prove the power of sensory advertising
        </p>

        {/* Card stack */}
        <div
          style={{
            position:  "relative",
            width:     "100%",
            maxWidth:  1130,
            marginTop: 64,
            height:    180,
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                position:      "absolute",
                top:           0,
                left:          0,
                right:         0,
                background:    "#fff",
                border:        "1px solid #e0dfdf",
                borderRadius:  6,
                boxShadow:     "0px 34px 30px -30px rgba(0,0,0,0.25)",
                padding:       "32px 32px 20px",
                transformOrigin: "top center",
                transform:     `translateY(${i * 22}px) scale(${1 - i * 0.028})`,
                zIndex:        N - i,
                willChange:    "transform, opacity",
              }}
            >
              <div
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontSize: 80, fontWeight: 500, lineHeight: 1.4, color: "#000", margin: 0 }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginTop: 4 }}>
                    {stat.label}
                  </p>
                </div>
                <p style={{ fontSize: 24, lineHeight: 1.3, color: "#000", textAlign: "right", maxWidth: 430 }}>
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 80 }}>
          <Link href="#" className="btn-primary">
            <span>Advertise With Pixtron</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="4"   cy="12" r="1.5" fill="#fff" />
              <circle cx="8.5" cy="12" r="1.5" fill="#fff" />
              <line x1="11" y1="12" x2="18" y2="12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <polyline points="15,8.5 19.5,12 15,15.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
