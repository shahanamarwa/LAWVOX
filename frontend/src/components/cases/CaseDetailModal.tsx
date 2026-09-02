'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { LegalCase, Chapter } from '@/types';
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
  Scale,
  Users,
  Shield,
  FileText,
  ListMusic,
  Check,
  Share2,
  Volume2,
  Mic,
} from 'lucide-react';

interface CaseDetailModalProps {
  legalCase: LegalCase | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  legalCase,
  isOpen,
  onClose,
}) => {
  const { currentCase, isPlaying, playCase, playChapter, toggleBookmark, isBookmarked } = useAudio();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'about' | 'chapters' | 'principles'>('about');

  if (!legalCase) return null;

  const isCurrentPlaying = currentCase?.id === legalCase.id && isPlaying;
  const bookmarked = isBookmarked(legalCase.id);

  const handlePlayMain = () => {
    playCase(legalCase);
    showToast(`Now playing spoken lesson: ${legalCase.shortTitle}`, 'info');
  };

  const handlePlayChapter = (chapter: Chapter) => {
    playCase(legalCase, chapter.timestamp, chapter);
    showToast(`Playing chapter lesson: ${chapter.title}`, 'info');
  };

  const handleBookmarkToggle = () => {
    const isNow = toggleBookmark(legalCase.id);
    showToast(
      isNow ? `Added "${legalCase.shortTitle}" to bookmarks` : `Removed "${legalCase.shortTitle}" from bookmarks`,
      isNow ? 'success' : 'info'
    );
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/search?q=${encodeURIComponent(legalCase.shortTitle)}`);
      showToast('Case link copied to clipboard!', 'success');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={legalCase.title}
      subtitle={`${legalCase.citation} • ${legalCase.court} (${legalCase.year})`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Header Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-purple-50/70 border border-purple-100 rounded-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="purple" size="md">
              {legalCase.category}
            </Badge>
            <Badge variant="gold" size="md">
              {legalCase.court}
            </Badge>
            <Badge variant="slate" size="md">
              {legalCase.year}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isCurrentPlaying ? 'secondary' : 'primary'}
              size="sm"
              onClick={handlePlayMain}
              leftIcon={isCurrentPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4 ml-0.5" />}
            >
              {isCurrentPlaying ? 'Pause Audio' : 'Listen Explaining Audio'}
            </Button>

            <button
              onClick={handleBookmarkToggle}
              className={`p-2.5 rounded-xl border transition-colors ${
                bookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-100'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={bookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
              title="Share Case"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === 'about'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            About & Spoken Audio
          </button>
          <button
            onClick={() => setActiveTab('chapters')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'chapters'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ListMusic className="w-4 h-4" />
            Law Lessons & Chapters ({legalCase.chapters.length})
          </button>
          <button
            onClick={() => setActiveTab('principles')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === 'principles'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Key Principles & Bench
          </button>
        </div>

        {/* Tab Content: About */}
        {activeTab === 'about' && (
          <div className="space-y-5">
            {legalCase.spokenScript && (
              <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-4 sm:p-5 rounded-2xl border border-purple-800 shadow-md space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span>Spoken Voice Audio Script</span>
                </div>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-sans">
                  "{legalCase.spokenScript}"
                </p>
              </div>
            )}

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-600" /> Case Summary
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                {legalCase.summary}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-600" /> Constitutional Significance
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm bg-amber-50/50 p-4 rounded-xl border border-amber-100/70">
                {legalCase.significance}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-600" /> Constitutional Provisions Involved
              </h4>
              <div className="flex flex-wrap gap-2">
                {legalCase.constitutionalProvisions.map((prov, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold rounded-lg"
                  >
                    {prov}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Chapters */}
        {activeTab === 'chapters' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
              <span>{legalCase.chapters.length} Explanatory Law Lessons</span>
              <span>Total Duration: {legalCase.duration}</span>
            </div>

            <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 overflow-hidden">
              {legalCase.chapters.map((chap) => (
                <div
                  key={chap.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {chap.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900">{chap.title}</p>
                      {chap.spokenScript && (
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {chap.spokenScript}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1.5">
                        <Clock className="w-3 h-3 text-purple-600" /> {chap.duration}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlayChapter(chap)}
                    leftIcon={<Volume2 className="w-3.5 h-3.5 text-purple-600 ml-0.5" />}
                    className="self-end sm:self-center flex-shrink-0"
                  >
                    Play Lesson
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Principles & Bench */}
        {activeTab === 'principles' && (
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" /> Established Constitutional Ratios
              </h4>
              <ul className="space-y-2">
                {legalCase.keyPrinciples.map((principle, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-50/50 border border-purple-100/60 text-sm text-slate-800"
                  >
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" /> Constitutional Bench ({legalCase.bench})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700">
                {legalCase.judges.map((judge, idx) => (
                  <div key={idx} className="flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                    {judge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
