const comparisonRows = [
  { label: "Physical Interaction", pixtron: "Held in hand", billboard: "None", social: "None" },
  { label: "Interaction Rate", pixtron: "90 - 100%", billboard: "0%", social: "0%" },
  { label: "Average Attention Time", pixtron: "15 - 30 seconds", billboard: "2 - 3 seconds", social: "1 - 2 seconds" },
  { label: "Sensory Engagement", pixtron: "Touch + Sight + Scent", billboard: "Sight only", social: "Sight only" },
  { label: "Ad Avoidance", pixtron: "Impossible to skip", billboard: "Ignored while driving", social: "Easily skipped" },
  { label: "Brand Recall (30 days)", pixtron: "High", billboard: "Medium", social: "Medium" },
  { label: "Environment Quality", pixtron: "Restaurants & hospitality", billboard: "Roadside traffic", social: "Mobile feed" },
] as const;

function StatusIcon({ positive }: { positive: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0" fill="none">
      {positive ? (
        <path
          fill="#69C16A"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"
        />
      ) : (
        <path
          fill="#E63946"
          d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2Zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59Z"
        />
      )}
    </svg>
  );
}

function DesktopDivider({ highlight }: { highlight?: boolean }) {
  return (
    <div
      className="w-full shrink-0"
      style={{
        height: 1,
        background: highlight ? "rgba(17,104,216,0.15)" : "#e0dfdf",
      }}
    />
  );
}

function MobileDivider() {
  return <div className="w-full shrink-0" style={{ height: 1, background: "#e0dfdf" }} />;
}

export function LandingComparisonSection() {
  return (
    <section className="w-full bg-white px-3 py-8 lg:px-10 lg:py-16">
      <div className="mx-auto flex w-full max-w-[390px] flex-col items-center gap-5 lg:max-w-[1440px] lg:gap-10">
        <h2 className="w-full text-center font-[family:var(--font-inter)] text-[26px] font-bold leading-[34px] text-black lg:text-[36px] lg:font-extrabold lg:leading-[1.3]">
          Pixtron vs. Traditional Advertising
        </h2>

        <div className="flex w-full flex-col lg:hidden">
          <div className="scrollbar-hidden w-full overflow-x-auto border-y border-[#e0dfdf] bg-white">
            <div className="flex" style={{ minWidth: "max-content" }}>
              <div
                className="sticky left-0 z-[1] flex flex-col gap-4 bg-white py-5 pr-4"
                style={{ width: 193 }}
              >
                <p className="font-[family:var(--font-inter)] text-[18px] font-medium leading-[26px] text-black">
                  Metric
                </p>
                <MobileDivider />
                {comparisonRows.map((row, index) => (
                  <div key={row.label} className="flex flex-col gap-4">
                    <p className="font-[family:var(--font-inter)] text-[16px] font-normal leading-[1.5] text-black">
                      {row.label}
                    </p>
                    {index < comparisonRows.length - 1 ? <MobileDivider /> : null}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 rounded-[20px] px-4 py-5" style={{ width: 235, flexShrink: 0 }}>
                <p className="whitespace-nowrap font-[family:var(--font-inter)] text-[18px] font-medium leading-[26px] text-black">
                  Pixtron Sensory Media
                </p>
                <MobileDivider />
                {comparisonRows.map((row, index) => (
                  <div key={row.label} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon positive />
                      <span className="whitespace-nowrap font-[family:var(--font-inter)] text-[16px] font-medium leading-[24px] text-black">
                        {row.pixtron}
                      </span>
                    </div>
                    {index < comparisonRows.length - 1 ? <MobileDivider /> : null}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 px-4 py-5" style={{ width: 207, flexShrink: 0 }}>
                <p className="whitespace-nowrap font-[family:var(--font-inter)] text-[18px] font-medium leading-[26px] text-black">
                  Billboard Advertising
                </p>
                <MobileDivider />
                {comparisonRows.map((row, index) => (
                  <div key={row.label} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon positive={false} />
                      <span className="whitespace-nowrap font-[family:var(--font-inter)] text-[16px] font-medium leading-[24px] text-black">
                        {row.billboard}
                      </span>
                    </div>
                    {index < comparisonRows.length - 1 ? <MobileDivider /> : null}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 px-4 py-5" style={{ width: 168, flexShrink: 0 }}>
                <p className="whitespace-nowrap font-[family:var(--font-inter)] text-[18px] font-medium leading-[26px] text-black">
                  Social Media Ads
                </p>
                <MobileDivider />
                {comparisonRows.map((row, index) => (
                  <div key={row.label} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon positive={false} />
                      <span className="whitespace-nowrap font-[family:var(--font-inter)] text-[16px] font-medium leading-[24px] text-black">
                        {row.social}
                      </span>
                    </div>
                    {index < comparisonRows.length - 1 ? <MobileDivider /> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden w-full items-center rounded-[20px] border border-[#e0dfdf] bg-white px-4 py-2 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] lg:flex">
          <div className="flex min-w-0 flex-1 flex-col gap-6 px-6">
            <p className="font-[family:var(--font-inter)] text-[24px] font-bold leading-8 text-black">Metric</p>
            <DesktopDivider />
            {comparisonRows.map((row, index) => (
              <div key={row.label} className="flex flex-col gap-6">
                <p className="font-[family:var(--font-inter)] text-[20px] font-medium leading-8 text-black">
                  {row.label}
                </p>
                {index < comparisonRows.length - 1 ? <DesktopDivider /> : null}
              </div>
            ))}
          </div>

          <div
            className="flex min-w-0 flex-1 flex-col gap-6 rounded-[20px] px-6 py-7"
            style={{
              background:
                "linear-gradient(to bottom, rgba(17,104,216,0.05), rgba(0,75,172,0.05))",
            }}
          >
            <p className="font-[family:var(--font-inter)] text-[24px] font-bold leading-8 text-black">
              Pixtron Sensory Media
            </p>
            <DesktopDivider highlight />
            {comparisonRows.map((row, index) => (
              <div key={row.label} className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <StatusIcon positive />
                  <span className="whitespace-nowrap font-[family:var(--font-inter)] text-[20px] font-medium leading-8 text-black">
                    {row.pixtron}
                  </span>
                </div>
                {index < comparisonRows.length - 1 ? <DesktopDivider highlight /> : null}
              </div>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6 px-6">
            <p className="font-[family:var(--font-inter)] text-[24px] font-bold leading-8 text-black">
              Billboard Advertising
            </p>
            <DesktopDivider />
            {comparisonRows.map((row, index) => (
              <div key={row.label} className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <StatusIcon positive={false} />
                  <span className="whitespace-nowrap font-[family:var(--font-inter)] text-[20px] font-medium leading-8 text-black">
                    {row.billboard}
                  </span>
                </div>
                {index < comparisonRows.length - 1 ? <DesktopDivider /> : null}
              </div>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6 px-6">
            <p className="font-[family:var(--font-inter)] text-[24px] font-bold leading-8 text-black">
              Social Media Ads
            </p>
            <DesktopDivider />
            {comparisonRows.map((row, index) => (
              <div key={row.label} className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <StatusIcon positive={false} />
                  <span className="whitespace-nowrap font-[family:var(--font-inter)] text-[20px] font-medium leading-8 text-black">
                    {row.social}
                  </span>
                </div>
                {index < comparisonRows.length - 1 ? <DesktopDivider /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
