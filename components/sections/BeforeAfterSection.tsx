// "use client";

// import { useRef, useState, useCallback } from "react";
// import { motion, useInView } from "framer-motion";
// import { useLanguage } from "@/lib/LanguageContext";

// // ─────────────────────────────────────────────────────────────────────────────
// // Before / After Slider
// // ─────────────────────────────────────────────────────────────────────────────

// function ComparisonSlider() {
//   const { t }           = useLanguage();
//   const wrapRef          = useRef<HTMLDivElement>(null);
//   const [pct, setPct]    = useState(50);
//   const dragging         = useRef(false);

//   const update = useCallback((clientX: number) => {
//     const rect = wrapRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     const next = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100));
//     setPct(next);
//   }, []);

//   // Mouse
//   const onMouseDown  = (e: React.MouseEvent)  => { dragging.current = true; update(e.clientX); };
//   const onMouseMove  = (e: React.MouseEvent)  => { if (dragging.current) update(e.clientX); };
//   const onMouseUp    = ()                      => { dragging.current = false; };

//   // Touch
//   const onTouchStart = (e: React.TouchEvent)  => { dragging.current = true; update(e.touches[0].clientX); };
//   const onTouchMove  = (e: React.TouchEvent)  => { if (dragging.current) update(e.touches[0].clientX); };
//   const onTouchEnd   = ()                      => { dragging.current = false; };

//   const ToothBefore = () => (
//     <svg width="100" height="118" viewBox="0 0 100 120" fill="none">
//       <path
//         d="M50 8C35 8 20 18 18 32c-2 14 3 20 5 30 2 10 3 42 8 50 3 5 8 5 10 0l5-25c1-4 3-4 4 0l5 25c2 5 7 5 10 0 5-8 6-40 8-50 2-10 7-16 5-30C76 18 65 8 50 8z"
//         fill="rgba(100,70,20,0.55)"
//         stroke="rgba(120,80,30,0.7)"
//         strokeWidth="2"
//       />
//     </svg>
//   );

//   const ToothAfter = () => (
//     <svg width="100" height="118" viewBox="0 0 100 120" fill="none">
//       <defs>
//         <linearGradient id="ta" x1="18" y1="8" x2="82" y2="120" gradientUnits="userSpaceOnUse">
//           <stop stopColor="#F5F0E8" stopOpacity="0.9" />
//           <stop offset="1" stopColor="#E8D9B8" stopOpacity="0.7" />
//         </linearGradient>
//       </defs>
//       <path
//         d="M50 8C35 8 20 18 18 32c-2 14 3 20 5 30 2 10 3 42 8 50 3 5 8 5 10 0l5-25c1-4 3-4 4 0l5 25c2 5 7 5 10 0 5-8 6-40 8-50 2-10 7-16 5-30C76 18 65 8 50 8z"
//         fill="url(#ta)"
//         stroke="rgba(201,168,76,0.5)"
//         strokeWidth="1.5"
//       />
//       <ellipse cx="37" cy="29" rx="9" ry="5.5" fill="rgba(255,255,255,0.25)" transform="rotate(-15 37 29)" />
//       <ellipse cx="42" cy="45" rx="4" ry="7" fill="rgba(255,255,255,0.08)" transform="rotate(5 42 45)" />
//     </svg>
//   );

//   return (
//     <div
//       ref={wrapRef}
//       className="comparison-wrapper relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-[var(--border-glow)] select-none"
//       style={{ aspectRatio: "16/9" }}
//       onMouseDown={onMouseDown}
//       onMouseMove={onMouseMove}
//       onMouseUp={onMouseUp}
//       onMouseLeave={onMouseUp}
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEnd}
//     >
//       {/* Before panel (full width, background) */}
//       <div
//         className="absolute inset-0 flex items-center justify-center"
//         style={{ background: "linear-gradient(135deg, #1a1200, #2d2000)" }}
//       >
//         <ToothBefore />
//         <span className="
//           absolute start-4 bottom-4 text-[0.62rem] tracking-[0.2em] uppercase
//           px-3 py-1.5 rounded-full border border-[var(--border-subtle)]
//           bg-black/60 backdrop-blur-sm text-text-muted
//         ">
//           {t.beforeAfter.beforeLabel}
//         </span>
//       </div>

//       {/* After panel (clipped) */}
//       <div
//         className="absolute inset-0 flex items-center justify-center"
//         style={{
//           background: "linear-gradient(135deg, #0a1a0a, #001408)",
//           clipPath: `inset(0 ${100 - pct}% 0 0)`,
//         }}
//       >
//         <ToothAfter />
//         <span className="
//           absolute end-4 bottom-4 text-[0.62rem] tracking-[0.2em] uppercase
//           px-3 py-1.5 rounded-full border border-[var(--border-glow)]
//           bg-black/60 backdrop-blur-sm text-gold
//         ">
//           {t.beforeAfter.afterLabel}
//         </span>
//       </div>

//       {/* Handle line */}
//       <div
//         className="absolute top-0 bottom-0 w-0.5 bg-gold"
//         style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
//       >
//         {/* Handle circle */}
//         <div className="
//           absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
//           w-11 h-11 rounded-full bg-gold
//           flex items-center justify-content-center
//           shadow-[0_0_30px_rgba(201,168,76,0.55)]
//           ring-2 ring-charcoal
//         ">
//           <span className="w-full text-center text-charcoal font-bold text-sm select-none">⇄</span>
//         </div>
//       </div>

