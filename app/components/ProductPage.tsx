/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";

import BottomBlurController from "./BottomBlurController";
import FooterSection from "./FooterSection";
import HeroScrollSection from "./HeroScrollSection";
import HomeMidCtaSection from "./HomeMidCtaSection";
import MobileHeader from "./MobileHeader";
import ProductPageHeader from "./ProductPageHeader";
import JourneyScrollSection from "./JourneyScrollSection";
import MobileHomeHero from "./MobileHomeHero";
import MobileRealImpactSection from "./MobileRealImpactSection";
import RealImpactScroll from "./RealImpactScroll";
import styles from "./ProductPage.module.css";

type HighlightHeading = {
  before: string;
  highlight: string;
  after?: string;
};

type ButtonConfig = {
  label: string;
  href: string;
  variant?: "primary" | "outline";
};

type RestaurantPageConfig = {
  kind: "restaurant";
  activeHref: string;
  hero: {
    titleBefore: string;
    titleHighlight: string;
    body: string;
    image: string;
    mobileImage?: string;
    button: ButtonConfig;
  };
  stats: Array<{
    count: string;
    title: string;
    body: string;
  }>;
  premium: {
    heading: HighlightHeading;
    rows: ValueRow[];
  };
  featureBlocks: RestaurantFeatureBlock[];
  impact: ImpactStack;
  timeline: TimelineSection;
  faqs: FaqItem[];
};

type SeriesPageConfig = {
  kind: "signature" | "custom";
  activeHref: string;
  hero:
    | {
        type: "sachets";
        title: HighlightHeading;
        body: string;
        button: ButtonConfig;
        sachetStrip: string;
      }
    | {
        type: "dual";
        image: string;
        title: string;
        body: string;
      };
  products: ProductShowcase;
  values: {
    heading: HighlightHeading;
    rows: ValueRow[];
  };
  timeline: TimelineSection;
  setting?: SettingSection;
  remembered?: RememberedSection;
};

type ProductPageConfig = RestaurantPageConfig | SeriesPageConfig;

type ValueRow = {
  icon: "sparkle" | "shield" | "leaf" | "flame";
  title: string;
  body: string;
};

type RestaurantFeatureBlock = {
  eyebrow: string;
  title: HighlightHeading;
  body: string;
  button: ButtonConfig;
  visual: "checklist" | "chart";
};

type ImpactStack = {
  title: string;
  body: string;
  button: ButtonConfig;
  items: Array<{
    result: string;
    label: string;
    text: React.ReactNode;
  }>;
};

type TimelineSection = {
  title: string;
  body?: string;
  button?: ButtonConfig;
  progressHeight: number;
  steps: Array<{
    step: string;
    title: string;
    body: string;
  }>;
};

type FaqItem = {
  question: string;
  answer?: string;
};

type ProductShowcase = {
  eyebrow: string;
  title: React.ReactNode;
  buttonLabel: string;
  buttonHref: string;
  buttonWidth?: number;
  items: Array<{
    title: string;
    body: string;
    image: string;
    imageAlt: string;
    imageCrop?: "lavender";
  }>;
};

type SettingSection = {
  image: string;
  title: HighlightHeading;
  body: string;
};

type RememberedSection = {
  heading: HighlightHeading;
  items: Array<{
    title: string;
    body: string;
  }>;
};

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Signature Series", href: "/signature-series" },
  { label: "Custom Series", href: "/custom-series" },
];

