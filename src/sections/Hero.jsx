import React from 'react';
import heroVideo from '../assets/new.mp4';
import Button from '../components/Button/Button';

const HERO_CONTENT = {
  en: {
    w1:'Anchored in',
    w2:'Timeless Luxury',
    w3:'Across the Gulf',
    description:
      'Rawasi curates signature residences, private villas, and enduring real estate investments across the Gulf—defined by timeless architecture, quiet prestige, and lasting value.',
    cta: 'Explore Rawasi',
  },
  ar: {
    w1: 'جذور راسخة',
  w2: 'و فخامة خالدة',
  w3: 'في الخليج',
    description:
      'تُقدّم رواسي نخبة المساكن المعمارية، والفلل الخاصة، والفرص الاستثمارية الراسخة في أبرز عواصم ومدن الخليج—بهوية تجمع بين أصالة التصميم وقيمة تدوم مع الزمن.',
    cta: 'استكشف رواسي',
  },
};

export default function Hero({ lang = 'en' }) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const t = HERO_CONTENT[currentLang];

  const bodyFontStyle = {
    fontFamily:
      currentLang === 'ar'
        ? "'IBM Plex Sans Arabic', sans-serif"
        : "'Plus Jakarta Sans', sans-serif",
  };
  const HeadingFontStyle = {
    fontFamily:
      currentLang === 'ar'
        ? "'Amiri', serif"
        : "'Cinzel', serif",
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#2b210d] pt-24 pb-16"
    >
      {/* 1. خلفية الفيديو السينمائية */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="https://casavogue.ae/wp-content/uploads/2026/08/infinity_pool_hero_1787771884586.jpg"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* 2. طبقات الـ Overlay لإبراز النصوص الذهبية والبيضاء بوضوح */}
      <div className="absolute inset-0 bg-[#493322]/55" />

      {/* 3. المحتوى الرئيسي للـ Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center">
        <div className="max-w-3xl text-center">
          {/* العنوان الرئيسي */}
         <h1
  style={HeadingFontStyle}
  className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F7F3EA] leading-[1.12] tracking-tight"
>
  <span className={lang === 'ar' ? 'block' : 'inline'}>
    {t.w1}
  </span>
  {lang !== 'ar' && ' '}
  <span
    className={`${
      lang === 'ar' ? 'block' : 'inline'
    } text-transparent bg-clip-text bg-linear-to-t from-[#f6e1b7] to-[#88672f]`}
  >
    {t.w2}
  </span>
  {lang !== 'ar' && ' '}
  <span className={lang === 'ar' ? 'block' : 'inline'}>
    {t.w3}
  </span>
</h1>

          {/* الباراغراف التعريفي أسفل العنوان وفوق الزر */}
          <p
            style={bodyFontStyle}
            className="mt-5 sm:mt-6 mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-[#F7F3EA]/85 leading-relaxed font-normal"
          >
            {t.description}
          </p>

          {/* زر الاستكشاف */}
          <div className="mt-8 sm:mt-9 text-center">
            <Button href="#featuredProperties" lang={currentLang}>
              {t.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}