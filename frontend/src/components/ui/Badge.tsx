'use client';

import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'purple' | 'gold' | 'navy' | 'emerald' | 'blue' | 'slate' | 'rose';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  }[size];

  const variantStyles = {
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
    gold: 'bg-amber-50 text-amber-700 border border-amber-200',
    navy: 'bg-slate-100 text-slate-800 border border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200',
    slate: 'bg-slate-50 text-slate-600 border border-slate-200',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md tracking-tight ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
