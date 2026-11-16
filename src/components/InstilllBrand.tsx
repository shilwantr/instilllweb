import React from 'react';

interface InstilllBrandProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'lowercase' | 'mixed';
  invert?: boolean;
}

export const InstilllBrand: React.FC<InstilllBrandProps> = ({
  className = '',
  size = 'md',
  variant = 'lowercase',
  invert = false,
}) => {
  const sizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
    '2xl': 'text-4xl sm:text-5xl lg:text-6xl',
  }[size];

  const primaryTextColor = invert ? 'text-white' : 'text-slate-900';
  const secondLColor = invert ? 'text-pop-lime' : 'text-pop-forest';
  const thirdLColor = invert ? 'text-amber-300' : 'text-slate-800';

  if (variant === 'mixed') {
    return (
      <span
        className={`inline-flex items-baseline tracking-tight font-black select-none ${sizeClasses} ${className}`}
        aria-label="inSTILLL"
      >
        <span className={`font-sans ${primaryTextColor}`}>inSTI</span>
        {/* 1st L: Modern Sans-Serif */}
        <span
          className={`font-sans ${primaryTextColor} transition-transform hover:-translate-y-0.5 inline-block`}
          title="1st L: Modern Sans"
        >
          L
        </span>
        {/* 2nd L: Elegant Serif Italic */}
        <span
          className={`font-serif italic font-extrabold ${secondLColor} transition-transform hover:-translate-y-0.5 inline-block px-[1px]`}
          title="2nd L: Editorial Serif"
        >
          L
        </span>
        {/* 3rd L: Technical Monospace */}
        <span
          className={`font-mono font-black ${thirdLColor} transition-transform hover:-translate-y-0.5 inline-block`}
          title="3rd L: Technical Monospace"
        >
          L
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-baseline tracking-tight font-black select-none ${sizeClasses} ${className}`}
      aria-label="instilll"
    >
      <span className={`font-sans ${primaryTextColor}`}>insti</span>
      {/* 1st l: Modern Sans-Serif (Plus Jakarta Sans) */}
      <span
        className={`font-sans font-bold ${primaryTextColor} transition-transform hover:-translate-y-0.5 inline-block px-[0.5px]`}
        title="1st l: Modern Sans"
      >
        l
      </span>
      {/* 2nd l: Elegant Serif Italic (Playfair Display) */}
      <span
        className={`font-serif italic font-black ${secondLColor} transition-transform hover:-translate-y-0.5 inline-block px-[1px]`}
        title="2nd l: Editorial Serif Italic"
      >
        l
      </span>
      {/* 3rd l: Technical Monospace (JetBrains Mono) */}
      <span
        className={`font-mono font-bold ${thirdLColor} transition-transform hover:-translate-y-0.5 inline-block px-[0.5px]`}
        title="3rd l: Technical Monospace"
      >
        l
      </span>
    </span>
  );
};
