import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Building2,
  ArrowUpRight,
  ArrowUpLeft,
} from 'lucide-react';

const LOCATIONS_HUBS = {
  en: {
    eyebrow: 'Cities & Access',
    title: 'Gulf Hubs & Strategic Corridors',
    subtitle:
      'Compare how each city connects key districts, airports, and residential or leasing demand before choosing your destination.',
    cta: 'Connect for This Hub',
    airportTimeLabel: 'Airport Access',
    keyAxisLabel: 'Key Axis',
    demandTypeLabel: 'Primary Activity',
    hubs: [
      {
        id: 'riyadh',
        code: '01',
        goal: 'investment',
        name: 'Riyadh',
        country: 'Saudi Arabia',
        airportTime: '22 min to RUH',
        keyAxis: 'KAFD · Diriyah · King Salman Road',
        demandType: 'Corporate HQ, Executive Living & Investment',
        pos: { x: 46, y: 50 },
        mapQuery: 'https://maps.google.com/?q=24.7136,46.6753',
      },
      {
        id: 'jeddah',
        code: '02',
        goal: 'buy',
        name: 'Jeddah',
        country: 'Saudi Arabia',
        airportTime: '15 min to JED',
        keyAxis: 'North Corniche · Red Sea Coast',
        demandType: 'Coastal Homeownership & Lifestyle',
        pos: { x: 24, y: 64 },
        mapQuery: 'https://maps.google.com/?q=21.5433,39.1728',
      },
      {
        id: 'dubai',
        code: '03',
        goal: 'rent',
        name: 'Dubai',
        country: 'UAE',
        airportTime: '20 min to DXB',
        keyAxis: 'Dubai Marina · Sheikh Zayed Corridor',
        demandType: 'Executive Leasing & Serviced Residences',
        pos: { x: 76, y: 48 },
        mapQuery: 'https://maps.google.com/?q=25.2048,55.2708',
      },
      {
        id: 'doha',
        code: '04',
        goal: 'investment',
        name: 'Doha',
        country: 'Qatar',
        airportTime: '25 min to DOH',
        keyAxis: 'Lusail Marina · West Bay',
        demandType: 'Master-Planned Living & Holdings',
        pos: { x: 63, y: 44 },
        mapQuery: 'https://maps.google.com/?q=25.2854,51.5310',
      },
    ],
  },
  ar: {
    eyebrow: 'المدن ومحاور الوصول',
    title: 'محاور المدن والربط الخليجي',
    subtitle:
      'تعرّفي على طبيعة النشاط في كل مدينة، زمن الوصول للمطار، وأبرز المحاور الحيوية قبل اختيار وجهتكِ للتواصل.',
    cta: 'تواصلي بخصوص هذه المدينة',
    airportTimeLabel: 'الوصول للمطار',
    keyAxisLabel: 'المحور الرئيسي',
    demandTypeLabel: 'طبيعة النشاط',
    hubs: [
      {
        id: 'riyadh',
        code: '01',
        goal: 'investment',
        name: 'الرياض',
        country: 'السعودية',
        airportTime: '22 دقيقة لمطار الملك خالد',
        keyAxis: 'كافد · الدرعية · طريق الملك سلمان',
        demandType: 'مقرات شركات، سكن تنفيذي، واستثمار',
        pos: { x: 46, y: 50 },
        mapQuery: 'https://maps.google.com/?q=24.7136,46.6753',
      },
      {
        id: 'jeddah',
        code: '02',
        goal: 'buy',
        name: 'جدة',
        country: 'السعودية',
        airportTime: '15 دقيقة لمطار الملك عبدالعزيز',
        keyAxis: 'الكورنيش الشمالي · ساحل البحر الأحمر',
        demandType: 'تملك سكني ساحلي ونمط حياة بحري',
        pos: { x: 24, y: 64 },
        mapQuery: 'https://maps.google.com/?q=21.5433,39.1728',
      },
      {
        id: 'dubai',
        code: '03',
        goal: 'rent',
        name: 'دبي',
        country: 'الإمارات',
        airportTime: '20 دقيقة لمطار دبي الدولي',
        keyAxis: 'مرسى دبي · محور شارع الشيخ زايد',
        demandType: 'تأجير تنفيذي ووحدات سكنية مخدومة',
        pos: { x: 76, y: 48 },
        mapQuery: 'https://maps.google.com/?q=25.2048,55.2708',
      },
      {
        id: 'doha',
        code: '04',
        goal: 'investment',
        name: 'الدوحة',
        country: 'قطر',
        airportTime: '25 دقيقة لمطار حمد الدولي',
        keyAxis: 'مرسى لوسيل · الخليج الغربي',
        demandType: 'مخططات عمرانية وأصول سكنية واستثمارية',
        pos: { x: 63, y: 44 },
        mapQuery: 'https://maps.google.com/?q=25.2854,51.5310',
      },
    ],
  },
};

