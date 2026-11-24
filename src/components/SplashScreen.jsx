import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import SKY_BG from '../assets/d.jpg';

export default function SplashScreen({ onFinish }) {
  const [isOpening, setIsOpening] = useState(false);
  const [flyStyle, setFlyStyle] = useState({});
  const splashLogoRef = useRef(null);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      const splashEl = splashLogoRef.current;
      const navbarEl = document.getElementById('navbar-logo-anchor');

      if (splashEl && navbarEl) {
        const sRect = splashEl.getBoundingClientRect();
        const nRect = navbarEl.getBoundingClientRect();

        const deltaX = nRect.left + nRect.width / 2 - (sRect.left + sRect.width / 2);
        const deltaY = nRect.top + nRect.height / 2 - (sRect.top + sRect.height / 2);
        const scaleRatio = nRect.height / sRect.height;

        setFlyStyle({
          transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleRatio})`,
        });
      }

      setIsOpening(true);
    }, 3200);

    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 4200);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-100 pointer-events-none overflow-hidden">
      {/* ================= النصف العلوي من البوابة ================= */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 overflow-hidden transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpening ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="relative w-full h-screen">
          <img 
            src={SKY_BG}
            alt="Gulf Sky"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#493322]/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-linear-to-b from-[#1E140D]/90 " />
        </div>
      </div>

      {/* ================= النصف السفلي من البوابة ================= */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpening ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="relative w-full h-screen top-[-50vh]">
          <img
            src={SKY_BG}
            alt="Gulf Sky"
            className="absolute inset-0 w-full h-full "
          />
          <div className="absolute inset-0 bg-[#493322]/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-linear-to-b from-[#1E140D]/90 " />
        </div>
      </div>

      {/* ================= اللوغو الذهبي المتحرك نحو الـ Navbar ================= */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
        <div
          ref={splashLogoRef}
          style={isOpening ? flyStyle : undefined}
          className="transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
        >
          <Logo size="lg" variant="dark" animated={true} />
        </div>
      </div>
    </div>
  );
}