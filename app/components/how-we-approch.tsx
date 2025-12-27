import HowWeApprochCover from "@/public/images/homepage/how-to-approch.svg";
import Image from "next/image";

export default function HowWeApproch() {
  return (
    <div className="flex flex-col items-center max-w-6xl w-[90%] mx-auto overflow-hidden mb-5 md:mb-10">
      <div className="py-4 px-8 md:px-14 bg-blue rounded-[14px] md:rounded-2xl w-[90%] mb-5 md:mb-15 md:w-auto mx-auto">
        <h1 className="text-lg text-white font-semibold text-center md:text-2xl">
          How We Approch
        </h1>
      </div>

      <Image
        src={HowWeApprochCover}
        alt="How We Approch"
        className="max-h-[500px]"
      />
    </div>
  );
}
