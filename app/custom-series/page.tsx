import type { Metadata } from "next";

import ProductPage, { CUSTOM_SERIES_PAGE } from "../components/ProductPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Series | Dual Sided Brand Impact",
  description:
    "Create custom Pixtron wet wipe sachets with dual sided brand storytelling, tactile engagement, and premium restaurant visibility.",
  path: "/custom-series",
});

export default function CustomSeriesPage() {
  return <ProductPage config={CUSTOM_SERIES_PAGE} />;
}
