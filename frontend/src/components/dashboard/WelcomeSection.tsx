'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Command, X, SlidersHorizontal } from 'lucide-react';

interface WelcomeSectionProps {
  onSearch?: (query: string) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Precedents');

  const filters = ['All Precedents', 'Constitutional Benches', 'Landmark Rulings', 'Audio Summaries'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden border border-slate-800">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-6">
        {/* Platform Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Constitutional Corpus 1950 – 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Header Text */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-white flex items-center gap-2">
            Good morning, Advocate 👋
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-normal leading-relaxed max-w-2xl">
            Research constitutional precedents and listen to important judgments.
          </p>
        </div>

        {/* Prominent Search Bar */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 flex items-center pointer-events-none">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cases, judgments, judges, articles..."
              className="w-full pl-12 pr-28 sm:pr-32 py-4 bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-base rounded-2xl shadow-xl border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all"
            />
            <div className="absolute right-3 flex items-center gap-2">
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                <span>Search</span>
                <Command className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 flex items-center gap-1 mr-1 flex-shrink-0">
              <SlidersHorizontal className="w-3 h-3" />
              Filter:
            </span>
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedFilter === filter
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};
