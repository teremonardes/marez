import type { Metadata } from "next";
import ContactForm from "@/src/components/ContactForm";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "Contacto | Marez",
  description: "Contacta al equipo de Marez.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--blue)] px-6 pb-24 pt-32 text-[var(--sand-yellow)] sm:px-10 sm:pb-28 sm:pt-36 lg:px-16 lg:pb-36 lg:pt-40">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20 xl:gap-28">
          <div className="max-w-xl">
            <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Hablemos
            </h1>
            <p className="mt-8 text-base leading-relaxed text-[var(--sand-yellow)]/80 sm:text-lg">
              Si necesitas información sobre nuestros servicios o deseas
              coordinar una reunión, completa el formulario y nuestro equipo se
              pondrá en contacto contigo a la brevedad.
            </p>
            <p className="mt-8 text-sm text-[var(--sand-yellow)]/65">
              También puedes contactarnos a:
            </p>
            <div className="mt-4 flex flex-col items-start gap-2 text-lg sm:text-xl">
              <a
                href="tel:+56997993952"
                className="transition-opacity hover:opacity-65"
              >
                +56 9 9799 3952
              </a>
              <a
                href="mailto:ventas@marez.cl"
                className="transition-opacity hover:opacity-65"
              >
                ventas@marez.cl
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
