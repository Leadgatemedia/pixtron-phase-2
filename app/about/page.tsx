import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FooterSection from "../components/FooterSection";
import CoreValuesSection from "../components/CoreValuesSection";

export const metadata: Metadata = {
  title: "About Us | Pixtron",
  description:
    "Learn how Pixtron is changing how brands are experienced through utility-first sensory advertising.",
};

const ARROW_WHITE = "white";
const ARROW_DARK = "dark";
const ARROW_CONTACT = "dark";

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
      <SiteNavbar />

      <main style={{ background: "#fff" }}>
        {/* ── Hero Section ── */}
        <section
          style={{
            background: "#fff",
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
        <section style={{ paddingTop: 184, paddingBottom: 184 }}>
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
                  background:
                    "linear-gradient(90deg, rgba(15,157,88,0.02) 0%, rgba(15,157,88,0) 100%)",
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
                  background:
                    "linear-gradient(90deg, rgba(15,157,88,0.02) 0%, rgba(15,157,88,0) 100%)",
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
                  background:
                    "linear-gradient(90deg, rgba(15,157,88,0.02) 0%, rgba(15,157,88,0) 100%)",
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
        <section style={{ paddingTop: 184, paddingBottom: 184 }}>
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
            {/* Two text lines with 32px gap between them */}
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
              <p
                style={{
                  color: "#fff",
                  fontSize: 66.292,
                  fontWeight: 700,
                  lineHeight: "82.864px",
                  margin: 0,
                }}
              >
                The future of advertising is
              </p>
              <p
                style={{
                  color: "#fff",
                  fontSize: 66.292,
                  fontWeight: 200,
                  fontStyle: "italic",
                  lineHeight: "82.864px",
                  margin: 0,
                }}
              >
                something you can touch.
              </p>
            </div>

            <Link
              href="/contact?type=advertiser"
              className="btn-outline"
              style={{
                background: "#fff",
              }}
            >
              <span>Advertise With Pixtron</span>
              <ArrowIcon src={ARROW_DARK} />
            </Link>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
