import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://pixtron.net";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, "");

export const SITE_ORIGIN = new URL(SITE_URL);

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  robots?: Metadata["robots"];
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  robots = {
    index: true,
    follow: true,
  },
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots,
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: "Pixtron",
      locale: "en_US",
      images: [
        {
          url: "/logo.png",
          width: 82,
          height: 82,
          alt: "Pixtron logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      site: "@pixtron",
      title,
      description,
      images: [
        {
          url: "/logo.png",
          alt: "Pixtron logo",
        },
      ],
    },
  };
}
