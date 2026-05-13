import Image from "next/image";

const features = [
  {
    title: "Not Seen, Touched",
    body: "Your brand is physically picked up, opened, and used.",
  },
  {
    title: "Placed at the Point of Attention",
    body: "On restaurant tables, where customers are relaxed and engaged.",
  },
  {
    title: "A Multi Sensory Experience",
    body: "Sight, touch, and scent combine to create lasting recall.",
  },
  {
    title: "Built for Repetition",
    body: "Every table. Every service. Lunch and dinner, every day.",
  },
] as const;

function FeatureCheck() {
  return (
    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center">
      <Image
        src="/landing-page/check_circle.svg"
        alt=""
        width={24}
        height={24}
        unoptimized
        priority
        className="size-6 object-contain"
      />
    </div>
  );
}

function SideDivider() {
  return <div className="h-px flex-1 bg-[#c7bca5]" />;
}

export function LandingBrandInHandsSection() {
  return (
    <section className="flex w-full flex-col items-center px-3 py-4 lg:px-10 lg:py-10">
      <div className="flex w-full max-w-[390px] flex-col items-center lg:max-w-[1130px]">
        <div
          className="relative z-[2] mb-[-34px] flex items-center gap-2 rounded-[10px] border border-[#bbae92] px-4 py-2 shadow-[0px_2px_11px_0px_rgba(187,174,146,0.55)]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(246,225,160,1) 0%, rgba(219,190,114,1) 50%, rgba(192,154,68,1) 100%)",
          }}
        >
          <span className="text-[20px] text-[#6c4c12] lg:text-[22px]">&#9733;</span>
          <span className="text-[26px] text-[#6c4c12] lg:text-[28px]">&#9733;</span>
          <span className="text-[32px] text-[#6c4c12] lg:text-[34px]">&#9733;</span>
          <span className="text-[26px] text-[#6c4c12] lg:text-[28px]">&#9733;</span>
          <span className="text-[20px] text-[#6c4c12] lg:text-[22px]">&#9733;</span>
        </div>

        <div className="relative z-[1] flex w-full flex-col gap-5 rounded-[18px] border border-[#bbae92] bg-[#e9e3d9] px-4.5 pb-7 pt-[42px] lg:gap-9 lg:rounded-[20px] lg:px-8 lg:pb-10 lg:pt-12">
          <div className="flex w-full flex-col items-center gap-1 lg:hidden">
            <h2 className="text-center font-[family:var(--font-inter)] text-[26px] font-extrabold leading-[1.15] text-black">
              Your Brand, Placed
              <br />
              Directly in Diners&apos;
            </h2>
            <div className="flex w-full items-center gap-3">
              <SideDivider />
              <p className="shrink-0 text-center font-[family:var(--font-inter)] text-[26px] font-extrabold leading-[1.15] text-black">
                Hands
              </p>
              <SideDivider />
            </div>
          </div>

          <div className="relative hidden w-full items-center gap-6 lg:flex">
            <SideDivider />
            <h2 className="shrink-0 text-center font-[family:var(--font-inter)] text-[36px] font-extrabold leading-[1.3] text-black">
              Your Brand, Placed Directly in Diners&apos; Hands
            </h2>
            <SideDivider />
          </div>

          <div className="flex flex-col gap-5 lg:hidden">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-[10px]">
                <FeatureCheck />
                <div className="flex flex-col gap-[10px]">
                  <p className="font-[family:var(--font-inter)] text-[18px] font-bold leading-[26px] text-black">
                    {feature.title}
                  </p>
                  <p className="font-[family:var(--font-inter)] text-[16px] font-medium leading-[24px] text-black/80">
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden flex-col gap-[38px] lg:flex">
            <div className="flex w-full items-start">
              {[features[0], features[1]].map((feature) => (
                <div key={feature.title} className="flex flex-1 items-start gap-[10px]">
                  <FeatureCheck />
                  <div className="flex flex-col gap-[10px]">
                    <p className="font-[family:var(--font-inter)] text-[18px] font-bold leading-[26px] text-black">
                      {feature.title}
                    </p>
                    <p className="font-[family:var(--font-inter)] text-[16px] font-medium leading-[24px] text-black/80">
                      {feature.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-full items-start">
              {[features[2], features[3]].map((feature) => (
                <div key={feature.title} className="flex flex-1 items-start gap-[10px]">
                  <FeatureCheck />
                  <div className="flex flex-col gap-[10px]">
                    <p className="font-[family:var(--font-inter)] text-[18px] font-bold leading-[26px] text-black">
                      {feature.title}
                    </p>
                    <p className="font-[family:var(--font-inter)] text-[16px] font-medium leading-[24px] text-black/80">
                      {feature.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
