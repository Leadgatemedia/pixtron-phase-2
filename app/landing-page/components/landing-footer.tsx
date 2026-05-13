import { GlowDivider } from "./glow-divider";
import { LandingLogo } from "./landing-logo";

const phone = "(702) 582-2228";
const email = "info@pixtron.net";
const address = "1810 E. Sahara Ave Ste 930, Las Vegas, NV 89104, USA";

export function LandingFooter() {
  return (
    <footer className="relative mt-4 w-full lg:mt-0">
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
        <LandingLogo />
      </div>

      <div
        className="w-full text-center shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.06)]"
        style={{ background: "linear-gradient(to bottom, #317f2b, #053d16)" }}
      >
        <div className="mx-auto flex w-full max-w-[390px] flex-col items-center gap-2 px-4 pb-6 pt-[64px] lg:max-w-none lg:gap-3 lg:pb-8 lg:pt-[80px]">
          <p className="w-full font-[family:var(--font-inter)] text-[18px] font-bold leading-[18.955px] text-white">
            {phone}
          </p>

          <GlowDivider
            width={142}
            src="/landing-page/under_number_divider.png"
            insetX="-35.21%"
          />

          <p className="font-[family:var(--font-inter)] text-[18px] font-bold leading-[18.955px] text-white">
            {email}
          </p>

          <GlowDivider width="min(100%, 466px)" />

          <p className="w-full font-[family:var(--font-inter)] text-[18px] font-normal leading-[1.5] text-white lg:w-auto lg:whitespace-nowrap">
            {address}
          </p>

          <GlowDivider width="min(100%, 466px)" />

          <p className="font-[family:var(--font-inter)] text-[18px] font-normal leading-[1.5] text-white">
            &copy; 2026 Pixtron, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
