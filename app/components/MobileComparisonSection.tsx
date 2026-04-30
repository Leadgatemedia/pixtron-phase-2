import Link from "next/link";

const progressRows = [
  { label: "Pixtron (Physical + Digital)", value: "$0.45", right: "70%" },
  { label: "Social Media Ads (Avg)", value: "$1.20", right: "30%" },
  { label: "Search Ads (Avg)", value: "$2.50+", right: "5%" },
];

const chartBars = [
  { label: "1.7s", name: "Digital Banner", height: 9 },
  { label: "2.5s", name: "Social Ad", height: 13 },
  { label: "7.0s", name: "Video Pre-roll", height: 51 },
  { label: "35s", name: "Pixtron Sachet", height: 215 },
];

function ArrowIcon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/arrow-black.png" width={24} height={24} alt="" style={{ display: "block" }} />;
}

function GlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: "100%",
        padding: 24,
        borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function MobileComparisonSection() {
  return (
    <section
      className="mobile-comparison"
      style={{
        display: "none",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        gap: 56,
        width: "100%",
        padding: "80px 16px",
        overflow: "hidden",
        background: "#080808",
        boxSizing: "border-box",
        WebkitTextSizeAdjust: "100%",
        textSizeAdjust: "100%",
      }}
    >
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

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 361,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ margin: 0, width: "100%", fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>
          Pixtron vs. Digital Advertising
        </h2>
        <p style={{ margin: 0, width: "100%", fontSize: 18, fontWeight: 500, lineHeight: 1.5 }}>
          Why this marketing is better for real estate?
        </p>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 361,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <GlassCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/comparison/chart-icon.svg" width={20} height={20} alt="" />
            <span style={{ color: "#fff", fontSize: 18, fontWeight: 600, lineHeight: "28px" }}>
              Engagement Duration
            </span>
          </div>

          <div style={{ position: "relative", height: 262 }}>
            {[6, 66, 126, 186, 241].map((top) => (
              <div
                key={top}
                style={{
                  position: "absolute",
                  left: 24,
                  right: 8,
                  top,
                  height: 1,
                  background: "rgba(255,255,255,0.1)",
                }}
              />
            ))}

            {[40, 30, 20, 10, 0].map((label, i) => (
              <span
                key={label}
                style={{
                  position: "absolute",
                  left: 0,
                  top: [0, 60, 120, 180, 235][i],
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
            ))}

            <div
              style={{
                position: "absolute",
                left: 24,
                right: 8,
                top: 0,
                bottom: 15,
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 6,
                alignItems: "end",
              }}
            >
              {chartBars.map((bar) => (
                <div
                  key={bar.name}
                  style={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "stretch",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: bar.height + 9,
                      transform: "translateX(-50%)",
                      color: "#fff",
                      fontSize: 18,
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {bar.label}
                  </span>

                  <div
                    style={{
                      width: "100%",
                      height: bar.height,
                      background: "#0F9D58",
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: -14,
                      transform: "translateX(-50%)",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 9,
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    {bar.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard
          style={{
            height: 152,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
            padding: 25,
          }}
        >
          <span style={{ color: "#fff", fontSize: 18, fontWeight: 600, lineHeight: "28px" }}>Scan Rate</span>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <span style={{ color: "#fff", fontSize: 40, fontWeight: 700, lineHeight: "48px" }}>12%</span>
            <span style={{ color: "#0F9D58", fontSize: 18, lineHeight: "20px" }}>&uarr; vs 0.1% CTR</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: "16px" }}>
            Compared to digital display ads
          </span>
        </GlassCard>

        <GlassCard
          style={{
            height: 152,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
            padding: 25,
          }}
        >
          <span style={{ color: "#fff", fontSize: 18, fontWeight: 600, lineHeight: "28px" }}>Recall Rate</span>
          <span style={{ color: "#fff", fontSize: 40, fontWeight: 700, lineHeight: "48px" }}>78%</span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: "16px" }}>
            Brand recall after 24 hours
          </span>
        </GlassCard>

        <GlassCard style={{ padding: 25 }}>
          <h3 style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 600, lineHeight: "28px" }}>
            Cost Per Meaningful Interaction
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 32 }}>
            {progressRows.map((row) => (
              <div key={row.label} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#fff",
                    fontSize: 16,
                    lineHeight: "20px",
                    gap: 8,
                  }}
                >
                  <span>{row.label}</span>
                  <strong style={{ fontWeight: 600, flexShrink: 0 }}>{row.value}</strong>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 8,
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: row.right,
                      top: 0,
                      height: 8,
                      borderRadius: 9999,
                      background: "#0F9D58",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <Link
          href="/custom-series"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "16px 20px 16px 22px",
            borderRadius: 6,
            border: "2px solid rgba(255,255,255,0.5)",
            background: "#fff",
            color: "#000",
            textDecoration: "none",
            boxSizing: "border-box",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: "30px",
          }}
        >
          <span>Get Custom Series</span>
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
