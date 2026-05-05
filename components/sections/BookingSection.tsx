"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import * as emailjs from "@emailjs/browser";

// ─────────────────────────────────────────────────────────────────────────────
// Step Indicator
// ─────────────────────────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;

        return (
          <div
            key={n}
            className="flex items-center gap-0 flex-1 last:flex-none"
          >
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center
              text-xs font-semibold transition-all duration-400 shrink-0
              ${
                done
                  ? "bg-sky-500 text-slate-950"
                  : active
                    ? "bg-sky-500/15 text-sky-400 border border-sky-400"
                    : "bg-slate-800 text-slate-500 border border-slate-700"
              }
            `}
            >
              {done ? <CheckCircle size={14} /> : n}
            </div>
            {n < total && (
              <div
                className={`flex-1 h-px mx-2 transition-colors duration-500 ${done ? "bg-sky-500/50" : "bg-slate-700"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Service Chip
// ─────────────────────────────────────────────────────────────────────────────

function ServiceChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-4 py-3 rounded-xl text-sm font-medium
        border transition-all duration-300 text-start
        ${
          selected
            ? "border-sky-400 bg-sky-400/10 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
            : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-sky-400/50"
        }
      `}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Booking Form
// ─────────────────────────────────────────────────────────────────────────────

function BookingForm() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);

  // État unique pour toutes les données du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    date: "",
    time: "09:00",
    urgency: "no",
  });

  const s = t.booking.steps;

  const panelVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.25 } },
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const serviceKeys = Object.entries(t.booking.services) as [string, string][];

  // LOGIQUE D'ENVOI EMAILJS
  const handleSubmit = async () => {
    // Identifiants EmailJS avec fallback pour éviter l'erreur de type
    const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    // Vérification de sécurité pour TypeScript (et runtime)
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        "EmailJS credentials are missing in environment variables.",
      );
      alert("Configuration error. Please contact the administrator.");
      return;
    }

    setIsSending(true);

    try {
      const templateParams = {
        user_name: `${formData.firstName} ${formData.lastName}`,
        user_email: formData.email,
        user_phone: formData.phone,
        service: formData.service,
        appointment_date: formData.date,
        appointment_time: formData.time,
        urgency: formData.urgency === "yes" ? "URGENT" : "Normal",
        message: formData.message,
      };

      // Maintenant TypeScript est sûr que les IDs sont des strings
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setStep(4); // Succès
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      alert(
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous appeler.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8 border-slate-700/50">
      {step <= 3 && <StepIndicator current={step} total={3} />}

      <AnimatePresence mode="wait">
        {/* Step 1 — Personal info */}
        {step === 1 && (
          <motion.div key="s1" {...panelVariants}>
            <h3 className="font-serif text-lg font-bold mb-1 text-pearl">
              {s.s1.title}
            </h3>
            <p className="text-xs text-slate-500 mb-6">{s.s1.subtitle}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.65rem] tracking-widest uppercase text-slate-400 mb-2">
                  {s.s1.firstName}
                </label>
                <input
                  name="firstName"
                  className="form-input"
                  type="text"
                  placeholder="Amine"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-widest uppercase text-slate-400 mb-2">
                  {s.s1.lastName}
                </label>
                <input
                  name="lastName"
                  className="form-input"
                  type="text"
                  placeholder="Benali"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-[0.65rem] tracking-widest uppercase text-slate-400 mb-2">
                {s.s1.phone}
              </label>
              <input
                name="phone"
                className="form-input"
                type="tel"
                placeholder="07 70707070"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-[0.65rem] tracking-widest uppercase text-slate-400 mb-2">
                {s.s1.email}
              </label>
              <input
                name="email"
                className="form-input"
                type="email"
                placeholder="amine@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="btn-primary text-xs disabled:opacity-50"
                onClick={() => setStep(2)}
                disabled={!formData.firstName || !formData.phone}
              >
                {s.s1.next}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Service selection */}
        {step === 2 && (
          <motion.div key="s2" {...panelVariants}>
            <h3 className="font-serif text-lg font-bold mb-1 text-pearl">
              {s.s2.title}
            </h3>
            <p className="text-xs text-slate-500 mb-6">{s.s2.subtitle}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {serviceKeys.map(([key, label]) => (
                <ServiceChip
                  key={key}
                  label={label}
                  selected={formData.service === label}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, service: label }))
                  }
                />
              ))}
            </div>
            <div>
              <label className="block text-[0.65rem] tracking-widest uppercase text-slate-400 mb-2">
                {s.s2.message}
              </label>
              <textarea
                name="message"
                className="form-input resize-none"
                rows={3}
                placeholder="..."
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-5 py-2.5 rounded-full text-xs font-medium text-slate-400 border border-slate-700 hover:border-slate-500"
                onClick={() => setStep(1)}
              >
                {s.s2.back}
              </button>
              <button
                className="btn-primary text-xs disabled:opacity-50"
                onClick={() => setStep(3)}
                disabled={!formData.service}
              >
                {s.s2.next}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Date + confirm */}
        {step === 3 && (
          <motion.div key="s3" {...panelVariants}>
            <h3 className="font-serif text-lg font-bold mb-1 text-pearl">
              {s.s3.title}
            </h3>
            <p className="text-xs text-slate-500 mb-6">{s.s3.subtitle}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[0.65rem] tracking-widest uppercase text-slate-400 mb-2">
                  {s.s3.date}
                </label>
                <input
                  name="date"
                  className="form-input"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-widest uppercase text-slate-400 mb-2">
                  {s.s3.time}
                </label>
                <select
                  name="time"
                  className="form-input"
                  value={formData.time}
                  onChange={handleInputChange}
                >
                  {[
                    "08:00",
                    "09:00",
                    "10:00",
                    "11:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                  ].map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[0.65rem] tracking-widest uppercase text-slate-400 mb-2">
                {s.s3.urgency}
              </label>
              <div className="flex gap-3">
                {[
                  { val: "no", label: s.s3.urgencyNo },
                  { val: "yes", label: s.s3.urgencyYes },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, urgency: val }))
                    }
                    className={`flex-1 py-3 rounded-xl text-sm border transition-all duration-300 ${formData.urgency === val ? "border-sky-400 bg-sky-400/10 text-sky-400" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="px-5 py-2.5 rounded-full text-xs font-medium text-slate-400 border border-slate-700 hover:border-slate-500"
                onClick={() => setStep(2)}
              >
                {s.s3.back}
              </button>
              <button
                className="btn-primary text-xs flex items-center gap-2"
                onClick={handleSubmit}
                disabled={isSending || !formData.date}
              >
                {isSending && <Loader2 size={14} className="animate-spin" />}
                {s.s3.confirm}
              </button>
            </div>
          </motion.div>
        )}

        {/* Success */}
        {step === 4 && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
            >
              <CheckCircle size={28} className="text-white" />
            </motion.div>
            <h3 className="font-serif text-xl font-bold mb-2 text-pearl">
              {t.booking.success.title}
            </h3>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              {t.booking.success.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Info Panel
// ─────────────────────────────────────────────────────────────────────────────

function InfoPanel() {
  const { t } = useLanguage();
  const b = t.booking;

  const contacts = [
    {
      icon: <Phone size={16} className="text-sky-400" />,
      label: b.phoneLabel,
      value: "0555 00 00 00",
      href: "tel:+213555000000",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      label: "WhatsApp",
      value: "0555 00 00 00",
      href: "https://wa.me/213555000000",
    },
    {
      icon: <Mail size={16} className="text-sky-400" />,
      label: "Email",
      value: "contact@souriedental.dz",
      href: "mailto:contact@souriedental.dz",
    },
  ];

  return (
    <div className="glass-blue rounded-2xl p-8 sticky top-24 border border-sky-500/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-6 bg-sky-500/50" />
        <span className="eyebrow text-sky-400">{b.infoPanelTitle}</span>
      </div>
      <p className="text-sm text-slate-400 mb-6 leading-relaxed">
        {b.infoPanelLead}
      </p>
      <div className="flex flex-col gap-3 mb-7">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-700/50 bg-slate-900/20 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-300 group"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              {c.icon}
            </div>
            <div>
              <div className="text-[0.6rem] tracking-widest uppercase text-slate-500 mb-0.5">
                {c.label}
              </div>
              <div className="text-sm font-medium text-pearl">{c.value}</div>
            </div>
          </a>
        ))}
      </div>
      <div className="border-t border-slate-700 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={13} className="text-sky-400" />
          <span className="text-[0.6rem] tracking-widest uppercase text-slate-500">
            {b.hoursTitle}
          </span>
        </div>
        {b.hours.map((line) => (
          <p key={line} className="text-sm text-slate-400 leading-loose">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Section Export
// ─────────────────────────────────────────────────────────────────────────────

export default function BookingSection() {
  const { t } = useLanguage();

  return (
    <section
      id="booking"
      className="py-28 relative"
      style={{ background: "#0f172a" }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-sky-500/50" />
            <span className="eyebrow text-sky-400">{t.booking.eyebrow}</span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-pearl whitespace-pre-line">
            {t.booking.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <InfoPanel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
