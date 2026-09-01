"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="nosotros"
      className="relative isolate flex min-h-[70vh] scroll-mt-20 items-center overflow-hidden px-6 py-32 sm:min-h-[75vh] sm:px-10 sm:py-32 lg:px-16 lg:py-36"
    >
      <Image
        src="/images/close-up-web.jpg"
        alt="Persona utilizando un polerón personalizado al aire libre"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/40" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/35 via-black/10 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl leading-[1.35] text-[var(--sand-yellow)] sm:text-3xl lg:text-4xl">
            Somos distribuidores representantes en América del Sur de una
            empresa líder en el mercado europeo de la personalización de
            productos textiles.
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--sand-yellow)]/80 sm:text-base">
            Marez es una subdivisión de Progal, empresa chilena con más de 35
            años de experiencia en actividades de marketing promocional.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
