import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../components/Button/Button.jsx';
import AboutStatsCards from '../components/AboutStatsCards.jsx';


const CONTENT = {
  en: {
    eyebrow: 'Our Story & Milestones',
    headingLine1: 'Built on Trust, Proven by',
    headingHighlight: 'Enduring Real Estate Milestones',
    description:
      'At Rawasi, our track record reflects years of disciplined selection across prime residential and investment landmarks. From landmark waterfront deliveries to high-performing investment portfolios, every milestone reinforces our commitment to lasting value.',
    achievementsNote:
      'Over the past decade, Rawasi has partnered with premier developers and discerning investors to deliver residential communities, executive towers, and resilient asset portfolios across key Gulf hubs.',
    imageCaption: 'Enduring Craft & Proven Track Record',
    stats: [
      {
        id: 'projects',
        target: 45,
        suffix: '+',
        label: 'Landmark Developments',
        sublabel: 'Residential & mixed-use deliveries',
      },
      {
        id: 'value',
        target: 133,
        prefix: '$',
        suffix: 'B+',
        label: 'Portfolio Value',
        sublabel: 'Managed & advised real estate assets',
      },
      {
        id: 'clients',
        target: 1200,
        suffix: '+',
        label: 'Investors & Homeowners',
        sublabel: 'Long-term client partnerships',
      },
      {
        id: 'years',
        target: 14,
        suffix: '+',
        label: 'Years of Excellence',
        sublabel: 'Market leadership & advisory',
      },
    ],
    primaryCta: 'Explore Properties',
    secondaryCta: 'Visit Our Office',
  },
  ar: {
    eyebrow: 'قصتنا وإنجازاتنا',
    headingLine1: 'مسيرة راسخة تُترجمها',
    headingHighlight: 'إنجازات عقارية واستثمارية ملموسة',
    description:
      'في رواسي، يعكس سجلّنا الحافل سنوات من الاختيار المدروس لأبرز الوجهات السكنية والفرص الاستثمارية. من تسليم مشاريع نوعية على الواجهات البحرية إلى إدارة محافظ عالية الأداء، يؤكد كل إنجاز التزامنا بالقيمة المستدامة.',
    achievementsNote:
      'على مدار أكثر من عقد، تعاونت رواسي مع نخبة المطورين والمستثمرين لإطلاق مجتمعات سكنية وأبراج تنفيذية ومحافظ عقارية متوازنة في أهم المراكز الخليجية.',
    imageCaption: 'ثبات معماري وسجل إنجازات موثوق',
    stats: [
      {
        id: 'projects',
        target: 45,
        prefix: '+',
        label: 'مشروعاً عقارياً بارزاً',
        sublabel: 'مجمعات سكنية واستثمارية منجزة',
      },
      {
        id: 'value',
        target: 133,
        prefix: '+$',
        suffix: 'B',
        label: 'قيمة المحافظ العقارية',
        sublabel: 'أصول مُدارة واستشارات استثمارية',
      },
      {
        id: 'clients',
        target: 1200,
        prefix: '+',
        label: 'مستثمر ومالك عقار',
        sublabel: 'شراكات ثقة طويلة الأمد',
      },
      {
        id: 'years',
        target: 14,
        prefix: '+',
        label: 'عاماً من الخبرة',
        sublabel: 'ريادة واستشارات عقارية متخصصة',
      },
    ],
    primaryCta: 'استعرض العقارات',
    secondaryCta: 'احجز استشارة',
  },
};

