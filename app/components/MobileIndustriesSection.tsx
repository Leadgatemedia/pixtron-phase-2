"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const INDUSTRIES = [
  {
    title: "Healthcare & Medical Services",
    icon: "/icons/industry-healthcare.svg",
    bullets: ["Cosmetic Dentistry", "Medusa & Aesthetic", "Dermatology", "Chiropractic", "Plastic Surgery", "Veterinary"],
  },
  { title: "Legal & Financial Services", icon: "/icons/industry-legal.svg", bullets: ["Personal Injury Legal", "Financial Advisory", "Mortgage Brokerage"] },
  { title: "Real Estate & Home Services", icon: "/icons/industry-realestate.svg", bullets: ["Real Estate Services", "Home Remodelling", "Property Management"] },
  { title: "Outdoor & Landscaping Services", icon: "/icons/industry-outdoor.svg", bullets: ["Landscaping Services", "Lawn Care Services", "Pool Maintenance"] },
  { title: "Beauty & Personal Care", icon: "/icons/industry-beauty.svg", bullets: ["Nail Salon Services", "Hair & Barbershop", "Skincare & Facials"] },
  { title: "Fitness & Wellness", icon: "/icons/industry-fitness.svg", bullets: ["Fitness Studio Services", "Yoga & Wellness Services", "Personal Training"] },
  { title: "Automotive Services", icon: "/icons/industry-automotive.svg", bullets: ["Auto Repair Services", "Car Wash & Detailing", "Luxury Dealership"] },
  { title: "Events & Creative Services", icon: "/icons/industry-events.svg", bullets: ["Event Planning", "Wedding Photography", "Marketing Agencies"] },
];

function ArrowIcon({ variant = "white" }: { variant?: "white" | "black" }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={variant === "white" ? "/arrow-white.png" : "/arrow-black.png"} width={24} height={24} alt="" style={{ display: "block" }} />;
}

function OpenIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19V5h7v2H7v10h10v-5h2v7H5Z" fill="#0F9D58" />
      <path d="M13 5h6v6h-2V8.4l-7.3 7.3-1.4-1.4L15.6 7H13V5Z" fill="#0F9D58" />
    </svg>
  );
}

export default function MobileIndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateActive = () => {
      const centerY = window.innerHeight * 0.48;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - centerY);
        if (distance < closestDistance) {
          closest = index;
          closestDistance = distance;
        }
      });

      setActiveIndex(closest);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <section
      className="mobile-industries"
      style={{
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        width: "100%",
        padding: "56px 16px",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", textAlign: "center" }}>
        <h2
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.2,
            background: "linear-gradient(95.814deg, #000 0%, rgba(0,0,0,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Industries We Serve
        </h2>
        <p style={{ margin: "16px 0 0", fontSize: 18, fontWeight: 500, lineHeight: 1.5, color: "#000" }}>
          Pixtron adapts to any dining environment where memorable brand experiences matter
        </p>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, borderRadius: 6, overflow: "hidden" }}>
        {INDUSTRIES.map((industry, index) => {
          const active = index === activeIndex;
          return (
            <div
              key={industry.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              style={{
                position: "relative",
                minHeight: active ? 558 : industry.title.length > 28 ? 120 : 104,
                padding: active ? 24 : 16,
                boxSizing: "border-box",
                overflow: "hidden",
                background: active ? "#0F9D58" : "#e7e7e7",
                transition: "min-height 520ms cubic-bezier(0.3, 1, 0.8, 1), background 360ms ease",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={industry.icon}
                alt=""
                width={active ? 48 : 32}
                height={active ? 48 : 32}
                style={{
                  display: "block",
                  filter: active ? "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" : "none",
                }}
              />
              <h3
                style={{
                  margin: active ? "28px 0 0" : "28px 0 0",
                  maxWidth: 313,
                  fontSize: active ? 24 : 20,
                  fontWeight: 700,
                  lineHeight: active ? 1.2 : 1.42,
                  color: active ? "#fff" : "#000",
                }}
              >
                {industry.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  marginTop: 28,
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 320ms ease 120ms, transform 320ms ease 120ms",
                  pointerEvents: active ? "auto" : "none",
                }}
              >
                {industry.bullets.map((item) => (
                  <span
                    key={item}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      alignSelf: "flex-start",
                      minHeight: 44,
                      padding: "0 10px 0 20px",
                      borderRadius: 9999,
                      background: "#fff",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
                      outline: "1px solid #e5e7eb",
                      outlineOffset: -1,
                      boxSizing: "border-box",
                    }}
                  >
                    <span style={{ marginRight: 24, fontSize: 16, fontWeight: 500, lineHeight: "32px", color: "#000", whiteSpace: "nowrap" }}>
                      {item}
                    </span>
                    <OpenIcon />
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="/contact?type=advertiser" className="btn-primary" style={{ width: "100%", justifyContent: "space-between", boxSizing: "border-box" }}>
          <span>Advertise With Pixtron</span>
          <ArrowIcon />
        </Link>
        <Link href="#" className="btn-outline" style={{ width: "100%", justifyContent: "space-between", boxSizing: "border-box" }}>
          <span>See All Industries</span>
          <ArrowIcon variant="black" />
        </Link>
      </div>
    </section>
  );
}
