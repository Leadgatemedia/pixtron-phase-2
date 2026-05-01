"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./ProductPage.module.css";

type JourneyStep = { step: string; title: string; body: string };
type ButtonConfig = { label: string; href: string; variant?: "primary" | "outline" };

type Props = {
  title: string;
  body?: string;
  steps: JourneyStep[];
  button?: ButtonConfig;
};

// Heights from ProductPage.module.css grid layout
const STEP_H_DESKTOP = 382;
const STEP_H_MOBILE = 216;
const TRACK_TAIL_DESKTOP = 160;
const TRACK_TAIL_MOBILE = 64;
const MOBILE_BREAKPOINT = 767;

function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export default function JourneyScrollSection({ title, body, steps, button }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const strongRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      const stepH = mobile ? STEP_H_MOBILE : STEP_H_DESKTOP;
      const totalTrack = steps.length * stepH - (mobile ? TRACK_TAIL_MOBILE : TRACK_TAIL_DESKTOP);

      // 0 when section top enters viewport bottom, 1 when section bottom exits viewport top
      const totalTravel = rect.height + vh;
      const scrolled = vh - rect.top;
      const raw = Math.max(0, Math.min(1, scrolled / totalTravel));

      // Start animating early as section enters, finish before it fully exits
      const animStart = 0.04;
      const animEnd = 0.82;
      const progress = ease(Math.max(0, Math.min(1, (raw - animStart) / (animEnd - animStart))));

      const progressHeight = progress * totalTrack;
      timeline.style.setProperty("--progress-height", `${progressHeight}px`);

      strongRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.color = progressHeight >= i * stepH ? "#0f9d58" : "rgba(0,0,0,0.3)";
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [steps]);

  const variant = button?.variant ?? "outline";

  return (
    <section ref={sectionRef} className={styles.timelineSection}>
      <div className={styles.sectionIntro}>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>

      <div
        ref={timelineRef}
        className={styles.timeline}
        style={{ "--steps": steps.length, "--progress-height": "0px" } as React.CSSProperties}
      >
        <div className={styles.timelineTrack} aria-hidden />
        {steps.map((item, index) => (
          <article
            key={item.step}
            className={styles.timelineStep}
            style={{ "--step-index": index } as React.CSSProperties}
          >
            <strong
              ref={(el) => { strongRefs.current[index] = el; }}
              style={{ color: "rgba(0,0,0,0.3)" }}
            >
              {item.step}
            </strong>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      {button && (
        <Link
          href={button.href}
          className={`${variant === "primary" ? "btn-primary" : "btn-outline"} ${styles.pageButton}`}
          style={{ width: 259 }}
        >
          <span>{button.label}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={variant === "primary" ? "/arrow-white.png" : "/arrow-black.png"}
            width={24}
            height={24}
            alt=""
            className="btn-arrow-img"
          />
        </Link>
      )}
    </section>
  );
}
