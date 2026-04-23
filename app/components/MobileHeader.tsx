"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="site-mobile-header"
      style={{
        position: "fixed",
        top: 0,
        zIndex: 60,
        width: "100%",
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(35px)",
        WebkitBackdropFilter: "blur(35px)",
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
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            {isOpen ? (
              <>
                <path d="M6 6L18 18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 6L6 18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M3 6H21" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 12H21" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 18H21" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen ? (
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            padding: "8px 16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: 8,
                background: "#fff",
                color: "#000",
                textDecoration: "none",
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 1.4,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <span>{item.label}</span>
              <span aria-hidden style={{ color: "#0f9d58" }}>→</span>
            </Link>
          ))}
        </div>
      ) : null}
    </nav>
  );
}
