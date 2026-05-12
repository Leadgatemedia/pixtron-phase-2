"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function ArrowIcon({ color }: { color: "white" | "dark" }) {
  const file = color === "white" ? "/arrow-white.webp" : "/arrow-black.webp";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" className="btn-arrow-img" style={{ display: "block", transition: "filter 0.35s ease" }} />;
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
        padding: "40px 39px 56px",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "none",
          aspectRatio: "1362 / 656",
          minHeight: 460,
          maxHeight: 656,
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
            width: "min(898px, calc(100% - 64px))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
            <div style={{ width: "100%", fontSize: "clamp(42px, 3.2vw, 60px)", fontWeight: 700, lineHeight: 1.2, whiteSpace: "nowrap" }}>
              <span style={{ color: "#fff" }}>Elevate Every Guest Experience.<br /></span>
              <span style={{ background: "linear-gradient(90deg, #0D846E 0%, #40FB56 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Bring Premium to Every Table.</span>
            </div>

            <p
              style={{
                margin: 0,
                width: "100%",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: "32px",
                color: "#fff",
              }}
            >
              Every detail shapes how guests remember your space. With Pixtron Signature Series, you add a clean,
              refined touch to every table, without adding complexity to your service.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link
              href="/signature-series"
              className="btn-primary btn-hover-white"
              style={{
                width: 256,
                justifyContent: "space-between",
                boxSizing: "border-box",
                background: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#000",
              }}
            >
              <span>Get Signature Series</span>
              <ArrowIcon color="dark" />
            </Link>

            <Link
              href="/custom-series"
              className="btn-outline"
              style={{
                width: 256,
                justifyContent: "space-between",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#fff",
              }}
            >
              <span>Get Custom Series</span>
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
        padding: "24px 16px 24px",
        background: "#fff",
        boxSizing: "border-box",
        width: "100%",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(361px, 100%)",
          margin: "0 auto",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <GlowBackground />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            padding: "56px 16px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: "100%", maxWidth: 329, fontSize: 30, fontWeight: 700, lineHeight: "36px", textAlign: "center" }}>
              <span style={{ color: "#fff" }}>Elevate Every Guest Experience. </span>
              <span style={{ background: "linear-gradient(90deg, #0D846E 0%, #40FB56 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Bring Premium to Every Table.</span>
            </div>

            <p
              style={{
                margin: 0,
                width: "100%",
                maxWidth: 329,
                fontSize: 18,
                fontWeight: 500,
                lineHeight: "24px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              Every detail shapes how guests remember your space. With Pixtron Signature Series, you add a clean,
              refined touch to every table, without adding complexity to your service.
            </p>
          </div>

          <div style={{ width: "100%", maxWidth: 329, display: "flex", flexDirection: "column", gap: 16 }}>
            <Link
              href="/signature-series"
              className="btn-primary btn-hover-white"
              style={{
                width: "100%",
                justifyContent: "space-between",
                boxSizing: "border-box",
                background: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#000",
              }}
            >
              <span>Get Signature Series</span>
              <ArrowIcon color="dark" />
            </Link>

            <Link
              href="/custom-series"
              className="btn-outline"
              style={{
                width: "100%",
                justifyContent: "space-between",
                boxSizing: "border-box",
                background: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#fff",
              }}
            >
              <span>Get Custom Series</span>
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
