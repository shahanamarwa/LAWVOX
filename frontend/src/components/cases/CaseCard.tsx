'use client';

import React from 'react';
import { LegalCase } from '@/types';
import { useAudio } from '@/context/AudioContext';
import { useToast } from '@/context/ToastContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Play,
  Pause,
  Bookmark,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CaseCardProps {
  legalCase: LegalCase;
  variant?: 'default' | 'compact' | 'featured';
  showProgress?: boolean;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  legalCase,
  variant = 'default',
  showProgress = true,
}) => {
  const { currentCase, isPlaying, playCase, toggleBookmark, isBookmarked, openCaseModal } = useAudio();
  const { showToast } = useToast();

  const isCurrentPlaying = currentCase?.id === legalCase.id && isPlaying;
  const bookmarked = isBookmarked(legalCase.id);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCase(legalCase);
    showToast(`Playing audio for ${legalCase.shortTitle}`, 'info');
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isNow = toggleBookmark(legalCase.id);
    showToast(
      isNow ? `Bookmarked "${legalCase.shortTitle}"` : `Removed "${legalCase.shortTitle}" from bookmarks`,
      isNow ? 'success' : 'info'
    );
  };

  const handleOpenDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCaseModal(legalCase);
  };

  // Compact Variant (for lists/bookmarks/recent)
  if (variant === 'compact') {
    return (
      <div
        onClick={handleOpenDetails}
        className="group p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-purple-300 shadow-soft-sm hover:shadow-soft transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-purple-700 transition-colors">
              {legalCase.shortTitle}
            </h4>
            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              {legalCase.court} • {legalCase.year} • {legalCase.citation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
          <button
            onClick={handleBookmarkToggle}
            className={`p-2 rounded-xl transition-colors ${
              bookmarked
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark Case'}
            aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark Case'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          <Button
            variant={isCurrentPlaying ? 'secondary' : 'primary'}
            size="sm"
            onClick={handlePlay}
            leftIcon={isCurrentPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          >
            {isCurrentPlaying ? 'Playing' : 'Listen'}
          </Button>
        </div>
      </div>
    );
  }

  // Default Full Card
  return (
    <div
      onClick={handleOpenDetails}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-purple-300 shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="purple" size="sm">
              {legalCase.category}
            </Badge>
            <Badge variant="slate" size="sm">
              {legalCase.year}
            </Badge>
          </div>

          <button
            onClick={handleBookmarkToggle}
            className={`p-1.5 rounded-lg transition-colors ${
              bookmarked
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark Case'}
            aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark Case'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title & Citation */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 mb-1.5 font-serif">
          {legalCase.shortTitle}
        </h3>
        <p className="text-xs font-semibold text-purple-700 mb-2">
          {legalCase.citation}
        </p>

        {/* Court & Bench */}
        <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1">
          <span>{legalCase.court}</span>
          <span>•</span>
          <span className="text-slate-400">{legalCase.bench}</span>
        </p>

        {/* Summary Snippet */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed flex-1 mb-4">
          {legalCase.summary}
        </p>

        {/* Audio Duration & Progress info */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 mt-auto mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            {legalCase.duration}
          </span>
          <span className="text-slate-400">
            {legalCase.chapters.length} Chapters
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant={isCurrentPlaying ? 'secondary' : 'primary'}
            size="sm"
            className="flex-1"
            onClick={handlePlay}
            leftIcon={isCurrentPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          >
            {isCurrentPlaying ? 'Playing Audio' : 'Listen'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenDetails}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            View Case
          </Button>
        </div>
      </div>
    </div>
  );
};
