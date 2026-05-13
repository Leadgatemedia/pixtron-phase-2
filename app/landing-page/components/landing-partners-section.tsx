import Image from "next/image";

type PartnerLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  mobileHeight: number;
  isLgm?: boolean;
  logoClassName?: string;
  desktopWrapperClassName?: string;
};

const partnerBasePath = "/landing-page/partners";
const baseLogoClass = "shrink-0 object-contain grayscale";

const partnerLogos: PartnerLogo[] = [
  {
    src: `${partnerBasePath}/Logo.svg`,
    alt: "Santos Brazilian Churrascaria",
    width: 87,
    height: 72,
    mobileHeight: 34,
    logoClassName: `${baseLogoClass} contrast-110`,
    desktopWrapperClassName: "left-[3px] top-[7px]",
  },
  {
    src: `${partnerBasePath}/Logo%20(1).svg`,
    alt: "Belora Casino",
    width: 109,
    height: 44,
    mobileHeight: 18,
    logoClassName: `${baseLogoClass} contrast-110`,
    desktopWrapperClassName: "left-[156px] top-[27px]",
  },
  {
    src: `${partnerBasePath}/Pixtron%20Website%20(Phase%201)%20(Copy)/LGM%20RESORTS.svg`,
    alt: "LGM Resorts International",
    width: 144,
    height: 17,
    mobileHeight: 11,
    isLgm: true,
    desktopWrapperClassName: "left-[331px] top-[32px]",
  },
  {
    src: `${partnerBasePath}/northern-shrimp-transparent.png`,
    alt: "Northern Shrimp",
    width: 90,
    height: 90,
    mobileHeight: 34,
    logoClassName: `${baseLogoClass} brightness-90 contrast-110`,
    desktopWrapperClassName: "left-[568px] top-[4px]",
  },
  {
    src: `${partnerBasePath}/Logo%20(5).svg`,
    alt: "Pastaroma",
    width: 98,
    height: 98,
    mobileHeight: 34,
    logoClassName: `${baseLogoClass} brightness-90 contrast-110`,
    desktopWrapperClassName: "left-[712px] top-0",
  },
  {
    src: `${partnerBasePath}/Logo%20(4).svg`,
    alt: "Prime Flame California BBQ",
    width: 56,
    height: 75,
    mobileHeight: 28,
    logoClassName: `${baseLogoClass} brightness-90 contrast-125 mix-blend-luminosity`,
    desktopWrapperClassName: "left-[871px] top-[11px]",
  },
  {
    src: `${partnerBasePath}/Logo%20(3).svg`,
    alt: "Jack N Jay",
    width: 136,
    height: 32,
    mobileHeight: 16,
    logoClassName: `${baseLogoClass} brightness-95 contrast-125 mix-blend-luminosity`,
    desktopWrapperClassName: "left-[992px] top-[33px]",
  },
];

function LgmLogo({
  mobile = false,
  className = "",
}: {
  mobile?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`}>
      <Image
        src={`${partnerBasePath}/Pixtron%20Website%20(Phase%201)%20(Copy)/image%2035.svg`}
        alt=""
        width={29}
        height={33}
        unoptimized
        priority
        style={{ height: mobile ? "20px" : "33px", width: "auto" }}
        className="object-contain grayscale opacity-[0.85]"
      />
      <div className="flex flex-col items-start gap-1">
        <Image
          src={`${partnerBasePath}/Pixtron%20Website%20(Phase%201)%20(Copy)/LGM%20RESORTS.svg`}
          alt="LGM Resorts"
          width={144}
          height={17}
          unoptimized
          priority
          style={{ height: mobile ? "10px" : "17px", width: "auto" }}
          className="object-contain grayscale contrast-125"
        />
        <Image
          src={`${partnerBasePath}/Pixtron%20Website%20(Phase%201)%20(Copy)/image%2034.svg`}
          alt=""
          width={83}
          height={8}
          unoptimized
          priority
          style={{ height: mobile ? "4px" : "8px", width: "auto" }}
          className="object-contain grayscale opacity-[0.85]"
        />
      </div>
    </div>
  );
}

export function LandingPartnersSection() {
  return (
    <section className="w-full bg-white py-8 lg:py-16">
      <div className="mx-auto flex w-full max-w-[390px] flex-col items-center gap-5 px-4 lg:max-w-[1440px] lg:gap-10 lg:px-10">
        <h2 className="text-center font-[family:var(--font-inter)] text-[26px] font-bold leading-[34px] text-black lg:text-[36px] lg:font-extrabold lg:leading-[1.3]">
          Our Partners
        </h2>

        <div className="w-full overflow-x-auto lg:hidden">
          <div className="mx-auto flex w-max min-w-full items-center justify-center gap-5 px-2 pb-1">
            {partnerLogos.map((logo) =>
              logo.isLgm ? (
              <LgmLogo key={logo.alt} mobile />
            ) : (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  priority
                  style={{ height: `${logo.mobileHeight}px`, width: "auto" }}
                  className={logo.logoClassName ?? baseLogoClass}
                />
              ),
            )}
          </div>
        </div>

        <div className="relative hidden h-24 w-[1130px] lg:block">
          {partnerLogos.map((logo) =>
            logo.isLgm ? (
              <LgmLogo
                key={logo.alt}
                className={`absolute ${logo.desktopWrapperClassName ?? ""}`}
              />
            ) : (
              <div
                key={logo.alt}
                className={`absolute ${logo.desktopWrapperClassName ?? ""}`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  priority
                  style={{ height: `${logo.height}px`, width: "auto" }}
                  className={logo.logoClassName ?? baseLogoClass}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
