'use client';

import React, { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CaseCard } from '@/components/cases/CaseCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAudio } from '@/context/AudioContext';
import { useToast } from '@/context/ToastContext';
import { mockCases } from '@/data/cases';
import { mockBookmarks } from '@/data/dashboard';
import {
  Bookmark,
  Search,
  Trash2,
  Play,
  Pause,
  Clock,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export default function BookmarksPage() {
  const { currentCase, isPlaying, playCase, bookmarkedCaseIds, toggleBookmark, openCaseModal } = useAudio();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'cases' | 'chapters'>('all');
  const [filterQuery, setFilterQuery] = useState('');

  // Get all bookmarked case items from mockCases
  const bookmarkedCases = useMemo(() => {
    return mockCases.filter((c) => bookmarkedCaseIds.includes(c.id));
  }, [bookmarkedCaseIds]);

  const handleRemoveBookmark = (caseId: string, title: string) => {
    toggleBookmark(caseId);
    showToast(`Removed "${title}" from bookmarks`, 'info');
  };

  const handlePlay = (caseItem: any) => {
    playCase(caseItem);
    showToast(`Playing audio for ${caseItem.shortTitle || caseItem.caseTitle}`, 'info');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shadow-sm">
                <Bookmark className="w-6 h-6 fill-amber-600" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                  Saved Bookmarks & Precedents
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {bookmarkedCases.length} bookmarked landmark judgments & audio chapters
                </p>
              </div>
            </div>

            {/* Filter Search */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search saved bookmarks..."
                className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Bookmarks ({bookmarkedCases.length})
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cases'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Full Judgments ({bookmarkedCases.length})
            </button>
            <button
              onClick={() => setActiveTab('chapters')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'chapters'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Bookmarked Chapters ({mockBookmarks.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab !== 'chapters' ? (
          bookmarkedCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {bookmarkedCases.map((c) => (
                <CaseCard key={c.id} legalCase={c} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
                <Bookmark className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-serif">
                No bookmarked cases yet
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Click the bookmark icon on any constitutional case to save it for quick reference and audio revision.
              </p>
            </div>
          )
        ) : (
          /* Chapters view */
          <div className="space-y-3">
            {mockBookmarks.map((bm) => (
              <div
                key={bm.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-purple-300 shadow-soft-sm hover:shadow-soft transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    <Bookmark className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-serif">
                      {bm.caseTitle}
                    </h4>
                    <p className="text-xs text-purple-700 font-semibold mt-0.5">
                      {bm.section}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {bm.court} • Saved on {bm.dateAdded}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const matched = mockCases.find((c) => c.id === bm.caseId) || mockCases[0];
                      playCase(matched);
                    }}
                    leftIcon={<Play className="w-3.5 h-3.5 ml-0.5" />}
                  >
                    Listen Section
                  </Button>

                  <button
                    onClick={() => handleRemoveBookmark(bm.caseId, bm.caseTitle)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
