import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/dashboard/",
        "/login/",
        "/register/",
        "/account/",
        "/api/",
        "/thank-you/",
        "/confirmation/",
        "/success/",
        "/staging/",
        "/test/",
        "/dev/",
        "/internal/",
        "/*?*",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
