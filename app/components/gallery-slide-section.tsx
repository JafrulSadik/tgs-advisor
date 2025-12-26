"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import SliderItem from "./slide";
import SliderBottomItem from "./slide-bottom";

const images = [
  "/images/gallery-home/home-gallery-1.png",
  "/images/gallery-home/home-gallery-2.png",
  "/images/gallery-home/home-gallery-3.png",
  "/images/gallery-home/home-gallery-4.png",
];

const bottomImages = [
  "/images/gallery-home/home-gallery-5.png",
  "/images/gallery-home/home-gallery-6.png",
  "/images/gallery-home/home-gallery-7.png",
  "/images/gallery-home/home-gallery-8.png",
];

const ITEM_WIDTH = 275;
const GAP = 10;
const ITEM_FULL = ITEM_WIDTH + GAP;

const TOTAL_WIDTH = images.length * ITEM_FULL;

export default function GallerySlideSection() {
  const x = useMotionValue(0);
  useEffect(() => {
    return x.on("change", (latest) => {
      if (latest <= -TOTAL_WIDTH) {
        x.set(latest + TOTAL_WIDTH);
      }
      if (latest > 0) {
        x.set(latest - TOTAL_WIDTH);
      }
    });
  }, []);

  return (
    <div className="overflow-hidden w-full py-20 space-y-4">
      <motion.div
        drag="x"
        dragElastic={0.08}
        dragMomentum={true}
        className=" flex items-end gap-5 cursor-grab active:cursor-grabbing h-[300px]"
        style={{ x }}
      >
        {[...images, ...images].map((src, i) => (
          <SliderItem key={i} src={src} index={i} x={x} />
        ))}
      </motion.div>
      <motion.div
        drag="x"
        dragElastic={0.08}
        dragMomentum={true}
        className="flex items-start gap-5 cursor-grab active:cursor-grabbing h-[300px]"
        style={{ x }}
      >
        {[...bottomImages, ...bottomImages].map((src, i) => (
          <SliderBottomItem key={i} src={src} index={i} x={x} />
        ))}
      </motion.div>
    </div>
  );
}
