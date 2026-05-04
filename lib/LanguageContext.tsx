"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type Locale = "fr" | "ar";

export interface Translations {
  // ── Meta ──────────────────────────────────────────────────────────────────
  siteName: string;
  siteTagline: string;
  metaDescription: string;

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: {
    about: string;
    services: string;
    beforeAfter: string;
    contact: string;
    bookCta: string;
    langSwitch: string;
  };

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statYears: string;
    statPatients: string;
    statSatisfaction: string;
    scrollHint: string;
  };

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    foundedBadge: string;
    features: {
      tech: { title: string; body: string };
      comfort: { title: string; body: string };
      availability: { title: string; body: string };
    };
  };

  // ── Services ──────────────────────────────────────────────────────────────
  services: {
    eyebrow: string;
    title: string;
    items: {
      implant: {
        num: string;
        title: string;
        desc: string;
        tag: string;
        priceLabel: string;
      };
      veneer: {
        num: string;
        title: string;
        desc: string;
        tag: string;
        priceLabel: string;
      };
      ortho: { num: string; title: string; desc: string; tag: string };
      whitening: { num: string; title: string; desc: string; tag: string };
      pediatric: { num: string; title: string; desc: string; tag: string };
    };
  };

  // ── Before / After ────────────────────────────────────────────────────────
  beforeAfter: {
    eyebrow: string;
    title: string;
    lead: string;
    beforeLabel: string;
    afterLabel: string;
    dragHint: string;
  };

  // ── Booking ───────────────────────────────────────────────────────────────
  booking: {
    eyebrow: string;
    title: string;
    infoPanelTitle: string;
    infoPanelLead: string;
    phoneLabel: string;
    hoursTitle: string;
    hours: string[];
    steps: {
      s1: {
        title: string;
        subtitle: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        next: string;
      };
      s2: {
        title: string;
        subtitle: string;
        message: string;
        back: string;
        next: string;
      };
      s3: {
        title: string;
        subtitle: string;
        date: string;
        time: string;
        urgency: string;
        urgencyNo: string;
        urgencyYes: string;
        back: string;
        confirm: string;
      };
    };
    services: {
      implant: string;
      veneer: string;
      ortho: string;
      whitening: string;
      consult: string;
      other: string;
    };
    success: { title: string; body: string };
  };

  // ── Location ──────────────────────────────────────────────────────────────
  location: {
    eyebrow: string;
    title: string;
    addressTitle: string;
    street: string;
    city: string;
    parkingNote: string;
    metroNote: string;
    openMaps: string;
    pinLabel: string;
  };

  // ── Testimonials ──────────────────────────────────────────────────────────
  testimonials: {
    eyebrow: string;
    title: string;
    items: {
      text: string;
      author: string;
      city: string;
      initials: string;
    }[];
  };

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    tagline: string;
    description: string;
    navTitle: string;
    servicesTitle: string;
    contactTitle: string;
    copyright: string;
    location: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// French Content
// ─────────────────────────────────────────────────────────────────────────────

