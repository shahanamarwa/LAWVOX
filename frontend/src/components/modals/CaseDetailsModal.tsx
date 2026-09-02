'use client';

import React, { useState } from 'react';
import { PrecedentCase } from '../../types/dashboard';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import {
  X,
  Play,
  Pause,
  Headphones,
  Bookmark,
  Scale,
  Calendar,
  Users,
  Quote,
  Share2,
  Check,
  FileText,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface CaseDetailsModalProps {
  caseItem: PrecedentCase | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseDetailsModal: React.FC<CaseDetailsModalProps> = ({
  caseItem,
  isOpen,
  onClose,
}) => {
  const { currentCase, isPlaying, playCase, togglePlay } = useAudioPlayer();
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(caseItem?.isBookmarked ?? false);
  const [activeTab, setActiveTab] = useState<'overview' | 'ratio' | 'arguments' | 'coram'>('overview');

  if (!isOpen || !caseItem) return null;

  const isCurrentPlaying = currentCase?.id === caseItem.id && isPlaying;

  const handlePlayAudio = () => {
    if (currentCase?.id === caseItem.id) {
      togglePlay();
    } else {
      playCase(caseItem);
    }
  };

  const handleCopyCitation = () => {
    if (caseItem.citation && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`${caseItem.name}, ${caseItem.citation}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 relative">
          {/* Action buttons top right */}
          <div className="absolute top-5 right-5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCitation}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-colors"
              title="Copy Legal Citation"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-300" />
                  <span>Cite</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors ${
                isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
              }`}
              title="Bookmark precedent"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Court & Year Badges */}
          <div className="flex items-center gap-2 text-xs flex-wrap mb-2">
            <span className="font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
              {caseItem.court}
            </span>
            <span className="text-slate-300 font-mono">
              {caseItem.year} • {caseItem.citation}
            </span>
            {caseItem.judgmentDate && (
              <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                <Calendar className="w-3 h-3" />
                {caseItem.judgmentDate}
              </span>
            )}
          </div>

          {/* Case Name */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white tracking-tight leading-snug max-w-2xl">
            {caseItem.name}
          </h2>

          {/* Doctrine & Bench pill */}
          <div className="flex items-center gap-3 text-xs text-slate-300 mt-3 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {caseItem.doctrine || 'Constitutional Precedent'}
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Scale className="w-3.5 h-3.5 text-blue-300" />
              {caseItem.benchSize}
            </span>
          </div>

          {/* Embedded Audio Play Banner */}
          <div className="mt-5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  Constitutional Audio Briefing ({caseItem.duration || '12:00'})
                </p>
                <p className="text-[11px] text-slate-300">
                  Listen to the bench ratio decidendi & judgment summary narrated aloud.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlayAudio}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all ${
                isCurrentPlaying
                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isCurrentPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Pause Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-slate-900" />
                  <span>Listen Brief</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Overview & Facts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ratio')}
            className={`pb-3 px-3 border-b-2 transition-all ${
              activeTab === 'ratio'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ratio Decidendi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('arguments')}
            className={`pb-3 px-3 border-b-2 transition-all ${
              activeTab === 'arguments'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Key Arguments
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('coram')}
            className={`pb-3 px-3 border-b-2 transition-all ${
              activeTab === 'coram'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Bench & Coram
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-700 text-sm leading-relaxed scrollbar-thin">
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Constitutional Article Badge */}
              {caseItem.articleReference && (
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900">
                    Constitutional Provisions Involved:
                  </span>
                  <span className="text-xs font-mono font-semibold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200">
                    {caseItem.articleReference}
                  </span>
                </div>
              )}

              {/* Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-600" />
                  Case Summary
                </h4>
                <p className="text-slate-800 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                  {caseItem.summary}
                </p>
              </div>

              {/* Facts */}
              {caseItem.facts && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Facts & Procedural History
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    {caseItem.facts}
                  </p>
                </div>
              )}

              {/* Landmark Excerpts */}
              {caseItem.keyExcerpts && caseItem.keyExcerpts.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                    <Quote className="w-3.5 h-3.5 text-amber-600" />
                    Landmark Judicial Excerpts
                  </h4>
                  <div className="space-y-2.5">
                    {caseItem.keyExcerpts.map((quote, idx) => (
                      <blockquote
                        key={idx}
                        className="p-4 rounded-xl bg-amber-50/60 border-l-4 border-amber-500 text-slate-800 text-xs italic leading-relaxed"
                      >
                        {quote}
                      </blockquote>
                    ))}
                  </div>
                </div>
              )}

              {/* Impact */}
              {caseItem.impact && (
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    Constitutional Impact & Precedential Authority
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {caseItem.impact}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Ratio Decidendi */}
          {activeTab === 'ratio' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Scale className="w-4 h-4 text-amber-600" />
                  Binding Ratio Decidendi
                </div>
                <p className="text-slate-900 text-sm leading-relaxed font-serif">
                  {caseItem.ratioDecidendi || caseItem.summary}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Legal Classification & Key Phrases
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {caseItem.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Arguments */}
          {activeTab === 'arguments' && (
            <div className="space-y-6">
              {/* Petitioner */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2">
                  Key Contentions of the Petitioners
                </h4>
                <div className="space-y-2">
                  {caseItem.petitionerArguments?.map((arg, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/60 text-xs text-slate-800 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-900 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                        {i + 1}
                      </span>
                      <span>{arg}</span>
                    </div>
                  )) || (
                    <p className="text-xs text-slate-500">
                      Detailed petitioner arguments documented in the official law report.
                    </p>
                  )}
                </div>
              </div>

              {/* Respondent */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                  Key Contentions of the Respondents / State
                </h4>
                <div className="space-y-2">
                  {caseItem.respondentArguments?.map((arg, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                        {i + 1}
                      </span>
                      <span>{arg}</span>
                    </div>
                  )) || (
                    <p className="text-xs text-slate-500">
                      Detailed respondent arguments documented in the official law report.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Coram */}
          {activeTab === 'coram' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-600" />
                  Coram & Judicial Bench Composition
                </h4>
                <span className="text-xs font-semibold text-slate-600">
                  {caseItem.coram?.length || 1} Justices
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {caseItem.coram?.map((judge, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-medium text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                      §
                    </div>
                    <span className="truncate">{judge}</span>
                  </div>
                )) || (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    {caseItem.leadJudge || 'Coram documented in official report.'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Scale className="w-4 h-4 text-amber-600" />
            <span>LAWVOX Constitutional Repository</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePlayAudio}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Headphones className="w-3.5 h-3.5 text-amber-400" />
              <span>{isCurrentPlaying ? 'Pause Audio' : 'Listen Narration'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
