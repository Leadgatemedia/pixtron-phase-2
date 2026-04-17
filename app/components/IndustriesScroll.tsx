"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="4" cy="12" r="1.5" fill="#fff" />
      <circle cx="8.5" cy="12" r="1.5" fill="#fff" />
      <line x1="11" y1="12" x2="18" y2="12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <polyline points="15,8.5 19.5,12 15,15.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function BullseyeIcon({ color = "#0f9d58" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5.5" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  );
}

const INDUSTRIES = [
  {
    title: "Healthcare & Medical Services",
    bullets: [
      "Cosmetic Dentistry Services",
      "Medusa & Aesthetic Services",
      "Dermatology Services",
      "Chiropractic Services",
      "Plastic Surgery Services",
      "Veterinary Services",
    ],
    image: "/healthcare_medical.png",
  },
  {
    title: "Legal & Financial Services",
    bullets: [
      "Law Firms & Attorneys",
      "Accounting & Tax Services",
      "Insurance Agencies",
      "Financial Advisory",
      "Mortgage & Banking",
      "Notary & Title Services",
    ],
    image: "/healthcare_medical.png",
  },
  {
    title: "Real Estate & Home Services",
    bullets: [
      "Real Estate Brokerages",
      "Interior Design Studios",
      "Home Renovation Services",
      "Property Management",
      "Staging & Photography",
      "Moving & Storage",
    ],
    image: "/healthcare_medical.png",
  },
  {
    title: "Outdoor & Landscaping Services",
    bullets: [
      "Lawn Care Services",
      "Tree & Shrub Services",
      "Irrigation Systems",
      "Landscape Design",
      "Pool & Spa Services",
      "Pest Control",
    ],
    image: "/healthcare_medical.png",
  },
  {
    title: "Beauty & Personal Care",
    bullets: [
      "Hair Salons & Barbershops",
      "Nail & Spa Studios",
      "Skincare & Facials",
      "Makeup & Lash Studios",
      "Tanning & Body Art",
      "Massage Therapy",
    ],
    image: "/healthcare_medical.png",
  },
  {
    title: "Fitness & Wellness",
    bullets: [
      "Gyms & Fitness Centers",
      "Yoga & Pilates Studios",
      "Personal Training",
      "Nutrition & Wellness",
      "CrossFit & Bootcamps",
      "Sports & Recreation",
    ],
    image: "/healthcare_medical.png",
  },
  {
    title: "Automotive Services",
    bullets: [
      "Auto Dealerships",
      "Car Wash & Detailing",
      "Auto Repair & Service",
      "Tire & Alignment",
      "Towing & Roadside",
      "RV & Powersports",
    ],
    image: "/healthcare_medical.png",
  },
  {
    title: "Events & Creative Services",
    bullets: [
      "Event Planning & Venues",
      "Photography & Videography",
      "Graphic Design Studios",
      "Marketing Agencies",
      "Entertainment & DJ",
      "Floral & Décor",
    ],
    image: "/healthcare_medical.png",
  },
];

const ACTIVE_W = 434;
const NARROW_W = 128;
const CARD_H = 652;

export default function IndustriesScroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inactiveRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const heading = headingRef.current;
    const cta = ctaRef.current;
    const grid = gridRef.current;
    if (!outer || !sticky || !heading || !cta || !grid) return;

    const setDimensions = () => {
      const cssZoom = parseFloat(document.documentElement.style.zoom) || 1;
      const stickyH = window.innerHeight / cssZoom;
      const reservedSpace = heading.offsetHeight + cta.offsetHeight + 72;
      const availableGridH = Math.max(440, stickyH - reservedSpace);
      const gridScale = Math.min(1, availableGridH / CARD_H);
      const inactiveLabelFontSize = 19 + gridScale * 3;
      const inactiveLabelLineHeight = 1.12 + gridScale * 0.08;

      sticky.style.height = `${stickyH}px`;
      outer.style.height = `${stickyH * 5.5}px`;
      grid.style.height = `${CARD_H * gridScale}px`;
      grid.style.transform = `scale(${gridScale})`;
      grid.style.setProperty("--inactive-label-font-size", `${inactiveLabelFontSize}px`);
      grid.style.setProperty("--inactive-label-line-height", `${inactiveLabelLineHeight}`);
    };

    setDimensions();
    window.addEventListener("resize", setDimensions);
    const ro = new ResizeObserver(setDimensions);
    ro.observe(document.documentElement);

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const outerH = outer.offsetHeight;
      const stickyH = sticky.offsetHeight;
      const scrolled = -rect.top;
      const maxScroll = Math.max(1, outerH - stickyH);
      const rawProgress = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Reserve the last 18% of scroll travel as a hold at the final state,
      // so the last card is fully expanded before the section scrolls away.
      const HOLD = 0.18;
      const animProgress = Math.min(rawProgress / (1 - HOLD), 1);

      const totalTransitions = INDUSTRIES.length - 1; // 7
      const rawStep = animProgress * totalTransitions;
      const segment = Math.min(Math.floor(rawStep), totalTransitions - 1);
      const t = easeInOut(Math.max(0, Math.min(1, rawStep - segment)));

      INDUSTRIES.forEach((_, i) => {
        const col = colRefs.current[i];
        const imgLayer = imgLayerRefs.current[i];
        const content = contentRefs.current[i];
        const inactive = inactiveRefs.current[i];
        if (!col) return;

        let width: number;
        let imgOpacity: number;
        let contentOpacity: number;
        let inactiveOpacity: number;

        if (i < segment) {
          // already passed — narrow, inactive
          width = NARROW_W;
          imgOpacity = 0;
          contentOpacity = 0;
          inactiveOpacity = 1;
        } else if (i === segment) {
          // outgoing active → shrinking
          width = ACTIVE_W - (ACTIVE_W - NARROW_W) * t;
          imgOpacity = 1 - t;
          contentOpacity = 1 - t;
          inactiveOpacity = t;
        } else if (i === segment + 1) {
          // incoming → expanding
          width = NARROW_W + (ACTIVE_W - NARROW_W) * t;
          imgOpacity = t;
          contentOpacity = t;
          inactiveOpacity = 1 - t;
        } else {
          // not yet reached — narrow, inactive
          width = NARROW_W;
          imgOpacity = 0;
          contentOpacity = 0;
          inactiveOpacity = 1;
        }

        col.style.width = `${width}px`;
        if (imgLayer) imgLayer.style.opacity = String(imgOpacity);
        if (content) content.style.opacity = String(contentOpacity);
        if (inactive) inactive.style.opacity = String(inactiveOpacity);
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", setDimensions);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={outerRef} style={{ position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          background: "#fff",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {/* Heading */}
        <div ref={headingRef} style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 className="section-heading gradient-heading">Industries We Serve</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Pixtron adapts to any dining environment where memorable brand experiences matter
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <Link href="#" className="btn-primary">
            <span>Advertise With Pixtron</span>
            <ArrowIcon />
          </Link>
        </div>

        {/* Columns grid */}
        <div
          ref={gridRef}
          style={{
            display: "flex",
            height: CARD_H,
            gap: 3,
            borderRadius: 6,
            overflow: "hidden",
            transformOrigin: "top center",
          }}
        >
          {INDUSTRIES.map((industry, i) => (
            <div
              key={i}
              ref={(el) => { colRefs.current[i] = el; }}
              style={{
                width: i === 0 ? ACTIVE_W : NARROW_W,
                height: CARD_H,
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
                background: "#e7e7e7",
              }}
            >
              {/* Image layer — visible when active */}
              <div
                ref={(el) => { imgLayerRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={industry.image}
                  alt=""
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>

              {/* Content layer — title + bullets, visible when active */}
              <div
                ref={(el) => { contentRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === 0 ? 1 : 0,
                  pointerEvents: "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    position: "absolute",
                    top: 36,
                    left: 36,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BullseyeIcon />
                </div>
                {/* Title */}
                <h3
                  style={{
                    position: "absolute",
                    top: 110,
                    left: 36,
                    width: 360,
                    fontSize: 30,
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {industry.title}
                </h3>
                {/* Bullets */}
                <ul
                  style={{
                    position: "absolute",
                    top: 206,
                    left: 36,
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {industry.bullets.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#fff",
                        lineHeight: 1.7,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span style={{ fontWeight: 900, fontSize: 18 }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inactive layer — icon + vertical text, visible when narrow */}
              <div
                ref={(el) => { inactiveRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === 0 ? 0 : 1,
                  pointerEvents: "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    position: "absolute",
                    top: 37,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BullseyeIcon />
                </div>
                {/* Vertical text */}
                <p
                  style={{
                    position: "absolute",
                    bottom: 72,
                    left: "50%",
                    transform: "translateX(-50%) rotate(180deg)",
                    writingMode: "vertical-rl",
                    fontSize: "var(--inactive-label-font-size, 22px)",
                    fontWeight: 400,
                    color: "#000",
                    lineHeight: "var(--inactive-label-line-height, 1.2)",
                    margin: 0,
                    background: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.5) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    whiteSpace: "nowrap",
                  }}
                >
                  {industry.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
