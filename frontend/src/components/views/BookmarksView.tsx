'use client';

import React, { useState } from 'react';
import { EXTENDED_CASES } from '../../data/legalCorpusData';
import { PrecedentCase } from '../../types/dashboard';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import {
  Bookmark,
  Play,
  Pause,
  Clock,
  Trash2,
  Share2,
  Check,
  Eye,
  FolderOpen,
} from 'lucide-react';

interface BookmarksViewProps {
  onSelectCase: (caseItem: PrecedentCase) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ onSelectCase }) => {
  const { currentCase, isPlaying, playCase, togglePlay } = useAudioPlayer();
  const [bookmarkedList, setBookmarkedList] = useState<PrecedentCase[]>(
    EXTENDED_CASES.filter((c) => c.isBookmarked)
  );
  const [selectedTag, setSelectedTag] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const tags = ['All', 'Basic Structure', 'Golden Triangle', 'Workplace Safety', '42nd Amendment', 'Article 14'];

  const filteredBookmarks = bookmarkedList.filter((c) => {
    if (selectedTag === 'All') return true;
    return c.tags?.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
  });

  const removeBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedList((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCopyCitation = (e: React.MouseEvent, caseItem: PrecedentCase) => {
    e.stopPropagation();
    if (caseItem.citation && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`${caseItem.name}, ${caseItem.citation}`);
      setCopiedId(caseItem.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handlePlayClick = (e: React.MouseEvent, caseItem: PrecedentCase) => {
    e.stopPropagation();
    if (currentCase?.id === caseItem.id) {
      togglePlay();
    } else {
      playCase(caseItem);
    }
  };

  return (
    <div className="flex-1 bg-slate-50/70 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pb-28 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70">
                <Bookmark className="w-5 h-5 fill-amber-500 text-amber-500" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                Your Saved Precedents & Bookmarks
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Access your bookmarked landmark decisions, saved audio timestamps, and key citations for quick courtroom & moot court reference.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 self-start md:self-auto">
            <FolderOpen className="w-4 h-4 text-amber-600" />
            <span>{bookmarkedList.length} Saved Cases</span>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-slate-900 text-amber-300 font-bold shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Bookmarks Grid */}
        {filteredBookmarks.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No bookmarks in this folder</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Bookmark cases from Dashboard or Search Cases to build your personalized legal research library.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookmarks.map((caseItem) => {
              const isCurrentPlaying = currentCase?.id === caseItem.id && isPlaying;

              return (
                <div
                  key={caseItem.id}
                  onClick={() => onSelectCase(caseItem)}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Top Row */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 bg-amber-50 text-amber-900 px-2 py-0.5 rounded text-[11px] border border-amber-200/60">
                        {caseItem.year} • {caseItem.citation}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => removeBookmark(e, caseItem.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Case Name */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-serif leading-snug group-hover:text-blue-950 transition-colors">
                        {caseItem.name}
                      </h3>
                      <p className="text-xs text-amber-800 font-medium bg-amber-50/70 px-2 py-0.5 rounded border border-amber-200/50 mt-1.5 inline-block">
                        {caseItem.doctrine}
                      </p>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {caseItem.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {caseItem.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {caseItem.duration}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleCopyCitation(e, caseItem)}
                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
                        title="Copy citation"
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
                        className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
                        title="View brief"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handlePlayClick(e, caseItem)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
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
      </div>
    </div>
  );
};
