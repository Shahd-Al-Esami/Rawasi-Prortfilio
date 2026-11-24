import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, PhoneCall, Globe, ChevronDown, User } from 'lucide-react';
import Logo from './Logo';
import Button from './Button/Button';

const NAV_LINKS = {
  en: [
    { name: 'About Rawasi', href: '#about' },
    { name: 'Services', href: '#services' },

    { name: 'Properties', href: '#featuredProperties' },
    { name: 'Investments', href: '#InvestmentOpportunities' },
    { name: 'Locations', href: '#locations' },
    { name: 'Contact Us', href: '#contact' },
  ],
  ar: [
    { name: 'قصتنا', href: '#about' },
    { name: 'الخدمات', href: '#services' },

    { name: 'العقارات', href: '#featuredProperties' },
    { name: 'الاستثمارات', href: '#InvestmentOpportunities' },
    { name: 'المواقع', href: '#locations' },
    { name: 'اتصل بنا', href: '#contact' },

  ],
};

const BUY_DROPDOWN = {
  en: [
    { id: 'buy-ready', label: 'Ready Villas & Penthouses', href: '#featuredProperties' },
    { id: 'buy-offplan', label: 'Off-Plan Gulf Towers', href: '#InvestmentOpportunities' },
    { id: 'buy-waterfront', label: 'Waterfront Residences', href: '#featuredLocation' },
  ],
  ar: [
    { id: 'buy-ready', label: 'فلل وبنتهاوس جاهزة', href: '#featuredProperties' },
    { id: 'buy-offplan', label: 'أبراج خليجية قيد الإنشاء', href: '#InvestmentOpportunities' },
    { id: 'buy-waterfront', label: 'مساكن على الواجهة البحرية', href: '#featuredLocation' },
  ],
};

const RENT_DROPDOWN = {
  en: [
    { id: 'rent-annual', label: 'Annual Luxury Leases', href: '#featuredProperties' },
    { id: 'rent-executive', label: 'Serviced Executive Suites', href: '#services' },
    { id: 'rent-short', label: 'Short-Stay Gulf Homes', href: '#featuredLocation' },
  ],
  ar: [
    { id: 'rent-annual', label: 'عقود إيجار سنوية فاخرة', href: '#featuredProperties' },
    { id: 'rent-executive', label: 'أجنحة تنفيذية مخدومة', href: '#services' },
    { id: 'rent-short', label: 'إقامات خليجية قصيرة الأمد', href: '#featuredLocation' },
  ],
};

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'AR' },
];

const LABELS = {
  en: {
    buy: 'Buy',
    rent: 'Rent',
    language: 'Language',
    consultation: 'Consultation',
 
  },
  ar: {
    buy: 'شراء',
    rent: 'إيجار',
    language: 'اللغة',
    consultation: 'تواصل معنا',
 
  },
};