const fr: Translations = {
  siteName: "Sourire Doré",
  siteTagline: "Cabinet Dentaire de Prestige",
  metaDescription:
    "Cabinet dentaire de luxe à Alger. Implantologie, facettes céramique, orthodontie invisalign et blanchiment professionnel.",

  nav: {
    about: "À Propos",
    services: "Services",
    beforeAfter: "Avant / Après",
    contact: "Contact",
    bookCta: "Prendre RDV",
    langSwitch: "العربية",
  },

  hero: {
    eyebrow: "Excellence Dentaire · Alger",
    titleLine1: "Votre Sourire,",
    titleLine2: "Notre Chef-d'Œuvre",
    subtitle:
      "Bienvenue au Cabinet Sourire Doré — où la technologie de pointe rencontre l'art dentaire. Des soins d'exception dans un cadre de luxe, au cœur d'Alger.",
    ctaPrimary: "Prendre Rendez-vous",
    ctaSecondary: "Découvrir nos soins",
    statYears: "Ans d'exp.",
    statPatients: "Patients",
    statSatisfaction: "Satisfaction",
    scrollHint: "Défiler",
  },

  about: {
    eyebrow: "Notre Histoire",
    title: "L'Art Dentaire\nRéinventé",
    lead: "Depuis 2009, le Cabinet Sourire Doré est la référence du soin dentaire haut de gamme à Alger. Notre équipe de spécialistes allie expertise clinique et sens esthétique aigu.",
    foundedBadge: "Fondé à Alger",
    features: {
      tech: {
        title: "Technologie 3D & Numérique",
        body: "Scanner intra-oral, radiographie 3D et conception CAD/CAM pour des résultats précis et durables.",
      },
      comfort: {
        title: "Confort & Sérénité",
        body: "Un environnement chaleureux, des protocoles anti-douleur avancés et une prise en charge personnalisée.",
      },
      availability: {
        title: "Disponibilité & Réactivité",
        body: "Sur rendez-vous 6j/7. Urgences dentaires traitées en priorité. Contact WhatsApp disponible.",
      },
    },
  },

  services: {
    eyebrow: "Nos Spécialités",
    title: "La Matrice\ndes Soins d'Excellence",
    items: {
      implant: {
        num: "01",
        title: "Implantologie Avancée",
        desc: "Restauration complète avec implants en titane zircone de dernière génération. Protocole one-day surgery disponible. Résultat naturel et durable garanti.",
        tag: "Chirurgie · Prothèse",
        priceLabel: "DZD / implant",
      },
      veneer: {
        num: "02",
        title: "Facettes Céramique",
        desc: "Transformation du sourire en 2 séances. Facettes ultra-minces en céramique emax pressée, posées sans abraser la dent. La Hollywood Smile à Alger.",
        tag: "Esthétique · Réhab.",
        priceLabel: "DZD / dent",
      },
      ortho: {
        num: "03",
        title: "Orthodontie",
        desc: "Aligneurs transparents Invisalign et bagues céramique esthétiques. Plan de traitement numérique 3D.",
        tag: "Alignement · Bagues",
      },
      whitening: {
        num: "04",
        title: "Blanchiment Premium",
        desc: "Système Philips ZOOM! professionnel. Jusqu'à 8 teintes de blancheur en une seule séance.",
        tag: "Esthétique",
      },
      pediatric: {
        num: "05",
        title: "Pédodontie",
        desc: "Soins dentaires pour enfants dans un cadre rassurant. Approche ludique et douce pour prévenir la peur.",
        tag: "Enfants · Prévention",
      },
    },
  },

  beforeAfter: {
    eyebrow: "Transformations Réelles",
    title: "Avant & Après",
    lead: "Découvrez des transformations authentiques réalisées par nos spécialistes.",
    beforeLabel: "Avant",
    afterLabel: "Après",
    dragHint: "Faites glisser pour comparer",
  },

  booking: {
    eyebrow: "Réservation",
    title: "Prendre un\nRendez-vous",
    infoPanelTitle: "Infos Pratiques",
    infoPanelLead:
      "Notre équipe est à votre disposition. Contactez-nous par le moyen qui vous convient.",
    phoneLabel: "Téléphone",
    hoursTitle: "Horaires d'Ouverture",
    hours: [
      "Dim – Jeu : 08h00 – 18h00",
      //"Vendredi : 08h00 – 12h00",
      "Samedi : 09h00 – 16h00",
    ],
    steps: {
      s1: {
        title: "Vos Coordonnées",
        subtitle: "Renseignez vos informations personnelles",
        firstName: "Prénom",
        lastName: "Nom",
        phone: "Téléphone",
        email: "Email (optionnel)",
        next: "Suivant →",
      },
      s2: {
        title: "Choisir un Soin",
        subtitle: "Sélectionnez la prestation souhaitée",
        message: "Message (optionnel)",
        back: "← Retour",
        next: "Suivant →",
      },
      s3: {
        title: "Date & Confirmation",
        subtitle: "Choisissez votre créneau préféré",
        date: "Date",
        time: "Heure",
        urgency: "Urgence dentaire ?",
        urgencyNo: "Non",
        urgencyYes: "Oui — Urgence",
        back: "← Retour",
        confirm: "Confirmer le RDV",
      },
    },
    services: {
      implant: "Implantologie",
      veneer: "Facettes",
      ortho: "Orthodontie",
      whitening: "Blanchiment",
      consult: "Consultation",
      other: "Autre",
    },
    success: {
      title: "Demande Envoyée !",
      body: "Notre équipe vous contactera dans les 2h pour confirmer votre rendez-vous.",
    },
  },

  location: {
    eyebrow: "Localisation",
    title: "Nous Trouver",
    addressTitle: "Adresse",
    street: "12 Rue Didouche Mourad",
    city: "Alger Centre, 16000 — Algérie",
    parkingNote: "Parking disponible à proximité",
    metroNote: "Proche Métro Grande Poste",
    openMaps: "Ouvrir dans Maps",
    pinLabel: "Cabinet Sourire Doré — Alger Centre",
  },

  testimonials: {
    eyebrow: "Témoignages",
    title: "Ce que disent\nnos Patients",
    items: [
      {
        text: "Le résultat de mes implants est bluffant. Je n'aurais jamais cru retrouver un sourire aussi naturel. L'équipe est professionnelle et rassurante.",
        author: "Karim A.",
        city: "Alger",
        initials: "KA",
      },
      {
        text: "Mes facettes céramiques ont transformé mon sourire en 2 séances. Un vrai chef-d'œuvre ! Le cabinet est moderne et l'accueil exceptionnel.",
        author: "Sara B.",
        city: "Oran",
        initials: "SB",
      },
      {
        text: "Le Dr est à l'écoute et explique chaque étape. Mon traitement orthodontique invisible se passe parfaitement. Très recommandé !",
        author: "Nadia M.",
        city: "Constantine",
        initials: "NM",
      },
    ],
  },

  footer: {
    tagline: "Cabinet Dentaire de Prestige",
    description:
      "Excellence dentaire au cœur d'Alger. Implantologie, facettes, orthodontie et soins esthétiques de haut niveau.",
    navTitle: "Navigation",
    servicesTitle: "Soins",
    contactTitle: "Contact",
    copyright: "© 2025 Cabinet Sourire Doré · Tous droits réservés",
    location: "Alger, Algérie",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Arabic Content
// ─────────────────────────────────────────────────────────────────────────────

const ar: Translations = {
  siteName: "سورير دوريه",
  siteTagline: "عيادة أسنان فاخرة",
  metaDescription:
    "عيادة أسنان فاخرة في الجزائر العاصمة. زراعة، قشور سيراميك، تقويم إنفيزالاين وتبييض احترافي.",

  nav: {
    about: "عن العيادة",
    services: "الخدمات",
    beforeAfter: "قبل وبعد",
    contact: "اتصل بنا",
    bookCta: "احجز موعداً",
    langSwitch: "Français",
  },

  hero: {
    eyebrow: "تميّز في طب الأسنان · الجزائر",
    titleLine1: "ابتسامتك،",
    titleLine2: "تحفتنا الفنية",
    subtitle:
      "مرحبًا بكم في عيادة سورير دوريه — حيث تلتقي التكنولوجيا المتطورة بفن طب الأسنان. رعاية استثنائية في إطار فاخر في قلب الجزائر العاصمة.",
    ctaPrimary: "احجز موعداً",
    ctaSecondary: "اكتشف خدماتنا",
    statYears: "سنة خبرة",
    statPatients: "مريض",
    statSatisfaction: "رضا العملاء",
    scrollHint: "تمرير",
  },

  about: {
    eyebrow: "قصتنا",
    title: "فن طب الأسنان\nيُعاد تعريفه",
    lead: "منذ عام 2009، تُعدّ عيادة سورير دوريه المرجع في رعاية الأسنان الراقية بالجزائر العاصمة. يجمع فريقنا من المتخصصين الخبرة السريرية بالحس الجمالي الرفيع.",
    foundedBadge: "تأسست في الجزائر",
    features: {
      tech: {
        title: "تقنية ثلاثية الأبعاد والرقمنة",
        body: "ماسح داخل الفم، أشعة ثلاثية الأبعاد، وتصميم CAD/CAM لنتائج دقيقة ودائمة.",
      },
      comfort: {
        title: "الراحة والطمأنينة",
        body: "بيئة دافئة وبروتوكولات متقدمة لمكافحة الألم ورعاية شخصية متكاملة.",
      },
      availability: {
        title: "التوفر والاستجابة السريعة",
        body: "بموعد 6 أيام في الأسبوع. معالجة حالات الطوارئ بأولوية. تواصل عبر واتساب متاح.",
      },
    },
  },

  services: {
    eyebrow: "تخصصاتنا",
    title: "مصفوفة\nالرعاية المتميزة",
    items: {
      implant: {
        num: "٠١",
        title: "زراعة الأسنان المتقدمة",
        desc: "استعادة كاملة بزراعات تيتانيوم زيركون من أحدث الأجيال. بروتوكول الجراحة في يوم واحد متاح. نتيجة طبيعية ودائمة مضمونة.",
        tag: "جراحة · تركيب",
        priceLabel: "دج / زرعة",
      },
      veneer: {
        num: "٠٢",
        title: "قشور السيراميك",
        desc: "تحويل الابتسامة في جلستين. قشور رفيعة جداً من سيراميك emax المضغوط، تُثبَّت دون تآكل السن. ابتسامة هوليوود في الجزائر.",
        tag: "تجميل · إعادة تأهيل",
        priceLabel: "دج / سن",
      },
      ortho: {
        num: "٠٣",
        title: "تقويم الأسنان",
        desc: "محاذيات شفافة Invisalign وأقواس سيراميك جمالية. خطة علاج رقمية ثلاثية الأبعاد.",
        tag: "محاذاة · أقواس",
      },
      whitening: {
        num: "٠٤",
        title: "تبييض بريميوم",
        desc: "نظام Philips ZOOM! الاحترافي. ما يصل إلى 8 درجات بياض في جلسة واحدة.",
        tag: "تجميل",
      },
      pediatric: {
        num: "٠٥",
        title: "طب أسنان الأطفال",
        desc: "رعاية الأسنان للأطفال في بيئة مريحة. نهج لطيف ووقائي يُزيل الخوف من طبيب الأسنان.",
        tag: "أطفال · وقاية",
      },
    },
  },

  beforeAfter: {
    eyebrow: "تحولات حقيقية",
    title: "قبل وبعد",
    lead: "اكتشف التحولات الحقيقية التي أنجزها متخصصونا.",
    beforeLabel: "قبل",
    afterLabel: "بعد",
    dragHint: "اسحب للمقارنة",
  },

  booking: {
    eyebrow: "الحجز",
    title: "احجز\nموعداً",
    infoPanelTitle: "معلومات عملية",
    infoPanelLead: "فريقنا في خدمتكم. تواصلوا معنا بالطريقة التي تناسبكم.",
    phoneLabel: "هاتف",
    hoursTitle: "ساعات العمل",
    hours: [
      "الأحد – الخميس : 08:00 – 18:00",
      //  "الجمعة : 08:00 – 12:00",
      "السبت : 09:00 – 16:00",
    ],
    steps: {
      s1: {
        title: "بياناتك الشخصية",
        subtitle: "أدخل معلوماتك الشخصية",
        firstName: "الاسم الأول",
        lastName: "اللقب",
        phone: "الهاتف",
        email: "البريد الإلكتروني (اختياري)",
        next: "التالي ←",
      },
      s2: {
        title: "اختر الخدمة",
        subtitle: "اختر الخدمة المطلوبة",
        message: "رسالة (اختياري)",
        back: "→ رجوع",
        next: "التالي ←",
      },
      s3: {
        title: "التاريخ والتأكيد",
        subtitle: "اختر الوقت المناسب لك",
        date: "التاريخ",
        time: "الوقت",
        urgency: "حالة طارئة ؟",
        urgencyNo: "لا",
        urgencyYes: "نعم — طارئ",
        back: "→ رجوع",
        confirm: "تأكيد الموعد",
      },
    },
    services: {
      implant: "زراعة الأسنان",
      veneer: "قشور",
      ortho: "تقويم الأسنان",
      whitening: "تبييض",
      consult: "استشارة",
      other: "أخرى",
    },
    success: {
      title: "تم إرسال الطلب!",
      body: "سيتواصل معك فريقنا في غضون ساعتين لتأكيد موعدك.",
    },
  },

  location: {
    eyebrow: "الموقع",
    title: "أين نجدكم",
    addressTitle: "العنوان",
    street: "12 شارع ديدوش مراد",
    city: "وسط الجزائر، 16000 — الجزائر",
    parkingNote: "موقف سيارات متاح قريباً",
    metroNote: "قريب من محطة مترو البريد الكبير",
    openMaps: "افتح في الخرائط",
    pinLabel: "عيادة سورير دوريه — وسط الجزائر",
  },

  testimonials: {
    eyebrow: "آراء مرضانا",
    title: "ماذا يقول\nمرضانا",
    items: [
      {
        text: "نتيجة زراعة أسناني مذهلة. لم أكن أظن أنني سأستعيد ابتسامة طبيعية. الفريق محترف ومطمئن.",
        author: "كريم أ.",
        city: "الجزائر",
        initials: "ك أ",
      },
      {
        text: "قشور السيراميك حولت ابتسامتي في جلستين. تحفة فنية! العيادة حديثة والاستقبال استثنائي.",
        author: "سارة ب.",
        city: "وهران",
        initials: "س ب",
      },
      {
        text: "الدكتور يصغي ويشرح كل خطوة. علاج التقويم الشفاف يسير بشكل مثالي. أنصح به بشدة!",
        author: "نادية م.",
        city: "قسنطينة",
        initials: "ن م",
      },
    ],
  },

  footer: {
    tagline: "عيادة أسنان فاخرة",
    description:
      "تميّز في طب الأسنان في قلب الجزائر العاصمة. زراعة، قشور، تقويم وعناية تجميلية راقية.",
    navTitle: "التصفح",
    servicesTitle: "خدمات",
    contactTitle: "تواصل معنا",
    copyright: "© 2025 عيادة سورير دوريه · جميع الحقوق محفوظة",
    location: "الجزائر العاصمة",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

interface LanguageContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Translations;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const translations: Record<Locale, Translations> = { fr, ar };

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

interface LanguageProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function LanguageProvider({
  children,
  defaultLocale = "fr",
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Persist preference
  useEffect(() => {
    const stored = localStorage.getItem("sd-locale") as Locale | null;
    if (stored && (stored === "fr" || stored === "ar")) {
      setLocaleState(stored);
    }
  }, []);

  // Apply dir + lang to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("font-arabic", locale === "ar");
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("sd-locale", next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "fr" ? "ar" : "fr");
  }, [locale, setLocale]);

  const value: LanguageContextValue = {
    locale,
    dir: locale === "ar" ? "rtl" : "ltr",
    t: translations[locale],
    toggleLocale,
    setLocale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}

// Re-export translations for static use
export { fr as frTranslations, ar as arTranslations };
