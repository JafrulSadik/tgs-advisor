import Certificate from "@/public/images/homepage/certificate.png";
import Image from "next/image";
import { CertificateType } from "../types/certificates";
import CertificateSlider from "./certificate-slider";

export default function AwardsAndCertificates({
  certificates,
}: {
  certificates: CertificateType[];
}) {
  return (
    <div className="flex overflow-hidden flex-col gap-5 md:gap-10 items-center w-full py-5 bg-body sm:bg-none md:bg-none lg:bg-no-repeat pb-10 md:pb-15">
      <div className="flex w-fit items-center gap-2 rounded-full border-2 border-blue px-2 py-1 font-bold uppercase md:px-4 md:py-1">
        <p className="text-sm text-[#231F20] md:text-base">Achievements</p>
      </div>

      <div className="py-4 px-5 md:px-12 bg-blue rounded-[14px] md:rounded-2xl w-[90%] mb-5 md:mb-10 md:w-auto mx-auto">
        <h1 className="text-lg text-white font-semibold text-center md:text-2xl">
          Awards and Certifications
        </h1>
      </div>

      <div className="grid grid-cols-12 w-full md:h-[360px] lg:h-[450px]">
        <div className="hidden md:col-span-4 rounded-r-4xl lg:rounded-r-[60px] bg-cyan px-15 md:flex justify-center items-center shadow-2xl">
          <Image
            src={Certificate}
            alt="Certificate"
            className="size-36 lg:size-52"
          />
        </div>

        <div className="col-span-12 md:col-span-8 flex items-center">
          <CertificateSlider certificates={certificates} />
        </div>
      </div>
    </div>
  );
}
