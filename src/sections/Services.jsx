import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  KeyRound,
  TrendingUp,
  Compass,
  ArrowUpRight,
  ArrowUpLeft,
} from 'lucide-react';
import Heading from '../components/Heading';
const SERVICES_DATA = {
  en: {
    eyebrow: 'What We Deliver',
    title: 'Tailored Real Estate & Investment Services',
    subtitle:
      'Select a service from the vertical index to inspect its scope, visual context, and direct advisory path.',
    cta: 'Inquire About This Service',
    items: [
      {
        id: 'investment',
        code: '01',
        goal: 'investment',
        icon: TrendingUp,
        title: 'Investment Portfolio',
        tag: 'Multi-City Allocation',
        desc: 'Structured portfolio planning, yield evaluation, and phased entry across high-growth Gulf real estate markets and waterfront developments.',
        image:
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
      },
      {
        id: 'buy',
        code: '02',
        goal: 'buy',
        icon: Building2,
        title: 'Property Acquisition',
        tag: 'Residential & Prime Assets',
        desc: 'Curated residential and commercial opportunities across Gulf hubs, selected for architectural quality, location strength, and long-term appreciation.',
        image:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
      },
      {
        id: 'rent',
        code: '03',
        goal: 'rent',
        icon: KeyRound,
        title: 'Executive Leasing',
        tag: 'Furnished & Corporate Living',
        desc: 'Streamlined leasing solutions for executives, diplomats, and corporate teams seeking turnkey residences and prime business districts.',
        image:
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      },
      {
        id: 'advisory',
        code: '04',
        goal: 'buy',
        icon: Compass,
        title: 'Private Advisory',
        tag: 'Family Offices & Buyers',
        desc: 'Dedicated one-on-one representation from initial brief and market benchmarking through negotiation, due diligence, and closing.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      },
    ],
  },
  ar: {
    eyebrow: 'خدمات رواسي',
    title: 'حلول عقارية واستثمارية متكاملة',
    subtitle:
      'اضغطي على اسم أي خدمة من القائمة الرأسية لعرض صورتها وتفاصيلها الكاملة فوق طبقة التظليل.',
    cta: 'اطلب استشارة لهذه الخدمة',
    items: [
      {
        id: 'buy',
        code: '01',
        goal: 'buy',
        icon: Building2,
        title: 'تملّك العقارات',
        tag: 'أصول سكنية وتجارية مختارة',
        desc: 'خيارات سكنية وتجارية منتقاة بعناية في أبرز المدن الخليجية بناءً على جودة التصميم، قوة الموقع، والقيمة المستدامة.',
        image:
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
      },
      {
        id: 'rent',
        code: '02',
        goal: 'rent',
        icon: KeyRound,
        title: 'التأجير التنفيذي',
        tag: 'إقامة فاخرة وحلول شركات',
        desc: 'حلول إيجار منظمة للقيادات، العائلات، والشركات الباحثة عن وحدات جاهزة ومواقع استراتيجية بإجراءات واضحة.',
        image:
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      },
      {
        id: 'investment',
        code: '03',
        goal: 'investment',
        icon: TrendingUp,
        title: 'إدارة المحافظ الاستثمارية',
        tag: 'تنويع وتوزيع إقليمي',
        desc: 'بناء وتنظيم المحافظ العقارية ودراسة العوائد والفرص الواعدة في الأسواق الخليجية والواجهات الساحلية.',
        image:
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
      },
      {
        id: 'advisory',
        code: '04',
        goal: 'buy',
        icon: Compass,
        title: 'الاستشارات الخاصة',
        tag: 'للمستثمرين والمكاتب العائلية',
        desc: 'مرافقة استشارية مباشرة تبدأ من فهم الأهداف والميزانية وتستمر حتى التقييم والمقارنة وإتمام القرار العقاري.',
        image:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      },
    ],
  },
};

export default function Services({ lang = 'en', onSelectService }) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const t = SERVICES_DATA[currentLang];
  const ArrowIcon = currentLang === 'ar' ? ArrowUpLeft : ArrowUpRight;

  const [activeId, setActiveId] = useState(t.items[0].id);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  const sectionGridRef = useRef(null);

  const activeService =
    t.items.find((item) => item.id === activeId) || t.items[0];
  const ActiveIcon = activeService.icon;

  const sectionFontStyle = {
    fontFamily:
      currentLang === 'ar'
        ? "'IBM Plex Sans Arabic', sans-serif"
        : "'Plus Jakarta Sans', sans-serif",
  };

  const HeadingFontStyle = {
    fontFamily: currentLang === 'ar' ? "'Amiri', serif" : "'Cinzel', serif",
  };

  const handleServiceInquiry = (goal) => {
    if (typeof onSelectService === 'function') {
      onSelectService(goal);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const node = sectionGridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsContentVisible(false);
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 120);
    return () => clearTimeout(timer);
  }, [activeId]);

  return (
    <section
      id="services"
      style={sectionFontStyle}
      className="relative bg-[#F7F3EA] text-[#1A110B] py-20 sm:py-24 xl:py-28 border-t border-[#C5A059]/35 overflow-x-clip"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12 sm:mb-14">
<Heading eyebrow={t.eyebrow}  headingLine1={t.title} description={t.subtitle} lang={lang} />

</div>
        <div
          ref={sectionGridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
        >
          {/* القائمة الرأسية للخدمات */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between border border-[#C5A059]/45 bg-[#FAF8F3] transition-all duration-700 ease-out ${
              hasEntered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t.items.map((item, idx) => {
              const IconComp = item.icon;
              const isSelected = item.id === activeService.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={isSelected}
                  style={{
                    transitionDelay: hasEntered ? `${idx * 70}ms` : '0ms',
                  }}
                  className={`w-full text-start px-5 sm:px-6 py-5 sm:py-6 flex items-center justify-between gap-4 transition-colors duration-300 cursor-pointer ${
                    idx !== t.items.length - 1
                      ? 'border-b border-[#C5A059]/30'
                      : ''
                  } ${
                    isSelected
                      ? 'bg-[#1A110B] text-[#F7F3EA]'
                      : 'bg-[#FAF8F3] text-[#1A110B] hover:bg-[#EFE9DC]/80'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      style={{ fontFamily: "'Cinzel', serif" }}
                      className={`text-xs font-bold tracking-widest shrink-0 ${
                        isSelected ? 'text-[#E6C78B]' : 'text-[#8A6728]'
                      }`}
                    >
                      {item.code}
                    </span>

                    <div
                      className={`w-9 h-9 rounded-none flex items-center justify-center border shrink-0 ${
                        isSelected
                          ? 'bg-[#241810] border-[#C5A059] text-[#C5A059]'
                          : 'bg-[#F7F3EA] border-[#C5A059]/45 text-[#1A110B]'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-base sm:text-lg font-bold truncate">
                        {item.title}
                      </p>
                      <p
                        className={`text-xs truncate mt-0.5 ${
                          isSelected ? 'text-[#D6B77E]' : 'text-[#2C1E14]/70'
                        }`}
                      >
                        {item.tag}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`h-2.5 w-2.5 shrink-0 transition-transform ${
                      isSelected
                        ? 'bg-[#C5A059] scale-110'
                        : 'bg-[#C5A059]/30'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* بطاقة الصورة والتفاصيل */}
          <div
            className={`lg:col-span-7 relative min-h-[380px] sm:min-h-[450px] lg:min-h-[500px] rounded-none overflow-hidden border border-[#C5A059]/50 bg-[#1A110B] shadow-lg transition-all duration-700 delay-350 ease-out ${
              hasEntered
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-6 scale-[0.98]'
            }`}
          >
            {t.items.map((item) => {
              const isCurrent = item.id === activeService.id;
              return (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
                    isCurrent
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                />
              );
            })}

            <div
              aria-hidden="true"
              style={{
                backgroundImage:
                  'linear-gradient(to top, rgba(26, 17, 11, 0.92) 0%, rgba(26, 17, 11, 0.65) 52%, rgba(26, 17, 11, 0.25) 100%)',
              }}
              className="absolute inset-0"
            />

            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 text-[#F7F3EA]">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-none bg-[#1A110B]/85 border border-[#C5A059]/60 px-3 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider text-[#E6C78B]">
                  <ActiveIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{activeService.tag}</span>
                </span>

                <span
                  style={{ fontFamily: "'Cinzel', serif" }}
                  className="rounded-none bg-[#1A110B]/85 border border-[#C5A059]/40 px-3 py-1 text-xs font-bold tracking-widest text-[#D6B77E]"
                >
                  {activeService.code} / 04
                </span>
              </div>

              <div
                className={`max-w-xl space-y-4 pt-16 transition-all duration-700 ease-out ${
                  isContentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2.5'
                }`}
              >
                <h3
                  style={HeadingFontStyle}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F7F3EA] tracking-tight"
                >
                  {activeService.title}
                </h3>

                <p className="text-sm sm:text-base text-[#F7F3EA]/90 leading-relaxed">
                  {activeService.desc}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleServiceInquiry(activeService.goal)}
                    className="inline-flex items-center gap-2 rounded-none bg-[#C5A059] hover:bg-[#E6C78B] text-[#1A110B] px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    <span>{t.cta}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}