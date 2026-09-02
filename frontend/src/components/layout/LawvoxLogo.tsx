import React from 'react';

interface LawvoxLogoProps {
  compact?: boolean;
  className?: string;
  showSubtitle?: boolean;
}

export const LawvoxLogo: React.FC<LawvoxLogoProps> = ({
  compact = false,
  className = '',
  showSubtitle = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon: Scales of Justice + Acoustic Soundwave */}
      <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-[1px] shadow-sm shadow-slate-900/10 group">
        <div className="w-full h-full rounded-[11px] bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden border border-amber-500/20">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-blue-500/20 opacity-70" />
          
          {/* SVG Custom Mark */}
          <svg
            className="w-6 h-6 text-amber-400 relative z-10 transition-transform duration-300 group-hover:scale-105"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Central Pillar */}
            <line x1="12" y1="3" x2="12" y2="21" stroke="#F59E0B" strokeWidth="2" />
            <path d="M8 21h8" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="12" cy="3" r="1.5" fill="#F59E0B" />
            
            {/* Balance Beam */}
            <line x1="4" y1="7" x2="20" y2="7" stroke="#93C5FD" strokeWidth="1.8" />
            
            {/* Left Pan (Audio Waveform) */}
            <path d="M4 7l-2 5h4l-2-5" stroke="#93C5FD" strokeWidth="1.4" />
            <line x1="4" y1="12" x2="4" y2="15" stroke="#60A5FA" strokeWidth="1.5" />
            <path d="M2.5 15c0 1.2 1.5 1.8 1.5 1.8s1.5-.6 1.5-1.8" stroke="#93C5FD" strokeWidth="1.4" />
            
            {/* Right Pan (Audio Waveform) */}
            <path d="M20 7l-2 5h4l-2-5" stroke="#93C5FD" strokeWidth="1.4" />
            <line x1="20" y1="12" x2="20" y2="15" stroke="#60A5FA" strokeWidth="1.5" />
            <path d="M18.5 15c0 1.2 1.5 1.8 1.5 1.8s1.5-.6 1.5-1.8" stroke="#93C5FD" strokeWidth="1.4" />
            
            {/* Central Audio Frequency Bars */}
            <line x1="9" y1="11" x2="9" y2="17" stroke="#FCD34D" strokeWidth="1.5" opacity="0.85" />
            <line x1="15" y1="11" x2="15" y2="17" stroke="#FCD34D" strokeWidth="1.5" opacity="0.85" />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      {!compact && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 font-serif">
              LAW<span className="text-amber-600 font-sans tracking-normal">VOX</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/60 leading-none">
              LEX AUDIO
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[11px] font-medium text-slate-500 truncate tracking-tight">
              Constitutional Precedents & Audio
            </span>
          )}
        </div>
      )}
    </div>
  );
};
