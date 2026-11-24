import React, { useState, useMemo } from 'react';
import {
  Compass,
  ArrowUpRight,
  ArrowUpLeft,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';

import { LEDGER_COPY } from '../data/investmentOpportunitiesData.js';
import InteractiveGulfMap from '../components/InteractiveGulfMap.jsx';
import ArchitecturalMassing3D from '../components/3D.jsx';

export default function InvestmentOpportunities({
  lang = 'en',
  onSelectOpportunity,
}) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const isRTL = currentLang === 'ar';
  const t = LEDGER_COPY[currentLang];
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [expandedId, setExpandedId] = useState(t.items[0].id);

  const filteredItems = useMemo(() => {
    return t.items.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchMarket =
        selectedMarket === 'all' || item.market === selectedMarket;
      return matchCategory && matchMarket;
    });
  }, [t.items, selectedCategory, selectedMarket]);

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedMarket !== 'all';

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedMarket('all');
  };

  const toggleRow = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePinSelect = (targetId) => {
    const isVisible = filteredItems.some((item) => item.id === targetId);
    if (!isVisible) {
      resetAllFilters();
    }
    setExpandedId(targetId);
  };

  const handleRequestBrief = (item) => {
    if (typeof onSelectOpportunity === 'function') {
      onSelectOpportunity('investment', item);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionFontStyle = {
    fontFamily: isRTL
      ? "'IBM Plex Sans Arabic', sans-serif"
      : "'Plus Jakarta Sans', sans-serif",
  };

  const headingFontStyle = {
    fontFamily: currentLang === 'ar' ? "'Amiri', serif" : "'Cinzel', serif",
  };

  return (
    <section
      id="InvestmentOpportunities"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={sectionFontStyle}
      className="relative bg-[#F7F3EA] text-[#1A110B] py-20 sm:py-24 xl:py-28 border-t border-[#C5A059]/35 overflow-x-clip"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-2.5">
            <span className="h-[1.5px] w-7 bg-[#C5A059]" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#8A6728]">
              {t.eyebrow}
            </span>
            <span className="h-[1.5px] w-7 bg-[#C5A059]" />
          </div>

          <h2
            style={headingFontStyle}
            className="text-3xl sm:text-5xl font-bold text-[#1A110B] tracking-tight"
          >
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-[#2C1E14]/85 leading-relaxed">
            {t.subtitle}
          </p>

          <div className="pt-2">
            <ArchitecturalMassing3D lang={currentLang} />
          </div>
        </div>

        {/* شريط الفلاتر */}
        <div className="rounded-none bg-[#FAF8F3] border border-[#C5A059]/45 p-4 sm:p-5 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A6728] me-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t.filterCategoryLabel}</span>
            </span>
            {t.categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-none px-3 py-1.5 text-xs font-semibold border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#1A110B] text-[#E6C78B] border-[#1A110B]'
                      : 'bg-[#F7F3EA] text-[#1A110B] border-[#C5A059]/40 hover:border-[#C5A059]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#8A6728] me-1">
              {t.filterMarketLabel}
            </span>
            {t.markets.map((mkt) => {
              const active = selectedMarket === mkt.id;
              return (
                <button
                  key={mkt.id}
                  type="button"
                  onClick={() => setSelectedMarket(mkt.id)}
                  className={`rounded-none px-3 py-1.5 text-xs font-semibold border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#1A110B] text-[#E6C78B] border-[#1A110B]'
                      : 'bg-[#F7F3EA] text-[#1A110B] border-[#C5A059]/40 hover:border-[#C5A059]'
                  }`}
                >
                  {mkt.label}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 rounded-none px-2.5 py-1.5 text-xs font-semibold text-[#8A6728] hover:text-[#1A110B] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetFilters}</span>
              </button>
            )}
          </div>
        </div>

        {/* سجل الفرص */}
        <div className="bg-[#FAF8F3] border border-[#C5A059]/45 divide-y divide-[#C5A059]/30">
          {filteredItems.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <p className="text-sm text-[#2C1E14]/80">{t.emptyState}</p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 rounded-none bg-[#1A110B] text-[#E6C78B] px-4 py-2 text-xs font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetFilters}</span>
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = expandedId === item.id;

              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggleRow(item.id)}
                    aria-expanded={isOpen}
                    className={`w-full text-start px-4 sm:px-6 py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center transition-colors cursor-pointer ${
                      isOpen ? 'bg-[#EFE9DC]' : 'hover:bg-[#F7F3EA]'
                    }`}
                  >
                    <div
                      style={{ fontFamily: "'Cinzel', serif" }}
                      className="md:col-span-1 text-xs font-bold text-[#8A6728]"
                    >
                      {item.ref}
                    </div>
                    <div className="md:col-span-5 text-sm font-bold text-[#1A110B]">
                      {item.title}
                    </div>
                    <div className="md:col-span-3 text-xs text-[#2C1E14]/85">
                      {item.marketLabel}
                    </div>
                    <div className="md:col-span-2 text-xs font-semibold text-[#8A6728]">
                      {item.categoryLabel}
                    </div>
                    <div className="md:col-span-1 text-xs font-semibold text-[#1A110B] md:text-end">
                      {item.horizon}
                    </div>
                  </button>

                  {/* المحتوى المتمدد: صورة + تفاصيل + خريطة واقعية تفاعلية */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-7 pt-2 bg-[#EFE9DC] border-t border-[#C5A059]/25">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-[#FAF8F3] border border-[#C5A059]/45 p-4 sm:p-6 transition-all duration-300 ease-in-out">
                          <div className="lg:col-span-4 relative min-h-[240px] rounded-none overflow-hidden bg-[#1A110B] border border-[#C5A059]/40">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A6728]">
                                <Compass className="w-4 h-4 text-[#C5A059]" />
                                <span>
                                  {t.focusLabel}: {item.focus}
                                </span>
                              </div>

                              <p className="text-xs sm:text-sm text-[#2C1E14]/90 leading-relaxed">
                                {item.summary}
                              </p>

                              <ul className="pt-1 space-y-1.5">
                                {item.highlights.map((point) => (
                                  <li
                                    key={point}
                                    className="flex items-center gap-2 text-xs text-[#1A110B] font-medium"
                                  >
                                    <span className="h-1.5 w-1.5 bg-[#C5A059] shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-3 border-t border-[#C5A059]/25 space-y-3">
                              <p className="text-[11px] text-[#2C1E14]/80">
                                {t.locationLabel}:{' '}
                                <strong className="text-[#1A110B]">
                                  {item.location}
                                </strong>
                              </p>

                              <button
                                type="button"
                                onClick={() => handleRequestBrief(item)}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-none bg-[#1A110B] hover:bg-[#C5A059] text-[#F7F3EA] hover:text-[#1A110B] px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer"
                              >
                                <span>{t.cta}</span>
                                <ArrowIcon className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="lg:col-span-4">
                            <InteractiveGulfMap
                              activeItem={item}
                              allItems={t.items}
                              onSelectPin={handlePinSelect}
                              labels={t}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}