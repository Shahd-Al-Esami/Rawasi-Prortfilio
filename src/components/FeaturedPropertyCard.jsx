import React from 'react';
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ArrowUpRight,
  ArrowUpLeft,
} from 'lucide-react';

export default function FeaturedPropertyCard({
  property,
  lang = 'en',
  labels,
  isActive = false,
  onSelect,
  style,
}) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const ArrowIcon = currentLang === 'ar' ? ArrowUpLeft : ArrowUpRight;

  return (
    <article
      onClick={onSelect}
      style={style}
      className={`absolute w-[80%] max-w-[440px] sm:max-w-[520px] rounded-none bg-[#1A110B] text-[#F7F3EA] border transition-all duration-500 ease-out overflow-hidden shadow-2xl ${
        isActive
          ? 'border-[#C5A059] cursor-default'
          : 'border-[#C5A059]/35 hover:border-[#C5A059] cursor-pointer'
      }`}
    >
      <div className="relative h-60 sm:h-72 overflow-hidden bg-[#2C1E14]">
        <img
          src={property.image}
          alt={property.title[currentLang]}
          draggable={false}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B] via-[#1A110B]/20 to-transparent" />

        <span className="absolute top-3.5 start-3.5 bg-[#1A110B]/90 text-[#E6C78B] border border-[#C5A059]/60 px-3 py-1 text-[11px] font-semibold">
          {property.status[currentLang]}
        </span>

        <span
          dir="ltr"
          className="absolute bottom-3.5 end-3.5 bg-[#C5A059] text-[#1A110B] px-3.5 py-1 text-xs sm:text-sm font-bold"
        >
          {property.priceText[currentLang]}
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-1.5 text-xs text-[#E6C78B]">
          <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          <span>{property.location[currentLang]}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[#F7F3EA] truncate">
          {property.title[currentLang]}
        </h3>

        <div className="pt-2 border-t border-[#C5A059]/20 flex items-center justify-between text-xs text-[#F7F3EA]/80">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-[#C5A059]" />
              {property.beds} {labels.beds}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-[#C5A059]" />
              {property.baths} {labels.baths}
            </span>
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A059]" />
              {property.area} {labels.sqm}
            </span>
          </div>

          <a
            href="#contact"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 font-bold text-[#E6C78B] hover:text-[#F7F3EA] transition-colors"
          >
            <span>{labels.viewDetails}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}