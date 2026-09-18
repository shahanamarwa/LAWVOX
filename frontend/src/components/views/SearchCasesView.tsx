'use client';

import React, { useEffect, useState } from 'react';
import { PrecedentCase } from '../../types/dashboard';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { LawvoxAPI } from '../../services/api';
import {
  Search,
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

interface BackendCase {
  id: number;
  case_name: string;
  case_number?: string;
  court?: string;
  year?: number;
  category?: string;
  summary?: string;
  judgment?: string;
  created_at?: string;
}

export const SearchCasesView: React.FC<SearchCasesViewProps> = ({
  onSelectCase,
}) => {
  const { currentCase, isPlaying, playCase, togglePlay } = useAudioPlayer();

  const [query, setQuery] = useState('');
  const [cases, setCases] = useState<BackendCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load all cases when the page opens
  useEffect(() => {
    const loadCases = async () => {
      setIsLoading(true);
      setError(null);

      const result = await LawvoxAPI.getCases();

      if (result) {
        setCases(result);
      } else {
        setError('Unable to load cases from the LAWVOX backend.');
      }

      setIsLoading(false);
    };

    loadCases();
  }, []);

  // Search backend whenever the search query changes
  useEffect(() => {
    const searchCases = async () => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        const result = await LawvoxAPI.getCases();

        if (result) {
          setCases(result);
          setError(null);
        }

        return;
      }

      setIsLoading(true);
      setError(null);

      const result = await LawvoxAPI.searchCases(trimmedQuery);

      if (result) {
        setCases(result);
      } else {
        setCases([]);
        setError('Search request failed.');
      }

      setIsLoading(false);
    };

    const timer = setTimeout(searchCases, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const convertCase = (item: BackendCase): PrecedentCase => {
    return {
      id: String(item.id),
      name: item.case_name,
      year: item.year ?? 0,
      citation: item.case_number ?? '',
      doctrine: item.category ?? 'Constitutional Law',
      summary: item.summary ?? '',
      articleReference: '',
      benchSize: '',
      tags: [],
      duration: 'Listen',
      court: item.court ?? '',
      judgment: item.judgment ?? '',
    } as PrecedentCase;
  };

  const handlePlayClick = (
    e: React.MouseEvent,
    caseItem: PrecedentCase
  ) => {
    e.stopPropagation();

    if (currentCase?.id === caseItem.id) {
      togglePlay();
    } else {
      playCase(caseItem);
    }
  };

  const handleCopyCitation = (
    e: React.MouseEvent,
    caseItem: PrecedentCase
  ) => {
    e.stopPropagation();

    if (caseItem.citation && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(
        `${caseItem.name}, ${caseItem.citation}`
      );

      setCopiedId(caseItem.id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  return (
    <div className="flex-1 bg-slate-50/70 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pb-28 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
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
                Search constitutional cases stored in the LAWVOX database.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>LAWVOX Database</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-6">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by case name, category, summary, or judgment..."
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
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="font-semibold text-slate-800">
            {isLoading
              ? 'Loading cases...'
              : `Showing ${cases.length} Precedents`}
          </span>

          <span>
            Click any case to read full brief & listen
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
            Loading cases from LAWVOX backend...
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && cases.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <Search className="w-8 h-8 mx-auto text-slate-300 mb-3" />

            <p className="font-semibold text-slate-700">
              No cases found
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Try a different search term.
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && (
          <div className="space-y-3.5">
            {cases.map((backendCase) => {
              const caseItem = convertCase(backendCase);

              const isCurrentPlaying =
                currentCase?.id === caseItem.id && isPlaying;

              return (
                <div
                  key={backendCase.id}
                  onClick={() => onSelectCase(caseItem)}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-200 cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Case information */}
                  <div className="space-y-2 flex-1 max-w-3xl">

                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                        {backendCase.year}
                      </span>

                      <span className="font-mono text-slate-500 text-[11px]">
                        {backendCase.case_number}
                      </span>

                      {backendCase.category && (
                        <>
                          <span className="text-slate-300">•</span>

                          <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 text-[11px]">
                            {backendCase.category}
                          </span>
                        </>
                      )}

                      {backendCase.court && (
                        <span className="text-slate-500 text-[11px]">
                          {backendCase.court}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-blue-950 transition-colors flex items-center gap-2">
                      <span>{backendCase.case_name}</span>

                      <Eye className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {backendCase.summary}
                    </p>

                    {backendCase.judgment && (
                      <p className="text-[11px] text-blue-700 font-medium line-clamp-2">
                        Judgment: {backendCase.judgment}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2.5 flex-shrink-0 self-start md:self-center">

                    <button
                      type="button"
                      onClick={(e) =>
                        handleCopyCitation(e, caseItem)
                      }
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
                      onClick={(e) =>
                        handlePlayClick(e, caseItem)
                      }
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
                          <span>Listen</span>
                        </>
                      )}
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
