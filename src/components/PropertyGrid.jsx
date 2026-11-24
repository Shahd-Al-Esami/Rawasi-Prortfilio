import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import PropertyCard from './PropertyCard.jsx';

export default function PropertyGrid({
  properties,
  lang = 'en',
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
  labels,
}) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';

  if (!properties.length) {
    return (
      <div className="mt-10 rounded-none bg-[#EFE9DC]/70 border border-[#C5A059]/45 p-10 text-center space-y-3">
        <h3 className="text-lg sm:text-xl font-bold text-[#1A110B]">
          {labels.emptyTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#2C1E14]/80 max-w-md mx-auto">
          {labels.emptyDesc}
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 rounded-none bg-[#1A110B] hover:bg-[#C5A059] text-[#F7F3EA] hover:text-[#1A110B] px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{labels.resetBtn}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            lang={currentLang}
            labels={{
              beds: labels.beds,
              baths: labels.baths,
              sqm: labels.sqm,
              viewDetails: labels.viewDetails,
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1.5 rounded-none px-4 py-2.5 text-xs sm:text-sm font-bold border border-[#1A110B]/30 bg-[#FAF8F3] text-[#1A110B] hover:border-[#C5A059] hover:bg-[#1A110B] hover:text-[#E6C78B] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{labels.prevPage}</span>
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;
            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => onPageChange(pageNumber)}
                className={`w-10 h-10 rounded-none text-xs sm:text-sm font-bold border transition-colors cursor-pointer tabular-nums ${
                  isActive
                    ? 'bg-[#1A110B] text-[#E6C78B] border-[#C5A059]'
                    : 'bg-[#FAF8F3] text-[#1A110B] border-[#C5A059]/45 hover:border-[#C5A059]'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1.5 rounded-none px-4 py-2.5 text-xs sm:text-sm font-bold border border-[#1A110B]/30 bg-[#FAF8F3] text-[#1A110B] hover:border-[#C5A059] hover:bg-[#1A110B] hover:text-[#E6C78B] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <span>{labels.nextPage}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}