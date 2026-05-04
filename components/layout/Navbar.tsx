"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function Navbar() {
  const { t, locale, dir, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#avant-apres", label: t.nav.beforeAfter },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={`
          fixed top-0 inset-x-0 z-50
          flex items-center justify-between
          px-8 md:px-12 transition-all duration-500
          ${
            scrolled
              ? "py-3 bg-slate-950/90 backdrop-blur-xl border-b border-[var(--border-glow)]"
              : "py-4 bg-transparent"
          }
        `}
      >
        {/* ── Logo (Updated to Blue) ── */}
        <Link href="/">
          {/* <div
            className="
            w-10 h-10 rounded-full flex items-center justify-center
            text-white font-bold text-sm font-serif
            bg-gradient-to-br from-sky-400 to-sky-600
            ring-1 ring-sky-400/30 group-hover:ring-sky-400/60
            transition-all duration-300
          "
          >
            SD
          </div> */}
          <div>
            <span className="block text-base font-serif font-bold tracking-wide text-pearl">
              {t.siteName}
            </span>
            <span className="block text-[0.6rem] tracking-[0.22em] uppercase text-sky-400 -mt-0.5 font-sans">
              {t.siteTagline}
            </span>
          </div>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                relative text-[0.72rem] tracking-widest uppercase font-medium
                text-slate-400 hover:text-sky-400 transition-colors duration-300
                after:absolute after:bottom-[-4px] after:inset-x-0 after:h-px
                after:bg-sky-400 after:scale-x-0 hover:after:scale-x-100
                after:transition-transform after:duration-300 after:origin-center
              "
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Actions ── */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="
              flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
              text-[0.7rem] tracking-widest uppercase font-medium text-sky-400
              border border-sky-400/30 bg-sky-400/5
              hover:bg-sky-400/10 hover:border-sky-400 transition-all duration-300
            "
          >
            <Globe size={11} />
            {t.nav.langSwitch}
          </button>

          {/* Utilise la classe .btn-primary définie dans globals.css (déjà bleue) */}
          <a href="#booking" className="btn-primary text-[0.68rem] px-5 py-2.5">
            {t.nav.bookCta}
          </a>
        </div>

        {/* ── Mobile Menu Toggle ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-pearl p-1"
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="
              fixed top-16 inset-x-0 z-40
              glass border-b border-[var(--border-subtle)]
              px-6 py-6 flex flex-col gap-4 md:hidden
            "
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-slate-400 hover:text-sky-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => {
                  toggleLocale();
                  setMenuOpen(false);
                }}
                className="
                  flex items-center gap-1.5 px-3.5 py-2 rounded-full
                  text-[0.7rem] tracking-widest uppercase font-medium text-sky-400
                  border border-sky-400/30 bg-sky-400/5
                "
              >
                <Globe size={11} />
                {t.nav.langSwitch}
              </button>
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-[0.68rem] px-4 py-2"
              >
                {t.nav.bookCta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
