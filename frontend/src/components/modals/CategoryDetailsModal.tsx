'use client';

import React from 'react';
import { CategoryItem, PrecedentCase } from '../../types/dashboard';
import { ALL_CASES } from '../../data/dashboardData';
import {
  X,
  Scale,
  Headphones,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CategoryDetailsModalProps {
  category: CategoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectCase: (caseItem: PrecedentCase) => void;
}

export const CategoryDetailsModal: React.FC<CategoryDetailsModalProps> = ({
  category,
  isOpen,
  onClose,
  onSelectCase,
}) => {
  if (!isOpen || !category) return null;

  const Icon = category.icon;

  const handleCaseClick = (caseTitle: string) => {
    // Find matching case from ALL_CASES or construct placeholder
    const found = ALL_CASES.find((c) =>
      c.name.toLowerCase().includes(caseTitle.toLowerCase().split('(')[0].trim())
    );
    if (found) {
      onSelectCase(found);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              {category.articleRange}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
            {category.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
            {category.description}
          </p>

          <div className="flex items-center gap-4 mt-4 text-xs text-slate-300">
            <span className="flex items-center gap-1 font-semibold text-white">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              {category.caseCount.toLocaleString()} Precedents
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-amber-300">
              <Headphones className="w-3.5 h-3.5 text-amber-400" />
              {category.audioCount} Audio Briefs
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-700 text-sm leading-relaxed scrollbar-thin">
          {/* Key Principles */}
          {category.keyPrinciples && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Fundamental Doctrines & Framework
              </h4>
              <div className="space-y-2">
                {category.keyPrinciples.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-800 flex items-start gap-2.5"
                  >
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leading Benchmark Cases */}
          {category.leadingCases && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Leading Benchmark Precedents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.leadingCases.map((caseTitle, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCaseClick(caseTitle)}
                    className="p-3.5 rounded-xl bg-white hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 shadow-2xs transition-all cursor-pointer group flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-950 font-serif truncate">
                        {caseTitle}
                      </p>
                      <span className="text-[10px] text-amber-700 font-semibold">
                        Click to view brief & listen
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Constitutional Precedent Index
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
