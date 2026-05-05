"use client";

import Link from "next/link";

const STATS = [
  {
    value: "100%",
    label: "Ready to Serve",
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

function ArrowIcon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/arrow-white.png" width={24} height={24} alt="" style={{ display: "block" }} />;
}

export default function MobileRealImpactSection() {
  const cardCount = STATS.length;

  return (
    <section
      className="mobile-real-impact"
      style={{
        "--real-impact-card-count": cardCount,
        "--real-impact-card-sticky-top": `${MOBILE_NAV_HEIGHT}px`,
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        padding: "56px 16px",
        background: "#fff",
        boxSizing: "border-box",
      } as React.CSSProperties}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%", textAlign: "center" }}>
        <h2 className="gradient-heading" style={{ margin: 0, width: "100%", fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>
          Real Impact, Real Results
        </h2>
        <p style={{ margin: 0, width: "100%", fontSize: 18, fontWeight: 500, lineHeight: 1.5, color: "rgba(0,0,0,0.8)" }}>
          Premium details that elevate guest satisfaction and dining perception
        </p>
      </div>

      <ul className="mobile-real-impact-card-stack">
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
              zIndex: index + 1,
            } as React.CSSProperties}
          >
            <article className="mobile-real-impact-stack-card-content">
              <div className="mobile-real-impact-stack-card-heading">
                <p className="mobile-real-impact-stack-card-value">
                  {stat.value}
                </p>
                <p className="mobile-real-impact-stack-card-label">
                  {stat.label}
                </p>
              </div>
              <p className="mobile-real-impact-stack-card-description">
                {stat.description}
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
          minHeight: 58,
          boxSizing: "border-box",
          justifyContent: "space-between",
          padding: "16px 20px 16px 22px",
          borderRadius: 6,
          fontSize: 18,
          lineHeight: "30px",
        }}
      >
        <span>Get Signature Series</span>
        <ArrowIcon />
      </Link>
    </section>
  );
}
