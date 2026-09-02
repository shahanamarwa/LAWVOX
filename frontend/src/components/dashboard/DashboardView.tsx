'use client';

import React, { useState } from 'react';
import { WelcomeSection } from './WelcomeSection';
import { RecentSearchesSection } from './RecentSearchesSection';
import { ContinueListeningCard } from './ContinueListeningCard';
import { ListeningSummarySection } from './ListeningSummarySection';
import { RecentlyAddedCases } from './RecentlyAddedCases';
import { YourBookmarksSection } from './YourBookmarksSection';
import { ConstitutionalCategories } from './ConstitutionalCategories';
import { RecommendedCases } from './RecommendedCases';
import { CaseDetailsModal } from '../modals/CaseDetailsModal';
import { CategoryDetailsModal } from '../modals/CategoryDetailsModal';
import { PrecedentCase, CategoryItem } from '../../types/dashboard';
import { ALL_CASES, CONSTITUTIONAL_CATEGORIES } from '../../data/dashboardData';

export const DashboardView: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<PrecedentCase | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleOpenCase = (caseItem: PrecedentCase) => {
    setSelectedCase(caseItem);
    setIsCaseModalOpen(true);
  };

  const handleOpenCategory = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleSearch = (query: string) => {
    const clean = query.toLowerCase().trim();
    // Check if query matches a known case
    const matchedCase = ALL_CASES.find((c) =>
      c.name.toLowerCase().includes(clean) ||
      (c.doctrine && c.doctrine.toLowerCase().includes(clean)) ||
      (c.tags && c.tags.some((t) => t.toLowerCase().includes(clean)))
    );

    if (matchedCase) {
      handleOpenCase(matchedCase);
      return;
    }

    // Check if query matches a known category
    const matchedCategory = CONSTITUTIONAL_CATEGORIES.find((cat) =>
      cat.title.toLowerCase().includes(clean) ||
      cat.articleRange.toLowerCase().includes(clean)
    );

    if (matchedCategory) {
      handleOpenCategory(matchedCategory);
      return;
    }

    // Default fallback to first precedent
    if (ALL_CASES.length > 0) {
      handleOpenCase(ALL_CASES[0]);
    }
  };

  return (
    <div className="flex-1 bg-slate-50/70 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] pb-28">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* 1. Welcome Section with Prominent Search */}
        <WelcomeSection onSearch={handleSearch} />

        {/* 8. Recent Searches Pill Bar */}
        <RecentSearchesSection onSelectSearch={handleSearch} />

        {/* 2. Continue Listening (Featured Landmark Precedent) */}
        <ContinueListeningCard onOpenCaseDetails={handleOpenCase} />

        {/* 5. Listening Summary (4 Metric Cards) */}
        <ListeningSummarySection />

        {/* 3. Recently Added Cases (3 Cases) */}
        <RecentlyAddedCases onSelectCase={handleOpenCase} />

        {/* 4. Your Bookmarks (3 Cases) */}
        <YourBookmarksSection onSelectCase={handleOpenCase} />

        {/* 6. Constitutional Law Categories (6 Categories) */}
        <ConstitutionalCategories onSelectCategory={handleOpenCategory} />

        {/* 7. Recommended for You (3 Curated Cases) */}
        <RecommendedCases onSelectCase={handleOpenCase} />
      </div>

      {/* Case Details Information Modal */}
      <CaseDetailsModal
        caseItem={selectedCase}
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
      />

      {/* Category Details Information Modal */}
      <CategoryDetailsModal
        category={selectedCategory}
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSelectCase={handleOpenCase}
      />
    </div>
  );
};
