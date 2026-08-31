"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

const footerLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    const target = document.querySelector<HTMLElement>(href);

    if (!target) return;

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      id="contacto"
      className="relative overflow-hidden bg-[var(--earth-black)] text-[var(--sand-yellow)]"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-9 sm:px-10 sm:py-11 lg:px-16">
        <div className="flex flex-col gap-7  sm:flex-row sm:items-end sm:justify-between">
          <Link
            href="#inicio"
            onClick={(event) => handleAnchorClick(event, "#inicio")}
            aria-label="Ir al inicio"
            className="relative block h-10 w-[70px] overflow-hidden transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/logo-blue.png"
              alt="Marez"
              width={70}
              height={70}
              className="absolute -top-[17px] left-0 h-[70px] w-[70px] max-w-none"
            />
          </Link>

          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(event) => handleAnchorClick(event, link.href)}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Marez
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 opacity-20 sm:-right-10 sm:h-80 sm:w-80 sm:opacity-35 lg:right-0 lg:opacity-55">
        <Image
          src="/images/footer-pattern.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 640px, 512px"
          className="object-cover"
        />
      </div>
    </footer>
  );
}
