import emailjs from "@emailjs/browser";

const DEFAULT_ADMIN_TO_EMAIL = "ops@pixtron.net";

type ContactVariant = {
  slug: "signature" | "custom";
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
  adminToEmail: string;
};

type EmailTemplateParams = {
  admin_subject: string;
  client_subject: string;
  sender_name: string;
  sender_email: string;
  reply_to: string;
  to_email: string;
  admin_to_email: string;
  client_to_email: string;
  audience_label: string;
  inquiry_label: string;
  form_slug: ContactVariant["slug"];
  page_title: string;
  page_url: string;
  business_label: string;
  business_name: string;
  phone_number: string;
  message: string;
  client_intro: string;
  site_name: string;
  site_url: string;
  submitted_at: string;
};

export type ContactEmailPayload = {
  variant: ContactVariant;
  name: string;
  email: string;
  phone?: string;
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
  const adminToEmail =
    process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TO_EMAIL?.trim() ||
    DEFAULT_ADMIN_TO_EMAIL;

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
    adminToEmail,
  };
}

function getSiteBaseUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredSiteUrl) {
    return configuredSiteUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "https://pixtron.net";
}

function getContactPageUrl(slug: ContactVariant["slug"]) {
  const type = slug === "signature" ? "signature" : "custom";
  return `${getSiteBaseUrl()}/contact?type=${type}`;
}

export function buildContactTemplateParams(
  payload: ContactEmailPayload,
): EmailTemplateParams {
  const submittedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  const note = payload.message.trim() || "No message provided.";
  const phone = payload.phone?.trim();

  return {
    admin_subject: `New ${payload.variant.inquiryLabel} from ${payload.name}`,
    client_subject: `Thanks for your ${payload.variant.badgeLabel} inquiry`,
    sender_name: payload.name,
    sender_email: payload.email,
    reply_to: payload.email,
    to_email: payload.email,
    admin_to_email: DEFAULT_ADMIN_TO_EMAIL,
    client_to_email: payload.email,
    audience_label: payload.variant.badgeLabel,
    inquiry_label: payload.variant.inquiryLabel,
    form_slug: payload.variant.slug,
    page_title: payload.variant.titleText,
    page_url: getContactPageUrl(payload.variant.slug),
    business_label: payload.variant.businessFieldLabel,
    business_name: payload.business,
    phone_number: phone ?? "",
    message: note,
    client_intro: payload.variant.clientIntro,
    site_name: "Pixtron",
    site_url: getSiteBaseUrl(),
    submitted_at: submittedAt,
  };
}

export async function sendContactInquiry(payload: ContactEmailPayload) {
  const config = getEmailJsConfig();
  const templateParams = buildContactTemplateParams(payload);

  console.log("[EmailJS] Starting contact email send...");
  console.log("[EmailJS] Service ID:", config.serviceId);
  console.log("[EmailJS] Admin Template ID:", config.adminTemplateId);
  console.log("[EmailJS] Client Template ID:", config.clientTemplateId);

  try {
    const adminTemplateParams = {
      ...templateParams,
      to_email: config.adminToEmail,
      admin_to_email: config.adminToEmail,
    };
    const clientTemplateParams = {
      ...templateParams,
      to_email: payload.email,
      client_to_email: payload.email,
    };

    const [adminResult, clientResult] = await Promise.all([
      emailjs.send(
        config.serviceId,
        config.adminTemplateId,
        adminTemplateParams,
        config.publicKey,
      ),
      emailjs.send(
        config.serviceId,
        config.clientTemplateId,
        clientTemplateParams,
        config.publicKey,
      ),
    ]);
    console.log(
      "[EmailJS] Send success:",
      adminResult.status,
      adminResult.text,
      clientResult.status,
      clientResult.text,
    );
  } catch (error) {
    console.error("[EmailJS] Send failed:", error);
    throw error;
  }

  return templateParams;
}
