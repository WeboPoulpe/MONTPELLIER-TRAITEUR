"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

function FAQAccordion({ item, index, dark }: { item: FAQItem; index: number; dark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`border-b ${dark ? "border-white/10" : "border-neutral-100"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
        aria-expanded={open}
      >
        <h3
          className={`text-base font-semibold transition-colors duration-200 md:text-lg ${
            open
              ? "text-purple"
              : dark
                ? "text-white/80 hover:text-white"
                : "text-neutral-800 hover:text-black"
          }`}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {item.question}
        </h3>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open ? "bg-purple text-white" : dark ? "bg-white/5 text-white/40" : "bg-neutral-100 text-neutral-400"
          }`}
        >
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className={`pb-6 text-sm leading-relaxed md:text-base ${dark ? "text-white/50" : "text-neutral-500"}`}>
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ({ items, title = "Questions frequentes", subtitle = "FAQ", dark = false }: FAQProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={`py-24 lg:py-32 ${dark ? "bg-black" : "bg-neutral-50"}`} ref={ref}>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className={`text-xs font-semibold tracking-[0.3em] uppercase ${dark ? "text-purple-light" : "text-purple"}`}>
            {subtitle}
          </span>
          <h2
            className={`mt-4 text-3xl font-bold tracking-tight md:text-4xl ${dark ? "text-white" : "text-black"}`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {title}
          </h2>
        </motion.div>

        <div className="mt-12">
          {items.map((item, index) => (
            <FAQAccordion key={item.question} item={item} index={index} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  );
}
