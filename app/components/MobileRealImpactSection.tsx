"use client";

import Link from "next/link";

const STATS = [
  {
    value: "100%",
    label: "Ready to Serve",
    desktopDescription: (
      <>
        No setup, No preparation <strong>simply place &amp; serve</strong>
      </>
    ),
    description: (
      <>
        No setup, No preparation
        <br />
        <strong>simply place &amp; serve</strong>
      </>
    ),
  },
  {
    value: "0",
    label: "Extra Staff Effort",
    desktopDescription: (
      <>
        <strong>Fits seamlessly</strong> into your existing service flow
      </>
    ),
    description: (
      <>
        <strong>Fits seamlessly</strong>
        <br />
        into your existing service flow
      </>
    ),
  },
  {
    value: "Consistent",
    label: "Every Time",
    desktopDescription: (
      <>
        <strong>Uniform quality and experience</strong> for every guest
      </>
    ),
    description: (
      <>
        <strong>Uniform quality and experience </strong>
        for every guest
      </>
    ),
  },
  {
    value: "Premium",
    label: "by Design",
    desktopDescription: (
      <>
        Crafted to match modern <strong>hospitality standards</strong>
      </>
    ),
    description: (
      <>
        Crafted to match modern
        <br />
        <strong>hospitality standards</strong>
      </>
    ),
  },
];

const MOBILE_NAV_HEIGHT = 96;

type MobileRealImpactSectionProps = {
  desktopMode?: boolean;
};

function ArrowIcon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/arrow-white.webp" width={24} height={24} alt="" style={{ display: "block" }} />;
}

export default function MobileRealImpactSection({ desktopMode = false }: MobileRealImpactSectionProps) {
  const cardCount = STATS.length;

  return (
    <section
      className={desktopMode ? "mobile-real-impact mobile-real-impact-desktop-fit" : "mobile-real-impact"}
      style={{
        "--real-impact-card-count": cardCount,
        "--real-impact-card-sticky-top": desktopMode ? "300px" : `${MOBILE_NAV_HEIGHT}px`,
        "--real-impact-card-height": desktopMode ? "164px" : "188px",
        "--real-impact-card-top-offset": desktopMode ? "42px" : "46px",
        "--real-impact-card-gap": "16px",
        display: desktopMode ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        gap: desktopMode ? 36 : 28,
        padding: desktopMode ? "0 39px 112px" : "48px 16px",
        background: "#fff",
        boxSizing: "border-box",
      } as React.CSSProperties}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: desktopMode ? "center" : undefined,
          gap: desktopMode ? 16 : 24,
          width: "100%",
          maxWidth: desktopMode ? 898 : undefined,
          minHeight: desktopMode ? 210 : undefined,
          padding: desktopMode ? "42px 39px 46px" : undefined,
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <h2 className="gradient-heading" style={{ margin: 0, width: "100%", fontSize: desktopMode ? 60 : 30, fontWeight: 700, lineHeight: 1.2 }}>
          Real Impact, Real Results
        </h2>
        <p style={{ margin: 0, width: "100%", fontSize: desktopMode ? 22 : 18, fontWeight: 500, lineHeight: desktopMode ? 1.4 : 1.5, color: desktopMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.8)" }}>
          Premium details that elevate guest satisfaction and dining perception
        </p>
      </div>

      <ul
        className="mobile-real-impact-card-stack"
        style={{
          gap: "var(--real-impact-card-gap)",
          gridTemplateRows:
            "repeat(var(--real-impact-card-count), minmax(var(--real-impact-card-height), auto))",
          marginBottom: 0,
          paddingBottom: desktopMode ? 56 : 20,
          maxWidth: desktopMode ? 1120 : undefined,
        }}
      >
        {STATS.map((stat, index) => (
          <li
            key={stat.label}
            className="mobile-real-impact-stack-card"
            style={{
              "--real-impact-card-index": index + 1,
              "--real-impact-card-index0": index,
              "--real-impact-card-start-range": `${(index / cardCount) * 80}%`,
              "--real-impact-card-end-range": `${((index + 1) / cardCount) * 100}%`,
              "--real-impact-card-target-scale": 1.1 - 0.1 * (cardCount - index),
              top: `calc(var(--real-impact-card-sticky-top) + (${index} * var(--real-impact-card-top-offset)))`,
              paddingTop: 0,
              zIndex: index + 1,
            } as React.CSSProperties}
          >
            <article
              className="mobile-real-impact-stack-card-content"
              style={{
                gap: desktopMode ? 32 : 24,
                minHeight: "var(--real-impact-card-height)",
                padding: desktopMode ? "28px 32px" : "22px 20px",
              }}
            >
              <div className="mobile-real-impact-stack-card-heading">
                <p className="mobile-real-impact-stack-card-value">
                  {stat.value}
                </p>
                <p className="mobile-real-impact-stack-card-label">
                  {stat.label}
                </p>
              </div>
              <p className="mobile-real-impact-stack-card-description">
                {desktopMode ? stat.desktopDescription : stat.description}
              </p>
            </article>
          </li>
        ))}
      </ul>

      <Link
        href="/signature-series"
        className="btn-primary mobile-real-impact-cta"
        style={{
          width: "100%",
          maxWidth: 361,
          boxSizing: "border-box",
          justifyContent: "space-between",
          marginTop: desktopMode ? -44 : 0,
        }}
      >
        <span>Get Signature Series</span>
        <ArrowIcon />
      </Link>
    </section>
  );
}
