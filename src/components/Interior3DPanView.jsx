import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Compass,
  Layers,
  Eye,
  Maximize2,
  ArrowUpRight,
  ArrowUpLeft,
} from 'lucide-react';
import Button from './Button/Button.jsx';

const ROOM_SCENES = {
  stairsAndUpper: {
    id: 'stairsAndUpper',
    label: { en: 'Staircase & Upper Room', ar: 'الدرج والطابق العلوي' },
    image:
      'https://blog.bayut.sa/uploads/2024/08/%D8%AF%D8%B1%D8%AC-%D8%B9%D9%84%D9%89-%D8%B4%D9%83%D9%84-%D8%AD%D8%B1%D9%81-L-1024x640.jpg',
    hotspots: [
      {
        id: 'upper-landing',
        x: 42,
        y: 22,
        title: { en: 'Upper Level & Room', ar: 'الطابق العلوي والغرفة' },
        tag: { en: 'Upper Floor', ar: 'الدور العلوي' },
        desc: {
          en: 'Upper gallery and doorway at the top of the flight leading into the upper floor rooms.',
          ar: 'أعلى الدرج يظهر الممر والمدخل المؤدي إلى الغرف العلوية بعيداً عن الصالة.',
        },
        specs: {
          en: 'Upper landing • Quiet privacy zone',
          ar: 'منصة علوية • منطقة خصوصية هادئة',
        },
      },
      {
        id: 'mid-staircase',
        x: 52,
        y: 52,
        title: { en: 'Glass & Oak Staircase', ar: 'الدرج الخشبي والزجاجي' },
        tag: { en: 'Staircase', ar: 'الدرج الداخلي' },
        desc: {
          en: 'Warm wood treads paired with clear glass panels that keep daylight flowing between levels.',
          ar: 'درجات خشبية دافئة مع ألواح زجاجية شفافة تحافظ على انسياب الإضاءة بين المستويات.',
        },
        specs: {
          en: 'Solid wood steps • Tempered glass',
          ar: 'درجات خشب طبيعي • زجاج مقسّى',
        },
      },
      {
        id: 'lower-lounge',
        x: 24,
        y: 68,
        title: { en: 'Ground Lounge & Side Step', ar: 'الصالة الأرضية والدرجة الجانبية' },
        tag: { en: 'Ground Level', ar: 'الطابق الأرضي' },
        desc: {
          en: 'Open ground space with a low table and side steps connecting the living area seamlessly.',
          ar: 'مساحة أرضية مفتوحة مع طاولة منخفضة ودرجات جانبية تربط الصالة بسلاسة.',
        },
        specs: {
          en: 'Open sightlines • Warm oak flooring',
          ar: 'رؤية مفتوحة • أرضيات خشبية دافئة',
        },
      },
    ],
  },
  doubleSalon: {
    id: 'doubleSalon',
    label: { en: 'Double-Height Salon', ar: 'الصالة المرتفعة' },
    image:
      'https://s3-blog.homelane.com/design-ideas/wp-content/uploads/2026/01/29040254/double-height-living-room-floating-staircase-mezzanine-1.jpg',
    hotspots: [
      {
        id: 'mezzanine-view',
        x: 52,
        y: 26,
        title: { en: 'Upper Mezzanine Gallery', ar: 'ممر الميزانين العلوي' },
        tag: { en: 'Upper Level', ar: 'الطابق العلوي' },
        desc: {
          en: 'Elevated upper walk overlooking the main living space with warm architectural lighting.',
          ar: 'ممر علوي مطل على غرفة المعيشة الرئيسية بإضاءة معمارية دافئة.',
        },
        specs: {
          en: 'Mezzanine overlook • Warm pendants',
          ar: 'إطلالة علوية • إنارة معلقة دافئة',
        },
      },
      {
        id: 'floating-steps',
        x: 18,
        y: 56,
        title: { en: 'Stair Approach', ar: 'مسار الدرج' },
        tag: { en: 'Vertical Access', ar: 'الصعود العلوي' },
        desc: {
          en: 'Leads smoothly from the main lounge up to the upper gallery and bedrooms.',
          ar: 'يصل بسلاسة من الصالة الرئيسية نحو الممر العلوي والغرف العلوية.',
        },
        specs: {
          en: 'Direct vertical link • Balanced lighting',
          ar: 'ربط مباشر للأعلى • إضاءة متوازنة',
        },
      },
    ],
  },
};

