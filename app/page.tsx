import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import HeroIntro from "./components/HeroIntro";
import HeroScrollSection from "./components/HeroScrollSection";
import HowItWorksScroll from "./components/HowItWorksScroll";
import RealImpactScroll from "./components/RealImpactScroll";
import WherePixtronWorksScroll from "./components/WherePixtronWorksScroll";
import IndustriesScroll from "./components/IndustriesScroll";
import FooterSection from "./components/FooterSection";
import ProcessScrollSection from "./components/ProcessScrollSection";

export const metadata: Metadata = createPageMetadata({
  title: "Advertising That People Touch, See and Smell",
  description:
    "Pixtron helps brands reach restaurant and hospitality audiences through sensory media advertising placed directly into real-world dining moments.",
  path: "/",
});
// ─── Arrow color tokens ───────────────────────────────────────────────────────

// ─── Sub-components ───────────────────────────────────────────────────────────

const ARROW_WHITE   = "white";
const ARROW_DARK    = "dark";
const ARROW_CONTACT = "dark";

function ArrowIcon({ src }: { src: string }) {
  const file = src === "white" ? "/arrow-white.png" : "/arrow-black.png";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" className="btn-arrow-img" style={{ display: "block", transition: "filter 0.35s ease" }} />;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      className="intro-reveal-nav"
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
            <Link href="/about" className="nav-link">About</Link>

            <div className="nav-product" style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
              <Link href="#" className="nav-link">Product</Link>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path className="nav-chevron" d="M4 6l4 4 4-4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <Link href="#" className="nav-link">Advertisers</Link>
            <Link href="#" className="nav-link">Industries</Link>
            <Link href="#" className="nav-link">Restaurants</Link>
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

function Hero() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
        height: "100%",   // fills the 125vh sticky container = full physical screen
        width: "100%",
      }}
    >
      {/* ── Centered content ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 172, // 172px from frame top (navbar is fixed, not in flow)
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Headline */}
        <h1
          data-hero-headline=""
          style={{
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.2,
            textAlign: "center",
            color: "#000",
            maxWidth: 782,
            marginBottom: 48,
          }}
        >
          Advertising that people{" "}
          <span style={{ color: "#0f9d58" }}>touch, see and smell</span>
        </h1>

        {/* Buttons */}
        <div
          className="intro-reveal-up"
          style={{ display: "inline-flex", gap: 24, alignItems: "center", marginBottom: 48 }}
        >
          {/* Advertise With Pixtron — filled black */}
          <Link href="/contact?type=advertiser" className="btn-primary" style={{ flexShrink: 0 }}>
            <span>Advertise With Pixtron</span>
            <ArrowIcon src={ARROW_WHITE} />
          </Link>

          {/* For Restaurants — outlined */}
          <Link href="/contact?type=restaurant" className="btn-outline" style={{ flexShrink: 0, justifyContent: "center", width: 256 }}>
            <span>For Restaurants</span>
            <ArrowIcon src={ARROW_DARK} />
          </Link>
        </div>

        {/* Subtitle */}
        <p
          className="intro-reveal-up"
          style={{
            fontSize: 22,
            fontWeight: 500,
            lineHeight: 1.4,
            color: "rgba(0,0,0,0.8)",
            textAlign: "center",
            maxWidth: 898,
          }}
        >
          Pixtron places your brand in the hands of customers through custom wet
          wipe sachets at restaurants, hotels, and events.
        </p>
      </div>

      {/* ── SEEN / TOUCHED / REMEMBERED watermark ── */}
      {/* All vertical values use vh to match the Figma 900px frame proportionally */}
      <div
        aria-hidden
        className="hero-watermark"
        style={{
          position: "absolute",
          top: "86vh",      // clear breathing room below hero text content
          left: "50%",
          transform: "translateX(calc(-50% + var(--watermark-scroll-x, 0px)))",
          width: "max-content",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {["SEEN", "TOUCHED", "REMEMBERED"].map((word) => (
          <div
            key={word}
            style={{
              display:    "block",
              width:      "max-content",
              margin:     "0 auto",
              fontSize:   "min(11.11vh, 100px)",
              fontWeight: 500,
              lineHeight: "11.31vh",
              color:      "rgba(0,0,0,0.12)",
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </section>
  );
}


// ─── COMPARISON SECTION ───────────────────────────────────────────────────────
function ComparisonSection() {
  const glass: React.CSSProperties = {
    backdropFilter: "blur(50px)",
    WebkitBackdropFilter: "blur(50px)",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    boxSizing: "border-box",
  };

  const yLabels = [
    { label: "0",  top: 246 },
    { label: "10", top: 186 },
    { label: "20", top: 126 },
    { label: "30", top: 66  },
    { label: "40", top: 6   },
  ];

  // Grid line Y positions: 2.15%, 23.66%, 44.8%, 67.03%, 88.53% of 279px chart height
  const gridLines = [6, 66, 125, 187, 247];

  // All bars are #0F9D58: small ones at 50% opacity, Pixtron at full — no border-radius (plain rects)
  const bars = [
    { left: 32,  top: 238, width: 137, height: 9,   color: "rgba(15,157,88,0.5)" },
    { left: 179, top: 234, width: 137, height: 13,  color: "rgba(15,157,88,0.5)" },
    { left: 326, top: 196, width: 137, height: 51,  color: "rgba(15,157,88,0.5)" },
    { left: 473, top: 32,  width: 137, height: 215, color: "#0f9d58"              },
  ];

  const barValueLabels = [
    { value: "1.7s", left: 115,   top: 221.5, align: "right"  as const },
    { value: "2.5s", left: 265,   top: 217.5, align: "right"  as const },
    { value: "7.0s", left: 410,   top: 221.5, align: "right"  as const },
    { value: "35s",  left: 541.5, top: 139.5, align: "center" as const },
  ];

  const xLabels = [
    { label: "Digital Banner",  cx: 101   },
    { label: "Social Ad",       cx: 247.5 },
    { label: "Video Pre-roll",  cx: 394.5 },
    { label: "Pixtron Sachet",  cx: 541.5 },
  ];

  const progressBars = [
    { label: "Pixtron (Physical + Digital)", value: "$0.45",  rightPct: 70 },
    { label: "Social Media Ads (Avg)",        value: "$1.20",  rightPct: 30 },
    { label: "Search Ads (Avg)",              value: "$2.50+", rightPct: 5  },
  ];

  return (
    <section
      style={{
        position: "relative",
        borderTop: "112px solid #fff",
        padding: "128px 39px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 72,
        overflow: "hidden",
        background: "#080808",
      }}
    >
      {/* Background texture */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/comparison-bg.jpg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      {/* ── Title & subtitle ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: 50,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#fff",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Pixtron vs. Digital Advertising
        </h2>
        <p
          style={{
            fontSize: 22,
            fontWeight: 500,
            lineHeight: 1.4,
            color: "#fff",
            textAlign: "center",
            margin: 0,
          }}
        >
          Why this marketing is better for real estate?
        </p>
      </div>

      {/* ── Data grid — two-column flex so heights stretch to match ── */}
      <div style={{ width: 1362, display: "flex", gap: 17, zIndex: 1, position: "relative", flexShrink: 0, alignItems: "stretch" }}>

        {/* LEFT: Engagement Duration bar chart */}
        <div
          style={{
            ...glass,
            width: 666,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 24px 32px",
          }}
        >
          {/* Card heading */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", alignSelf: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: 3.5, paddingBottom: 4.5, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/comparison/chart-icon.svg" alt="" width={20} height={20} style={{ display: "block", width: 20, height: 20 }} />
            </div>
            <span style={{ fontSize: 20, fontWeight: 600, color: "#fff", lineHeight: "28px", whiteSpace: "nowrap" }}>
              Engagement Duration
            </span>
          </div>

          {/* Chart canvas */}
          <div style={{ width: 610, height: 279, position: "relative", flexShrink: 0 }}>
            {/* Y-axis labels */}
            {yLabels.map(({ label, top }) => (
              <div
                key={label}
                style={{
                  position: "absolute",
                  left: 21,
                  top,
                  transform: "translate(-100%, -50%)",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  whiteSpace: "nowrap",
                  lineHeight: "normal",
                  textAlign: "right",
                }}
              >
                {label}
              </div>
            ))}

            {/* Horizontal grid lines */}
            {gridLines.map((y) => (
              <div
                key={y}
                style={{
                  position: "absolute",
                  top: y,
                  left: 32,
                  right: 0,
                  height: 1,
                  background: "rgba(255,255,255,0.1)",
                }}
              />
            ))}

            {/* Bars */}
            {bars.map((bar, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: bar.left,
                  top: bar.top,
                  width: bar.width,
                  height: bar.height,
                  background: bar.color,
                }}
              />
            ))}

            {/* Bar value labels */}
            {barValueLabels.map(({ value, left, top, align }) => (
              <div
                key={value}
                style={{
                  position: "absolute",
                  left,
                  top,
                  transform: align === "center" ? "translate(-50%, -50%)" : "translate(-100%, -50%)",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  lineHeight: "normal",
                  textAlign: align,
                }}
              >
                {value}
              </div>
            ))}

            {/* X-axis category labels */}
            {xLabels.map(({ label, cx }) => (
              <div
                key={label}
                style={{
                  position: "absolute",
                  left: cx,
                  top: 273,
                  transform: "translate(-50%, -50%)",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  whiteSpace: "nowrap",
                  lineHeight: "normal",
                  textAlign: "center",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT column — flex column: [Scan Rate + Recall Rate] then [Cost] */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 17 }}>

          {/* Top row: Scan Rate + Recall Rate — equal width, same height */}
          <div style={{ display: "flex", gap: 17 }}>

            {/* Scan Rate */}
            <div style={{ ...glass, flex: 1, padding: 25, display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#fff", lineHeight: "28px", whiteSpace: "nowrap" }}>Scan Rate</div>
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexShrink: 0 }}>
                    <span style={{ fontSize: 48, fontWeight: 700, color: "#fff", lineHeight: "48px", whiteSpace: "nowrap" }}>12%</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/comparison/arrow-up.svg" alt="" width={10.504} height={12.249} style={{ display: "block", width: 10.504, height: 12.249, flexShrink: 0 }} />
                    <span style={{ fontSize: 18, fontWeight: 400, color: "#0f9d58", lineHeight: "20px", whiteSpace: "nowrap" }}>vs 0.1% CTR</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.5)", lineHeight: "16px", whiteSpace: "nowrap" }}>
                Compared to digital display ads
              </div>
            </div>

            {/* Recall Rate */}
            <div style={{ ...glass, flex: 1, padding: 25, display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#fff", lineHeight: "28px", whiteSpace: "nowrap" }}>Recall Rate</div>
              <div style={{ fontSize: 48, fontWeight: 700, color: "#fff", lineHeight: "48px", whiteSpace: "nowrap" }}>78%</div>
              <div style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.5)", lineHeight: "16px", whiteSpace: "nowrap" }}>
                Brand recall after 24 hours
              </div>
            </div>

          </div>

          {/* Cost Per Meaningful Interaction — fills remaining height */}
          <div
            style={{
              ...glass,
              flex: 1,
              padding: 25,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
          <div style={{ fontSize: 20, fontWeight: 600, color: "#fff", lineHeight: "28px", whiteSpace: "nowrap" }}>
            Cost Per Meaningful Interaction
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
            {progressBars.map(({ label, value, rightPct }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <span style={{ fontSize: 14, fontWeight: 400, color: "#fff", lineHeight: "20px" }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", lineHeight: "20px" }}>{value}</span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 9999,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      height: 8,
                      left: 0,
                      right: `${rightPct}%`,
                      background: "#0f9d58",
                      borderRadius: 9999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>{/* end Cost card */}

        </div>{/* end right column */}

      </div>{/* end data grid */}
    </section>
  );
}

// ─── THE PROCESS ─────────────────────────────────────────────────────────────
function TheProcess() {
  const hospitality = [
    {
      step: "01",
      title: "Join Pixtron",
      description:
        "Quick onboarding. No upfront cost. We place your venue into our premium restaurant network.",
      width: 526,
    },
    {
      step: "02",
      title: "We Handle Everything",
      description:
        "Lorum ipsum dolar amet.\nDolar amet lorum ipsum dolar amet & lorum de ante.",
      width: 473,
    },
    {
      step: "03",
      title: "Elevate Your Tables",
      description:
        "Lorum ipsum dolar amet.\nDolar amet lorum ipsum dolar amet & lorum de ante.",
      width: 426,
    },
    {
      step: "04",
      title: "Impress Every Guest",
      description:
        "Lorum ipsum dolar amet.\nDolar amet lorum ipsum dolar amet & lorum de ante.",
      width: 383,
    },
  ];

  const advertisers = [
    {
      step: "01",
      title: "Define Your Audience",
      description:
        "Target by location, neighbourhood, and venue type.\nReach high-value customers in real-world spaces.",
      width: 526,
    },
    {
      step: "02",
      title: "Design Your Presence",
      description:
        "Lorum ipsum dolar amet.\nDolar amet lorum ipsum dolar amet & lorum de ante.",
      width: 473,
    },
    {
      step: "03",
      title: "Go Live in Restaurants",
      description:
        "Lorum ipsum dolar amet.\nDolar amet lorum ipsum dolar amet & lorum de ante.",
      width: 426,
    },
    {
      step: "04",
      title: "Track & Scale",
      description:
        "Lorum ipsum dolar amet.\nDolar amet lorum ipsum dolar amet & lorum de ante.",
      width: 383,
    },
  ];

  return (
    <ProcessScrollSection
      hospitality={hospitality}
      advertisers={advertisers}
      arrowDark={ARROW_DARK}
      arrowWhite={ARROW_WHITE}
    />
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const socialPlatforms = [
    { label: "YouTube", icon: "▶" },
    { label: "YouTube", icon: "▶" },
    { label: "YouTube", icon: "▶" },
    { label: "Instagram", icon: "📷" },
    { label: "Facebook", icon: "f" },
    { label: "TikTok", icon: "♪" },
    { label: "YouTube", icon: "▶" },
    { label: "YouTube", icon: "▶" },
    { label: "YouTube", icon: "▶" },
    { label: "YouTube", icon: "▶" },
  ];

  const footerCols = [
    {
      title: "Column 1",
      links: ["Link one", "Link two", "Link three", "Link four"],
    },
    {
      title: "Column 2",
      links: ["Link one", "Link two", "Link three"],
      soon: [false, false, true],
    },
    {
      title: "Column 3",
      links: ["Link one", "Link two", "Link three", "Link four"],
      soon: [true, false, false, false],
    },
  ];

  return (
    <footer>
      {/* CTA band */}
      <div
        style={{
          background: "#f6f6f6",
          padding: "56px 39px 0",
          borderTop: "1px solid #e0dfdf",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#000",
              maxWidth: 393,
              margin: "0 auto",
            }}
          >
            Get connected with us on social media
          </h2>
        </div>

        {/* Social icons row */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #e0dfdf",
          }}
        >
          {socialPlatforms.map((platform, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 142,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: i < socialPlatforms.length - 1 ? "1px solid #e0dfdf" : "none",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 28, lineHeight: 1 }}>{platform.icon}</span>
              <span style={{ fontSize: 13, color: "#000" }}>{platform.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer nav */}
      <div
        style={{
          borderTop: "1px solid #e0dfdf",
          padding: "40px 39px",
          display: "grid",
          gridTemplateColumns: "434px 1fr 1fr 1fr",
          gap: 40,
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        {/* Logo + info */}
        <div>
          <span
            style={{
              fontWeight: 900,
              fontSize: 28,
              background: "linear-gradient(101deg, #000 0%, rgba(0,0,0,0.5) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
              marginBottom: 16,
            }}
          >
            Pixtron
          </span>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(0,0,0,0.7)",
              marginBottom: 24,
            }}
          >
            Connecting brands with premium dining audiences through sensory
            advertising that people touch, see and smell.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>📍</span>
              <span style={{ fontSize: 14, color: "rgba(0,0,0,0.7)" }}>
                1810 E. Sahara Ave Ste 930 Las Vegas, NV 89104, USA
              </span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>✉️</span>
              <a
                href="mailto:info@pixtron.net"
                style={{ fontSize: 14, color: "#000", textDecoration: "none" }}
              >
                info@pixtron.net
              </a>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>📞</span>
              <a
                href="tel:7025822228"
                style={{ fontSize: 14, color: "#000", textDecoration: "none" }}
              >
                (702) 582-2228
              </a>
            </div>
          </div>
        </div>

        {/* Nav columns */}
        {footerCols.map((col, ci) => (
          <div key={ci}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#000",
                marginBottom: 20,
              }}
            >
              {col.title}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {col.links.map((link, li) => (
                <div key={li} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Link
                    href="#"
                    style={{
                      fontSize: 16,
                      color: "#000",
                      textDecoration: "none",
                    }}
                  >
                    {link}
                  </Link>
                  {col.soon?.[li] && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#0f9d58",
                        background: "rgba(15,157,88,0.1)",
                        borderRadius: 20,
                        padding: "2px 8px",
                      }}
                    >
                      Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid #e0dfdf",
          padding: "20px 39px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 14, color: "rgba(0,0,0,0.6)" }}>
          © {new Date().getFullYear()} Pixtron. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroIntro />
      <Navbar />
      <main>
        <HeroScrollSection>
          <Hero />
        </HeroScrollSection>
        <HowItWorksScroll />
        <RealImpactScroll />
        <WherePixtronWorksScroll />
        <IndustriesScroll />
        <ComparisonSection />
        <TheProcess />
      </main>
      <FooterSection />
    </>
  );
}
