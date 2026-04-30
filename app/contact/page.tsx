import type { Metadata } from "next";

import ContactClient from "./ContactClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Pixtron | Restaurant and Advertiser Enquiries",
  description:
    "Get in touch with Pixtron to discuss restaurant partnerships, advertiser enquiries, or the next step for your sensory media campaign.",
  path: "/contact",
});

type ContactPageProps = {
  searchParams?: Promise<{
    type?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const type = params?.type;
  const initialStep =
    type === "restaurant" || type === "signature"
      ? "restaurant"
      : type === "advertiser" || type === "custom"
        ? "advertiser"
        : "select";

  return <ContactClient initialStep={initialStep} />;
}
