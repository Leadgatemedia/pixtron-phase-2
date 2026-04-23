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

function SiteNavbar({ isMobile }: { isMobile: boolean }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        zIndex: 50,
        width: "100%",
        height: isMobile ? 96 : 88,
        background: "rgba(255,255,255,0.8)",
        borderBottom: isMobile ? undefined : "1px solid rgba(0,0,0,0.05)",
        backdropFilter: isMobile ? "blur(35px)" : "blur(24px)",
        WebkitBackdropFilter: isMobile ? "blur(35px)" : "blur(24px)",
        boxSizing: "border-box",
        padding: isMobile ? "16px" : "16px 39px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : 1820,
          margin: "0 auto",
          minHeight: isMobile ? 64 : 56,
          display: isMobile ? "flex" : "grid",
          gridTemplateColumns: isMobile ? undefined : "480px 1fr 480px",
          alignItems: "center",
          justifyContent: isMobile ? "space-between" : undefined,
          columnGap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            minHeight: isMobile ? 64 : 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Image
            src="/logo.png"
            alt="Pixtron"
            width={isMobile ? 138 : 82}
            height={isMobile ? 64 : 82}
            priority
            style={{ width: isMobile ? 86 : "auto", height: isMobile ? 64 : 52 }}
          />
        </Link>

        {!isMobile && (
          <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <Link href="/about" className="nav-link">About</Link>
                <div
                  className="nav-product"
                  style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}
                >
                  <Link href="#" className="nav-link">Product</Link>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      className="nav-chevron"
                      d="M4 6l4 4 4-4"
                      stroke="#000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <Link href="#" className="nav-link">Advertisers</Link>
                <Link href="#" className="nav-link">Industries</Link>
                <Link href="#" className="nav-link">Restaurants</Link>
              </div>
            </div>

            <div
              style={{
                width: 480,
                minHeight: 56,
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
          </>
        )}
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
    cursor: "pointer",
    transition: "box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease, height 0.4s ease",
    textAlign: "left",
    boxSizing: "border-box",
  };

  const cardNormal: React.CSSProperties = {
    ...cardBase,
    width: isMobile ? undefined : 318,
    flex: isMobile ? 1 : undefined,
    height: isMobile ? undefined : 281,
    padding: isMobile ? "16px 18px 20px" : "30px 28px",
    border: "2px solid rgba(0,0,0,0.02)",
    boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)",
  };

  const cardActive: React.CSSProperties = {
    ...cardBase,
    width: isMobile ? undefined : 318,
    flex: isMobile ? 1 : undefined,
    height: isMobile ? undefined : 349,
    padding: isMobile ? "16px 18px 20px" : "30px 28px",
    border: isMobile ? "2px solid rgba(0,0,0,0.02)" : "2px solid #0f9d58",
    boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
  };

  const iconSize = isMobile ? 32 : 64;
  const iconBoxSize = isMobile ? 32 : 64;
  const restaurantActive = selected === "restaurant" || hovered === "restaurant";
  const advertiserActive = selected === "advertiser" || hovered === "advertiser";
  const mobileSelectorWidth = "min(361px, calc(100vw / 0.8 - 32px))";

  return (
    <section
      style={{
        paddingTop: 64 + 88,
        paddingBottom: isMobile ? 48 : 144,
        paddingInline: isMobile ? 16 : 39,
        background: isMobile ? "#f5f5f5" : "#fff",
        minHeight: "100vh",
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
            maxWidth: isMobile ? undefined : 666,
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
            I am a...
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: isMobile ? 16 : 30,
              width: "100%",
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
                  background: isMobile ? "transparent" : restaurantActive ? "#0f9d58" : "#e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/contact-restaurant.svg"
                  alt=""
                  width={iconSize}
                  height={iconSize}
                  style={{
                    display: "block",
                    width: isMobile ? 32 : 30,
                    height: isMobile ? 32 : 27,
                    filter: restaurantActive && !isMobile ? "brightness(0) invert(1)" : "none",
                    transition: "filter 0.2s ease",
                  }}
                />
              </div>

              <div style={{ marginTop: isMobile ? 18 : 24 }}>
                <p style={{ fontSize: 20, fontWeight: isMobile ? 500 : 700, lineHeight: 1.5, color: "#000", margin: 0 }}>
                  Restaurant
                </p>
                <p style={{ display: isMobile ? "none" : undefined, fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000", margin: "8px 0 0", maxWidth: 262 }}>
                  Restaurant, café, hotel, venue, or event organiser looking to enhance guest
                  experience.
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
                  background: isMobile ? "transparent" : advertiserActive ? "#0f9d58" : "#e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/contact-advertiser.svg"
                  alt=""
                  width={iconSize}
                  height={iconSize}
                  style={{
                    display: "block",
                    width: 32,
                    height: 32,
                    filter: advertiserActive && !isMobile ? "brightness(0) invert(1)" : "none",
                    transition: "filter 0.2s ease",
                  }}
                />
              </div>

              <div style={{ marginTop: isMobile ? 18 : 24 }}>
                <p style={{ fontSize: 20, fontWeight: isMobile ? 500 : 700, lineHeight: 1.5, color: "#000", margin: 0 }}>
                  Advertiser
                </p>
                <p style={{ display: isMobile ? "none" : undefined, fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000", margin: "8px 0 0", maxWidth: 262 }}>
                  Brand, Service Provider, or Marketing Team looking for
                  high impact physical advertising.
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
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 8, width: "100%" }}>
      <label
        style={{
          fontSize: isMobile ? 16 : 18,
          fontWeight: 400,
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
          fontWeight: 400,
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
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 8, width: "100%" }}>
      <label
        style={{
          fontSize: isMobile ? 16 : 18,
          fontWeight: 400,
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
          height: isMobile ? 104 : 88,
          border: "1px solid #000",
          borderRadius: 4,
          padding: "12px 14px",
          fontSize: isMobile ? 16 : 18,
          fontWeight: 400,
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "sending") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = getFormFieldValue(formData, "name");
    const email = getFormFieldValue(formData, "email");
    const business = getFormFieldValue(formData, "business");
    const message = getFormFieldValue(formData, "message");

    if (!name || !email || !business) {
      setSubmitState("error");
      setFeedbackMessage("Please complete all required fields before sending.");
      return;
    }

    setSubmitState("sending");
    setFeedbackMessage("");

    try {
      await sendContactInquiry({
        variant: {
          slug: "restaurants",
          badgeLabel: "Restaurant",
          inquiryLabel: "Restaurant Inquiry",
          titleText: "Tell us about your restaurant",
          businessFieldLabel: "Restaurant Name",
          clientIntro: "your restaurant and guest experience goals",
        },
        name,
        email,
        business,
        message,
      });

      form.reset();
      setSubmitState("success");
      setFeedbackMessage(
        "Thanks. Your restaurant inquiry has been sent. We'll be in touch soon. If you don't receive the confirmation in your inbox, feel free to check your spam folder.",
      );
    } catch (error) {
      console.error("EmailJS contact submission failed", error);
      setSubmitState("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "We couldn't send your message right now. Please try again.",
      );
    }
  };

  return (
    <section
      style={{
        paddingTop: 24 + 88,
        paddingBottom: isMobile ? 48 : 72,
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
          gap: 24,
          alignItems: "stretch",
        }}
      >
        {/* Back + type tag */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
              borderRadius: isMobile ? 6 : 12,
              padding: isMobile ? "8px 20px 8px 14px" : "16px 20px 16px 16px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/contact-restaurant.svg"
              alt=""
              width={24}
              height={24}
              style={{ display: "block" }}
            />
            <span style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000" }}>
              Restaurant
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          className={isMobile ? "gradient-heading" : undefined}
          style={{
            fontSize: isMobile ? 20 : 28,
            fontWeight: 700,
            lineHeight: 1.2,
            color: isMobile ? undefined : "#000",
            margin: 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Tell us about your{" "}
          {isMobile ? (
            "restaurant"
          ) : (
            <span style={{ color: "#0f9d58" }}>restaurant</span>
          )}
        </h2>

        {/* Form */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <InputField
              id="restaurant-name"
              name="name"
              label="Name"
              required
              placeholder="Your full name"
              isMobile={isMobile}
            />
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
              gap: 16,
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
                justifyContent: "center",
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
              <div style={{ transform: "rotate(-90deg)", display: "flex" }}>
                <ArrowIcon color="white" />
              </div>
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
                  fontSize: isMobile ? 14 : 18,
                  fontWeight: 400,
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "sending") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = getFormFieldValue(formData, "name");
    const email = getFormFieldValue(formData, "email");
    const business = getFormFieldValue(formData, "business");
    const message = getFormFieldValue(formData, "message");

    if (!name || !email || !business) {
      setSubmitState("error");
      setFeedbackMessage("Please complete all required fields before sending.");
      return;
    }

    setSubmitState("sending");
    setFeedbackMessage("");

    try {
      await sendContactInquiry({
        variant: {
          slug: "advertiser-brand",
          badgeLabel: "Advertiser / Brand",
          inquiryLabel: "Advertiser / Brand Inquiry",
          titleText: "Tell us about your brand",
          businessFieldLabel: "Brand Name",
          clientIntro: "your brand, campaign goals, and advertising objectives",
        },
        name,
        email,
        business,
        message,
      });

      form.reset();
      setSubmitState("success");
      setFeedbackMessage(
        "Thanks. Your advertiser inquiry has been sent. We'll be in touch soon. If you don't receive the confirmation in your inbox, feel free to check your spam folder.",
      );
    } catch (error) {
      console.error("EmailJS contact submission failed", error);
      setSubmitState("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "We couldn't send your message right now. Please try again.",
      );
    }
  };

  return (
    <section
      style={{
        paddingTop: 24 + 88,
        paddingBottom: isMobile ? 48 : 72,
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
          gap: 24,
          alignItems: "stretch",
        }}
      >
        {/* Back + type tag */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
              borderRadius: isMobile ? 6 : 12,
              padding: isMobile ? "8px 20px 8px 14px" : "16px 20px 16px 16px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/contact-advertiser.svg"
              alt=""
              width={24}
              height={24}
              style={{ display: "block" }}
            />
            <span style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000" }}>
              Advertiser / Brand
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          className={isMobile ? "gradient-heading" : undefined}
          style={{
            fontSize: isMobile ? 20 : 28,
            fontWeight: 700,
            lineHeight: 1.2,
            color: isMobile ? undefined : "#000",
            margin: 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Tell us about your{" "}
          {isMobile ? (
            "brand"
          ) : (
            <span style={{ color: "#0f9d58" }}>brand</span>
          )}
        </h2>

        {/* Form */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <InputField
              id="advertiser-name"
              name="name"
              label="Name"
              required
              placeholder="Your full name"
              isMobile={isMobile}
            />
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
              id="advertiser-business"
              name="business"
              label="Brand Name"
              required
              placeholder="Your brand name"
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
              gap: 16,
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
                justifyContent: "center",
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
              <div style={{ transform: "rotate(-90deg)", display: "flex" }}>
                <ArrowIcon color="white" />
              </div>
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
                  fontSize: isMobile ? 14 : 18,
                  fontWeight: 400,
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
      router.push("/contact?type=restaurant");
      return;
    }

    if (nextStep === "advertiser") {
      router.push("/contact?type=advertiser");
      return;
    }

    setStep("select");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <>
      {isMobile ? <MobileHeader /> : <SiteNavbar isMobile={isMobile} />}
      <main style={{ background: isMobile ? "#f5f5f5" : "#fff" }}>
        {step === "select" && <SelectionView onSelect={handleSelect} isMobile={isMobile} />}
        {step === "restaurant" && <RestaurantForm onBack={handleBack} isMobile={isMobile} />}
        {step === "advertiser" && <AdvertiserForm onBack={handleBack} isMobile={isMobile} />}
      </main>
      <FooterSection />
    </>
  );
}
