import Marquee from "react-fast-marquee";

import { getImageUrl } from "@/lib/image-url";
import Image from "next/image";
import { CertificateType } from "../types/certificates";

export default function CertificateSlider({
  certificates,
}: {
  certificates: CertificateType[];
}) {
  return (
    <Marquee className="flex h-full items-center" pauseOnHover speed={30}>
      {certificates.map((certificate, i) => (
        <div className="rounded-lg overflow-hidden mx-4" key={i}>
          <Image
            key={certificate.id}
            src={getImageUrl(certificate.image)}
            alt="Certificate"
            width={400}
            height={700}
            objectFit="cover"
            className={`w-full rounded-lg h-60 lg:h-80`}
          />
        </div>
      ))}
    </Marquee>
  );
}
