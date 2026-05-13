import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { LandingBrandInHandsSection } from "./components/landing-brand-in-hands-section";
import { LandingComparisonSection } from "./components/landing-comparison-section";
import { LandingFooter } from "./components/landing-footer";
import { LandingHeader } from "./components/landing-header";
import { LandingHeroSection } from "./components/landing-hero-section";
import { LandingPartnersSection } from "./components/landing-partners-section";

export const metadata: Metadata = createPageMetadata({
  title: "Advertise in LA Restaurants",
  description:
    "Advertise in LA restaurants with Pixtron sensory media and place your brand directly in diners' hands.",
  path: "/landing-page",
});

export default function LandingPage() {
  return (
    <main className="min-h-full w-full bg-white">
      <div className="landing-page-scale">
        <LandingHeader />
        <LandingHeroSection />
        <LandingPartnersSection />
        <LandingBrandInHandsSection />
        <LandingComparisonSection />
        <LandingFooter />
      </div>
    </main>
  );
}
