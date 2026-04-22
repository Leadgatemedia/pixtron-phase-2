"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import FooterSection from "../components/FooterSection";
import { sendContactInquiry } from "./emailjs";

type Step = "select" | "restaurant" | "advertiser";
type SubmitState = "idle" | "sending" | "success" | "error";

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
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxSizing: "border-box",
        padding: "16px 39px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1820,
          margin: "0 auto",
          minHeight: 56,
          display: "grid",
          gridTemplateColumns: "480px 1fr 480px",
          alignItems: "center",
          columnGap: 16,
        }}
      >
        <div
          style={{
            width: 480,
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Link
            href="/"
            style={{
              width: "100%",
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Image
              src="/logo.png"
              alt="Pixtron"
              width={82}
              height={82}
              priority
              style={{ width: "auto", height: 52 }}
            />
          </Link>
        </div>

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
      </div>
    </nav>
  );
}

/* ─── Selection view ──────────────────────────────────────────────── */

function SelectionView({ onSelect }: { onSelect: (step: Step) => void }) {
  const [hovered, setHovered] = useState<"restaurant" | "advertiser" | null>(null);

  const cardBase: React.CSSProperties = {
    width: 318,
    background: "#fff",
    borderRadius: 12,
    padding: "30px 28px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "box-shadow 0.2s ease, border-color 0.2s ease, height 0.2s ease",
  };

  const cardNormal: React.CSSProperties = {
    ...cardBase,
    height: 281,
    border: "2px solid rgba(0,0,0,0.02)",
    boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)",
  };

  const cardActive: React.CSSProperties = {
    ...cardBase,
    height: 349,
    border: "2px solid #0f9d58",
    boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
  };

  return (
    <section
      style={{
        paddingTop: 64 + 88,
        paddingBottom: 144,
        paddingInline: 39,
        background: "#fff",
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
          gap: 56,
        }}
      >
        {/* Tag + Headline + Body */}
        <div
          style={{
            width: 1130,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 32,
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
          <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
            <h1
              className="gradient-heading"
              style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2, margin: 0 }}
            >
              Let&apos;s Create Something Remarkable
            </h1>
            <p
              style={{
                fontSize: 22,
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
            width: 666,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 40,
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

          <div style={{ display: "flex", gap: 30, width: "100%" }}>
            {/* Restaurant card */}
            <button
              onClick={() => onSelect("restaurant")}
              onMouseEnter={() => setHovered("restaurant")}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...(hovered === "restaurant" ? cardActive : cardNormal),
                textAlign: "left",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 6,
                  background: hovered === "restaurant" ? "#0f9d58" : "#e5e5e5",
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
                  width={30}
                  height={27}
                  style={{
                    display: "block",
                    filter: hovered === "restaurant" ? "brightness(0) invert(1)" : "none",
                    transition: "filter 0.2s ease",
                  }}
                />
              </div>

              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5, color: "#000", margin: 0 }}>
                  Restaurant
                </p>
                <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000", margin: "12px 0 0", maxWidth: 262 }}>
                  Restaurant, café, hotel, venue, or event organiser looking to enhance guest
                  experience.
                </p>
              </div>

              {/* Arrow — only visible on hover */}
              {hovered === "restaurant" ? (
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
              onClick={() => onSelect("advertiser")}
              onMouseEnter={() => setHovered("advertiser")}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...(hovered === "advertiser" ? cardActive : cardNormal),
                textAlign: "left",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 6,
                  background: hovered === "advertiser" ? "#0f9d58" : "#e5e5e5",
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
                  width={32}
                  height={32}
                  style={{
                    display: "block",
                    filter: hovered === "advertiser" ? "brightness(0) invert(1)" : "none",
                    transition: "filter 0.2s ease",
                  }}
                />
              </div>

              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5, color: "#000", margin: 0 }}>
                  Advertiser
                </p>
                <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.5, color: "#000", margin: "12px 0 0", maxWidth: 262 }}>
                  Brand, Service Provider, or Marketing Team looking for
                  high impact physical advertising.
                </p>
              </div>

              {/* Arrow — only visible on hover */}
              {hovered === "advertiser" ? (
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
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder: string;
  type?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      <label
        style={{
          fontSize: 18,
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
          fontSize: 18,
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
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      <label
        style={{
          fontSize: 18,
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
          height: 88,
          border: "1px solid #000",
          borderRadius: 4,
          padding: "12px 14px",
          fontSize: 18,
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

function RestaurantForm({ onBack }: { onBack: () => void }) {
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
        paddingBottom: 72,
        paddingInline: 387,
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 666,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "flex-start",
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
              borderRadius: 12,
              padding: "16px 20px 16px 16px",
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
          style={{
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#000",
            margin: 0,
          }}
        >
          Tell us about your{" "}
          <span style={{ color: "#0f9d58" }}>restaurant</span>
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
            />
            <InputField
              id="restaurant-email"
              name="email"
              label="Email"
              required
              placeholder="you@company.com"
              type="email"
            />
            <InputField
              id="restaurant-business"
              name="business"
              label="Restaurant Name"
              required
              placeholder="Your restaurant name"
            />
            <TextareaField
              id="restaurant-message"
              name="message"
              label="Note"
              placeholder="Your message"
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
                  fontSize: 18,
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

function AdvertiserForm({ onBack }: { onBack: () => void }) {
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
        paddingBottom: 72,
        paddingInline: 387,
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 666,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "flex-start",
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
              borderRadius: 12,
              padding: "16px 20px 16px 16px",
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
          style={{
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#000",
            margin: 0,
          }}
        >
          Tell us about your{" "}
          <span style={{ color: "#0f9d58" }}>brand</span>
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
            />
            <InputField
              id="advertiser-email"
              name="email"
              label="Email"
              required
              placeholder="you@company.com"
              type="email"
            />
            <InputField
              id="advertiser-business"
              name="business"
              label="Brand Name"
              required
              placeholder="Your brand name"
            />
            <TextareaField
              id="advertiser-message"
              name="message"
              label="Note"
              placeholder="Your message"
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
                  fontSize: 18,
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

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <>
      <SiteNavbar />
      <main style={{ background: "#fff" }}>
        {step === "select" && <SelectionView onSelect={setStep} />}
        {step === "restaurant" && <RestaurantForm onBack={handleBack} />}
        {step === "advertiser" && <AdvertiserForm onBack={handleBack} />}
      </main>
      <FooterSection />
    </>
  );
}
