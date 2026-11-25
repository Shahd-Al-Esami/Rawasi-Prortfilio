import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Check,
  Search,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';

function RawasiDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const closeOnOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutside);
    return () => document.removeEventListener('mousedown', closeOnOutside);
  }, []);

  return (
    <div ref={ref} className="relative space-y-1.5">
      <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A6728]">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 rounded-none bg-[#F7F3EA] hover:bg-[#EFE9DC] text-[#1A110B] text-xs sm:text-sm px-3.5 py-2.5 border transition-colors cursor-pointer ${
          open
            ? 'border-[#1A110B]'
            : value !== 'all'
            ? 'border-[#C5A059] font-semibold'
            : 'border-[#C5A059]/45'
        }`}
      >
        <span className="truncate">{selected.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#8A6728] shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1 z-30 max-h-56 overflow-y-auto rounded-none bg-[#1A110B] border border-[#C5A059] shadow-2xl divide-y divide-[#C5A059]/15"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-start text-xs sm:text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#C5A059] text-[#1A110B] font-bold'
                      : 'text-[#F7F3EA]/90 hover:bg-[#2C1E14] hover:text-[#E6C78B]'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function PropertyFilterBar({
  containerRef,
  activeType,
  onListingTabChange,
  keyword,
  onKeywordChange,
  selectedCity,
  onCityChange,
  selectedPropertyType,
  onPropertyTypeChange,
  selectedBudget,
  onBudgetChange,
  selectedBeds,
  onBedsChange,
  hasActiveFilters,
  onResetFilters,
  resultsText,
  labels,
}) {
  return (
    <div
      ref={containerRef}
      className="mt-16 sm:mt-20 scroll-mt-24 rounded-none bg-[#EFE9DC] border border-[#C5A059]/45 p-5 sm:p-6 shadow-sm space-y-5"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#C5A059]/25">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-none border border-[#1A110B]/20 bg-[#F7F3EA] p-1">
            <button 
              type="button"
              onClick={() => onListingTabChange('buy')}
              className={`rounded-none px-4 py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeType === 'buy'
                  ? 'bg-[#1A110B] text-[#E6C78B]'
                  : 'text-[#1A110B]/75 hover:text-[#1A110B]'
              }`}
            >
              {labels.buyTab}
            </button>
            <button
              type="button"
              onClick={() => onListingTabChange('rent')}
              className={`rounded-none px-4 py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeType === 'rent'
                  ? 'bg-[#1A110B] text-[#E6C78B]'
                  : 'text-[#1A110B]/75 hover:text-[#1A110B]'
              }`}
            >
              {labels.rentTab}
            </button>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A6728]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{resultsText}</span>
          </span>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-[#8A6728] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-none bg-[#F7F3EA] text-[#1A110B] placeholder-[#2C1E14]/50 text-xs sm:text-sm ps-10 pe-3.5 py-2.5 border border-[#C5A059]/45 focus:border-[#C5A059] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <RawasiDropdown
          label={labels.locationLabel}
          options={labels.locations}
          value={selectedCity}
          onChange={onCityChange}
        />

        <RawasiDropdown
          label={labels.typeLabel}
          options={labels.types}
          value={selectedPropertyType}
          onChange={onPropertyTypeChange}
        />

        <RawasiDropdown
          label={labels.budgetLabel}
          options={activeType === 'rent' ? labels.rentBudgets : labels.buyBudgets}
          value={selectedBudget}
          onChange={onBudgetChange}
        />

        <RawasiDropdown
          label={labels.bedsLabel}
          options={labels.bedrooms}
          value={selectedBeds}
          onChange={onBedsChange}
        />
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A6728] hover:text-[#1A110B] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{labels.resetBtn}</span>
          </button>
        </div>
      )}
    </div>
  );
}