//       {/* Drag hint (fades on first interaction) */}
//       <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
//         <span className="text-[0.6rem] tracking-widest uppercase text-text-dim px-2 py-1 rounded bg-black/40 backdrop-blur-sm whitespace-nowrap">
//           {t.beforeAfter.dragHint}
//         </span>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Section
// // ─────────────────────────────────────────────────────────────────────────────

// export default function BeforeAfterSection() {
//   const { t }  = useLanguage();
//   const ref     = useRef(null);
//   const inView  = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <section id="avant-apres" className="py-28 relative" ref={ref}>
//       <div className="max-w-7xl mx-auto px-8 md:px-12">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-14"
//         >
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold-dim" />
//             <span className="eyebrow">{t.beforeAfter.eyebrow}</span>
//             <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold-dim" />
//           </div>
//           <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-pearl mb-4">
//             {t.beforeAfter.title}
//           </h2>
//           <p className="text-base text-text-muted font-light max-w-md mx-auto">
//             {t.beforeAfter.lead}
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.97 }}
//           animate={inView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           <ComparisonSlider />
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
// Before / After Slider
// ─────────────────────────────────────────────────────────────────────────────

function ComparisonSlider() {
  const { t } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = Math.max(
      4,
      Math.min(96, ((clientX - rect.left) / rect.width) * 100),
    );
    setPct(next);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    update(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) update(e.clientX);
  };
  const onMouseUp = () => {
    dragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    update(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragging.current) update(e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    dragging.current = false;
  };

  // Dent "Avant" : Teinte terne/grise
  const ToothBefore = () => (
    <svg width="100" height="118" viewBox="0 0 100 120" fill="none">
      <path
        d="M50 8C35 8 20 18 18 32c-2 14 3 20 5 30 2 10 3 42 8 50 3 5 8 5 10 0l5-25c1-4 3-4 4 0l5 25c2 5 7 5 10 0 5-8 6-40 8-50 2-10 7-16 5-30C76 18 65 8 50 8z"
        fill="rgba(100,110,140,0.35)"
        stroke="rgba(100,120,150,0.4)"
        strokeWidth="2"
      />
    </svg>
  );

  // Dent "Après" : Éclatante et Bleutée
  const ToothAfter = () => (
    <svg width="100" height="118" viewBox="0 0 100 120" fill="none">
      <defs>
        <linearGradient
          id="ta"
          x1="18"
          y1="8"
          x2="82"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#BAE6FD" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M50 8C35 8 20 18 18 32c-2 14 3 20 5 30 2 10 3 42 8 50 3 5 8 5 10 0l5-25c1-4 3-4 4 0l5 25c2 5 7 5 10 0 5-8 6-40 8-50 2-10 7-16 5-30C76 18 65 8 50 8z"
        fill="url(#ta)"
        stroke="rgba(14, 165, 233, 0.4)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="37"
        cy="29"
        rx="9"
        ry="5.5"
        fill="rgba(255,255,255,0.6)"
        transform="rotate(-15 37 29)"
      />
      <ellipse
        cx="42"
        cy="45"
        rx="4"
        ry="7"
        fill="rgba(255,255,255,0.3)"
        transform="rotate(5 42 45)"
      />
    </svg>
  );

  return (
    <div
      ref={wrapRef}
      className="comparison-wrapper relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-sky-500/20 select-none shadow-2xl"
      style={{ aspectRatio: "16/9" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Before panel - Dark Slate Blue */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
      >
        <ToothBefore />
        <span
          className="
          absolute start-4 bottom-4 text-[0.62rem] tracking-[0.2em] uppercase
          px-3 py-1.5 rounded-full border border-white/10
          bg-slate-900/60 backdrop-blur-sm text-slate-400
        "
        >
          {t.beforeAfter.beforeLabel}
        </span>
      </div>

      {/* After panel - Clean Medical Blue */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0c4a6e, #075985)",
          clipPath: `inset(0 ${100 - pct}% 0 0)`,
        }}
      >
        <ToothAfter />
        <span
          className="
          absolute end-4 bottom-4 text-[0.62rem] tracking-[0.2em] uppercase
          px-3 py-1.5 rounded-full border border-sky-400/30
          bg-sky-950/60 backdrop-blur-sm text-sky-400
        "
        >
          {t.beforeAfter.afterLabel}
        </span>
      </div>

      {/* Handle line - Now Blue */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-sky-400"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
      >
        <div
          className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-11 h-11 rounded-full bg-sky-500
          flex items-center justify-center
          shadow-[0_0_20px_rgba(14,165,233,0.6)]
          ring-2 ring-slate-950
        "
        >
          <span className="w-full text-center text-slate-950 font-bold text-sm select-none">
            ⇄
          </span>
        </div>
      </div>

      {/* Drag hint */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="text-[0.6rem] tracking-widest uppercase text-sky-200/60 px-3 py-1 rounded-full bg-sky-900/40 backdrop-blur-sm border border-sky-400/20">
          {t.beforeAfter.dragHint}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

export default function BeforeAfterSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="avant-apres" className="py-28 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-sky-500/50" />
            <span className="eyebrow">{t.beforeAfter.eyebrow}</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-sky-500/50" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-pearl mb-4">
            {t.beforeAfter.title}
          </h2>
          <p className="text-base text-slate-400 font-light max-w-md mx-auto">
            {t.beforeAfter.lead}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ComparisonSlider />
        </motion.div>
      </div>
    </section>
  );
}
