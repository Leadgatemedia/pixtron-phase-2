"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function ArrowIcon({ color }: { color: "white" | "dark" }) {
  const file = color === "white" ? "/arrow-white.png" : "/arrow-black.png";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" style={{ display: "block" }} />;
}

function GlowBackground() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#171717",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-4.85%",
          right: "28.05%",
          top: "-29.27%",
          bottom: "-29.42%",
          borderRadius: 9999,
          background: "rgba(13,132,110,0.3)",
          filter: "blur(200px)",
          mixBlendMode: "screen",
          opacity: 0.98,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "43.39%",
          right: "-4.85%",
          top: "-10.67%",
          bottom: "-16.16%",
          borderRadius: 9999,
          background: "rgba(64,251,86,0.2)",
          filter: "blur(200px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

function DesktopMidCta() {
  return (
    <section
      className="desktop-mid-cta"
      style={{
        padding: "0 39px 56px",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1362,
          height: 656,
          margin: "0 auto",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <GlowBackground />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 136,
            transform: "translateX(-50%)",
            width: 898,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 64,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
            <div style={{ width: "100%", fontSize: 72, fontWeight: 700, lineHeight: 1.2 }}>
              <p style={{ margin: 0 }}>Stop Renting Attention.</p>
              <p
                style={{
                  margin: 0,
                  background: "linear-gradient(90deg, #0d846e 0%, #40fb56 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Own The Moment.
              </p>
            </div>

            <p
              style={{
                margin: 0,
                width: "100%",
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.4,
                color: "#fff",
              }}
            >
              Every day, thousands of diners across Los Angeles sit down, eat, and reach for a wet wipe.
              That moment belongs to someone&apos;s brand. If you&apos;re a local business, put yours on it.
              If you&apos;re a restaurant, bring a premium touch to every table.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link
              href="/contact?type=advertiser"
              style={{
                width: 282,
                minHeight: 64,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
                padding: "16px 20px 16px 22px",
                borderRadius: 6,
                background: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#000",
                textDecoration: "none",
                fontSize: 18,
                fontWeight: 600,
                lineHeight: "30px",
                whiteSpace: "nowrap",
              }}
            >
              <span>Advertise With Pixtron</span>
              <ArrowIcon color="dark" />
            </Link>

            <Link
              href="/contact"
              style={{
                width: 282,
                minHeight: 64,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
                padding: "16px 20px 16px 22px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#fff",
                textDecoration: "none",
                fontSize: 18,
                fontWeight: 600,
                lineHeight: "30px",
                whiteSpace: "nowrap",
              }}
            >
              <span>Contact Us</span>
              <ArrowIcon color="white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileMidCta() {
  return (
    <section
      className="mobile-mid-cta"
      style={{
        padding: "0 16px 24px",
        background: "#fff",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(361px, calc(100vw / 0.8 - 32px))",
          maxWidth: "100%",
          height: 600,
          margin: "0 auto",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <GlowBackground />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: 361,
            padding: "0 16px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 48,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <div style={{ width: "100%", maxWidth: 329, fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>
              <p style={{ margin: 0 }}>Stop Renting Attention.</p>
              <p
                style={{
                  margin: 0,
                  background: "linear-gradient(90deg, #0d846e 0%, #40fb56 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Own The Moment.
              </p>
            </div>

            <p
              style={{
                margin: 0,
                width: "100%",
                maxWidth: 329,
                fontSize: 18,
                fontWeight: 500,
                lineHeight: 1.4,
                color: "#fff",
              }}
            >
              Every day, thousands of diners across Los Angeles sit down, eat, and reach for a wet wipe.
              That moment belongs to someone&apos;s brand. If you&apos;re a local business, put yours on it.
              If you&apos;re a restaurant, bring a premium touch to every table.
            </p>
          </div>

          <div style={{ width: "100%", maxWidth: 329, display: "flex", flexDirection: "column", gap: 24 }}>
            <Link
              href="/contact?type=advertiser"
              style={{
                width: "100%",
                minHeight: 64,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
                padding: "16px 20px 16px 22px",
                borderRadius: 6,
                background: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#000",
                textDecoration: "none",
                fontSize: 18,
                fontWeight: 600,
                lineHeight: "30px",
                whiteSpace: "nowrap",
              }}
            >
              <span>Advertise With Pixtron</span>
              <ArrowIcon color="dark" />
            </Link>

            <Link
              href="/contact"
              style={{
                width: "100%",
                minHeight: 64,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
                padding: "16px 20px 16px 22px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#fff",
                textDecoration: "none",
                fontSize: 18,
                fontWeight: 600,
                lineHeight: "30px",
                whiteSpace: "nowrap",
              }}
            >
              <span>Contact Us</span>
              <ArrowIcon color="white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeMidCtaSection() {
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px), ((max-width: 1024px) and (hover: none) and (pointer: coarse))");

    const updateViewportMode = () => {
      setIsMobileView(mediaQuery.matches);
    };

    updateViewportMode();
    mediaQuery.addEventListener("change", updateViewportMode);

    return () => {
      mediaQuery.removeEventListener("change", updateViewportMode);
    };
  }, []);

  if (isMobileView === null) {
    return null;
  }

  return (
    <>
      {isMobileView ? <MobileMidCta /> : <DesktopMidCta />}
    </>
  );
}
