"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

type ProcessColumn = {
  label: string;
  headingTop: string;
  headingBottom: string;
  steps: ProcessStep[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "primary" | "outline";
};

const FULL_BLEED_WIDTH = "100vw";
const DIVIDER = "1px dashed rgba(0,0,0,0.2)";

const MOBILE_NAV_HEIGHT = 96;

type MobileProcessSectionProps = {
  desktopMode?: boolean;
};

const PROCESS_COLUMNS: ProcessColumn[] = [
  {
    label: "HOSPITALITY PARTNERS",
    headingTop: "Upgrade your guest experience",
    headingBottom: "at zero cost",
    ctaLabel: "Get Signature Series",
    ctaHref: "/signature-series",
    ctaVariant: "primary",
    steps: [
      {
        step: "01",
        title: "Fill the Form",
        description:
          "Fill out our quick form and tell us about your restaurant, location, and table setup.",
      },
      {
        step: "02",
        title: "Share Your Details",
        description:
          "Tell us your table count, location, and wipe preferences so we can set everything up perfectly.",
      },
      {
        step: "03",
        title: "Sit Back, We Deliver",
        description:
          "Pixtron delivers high-quality branded wet wipes directly to your restaurant on a regular schedule.",
      },
      {
        step: "04",
        title: "Delight Every Guest",
        description:
          "Your customers enjoy a clean, premium dining experience that elevates your restaurant's overall impression.",
      },
    ],
  },
  {
    label: "ADVERTISERS",
    headingTop: "Put your brand directly into",
    headingBottom: "customer's hands",
    ctaLabel: "Get Custom Series",
    ctaHref: "/custom-series",
    ctaVariant: "outline",
    steps: [
      {
        step: "01",
        title: "Fill the Form",
        description:
          "Fill out our quick form, share your brand goals, and tell us which audience you want to reach.",
      },
      {
        step: "02",
        title: "Design Your Ad",
        description:
          "Work with our team to craft a bold, eye-catching ad placed directly on the wipe.",
      },
      {
        step: "03",
        title: "We Handle Everything",
        description:
          "We print, package, and distribute your ads to every partnered restaurant on your list.",
      },
      {
        step: "04",
        title: "Go Live & Get Seen",
        description:
          "Your brand lands in diners' hands at the table - personal, tactile, and impossible to ignore.",
      },
    ],
  },
];

function ArrowIcon({ color }: { color: "white" | "dark" }) {
  const file = color === "white" ? "/arrow-white.webp" : "/arrow-black.webp";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" style={{ display: "block" }} />;
}

function MobilePinnedProcessBlock({
  column,
  marginTopOffset = 0,
  desktopMode = false,
}: {
  column: ProcessColumn;
  marginTopOffset?: number;
  desktopMode?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardCount = column.steps.length;
  const scaleStep = desktopMode ? 0.13 : 0.1;
  const desktopTargetScales = [0.7, 0.8, 0.9, 1];

  useEffect(() => {
    if (!desktopMode) return;

    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let scheduled = false;

    const updateCompactProgress = () => {
      scheduled = false;
      const rect = section.getBoundingClientRect();
      const releaseStart = window.innerHeight * 0.42;
      const releaseEnd = window.innerHeight * 0.16;
      const releaseSpan = Math.max(1, releaseStart - releaseEnd);
      const restoreProgress = Math.max(
        0,
        Math.min(1, (releaseStart - rect.top) / releaseSpan)
      );
      section.style.setProperty(
        "--process-card-compact-progress",
        String(1 - restoreProgress)
      );
    };

    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(updateCompactProgress);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateCompactProgress();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [desktopMode]);

  return (
    <section
      ref={sectionRef}
      className={desktopMode ? "mobile-process-stacking-section mobile-process-stacking-section-desktop" : "mobile-process-stacking-section"}
      style={{
        "--process-card-count": cardCount,
        "--process-card-sticky-top": desktopMode ? "var(--process-desktop-card-sticky-top)" : `${MOBILE_NAV_HEIGHT}px`,
        "--process-card-compact-progress": desktopMode ? 0 : undefined,
        "--process-card-height": desktopMode ? "236px" : undefined,
        width: desktopMode ? "100%" : FULL_BLEED_WIDTH,
        marginLeft: desktopMode ? 0 : "calc(50% - 50vw)",
        marginRight: desktopMode ? 0 : "calc(50% - 50vw)",
        marginBottom: desktopMode ? 0 : "24px",
        marginTop: marginTopOffset,
        background: "#fff",
        borderTop: desktopMode ? "none" : DIVIDER,
        minWidth: 0,
      } as React.CSSProperties}
    >
      <div
        className="mobile-process-stacking-inner"
        style={{
          width: "100%",
          height: desktopMode ? "100%" : undefined,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: desktopMode ? "clamp(18px, 2.2vh, 30px)" : 28,
          padding: desktopMode ? "clamp(20px, 3.2vh, 46px) 36px 56px" : "48px 20px 36px",
          boxSizing: "border-box",
          zIndex: 1,
          WebkitTextSizeAdjust: "100%",
          textSizeAdjust: "100%",
        }}
      >
        <div
          className={desktopMode ? "mobile-process-column-heading" : undefined}
          style={{ width: "100%", maxWidth: 361, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}
        >
          <p style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.4, color: "#0f9d58" }}>{column.label}</p>
          <div style={{ width: "100%", color: "#000", fontSize: 24, lineHeight: 1.3 }}>
            <p style={{ margin: 0, fontWeight: 400 }}>{column.headingTop}</p>
            <p style={{ margin: 0, fontWeight: 600 }}>{column.headingBottom}</p>
          </div>
        </div>

        <ul className="mobile-process-card-stack">
          {column.steps.map((step, index) => (
            <li
              key={step.step}
              className="mobile-process-stack-card"
              style={{
                "--process-card-index": index + 1,
                "--process-card-index0": index,
                "--process-card-start-range": `${(index / cardCount) * 80}%`,
                "--process-card-end-range": `${((index + 1) / cardCount) * 100}%`,
                "--process-card-target-scale": desktopMode
                  ? desktopTargetScales[index] ?? 1
                  : 1 - scaleStep * (cardCount - index - 1),
                zIndex: index + 1,
              } as React.CSSProperties}
            >
              <div className="mobile-process-stack-card-visual">
                <article className="mobile-process-stack-card-content">
                  <div className="mobile-process-stack-card-title-row">
                    <p className="mobile-process-stack-card-title">
                      {step.title}
                    </p>
                    <p className="mobile-process-stack-card-step">
                      {step.step}
                    </p>
                  </div>

                  <p className="mobile-process-stack-card-description">
                    {step.description}
                  </p>
                </article>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href={column.ctaHref}
          className={column.ctaVariant === "primary" ? "btn-primary" : "btn-outline"}
          style={{
            width: "100%",
            maxWidth: desktopMode ? 300 : 361,
            minHeight: 64,
            boxSizing: "border-box",
            justifyContent: "space-between",
            padding: "16px 20px 16px 22px",
            borderRadius: 6,
            fontSize: 18,
            lineHeight: "30px",
            marginTop: desktopMode ? 16 : -68,
          }}
        >
          <span>{column.ctaLabel}</span>
          <ArrowIcon color={column.ctaVariant === "primary" ? "white" : "dark"} />
        </Link>
      </div>
    </section>
  );
}

export default function MobileProcessSection({ desktopMode = false }: MobileProcessSectionProps) {
  const [largeDesktopStage, setLargeDesktopStage] = useState(false);

  useEffect(() => {
    if (!desktopMode) return;

    const updateStage = () => {
      const dpr = window.devicePixelRatio || 1;
      setLargeDesktopStage(
        dpr <= 1.05 && window.innerWidth >= 1800 && window.innerHeight >= 900
      );
    };

    updateStage();
    window.addEventListener("resize", updateStage);
    return () => window.removeEventListener("resize", updateStage);
  }, [desktopMode]);

  return (
    <section
      className={[
        "mobile-process",
        desktopMode ? "mobile-process-desktop-fit" : "",
        largeDesktopStage ? "mobile-process-large-desktop-stage" : "",
      ].filter(Boolean).join(" ")}
      style={{
        display: desktopMode ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        gap: desktopMode ? 0 : 75,
        padding: desktopMode ? "0" : "0 16px 32px",
        background: "#fff",
        boxSizing: "border-box",
        width: "100%",
        isolation: "isolate",
      }}
    >
      <div
        className={desktopMode ? "mobile-process-intro-heading" : undefined}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: desktopMode ? 0 : 56,
          borderTop: desktopMode ? DIVIDER : undefined,
          borderBottom: desktopMode ? DIVIDER : undefined,
        }}
      >
        <div
          style={{
            width: FULL_BLEED_WIDTH,
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            borderTop: DIVIDER,
            display: desktopMode ? "none" : "block",
          }}
        />

        <div
          style={{
            width: "100%",
            maxWidth: desktopMode ? 898 : 361,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: desktopMode ? 16 : 24,
            padding: desktopMode ? 0 : 0,
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <h2 className="gradient-heading" style={{ margin: 0, width: "100%", fontSize: desktopMode ? 60 : 30, fontWeight: 700, lineHeight: 1.2 }}>
            The Process
          </h2>
          <p style={{ margin: 0, width: "100%", fontSize: desktopMode ? 22 : 18, fontWeight: 500, lineHeight: desktopMode ? 1.4 : 1.5, color: desktopMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.8)" }}>
            Simple steps to get started, whether you&apos;re a venue or an advertiser
          </p>
        </div>
      </div>

      {desktopMode ? (
        <div className="mobile-process-desktop-columns">
          <MobilePinnedProcessBlock column={PROCESS_COLUMNS[0]} desktopMode />
          <MobilePinnedProcessBlock column={PROCESS_COLUMNS[1]} desktopMode />
        </div>
      ) : (
        <>
          <MobilePinnedProcessBlock column={PROCESS_COLUMNS[0]} />
          <MobilePinnedProcessBlock column={PROCESS_COLUMNS[1]} marginTopOffset={-50} />
        </>
      )}
    </section>
  );
}
