'use client';

import React, { useState, useMemo } from 'react';
import { EXTENDED_CASES } from '../../data/legalCorpusData';
import { PrecedentCase } from '../../types/dashboard';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import {
  Search,
  SlidersHorizontal,
  Scale,
  Play,
  Pause,
  Eye,
  X,
  Check,
  Share2,
} from 'lucide-react';

interface SearchCasesViewProps {
  onSelectCase: (caseItem: PrecedentCase) => void;
}

export const SearchCasesView: React.FC<SearchCasesViewProps> = ({
  onSelectCase,
}) => {
  const { currentCase, isPlaying, playCase, togglePlay } = useAudioPlayer();
  const [query, setQuery] = useState('');
  const [selectedDoctrine, setSelectedDoctrine] = useState('All');
  const [selectedBench, setSelectedBench] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const doctrines = [
    'All',
    'Basic Structure',
    'Golden Triangle',
    'Right to Privacy',
    'Free Speech',
    'Right to Livelihood',
    'Affirmative Action',
    'Manifest Arbitrariness',
  ];

  const benches = ['All', '13-Judge', '9-Judge', '7-Judge', '5-Judge', '3-Judge', '2-Judge'];

  const filteredCases = useMemo(() => {
    return EXTENDED_CASES.filter((c) => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.citation && c.citation.toLowerCase().includes(q)) ||
        (c.doctrine && c.doctrine.toLowerCase().includes(q)) ||
        (c.articleReference && c.articleReference.toLowerCase().includes(q)) ||
        (c.summary && c.summary.toLowerCase().includes(q)) ||
        (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)));

      const matchesDoctrine =
        selectedDoctrine === 'All' ||
        (c.doctrine && c.doctrine.toLowerCase().includes(selectedDoctrine.toLowerCase())) ||
        (c.tags && c.tags.some((t) => t.toLowerCase().includes(selectedDoctrine.toLowerCase())));

      const matchesBench =
        selectedBench === 'All' ||
        (c.benchSize && c.benchSize.toLowerCase().includes(selectedBench.toLowerCase()));

      return matchesQuery && matchesDoctrine && matchesBench;
    });
  }, [query, selectedDoctrine, selectedBench]);

  const handlePlayClick = (e: React.MouseEvent, caseItem: PrecedentCase) => {
    e.stopPropagation();
    if (currentCase?.id === caseItem.id) {
      togglePlay();
    } else {
      playCase(caseItem);
    }
  };

  const handleCopyCitation = (e: React.MouseEvent, caseItem: PrecedentCase) => {
    e.stopPropagation();
    if (caseItem.citation && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`${caseItem.name}, ${caseItem.citation}`);
      setCopiedId(caseItem.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="flex-1 bg-slate-50/70 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pb-28 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-slate-900 text-amber-400">
                  <Search className="w-5 h-5" />
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                  Search Constitutional Precedents
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Search over 18,450+ Supreme Court & High Court constitutional rulings by citation, doctrine, judge, or constitutional article.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>Corpus: 1950 – 2026</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-6 space-y-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type case name, citation, or doctrine (e.g. Kesavananda, Puttaswamy, Art 21, Section 66A)..."
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3.5 p-1.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 mr-1 flex-shrink-0">
                  <SlidersHorizontal className="w-3 h-3" />
                  Doctrine:
                </span>
                {doctrines.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDoctrine(d)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedDoctrine === d
                        ? 'bg-slate-900 text-amber-300 font-bold shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-1 flex-shrink-0">
                  Bench:
                </span>
                {benches.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBench(b)}
                    className={`px-2.5 py-0.5 rounded-md font-medium text-[11px] transition-all whitespace-nowrap ${
                      selectedBench === b
                        ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="font-semibold text-slate-800">
            Showing {filteredCases.length} Landmark Precedents
          </span>
          <span>Click any case to read full brief & listen</span>
        </div>

        {/* Search Results List */}
        <div className="space-y-3.5">
          {filteredCases.map((caseItem) => {
            const isCurrentPlaying = currentCase?.id === caseItem.id && isPlaying;

            return (
              <div
                key={caseItem.id}
                onClick={() => onSelectCase(caseItem)}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-200 cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left Meta & Summary */}
                <div className="space-y-2 flex-1 max-w-3xl">
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                      {caseItem.year}
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">
                      {caseItem.citation}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 text-[11px]">
                      {caseItem.doctrine}
                    </span>
                    {caseItem.benchSize && (
                      <span className="text-slate-500 text-[11px]">
                        {caseItem.benchSize}
                      </span>
                    )}
                  </div>

                  {/* Case Name */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-blue-950 transition-colors flex items-center gap-2">
                    <span>{caseItem.name}</span>
                    <Eye className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {caseItem.summary}
                  </p>

                  {/* Provisions */}
                  {caseItem.articleReference && (
                    <p className="text-[11px] text-blue-700 font-medium">
                      Provisions: {caseItem.articleReference}
                    </p>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2.5 flex-shrink-0 self-start md:self-center">
                  <button
                    type="button"
                    onClick={(e) => handleCopyCitation(e, caseItem)}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                    title="Copy Citation"
                  >
                    {copiedId === caseItem.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCase(caseItem);
                    }}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Brief</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handlePlayClick(e, caseItem)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      isCurrentPlaying
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 shadow-xs'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                    }`}
                  >
                    {isCurrentPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{caseItem.duration || 'Listen'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
