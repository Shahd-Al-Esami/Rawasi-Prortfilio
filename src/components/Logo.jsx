

import { useId } from "react";

/* Tailwind classes per size: scale the symbol and the texts together */
const SIZES = {
  sm: { svg: "w-24", ar: "text-3xl", en: "text-sm", tag: "text-[11px]" },
  md: { svg: "w-36 md:w-44", ar: "text-4xl md:text-5xl", en: "text-xl md:text-2xl", tag: "text-xs md:text-sm" },
  lg: { svg: "w-48 md:w-64", ar: "text-5xl md:text-7xl", en: "text-2xl md:text-4xl", tag: "text-sm md:text-base" },
};

/* "dark" = for dark backgrounds (splash, navbar, footer). "light" = for light backgrounds. */
const THEMES = {
  dark:  { ar: "#F7F3EA", en: "#D6B77E", tag: "#E9E1D3", rule: "#A88750" },
  light: { ar: "#1E2B33", en: "#8A6A38", tag: "#2E3F49", rule: "#8A6A38" },
};

const css = `
.rl-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:rl-draw 1.6s cubic-bezier(.6,0,.2,1) forwards}
.rl-fade{opacity:0;animation:rl-fade .9s ease forwards}
@keyframes rl-draw{to{stroke-dashoffset:0}}
@keyframes rl-fade{to{opacity:1}}
@media (prefers-reduced-motion:reduce){
  .rl-draw{animation:none;stroke-dashoffset:0}
  .rl-fade{animation:none;opacity:1}
}`;

export default function Logo({lang='en',
  size = "md",
  variant = "dark",
  showTagline = true,
  animated = false, // true = draws itself (use it in the splash screen)
}) {
  const gid = "rawasiGold" + useId().replace(/:/g, ""); // unique id, safe if the logo appears twice
  const s = SIZES[size];
  const c = THEMES[variant];

  const draw = animated ? "rl-draw" : "";
  const fade = animated ? "rl-fade" : "";
  const delay = (d) => (animated ? { animationDelay: `${d}s` } : undefined);

  return (
    <div role="img" aria-label="رواسي — Rawasi" className="flex flex-col items-center gap-1">
      {animated && <style>{css}</style>}

      {/* Mountain + architecture symbol */}
      <svg viewBox="0 0 600 150" className={s.svg} xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
        <defs>
          {/* userSpaceOnUse = one continuous gold across all the shapes */}
          <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="150">
            <stop offset="0%" stopColor="#E6C78B" />
            <stop offset="50%" stopColor="#A88750" />
            <stop offset="100%" stopColor="#6F4B27" />
          </linearGradient>
        </defs>

        {/* Outer mountain */}
        <path className={draw} pathLength="1" style={delay(0.4)}
          d="M10 116 H120 L205 44 L285 116" stroke={`url(#${gid})`} strokeWidth="8" strokeLinejoin="miter" />

        {/* Inner mountain */}
        <path className={fade} style={delay(1)} d="M155 120 L205 83 L255 120 Z" fill={`url(#${gid})`} />

        {/* Central tower */}
        <path className={fade} style={delay(1.1)} d="M285 120 V28 L320 5 V120 Z" fill={`url(#${gid})`} />

        {/* Roof line */}
        <path className={draw} pathLength="1" style={delay(0.4)}
          d="M320 5 L420 91 L445 70 L535 116 H590" stroke={`url(#${gid})`} strokeWidth="8" strokeLinejoin="miter" />

        {/* Columns */}
        <path className={fade} style={delay(1.2)} d="M345 35 V120 H365 V52 Z" fill={`url(#${gid})`} />
        <path className={fade} style={delay(1.3)} d="M385 70 V120 H402 V85 Z" fill={`url(#${gid})`} />

        {/* Thin foundation line under the whole symbol */}
        <path className={fade} style={delay(1.4)} d="M10 136 H590" stroke={c.rule} strokeWidth="1.5" />
      </svg>




{/* الاسم بالإنجليزية */}
{lang ==='en'?
<span
  dir="ltr"
  className={`${s.en} ${fade} font-semibold leading-tight tracking-[0.35em]`}
  style={{ color: c.en, fontFamily: "'Cinzel', serif", ...delay(1.7) }}
>
  RAWASI
</span>:<span
  dir="rtl"
  className={`${s.en} ${fade} font-semibold leading-tight tracking-[0.35em]`}
  style={{ color: c.en, fontFamily: "'Amiri', serif", ...delay(1.7) }}
>
  رواسي
</span>

}
    </div>
  );
}