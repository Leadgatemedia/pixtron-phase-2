import type { Metadata } from "next";

import ProductPage, { RESTAURANTS_PAGE } from "../components/ProductPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Restaurants | Premium Guest Experience",
  description:
    "Upgrade restaurant guest satisfaction with Pixtron premium wet wipe sachets designed for a refined, consistent dining experience.",
  path: "/restaurants",
});

export default function RestaurantsPage() {
  return <ProductPage config={RESTAURANTS_PAGE} />;
}
