"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { Appostrophi } from "@/public/images/homepage";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "usehooks-ts";
import { TestimonialType } from "../types/testimonial";
import { PinMaskedImage } from "./pin-mask-image";

// const testimonials = [
//   {
//     id: 1,
//     text: "TGS Advisors, led by Mr Abdul Hadi, have been crucial in getting our struggling company back on track again.",
//     name: "Ms Ishra Tahiyat",
//     designation: "Managing Director",
//     company: "Farnoor Garments Ltd",
//     profile: ManagingDirector,
//   },
//   {
//     id: 2,
//     text: "TGS Advisor boosts employee morale with counseling, wellness programs and performance based motivation.",
//     name: "Alamzeb Radin Ahmed",
//     designation: "Managing Director",
//     company: "Farnoor Garments Ltd",
//     profile: Director,
//   },
//   {
//     id: 3,
//     text: "The most impactful change was in our people through motivational counseling and an effective incentive system.",
//     name: "Tanvir Ahmed",
//     designation: "Chief Operation Officer (COO)",
//     company: "Leadtime Apparels Ltd",
//     profile: ChiefOfficer,
//   },
// ];

export default function TestimonialSlider({
  testimonials,
}: {
  testimonials: TestimonialType[];
}) {
  const isMdUp = useMediaQuery("(min-width: 768px)");

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: isMdUp ? "start" : "center",
      dragThreshold: 0,
      skipSnaps: true,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ],
  );

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex-[0_0_100%] md:flex-[0_0_80%] flex justify-center md:px-4 pt-8"
          >
            <div className="relative space-y-5 max-w-[90%] w-full">
              <div className="absolute left-1/2 -translate-x-1/2 bg-cyan -top-1 md:-top-3">
                <div className="px-5 p-2">
                  <Image
                    src={Appostrophi}
                    alt="apostrophi"
                    className="size-8 md:size-12 object-contain"
                  />
                </div>
              </div>

              <div className=" text-white px-2 md:px-5 py-8 md:py-12 mt-5 border-[3px] text-center text-sm md:text-xl border-white rounded-4xl max-w-3xl flex items-center lg:min-h-48">
                <div className=" w-full">{testimonial.review}</div>
              </div>

              <div className="flex  md:flex-col justify-center items-center gap-2 ">
                <div className="relative size-14 md:size-18 bg-transparent flex items-center justify-center">
                  <PinMaskedImage src={testimonial.clientImage || ""} />
                </div>
                <div className="flex  flex-col justify-center md:items-center text-white text-sm lg:text-base">
                  <h4 className="font-semibold">{testimonial.clientName}</h4>
                  <p>{testimonial.clientDesignation}</p>
                  <p>{testimonial.clientCompany}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
