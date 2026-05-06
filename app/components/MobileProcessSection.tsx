"use client";

import Link from "next/link";

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
  const file = color === "white" ? "/arrow-white.png" : "/arrow-black.png";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={file} width={24} height={24} alt="" style={{ display: "block" }} />;
}

function MobilePinnedProcessBlock({ column }: { column: ProcessColumn }) {
  const cardCount = column.steps.length;

  return (
    <section
      className="mobile-process-stacking-section"
      style={{
        "--process-card-count": cardCount,
        "--process-card-sticky-top": `${MOBILE_NAV_HEIGHT}px`,
        width: FULL_BLEED_WIDTH,
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        marginBottom: "24px",
        background: "#fff",
        borderTop: DIVIDER,
      } as React.CSSProperties}
    >
      <div
        className="mobile-process-stacking-inner"
        style={{
          width: "100%",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          padding: "48px 20px 36px",
          boxSizing: "border-box",
          zIndex: 1,
          WebkitTextSizeAdjust: "100%",
          textSizeAdjust: "100%",
        }}
      >
        <div style={{ width: "100%", maxWidth: 361, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}>
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
                "--process-card-target-scale": 1.1 - 0.1 * (cardCount - index),
                zIndex: index + 1,
              } as React.CSSProperties}
            >
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
            </li>
          ))}
        </ul>

        <Link
          href={column.ctaHref}
          className={column.ctaVariant === "primary" ? "btn-primary" : "btn-outline"}
          style={{
            width: "100%",
            maxWidth: 361,
            minHeight: 64,
            boxSizing: "border-box",
            justifyContent: "space-between",
            padding: "16px 20px 16px 22px",
            borderRadius: 6,
            fontSize: 18,
            lineHeight: "30px",
          }}
        >
          <span>{column.ctaLabel}</span>
          <ArrowIcon color={column.ctaVariant === "primary" ? "white" : "dark"} />
        </Link>
      </div>
    </section>
  );
}

export default function MobileProcessSection() {
  return (
    <section
      className="mobile-process"
      style={{
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 75,
        padding: "0 16px 32px",
        background: "#fff",
        boxSizing: "border-box",
        width: "100%",
        isolation: "isolate",
      }}
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 56 }}>
        <div
          style={{
            width: FULL_BLEED_WIDTH,
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            borderTop: DIVIDER,
          }}
        />

        <div style={{ width: "100%", maxWidth: 361, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}>
          <h2 className="gradient-heading" style={{ margin: 0, width: "100%", fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>
            The Process
          </h2>
          <p style={{ margin: 0, width: "100%", fontSize: 18, fontWeight: 500, lineHeight: 1.5, color: "rgba(0,0,0,0.8)" }}>
            Simple steps to get started, whether you&apos;re a venue or an advertiser
          </p>
        </div>
      </div>

      <MobilePinnedProcessBlock column={PROCESS_COLUMNS[0]} />
      <MobilePinnedProcessBlock column={PROCESS_COLUMNS[1]} />
    </section>
  );
}
