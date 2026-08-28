"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [lastScrollY]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<header
  className={`fixed top-0 left-0 z-50 w-full transition-transform duration-500 ${
    isVisible ? "translate-y-0" : "-translate-y-full"
  }`}
>
    <nav className="flex h-20 w-full items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="/logo.png"
            alt="Marez"
            width={180}
            height={40}
            priority
            className="h-25 w-auto"
          />
        </Link>
        {/* Desktop navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-[var(--sand-yellow)] transition-all duration-300  hover:scale-110
    hover:text-white"
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
      className={`h-[2px] w-full bg-[var(--sand-yellow)] transition-all duration-300 ${
        menuOpen ? "translate-y-2 rotate-45" : ""
      }`}
    />


          <span
      className={`h-[2px] w-full bg-[var(--sand-yellow)] transition-all duration-300 ${
        menuOpen ? "opacity-0" : ""
      }`}
    />

           <span
      className={`h-[2px] w-full bg-[var(--sand-yellow)] transition-all duration-300 ${
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
        onClick={() => setMenuOpen(false)}
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
