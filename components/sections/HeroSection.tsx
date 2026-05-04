"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const floatVariants = {
  animate: {
    y: [0, -28, 0],
    scale: [1, 1.04, 1],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatVariants2 = {
  animate: {
    y: [0, -20, 0],
    scale: [1, 1.05, 1],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Tooth SVG (decorative)
// ─────────────────────────────────────────────────────────────────────────────
function ToothSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="tg"
          x1="18"
          y1="8"
          x2="82"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1b4ae5" stopOpacity="1" />
          <stop offset="1" stopColor="#01080c" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <path
        d="M50 8C35 8 20 18 18 32c-2 14 3 20 5 30 2 10 3 42 8 50 3 5 8 5 10 0l5-25c1-4 3-4 4 0l5 25c2 5 7 5 10 0 5-8 6-40 8-50 2-10 7-16 5-30C76 18 65 8 50 8z"
        fill="url(#tg)"
        stroke="rgba(80, 115, 191, 0.35)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="38"
        cy="28"
        rx="7"
        ry="4.5"
        fill="rgba(78, 185, 227, 0.303)"
        transform="rotate(-18 38 28)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen min-h-[640px] flex items-center overflow-hidden"
    >
      {/* ── Background ───────────────────────────────────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[#0A0A0A]" />

        {/* Ken Burns overlay */}
        <motion.div
          className="absolute inset-[-8%] bg-[radial-gradient(ellipse_60%_50%_at_30%_40%,rgba(76, 147, 201, 0.13)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_80%_60%,rgba(201,168,76,0.07)_0%,transparent_70%)]"
          animate={{ scale: [1, 1.08], x: ["0%", "-2%"], y: ["0%", "2%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(46, 134, 221, 0.04) 2px, transparent 1px), linear-gradient(90deg, rgba(87, 121, 200, 0.04) 2px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, transparent 20%, black 80%)",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-[-10%] right-[5%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          variants={floatVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[320px] h-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          variants={floatVariants2}
          animate="animate"
        />
      </motion.div>

      {/* ── Floating Tooth (decorative) ──────────────────────────────────── */}
      <motion.div
        className="absolute right-[8%] top-2/6 -translate-y-1/2 w-[240px] opacity-20 hidden lg:block z-0"
        variants={floatVariants}
        animate="animate"
      >
        <ToothSVG />
      </motion.div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeInVariants}
            className="flex items-center gap-4 mb-8 lg:mt-12"
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-blue-300" />
            <span className="text-[0.68rem] tracking-[0.3em] uppercase font-medium text-blue-300">
              {t.hero.eyebrow}
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-blue-300" />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUpVariants}
            className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[1.08] text-pearl mb-6"
          >
            {t.hero.titleLine1}
            <br />
            <em className="gold-gradient-text not-italic">
              {t.hero.titleLine2}
            </em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="text-base md:text-md text-gray-200 font-light leading-relaxed max-w-lg mb-10"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#booking" className="btn-primary group">
              {t.hero.ctaPrimary}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a href="#services" className="btn-outline text-blue-300">
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Stats (bottom right) ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.19, 1, 0.22, 1] }}
        className="absolute bottom-10 end-10 z-10 flex gap-6 md:gap-8"
      >
        {[
          { value: "15+", label: t.hero.statYears },
          { value: "3K+", label: t.hero.statPatients },
          { value: "98%", label: t.hero.statSatisfaction },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-serif text-3xl font-bold leading-none mb-1 gold-gradient-text">
              {stat.value}
            </div>
            <div className="text-[0.6rem] tracking-[0.18em] uppercase text-text-dim">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll hint (bottom center) ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="
          absolute bottom-10 left-1/2 -translate-x-1/2 z-10
          flex flex-col items-center gap-2
          text-[0.6rem] tracking-[0.28em] uppercase text-blue-400
          hidden md:flex
        "
      >
        <span>{t.hero.scrollHint}</span>
        <div
          className="w-px h-16 bg-gradient-to-b from-blue-300 to-transparent"
          style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
        />
        <ChevronDown size={12} className="text-blue-300 animate-bounce" />
      </motion.div>
    </section>
  );
}
