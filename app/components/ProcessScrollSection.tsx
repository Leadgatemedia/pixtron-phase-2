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
          <div style={{ padding: "80px 39px 64px", textAlign: "center" }}>
            <h2 className="section-heading gradient-heading">The Process</h2>
            <p className="section-subtitle" style={{ marginTop: 16 }}>
              Simple steps to get started, whether you&apos;re a venue or an advertiser
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderTop: border,
            }}
          >
            <div
              style={{
                borderRight: border,
                padding: "64px 39px",
              }}
            >
              <ProcessShuffleColumn
                label="HOSPITALITY PARTNERS"
                heading={"Upgrade your guest experience\nat zero cost"}
                steps={hospitality}
                btnLabel="For Restaurants"
                btnStyle="outline"
                arrowDark={arrowDark}
                arrowWhite={arrowWhite}
                progress={progress}
              />
            </div>
            <div style={{ padding: "64px 39px" }}>
              <ProcessShuffleColumn
                label="ADVERTISERS"
                heading={"Put your brand directly into\ncustomer's hands"}
                steps={advertisers}
                btnLabel="Advertise With Pixtron"
                btnStyle="primary"
                arrowDark={arrowDark}
                arrowWhite={arrowWhite}
                progress={progress}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
