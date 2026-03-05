"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/entreprises", label: "Prestations" },
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "A Propos" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-purple-light/20 bg-purple-dark/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "border-purple-light/10 bg-purple-dark/90 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center">
          <Image
            src="/logotype_horizontal2.svg"
            alt="Traiteur Montpellier"
            width={180}
            height={40}
            className="h-10 w-auto brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative px-5 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                pathname === link.href
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 h-[1.5px] -translate-x-1/2 bg-white transition-all duration-300 ${
                  pathname === link.href ? "w-3/4" : "w-0 group-hover:w-3/4"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* CTA + Phone */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="tel:+33660130596"
            className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white"
          >
            <Phone className="h-4 w-4" />
            06 60 13 05 96
          </a>
          <Link
            href="/a-propos#devis"
            className="group relative overflow-hidden rounded-full border border-white/30 bg-white/10 px-7 py-2.5 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
          >
            <span className="relative z-10">Obtenir un devis</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label="Menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-purple-dark lg:hidden"
          >
            {/* Background glow */}
            <div className="absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple/20 blur-[100px]" />
            <div className="absolute bottom-1/4 right-0 h-48 w-48 rounded-full bg-purple-light/10 blur-[80px]" />

            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className={`group relative block py-3 text-center text-3xl font-bold tracking-wide transition-colors ${
                      pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="mobileActive"
                        className="absolute -bottom-1 left-1/2 h-0.5 w-12 -translate-x-1/2 bg-white"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-8 h-px w-16 bg-white/20"
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <a
                  href="tel:+33660130596"
                  className="mt-4 flex items-center gap-3 text-lg text-white/60 transition-colors hover:text-white"
                >
                  <Phone className="h-5 w-5" />
                  06 60 13 05 96
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-6"
              >
                <Link
                  href="/a-propos#devis"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
                >
                  Obtenir un devis
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
