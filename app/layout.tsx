import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import HeaderScrollState from "./components/HeaderScrollState";
import ScrollToTop from "./components/ScrollToTop";
import { SITE_ORIGIN } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: SITE_ORIGIN,
  title: {
    default: "Pixtron | Sensory Media Advertising",
    template: "%s | Pixtron",
  },
  description:
    "Pixtron connects brands with restaurant and hospitality audiences through sensory media advertising that people can touch, see, and remember.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Pixtron",
    locale: "en_US",
    title: "Pixtron | Sensory Media Advertising",
    description:
      "Pixtron connects brands with restaurant and hospitality audiences through sensory media advertising that people can touch, see, and remember.",
    images: [
      {
        url: "/logo.webp",
        width: 82,
        height: 82,
        alt: "Pixtron logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@pixtron",
    title: "Pixtron | Sensory Media Advertising",
    description:
      "Pixtron connects brands with restaurant and hospitality audiences through sensory media advertising that people can touch, see, and remember.",
    images: [
      {
        url: "/logo.webp",
        alt: "Pixtron logo",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.webp", type: "image/webp" },
      { url: "/favicon.png",  type: "image/png"  },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} style={{ zoom: 0.8 }}>
      <body>
        <SmoothScroll />
        <ScrollToTop />
        <HeaderScrollState />
        {children}
        {/* Fixed bottom blur overlay matches the viewport edge effect without affecting layout. */}
        <div
          id="bottom-blur-el"
          aria-hidden
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 140,
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
            opacity: 0,
            visibility: "hidden" as const,
            maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            pointerEvents: "none",
            zIndex: 9999,
            transition: "backdrop-filter 0.3s ease, opacity 0.3s ease",
          }}
        />
      </body>
    </html>
  );
}
