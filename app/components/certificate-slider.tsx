import Marquee from "react-fast-marquee";

// import Certificate1 from "@/public/images/homepage/certificates/certificate-1.png";
// import Certificate2 from "@/public/images/homepage/certificates/certificate-2.png";
// import Certificate3 from "@/public/images/homepage/certificates/certificate-3.png";
// import Certificate4 from "@/public/images/homepage/certificates/certificate-4.png";
// import Certificate5 from "@/public/images/homepage/certificates/certificate-5.png";
// import Certificate6 from "@/public/images/homepage/certificates/certificate-6.png";
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
            src={certificate.image}
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