export default function Locations({ lang = 'en', onSelectLocation }) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const isRTL = currentLang === 'ar';
  const t = LOCATIONS_HUBS[currentLang];
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const [activeId, setActiveId] = useState(t.hubs[0].id);
  const currentHub = t.hubs.find((h) => h.id === activeId) || t.hubs[0];

  const handleSelect = () => {
    if (typeof onSelectLocation === 'function') {
      onSelectLocation({ city: currentHub.name, goal: currentHub.goal });
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const HeadingFontStyle = {
    fontFamily:
      currentLang === 'ar'
        ? "'Amiri', serif"
        : "'Cinzel', serif",
  };
  return (
    <section
      id="locations"
      style={{
        fontFamily: isRTL
          ? "'IBM Plex Sans Arabic', sans-serif"
          : "'Plus Jakarta Sans', sans-serif",
      }}
      className="relative bg-[#EFE9DC] text-[#1A110B] py-20 sm:py-24 xl:py-28 border-t border-[#C5A059]/35 overflow-x-clip"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* عنوان القسم في المنتصف */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <div className="inline-flex items-center justify-center gap-2.5">
            <span className="h-[1.5px] w-7 bg-[#C5A059]" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#8A6728]">
              {t.eyebrow}
            </span>
            <span className="h-[1.5px] w-7 bg-[#C5A059]" />
          </div>

          <h2
            style={HeadingFontStyle}
            className="text-3xl sm:text-5xl font-bold text-[#1A110B] tracking-tight"
          >
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-[#2C1E14]/85 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* مخطط خريطة فاتح بطابع معماري يوضح الربط بين المدن والوصول */}
        <div className="rounded-none bg-[#FAF8F3] border border-[#C5A059]/50 overflow-hidden shadow-sm">
          {/* شريط اختيار المدينة */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#C5A059]/35">
            {t.hubs.map((hub) => {
              const selected = hub.id === currentHub.id;
              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setActiveId(hub.id)}
                  className={`px-4 py-3.5 text-start border-b md:border-b-0 border-e last:border-e-0 border-[#C5A059]/30 transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#1A110B] text-[#E6C78B]'
                      : 'bg-[#FAF8F3] hover:bg-[#F7F3EA] text-[#1A110B]'
                  }`}
                >
                  <span
                    style={{ fontFamily: "'Cinzel', serif" }}
                    className="text-[11px] font-bold tracking-widest block opacity-80"
                  >
                    {hub.code}
                  </span>
                  <span className="text-sm sm:text-base font-bold">
                    {hub.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* خريطة المحاور والربط */}
          <div className="relative h-[360px] sm:h-[430px] w-full bg-[#F3EDE0] overflow-hidden">
            <svg
              viewBox="0 0 400 240"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
              className="w-full h-full"
            >
              {/* مسطحات مائية هادئة */}
              <rect width="400" height="240" fill="#E3E9EC" />

              {/* شبه الجزيرة العربية بلون الترافرتين الفاتح */}
              <path
                d="M 45 18 L 165 16 L 215 45 L 248 78 L 260 100 L 278 102 L 315 108 L 348 124 L 332 170 L 265 208 L 155 236 L 118 220 L 78 152 L 42 88 Z"
                fill="#FAF8F3"
                stroke="#8A6728"
                strokeOpacity="0.45"
                strokeWidth="1"
              />

              {/* مسارات الربط بين المدن الخليجية */}
              <g
                stroke="#8A6728"
                strokeOpacity="0.45"
                strokeWidth="1"
                strokeDasharray="3 2"
                fill="none"
              >
                <path d="M 184 120 Q 140 138 96 154" />
                <path d="M 184 120 L 252 106 L 304 115" />
              </g>
            </svg>

            {/* نقاط المدن على الخريطة */}
            {t.hubs.map((hub) => {
              const isCurrent = hub.id === currentHub.id;
              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setActiveId(hub.id)}
                  style={{ left: `${hub.pos.x}%`, top: `${hub.pos.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex items-center justify-center rounded-none border transition-all ${
                        isCurrent
                          ? 'w-8 h-8 bg-[#1A110B] text-[#E6C78B] border-[#C5A059] shadow-md scale-110'
                          : 'w-6 h-6 bg-[#FAF8F3] text-[#1A110B] border-[#8A6728]/60 hover:border-[#1A110B]'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <span
                      className={`mt-1 px-2 py-0.5 text-[10px] font-bold border whitespace-nowrap ${
                        isCurrent
                          ? 'bg-[#1A110B] text-[#E6C78B] border-[#1A110B]'
                          : 'bg-[#FAF8F3]/95 text-[#1A110B] border-[#8A6728]/40'
                      }`}
                    >
                      {hub.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* شريط مؤشرات الوصول والربط للمدينة المختارة */}
          <div className="p-5 sm:p-6 bg-[#FAF8F3] border-t border-[#C5A059]/35 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-3 flex items-center gap-2.5 text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-[#8A6728] shrink-0" />
              <div>
                <span className="text-[11px] text-[#8A6728] block font-semibold">
                  {t.airportTimeLabel}
                </span>
                <strong className="text-[#1A110B]">{currentHub.airportTime}</strong>
              </div>
            </div>

            <div className="md:col-span-3 flex items-center gap-2.5 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#8A6728] shrink-0" />
              <div>
                <span className="text-[11px] text-[#8A6728] block font-semibold">
                  {t.keyAxisLabel}
                </span>
                <strong className="text-[#1A110B]">{currentHub.keyAxis}</strong>
              </div>
            </div>

            <div className="md:col-span-3 flex items-center gap-2.5 text-xs sm:text-sm">
              <Building2 className="w-4 h-4 text-[#8A6728] shrink-0" />
              <div>
                <span className="text-[11px] text-[#8A6728] block font-semibold">
                  {t.demandTypeLabel}
                </span>
                <strong className="text-[#1A110B]">{currentHub.demandType}</strong>
              </div>
            </div>

            <div className="md:col-span-3 flex md:justify-end">
              <button
                type="button"
                onClick={handleSelect}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-none bg-[#1A110B] hover:bg-[#C5A059] text-[#F7F3EA] hover:text-[#1A110B] px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>{t.cta}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}