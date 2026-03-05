"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Calendar,
  Users,
  PartyPopper,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
} from "lucide-react";

const eventTypes = [
  { value: "mariage", label: "Mariage", icon: "💍" },
  { value: "entreprise", label: "Événement d'entreprise", icon: "🏢" },
  { value: "anniversaire", label: "Anniversaire", icon: "🎂" },
  { value: "cocktail", label: "Cocktail", icon: "🥂" },
  { value: "foire", label: "Foire & Salon", icon: "🎪" },
  { value: "autre", label: "Autre", icon: "✨" },
];

const guestRanges = [
  "10 - 30 personnes",
  "30 - 50 personnes",
  "50 - 100 personnes",
  "100 - 200 personnes",
  "200+ personnes",
];

export default function QuoteForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    eventType: "",
    guests: "",
    date: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 4;

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.eventType !== "";
      case 1:
        return formData.guests !== "";
      case 2:
        return formData.date !== "";
      case 3:
        return formData.name !== "" && formData.email !== "" && formData.phone !== "";
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="devis" className="bg-white py-28 lg:py-36" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple/10">
            <Check className="h-10 w-10 text-purple" />
          </div>
          <h3
            className="mt-6 text-3xl font-bold text-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Demande envoyée !
          </h3>
          <p className="mt-4 text-neutral-500">
            Merci pour votre confiance. Notre équipe vous recontactera sous 24h
            pour discuter de votre projet.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="devis" className="relative bg-white py-28 lg:py-36" ref={ref}>
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-purple-muted blur-[150px]" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-purple uppercase">
            Votre projet
          </span>
          <h2
            className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Demandez votre
            <br />
            <span className="text-purple">devis gratuit</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-500">
            Décrivez-nous votre événement et recevez une proposition personnalisée
            sous 24 heures.
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                    i <= step
                      ? "bg-purple text-white"
                      : "bg-neutral-100 text-neutral-400"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`h-[2px] w-8 transition-all duration-300 sm:w-16 ${
                      i < step ? "bg-purple" : "bg-neutral-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-3xl border border-neutral-100 bg-white p-8 shadow-xl shadow-black/[0.03] md:p-12"
        >
          {/* Step 0: Event Type */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 text-neutral-400">
                <PartyPopper className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Quel type d&apos;événement organisez-vous ?
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() =>
                      setFormData({ ...formData, eventType: type.value })
                    }
                    className={`rounded-xl border-2 p-4 text-left transition-all duration-300 ${
                      formData.eventType === type.value
                        ? "border-purple bg-purple/5"
                        : "border-neutral-100 hover:border-neutral-200"
                    }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <p className="mt-2 text-sm font-medium text-neutral-800">
                      {type.label}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Guests */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 text-neutral-400">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Combien d&apos;invités attendez-vous ?
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                {guestRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() =>
                      setFormData({ ...formData, guests: range })
                    }
                    className={`rounded-xl border-2 p-4 text-left transition-all duration-300 ${
                      formData.guests === range
                        ? "border-purple bg-purple/5"
                        : "border-neutral-100 hover:border-neutral-200"
                    }`}
                  >
                    <p className="text-sm font-medium text-neutral-800">
                      {range}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 text-neutral-400">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Quelle est la date prévue ?
                </span>
              </div>
              <div className="mt-6">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-neutral-100 p-4 text-neutral-800 transition-all focus:border-purple focus:outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 text-neutral-400">
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Vos coordonnées
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="rounded-xl border-2 border-neutral-100 p-4 text-neutral-800 transition-all focus:border-purple focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="rounded-xl border-2 border-neutral-100 p-4 text-neutral-800 transition-all focus:border-purple focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="rounded-xl border-2 border-neutral-100 p-4 text-neutral-800 transition-all focus:border-purple focus:outline-none"
                />
                <textarea
                  placeholder="Message ou précisions (optionnel)"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={3}
                  className="rounded-xl border-2 border-neutral-100 p-4 text-neutral-800 transition-all focus:border-purple focus:outline-none md:col-span-2"
                />
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps - 1 ? (
              <button
                onClick={() => canProceed() && setStep(step + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 ${
                  canProceed()
                    ? "bg-purple text-white hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
                    : "cursor-not-allowed bg-neutral-100 text-neutral-300"
                }`}
              >
                Suivant
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 ${
                  canProceed()
                    ? "bg-purple text-white hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
                    : "cursor-not-allowed bg-neutral-100 text-neutral-300"
                }`}
              >
                <Send className="h-4 w-4" />
                Envoyer ma demande
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
