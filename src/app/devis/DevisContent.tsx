"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarDays,
  MapPin,
  Euro,
  User,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { pushTrackingEvent } from "@/lib/tracking";
import { getAttribution } from "@/lib/tracking";

/* ─── Types ─── */
interface FormData {
  // Step 1
  eventType: string;
  eventDate: string;
  guestCount: string;
  // Step 2
  address: string;
  postalCode: string;
  city: string;
  serviceOption: string;
  drinks: string;
  // Step 3
  budgetType: string;
  budgetAmount: string;
  dietaryNeeds: string[];
  specialRequest: string;
  // Step 4
  clientType: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  // Step 5
  differentBilling: boolean;
  billingAddress: string;
  billingPostalCode: string;
  billingCity: string;
  // Hidden
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  fbclid: string;
  referrer: string;
  landingPage: string;
  website: string;
  formStartedAt: number;
}

const initialData: FormData = {
  eventType: "",
  eventDate: "",
  guestCount: "",
  address: "",
  postalCode: "",
  city: "",
  serviceOption: "",
  drinks: "",
  budgetType: "global",
  budgetAmount: "",
  dietaryNeeds: [],
  specialRequest: "",
  clientType: "particulier",
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  differentBilling: false,
  billingAddress: "",
  billingPostalCode: "",
  billingCity: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  gclid: "",
  gbraid: "",
  wbraid: "",
  fbclid: "",
  referrer: "",
  landingPage: "",
  website: "",
  formStartedAt: 0,
};

const eventTypes = [
  { value: "mariage", label: "Mariage", emoji: "💒" },
  { value: "entreprise", label: "Événement d'entreprise", emoji: "🏢" },
  { value: "reception", label: "Réception privée", emoji: "🥂" },
  { value: "autre", label: "Autre", emoji: "✨" },
];

const serviceOptions = [
  { value: "livraison", label: "Livraison", icon: "🚚", desc: "On livre, vous servez" },
  { value: "emporter", label: "À emporter", icon: "🛍️", desc: "Vous récupérez" },
  { value: "service", label: "Avec service", icon: "🍽️", desc: "On s'occupe de tout" },
];

const dietaryOptions = [
  "Végétarien",
  "Vegan",
  "Sans Gluten",
  "Halal",
  "Casher",
  "Sans Lactose",
  "Sans Fruits de Mer",
];

const steps = [
  { label: "Événement", icon: CalendarDays },
  { label: "Lieu & Service", icon: MapPin },
  { label: "Budget", icon: Euro },
  { label: "Coordonnées", icon: User },
  { label: "Récapitulatif", icon: Check },
];

