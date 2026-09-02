'use client';

import React, { useState } from 'react';
import { useAudio } from '@/context/AudioContext';
import { useToast } from '@/context/ToastContext';
import { ChapterSelectorModal } from './ChapterSelectorModal';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Bookmark,
  ListMusic,
  X,
  FileText,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Mic,
  Radio,
  BookOpen,
} from 'lucide-react';

export const GlobalAudioPlayer: React.FC = () => {
  const {
    currentCase,
    currentChapter,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    volume,
    isMuted,
    isLoading,
    error,
    showPlayer,
    currentSpokenText,
    useVoiceSynthesis,
    toggleVoiceSynthesis,
    togglePlay,
    seek,
    seekRelative,
    setSpeed,
    setVol,
    toggleMute,
    playChapter,
    closePlayer,
    toggleBookmark,
    isBookmarked,
  } = useAudio();

  const { showToast } = useToast();

  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(false);

  if (!showPlayer || !currentCase) return null;

  const bookmarked = isBookmarked(currentCase.id);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const speedOptions = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  const handleBookmarkToggle = () => {
    const isNowBookmarked = toggleBookmark(currentCase.id);
    showToast(
      isNowBookmarked ? `Added "${currentCase.shortTitle}" to bookmarks` : `Removed "${currentCase.shortTitle}" from bookmarks`,
      isNowBookmarked ? 'success' : 'info'
    );
  };

  return (
    <>
      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl transition-all duration-300">
        
        {/* Expandable Legal Lesson Transcript Drawer */}
        {isTranscriptExpanded && (
          <div className="bg-slate-900 text-slate-100 p-4 sm:p-5 border-b border-slate-800 shadow-inner max-h-48 overflow-y-auto animate-in slide-in-from-bottom-2 duration-200">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                  <BookOpen className="w-4 h-4" />
                  <span>Law Lesson & Section Explanatory Narration</span>
                  <span className="bg-purple-900/60 text-purple-200 border border-purple-700 px-2 py-0.5 rounded text-[10px]">
                    {currentChapter ? currentChapter.title : 'Full Precedent'}
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans pt-1">
                  "{currentSpokenText}"
                </p>
              </div>

              <button
                onClick={() => setIsTranscriptExpanded(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg self-end sm:self-start"
                title="Collapse transcript"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Progress Bar scrubber at top */}
        <div className="relative w-full h-1.5 bg-slate-100 group cursor-pointer">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 rounded-r-full transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Audio progress slider"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Left: Case Info */}
            <div className="flex items-center gap-3 min-w-0 max-w-[38%] sm:max-w-[28%]">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-900 text-white flex items-center justify-center font-bold text-xs shadow-md flex-shrink-0">
                <Mic className="w-5 h-5 text-purple-200" />
                {isPlaying && (
                  <div className="absolute inset-0 rounded-xl bg-purple-600/30 animate-pulse pointer-events-none" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">
                  {currentCase.shortTitle}
                </p>
                <p className="text-[11px] text-purple-700 truncate font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block flex-shrink-0" />
                  {currentChapter ? currentChapter.title : currentCase.court}
                </p>
              </div>
            </div>

            {/* Center: Controls & Timings */}
            <div className="flex flex-col items-center gap-1 flex-1 max-w-md">
              <div className="flex items-center gap-2 sm:gap-4">
                {/* 15s Rewind */}
                <button
                  onClick={() => seekRelative(-15)}
                  className="p-1.5 text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors relative"
                  title="Rewind 15 seconds"
                  aria-label="Rewind 15 seconds"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400">15</span>
                </button>

                {/* Play / Pause Primary Button */}
                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white flex items-center justify-center shadow-md hover:shadow-purple-500/30 transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>

                {/* 15s Forward */}
                <button
                  onClick={() => seekRelative(15)}
                  className="p-1.5 text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors relative"
                  title="Forward 15 seconds"
                  aria-label="Forward 15 seconds"
                >
                  <RotateCw className="w-4 h-4" />
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400">15</span>
                </button>
              </div>

              {/* Timestamp & Wave Indicator */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
                
                {isPlaying && (
                  <div className="flex items-center gap-0.5 ml-1.5 h-3">
                    <span className="w-0.5 bg-purple-500 rounded-full animate-wave-1" />
                    <span className="w-0.5 bg-purple-600 rounded-full animate-wave-2" />
                    <span className="w-0.5 bg-indigo-500 rounded-full animate-wave-3" />
                    <span className="w-0.5 bg-purple-400 rounded-full animate-wave-4" />
                  </div>
                )}

                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                  Voice Narration
                </span>
              </div>
            </div>

            {/* Right: Auxiliary Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* Transcript Drawer Toggle */}
              <button
                onClick={() => setIsTranscriptExpanded(!isTranscriptExpanded)}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  isTranscriptExpanded
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                }`}
                title="View Law Lesson Explaining Transcript"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Lesson Transcript</span>
                {isTranscriptExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>

              {/* Chapters Selector Trigger */}
              <button
                onClick={() => setIsChapterModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                title="Select Chapters"
              >
                <ListMusic className="w-4 h-4 text-purple-600" />
                <span className="hidden sm:inline">Chapters</span>
              </button>

              {/* Speed Selector Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                  className="px-2 py-1 text-xs font-semibold text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg border border-slate-200 transition-colors"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>

                {isSpeedMenuOpen && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 flex flex-col gap-1 min-w-[70px] z-50">
                    <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-0.5">Speed</span>
                    {speedOptions.map((spd) => (
                      <button
                        key={spd}
                        onClick={() => {
                          setSpeed(spd);
                          setIsSpeedMenuOpen(false);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-lg text-left font-medium transition-colors ${
                          playbackSpeed === spd
                            ? 'bg-purple-600 text-white'
                            : 'hover:bg-purple-50 text-slate-700'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Volume Slider */}
              <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-slate-200">
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVol(parseFloat(e.target.value))}
                  className="w-16 h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-purple-600"
                  aria-label="Volume slider"
                />
              </div>

              {/* Bookmark Toggle */}
              <button
                onClick={handleBookmarkToggle}
                className={`p-2 rounded-lg transition-colors ${
                  bookmarked
                    ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
                title={bookmarked ? 'Remove Bookmark' : 'Bookmark Case'}
                aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark Case'}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
              </button>

              {/* Close Player */}
              <button
                onClick={closePlayer}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors ml-1"
                title="Close Player"
                aria-label="Close audio player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Modal */}
      <ChapterSelectorModal
        isOpen={isChapterModalOpen}
        onClose={() => setIsChapterModalOpen(false)}
        legalCase={currentCase}
        currentChapter={currentChapter}
        onSelectChapter={playChapter}
      />
    </>
  );
};
