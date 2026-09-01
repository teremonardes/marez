"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/contacto" },
];

type NavbarProps = {
  darkAtTop?: boolean;
};

export default function Navbar({ darkAtTop = false }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const useDarkColors = darkAtTop || hasScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      setHasScrolled(currentScrollY > 80);

      if (isScrollingDown && currentScrollY > 80) {
        setIsVisible(false);
        setMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    const initialFrame = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMenuOpen(false);

    const destination = new URL(href, window.location.href);

    if (
      destination.pathname !== window.location.pathname ||
      !destination.hash
    ) {
      return;
    }

    const target = document.querySelector<HTMLElement>(destination.hash);

    if (!target) return;

    event.preventDefault();

    if (window.location.hash !== destination.hash) {
      window.history.pushState(null, "", destination.hash);
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
<header
  className={`fixed top-0 left-0 z-50 w-full transition-transform duration-500 ${
    isVisible ? "translate-y-0" : "-translate-y-full"
  }`}
>
    <nav className="flex h-20 w-full items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/#inicio"
          onClick={(event) => handleNavClick(event, "/#inicio")}
          className="relative z-50 -translate-x-3 sm:-translate-x-2 lg:-translate-x-1"
          aria-label="Ir al inicio"
        >
          <Image
            src="/logo.png"
            alt="Marez"
            width={180}
            height={40}
            priority
            style={{
              filter: useDarkColors
                ? "brightness(0) saturate(100%) invert(26%)"
                : "none",
            }}
            className="h-25 w-auto transition-[filter] duration-300"
          />
        </Link>
        {/* Desktop navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className={`relative text-sm font-medium transition-all duration-300 hover:scale-110 ${
                useDarkColors
                  ? "text-[var(--earth-black)] hover:text-[var(--earth-black)]/65"
                  : "text-[var(--sand-yellow)] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className=" relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Cerrar menú" : "Abrir menú"}
          </span>

        <div className="flex w-6 flex-col gap-1.5">
    <span
      className={`h-[2px] w-full transition-all duration-300 ${
        useDarkColors ? "bg-[var(--earth-black)]" : "bg-[var(--sand-yellow)]"
      } ${
        menuOpen ? "translate-y-2 rotate-45" : ""
      }`}
    />


          <span
      className={`h-[2px] w-full transition-all duration-300 ${
        useDarkColors ? "bg-[var(--earth-black)]" : "bg-[var(--sand-yellow)]"
      } ${
        menuOpen ? "opacity-0" : ""
      }`}
    />

           <span
      className={`h-[2px] w-full transition-all duration-300 ${
        useDarkColors ? "bg-[var(--earth-black)]" : "bg-[var(--sand-yellow)]"
      } ${
        menuOpen ? "-translate-y-2 -rotate-45" : ""
      }`}
    />
          </div>
        </button>

        {/* Mobile navigation */}
<div
  className={`absolute left-0 top-full w-full overflow-hidden bg-[var(--sand-yellow)] transition-all duration-500 ease-in-out md:hidden ${
    menuOpen
      ? "max-h-[400px] opacity-100"
      : "pointer-events-none max-h-0 opacity-0"
  }`}
>
  <div className="flex flex-col items-center gap-6 px-6 py-8">
    {navItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={(event) => handleNavClick(event, item.href)}
        className="
          font-[var(--font-manrope)]
          text-lg
          font-medium
          text-[var(--earth-black)]
          transition-all
          duration-300
          hover:scale-105
          hover:text-[var(--blue)]
        "
      >
        {item.label}
      </Link>
    ))}
  </div>
</div>
      </nav>
    </header>
  );
}
