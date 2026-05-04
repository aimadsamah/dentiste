import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Core Palette ──────────────────────────────────────────────
        charcoal: { DEFAULT: "#101010", 900: "#0A0A0A", 800: "#101010" },
        graphite: { DEFAULT: "#1A1A1A", 2: "#222222", 3: "#2D2D2D" },
        surface: { DEFAULT: "#181818", 2: "#1E1E1E" },

        // ── Accent: Metallic Gold ──────────────────────────────────────
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C96A",
          dim: "#8A6E30",
          pale: "#F0DFA0",
          glow: "rgba(201,168,76,0.25)",
        },

        // ── Neutral ───────────────────────────────────────────────────
        pearl: { DEFAULT: "#F5F0E8" },
        ivory: { DEFAULT: "#EDE8DF" },

        // ── Semantic Text ─────────────────────────────────────────────
        "text-primary": "#F5F0E8",
        "text-muted": "#9A9A9A",
        "text-dim": "#6A6A6A",
        "text-disabled": "#444444",

        // ── Borders ───────────────────────────────────────────────────
        "border-glow": "rgba(201,168,76,0.25)",
        "border-subtle": "rgba(255,255,255,0.06)",
        "border-medium": "rgba(255,255,255,0.10)",
      },

      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        arabic: ["Readex Pro", "IBM Plex Sans Arabic", "sans-serif"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
      },

      letterSpacing: {
        "widest-2": "0.2em",
        "widest-3": "0.3em",
      },

      backgroundImage: {
        // Hero gradient base
        "hero-base":
          "linear-gradient(135deg, #0A0A0A 0%, #1A1408 50%, #0D0D0D 100%)",
        // Gold shimmer
        "gold-shimmer": "linear-gradient(135deg, #E8C96A, #C9A84C, #8A6E30)",
        // Subtle surface gradient
        "surface-gradient":
          "linear-gradient(160deg, rgba(201,168,76,0.08) 0%, rgba(20,20,20,0.95) 100%)",
        // Grid overlay
        "grid-overlay":
          "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
      },

      backgroundSize: {
        "grid-60": "60px 60px",
      },

      boxShadow: {
        "glow-gold": "0 0 30px rgba(201,168,76,0.35)",
        "glow-gold-lg": "0 0 60px rgba(201,168,76,0.25)",
        "card-hover":
          "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.25)",
        "inset-top": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },

      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },

      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        kenburns: "kenburns 20s ease-in-out infinite alternate",
        "scroll-line": "scrollPulse 2s ease-in-out infinite",
        "pin-pulse": "pinPulse 3s ease-in-out infinite",
        "wa-pulse": "waPulse 3s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease forwards",
        "fade-up": "fadeUp 0.8s ease forwards",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-30px) scale(1.05)" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-2%, 2%)" },
        },
        scrollPulse: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "49%": { transform: "scaleY(1)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        pinPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 15px rgba(201,168,76,0.10), 0 0 0 30px rgba(201,168,76,0.05)",
          },
          "50%": {
            boxShadow:
              "0 0 0 22px rgba(201,168,76,0.15), 0 0 0 44px rgba(201,168,76,0.05)",
          },
        },
        waPulse: {
          "0%, 100%": { boxShadow: "0 4px 20px rgba(37,211,102,0.4)" },
          "50%": { boxShadow: "0 4px 30px rgba(37,211,102,0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },

      backdropBlur: {
        xs: "4px",
      },

      // Grain texture via mask
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};

export default config;