const VALUE_ROWS: ValueRow[] = [
  {
    icon: "sparkle",
    title: "Premium Experience",
    body: "Soft, high quality wipes designed to elevate the dining experience and leave a refined impression on every guest.",
  },
  {
    icon: "shield",
    title: "Thoughtful Design",
    body: "Carefully crafted sachets with clean, modern aesthetics that complement your table setting and overall ambiance.",
  },
  {
    icon: "leaf",
    title: "Seamless Integration",
    body: "Ready to place and serve with no change to your workflow and fits naturally into your daily service routine.",
  },
  {
    icon: "flame",
    title: "Consistent Quality",
    body: "Reliable, premium quality wipes that deliver the same clean, refreshing experience every time.",
  },
];

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "First Impression",
    body: "Placed intentionally on the table or handed directly by staff, your brand is the first thing they see as they settle in.",
  },
  {
    step: "02",
    title: "The Pickup",
    body: "The weight, the matte finish, the premium feel tactile engagement begins before the package is even opened.",
  },
  {
    step: "03",
    title: "The Opening",
    body: "A smooth, effortless tear reveals the fresh, thick bamboo wipe inside, releasing the subtle signature scent.",
  },
  {
    step: "04",
    title: "The Refresh",
    body: "A moment of pure utility. The cooling wipe cleanses and refreshes, creating a positive physiological association.",
  },
  {
    step: "05",
    title: "The Memory",
    body: "The interaction ends, but the brand association persists. Positive, physical, and profoundly memorable.",
  },
];

const PRODUCT_PAGE_ASSETS = "/product-pages";
const SIGNATURE_HERO_WATERMARK_TOP = "min(89vh, 769px)";
const SIGNATURE_HERO_SACHET_TOP = `calc(${SIGNATURE_HERO_WATERMARK_TOP} - 24px)`;

export const RESTAURANTS_PAGE: RestaurantPageConfig = {
  kind: "restaurant",
  activeHref: "/restaurants",
  hero: {
    titleBefore: "Upgrade Your",
    titleHighlight: "Dining Experience",
    body: "Elevate guest satisfaction with premium wet wipe sachets designed to enhance every dining moment with a refined, consistent experience.",
    image: `${PRODUCT_PAGE_ASSETS}/restaurant-hero.jpg`,
    mobileImage: `${PRODUCT_PAGE_ASSETS}/restaurant-hero-mobile.png`,
    button: { label: "Get Signature Series", href: "/signature-series", variant: "primary" },
  },
  stats: [
    {
      count: "01",
      title: "Higher Expectations",
      body: "Guests expect a premium, thoughtful experience at every touchpoint.",
    },
    {
      count: "02",
      title: "Budget Constraints",
      body: "Upgrading the guest experience often feels like an added cost.",
    },
    {
      count: "03",
      title: "No Extra Time",
      body: "Your team needs solutions that integrate seamlessly into daily service.",
    },
  ],
  premium: {
    heading: { before: "A Premium Touch", highlight: "for every table." },
    rows: VALUE_ROWS,
  },
  featureBlocks: [
    {
      eyebrow: "Signature Series",
      title: { before: "Premium Quality", highlight: "for Every Table" },
      body: "Upgrade your guest experience with ready to use premium wet wipe sachets. Designed for modern hospitality, each piece delivers a clean, refined touch without adding complexity to your service.",
      button: { label: "Get Signature Series", href: "/signature-series", variant: "outline" },
      visual: "checklist",
    },
    {
      eyebrow: "Consistent Experience",
      title: { before: "A Small Detail That Makes", highlight: "a Big Difference" },
      body: "From the first impression to the final touch, premium details shape how guests remember your space. Signature Series adds a subtle but impactful layer to your overall dining experience.",
      button: { label: "Get Signature Series", href: "/signature-series", variant: "outline" },
      visual: "chart",
    },
  ],
  impact: {
    title: "Real Impact, Real Results",
    body: "Premium details that elevate guest satisfaction and dining perception",
    button: { label: "Get Signature Series", href: "/signature-series", variant: "primary" },
    items: [
      {
        result: "100%",
        label: "Ready to Serve",
        text: (
          <>
            No setup, No preparation
            <br />
            <strong>simply place &amp; serve</strong>
          </>
        ),
      },
      {
        result: "0",
        label: "Extra Staff Effort",
        text: (
          <>
            <strong>Fits seamlessly</strong>
            <br />
            into your existing service flow
          </>
        ),
      },
      {
        result: "Consistent",
        label: "Every Time",
        text: (
          <>
            <strong>Uniform quality and experience </strong>
            for every guest
          </>
        ),
      },
      {
        result: "Premium",
        label: "by Design",
        text: (
          <>
            Crafted to match modern
            <br />
            <strong>hospitality standards</strong>
          </>
        ),
      },
    ],
  },
  timeline: {
    title: "How Pixtron Works",
    button: { label: "Get Signature Series", href: "/signature-series", variant: "primary" },
    progressHeight: 199,
    steps: [
      {
        step: "01",
        title: "Choose Your Signature",
        body: "Select from our curated Signature Series designs that match your restaurant's style and ambiance.",
      },
      {
        step: "02",
        title: "We Deliver to You",
        body: "We handle production and supply, ensuring consistent quality and reliable delivery to your venue.",
      },
      {
        step: "03",
        title: "Serve with Ease",
        body: "Your staff simply places the sachets during service, no extra training, no workflow changes.",
      },
    ],
  },
  faqs: [
    {
      question: "What is the Signature Series?",
      answer:
        "Signature Series is a collection of ready-to-use premium wet wipe sachets with clean, modern designs. They are designed to enhance guest experience without requiring any custom branding.",
    },
    {
      question: "Do I need to customize anything?",
      answer:
        "No. Signature Series comes with pre-designed sachets, so you can start using them immediately without any setup or design work.",
    },
    {
      question: "How does this fit into my service?",
      answer:
        "It integrates seamlessly. Your staff simply places the sachets during service - no additional training or workflow changes required.",
    },
    {
      question: "How often do you deliver?",
      answer:
        "We provide consistent and reliable supply based on your usage needs, ensuring you never run out during service.",
    },
    {
      question: "Is this suitable for all types of restaurants?",
      answer:
        "Yes. Signature Series is designed to complement a wide range of dining environments, from casual cafes to premium hospitality spaces.",
    },
    {
      question: "What makes these wipes different from regular ones?",
      answer:
        "Pixtron wipes are designed with a premium, cloth-like feel and refined presentation, offering a noticeably better experience than standard wipes.",
    },
    {
      question: "Can I upgrade to custom branding later?",
      answer:
        "Yes. If you decide to create your own branded sachets, you can upgrade to our Custom Series at any time.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply choose your preferred Signature Series option and place your order. Our team will handle the rest.",
    },
  ],
};

