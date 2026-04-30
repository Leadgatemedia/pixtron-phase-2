import type { Metadata } from "next";

import ProductPage, { SIGNATURE_SERIES_PAGE } from "../components/ProductPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Signature Series | Premium Wet Wipe Sachets",
  description:
    "Explore Pixtron Signature Series premium wet wipe sachets crafted for refreshing, intentional hospitality moments.",
  path: "/signature-series",
});

export default function SignatureSeriesPage() {
  return <ProductPage config={SIGNATURE_SERIES_PAGE} />;
}
