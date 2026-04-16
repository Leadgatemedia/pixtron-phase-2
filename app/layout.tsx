import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pixtron – Advertising that people touch, see and smell",
  description:
    "Pixtron connects brands with premium restaurant and hospitality audiences through branded wet wipes – sensory advertising that people touch, see and smell.",
  icons: {
    icon: "/favicon.svg",
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
        {children}
        {/* Fixed bottom blur overlay — matches Bungee-style viewport edge effect */}
        <div
          id="bottom-blur-el"
          aria-hidden
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 140,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            pointerEvents: "none",
            zIndex: 9999,
            transition: "backdrop-filter 0.3s ease",
          }}
        />
      </body>
    </html>
  );
}