export default function Interior3DPanView({
  lang = 'en',
  title = {
    en: 'Rawasi Interior — Compact Pan & Detail View',
    ar: 'داخل رواسي — استكشاف مصغّر وتحريك أوسع',
  },
  subtitle = {
    en: 'Compact frame for effortless cursor panning across the staircase, upper floor, and hidden details.',
    ar: 'إطار مدمج ليسهل عليكِ تحريك الماوس واكتشاف الدرج والغرفة العلوية وتفاصيل الصورة.',
  },
}) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const targetPanRef = useRef({ x: 0, y: 0 });

  const [activeSceneKey, setActiveSceneKey] = useState('stairsAndUpper');
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [showAllSpots, setShowAllSpots] = useState(true);
  const [activeSpotId, setActiveSpotId] = useState('upper-landing');

  const scene = ROOM_SCENES[activeSceneKey];
  const ArrowIcon = currentLang === 'ar' ? ArrowUpLeft : ArrowUpRight;

  const currentSpot =
    scene.hotspots.find((s) => s.id === activeSpotId) || scene.hotspots[0];

  const fontStyle = {
    fontFamily:
      currentLang === 'ar'
        ? "'IBM Plex Sans Arabic', sans-serif"
        : "'Plus Jakarta Sans', sans-serif",
  };

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetPanRef.current.x - currentX) * 0.15;
      currentY += (targetPanRef.current.y - currentY) * 0.15;

      setPan({
        x: Number(currentX.toFixed(2)),
        y: Number(currentY.toFixed(2)),
      });

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    targetPanRef.current = {
      x: -nx * 16,
      y: -ny * 14,
    };
  };

  const handleMouseEnter = () => setIsInside(true);

  const handleMouseLeave = () => {
    setIsInside(false);
    targetPanRef.current = { x: 0, y: 0 };
  };

  const handleSelectScene = (sceneKey) => {
    setActiveSceneKey(sceneKey);
    setActiveSpotId(ROOM_SCENES[sceneKey].hotspots[0]?.id || null);
    targetPanRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      style={fontStyle}
      className="max-w-4xl mx-auto rounded-none bg-[#1A110B] text-[#F7F3EA] border border-[#C5A059]/45 p-4 sm:p-5 shadow-xl space-y-4"
    >
      {/* العنوان + أزرار تبديل المشهد وإظهار النقاط */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E6C78B]">
            <Compass className="w-4 h-4 text-[#C5A059]" />
            <span>
              {currentLang === 'ar'
                ? 'استكشاف تفاعلي داخل الغرفة'
                : 'Interactive Room Pan'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#F7F3EA]">
            {title[currentLang]}
          </h3>
          <p className="text-xs text-[#F7F3EA]/75">{subtitle[currentLang]}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="inline-flex rounded-none border border-[#C5A059]/45 bg-[#2C1E14] p-1">
            {Object.values(ROOM_SCENES).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectScene(item.id)}
                className={`inline-flex items-center gap-1.5 rounded-none px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  activeSceneKey === item.id
                    ? 'bg-[#C5A059] text-[#1A110B]'
                    : 'text-[#F7F3EA]/80 hover:text-[#E6C78B]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{item.label[currentLang]}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAllSpots((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 rounded-none px-2.5 py-1.5 text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
              showAllSpots
                ? 'bg-[#E6C78B] text-[#1A110B] border-[#E6C78B]'
                : 'bg-[#2C1E14] text-[#E6C78B] border-[#C5A059]/45 hover:border-[#C5A059]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>
              {currentLang === 'ar' ? 'النقاط' : 'Spots'}
            </span>
          </button>
        </div>
      </div>

      {/* إطار الغرفة المصغّر */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-none border border-[#C5A059]/35 bg-[#140D08] select-none"
      >
        <img
          src={scene.image}
          alt={scene.label[currentLang]}
          style={{
            transform: `translate3d(${pan.x}%, ${pan.y}%, 0) scale(${
              isInside ? 1.38 : 1.32
            })`,
          }}
          className="h-full w-full object-cover object-center will-change-transform"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/75 via-transparent to-[#1A110B]/20 pointer-events-none"
        />

        {/* نقاط الاستكشاف */}
        {scene.hotspots.map((spot) => {
          const isSelected = activeSpotId === spot.id;
          const isVisible = showAllSpots || isInside || isSelected;

          return (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
                isVisible
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-75 pointer-events-none'
              }`}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveSpotId(spot.id)}
                onClick={() => setActiveSpotId(spot.id)}
                className={`inline-flex items-center gap-1 rounded-none px-2 py-1 text-[11px] font-bold border shadow-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#E6C78B] text-[#1A110B] border-[#F7F3EA]'
                    : 'bg-[#C5A059] hover:bg-[#E6C78B] text-[#1A110B] border-[#F7F3EA]/80'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>{spot.title[currentLang]}</span>
              </button>

              {isSelected && (
                <div className="mt-2 w-52 sm:w-60 rounded-none bg-[#1A110B]/95 backdrop-blur-sm border border-[#C5A059] p-3 text-[#F7F3EA] shadow-2xl">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
                      {spot.tag[currentLang]}
                    </span>
                    <Maximize2 className="w-3 h-3 text-[#E6C78B]" />
                  </div>
                  <p className="text-xs font-bold text-[#E6C78B]">
                    {spot.title[currentLang]}
                  </p>
                  <p className="mt-1 text-[11px] text-[#F7F3EA]/85 leading-relaxed">
                    {spot.desc[currentLang]}
                  </p>
                  <p className="mt-2 pt-2 border-t border-[#C5A059]/25 text-[10px] text-[#E6C78B]/90">
                    {spot.specs[currentLang]}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* زر معاينة سريع */}
        <div className="absolute bottom-3 end-3 z-10">
          <Button
            href="#contact"
            lang={currentLang}
            withSvg={false}
            className="inline-flex items-center gap-1 rounded-none !bg-[#C5A059] hover:!bg-[#E6C78B] !text-[#1A110B] font-bold text-xs px-3 py-1.5 !border !border-[#E6C78B] transition-colors"
          >
            <span>
              {currentLang === 'ar' ? 'احجز معاينة' : 'Book Tour'}
            </span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* لوحة التفاصيل أسفل الإطار */}
      {currentSpot && (
        <div className="rounded-none bg-[#241810] border border-[#C5A059]/35 p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1 max-w-xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#E6C78B]">
              <span className="px-2 py-0.5 bg-[#1A110B] border border-[#C5A059]/40">
                {currentSpot.tag[currentLang]}
              </span>
              <span className="text-[#F7F3EA]/70">
                {currentSpot.specs[currentLang]}
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#F7F3EA]">
              {currentSpot.title[currentLang]}
            </h4>
            <p className="text-xs text-[#F7F3EA]/80 leading-relaxed">
              {currentSpot.desc[currentLang]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            {scene.hotspots.map((spot) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveSpotId(spot.id)}
                className={`rounded-none px-2.5 py-1 text-xs font-semibold border transition-colors cursor-pointer ${
                  activeSpotId === spot.id
                    ? 'bg-[#C5A059] text-[#1A110B] border-[#E6C78B]'
                    : 'bg-[#1A110B] text-[#F7F3EA]/80 border-[#C5A059]/35 hover:border-[#C5A059]'
                }`}
              >
                {spot.title[currentLang]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}