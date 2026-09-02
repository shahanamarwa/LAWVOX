'use client';

import React from 'react';
import { Play, Pause, Headphones, Volume2, Scale, Eye } from 'lucide-react';
import { CONTINUE_LISTENING_CASE } from '../../data/dashboardData';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { PrecedentCase } from '../../types/dashboard';

interface ContinueListeningCardProps {
  onOpenCaseDetails?: (caseItem: PrecedentCase) => void;
}

export const ContinueListeningCard: React.FC<ContinueListeningCardProps> = ({
  onOpenCaseDetails,
}) => {
  const { currentCase, isPlaying, currentTime, duration, playCase, togglePlay, formatTime } =
    useAudioPlayer();

  const isCurrentActive = currentCase?.id === CONTINUE_LISTENING_CASE.id;
  const isPlayingThis = isCurrentActive && isPlaying;
  const displayTime = isCurrentActive ? formatTime(currentTime) : CONTINUE_LISTENING_CASE.currentTime || '08:45';
  const displayDuration = isCurrentActive ? formatTime(duration) : CONTINUE_LISTENING_CASE.duration || '13:30';
  const progressPercent =
    isCurrentActive && duration > 0
      ? (currentTime / duration) * 100
      : CONTINUE_LISTENING_CASE.progressPercent || 63;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentActive) {
      togglePlay();
    } else {
      playCase(CONTINUE_LISTENING_CASE);
    }
  };

  const handleCardClick = () => {
    if (onOpenCaseDetails) {
      onOpenCaseDetails(CONTINUE_LISTENING_CASE);
    }
  };

  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60">
            <Headphones className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
            Continue Listening
          </h2>
        </div>
        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full bg-amber-500 ${isPlayingThis ? 'animate-ping' : ''}`} />
          In Progress ({Math.round(progressPercent)}%)
        </span>
      </div>

      {/* Case Card */}
      <div
        onClick={handleCardClick}
        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 relative overflow-hidden group cursor-pointer"
      >
        {/* Subtle accent gradient on right */}
        <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-amber-50/50 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          {/* Case Metadata */}
          <div className="space-y-2.5 max-w-2xl">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                {CONTINUE_LISTENING_CASE.court}
              </span>
              <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60">
                Judgment
              </span>
              <span className="text-slate-500 font-mono">
                {CONTINUE_LISTENING_CASE.citation}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 text-[11px]">
                {CONTINUE_LISTENING_CASE.doctrine}
              </span>
            </div>

            {/* Case Title */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-950 transition-colors font-serif flex items-center gap-2">
                <span>{CONTINUE_LISTENING_CASE.name}</span>
                <Eye className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {CONTINUE_LISTENING_CASE.summary}
              </p>
            </div>

            {/* Bench & Article info */}
            <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
              <span className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                {CONTINUE_LISTENING_CASE.benchSize}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                {CONTINUE_LISTENING_CASE.articleReference}
              </span>
            </div>
          </div>

          {/* Audio Player Action Controls */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-all flex items-center gap-1.5"
              title="Read Full Constitutional Brief"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Read Brief</span>
            </button>

            <button
              type="button"
              onClick={handlePlayClick}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-sm transition-all duration-200 ${
                isPlayingThis
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20 ring-2 ring-amber-400/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/15'
              }`}
            >
              {isPlayingThis ? (
                <>
                  <Pause className="w-4 h-4 fill-slate-950" />
                  <span>Pause Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Continue Listening</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar & Timestamps */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-slate-900 font-bold font-mono">
                {displayTime}
              </span>
              <span className="text-slate-400">/</span>
              <span className="font-mono">{displayDuration}</span>
              {isPlayingThis && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold ml-2">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  Playing Audio Narration
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {Math.round(progressPercent)}% Completed
              </span>
            </div>
          </div>

          {/* Styled Legal Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative cursor-pointer group/bar">
            <div
              className="h-full bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-500 rounded-full transition-all duration-300 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white shadow-xs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
