import CoreServicesCover from "@/public/images/homepage/core-services.svg";
import Image from "next/image";

export default function CoreServices() {
  return (
    <div className="flex flex-col items-center max-w-6xl w-[90%] mx-auto overflow-hidden">
      <div className="relative w-full">
        <hr className="absolute z-10 h-0.5 bg-black top-1/2 left-0 w-full" />

        <div className="flex justify-center">
          <div className="relative z-20 py-2 md:py-3 px-3 md:px-14 w-auto bg-blue rounded-xl md:rounded-2xl my-10 flex justify-center">
            <h2 className="text-white text-center font-semibold text-xl md:text-2xl">
              Core Services
            </h2>
          </div>
        </div>
      </div>
      <div className="max-w-4xl">
        <Image
          src={CoreServicesCover.src}
          alt="Core Services"
          width={169}
          height={147}
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
