'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { CaseCard } from '@/components/cases/CaseCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockCases } from '@/data/cases';
import { mockCategories } from '@/data/categories';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  SlidersHorizontal,
  Scale,
  Sparkles,
  BookOpen,
  Calendar,
  Users,
} from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedCourt, setSelectedCourt] = useState('all');
  const [selectedYearRange, setSelectedYearRange] = useState('all');
  const [selectedJudge, setSelectedJudge] = useState('all');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setSearchQuery(urlQuery);
    setSelectedCategory(urlCategory || 'all');
  }, [urlQuery, urlCategory]);

  const courts = ['all', 'Supreme Court of India', 'High Court of Delhi', 'Bombay High Court'];
  const yearRanges = [
    { label: 'All Years', value: 'all' },
    { label: 'Pre-1980 Classics', value: 'pre-1980' },
    { label: '1980 – 2000 Benchmarks', value: '1980-2000' },
    { label: '2000 – Present Modern Era', value: '2000-present' },
  ];

  const prominentJudges = [
    'all',
    'Justice Y.V. Chandrachud',
    'Justice P.N. Bhagwati',
    'Justice Rohinton F. Nariman',
    'Justice D.Y. Chandrachud',
    'Justice H.R. Khanna',
    'Chief Justice S.M. Sikri',
  ];

  // Filter cases based on state
  const filteredCases = useMemo(() => {
    return mockCases.filter((item) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q) || item.shortTitle.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesProvisions = item.constitutionalProvisions.some((p) => p.toLowerCase().includes(q));
        const matchesPrinciples = item.keyPrinciples.some((p) => p.toLowerCase().includes(q));
        const matchesJudges = item.judges.some((j) => j.toLowerCase().includes(q));
        const matchesCitation = item.citation.toLowerCase().includes(q);

        if (!matchesTitle && !matchesSummary && !matchesProvisions && !matchesPrinciples && !matchesJudges && !matchesCitation) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (item.categorySlug !== selectedCategory) return false;
      }

      // Court filter
      if (selectedCourt !== 'all') {
        if (item.court !== selectedCourt) return false;
      }

      // Year range filter
      if (selectedYearRange === 'pre-1980' && item.year >= 1980) return false;
      if (selectedYearRange === '1980-2000' && (item.year < 1980 || item.year > 2000)) return false;
      if (selectedYearRange === '2000-present' && item.year < 2000) return false;

      // Judge filter
      if (selectedJudge !== 'all') {
        if (!item.judges.includes(selectedJudge)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedCourt, selectedYearRange, selectedJudge]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCourt('all');
    setSelectedYearRange('all');
    setSelectedJudge('all');
    router.push('/search');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedCourt !== 'all' ||
    selectedYearRange !== 'all' ||
    selectedJudge !== 'all';

  return (
    <div className="space-y-6">
      {/* Search Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by case title, citation, judge, keyword (e.g. Article 21, Kesavananda)..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-base pl-11 pr-10 py-3 rounded-2xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="rounded-2xl px-6 py-3 font-bold shadow-md"
            >
              Search
            </Button>

            <button
              type="button"
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-sm font-semibold transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-600" />
              <span>Filters</span>
            </button>
          </div>
        </form>

        {/* Filter Controls (Desktop & Toggleable on Mobile) */}
        <div className={`pt-4 border-t border-slate-100 space-y-4 ${showFiltersMobile ? 'block' : 'hidden md:block'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* 1. Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Constitutional Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Constitutional Topics</option>
                {mockCategories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Court Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Court / Forum
              </label>
              <select
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Courts & Benches</option>
                <option value="Supreme Court of India">Supreme Court of India</option>
              </select>
            </div>

            {/* 3. Year Range */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Year Period
              </label>
              <select
                value={selectedYearRange}
                onChange={(e) => setSelectedYearRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:border-purple-500 focus:outline-none"
              >
                {yearRanges.map((yr) => (
                  <option key={yr.value} value={yr.value}>
                    {yr.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Constitutional Judge */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Judge / Author
              </label>
              <select
                value={selectedJudge}
                onChange={(e) => setSelectedJudge(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Constitutional Judges</option>
                {prominentJudges.filter((j) => j !== 'all').map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-400 font-semibold">Active filters:</span>
                {searchQuery && (
                  <Badge variant="purple" size="sm">
                    Keyword: "{searchQuery}"
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="navy" size="sm">
                    Topic: {mockCategories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                  </Badge>
                )}
                {selectedYearRange !== 'all' && (
                  <Badge variant="gold" size="sm">
                    {yearRanges.find((r) => r.value === selectedYearRange)?.label}
                  </Badge>
                )}
                {selectedJudge !== 'all' && (
                  <Badge variant="slate" size="sm">
                    Judge: {selectedJudge}
                  </Badge>
                )}
              </div>

              <button
                onClick={handleResetFilters}
                className="text-xs text-purple-600 hover:text-purple-800 font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-purple-50 transition-colors flex-shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-800 font-serif">
            Found {filteredCases.length} Precedents & Legal Audio Tracks
          </p>
          <span className="text-xs text-slate-400 font-medium">
            Full Bench Judgments Verified
          </span>
        </div>

        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCases.map((caseItem) => (
              <CaseCard key={caseItem.id} legalCase={caseItem} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 font-serif">
                No matching legal precedents found
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Try searching for broader keywords like "Article 21", "Privacy", "Basic Structure", or clearing some filters.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={handleResetFilters}>
              Clear Search & Show All Cases
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Search...</div>}>
        <SearchContent />
      </Suspense>
    </AppLayout>
  );
}
