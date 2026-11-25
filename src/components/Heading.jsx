import React from 'react';

export default function Heading({
  eyebrow,
  headingLine1,
  headingHighlight='',
  description,
  lang ,
}) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';

  const headingFontStyle = {
    fontFamily: currentLang === 'ar' ? "'Amiri', serif" : "'Cinzel', serif",
  };

  return (
    <div className="space-y-4">
      {eyebrow && (
        <div className="inline-flex items-center gap-2.5">
          <span className="h-[1.5px] w-7 bg-[#C5A059]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A6728]">
            {eyebrow}
          </span>
            <span className="h-[1.5px] w-7 bg-[#C5A059]" />

        </div>
      )}

      <h2
        style={headingFontStyle}
        className="text-2xl sm:text-4xl xl:text-[42px] font-bold leading-tight text-[#1A110B]"
      >
        {headingLine1}
        {headingHighlight && (
          <span className="block text-[#8A6728] mt-1">{headingHighlight}</span>
        )}
      </h2>

      {description && (
        <p className="text-sm sm:text-base xl:text-[17px] leading-relaxed text-[#2C1E14]/90 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}