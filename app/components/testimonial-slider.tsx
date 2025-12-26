"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { Appostrophi } from "@/public/images/homepage";
import ChiefOfficer from "@/public/images/homepage/clients/chief-operating-officer.svg";
import Director from "@/public/images/homepage/clients/director.svg";
import ManagingDirector from "@/public/images/homepage/clients/managing-director.svg";
import Autoplay from "embla-carousel-autoplay";
import { useMediaQuery } from "usehooks-ts";

const testimonials = [
  {
    id: 1,
    text: "TGS Advisors, led by Mr Abdul Hadi, have been crucial in getting our struggling company back on track again.",
    name: "Ms Ishra Tahiyat",
    designation: "Managing Director",
    company: "Farnoor Garments Ltd",
    profile: ManagingDirector,
  },
  {
    id: 2,
    text: "TGS Advisor boosts employee morale with counseling, wellness programs and performance based motivation.",
    name: "Alamzeb Radin Ahmed",
    designation: "Managing Director",
    company: "Farnoor Garments Ltd",
    profile: Director,
  },
  {
    id: 3,
    text: "The most impactful change was in our people through motivational counseling and an effective incentive system.",
    name: "Tanvir Ahmed",
    designation: "Chief Operation Officer (COO)",
    company: "Leadtime Apparels Ltd",
    profile: ChiefOfficer,
  },
];

export default function TestimonialSlider() {
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
    ]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="flex-[0_0_80%] md:flex-[0_0_80%] flex justify-center md:px-4 pt-8"
          >
            {/* Slide */}
            <div className="relative space-y-5 max-w-[90%] ">
              {/* Apostrophe */}
              <div className="absolute left-1/2 -translate-x-1/2 bg-cyan -top-1 md:-top-3">
                <div className="px-5 p-2">
                  <Image
                    src={Appostrophi}
                    alt="apostrophi"
                    className="size-8 md:size-12 object-contain"
                  />
                </div>
              </div>

              {/* Text box */}
              <div className="text-white px-2 md:px-5 py-8 md:py-12 mt-5 border-[3px] text-center text-sm md:text-xl border-white rounded-4xl max-w-3xl flex items-center lg:min-h-48">
                {item.text}
              </div>

              {/* Profile */}
              <div className="flex  md:flex-col justify-center items-center gap-2 ">
                <div className="size-14 md:size-20">
                  <Image
                    src={item.profile}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex  flex-col justify-center md:items-center text-white text-sm lg:text-base">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p>{item.designation}</p>
                  <p>{item.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
