"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="bg-black" ref={ref}>
      {/* CTA Band */}
      <div className="border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-16 md:flex-row lg:px-8"
        >
          <div>
            <h3
              className="text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Prêt à sublimer votre événement ?
            </h3>
            <p className="mt-2 text-white/50">
              Contactez-nous pour une proposition sur mesure.
            </p>
          </div>
          <Link
            href="/a-propos#devis"
            className="group relative shrink-0 overflow-hidden rounded-full bg-purple px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
          >
            <span className="relative z-10">Demander un devis</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </motion.div>
      </div>

      {/* Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logotype_horizontal2.svg"
                alt="Traiteur Montpellier"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              Votre partenaire culinaire pour des événements d&apos;exception à
              Montpellier et ses environs. Cuisine méditerranéenne raffinée et
              engagement écoresponsable depuis 2008.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.instagram.com/traiteurmontpellier"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-purple hover:text-purple"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/traiteur-montpellier"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-purple hover:text-purple"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/ines.reception"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-purple hover:text-purple"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Navigation
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/entreprises", label: "Prestations" },
                { href: "/galerie", label: "Galerie" },
                { href: "/a-propos", label: "A Propos" },
                { href: "/a-propos#devis", label: "Devis gratuit" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative inline-block text-sm text-white/40 transition-colors hover:text-purple-light"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-purple-light transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/40">
                <MapPin className="h-4 w-4 shrink-0 text-purple/60" />
                Montpellier, France
              </li>
              <li>
                <a
                  href="tel:+33660130596"
                  className="flex items-center gap-3 text-sm text-white/40 transition-colors hover:text-purple-light"
                >
                  <Phone className="h-4 w-4 shrink-0 text-purple/60" />
                  +33 (6) 60 13 05 96
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@traiteurmontpellier.com"
                  className="flex items-center gap-3 text-sm text-white/40 transition-colors hover:text-purple-light"
                >
                  <Mail className="h-4 w-4 shrink-0 text-purple/60" />
                  contact@traiteurmontpellier.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Traiteur Montpellier. Tous droits
            réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="text-xs text-white/30 transition-colors hover:text-white/50"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="text-xs text-white/30 transition-colors hover:text-white/50"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