/* ─── Animations de la table ─── */
function TableAnimation({ step }: { step: number }) {
  return (
    <div className="relative mx-auto mt-8 flex h-40 w-64 items-end justify-center">
      {/* Table */}
      <motion.div
        className="absolute bottom-0 h-16 w-48 rounded-t-full bg-gradient-to-b from-neutral-200 to-neutral-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Pied de table */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-8 w-3 -translate-x-1/2 rounded-b bg-neutral-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-1 w-20 -translate-x-1/2 rounded bg-neutral-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Step 2: Nappage */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            className="absolute bottom-[3.5rem] h-4 w-52 rounded-t-full bg-gradient-to-b from-purple/30 to-purple/10"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      {/* Step 3: Verres & assiettes */}
      <AnimatePresence>
        {step >= 3 && (
          <>
            {[-20, -8, 4, 16].map((x, i) => (
              <motion.div
                key={`glass-${i}`}
                className="absolute bottom-[4.5rem] h-6 w-3 rounded-full bg-purple/40"
                style={{ left: `calc(50% + ${x}px)` }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              />
            ))}
            {[-16, 0, 16].map((x, i) => (
              <motion.div
                key={`plate-${i}`}
                className="absolute bottom-[4rem] h-2 w-6 rounded-full bg-white border border-neutral-300"
                style={{ left: `calc(50% + ${x}px - 12px)` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Step 4: Invités (silhouettes) */}
      <AnimatePresence>
        {step >= 4 && (
          <>
            {[-36, -18, 18, 36].map((x, i) => (
              <motion.div
                key={`guest-${i}`}
                className="absolute bottom-[5rem] flex flex-col items-center"
                style={{ left: `calc(50% + ${x}px - 6px)` }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                <div className="h-3 w-3 rounded-full bg-purple/50" />
                <div className="mt-0.5 h-4 w-2 rounded-full bg-purple/30" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Feu d'artifice ─── */
function Fireworks() {
  const colors = ["#7c3aed", "#a855f7", "#c084fc", "#e9d5ff", "#fbbf24", "#f472b6"];
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: ((i * 83) % 301) - 150,
    y: -(((i * 67) % 301) + 50),
    color: colors[i % colors.length],
    size: ((i * 7) % 6) + 3,
    delay: ((i * 13) % 50) / 100,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [1, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ duration: 1.5, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Composant principal ─── */
export default function DevisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showFireworks, setShowFireworks] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formStartedRef = useRef(false);

  // Capture UTM params: URL first, then sessionStorage fallback
  useEffect(() => {
    // Check URL params first
    let utmSource = searchParams.get("utm_source") || "";
    let utmMedium = searchParams.get("utm_medium") || "";
    let utmCampaign = searchParams.get("utm_campaign") || "";
    let utmContent = searchParams.get("utm_content") || "";
    let utmTerm = searchParams.get("utm_term") || "";
    let gclid = searchParams.get("gclid") || "";
    let gbraid = searchParams.get("gbraid") || "";
    let wbraid = searchParams.get("wbraid") || "";
    let fbclid = searchParams.get("fbclid") || "";
    let referrer = "";
    let landingPage = "";

    const stored = getAttribution();
    utmSource ||= stored.utm_source || "";
    utmMedium ||= stored.utm_medium || "";
    utmCampaign ||= stored.utm_campaign || "";
    utmContent ||= stored.utm_content || "";
    utmTerm ||= stored.utm_term || "";
    gclid ||= stored.gclid || "";
    gbraid ||= stored.gbraid || "";
    wbraid ||= stored.wbraid || "";
    fbclid ||= stored.fbclid || "";
    referrer = stored.referrer || "";
    landingPage = stored.landing_page || "";

    setForm((prev) => ({
      ...prev,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      gclid,
      gbraid,
      wbraid,
      fbclid,
      referrer,
      landingPage,
      formStartedAt: prev.formStartedAt || Date.now(),
    }));
  }, [searchParams]);

  const update = useCallback(
    (field: keyof FormData, value: string | boolean | string[]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  const toggleDietary = (item: string) => {
    setForm((prev) => ({
      ...prev,
      dietaryNeeds: prev.dietaryNeeds.includes(item)
        ? prev.dietaryNeeds.filter((d) => d !== item)
        : [...prev.dietaryNeeds, item],
    }));
  };

  const scrollToError = (field: string) => {
    const el = document.getElementById(`field-${field}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const validateStep = (): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!form.eventType) errs.eventType = "Choisissez un type d'événement";
      if (!form.eventDate) errs.eventDate = "Sélectionnez une date";
      if (!form.guestCount || parseInt(form.guestCount) < 1) errs.guestCount = "Indiquez le nombre de convives";
      // Block past dates
      if (form.eventDate && new Date(form.eventDate) < new Date(new Date().toDateString())) {
        errs.eventDate = "La date ne peut pas être dans le passé";
      }
    }

    if (step === 2) {
      if (!form.serviceOption) errs.serviceOption = "Choisissez une option de service";
    }

    if (step === 3) {
      if (!form.budgetAmount || parseFloat(form.budgetAmount) <= 0) errs.budgetAmount = "Indiquez votre budget estimé";
    }

    if (step === 4) {
      if (!form.firstName.trim()) errs.firstName = "Indiquez votre prénom";
      if (!form.lastName.trim()) errs.lastName = "Indiquez votre nom";
      if (!form.email.trim()) errs.email = "Indiquez votre email";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Email invalide";
      if (!form.phone.trim()) errs.phone = "Indiquez votre téléphone";
      else if (!/^[+\d\s()-]{8,}$/.test(form.phone)) errs.phone = "Numéro invalide";
      if (form.clientType === "professionnel" && !form.company.trim()) errs.company = "Indiquez votre société";
    }

    setErrors(errs);
    const firstErr = Object.keys(errs)[0];
    if (firstErr) scrollToError(firstErr);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      if (!formStartedRef.current) {
        formStartedRef.current = true;
        pushTrackingEvent("form_start_devis", {
          event_type: form.eventType,
          page_path: window.location.pathname,
        });
      }
      pushTrackingEvent("quote_step_completed", {
        step,
        event_type: form.eventType,
      });
      setStep((s) => Math.min(s + 1, 5));
      formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const prev = () => {
    setStep((s) => Math.max(s - 1, 1));
    formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!res.ok || !result.successGlobal) {
        throw new Error(result.error || "La demande n'a pas pu être envoyée.");
      }

      pushTrackingEvent("generate_lead", {
        lead_type: form.clientType,
        event_type: form.eventType,
        event_city: form.city,
        guest_count: Number(form.guestCount),
        estimated_value: Number(form.budgetAmount),
        value_type: form.budgetType,
        currency: "EUR",
        lead_id: result.debugId,
        utm_source: form.utmSource || "direct",
        utm_medium: form.utmMedium,
        utm_campaign: form.utmCampaign,
      });

      setShowFireworks(true);
      setTimeout(() => {
        router.push("/merci");
      }, 1200);
    } catch (e) {
      console.error("[DEVIS] Network error:", e);
      setSubmitError(
        "L'envoi a échoué. Réessayez ou appelez-nous directement au 06 60 13 05 96."
      );
      setShowFireworks(false);
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  /* ─── Field helpers ─── */
  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="mt-1.5 text-sm text-red-500">{errors[field]}</p>
    ) : null;

  const labelClass = "block text-sm font-medium text-neutral-700 mb-1.5";
  const inputClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black outline-none transition-all focus:border-purple focus:ring-2 focus:ring-purple/20";

  return (
    <PageTransition>
      {showFireworks && <Fireworks />}

      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white" ref={formContainerRef}>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Site internet</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>
        {/* Header */}
        <div className="bg-black py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold tracking-[0.3em] text-purple-light uppercase">
              En quelques clics
            </span>
            <h1
              className="mt-4 text-4xl font-bold text-white md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Votre devis <span className="text-purple-light">sur mesure</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Décrivez votre événement et recevez une proposition personnalisée sous 24h.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => {
                const StepIcon = s.icon;
                const isActive = step === i + 1;
                const isDone = step > i + 1;
                return (
                  <div key={s.label} className="flex flex-1 flex-col items-center">
                    <div className="flex items-center w-full">
                      {i > 0 && (
                        <div className={`h-0.5 flex-1 transition-colors duration-300 ${isDone || isActive ? "bg-purple" : "bg-neutral-200"}`} />
                      )}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isDone
                            ? "border-purple bg-purple text-white"
                            : isActive
                            ? "border-purple bg-white text-purple shadow-lg shadow-purple/20"
                            : "border-neutral-200 bg-white text-neutral-400"
                        }`}
                      >
                        {isDone ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`h-0.5 flex-1 transition-colors duration-300 ${isDone ? "bg-purple" : "bg-neutral-200"}`} />
                      )}
                    </div>
                    <span className={`mt-2 hidden text-xs font-medium md:block ${isActive || isDone ? "text-purple" : "text-neutral-400"}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animated Table */}
          <TableAnimation step={step} />

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="mt-10 rounded-3xl border border-neutral-100 bg-white p-6 shadow-xl shadow-black/[0.03] md:p-10"
            >
              {/* ═══ STEP 1: Votre Événement ═══ */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2
                      className="text-2xl font-bold text-black md:text-3xl"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Votre <span className="text-purple">événement</span>
                    </h2>
                    <p className="mt-2 text-neutral-500">Parlez-nous de votre projet</p>
                  </div>

                  {/* Type d'événement */}
                  <div id="field-eventType">
                    <label className={labelClass}>Quel type d&apos;événement organisez-vous ?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {eventTypes.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => update("eventType", t.value)}
                          className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                            form.eventType === t.value
                              ? "border-purple bg-purple/5 shadow-md shadow-purple/10"
                              : "border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          <span className="text-2xl">{t.emoji}</span>
                          <span className="text-sm font-medium text-black">{t.label}</span>
                        </button>
                      ))}
                    </div>
                    <FieldError field="eventType" />
                  </div>

                  {/* Date */}
                  <div id="field-eventDate">
                    <label className={labelClass}>Date de l&apos;événement</label>
                    <input
                      type="date"
                      min={today}
                      value={form.eventDate}
                      onChange={(e) => update("eventDate", e.target.value)}
                      className={inputClass}
                    />
                    <FieldError field="eventDate" />
                  </div>

                  {/* Nombre de convives */}
                  <div id="field-guestCount">
                    <label className={labelClass}>Nombre de convives</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      placeholder="Ex: 80"
                      value={form.guestCount}
                      onChange={(e) => update("guestCount", e.target.value)}
                      className={inputClass}
                    />
                    <FieldError field="guestCount" />
                  </div>
                </div>
              )}

              {/* ═══ STEP 2: Lieu & Service ═══ */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2
                      className="text-2xl font-bold text-black md:text-3xl"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Lieu & <span className="text-purple">service</span>
                    </h2>
                    <p className="mt-2 text-neutral-500">Où et comment souhaitez-vous être servi ?</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className={labelClass}>Adresse</label>
                      <input
                        type="text"
                        placeholder="Rue, numéro..."
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Code postal</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="34000"
                        value={form.postalCode}
                        onChange={(e) => update("postalCode", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Ville</label>
                      <input
                        type="text"
                        placeholder="Montpellier"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Options de service */}
                  <div id="field-serviceOption">
                    <label className={labelClass}>Option souhaitée</label>
                    <div className="grid grid-cols-3 gap-3">
                      {serviceOptions.map((o) => (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => update("serviceOption", o.value)}
                          className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                            form.serviceOption === o.value
                              ? "border-purple bg-purple/5 shadow-md shadow-purple/10"
                              : "border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          <span className="text-2xl">{o.icon}</span>
                          <span className="text-sm font-semibold text-black">{o.label}</span>
                          <span className="text-xs text-neutral-500">{o.desc}</span>
                        </button>
                      ))}
                    </div>
                    <FieldError field="serviceOption" />
                  </div>

                  {/* Boissons */}
                  <div>
                    <label className={labelClass}>Boissons</label>
                    <div className="relative">
                      <select
                        value={form.drinks}
                        onChange={(e) => update("drinks", e.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="">Choisir...</option>
                        <option value="avec">Avec boissons</option>
                        <option value="sans">Sans boissons</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ STEP 3: Budget & Précisions ═══ */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2
                      className="text-2xl font-bold text-black md:text-3xl"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Budget & <span className="text-purple">détails</span>
                    </h2>
                    <p className="mt-2 text-neutral-500">Aidez-nous à calibrer votre prestation</p>
                  </div>

                  {/* Type de budget */}
                  <div>
                    <label className={labelClass}>Votre budget est...</label>
                    <div className="flex gap-3">
                      {[
                        { value: "global", label: "Global" },
                        { value: "par-personne", label: "Par personne" },
                      ].map((b) => (
                        <button
                          key={b.value}
                          type="button"
                          onClick={() => update("budgetType", b.value)}
                          className={`flex-1 rounded-xl border-2 py-3 text-sm font-medium transition-all ${
                            form.budgetType === b.value
                              ? "border-purple bg-purple/5 text-purple"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Montant */}
                  <div id="field-budgetAmount">
                    <label className={labelClass}>
                      Montant estimé ({form.budgetType === "par-personne" ? "€ / pers." : "€ total"})
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        placeholder={form.budgetType === "par-personne" ? "Ex: 45" : "Ex: 3000"}
                        value={form.budgetAmount}
                        onChange={(e) => update("budgetAmount", e.target.value)}
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                    <FieldError field="budgetAmount" />
                  </div>

                  {/* Régimes */}
                  <div>
                    <label className={labelClass}>Régimes spécifiques</label>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleDietary(d)}
                          className={`rounded-full border px-4 py-2 text-sm transition-all ${
                            form.dietaryNeeds.includes(d)
                              ? "border-purple bg-purple/10 text-purple font-medium"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>Un souhait particulier ? (optionnel)</label>
                    <textarea
                      rows={3}
                      placeholder="Thème, style de cuisine, allergies spécifiques..."
                      value={form.specialRequest}
                      onChange={(e) => update("specialRequest", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* ═══ STEP 4: Coordonnées ═══ */}
              {step === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2
                      className="text-2xl font-bold text-black md:text-3xl"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Vos <span className="text-purple">coordonnées</span>
                    </h2>
                    <p className="mt-2 text-neutral-500">Pour vous recontacter avec votre proposition</p>
                  </div>

                  {/* Particulier / Pro */}
                  <div>
                    <label className={labelClass}>Vous êtes...</label>
                    <div className="flex gap-3">
                      {[
                        { value: "particulier", label: "Un particulier" },
                        { value: "professionnel", label: "Un professionnel" },
                      ].map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => update("clientType", c.value)}
                          className={`flex-1 rounded-xl border-2 py-3 text-sm font-medium transition-all ${
                            form.clientType === c.value
                              ? "border-purple bg-purple/5 text-purple"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div id="field-firstName">
                      <label className={labelClass}>Prénom *</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className={inputClass}
                      />
                      <FieldError field="firstName" />
                    </div>
                    <div id="field-lastName">
                      <label className={labelClass}>Nom *</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className={inputClass}
                      />
                      <FieldError field="lastName" />
                    </div>
                  </div>

                  {/* Société (conditionnel) */}
                  <AnimatePresence>
                    {form.clientType === "professionnel" && (
                      <motion.div
                        id="field-company"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <label className={labelClass}>Société *</label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          className={inputClass}
                        />
                        <FieldError field="company" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div id="field-email">
                      <label className={labelClass}>Email *</label>
                      <input
                        type="email"
                        inputMode="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputClass}
                      />
                      <FieldError field="email" />
                    </div>
                    <div id="field-phone">
                      <label className={labelClass}>Téléphone *</label>
                      <input
                        type="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={inputClass}
                      />
                      <FieldError field="phone" />
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ STEP 5: Récapitulatif ═══ */}
              {step === 5 && (
                <div className="space-y-8">
                  <div>
                    <h2
                      className="text-2xl font-bold text-black md:text-3xl"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      <span className="text-purple">Récapitulatif</span>
                    </h2>
                    <p className="mt-2 text-neutral-500">Vérifiez vos informations avant envoi</p>
                  </div>

                  <div className="space-y-4 rounded-2xl bg-neutral-50 p-6">
                    <SummaryRow label="Type" value={eventTypes.find((t) => t.value === form.eventType)?.label || form.eventType} />
                    <SummaryRow label="Date" value={form.eventDate ? new Date(form.eventDate).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "-"} />
                    <SummaryRow label="Convives" value={form.guestCount} />
                    {form.address && <SummaryRow label="Lieu" value={`${form.address}, ${form.postalCode} ${form.city}`} />}
                    <SummaryRow label="Service" value={serviceOptions.find((s) => s.value === form.serviceOption)?.label || form.serviceOption} />
                    {form.drinks && <SummaryRow label="Boissons" value={form.drinks === "avec" ? "Avec boissons" : "Sans boissons"} />}
                    <SummaryRow label="Budget" value={`${form.budgetAmount}€ ${form.budgetType === "par-personne" ? "/ pers." : "total"}`} />
                    {form.dietaryNeeds.length > 0 && <SummaryRow label="Régimes" value={form.dietaryNeeds.join(", ")} />}
                    {form.specialRequest && <SummaryRow label="Message" value={form.specialRequest} />}
                    <div className="my-2 border-t border-neutral-200" />
                    <SummaryRow label="Contact" value={`${form.firstName} ${form.lastName}${form.company ? ` — ${form.company}` : ""}`} />
                    <SummaryRow label="Email" value={form.email} />
                    <SummaryRow label="Tél" value={form.phone} />
                  </div>

                  {/* Adresse de facturation différente */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.differentBilling}
                        onChange={(e) => update("differentBilling", e.target.checked)}
                        className="h-5 w-5 rounded border-neutral-300 text-purple focus:ring-purple"
                      />
                      <span className="text-sm text-neutral-700">Adresse de facturation différente ?</span>
                    </label>

                    <AnimatePresence>
                      {form.differentBilling && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 grid gap-4 overflow-hidden md:grid-cols-3"
                        >
                          <div>
                            <label className={labelClass}>Adresse</label>
                            <input
                              type="text"
                              value={form.billingAddress}
                              onChange={(e) => update("billingAddress", e.target.value)}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Code postal</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={form.billingPostalCode}
                              onChange={(e) => update("billingPostalCode", e.target.value)}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Ville</label>
                            <input
                              type="text"
                              value={form.billingCity}
                              onChange={(e) => update("billingCity", e.target.value)}
                              className={inputClass}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-10 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prev}
                    className="flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-600 transition-all hover:border-neutral-400 hover:text-black"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="group flex items-center gap-2 rounded-full bg-purple px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20"
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="group flex items-center gap-2 rounded-full bg-purple px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/20 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                        />
                        Envoi...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Confirmer ma demande
                      </>
                    )}
                  </button>
                )}
              </div>
              {submitError && (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {submitError}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </PageTransition>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="shrink-0 text-sm font-medium text-neutral-500">{label}</span>
      <span className="text-right text-sm font-medium text-black">{value}</span>
    </div>
  );
}
