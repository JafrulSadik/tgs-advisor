"use client";

import { getImageUrl } from "@/lib/image-url";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { GalleryImageType } from "../gallery/components/image-grid";
import SliderItem from "./slide";
import SliderBottomItem from "./slide-bottom";

function normalizeImages(images: GalleryImageType[]) {
  if (!Array.isArray(images) || images.length === 0) return [];

  if (images.length >= 4) {
    return images.slice(0, 4);
  }

  const result = [];
  let i = 0;

  while (result.length < 4) {
    result.push(images[i % images.length]);
    i++;
  }

  return result;
}

const ITEM_WIDTH = 275;
const GAP = 10;
const ITEM_FULL = ITEM_WIDTH + GAP;

export default function GallerySlideSection({
  images,
}: {
  images: GalleryImageType[];
}) {
  const TOTAL_WIDTH = 4 * ITEM_FULL;
  const x = useMotionValue(0);

  const imagesUp = normalizeImages(images.slice(0, 4));
  const imagesDown = normalizeImages(images.slice(4, 8));

  useEffect(() => {
    return x.on("change", (latest) => {
      if (latest <= -TOTAL_WIDTH) {
        x.set(latest + TOTAL_WIDTH);
      }
      if (latest > 0) {
        x.set(latest - TOTAL_WIDTH);
      }
    });
  }, [x, TOTAL_WIDTH]);

  return (
    <div className="overflow-hidden w-full py-20 space-y-4">
      {imagesUp.length > 0 && (
        <motion.div
          drag="x"
          dragElastic={0.08}
          dragMomentum={true}
          className=" flex items-end gap-5 cursor-grab active:cursor-grabbing h-[300px]"
          style={{ x }}
        >
          {[...imagesUp, ...imagesUp].map((img, i) => (
            <SliderItem key={i} src={getImageUrl(img.image)} index={i} x={x} />
          ))}
        </motion.div>
      )}
      {imagesDown.length > 0 && (
        <motion.div
          drag="x"
          dragElastic={0.08}
          dragMomentum={true}
          className="flex items-start gap-5 cursor-grab active:cursor-grabbing h-[300px]"
          style={{ x }}
        >
          {[...imagesDown, ...imagesDown].map((img, i) => (
            <SliderBottomItem
              key={i}
              src={getImageUrl(img.image)}
              index={i}
              x={x}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
