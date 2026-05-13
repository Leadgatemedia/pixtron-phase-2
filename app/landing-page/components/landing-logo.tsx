import Image from "next/image";

type LandingLogoProps = {
  priority?: boolean;
  className?: string;
};

export function LandingLogo({
  priority = false,
  className = "",
}: LandingLogoProps) {
  return (
    <div
      className={`relative h-[66px] aspect-[115/88] lg:h-[80px] ${className}`}
    >
      <Image
        src="/landing-page/around-logo.svg"
        alt=""
        fill
        aria-hidden="true"
        className="object-contain"
      />
      <div className="absolute inset-[3px] lg:inset-[4px]">
        <Image
          src="/assets/logo.png"
          alt="Pixtron"
          fill
          priority={priority}
          sizes="(min-width: 1024px) 105px, 86px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
