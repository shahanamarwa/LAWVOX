'use client';

import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { X } from 'lucide-react';
import { NavItemId } from '../../types/navigation';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: NavItemId;
  onNavigate?: (item: NavItemId) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeItem = 'dashboard',
  onNavigate = () => {},
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-72 max-w-[85vw] h-full bg-slate-900 shadow-2xl z-10 flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Close Button top corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>

        <Sidebar
          activeItem={activeItem}
          onNavigate={(item) => {
            onNavigate(item);
            onClose();
          }}
        />
      </div>
    </div>
  );
};
