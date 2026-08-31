"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";

const slides = [
  {
    src: "/images/hero/hero-01.jpg",
    alt: "Marez",
  },
  {
    src: "/images/hero/hero-02.jpg",
    alt: "Marez",
  },
  {
    src: "/images/hero/hero-03.jpg",
    alt: "Marez",
  },
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Carrusel */}
      <div ref={emblaRef} className="h-full w-full overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.src}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Zona izquierda */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Imagen anterior"
        className="absolute left-0 top-0 z-10 h-full w-1/2 cursor-w-resize"
      />

      {/* Zona derecha */}
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Imagen siguiente"
        className="absolute right-0 top-0 z-10 h-full w-1/2 cursor-e-resize"
      />
    </section>
  );
}
