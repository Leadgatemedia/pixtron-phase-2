import emailjs from "@emailjs/browser";

type LandingEmailJsConfig = {
  publicKey: string;
  serviceId: string;
  leadTemplateId: string;
  confirmationTemplateId?: string;
};

export type LandingInquiryPayload = {
  name: string;
  email: string;
  phone: string;
  note: string;
};

function getLandingEmailJsConfig(): LandingEmailJsConfig {
  const publicKey =
    process.env.NEXT_PUBLIC_EMAILJS_LANDING_PUBLIC_KEY?.trim() ||
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();
  const serviceId =
    process.env.NEXT_PUBLIC_EMAILJS_LANDING_SERVICE_ID?.trim() ||
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
  const leadTemplateId =
    process.env.NEXT_PUBLIC_EMAILJS_LANDING_LEAD_TEMPLATE_ID?.trim();
  const confirmationTemplateId =
    process.env.NEXT_PUBLIC_EMAILJS_LANDING_CONFIRMATION_TEMPLATE_ID?.trim();

  if (!publicKey || !serviceId || !leadTemplateId) {
    throw new Error(
      "Landing page EmailJS is not configured. Add NEXT_PUBLIC_EMAILJS_LANDING_LEAD_TEMPLATE_ID and either landing-specific or shared EmailJS service/public key values to your environment.",
    );
  }

  return {
    publicKey,
    serviceId,
    leadTemplateId,
    confirmationTemplateId,
  };
}

function buildLandingTemplateParams(payload: LandingInquiryPayload) {
  return {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    note: payload.note.trim() || "No additional note provided.",
    submitted_at: new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date()),
    source: "Pixtron landing page",
    reply_to: payload.email,
    to_email: payload.email,
  };
}

export async function sendLandingInquiry(payload: LandingInquiryPayload) {
  const config = getLandingEmailJsConfig();
  const templateParams = buildLandingTemplateParams(payload);

  await emailjs.send(
    config.serviceId,
    config.leadTemplateId,
    templateParams,
    {
      publicKey: config.publicKey,
    },
  );

  if (config.confirmationTemplateId) {
    await emailjs.send(
      config.serviceId,
      config.confirmationTemplateId,
      templateParams,
      {
        publicKey: config.publicKey,
      },
    );
  }
}
