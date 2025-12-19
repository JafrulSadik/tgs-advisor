import NotFoundImage from "@/public/images/not-found/not-found-bg.svg";
import NotFoundCover from "@/public/images/not-found/not-found-cover.svg";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundContent() {
  return (
    <div
      className="bg-blue lg:min-h-screen"
      style={{
        backgroundImage: `url(${NotFoundImage.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <Image
        src={NotFoundCover.src}
        alt="not-found"
        height={100}
        width={100}
        className="mx-auto w-[70%] md:w-[40%] lg:w-[30%]"
      />

      <div className="my-10 space-y-2 w-[90%] mx-auto">
        <h2 className="text-white text-xl md:text-3xl font-semibold text-center">
          Oops... Page Not Found
        </h2>
        <p className="text-white text-center md:text-lg">
          This page seems to have wandered off. Let’s head back home!
        </p>
      </div>

      <div className="flex justify-center pb-20">
        <Link href="/">
          <button className="flex items-center hover:cursor-pointer bg-cyan text-white px-4 py-2 rounded-lg  uppercase font-semibold">
            <span>Go Back Home</span>
            <ChevronRight className="size-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
