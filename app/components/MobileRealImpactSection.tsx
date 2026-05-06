"use client";

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

export default function MobileRealImpactSection() {
  const cardCount = STATS.length;

  return (
    <section
      className="mobile-real-impact"
      style={{
        "--real-impact-card-count": cardCount,
        "--real-impact-card-sticky-top": `${MOBILE_NAV_HEIGHT}px`,
        "--real-impact-card-height": "188px",
        "--real-impact-card-top-offset": "46px",
        "--real-impact-card-gap": "16px",
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
        padding: "48px 16px",
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

      <ul
        className="mobile-real-impact-card-stack"
        style={{
          gap: "var(--real-impact-card-gap)",
          gridTemplateRows:
            "repeat(var(--real-impact-card-count), minmax(var(--real-impact-card-height), auto))",
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
                gap: 24,
                minHeight: "var(--real-impact-card-height)",
                padding: "22px 20px",
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
                {stat.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
