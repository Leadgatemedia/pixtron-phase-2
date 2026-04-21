"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

function ArrowIcon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/arrow-white.png" width={24} height={24} alt="" className="btn-arrow-img" style={{ display: "block" }} />;
}

const venues = [
  { image: "/restaurent.png", title: "Restaurants", subtitle: "Enhance dining with premium wipes", startY: 0 },
  { image: "/cafe's.png", title: "Cafe's", subtitle: "High-traffic lifestyle touchpoints", startY: 95 },
  { image: "/hotels.png", title: "Hotels", subtitle: "Premium hospitality amenities", startY: 194 },
];

const CARD_WIDTH = 522;
const CARD_HEIGHT = 782;
const CARD_GAP = 30;
const CTA_FINAL_GAP = 0;
const CTA_BUTTON_HEIGHT = 68;
const CTA_STAGE_PULLUP = 132;
const CARDS_NATURAL_HEIGHT = CARD_HEIGHT + venues[2].startY;
const CARDS_FRAME_WIDTH = CARD_WIDTH * 3 + CARD_GAP * 2;

export default function WherePixtronWorksScroll() {
  const [cardsScale, setCardsScale] = useState(1);
  const [ctaTravel, setCtaTravel] = useState(110);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    const setDimensions = () => {
      const cssZoom = parseFloat(document.documentElement.style.zoom) || 1;
      const viewportHeight = window.innerHeight / cssZoom;
      const viewportWidth = window.innerWidth / cssZoom;
      const headingApprox = 148;
      const ctaApprox = CTA_BUTTON_HEIGHT;
      const sectionPadding = 72;
      const availableCardsHeight = Math.max(
        520,
        viewportHeight - headingApprox - ctaApprox - sectionPadding - CTA_FINAL_GAP,
      );
      const desktopBoost =
        viewportWidth >= 1680 ? 1.22 :
        viewportWidth >= 1440 ? 1.16 :
        viewportWidth >= 1280 ? 1.1 :
        1;
      const nextCardsScale = Math.min(1, (availableCardsHeight / CARDS_NATURAL_HEIGHT) * desktopBoost);

      setCardsScale(nextCardsScale);
      setCtaTravel(70 + nextCardsScale * 40);
    };

    setDimensions();
    window.addEventListener("resize", setDimensions);
    return () => window.removeEventListener("resize", setDimensions);
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 0 28px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 className="section-heading gradient-heading">Where Pixtron Works Best</h2>
        <p className="section-subtitle" style={{ marginTop: 16 }}>
          From upscale restaurants to casual cafes, Pixtron fits seamlessly into any dining environment
        </p>
      </div>

      <div
        style={{
          position: "relative",
          width: CARDS_FRAME_WIDTH,
          height: CARDS_NATURAL_HEIGHT * cardsScale,
          transform: `scale(${cardsScale})`,
          transformOrigin: "top center",
        }}
      >
        {venues.map((venue, i) => (
          <motion.div
            key={venue.title}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={{
              initial: { y: venue.startY },
              animate: { y: 0 },
            }}
            transition={{
              duration: 0.75,
              delay: i === 0 ? 0 : i === 1 ? 0.12 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              borderRadius: 20,
              overflow: "hidden",
              position: "absolute",
              left: i * (CARD_WIDTH + CARD_GAP),
              top: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={venue.image}
              alt={venue.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>
        ))}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: CTA_BUTTON_HEIGHT + ctaTravel + CTA_FINAL_GAP - CTA_STAGE_PULLUP,
          marginTop: -CTA_STAGE_PULLUP,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={{
            initial: { y: ctaTravel },
            animate: { y: 0 },
          }}
          transition={{
            duration: 0.7,
            delay: 0.58,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            top: 0,
          }}
        >
          <Link href="#" className="btn-primary">
            <span>Advertise With Pixtron</span>
            <ArrowIcon />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
