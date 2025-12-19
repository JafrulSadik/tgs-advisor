import Certificate from "@/public/images/homepage/certificate.png";
import Image from "next/image";

export default function AwardsAndCertificates() {
  return (
    <div className="flex overflow-hidden flex-col gap-10 items-center w-full py-5 bg-body sm:bg-none md:bg-none lg:bg-no-repeat pb-15">
      <div className="flex w-fit items-center gap-2 rounded-full border-2 border-blue px-2 py-1 font-bold uppercase md:px-4 md:py-1">
        <p className="text-sm text-[#231F20] md:text-base">Achievements</p>
      </div>

      <div className="py-4 px-12 bg-blue rounded-3xl w-[90%] mb-10 md:w-auto mx-auto">
        <h1 className="text-xl text-white font-semibold text-center md:text-2xl">
          Awards and Certifications
        </h1>
      </div>

      <div className="grid grid-cols-12 w-full h-[400px]">
        <div className="col-span-4 rounded-r-4xl bg-cyan px-15 flex justify-center items-center shadow-2xl">
          <Image src={Certificate} alt="Certificate" className="size-52" />
        </div>

        <div className="col-span-8"></div>
      </div>
    </div>
  );
}
