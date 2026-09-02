'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Chapter, LegalCase } from '@/types';
import { Play, Check, Clock, Headphones, BookOpen, Volume2 } from 'lucide-react';

interface ChapterSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  legalCase: LegalCase | null;
  currentChapter: Chapter | null;
  onSelectChapter: (chapter: Chapter) => void;
}

export const ChapterSelectorModal: React.FC<ChapterSelectorModalProps> = ({
  isOpen,
  onClose,
  legalCase,
  currentChapter,
  onSelectChapter,
}) => {
  if (!legalCase) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Judgment Chapters & Law Lessons"
      subtitle={`${legalCase.shortTitle} • ${legalCase.citation}`}
      maxWidth="lg"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-2 pb-1 border-b border-slate-100">
          <span>{legalCase.chapters.length} Explanatory Audio Lessons</span>
          <span>Total: {legalCase.duration}</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
          {legalCase.chapters.map((chapter) => {
            const isCurrent = currentChapter?.id === chapter.id;

            return (
              <button
                key={chapter.id}
                onClick={() => {
                  onSelectChapter(chapter);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl flex items-start justify-between gap-3 transition-all group ${
                  isCurrent
                    ? 'bg-purple-50 border border-purple-200 text-purple-950 font-semibold shadow-sm'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-start gap-3.5 pr-2 min-w-0 flex-1">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 transition-colors ${
                      isCurrent
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-purple-100 group-hover:text-purple-700'
                    }`}
                  >
                    {isCurrent ? <Volume2 className="w-4 h-4" /> : chapter.number}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`text-sm leading-snug ${isCurrent ? 'text-purple-950 font-semibold' : 'text-slate-800 font-medium'}`}>
                      {chapter.title}
                    </p>

                    {chapter.spokenScript && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-normal leading-relaxed">
                        {chapter.spokenScript}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1.5">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-purple-600" /> {chapter.duration}
                      </span>
                      {isCurrent && (
                        <span className="text-purple-600 font-semibold text-[10px] bg-purple-100 px-1.5 py-0.5 rounded">
                          Active Lesson
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 pt-1">
                  {isCurrent ? (
                    <span className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
