import React, { useState, useEffect, useRef } from 'react';

function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 1800,
  startCounting = false,
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let animationFrameId;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // حركة تباطؤ ناعمة عند الوصول للرقم النهائي (easeOutQuart)
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, startCounting]);

  return (
    <span dir="ltr" className="tabular-nums">
      {prefix}
      {count.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

export default function AboutStatsCards({ stats = [] }) {
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const statsContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (statsContainerRef.current) {
      observer.observe(statsContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={statsContainerRef}
      className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="group rounded-none bg-[#EFE9DC]/80 hover:bg-[#493322] text-[#1A110B] hover:text-[#F7F3EA] p-6 sm:p-7 border border-[#C5A059]/35 border-b-2 border-b-[#C5A059] transition-colors duration-250"
        >
          <div className="text-3xl sm:text-4xl xl:text-[42px] font-bold tracking-tight text-[#8A6728] group-hover:text-[#E6C78B] mb-2">
            <AnimatedCounter
              target={stat.target}
              prefix={stat.prefix}
              suffix={stat.suffix}
              startCounting={hasEnteredView}
            />
          </div>

          <h3 className="text-sm sm:text-base font-bold mb-1">
            {stat.label}
          </h3>

          <p className="text-xs leading-relaxed text-[#2C1E14]/75 group-hover:text-[#F7F3EA]/80">
            {stat.sublabel}
          </p>
        </div>
      ))}
    </div>
  );
}