export const SIGNATURE_SERIES_PAGE: SeriesPageConfig = {
  kind: "signature",
  activeHref: "/signature-series",
  hero: {
    type: "sachets",
    title: { before: "Our", highlight: "Signature Series" },
    button: { label: "Get Signature Series", href: "/contact?type=signature", variant: "primary" },
    body: "Pixtron places your brand in the hands of customers through custom wet wipe sachets at restaurants, hotels, and events.",
    sachetStrip: `${PRODUCT_PAGE_ASSETS}/signature-sachets-strip.png`,
  },
  products: {
    eyebrow: "Crafted for Experience",
    title: (
      <>
        We design for the senses. Every interaction should feel{" "}
        <em>refreshing, premium, and intentional.</em>
      </>
    ),
    buttonLabel: "Get This Now",
    buttonHref: "/contact?type=signature",
    buttonWidth: 200,
    items: [
      {
        title: "Green Tea",
        body: "Smooth and balanced. A calm, refreshing aroma with soft herbal tones that bring a sense of harmony and quiet sophistication.",
        image: `${PRODUCT_PAGE_ASSETS}/signature-green-tea.png`,
        imageAlt: "Green Tea Signature Series wet wipe sachet",
      },
      {
        title: "Mandarin",
        body: "Bright, lively, and full of energy. A fresh citrus note that uplifts the mood and leaves a cheerful impression.",
        image: `${PRODUCT_PAGE_ASSETS}/signature-mandarin.png`,
        imageAlt: "Mandarin Signature Series wet wipe sachet",
      },
      {
        title: "Ocean Breeze",
        body: "A cool, refreshing scent that captures the feeling of a gentle sea breeze, crisp, clean, and effortlessly revitalizing.",
        image: `${PRODUCT_PAGE_ASSETS}/signature-ocean-breeze.png`,
        imageAlt: "Ocean Breeze Signature Series wet wipe sachet",
      },
      {
        title: "Pure Clean",
        body: "Pure and timeless. A subtle, comforting scent that feels fresh, balanced, and effortlessly clean.",
        image: `${PRODUCT_PAGE_ASSETS}/signature-pure-clean.png`,
        imageAlt: "Pure Clean Signature Series wet wipe sachet",
      },
      {
        title: "Pink Floral",
        body: "Delicate and graceful. A tender floral fragrance that adds a soft, elegant touch to every experience.",
        image: `${PRODUCT_PAGE_ASSETS}/signature-pink-floral.png`,
        imageAlt: "Pink Floral Signature Series wet wipe sachet",
      },
    ],
  },
  values: {
    heading: { before: "Quality without", highlight: "compromise" },
    rows: VALUE_ROWS,
  },
  timeline: {
    title: "The Journey",
    body: "How a simple hospitality item becomes a memorable brand touchpoint.",
    button: { label: "Get Signature Series", href: "/contact?type=signature", variant: "primary" },
    progressHeight: 300,
    steps: JOURNEY_STEPS,
  },
};

