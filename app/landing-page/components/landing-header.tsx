import { LandingLogo } from "./landing-logo";

export function LandingHeader() {
  return (
    <header className="relative z-10 h-[68px] w-full shrink-0 overflow-visible lg:h-[82px]">
      <div
        className="absolute inset-0 border-b border-[#649462] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)]"
        style={{ background: "linear-gradient(to bottom, #36872b, #146224)" }}
      />
      <div className="absolute left-1/2 top-[36px] z-10 -translate-x-1/2 lg:top-[45px]">
        <LandingLogo priority />
      </div>
    </header>
  );
}
