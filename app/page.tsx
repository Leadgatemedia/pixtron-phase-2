import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
// Above-fold: loaded eagerly
import HeroIntro from "./components/HeroIntro";
import HeroScrollSection from "./components/HeroScrollSection";
import MobileHomeHero from "./components/MobileHomeHero";
import ProductPageHeader from "./components/ProductPageHeader";
// Below-fold: code-split so the initial bundle stays small
const HowItWorksScroll           = dynamic(() => import("./components/HowItWorksScroll"));
const WherePixtronWorksScroll     = dynamic(() => import("./components/WherePixtronWorksScroll"));
const MobileHowItWorksSection     = dynamic(() => import("./components/MobileHowItWorksSection"));
const RealImpactScroll            = dynamic(() => import("./components/RealImpactScroll"));
const MobileRealImpactSection     = dynamic(() => import("./components/MobileRealImpactSection"));
const MobileWherePixtronWorksSection = dynamic(() => import("./components/MobileWherePixtronWorksSection"));
const MobileProcessSection        = dynamic(() => import("./components/MobileProcessSection"));
const HomeMidCtaSection           = dynamic(() => import("./components/HomeMidCtaSection"));
const FooterSection               = dynamic(() => import("./components/FooterSection"));

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
const HOME_HERO_WATERMARK_TOP = "min(89vh, 769px)";
const HOME_HERO_SACHET_TOP = `calc(${HOME_HERO_WATERMARK_TOP} - 24px)`;

function ArrowIcon({ src }: { src: string }) {
  const file = src === "white" ? "/arrow-white.webp" : "/arrow-black.webp";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" className="btn-arrow-img" style={{ display: "block", transition: "filter 0.35s ease" }} />;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Hero() {
  const heroBandTop = HOME_HERO_WATERMARK_TOP;
  const headlineToButtonsGap = 40;
  const buttonsToBodyGap = 42;

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
          position: "absolute",
          top: 88,
          left: 0,
          right: 0,
          height: `calc(${heroBandTop} - 88px)`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
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
            margin: 0,
          }}
        >
          Branding that people{" "}
          <span style={{ color: "#0f9d58" }}>touch, see and smell</span>
        </h1>

        {/* Buttons */}
        <div
          className="intro-reveal-up"
          style={{
            marginTop: headlineToButtonsGap,
            display: "inline-flex",
            gap: 24,
            alignItems: "center",
          }}
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
            margin: `${buttonsToBodyGap}px 0 0`,
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
          top: heroBandTop,      // align with the sachet row's visual band
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
              lineHeight: "min(11.31vh, 98px)",
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
      <ProductPageHeader />
      <main>
        <MobileHomeHero />
        <div className="desktop-home-hero" data-scroll-assist-section>
          <HeroScrollSection
            stageWidth={1920}
            stageHeight={864}
            sachetScale={0.84}
            sachetTop={HOME_HERO_SACHET_TOP}
          >
            <Hero />
          </HeroScrollSection>
        </div>
        <div className="desktop-how-it-works" data-scroll-assist-section>
          <HowItWorksScroll />
        </div>
        <MobileHowItWorksSection />
        <div className="desktop-real-impact" data-scroll-assist-section>
          <RealImpactScroll />
        </div>
        <MobileRealImpactSection />
        <div className="desktop-real-impact desktop-where-pixtron" data-scroll-assist-section data-scroll-assist-skip-next="true">
          <WherePixtronWorksScroll />
        </div>
        <MobileWherePixtronWorksSection />
        <div className="desktop-process" data-scroll-assist-section data-scroll-assist-skip-prev="true" data-scroll-assist-skip-next="true">
          <MobileProcessSection desktopMode />
        </div>
        <MobileProcessSection />
        <div data-scroll-assist-section>
          <HomeMidCtaSection />
        </div>
      </main>
      <div data-scroll-assist-section>
        <FooterSection />
      </div>
    </>
  );
}
