import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Readex_Pro } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";
// ─────────────────────────────────────────────────────────────────────────────
// Font Loading
// ─────────────────────────────────────────────────────────────────────────────

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-readex",
  display: "swap",
});

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Cabinet Sourire Doré | عيادة سورير دوريه — Alger",
    template: "%s | Cabinet Sourire Doré",
  },
  description:
    "Cabinet dentaire de prestige à Alger. Implantologie, facettes céramique, orthodontie Invisalign, blanchiment Zoom!.",
  keywords: [
    "dentiste alger",
    "cabinet dentaire alger",
    "implant dentaire algerie",
    "facettes ceramique alger",
    "orthodontie invisalign alger",
    "blanchiment dents alger",
    "طبيب أسنان الجزائر",
    "زراعة أسنان الجزائر",
  ],
  authors: [{ name: "Cabinet Sourire Doré" }],
  creator: "Cabinet Sourire Doré",
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    alternateLocale: ["ar_DZ"],
    title: "Cabinet Sourire Doré — Excellence Dentaire à Alger",
    description:
      "Des soins dentaires d'exception dans un cadre de luxe au cœur d'Alger.",
    siteName: "Cabinet Sourire Doré",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#101010",
  colorScheme: "dark",
};

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${readex.variable} bg-charcoal text-text-primary antialiased`}
      >
        <LanguageProvider defaultLocale="fr">{children}</LanguageProvider>
      </body>
    </html>
  );
}
