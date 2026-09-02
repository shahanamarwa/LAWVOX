'use client';

import React from 'react';
import { CONSTITUTIONAL_CATEGORIES } from '../../data/dashboardData';
import { CategoryItem } from '../../types/dashboard';
import { BookMarked, Headphones, Scale, ArrowRight } from 'lucide-react';

interface ConstitutionalCategoriesProps {
  onSelectCategory?: (category: CategoryItem) => void;
}

export const ConstitutionalCategories: React.FC<ConstitutionalCategoriesProps> = ({
  onSelectCategory,
}) => {
  const getSchemeStyles = (scheme: string) => {
    switch (scheme) {
      case 'amber':
        return {
          icon: 'bg-amber-50 text-amber-700 border-amber-200/70',
          badge: 'bg-amber-50 text-amber-900 border-amber-200/50',
          borderHover: 'hover:border-amber-300',
        };
      case 'purple':
        return {
          icon: 'bg-purple-50 text-purple-700 border-purple-200/70',
          badge: 'bg-purple-50 text-purple-900 border-purple-200/50',
          borderHover: 'hover:border-purple-300',
        };
      case 'blue':
        return {
          icon: 'bg-blue-50 text-blue-700 border-blue-200/70',
          badge: 'bg-blue-50 text-blue-900 border-blue-200/50',
          borderHover: 'hover:border-blue-300',
        };
      case 'indigo':
        return {
          icon: 'bg-indigo-50 text-indigo-700 border-indigo-200/70',
          badge: 'bg-indigo-50 text-indigo-900 border-indigo-200/50',
          borderHover: 'hover:border-indigo-300',
        };
      case 'emerald':
        return {
          icon: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
          badge: 'bg-emerald-50 text-emerald-900 border-emerald-200/50',
          borderHover: 'hover:border-emerald-300',
        };
      case 'navy':
      default:
        return {
          icon: 'bg-slate-100 text-slate-800 border-slate-200',
          badge: 'bg-slate-100 text-slate-900 border-slate-200/60',
          borderHover: 'hover:border-slate-400',
        };
    }
  };

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60">
            <BookMarked className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
            Constitutional Law Categories
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">6 Core Areas</span>
      </div>

      {/* 6 Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {CONSTITUTIONAL_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const styles = getSchemeStyles(cat.colorScheme);

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat)}
              className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group ${styles.borderHover}`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className={`p-2.5 rounded-xl border ${styles.icon}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border font-mono ${styles.badge}`}
                  >
                    {cat.articleRange}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif group-hover:text-blue-950 transition-colors flex items-center justify-between gap-1">
                    <span>{cat.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Case & Audio Count */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Scale className="w-3.5 h-3.5 text-slate-400" />
                  {cat.caseCount.toLocaleString()} Precedents
                </span>
                <span className="flex items-center gap-1 font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 text-[11px]">
                  <Headphones className="w-3 h-3 text-amber-600" />
                  {cat.audioCount} Audios
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
