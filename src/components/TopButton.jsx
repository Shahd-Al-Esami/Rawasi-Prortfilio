import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function TopButton({ lang = 'en' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const label = lang === 'ar' ? 'العودة للأعلى' : 'Back to Top';

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className={`fixed bottom-20 end-5 z-40 inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-[#1A110B]/90 backdrop-blur-md hover:bg-[#C5A059] text-[#E6C78B] hover:text-[#1A110B] border border-[#C5A059]/60 shadow-xl transition-all duration-250 cursor-pointer ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}