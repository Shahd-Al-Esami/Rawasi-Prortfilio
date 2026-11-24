import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROPERTIES_DATA } from '../data/propertiesData1.js';
import FeaturedPropertyCard from './FeaturedPropertyCard.jsx';

export default function SliderCards({
  lang = 'en',
  labels,
  autoPlay = true,
  intervalMs = 2000,
}) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';

  const featuredItems = useMemo(
    () => PROPERTIES_DATA.filter((item) => item.featured),
    []
  );

  const [activeCoverIndex, setActiveCoverIndex] = useState(
    featuredItems.length > 1 ? 1 : 0
  );
  const [isPaused, setIsPaused] = useState(false);
  const dragStartXRef = useRef(null);

  const stepCover = (dir) => {
    if (!featuredItems.length) return;
    setActiveCoverIndex((prev) => {
      const len = featuredItems.length;
      return (prev + dir + len) % len;
    });
  };

  // تشغيل التنقل التلقائي بين بطاقات الـ Coverflow
  useEffect(() => {
    if (!autoPlay || featuredItems.length <= 1 || isPaused) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveCoverIndex((prev) => (prev + 1) % featuredItems.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoPlay, featuredItems.length, isPaused, intervalMs]);

  const handlePointerDown = (e) => {
    setIsPaused(true);
    dragStartXRef.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (dragStartXRef.current === null) {
      setIsPaused(false);
      return;
    }

    const diff = e.clientX - dragStartXRef.current;
    dragStartXRef.current = null;

    if (Math.abs(diff) >= 40) {
      const isRtl = currentLang === 'ar';
      if (diff < 0) {
        stepCover(isRtl ? -1 : 1);
      } else {
        stepCover(isRtl ? 1 : -1);
      }
    }

    setIsPaused(false);
  };

  if (!featuredItems.length) return null;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="mt-14 sm:mt-16"
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="inline-flex items-center gap-2 bg-[#1A110B] text-[#E6C78B] px-3.5 py-1.5 border border-[#C5A059] text-xs font-semibold">
          <span>{labels.featuredBadge}</span>
        </div>
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartXRef.current = null;
          setIsPaused(false);
        }}
        style={{ perspective: '1300px' }}
        className="relative h-[420px] sm:h-[470px] w-full overflow-hidden flex items-center justify-center select-none touch-pan-y"
      >
        <button
          type="button"
          onClick={() => stepCover(currentLang === 'ar' ? 1 : -1)}
          aria-label="Previous featured property"
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-none bg-[#1A110B]/90 hover:bg-[#C5A059] text-[#F7F3EA] hover:text-[#1A110B] border border-[#C5A059] shadow-xl backdrop-blur-sm transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => stepCover(currentLang === 'ar' ? -1 : 1)}
          aria-label="Next featured property"
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-none bg-[#1A110B]/90 hover:bg-[#C5A059] text-[#F7F3EA] hover:text-[#1A110B] border border-[#C5A059] shadow-xl backdrop-blur-sm transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {featuredItems.map((item, idx) => {
          const len = featuredItems.length;
          let offset = idx - activeCoverIndex;
          if (offset > len / 2) offset -= len;
          if (offset < -len / 2) offset += len;

          const absOffset = Math.abs(offset);
          if (absOffset > 2) return null;

          const dirFactor = currentLang === 'ar' ? -1 : 1;
          const translateX = offset * 210 * dirFactor;
          const rotateY = -offset * 24 * dirFactor;
          const scale = offset === 0 ? 1 : absOffset === 1 ? 0.84 : 0.7;
          const opacity = offset === 0 ? 1 : absOffset === 1 ? 0.72 : 0.35;
          const zIndex = 30 - absOffset * 10;

          return (
            <FeaturedPropertyCard
              key={item.id}
              property={item}
              lang={currentLang}
              isActive={offset === 0}
              onSelect={() => setActiveCoverIndex(idx)}
              style={{
                transform: `translate3d(${translateX}px, 0, ${
                  -absOffset * 90
                }px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
              labels={{
                beds: labels.beds,
                baths: labels.baths,
                sqm: labels.sqm,
                viewDetails: labels.viewDetails,
              }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {featuredItems.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveCoverIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-none transition-all cursor-pointer ${
              idx === activeCoverIndex
                ? 'w-8 bg-[#C5A059]'
                : 'w-2 bg-[#1A110B]/25 hover:bg-[#8A6728]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}