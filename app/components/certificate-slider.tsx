import Marquee from "react-fast-marquee";

import Certificate1 from "@/public/images/homepage/certificates/certificate-1.png";
import Certificate2 from "@/public/images/homepage/certificates/certificate-2.png";
import Certificate3 from "@/public/images/homepage/certificates/certificate-3.png";
import Certificate4 from "@/public/images/homepage/certificates/certificate-4.png";
import Certificate5 from "@/public/images/homepage/certificates/certificate-5.png";
import Certificate6 from "@/public/images/homepage/certificates/certificate-6.png";
import Image from "next/image";

const certificates = [
  {
    id: 1,
    image: Certificate4,
  },
  {
    id: 2,
    image: Certificate5,
  },
  {
    id: 3,
    image: Certificate3,
  },
  {
    id: 4,
    image: Certificate2,
  },
  {
    id: 5,
    image: Certificate6,
  },
  {
    id: 6,
    image: Certificate1,
  },
];

export default function CertificateSlider() {
  return (
    <Marquee className="flex h-full items-center" pauseOnHover speed={30}>
      {certificates.map((certificate, i) => (
        <Image
          key={certificate.id}
          src={certificate.image}
          alt="Certificate"
          width={400}
          height={700}
          objectFit="cover"
          className={`w-full px-4 rounded-md ${
            i % 2 === 0 ? " h-60 lg:h-80" : "h-52 lg:h-66"
          }`}
        />
      ))}
    </Marquee>
  );
}
