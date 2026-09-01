"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/src/data/products";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: { x: 0 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const [showAlternate, setShowAlternate] = useState(false);
  const direction = showAlternate ? 1 : -1;
  const imageSrc = showAlternate
    ? product.alternateImage
    : product.frontImage;
  const imageAlt = showAlternate ? product.alternateAlt : product.frontAlt;

  return (
    <button
      type="button"
      onClick={() => setShowAlternate((current) => !current)}
      aria-label={
        showAlternate
          ? `Mostrar vista completa: ${product.frontAlt}`
          : `Mostrar detalle: ${product.alternateAlt}`
      }
      aria-pressed={showAlternate}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-[2rem] bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--blue)] sm:rounded-[2.5rem]"
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={imageSrc}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority && !showAlternate}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            className={`object-contain transition-transform duration-500 group-hover:scale-[1.015] ${
              showAlternate && product.id !== "crudo-atacama"
                ? "p-5 sm:p-7"
                : ""
            }`}
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
