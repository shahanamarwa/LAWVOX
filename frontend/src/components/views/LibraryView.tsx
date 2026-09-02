'use client';

import React, { useState } from 'react';
import { LIBRARY_DOCUMENTS, EXTENDED_CASES } from '../../data/legalCorpusData';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { PrecedentCase } from '../../types/dashboard';
import {
  BookOpen,
  Clock,
  Play,
  Pause,
  Search,
  Eye,
} from 'lucide-react';

interface LibraryViewProps {
  onSelectCase: (caseItem: PrecedentCase) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onSelectCase }) => {
  const { currentCase, isPlaying, playCase, togglePlay } = useAudioPlayer();
  const [activeTab, setActiveTab] = useState<'corpus' | 'statutes' | 'arguments'>('corpus');
  const [searchQuery, setSearchQuery] = useState('');

  const libraryTabs = [
    { id: 'corpus', label: 'Constitutional Precedents (12 Landmark Rulings)' },
    { id: 'statutes', label: 'Statutory Texts & CAD Debates' },
    { id: 'arguments', label: 'Oral Arguments Archive' },
  ];

  const filteredCases = EXTENDED_CASES.filter((c) =>
    !searchQuery ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.doctrine && c.doctrine.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDocs = LIBRARY_DOCUMENTS.filter((d) =>
    !searchQuery ||
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayDoc = (doc: typeof LIBRARY_DOCUMENTS[0]) => {
    // Construct case-like object for audio player
    const docAsCase: PrecedentCase = {
      id: doc.id,
      name: doc.title,
      citation: doc.category,
      year: doc.year,
      court: doc.jurisdiction,
      duration: doc.duration,
      summary: doc.description,
      audioNarrationText: doc.audioNarrationText,
      tags: doc.tags,
    };
    playCase(docAsCase);
  };

  return (
    <div className="flex-1 bg-slate-50/70 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pb-28 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Constitutional Corpus & Legal Audio Repository</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white">
              LAWVOX Legal Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore primary legal sources, judgment transcripts, Constituent Assembly Debates, statutory bare acts, and restored oral argument audio files.
            </p>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-4">
          {/* Search */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library documents, bare acts, CAD volumes, oral arguments..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 rounded-xl border border-slate-200 focus:border-slate-400 outline-none transition-all"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            {libraryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-amber-300 font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Tab 1: Precedents */}
        {activeTab === 'corpus' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCases.map((caseItem) => {
              const isCurrentPlaying = currentCase?.id === caseItem.id && isPlaying;

              return (
                <div
                  key={caseItem.id}
                  onClick={() => onSelectCase(caseItem)}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                        {caseItem.year} • {caseItem.citation}
                      </span>
                      <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                        {caseItem.doctrine}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-serif group-hover:text-blue-950 transition-colors">
                      {caseItem.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {caseItem.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {caseItem.duration}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCase(caseItem);
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Brief</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentCase?.id === caseItem.id) {
                            togglePlay();
                          } else {
                            playCase(caseItem);
                          }
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isCurrentPlaying
                            ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
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
        )}

        {/* Content Tab 2 & 3: Library Documents */}
        {(activeTab === 'statutes' || activeTab === 'arguments') && (
          <div className="space-y-4">
            {filteredDocs.map((doc) => {
              const isDocPlaying = currentCase?.id === doc.id && isPlaying;

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1 max-w-3xl">
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="font-bold text-slate-900 bg-blue-50 text-blue-900 px-2.5 py-0.5 rounded-md border border-blue-200/60">
                        {doc.category}
                      </span>
                      <span className="text-slate-500 font-mono">{doc.year}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{doc.jurisdiction}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {doc.description}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 self-start md:self-center">
                    <div className="text-right text-xs text-slate-500 hidden sm:block">
                      <p className="font-semibold text-slate-800">{doc.fileSize}</p>
                      <p>{doc.readTime}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePlayDoc(doc)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                        isDocPlaying
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {isDocPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Pause Audio</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>Listen ({doc.duration})</span>
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
