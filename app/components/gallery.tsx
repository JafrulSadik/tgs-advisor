import GallerySlideSection from "./gallery-slide-section";
import MobileImageSlider from "./mobile-image-slider";

export default function GallerySection() {
  return (
    <section className="overflow-hidden relative md:pt-40 pt-10 bg-body mx-auto">
      <div>
        <div className="absolute md:top-15 md:text-[10rem] lg:top-0 z-10 flex w-full select-none items-center justify-center bg-cover bg-center text-[4rem] font-bold text-gray-300 md:left-0 lg:text-[14rem]">
          Gallery
        </div>

        <div className="hidden md:block relative z-50 h-auto w-full">
          <GallerySlideSection />
        </div>
        <div className="block md:hidden relative z-50 h-auto w-full">
          <MobileImageSlider />
        </div>
      </div>
    </section>
  );
}
