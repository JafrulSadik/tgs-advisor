import { HowWeApprochCover } from "@/public/images/homepage";
import Image from "next/image";

export default function HowWeApproch() {
  return (
    <div className="flex flex-col items-center max-w-6xl w-[90%] mx-auto overflow-hidden mb-5 md:mb-15">
      <div className="relative w-full">
        <hr className="absolute z-10 h-0.5 bg-black top-1/2 left-0 w-full" />

        <div className="flex justify-center">
          <div className="relative z-20 py-2 md:py-3 px-3 md:px-14 w-auto bg-blue rounded-2xl md:rounded-3xl my-10 flex justify-center">
            <h2 className="text-white text-center font-semibold text-xl md:text-2xl">
              How We Approch
            </h2>
          </div>
        </div>
      </div>

      <Image
        src={HowWeApprochCover}
        alt="How We Approch"
        className="max-h-[500px]"
      />
    </div>
  );
}
