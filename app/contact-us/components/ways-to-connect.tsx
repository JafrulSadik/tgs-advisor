"use client";

import ContactUsLeft from "./contact-us-left";
import ContactUsRight from "./contact-us-right";

import dynamic from "next/dynamic";

const OfficeMap = dynamic(() => import("./office-location"), {
  ssr: false,
});

export default function WaysToConnect() {
  return (
    <div className="mt-10 mb-8 md:mb-0">
      <div className="mb-5 md:mb-15 space-y-2 lg:space-y-4">
        <h1 className="text-center text-2xl font-bold text-[#231F20] md:text-4xl w-[90%] mx-auto">
          Ways to Contact Us
        </h1>
        <p className="text-center md:text-lg md:font-bold text-black">
          We’d Love to Hear From You
        </p>
      </div>

      <div className="mx-auto grid w-[90%] max-w-6xl grid-cols-12 gap-6 lg:gap-8 mb-8 md:mb-20">
        <ContactUsLeft />
        <ContactUsRight />
      </div>

      <OfficeMap />
    </div>
  );
}
