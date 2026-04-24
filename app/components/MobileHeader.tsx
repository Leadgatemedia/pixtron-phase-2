"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "About", href: "/about", available: true },
  { label: "Product", href: "#", available: false },
  { label: "Advertisers", href: "#", available: false },
  { label: "Industries", href: "#", available: false },
  { label: "Restaurants", href: "#", available: false },
];

const itemTransition =
  "opacity 300ms cubic-bezier(0.22, 1, 0.36, 1), transform 300ms cubic-bezier(0.22, 1, 0.36, 1)";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (isOpen) {
      setShouldRenderMenu(true);
    } else if (shouldRenderMenu) {
      timeoutId = setTimeout(() => setShouldRenderMenu(false), 320);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen, shouldRenderMenu]);

  return (
    <nav
      className="site-mobile-header"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 60,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          boxSizing: "border-box",
          background: isOpen ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.8)",
          backdropFilter: isOpen ? "blur(42px)" : "blur(35px)",
          WebkitBackdropFilter: isOpen ? "blur(42px)" : "blur(35px)",
          transition: "background 280ms ease, backdrop-filter 280ms ease, -webkit-backdrop-filter 280ms ease",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", minHeight: 64 }}>
          <Image src="/logo.png" alt="Pixtron" width={138} height={64} priority style={{ width: 86, height: 64 }} />
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            background: "rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 6,
            padding: 16,
            boxSizing: "border-box",
            cursor: "pointer",
            transition: "background 240ms ease, border-color 240ms ease, transform 240ms ease",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 24,
              height: 24,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                opacity: isOpen ? 0 : 1,
                transform: isOpen ? "scale(0.82) rotate(-10deg)" : "scale(1) rotate(0deg)",
                transition: "opacity 220ms ease, transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <path d="M3 6H21" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 12H21" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 18H21" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "scale(1) rotate(0deg)" : "scale(0.82) rotate(10deg)",
                transition: "opacity 220ms ease, transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <path d="M7 7L17 17" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              <path d="M17 7L7 17" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </button>
      </div>

      {shouldRenderMenu ? (
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.98)",
            height: "calc(100dvh - 96px)",
            padding: "32px 16px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box",
            overflowY: "auto",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
            transform: isOpen ? "translateY(0px)" : "translateY(-18px)",
            transformOrigin: "top center",
            transition: "opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {NAV_ITEMS.map((item, index) =>
            item.available ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#000",
                  textDecoration: "none",
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: "32px",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0px)" : "translateY(-12px)",
                  transition: itemTransition,
                  transitionDelay: isOpen ? `${90 + index * 35}ms` : "0ms",
                }}
              >
                <span>{item.label}</span>
                {item.label === "Product" ? (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                    <path d="M9 13L16 20L23 13" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </Link>
            ) : (
              <div
                key={item.label}
                aria-disabled="true"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#000",
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: "32px",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0px)" : "translateY(-12px)",
                  transition: itemTransition,
                  transitionDelay: isOpen ? `${90 + index * 35}ms` : "0ms",
                }}
              >
                <span>{item.label}</span>
                {item.label === "Product" ? (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                    <path d="M9 13L16 20L23 13" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </div>
            ),
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            alignItems: "center",
            justifyContent: "center",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0px)" : "translateY(10px)",
            transition: "opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 360ms cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: isOpen ? "180ms" : "0ms",
          }}
        >
          {/* Contact Us button — Figma: 2px border rgba(0,0,0,0.5), arrow-black icon */}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "16px 20px",
              boxSizing: "border-box",
              borderRadius: 6,
              border: "2px solid rgba(0,0,0,0.5)",
              background: "#fff",
              color: "#000",
              textDecoration: "none",
              fontSize: 18,
              fontWeight: 500,
              lineHeight: "30px",
            }}
          >
            <span>Contact Us</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/arrow-black.png" width={24} height={24} alt="" style={{ display: "block" }} />
          </Link>

          {/* Links + copyright — no dividers, gap: 40px total */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <Link
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: "27px",
                  letterSpacing: "0.18px",
                  color: "#000",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  width: "fit-content",
                }}
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: "27px",
                  letterSpacing: "0.18px",
                  color: "#000",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  width: "fit-content",
                }}
              >
                Terms &amp; Conditions
              </Link>
            </div>

            <div style={{ fontSize: 18, fontWeight: 500, lineHeight: "normal", color: "rgba(0,0,0,0.5)" }}>
              © 2026 Pixtron, All Rights Reserved
            </div>
          </div>
        </div>
      </div>
      ) : null}
    </nav>
  );
}
