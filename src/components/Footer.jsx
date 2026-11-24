import React, { useState } from 'react';
import Button from './Button/Button.jsx';
import {
  PhoneCall,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowUpLeft,
  Check,
} from 'lucide-react';
import Logo from './Logo';

function SocialIcon({ name }) {
  switch (name) {
    case 'Facebook':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M13.5 22v-8.2h2.7l.4-3.2h-3.1V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.4H8.2v3.2h2.7V22h2.6Z" />
        </svg>
      );
    case 'Instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M6.9 8.5H3.8V19h3.1V8.5ZM5.3 4a1.8 1.8 0 1 0 0 3.6A1.8 1.8 0 0 0 5.3 4ZM20.2 12.9c0-2.8-1.5-4.4-3.9-4.4-1.8 0-2.6 1-3 1.7V8.5H10.3V19h3v-5.5c0-1.5.3-2.9 2.1-2.9s1.8 1.6 1.8 3V19h3.2v-6.1Z" />
        </svg>
      );
    case 'X / Twitter':
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
          <path d="M18.2 3h3.1l-6.8 7.8L22.5 21h-6.3l-4.9-6.4L5.7 21H2.6l7.3-8.4L2.2 3h6.4l4.4 5.8L18.2 3Zm-1.1 16.1h1.7L7.7 4.8H5.9l11.2 14.3Z" />
        </svg>
      );
  }
}

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com' },
  { name: 'Instagram', href: 'https://instagram.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
  { name: 'X / Twitter', href: 'https://x.com' },
];

const FOOTER_CONTENT = {
  en: {
    ctaEyebrow: 'Private Real Estate Advisory',
    ctaHeading: 'Ready to Secure Your Next Landmark Property?',
    ctaSubheading:
      'Connect with our senior advisors for tailored residential selections and high-conviction investment opportunities.',
    ctaButton: 'Book Private Consultation',
    brandDescription:
      'Curating enduring residences, waterfront landmarks, and structured real estate investments across premier Gulf destinations.',
    followUs: 'Follow Rawasi',
    quickLinksTitle: 'Navigation',
    quickLinks: [
      { name: 'Our Story', href: '#about' },
      { name: 'Featured Properties', href: '#featuredProperties' },
      { name: 'Investment Opportunities', href: '#InvestmentOpportunities' },
      { name: 'Prime Locations', href: '#featuredLocation' },
      { name: 'Advisory Services', href: '#services' },
    ],
    portfolioTitle: 'Portfolio',
    portfolioLinks: [
      { name: 'Ready Villas & Penthouses', href: '#featuredProperties', type: 'buy' },
      { name: 'Off-Plan Gulf Towers', href: '#InvestmentOpportunities', type: 'buy' },
      { name: 'Waterfront Residences', href: '#featuredLocation', type: 'buy' },
      { name: 'Annual Luxury Leases', href: '#featuredProperties', type: 'rent' },
      { name: 'Serviced Executive Suites', href: '#services', type: 'rent' },
    ],
    contactTitle: 'Private Desk',
    address: 'King Fahd Financial District, Tower 4, Riyadh',
    phone: '+966 11 480 9200',
    email: 'advisory@rawasi.com',
    newsletterLabel: 'Market Briefings',
    newsletterPlaceholder: 'Enter your email address',
    newsletterButton: 'Subscribe',
    newsletterSuccess: 'Subscribed to Rawasi market briefings.',
    copyright: '© 2026 Rawasi Real Estate & Investment. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Advisory',
  },
  ar: {
    ctaEyebrow: 'استشارات عقارية خاصة',
    ctaHeading: 'هل أنت مستعد لامتلاك وجهتك العقارية القادمة؟',
    ctaSubheading:
      'تواصل مع نخبة مستشارينا للحصول على ترشيحات سكنية مخصصة وفرص استثمارية مدروسة بعناية.',
    ctaButton: 'احجز استشارة خاصة',
    brandDescription:
      'ننتقي مساكن راسخة، ووجهات على الواجهة البحرية، وفرصاً استثمارية عقارية مدروسة في أبرز المراكز الخليجية.',
    followUs: 'تابع رواسي',
    quickLinksTitle: 'روابط سريعة',
    quickLinks: [
      { name: 'قصتنا', href: '#about' },
      { name: 'العقارات المختارة', href: '#featuredProperties' },
      { name: 'الفرص الاستثمارية', href: '#InvestmentOpportunities' },
      { name: 'المواقع المميزة', href: '#featuredLocation' },
      { name: 'خدماتنا الاستشارية', href: '#services' },
    ],
    portfolioTitle: 'المحفظة العقارية',
    portfolioLinks: [
      { name: 'فلل وبنتهاوس جاهزة', href: '#featuredProperties', type: 'buy' },
      { name: 'أبراج خليجية قيد الإنشاء', href: '#InvestmentOpportunities', type: 'buy' },
      { name: 'مساكن على الواجهة البحرية', href: '#featuredLocation', type: 'buy' },
      { name: 'عقود إيجار سنوية فاخرة', href: '#featuredProperties', type: 'rent' },
      { name: 'أجنحة تنفيذية مخدومة', href: '#services', type: 'rent' },
    ],
    contactTitle: 'مكتب الاستشارات',
    address: 'حي الملك عبدالله المالي، برج 4، الرياض',
    phone: '+966 11 480 9200',
    email: 'advisory@rawasi.com',
    newsletterLabel: 'النشرة العقارية',
    newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
    newsletterButton: 'اشتراك',
    newsletterSuccess: 'تم اشتراكك في نشرة رواسي العقارية.',
    copyright: '© 2026 رواسي للعقارات والاستثمار. جميع الحقوق محفوظة.',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
  },
};

