"use client";
import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const ITEM_WIDTH = 275;
const GAP = 10;
const ITEM_FULL = ITEM_WIDTH + GAP;

const DEFAULT_VIEWPORT_WIDTH = 1920;

export default function SliderBottomItem({
  src,
  index,
  x,
}: {
  src: string;
  index: number;
  x: MotionValue<number>;
}) {
  const itemCenter = index * ITEM_FULL + ITEM_WIDTH / 2;

  const [viewportWidth, setViewportWidth] = useState(DEFAULT_VIEWPORT_WIDTH);

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();

    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const distance = useTransform(x, (latestX) => {
    const center = viewportWidth / 2;
    return Math.abs(itemCenter + latestX - center);
  });

  const progress = useTransform(distance, (d) =>
    Math.min(d / (viewportWidth / 2), 1)
  );

  const height = useTransform(
    progress,
    [0, 0.25, 0.45, 0.75, 1],
    [200, 250, 150, 250, 200]
  );

  const width = useTransform(
    progress,
    [0, 0.25, 0.45, 0.75, 1],
    [300, 300, 250, 350, 300]
  );

  return (
    <motion.div
      style={{ height, width }}
      className="relative shrink-0 flex items-end select-none"
    >
      <Image
        src={src}
        alt=""
        fill
        draggable={false}
        className="object-cover rounded-xl pointer-events-none"
      />
    </motion.div>
  );
}