export const CUSTOM_SERIES_PAGE: SeriesPageConfig = {
  kind: "custom",
  activeHref: "/custom-series",
  hero: {
    type: "dual",
    image: `${PRODUCT_PAGE_ASSETS}/custom-dual-sided.jpg`,
    title: "Dual Sided Impact",
    body: "A 360-degree canvas. Tell a complete story without saying a word",
  },
  products: {
    eyebrow: "Crafted for Experience",
    title: (
      <>
        We design for the senses. Every interaction should feel{" "}
        <em>refreshing, premium, and intentional.</em>
      </>
    ),
    buttonLabel: "Get Custom Series",
    buttonHref: "/contact?type=custom",
    buttonWidth: 244,
    items: [
      {
        title: "The Perfect Touch",
        body: "Our wipes are crafted from ultra-soft, biodegradable bamboo cotton. They carry substantial weight and density, elevating a simple hygiene necessity into a moment of pure comfort.",
        image: `${PRODUCT_PAGE_ASSETS}/custom-perfect-touch.jpg`,
        imageAlt: "A folded Pixtron wet towel on a green surface",
      },
      {
        title: "The Signature Scent",
        body: "Infused with a subtle, refreshing citrus-aloe fragrance that invigorates without overpowering the dining experience. A scent designed specifically to cleanse the palate.",
        image: `${PRODUCT_PAGE_ASSETS}/custom-signature-scent.jpg`,
        imageAlt: "Lavender fragrance ingredients for Pixtron wet wipes",
        imageCrop: "lavender",
      },
    ],
  },
  values: {
    heading: { before: "Quality without", highlight: "compromise" },
    rows: VALUE_ROWS,
  },
  timeline: {
    title: "The Journey",
    body: "How a simple hospitality item becomes a memorable brand touchpoint.",
    button: { label: "Get Custom Series", href: "/contact?type=custom", variant: "primary" },
    progressHeight: 300,
    steps: JOURNEY_STEPS,
  },
  setting: {
    image: `${PRODUCT_PAGE_ASSETS}/custom-setting.jpg`,
    title: { before: "At home in any", highlight: "premium setting" },
    body: "Designed to complement, never clash. The minimal form factor seamlessly integrates into fine dining, premium casual, and high-end hospitality environments.",
  },
  remembered: {
    heading: { before: "Seen. Touched.", highlight: "Remembered." },
    items: [
      {
        title: "100% Viewability",
        body: "No ad blockers, no scrolling past, no skipped videos. Placed directly in their physical line of sight.",
      },
      {
        title: "Tactile Engagement",
        body: "The physical act of touching and opening the product creates stronger memory encoding than digital impressions.",
      },
      {
        title: "High Dwell Time",
        body: "Present throughout an average 45-90 minute dining experience, offering continuous, non-intrusive exposure.",
      },
    ],
  },
};

