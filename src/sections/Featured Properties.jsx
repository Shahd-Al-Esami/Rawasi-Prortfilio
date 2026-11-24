import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PROPERTIES_DATA } from '../data/propertiesData1.js';
import SliderCards from '../components/SliderCards.jsx';
import PropertyFilterBar from '../components/PropertyFilterBar.jsx';
import PropertyGrid from '../components/PropertyGrid.jsx';

const COPY = {
  en: {
    eyebrow: 'Curated Portfolio',
    title: 'Discover Our Properties',
    subtitle:
      'Explore an architectural selection of signature residences, private villas, and prime Gulf investments—designed for lasting comfort, spatial clarity, and enduring value.',
    featuredBadge: 'Signature Spotlight',
    viewDetails: 'View Details',
    buyTab: 'For Sale',
    rentTab: 'For Rent',
    searchPlaceholder: 'Search property name or city...',
    locationLabel: 'Gulf Destination',
    typeLabel: 'Property Type',
    budgetLabel: 'Budget Range',
    bedsLabel: 'Bedrooms',
    resetBtn: 'Reset Filters',
    resultsCount: (shown, total) =>
      `Showing ${shown} of ${total} properties`,
    emptyTitle: 'No properties match your current filter',
    emptyDesc:
      'Try adjusting the destination, budget range, or resetting the filters to browse all listings.',
    sqm: 'm²',
    beds: 'Beds',
    baths: 'Baths',
    prevPage: 'Previous',
    nextPage: 'Next',
    locations: [
      { value: 'all', label: 'All Gulf Cities' },
      { value: 'riyadh', label: 'Riyadh, KSA' },
      { value: 'jeddah', label: 'Jeddah, KSA' },
      { value: 'al-ula', label: 'Al-Ula, KSA' },
      { value: 'dubai', label: 'Dubai, UAE' },
      { value: 'abu-dhabi', label: 'Abu Dhabi, UAE' },
      { value: 'doha', label: 'Doha, Qatar' },
      { value: 'kuwait', label: 'Kuwait City, Kuwait' },
      { value: 'manama', label: 'Manama, Bahrain' },
      { value: 'muscat', label: 'Muscat, Oman' },
    ],
    types: [
      { value: 'all', label: 'All Types' },
      { value: 'villa', label: 'Private Villa' },
      { value: 'penthouse', label: 'Sky Penthouse' },
      { value: 'residence', label: 'Luxury Residence' },
      { value: 'duplex', label: 'Executive Duplex' },
    ],
    buyBudgets: [
      { value: 'all', label: 'Any Budget' },
      { value: 'under-2.5m', label: 'Up to $2.5M' },
      { value: '2.5m-4.5m', label: '$2.5M – $4.5M' },
      { value: '4.5m-plus', label: '$4.5M+' },
    ],
    rentBudgets: [
      { value: 'all', label: 'Any Annual Rent' },
      { value: 'under-130k', label: 'Up to $130K / yr' },
      { value: '130k-200k', label: '$130K – $200K / yr' },
      { value: '200k-plus', label: '$200K+ / yr' },
    ],
    bedrooms: [
      { value: 'all', label: 'Any Bedrooms' },
      { value: '3', label: '3+ Bedrooms' },
      { value: '4', label: '4+ Bedrooms' },
      { value: '5', label: '5+ Bedrooms' },
    ],
  },
  ar: {
    eyebrow: 'محفظة عقارية مختارة',
    title: 'اكتشف عقاراتنا',
    subtitle:
      'استكشف مجموعة معمارية منتقاة من المساكن الفاخرة والفلل الخاصة والفرص الاستثمارية في أبرز مدن الخليج—صُممت لراحة مستدامة وقيمة راسخة.',
    featuredBadge: 'عقاراتنا المميزة',
    viewDetails: 'تفاصيل العقار',
    buyTab: 'للشراء',
    rentTab: 'للإيجار',
    searchPlaceholder: 'ابحث باسم العقار أو المدينة...',
    locationLabel: 'الوجهة الخليجية',
    typeLabel: 'نوع العقار',
    budgetLabel: 'نطاق الميزانية',
    bedsLabel: 'غرف النوم',
    resetBtn: 'إعادة ضبط الفلاتر',
    resultsCount: (shown, total) =>
      `عرض ${shown} من أصل ${total} عقار`,
    emptyTitle: 'لا توجد عقارات مطابقة لخيارات الفلترة الحالية',
    emptyDesc:
      'جرّب تغيير المدينة أو نطاق الميزانية، أو اضغط على إعادة ضبط الفلاتر لعرض جميع العقارات.',
    sqm: 'م²',
    beds: 'غرف',
    baths: 'حمامات',
    prevPage: 'السابق',
    nextPage: 'التالي',
    locations: [
      { value: 'all', label: 'كل مدن الخليج' },
      { value: 'riyadh', label: 'الرياض، السعودية' },
      { value: 'jeddah', label: 'جدة، السعودية' },
      { value: 'al-ula', label: 'العلا، السعودية' },
      { value: 'dubai', label: 'دبي، الإمارات' },
      { value: 'abu-dhabi', label: 'أبوظبي، الإمارات' },
      { value: 'doha', label: 'الدوحة، قطر' },
      { value: 'kuwait', label: 'مدينة الكويت، الكويت' },
      { value: 'manama', label: 'المنامة، البحرين' },
      { value: 'muscat', label: 'مسقط، عُمان' },
    ],
    types: [
      { value: 'all', label: 'كل الأنواع' },
      { value: 'villa', label: 'فيلا خاصة' },
      { value: 'penthouse', label: 'بنتهاوس سماوي' },
      { value: 'residence', label: 'مسكن فاخر' },
      { value: 'duplex', label: 'دوبلكس تنفيذي' },
    ],
    buyBudgets: [
      { value: 'all', label: 'أي ميزانية' },
      { value: 'under-2.5m', label: 'حتى 2.5 مليون $' },
      { value: '2.5m-4.5m', label: '2.5 – 4.5 مليون $' },
      { value: '4.5m-plus', label: 'أكثر من 4.5 مليون $' },
    ],
    rentBudgets: [
      { value: 'all', label: 'أي إيجار سنوي' },
      { value: 'under-130k', label: 'حتى 130 ألف $ / سنوياً' },
      { value: '130k-200k', label: '130 – 200 ألف $ / سنوياً' },
      { value: '200k-plus', label: 'أكثر من 200 ألف $ / سنوياً' },
    ],
    bedrooms: [
      { value: 'all', label: 'أي عدد غرف' },
      { value: '3', label: '3+ غرف نوم' },
      { value: '4', label: '4+ غرف نوم' },
      { value: '5', label: '5+ غرف نوم' },
    ],
  },
};

