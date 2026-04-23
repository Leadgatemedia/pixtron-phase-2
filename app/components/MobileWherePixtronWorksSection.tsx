import Link from "next/link";

const VENUES = [
  {
    title: "Restaurants",
    subtitle: "Enhance dining with premium wipes",
    image: "/venues/restaurant-figma.png",
  },
  {
    title: "Cafe's",
    subtitle: "High-traffic lifestyle touchpoints",
    image: "/venues/cafe-figma.png",
  },
  {
    title: "Hotels",
    subtitle: "Premium hospitality amenities",
    image: "/venues/hotels-figma.png",
  },
];

function ArrowIcon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/arrow-white.png" width={24} height={24} alt="" style={{ display: "block" }} />;
}

export default function MobileWherePixtronWorksSection() {
  return (
    <section
      className="mobile-real-impact mobile-where-pixtron"
      style={{
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        width: "100%",
        padding: "56px 16px",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            width: "100%",
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.2,
            background: "linear-gradient(95.814deg, #000 0%, rgba(0,0,0,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Where Pixtron Works Best
        </h2>
        <p
          style={{
            width: "100%",
            margin: 0,
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.5,
            color: "rgba(0,0,0,0.8)",
          }}
        >
          From upscale restaurants to casual cafes, Pixtron fits seamlessly into any dining environment
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 16,
          width: "100%",
        }}
      >
        {VENUES.map((venue) => (
          <article
            key={venue.title}
            style={{
              position: "relative",
              width: "100%",
              height: 384,
              borderRadius: 6,
              overflow: "hidden",
              background: "#111",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={venue.image}
              alt={venue.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                borderRadius: 6,
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 20,
                width: "100%",
                height: 184,
                padding: "28px 24px 24px",
                boxSizing: "border-box",
                color: "#fff",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
              }}
            >
              <h3
                style={{
                  width: "100%",
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 700,
                  lineHeight: "36px",
                }}
              >
                {venue.title}
              </h3>
              <p
                style={{
                  width: "100%",
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                {venue.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="/contact?type=advertiser"
        className="btn-primary"
        style={{
          width: "100%",
          boxSizing: "border-box",
          justifyContent: "space-between",
        }}
      >
        <span>Advertise With Pixtron</span>
        <ArrowIcon />
      </Link>
    </section>
  );
}
