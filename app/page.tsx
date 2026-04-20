import Image from "next/image";
import Link from "next/link";
import HeroIntro from "./components/HeroIntro";
import HeroScrollSection from "./components/HeroScrollSection";
import HowItWorksScroll from "./components/HowItWorksScroll";
import RealImpactScroll from "./components/RealImpactScroll";
import WherePixtronWorksScroll from "./components/WherePixtronWorksScroll";
import IndustriesScroll from "./components/IndustriesScroll";
import FooterSection from "./components/FooterSection";
// ─── Arrow color tokens ───────────────────────────────────────────────────────

// ─── Sub-components ───────────────────────────────────────────────────────────

const ARROW_WHITE   = "white";
const ARROW_DARK    = "dark";
const ARROW_CONTACT = "dark";

function ArrowIcon({ src }: { src: string }) {
  const color = src === "white" ? "#fff" : "#000";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* Two dots */}
      <circle cx="4" cy="12" r="1.5" fill={color} />
      <circle cx="8.5" cy="12" r="1.5" fill={color} />
      {/* Arrow shaft */}
      <line x1="11" y1="12" x2="18" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Arrowhead */}
      <polyline points="15,8.5 19.5,12 15,15.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-heading gradient-heading">{children}</h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-subtitle" style={{ marginTop: 16 }}>{children}</p>
  );
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
        background: "rgba(255,255,255,0.4)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        padding: "0 39px",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <Image src="/logo.png" alt="Pixtron" width={82} height={82} priority />
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Link href="#" className="nav-link">About</Link>

        {/* Product — with dropdown chevron */}
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

      {/* CTA */}
      <Link href="#" className="btn-outline">
        <span>Contact Us</span>
        <ArrowIcon src={ARROW_CONTACT} />
      </Link>
    </nav>
  );
}

// ─── HERO (Frame 1) ───────────────────────────────────────────────────────────
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
          <Link href="#" className="btn-primary" style={{ flexShrink: 0 }}>
            <span>Advertise With Pixtron</span>
            <ArrowIcon src={ARROW_WHITE} />
          </Link>

          {/* For Restaurants — outlined */}
          <Link href="#" className="btn-outline" style={{ flexShrink: 0, justifyContent: "center", width: 256 }}>
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


