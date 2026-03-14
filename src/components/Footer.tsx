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
            href="/devis"
            className="group relative shrink-0 overflow-hidden rounded-full bg-purple px-10 py-4 text-sm font-semibold tracking-widest text-white uppercase transition-all duration-300 hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
          >
            <span className="relative z-10">Demander un devis</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </motion.div>
      </div>

      {/* Map Section */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="overflow-hidden rounded-2xl lg:col-span-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.5!2d3.8367!3d43.6048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af0725dd1db1%3A0xad8756742c40250!2s81+Rue+de+Padirac%2C+34070+Montpellier!5e0!3m2!1sfr!2sfr!4v1"
                width="100%"
                height="280"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Traiteur Montpellier - Localisation"
                className="rounded-2xl"
              />
            </div>
            <div className="flex flex-col justify-center space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-light" />
                <div>
                  <p className="text-sm font-semibold text-white">81 rue de Padirac, 34070 Montpellier</p>
                  <p className="text-xs text-white/40">Intervention dans tout l&apos;Hérault</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-purple-light" />
                <a href="tel:+33660130596" className="text-sm text-white/60 transition-colors hover:text-purple-light">
                  +33 (6) 60 13 05 96
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-purple-light" />
                <a href="mailto:contact@traiteurmontpellier.com" className="text-sm text-white/60 transition-colors hover:text-purple-light">
                  contact@traiteurmontpellier.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content - 3 colonnes */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/logotype_horizontal2.svg"
                  alt="Traiteur Montpellier - Traiteur d'exception pour vos événements dans l'Hérault"
                  width={180}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
              </Link>
              <Link href="/a-propos#engagement">
                <Image
                  src="/photos site/rse-traiteur-montpellier-768x763.jpg"
                  alt="Engagement éco-responsable zéro déchet - Traiteur Montpellier"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-purple/30 transition-all hover:ring-purple"
                />
              </Link>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              Votre partenaire culinaire pour des événements d&apos;exception à
              Montpellier et ses environs. Cuisine méditerranéenne raffinée et
              engagement écoresponsable depuis 2008.
            </p>
            <Link
              href="/a-propos#engagement"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              Engagé zéro déchet &bull; Circuits courts &bull; Solidarité
            </Link>
            <div className="mt-6 flex gap-4">
              <a href="https://www.instagram.com/traiteurmontpellier" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-purple hover:text-purple" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
              <a href="https://www.linkedin.com/company/traiteur-montpellier" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-purple hover:text-purple" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
              <a href="https://www.facebook.com/ines.reception" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-purple hover:text-purple" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Colonne 1 : Nos Prestations */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">Nos Prestations</h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/entreprises", label: "Événements Entreprise" },
                { href: "/foires-salons", label: "Foires & Salons" },
                { href: "/evenements-prives", label: "Événements Privés" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group relative inline-block text-sm text-white/40 transition-colors hover:text-purple-light">
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-purple-light transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 2 : À Propos */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">À Propos</h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/a-propos", label: "Notre Histoire" },
                { href: "/a-propos#engagement", label: "Engagement RSE" },
                { href: "/galerie", label: "Galerie" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group relative inline-block text-sm text-white/40 transition-colors hover:text-purple-light">
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-purple-light transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Aide & Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">Aide & Contact</h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/#faq", label: "Questions Fréquentes" },
                { href: "/devis", label: "Devis Gratuit" },
                { href: "/mentions-legales", label: "Mentions Légales" },
                { href: "/politique-confidentialite", label: "Confidentialité" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group relative inline-block text-sm text-white/40 transition-colors hover:text-purple-light">
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-purple-light transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-8 text-xs font-bold tracking-widest text-white uppercase">Horaires</h4>
            <p className="mt-3 text-sm text-white/40">
              Mar - Sam : 9h - 18h
              <br />
              Prestation sur réservation
            </p>
          </div>
        </div>

        {/* SEO Text */}
        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-center text-sm text-white/30">
            Traiteur Montpellier : Excellence culinaire et gastronomie éco-responsable pour vos réceptions dans l&apos;Hérault (34).
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Traiteur Montpellier. Tous droits
            réservés. Site créé par{" "}
            <a href="https://webomax.fr" target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-purple-light">Webomax</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
