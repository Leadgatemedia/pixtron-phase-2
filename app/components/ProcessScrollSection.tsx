"use client";

import { useEffect, useRef, useState } from "react";
import ProcessShuffleColumn from "./ProcessShuffleColumn";

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  width: number;
};

type ProcessScrollSectionProps = {
  hospitality: ProcessStep[];
  advertisers: ProcessStep[];
  arrowDark: string;
  arrowWhite: string;
};

function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export default function ProcessScrollSection({
  hospitality,
  advertisers,
  arrowDark,
  arrowWhite,
}: ProcessScrollSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const border = "1px dashed rgba(0,0,0,0.2)";

  useEffect(() => {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const setHeight = () => {
      const stickyHeight = sticky.offsetHeight;
      outer.style.height = `${stickyHeight + window.innerHeight * 1.35}px`;
    };

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight;
      const maxScroll = Math.max(1, outer.offsetHeight - stickyHeight);
      const scrolled = -rect.top;
      const raw = Math.max(0, Math.min(1, scrolled / maxScroll));
      const animationStart = 0.14;
      const animationEnd = 0.92;
      const shifted = Math.max(0, raw - animationStart);
      const normalized = shifted / Math.max(0.0001, animationEnd - animationStart);
      setProgress(Math.max(0, Math.min(1, ease(normalized))));
    };

    setHeight();
    const ro = new ResizeObserver(() => {
      setHeight();
      update();
    });
    ro.observe(sticky);

    window.addEventListener("resize", setHeight);
    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div ref={outerRef} style={{ position: "relative", background: "#fff" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 1,
        }}
      >
        <section
          style={{
            background: "#fff",
            borderTop: border,
            borderBottom: border,
          }}
        >
          <div
            style={{
              minHeight: isMobile ? 140 : 270,
              padding: isMobile ? "24px 20px" : "40px 39px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div>
              <h2 className="section-heading gradient-heading">The Process</h2>
              <p className="section-subtitle" style={{ marginTop: 16 }}>
                Simple steps to get started, whether you&apos;re a venue or an advertiser
              </p>
            </div>
          </div>

          <div style={{ borderTop: border }}>
            <div
              style={{
                position: "relative",
                maxWidth: 1130,
                margin: "0 auto",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: 1,
                  borderLeft: border,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: 1,
                  borderRight: border,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              {!isMobile && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "50%",
                    width: 1,
                    transform: "translateX(-0.5px)",
                    borderLeft: border,
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                }}
              >
                <div
                  style={{
                    padding: isMobile ? "24px 20px" : "64px 0",
                    borderBottom: isMobile ? border : undefined,
                  }}
                >
                  <ProcessShuffleColumn
                    label="HOSPITALITY PARTNERS"
                    heading={"Upgrade your guest experience\nat zero cost"}
                    steps={hospitality}
                    btnLabel="Get Signature Series"
                    btnStyle="primary"
                    arrowDark={arrowDark}
                    arrowWhite={arrowWhite}
                    progress={progress}
                  />
                </div>
                <div style={{ padding: isMobile ? "24px 20px" : "64px 0" }}>
                  <ProcessShuffleColumn
                    label="ADVERTISERS"
                    heading={"Put your brand directly into\ncustomer's hands"}
                    steps={advertisers}
                    btnLabel="Get Custom Series"
                    btnStyle="outline"
                    arrowDark={arrowDark}
                    arrowWhite={arrowWhite}
                    progress={progress}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
