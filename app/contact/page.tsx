import type { Metadata } from "next";

import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Pixtron",
  description:
    "Get started with Pixtron. Whether you're a restaurant or an advertiser, we'd love to discuss how Pixtron can work for you.",
};

type ContactPageProps = {
  searchParams?: Promise<{
    type?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const type = params?.type;
  const initialStep =
    type === "restaurant"
      ? "restaurant"
      : type === "advertiser"
        ? "advertiser"
        : "select";

  return <ContactClient initialStep={initialStep} />;
}
