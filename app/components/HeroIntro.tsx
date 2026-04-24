"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

type Phase = "blank" | "wordIn" | "hold" | "titleMove" | "done";
type TargetMetrics = {
  width: number;
  fontSize: string;
  lineHeight: string;
};

const W_IN_DUR = 1200;
const W_IN_STG = 400;
const HOLD     = 200;
const MOVE_DUR = 1000;
const TOTAL_IN = 6 * W_IN_STG + W_IN_DUR;

export default function HeroIntro() {
  const [phase, setPhase] = useState<Phase>("blank");
  const [move, setMove] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [targetMetrics, setTargetMetrics] = useState<TargetMetrics | null>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const getTargetSelector = (mobile: boolean) => (mobile ? "[data-mobile-hero-headline]" : "[data-hero-headline]");

  useLayoutEffect(() => {
    const updateTargetMetrics = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      const heroH1 = document.querySelector(getTargetSelector(mobile)) as HTMLElement | null;
      if (!heroH1) return;

      const rect = heroH1.getBoundingClientRect();
      const computed = window.getComputedStyle(heroH1);
      setTargetMetrics({
        width: rect.width,
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
      });
    };

    updateTargetMetrics();
    window.addEventListener("resize", updateTargetMetrics);
    return () => window.removeEventListener("resize", updateTargetMetrics);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("intro-running");
    document.body.style.overflow = "hidden";

    const S = 300;
    const t1 = setTimeout(() => setPhase("wordIn"),    S);
    const t2 = setTimeout(() => setPhase("hold"),      S + TOTAL_IN);
    const t3 = setTimeout(() => setPhase("titleMove"), S + TOTAL_IN + HOLD);

    // Text lands → cut overlay instantly, real h1 fades in at its own position
    const t4 = setTimeout(() => {
      document.documentElement.classList.remove("intro-running");
      document.documentElement.classList.add("intro-done");
      flushSync(() => {
        setPhase("done");
      });
    }, S + TOTAL_IN + HOLD + MOVE_DUR);

    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
      document.documentElement.classList.remove("intro-running");
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "titleMove") return;
    // Restore overflow BEFORE measuring so the scrollbar is already present.
    // Without this, body is still overflow:hidden (scrollbar hidden, page wider),
    // measurement is correct, but when overflow restores after the overlay cuts
    // the scrollbar returns and shifts centred content left — visible drift.
    document.body.style.overflow = "";
    requestAnimationFrame(() => {
      const selector = getTargetSelector(isMobile);
      const heroH1 = document.querySelector(selector) as HTMLElement | null;
      if (!heroH1 || !textRef.current) return;
      const hRect = heroH1.getBoundingClientRect();
      const tRect = textRef.current.getBoundingClientRect();
      // getBoundingClientRect returns visual (zoom-adjusted) pixels,
      // but CSS transform uses CSS pixels. With zoom:0.8 on <html> they differ.
      // Dividing by zoom converts visual → CSS pixel space.
      const zoom = parseFloat(document.documentElement.style.zoom) || 1;
      setMove({
        x: (hRect.left - tRect.left) / zoom,
        y: (hRect.top  - tRect.top)  / zoom,
      });
    });
  }, [phase]);

  if (phase === "done") return null;

  const isMoving    = phase === "titleMove";
  const wordVisible = phase !== "blank";

  function wStyle(i: number): React.CSSProperties {
    return {
      opacity:    wordVisible ? 1 : 0,
      transition: phase === "wordIn"
        ? `opacity ${W_IN_DUR}ms ease ${i * W_IN_STG}ms`
        : "none",
    };
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9999,
        background:     "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        pointerEvents:  isMoving ? "none" : "all",
      }}
    >
      <h1
        ref={textRef}
        style={{
          width:      isMobile ? (targetMetrics?.width ?? 361) : 782,
          maxWidth:   "100%",
          fontSize:   isMobile ? (targetMetrics?.fontSize ?? 30) : 60,
          fontWeight: 700,
          lineHeight: isMobile ? (targetMetrics?.lineHeight ?? "1.2") : 1.2,
          textAlign:  "center",
          color:      "#000",
          margin:     0,
          padding:    0,
          transform:  isMoving ? `translate(${move.x}px, ${move.y}px)` : "translate(0,0)",
          transition: phase === "titleMove"
            ? `transform ${MOVE_DUR}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
        }}
      >
        <span style={wStyle(0)}>Advertising </span>
        <span style={wStyle(1)}>that </span>
        <span style={wStyle(2)}>people </span>
        <span style={{ color: "#0f9d58" }}>
          <span style={wStyle(3)}>touch, </span>
          <span style={wStyle(4)}>see </span>
          <span style={wStyle(5)}>and </span>
          <span style={wStyle(6)}>smell</span>
        </span>
      </h1>
    </div>
  );
}