const ITEMS_PER_PAGE = 6;

export default function Properties({
  lang = 'en',
  listingType,
  onChangeListingType,
}) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const t = COPY[currentLang];

  useEffect(() => {
    const prevHtmlOverflowX = document.documentElement.style.overflowX;
    const prevBodyOverflowX = document.body.style.overflowX;

    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';

    return () => {
      document.documentElement.style.overflowX = prevHtmlOverflowX;
      document.body.style.overflowX = prevBodyOverflowX;
    };
  }, []);

  const [internalListingType, setInternalListingType] = useState('buy');
  const activeType = listingType ?? internalListingType;

  const [keyword, setKeyword] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedBeds, setSelectedBeds] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const gridTopRef = useRef(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeType,
    keyword,
    selectedCity,
    selectedPropertyType,
    selectedBudget,
    selectedBeds,
  ]);

  const handleListingTab = (nextType) => {
    setInternalListingType(nextType);
    setSelectedBudget('all');
    onChangeListingType?.(nextType);
  };

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedCity('all');
    setSelectedPropertyType('all');
    setSelectedBudget('all');
    setSelectedBeds('all');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    keyword.trim() !== '' ||
    selectedCity !== 'all' ||
    selectedPropertyType !== 'all' ||
    selectedBudget !== 'all' ||
    selectedBeds !== 'all';

  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((item) => {
      if (item.listingType !== activeType) return false;
      if (selectedCity !== 'all' && item.cityKey !== selectedCity) return false;
      if (
        selectedPropertyType !== 'all' &&
        item.typeKey !== selectedPropertyType
      ) {
        return false;
      }
      if (selectedBeds !== 'all' && item.beds < Number(selectedBeds)) {
        return false;
      }

      if (selectedBudget !== 'all') {
        if (activeType === 'buy') {
          if (selectedBudget === 'under-2.5m' && item.priceValue > 2500000)
            return false;
          if (
            selectedBudget === '2.5m-4.5m' &&
            (item.priceValue < 2500000 || item.priceValue > 4500000)
          )
            return false;
          if (selectedBudget === '4.5m-plus' && item.priceValue <= 4500000)
            return false;
        } else {
          if (selectedBudget === 'under-130k' && item.priceValue > 130000)
            return false;
          if (
            selectedBudget === '130k-200k' &&
            (item.priceValue < 130000 || item.priceValue > 200000)
          )
            return false;
          if (selectedBudget === '200k-plus' && item.priceValue <= 200000)
            return false;
        }
      }

      if (keyword.trim() !== '') {
        const q = keyword.trim().toLowerCase();
        const matchTitle =
          item.title.en.toLowerCase().includes(q) ||
          item.title.ar.toLowerCase().includes(q);
        const matchLoc =
          item.location.en.toLowerCase().includes(q) ||
          item.location.ar.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc) return false;
      }

      return true;
    });
  }, [
    activeType,
    selectedCity,
    selectedPropertyType,
    selectedBudget,
    selectedBeds,
    keyword,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProperties = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, safePage]);

  const goToPage = (pageNum) => {
    const next = Math.max(1, Math.min(pageNum, totalPages));
    setCurrentPage(next);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      id="featuredProperties"
      style={sectionFontStyle}
      className="relative bg-[#F7F3EA] text-[#1A110B] py-20 sm:py-24 xl:py-28 border-t border-[#C5A059]/30 overflow-x-clip"
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
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

          <p className="text-sm sm:text-base xl:text-[17px] text-[#2C1E14]/85 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <SliderCards
          lang={currentLang}
          labels={{
            featuredBadge: t.featuredBadge,
            beds: t.beds,
            baths: t.baths,
            sqm: t.sqm,
            viewDetails: t.viewDetails,
          }}
        />

        <PropertyFilterBar
          containerRef={gridTopRef}
          activeType={activeType}
          onListingTabChange={handleListingTab}
          keyword={keyword}
          onKeywordChange={setKeyword}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          selectedPropertyType={selectedPropertyType}
          onPropertyTypeChange={setSelectedPropertyType}
          selectedBudget={selectedBudget}
          onBudgetChange={setSelectedBudget}
          selectedBeds={selectedBeds}
          onBedsChange={setSelectedBeds}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
          resultsText={t.resultsCount(
            paginatedProperties.length,
            filteredProperties.length
          )}
          labels={{
            buyTab: t.buyTab,
            rentTab: t.rentTab,
            searchPlaceholder: t.searchPlaceholder,
            locationLabel: t.locationLabel,
            typeLabel: t.typeLabel,
            budgetLabel: t.budgetLabel,
            bedsLabel: t.bedsLabel,
            resetBtn: t.resetBtn,
            locations: t.locations,
            types: t.types,
            buyBudgets: t.buyBudgets,
            rentBudgets: t.rentBudgets,
            bedrooms: t.bedrooms,
          }}
        />

        <PropertyGrid
          properties={paginatedProperties}
          lang={currentLang}
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onResetFilters={handleResetFilters}
          labels={{
            beds: t.beds,
            baths: t.baths,
            sqm: t.sqm,
            viewDetails: t.viewDetails,
            prevPage: t.prevPage,
            nextPage: t.nextPage,
            emptyTitle: t.emptyTitle,
            emptyDesc: t.emptyDesc,
            resetBtn: t.resetBtn,
          }}
        />
      </div>
    </section>
  );
}