// ─── WHY PIXTRON IS DIFFERENT ─────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Yes">
      <path d="M6 16.5L12.5 23L26 9" stroke="#0EAD69" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="No">
      <path d="M9 9L23 23M23 9L9 23" stroke="#E63946" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function WhyDifferent() {
  const rows = [
    { feature: "Physical Engagement",       pixtron: "check", digitalAds: "close", socialMedia: "close" },
    { feature: "Premium Audience",           pixtron: "check", digitalAds: "close", socialMedia: "close" },
    { feature: "High Engagement Rate (91%)", pixtron: "check", digitalAds: "close", socialMedia: "close" },
    { feature: "Brand Recall",               pixtron: "7.8%",  digitalAds: "2.5%",  socialMedia: "2.1%"  },
    { feature: "Ad Blocking",                pixtron: "close", digitalAds: "check", socialMedia: "check" },
    { feature: "Real-World Touch",           pixtron: "check", digitalAds: "close", socialMedia: "close" },
    { feature: "Venue Targeting",            pixtron: "check", digitalAds: "close", socialMedia: "check" },
    { feature: "Measurable ROI",             pixtron: "check", digitalAds: "check", socialMedia: "check" },
  ];

  const gradientText: React.CSSProperties = {
    background: "linear-gradient(104.57deg, #000 0%, rgba(0,0,0,0.5) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  function Cell({ value, isPixtron }: { value: string; isPixtron: boolean }) {
    if (value === "check") return <CheckIcon />;
    if (value === "close") return <CloseIcon />;
    return (
      <span style={{
        fontSize: 20,
        fontWeight: 600,
        color: isPixtron ? "#000" : "#0EAD69",
        mixBlendMode: isPixtron ? "normal" : "luminosity",
      }}>
        {value}
      </span>
    );
  }

  const ROW_H    = 79;
  const HEADER_H = 68;
  const COL_DATA = 270;
  const COL_FEAT = 319;

  return (
    <section style={{ background: "#fff", padding: "100px 39px" }}>
      <div style={{ maxWidth: 1362, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <SectionHeading>Why Pixtron is Different</SectionHeading>
          <SectionSubtitle>
            See how sensory advertising outperforms traditional digital channels
          </SectionSubtitle>
        </div>

      </div>

      {/* Dashed separator — full viewport width */}
      <div style={{ borderTop: "1px dashed rgba(0,0,0,0.2)", margin: "0 -39px" }} />

      <div style={{ maxWidth: 1362, margin: "0 auto" }}>
        {/* Table */}
          <div style={{ maxWidth: 1130, margin: "0 auto", position: "relative" }}>
            {/* Vertical border lines — absolutely positioned so they span full table height */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 1, background: "rgba(0,0,0,0.18)", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 1, background: "rgba(0,0,0,0.18)", pointerEvents: "none", zIndex: 1 }} />

          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: `${COL_FEAT}px ${COL_DATA}px ${COL_DATA}px ${COL_DATA}px`, height: HEADER_H, borderBottom: "1px solid #e0dfdf" }}>
            <div style={{ display: "flex", alignItems: "center", paddingLeft: 30 }}>
              <span style={{ fontSize: 24, fontWeight: 700, ...gradientText }}>Feature</span>
            </div>
            {["Pixtron", "Digital Ads", "Social Media"].map((label) => (
              <div key={label} style={{ background: "#f6f6f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 24, fontWeight: 700, ...gradientText }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              style={{ display: "grid", gridTemplateColumns: `${COL_FEAT}px ${COL_DATA}px ${COL_DATA}px ${COL_DATA}px`, height: ROW_H, borderBottom: "1px solid #e0dfdf" }}
            >
              <div style={{ display: "flex", alignItems: "center", paddingLeft: 30, fontSize: 20, fontWeight: 500, color: "#000" }}>
                {row.feature}
              </div>
              {[
                { value: row.pixtron,     isPixtron: true  },
                { value: row.digitalAds,  isPixtron: false },
                { value: row.socialMedia, isPixtron: false },
              ].map((cell, j) => (
                <div key={j} style={{ background: "#f6f6f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Cell value={cell.value} isPixtron={cell.isPixtron} />
                </div>
              ))}
            </div>
          ))}

          {/* Footer disclaimer */}
          <div style={{ background: "#fff", height: 80, borderBottom: "1px solid #e0dfdf", borderRadius: "0 0 6px 6px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 14px rgba(0,0,0,0.25)" }}>
            <p style={{ fontSize: 22, color: "rgba(0,0,0,0.8)", textAlign: "center" }}>
              Based on industry averages and Pixtron internal data from 2025 - 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── THE PROCESS ─────────────────────────────────────────────────────────────
type ProcessStep = { step: string; title: string; description: string; width: number };

function ProcessColumn({
  label,
  heading,
  steps,
  btnLabel,
  btnStyle,
}: {
  label: string;
  heading: string;
  steps: ProcessStep[];
  btnLabel: string;
  btnStyle: "outline" | "primary";
}) {
  return (
    <div style={{ flex: 1 }}>
      <p
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#0f9d58",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        {label}
      </p>
      <h3
        style={{
          fontSize: 30,
          fontWeight: 400,
          color: "#000",
          textAlign: "center",
          lineHeight: 1.3,
          marginBottom: 48,
        }}
      >
        {heading.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {i === 1 ? <strong>{line}</strong> : line}
          </span>
        ))}
      </h3>

      {/* Accordion-style steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {steps.map((step, i) => {
          const isFirst = i === 0;
          return (
            <div
              key={i}
              style={{
                background: "#e9e9e9",
                border: "1px solid #e0dfdf",
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: isFirst ? "0 24px 30px -20px rgba(0,0,0,0.25)" : undefined,
                maxWidth: step.width,
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                padding: isFirst ? "32px 24px" : "18px 24px",
                position: "relative",
              }}
            >
              {isFirst && (
                <div style={{ position: "absolute", inset: 0, background: "#e9e9e9" }} />
              )}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: isFirst ? 24 : 20,
                      fontWeight: 500,
                      color: isFirst ? "#000" : "rgba(0,0,0,0.6)",
                      lineHeight: 1.4,
                      marginBottom: isFirst && step.description ? 12 : 0,
                    }}
                  >
                    {step.title}
                  </p>
                  {isFirst && step.description && (
                    <p style={{ fontSize: 16, color: "#000", lineHeight: 1.4, maxWidth: 476 }}>
                      {step.description}
                    </p>
                  )}
                </div>
                <span
                  style={{
                    fontSize: isFirst ? 60 : 50,
                    fontWeight: 700,
                    color: isFirst ? "#0f9d58" : "rgba(0,0,0,0.15)",
                    lineHeight: 1,
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  {step.step}
                </span>
              </div>
              {!isFirst && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `rgba(255,255,255,${0.9 - i * 0.2})`,
                    borderRadius: 6,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        {btnStyle === "primary" ? (
          <Link href="#" className="btn-primary">
            <span>{btnLabel}</span>
            <ArrowIcon src={ARROW_WHITE} />
          </Link>
        ) : (
          <Link href="#" className="btn-outline">
            <span>{btnLabel}</span>
            <ArrowIcon src={ARROW_DARK} />
          </Link>
        )}
      </div>
    </div>
  );
}

function TheProcess() {
  const processBorder = "1px dashed rgba(0,0,0,0.2)";

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
      description: "",
      width: 473,
    },
    { step: "03", title: "Elevate Your Tables", description: "", width: 426 },
    { step: "04", title: "Impress Every Guest", description: "", width: 383 },
  ];

  const advertisers = [
    {
      step: "01",
      title: "Define Your Audience",
      description:
        "Target by location, neighbourhood, and venue type. Reach high value customers in real world environments.",
      width: 526,
    },
    {
      step: "02",
      title: "Design Your Presence",
      description: "",
      width: 473,
    },
    { step: "03", title: "Go Live in Restaurants", description: "", width: 426 },
    { step: "04", title: "Track & Scale", description: "", width: 383 },
  ];

  return (
    <section
      style={{
        background: "#fff",
        borderTop: processBorder,
        borderBottom: processBorder,
      }}
    >
      {/* Heading */}
      <div style={{ padding: "80px 39px 64px", textAlign: "center" }}>
        <SectionHeading>The Process</SectionHeading>
        <SectionSubtitle>
          Simple steps to get started, whether you&#39;re a venue or an
          advertiser
        </SectionSubtitle>
      </div>

      {/* Two columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderTop: processBorder,
        }}
      >
        <div
          style={{
            borderRight: processBorder,
            padding: "64px 39px",
          }}
        >
          <ProcessColumn
            label="HOSPITALITY PARTNERS"
            heading={"Upgrade your guest experience\nat zero cost"}
            steps={hospitality}
            btnLabel="For Restaurants"
            btnStyle="outline"
          />
        </div>
        <div style={{ padding: "64px 39px" }}>
          <ProcessColumn
            label="ADVERTISERS"
            heading={"Put your brand directly into\ncustomer's hands"}
            steps={advertisers}
            btnLabel="Advertise With Pixtron"
            btnStyle="primary"
          />
        </div>
      </div>
    </section>
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
        <WhyDifferent />
        <TheProcess />
      </main>
      <FooterSection />
    </>
  );
}
