import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import FooterSection from "../components/FooterSection";

export const metadata: Metadata = {
  title: "About Us | Pixtron",
  description:
    "Learn how Pixtron is changing how brands are experienced through utility-first sensory advertising.",
};

const ARROW_WHITE = "white";
const ARROW_DARK = "dark";
const ARROW_CONTACT = "dark";

const coreValues = [
  {
    title: "Precision",
    description:
      "Hyper local targeting that reaches the right audience when they are most receptive.",
    icon: "/about/icon-precision.svg",
    circle: "#0f9d58",
  },
  {
    title: "Innovation",
    description:
      "Rethinking traditional media channels to create new forms of sensory engagement.",
    icon: "/about/icon-innovation.svg",
    circle: "#454545",
  },
  {
    title: "Partnership",
    description:
      "Creating win - win ecosystems for venues, advertisers, and everyday consumers.",
    icon: "/about/icon-partnership.svg",
    circle: "#454545",
  },
];

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
            href="#"
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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        color: "#0f9d58",
        fontSize: 20,
        fontWeight: 600,
        lineHeight: "28px",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      {children}
    </p>
  );
}

function StoryCard({
  width,
  height,
  style,
}: {
  width: number;
  height: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 12,
        borderLeft: "2px solid #0f9d58",
        background: "linear-gradient(90deg, rgba(15,157,88,0.02) 0%, rgba(15,157,88,0) 100%)",
        ...style,
      }}
    />
  );
}

