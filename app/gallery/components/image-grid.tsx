import Image from "next/image";

// import GalleryImage1 from "@/public/images/gallery/gallery-img-1.jpg";
// import GalleryImage2 from "@/public/images/gallery/gallery-img-2.jpg";
// import GalleryImage3 from "@/public/images/gallery/gallery-img-3.jpg";
// import GalleryImage4 from "@/public/images/gallery/gallery-img-4.jpg";
// import GalleryImage5 from "@/public/images/gallery/gallery-img-5.jpg";
// import GalleryImage6 from "@/public/images/gallery/gallery-img-6.jpg";
// import GalleryImage7 from "@/public/images/gallery/gallery-img-7.jpg";
// import GalleryImage8 from "@/public/images/gallery/gallery-img-8.jpg";

export type GalleryImageType = {
  name: string;
  id: number;
  image: string;
  sequence: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function ImageGrid({ images }: { images: GalleryImageType[] }) {
  return (
    <div className="flex flex-col justify-center p-5 md:p-10 gap-5 md:gap-10">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Some Of Our Moments
      </h2>

      {images.length > 0 ? (
        <div className="grid grid-cols-12 grid-rows-12 max-w-4xl mx-auto gap-1 lg:gap-4">
          {images?.[0] && (
            <div className="col-start-5 col-end-9 row-start-1 row-end-4 aspect-square border-4 md:border-6 lg:border-12 border-black overflow-hidden">
              <Image
                width={400}
                height={400}
                className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
                src={images?.[0].image}
                alt={images?.[0].name}
              />
            </div>
          )}
          <div className="col-start-1 col-end-5 row-start-4 row-end-7 aspect-square border-4 md:border-6 lg:border-12 border-blue overflow-hidden">
            <Image
              width={400}
              height={400}
              className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
              src={images?.[1].image}
              alt={images?.[1].name}
            />
          </div>
          <div className="col-start-5 col-end-9 row-start-4 row-end-7 aspect-square border-4 md:border-6 lg:border-12 border-cyan overflow-hidden">
            <Image
              width={400}
              height={400}
              className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
              src={images[2].image}
              alt={images[2].name}
            />
          </div>
          <div className="col-start-9 col-end-13 row-start-4 row-end-7 aspect-square border-4 md:border-6 lg:border-12 border-blue overflow-hidden">
            <Image
              width={400}
              height={400}
              className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
              src={images?.[3]?.image}
              alt={images?.[3]?.name}
            />
          </div>
          <div className="col-start-1 col-end-5 row-start-7 row-end-10 aspect-square border-4 md:border-6 lg:border-12 border-cyan overflow-hidden">
            <Image
              width={400}
              height={400}
              className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
              src={images?.[4]?.image}
              alt={images?.[4]?.name}
            />
          </div>
          <div className="col-start-5 col-end-9 row-start-7 row-end-10 aspect-square border-4 md:border-6 lg:border-12 border-blue overflow-hidden">
            <Image
              width={400}
              height={400}
              className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
              src={images?.[5]?.image}
              alt={images?.[5]?.name}
            />
          </div>
          <div className="col-start-9 col-end-13 row-start-7 row-end-10 aspect-square border-4 md:border-6 lg:border-12 border-cyan overflow-hidden">
            <Image
              width={400}
              height={400}
              className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
              src={images?.[6]?.image}
              alt={images?.[6]?.name}
            />
          </div>
          <div className="col-start-5 col-end-9 row-start-10 row-end-13 aspect-square border-4 md:border-6 lg:border-12 border-black overflow-hidden">
            <Image
              width={400}
              height={400}
              className="object-cover w-full h-full hover:scale-110 transition-all duration-700"
              src={images?.[7]?.image}
              alt={images?.[7]?.name}
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-xl font-semibold text-amber-700 h-96 flex items-center justify-center">
          No images available.
          <br />
          Upload images to the gallery to get started.
        </div>
      )}
    </div>
  );
}
