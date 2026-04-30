import { statSync } from "node:fs";
import { join } from "node:path";

import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

const HOME_PAGE_FILE = join(process.cwd(), "app", "page.tsx");
const ABOUT_PAGE_FILE = join(process.cwd(), "app", "about", "page.tsx");
const CONTACT_PAGE_FILE = join(process.cwd(), "app", "contact", "page.tsx");
const RESTAURANTS_PAGE_FILE = join(process.cwd(), "app", "restaurants", "page.tsx");
const SIGNATURE_SERIES_PAGE_FILE = join(process.cwd(), "app", "signature-series", "page.tsx");
const CUSTOM_SERIES_PAGE_FILE = join(process.cwd(), "app", "custom-series", "page.tsx");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: statSync(HOME_PAGE_FILE).mtime,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: statSync(ABOUT_PAGE_FILE).mtime,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: statSync(CONTACT_PAGE_FILE).mtime,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/restaurants`,
      lastModified: statSync(RESTAURANTS_PAGE_FILE).mtime,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/signature-series`,
      lastModified: statSync(SIGNATURE_SERIES_PAGE_FILE).mtime,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/custom-series`,
      lastModified: statSync(CUSTOM_SERIES_PAGE_FILE).mtime,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
