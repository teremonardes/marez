"use client";

import { motion } from "framer-motion";

const words = ["Diseño,", "identidad", "y calidad", "en cada detalle."];

export default function BrandStatement() {
  return (
    <section className="flex min-h-[62vh] items-center bg-[var(--sand-yellow)] px-6 pb-10 pt-20 md:min-h-[68vh] md:px-10 md:pb-14 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-6xl font-[var(--font-quando)] text-5xl leading-[1.05] text-[var(--earth-black)] md:text-7xl lg:text-8xl"
        >
          {words.map((word, index) => (
            <motion.span
              key={word}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="mr-[0.2em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </section>
  );
}
