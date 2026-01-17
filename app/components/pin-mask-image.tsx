"use client";

import Image from "next/image";

type PinMaskedImageProps = {
  src: string;
  alt?: string;
  size?: number; // width in px
};

export function PinMaskedImage({
  src,
  alt = "Profile",
  size = 200,
}: PinMaskedImageProps) {
  const height = (size * 116) / 102; // keep SVG aspect ratio

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 102 116"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="pin-mask" maskUnits="userSpaceOnUse">
          <path
            d="M101.384 50.7858C101.384 74.1129 83.7357 88.5414 65.0714 103.86C61.3258 106.911 57.5168 110.216 53.7712 113.33L50.6604 116L47.6132 113.33C43.8676 110.089 40.0586 106.974 36.313 103.86C27.3702 96.9917 19.1203 89.2639 11.6811 80.7869C4.32564 72.5091 0.1808 61.8638 0 50.7858C0 49.6416 0 48.5611 0 47.4805C0.0750577 45.9039 0.244654 44.3332 0.507874 42.777C0.471942 42.354 0.471942 41.9287 0.507874 41.5058C2.68062 29.8682 8.84112 19.3544 17.9271 11.7774C27.013 4.20042 38.4548 0.0352078 50.2795 0C62.1152 0.0204211 73.572 4.17892 82.6711 11.7572C91.7701 19.3354 97.9399 29.8575 100.115 41.5058C100.151 41.9287 100.151 42.354 100.115 42.777C100.378 44.3332 100.548 45.9039 100.623 47.4805C101.321 48.5611 101.384 49.6416 101.384 50.7858Z"
            fill="white"
          />
        </mask>
      </defs>

      {/* background (optional) */}
      <rect width="102" height="116" fill="transparent" />

      {/* masked image */}
      <foreignObject width="102" height="116" mask="url(#pin-mask)">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          style={{ objectFit: "cover" }}
        />
      </foreignObject>
    </svg>
  );
}
