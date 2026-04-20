"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FooterBlurGuard from "./FooterBlurGuard";
import styles from "./FooterSection.module.css";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const abs: React.CSSProperties = { position: "absolute" };
const absFill: React.CSSProperties = { position: "absolute", inset: 0, display: "block", width: "100%", height: "100%" };

/* ─── Default (outline) icons — user-exported from Figma ──────────────────── */

function InstagramDefaultIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" src="/icons/social-instagram.svg" width={40} height={40} style={{ display: "block", flexShrink: 0 }} />
  );
}

function FacebookDefaultIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" src="/icons/social-facebook.svg" width={33} height={33} style={{ display: "block", flexShrink: 0 }} />
  );
}

function TikTokDefaultIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" src="/icons/social-tiktok.svg" width={23} height={30} style={{ display: "block", flexShrink: 0 }} />
  );
}

function YoutubeDefaultIcon({ blurred = false }: { blurred?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" src="/icons/social-youtube.svg" width={40} height={40}
      style={{ display: "block", flexShrink: 0, ...(blurred ? { filter: "blur(8px)", opacity: 0.5 } : {}) }} />
  );
}

/* ─── Hover (colored) icons — 40 × 40 containers ───────────────────────────
   Positions match Figma hover nodes exactly.
────────────────────────────────────────────────────────────────────────────── */

// Instagram gradient background (two radial gradients layered, from Figma)
const instagramGradientBg =
  "url('data:image/svg+xml;utf8," +
  "<svg viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'>" +
  "<rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/>" +
  "<defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\'" +
  " gradientTransform=\\'matrix(0.17391 0.86879 -3.5811 0.71724 -3.3501 1.4408)\\'>" +
  "<stop stop-color=\\'rgba(55,113,200,1)\\' offset=\\'0\\'/>" +
  "<stop stop-color=\\'rgba(55,113,200,1)\\' offset=\\'0.128\\'/>" +
  "<stop stop-color=\\'rgba(79,57,228,0.5)\\' offset=\\'0.564\\'/>" +
  "<stop stop-color=\\'rgba(102,0,255,0)\\' offset=\\'1\\'/>" +
  "</radialGradient></defs></svg>'), " +
  "url('data:image/svg+xml;utf8," +
  "<svg viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'>" +
  "<rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/>" +
  "<defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\'" +
  " gradientTransform=\\'matrix(0 -1.9821 1.8436 0 5.3125 21.54)\\'>" +
  "<stop stop-color=\\'rgba(255,221,85,1)\\' offset=\\'0\\'/>" +
  "<stop stop-color=\\'rgba(255,221,85,1)\\' offset=\\'0.1\\'/>" +
  "<stop stop-color=\\'rgba(255,153,74,1)\\' offset=\\'0.3\\'/>" +
  "<stop stop-color=\\'rgba(255,118,68,1)\\' offset=\\'0.4\\'/>" +
  "<stop stop-color=\\'rgba(255,84,62,1)\\' offset=\\'0.5\\'/>" +
  "<stop stop-color=\\'rgba(241,77,89,1)\\' offset=\\'0.625\\'/>" +
  "<stop stop-color=\\'rgba(228,70,117,1)\\' offset=\\'0.75\\'/>" +
  "<stop stop-color=\\'rgba(200,55,171,1)\\' offset=\\'1\\'/>" +
  "</radialGradient></defs></svg>')";

