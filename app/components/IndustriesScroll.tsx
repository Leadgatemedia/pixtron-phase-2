"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function ArrowIcon({ variant = "white" }: { variant?: "white" | "black" }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={variant === "white" ? "/arrow-white.webp" : "/arrow-black.webp"} width={24} height={24} alt="" className="btn-arrow-img" style={{ display: "block", transition: "filter 0.35s ease" }} />;
}

function OpenInNewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <mask id="oim" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#oim)">
        <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H12V5H5V19H19V12H21V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM9.7 15.7L8.3 14.3L17.6 5H14V3H21V10H19V6.4L9.7 15.7Z" fill="#0F9D58" />
      </g>
    </svg>
  );
}

const INDUSTRIES = [
  {
    title: "Healthcare & Medical Services",
    icon: "/icons/industry-healthcare.svg",
    bullets: [
      "Cosmetic Dentistry",
      "Med Spa & Aesthetics",
      "Dermatology",
      "Chiropractic",
      "Plastic Surgery",
      "Veterinary",
    ],
  },
  {
    title: "Legal & Financial Services",
    icon: "/icons/industry-legal.svg",
    bullets: [
      "Personal Injury Legal",
      "Financial Advisory",
      "Mortgage Brokerage",
      "Tax & Accounting",
      "Insurance Agencies",
      "Notary & Title",
    ],
  },
  {
    title: "Real Estate & Home Services",
    icon: "/icons/industry-realestate.svg",
    bullets: [
      "Real Estate Services",
      "Home Remodelling",
      "General Contractor",
      "House Cleaning",
      "Property Management",
      "Moving & Storage",
    ],
  },
  {
    title: "Outdoor & Landscaping Services",
    icon: "/icons/industry-outdoor.svg",
    bullets: [
      "Landscaping Services",
      "Lawn Care Services",
      "Hardscaping Services",
      "Irrigation System Services",
      "Pool Installation & Maintenance",
      "Pest Control",
    ],
  },
  {
    title: "Beauty & Personal Care",
    icon: "/icons/industry-beauty.svg",
    bullets: [
      "Nail Salon Services",
      "Hair & Barbershop",
      "Skincare & Facials",
      "Makeup & Lash",
      "Tanning & Body Art",
      "Massage Therapy",
    ],
  },
  {
    title: "Fitness & Wellness",
    icon: "/icons/industry-fitness.svg",
    bullets: [
      "Fitness Studio Services",
      "Yoga & Wellness Services",
      "Personal Training",
      "Nutrition & Wellness",
      "CrossFit & Bootcamps",
      "Sports & Recreation",
    ],
  },
  {
    title: "Automotive Services",
    icon: "/icons/industry-automotive.svg",
    bullets: [
      "Auto Repair Services",
      "Luxury Car Dealership",
      "Car Wash & Detailing",
      "Tire & Alignment",
      "Towing & Roadside",
      "RV & Powersports",
    ],
  },
  {
    title: "Events & Creative Services",
    icon: "/icons/industry-events.svg",
    bullets: [
      "Wedding Photography Services",
      "Event Planning & Venues",
      "Graphic Design",
      "Marketing Agencies",
      "Entertainment & DJ",
      "Floral & Décor",
    ],
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
          // content exits in first half, inactive text enters in second half — no overlap
          width = ACTIVE_W - (ACTIVE_W - NARROW_W) * t;
          imgOpacity = Math.max(0, 1 - t * 2);
          contentOpacity = Math.max(0, 1 - t * 2);
          inactiveOpacity = Math.max(0, (t - 0.5) * 2);
        } else if (i === segment + 1) {
          // incoming → expanding
          // inactive text exits in first half, content enters in second half — no overlap
          width = NARROW_W + (ACTIVE_W - NARROW_W) * t;
          imgOpacity = Math.max(0, (t - 0.5) * 2);
          contentOpacity = Math.max(0, (t - 0.5) * 2);
          inactiveOpacity = Math.max(0, 1 - t * 2);
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
    <div ref={outerRef} style={{ position: "relative", borderTop: "160px solid #fff" }}>
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

        {/* Columns grid */}
        <div
          ref={gridRef}
          data-industries-grid="true"
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
              {/* Green background layer — visible when active */}
              <div
                ref={(el) => { imgLayerRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === 0 ? 1 : 0,
                  background: "linear-gradient(180deg, #0B8148 0%, #0F9D58 100%)",
                }}
              />

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={industry.icon}
                  alt=""
                  width={56}
                  height={56}
                  style={{
                    position: "absolute",
                    top: 28,
                    left: 28,
                    filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.25))",
                  }}
                />
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
                {/* Pill tags */}
                <div
                  style={{
                    position: "absolute",
                    top: 200,
                    left: 36,
                    right: 36,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {industry.bullets.map((item) => (
                    <span
                      key={item}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        alignSelf: "flex-start",
                        paddingLeft: 16,
                        paddingRight: 10,
                        paddingTop: 8,
                        paddingBottom: 8,
                        borderRadius: 9999,
                        background: "#fff",
                        boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.25)",
                        outline: "1px solid #e5e7eb",
                        outlineOffset: -1,
                        gap: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          color: "#000",
                          fontSize: 15,
                          fontWeight: 500,
                          lineHeight: "32px",
                          marginRight: 10,
                        }}
                      >
                        {item}
                      </span>
                      <OpenInNewIcon />
                    </span>
                  ))}
                </div>
              </div>

              {/* Inactive layer — vertical text, visible when narrow */}
              <div
                ref={(el) => { inactiveRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === 0 ? 0 : 1,
                  pointerEvents: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={industry.icon}
                  alt=""
                  width={56}
                  height={56}
                  style={{
                    position: "absolute",
                    top: 28,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "block",
                  }}
                />

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

        {/* CTA — below the grid, matching Figma */}
        <div ref={ctaRef} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 8 }}>
          <Link href="/contact?type=advertiser" className="btn-primary">
            <span>Advertise With Pixtron</span>
            <ArrowIcon />
          </Link>
          <Link
            href="#"
            className="btn-outline"
          >
            <span>See All Industries</span>
            <ArrowIcon variant="black" />
          </Link>
        </div>
      </div>
    </div>
  );
}
