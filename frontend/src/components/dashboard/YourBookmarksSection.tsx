'use client';

import React from 'react';
import { Bookmark, Play, Pause, Clock, ArrowRight, BookOpen, Eye } from 'lucide-react';
import { BOOKMARKED_CASES } from '../../data/dashboardData';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { PrecedentCase } from '../../types/dashboard';

interface YourBookmarksSectionProps {
  onSelectCase?: (caseItem: PrecedentCase) => void;
}

export const YourBookmarksSection: React.FC<YourBookmarksSectionProps> = ({
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
            <Bookmark className="w-4 h-4 fill-amber-500" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
            Your Bookmarks
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onSelectCase && onSelectCase(BOOKMARKED_CASES[0])}
          className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 transition-colors"
        >
          <span>View All (36)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Bookmarked Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BOOKMARKED_CASES.map((caseItem) => {
          const isCurrentPlaying = currentCase?.id === caseItem.id && isPlaying;

          return (
            <div
              key={caseItem.id}
              onClick={() => handleCaseClick(caseItem)}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-amber-300 cursor-pointer"
            >
              <div className="space-y-3">
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 bg-amber-50 text-amber-900 px-2 py-0.5 rounded text-[11px] border border-amber-200/60">
                      {caseItem.year}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {caseItem.citation}
                    </span>
                  </div>
                  <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>

                {/* Case Name */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif leading-snug group-hover:text-blue-950 transition-colors flex items-center justify-between gap-1">
                    <span>{caseItem.name}</span>
                    <Eye className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </h3>
                  <p className="text-xs text-amber-800 font-medium bg-amber-50/70 px-2 py-0.5 rounded border border-amber-200/50 mt-1.5 inline-block">
                    {caseItem.doctrine}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {caseItem.summary}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{caseItem.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCaseClick(caseItem);
                    }}
                    title="Read Judgment Brief"
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handlePlayClick(e, caseItem)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
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
            </div>
          );
        })}
      </div>
    </section>
  );
};
