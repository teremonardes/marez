"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Ventas al por mayor",
    details: ["Precios por volumen"],
    shape:
      "rounded-[42%_58%_50%_50%/54%_42%_58%_46%] -rotate-2",
  },
  {
    title: "Stock disponible",
    details: ["Entrega inmediata"],
    shape:
      "rounded-[55%_45%_42%_58%/45%_58%_42%_55%] rotate-2",
  },
  {
    title: "Producción",
    details: ["Producto de calidad", "Único en el país"],
    shape:
      "rounded-[46%_54%_60%_40%/58%_44%_56%_42%] -rotate-1",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 70, scale: 0.94 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: index * 0.16,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Services() {
  return (
    <section
      id="servicios"
      className="scroll-mt-20 overflow-hidden bg-[var(--sand-yellow)] px-6 pb-20 pt-6 sm:px-10 sm:pb-24 sm:pt-8 lg:px-16 lg:pb-28 lg:pt-10"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-3 lg:gap-5 xl:gap-10">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="group relative flex aspect-[4/3] w-full max-w-[28rem] items-center justify-center justify-self-center lg:max-w-none"
            >
              <div
                aria-hidden="true"
                className={`absolute inset-6 bg-[var(--olive-green)] transition-transform duration-700 group-hover:rotate-0 group-hover:scale-[1.03] sm:inset-7 md:inset-6 lg:inset-3 ${service.shape}`}
              />

              <div className="relative z-10 mx-auto flex h-full w-[72%] flex-col justify-center text-[var(--earth-black)] sm:w-[70%] lg:w-[74%] xl:w-[70%]">
                <h3 className="max-w-[12ch] text-2xl leading-tight sm:text-3xl xl:text-4xl">
                  {service.title}
                </h3>
                <ul
                  className="mt-5 space-y-1.5 text-sm leading-relaxed text-[var(--earth-black)]/65 sm:mt-6 sm:text-base"
                >
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3">
                      <span className="h-px w-5 bg-current" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
