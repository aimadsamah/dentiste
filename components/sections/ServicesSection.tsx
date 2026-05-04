"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Sparkles, AlignCenter, Sun, Heart } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceCardProps {
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag: string;
  price?: string;
  priceLabel?: string;
  featured?: boolean;
  tall?: boolean;
  delay?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Magnetic Glow Card (Updated to Medical Blue)
// ─────────────────────────────────────────────────────────────────────────────

function ServiceCard({
  num,
  icon,
  title,
  desc,
  tag,
  price,
  priceLabel,
  featured = false,
  tall = false,
  delay = 0,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, show: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
  };

  const cardClass = [
    "service-card group relative overflow-hidden border border-slate-800 bg-slate-900/40 backdrop-blur-md rounded-2xl p-8",
    featured ? "md:col-span-2 border-sky-500/20 bg-sky-950/10" : "",
    tall ? "md:row-span-2" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      ref={ref}
      className={cardClass}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -6, borderColor: "rgba(56, 189, 248, 0.3)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, show: false }))}
    >
      {/* Magnetic glow - Updated to Blue */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glow.show ? 1 : 0,
          background: `radial-gradient(400px circle at ${glow.x}px ${glow.y}px, rgba(14, 165, 233, 0.12), transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-sky-400 mb-4 font-semibold">
          {num}
        </span>

        <div
          className="
          w-12 h-12 rounded-xl mb-6 flex items-center justify-center
          bg-sky-500/10 border border-sky-500/20
          group-hover:bg-sky-500/20 group-hover:border-sky-400/40 transition-all duration-300
        "
        >
          {/* We clone the icon to inject the sky-400 color */}
          {icon}
        </div>

        <h3
          className={`font-serif font-bold text-pearl mb-3 leading-tight ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}
        >
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">{desc}</p>

        <span
          className="
          inline-block text-[0.62rem] tracking-widest uppercase text-sky-300
          px-3 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5
        "
        >
          {tag}
        </span>

        {/* {price && (
          <div className="mt-6 pt-6 border-t border-slate-800 flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-white bg-gradient-to-r from-white to-sky-300 bg-clip-text text-transparent">
              {price}
            </span>
            <span className="text-[0.65rem] tracking-widest text-slate-500 uppercase font-medium">
              {priceLabel}
            </span>
          </div>
        )} */}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { items } = t.services;

  return (
    <section id="services" className="py-28 relative" ref={ref}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-sky-500/50" />
            <span className="eyebrow text-sky-400">{t.services.eyebrow}</span>
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-tight text-pearl whitespace-pre-line">
            {t.services.title}
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {/* Featured: Implantology */}
          <ServiceCard
            num={items.implant.num}
            icon={<Layers size={22} className="text-sky-400" />}
            title={items.implant.title}
            desc={items.implant.desc}
            tag={items.implant.tag}
            price="55 000"
            priceLabel={items.implant.priceLabel}
            featured
            delay={0.05}
          />

          {/* Tall: Veneers */}
          <ServiceCard
            num={items.veneer.num}
            icon={<Sparkles size={22} className="text-sky-400" />}
            title={items.veneer.title}
            desc={items.veneer.desc}
            tag={items.veneer.tag}
            price="18 000"
            priceLabel={items.veneer.priceLabel}
            tall
            delay={0.1}
          />

          {/* Orthodontics */}
          <ServiceCard
            num={items.ortho.num}
            icon={<AlignCenter size={22} className="text-sky-400" />}
            title={items.ortho.title}
            desc={items.ortho.desc}
            tag={items.ortho.tag}
            delay={0.15}
          />

          {/* Whitening */}
          <ServiceCard
            num={items.whitening.num}
            icon={<Sun size={22} className="text-sky-400" />}
            title={items.whitening.title}
            desc={items.whitening.desc}
            tag={items.whitening.tag}
            delay={0.2}
          />

          {/* Pediatric */}
          <ServiceCard
            num={items.pediatric.num}
            icon={<Heart size={22} className="text-sky-400" />}
            title={items.pediatric.title}
            desc={items.pediatric.desc}
            tag={items.pediatric.tag}
            delay={0.25}
          />
        </div>
      </div>
    </section>
  );
}
