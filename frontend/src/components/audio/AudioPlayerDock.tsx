'use client';

import React, { useState } from 'react';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  FileText,
  ChevronDown,
  ChevronUp,
  Headphones,
  Scale,
  Sparkles,
} from 'lucide-react';

interface AudioPlayerDockProps {
  onOpenCaseDetails?: () => void;
}

export const AudioPlayerDock: React.FC<AudioPlayerDockProps> = ({
  onOpenCaseDetails,
}) => {
  const {
    currentCase,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isMuted,
    isDockVisible,
    togglePlay,
    seek,
    skip,
    setRate,
    setVol,
    toggleMute,
    formatTime,
  } = useAudioPlayer();

  const [showTranscript, setShowTranscript] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentCase || !isDockVisible) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const rates = [0.75, 1.0, 1.25, 1.5, 2.0];

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    seek(pos * duration);
  };

  return (
    <>
      {/* Transcript Drawer Popover */}
      {showTranscript && (
        <div className="fixed bottom-24 right-4 sm:right-8 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 z-40 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Live Audio Transcript
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setShowTranscript(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold p-1"
            >
              ✕
            </button>
          </div>
          <div className="mt-3 max-h-56 overflow-y-auto pr-1 text-xs leading-relaxed text-slate-600 space-y-2">
            <p className="font-semibold text-slate-900 font-serif">
              {currentCase.name} ({currentCase.year})
            </p>
            <p className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/50 text-slate-800 text-[11.5px]">
              {currentCase.audioNarrationText || currentCase.summary}
            </p>
            <p className="text-[11px] text-slate-400 italic">
              Constitutional audio transcription is generated and synced by LAWVOX Lex Audio Engine.
            </p>
          </div>
        </div>
      )}

      {/* Main Sticky Bottom Audio Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none">
        {/* Minimized Bar */}
        {isMinimized ? (
          <div className="h-12 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-1.5 rounded-lg bg-slate-900 text-amber-400">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <div className="truncate text-xs font-bold text-slate-900">
                {currentCase.name}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2 rounded-full bg-slate-900 text-white"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Left: Case Info & Waveform */}
            <div className="flex items-center gap-3 min-w-0 md:max-w-xs xl:max-w-sm flex-1">
              <button
                type="button"
                onClick={onOpenCaseDetails}
                className="p-2.5 rounded-xl bg-gradient-to-tr from-slate-900 to-blue-950 text-amber-400 shadow-xs flex-shrink-0 hover:scale-105 transition-transform"
                title="View Case Precedent Brief"
              >
                <Scale className="w-5 h-5" />
              </button>

              <div className="min-w-0 flex-1 cursor-pointer" onClick={onOpenCaseDetails}>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate font-serif hover:text-blue-950">
                    {currentCase.name}
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 truncate mt-0.5">
                  <span className="font-medium text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/50">
                    {currentCase.court}
                  </span>
                  <span>•</span>
                  <span className="font-mono">{currentCase.year}</span>
                </div>
              </div>

              {/* Acoustic Soundwave Bars */}
              <div className="hidden lg:flex items-center gap-0.5 px-2 py-1 rounded bg-slate-100/80">
                <span className={`w-0.5 h-3 bg-amber-500 rounded-full ${isPlaying ? 'animate-pulse' : 'h-1.5'}`} />
                <span className={`w-0.5 h-5 bg-amber-600 rounded-full ${isPlaying ? 'animate-pulse' : 'h-2'}`} />
                <span className={`w-0.5 h-4 bg-slate-800 rounded-full ${isPlaying ? 'animate-pulse' : 'h-1'}`} />
                <span className={`w-0.5 h-6 bg-amber-500 rounded-full ${isPlaying ? 'animate-pulse' : 'h-2.5'}`} />
                <span className={`w-0.5 h-3 bg-blue-600 rounded-full ${isPlaying ? 'animate-pulse' : 'h-1.5'}`} />
              </div>
            </div>

            {/* Center: Controls & Timeline */}
            <div className="flex flex-col items-center gap-1.5 flex-1 max-w-xl">
              {/* Playback Buttons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => skip(-10)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
                  aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ) : (
                    <Play className="w-4 h-4 fill-amber-400 text-amber-400 ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => skip(10)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                  title="Forward 10s"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Speed Selector */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg ml-2">
                  {rates.map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setRate(rate)}
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                        playbackRate === rate
                          ? 'bg-slate-900 text-amber-300 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Bar & Timestamps */}
              <div className="w-full flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <span className="w-10 text-right font-semibold text-slate-900">
                  {formatTime(currentTime)}
                </span>
                <div
                  onClick={handleScrub}
                  className="flex-1 h-1.5 bg-slate-200 hover:h-2 rounded-full cursor-pointer relative group transition-all"
                >
                  <div
                    className="h-full bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-500 rounded-full relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className="w-10">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right: Transcript, Volume, Minimize */}
            <div className="flex items-center justify-end gap-2.5 flex-shrink-0">
              {/* Transcript Drawer Toggle */}
              <button
                type="button"
                onClick={() => setShowTranscript(!showTranscript)}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  showTranscript
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
                title="View Case Transcript"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Transcript</span>
              </button>

              {/* Volume */}
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-slate-600" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVol(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
              </div>

              {/* Details Trigger Pill */}
              <button
                type="button"
                onClick={onOpenCaseDetails}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                <span>Case Brief</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </button>

              {/* Minimize Player */}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                title="Minimize player"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
