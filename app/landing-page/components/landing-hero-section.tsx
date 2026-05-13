"use client";

import Image from "next/image";
import { useState } from "react";
import { GlowDivider } from "./glow-divider";
import { sendLandingInquiry } from "../lib/emailjs";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path
        d="M5 12H19M13 6L19 12L13 18"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const heroImageSrc = "/landing-page/image-section.webp";
const heroDesktopImageSrc = "/landing-page/image-section-desktop.png";

type SubmissionState =
  | {
      type: "idle";
      message: "";
    }
  | {
      type: "success" | "error";
      message: string;
    };

type MetaPixelTrackLead = (
  action: "track",
  eventName: "Lead",
) => void;

function trackLandingLead() {
  const fbq = (window as Window & { fbq?: MetaPixelTrackLead }).fbq;

  if (typeof fbq !== "function") {
    return;
  }

  try {
    fbq("track", "Lead");
  } catch (error) {
    console.warn("Landing page Meta Pixel lead tracking failed", error);
  }
}

export function LandingHeroSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    type: "idle",
    message: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionState({ type: "idle", message: "" });

    try {
      await sendLandingInquiry(form);
      setForm({
        name: "",
        email: "",
        phone: "",
        note: "",
      });
      setSubmissionState({
        type: "success",
        message:
          "Thanks, your request was sent successfully. We'll be in touch shortly. If you do not see the confirmation email in your inbox, please check your spam or junk folder.",
      });
      trackLandingLead();
    } catch (error) {
      console.error("Landing page EmailJS submission failed", error);
      setSubmissionState({
        type: "error",
        message:
          "We couldn't send your request right now. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="flex w-full flex-col items-center">
      <div
        className="w-full rounded-b-[20px] lg:rounded-none"
        style={{ background: "linear-gradient(to bottom, #1f1f1d, #070707)" }}
      >
        <div className="mx-auto flex min-h-[188px] w-full max-w-[390px] flex-col items-center px-4 pb-[20px] pt-[40px] lg:min-h-0 lg:max-w-none lg:pb-[88px] lg:pt-[72px]">
          <h1 className="w-full text-center font-[family:var(--font-inter)] text-[22px] font-extrabold leading-[1.3] text-white lg:text-[36px]">
            Advertise in LA Restaurants
          </h1>

          <GlowDivider width="min(100%, 480px)" className="mt-[2px] lg:mt-0" />

          <p className="mt-2 w-full text-center font-[family:var(--font-inter)] text-[14px] font-medium leading-[1.5] text-white/80 lg:mt-3 lg:w-[878px] lg:max-w-[878px] lg:text-[18px]">
            Turn every table in your ad space where your brand is placed on wet
            wipes directly in restaurants across Los Angeles. Your brand is
            seen, touched and remembered.
          </p>
        </div>
      </div>

      <div className="relative z-10 -mt-4 flex w-full flex-col gap-2 px-2 lg:-mt-12 lg:px-0">
        <div className="mx-auto flex w-full max-w-[390px] flex-col gap-3 rounded-[18px] border border-[#e0dfdf] bg-[#f2f0f1] p-3 shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_10px_10px_0px_rgba(0,0,0,0.04)] lg:max-w-[1130px] lg:grid lg:grid-cols-[529px_529px] lg:justify-center lg:gap-6 lg:rounded-[20px] lg:p-6">
          <form
            onSubmit={handleSubmit}
            className="flex w-full min-w-0 flex-col gap-3 lg:gap-6"
          >
            <div className="flex flex-col gap-2 lg:gap-3">
              <label className="font-[family:var(--font-inter)] text-[15px] font-medium text-black lg:text-[16px]">
                Name<span className="text-[#e63946]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="h-[42px] rounded-[4px] border border-black bg-white px-[14px] font-[family:var(--font-inter)] text-[15px] font-medium text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/20 lg:h-[48px] lg:text-[16px]"
              />
            </div>

            <div className="flex flex-col gap-2 lg:gap-3">
              <label className="font-[family:var(--font-inter)] text-[15px] font-medium text-black lg:text-[16px]">
                Email<span className="text-[#e63946]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                className="h-[42px] rounded-[4px] border border-black bg-white px-[14px] font-[family:var(--font-inter)] text-[15px] font-medium text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/20 lg:h-[48px] lg:text-[16px]"
              />
            </div>

            <div className="flex flex-col gap-2 lg:gap-3">
              <label className="font-[family:var(--font-inter)] text-[15px] font-medium text-black lg:text-[16px]">
                Phone<span className="text-[#e63946]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                required
                className="h-[42px] rounded-[4px] border border-black bg-white px-[14px] font-[family:var(--font-inter)] text-[15px] font-medium text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/20 lg:h-[48px] lg:text-[16px]"
              />
            </div>

            <div className="flex flex-col gap-2 lg:gap-3">
              <label className="font-[family:var(--font-inter)] text-[15px] font-medium text-black lg:text-[16px]">
                Note
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Your message"
                rows={4}
                className="h-[84px] resize-none rounded-[4px] border border-black bg-white px-[14px] py-[12px] font-[family:var(--font-inter)] text-[15px] font-medium text-black outline-none placeholder:text-black/40 focus:ring-2 focus:ring-black/20 lg:h-[104px] lg:py-[16px] lg:text-[16px]"
              />
            </div>

            <div className="flex flex-col items-center gap-2 lg:gap-[14px]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-[44px] w-full items-center justify-center gap-[6px] rounded-[4px] text-[17px] font-semibold text-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.06)] lg:h-[48px] lg:text-[18px]"
                style={{
                  background:
                    "linear-gradient(to bottom, #36872b, #146224)",
                }}
              >
                {isSubmitting ? "Sending..." : "Request Information"}
                <ArrowRightIcon className="size-6" />
              </button>

              {submissionState.type !== "idle" ? (
                <p
                  aria-live="polite"
                  className={`text-center text-[14px] font-medium leading-[1.5] ${
                    submissionState.type === "success"
                      ? "text-[#146224]"
                      : "text-[#b42318]"
                  }`}
                >
                  {submissionState.message}
                </p>
              ) : null}

              <p className="w-full text-left font-[family:var(--font-inter)] text-[11px] font-medium leading-[1.45] text-black/60 lg:h-[63px] lg:text-[12px] lg:leading-[1.5]">
                By clicking &ldquo;Request Information&rdquo;, you agree to be
                contacted by Pixtron LLC and its representatives via phone,
                email, and SMS at the contact details provided, including
                through automated technology. You also agree to our Terms of
                Use and Privacy Policy. Consent is not a condition of purchase.
              </p>
            </div>
          </form>

          <div className="hidden min-w-0 lg:flex lg:flex-row lg:items-center lg:self-stretch">
            <div className="relative h-full w-full min-w-0 flex-1 overflow-hidden rounded-[10px] bg-[#f2f0f1]">
              <Image
                src={heroDesktopImageSrc}
                alt="Restaurant advertising"
                fill
                priority
                sizes="(min-width: 1024px) 529px, 100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto block w-full max-w-[390px] lg:hidden">
          <Image
            src={heroImageSrc}
            alt="Restaurant advertising"
            width={1058}
            height={1130}
            priority
            sizes="100vw"
            className="h-auto w-full rounded-[10px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