export default function Footer({ lang = 'en', onChangeListingType }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const t = FOOTER_CONTENT[currentLang];
  const CornerArrow = currentLang === 'ar' ? ArrowUpLeft : ArrowUpRight;

  const footerFontStyle = {
    fontFamily:
      currentLang === 'ar'
        ? "'IBM Plex Sans Arabic', sans-serif"
        : "'Plus Jakarta Sans', sans-serif",
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      style={footerFontStyle}
      className="relative bg-[#1A110B] text-[#F7F3EA] border-t border-[#C5A059]/35"
    >
 
      {/* 2. المحتوى الرئيسي للفوتر (4 أعمدة) */}
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* العمود 1: الهوية ونبذة العلامة وأيقونات التواصل */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#hero" className="inline-block">
              <Logo lang={lang} size="sm" animated={false} />
            </a>

            <p className="text-xs sm:text-sm leading-relaxed text-[#F7F3EA]/75 max-w-sm">
              {t.brandDescription}
            </p>

            {/* أيقونات السوشيال ميديا */}
          <div className="space-y-2.5">
  <p className="text-xs font-semibold uppercase tracking-wider text-[#E6C78B]">
    {t.followUs}
  </p>
  <div className="flex items-center gap-2.5">
    {SOCIAL_LINKS.map((social) => (
      <a
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        className="inline-flex items-center justify-center w-9 h-9 rounded-none bg-[#2C1E14]/80 hover:bg-[#C5A059] text-[#E6C78B] hover:text-[#1A110B] border border-[#C5A059]/40 hover:border-[#C5A059] transition-colors duration-200"
      >
        <SocialIcon name={social.name} />
      </a>
    ))}
  </div>
</div>

            {/* النشرة البريدية */}
            <div className="pt-1 max-w-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#E6C78B] mb-2.5">
                {t.newsletterLabel}
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 bg-[#2C1E14] border border-[#C5A059]/50 px-3.5 py-2.5 text-xs text-[#E6C78B]">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{t.newsletterSuccess}</span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex items-stretch rounded-none border border-[#C5A059]/45 bg-[#2C1E14]/60 focus-within:border-[#C5A059]"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletterPlaceholder}
                    className="w-full min-w-0 bg-transparent px-3.5 py-2.5 text-xs text-[#F7F3EA] placeholder:text-[#F7F3EA]/45 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-[#C5A059] hover:bg-[#E6C78B] text-[#1A110B] font-bold text-xs px-4 py-2.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {t.newsletterButton}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* العمود 2: روابط التنقل */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E6C78B]">
              {t.quickLinksTitle}
            </h3>
            <ul className="space-y-2.5">
              {t.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#F7F3EA]/80 hover:text-[#E6C78B] transition-colors"
                  >
                    <span>{link.name}</span>
                    <CornerArrow className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#C5A059]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود 3: المحفظة العقارية (مرتبطة بـ Buy / Rent) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E6C78B]">
              {t.portfolioTitle}
            </h3>
            <ul className="space-y-2.5">
              {t.portfolioLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => onChangeListingType?.(item.type)}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#F7F3EA]/80 hover:text-[#E6C78B] transition-colors"
                  >
                    <span>{item.name}</span>
                    <CornerArrow className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#C5A059]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود 4: بيانات التواصل المباشر */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E6C78B]">
              {t.contactTitle}
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#F7F3EA]/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t.address}</span>
              </li>

              <li>
                <a
                  href={`tel:${t.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-3 hover:text-[#E6C78B] transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span dir="ltr">{t.phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${t.email}`}
                  className="inline-flex items-center gap-3 hover:text-[#E6C78B] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span dir="ltr">{t.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. الشريط السفلي (حقوق الملكية فقط بدون زر العودة للأعلى) */}
      <div className="border-t border-[#C5A059]/20 bg-[#140D08]">
        <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F3EA]/65">
          <p className="text-center sm:text-start">{t.copyright}</p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#privacy" className="hover:text-[#E6C78B] transition-colors">
              {t.privacy}
            </a>
            <a href="#terms" className="hover:text-[#E6C78B] transition-colors">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}