function ArrowIcon({ white = false }: { white?: boolean }) {
  return (
    <img
      src={white ? "/arrow-white.webp" : "/arrow-black.webp"}
      width={24}
      height={24}
      alt=""
      className="btn-arrow-img"
    />
  );
}

function ProductButton({ button, width }: { button: ButtonConfig; width?: number }) {
  const variant = button.variant ?? "outline";

  return (
    <Link
      href={button.href}
      className={`${variant === "primary" ? "btn-primary" : "btn-outline"} ${styles.pageButton}`}
      style={width ? { width } : undefined}
    >
      <span>{button.label}</span>
      <ArrowIcon white={variant === "primary"} />
    </Link>
  );
}

function SiteHeader({ activeHref }: { activeHref: string }) {
  return (
    <>
      <div className={styles.desktopHeaderWrap}>
        <nav
          className={`${styles.desktopHeader} desktop-scroll-header`}
          style={{
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className={styles.desktopHeaderInner}>
            <Link href="/" className={styles.logoLink} aria-label="Pixtron home">
              <Image
                src="/logo.webp"
                alt="Pixtron"
                width={86}
                height={64}
                priority
                className={styles.logo}
              />
            </Link>

            <div className={styles.navLinks}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  style={item.href === activeHref ? { color: "#0f9d58" } : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className={styles.headerCta}>
              <Link href="/contact" className="btn-outline" style={{ minHeight: 56, padding: "0 20px 0 22px" }}>
                <span>Contact Us</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className={styles.mobileHeaderWrap}>
        <MobileHeader />
      </div>
    </>
  );
}

function HighlightHeadingView({
  heading,
  className,
}: {
  heading: HighlightHeading;
  className?: string;
}) {
  return (
    <h2 className={`${styles.highlightHeading} ${className ?? ""}`}>
      <span>{heading.before}</span>
      <em>
        {heading.highlight}
        {heading.after ? ` ${heading.after}` : ""}
      </em>
    </h2>
  );
}

function PageShell({ config, children }: { config: ProductPageConfig; children: React.ReactNode }) {
  return (
    <>
      <ProductPageHeader activeHref={config.activeHref} darkHero={config.kind === "custom"} />
      {config.kind === "custom" ? <BottomBlurController hiddenUntilY={80} desktopOnly /> : null}
      {config.kind === "restaurant" ? (
        <BottomBlurController hiddenUntilY={-1} desktopOnly />
      ) : null}
      <div className={styles.pageRoot}>
        <main className={styles.mainContent}>{children}</main>
        <div data-scroll-assist-section>
          <HomeMidCtaSection />
        </div>
        <div data-scroll-assist-section>
          <FooterSection />
        </div>
      </div>
    </>
  );
}

function RestaurantHero({ config }: { config: RestaurantPageConfig["hero"] }) {
  const heroImage = config.mobileImage ?? config.image;

  return (
    <section
      className={styles.restaurantHero}
      data-scroll-assist-section
      data-scroll-assist-skip-prev="true"
      data-scroll-assist-skip-next="true"
    >
      <div className={styles.restaurantHeroCopy}>
        <h1>
          <span>{config.titleBefore}</span>
          <em>{config.titleHighlight}</em>
        </h1>
        <p>{config.body}</p>
        <ProductButton button={config.button} width={260} />
      </div>
      <div className={styles.restaurantHeroImage}>
        <picture>
          {config.mobileImage ? <source media="(max-width: 767px)" srcSet={config.mobileImage} /> : null}
          <img src={heroImage} alt="A guest opening a Pixtron wipe sachet at a restaurant table" />
        </picture>
      </div>
    </section>
  );
}

function StatsSection({ stats }: { stats: RestaurantPageConfig["stats"] }) {
  return (
    <section
      className={styles.statsSection}
      data-scroll-assist-section
      data-scroll-assist-skip-prev="true"
      data-scroll-assist-skip-next="true"
    >
      {stats.map((item) => (
        <article key={item.count} className={styles.statCard}>
          <div>
            <span className={styles.statCount}>{item.count}</span>
            <h2>{item.title}</h2>
          </div>
          <span className={styles.statDivider} aria-hidden />
          <p>{item.body}</p>
        </article>
      ))}
    </section>
  );
}

function ValueIcon({ icon }: { icon: ValueRow["icon"] }) {
  const sources: Record<ValueRow["icon"], string> = {
    sparkle: "/icons/value-premium-experience.svg",
    shield: "/icons/value-thoughtful-design.svg",
    leaf: "/icons/value-seamless-integration.svg",
    flame: "/icons/value-consistent-quality.svg",
  };

  return (
    <span className={styles.valueIcon} aria-hidden>
      <img src={sources[icon]} alt="" />
    </span>
  );
}

function ValueSection({ heading, rows }: { heading: HighlightHeading; rows: ValueRow[] }) {
  return (
    <section className={styles.valueSection} data-scroll-assist-section>
      <div className={styles.valueTitleBand}>
        <HighlightHeadingView heading={heading} />
      </div>
      <div className={styles.valueRows}>
        {rows.map((row) => (
          <article key={row.title} className={styles.valueRow}>
            <div className={styles.valueRowTitle}>
              <ValueIcon icon={row.icon} />
              <h3>{row.title}</h3>
            </div>
            <p>{row.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ChecklistVisual() {
  const items = [
    ["Premium Wipes Supply", "Consistent, high-quality wipes for everyday service"],
    ["Signature Designs", "Clean, modern designs that fit any dining environment"],
    ["Reliable Delivery", "Regular supply to keep your service uninterrupted"],
  ];

  return (
    <div className={styles.checklistVisual}>
      <div className={styles.checklistCard}>
        <h3>What You Get</h3>
        <div className={styles.checklistItems}>
          {items.map(([title, body]) => (
            <div key={title}>
              <div className={styles.checkItemTitle}>
                <img src="/icons/check-circle-unread.svg" alt="" aria-hidden />
                <strong>{title}</strong>
              </div>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartVisual() {
  return (
    <div className={styles.chartVisual}>
      <div className={styles.chartCard}>
        <div className={styles.chartIcon} aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 19H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 15L12 11L15 13L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3>Experience Upgrade</h3>
        <div className={styles.chartBars} aria-hidden>
          <span />
          <span />
          <span />
          <span>
            <b>100%</b>
          </span>
        </div>
        <div className={styles.chartWeeks}>
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
        </div>
      </div>
    </div>
  );
}

function RestaurantFeatureSections({ blocks }: { blocks: RestaurantFeatureBlock[] }) {
  return (
    <section className={styles.restaurantFeatureSection} data-scroll-assist-section>
      {blocks.map((block, index) => (
        <article key={block.eyebrow} className={`${styles.restaurantFeatureBlock} ${index % 2 === 1 ? styles.reversedFeatureBlock : ""}`}>
          <div className={styles.featureCopy}>
            <p>{block.eyebrow}</p>
            <HighlightHeadingView heading={block.title} className={styles.featureHeading} />
            <span>{block.body}</span>
            <ProductButton button={block.button} width={259} />
          </div>
          {block.visual === "checklist" ? <ChecklistVisual /> : <ChartVisual />}
        </article>
      ))}
    </section>
  );
}

function ImpactSection({ impact }: { impact: ImpactStack }) {
  return (
    <section className={styles.impactSection}>
      <div className={styles.sectionIntro}>
        <h2>{impact.title}</h2>
        <p>{impact.body}</p>
      </div>
      <div className={styles.impactStack}>
        {impact.items.map((item, index) => (
          <article key={item.label} className={styles.impactCard} style={{ "--index": index } as React.CSSProperties}>
            <div>
              <strong>{item.result}</strong>
              <span>{item.label}</span>
            </div>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <ProductButton button={impact.button} width={259} />
    </section>
  );
}

function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className={styles.faqSection} data-scroll-assist-section>
      <h2>FAQs</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <details key={faq.question} className={styles.faqItem}>
            <summary>
              <span>{faq.question}</span>
              <span aria-hidden>{index === 0 ? "−" : "+"}</span>
            </summary>
            {faq.answer ? <p>{faq.answer}</p> : null}
          </details>
        ))}
      </div>
    </section>
  );
}

function SignatureHero({ hero }: { hero: Extract<SeriesPageConfig["hero"], { type: "sachets" }> }) {
  return (
    <>
      <div className={styles.signatureDesktopHero} data-scroll-assist-section>
        <HeroScrollSection
          stripImage={hero.sachetStrip}
          stripWidth={1280}
          stripTop={SIGNATURE_HERO_SACHET_TOP}
          finalAlign="center"
          watermarkSelector=".signature-hero-watermark"
          waitForIntro={false}
          stageWidth={1920}
          stageHeight={864}
        >
          <section className={styles.signatureAnimatedHero}>
            <div className={styles.signatureAnimatedContent}>
              <h1>
                {hero.title.before} <span>{hero.title.highlight}</span>
              </h1>
              <div className={styles.signatureAnimatedButton}>
                <ProductButton button={hero.button} width={260} />
              </div>
              <p>{hero.body}</p>
            </div>

            <div className={`signature-hero-watermark ${styles.signatureAnimatedWatermark}`} aria-hidden>
              {["SEEN", "TOUCHED", "REMEMBERED"].map((word) => (
                <div key={word}>{word}</div>
              ))}
            </div>
          </section>
        </HeroScrollSection>
      </div>
      <MobileHomeHero
        stripImage={hero.sachetStrip}
        stripWidth={940}
        finalAlign="center"
        headlineBefore={hero.title.before}
        headlineHighlight={hero.title.highlight}
        body={hero.body}
        primaryButton={hero.button}
        secondaryButton={null}
        paddingTop={56}
        useIntroReveal={false}
      />
    </>
  );
}

function CustomHero({ hero }: { hero: Extract<SeriesPageConfig["hero"], { type: "dual" }> }) {
  return (
    <section className={styles.customHero} data-scroll-assist-section>
      <div className={styles.customGlow} aria-hidden />
      <div className={styles.customHeroInner}>
        <div className={styles.customHeroIntro}>
          <h1>{hero.title}</h1>
          <p>{hero.body}</p>
        </div>
        <div className={styles.dualRows}>
          <div className={styles.dualRow}>
            <div className={styles.dualCopy}>
              <span>The Front</span>
              <h2>The Hook</h2>
              <p>Your primary visual real estate. High resolution edge to edge printing designed to capture immediate attention the moment they sit down.</p>
            </div>
            <div className={styles.dualImageTop}>
              <img src={hero.image} alt="Front side custom Pixtron sachet design" />
            </div>
          </div>
          <div className={`${styles.dualRow} ${styles.dualRowBack}`}>
            <div className={styles.dualImageBottom}>
              <img src={hero.image} alt="Back side custom Pixtron sachet design" />
            </div>
            <div className={styles.dualCopy}>
              <span>The Back</span>
              <h2>The Action</h2>
              <p>The perfect space for deeper engagement. Include QR codes, exclusive offers, location details, or a compelling call-to-action.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductShowcaseSection({ showcase, variant }: { showcase: ProductShowcase; variant?: "signature" | "custom" }) {
  return (
    <section
      data-scroll-assist-section
      className={`${styles.productShowcase} ${variant === "signature" ? styles.signatureProductShowcase : ""} ${
        variant === "custom" ? styles.customProductShowcase : ""
      }`}
    >
      <div className={styles.showcaseTop}>
        <div className={styles.eyebrowLine}>
          <span aria-hidden>
            <svg width="59" height="16" viewBox="0 0 59 16" fill="none" aria-hidden>
              <path d="M59 6.5C59 6.83333 59 7.16667 59 7.5C58.0167 7.49167 57.0333 7.48333 56.05 7.475C38.35 7.325 20.65 7.175 2.95 7.025C1.96667 7.01667 0.98333 7.00833 0 7C0.98333 6.99167 1.96667 6.98333 2.95 6.975C20.65 6.825 38.35 6.675 56.05 6.525C57.0333 6.51667 58.0167 6.50833 59 6.5Z" fill="#0F9D58" />
            </svg>
          </span>
          <p>{showcase.eyebrow}</p>
          <span aria-hidden style={{ transform: "scaleX(-1)" }}>
            <svg width="59" height="16" viewBox="0 0 59 16" fill="none" aria-hidden>
              <path d="M59 6.5C59 6.83333 59 7.16667 59 7.5C58.0167 7.49167 57.0333 7.48333 56.05 7.475C38.35 7.325 20.65 7.175 2.95 7.025C1.96667 7.01667 0.98333 7.00833 0 7C0.98333 6.99167 1.96667 6.98333 2.95 6.975C20.65 6.825 38.35 6.675 56.05 6.525C57.0333 6.51667 58.0167 6.50833 59 6.5Z" fill="#0F9D58" />
            </svg>
          </span>
        </div>
        <h2>{showcase.title}</h2>
      </div>
      <div className={styles.productRows}>
        {showcase.items.map((item, index) => (
          <article key={item.title} className={`${styles.productRow} ${index % 2 === 1 ? styles.productRowReversed : ""}`}>
            <div className={`${styles.productImage} ${item.imageCrop === "lavender" ? styles.productImageLavender : ""}`}>
              <img src={item.image} alt={item.imageAlt} />
            </div>
            <div className={styles.productCopy}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <ProductButton
                button={{ label: showcase.buttonLabel, href: showcase.buttonHref, variant: "outline" }}
                width={showcase.buttonWidth}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SettingSectionView({ section }: { section: SettingSection }) {
  return (
    <section className={styles.settingSection} data-scroll-assist-section>
      <img src={section.image} alt="Premium restaurant interior setting" />
      <div>
        <HighlightHeadingView heading={section.title} className={styles.settingHeading} />
        <p>{section.body}</p>
      </div>
    </section>
  );
}

function RememberedSectionView({ section }: { section: RememberedSection }) {
  return (
    <section className={styles.rememberedSection} data-scroll-assist-section>
      <HighlightHeadingView heading={section.heading} />
      <div className={styles.rememberedGrid}>
        {section.items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RestaurantsPage({ config }: { config: RestaurantPageConfig }) {
  return (
    <PageShell config={config}>
      <RestaurantHero config={config.hero} />
      <StatsSection stats={config.stats} />
      <ValueSection heading={config.premium.heading} rows={config.premium.rows} />
      <RestaurantFeatureSections blocks={config.featureBlocks} />
      <div className="desktop-real-impact" data-scroll-assist-section data-scroll-assist-restaurants="true">
        <RealImpactScroll />
      </div>
      <MobileRealImpactSection />
      <JourneyScrollSection
        title={config.timeline.title}
        mobileTitle="How Pixtron Works"
        body={config.timeline.body}
        steps={config.timeline.steps}
        button={config.timeline.button}
      />
      <FaqSection faqs={config.faqs} />
    </PageShell>
  );
}

function SeriesPage({ config }: { config: SeriesPageConfig }) {
  return (
    <PageShell config={config}>
      {config.hero.type === "sachets" ? <SignatureHero hero={config.hero} /> : <CustomHero hero={config.hero} />}
      <ProductShowcaseSection showcase={config.products} variant={config.kind} />
      <ValueSection heading={config.values.heading} rows={config.values.rows} />
      <JourneyScrollSection
        title={config.timeline.title}
        mobileTitle="How Pixtron Works"
        body={config.timeline.body}
        steps={config.timeline.steps}
        button={config.timeline.button}
      />
      {config.setting ? <SettingSectionView section={config.setting} /> : null}
      {config.remembered ? <RememberedSectionView section={config.remembered} /> : null}
    </PageShell>
  );
}

export default function ProductPage({ config }: { config: ProductPageConfig }) {
  return config.kind === "restaurant" ? <RestaurantsPage config={config} /> : <SeriesPage config={config} />;
}
