"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero intro sequence:
 *  1. blank
 *  2. words fade in one by one (stay visible — no fade out)
 *  3. headline glides up to exact hero h1 position
 *     simultaneously: header slides down, buttons/subtitle slide up (sandwich)
 */

type Phase = "blank" | "wordIn" | "hold" | "titleMove" | "done";

const W_IN_DUR  = 320;  // each word fade-in (ms)
const W_IN_STG  = 100;  // stagger between words (ms)
const HOLD      = 500;  // pause after all words visible (ms)
const MOVE_DUR  = 700;  // glide to hero position + overlay fade (ms)

const TOTAL_IN = 6 * W_IN_STG + W_IN_DUR; // time until last word fully visible

export default function HeroIntro() {
  const [phase, setPhase] = useState<Phase>("blank");
  const [moveY, setMoveY] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const S = 300;
    const t1 = setTimeout(() => setPhase("wordIn"),    S);
    const t2 = setTimeout(() => setPhase("hold"),      S + TOTAL_IN);
    const t3 = setTimeout(() => setPhase("titleMove"), S + TOTAL_IN + HOLD);
    const t4 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, S + TOTAL_IN + HOLD + MOVE_DUR + 60);

    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "titleMove") return;

    // Measure exact centre of hero h1 and calculate delta from overlay text centre
    const heroH1 = document.querySelector("[data-hero-headline]") as HTMLElement | null;
    if (heroH1 && textRef.current) {
      const hRect = heroH1.getBoundingClientRect();
      const tRect = textRef.current.getBoundingClientRect();
      const dy = (hRect.top + hRect.height / 2) - (tRect.top + tRect.height / 2);
      setMoveY(dy);
    }

    // Fire sandwich EXACTLY when text lands (after MOVE_DUR), not at start
    setTimeout(() => {
      document.documentElement.classList.add("intro-done");
    }, MOVE_DUR - 30); // 30ms before overlay fully gone — imperceptible overlap
  }, [phase]);

  if (phase === "done") return null;

  const isMoving = phase === "titleMove";

  // Words are visible once wordIn starts, stay visible forever after
  const wordVisible = phase !== "blank";

  function wordStyle(index: number, green: boolean): React.CSSProperties {
    return {
      display: "inline",
      opacity: wordVisible ? 1 : 0,
      transition: phase === "wordIn"
        ? `opacity ${W_IN_DUR}ms ease ${index * W_IN_STG}ms`
        : "none",
      color: green ? "#0f9d58" : "#000",
      fontStyle: green ? "italic" : "normal",
    };
  }

  const w = (i: number, g: boolean) => wordStyle(i, g);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isMoving ? 0 : 1,
        transition: isMoving ? `opacity ${MOVE_DUR}ms ease` : "none",
        pointerEvents: isMoving ? "none" : "all",
      }}
    >
      <div
        ref={textRef}
        style={{
          fontSize: 60,
          fontWeight: 700,
          lineHeight: 1.2,
          textAlign: "center",
          maxWidth: 782,
          padding: "0 24px",
          transform: isMoving ? `translateY(${moveY}px)` : "translateY(0)",
          transition: isMoving
            ? `transform ${MOVE_DUR}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
        }}
      >
        <span style={w(0, false)}>Advertising </span>
        <span style={w(1, false)}>that </span>
        <span style={w(2, false)}>people</span>
        <br />
        <span style={w(3, true)}>touch, </span>
        <span style={w(4, true)}>see </span>
        <span style={w(5, true)}>and </span>
        <span style={w(6, true)}>smell</span>
      </div>
    </div>
  );
}
