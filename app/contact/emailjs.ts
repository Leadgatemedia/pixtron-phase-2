import emailjs from "@emailjs/browser";

type ContactVariant = {
  slug: "restaurants" | "advertiser-brand";
  badgeLabel: string;
  inquiryLabel: string;
  titleText: string;
  businessFieldLabel: string;
  clientIntro: string;
};

type EmailJsConfig = {
  publicKey: string;
  serviceId: string;
  adminTemplateId: string;
  clientTemplateId: string;
};

export type ContactEmailPayload = {
  variant: ContactVariant;
  name: string;
  email: string;
  business: string;
  message: string;
};

function getEmailJsConfig(): EmailJsConfig {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
  const adminTemplateId =
    process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID?.trim();
  const clientTemplateId =
    process.env.NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID?.trim();

  if (!publicKey || !serviceId || !adminTemplateId || !clientTemplateId) {
    throw new Error(
      "EmailJS is not configured. Add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID to .env.local.",
    );
  }

  return {
    publicKey,
    serviceId,
    adminTemplateId,
    clientTemplateId,
  };
}

function getSiteUrl(slug: ContactVariant["slug"]) {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredSiteUrl) {
    return `${configuredSiteUrl.replace(/\/$/, "")}/contact/${slug}`;
  }

  if (typeof window !== "undefined") {
    return `${window.location.origin}/contact/${slug}`;
  }

  return `https://pixtron.net/contact/${slug}`;
}

export function buildContactTemplateParams(payload: ContactEmailPayload) {
  const submittedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  const message = payload.message.trim() || "No message provided.";

  return {
    admin_subject: `New ${payload.variant.inquiryLabel} from ${payload.name}`,
    client_subject: "Thanks for contacting Pixtron",
    sender_name: payload.name,
    sender_email: payload.email,
    reply_to: payload.email,
    to_email: payload.email,
    audience_label: payload.variant.badgeLabel,
    inquiry_label: payload.variant.inquiryLabel,
    form_slug: payload.variant.slug,
    page_title: payload.variant.titleText,
    business_label: payload.variant.businessFieldLabel,
    business_name: payload.business,
    message,
    client_intro: payload.variant.clientIntro,
    site_name: "Pixtron",
    site_url: getSiteUrl(payload.variant.slug),
    submitted_at: submittedAt,
  };
}

export async function sendContactInquiry(payload: ContactEmailPayload) {
  const config = getEmailJsConfig();
  const templateParams = buildContactTemplateParams(payload);

  console.log("[EmailJS] Starting send...");
  console.log("[EmailJS] Service ID:", config.serviceId);
  console.log("[EmailJS] Admin Template ID:", config.adminTemplateId);
  console.log("[EmailJS] Template params:", templateParams);

  try {
    const result = await emailjs.send(
      config.serviceId,
      config.adminTemplateId,
      templateParams,
      config.publicKey,
    );
    console.log("[EmailJS] Send success:", result.status, result.text);
  } catch (error) {
    console.error("[EmailJS] Send failed:", error);
    throw error;
  }

  return templateParams;
}
