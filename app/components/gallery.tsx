import Image from "next/image";
import GalleryImage from "../../public/images/homepage/gallery.png";

export default function GallerySection() {
  return (
    <section className="overflow-hidden relative md:pt-50 pt-30 pb-15 bg-body w-[90%] mx-auto">
      <div>
        <div className="absolute  top-15 md:top-20 md:text-[8rem] lg:top-0 z-10 flex w-full select-none items-center justify-center bg-cover bg-center text-[4rem] font-bold text-gray-300 md:left-0 lg:text-[14rem]">
          Gallery
        </div>

        <div className="relative z-50 h-auto  w-full">
          <Image
            src={GalleryImage}
            alt="cover"
            className="object-cover h-full transition-all duration-300 md:w-full"
          />
        </div>
      </div>
    </section>
  );
}