function ValueCard({
  title,
  description,
  icon,
  circle,
}: {
  title: string;
  description: string;
  icon: string;
  circle: string;
}) {
  return (
    <div
      style={{
        width: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "999px",
          background: circle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" style={{ width: 24, height: 24, display: "block" }} />
      </div>
      <h3
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: 700,
          lineHeight: "32px",
          marginBottom: 16,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: 18,
          fontWeight: 400,
          lineHeight: "26px",
          maxWidth: 320,
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <SiteNavbar />

      <main style={{ background: "#fff" }}>
        <section
          style={{
            minHeight: 900,
            background: "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)",
            paddingTop: 166,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 1440,
              maxWidth: "100%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingInline: 40,
            }}
          >
            <h1
              style={{
                fontSize: 60,
                fontWeight: 700,
                lineHeight: 1.2,
                textAlign: "center",
                color: "#000",
              }}
            >
              <span>We&apos;re changing how</span>
              <br />
              <span style={{ color: "#0f9d58" }}>brands are experienced</span>
            </h1>

            <p
              style={{
                width: 900,
                maxWidth: "100%",
                marginTop: 40,
                textAlign: "center",
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.4,
                color: "rgba(0,0,0,0.8)",
              }}
            >
              At Pixtron, we believe the best advertising doesn&apos;t disrupt life, It
              enhances it. We turn everyday dining moments into premium brand
              connections.
            </p>

            <div style={{ marginTop: 48 }}>
              <Link href="#" className="btn-primary">
                <span>Advertise With Pixtron</span>
                <ArrowIcon src={ARROW_WHITE} />
              </Link>
            </div>

            <div style={{ marginTop: 72 }}>
              <Image
                src="/about/hero-image.png"
                alt="Pixtron advertising inside restaurants"
                width={1080}
                height={803}
                priority
                style={{
                  width: 1080,
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        </section>

        <section style={{ padding: "180px 0 120px" }}>
          <div
            style={{
              width: 1440,
              maxWidth: "100%",
              margin: "0 auto",
              paddingInline: 40,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 80,
            }}
          >
            <div style={{ width: 486, paddingTop: 76 }}>
              <SectionLabel>Our Story</SectionLabel>

              <div
                className="gradient-heading"
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginTop: 32,
                }}
              >
                It started with a simple observation: screens are crowded,
                attention is scarce, and people are tired of being interrupted.
              </div>

              <p
                style={{
                  marginTop: 48,
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  color: "rgba(0,0,0,0.8)",
                }}
              >
                We realized the most valuable real estate isn&apos;t digital, it&apos;s
                physical. It&apos;s the moment someone sits down for a meal, unwinds,
                and engages with the physical world in front of them.
              </p>

              <p
                style={{
                  marginTop: 32,
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  color: "rgba(0,0,0,0.8)",
                }}
              >
                By transforming an essential hospitality item into a beautifully
                designed medium, we created a way for brands to offer genuine
                utility while capturing undivided attention.
              </p>
            </div>

            <div
              style={{
                position: "relative",
                width: 1083,
                height: 533,
                flexShrink: 0,
              }}
            >
              <StoryCard width={1083} height={201} style={{ position: "absolute", top: 0, right: 0 }} />
              <StoryCard width={967} height={166} style={{ position: "absolute", top: 201, right: 0 }} />
              <StoryCard width={851} height={166} style={{ position: "absolute", top: 367, right: 0 }} />
            </div>
          </div>
        </section>

        <section style={{ padding: "0 0 160px" }}>
          <div
            style={{
              width: 1088,
              maxWidth: "calc(100% - 80px)",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div
              className="gradient-heading"
              style={{
                fontSize: 80,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
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

        <section style={{ padding: "0 0 180px" }}>
          <div
            style={{
              width: 1440,
              maxWidth: "100%",
              margin: "0 auto",
              paddingInline: 40,
              display: "flex",
              flexDirection: "column",
              gap: 140,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 72,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  width: 360,
                  paddingTop: 32,
                }}
              >
                <div style={{ width: 59, height: 1, background: "#0f9d58" }} />
                <SectionLabel>The Mission</SectionLabel>
              </div>

              <div
                className="gradient-heading"
                style={{
                  width: 892,
                  fontSize: 60,
                  fontWeight: 300,
                  lineHeight: 1.3,
                  textAlign: "right",
                }}
              >
                To bridge the physical and digital divide by turning high dwell
                environments into{" "}
                <span style={{ fontWeight: 700 }}>
                  measurable, impactful media spaces.
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 72,
              }}
            >
              <div
                className="gradient-heading"
                style={{
                  width: 904,
                  fontSize: 60,
                  fontWeight: 300,
                  lineHeight: 1.3,
                }}
              >
                A world where brands add value to everyday moments, and{" "}
                <span style={{ fontWeight: 700 }}>
                  every table becomes an opportunity
                </span>{" "}
                for meaningful connection.
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 16,
                  width: 320,
                  paddingTop: 32,
                }}
              >
                <SectionLabel>The Vision</SectionLabel>
                <div style={{ width: 59, height: 1, background: "#0f9d58" }} />
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            background: "#171717",
            padding: "120px 0 128px",
          }}
        >
          <div
            style={{
              width: 1440,
              maxWidth: "100%",
              margin: "0 auto",
              paddingInline: 40,
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: 60,
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 72,
                background:
                  "linear-gradient(101deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Core Values
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 120,
              }}
            >
              {coreValues.map((value) => (
                <ValueCard key={value.title} {...value} />
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            position: "relative",
            minHeight: 709,
            overflow: "hidden",
          }}
        >
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
              width: 1440,
              maxWidth: "100%",
              margin: "0 auto",
              paddingInline: 40,
              minHeight: 709,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 1114,
                maxWidth: "100%",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontSize: 66.292,
                  fontWeight: 700,
                  lineHeight: "82.864px",
                }}
              >
                The future of advertising is
              </div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 66.292,
                  fontWeight: 200,
                  fontStyle: "italic",
                  lineHeight: "82.864px",
                }}
              >
                something you can touch.
              </div>
            </div>

            <div style={{ marginTop: 56 }}>
              <Link
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#fff",
                  color: "#000",
                  border: "2px solid rgba(255,255,255,0.5)",
                  borderRadius: 6,
                  padding: "16px 20px 16px 22px",
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: "30px",
                  textDecoration: "none",
                }}
              >
                <span>Advertise With Pixtron</span>
                <ArrowIcon src={ARROW_DARK} />
              </Link>
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