export default function About({
  lang = 'en',
  imageUrl,
  onSelectListingType,
}) {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [activeSpotId, setActiveSpotId] = useState(null);

  const frameRef = useRef(null);
  const panRafRef = useRef(null);
  const targetPanRef = useRef({ x: 0, y: 0 });

  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const t = CONTENT[currentLang];

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;

    const animatePan = () => {
      currentX += (targetPanRef.current.x - currentX) * 0.14;
      currentY += (targetPanRef.current.y - currentY) * 0.14;

      setPan({
        x: Number(currentX.toFixed(2)),
        y: Number(currentY.toFixed(2)),
      });

      panRafRef.current = window.requestAnimationFrame(animatePan);
    };

    panRafRef.current = window.requestAnimationFrame(animatePan);
    return () => {
      if (panRafRef.current) {
        window.cancelAnimationFrame(panRafRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    targetPanRef.current = {
      x: -nx * 14,
      y: -ny * 12,
    };
  };

  const handleMouseEnter = () => setIsInside(true);

  const handleMouseLeave = () => {
    setIsInside(false);
    setActiveSpotId(null);
    targetPanRef.current = { x: 0, y: 0 };
  };

  const sectionFontStyle = {
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
      id="about"
      style={sectionFontStyle}
      className="relative bg-[#F7F3EA] text-[#1A110B] py-20 sm:py-24 xl:py-28 border-t border-[#C5A059]/25 overflow-x-clip"
    >


      
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-[1.5px] w-7 bg-[#C5A059]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A6728]">
                {t.eyebrow}
              </span>
            </div>


            <h2  style={HeadingFontStyle} className="text-2xl sm:text-4xl xl:text-[42px] font-bold leading-tight text-[#1A110B]" >
              {t.headingLine1}{' '}
              <span className="block text-[#8A6728] mt-1">
                {t.headingHighlight}
              </span>
            </h2>

            <p className="text-sm sm:text-base xl:text-[17px] leading-relaxed text-[#2C1E14]/90 max-w-2xl">
              {t.description}
            </p>

            <p className="text-xs sm:text-sm xl:text-[15px] leading-relaxed text-[#2C1E14]/80 border-s-2 border-[#C5A059] ps-4 max-w-2xl">
              {t.achievementsNote}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <Button
                href="#featuredProperties"
                lang={currentLang}
                withSvg={true}
                onClick={() => onSelectListingType?.('buy')}
                className="inline-flex items-center justify-center rounded-none bg-transparent! hover:!bg-[#C5A059] !text-[#1A110B] font-semibold max-[350px]:!text-[10px] text-xs sm:text-sm max-[350px]:px-3.5 px-6 max-[350px]:py-2 py-3 border border-[#1A110B] hover:border-[#C5A059] transition-colors duration-200 whitespace-nowrap"
              >
                {t.primaryCta}
              </Button>

              <Button
                href="#contact"
                lang={currentLang}
                withSvg={true}
                className="inline-flex items-center justify-center rounded-none bg-transparent! hover:!bg-[#C5A059] !text-[#1A110B] font-semibold max-[350px]:!text-[10px] text-xs sm:text-sm max-[350px]:px-3.5 px-6 max-[350px]:py-2 py-3 border border-[#C5A059] border-b-2 border-b-[#C5A059] transition-colors duration-200 whitespace-nowrap"
              >
                {t.secondaryCta}
              </Button>
            </div>
          </div>

        <div className="lg:col-span-5">
  <div className="relative rounded-none shadow-md">
    {imageUrl ? (
      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-none select-none"
      >
        <img
          src={imageUrl}
          alt={t.imageCaption}
          style={{
            transform: `translate3d(${pan.x}%, ${pan.y}%, 0) scale(${
              isInside ? 1.32 : 1.26
            })`,
          }}
          className="h-full w-full object-cover will-change-transform"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/60 via-transparent to-transparent pointer-events-none"
        />
      </div>
    ) : (
      <div className="aspect-[4/3] w-full rounded-none bg-gradient-to-br from-[#2C1E14] via-[#1A110B] to-[#3B281B] flex flex-col justify-between p-6 sm:p-8 text-[#F7F3EA]">
        <div className="w-10 h-[1.5px] bg-[#C5A059]" />
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#D6B77E]">
            RAWASI Head Quarter
          </p>
        
        </div>
      </div>
    )}

 
  </div>
</div>
        </div>

        <AboutStatsCards stats={t.stats} />
      </div>

      
    </section>
  );
}