export default function Navbar({
  showLogo = true,
  lang = 'en',
  onToggleLang,
  onChangeLang,
  listingType = '',
  onChangeListingType,
}) {

  const [activeHref, setActiveHref] = useState('#hero');

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 'buy' | 'rent' | 'lang' | 'drawer-buy' | 'drawer-rent' | 'drawer-lang' | null
  const [selectedBuyOption, setSelectedBuyOption] = useState('buy-ready');
  const [selectedRentOption, setSelectedRentOption] = useState('rent-annual');

  const headerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const links = NAV_LINKS[currentLang];
  const buyItems = BUY_DROPDOWN[currentLang];
  const rentItems = RENT_DROPDOWN[currentLang];
  const t = LABELS[currentLang];
  const activeLangOption =
    LANGUAGE_OPTIONS.find((item) => item.code === currentLang) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMenuEnter = (menuName) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenMenu(menuName);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 140);
  };

  const toggleMenuClick = (menuName) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleLanguageSelect = (nextLang) => {
    setOpenMenu(null);
    setIsMobileMenuOpen(false);
    if (nextLang === currentLang) return;
    if (typeof onChangeLang === 'function') {
      onChangeLang(nextLang);
    } else if (typeof onToggleLang === 'function') {
      onToggleLang(nextLang);
    }
  };

  const handleListingOptionSelect = (type, item) => {
    if (type === 'buy') {
      setSelectedBuyOption(item.id);
    } else {
      setSelectedRentOption(item.id);
    }
    onChangeListingType?.(type);
    setOpenMenu(null);
    setIsMobileMenuOpen(false);
  };

  const navFontStyle = {
    fontFamily:
      currentLang === 'ar'
        ? "'IBM Plex Sans Arabic', sans-serif"
        : "'Plus Jakarta Sans', sans-serif",
  };

  return (
    <header
      ref={headerRef}
      style={navFontStyle}
      className={`fixed top-0 left-0 right-0 z-50 max-w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2C1E14]/90 backdrop-blur-md shadow-lg py-2.5 sm:py-3 border-b border-[#C5A059]/25'
          : 'bg-gradient-to-b from-[#1A110B]/85 to-transparent py-3 sm:py-4 xl:py-5'
      }`}
    >
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between gap-4 min-w-0">
          {/* 1. Brand Logo (يظهر دائماً) */}
          <a
            id="navbar-logo-anchor"
            href="#hero"
            className={`shrink-0 transition-opacity duration-200 ${
              showLogo ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Logo lang={lang} size="sm" animated={false} />
          </a>

          {/* 2. Desktop Navigation Links (>= 1280px فقط) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-8 min-w-0">
            {links.map((link) =>{
    const isActive = activeHref === link.href;

    return (
              
              <a
                key={link.name}
                href={link.href}
                onClick={()=>setActiveHref(link.href)}
                className="relative text-sm 2xl:text-[15px] font-medium text-[#F7F3EA]/90 hover:text-[#E6C78B] transition-colors duration-200 py-1 group whitespace-nowrap shrink-0"
              >
                {link.name}
           <span
          className={`absolute bottom-0 left-0 h-0.5 bg-[#C5A059] transition-all duration-300 ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
              </a>
            )})}
          </nav>

          {/* 3. Desktop Right Actions (>= 1280px فقط) */}
          <div className="hidden xl:flex items-center gap-4 2xl:gap-6 shrink-0">
            {/* Buy | Rent Dropdowns */}
            <div className="flex items-center gap-2 2xl:gap-2.5 text-xs 2xl:text-[13px] font-semibold select-none whitespace-nowrap">
              {/* Buy */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter('buy')}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    onChangeListingType?.('buy');
                    toggleMenuClick('buy');
                  }}
                  aria-expanded={openMenu === 'buy'}
                  className={`inline-flex items-center gap-1 px-1.5 py-1 rounded-none transition-colors cursor-pointer whitespace-nowrap ${
                    listingType === 'buy'
                      ? 'text-[#E6C78B]'
                      : 'text-[#F7F3EA]/85 hover:text-[#E6C78B]'
                  }`}
                >
                  <span>{t.buy}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      openMenu === 'buy' ? 'rotate-180 text-[#E6C78B]' : 'text-[#D6B77E]'
                    }`}
                  />
                </button>

                <div
                  className={`absolute top-full start-0 mt-2 w-60 2xl:w-64 bg-[#1A110B]/95 backdrop-blur-md border border-[#C5A059]/45 rounded-none shadow-2xl transition-all duration-200 origin-top ${
                    openMenu === 'buy'
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                  }`}
                >
                  <div className="py-1 flex flex-col">
                    {buyItems.map((item) => {
                      const isSelected =
                        listingType === 'buy' && selectedBuyOption === item.id;
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={() => handleListingOptionSelect('buy', item)}
                          className={`px-4 py-2.5 text-xs 2xl:text-[13px] rounded-none transition-colors duration-150 ${
                            isSelected
                              ? 'bg-[#2C1E14] text-[#E6C78B] font-semibold hover:bg-[#C5A059] hover:text-[#1A110B]'
                              : 'text-[#F7F3EA]/90 hover:bg-[#C5A059] hover:text-[#1A110B]'
                          }`}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <span className="text-[#C5A059]/60" aria-hidden="true">
                |
              </span>

              {/* Rent */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter('rent')}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    onChangeListingType?.('rent');
                    toggleMenuClick('rent');
                  }}
                  aria-expanded={openMenu === 'rent'}
                  className={`inline-flex items-center gap-1 px-1.5 py-1 rounded-none transition-colors cursor-pointer whitespace-nowrap ${
                    listingType === 'rent'
                      ? 'text-[#E6C78B]'
                      : 'text-[#F7F3EA]/85 hover:text-[#E6C78B]'
                  }`}
                >
                  <span>{t.rent}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      openMenu === 'rent' ? 'rotate-180 text-[#E6C78B]' : 'text-[#D6B77E]'
                    }`}
                  />
                </button>

                <div
                  className={`absolute top-full start-0 mt-2 w-60 2xl:w-64 bg-[#1A110B]/95 backdrop-blur-md border border-[#C5A059]/45 rounded-none shadow-2xl transition-all duration-200 origin-top ${
                    openMenu === 'rent'
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                  }`}
                >
                  <div className="py-1 flex flex-col">
                    {rentItems.map((item) => {
                      const isSelected =
                        listingType === 'rent' && selectedRentOption === item.id;
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={() => handleListingOptionSelect('rent', item)}
                          className={`px-4 py-2.5 text-xs 2xl:text-[13px] rounded-none transition-colors duration-150 ${
                            isSelected
                              ? 'bg-[#2C1E14] text-[#E6C78B] font-semibold hover:bg-[#C5A059] hover:text-[#1A110B]'
                              : 'text-[#F7F3EA]/90 hover:bg-[#C5A059] hover:text-[#1A110B]'
                          }`}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Language Dropdown (No Border) */}
            <div
              className="relative select-none whitespace-nowrap"
              onMouseEnter={() => handleMenuEnter('lang')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                type="button"
                onClick={() => toggleMenuClick('lang')}
                aria-expanded={openMenu === 'lang'}
                aria-label="Select Language"
                className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-none text-xs 2xl:text-[13px] font-semibold text-[#F7F3EA] hover:text-[#E6C78B] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Globe className="w-3.5 h-3.5 text-[#D6B77E]" />
                <span>{activeLangOption.short}</span>
                <ChevronDown
                  className={`w-3 h-3 text-[#D6B77E] transition-transform duration-200 ${
                    openMenu === 'lang' ? 'rotate-180 text-[#E6C78B]' : ''
                  }`}
                />
              </button>

              <div
                className={`absolute top-full end-0 mt-2 w-40 bg-[#1A110B]/95 backdrop-blur-md border border-[#C5A059]/45 rounded-none shadow-2xl transition-all duration-200 origin-top ${
                  openMenu === 'lang'
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="py-1 flex flex-col">
                  {LANGUAGE_OPTIONS.map((option) => {
                    const isActive = currentLang === option.code;
                    return (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => handleLanguageSelect(option.code)}
                        className={`w-full text-start px-4 py-2.5 text-xs 2xl:text-[13px] rounded-none transition-colors duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-[#2C1E14] text-[#E6C78B] font-semibold hover:bg-[#C5A059] hover:text-[#1A110B]'
                            : 'text-[#F7F3EA]/90 hover:bg-[#C5A059] hover:text-[#1A110B]'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          


          <Button withSvg={false} href={'#contact'} >
              <PhoneCall className="w-3.5 h-3.5 text-[#E6C78B]" />

  {t.consultation}
</Button>
          </div>

          {/* 4. زر القائمة فقط من 320px حتى < 1280px (xl:hidden) */}
          <button
            type="button"
            onClick={() => {
              setOpenMenu(null);
              setIsMobileMenuOpen((prev) => !prev);
            }}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Menu"
            className="xl:hidden inline-flex items-center justify-center text-[#F7F3EA] hover:text-[#E6C78B] p-2 rounded-none transition-colors shrink-0 cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* 5. Drawer القائمة للعرض من 320px حتى < 1280px */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[42rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#2C1E14]/98 backdrop-blur-md border-t border-[#C5A059]/25 px-3 sm:px-6 pt-4 pb-6 space-y-2 shadow-2xl">
          {/* روابط التنقل */}
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-none text-xs sm:text-sm font-medium text-[#F7F3EA]/90 hover:bg-[#C5A059] hover:text-[#1A110B] transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* قسم Buy | Rent القابل للفتح والاختيار داخل القائمة */}
          <div className="pt-2 border-t border-[#E9E1D3]/15 space-y-1.5">
            {/* Buy Accordion */}
            <div>
              <button
                type="button"
                onClick={() => {
                  onChangeListingType?.('buy');
                  toggleMenuClick('drawer-buy');
                }}
                aria-expanded={openMenu === 'drawer-buy'}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-none text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  listingType === 'buy'
                    ? 'text-[#E6C78B] bg-[#1A110B]/50'
                    : 'text-[#F7F3EA]/90 hover:bg-[#1A110B]/50 hover:text-[#E6C78B]'
                }`}
              >
                <span>{t.buy}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openMenu === 'drawer-buy' ? 'rotate-180 text-[#E6C78B]' : 'text-[#D6B77E]'
                  }`}
                />
              </button>

              {openMenu === 'drawer-buy' && (
                <div className="bg-[#1A110B]/80 border-s-2 border-[#C5A059] ms-3 mt-1 flex flex-col">
                  {buyItems.map((item) => {
                    const isSelected =
                      listingType === 'buy' && selectedBuyOption === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => handleListingOptionSelect('buy', item)}
                        className={`px-4 py-2 text-xs rounded-none transition-colors ${
                          isSelected
                            ? 'bg-[#2C1E14] text-[#E6C78B] font-semibold hover:bg-[#C5A059] hover:text-[#1A110B]'
                            : 'text-[#F7F3EA]/85 hover:bg-[#C5A059] hover:text-[#1A110B]'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Rent Accordion */}
            <div>
              <button
                type="button"
                onClick={() => {
                  onChangeListingType?.('rent');
                  toggleMenuClick('drawer-rent');
                }}
                aria-expanded={openMenu === 'drawer-rent'}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-none text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  listingType === 'rent'
                    ? 'text-[#E6C78B] bg-[#1A110B]/50'
                    : 'text-[#F7F3EA]/90 hover:bg-[#1A110B]/50 hover:text-[#E6C78B]'
                }`}
              >
                <span>{t.rent}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openMenu === 'drawer-rent' ? 'rotate-180 text-[#E6C78B]' : 'text-[#D6B77E]'
                  }`}
                />
              </button>

              {openMenu === 'drawer-rent' && (
                <div className="bg-[#1A110B]/80 border-s-2 border-[#C5A059] ms-3 mt-1 flex flex-col">
                  {rentItems.map((item) => {
                    const isSelected =
                      listingType === 'rent' && selectedRentOption === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => handleListingOptionSelect('rent', item)}
                        className={`px-4 py-2 text-xs rounded-none transition-colors ${
                          isSelected
                            ? 'bg-[#2C1E14] text-[#E6C78B] font-semibold hover:bg-[#C5A059] hover:text-[#1A110B]'
                            : 'text-[#F7F3EA]/85 hover:bg-[#C5A059] hover:text-[#1A110B]'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Language Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMenuClick('drawer-lang')}
                aria-expanded={openMenu === 'drawer-lang'}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-none text-xs sm:text-sm font-semibold text-[#F7F3EA]/90 hover:bg-[#1A110B]/50 hover:text-[#E6C78B] transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D6B77E]" />
                  <span>
                    {t.language} ({activeLangOption.label})
                  </span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#D6B77E] transition-transform duration-200 ${
                    openMenu === 'drawer-lang' ? 'rotate-180 text-[#E6C78B]' : ''
                  }`}
                />
              </button>

              {openMenu === 'drawer-lang' && (
                <div className="bg-[#1A110B]/80 border-s-2 border-[#C5A059] ms-3 mt-1 flex flex-col">
                  {LANGUAGE_OPTIONS.map((option) => {
                    const isActive = currentLang === option.code;
                    return (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => handleLanguageSelect(option.code)}
                        className={`w-full text-start px-4 py-2 text-xs rounded-none transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#2C1E14] text-[#E6C78B] font-semibold hover:bg-[#C5A059] hover:text-[#1A110B]'
                            : 'text-[#F7F3EA]/85 hover:bg-[#C5A059] hover:text-[#1A110B]'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          
        </div>
      </div>
    </header>
  );
}