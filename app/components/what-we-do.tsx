"use client";

import WhatSymbol from "@/public/images/homepage/what-symbol.svg";
import WhatWeDoCover from "@/public/images/homepage/what-we-do-cover.svg";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useResizeObserver } from "usehooks-ts";

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height = 0 } = useResizeObserver({
    ref: containerRef as React.RefObject<HTMLElement>,
    box: "border-box",
  });

  return (
    <div className="flex flex-col items-center max-w-6xl w-[90%] mx-auto overflow-hidden py-5">
      <div className="relative w-full">
        <hr className="absolute z-10 h-0.5 bg-black top-1/2 left-0 w-full" />

        <div className="flex justify-center">
          <div className="relative z-20 py-2 md:py-3 px-3 md:px-14 w-auto bg-blue rounded-2xl md:rounded-2xl my-8 flex justify-center">
            <h2 className="text-white text-center font-semibold text-xl md:text-2xl">
              What We Do
            </h2>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative flex items-center w-full lg:gap-4 mb-5 md:my-10"
      >
        <div className="relative bg-white flex flex-col justify-center">
          <hr
            className="absolute h-full w-0.5 bg-black left-[53%]"
            style={{ height: `${height}px` }}
          />
          <div className="relative -top-5 lg:-top-15">
            <div className="h-23 md:h-34 w-full bg-white absolute top-1/2 -translate-y-1/2 z-10" />
            <Image
              src={WhatSymbol}
              alt="What We Do"
              className="relative z-20 h-24 md:h-35 w-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1 px-4 py-8">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-12 lg:col-span-6 space-y-5">
              <h2 className="text-base md:text-xl lg:text-2xl font-semibold leading-[150%]">
                Comprehensive Consultancy for Every Corner of Your Factory
              </h2>
              <p className="text-sm md:text-base lg:text-xl leading-[150%]">
                Whether your goal is higher output, reduced overhead or stronger
                compliance - TGS Advisors provides a 360° solution designed to
                deliver efficiency and profitablity.
              </p>
            </div>

            <div className="col-span-6 hidden lg:block">
              <Image
                src={WhatWeDoCover}
                alt="What We Do"
                className="relative h-[300px]  w-full object-contain"
              />
            </div>
          </div>
        </div>

        <hr className="absolute top-0 w-full h-0.5 bg-black left-[35px] md:left-[51px]" />
        <ChevronRight className="absolute -top-[9px] md:-top-[11px] md:-right-2 -right-[7px] size-5 md:size-6 text-black" />

        <hr className="absolute bottom-0 w-full h-0.5 bg-black left-[35px] md:left-[51px]" />
        <ChevronRight className="absolute -bottom-[9px] md:-bottom-[11px] md:-right-2 -right-[7px] md:size-6 size-5 text-black" />
      </div>

      <div className="block md:hidden">
        <Image
          src={WhatWeDoCover}
          alt="What We Do"
          className="relative w-[80%] mx-auto object-contain"
        />
      </div>
    </div>
  );
}
