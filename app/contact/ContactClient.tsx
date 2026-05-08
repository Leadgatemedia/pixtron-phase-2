"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

import FooterSection from "../components/FooterSection";
import MobileHeader from "../components/MobileHeader";
import { sendContactInquiry } from "./emailjs";

type Step = "select" | "restaurant" | "advertiser";
type SubmitState = "idle" | "sending" | "success" | "error";
const MOBILE_CONTENT_MAX = 344;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function getFormFieldValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function ArrowIcon({ color = "dark" }: { color?: "white" | "dark" }) {
  const file = color === "white" ? "/arrow-white.png" : "/arrow-black.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={file}
      width={24}
      height={24}
      alt=""
      className="btn-arrow-img"
      style={{ display: "block", transition: "filter 0.35s ease" }}
    />
  );
}

function SiteNavbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        zIndex: 50,
        width: "100%",
        height: 88,
        background: "rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        backdropFilter: "blur(35px)",
        WebkitBackdropFilter: "blur(35px)",
        boxSizing: "border-box",
        padding: "0 39px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1820,
          margin: "0 auto",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "480px 1fr 480px",
          alignItems: "center",
          columnGap: 16,
        }}
      >
        <div style={{ width: 480, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/logo.png"
              alt="Pixtron"
              width={86}
              height={64}
              priority
              style={{ width: "auto", height: 64 }}
            />
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/restaurants" className="nav-link">Restaurants</Link>
            <Link href="/signature-series" className="nav-link">Signature Series</Link>
            <Link href="/custom-series" className="nav-link">Custom Series</Link>
          </div>
        </div>

        <div
          style={{
            width: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Link
            href="/contact"
            className="btn-outline"
            style={{ minHeight: 56, padding: "0 20px 0 22px", justifyContent: "center" }}
          >
            <span>Contact Us</span>
            <ArrowIcon color="dark" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Selection view ──────────────────────────────────────────────── */

function SelectionView({
  onSelect,
  isMobile,
}: {
  onSelect: (step: Step) => void;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState<"restaurant" | "advertiser" | null>(null);
  const [selected, setSelected] = useState<"restaurant" | "advertiser" | null>(null);
  const routeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (routeTimeoutRef.current) {
        clearTimeout(routeTimeoutRef.current);
      }
    };
  }, []);

  const handleCardSelect = (nextStep: "restaurant" | "advertiser") => {
    if (routeTimeoutRef.current) {
      clearTimeout(routeTimeoutRef.current);
    }

    setSelected(nextStep);
    setHovered(nextStep);
    routeTimeoutRef.current = setTimeout(() => {
      onSelect(nextStep);
    }, isMobile ? 140 : 0);
  };

  const cardBase: React.CSSProperties = {
    background: "#fff",
    borderRadius: isMobile ? 10 : 12,
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? 18 : 28,
    cursor: "pointer",
    transition: "box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease",
    textAlign: "left",
    boxSizing: "border-box",
  };

  const cardNormal: React.CSSProperties = {
    ...cardBase,
    width: isMobile ? undefined : 318,
    flex: isMobile ? "1 1 0" : undefined,
    minWidth: isMobile ? 0 : undefined,
    padding: isMobile ? "14px 12px 18px" : "30px 28px",
    border: isMobile ? "2px solid rgba(0,0,0,0.02)" : "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)",
  };

  const cardActive: React.CSSProperties = {
    ...cardBase,
    width: isMobile ? undefined : 318,
    flex: isMobile ? "1 1 0" : undefined,
    minWidth: isMobile ? 0 : undefined,
    padding: isMobile ? "14px 12px 18px" : "30px 28px",
    border: isMobile ? "2px solid rgba(0,0,0,0.02)" : "2px solid #0f9d58",
    boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
  };

  const iconSize = isMobile ? 28 : 32;
  const iconBoxSize = isMobile ? 46 : 54;
  const restaurantActive = selected === "restaurant" || hovered === "restaurant";
  const advertiserActive = selected === "advertiser" || hovered === "advertiser";
  const mobileSelectorWidth = "100%";

  return (
    <section
      style={{
        paddingTop: 64 + 88,
        paddingBottom: isMobile ? 48 : 144,
        paddingInline: isMobile ? 16 : 39,
        background: isMobile ? "#f5f5f5" : "#fff",
        minHeight: "100vh",
        overflowX: "clip",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? 40 : 56,
        }}
      >
        {/* Tag + Headline + Body */}
        <div
          style={{
            width: "100%",
            maxWidth: isMobile ? MOBILE_CONTENT_MAX : 1130,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 20 : 32,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#0f9d58",
              fontSize: 18,
              fontWeight: 600,
              lineHeight: 1.5,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              margin: 0,
            }}
          >
            Get Started
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 32, width: "100%" }}>
            <h1
              className="gradient-heading"
              style={{ fontSize: isMobile ? 30 : 40, fontWeight: 700, lineHeight: 1.2, margin: 0 }}
            >
              Let&apos;s Create Something Remarkable
            </h1>
            <p
              style={{
                fontSize: isMobile ? 16 : 22,
                fontWeight: 500,
                lineHeight: 1.4,
                color: "rgba(0,0,0,0.5)",
                margin: 0,
              }}
            >
              Whether you&apos;re a hospitality business or an advertiser, we&apos;d love to
              discuss how Pixtron can work for you.
            </p>
          </div>
        </div>

        {/* I am a... + Cards */}
        <div
          style={{
            width: isMobile ? mobileSelectorWidth : "100%",
            maxWidth: isMobile ? 361 : 666,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 24 : 40,
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 24,
              fontWeight: 700,
              lineHeight: "30px",
              color: "#000",
              textAlign: "center",
              margin: 0,
            }}
          >
            I need...
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: isMobile ? 12 : 30,
              width: "100%",
              minWidth: 0,
            }}
          >
            {/* Restaurant card */}
            <button
              onClick={() => handleCardSelect("restaurant")}
              onMouseEnter={() => setHovered("restaurant")}
              onMouseLeave={() => selected !== "restaurant" && setHovered(null)}
              style={restaurantActive ? cardActive : cardNormal}
            >
              <div
                style={{
                  width: iconBoxSize,
                  height: iconBoxSize,
                  borderRadius: 6,
                  background: restaurantActive && !isMobile ? "#0f9d58" : "rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/award-star.svg"
                  alt=""
                  width={iconSize}
                  height={iconSize}
                  style={{
                    display: "block",
                    width: iconSize,
                    height: iconSize,
                    filter: restaurantActive && !isMobile ? "brightness(0) invert(1)" : "none",
                    transition: "filter 0.2s ease",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 0 : 20, width: "100%" }}>
                <p style={{ fontSize: isMobile ? 15 : 20, fontWeight: isMobile ? 600 : 700, lineHeight: 1.5, color: "#000", margin: 0, whiteSpace: isMobile ? "nowrap" : undefined }}>
                  Signature Series
                </p>
                <p style={{ display: isMobile ? "none" : undefined, fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000", margin: 0, maxWidth: 262 }}>
                  Ready to use premium wet wipe sachets with clean, modern designs. Ideal for restaurants that want to elevate guest experience without custom branding or added complexity.
                </p>
              </div>

              {/* Arrow — only visible on hover (desktop only) */}
              {restaurantActive && !isMobile ? (
                <div
                  style={{
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/arrow-forward.svg"
                    alt=""
                    width={24}
                    height={24}
                    style={{ display: "block" }}
                  />
                </div>
              ) : null}
            </button>

            {/* Advertiser card */}
            <button
              onClick={() => handleCardSelect("advertiser")}
              onMouseEnter={() => setHovered("advertiser")}
              onMouseLeave={() => selected !== "advertiser" && setHovered(null)}
              style={advertiserActive ? cardActive : cardNormal}
            >
              <div
                style={{
                  width: iconBoxSize,
                  height: iconBoxSize,
                  borderRadius: 6,
                  background: advertiserActive && !isMobile ? "#0f9d58" : "rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/format-shapes.svg"
                  alt=""
                  width={iconSize}
                  height={iconSize}
                  style={{
                    display: "block",
                    width: iconSize,
                    height: iconSize,
                    filter: advertiserActive && !isMobile ? "brightness(0) invert(1)" : "none",
                    transition: "filter 0.2s ease",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 0 : 20, width: "100%" }}>
                <p style={{ fontSize: isMobile ? 15 : 20, fontWeight: isMobile ? 600 : 700, lineHeight: 1.5, color: "#000", margin: 0, whiteSpace: isMobile ? "nowrap" : undefined }}>
                  Custom Series
                </p>
                <p style={{ display: isMobile ? "none" : undefined, fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000", margin: 0, maxWidth: 262 }}>
                  Fully branded sachets designed for businesses that want to place their logo, message, or campaign directly into real-world customer moments.
                </p>
              </div>

              {/* Arrow — only visible on hover (desktop only) */}
              {advertiserActive && !isMobile ? (
                <div
                  style={{
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/arrow-forward.svg"
                    alt=""
                    width={24}
                    height={24}
                    style={{ display: "block" }}
                  />
                </div>
              ) : null}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Shared form field components ───────────────────────────────── */

function InputField({
  id,
  name,
  label,
  required,
  placeholder,
  type = "text",
  isMobile,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder: string;
  type?: string;
  isMobile?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <label
        style={{
          fontSize: isMobile ? 16 : 18,
          fontWeight: isMobile ? 500 : 400,
          lineHeight: 1.5,
          color: "#000",
          display: "flex",
          gap: 2,
        }}
      >
        {label}
        {required && <span style={{ color: "#e63946" }}>*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          height: 48,
          border: "1px solid #000",
          borderRadius: 4,
          padding: "0 14px",
          fontSize: isMobile ? 16 : 18,
          fontWeight: isMobile ? 500 : 400,
          lineHeight: 1.5,
          color: "#000",
          background: "#fff",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function TextareaField({
  id,
  name,
  label,
  required,
  placeholder,
  isMobile,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder: string;
  isMobile?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <label
        style={{
          fontSize: isMobile ? 16 : 18,
          fontWeight: isMobile ? 500 : 400,
          lineHeight: 1.5,
          color: "#000",
          display: "flex",
          gap: 2,
        }}
      >
        {label}
        {required && <span style={{ color: "#e63946" }}>*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          height: 104,
          border: "1px solid #000",
          borderRadius: 4,
          padding: "16px 14px",
          fontSize: isMobile ? 16 : 18,
          fontWeight: isMobile ? 500 : 400,
          lineHeight: 1.5,
          color: "#000",
          background: "#fff",
          outline: "none",
          resize: "none",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}

/* ─── Restaurant form ─────────────────────────────────────────────── */

function RestaurantForm({ onBack, isMobile }: { onBack: () => void; isMobile: boolean }) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "sending" || isSubmittingRef.current) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = getFormFieldValue(formData, "name");
    const email = getFormFieldValue(formData, "email");
    const phone = getFormFieldValue(formData, "phone");
    const business = getFormFieldValue(formData, "business");
    const message = getFormFieldValue(formData, "message");

    if (!name || !email || !phone || !business) {
      setSubmitState("error");
      setFeedbackMessage("Please complete all required fields before sending.");
      return;
    }

    isSubmittingRef.current = true;
    setSubmitState("sending");
    setFeedbackMessage("");

    try {
      await sendContactInquiry({
        variant: {
          slug: "signature",
          badgeLabel: "Signature Series",
          inquiryLabel: "Signature Series Inquiry",
          titleText: "Signature Series contact form",
          businessFieldLabel: "Restaurant Name",
          clientIntro: "Signature Series wet wipe sachets for your restaurant",
        },
        name,
        email,
        phone,
        business,
        message,
      });

      form.reset();
      setSubmitState("success");
      setFeedbackMessage(
        "Thanks. Your Signature Series inquiry has been sent. We'll be in touch soon. If you don't receive the confirmation in your inbox, feel free to check your spam folder.",
      );
    } catch (error) {
      console.error("EmailJS contact submission failed", error);
      setSubmitState("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "We couldn't send your message right now. Please try again.",
      );
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <section
      style={{
        paddingTop: (isMobile ? 24 : 48) + (isMobile ? 96 : 88),
        paddingBottom: isMobile ? 48 : 144,
        paddingInline: isMobile ? 16 : 387,
        background: isMobile ? "#f5f5f5" : "#fff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? MOBILE_CONTENT_MAX : 666,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 32 : 40,
          alignItems: "stretch",
        }}
      >
        {/* Back + type tag */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start", width: "100%" }}>
          <button
            onClick={onBack}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 1.5,
              color: "#000",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/arrow-back.svg"
              alt=""
              width={24}
              height={24}
              style={{ display: "block" }}
            />
            Back
          </button>

          <div
            style={{
              display: "inline-flex",
              gap: 10,
              alignItems: "center",
              background: "#e0dfdf",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 6,
              justifyContent: isMobile ? "center" : undefined,
              width: isMobile ? "100%" : undefined,
              boxSizing: "border-box",
              padding: isMobile ? "12px 20px 12px 14px" : "16px 20px 16px 16px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/award-star.svg"
              alt=""
              width={24}
              height={24}
              style={{ display: "block" }}
            />
            <span style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000" }}>
              Signature Series
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          className="gradient-heading"
          style={{
            fontSize: isMobile ? 20 : 28,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Tell us about your restaurant
        </h2>

        {/* Form */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <InputField
              id="restaurant-name"
              name="name"
              label="Name"
              required
              placeholder="Your full name"
              isMobile={isMobile}
            />
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24, width: "100%" }}>
              <InputField
                id="restaurant-email"
                name="email"
                label="Email"
                required
                placeholder="you@company.com"
                type="email"
                isMobile={isMobile}
              />
              <InputField
                id="restaurant-phone"
                name="phone"
                label="Phone Number"
                required
                placeholder="(123) 456 7890"
                type="tel"
                isMobile={isMobile}
              />
            </div>
            <InputField
              id="restaurant-business"
              name="business"
              label="Restaurant Name"
              required
              placeholder="Your restaurant name"
              isMobile={isMobile}
            />
            <TextareaField
              id="restaurant-message"
              name="message"
              label="Note"
              placeholder="Your message"
              isMobile={isMobile}
            />
          </div>

          {/* Submit + privacy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              alignItems: "center",
              width: "100%",
            }}
          >
            <button
              type="submit"
              disabled={submitState === "sending"}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "space-between" : "center",
                gap: 12,
                background: "#000",
                color: "#fff",
                border: "2px solid rgba(0,0,0,0.5)",
                borderRadius: 6,
                padding: "16px 20px 16px 22px",
                fontSize: 18,
                fontWeight: 600,
                lineHeight: "30px",
                cursor: submitState === "sending" ? "not-allowed" : "pointer",
                opacity: submitState === "sending" ? 0.85 : 1,
              }}
            >
              <span>{submitState === "sending" ? "Sending..." : "Send Message"}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/arrow-forward.svg"
                alt=""
                width={24}
                height={24}
                style={{ display: "block", filter: "brightness(0) invert(1)" }}
              />
            </button>

            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/lock.svg"
                alt=""
                width={18}
                height={18}
                style={{ display: "block", opacity: 0.6 }}
              />
              <span
                style={{
                  fontSize: isMobile ? 16 : 18,
                  fontWeight: isMobile ? 500 : 400,
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                Your information is secure and confidential.
              </span>
            </div>

            {feedbackMessage ? (
              <p
                aria-live="polite"
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: submitState === "success" ? "#268128" : "#d93b3b",
                  textAlign: "center",
                }}
              >
                {feedbackMessage}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

/* ─── Advertiser form ─────────────────────────────────────────────── */

function AdvertiserForm({ onBack, isMobile }: { onBack: () => void; isMobile: boolean }) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "sending" || isSubmittingRef.current) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = getFormFieldValue(formData, "name");
    const email = getFormFieldValue(formData, "email");
    const phone = getFormFieldValue(formData, "phone");
    const business = getFormFieldValue(formData, "business");
    const message = getFormFieldValue(formData, "message");

    if (!name || !email || !phone || !business) {
      setSubmitState("error");
      setFeedbackMessage("Please complete all required fields before sending.");
      return;
    }

    isSubmittingRef.current = true;
    setSubmitState("sending");
    setFeedbackMessage("");

    try {
      await sendContactInquiry({
        variant: {
          slug: "custom",
          badgeLabel: "Custom Series",
          inquiryLabel: "Custom Series Inquiry",
          titleText: "Custom Series contact form",
          businessFieldLabel: "Business / Brand Name",
          clientIntro: "a Custom Series branded sachet campaign",
        },
        name,
        email,
        phone,
        business,
        message,
      });

      form.reset();
      setSubmitState("success");
      setFeedbackMessage(
        "Thanks. Your Custom Series inquiry has been sent. We'll be in touch soon. If you don't receive the confirmation in your inbox, feel free to check your spam folder.",
      );
    } catch (error) {
      console.error("EmailJS contact submission failed", error);
      setSubmitState("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "We couldn't send your message right now. Please try again.",
      );
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <section
      style={{
        paddingTop: (isMobile ? 24 : 48) + (isMobile ? 96 : 88),
        paddingBottom: isMobile ? 48 : 144,
        paddingInline: isMobile ? 16 : 387,
        background: isMobile ? "#f5f5f5" : "#fff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? MOBILE_CONTENT_MAX : 666,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 32 : 40,
          alignItems: "stretch",
        }}
      >
        {/* Back + type tag */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start", width: "100%" }}>
          <button
            onClick={onBack}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 1.5,
              color: "#000",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/arrow-back.svg"
              alt=""
              width={24}
              height={24}
              style={{ display: "block" }}
            />
            Back
          </button>

          <div
            style={{
              display: "inline-flex",
              gap: 10,
              alignItems: "center",
              background: "#e0dfdf",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 6,
              justifyContent: isMobile ? "center" : undefined,
              width: isMobile ? "100%" : undefined,
              boxSizing: "border-box",
              padding: isMobile ? "12px 20px 12px 14px" : "16px 20px 16px 16px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/format-shapes.svg"
              alt=""
              width={24}
              height={24}
              style={{ display: "block" }}
            />
            <span style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000" }}>
              Custom Series
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          className="gradient-heading"
          style={{
            fontSize: isMobile ? 20 : 28,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Tell us about your brand
        </h2>

        {/* Form */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <InputField
              id="advertiser-name"
              name="name"
              label="Name"
              required
              placeholder="Your full name"
              isMobile={isMobile}
            />
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24, width: "100%" }}>
              <InputField
                id="advertiser-email"
                name="email"
                label="Email"
                required
                placeholder="you@company.com"
                type="email"
                isMobile={isMobile}
              />
              <InputField
                id="advertiser-phone"
                name="phone"
                label="Phone Number"
                required
                placeholder="(123) 456 7890"
                type="tel"
                isMobile={isMobile}
              />
            </div>
            <InputField
              id="advertiser-business"
              name="business"
              label="Business / Brand Name"
              required
              placeholder="Your business or brand name"
              isMobile={isMobile}
            />
            <TextareaField
              id="advertiser-message"
              name="message"
              label="Note"
              placeholder="Your message"
              isMobile={isMobile}
            />
          </div>

          {/* Submit + privacy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              alignItems: "center",
              width: "100%",
            }}
          >
            <button
              type="submit"
              disabled={submitState === "sending"}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "space-between" : "center",
                gap: 12,
                background: "#000",
                color: "#fff",
                border: "2px solid rgba(0,0,0,0.5)",
                borderRadius: 6,
                padding: "16px 20px 16px 22px",
                fontSize: 18,
                fontWeight: 600,
                lineHeight: "30px",
                cursor: submitState === "sending" ? "not-allowed" : "pointer",
                opacity: submitState === "sending" ? 0.85 : 1,
              }}
            >
              <span>{submitState === "sending" ? "Sending..." : "Send Message"}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/arrow-forward.svg"
                alt=""
                width={24}
                height={24}
                style={{ display: "block", filter: "brightness(0) invert(1)" }}
              />
            </button>

            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/lock.svg"
                alt=""
                width={18}
                height={18}
                style={{ display: "block", opacity: 0.6 }}
              />
              <span
                style={{
                  fontSize: isMobile ? 16 : 18,
                  fontWeight: isMobile ? 500 : 400,
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                Your information is secure and confidential.
              </span>
            </div>

            {feedbackMessage ? (
              <p
                aria-live="polite"
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: submitState === "success" ? "#268128" : "#d93b3b",
                  textAlign: "center",
                }}
              >
                {feedbackMessage}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

/* ─── Root client component ───────────────────────────────────────── */

export default function ContactClient({ initialStep = "select" }: { initialStep?: Step }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(initialStep);
  const isMobile = useIsMobile();

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const handleSelect = (nextStep: Step) => {
    if (nextStep === "restaurant") {
      router.push("/contact?type=signature");
      return;
    }

    if (nextStep === "advertiser") {
      router.push("/contact?type=custom");
      return;
    }

    setStep("select");
  };

  const handleBack = () => {
    router.push("/contact");
  };

  return (
    <>
      {isMobile ? <MobileHeader /> : <SiteNavbar />}
      <main style={{ background: isMobile ? "#f5f5f5" : "#fff", overflowX: "clip" }}>
        {step === "select" && <SelectionView onSelect={handleSelect} isMobile={isMobile} />}
        {step === "restaurant" && <RestaurantForm onBack={handleBack} isMobile={isMobile} />}
        {step === "advertiser" && <AdvertiserForm onBack={handleBack} isMobile={isMobile} />}
      </main>
      <FooterSection />
    </>
  );
}
