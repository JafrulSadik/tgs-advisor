// import { Appostrophi } from "@/public/images/homepage";
// import Image from "next/image";

import TestimonialSlider from "./testimonial-slider";

// import Profile from "@/public/images/homepage/clients/managing-director.svg";

export default function ClientFeedback() {
  return (
    <div className="flex my-15 overflow-hidden flex-col gap-10 lg:gap-10 items-center w-full py-5 bg-body sm:bg-none md:bg-none lg:bg-no-repeat ">
      <div className="grid grid-cols-12 w-full  bg-cyan">
        <div className="hidden col-span-5 md:col-span-3 rounded-r-[70px] bg-blue px-5 lg:px-15 md:flex justify-center items-center shadow-2xl">
          <h4 className="text-white lg:leading-14 font-semibold text-xl md:text-2xl lg:text-4xl">
            What Our <br /> Client’s Say
          </h4>
        </div>

        <div className="col-span-12 md:col-span-9 flex flex-col items-center gap-5 py-10">
          <div className="flex w-fit items-center gap-2 rounded-full border-[3px] border-white px-2 py-1 font-bold uppercase md:px-4 md:py-1">
            <p className="text-sm text-white md:text-lg">Testimonials</p>
          </div>

          <TestimonialSlider />
        </div>
      </div>
    </div>
  );
}
