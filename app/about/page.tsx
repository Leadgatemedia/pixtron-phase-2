import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FooterSection from "../components/FooterSection";
import CoreValuesSection from "../components/CoreValuesSection";
import MobileCoreValuesSection from "../components/MobileCoreValuesSection";
import MobileHeader from "../components/MobileHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Pixtron | Sensory Media Advertising",
  description:
    "Learn how Pixtron approaches sensory media advertising and why the brand focuses on real-world utility, presence, and memorability.",
  path: "/about",
});

const ARROW_WHITE = "white";
const ARROW_DARK = "dark";
const ARROW_CONTACT = "dark";
const MOBILE_CONTENT_MAX = 361;

function ArrowIcon({ src }: { src: string }) {
  const file = src === "white" ? "/arrow-white.png" : "/arrow-black.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={file}
      width={24}
      height={24}
      alt=""
      className="btn-arrow-img"
      style={{ display: "block", transition: "filter 0.35s ease" }}
    />
  );
}

function SiteNavbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        zIndex: 50,
        width: "100%",
        height: 88,
        background: "rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxSizing: "border-box",
        padding: "16px 39px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1820,
          margin: "0 auto",
          minHeight: 56,
          display: "grid",
          gridTemplateColumns: "480px 1fr 480px",
          alignItems: "center",
          columnGap: 16,
        }}
      >
        <div
          style={{
            width: 480,
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Link
            href="/"
            style={{
              width: "100%",
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Image
              src="/logo.png"
              alt="Pixtron"
              width={82}
              height={82}
              priority
              style={{ width: "auto", height: 52 }}
            />
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <div
              className="nav-product"
              style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}
            >
              <Link href="#" className="nav-link">
                Product
              </Link>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  className="nav-chevron"
                  d="M4 6l4 4 4-4"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Link href="#" className="nav-link">
              Advertisers
            </Link>
            <Link href="#" className="nav-link">
              Industries
            </Link>
            <Link href="#" className="nav-link">
              Restaurants
            </Link>
          </div>
        </div>

        <div
          style={{
            width: 480,
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Link
            href="/contact"
            className="btn-outline"
            style={{
              minHeight: 56,
              padding: "0 20px 0 22px",
              justifyContent: "center",
            }}
          >
            <span>Contact Us</span>
            <ArrowIcon src={ARROW_CONTACT} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Desktop navbar */}
      <div className="about-desktop-only">
        <SiteNavbar />
      </div>
      {/* Mobile navbar */}
      <div className="about-mobile-only">
        <MobileHeader />
      </div>

      <main>
        {/* ══════════════════════════════════════════════════════
            DESKTOP LAYOUT (hidden on mobile)
        ══════════════════════════════════════════════════════ */}
        <div className="about-desktop-only">

        {/* ── Hero Section ── */}
        <section
          style={{
            background: "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)",
            paddingTop: 168,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1440,
              margin: "0 auto",
              paddingInline: 271,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 72,
            }}
          >
            {/* Title → Button → Body (Figma order) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 48,
                width: "100%",
              }}
            >
              <h1
                style={{
                  fontSize: 60,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  textAlign: "center",
                  color: "#000",
                  margin: 0,
                }}
              >
                We&apos;re changing how
                <br />
                <span style={{ color: "#0f9d58" }}>brands are experienced</span>
              </h1>

              <Link href="/contact?type=advertiser" className="btn-primary">
                <span>Advertise With Pixtron</span>
                <ArrowIcon src={ARROW_WHITE} />
              </Link>

              <p
                style={{
                  width: 898,
                  maxWidth: "100%",
                  textAlign: "center",
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  color: "rgba(0,0,0,0.8)",
                  margin: 0,
                }}
              >
                At Pixtron, we believe the best advertising doesn&apos;t disrupt life, It
                enhances it. We turn everyday dining moments into premium brand connections.
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/hero-image.png"
              alt="Pixtron advertising inside restaurants"
              style={{ width: 897, maxWidth: "100%", height: "auto", display: "block" }}
            />
          </div>
        </section>

        {/* ── Our Story Section ── */}
        <section style={{ paddingTop: 184, paddingBottom: 184, background: "#fff" }}>
          <div
            style={{
              width: "100%",
              maxWidth: 1440,
              margin: "0 auto",
              paddingLeft: 155,
              display: "flex",
              gap: 86,
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                color: "#0f9d58",
                fontSize: 20,
                fontWeight: 600,
                lineHeight: "28px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                flexShrink: 0,
                margin: 0,
              }}
            >
              Our Story
            </p>

            {/* 3 stacked bordered cards — text lives inside each card */}
            <div
              style={{
                width: 1083,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              {/* Card 1 — full width, big heading */}
              <div
                style={{
                  width: "100%",
                  borderLeft: "2px solid #0f9d58",
                  background: "#fff",
                  borderRadius: "0 0 0 12px",
                  padding: "40px 30px",
                }}
              >
                <div
                  className="gradient-heading"
                  style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2, width: 898 }}
                >
                  It started with a simple observation: screens are crowded, attention is
                  scarce, and people are tired of being interrupted.
                </div>
              </div>

              {/* Card 2 — 967 px */}
              <div
                style={{
                  width: 967,
                  borderLeft: "2px solid #0f9d58",
                  background: "#fff",
                  borderRadius: "0 0 0 12px",
                  padding: "40px 30px",
                }}
              >
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: "rgba(0,0,0,0.8)",
                    width: 782,
                    margin: 0,
                  }}
                >
                  We realized the most valuable real estate isn&apos;t digital, it&apos;s
                  physical. It&apos;s the moment someone sits down for a meal, unwinds, and
                  engages with the physical world in front of them.
                </p>
              </div>

              {/* Card 3 — 851 px */}
              <div
                style={{
                  width: 851,
                  borderLeft: "2px solid #0f9d58",
                  background: "#fff",
                  borderRadius: "0 0 0 12px",
                  padding: "40px 30px",
                }}
              >
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: "rgba(0,0,0,0.8)",
                    width: 666,
                    margin: 0,
                  }}
                >
                  By transforming an essential hospitality item into a beautifully designed
                  medium, we created a way for brands to offer genuine utility while
                  capturing undivided attention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Large Typography Section ── */}
        <section
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #e8f5e9 49.52%, #ffffff 100%)",
            paddingTop: 184,
            paddingBottom: 184,
          }}
        >
          <div
            style={{
              width: 900,
              maxWidth: "calc(100% - 80px)",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div
              className="gradient-heading"
              style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.2 }}
            >
              Advertising shouldn&apos;t interrupt
            </div>
            <div
              style={{
                marginTop: 40,
                fontSize: 80,
                fontWeight: 600,
                fontStyle: "italic",
                lineHeight: "120px",
                color: "#0f9d58",
              }}
            >
              It should belong
            </div>
          </div>
        </section>

        {/* ── Mission & Vision Section ── */}
        <section style={{ paddingTop: 184, paddingBottom: 184, background: "#fff" }}>
          <div
            style={{
              width: "100%",
              maxWidth: 1440,
              margin: "0 auto",
              paddingInline: 155,
              display: "flex",
              flexDirection: "column",
              gap: 184,
            }}
          >
            {/* The Mission — label+line above, body below, left-aligned */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 48,
                alignItems: "flex-start",
              }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <svg width="59" height="16" viewBox="0 0 59 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
                  <path d="M59 6.5C59 6.83333 59 7.16667 59 7.5C58.0167 7.49167 57.0333 7.48333 56.05 7.475C38.35 7.325 20.65 7.175 2.95 7.025C1.96667 7.01667 0.98333 7.00833 0 7C0.98333 6.99167 1.96667 6.98333 2.95 6.975C20.65 6.825 38.35 6.675 56.05 6.525C57.0333 6.51667 58.0167 6.50833 59 6.5Z" fill="#0F9D58"/>
                </svg>
                <p
                  style={{
                    color: "#0f9d58",
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: "28px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    margin: 0,
                  }}
                >
                  The Mission
                </p>
              </div>
              <div
                className="gradient-heading"
                style={{ fontSize: 60, fontWeight: 300, lineHeight: 1.3, width: 1014 }}
              >
                To bridge the physical and digital divide by turning{" "}
                <span style={{ fontWeight: 700 }}>high dwell environments</span>{" "}
                into measurable, impactful media spaces.
              </div>
            </div>

            {/* The Vision — body above (right-aligned), label+line below, right-aligned */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 48,
                alignItems: "flex-end",
              }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <p
                  style={{
                    color: "#0f9d58",
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: "28px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    margin: 0,
                  }}
                >
                  The Vision
                </p>
                <svg width="59" height="16" viewBox="0 0 59 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0, transform: "scaleX(-1)" }}>
                  <path d="M59 6.5C59 6.83333 59 7.16667 59 7.5C58.0167 7.49167 57.0333 7.48333 56.05 7.475C38.35 7.325 20.65 7.175 2.95 7.025C1.96667 7.01667 0.98333 7.00833 0 7C0.98333 6.99167 1.96667 6.98333 2.95 6.975C20.65 6.825 38.35 6.675 56.05 6.525C57.0333 6.51667 58.0167 6.50833 59 6.5Z" fill="#0F9D58"/>
                </svg>
              </div>
              <div
                className="gradient-heading"
                style={{
                  fontSize: 60,
                  fontWeight: 300,
                  lineHeight: 1.3,
                  width: 1014,
                  textAlign: "right",
                }}
              >
                A world where brands add value to everyday moments, and{" "}
                <span style={{ fontWeight: 700 }}>every table becomes an opportunity</span>{" "}
                for meaningful connection.
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values Section ── */}
        <CoreValuesSection />

        {/* ── CTA Section ── */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/about/future-touch.jpg"
            alt="Restaurant table experience"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              paddingTop: 234,
              paddingBottom: 234,
              paddingInline: 271,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 64,
            }}
          >
            <div
              style={{
                width: 898,
                maxWidth: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 32,
              }}
            >
              <p style={{ color: "#fff", fontSize: 66.292, fontWeight: 700, lineHeight: "82.864px", margin: 0 }}>
                The future of advertising is
              </p>
              <p style={{ color: "#fff", fontSize: 66.292, fontWeight: 200, fontStyle: "italic", lineHeight: "82.864px", margin: 0 }}>
                something you can touch.
              </p>
            </div>
            <Link href="/contact?type=advertiser" className="btn-outline" style={{ background: "#fff" }}>
              <span>Advertise With Pixtron</span>
              <ArrowIcon src={ARROW_DARK} />
            </Link>
          </div>
        </section>

        </div>{/* end .about-desktop-only */}

        {/* ══════════════════════════════════════════════════════
            MOBILE LAYOUT (hidden on desktop, shown ≤767px)
        ══════════════════════════════════════════════════════ */}
        <div className="about-mobile-only">

          {/* ── Mobile Hero ── */}
          <section
            style={{
              background: "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)",
              paddingTop: 152,
              paddingBottom: 56,
              paddingInline: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 56,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, width: "100%", maxWidth: MOBILE_CONTENT_MAX, margin: "0 auto" }}>
              <h1
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  textAlign: "center",
                  color: "#000",
                  margin: 0,
                  width: "100%",
                }}
              >
                We&apos;re changing how
                <br />
                <span style={{ color: "#0f9d58" }}>brands are experienced</span>
              </h1>

              <Link
                href="/contact?type=advertiser"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  background: "#000",
                  color: "#fff",
                  border: "2px solid rgba(0,0,0,0.5)",
                  borderRadius: 6,
                  padding: "16px 20px 16px 22px",
                  textDecoration: "none",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 600, lineHeight: "30px" }}>Advertise With Pixtron</span>
                <ArrowIcon src={ARROW_WHITE} />
              </Link>

              <p
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.8)",
                  textAlign: "center",
                  margin: 0,
                  width: "100%",
                }}
              >
                At Pixtron, we believe the best advertising doesn&apos;t disrupt life, It
                enhances it. We turn everyday dining moments into premium brand connections.
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/hero-image.png"
              alt="Pixtron advertising inside restaurants"
              style={{ width: "100%", maxWidth: MOBILE_CONTENT_MAX, height: "auto", display: "block", margin: "0 auto" }}
            />
          </section>

          {/* ── Mobile Our Story ── */}
          <section
            style={{
              paddingTop: 80,
              paddingBottom: 80,
              paddingInline: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
              background: "#fff",
            }}
          >
            <p
              style={{
                color: "#0f9d58",
                fontSize: 20,
                fontWeight: 600,
                lineHeight: "28px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                textAlign: "center",
                margin: 0,
                width: "100%",
              }}
            >
              Our Story
            </p>

            <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: MOBILE_CONTENT_MAX, margin: "0 auto" }}>
              {/* Card 1 — full width */}
              <div
                style={{
                  borderLeft: "2px solid #0f9d58",
                  background: "linear-gradient(90deg, rgba(15,157,88,0.02) 0%, rgba(15,157,88,0) 100%)",
                  borderRadius: "0 0 0 12px",
                  padding: "32px 16px 32px 24px",
                }}
              >
                <div
                  className="gradient-heading"
                  style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.5 }}
                >
                  It started with a simple observation: screens are crowded, attention is
                  scarce, and people are tired of being interrupted.
                </div>
              </div>

              {/* Card 2 — 24px indent */}
              <div style={{ paddingLeft: 40 }}>
                <div
                  style={{
                    borderLeft: "2px solid #0f9d58",
                    background: "linear-gradient(90deg, rgba(15,157,88,0.02) 0%, rgba(15,157,88,0) 100%)",
                    borderRadius: "0 0 0 12px",
                    padding: "32px 16px 32px 24px",
                  }}
                >
                  <p style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.5, color: "rgba(0,0,0,0.8)", margin: 0 }}>
                    We realized the most valuable real estate isn&apos;t digital, it&apos;s
                    physical. It&apos;s the moment someone sits down for a meal, unwinds, and
                    engages with the physical world in front of them.
                  </p>
                </div>
              </div>

              {/* Card 3 — 48px indent */}
              <div style={{ paddingLeft: 80 }}>
                <div
                  style={{
                    borderLeft: "2px solid #0f9d58",
                    background: "linear-gradient(90deg, rgba(15,157,88,0.02) 0%, rgba(15,157,88,0) 100%)",
                    borderRadius: "0 0 0 12px",
                    padding: "32px 16px 32px 24px",
                  }}
                >
                  <p style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.5, color: "rgba(0,0,0,0.8)", margin: 0 }}>
                    By transforming an essential hospitality item into a beautifully designed
                    medium, we created a way for brands to offer genuine utility while
                    capturing undivided attention.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Mobile Quote ── */}
          <section
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #e8f5e9 49.52%, #ffffff 100%)",
              paddingTop: 80,
              paddingBottom: 80,
              paddingInline: 16,
              display: "flex",
              flexDirection: "column",
              gap: 24,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div className="gradient-heading" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.2, width: "100%" }}>
              Advertising shouldn&apos;t interrupt
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                fontStyle: "italic",
                lineHeight: 1.2,
                color: "#0f9d58",
                width: "100%",
              }}
            >
              It should belong
            </div>
          </section>

          {/* ── Mobile Mission & Vision ── */}
          <section
            style={{
              paddingTop: 80,
              paddingBottom: 80,
              paddingInline: 16,
              display: "flex",
              flexDirection: "column",
              gap: 80,
              alignItems: "center",
              background: "#fff",
            }}
          >
            <div style={{ width: "100%", maxWidth: MOBILE_CONTENT_MAX, display: "flex", flexDirection: "column", gap: 80 }}>
            {/* The Mission */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start", width: "100%" }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <svg width="59" height="16" viewBox="0 0 59 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
                  <path d="M59 6.5C59 6.83333 59 7.16667 59 7.5C58.0167 7.49167 57.0333 7.48333 56.05 7.475C38.35 7.325 20.65 7.175 2.95 7.025C1.96667 7.01667 0.98333 7.00833 0 7C0.98333 6.99167 1.96667 6.98333 2.95 6.975C20.65 6.825 38.35 6.675 56.05 6.525C57.0333 6.51667 58.0167 6.50833 59 6.5Z" fill="#0F9D58"/>
                </svg>
                <p style={{ color: "#0f9d58", fontSize: 20, fontWeight: 600, lineHeight: "28px", letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap", margin: 0 }}>
                  The Mission
                </p>
              </div>
              <div
                className="gradient-heading"
                style={{
                  backgroundImage: "linear-gradient(91.9003736288043deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  fontSize: 30,
                  fontWeight: 300,
                  lineHeight: 1.3,
                  width: "100%",
                }}
              >
                To bridge the physical and digital divide by turning{" "}
                <span style={{ fontWeight: 700 }}>high dwell environments</span>{" "}
                into measurable, impactful media spaces.
              </div>
            </div>

            {/* The Vision */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-end", width: "100%" }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <p style={{ color: "#0f9d58", fontSize: 20, fontWeight: 600, lineHeight: "28px", letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap", margin: 0 }}>
                  The Vision
                </p>
                <svg width="59" height="16" viewBox="0 0 59 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0, transform: "scaleX(-1)" }}>
                  <path d="M59 6.5C59 6.83333 59 7.16667 59 7.5C58.0167 7.49167 57.0333 7.48333 56.05 7.475C38.35 7.325 20.65 7.175 2.95 7.025C1.96667 7.01667 0.98333 7.00833 0 7C0.98333 6.99167 1.96667 6.98333 2.95 6.975C20.65 6.825 38.35 6.675 56.05 6.525C57.0333 6.51667 58.0167 6.50833 59 6.5Z" fill="#0F9D58"/>
                </svg>
              </div>
              <div
                className="gradient-heading"
                style={{
                  backgroundImage: "linear-gradient(91.9003736288043deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  fontSize: 30,
                  fontWeight: 300,
                  lineHeight: 1.3,
                  textAlign: "right",
                  width: "100%",
                }}
              >
                A world where brands add value to everyday moments, and{" "}
                <span style={{ fontWeight: 700 }}>every table becomes an opportunity</span>{" "}
                for meaningful connection.
              </div>
            </div>
            </div>
          </section>

          {/* ── Mobile Core Values (static vertical layout) ── */}
          <MobileCoreValuesSection />

          <section
            style={{
              display: "none",
              position: "relative",
              height: 703,
              background: "#171717",
              overflow: "hidden",
            }}
          >
            {/* Glow blob */}
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

            {/* Title */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 59.43,
                transform: "translate(-50%, -50%)",
                width: 361,
                height: 22,
                textAlign: "center",
                fontSize: 30,
                fontWeight: 700,
                lineHeight: 1.2,
                background: "linear-gradient(180deg, #ffffff 2.67%, rgba(255,255,255,0.5) 97.33%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Core Values
            </div>

            {/* Vertical progress bar track */}
            <div
              style={{
                position: "absolute",
                left: 38,
                top: 137,
                width: 3,
                height: 396,
                background: "rgba(255,255,255,0.2)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              {/* Fill — first segment active (Precision) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 94,
                  background: "#0f9d58",
                  borderRadius: 4,
                }}
              />
            </div>

            {/* Precision — active */}
            <div
              style={{
                position: "absolute",
                left: 16,
                top: 120.43,
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#0f9d58",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/icon-precision.svg" alt="" style={{ width: 24, height: 24 }} />
            </div>
            <div style={{ position: "absolute", left: 80, top: 136.43, width: 297 }}>
              <p style={{ fontSize: 24, fontWeight: 700, lineHeight: "32px", color: "#fff", margin: 0 }}>Precision</p>
              <p style={{ fontSize: 18, lineHeight: "26px", color: "rgba(255,255,255,0.8)", margin: "24px 0 0" }}>
                Hyper local targeting that reaches the right audience when they are most receptive.
              </p>
            </div>

            {/* Innovation — inactive */}
            <div
              style={{
                position: "absolute",
                left: 16,
                top: 315.43,
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#454545",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/icon-innovation.svg" alt="" style={{ width: 24, height: 24 }} />
            </div>
            <div style={{ position: "absolute", left: 80, top: 330.43, width: 297 }}>
              <p style={{ fontSize: 24, fontWeight: 700, lineHeight: "32px", color: "#fff", margin: 0 }}>Innovation</p>
              <p style={{ fontSize: 18, lineHeight: "26px", color: "rgba(255,255,255,0.8)", margin: "24px 0 0" }}>
                Rethinking traditional media channels to create new forms of sensory engagement.
              </p>
            </div>

            {/* Partnership — inactive */}
            <div
              style={{
                position: "absolute",
                left: 16,
                top: 510.43,
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#454545",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/icon-partnership.svg" alt="" style={{ width: 24, height: 24 }} />
            </div>
            <div style={{ position: "absolute", left: 80, top: 526, width: 297 }}>
              <p style={{ fontSize: 24, fontWeight: 700, lineHeight: "32px", color: "#fff", margin: 0 }}>Partnership</p>
              <p style={{ fontSize: 18, lineHeight: "26px", color: "rgba(255,255,255,0.8)", margin: "24px 0 0" }}>
                Creating win - win ecosystems for venues, advertisers, and everyday consumers.
              </p>
            </div>
          </section>

          {/* ── Mobile CTA ── */}
          <section style={{ position: "relative", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/future-touch.jpg"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                paddingTop: 104,
                paddingBottom: 104,
                paddingInline: 16,
                display: "flex",
                flexDirection: "column",
                gap: 40,
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", maxWidth: MOBILE_CONTENT_MAX, display: "flex", flexDirection: "column", gap: 40, alignItems: "center" }}>
              <p
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  textAlign: "center",
                  margin: 0,
                }}
              >
                The future of advertising is{" "}
                <span style={{ fontWeight: 200, fontStyle: "italic" }}>something you can touch.</span>
              </p>

              <Link
                href="/contact?type=advertiser"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  background: "#fff",
                  color: "#000",
                  border: "2px solid rgba(255,255,255,0.5)",
                  borderRadius: 6,
                  padding: "16px 20px 16px 22px",
                  textDecoration: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 600, lineHeight: "30px" }}>Advertise With Pixtron</span>
                <ArrowIcon src={ARROW_DARK} />
              </Link>
              </div>
            </div>
          </section>

        </div>{/* end .about-mobile-only */}

        <FooterSection />
      </main>
    </>
  );
}
