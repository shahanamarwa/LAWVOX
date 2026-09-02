'use client';

import React from 'react';
import { LISTENING_STATS } from '../../data/dashboardData';
import { Activity } from 'lucide-react';

export const ListeningSummarySection: React.FC = () => {
  const getAccentStyles = (accent: string) => {
    switch (accent) {
      case 'amber':
        return {
          iconBg: 'bg-amber-50 text-amber-700 border-amber-200/70',
          badge: 'bg-amber-50 text-amber-800 border-amber-200/50',
          cardHover: 'hover:border-amber-300',
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-50 text-purple-700 border-purple-200/70',
          badge: 'bg-purple-50 text-purple-800 border-purple-200/50',
          cardHover: 'hover:border-purple-300',
        };
      case 'emerald':
        return {
          iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-200/50',
          cardHover: 'hover:border-emerald-300',
        };
      case 'blue':
      default:
        return {
          iconBg: 'bg-blue-50 text-blue-700 border-blue-200/70',
          badge: 'bg-blue-50 text-blue-800 border-blue-200/50',
          cardHover: 'hover:border-blue-300',
        };
    }
  };

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60">
            <Activity className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
            Listening Summary
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">This Week</span>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {LISTENING_STATS.map((stat) => {
          const Icon = stat.icon;
          const styles = getAccentStyles(stat.accent);

          return (
            <div
              key={stat.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs transition-all duration-200 hover:shadow-sm ${styles.cardHover} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`p-2.5 rounded-xl border ${styles.iconBg}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                {stat.change && (
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border ${styles.badge}`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 truncate">
                  {stat.title}
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans tracking-tight mt-0.5">
                  {stat.value}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
