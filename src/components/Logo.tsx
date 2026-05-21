import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: 'w-8 h-8 rounded-xl border-b-[3px]',
      icon: 'text-xl translate-y-[-1px]',
      dot: 'w-2.5 h-2.5 -top-0.5 -right-0.5 border-[1.5px]',
      text: 'text-lg',
      gap: 'gap-2'
    },
    md: {
      container: 'w-12 h-12 rounded-[1rem] border-b-[4px]',
      icon: 'text-3xl translate-y-[-2px]',
      dot: 'w-4 h-4 -top-1 -right-1 border-2',
      text: 'text-2xl',
      gap: 'gap-3'
    },
    lg: {
      container: 'w-16 h-16 rounded-[1.2rem] border-b-[6px]',
      icon: 'text-5xl translate-y-[-3px]',
      dot: 'w-5 h-5 -top-1.5 -right-1.5 border-[3px]',
      text: 'text-4xl',
      gap: 'gap-4'
    }
  };

  const s = sizeClasses[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <div className={`relative ${s.container} bg-emerald-500 flex items-center justify-center transform -rotate-6 border-emerald-700 shadow-sm will-change-transform`}>
        {/* Arabic Letter Alif with Hamza */}
        <span className={`text-white font-serif font-black relative z-10 block ${s.icon}`}>أ</span>
        {/* Playful accent dot */}
        <div className={`absolute ${s.dot} bg-amber-400 rounded-full border-white shadow-sm`}></div>
      </div>
      <span className={`${s.text} font-black text-slate-800 tracking-tight`}>Alifin</span>
    </div>
  );
}
