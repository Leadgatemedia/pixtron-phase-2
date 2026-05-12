"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FooterBlurGuard from "./FooterBlurGuard";
import styles from "./FooterSection.module.css";

const abs: React.CSSProperties = { position: "absolute" };
const absFill: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "block",
  width: "100%",
  height: "100%",
};

const navigationLinks = [
  { label: "Restaurants", href: "/restaurants", soon: false },
  { label: "Signature Sachets", href: "/signature-series", soon: false },
  { label: "Custom Sachets", href: "/custom-series", soon: false },
  { label: "Advertisers", href: "#", soon: true },
  { label: "Industries", href: "#", soon: true },
];

const companyLinks = [
  { label: "About us", href: "/about", soon: false },
  { label: "Contact us", href: "/contact", soon: false },
  { label: "Blogs", href: "#", soon: true },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

function SoonBadge() {
  return (
    <span className={styles.soonBadge}>
      Soon
    </span>
  );
}

function InstagramDefaultIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" loading="lazy" decoding="async" src="/icons/social-instagram.svg" width={40} height={40} style={{ display: "block", flexShrink: 0 }} />
  );
}

function FacebookDefaultIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" loading="lazy" decoding="async" src="/icons/social-facebook.svg" width={33} height={33} style={{ display: "block", flexShrink: 0 }} />
  );
}

function LinkedInDefaultIcon() {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" loading="lazy" decoding="async" src="/icons/figma-linkedin-default-base.svg" style={absFill} />
      <div style={{ ...abs, inset: "11.46%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" loading="lazy" decoding="async" src="/icons/figma-linkedin-default-stroke.svg" style={absFill} />
      </div>
    </div>
  );
}

function YoutubeDefaultIcon({ blurred = false }: { blurred?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      src="/icons/social-youtube.svg"
      width={40}
      height={40}
      style={{ display: "block", flexShrink: 0, ...(blurred ? { filter: "blur(8px)", opacity: 0.5 } : {}) }}
    />
  );
}

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
      <div
        style={{
          ...abs,
          top: "8.33%",
          right: "8.33%",
          bottom: "8.33%",
          left: "8.33%",
          borderRadius: 4.3,
          backgroundImage: instagramGradientBg,
        }}
      />
      <div style={{ ...abs, top: "20.24%", right: "20.24%", bottom: "20.24%", left: "20.24%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" loading="lazy" decoding="async" src="/icons/social-instagram-hover-white.svg" style={absFill} />
      </div>
    </div>
  );
}

function FacebookHoverIcon() {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
      <div style={{ ...abs, top: "8.33%", right: "8.33%", bottom: "8.64%", left: "8.33%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" loading="lazy" decoding="async" src="/icons/social-facebook-hover-colored.svg" style={absFill} />
      </div>
    </div>
  );
}

function LinkedInHoverIcon() {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" loading="lazy" decoding="async" src="/icons/figma-linkedin-keylines.svg" style={absFill} />
      <div style={{ ...abs, inset: "10.38%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" loading="lazy" decoding="async" src="/icons/figma-linkedin-hover-vector.svg" style={absFill} />
      </div>
    </div>
  );
}

function YoutubeHoverIcon() {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 40, height: 40 }}>
      <div style={{ ...abs, top: "20.71%", right: "8.34%", bottom: "20.94%", left: "8.34%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" loading="lazy" decoding="async" src="/icons/social-youtube-hover-colored.svg" style={absFill} />
      </div>
    </div>
  );
}

function SocialTile({
  icon,
  hoverIcon,
  label,
  href,
  hoverShadow,
}: {
  icon: React.ReactNode;
  hoverIcon?: React.ReactNode;
  label?: string;
  href?: string;
  hoverShadow?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = !!hoverIcon;
  const showHover = hovered && isActive;

  const inner = (
    <>
      {showHover ? hoverIcon : icon}
      {showHover && label ? <span className={styles.socialTileLabel}>{label}</span> : null}
    </>
  );

  const tileStyle = {
    zIndex: showHover ? 2 : 1,
    gap: showHover ? 14 : 0,
    cursor: isActive ? "pointer" : "default",
    boxShadow: showHover ? (hoverShadow ?? "0px 12px 34px 0px rgba(0,0,0,0.25)") : "none",
    transform: showHover ? "translateY(-1px)" : "translateY(0)",
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={styles.socialTile}
        style={{ ...tileStyle, textDecoration: "none" }}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.socialTile}
      style={tileStyle}
    >
      {inner}
    </div>
  );
}

function MobileSocialTile({ children, href }: { children: React.ReactNode; href?: string }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.mobileSocialTile} style={{ textDecoration: "none" }}>
        {children}
      </a>
    );
  }
  return <div className={styles.mobileSocialTile}>{children}</div>;
}

