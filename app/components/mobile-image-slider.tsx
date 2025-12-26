"use client";

import Image from "next/image";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const images = [
  "/images/gallery-home/home-gallery-1.png",
  "/images/gallery-home/home-gallery-2.png",
  "/images/gallery-home/home-gallery-3.png",
  "/images/gallery-home/home-gallery-4.png",
  "/images/gallery-home/home-gallery-5.png",
  "/images/gallery-home/home-gallery-6.png",
  "/images/gallery-home/home-gallery-7.png",
  "/images/gallery-home/home-gallery-8.png",
];

export default function MobileImageSlider() {
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
            className="!w-[60%] md:!w-[40%] aspect-[4/3] md:aspect-[3/4]"
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
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
