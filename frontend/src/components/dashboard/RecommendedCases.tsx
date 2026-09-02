'use client';

import React from 'react';
import { Play, Pause, Clock, Sparkles, Scale, CheckCircle2, Eye } from 'lucide-react';
import { RECOMMENDED_CASES } from '../../data/dashboardData';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { PrecedentCase } from '../../types/dashboard';

interface RecommendedCasesProps {
  onSelectCase?: (caseItem: PrecedentCase) => void;
}

export const RecommendedCases: React.FC<RecommendedCasesProps> = ({
  onSelectCase,
}) => {
  const { currentCase, isPlaying, playCase, togglePlay } = useAudioPlayer();

  const handlePlayClick = (e: React.MouseEvent, caseItem: PrecedentCase) => {
    e.stopPropagation();
    if (currentCase?.id === caseItem.id) {
      togglePlay();
    } else {
      playCase(caseItem);
    }
  };

  const handleCaseClick = (caseItem: PrecedentCase) => {
    if (onSelectCase) {
      onSelectCase(caseItem);
    }
  };

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60">
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
            Recommended for You
          </h2>
        </div>
        <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-amber-600" />
          Curated Precedents
        </span>
      </div>

      {/* 3 Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {RECOMMENDED_CASES.map((caseItem) => {
          const isCurrentPlaying = currentCase?.id === caseItem.id && isPlaying;

          return (
            <div
              key={caseItem.id}
              onClick={() => handleCaseClick(caseItem)}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-amber-300 cursor-pointer"
            >
              <div className="space-y-3">
                {/* Match Score & Citation */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 text-[11px]">
                    {caseItem.matchScore}% Research Match
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {caseItem.year} • {caseItem.citation}
                  </span>
                </div>

                {/* Case Name & Category */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {caseItem.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif leading-snug group-hover:text-blue-950 transition-colors mt-0.5 flex items-center justify-between gap-1">
                    <span>{caseItem.name}</span>
                    <Eye className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{caseItem.benchSize}</span>
                  </div>
                </div>

                {/* Doctrine & Summary */}
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <p className="text-xs text-amber-900 font-medium bg-amber-50/70 px-2 py-0.5 rounded border border-amber-200/50 inline-block">
                    {caseItem.doctrine}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {caseItem.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{caseItem.duration}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handlePlayClick(e, caseItem)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isCurrentPlaying
                      ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                  }`}
                >
                  {isCurrentPlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-slate-950" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>Listen</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