function DesktopSocialBand() {
  return (
    <div className={styles.desktopSocialBand}>
      <div className={styles.desktopSocialHeading}>
        <div>Get connected with us</div>
        <div>on social networks</div>
      </div>

      <div className={styles.footerSocialRow}>
        <div className={styles.socialBlurLaneLeft}>
          {Array.from({ length: 10 }).map((_, i) => (
            <SocialTile key={`left-${i}`} icon={<YoutubeDefaultIcon blurred />} />
          ))}
        </div>

        <SocialTile icon={<InstagramDefaultIcon />} hoverIcon={<InstagramHoverIcon />} label="Instagram" href="https://www.instagram.com/pixtronwipes?igsh=MWYyNzFsbWNteGRrYQ==" />
        <SocialTile icon={<FacebookDefaultIcon />} hoverIcon={<FacebookHoverIcon />} label="Facebook" href="https://www.facebook.com/share/18dKNZyDCE/?mibextid=wwXIfr" />
        <SocialTile
          icon={<LinkedInDefaultIcon />}
          hoverIcon={<LinkedInHoverIcon />}
          label="Linkedin"
          href="https://www.linkedin.com/company/pixtron-llc/"
          hoverShadow="0px 12px 17px 0px rgba(0,0,0,0.25)"
        />
        <SocialTile icon={<YoutubeDefaultIcon />} hoverIcon={<YoutubeHoverIcon />} label="YouTube" href="https://youtube.com/@pixtronwipes?si=HYP6XA_E5GwQO_yP" />

        <div className={styles.socialBlurLaneRight}>
          {Array.from({ length: 10 }).map((_, i) => (
            <SocialTile key={`right-${i}`} icon={<YoutubeDefaultIcon blurred />} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileSocialBand() {
  return (
    <section className={styles.mobileSocialBand}>
      <div className={styles.mobileSocialHeading}>
        <div>Get connected with us</div>
        <div>on social networks</div>
      </div>

      <div className={styles.mobileSocialGrid}>
        <MobileSocialTile href="https://www.instagram.com/pixtronwipes?igsh=MWYyNzFsbWNteGRrYQ==">
          <InstagramDefaultIcon />
        </MobileSocialTile>
        <MobileSocialTile href="https://www.facebook.com/share/18dKNZyDCE/?mibextid=wwXIfr">
          <FacebookDefaultIcon />
        </MobileSocialTile>
        <MobileSocialTile href="https://www.linkedin.com/company/pixtron-llc/">
          <LinkedInDefaultIcon />
        </MobileSocialTile>
        <MobileSocialTile href="https://youtube.com/@pixtronwipes?si=HYP6XA_E5GwQO_yP">
          <YoutubeDefaultIcon />
        </MobileSocialTile>
      </div>
    </section>
  );
}

function DesktopFooterLayout() {
  return (
    <section className={styles.desktopFooterShell}>
      <div className={styles.desktopFooterTop}>
        <div className={styles.desktopFooterCol}>
          <div className={styles.desktopBrandBlock}>
            <Image src="/logo.webp" alt="Pixtron" width={86} height={64} style={{ width: "auto", height: 52 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a href="mailto:info@pixtron.net" className={styles.footerBigLink}>
                info@pixtron.net
              </a>
              <span style={{ fontSize: 18, fontWeight: 500, lineHeight: "26px", color: "#000" }}>
                +1 (702) 582-2228
              </span>
              <span style={{ fontSize: 16, lineHeight: "24px", color: "rgba(0,0,0,0.6)" }}>
                1810 E. Sahara Ave Ste 930 Las Vegas, NV 89104, USA
              </span>
            </div>
          </div>
        </div>

        <div className={styles.desktopFooterCol}>
          <div className={styles.footerListBlock}>
            <div className={styles.footerSectionLabel}>Navigation</div>
            <div className={styles.footerLinkList}>
              {navigationLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerTextLink}>
                  {link.label}{link.soon && <SoonBadge />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.desktopFooterCol}>
          <div className={styles.footerListBlock}>
            <div className={styles.footerSectionLabel}>Company</div>
            <div className={styles.footerLinkList}>
              {companyLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerTextLink}>
                  {link.label}{link.soon && <SoonBadge />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.desktopFooterCol}>
          <div className={styles.footerListBlock}>
            <div className={styles.footerSectionLabel}>Legal</div>
            <div className={styles.footerLinkList}>
              {legalLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerTextLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.desktopFooterBottom}>
        <div className={styles.desktopFooterCopyright}>© 2026 Pixtron, All Rights Reserved</div>
      </div>

    </section>
  );
}

function MobileFooterLayout() {
  return (
    <section className={styles.mobileFooterShell}>
      <div className={styles.mobileFooterTop}>
        <div className={styles.mobileFooterBrandArea}>
          <Image src="/logo.webp" alt="Pixtron" width={111} height={83} className={styles.mobileFooterLogo} />
          <div className={styles.mobileFooterContactInfo}>
            <a href="mailto:info@pixtron.net" className={styles.footerBigLink}>
              info@pixtron.net
            </a>
            <span style={{ fontSize: 16, fontWeight: 500, lineHeight: "24px", color: "#000" }}>
              +1 (702) 582-2228
            </span>
            <span style={{ fontSize: 14, lineHeight: "22px", color: "rgba(0,0,0,0.6)" }}>
              1810 E. Sahara Ave Ste 930 Las Vegas, NV 89104, USA
            </span>
          </div>
        </div>

        <div className={styles.mobileFooterColumns}>
          <div className={styles.mobileFooterColumn}>
            <div className={styles.footerSectionLabel}>Navigation</div>
            <div className={styles.mobileFooterLinkList}>
              {navigationLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.mobileFooterTextLink}>
                  {link.label}{link.soon && <SoonBadge />}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.mobileFooterColumn}>
            <div className={styles.footerSectionLabel}>Company</div>
            <div className={styles.mobileFooterLinkList}>
              {companyLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.mobileFooterTextLink}>
                  {link.label}{link.soon && <SoonBadge />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobileFooterBottom}>
        <div className={styles.mobileFooterPolicies}>
          <Link href="#" className={styles.footerPolicyLink}>
            Privacy Policy
          </Link>
          <Link href="#" className={styles.footerPolicyLink}>
            Terms &amp; Conditions
          </Link>
        </div>
        <div className={styles.mobileFooterCopyright}>© 2026 Pixtron, All Rights Reserved</div>
      </div>

    </section>
  );
}

export default function FooterSection() {
  return (
    <FooterBlurGuard>
      <footer className={styles.footerRoot}>
        <div className={styles.desktopOnly}>
          <DesktopSocialBand />
          <DesktopFooterLayout />
        </div>

        <div className={styles.mobileOnly}>
          <MobileSocialBand />
          <MobileFooterLayout />
        </div>
      </footer>
    </FooterBlurGuard>
  );
}
