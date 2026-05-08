import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import HeroIntro from "./components/HeroIntro";
import HeroScrollSection from "./components/HeroScrollSection";
import HowItWorksScroll from "./components/HowItWorksScroll";
import RealImpactScroll from "./components/RealImpactScroll";
import WherePixtronWorksScroll from "./components/WherePixtronWorksScroll";
import FooterSection from "./components/FooterSection";
import ProcessScrollSection from "./components/ProcessScrollSection";
import MobileHeader from "./components/MobileHeader";
import MobileHomeHero from "./components/MobileHomeHero";
import MobileHowItWorksSection from "./components/MobileHowItWorksSection";
import MobileRealImpactSection from "./components/MobileRealImpactSection";
import MobileWherePixtronWorksSection from "./components/MobileWherePixtronWorksSection";
import MobileProcessSection from "./components/MobileProcessSection";
import HomeMidCtaSection from "./components/HomeMidCtaSection";

export const metadata: Metadata = createPageMetadata({
  title: "Branding That People Touch, See and Smell",
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
// Navbar logo + arrow assets (from Figma node 7102:107891)
const NAV_LOGO_MASK = "https://www.figma.com/api/mcp/asset/d15125d9-8287-40ee-a5bc-1cf8fb64c799";
const NAV_LOGO_IMG  = "https://www.figma.com/api/mcp/asset/6e0dc938-89d2-48b7-8b9e-6dc6a3bf1312";
const NAV_ARROW     = "https://www.figma.com/api/mcp/asset/5322ed99-2a8c-452f-8c53-28967405df87";

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
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        backdropFilter: "blur(35px)",
        WebkitBackdropFilter: "blur(35px)",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        padding: "0 39px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1820,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "480px 1fr 480px",
          alignItems: "center",
          columnGap: 16,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center" }}>
            <Image
              src="/logo.png"
              alt="Pixtron"
              width={86}
              height={64}
              priority
              style={{ width: "auto", height: 64 }}
            />
          </Link>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", fontSize: 18, fontWeight: 400 }}>
            {([
              { label: "About", href: "/about" },
              { label: "Restaurants", href: "/restaurants" },
              { label: "Signature Series", href: "/signature-series" },
              { label: "Custom Series", href: "/custom-series" },
            ] as const).map(({ label, href }) => (
              <Link key={label} href={href} className="nav-link">{label}</Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <Link
            href="/contact"
            className="btn-outline"
            style={{ minHeight: 56, padding: "0 20px 0 22px", justifyContent: "center" }}
          >
            <span>Contact Us</span>
            <ArrowIcon src={NAV_ARROW} />
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
          Branding that people{" "}
          <span style={{ color: "#0f9d58" }}>touch, see and smell</span>
        </h1>

        {/* Buttons */}
        <div
          className="intro-reveal-up"
          style={{ display: "inline-flex", gap: 24, alignItems: "center", marginBottom: 48 }}
        >
          {/* Get Signature Series — filled black */}
          <Link href="/signature-series" className="btn-primary" style={{ width: 256, flexShrink: 0 }}>
            <span>Get Signature Series</span>
            <ArrowIcon src={ARROW_WHITE} />
          </Link>

          {/* Get Custom Series — outlined */}
          <Link href="/custom-series" className="btn-outline" style={{ width: 256, flexShrink: 0 }}>
            <span>Get Custom Series</span>
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
function TheProcess() {
  const hospitality = [
    {
      step: "01",
      title: "Fill the Form",
      description:
        "Fill out our quick form and tell us about your restaurant, location, and table setup.",
      width: 526,
    },
    {
      step: "02",
      title: "Share Your Details",
      description:
        "Tell us your table count, location, and wipe preferences so we can set everything up perfectly.",
      width: 473,
    },
    {
      step: "03",
      title: "Sit Back, We Deliver",
      description:
        "Pixtron delivers high-quality branded wet wipes directly to your restaurant on a regular schedule.",
      width: 426,
    },
    {
      step: "04",
      title: "Delight Every Guest",
      description:
        "Your customers enjoy a clean, premium dining experience that elevates your restaurant's overall impression.",
      width: 383,
    },
  ];

  const advertisers = [
    {
      step: "01",
      title: "Fill the Form",
      description:
        "Fill out our quick form, share your brand goals, and tell us which audience you want to reach.",
      width: 526,
    },
    {
      step: "02",
      title: "Design Your Ad",
      description:
        "Work with our team to craft a bold, eye-catching ad placed directly on the wipe.",
      width: 473,
    },
    {
      step: "03",
      title: "We Handle Everything",
      description:
        "We print, package, and distribute your ads to every partnered restaurant on your list.",
      width: 426,
    },
    {
      step: "04",
      title: "Go Live & Get Seen",
      description:
        "Your brand lands in diners' hands at the table — personal, tactile, and impossible to ignore.",
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
      <div className="desktop-nav-only">
        <Navbar />
      </div>
      <div className="mobile-nav-only">
        <MobileHeader />
      </div>
      <main>
        <MobileHomeHero />
        <div className="desktop-home-hero">
          <HeroScrollSection>
            <Hero />
          </HeroScrollSection>
        </div>
        <div className="desktop-how-it-works">
          <HowItWorksScroll />
        </div>
        <MobileHowItWorksSection />
        <div className="desktop-real-impact">
          <RealImpactScroll />
        </div>
        <MobileRealImpactSection />
        <div className="desktop-real-impact desktop-where-pixtron">
          <WherePixtronWorksScroll />
        </div>
        <MobileWherePixtronWorksSection />
        <div className="desktop-process">
          <TheProcess />
        </div>
        <MobileProcessSection />
        <HomeMidCtaSection />
      </main>
      <FooterSection />
    </>
  );
}
