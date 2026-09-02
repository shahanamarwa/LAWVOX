'use client';

import React, { useState } from 'react';
import { History, Search, X } from 'lucide-react';
import { RECENT_SEARCHES } from '../../data/dashboardData';

interface RecentSearchesSectionProps {
  onSelectSearch?: (term: string) => void;
}

export const RecentSearchesSection: React.FC<RecentSearchesSectionProps> = ({
  onSelectSearch,
}) => {
  const [searches, setSearches] = useState<string[]>(RECENT_SEARCHES);

  const removeSearch = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearches((prev) => prev.filter((item) => item !== term));
  };

  const handleSelect = (term: string) => {
    if (onSelectSearch) {
      onSelectSearch(term);
    }
  };

  if (searches.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
            <History className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-900 font-serif">
            Recent Searches:
          </span>
        </div>

        {/* Search Pills */}
        <div className="flex items-center gap-2 flex-wrap flex-1 sm:justify-end">
          {searches.map((term) => (
            <div
              key={term}
              onClick={() => handleSelect(term)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-amber-50/80 text-slate-700 hover:text-amber-950 border border-slate-200 hover:border-amber-300 text-xs font-medium transition-all cursor-pointer group"
            >
              <Search className="w-3 h-3 text-slate-400 group-hover:text-amber-600" />
              <span>{term}</span>
              <button
                type="button"
                onClick={(e) => removeSearch(term, e)}
                className="text-slate-400 hover:text-rose-500 p-0.5 rounded-full hover:bg-slate-200/60 transition-colors ml-0.5"
                title="Remove from history"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setSearches([])}
            className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 transition-colors pl-1"
          >
            Clear All
          </button>
        </div>
      </div>
    </section>
  );
};
