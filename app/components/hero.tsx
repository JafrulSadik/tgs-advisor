import HeroImage from "@/public/images/homepage/hero-bg.jpg";
import HeroDescriptionBg from "@/public/images/homepage/hero-description-bg.svg";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative grid grid-cols-12 lg:min-h-[720px]">
      <div className="order-2 lg:order-1 col-span-12 lg:col-span-8 flex flex-col items-center justify-center bg-blue py-20 lg:py-0 lg:pb-0">
        <div className="text-4xl lg:text-5xl font-bold leading-[103%]">
          <h1 className="text-center text-white">TGS</h1>
          <h1 className="text-center text-yellow">ADVISOR</h1>
        </div>

        <div
          style={{ backgroundImage: `url(${HeroDescriptionBg.src})` }}
          className="w-full flex items-center justify-center max-w-[500px] aspect-6/4 bg-no-repeat bg-contain bg-center py-10 px-10"
        >
          <p className="lg:text-lg text-white font-semibold  w-[80%] md:w-[60%] text-center">
            We help RMG factories reduce cost, increase efficiency & build
            sustainable standard systems.
          </p>
        </div>
      </div>

      {/* Background image + Blue overlay */}
      <div className="order-1 lg:order-2 col-span-12 lg:col-span-4 relative overflow-hidden pt-20 aspect-6/3 lg:aspect-auto">
        {/* Background Image */}
        <Image
          src={HeroImage}
          alt="hero"
          fill
          className="object-cover lg:object-[calc(50%+100px)_center] -scale-x-100"
          priority
        />

        {/* Blue Layer (semi-transparent) */}
        <div className="absolute inset-0 bg-blue-600/15"></div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="size-10 lg:size-12 rounded-full flex justify-center items-center bg-[#2c58a7]">
          <ChevronDown className="size-8 lg:size-10 text-white" />
        </div>
      </div>
    </div>
  );
}
