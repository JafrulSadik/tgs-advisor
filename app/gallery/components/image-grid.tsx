import Image from "next/image";

import GalleryImage1 from "@/public/images/gallery/gallery-img-1.jpg";
import GalleryImage2 from "@/public/images/gallery/gallery-img-2.jpg";
import GalleryImage3 from "@/public/images/gallery/gallery-img-3.jpg";
import GalleryImage4 from "@/public/images/gallery/gallery-img-4.jpg";
import GalleryImage5 from "@/public/images/gallery/gallery-img-5.jpg";
import GalleryImage6 from "@/public/images/gallery/gallery-img-6.jpg";
import GalleryImage7 from "@/public/images/gallery/gallery-img-7.jpg";
import GalleryImage8 from "@/public/images/gallery/gallery-img-8.jpg";

export default function ImageGrid() {
  return (
    <div className="flex flex-col justify-center p-5 md:p-10 gap-5 md:gap-10">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Some Of Our Moments
      </h2>

      <div className="grid grid-cols-12 grid-rows-12 max-w-4xl mx-auto gap-1 lg:gap-4">
        <div className="col-start-5 col-end-9 row-start-1 row-end-4 aspect-square border-4 md:border-6 lg:border-12 border-black overflow-hidden">
          <Image
            className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
            src={GalleryImage1}
            alt="gallery-img-1"
          />
        </div>
        <div className="col-start-1 col-end-5 row-start-4 row-end-7 aspect-square border-4 md:border-6 lg:border-12 border-blue overflow-hidden">
          <Image
            className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
            src={GalleryImage2}
            alt="gallery-img-2"
          />
        </div>
        <div className="col-start-5 col-end-9 row-start-4 row-end-7 aspect-square border-4 md:border-6 lg:border-12 border-cyan overflow-hidden">
          <Image
            className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
            src={GalleryImage3}
            alt="gallery-img-3"
          />
        </div>
        <div className="col-start-9 col-end-13 row-start-4 row-end-7 aspect-square border-4 md:border-6 lg:border-12 border-blue overflow-hidden">
          <Image
            className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
            src={GalleryImage4}
            alt="gallery-img-4"
          />
        </div>
        <div className="col-start-1 col-end-5 row-start-7 row-end-10 aspect-square border-4 md:border-6 lg:border-12 border-cyan overflow-hidden">
          <Image
            className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
            src={GalleryImage5}
            alt="gallery-img-5"
          />
        </div>
        <div className="col-start-5 col-end-9 row-start-7 row-end-10 aspect-square border-4 md:border-6 lg:border-12 border-blue overflow-hidden">
          <Image
            className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
            src={GalleryImage6}
            alt="gallery-img-6"
          />
        </div>
        <div className="col-start-9 col-end-13 row-start-7 row-end-10 aspect-square border-4 md:border-6 lg:border-12 border-cyan overflow-hidden">
          <Image
            className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
            src={GalleryImage7}
            alt="gallery-img-7"
          />
        </div>
        <div className="col-start-5 col-end-9 row-start-10 row-end-13 aspect-square border-4 md:border-6 lg:border-12 border-black overflow-hidden">
          <Image
            className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
            src={GalleryImage8}
            alt="gallery-img-8"
          />
        </div>
      </div>
    </div>
  );
}
