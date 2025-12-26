"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsapp() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="https://wa.me/+8801713262940"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: [0, -10, 10, -10, 10, 0],
          }}
          exit={{ opacity: 0, scale: 0.5, y: 100 }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            y: { duration: 0.3 },
            rotate: {
              duration: 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3,
              delay: 1,
            },
          }}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center p-2 md:p-3.5 bg-[#25D366] rounded-full shadow-lg hover:bg-[#22e369] transition-colors duration-300"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="text-white text-3xl" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
