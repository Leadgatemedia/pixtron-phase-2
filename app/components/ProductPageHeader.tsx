"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileHeader from "./MobileHeader";
import styles from "./ProductPage.module.css";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Signature Series", href: "/signature-series" },
  { label: "Custom Series", href: "/custom-series" },
];

function ArrowIcon({ white = false }: { white?: boolean }) {
  return (
    <img
      src={white ? "/arrow-white.webp" : "/arrow-black.webp"}
      width={24}
      height={24}
      alt=""
      className="btn-arrow-img"
    />
  );
}

export default function ProductPageHeader({
  activeHref = "",
  darkHero = false,
}: {
  activeHref?: string;
  darkHero?: boolean;
}) {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (!darkHero) return;
    const onScroll = () => setAtTop(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [darkHero]);

  const isDark = darkHero && atTop;

  return (
    <>
      <div className={styles.desktopHeaderWrap}>
        <nav
          className={`${styles.desktopHeader} desktop-scroll-header${isDark ? ` ${styles.desktopHeaderDark}` : ""}`}
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className={styles.desktopHeaderInner}>
            <Link href="/" className={styles.logoLink} aria-label="Pixtron home">
              <Image
                src="/logo.webp"
                alt="Pixtron"
                width={86}
                height={64}
                priority
                className={styles.logo}
              />
            </Link>

            <div className={styles.navLinks}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  style={
                    item.href === activeHref
                      ? { color: isDark ? "#ffffff" : "#0f9d58" }
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className={styles.headerCta}>
              <Link
                href="/contact"
                className={`btn-outline${isDark ? ` ${styles.contactBtnDark}` : ""}`}
                style={{ minHeight: 56, padding: "0 20px 0 22px" }}
              >
                <span>Contact Us</span>
                <ArrowIcon white={isDark} />
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className={styles.mobileHeaderWrap}>
        <MobileHeader />
      </div>
    </>
  );
}
