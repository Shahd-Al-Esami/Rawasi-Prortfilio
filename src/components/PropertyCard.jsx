import React from 'react';
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ArrowUpRight,
  ArrowUpLeft,
} from 'lucide-react';

export default function PropertyCard({ property, lang = 'en', labels }) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const ArrowIcon = currentLang === 'ar' ? ArrowUpLeft : ArrowUpRight;

  return (
    <article className="group rounded-none bg-[#FAF8F3] border border-[#C5A059]/35 hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-[0_12px_30px_rgba(197,160,89,0.22)]">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#2C1E14]">
          <img
            src={property.image}
            alt={property.title[currentLang]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/70 via-transparent to-transparent" />

          <span className="absolute top-3 start-3 bg-[#1A110B]/90 text-[#E6C78B] border border-[#C5A059]/50 px-2.5 py-1 text-[11px] font-semibold">
            {property.typeLabel[currentLang]}
          </span>

          <span className="absolute top-3 end-3 bg-[#F7F3EA]/95 text-[#1A110B] px-2.5 py-1 text-[11px] font-bold">
            {property.status[currentLang]}
          </span>

          <div
            dir="ltr"
            className="absolute bottom-3 start-3 bg-[#C5A059] text-[#1A110B] px-3 py-1 text-sm font-extrabold"
          >
            {property.priceText[currentLang]}
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8A6728]">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span>{property.location[currentLang]}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#1A110B] group-hover:text-[#8A6728] transition-colors line-clamp-1">
            {property.title[currentLang]}
          </h3>

          <div className="pt-3 border-t border-[#C5A059]/25 grid grid-cols-3 gap-2 text-xs text-[#2C1E14]/85">
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-[#8A6728] shrink-0" />
              <span>
                <strong>{property.beds}</strong> {labels.beds}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#8A6728] shrink-0" />
              <span>
                <strong>{property.baths}</strong> {labels.baths}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-[#8A6728] shrink-0" />
              <span>
                <strong>{property.area}</strong> {labels.sqm}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 pt-2">
        <a
          href="#contact"
          className="w-full inline-flex items-center justify-between rounded-none bg-[#1A110B] group-hover:bg-[#C5A059] text-[#F7F3EA] group-hover:text-[#1A110B] px-4 py-2.5 text-xs sm:text-sm font-bold border border-[#C5A059]/70 transition-colors"
        >
          <span>{labels.viewDetails}</span>
          <ArrowIcon className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}