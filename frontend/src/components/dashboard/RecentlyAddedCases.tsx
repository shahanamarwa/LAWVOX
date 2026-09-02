'use client';

import React from 'react';
import { Play, Pause, Clock, Sparkles, Scale, Eye } from 'lucide-react';
import { RECENTLY_ADDED_CASES } from '../../data/dashboardData';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { PrecedentCase } from '../../types/dashboard';

interface RecentlyAddedCasesProps {
  onSelectCase?: (caseItem: PrecedentCase) => void;
}

export const RecentlyAddedCases: React.FC<RecentlyAddedCasesProps> = ({
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
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/60">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
            Recently Added Cases
          </h2>
        </div>
        <span className="text-xs text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
          3 Constitutional Precedents
        </span>
      </div>

      {/* 3 Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {RECENTLY_ADDED_CASES.map((caseItem) => {
          const isCurrentPlaying = currentCase?.id === caseItem.id && isPlaying;

          return (
            <div
              key={caseItem.id}
              onClick={() => handleCaseClick(caseItem)}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-indigo-300 cursor-pointer"
            >
              {/* Top Meta Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                    {caseItem.year}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px] truncate">
                    {caseItem.citation}
                  </span>
                </div>

                {/* Case Name */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif leading-snug group-hover:text-blue-950 transition-colors flex items-center justify-between gap-1">
                    <span>{caseItem.name}</span>
                    <Eye className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{caseItem.court}</span>
                  </div>
                </div>

                {/* Short Metadata & Summary */}
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {caseItem.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {caseItem.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Action: Audio Duration + Play Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
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
