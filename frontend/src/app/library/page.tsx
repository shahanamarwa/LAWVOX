'use client';

import React, { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CaseCard } from '@/components/cases/CaseCard';
import { Badge } from '@/components/ui/Badge';
import { mockCases } from '@/data/cases';
import { useAudio } from '@/context/AudioContext';
import {
  Library as LibraryIcon,
  Search,
  BookOpen,
  Sparkles,
  Download,
  Bookmark,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function LibraryPage() {
  const { bookmarkedCaseIds } = useAudio();
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'recent' | 'classics' | 'recommended' | 'downloaded'>('all');
  const [filterQuery, setFilterQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All Precedents', count: mockCases.length },
    { id: 'saved', label: 'Saved & Bookmarks', count: bookmarkedCaseIds.length },
    { id: 'recent', label: 'Recently Added', count: 3 },
    { id: 'classics', label: 'Constitutional Classics', count: 4 },
    { id: 'recommended', label: 'Recommended Cases', count: 3 },
    { id: 'downloaded', label: 'Downloaded (Offline)', count: 4 },
  ];

  const displayedCases = useMemo(() => {
    let list = mockCases;

    switch (activeTab) {
      case 'saved':
        list = mockCases.filter((c) => bookmarkedCaseIds.includes(c.id));
        break;
      case 'recent':
        list = mockCases.filter((c) => ['case-shreya', 'case-sabarimala', 'case-olga'].includes(c.id));
        break;
      case 'classics':
        list = mockCases.filter((c) => ['case-kesavananda', 'case-maneka', 'case-golaknath', 'case-minerva'].includes(c.id));
        break;
      case 'recommended':
        list = mockCases.filter((c) => ['case-maneka', 'case-puttaswamy', 'case-golaknath'].includes(c.id));
        break;
      case 'downloaded':
        list = mockCases.filter((c) => c.isDownloaded);
        break;
      default:
        list = mockCases;
    }

    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortTitle.toLowerCase().includes(q) ||
          c.citation.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeTab, bookmarkedCaseIds, filterQuery]);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header & Search Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shadow-sm">
                <LibraryIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                  Legal Audio Library
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Organized collection of Supreme Court precedents and oral arguments
                </p>
              </div>
            </div>

            {/* Quick in-library filter input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter library cases..."
                className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Collection Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 border-t border-slate-100 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Library Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Showing {displayedCases.length} judgments in collection
            </span>
          </div>

          {displayedCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedCases.map((c) => (
                <CaseCard key={c.id} legalCase={c} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
                <Bookmark className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-serif">
                No cases in this collection
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bookmark cases or explore the full constitutional precedent library to add items here.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