function InstagramHoverIcon() {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
      {/* gradient bg square: inset-[8.33%] rounded-[4.3px] */}
      <div style={{ ...abs, top: "8.33%", right: "8.33%", bottom: "8.33%", left: "8.33%",
        borderRadius: 4.3, backgroundImage: instagramGradientBg }} />
      {/* white icon: inset-[20.24%] */}
      <div style={{ ...abs, top: "20.24%", right: "20.24%", bottom: "20.24%", left: "20.24%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/icons/social-instagram-hover-white.svg" style={absFill} />
      </div>
    </div>
  );
}

function FacebookHoverIcon() {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
      {/* Subtract (blue circle + f): inset-[8.33%_8.33%_8.64%_8.33%] */}
      <div style={{ ...abs, top: "8.33%", right: "8.33%", bottom: "8.64%", left: "8.33%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/icons/social-facebook-hover-colored.svg" style={absFill} />
      </div>
    </div>
  );
}

function TikTokHoverIcon() {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
      {/* V3 red: inset-[11.66%_13.1%_8.54%_24.53%] */}
      <div style={{ ...abs, top: "11.66%", right: "13.1%", bottom: "8.54%", left: "24.53%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/icons/social-tiktok-hover-r.svg" style={absFill} />
      </div>
      {/* V4 black: inset-[11.66%_17.1%_11.87%_17.33%] */}
      <div style={{ ...abs, top: "11.66%", right: "17.1%", bottom: "11.87%", left: "17.33%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/icons/social-tiktok-hover-b.svg" style={absFill} />
      </div>
      {/* V5 cyan: inset-[8.33%_17.1%_16.14%_13.34%] */}
      <div style={{ ...abs, top: "8.33%", right: "17.1%", bottom: "16.14%", left: "13.34%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/icons/social-tiktok-hover-c.svg" style={absFill} />
      </div>
    </div>
  );
}

function YoutubeHoverIcon() {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
      {/* Subtract (red rect + play): inset-[20.71%_8.34%_20.94%_8.34%] */}
      <div style={{ ...abs, top: "20.71%", right: "8.34%", bottom: "20.94%", left: "8.34%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/icons/social-youtube-hover-colored.svg" style={absFill} />
      </div>
    </div>
  );
}

/* ─── Tile ───────────────────────────────────────────────────────────────── */

interface SocialTileProps {
  icon: React.ReactNode;
  hoverIcon?: React.ReactNode;
  label?: string;
}

function SocialTile({ icon, hoverIcon, label }: SocialTileProps) {
  const [hovered, setHovered] = useState(false);
  const isActive = !!hoverIcon;
  const showHover = hovered && isActive;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 141.3,
        height: 142,
        position: "relative",
        zIndex: showHover ? 2 : 1,
        flexShrink: 0,
        background: "#fff",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: showHover ? 14 : 0,
        cursor: isActive ? "pointer" : "default",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        boxShadow: showHover ? "0px 12px 34px 0px rgba(0,0,0,0.25)" : "none",
        transform: showHover ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      {showHover ? hoverIcon : icon}
      {showHover && label && (
        <span style={{ fontSize: 18, fontWeight: 500, color: "rgba(0,0,0,0.84)", lineHeight: 1.5, whiteSpace: "nowrap" }}>
          {label}
        </span>
      )}
    </div>
  );
}

/* ─── Contact icons ───────────────────────────────────────────────────────── */

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="3" y="5.5" width="16" height="11" rx="2" stroke="#0F9D58" strokeWidth="1.8" />
      <path d="M4.5 7L11 12L17.5 7" stroke="#0F9D58" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M6.4 4.2L8.9 3.4C9.5 3.2 10 3.5 10.3 4L11.5 6.8C11.7 7.3 11.6 7.8 11.2 8.1L9.8 9.5C10.7 11.2 12 12.5 13.7 13.4L15.1 12C15.4 11.6 15.9 11.5 16.4 11.7L19.2 12.9C19.7 13.2 20 13.7 19.8 14.3L19 16.8C18.8 17.5 18.2 17.9 17.5 17.9C10.7 17.9 5.1 12.3 5.1 5.5C5.1 4.8 5.5 4.4 6.4 4.2Z" stroke="#0F9D58" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M11 19C14.5 15 16.2 12.3 16.2 9.7C16.2 6.6 13.8 4.2 11 4.2C8.2 4.2 5.8 6.6 5.8 9.7C5.8 12.3 7.5 15 11 19Z" stroke="#0F9D58" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="11" cy="9.5" r="1.8" fill="#0F9D58" />
    </svg>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

export default function FooterSection() {
  const navLinks = ["Signature Sachets", "Custom Sachets", "Advertisers", "Restaurants", "Industries"];
  const companyLinks = ["Blogs", "About us", "Contact Us", "FAQ", "Product"];

  return (
    <FooterBlurGuard>
      <footer style={{ background: "#fff", width: "100%" }}>

        {/* ── Social strip ── */}
        <div style={{ width: "100%", background: "#f4f4f4", paddingTop: 56, paddingBottom: 3 }}>
          <div style={{
            fontSize: 40, lineHeight: 1.2, textAlign: "center", marginBottom: 56,
            backgroundImage: "linear-gradient(94.773deg, #000 0%, rgba(0,0,0,0.5) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            <div style={{ fontWeight: 400 }}>Get connected with us</div>
            <div style={{ fontWeight: 700 }}>on social networks</div>
          </div>

          <div style={{ display: "flex", gap: 3, width: "100%", overflow: "visible", alignItems: "stretch" }}>
            {/* Left wing — enough tiles to fill any viewport width */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "flex-end", gap: 3, overflow: "hidden" }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <SocialTile key={i} icon={<YoutubeDefaultIcon blurred />} />
              ))}
            </div>

            {/* Active tiles */}
            <SocialTile icon={<InstagramDefaultIcon />} hoverIcon={<InstagramHoverIcon />} label="Instagram" />
            <SocialTile icon={<FacebookDefaultIcon />} hoverIcon={<FacebookHoverIcon />} label="Facebook" />
            <SocialTile icon={<TikTokDefaultIcon />} hoverIcon={<TikTokHoverIcon />} label="TikTok" />
            <SocialTile icon={<YoutubeDefaultIcon />} hoverIcon={<YoutubeHoverIcon />} label="YouTube" />

            {/* Right wing — enough tiles to fill any viewport width */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "flex-start", gap: 3, overflow: "hidden" }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <SocialTile key={i} icon={<YoutubeDefaultIcon blurred />} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Lower shell ── */}
        <div className={styles.footerLowerShell}>
          <div className={styles.footerBrandCard}>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 8 }}>
              <Image src="/logo.png" alt="Pixtron" width={206} height={166} />
            </div>
          <div style={{ textAlign: "center", width: "100%", maxWidth: 270, margin: "0 auto", paddingBottom: 2 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                lineHeight: "24px",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 2,
              }}
            >
              Real world advertising that
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                lineHeight: "32px",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              Seen. Touch. Remembered.
            </div>
          </div>
          </div>

          <div className={styles.footerInfoPanel}>
            <div className={styles.footerInfoTop}>
              <div style={{ width: 200, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.64px", textTransform: "uppercase", marginBottom: 24 }}>Navigation</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {navLinks.map((link) => (
                    <Link key={link} href="#" style={{ fontSize: 18, lineHeight: 1.5, letterSpacing: "0.18px", color: "#000", textDecoration: "none" }}>{link}</Link>
                  ))}
                </div>
              </div>

              <div style={{ width: 170, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.64px", textTransform: "uppercase", marginBottom: 24 }}>Company</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {companyLinks.map((link) => (
                    <Link key={link} href="#" style={{ fontSize: 18, lineHeight: 1.5, letterSpacing: "0.18px", color: "#000", textDecoration: "none" }}>{link}</Link>
                  ))}
                </div>
              </div>

              <div style={{ width: 475, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.64px", textTransform: "uppercase", marginBottom: 24 }}>Contact</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <a href="mailto:info@pixtron.net" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#000", fontSize: 18, lineHeight: 1.5, letterSpacing: "0.18px", fontWeight: 500 }}>
                    <MailIcon /><span>info@pixtron.net</span>
                  </a>
                  <a href="tel:7025822228" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#000", fontSize: 18, lineHeight: 1.5, letterSpacing: "0.18px", fontWeight: 500 }}>
                    <PhoneIcon /><span>(702) 582-2228</span>
                  </a>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#000", fontSize: 18, lineHeight: 1.5, letterSpacing: "0.18px", fontWeight: 500 }}>
                    <div style={{ flexShrink: 0, marginTop: 1 }}><PinIcon /></div>
                    <span style={{ whiteSpace: "nowrap" }}>1810 E. Sahara Ave Ste 930 Las Vegas, NV 89104, USA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.footerInfoBottom}>
              <div style={{ minWidth: 0, fontSize: 18, fontWeight: 500, color: "rgba(0,0,0,0.5)" }}>
                © 2026 Pixtron, All Rights Reserved
              </div>
              <div className={styles.footerPolicyLinks}>
                <Link href="#" style={{ fontSize: 18, lineHeight: 1.5, letterSpacing: "0.18px", color: "#000", textDecoration: "none" }}>Privacy Policy</Link>
                <Link href="#" style={{ fontSize: 18, lineHeight: 1.5, letterSpacing: "0.18px", color: "#000", textDecoration: "none", whiteSpace: "nowrap" }}>Terms &amp; Conditions</Link>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </FooterBlurGuard>
  );
}
