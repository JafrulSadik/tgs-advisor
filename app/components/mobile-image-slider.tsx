"use client";

import Image from "next/image";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getImageUrl } from "@/lib/image-url";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { GalleryImageType } from "../gallery/components/image-grid";

export default function MobileImageSlider({
  images,
}: {
  images: GalleryImageType[];
}) {
  return (
    <div className="w-full py-20">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        centeredSlides
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView="auto"
        loop
        spaceBetween={25}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            className="w-[60%]! md:w-[40%]! aspect-4/3 md:aspect-3/4"
          >
            <div className="relative w-full h-full">
              <Image
                src={getImageUrl(src.image)}
                alt=""
                width={500}
                height={500}
                className="object-cover rounded-xl shadow-xl w-full h-full"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
