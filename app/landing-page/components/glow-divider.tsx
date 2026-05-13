import Image from "next/image";

export function GlowDivider({
  width,
  className = "",
  src = "/landing-page/Divider Glow (Stroke).svg",
  insetX = "-10.42%",
}: {
  width: number | string;
  className?: string;
  src?: string;
  insetX?: string;
}) {
  return (
    <div
      className={`relative h-[7px] shrink-0 ${className}`}
      style={{ width }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-y-[-714.29%]"
        style={{ left: insetX, right: insetX }}
      >
        <Image
          src={src}
          alt=""
          fill
          aria-hidden="true"
          sizes={typeof width === "number" ? `${width}px` : "100vw"}
          className="object-fill"
        />
      </div>
    </div>
  );
}
