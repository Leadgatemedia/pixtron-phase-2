import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
